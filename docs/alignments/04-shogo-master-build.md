# File 4 — Shogo Master Build Instructions aligned to Bonga Bhengu App

**Source reviewed:** `Zuxuru_Shogo_Master_Build_Instructions.md`. This file is a repository-to-runtime implementation contract for the **existing Bonga Bhengu App**, not a replacement architecture. Original Zuxuru branding and any unverified installation claims are not carried over.

## Locked operating loop
Discover → Understand → Diagnose → Prioritize → Create → Approve → Execute → Measure → Learn → Improve → Rescore → Repeat.

## Placement in current repository
| Component / source capability | Existing Bonga location | Contract: input → output | Persistence / gate |
|---|---|---|---|
| Business Identity / Passport | `business-system/` | Name, location, owner corrections → normalized identity | Tenant-scoped business record |
| Agent-Reach, Maigret, Maps MCP, web/search | investigation adapters within `business-system/` | Search request → candidate source observations | Evidence with URL, retrieval time, match state; **not scores** |
| Evidence / Verification | `business-system/` | Observations → verified/candidate/rejected evidence | Evidence and verification history |
| Business Graph / Brain | shared business persistence | Evidence, owner input, connected data → normalized business state | Tenant ownership and audit; Supabase only after real connection verified |
| Intelligence / Score / Gap | `business-system/` | Verified evidence + versioned rubric → findings, coverage, scores | Source references and score snapshots |
| Opportunity / Strategy | `business-system/` | Findings, relevance, effort, confidence → prioritized work | Ranked opportunities with supporting evidence |
| OmniRoute, agent/model routing | shared optional adapter | Bounded structured task → model/tool response | Provider availability, usage, failure logs; no permission bypass |
| Studio, ComfyUI, phone capture | **existing** `creative-studio/` | Approved brief and media → asset and versions | Owner approval before external publication |
| Website actions | **existing** `website-builder/` | Approved site change → preview, publish receipt | Version, deployment status, rollback if supported |
| Postiz/social publishing | execution/distribution adapter | Approved content, account and schedule → provider receipt | External ID/URL, failure, timestamp |
| Connections, Logto, Vault | shared auth/connection layer | User authorization → verified scoped connection | Secrets outside source; revoke and reconnect |
| Monitoring / Learning / Rescore | `business-system/` | Verified outcomes and new evidence → comparable score | Versioned snapshots, no invented uplift |
| Autopilot | shared job/permission layer | Policy + task → approved execution job | GREEN/YELLOW/RED policy, idempotency, durable audit |
| Multi-location Business Tree | optional business-system module | Verified parent/branch relation → branch graph | Only for actual multi-location entities |
| CEO admin, ToolJet candidate | existing admin authority | Owner action → authorized audited operation | No cross-tenant visibility by default |

## Component review record (required before adoption)
For each adapter document: why it exists; caller; input schema; output schema; API boundary; database destination; tenant and role scope; permitted external actions; error/timeout behavior; license; version; runtime cost; evidence of installation and tests.

## Rules to enforce in code
1. Agents cannot act directly on customer accounts; all external writes go through one execution gate.
2. Public investigation cannot assert account ownership or silently turn candidates into verified facts.
3. No unsupported integrations appear as connected or operational.
4. Admin overrides are explicit, audited and permission checked.
5. Retries must not duplicate external publishing, billing or customer communications.
6. Never claim Supabase, Logto, ComfyUI, Postiz, Agent-Reach, Maigret, OmniRoute or ToolJet is installed merely because it appears in the specification or module registry.
7. Existing creative studio, builder, subscription modules and customer workflows are preserved.
8. No fake score progression; rescoring must use actual new evidence and a comparable rubric.

## Build and review order
1. Inventory existing Bonga source and real running integrations.
2. Implement tenant-safe business identity and evidence pipeline.
3. Add deterministic score, findings and opportunities.
4. Implement a real authenticated connection and explicit execution gate.
5. Wire Studio/website assets and verified provider receipts.
6. Add monitoring, measured rescore, learning and policy-controlled autopilot.
7. Test the complete vertical slice on mobile and desktop.

## CodeRabbit checks
- Check actual API schemas and persisted record IDs, not only UI.
- Verify tenant A cannot read or modify tenant B; non-admin cannot invoke admin APIs.
- Verify approval requirements for customer-account writes.
- Verify evidence provenance and coverage when source unavailable.
- Verify connector failures, retries, cancellation and idempotency.
- Verify provider receipts and score comparisons with real evidence.
- Reject a pull request that merely renders buttons, placeholder integrations or invented metrics.

**Current status:** File 4 architecture/contract alignment committed. This document does not install dependencies, merge functional engines or certify deployment.
