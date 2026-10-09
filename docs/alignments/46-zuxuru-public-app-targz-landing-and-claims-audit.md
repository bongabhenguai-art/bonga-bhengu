# File 46 — ZUXURU Aligned Public App TAR.GZ: Landing Page and Claims Audit

**Source:** `ZUXURU_ALIGNED_PUBLIC_APP.tar.gz` (6,825 bytes). The gzip/tar archive was materialized and all **four files** inspected: `zuxuru-app/index.html` (6,024 bytes), `app.js` (1,954 bytes), `styles.css` (10,080 bytes), and `README.md` (969 bytes). This is a static public website prototype, not a connected SaaS application.

## What the code actually does
- Dark/purple Zuxuru marketing page with announcement bar, sticky navigation, “Be Found. Be Chosen. Be Alive.” hero, business-name visibility entry, visual video panel, social-proof/statistics strip, six feature pillars, growth-loop content and a score modal.
- `scoreFor(name)` sums the character codes of the **business name**, then returns `58 + (sum % 27)`. Every submitted name produces a deterministic score between **58 and 84**. This is **not** a public visibility scan, website check or evidence-based metric.
- Submitting the form displays that number in a modal, saves `zuxuru_business` and `zuxuru_score` to browser `localStorage`, and describes it as an initial public visibility estimate.
- The UI uses `textContent` for the entered business name and score in the modal, avoiding direct HTML insertion in that path.
- “Continue” closes the modal, displays a toast claiming the workspace is ready, and scrolls to the Product section. It **does not** create an account or persistent server-side workspace.
- “Log in” displays a toast saying authentication will be connected later; it is **not login**.
- The video play button explicitly reports a demo placeholder; no real video player/content is supplied.
- No `fetch()`, API, real search, OAuth, tenant database, payment, AI model, content production, publishing or backend service is implemented. README confirms production integrations remain future work.

## Marketing claims requiring evidence before reuse
The page displays **10K+ Businesses Analyzed**, **45+ Data Sources Scanned**, **95% Visibility Gaps Found**, **3x Average Growth Increase**, plus “1000+ platforms” and “24/7” AI autopilot claims. These are **not supported by this source code** and must be removed or independently substantiated before public use.

The “Trusted by forward-thinking businesses” strip displays **Google Business, Meta Business, AWS Partner Network and Microsoft Azure** wordmarks/text. These can imply customer, integration or partnership endorsement. **Do not transfer the logos or imply partnerships** without authorization and evidence.

The browser-generated score must never be described as a real public score. A disclaimer saying “estimate” is insufficient when the algorithm does not measure visibility at all.

## Product and accessibility defects
- Navigation anchors for `#pricing`, `#resources` and `#company` appear in the header but corresponding sections are not present in the reviewed HTML; fix broken links or remove them.
- “Learn more” in the announcement bar has no verified handler; avoid inert CTAs.
- The score modal needs dialog semantics, keyboard focus management, Escape close, focus return and accessible score/status announcement.
- The business-name field needs a visible associated label, error guidance and suitable autocomplete handling.
- Browser `localStorage` is not an authenticated multi-tenant business record; protect business information and apply retention policies.
- The design uses a separate Zuxuru color system and logo; Bonga's existing identity and accessibility take priority.

## Additive alignment to existing Bonga Bhengu App
1. **Preserve** the existing Bonga repository, app shell, public website, navigation, authentication, tenant database, four product families, four subscription tiers and administrator override. Do not deploy this as a parallel Zuxuru website.
2. Reuse selective **public onboarding UX**: business-name entry, clear value proposition, explain-the-process section and a progressive investigation modal, using existing Bonga design tokens.
3. Connect the entry flow to the **real Digital Visibility / Investigation** service: search actual public business candidates, ask for identity confirmation, capture source URLs and timestamps, distinguish observed/unknown, and calculate a reproducible evidence-based score.
4. **Business Scraper** diagnoses needs and customer problems from corroborated evidence, rather than merely harvesting contacts.
5. **Business Connection Intelligence** separately asks for scoped owner consent before reading private Google/social/website analytics.
6. **Business Growth Intelligence** translates real gaps into recommended actions; Hunting/Fishing/Closer and Business Converter help move consented prospects to paid Bonga services.
7. Existing **Creative Studio, Website Builder & Hosting and Digital Banner Builder** execute approved content/site/banner tasks and return genuine stored assets or provider receipts.
8. Replace the Zuxuru brand, unsupported partnership claims and invented metrics with verified Bonga copy. Preserve country/language/currency and mobile/voice/accessibility features.

## CodeRabbit acceptance criteria
- Unit-test score behavior: reject character-code-derived values as a production visibility score; no simulated success in real mode.
- Verify genuine investigation API requests, identity candidate selection, provenance, error/loading/unknown states and tenant isolation.
- Verify CTA destinations, working authentication, no broken section links and no false “workspace ready” state.
- Require documented evidence and permission before publishing any customer counts, ROI percentages, source coverage, “24/7” promises or third-party partner marks.
- Test accessible modal, focus trap/return, mobile layouts, screen-reader labels, keyboard navigation and safe output rendering.
- Preserve Bonga four-product subscriptions and existing runtime; do not import a new landing page or billing model wholesale.

**Status:** All four TAR.GZ files inspected. This GitHub commit is a **documentation-only alignment**; no executable source, live investigation, OAuth, marketing claim or deployment was added to Bonga.
