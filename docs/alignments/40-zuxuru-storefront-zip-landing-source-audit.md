# File 40 — Zuxuru Storefront ZIP: Landing Page Source Audit

**Source:** `Zuxuru_Storefront.zip` (4,462 bytes). Inspected both archive files: `zuxuru_storefront/README.md` (281 bytes) and `zuxuru_storefront/index.html` (11,425 bytes). The README explicitly calls it a **standalone responsive storefront prototype**, not a connected investigation application.

## Actual frontend behavior
- Single static HTML page with inline CSS/JavaScript and a sticky top bar.
- Sections: hero, business-name/location investigation form, three-step growth journey, illustrative visibility score, Studio value proposition, three legacy pricing cards, CTA and footer.
- Responsive grid collapses to one column below 800px; the desktop navigation links disappear on mobile with no replacement menu.
- `startInvestigation()` checks for a nonempty business name and uses `textContent` to display **“Investigation prepared...”**. It performs **no API call** and does not discover, verify, score or persist anything.
- “Sign in” and all three pricing plan CTA links have `href="#"`; no authentication, checkout, subscription activation or sales conversion is implemented.
- The sample visibility display is **39% current / 78% potential**, with no evidence, source or calculation; it is a marketing illustration only.
- “Phone capture”, “Creative production”, “Publish & monitor” are explanatory cards; no camera access, generation, upload, social authorization or publishing.
- Pricing cards are **Visibility R1,999/month; Growth R3,999/month; Scale R6,999/month** — a historical Zuxuru three-tier proposal, not the established Bonga four-tier subscription offer.
- Branding is light blue/violet with ZUXURU wordmark; not Bonga's authoritative brand or current app styling.

## Integration into the existing Bonga Bhengu App
1. **Do not deploy as a second storefront.** Retain the existing Bonga public landing page, site routing, authentication, marketplace, seller/admin dashboards, four product families, four subscription tiers and admin override.
2. Reuse selected **conversion copy and flow concepts**: “start with your business name,” investigate→verify→diagnose→act→measure, and evidence-led opportunity discovery.
3. Connect a Bonga-owned investigation form to the existing authorized Digital Visibility investigation API and real job status, with identity selection, sources, timestamps, confidence, explicit unknowns and error states. Never treat `Investigation prepared` as investigation completed.
4. Show a score only when calculated from verified public evidence; remove the hardcoded 39/78 display from production.
5. Use the Bonga **Creative Studio**, **Website Builder & Hosting**, **Digital Banner Builder** and Business Scraper/Growth/Closer workflows behind working CTAs.
6. Replace historical pricing cards with the verified **four-product selection** and subscription entitlements; do not silently change billing from this file.
7. Link sign-in, account creation, pricing and product CTAs to existing real routes; do not use `#` as a production placeholder.
8. Preserve mobile navigation, keyboard/screen-reader labels, country/currency/language controls and approved design tokens.

## Security and quality observations
- The form uses `textContent` rather than `innerHTML` for the user-entered business name, which avoids direct HTML injection in the result text.
- Form fields lack visible `label` elements, and there is no `aria-live` status announcement or keyboard-friendly form submission; add accessible labels, focus/error feedback and Enter-key handling.
- No server-side validation, rate limits, tenant isolation, consent or audit are possible in the standalone page; these must be provided by the Bonga app's real API.
- Sample scores and plan promises must be clearly labeled illustrations and not presented as live evidence or activated subscriptions.
- A mobile navigation alternative is required before production.

## CodeRabbit acceptance gates
- Confirm current Bonga storefront/landing-page architecture and preserve it.
- Add only missing copy, layout and investigation-entry features behind existing components.
- Verify real API request, loading/error/success states, source-backed identity matching and no fake completion.
- Verify all CTA routes, four-package entitlement checks and payment authorization.
- Test responsive menu, keyboard, screen-reader labels, contrast and translated/currency-aware content.
- Ensure no Zuxuru standalone route, obsolete prices or hardcoded sample scores leak into live Bonga production.

**Status:** Both ZIP entries reviewed. This is a **documentation-only** alignment commit; no storefront UI code, live API, billing change or deployment is included.
