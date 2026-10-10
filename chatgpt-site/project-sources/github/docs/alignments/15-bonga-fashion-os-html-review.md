# File 15 — Bonga Bhengu Fashion × AI Workspace HTML Review

**Source inspected:** `Bonga_Bhengu_Fashion_OS.html` (~35.8 KB). This is a complete, self-contained HTML/CSS/vanilla-JavaScript **prototype** titled “Bonga Bhengu · Fashion × AI Workspace.” The original HTML has **not** been overwritten or published by this commit.

## What the file actually implements
- Three accessible tabs, Digital Visibility, Creative Studio and Content Automation, with click and arrow/Home/End keyboard navigation and tab-panel visibility changes.
- Dark blueprint-grid design with cyan/green/gold accents, responsive CSS at 760px, skip link, focus styles and `prefers-reduced-motion` support.
- Fashion collection artwork and editable garment specification fields.
- Local JPEG/PNG/WebP preview (up to 8 MB) using object URLs, reset and cleanup.
- A client-side project brief form that generates text, enables download and copy, and prepares an optional WhatsApp handoff.
- Detailed proposed multi-tenant workflow and database schema in a collapsible architecture section.

**Not implemented by this file:** authentication, subscriptions, real website building, camera capture, video rendering, storage persistence, OAuth, automatic publishing, backend tenant isolation, checkout, analytics or verified execution. The form explicitly states nothing is sent automatically. A WhatsApp link opens a handoff; it is not a verified sent message.

## Alignment to existing Bonga Bhengu architecture
| Prototype component | Existing destination | Integration rule |
|---|---|---|
| Visibility tab | Digital Visibility product | Retain as workspace navigation, not a paid tier or proven score |
| Studio tab and production brief | Existing `creative-studio/` | Keep planning UI separate from actual capture/streaming backend |
| Content Automation tab | Shared growth/execution agents | Cross-product capability, not a replacement product |
| Fashion collection and spec editor | Fashion portfolio / Studio assets | Preserve local-preview semantics until real secure upload is built |
| Project brief generator | Website Builder and CRM intake | Owner opt-in required for actual submission; preserve download/copy |
| Rental section | Digital Banner Builder | Real inventory and authorized checkout before advertising a purchasable slot |
| Shared workflow and schema notes | Existing backend/services | Adapt to current tables; never duplicate tenant/account primitives blindly |

**Important:** Three `EXECUTE_TIER` tabs are a service-scope selector, **not** the Bonga four-product subscription matrix (historically R299/R499/R699/R1000 monthly, subject to live billing confirmation). Do not replace current billing entitlements.

## Review findings and risks
1. The HTML is client-only: its proposed `tenants`, `jobs`, `deliveries` and `evidence` tables are text documentation, not created database tables.
2. Uploaded images exist only in the browser session, are not sent to WhatsApp, and disappear after reload.
3. The project brief contains optional contact fields; adding server persistence requires consent, data minimization, secure handling and tenant boundaries.
4. The static WhatsApp destination and contact details are hard-coded in source; production should read approved business-contact configuration rather than hard-code sensitive or changeable data.
5. In-page prototype navigation and local UX can be adapted into existing app components, but Google Sites embed directions are not deployment instructions for ChatGPT Sites.
6. The three tabs and existing design should remain usable on narrow screens; test actual device widths, focus order, and screen-reader labels before shipping.
7. “Autonomous Proof Engine” claims must stay gated behind real publishing receipts and measurement.

## CodeRabbit implementation order
1. Inspect current app code, routes, state management, styling, authentication and subscription model.
2. Create an additive reusable fashion workspace component under the appropriate existing module; do not replace the app shell.
3. Port accessible tabs, collection preview and local brief creation with unit and interaction tests.
4. Integrate real storage, consented enquiry submission and authorized Studio/growth actions only after backend endpoints are confirmed.
5. Use the existing tenant and permissions architecture for queued jobs, secrets, approvals and publishing.
6. Validate mobile layouts, reduced motion, security and regression behavior across the four products.

## Acceptance criteria
- Original Bonga navigation, product entitlements, branding and admin override remain intact.
- No mock operational status, fabricated results or hidden network sends.
- User can switch tabs, preview/reset image, edit specs, generate/download/copy brief without a backend.
- Optional WhatsApp handoff requires user action; no automatic messages.
- All newly integrated backend actions are authenticated, authorized and audited.

**Status:** File 15 reviewed and aligned as an implementation review. This documentation commit does **not** upload the original HTML, integrate runnable code, execute CodeRabbit review or deploy the ChatGPT Site.
