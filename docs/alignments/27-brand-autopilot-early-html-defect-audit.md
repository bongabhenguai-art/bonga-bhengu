# File 27 — Earlier Brand Autopilot HTML Version and Broken Controls Audit

**Source:** `index(4).html`, 68-line standalone Zuxuru Brand Autopilot prototype. Reviewed against file 26 (`index(5).html`). **Documentation alignment only**.

## Existing architecture is authoritative
Bonga Bhengu App remains the master app: preserve its branding, existing navigation and module structure, tenant isolation, authentication, four products (Website Builder & Hosting, Digital Visibility, Creative Studio, Digital Banner Builder), subscriptions, AI employees and administrator override. Do not install this historical Zuxuru HTML as a parallel dashboard.

## Observed prototype sections
Dashboard, BFI Public Scanner, CIA Connected Intelligence, Brand Continuity, Content Studio, Lead Closer AI, Autopilot, Reports and Execution. The markup also contains a **Global Visibility Network** section, but the navigation does not provide a Global button in this version.

## Concrete source findings
1. **Broken Global view:** `<section id="global">` exists and `renderGlobal()` populates 20 social/messaging networks and six search engines, but no sidebar button has `data-view="global"`; users cannot normally navigate to it. File 26 adds that navigation.
2. **Undefined execution handler:** “Run next execution cycle” invokes `runExecution()`, but no `runExecution` function exists in this source. Clicking it produces a JavaScript error; file 26 later introduces a local-only simulated handler.
3. **Static investigation:** `runScan()` sets score to **82** and announces scan completion; there is no search, evidence retrieval, scoring algorithm or backend.
4. **Nonfunctional authorization:** `connectSource()` only displays a toast; no OAuth flow or verified connection.
5. **Fake asset generation:** `generateCampaign()` appends ten HTML cards and announces ten generated assets; no real media files, storage IDs or AI service calls.
6. **No Closer integration:** `openPackage()` renders fixed copy and the “Send to Closer AI” button displays a toast only.
7. **Brand DNA not saved:** “Save & propagate” displays a toast; it does not persist brand values or propagate to platforms.
8. **Global scan not live:** `runGlobalScan()` shows a toast and renders platform labels without querying external providers.
9. **Limited persistence:** `saveSetup()` stores only the business name in `localStorage`, then schedules the fixed scan. No tenant-scoped business profile, investigation run, source evidence or audit log.
10. **Dashboard/report metrics are illustrative:** score 82, +14 points, brand 94%, 27 qualified leads, 18 actions, 10–36% growth target, and report scores are hard-coded, not observed performance.
11. **Navigation and controls need accessibility:** fixed sidebar collapses to symbols on mobile; autopilot switches are clickable `div` elements without keyboard/screen-reader switch semantics.
12. **No working Studio cameras or GitHub connection:** six camera labels and GitHub “Connect” button are descriptive UI/toasts only.

## Version relationship to file 26
File 26 extends this prototype with `zuxuruState` localStorage state, queued task metadata, an added Global nav button and a `runExecution()` simulation. **Neither version provides real execution.** Do not merge both dashboards or duplicate their components. Reuse the newer layout concepts only after correcting the integrity issues documented in file 26.

## Bonga mapping
- Public business investigation → existing Digital Visibility and Business Scraper; user-facing label **Investigation**.
- CIA connection wizard → existing permissioned integrations, with server-verified OAuth and token scope.
- Brand continuity → Branding Agent and shared Brand DNA record.
- Ten-asset campaign and six-camera concept → existing Creative Studio, real artifact generation, capture permissions and approval.
- Closer AI packages → existing Business Converter, CRM and Closer, based on verified customer needs.
- Execution queue → existing audited worker/jobs system; completion only with actual result receipts.
- Reports → evidence-based, reproducible scores and outcomes, with “Not assessed” where data is missing.

## CodeRabbit acceptance gates
- Keep current Bonga shell, branding, billing, auth, database and admin controls intact.
- Do not add another Zuxuru standalone application.
- Fix or omit unreachable Global navigation and undefined execution handler.
- Replace toast-only success, static scan scores and synthetic assets with real integrations or unmistakable demo labeling.
- Use tenant-scoped persistent data and approved provider connections.
- Verify mobile/keyboard/screen-reader behavior and distinguish empty, loading, partial, error and completed states.
- Require authorization and auditable provider receipts for external publishing or changes.

**Status:** File 27 reviewed and aligned as a historical prototype comparison and defect inventory. No production features, API connections, CodeRabbit review or deployment are implied by this documentation commit.
