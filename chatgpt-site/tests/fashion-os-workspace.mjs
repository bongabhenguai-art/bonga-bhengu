import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../dist/server/index.js';
import {saveFashionBrief} from '../dist/fashion-os-workspace.js';

const key = 'zuxuru-designer-work-v1';
const original = {
  'zuxuru-fashion-service-v1': {designer: {name: 'Alice'}, products: [{id: 'product-a'}], evidence: [], orders: []},
  'zuxuru-fashion-growth-v1': {partners: [], prospects: [{id: 'prospect-a'}], metrics: []},
  [key]: {tasks: [{id: 'existing-task', title: 'Existing work'}], studio: [{id: 'existing-project'}]}
};
const rows = new Map([['alice', {payload: JSON.stringify(original), revision: 2}], ['bob', {payload: JSON.stringify(original), revision: 9}]]);
let writes = 0, beforeWrite;
const DB = {prepare(sql) {return {bind(...args) {return {
  async first() {return structuredClone(rows.get(args[0]) || null);},
  async run() {
    writes++;
    if (beforeWrite) {const action = beforeWrite; beforeWrite = null; action();}
    assert.ok(sql.startsWith('UPDATE designer_workspaces'), 'Brief saving must not initialize or replace an account');
    const [payload, updated_at, user, revision] = args;
    const row = rows.get(user);
    if (!row || row.revision !== revision) return {meta: {changes: 0}};
    rows.set(user, {payload, revision: revision + 1, updated_at});
    return {meta: {changes: 1}};
  }
};}};}};
const asUser = user => async (path, options = {}) => {
  const headers = new Headers(options.headers);
  if (user) headers.set('oai-authenticated-user-id', user);
  if (options.method) headers.set('origin', 'https://site.example');
  return worker.fetch(new Request('https://site.example' + path, {...options, headers}), {DB});
};
const packet = {id: 'a1234567-1234-1234-1234-123456789abc', brand: 'Alice', service: 'studio', brief: 'A complete original collection launch brief.'};
const bobBefore = structuredClone(rows.get('bob'));
const saved = await saveFashionBrief(packet, asUser('alice'));
assert.equal(saved.saved, true);
assert.equal(saved.alreadySaved, false);
assert.deepEqual(rows.get('bob'), bobBefore, 'Another account must stay unchanged');
let payload = JSON.parse(rows.get('alice').payload);
assert.deepEqual(payload['zuxuru-fashion-service-v1'], original['zuxuru-fashion-service-v1']);
assert.deepEqual(payload['zuxuru-fashion-growth-v1'], original['zuxuru-fashion-growth-v1']);
assert.deepEqual(payload[key].studio, original[key].studio);
assert.deepEqual(payload[key].tasks[0], original[key].tasks[0]);
assert.equal(payload[key].tasks[1].area, 'marketing');
assert.equal(payload[key].tasks[1].status, 'Proposed');
assert.equal(payload[key].tasks[1].deliverable, packet.brief);
const writesAfterSave = writes;
assert.equal((await saveFashionBrief(packet, asUser('alice'))).alreadySaved, true);
assert.equal(writes, writesAfterSave, 'Retry after uncertain delivery must not duplicate a task');
await assert.rejects(saveFashionBrief({...packet, brief: 'Changed brief'}, asUser('alice')), error => error.code === 'conflict');
assert.equal(writes, writesAfterSave);
await assert.rejects(saveFashionBrief(packet, asUser(null)), error => error.code === 'signin');
await assert.rejects(saveFashionBrief(packet, asUser('new-account')), error => error.code === 'setup');
assert.equal(writes, writesAfterSave, 'Unsigned and uninitialized accounts must not write');

const next = {...packet, id: 'b1234567-1234-1234-1234-123456789abc'};
beforeWrite = () => {const row = rows.get('alice'); const changed = JSON.parse(row.payload); changed[key].tasks.push({id: 'concurrent', title: 'New device work'}); rows.set('alice', {...row, revision: row.revision + 1, payload: JSON.stringify(changed)});};
await assert.rejects(saveFashionBrief(next, asUser('alice')), error => error.code === 'conflict');
payload = JSON.parse(rows.get('alice').payload);
assert.ok(payload[key].tasks.some(task => task.id === 'concurrent'));
assert.ok(!payload[key].tasks.some(task => task.sourceFashionBriefId === next.id), 'Stale save must not overwrite concurrent work');
assert.equal((await saveFashionBrief(next, asUser('alice'))).saved, true, 'Explicit retry rereads the current revision');

for(const [service,area,initial] of [['website','visibility','c'],['banner','marketing','d']]){
  const imported={...packet,id:initial+'1234567-1234-1234-1234-123456789abc',service,brief:'Merged OS '+service+' production brief.'};
  assert.equal((await saveFashionBrief(imported,asUser('alice'))).saved,true);
  const task=JSON.parse(rows.get('alice').payload)[key].tasks.find(task=>task.sourceFashionBriefId===imported.id);
  assert.equal(task.area,area);assert.equal(task.sourceFashionBriefService,service);assert.equal(task.deliverable,imported.brief);assert.equal(task.status,'Proposed');
  const written=writes;assert.equal((await saveFashionBrief(imported,asUser('alice'))).alreadySaved,true);assert.equal(writes,written,'Merged OS briefs use the existing deduplication');assert.deepEqual(rows.get('bob'),bobBefore);
}

const full = structuredClone(original); full[key].tasks = Array.from({length: 500}, (_, i) => ({id: 'task-' + i}));
rows.set('full', {payload: JSON.stringify(full), revision: 1});
const beforeFull = writes;
await assert.rejects(saveFashionBrief(packet, asUser('full')), error => error.code === 'full');
await assert.rejects(saveFashionBrief({...packet, service: '__proto__'}, asUser('alice')), error => error.code === 'invalid');
assert.equal(writes, beforeFull);

const page = await worker.fetch(new Request('https://site.example/fashion-os.html'), {});
assert.equal(page.status, 200);
const html = await page.text();
for (const link of ['/fashion-service.html#evidence', '/digital-studio.html', '/fashion-service.html#social-campaigns', '/workspace', '/#packages']) assert.ok(html.includes(link), link);
assert.ok(html.includes('id="save-workspace"'));
const merged=JSON.parse(fs.readFileSync('docs/OS-SOURCE-MERGE.json','utf8'));for(const id of merged.preserved_component_ids)assert.ok(html.includes('id="'+id+'"'),'Original OS component '+id+' preserved');
for(const service of ['website','visibility','studio','banner'])assert.ok(html.includes('data-brief="'+service+'"'));
for (const file of ['fashion-os.js', 'fashion-os-workspace.js']) assert.equal((await worker.fetch(new Request('https://site.example/' + file), {})).status, 200);
for (const [page, anchor] of [['fashion-service.html', 'evidence'], ['fashion-service.html', 'social-campaigns'], ['fashion-service.html', 'my-work']]) assert.ok(fs.readFileSync('dist/' + page, 'utf8').includes('id="' + anchor + '"'));
console.log('PASS brief persistence, account isolation, data preservation, duplicate prevention, concurrent updates, setup, queue limits and hosted route assets');
