const leaseMs = 120000;
const reply = (value, status, headers = {}) => new Response(JSON.stringify(value), {
  status, headers: {'content-type': 'application/json', 'cache-control': 'no-store', ...headers},
});

export async function withSystemLock(request, env, run, clock = Date.now) {
  if (request.method !== 'POST' || !env.DB || !request.headers.get('oai-authenticated-user-id') || request.headers.get('origin') !== new URL(request.url).origin)
    return run(request, env);
  const user = request.headers.get('oai-authenticated-user-id'), token = crypto.randomUUID(), DB = env.DB;
  let acquired = false;
  try {
    const now = clock();
    const result = await DB.prepare(`INSERT INTO backend_workflow_locks (user_id,token,expires_at)
      VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET token = excluded.token,
      expires_at = excluded.expires_at WHERE backend_workflow_locks.expires_at <= ?`)
      .bind(user, token, now + leaseMs, now).run();
    acquired = !!result.meta?.changes;
    if (!acquired) return reply({error: 'A system run is already in progress. Wait for its report before retrying.'}, 409, {'retry-after': '5'});
    // Every write checks and renews the lease in the same D1 transaction.
    // A crashed or delayed Worker cannot mutate records after another run takes over.
    async function fencedBatch(statements) {
      const at = clock();
      const results = await DB.batch([
        DB.prepare(`SELECT CASE WHEN EXISTS (SELECT 1 FROM backend_workflow_locks
          WHERE user_id = ? AND token = ? AND expires_at > ?) THEN 1
          ELSE abs(-9223372036854775808) END AS lease_valid`).bind(user, token, at),
        DB.prepare('UPDATE backend_workflow_locks SET expires_at = ? WHERE user_id = ? AND token = ?').bind(at + leaseMs, user, token),
        ...statements,
      ]);
      return results.slice(2);
    }
    function prepare(sql, args) {
      const statement = args ? DB.prepare(sql).bind(...args) : DB.prepare(sql);
      return {
        bind: (...values) => prepare(sql, values),
        first: (...values) => statement.first(...values),
        all: (...values) => statement.all(...values),
        run: async () => (await fencedBatch([statement]))[0],
        // Keep the original D1 statement for transaction batches.
        statement,
      };
    }
    const guardedDB = {prepare, batch: statements => fencedBatch(statements.map(s => s.statement))};
    return await run(request, {...env, DB: guardedDB}, token);
  } catch {
    return reply({error: 'The system run could not finish safely. Reload saved records before retrying.'}, 503);
  } finally {
    if (acquired) {
      try { await DB.prepare('DELETE FROM backend_workflow_locks WHERE user_id = ? AND token = ?').bind(user, token).run(); }
      catch { /* The bounded lease permits recovery if the Worker or storage fails. */ }
    }
  }
}
