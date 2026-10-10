# Backend update — 10 October 2026

The existing Bonga Bhengu App Worker, D1 database, R2 bucket, account connections and module routes are retained.

## Behavior

- API requests receive a unique `X-Request-ID`, `Server-Timing`, no-store caching and JSON failure responses. Unexpected errors log only the request identifier, method and path.
- Structured request bodies are bounded while streaming, including requests without Content-Length. Malformed JSON, null, arrays and primitive JSON receive 400. Byte limits retain the workspace, education and builder budgets; binary uploads retain the existing 50 MB limit and signature validation.
- Expensive signed-in POST services have atomic account/service limits per minute: Jarvis chat 12, evidence checks 6, connected workflow runs 6. Rejections return 429 with Retry-After. Camera signaling, ordinary record saving and existing account connections are unaffected.
- Connected workflow runs acquire a durable account-specific lease. Parallel runs for the same account receive 409. Every workflow write checks and renews the lease inside its D1 transaction, and expired workers cannot write after a replacement acquires the lock. A failed Worker leaves a lease that expires after two minutes; only its own token can release it.
- `GET /api/platform/backend-health` checks D1 access, the new migration tables and R2 metadata access. It requires both the signed-in identity and the configured owner email. It reports service state, the backend update identifier and a check timestamp, without exposing credentials or private records. The existing platform dashboard has a button for this check.
- Owner page access now requires the signed-in user ID as well as the configured owner email.

## Storage and compatibility

Migration 0013 adds request counters and workflow leases. It does not alter or backfill existing product records. Counters use one capped row per account/service. The existing origin checks, optimistic record revisions, publication approval and private account isolation remain active.

Backend module paths are included by the existing build script; the source architecture and deployment bindings are preserved. The request limits require the database binding: expensive services fail with 503 when it cannot be used.

## Verification

Run `node scripts/build-ai.mjs`, then each `tests/*.mjs` suite. `tests/backend-runtime.mjs` uses the full migration set against SQLite and exercises bounded chunked bodies, atomic concurrent request limits, owner checks, JSON errors, lock contention, renewal, expired-lease recovery, stale-write rollback, token-scoped release and the packaged Worker API.

The health check verifies database reads, schema presence and R2 metadata access. It does not call AI providers, charge accounts, send social posts or prove camera hardware connectivity.
