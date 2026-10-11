CREATE TABLE podcast_episodes (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  show_slug TEXT NOT NULL,
  payload TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  published_data TEXT,
  publication_revision INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  published_at TEXT
);
CREATE INDEX podcast_owner ON podcast_episodes(user_id, updated_at);
CREATE INDEX podcast_public_show ON podcast_episodes(show_slug, published_at);
