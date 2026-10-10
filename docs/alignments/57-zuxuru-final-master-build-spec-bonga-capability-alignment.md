# File 57 — ZUXURU Final Master Build Specification: Bonga Capability Alignment

**Source:** `ZUXURU_FINAL_MASTER_BUILD_SPEC.md` (12,201 bytes; 543 indexed lines), read in full. Version 1.0 Final Master, historical Zuxuru SaaS build baseline. **Status: design specification, not proof of implemented software or connected providers.**

## Source inventory and key requirements
The specification defines a continuous business growth loop: `SEE → UNDERSTAND → CONNECT → IMPROVE → CREATE → DISTRIBUTE → MEASURE → LEARN → GROW → SEE AGAIN`. Its 17 pillars cover Founding Name/Digital Visibility, DeepSearch, Business Profile, Vault, Website/SEO, branding, digital visibility growth, brand/marketing strategies, customer/lead intelligence, market intelligence, Content Creation & Visibility Studio, execution, Business Graph, AI agents, Autopilot and Admin.

### Verified concepts
- **Evidence-first discovery:** public search, maps, social, directories, reviews, brand references and competitors; verified findings must be distinguished from inference and missing evidence.
- **Owner business profile:** shared identity, location, website, contact, services, assets, accounts, reviews, competitors and evidence.
- **Vault lifecycle:** `SELECT → AUTHORIZE → CONNECT → VERIFY → SYNC → READY → MONITOR`; provider authorization and real sync must be proven.
- **Growth:** website/SEO/brand gaps lead to prioritized strategies and approved improvements; measure before/after where observable.
- **Studio:** `CAPTURE → INGEST → ANALYSE → CREATE → APPROVE → DISTRIBUTE → MEASURE → LEARN`. Optional physical studio of 5–8 cameras with a six-camera reference arrangement, audio, switcher, multiview, recording and program output; must also accept phone, single-camera and uploaded footage. Optional AI transcription, captions, scene/speaker detection, clip repurposing and format adaptation. Basic capture must not depend on AI.
- **Campaigns:** configurable targets such as 10 assets/day are targets, **not evidence of ten generated files or guaranteed reach**. Never promise virality.
- **Experimentation:** observed social/search metrics, calculated measures and interpretation must be separately labeled; no fake universal algorithm score.
- **Business Graph:** shared memory of identity, visibility, brand, platforms, website, SEO, reviews, customers/leads, competition, strategies, content, publishing, performance, execution and autopilot events.
- **Agents:** discovery, visibility, website, SEO, brand, social, Google, competitor, customer, market, strategy, studio, execution and autopilot roles as internal workers, not separately billed products.
- **Execution/Autopilot:** `APPROVED PLAN → EXECUTE → VERIFY → RECORD → MEASURE`; ongoing automation bounded by consent, permissions and approval policy.
- **Admin:** oversight of engines, agents, integrations, workflows, jobs, errors, health, logs and permissions.
- **Six historical build phases:** Foundation, Connections, Visibility Growth, Studio, Intelligence and Autopilot.
- **Definition of working:** one real end-to-end path from entered business name through evidence-backed discovery, authorized connection, data ingestion, improvement, verified execution, measurement and next recommendation; separate genuine Studio path through upload, processing, approval, publication receipt and performance.

## Bonga Bhengu App: additive integration only
**Bonga Bhengu App is the current authoritative platform.** This Zuxuru document is a capability donor; do not create a replacement Zuxuru app, overwrite navigation/auth/database, change current deployment or substitute the historical assertion “Zuxuru is the unified product” for Bonga's master identity.

