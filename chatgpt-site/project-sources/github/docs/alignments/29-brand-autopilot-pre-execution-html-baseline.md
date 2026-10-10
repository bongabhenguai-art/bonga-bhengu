# File 29 — Pre-Execution Brand Autopilot HTML Baseline

**Source reviewed:** `index(2).html`, 60-line standalone *Zuxuru — Brand Autopilot* prototype. It is an earlier variant of files 27–28 (`index(4).html`, `index(3).html`) and file 26 (`index(5).html`).

## Source-specific version distinction
- File 29 contains **no `<section id="execution">`** and no `data-view="execution"` sidebar entry. The subsequent file 27/28 versions add a visual Execution area with a broken `runExecution()` call; file 26 adds a simulated local execution function.
- The Global Visibility Network section and arrays for **20 social/messaging/community services and six search engines** are present, but the sidebar has no `data-view="global"` button, making the view inaccessible through normal navigation.
- This is the **pre-execution baseline**. Do not describe it as containing a working execution queue, even though later variants introduce one.

## Verified frontend behavior
1. `runScan()` always reports **82/100** without network calls or evidence.
2. Dashboard numbers (visibility +14, brand 94%, leads 27, actions 18, target 10–36%) and report scores are static sample values.
3. `saveSetup()` persists only the business name in browser `localStorage`, then schedules the fixed scan after 600 ms.
4. `connectSource()` shows an authorization toast but performs no OAuth flow.
5. `generateCampaign()` inserts ten cards labeled assets, not real images, videos or generated text files.
6. `openPackage()` renders a fixed package summary and shows a “sent to Closer AI” toast without CRM/agent integration.
7. Brand DNA “Save & propagate” and report generation only show toast notifications.
8. Autopilot toggles change CSS classes, not backend schedules, approvals or policies.
9. Six-camera Studio labels and cross-platform visibility labels are conceptual; no live camera, platform query, media workflow or publishing.
10. Responsive layout collapses sidebar text into first-letter symbols at narrow widths; accessible names/focus and route discovery need validation.

## Additive Bonga alignment
Bonga Bhengu App remains the sole product shell and existing architecture. Retain its current tenant auth, data stores, admin controls, four product families, subscription entitlements, mobile accessibility and integrations. Do **not** add this as another app or copy fixed scores into production.

- Digital Visibility: business-name-first **Investigation**, evidence graph, identity confirmation and reproducible score.
- Connection Wizard: actual provider authorization, scopes, health, revocation and tenant-safe storage.
- Brand/Creative Studio: persisted Brand DNA, approved production and real asset IDs.
- Business Scraper, Business Converter and Closer AI: evidence-based business problems, consented leads and verified CRM activity.
- Execution Intelligence: reuse existing approved orchestration and receipts, not absent or simulated execution from historical HTML.
- Reports: measured outcomes, real timestamps and explicit “Not assessed” when no evidence.

## Deduplication and CodeRabbit gate
Reference existing audits:
- `docs/alignments/26-brand-autopilot-html-execution-audit.md`
- `docs/alignments/27-brand-autopilot-early-html-defect-audit.md`
- `docs/alignments/28-brand-autopilot-legacy-html-deduplication.md`

Do not open a fourth Brand Autopilot implementation workstream. Any production work should be a minimal additive PR against the current Bonga code with real connector tests, no fabricated scores or success toasts, accessible mobile navigation, approvals and verifiable execution results.

**Status:** File 29 reviewed and aligned as an earlier, pre-execution UI prototype. This commit is documentation only, not app code, CodeRabbit approval or deployment.
