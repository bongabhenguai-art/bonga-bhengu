# File 23 — Zuxuru Business Growth OS Standalone HTML Prototype Audit

**Source reviewed:** `index(8).html`, a 41-line (minified CSS/JavaScript) self-contained HTML prototype titled *Zuxuru — Business Growth Operating System*. The file explicitly labels itself **“MVP test build”** and **“Local-first • no network required.”** This is not an operational investigation backend.

## Existing Bonga Bhengu architecture stays authoritative
Do not replace the Bonga Bhengu App shell, routing, authentication, tenant data, branding, four product families, billing or admin override. The source's Zuxuru sidebar is a historical workflow reference only. Integrate useful behavior into existing Digital Visibility, Business Growth, CRM and Creative Studio modules, and keep the current responsive layout.

## What the source actually implements
- Static HTML/CSS/JavaScript, no imports, network calls, backend, login or persistent database.
- Eight navigation views: Home, Investigate, Diagnosis, Opportunities, Solutions, Customers, Studio and Results.
- Responsive desktop sidebar and horizontally scrollable mobile navigation; grid cards collapse to one column below 900px.
- A business-name input, Enter-key support and a Start Investigation button.
- Six staged progress messages driven by a **260ms `setInterval`**, not actual search or background work.
- A local `state` object, overwritten by `build()` with canned identity/evidence/diagnosis/opportunity/customer/solution text.
- Explicit **Unverified** identity and notice that real digital footprint connectors are required.
- A generated content brief assembled from static text plus the typed business name, not an AI-model output.
- Basic `esc()` escaping of user-entered text in HTML string rendering.
- Results view with hard-coded **0%** and text that measurement requires future live connectors.
- A Phone Camera button that only shows an alert saying camera permission will be enabled later.

## Correctness and product-risk findings
1. **No live investigation:** The progress animation does not fetch public results, verify an identity, collect evidence or store provenance.
2. **Synthetic evidence:** The five `state.evidence` entries are workflow explanations, not observations about the entered business. One is labeled “Observed fact” for the fact that the user initiated a session, which must not be conflated with an external business finding.
3. **Static opportunity and customer cards:** These are clearly potential/framework entries; do not reclassify them as personalized verified intelligence.
4. **No real Studio camera:** The camera button is an alert, not `getUserMedia()`, permission handling, device capture or recording.
5. **No execution:** The Studio and solution steps do not create assets, publish content, open customer connections or measure sales.
6. **No persistence or authorization:** All state is in memory; refresh loses the session. There is no tenant ownership, role checks or backend audit.
7. **Potential null dereference:** Opening Diagnosis, Opportunities, Solutions or Customers before running an investigation can access empty/null state; `renderSolution()` reads `state.solution.title` when `solution` is initially null. Guard route state and show an empty/onboarding state instead.
8. **Placeholder result:** The 0% display is not a measured visibility score and must be replaced with “Not assessed” until real evidence exists.
9. **Mobile/accessibility:** Responsive layout exists, but navigation has no tab/ARIA state management or explicit focus transitions; progress lacks accessible live announcements.

## Additive migration contract
| Prototype element | Bonga home | Real acceptance |
|---|---|---|
| Business-name start | Digital Visibility / Business Scraper | Start investigation for a business even without a website or registration |
| Candidate identity gate | Business identity resolver | Verified candidates, source links, confidence and user confirmation |
| Evidence trail/replay | Evidence graph | Actual provider, URL, timestamp, status, provenance and repeatable investigation history |
| Diagnosis | Business Growth Intelligence | Evidence-linked root causes and clear “unknown” when data is missing |
| Opportunity map | Business Coach, Mentor and Converter | Ranked opportunities with impact, effort and evidence |
| Solutions and Hook → Offer → Lead → Close | Existing sales/CRM agents | Customer-specific offers, lead consent, authorized follow-up |
| Content brief | Existing Creative Studio | Versioned brief with provenance; real media generation only when connected |
| Phone camera | Existing Studio camera workflow | Permission-gated live preview/capture and accessible failure handling |
| Results | Existing analytics/monitoring | Measured before/after scores and verified business outcomes |

## CodeRabbit implementation/QA gates
- Preserve Bonga branding, existing product navigation and four-tier subscriptions; no new Zuxuru standalone application.
- Replace timer-based “investigation” with actual server job state and evidence or show **demo** unmistakably.
- Require tenant-scoped persistence and role/permission checks for saved investigations.
- Separate `observed`, `calculated`, `interpreted` and `recommended` records.
- Show “Not assessed” instead of 0% for missing data; never invent potential score or provider status.
- Guard every view when no investigation exists; test direct navigation and refresh.
- Test keyboard navigation, focus management, screen-reader labels and mobile overflow.
- Do not claim Camera, AI generation, publishing or customer intelligence works until there are real calls and receipts.

**Status:** Reviewed and aligned as a UI/workflow prototype audit. This commit adds documentation only; no runtime integration, API connection or deployment has occurred.