| Bonga existing product/service | Reusable Zuxuru capability | Implementation boundary |
| --- | --- | --- |
| **Digital Visibility** | DeepSearch, evidence model, website/SEO/brand intelligence, before/after measures | Public sources and consented private sources distinguished; no fabricated scores |
| **Website Builder & Hosting** | Gap-to-site improvement and CMS connection | Owner-approved edits, verified deploy receipts, existing builder retained |
| **Creative Studio** | Capture, six-camera reference, media intake, transcription, repurposing, publishing | Real devices and stored assets required; no decorative LIVE claims |
| **Digital Banner Builder** | Branding assets, graphics, variants, campaigns | Real output files and approval, not planned asset counts |
| **Business Connection Intelligence** | Vault, plugs, authorized Google/social/CMS connections | Existing wizard and provider adapters; verified OAuth/scopes/revocation |
| **Business Growth / Execution Intelligence** | Strategy, prioritized recommendations, jobs and outcomes | Owner-approved changes, audited external actions and provider receipts |
| **Shared Business Master File / Business Graph** | Common business context and evidence lineage | Extend existing tenant schema, do not create second business database |
| **AI employees** | Source roles for specialist discovery, strategy, studio, execution and monitoring | Preserve Bonga's Hunting, Fishing, Closer, Business Scraper, Business Converter, Coach/Mentor, Fixer, Amplifier and other agents |
| **Admin** | Health, permissions, policies, jobs and audit | Preserve full admin override and tenant isolation |

Preserve Bonga's four subscription package structure and pricing, localization/currency/language support, accessibility for blind/deaf users, mobile-first UI, and its established design and architecture.

## External provider interpretation
Supabase, Netlify, Logto, Postiz, ComfyUI, OmniRoute, Agent-Reach, ToolJet and GitHub are **proposed replaceable capability providers**. The source explicitly warns they are not necessarily live. Inventory existing Bonga tools and check actual authorization, licensing, capacity, privacy, rate limits and receipts before enabling any adapter. No paid service is mandatory solely because it appears in this specification.

## Specific conflicts and safeguards
1. **Historical product boundary:** source says Zuxuru is not a generic CRM/accounting/project manager/design app; Bonga is broader and already includes four product families. Treat this boundary as applying only to the donor's visibility subsystem.
2. **“Founding Name” identity:** a user-entered business name is owner-supplied, not independently verified. Require business disambiguation and evidence provenance.
3. **Studio camera plan:** six-camera diagram is an equipment/workflow design, not proof of browser capture, real camera connectivity or livestream support.
4. **Content target:** 10 assets/day is configurable and subject to plan entitlements, real processing capacity, approval and platform policies; never claim output without asset IDs.
5. **Growth scoring:** no universal score or ranking from synthetic data. Publish source-specific evidence, calculation, timestamps and unknown states.
6. **Autopilot:** no self-authorized publishing, payment, outreach or changes. Require per-tenant limits, revocation, human approvals and admin override.
7. **Customer data:** minimize and protect personal data; Business Scraper diagnoses customer needs/problems, not private-person dossiers.

## CodeRabbit delivery and acceptance gates
1. Inspect the actual Bonga repository; mark every Zuxuru pillar **existing / partial / missing / duplicate / conflicting** and link to existing modules.
2. Implement one real **visibility vertical slice**: candidate business → confirmed identity → public evidence → verified finding → approved connection → authorized data → actionable gap → verified improvement → measured result.
3. Implement one real **Studio vertical slice**: uploaded bytes → durable tenant-scoped asset → real processing/variant → preview/approval → supported publishing → provider receipt → metrics.
4. Test connection lifecycle including scope refusal, token expiry, revocation, provider errors, retries and rate limits.
5. Test jobs for idempotency, rollback, logs, owner/admin approval, isolation and truthful state reporting.
6. Verify accessible keyboard/screen-reader/mobile experience and localization; preserve current four-package entitlements.
7. Do not mark any feature live based on a UI screen, specification, mock campaign, simulated score or timer.
8. Keep CodeRabbit review, branch merge and deployment as separate explicit steps requiring their own verified results.

**Status:** Specification read and aligned to existing Bonga architecture. This GitHub commit is **documentation-only**; no executable integration, connection, merge or deployment is claimed.
