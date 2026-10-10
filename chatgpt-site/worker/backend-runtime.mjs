const limits = new Map([
  ['/api/zuxuru/os', 4000000],
  ['/api/designer/workspace', 2000000],
  ['/api/education/workspace', 250000],
  ['/api/jarvis/chat', 16000],
  ['/api/jarvis/connection', 4000],
  ['/api/designer/tasks', 8000],
  ['/api/designer/business-book', 12000],
]);
const expensive = new Map([
  ['/api/zuxuru/os', 8],
  ['/api/jarvis/chat', 12],
  ['/api/designer/investigate', 6],
  ['/api/system/run', 6],
]);
const json = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), {
  status, headers: {'content-type': 'application/json', ...headers},
});

// Count bytes while reading, even when Content-Length is missing or incorrect.
export async function boundedRequest(request, limit) {
  const declared = request.headers.get('content-length');
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > limit))
    return {response: json({error: 'Request exceeds the size limit.'}, 413)};
  if (!request.body) return {request};
  const reader = request.body.getReader(), chunks = [];
  let total = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      total += chunk.value.byteLength;
      if (total > limit) {
        await reader.cancel();
        return {response: json({error: 'Request exceeds the size limit.'}, 413)};
      }
      chunks.push(chunk.value);
    }
  } catch {
    return {response: json({error: 'Request could not be read.'}, 400)};
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  if (total && request.headers.get('content-type')?.split(';')[0].trim() === 'application/json') {
    try {
      const value = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes));
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error();
    } catch { return {response: json({error: 'Send a valid JSON object.'}, 400)}; }
  }
  return {request: new Request(request.url, {method: request.method, headers: request.headers,
    body: total ? bytes : undefined, signal: request.signal, credentials: request.credentials, redirect: request.redirect})};
}

export async function requestAllowance(DB, user, scope, limit, now = Date.now()) {
  const window = Math.floor(now / 60000) * 60000;
  // One row per account and service; atomic increment works across Worker isolates.
  const row = await DB.prepare(`INSERT INTO backend_request_limits (user_id,scope,window_start,used)
    VALUES (?,?,?,1) ON CONFLICT(user_id,scope) DO UPDATE SET
    used = CASE WHEN backend_request_limits.window_start = excluded.window_start
      THEN MIN(backend_request_limits.used + 1, ?) ELSE 1 END,
    window_start = excluded.window_start RETURNING used`).bind(user, scope, window, limit + 1).first();
  return {allowed: row.used <= limit, retryAfter: Math.max(1, Math.ceil((window + 60000 - now) / 1000))};
}

export async function backendHealth(request, env) {
  const user = request.headers.get('oai-authenticated-user-id');
  if (!user || !env.JARVIS_OWNER_EMAIL || request.headers.get('oai-authenticated-user-email')?.toLowerCase() !== env.JARVIS_OWNER_EMAIL.toLowerCase())
    return json({error: 'Owner access required.'}, 403);
  if (request.method !== 'GET') return json({error: 'Method not allowed.'}, 405, {allow: 'GET'});
  const checks = {database: 'Unavailable',schema: 'Unavailable',media: 'Unavailable'};
  await Promise.allSettled([
    (async () => {
      if (!env.DB) return;
      await env.DB.prepare('SELECT 1 AS ready').first();
      checks.database = 'Ready';
      const tables = await env.DB.prepare("SELECT COUNT(*) AS total FROM sqlite_master WHERE type = 'table' AND name IN ('backend_request_limits','backend_workflow_locks')").first();
      checks.schema = tables.total === 2 ? 'Ready' : 'Migration required';
    })(),
    (async () => {
      if (!env.MEDIA) return;
      await env.MEDIA.head('private/backend-readiness-probe');
      checks.media = 'Ready';
    })(),
  ]);
  const ready = Object.values(checks).every(v => v === 'Ready');
  return json({version: '2026-10-10.1', status: ready ? 'Ready' : 'Needs attention', checks,
    checkedAt: new Date().toISOString()}, ready ? 200 : 503);
}

export async function apiRuntime(request, env, dispatch) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/')) return dispatch(request, env);
  const requestId = crypto.randomUUID(), started = Date.now();
  let response;
  try {
    // Binary media keeps its existing 50 MB upload/signature validation.
    if (request.body && url.pathname !== '/api/designer/media') {
      const limit = limits.get(url.pathname) || (url.pathname.startsWith('/api/builder/projects') ? 750000 : 300000);
      const result = await boundedRequest(request, limit);
      response = result.response;
      request = result.request || request;
    }
    const maximum = request.method === 'POST' && expensive.get(url.pathname);
    if (!response && maximum) {
      const user = request.headers.get('oai-authenticated-user-id');
      if (!user) response = json({error: 'Sign in to use this service.'}, 401);
      else if (request.headers.get('origin') !== url.origin) response = json({error: 'Open this service on its own website.'}, 403);
      else if (url.pathname === '/api/jarvis/chat' && (!env.JARVIS_OWNER_EMAIL || request.headers.get('oai-authenticated-user-email')?.toLowerCase() !== env.JARVIS_OWNER_EMAIL.toLowerCase()))
        response = json({error: 'Owner access required.'}, 403);
      else if (!env.DB) response = json({error: 'Request control storage is unavailable. Retry shortly.'}, 503);
      else {
        const allowance = await requestAllowance(env.DB, user, url.pathname, maximum);
        if (!allowance.allowed) response = json({error: 'Too many requests. Wait briefly before trying again.'}, 429, {'retry-after': String(allowance.retryAfter)});
      }
    }
    response ||= url.pathname === '/api/platform/backend-health' ? await backendHealth(request, env) : await dispatch(request, env);
  } catch {
    // Log identifiers only; provider secrets, bodies and personal data stay private.
    console.error(JSON.stringify({event: 'backend_request_failed', requestId, method: request.method, path: url.pathname}));
    response = json({error: 'The service could not complete this request. Keep your draft and retry.'}, 503);
  }
  const headers = new Headers(response.headers);
  headers.set('x-request-id', requestId);
  headers.set('x-content-type-options', 'nosniff');
  headers.set('cache-control', 'no-store');
  headers.set('server-timing', `backend;dur=${Date.now() - started}`);
  return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
}
