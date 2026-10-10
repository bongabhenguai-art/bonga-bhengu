# File 35 — Render-ready Zuxuru ZIP: Source and Deployment Audit

**Source:** `zuxuru-render-ready.zip` (8,016 bytes). Archive inspected directly.

## Actual ZIP contents
- `zuxuru-app/README.md` — Render deployment instructions, Node 20+, `npm install`, `npm start`, health path `/health`.
- `zuxuru-app/server.js` — 1,620-byte native Node HTTP static-file server.
- `zuxuru-app/package.json` — `zuxuru-app` v0.1.0, no runtime dependencies, Node >=20, start script `node server.js`.
- `zuxuru-app/render.yaml` — Render web-service configuration, free-plan declaration, Node 20, health check `/health`.
- `zuxuru-app/public/index.html` — 14,864-byte self-contained eight-view Zuxuru Business Growth OS demonstration.

## What works in source versus what is simulated
**Real code:** The Node server binds `0.0.0.0`, honors `PORT` (default 10000), serves `/health` with `{ok:true,app:'zuxuru',version:'0.1.0'}`, and reads static files from `public`. The UI provides client-side navigation, input, responsive styling and HTML escaping for dynamic text.

**Not live:** The frontend makes **no `fetch()` requests**. Investigation advances through a **260 ms interval** and creates user-name-derived local candidate, sample evidence, diagnosis, opportunities, customers and solution. The UI explicitly labels test mode and unverified identity. The phone camera button only shows an alert, the generated content brief is a fixed template, and results remain at a static 0% placeholder. There is no OAuth, real search, CRM, media capture, AI generation, persistence, authentication, tenant authorization or execution.

**Important bug:** Navigating directly to Solutions before starting an investigation invokes `renderSolution()` with `state.solution === null` and dereferences `.title`, causing a JavaScript error. This is the same underlying standalone UI pattern audited in `docs/alignments/23-zuxuru-growth-os-html-prototype-audit.md`; **do not create another Growth OS UI**.

## Server-specific risks and gaps
- `server.js` checks `file.startsWith(PUBLIC_DIR)` after path normalization. A raw string-prefix check is not a robust filesystem containment boundary; use `path.relative()`, ensure it does not escape, and restrict static files to an allowlist or existing Bonga static-serving infrastructure.
- `decodeURIComponent(url.pathname)` is not caught; malformed URL encodings may throw and interrupt request handling.
- Server does not constrain HTTP methods, authenticate users, rate-limit requests, set modern security headers or provide API routes. A health response proves only that the server responds, **not that the Bonga app or integrations work**.
- `render.yaml` specifying `plan: free` does not verify current Render plan availability, account access, deployed service or uptime.
- The ZIP contains no tests, lockfile, CI pipeline or verified deployment receipt.

## Alignment to the existing Bonga Bhengu App
1. Keep `bongabhenguai-art/bonga-bhengu` as the repository, the existing feature branch as the review destination and the current application shell, auth, tenant database, modules and administrator override.
2. Reuse the **workflow concept**: Business Investigation → Evidence → Diagnosis → Opportunity → Solution → Customer Intelligence → Creative Studio → Results.
3. Place Investigation, scoring and opportunity reasoning in **Digital Visibility** and Business Growth Intelligence; actual needs discovery belongs to Business Scraper.
4. Use the existing **Creative Studio**, **Website Builder & Hosting** and **Digital Banner Builder** rather than this demo's placeholder Studio.
5. Use existing AI employees (Hunting, Fishing, Closer, Coach, Mentor, Fixer, Business Converter) with approved, evidenced actions.
6. Preserve the four product-selection subscription tiers and current billing. Do not use this archive to replace them.
7. Do not run a second static server or deploy a separate Zuxuru app by default. If Render is considered for Bonga, first audit the current hosting and routing and adopt only compatible configuration.
8. Maintain mobile accessibility, language/currency selectors, tenant isolation, real OAuth and evidence-backed action receipts.

## CodeRabbit gates
- Verify current app deployment topology before changing hosting or static-file handling.
- Add guard/empty states for direct Solutions navigation; test all eight routes before and after investigation.
- Test server path containment, malformed percent-encoded paths, HTTP methods, response headers and health semantics if reusing server logic.
- Distinguish test-mode outputs from verified observations; require real provider sources before scoring, connection status or completion.
- Validate tenant-safe persistence, approval-gated publishing and actual asset/job receipts before production use.

**Status:** All five ZIP file entries inspected and aligned. This GitHub commit adds **documentation only**; it does not install the ZIP, replace Bonga hosting, deploy Render or change application code.
