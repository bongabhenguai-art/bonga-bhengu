# File 56 — ZUXURU Implementation Blueprint: Bonga Release-Gate and Contract Alignment

**Source:** `ZUXURU_IMPLEMENTATION_BLUEPRINT.md` (3,205 bytes; 132 indexed lines). Read in full. This is a **proposed build sequence and architecture document**, not executable code, a database migration or evidence of a working deployment.

## Verified blueprint contents
The source proposes:
- A standalone `zuxuru/` directory with `app/`, `components/`, 15 named modules (`discovery`, `visibility`, `business-profile`, `vault`, `website`, `seo`, `branding`, `strategy`, `content-studio`, `distribution`, `analytics`, `business-graph`, `agents`, `execution`, `autopilot`), `integrations/`, `database/`, `tests/`, and `docs/`.
- Shared identifier candidates: `organization_id`, `business_id`, `user_id`, `connection_id`, `asset_id`, `campaign_id`, `experiment_id`, `job_id`.
- 22 proposed data domains including businesses, memberships, assets, connections, evidence, visibility findings, content versions, campaigns, publishing jobs, metrics, experiments, recommendations, agent runs, autopilot events and audit logs.
- An **18-step implementation sequence** from repository/auth/data foundation through Business Profile, real discovery, Vault, one verified provider, SEO/brand strategy, Studio, publishing, analytics, Business Graph, agents and controlled Autopilot.
- External integration test loop: `CONNECT → VERIFY → SYNC → ACTION → VERIFY → ERROR → RECONNECT`.
- **Seven release gates A–G**: Foundation, Intelligence, Connection, Execution, Studio, Learning, Autopilot.

## Architecture-preserving decision
**Do not recreate the `zuxuru/` tree or replace the existing Bonga Bhengu App.** Bonga's real repository, current code layout, auth, database, tenant model, four products, subscription entitlements, admin override, accessible UI and deployment flow are authoritative. The blueprint's modules, identifiers and data domains are **interoperability proposals**; first inspect existing equivalents and extend only genuinely missing fields/services.

## Bonga release-gate mapping
| Gate | Bonga capability | Required production evidence |
| --- | --- | --- |
| **A — Foundation** | Existing user/business onboarding and Business Master File | Authenticated tenant-scoped create/read/update, permissions and audit |
| **B — Intelligence** | Digital Visibility and Business Scraper customer-needs diagnosis | Real public sources, candidate identity confirmation, evidence provenance, timestamp, reproducible findings |
| **C — Connection** | Business Connection Intelligence / Connection Wizard | Official OAuth or authorized credential flow, scope, verified provider read, sync health, revocation |
| **D — Execution** | Business Growth and Execution Intelligence, Website Builder & Hosting | Approved action, durable job, real changed output, provider/deployment receipt, rollback/error path |
| **E — Studio** | Creative Studio and Digital Banner Builder | Actual uploaded bytes, stored/generated asset IDs, human review, supported publishing receipt |
| **F — Learning** | Analytics, rescoring, AI business coach/mentor and Business Converter | Provider-grounded metrics, before/after methodology, recommendations traceable to outcomes |
| **G — Autopilot** | Bonga AI employees (Hunting, Fishing, Closer, Fixer, Amplifier and orchestration) | Tenant policy, least privilege, per-action approval, idempotency, limits, kill switch and admin override |

**Important:** These gates are acceptance criteria, **not claims that Bonga currently passes them**. Actual repository code, tests and live provider results must establish readiness.

## Shared-contract integration approach
- Inventory current Bonga IDs and entity tables before adding any new schema. Prefer existing tenant/business/user keys; create compatibility mappings only where required.
- Make `connection_id`, `asset_id`, `campaign_id` and `job_id` durable across the existing Connection Wizard, Studio, Execution Intelligence and reporting, without introducing a second database.
- Keep public findings, owner-confirmed fields and OAuth-authorized private analytics separate, each with source/actor/time.
- Model publishing as `requested → authorized → queued → running → provider_accepted → verified` with explicit failure/retry/cancel states, not timer-driven success.
- Protect all tenant queries, assets, agent runs and audit events with existing authorization controls.
- Add feature flags, provider health checks, quotas and approval gates; require admin override and rollback for external writes.

## Recommended incremental CodeRabbit work order
1. **Audit, do not rebuild:** inspect existing Bonga routes, components, DB, auth, integrations and tests; create existing/partial/missing/conflicting map.
2. **Close foundational gaps:** tenant ownership, Business Master File, data provenance, access tests.
3. **Prove one real vertical slice:** investigate one real business → owner confirms → one approved connector → one genuine action → verified result and metrics.
4. **Reuse current builders:** Website Builder, Studio, Banner Builder and Growth/Visibility interfaces; fill missing adapters and durable jobs.
5. **Expand only after passing tests:** provider failures, OAuth expiry, rate limits, retries, tenant isolation, accessible mobile UX, localization and admin override.
6. **Autopilot last:** enable scoped AI employees only after approval, observability, billing/usage and kill-switch policies are demonstrated.

## CodeRabbit acceptance checklist
- No new `zuxuru/` app root, second auth provider, duplicate DB or altered Bonga subscription pricing.
- A–G gate evidence includes reproducible tests and real execution receipts; UI presence alone never counts.
- Verify `CONNECT → VERIFY → SYNC → ACTION → VERIFY → ERROR → RECONNECT` on at least one real provider.
- All business data and media tenant-scoped, source-provenanced and securely stored.
- Real asset creation/publishing, not generated counts or simulated success.
- Existing admin override, approval policy and audit logs remain functional.
- Maintain accessible mobile and multilingual/country/currency workflows.

**Status:** Blueprint read and aligned. This GitHub commit is **documentation-only**; no code integration, schema migration, live connection, CodeRabbit approval or deployment was performed.
