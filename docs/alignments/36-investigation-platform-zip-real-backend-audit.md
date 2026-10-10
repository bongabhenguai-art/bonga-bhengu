# File 36 — Investigation Platform ZIP: Real Backend Source Audit

**Source:** `zuxuru-investigation-platform.zip` (8,393 bytes). Inspected actual archive bytes and all six files (plus directories): `server.js`, `public/index.html`, `README.md`, `.env.example`, `package.json`, `tsconfig.json`, `next-env.d.ts` (seven files).

## Real implementation observed
- Native Node HTTP server, default port 3000, exposes `GET /health`, `GET /api/status`, `POST /api/discover`, `POST /api/investigate`, `POST /api/manual`.
- `dfs()` performs real `fetch` POST to `https://api.dataforseo.com/v3/` with Basic credentials from `DATAFORSEO_LOGIN`/`DATAFORSEO_PASSWORD`. Provider connection is **conditional**, not verified live.
- `discover()` calls `serp/google/local_finder/live/advanced`, extracts candidate businesses, website, phone, ratings and source/check URL.
- `search()` calls `serp/google/organic/live/advanced` for brand-name organic results.
- `fetchSite()` fetches a candidate website and `extract()` parses title, meta description, headings, public email/phone patterns and links using regex.
- `POST /api/investigate` assembles reason, fact, interpretation, source and confidence findings; records jobs/evidence in process-memory arrays.
- `POST /api/manual` returns user-supplied candidate data, correctly tagged `User supplied`; it does **not** independently verify identity.
- Frontend calls these APIs, displays returned candidates and findings, escapes dynamic text, and shows a **Blocked** error rather than inventing candidates on provider failure. This is closer to the fail-closed sibling audited in file 25 than the synthetic fallback in file 24.

## Critical gaps before Bonga production
1. **Server-side request forgery (SSRF):** `/api/investigate` accepts arbitrary client-supplied `candidate.website`; `fetchSite()` requests it with redirects enabled and no host/IP restriction. Attackers could target private network/metadata endpoints. Resolve and validate public hosts and every redirect; disallow private, loopback, link-local and cloud metadata addresses, enforce HTTP(S), timeouts and response-size limits.
2. **No auth, tenant isolation or RBAC:** every API is public; `DATA.jobs`/`DATA.evidence` are global arrays. Add Bonga authorization and tenant-scoped storage, consent and audit.
3. **CORS wildcard:** JSON responses set `access-control-allow-origin: *`; restrict origins and authenticated cross-origin access.
4. **Unbounded body and outbound response:** `body()` concatenates all request chunks and parses JSON without size limit; `fetchSite()` reads the entire response text. Add quotas, size/time limits, content-type checks, input schema validation and rate limits.
5. **Candidate spoofing:** browser sends the entire candidate object back to `/api/investigate`; backend trusts name/website. Issue server-side candidate IDs bound to the investigation and verify identity before website fetching.
6. **Misleading source/fact confidence:** an HTTP error still yields “Website was fetched successfully”; title/headings extracted from arbitrary HTML can be user-generated or misleading. Track HTTP status, exact retrieval timestamp, source ID and separate observed text from verified business identity.
7. **Privacy:** regex extraction collects public emails and phone numbers, which may include personal data; minimize, redact, retain with policy, avoid bulk people dossiers.
8. **Persistence and job status:** in-memory `DATA` disappears on restart; no durable job queue, idempotency, retries, evidence history, audit or per-tenant query budgets.
9. **Error handling:** raw `e.message` is sent to clients, potentially exposing internal details; `GET /api/status` only checks presence of credentials, not successful provider authorization.
10. **Outbound links:** frontend uses `target="_blank"` without `rel="noopener noreferrer"` and interpolates escaped URLs without protocol allowlisting.
11. **Routing/UI:** navigation labels are static `div`s, mobile sidebar is hidden, and many workspaces are not implemented. Add accessible Bonga navigation rather than copying shell.
12. **Packaging mismatch:** `package.json` only starts `node server.js`, with no Next.js dependency; `next-env.d.ts` and `tsconfig.json` reference Next.js despite a native Node runtime. Do not assume a Next app exists.
13. **Provider budget:** DataForSEO is an external paid/credentialed service; use Bonga provider adapter, rate/cost quotas and optional authorized alternatives, never silently claim free or active.

## Architecture-preserving integration
- **Bonga Bhengu App stays master**: retain current repository, auth, tenancy, database, design system, four product families, subscription entitlements, AI employees and administrator override.
- Port the useful **adapter contracts** for discovery, organic search, public site extraction and source-backed findings into the existing **Digital Visibility / Business Investigation** services; do not replace the current server with this standalone Node process.
- Business Scraper interprets verified customer needs/business problems from evidence, not contact scraping.
- CIA Connection Wizard handles user-owned accounts separately from public-source investigation; public search requires no claim of owner OAuth.
- Growth/Closer/Studio/Builder consume only authorized, provenance-backed opportunities, with approval-gated actions and execution receipts.
- Implement source states: observed, customer-provided, unverified, contradicted, stale, unknown and verified; never automatically equate DataForSEO results with business ownership.
- Reuse existing Bonga mobile, accessibility, country/language/currency, admin and audit infrastructure.

## CodeRabbit test gates
- Provider missing, invalid credentials, provider 4xx/5xx, timeouts, malformed responses and cost/rate limits must fail closed.
- SSRF regression cases: localhost, RFC1918, IPv6 loopback, link-local, DNS rebinding, redirect to private host, metadata endpoint, huge responses.
- Candidate spoofing and cross-tenant access must fail; manual input stays labeled unverified.
- Validate HTTP status, capture timestamps, URL schemes, XSS defenses and accessible mobile flows.
- Prove persistent evidence/job records, actor approvals, repeatability and no fake success.
- Do not claim deployment or live connector verification from source inspection alone.

**Status:** Seven archive files reviewed, implementation and risks documented. This GitHub commit adds **alignment documentation only**, not executable source changes, DataForSEO credentials, live provider testing, CodeRabbit approval or deployment.
