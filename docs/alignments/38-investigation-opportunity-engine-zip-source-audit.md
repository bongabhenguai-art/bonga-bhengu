# File 38 — Zuxuru Investigation + Opportunity Engine ZIP Source Audit

**Source:** `zuxuru-engine.zip` (9,790 bytes). Actual ZIP reviewed. Five source files: `zuxuru-engine/public/index.html` (5,913 bytes), `src/engine.js` (11,876 bytes), `server.js` (1,682 bytes), `package.json` (163 bytes), and `README.md` (1,783 bytes).

## Source-level implementation
- Native Node.js ES-module HTTP server with no external npm runtime dependencies, default port 3000.
- Real locally callable endpoints: `GET /api/health`, `POST /api/identity-candidates`, `POST /api/investigate`. `GET` also serves static assets from `public`.
- `src/engine.js` exports **`identityCandidates(name,supplied)`**, **`investigate(seed)`**, **`graph(result)`**.
- `identityCandidates()` generates **five synthetic name variants** based on supplied name/location; these are not searched external identity matches. Their `identityConfidence` is heuristic, not validated.
- `investigate()` creates a business seed, input-sourced evidence records, five digital-presence *planning states*, inferred customer groups and needs, potential asset registry, opportunity hypotheses, diagnosis, solution steps and investigation replay.
- `graph()` builds in-memory business→customer/asset/opportunity nodes and edges; these are **inferences**, not independently verified relationships.
- Frontend provides name, location, category and optional website inputs; identity candidate cards and eight result tabs: Overview, Evidence, Customers, Assets, Opportunities, Diagnosis, Solutions, Replay.
- The README explicitly says **live public-source search connectors still need to be added**. There is **no `fetch()` call in the domain engine** and no external provider access. This is a runnable local inference engine, **not live public investigation**.

## Security and correctness audit
1. **High-severity DOM XSS:** the browser inserts user-controlled business name/location and returned data directly into `innerHTML` with no escaping. Worse, `onclick='confirmBusiness(${JSON.stringify(b)})'` embeds JSON inside a single-quoted HTML attribute; a quote in a business name can break out and inject markup/handlers. Replace with DOM `textContent`, safe event listeners and schema-validated IDs.
2. **Synthetic identity confidence:** five name variants are generated from the user seed; labeling them “identity candidates” and “High confidence” risks implying a real search. Label as *suggested name variants*, not discovered businesses, until actual provider evidence exists.
3. **Fake source certainty:** seed fields are described as “Observed fact” with “High” confidence although they are user-provided, not corroborated. Keep status `customer-provided` or `unverified`; capture original author and source.
4. **No authentication/tenant isolation:** public API can be invoked without user identity, scopes or business ownership. No persistent investigation or audit history.
5. **No input/body limits:** `body()` buffers arbitrary request size; missing schema validation, rate limits, cost budgets and safe error responses.
6. **CORS wildcard:** JSON sets `access-control-allow-origin: *`; inappropriate for future authenticated cross-origin APIs.
7. **Static-file serving:** `new URL('./public'+p, import.meta.url)` uses untrusted URL path without explicit containment/allowlist checks. Constrain paths to public directory, normalize and test encoded traversal.
8. **Uncaught UI fetch errors:** `findCandidates()` and `confirmBusiness()` parse JSON without checking HTTP status or displaying safe error/empty states.
9. **Candidate confirmation is misleading:** each candidate's “THIS IS MY BUSINESS” button submits the same original `b` seed, not a selected candidate ID. No genuine selection/verification happens.
10. **No live actions:** offer creation, CRM, studio, connectors, measurements and external publishing are not implemented. Replay is a list of predetermined descriptive strings, not persisted event replay.
11. **No tests or deployment evidence:** README proposes Next.js, Vercel, Supabase and agents as future options; none are present in this archive.

## Architecture-preserving Bonga alignment
**Do not replace or rebuild Bonga Bhengu App.** Keep `bongabhenguai-art/bonga-bhengu`, existing application shell, routing, authentication, tenancy, data storage, four product families, four subscription entitlements and admin override.

- **Digital Visibility / Investigation:** reuse the staged `name → identity → evidence → diagnosis` contract; replace synthetic candidates with source-backed identity records, verified website/social/business data and reproducible scores.
- **Business Scraper:** use hypothesized customer groups/needs to plan investigation, then ground customer problems in real evidence; do not scrape private contacts.
- **Business Growth Intelligence:** adapt customer-needs, assets, opportunities and graph models with explicit observed/inferred/unknown statuses, provenance and owner verification.
- **Hunting, Fishing, Business Converter, Closer, Coach and Mentor:** consume qualified opportunities only with consent, customer fit and measurable actions.
- **Creative Studio, Website Builder & Hosting, Digital Banner Builder:** invoke existing Bonga production services when approved; do not invent a second Studio or builder.
- **Execution Intelligence:** use Bonga's authorized connector registry, job queue, audit receipts and measurement instead of UI-generated “Replay” steps.

## CodeRabbit integration acceptance gates
- Inventory existing Bonga investigation/graph/domain models and reuse them; port **only missing pure helpers** behind current APIs.
- XSS regression test malicious name, quotes, angle brackets, attribute injection and unexpected API strings.
- Verify identity selection actually passes a server-issued candidate ID, with tenant authorization and corroboration.
- Require provenance, capture timestamps, confidence calibration, contradictions and explicit unknown status.
- Validate input schemas/body limits, static path security, HTTP error handling, rate limits, tenant isolation and audit logs.
- Test mobile accessibility and empty/loading/error states; no fake verified badges or completed work.
- No historical sample score, customer group or opportunity is a confirmed real-world finding.

**Status:** All five archive files inspected and aligned; this is a **documentation-only** GitHub commit, not code integration, provider testing, CodeRabbit approval or deployment.
