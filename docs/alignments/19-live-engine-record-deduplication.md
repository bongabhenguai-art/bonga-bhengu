# File 19 — Duplicate Historical Live Engine Record: Provenance and Deduplication

**Source reviewed:** `Pasted markdown(8).md` (~22 KB).

## Review result
This file repeats the historical Zuxuru development transcript already reviewed in **file 18**, `docs/alignments/18-investigation-live-engine-build-record.md`. Its opening architecture diagram, six implementation phases, 20-algorithm discussion, founder/SEO discovery changes, claimed 10 APIs and 24 modules, and Part 3 Live System Engine summaries match that earlier source. Do not create a second set of Bonga modules, routes, connectors, or algorithm implementations from duplicated documentation.

## Canonical alignment
**Reuse file 18 as the implementation contract**, including:
- Bonga Bhengu App as the master architecture and brand.
- Evidence-backed investigation and business identity resolution.
- Tenant-scoped business and founder graphs, with verified provenance.
- Platform signal adapters using permitted APIs rather than purported proprietary ranking algorithms.
- Durable background jobs, rate limits, idempotency and verifiable execution receipts.
- No silent mock-data fallback or fabricated “connected” status.
- Reuse of existing four products, entitlements, roles, Studio and admin override.

## Deduplication instructions for CodeRabbit
1. Before importing any historical `ZuxuruAlgorithm.ts`, `LiveSystemEngine.ts`, `PlatformAdapters.ts`, `ModuleRegistry.ts` or `LiveDashboard.tsx`, locate and compare actual code versions.
2. If code is identical, record one canonical version; do not create duplicate engines.
3. If source versions differ, produce a diff and migration test plan, then merge only verified non-breaking functionality.
4. Treat historical “Work completed” statements as unverified until checked against source, tests, provider authorization and runtime receipts.
5. Never run duplicate scheduled workers or connect a platform twice under different product names.
6. Keep shared tenant data and connector health in existing services, not parallel Zuxuru storage.

## Provenance
File 19 is retained as a separately reviewed Library artifact to make the sequential review complete, but its overlapping contents are **not** a second implementation mandate.

**Status:** Reviewed and deduplicated. This commit adds documentation only; no app code or production deployment is changed.
