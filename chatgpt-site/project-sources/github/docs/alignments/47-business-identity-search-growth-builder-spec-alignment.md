# File 47 — Fukulisane Business Identity Search & Digital Visibility Growth Builder

**Source:** `Fukulisane_Business_Identity_and_Growth_Builder_Spec(1).md` (8,446 bytes, 363 indexed lines). Source read in full. The Library also holds `Fukulisane_Business_Identity_and_Growth_Builder_Spec.md`, with the same 8,446-byte size and matching retrieved text. Treat `(1)` as a duplicate-named specification, not a second app or second identity engine.

## Requirements actually in the document
1. **Business-name-first search** with optional location, country, company, industry, website and other corroborating business signals. Optional details must not block starting an investigation.
2. **Replaceable permitted search providers:** public search, maps/business listings, websites and publicly accessible professional profiles, only where provider terms and privacy rules permit. Named AI vendors are possible adapters, not proven connected services.
3. **Candidate disambiguation:** present approximately 4–5 plausible **real source-backed** matches where available; actions Select This Business, None of These, Search Again. Never invent extra candidates merely to reach five.
4. **Explainable confidence:** cross-check name, company, location, domain, industry and independent public sources. Do not infer ownership from a matching name alone.
5. **Digital-profile confirmation:** show discovered website and business social profiles; user can confirm, remove false matches or correct them before analysis. Confirmation by a user is not equivalent to provider-verified account ownership.
6. **Business Master File:** centralized identity, permitted business contact fields, assets, source references, discovery timestamps and user confirmations, with provenance for important attributes.
7. **Digital Visibility Growth Builder:** use that shared record to assess website, local presence, SEO, content, branding, reputation, conversion and business information consistency.
8. **Recommendation→action:** prioritize verified gaps and connect to existing website, business-profile, SEO, social, creative/video, reputation, publishing, reporting and rescoring capabilities.
9. **Website Builder handoff:** prefill Home/About/Services/Products/Gallery/Reviews/Contact/Location/WhatsApp/SEO only with confirmed, appropriately authorized facts; require preview and approval before publishing.
10. **Continuous loop:** Search → Identify → Confirm → Score → Diagnose → Build → Publish → Rescan → Rescore, attributing improvement to documented work.
11. **Security/privacy:** existing auth and business records, server-side secrets, connector enable/disable, deduplication, owner corrections and audit trails. Respect provider rules, no bypass of CAPTCHAs/paywalls/logins.
12. **Three evidence classes:** public discovery, user-confirmed details and owner-authorized connected account data must remain distinct.

## Source examples are NOT real findings
The source's Bonga Bhengu candidate cards in different cities, illustrative websites/social profiles, 48/100 score, website 35, social 31, Google 52 and “before 48 → after 72” are **demonstration values**. Do not persist or display them as discovered facts, real personal profiles or measured customer improvements. Public-person name searching must be limited to legitimate business-identity matching; do not collect private-person dossiers.

## Architecture-preserving Bonga Bhengu App integration
- **Existing Bonga Bhengu App remains master.** Keep repository `bongabhenguai-art/bonga-bhengu`, current routes/UI, tenant database, auth, admin override, four product families and four-tier subscriptions.
- **Digital Visibility / Business Visibility Intelligence:** integrate candidate discovery, business confirmation, evidence records, reproducible scoring and problem diagnosis within existing investigation services.
- **Business Connection Intelligence:** handle separate scoped OAuth/owner account claims, credential vault, token refresh/revoke and connected source status.
- **Business Growth Intelligence:** use the Business Master File to produce prioritized recommendations and measurable plans; Business Scraper identifies business needs and problems, not contact lists.
- **Website Builder & Hosting:** reuse existing builder with confirmed business fields, previews, edits, approval, deployment and rollback.
- **Creative Studio / Digital Banner Builder:** reuse existing asset production and publishing approval workflows, drawing only tenant-authorized brand information.
- **Hunting, Fishing, Closer, Business Converter, Coach, Mentor and Fixer:** operate on permissioned, source-grounded business context and measured outcomes.
- **Shared data model:** extend current business record with `identity_candidates`, `identity_matches`, `business_profiles`, `evidence_sources`, `field_provenance`, `owner_confirmations`, `score_runs` and `growth_actions` **only where missing**; do not introduce a second master database.
- **Permissions:** distinguish candidate selection, business-identity confirmation, proof of account ownership, and authorization to read/write connected systems. Each is a separate event with actor, tenant, timestamp and audit receipt.

## CodeRabbit acceptance criteria
1. Inspect current Bonga business model, investigation, search providers, identity and connection wizard; map existing/partial/missing before implementation.
2. Search real permitted providers, deduplicate cross-source matches, explain ranking and support zero/one/many results and manual entry.
3. Ensure candidate cards show **source and uncertainty**, with None of These and correction flow; do not synthesize fake matches.
4. Validate business identity and connected-account ownership separately; require explicit scopes before accessing private data.
5. Persist tenant-scoped master records and immutable provenance, with safe merging, owner corrections and audit history.
6. Pass only confirmed facts to existing builders and Studio; user reviews before any external publish.
7. Rescoring must use actual before/after evidence, timestamps, methodology and execution receipts; no fixed 48→72 demo result.
8. Test privacy, false-positive identities, duplicate profiles, expired/revoked OAuth, malicious URLs, cross-tenant access, accessible mobile/voice interfaces and localization.
9. No new Fukulisane standalone app, duplicate search engine or historical pricing changes.

**Status:** Complete specification reviewed; documentation-only alignment commit. No source implementation, provider connection, identity verification, CodeRabbit approval or deployment is claimed.
