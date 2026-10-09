# File 45 — Fukulisane Growth Intelligence ZIP: Static Demo Audit and Bonga Alignment

**Source:** `fukulisane-app.zip` (3,217 bytes). ZIP bytes extracted and reviewed. The archive contains **one** file: `fukulisane-app/index.html` (8,229 bytes). It is a standalone HTML/CSS/JavaScript demo, not a backend application.

## Verified source behavior
- Light, responsive landing page headed **“How visible is your business?”**, with a business-name input and “Check My Visibility” button.
- `runScan()` trims the entered name, requires a nonempty value, places it safely in the page with `textContent`, changes the note to **“Demo scan complete...”**, reveals a dashboard and scrolls into view.
- **No `fetch()`, search provider, API, database, authentication, AI model or external connector call.** Entering any business name shows the **same** fixed results.
- Static **Public Visibility Score 72/100**, with fixed breakdown: Website Visibility **78**, Search Presence **70**, Social Presence **61**, Business Information **83**, Brand Consistency **76**.
- Fixed advice: working visibility foundation; improve lead capture, content opportunities and trust proof; three-phase growth plan **Get Found → Build Trust → Convert**.
- Eight static connection tiles: Google Business Profile, Google Search Console, Website, Instagram, Facebook, LinkedIn, YouTube and TikTok. Statuses say **Not connected** or **Add URL**, but there are **no buttons or OAuth flows** to connect.
- “Continue Building” merely opens a browser `alert()` describing a future Connected Intelligence + Growth Brain stage.
- The source itself explicitly labels the UI **Demo intelligence**, **Demo mode** and **No external data claimed**; preserve that honesty if retaining a preview.

## Source-specific quality and safety observations
1. **Fixed-score misinterpretation:** the score and breakdown are hardcoded regardless of business input. Never promote 72/100 or the five values to verified public intelligence.
2. **No investigation:** the “scan” is a client-side UI reveal only; no identity matching, evidence, source references, timestamps or uncertainty tracking.
3. **No platform authorization:** connection tiles are informational; do not claim Google/social account connection or data access.
4. **No execution:** growth actions are static cards, not jobs, assets, published content, qualified leads or revenue.
5. **Accessible input:** the business-name field relies on placeholder text and lacks an explicit associated `label`; add accessible labels, form submit on Enter and announced status updates.
6. **Safe text handling:** `runScan()` uses `textContent` for user input and note, avoiding the obvious DOM-injection problem present in some older Zuxuru prototypes.
7. **Responsive behavior:** at <=800px grids become single column, connection tiles become two columns and the form stacks. Check actual touch targets, contrast and keyboard flows before reusing design.
8. **No tenant persistence or audit:** no login, session, database, consent or stored investigation.
9. **No project manifest/tests:** no `package.json`, backend, deployment config, CI or test suite.

## Preserve existing Bonga Bhengu App architecture
**Bonga Bhengu App is the authoritative product**: retain existing repository `bongabhenguai-art/bonga-bhengu`, application shell, auth, multi-tenant data model, admin override, accessibility, country/language/currency controls and **four product families** (Digital Visibility, Creative Studio, Website Builder & Hosting, Digital Banner Builder).

### Additive reuse
- **Digital Visibility:** reuse the concise business-name entry, score breakdown layout and prioritized gap cards, but populate them only with verified evidence from the existing Investigation service.
- **Business Connection Intelligence:** route each account tile through Bonga's existing permissioned connection wizard with official OAuth, scopes, expiry, revoke and verified health.
- **Business Growth Intelligence:** adapt **Get Found → Build Trust → Convert** into evidence-backed priorities with expected outcomes, not generic unverified claims.
- **Business Scraper:** identify business needs/problems from actual investigation evidence, rather than scraping contacts.
- **Hunting/Fishing/Closer/Business Converter:** convert approved recommendations into consented leads, follow-ups and closed business with real CRM measurements.
- **Creative Studio, Website Builder & Hosting, Digital Banner Builder:** generate real approved assets/pages only via existing operational services.
- **Subscriptions:** do not alter Bonga's four-package entitlement/billing system; this ZIP contains no pricing authority.

## CodeRabbit acceptance gates
1. Inventory existing Bonga Digital Visibility onboarding; reuse components and avoid deploying a parallel Fukulisane app.
2. Separate explicit **demo preview** from **real investigation**, with real API requests, candidate selection, evidence receipts, status/error/unknown states and reproducible scoring.
3. Test arbitrary business names: scores must not remain fixed or falsely imply a completed scan.
4. Require real scoped provider authorization before a connection is marked active.
5. Make recommended actions actionable through approved jobs, outputs and measurement, or label them guidance only.
6. Test mobile, keyboard, screen-reader, form submission, language/currency and tenant isolation.
7. Keep the source's safe `textContent` practice and explicit demo disclosure.

**Status:** The single HTML file was inspected in full. This commit is a **documentation-only alignment**; no executable file has been added to Bonga runtime, no external connection verified and no deployment performed.
