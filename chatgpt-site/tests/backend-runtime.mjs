import assert from 'node:assert/strict';
import {apiRuntime, boundedRequest, requestAllowance, backendHealth} from '../worker/backend-runtime.mjs';
import {withSystemLock} from '../worker/workflow-lock.mjs';
import worker from '../dist/server/index.js';
import {testDatabase} from './support/sqlite.mjs';

const {DB, sqlite} = testDatabase();
const headers = {origin: 'https://test', 'oai-authenticated-user-id': 'alice', 'oai-authenticated-user-email': 'owner@example.com'};
const req = (path, body, extra = {}) => new Request('https://test' + path, {method: body === undefined ? 'GET' : 'POST', headers: {...headers, 'content-type': 'application/json', ...extra}, ...(body !== undefined ? {body} : {})});
const env = {DB, MEDIA: {async head() { return null; }}, JARVIS_OWNER_EMAIL: 'owner@example.com'};

for (const text of ['null','[]','42','{bad']) {
  const result = await boundedRequest(req('/api/studio/jobs', text), 200);
  assert.equal(result.response.status, 400);
}
let cancelled = false;
const stream = new ReadableStream({start(c) { c.enqueue(new Uint8Array(8)); c.enqueue(new Uint8Array(8)); }, cancel() { cancelled = true; }});
const streamed = new Request('https://test/api/studio/jobs', {method: 'POST', body: stream, duplex: 'half'});
assert.equal((await boundedRequest(streamed, 12)).response.status, 413);
assert(cancelled);
assert.equal((await boundedRequest(req('/api/studio/jobs', '{}', {'content-length': '1000'}), 100)).response.status, 413);
assert.equal((await boundedRequest(req('/api/studio/jobs', '"😀"'), 5)).response.status, 413);
assert.equal(await (await boundedRequest(req('/api/studio/jobs', ''), 100)).request.text(), '');
assert.deepEqual(await (await boundedRequest(req('/api/studio/jobs', '{"title":"Saved"}'), 100)).request.json(), {title: 'Saved'});

// Durable per-user limits, capped counters, and a new minute's allowance.
assert((await requestAllowance(DB, 'alice', 'test', 2, 60001)).allowed);
assert((await requestAllowance(DB, 'alice', 'test', 2, 60002)).allowed);
assert(!(await requestAllowance(DB, 'alice', 'test', 2, 60003)).allowed);
assert((await requestAllowance(DB, 'bob', 'test', 2, 60003)).allowed);
assert((await requestAllowance(DB, 'alice', 'other', 2, 60003)).allowed);
assert((await requestAllowance(DB, 'alice', 'test', 2, 120001)).allowed);
const concurrent = await Promise.all(Array.from({length: 8}, () => requestAllowance(DB, 'parallel', 'test', 3, 60000)));
assert.equal(concurrent.filter(v => v.allowed).length, 3);
assert.equal(sqlite.prepare('SELECT used FROM backend_request_limits WHERE user_id=? AND scope=?').get('parallel', 'test').used, 4);

for (const h of [{'oai-authenticated-user-id': ''}, {'oai-authenticated-user-email': 'other@example.com'}, {'oai-authenticated-user-id': '', 'oai-authenticated-user-email': 'owner@example.com'}])
  assert.equal((await backendHealth(req('/api/platform/backend-health', undefined, h), env)).status, 403);
assert.equal((await backendHealth(req('/api/platform/backend-health', '{}'), env)).status, 405);
assert.equal((await backendHealth(req('/api/platform/backend-health'), env)).status, 200);
assert.equal((await backendHealth(req('/api/platform/backend-health'), {...env, MEDIA: {async head() { throw Error('private storage detail'); }}})).status, 503);
assert.equal((await backendHealth(req('/api/platform/backend-health'), {...env, DB: null})).status, 503);

