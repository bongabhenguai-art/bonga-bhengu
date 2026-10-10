import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';

export function testDatabase() {
  const sqlite = new DatabaseSync(':memory:');
  for (const name of fs.readdirSync(new URL('../../drizzle', import.meta.url)).filter(n => n.endsWith('.sql')).sort())
    sqlite.exec(fs.readFileSync(new URL('../../drizzle/' + name, import.meta.url), 'utf8'));
  function prepare(sql, args = []) {
    return {
      bind: (...values) => prepare(sql, values),
      async first() { return sqlite.prepare(sql).get(...args) || null; },
      async all() { return {results: sqlite.prepare(sql).all(...args)}; },
      async run() { const value = sqlite.prepare(sql).run(...args); return {meta: {changes: Number(value.changes)}}; },
    };
  }
  const DB = {prepare, async batch(statements) {
    sqlite.exec('BEGIN');
    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
      sqlite.exec('COMMIT'); return results;
    } catch (error) { sqlite.exec('ROLLBACK'); throw error; }
  }};
  return {DB, sqlite};
}
