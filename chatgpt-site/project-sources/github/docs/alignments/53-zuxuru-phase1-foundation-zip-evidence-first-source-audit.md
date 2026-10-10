# File 53 — Zuxuru Phase 1 Foundation ZIP: Evidence-First UI and Next.js Source Audit

**Source:** `Zuxuru-Phase1-Foundation.zip` (10,099 bytes). Archive extracted and inspected: `index.html` (standalone browser build), `README.md`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, and `package.json`. This is a small Next.js/React 19 prototype with a standalone HTML counterpart, **not** a deployed or connected investigation service.

## Verified source functionality
- `package.json` declares **Next 16.0.1**, **React 19.2.0** and `next dev/build/start` scripts; no backend, auth, database, external provider SDK or test scripts.
- Onboarding accepts **business name** (required) and optional website, industry and location.
- Clicking **Create business profile** waits **700 ms**, creates a client-side object, assigns a **fixed foundation score of 25**, stores it in browser `localStorage` under `zuxuru-business` and opens a dashboard. The timer is UI-only; no remote creation or verification happens.
- Dashboard displays visibility score **25/100**, **1 verified finding**, **0 connections** and **Connect** as next action.
- Four seeded findings: “Business identity — Verified” because the owner typed a name; website, social and local/search visibility remain **Not verified**, with connection/discovery requirements clearly described.
- Navigation tabs: **Overview**, **Visibility**, **Business Profile**, **Vault**, **Studio**. Business Profile displays saved input; unimplemented views display an honest “is next” empty state instead of claiming working tools.
- **Reset demo** clears the single browser record; there is no multi-user persistence, tenant boundary, user login or server-side deletion.
- The standalone `index.html` provides a similar interface; it is an alternate presentation of the same foundation, not a second product.

## Strengths worth preserving
1. Explicit **verified vs not verified** evidence badges and avoidance of fabricated website/social/search results.
2. Clear admission that live discovery, OAuth, provider APIs, Supabase persistence and publishing are **not implemented**.
3. Optional onboarding fields reduce friction; a simple owner-editable profile can seed future evidence matching.
4. React JSX renders entered text safely by default rather than interpolating untrusted names into HTML.
5. Empty states acknowledge that Vault, Studio and connected intelligence are future work.

## Risks and correctness gaps
- **“Business identity — Verified” is overstated:** entering a business name is an **owner-supplied claim**, not legal or provider-verified business identity. Use distinct `owner_supplied`, `owner_confirmed`, `provider_verified` statuses.
- **25/100 is not a visibility measurement.** It is a fixed baseline for profile creation. Prefer **Not scored / insufficient evidence** until a reproducible source-backed investigation completes.
- The fixed **“1 verified finding”** count reflects the overstated owner-supplied identity and should not be reported as independently verified evidence.
- The **700 ms timeout** simulates loading and must not imply a server write or verified scan.
- `JSON.parse(localStorage.getItem(...))` lacks a corrupted-data recovery path and schema validation.
- A single origin-wide `zuxuru-business` record is not a secure multi-tenant data model.
- User-supplied website URL is not proof of site ownership; validate URL safety and keep claims separate from OAuth/domain verification.
- “Edit profile” navigation displays existing fields, but no complete edit/save form was observed in the reviewed React source.
- No evidence provider, account ownership proof, durable audit, publishing, media processing, accessibility tests or production deployment.

## Additive Bonga Bhengu App alignment
- **Bonga architecture is authoritative:** preserve existing app shell, routes, auth, tenant database, branding, admin override, country/language/currency/accessibility and four product families with four subscription packages.
- **Digital Visibility / Business Visibility Intelligence:** reuse the evidence-state vocabulary and honest missing-connection UI; adapt onboarding to the existing Business Master File and real identity candidate confirmation (files 47–48).
- **Business Connection Intelligence:** treat Vault as a future screen pattern only. Real OAuth, scope, token health, consent and revocation must come from Bonga's existing connector system.
- **Business Growth Intelligence:** start with explicit unknown findings and build plans only after evidence-backed diagnosis. Business Scraper identifies customer needs/problems rather than collecting personal dossiers.
- **Website Builder & Hosting:** prefill only confirmed business facts; require edit and publish approval.
- **Creative Studio and Digital Banner Builder:** use current operational generators, asset storage and approval; do not import empty prototype tabs as functional services.
- **AI employees / execution:** Hunting, Fishing, Closer, Coach, Mentor, Fixer and Business Converter operate on permissioned tenant context with verifiable actions and receipts.
- **Design:** use Bonga's existing theme/navigation and accessible mobile UX, not this prototype's separate light Zuxuru shell.

## CodeRabbit acceptance gates
1. Compare Bonga's current onboarding and Business Master File schema before adding fields or components.
2. Implement separate **owner-supplied**, **owner-confirmed**, **public-source corroborated**, **account-authorized**, and **provider-verified** evidence states.
3. Never display a visibility score from profile creation alone; use source-backed computation or an explicit insufficient-evidence state.
4. Persist profiles in the existing tenant database with authenticated ownership, audit, correction, schema validation and safe recovery.
5. Verify real provider connections and investigation evidence before showing Connected/Verified.
6. Test invalid or malicious websites, localStorage corruption, duplicate business names, tenant isolation, keyboard/screen-reader/mobile behavior and error handling.
7. Preserve existing modules and subscription entitlements; avoid introducing a second Zuxuru application.

**Status:** Archive source inspected. This GitHub push is **documentation-only**: no Next.js source has been imported, no external connection has been verified and no app deployment has occurred.
