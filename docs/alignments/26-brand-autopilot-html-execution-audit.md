# File 26 — Brand Autopilot Dashboard and Execution Integrity Audit

**Source reviewed:** `index(5).html` (81 lines, much of the CSS/JS minified), titled *Zuxuru — Brand Autopilot*. Standalone browser prototype with `localStorage` persistence. It contains **no verified backend integration, platform OAuth, AI generation or publishing**.

## Bonga Bhengu App is the existing host
Preserve current architecture, auth, tenants, routes, four products (Website Builder & Hosting, Digital Visibility, Creative Studio, Digital Banner Builder), subscriptions, AI employees and admin override. The historical Zuxuru dashboard is a capability reference, not an app replacement or a new source of truth.

## UI capability map
- **Dashboard:** visibility, brand continuity, leads, actions, narrative and next best action → existing Business Growth Intelligence.
- **BFI Public Scanner:** five score components → existing **Business Digital Investigation**; prefer user-facing **Investigate** over **Scan**.
- **CIA Connected Intelligence:** website analytics, Instagram, Google Business and CRM rows → existing authorized Connection Wizard.
- **Global Visibility Network:** 20 named social/messaging/community platforms and six search engines → provider registry, not proof of integrations.
- **Brand Continuity:** promise, voice, visual identity and evidence → existing Branding Agent and Studio.
- **Content Studio:** multi-platform assets and a conceptual six-camera studio → existing Creative Studio production pipeline.
- **Lead Closer AI:** package suggestions and lead-fit → existing CRM/Closer/Business Converter agents.
- **Autopilot:** monitor → analyse → decide → build → approve → publish → measure → learn → existing policy-controlled orchestration.
- **Reports / Execution:** audit/report and queued work → existing analytics and execution receipts.

## Verified code behavior and high-priority defects
1. `state` initializes with **illustrative values** (score 82, brand 94, leads 27, actions 18); dashboard also hard-codes +14 points, 10–36% target, 18 actions and other metrics. These are **not actual results**.
2. `runScan()` calculates a mean of **five fixed scores** (88, 61, 91, 54, 94), stores a timestamp and displays “public scan completed.” It makes **no search request** and gathers no public evidence.
3. `runGlobalScan()` assigns `PUBLIC_SCAN` to previously absent platform entries and logs a score; it makes **no provider call**.
4. `connectSource()` correctly records `AUTHORIZATION_REQUIRED` rather than immediately connected. However `authorize(name)`, `verify(name)` and `sync(name)` set `AUTHORIZED`, `VERIFIED`, `READY` locally without any provider OAuth, token exchange, health check or sync. These must not become user-operable production actions without server-side verification.
5. `generateCampaign()` adds ten metadata-only `Asset N` entries and queues a task. **No images, videos, text deliverables or real publishing artifacts are created**.
6. `runExecution()` advances a task from `READY` to `RUNNING` and, after a **900ms timeout**, marks it `COMPLETED` if a local publishing toggle is on, otherwise `AWAITING_APPROVAL`. No work is actually performed; this is a critical false-success path.
7. The “Connect GitHub” button only displays an authorization toast. Repository execution is not implemented.
8. The autopilot switches are clickable `div` elements. Inline `onclick="toggle(this)"` does not pass the expected `key` argument, so `state.autopilot[key]` writes under `undefined` rather than updating the intended brand/seo/packages/publishing property. Fix with explicit keys and accessible switches.
9. `render()` interpolates locally stored business/task/asset values directly into `innerHTML` without escaping, e.g. `t.title`, `t.reason`, `x.title`; this creates a stored DOM-XSS risk. Render user content with `textContent` or safe escaping and validate URLs.
10. `localStorage` is not a tenant-scoped database and cannot prove authorization, provider health or real action completion. It must not store credentials.
11. On mobile, CSS collapses sidebar labels to symbols using `:first-letter`, which is fragile for icon/emoji text and not a robust accessible navigation pattern.
12. No true six-camera capture, source discovery, search ranking, CRM integration, marketing publishing, background worker or production AI calls are present in this HTML.

## Additive implementation requirements
- **Investigation:** business-name input → verified public sources → evidence IDs, confidence, observation times → deterministic score; display “Not assessed” when sources are missing.
- **Connections:** official provider authorization and verified token scopes in a server-side vault; statuses = not connected / authorization required / verifying / healthy / degraded / revoked.
- **Brand DNA:** versioned brand profile and approval-controlled propagation; maintain consistency without posting to unauthorized platforms.
- **Creative Studio:** generate real files with storage IDs, previews, content provenance and explicit per-platform approval; camera preview requires device permission and working capture.
- **Sales:** qualified leads must come from consented, verifiable records, with opportunity evidence and CRM audit trail.
- **Execution:** server-issued job ID, approved action, tenant scope, idempotency, worker result, external provider receipt, retries and measured outcomes; never let a timer or UI toggle mark work completed.
- **Reporting:** derive metrics from actual evidence and actions, not prototype constants or assumed growth percentages.
- **Security/accessibility:** escape all untrusted UI content; test tenant isolation, RBAC, OAuth revocation, mobile navigation, keyboard controls, screen readers and explicit error states.

## CodeRabbit priority checks
1. Inventory existing Bonga modules and avoid duplicate autopilot, CRM, billing or Studio implementations.
2. Replace fabricated dashboard numbers and public/global scans with real data or unmistakable demo labels.
3. Remove client-only authorization and completion transitions from any production implementation.
4. Correct toggle wiring and stored DOM-XSS risk.
5. Make execution results contingent on real receipts and human/admin approval.
6. Test failure/retry/revocation, platform terms, rate limits, tenant boundaries and mobile accessibility.

**Status:** Reviewed and aligned as a source-specific UI and execution-integrity audit. Documentation only: this commit does not implement the dashboard, activate integrations, create media or deploy the app.
