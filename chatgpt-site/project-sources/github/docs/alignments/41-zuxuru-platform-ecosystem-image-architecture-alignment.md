# File 41 — ZUXURU Platform Architecture Ecosystem Image Alignment

**Source:** `ZUXURU Platform Architecture Ecosystem.png` (1,819,644 bytes). Image visually inspected. This is an **architecture infographic**, not executable source or proof of deployment.

## Actual diagram inventory
**People:** Business Owner, Marketing Team, Agency, Admin/Operator.
**Inputs:** Business Information, URLs & Websites, Social Media, Location/Maps, Keywords/Search, Images/Media, Manual Input.
**Customer app navigation:** Dashboard, Investigations, Insights, Opportunities, Content Studio, Campaigns, Execution, Reports.
**Orchestration:** central API/Orchestrator, coordinating routing, workflows, security and services.
**Five horizontal capability engines:**
1. Investigation — Agent-Reach, Maigret, Maps MCP, Website Intelligence, Search Intelligence.
2. Verification — Fact Checking, Source Verification, Data Enrichment, Duplicate Detection, Evidence Scoring.
3. Business Graph — Entity Linking, Relationship Mapping, Unified Business State, Graph Database, Knowledge Layer.
4. Intelligence — Score, Gap, Opportunity, Recommendation and Strategy engines.
5. Execution — Studio (ComfyUI), Social Publishing (Postiz), Website Actions, Connected Platforms, Action Gateway.
**Feedback:** Monitoring & Rescore (monitor, reinvestigate, compare, rescore, update graph, trigger autopilot), Autopilot (rules, agent/skill registries, connection passport, workflow automation).
**Infrastructure:** Supabase system of record (PostgreSQL, storage, realtime, RLS, APIs), Logto identity, ToolJet internal ops, Vault secure connections.
**Proposed AI and tooling:** OmniRoute, ComfyUI, Postiz, Agent-Reach, Maigret, Maps MCP, Website Intelligence, Search Intelligence.
**Lower panels:** component-to-repository matrix, grouped data model (Business, Digital Presence, Execution, Investigation, Performance, Agents, Evidence, Insights, System), eight-step pipeline Investigation→Verification→Business Graph→Intelligence→Execution→Monitoring→Rescore→Autopilot, and architecture rationale.

## Bonga architecture mapping — additive only
- Keep **Bonga Bhengu App** as the sole application shell and brand; existing frontend, repository, routes, tenant database, authentication, admin override and four product families remain authoritative.
- **Digital Visibility** receives Investigation→Verification→Business Graph→Score/Gap/Opportunity; Business Scraper discovers prospective customer needs/problems from traceable evidence.
- **Business Connection Intelligence** owns OAuth, scope grants, token lifecycle and revocation for Google/social/other owned systems; public discovery never implies account access.
- **Business Growth Intelligence** converts verified gaps into strategies, customer segmentation, proposals, agent tasks and measurable actions.
- **Execution Intelligence** routes approved jobs to existing **Creative Studio**, **Website Builder & Hosting**, **Digital Banner Builder** and campaign/publishing tools, storing external provider receipts.
- **Hunting/Fishing/Closer/Coach/Mentor/Fixer/Business Converter** consume shared graph/evidence data through scoped orchestration, not separate incompatible databases or autonomous unrestricted publishing.
- **Monitoring/Autopilot** run bounded scheduled jobs, idempotent actions, cost limits and explicit human approval; no unverified auto-success or fabricated scores.

## Important boundaries
- The image is a **proposal**. It does **not** establish that Supabase, Logto, ToolJet, Vault, OmniRoute, ComfyUI, Postiz, Agent-Reach, Maigret or Maps MCP is installed, configured, licensed or operational.
- Third-party tools are optional adapters; do not overwrite Bonga's existing auth, database, stack or hosting just because these logos appear.
- The component-to-repository matrix is an **intended responsibility map**, not verified repository inventory.
- Username discovery tools must not become unrestricted private-person dossiers; restrict to lawful business-relevant, public and consented evidence.
- Scores need documented denominators, timestamps, source links, confidence and unknown/contradictory states; no hardcoded performance claims.
- External writes (publishing, payments, deployments, messages) need owner consent, scoped OAuth, approvals and immutable audit receipts.
- Preserve Bonga's mobile accessibility, voice/sign-language support, country/currency/language controls and four-product subscription entitlements.

## CodeRabbit integration checklist
1. Inventory actual Bonga components, routes, data schema and working connectors; map diagram boxes to **existing / partial / missing / unsupported**.
2. Add only missing evidence, graph, verification and action contracts behind existing APIs.
3. Implement provider adapters incrementally with licensing checks, permission scopes, tenant isolation and safe fallback to explicit “not connected.”
4. Make the feedback loop evidence-based: capture provider receipts, measurements and time-bounded rescores.
5. Verify app-level tests, accessibility, job idempotency, audit history and admin overrides.
6. Never create a parallel Zuxuru app or swap the existing Bonga stack without explicit architectural approval.

**Status:** Image visually reviewed and source-specific alignment documented. GitHub commit is **documentation only**; no repo component was installed, deployed, connected or modified.