const runtime = (request, target = async () => Response.json({ok: true})) => apiRuntime(request, env, target);
const success = await runtime(req('/api/test'));
assert.match(success.headers.get('x-request-id'), /^[a-f0-9-]{36}$/);
assert.equal(success.headers.get('cache-control'), 'no-store');
assert.match(success.headers.get('server-timing'), /^backend;dur=\d+$/);
const originalLog = console.error, logs = [];
console.error = value => logs.push(value);
try {
  const failed = await runtime(req('/api/test'), () => { throw Error('secret-token'); });
  assert.equal(failed.status, 503);
  assert(!(await failed.text()).includes('secret-token'));
  assert(!logs.join('').includes('secret-token'));
} finally { console.error = originalLog; }
assert.equal((await runtime(req('/api/system/run', '', {origin: 'https://evil.example'}))).status, 403);
assert.equal((await runtime(req('/api/system/run', '', {'oai-authenticated-user-id': ''}))).status, 401);
for (let i = 0; i < 6; i++) assert.equal((await runtime(req('/api/system/run', ''))).status, 200);
const limited = await runtime(req('/api/system/run', ''));
assert.equal(limited.status, 429);
assert(Number(limited.headers.get('retry-after')) > 0);

// Hold one run open, reject a second run for that account, and allow another account.
let resume;
const hold = new Promise(resolve => { resume = resolve; });
const running = withSystemLock(req('/api/system/run', ''), env, async (_, current) => {
  await current.DB.prepare('INSERT INTO package_requests VALUES (?,?,?)').bind('lock-test', 'starter', 'now').run();
  await hold; return Response.json({ok: true});
});
await new Promise(resolve => setTimeout(resolve, 0));
assert.equal((await withSystemLock(req('/api/system/run', ''), env, () => { throw Error('Duplicate run executed'); })).status, 409);
assert.equal((await withSystemLock(req('/api/system/run', '', {'oai-authenticated-user-id': 'bob'}), env, async () => Response.json({ok: true}))).status, 200);
resume(); assert.equal((await running).status, 200);
assert.equal(sqlite.prepare('SELECT COUNT(*) AS total FROM backend_workflow_locks').get().total, 0);

// A stale Worker loses its lease; its later writes roll back and cannot delete a new lock.
let now = 1000;
const expired = await withSystemLock(req('/api/system/run', ''), env, async (_, current) => {
  now += 120001;
  sqlite.prepare('UPDATE backend_workflow_locks SET token=?,expires_at=? WHERE user_id=?').run('new-worker', now + 120000, 'alice');
  await current.DB.prepare('UPDATE package_requests SET tier=? WHERE user_id=?').bind('premium', 'lock-test').run();
  return Response.json({ok: true});
}, () => now);
assert.equal(expired.status, 503);
assert.equal(sqlite.prepare('SELECT tier FROM package_requests WHERE user_id=?').get('lock-test').tier, 'starter');
assert.equal(sqlite.prepare('SELECT token FROM backend_workflow_locks WHERE user_id=?').get('alice').token, 'new-worker');
sqlite.prepare('DELETE FROM backend_workflow_locks').run();
now = 1000;
await withSystemLock(req('/api/system/run', ''), env, async (_, current) => {
  now += 60000;
  await current.DB.batch([
    current.DB.prepare('UPDATE package_requests SET tier=? WHERE user_id=?').bind('professional', 'lock-test'),
  ]);
  assert.equal(sqlite.prepare('SELECT expires_at FROM backend_workflow_locks WHERE user_id=?').get('alice').expires_at, now + 120000);
  return Response.json({ok: true});
}, () => now);
sqlite.prepare('INSERT INTO backend_workflow_locks VALUES (?,?,?)').run('alice', 'crashed-worker', 1);
assert.equal((await withSystemLock(req('/api/system/run', ''), env, async () => Response.json({ok: true}))).status, 200);

// Exercise the packaged Worker rather than only middleware helpers.
for (const body of ['null','{bad']) {
  const result = await worker.fetch(req('/api/studio/jobs', body), env);
  assert.equal(result.status, 400);
  assert(result.headers.get('x-request-id'));
}
assert.equal((await worker.fetch(req('/api/studio/jobs', '{"action":"create","title":"Real job","brief":"Backend integration"}'), env)).status, 201);
const health = await worker.fetch(req('/api/platform/backend-health'), env);
assert.equal(health.status, 200);
assert.equal((await health.json()).status, 'Ready');
assert.equal((await worker.fetch(req('/workspace', undefined, {'oai-authenticated-user-id': ''}), env)).status, 302);
console.log('PASS backend runtime: bounded streams, JSON errors, durable rate limits, private health checks, request tracing, concurrent-run locks, lease fencing and packaged API integration.');
