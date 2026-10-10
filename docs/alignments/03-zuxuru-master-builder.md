# File 3 — Zuxuru Master Builder → Bonga Bhengu implementation alignment

Source: `Zuxuru_Master_Builder.txt`, dated 2026-10-07. **Bonga Bhengu App is the product and this repository is the implementation target.** References to the earlier Zuxuru AppDeploy app and GitHub access status are historical, not current deployment facts.

## Non-negotiable preservation
Keep existing `creative-studio/`, `website-builder/`, `subscriptions/`, `MODULES.md` and their working interfaces. Do not silently migrate the AppDeploy Zuxuru app, rename Bonga Bhengu to Zuxuru, or copy unrelated repositories.

## Implementation contracts
| Master Builder requirement | Existing home / additive layer | Acceptance evidence |
|---|---|---|
| FBL investigation, Maigret candidate | business-system/investigation | Name-only search; disambiguation; verified physical and digital sources; persisted evidence |
| FBI evidence intelligence, BFI visibility score | business-system/intelligence | Versioned deterministic rubric, coverage, per-dimension proof, saved score snapshots |
| CIA direct connection wizard | business-system/connections | Evidence ID preserved; OAuth/official provider authorization, actual provider read, revoke/reconnect |
| Customer dashboard and CEO Jarvis | existing app roles plus admin controls | Server-enforced tenant separation and owner-only operations |
| Growth hooks, intelligence, packages | business-system + subscriptions | Evidence-linked recommendations; current packages R299/R499/R699/R1,000 monthly from `subscriptions/catalog.py`; server entitlements and verified billing |
| Leads and CRM | business-system/leads | Tenant-scoped persisted CRUD, source, status, follow-up and outcome |
| Website and storefront builder | website-builder | Real preview, approval, deployment receipt, rollback; honest unavailable state |
| Studio production | creative-studio | Real asset/version records, permission-aware capture, approval, provider receipts |
| Jarvis agent orchestration | shared orchestration adapter | Tenant scope, task IDs, retries, durable workers, cancellation, budgets and audit events |
| Open-source candidates | MODULES.md registry | License/version, resource needs, adapter, test and costs verified before installation |
| Phone/tablet access and 54-country plan | existing responsive UI | Mobile end-to-end testing; actual language/voice coverage disclosed |

Pricing follows [Bonga's subscription catalog](../../subscriptions/catalog.py) and [subscription policy](../../subscriptions/README.md). The historical Zuxuru source mentions a seven-day trial, but Bonga's subscription sources do not establish a trial. Keep that term as an unapproved proposal until an explicit policy decision and billing implementation exist; do not grant or advertise trial access on the strength of this document.

## Data and security
Required entities: Users, Roles, Businesses, Branches, Profiles, Investigations, Evidence, Scores, Connections, Opportunities, Plans, Entitlements, Leads, Assets, Versions, Tasks, AgentRuns, Memory, Metrics and AuditEvents. All private reads/writes must be authorized server-side. Never expose credentials in source or browser; preserve evidence provenance, time, investigation run and identity match.

## Exact business loop
Business name → FBL evidence-backed investigation → persisted business profile → BFI versioned score → proof link → CIA verified connection → business intelligence → opportunity → plan/entitlement → Studio or website action → explicit approval → verified execution → measured outcome → rescore.

## Priority implementation slices
1. Inspect code and auth boundaries, inventory mock endpoints and persistence.
2. Add authenticated business/evidence storage and business-name investigation.
3. Add BFI scoring with coverage and provenance.
4. Add one real CIA adapter, verified read and revocation.
5. Wire plans, leads, Studio and builder only after prerequisites pass.
6. Add durable Jarvis jobs and monitored execution.

## CodeRabbit acceptance checklist
- No invented businesses, profiles, scores, leads, publish receipts or growth.
- No public evidence URL treated as proof of account ownership.
- No role access enforced solely by hiding UI.
- No fake payment or trial success.
- No unsupported agent/camera/provider marked live.
- No duplicate external actions on retry; auditable receipts.
- Customer A cannot access Customer B; CEO controls remain owner-only.
- Mobile test covers actual investigation, evidence, authorization and saved record.

**Status:** Specification aligned to current Bonga repository; implementation and end-to-end tests are not yet complete. CodeRabbit should review subsequent code PRs for these contracts.
