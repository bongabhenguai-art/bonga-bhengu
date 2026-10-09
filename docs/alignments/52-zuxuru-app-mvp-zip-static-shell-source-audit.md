# File 52 — ZUXURU_APP_MVP.zip: Earlier Static Shell Source Audit

**Source:** `ZUXURU_APP_MVP.zip` (15,609 bytes). Inspected the ZIP manifest, all executable HTML/JavaScript, README, Content Studio README, and bundled architecture documents. The archive contains a **static no-build browser prototype**, not a connected production application.

## Verified files
- `zuxuru-app/index.html` (8,269 bytes): five-tab app shell.
- `zuxuru-app/app.js`: short client-side navigation and demo click handlers.
- `zuxuru-app/styles.css` (5,191 bytes): responsive styling.
- `zuxuru-app/README.md` (861 bytes): explicitly describes a browser-based prototype and notes missing production services.
- `zuxuru-app/modules/content-studio/README.md` (279 bytes): module intent, not an executable media engine.
- `zuxuru-app/docs/ZUXURU_IMPLEMENTATION_BLUEPRINT.md`, `ZUXURU_INTEGRATION_MATRIX.md`, `ZUXURU_FINAL_MASTER_BUILD_SPEC.md`: design references, not proof of integrations.

## Source-specific executable audit
1. Five navigable sections: **Overview**, **Visibility**, **Content Studio**, **Vault & Connections**, **Growth Loop**. `show(view)` toggles hidden sections and updates the heading.
2. The page starts with **hardcoded 64** visibility score, and fixed Website 30, Google 25, Social 41, Brand 72. These are **demo figures**, not observed evidence.
3. Clicking **Run visibility scan** only changes the score to **67**, adjusts the progress bar and displays “demo evidence refreshed”; there is **no public search, provider API, identity verification or real scan**.
4. **Create campaign** only displays a toast claiming a campaign workspace was created; it does **not** create a stored campaign.
5. **Generate 10-asset plan** inserts one fixed **Draft** row into the HTML table and shows a toast; no ten assets, media files, AI processing or backend records are created.
6. **Connect** buttons only show “Connection wizard opened. Authorization is required.” There is **no OAuth wizard or connected provider**.
7. Six **CAM 1–6 LIVE PREVIEW** tiles are decorative static HTML. No camera device permissions, video stream, recording, audio mixer or livestream is implemented.
8. Example content rows display **Published**, **Measuring**, and **Scheduled** without provider receipts; they are illustrative and must never be treated as genuine publishing history.
9. The README confirms that real OAuth, Supabase persistence, publishing APIs, analytics ingestion, AI processing and production deployment remain unimplemented.
10. No `fetch`, tenant authentication, server/database, media generation, persistent job queue or verified execution is present in `app.js`.

## Relationship to file 51
This is an **earlier, thinner UI shell** than `ZUXURU_USABLE_MVP.zip` (file 51). File 51 adds browser `localStorage`, basic business setup, asset metadata, local connection flags, campaign metadata and manual metrics. File 52 has mostly hardcoded displays and transient UI events. Treat these as **versions in one Zuxuru prototype lineage**, not two apps or independent engines.

## Bonga Bhengu App architecture-preserving alignment
- **Bonga is authoritative.** Preserve the existing app shell, routes, authentication, tenant database, design system, admin overrides, four product families and four subscription packages. Do not replace its runtime with this standalone Zuxuru shell.
- **Digital Visibility:** reuse the five-tab UX concepts selectively; route scan actions to Bonga's existing evidence-based public Investigation and scoring service, not the fixed 64→67 animation.
- **Business Connection Intelligence:** real permissioned connector lifecycle, scoped OAuth, verify/sync/expiry/revoke states; never imply authorization from a toast.
- **Creative Studio:** six-camera production layout is a **visual reference only**; any live camera preview, capture, recording, AI processing, approval and publishing must be implemented in Bonga's existing Studio pipeline and tested with actual devices.
- **Website Builder & Hosting / Digital Banner Builder:** connect approved business-growth recommendations to actual builders and stored deliverables.
- **Business Growth Intelligence and AI employees:** reuse the loop SEE → UNDERSTAND → CONNECT → IMPROVE → CREATE → DISTRIBUTE → MEASURE → LEARN → GROW as an orchestration concept; Business Scraper diagnoses real business needs and gaps.
- **Shared contracts:** the blueprint's `organization_id`, `business_id`, `connection_id`, `asset_id`, `campaign_id`, `job_id` are conceptual interoperability fields. Extend existing Bonga schema only where needed, without creating a parallel tenant database.
- **External tools:** GitHub, Supabase, Logto, Netlify, Postiz, ComfyUI, OmniRoute, Agent-Reach and ToolJet in the matrix are **candidates**, not installed or authorized integrations.

## CodeRabbit acceptance criteria
1. Compare existing Bonga screens and file 51; reuse useful UX without duplicating UI or modules.
2. Replace fake scan result with real source-backed evidence, unknown/error states, timestamps and reproducible scores.
3. Replace toast-only campaigns and draft-only content with durable records, generated asset IDs, review and approval.
4. Replace decorative camera tiles with actual device preview only when supported; otherwise label mockup clearly.
5. Ensure connected and published statuses require verified provider receipts.
6. Test mobile, keyboard/screen-reader accessibility, tenant isolation, error recovery and admin overrides.
7. Keep this historical static shell out of production unless integrated through existing Bonga contracts and validated tests.

**Status:** Source files inspected. This commit is **documentation-only**: no executable code was imported, no OAuth or camera integration was established, and no deployment was performed.
