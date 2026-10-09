# File 34 — Zuxuru Build Specification ZIP: Complete Architecture Alignment

**Source:** `Zuxuru_Build_Spec_Files.zip` (18,177 bytes). Materialized and inspected as an archive. It contains **18 Markdown files**: `INDEX.md`, `00_MASTER_SYSTEM.md` through `16_VERTICAL_PACKAGE_MATRIX.md`. This is a **requirements/specification pack**, not executable application source.

## Reviewed file-by-file inventory
| File | Actual specification | Bonga Bhengu App alignment |
|---|---|---|
| 00_MASTER_SYSTEM | Shared experience, intelligence, CIA, Jarvis, Studio and data layers; evidence-first business and sales loops | Keep Bonga as master shell; reuse shared intelligence contracts |
| 01_APP_RUNTIME | Business-name public entry, connected investigation, projects, measurement; proposed routes and streaming | Map to **existing routes**; add real event streams without replacing router |
| 02_JARVIS_ADAPTATION | Describes `omnigentx/jarvis` reference FastAPI/agents/MCP/memory/team pattern | Orchestration pattern only; repository details **not independently verified**; do not transplant wholesale |
| 03_MALL_SYSTEM | Mall → tenant discovery, profiles, scores, campaigns, permissions | Existing mall/marketplace vertical; mall authorization never equals tenant account consent |
| 04_COMPANY_SYSTEM | Public business-name investigation, evidence score, free-to-paid journey, branch detection | Digital Visibility + Business Scraper customer-needs discovery |
| 05_FASHION_DESIGN_SYSTEM | Designer/brand/collection/products/custom/corporate fashion and marketing | Existing fashion vertical, design-before-production and seller workflows |
| 06_CIA_CONNECT_INTELLIGENCE_ARCHITECTURE | Discover→authorize→sync→verify; connector methods, scopes, revocation | Existing Connection Wizard; actual OAuth and server-side credentials |
| 07_STUDIO | Capture→transcribe→edit→generate→approve→publish→measure | Existing Creative Studio and shared media storage |
| 08_BUILDER_WEBSITE | Detect→blueprint→build→test→approve→deploy→rollback | Existing Website Builder & Hosting; no second builder |
| 09_GROWTH_ENGINES | Hook, opportunity, leads, personalization, Closer and learning loops | Existing Hunting/Fishing/Closer, Business Converter and Growth Intelligence |
| 10_PACKAGES | Public score, historic R1,999/R3,999/R6,999 plans and enterprise custom; alternate pilot R999/R2,499/R4,999 | **Historical only**; do not overwrite Bonga's current four-product subscription selection |
| 11_DATA_MODEL | Business, branch, mall, evidence, score, opportunity, lead, project, agent, asset, approval, audit entities | Extend existing tenant-scoped schema; no database replacement |
| 12_API_AND_WORKFLOWS | Proposed public/business/mall/CIA/Studio/Builder/growth/agent REST routes and progress event | Contract candidates, **not proof endpoints exist**; version and authorize against existing API |
| 13_SECURITY_APPROVALS | Least privilege, no LLM credentials, GREEN/YELLOW/RED action classes and audit events | Enforce Bonga admin override and explicit approval for external writes, spend and destructive actions |
| 14_BUILD_PHASES | Foundation→CIA→Growth→Jarvis→Studio→Builder→verticals→enterprise; definition of done | Use as dependency and QA checklist, not instruction to restart a built app |
| 15_JARVIS_TO_ZUXURU_FILE_MAP | Proposed translation of Jarvis backend files, routes, services, team templates, skills | Verify actual current dependencies/licenses first; reuse patterns, never blindly rename files |
| 16_VERTICAL_PACKAGE_MATRIX | Company, Mall, Business Tree, Fashion, Enterprise workflows and modular package assembly | Existing product families plus optional vertical-specific services |

## Core architecture to preserve
**Bonga Bhengu App is the only authoritative application.** Maintain its existing architecture, repository, UI, auth, tenancy, database, admin controls, billing, modules and four product families:
1. Website Builder & Hosting.
2. Digital Visibility.
3. Creative Studio.
4. Digital Banner Builder.

The source pack's `/mall`, `/fashion`, `/studio`, `/builder`, `/packages` routes are examples, not permission to overwrite existing Bonga routes. Mall, multi-branch Business Tree and fashion are **vertical workflows** over shared intelligence, not replacement applications.

## Integration and workflow contract
**Public:** business name → identify candidates → verify public observations → explain uncertainty → score only from traceable evidence → diagnose needs → recommend next action.

**Owner-authorized:** permission request → official provider authorization → scoped sync → evidence → opportunity → package proposal → approval → project → actual Studio/Builder/CRM/marketing execution → provider receipts → measurements → rescore.

**Agents:** Existing Bonga orchestrator selects specialist employees based on the business problem and allowed tools. Business Scraper identifies needs/problems, Hunting/Fishing support acquisition and offer design, Closer handles consented closing, and Fixer/Coach/Mentor support delivery. Never run every agent on every request.

**Event contract:** event ID, tenant/business/project/workflow IDs, action, status, actor, timestamp, evidence references, approval ID and outcome. Stream only genuine persisted job progress, not simulated timers.

## Conflicts and risk controls
- **Historical pricing conflict:** `10_PACKAGES.md` proposes R1,999/R3,999/R6,999 and pilot R999/R2,499/R4,999; these are **not** Bonga's established four-tier subscriptions (choose 1 / 2 / 3 / all 4 products). Do not update billing or entitlement tables from this ZIP.
- **Third-party runtime:** `omnigentx/jarvis` is a proposed external reference; current source, licensing, APIs and compatibility have not been checked in this review.
- **No proof of implementation:** API paths, agent names, streaming and integration descriptions are **specifications**, not evidence that services run.
- **Privacy and permissions:** Public research does not authorize accessing private accounts; mall management cannot automatically approve tenant-owned platform writes.
- **Action gating:** public reads and analysis are low risk; drafts and profile edits require appropriate review; publishing, messaging, money, production deployments, disconnects and deletion need explicit stronger authorization.
- **Evidence:** no invented scores, lead counts, asset outputs, connected statuses or completed actions.
- **Accessibility:** preserve Bonga mobile, country/language/currency selection, voice and screen-reader accessibility.

## CodeRabbit incremental implementation plan
1. Inventory existing Bonga routes, schema, modules, agents, permissions and provider connectors.
2. Create a **gap matrix** comparing the 17 source specifications against working Bonga capabilities; classify existing, missing, partially implemented and unsupported.
3. Prioritize shared evidence/approval/event contracts, connector health, real execution receipts and tests **without rewriting** the app.
4. Add vertical adapters for Mall/Business Tree/Fashion only where existing capabilities are insufficient.
5. Preserve four subscription entitlements; keep historical pricing in archival docs only.
6. Require tests for tenant isolation, OAuth revoke/expiry, agent tool limits, human approvals, execution idempotency, mobile accessibility and actual output artifacts.
7. Only call a feature complete when UI, API, persistence, permissions, audit, error handling, tests and measurable receipts are working.

**Status:** All 18 ZIP entries reviewed and mapped; documentation-only GitHub commit. No ZIP source has been merged into runtime, no external Jarvis dependency installed, no CodeRabbit review approved and no deployment performed.
