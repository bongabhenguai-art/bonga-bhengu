# File 51 — ZUXURU_USABLE_MVP.zip: Browser MVP Source Audit and Additive Bonga Mapping

**Source:** `ZUXURU_USABLE_MVP.zip` (17,255 bytes). Inspected the archive manifest and its executable `zuxuru-app/index.html`, `app.js`, `styles.css`, `README.md`, `modules/content-studio/README.md` and three specification files in `docs/`: `ZUXURU_FINAL_MASTER_BUILD_SPEC.md`, `ZUXURU_IMPLEMENTATION_BLUEPRINT.md`, and `ZUXURU_INTEGRATION_MATRIX.md`. This is a **static browser-runnable workspace with reference architecture**, not a connected SaaS backend.

## Verified executable behavior
- Five views: **Overview**, **Visibility**, **Content Studio**, **Vault & Connections**, and **Growth Loop**; responsive UI, business setup modal, local metrics and action cards.
- `app.js` persists business profile, asset **metadata**, campaign **metadata**, connection flags and manually entered performance metrics to one `localStorage` key: `zuxuru_state`.
- `calcScore()` starts at **25** for a configured business and adds **20** for website text, **20** for a local Google connection flag, **15** for any local social connection flag, plus up to **10** based on number of assets. This is a heuristic **not a public-source visibility investigation**.
- The **Run visibility scan** button merely updates `scannedAt` and rerenders the local heuristic; there is no network search or evidence ingestion.
- Connection buttons toggle `state.connections[k]` booleans, display **Connected** and notify that real OAuth can be attached later. **No OAuth, token verification or platform sync occurs.**
- File input stores each uploaded image/video's **filename, type, size and timestamp only**. It does **not** store the file bytes or create a usable media library.
- **Generate plan** appends one Draft campaign record with `assets:10` and platform count. It does **not** generate ten images, posts or videos.
- Metrics form stores **user-entered** views, engagement and leads without platform provenance or verification.
- UI includes decorative camera feeds; no verified camera capture, streaming, recording or processing pipeline.
- `README.md` explicitly says real OAuth, Supabase, Logto, publishing and AI media providers remain outside the MVP. There is no implemented server, authenticated tenant database or external API call in `app.js`.

## Source-specific defects and security risks
1. **False connected status:** local booleans are displayed as real “Connected”; replace with verified, authorized connector lifecycle and distinct DEMO/UNVERIFIED state.
2. **False scan freshness:** `scannedAt` updates on button click without new public evidence; don't label as completed investigation.
3. **Fake asset production:** campaign `assets:10` is an intended count, not ten generated or stored media assets.
4. **Missing uploaded bytes:** selected files disappear after browser refresh despite persisted metadata; use existing tenant-authorized asset storage and ingestion.
5. **DOM injection:** `render()` inserts user-controlled asset names and campaign names into `innerHTML` without escaping. Use safe text rendering and test XSS.
6. **Single-browser tenancy:** `zuxuru_state` is origin-local, untrusted and not isolated across logged-in tenants.
7. **Metrics reliability:** manually entered values must be labeled manual/unverified; do not report as provider-verified lead or revenue results.
8. **Score anomalies:** website “Connected” is shown from a typed URL, not website ownership; Google/social scores arise from local booleans, not evidence.
9. **No production workflow receipts:** there is no real publishing, payment, scheduling, provider receipt or verified before/after outcome.

## Reference documentation worth preserving
The included implementation blueprint proposes shared identifiers (`organization_id`, `business_id`, `user_id`, `connection_id`, `asset_id`, `campaign_id`, `job_id`) and a staged build sequence from tenant foundation to evidence, real connectors, Studio, execution, analytics and guarded Autopilot. Its integration matrix names **GitHub, Supabase, Logto, Netlify, Postiz, ComfyUI, OmniRoute, Agent-Reach, ToolJet**, Google and social platforms as **candidates** with explicit verification gates—not installed dependencies. The master specification describes a visibility→connect→improve→create→distribute→measure→learn loop. These are design references only; Bonga's architecture takes precedence.

## Bonga Bhengu App alignment: preserve and extend
- **Keep existing architecture intact:** existing GitHub repo, app shell, navigation, authentication, tenant database, design system, admin override, four product families and four-tier subscription entitlements. Do not copy the separate Zuxuru UI or build a second database.
- **Digital Visibility:** map the scan UI to the existing public Investigation service, source-backed findings, confidence, timestamps and honest unknown/error states.
- **Business Connection Intelligence / Vault:** replace local connection booleans with scoped OAuth and provider verification, sync health, revocation and per-tenant audit.
- **Creative Studio:** use existing image/video ingestion, actual bytes/storage, asset jobs, campaign variants, preview/approval and publication receipts.
- **Website Builder & Hosting:** accept confirmed Business Master File data and build real editable pages through existing builder.
- **Digital Banner Builder:** generate actual banners and versioned assets using existing media pipeline.
- **Business Growth / AI employees:** Hunting, Fishing, Closer, Business Scraper, Coach, Mentor, Fixer and Business Converter should work on genuine consented business records and evidence, not local fake score or counts.
- **Measurement:** separate manual estimates from verified provider analytics; calculate before/after only when provenance and dates exist.
- **Admin:** feature-flag new adapters, control provider access and override jobs with audit receipts.

## CodeRabbit acceptance gates
1. Inventory existing Bonga modules and map the ZIP's five views to existing screens; avoid parallel routes, data models or billing.
2. Eliminate unsafe `innerHTML` insertion and test malicious filenames, campaign names and localStorage tampering.
3. Verify actual public scan requests and evidence provenance; never increase score from merely clicking “Connect”.
4. Verify real OAuth/provider status; expose clear authorization, disconnected, expired and error states.
5. Verify upload persists actual asset bytes with tenant isolation, MIME/size validation and durable URLs.
6. Require generated campaign assets to have stored asset IDs and approval status; distinguish plan target count from generated count.
7. Mark manual metrics explicitly; ingest provider analytics only with permission and source receipts.
8. Test accessible mobile layouts, keyboard/screen reader controls, localization and safe admin overrides.
9. Introduce only validated, license-compatible integrations and tests; no assumption that reference matrix tools are installed.

**Status:** Source ZIP inspected and aligned. This commit is **documentation-only**; no executable ZIP contents have been imported, no provider integrations verified and no deployment performed.
