# File 42 — Zuxuru Ecosystem Architecture Infographic: Customer Journey and Pricing Alignment

**Source:** `Zuxuru Ecosystem Architecture Infographic.png` (1,996,872 bytes). Visually reviewed the complete image. This is an **illustrative architecture and product-marketing diagram**, not running application code or verified deployed integrations.

## What this specific image shows
- Header: `ZUXURU STORE FRONT (Customer Experience)`, journey `Discover → Analyse → Improve → Grow`, navigation Dashboard, Investigation, Visibility Score, Opportunities, Strategy, Studio, Campaigns, Reports.
- Zuxuru Core: User Management, Workflow Orchestration, Agent & Skill Routing, Business Graph Access, Policy & Permissions, API Gateway.
- Investigation Engine: Discovery Agent, Agent-Reach, Maigret, Maps MCP, Website Intelligence, Search Intelligence.
- Verification Engine: Identity Matching, Data Enrichment, Duplicate Detection, Evidence Scoring.
- Business Graph: Unified Business Model, Knowledge Layer, Graph Database, Business Context.
- Intelligence Engine: Visibility Scoring, Gap Analysis, Competitor Engine, Opportunity Engine, Strategy Engine.
- Execution Engine: Studio (ComfyUI), Social Publishing (Postiz), Website Actions, Connected Platforms, Action Gateway.
- Monitoring & Rescore: Change Detection, Performance Metrics, Rescore Engine, Alerts & Notifications, Audit & Logs.
- Autopilot: Rules Engine, Agent Registry, Skill Registry, Connection Passport, Workflow Automation.
- Data/infrastructure candidates: Supabase/PostgreSQL/Storage/Realtime/RLS, Logto, ToolJet, Vault, OmniRoute and provider-specific discovery/publishing tools.
- **Customer journey:** `1 Investigate → 2 Verify → 3 Analyse → 4 Plan → 5 Monitor → 7 Grow` visually shown, with a separate unnumbered `Create, publish & execute` icon between Plan and Monitor. The intended end-to-end sequence is **Investigate → Verify → Analyse → Plan → Execute → Monitor → Grow**. The numbering in the source infographic skips 6; treat this as a design defect, not product logic.
- **Key features panel:** Visibility Score, Opportunity Engine, Fukulisane Studio, Campaigns, Reports, Autopilot.
- **Historical pricing cards:** Starter **R1,999/month** (1 business, basic investigation, visibility score, top 3 opportunities); Growth **R3,999/month** (up to 5 businesses, advanced insights, Studio + publishing, automations); Pro **R6,999/month** (unlimited businesses, full intelligence, custom strategy, priority support). These are illustrative Zuxuru plans, **not Bonga's current entitlements or billing**.

## Distinction from file 41
File 41 (`ZUXURU Platform Architecture Ecosystem.png`) emphasizes component-to-repository matrix, technical data model and eight-stage pipeline. File 42 presents a **consumer storefront, seven-stage customer journey, product features and historical three-tier sales packaging**. It is a sibling visual, not an additional architecture or a second app to deploy.

## Additive alignment to Bonga Bhengu App
- Preserve the existing **Bonga Bhengu App** application, repository, design system, routes, auth, tenant database, admin override and the four product families: Website Builder & Hosting, Digital Visibility, Creative Studio, Digital Banner Builder.
- Reuse the customer journey as a clear guided **Digital Visibility onboarding and conversion flow**: enter business → public investigation → source verification → explain gaps → recommend plan → approve execution → measure improvements.
- Existing Business Scraper diagnoses customer needs and problems; Business Growth Intelligence, Hunting/Fishing, Business Converter and Closer propose qualified, consented next steps.
- Reuse existing Studio, Website Builder and Banner Builder for authorized outputs; do not add a duplicate Zuxuru storefront, second data spine or new orchestration shell.
- Maintain the **four Bonga product-selection subscription tiers** (choose one, two, three or all four), subject to live billing verification. Do **not** import historical R1,999/R3,999/R6,999 plans.
- Source logos indicate possible adapters only: check actual installed providers, license, authentication, quota, tenancy and health before describing a connection as active.
- Visibility scores, campaign results and ROI must derive from real time-stamped evidence and provider receipts; no fixed numbers or fake success.
- Preserve accessibility, country/language/currency, voice/sign-language options and mobile responsive navigation.

## CodeRabbit QA checklist
1. Compare source journey with existing Bonga onboarding and retain existing shell; add only missing screens/states.
2. Correct infographic's skipped step numbering if adapting visuals; distinguish Plan, Execute and Monitor.
3. Verify real public business matching, evidence/provenance, score calculation and owner confirmation.
4. Require scoped OAuth, approvals, tenant-safe jobs and receipts before connected publishing/website changes.
5. Link offers and CTAs to existing Bonga subscriptions, not historical price cards.
6. Test keyboard/mobile/assistive navigation, error states, translated copy and admin override.
7. Avoid importing a second app, duplicate architecture or unsupported “live” platform claims.

**Status:** Image visually reviewed and source-specific alignment committed as **documentation only**. No actual app code, integrations, prices or deployment changed.
