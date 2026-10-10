CREATE TABLE IF NOT EXISTS zuxuru_records (id TEXT PRIMARY KEY NOT NULL, owner TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_zuxuru_owner_kind_updated ON zuxuru_records(owner,kind,updated_at);
