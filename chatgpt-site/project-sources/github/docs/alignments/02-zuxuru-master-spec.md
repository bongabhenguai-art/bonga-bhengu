# File 2 — ZUXURU Master App Build & Alignment Specification

Source: `ZUXURU_Master_App_Build_Alignment_Specification.md` (v1.0). This is an alignment implementation contract, not a claim of completed integration.

## Identity precedence
The source calls Zuxuru the primary brand. **Do not apply that rename.** Bonga Bhengu App is the primary product; Zuxuru capabilities are imported into its existing architecture as appropriate. Preserve existing code, routes, schemas and modules.

## Capability-by-capability destination

| Source sections | Capability | Bonga destination | Required behavior |
|---|---|---|---|
| 5–7 | Business name, DeepSearch, evidence, profile | business-system | Public discovery with verifiable source links, confidence and timestamp; persist profile |
| 8–10, 28 | Vault, authorization, connectors | business-system connection layer | OAuth where available, verified sync, revocation, scoped permissions, no browser secrets |
| 11–18 | SEO, branding, customer, market and growth intelligence | business-system | Evidence-based analysis and actionable recommendations; tenant-scoped storage |
| 19, 37 | Creative and content studio, multi-camera | existing creative-studio | Preserve current workflows; add capture/generation adapters only when tested |
| 20 | Digital execution | shared execution adapter | Explicit approval, provider result, verification and audit log |
| 21 | Systemization | business-system | Map tasks, time/cost, owner dependency and suggested automation |
| 22 | Business Graph | business-system persistence | Tenant-owned normalized records, evidence, decisions and outcomes |
| 23–25 | Agents, orchestrator, autopilot | shared orchestration | Defined contracts, safe tool scopes, bounded retries, approvals and escalation |
| 26, 30 | Infrastructure and suggested repo structure | existing repository | Adapt integrations; do not restructure healthy directories or install candidates blindly |
| 29 | Admin control centre | existing admin controls | Administrator override with audit trail; no cross-tenant leakage |
| 31–36 | Build phases and acceptance | tests and CI | End-to-end proof; no placeholder success |
| 37 | Digital content creation and visibility | creative-studio + business-system | Capture → produce → approve → distribute → measure → learn |

## First executable vertical slice
Business name → real public evidence → persisted business profile → verified visibility assessment → approved recommendation. Then extend to authorized connections, execution and measured results.

## CodeRabbit review checklist
- [ ] No existing routes, working modules or customer data are removed
- [ ] No unintended Zuxuru product rename
- [ ] Tenant authorization enforced server-side
- [ ] Evidence-backed scores; unavailable sources explicitly marked
- [ ] External actions require permission and are auditable
- [ ] Optional repositories labeled candidate until actually installed/tested
- [ ] Responsive mobile UX and accessibility preserved
- [ ] Unit, integration and end-to-end tests provided with implementation PRs

## Status
Specification mapped. Functional implementation remains pending inspection of actual source, backend, tests and deployment.
