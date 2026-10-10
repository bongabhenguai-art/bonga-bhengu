# File 21 — Repository-to-Implementation Contracts for Bonga Bhengu App

**Source reviewed:** `Pasted markdown(6).md` (992 lines), a detailed historical Zuxuru repository-to-implementation blueprint. It defines runtime layers, individual tool contracts, a proposed database spine, execution gates, and KEEP/ADAPT/BUILD decisions. It is a **design proposal**, not evidence that the named services are installed or connected.

## Non-negotiable host
Bonga Bhengu App is the existing host application. Preserve its app shell, routes, authentication, tenancy, four products (Website Builder & Hosting, Digital Visibility, Creative Studio, Digital Banner Builder), billing configuration and administrator override. The source's proposed Zuxuru architecture is a capability donor only; no wholesale migration to Logto, Supabase or a new orchestrator without verifying the current stack and planning a compatible change.

## Shared pipeline
User intent → tenant/business resolution → investigation planning → external capability adapter → normalized evidence → verification → existing business profile/graph → deterministic scoring and opportunity ranking → AI-assisted strategy → owner/admin approval → execution gateway → provider receipt → monitoring → measured rescore.

## Repository implementation contracts
| Candidate component | Responsibility | Input → output | Bonga integration boundary |
|---|---|---|---|
| Agent-Reach | Public business discovery | Business queries → sourced findings | Digital Visibility evidence adapter; verify repo, license and supported targets |
| Maigret | Username candidate discovery | Authorized business handle variants → account candidates | Candidates only; no automatic person/business association or unrestricted individual profiling |
| Maps MCP | Local business signals | Name, area, category → sourced listing/review data | Provider-approved local intelligence adapter |
| Website/Search Intelligence | Website and public search audit | URL/query → crawl/search observations | Normalize provenance and source health |
| OmniRoute | Model/tool task routing | Structured task, approved context and budget → response and telemetry | Existing AI engine decides business meaning; router does not authorize actions |
| Supabase | Possible persistent store | Authorized records → durable tenant-scoped data | Reuse existing database; no duplicate auth or unapproved schema migration |
| Logto | Possible identity/RBAC | Login/claims → identity and permissions | Only if compatible with existing identity provider; do not create parallel login |
| Vault | Secure connections | Provider OAuth/scopes → verified connection passport | Server-side secrets, revocation, status and tenant scope |
| ComfyUI | Creative workflow execution | Approved creative brief/assets/workflow → actual media artifacts or error | Existing Creative Studio only; check local/cloud capacity and licensing |
| Postiz | Social publishing | Approved post job/account/media/schedule → provider post ID, URL, status or error | Shared Execution Engine; no auto-post without authorization |
| ToolJet | Optional internal admin tooling | Authorized operational data → administrative actions | Existing admin override and RBAC, not a second public dashboard |
| Business Graph / Intelligence | Core business context | Verified evidence → findings, score components, gaps, opportunities | Existing Bonga business intelligence; no duplicated source of truth |
| Monitoring / Rescore | Outcomes | Verified execution and new observations → comparable changes | Recorded score history, coverage and audit events |

## Eight-question contract required for each tool
1. Why does this capability exist?
2. Which authenticated component invokes it?
3. What validated input does it receive?
4. What typed output, errors and evidence does it return?
5. Where and for how long is its data stored?
6. Which tenants, roles and agents can use it?
7. Which actions may it perform, under whose approval?
8. Where is it placed in the shared investigation/strategy/execution pipeline?

Add version, license, health, rate-limit, cost, idempotency and test requirements to the registry before activating a candidate.

## Data model — adapt, do not blindly create
The source proposes organizations/businesses/memberships, investigations and runs, sources/evidence/verification, platform accounts, scores/history, findings/opportunities, content/campaigns, jobs/results, agent runs, connection permissions, autopilot and audit events. **Map each proposed entity to the current database first**; create only additive migrations with tenant keys, row-level authorization, indexes, retention and rollback plans.

## Execution and verification boundaries
- Discovery tools return evidence; they never decide score formulas.
- A discovered social handle remains a candidate until identity is verified.
- AI/model routers produce structured recommendations; they cannot bypass approval.
- Studio workers generate assets; publishing requires separate approval and verified platform authorization.
- External writes pass through one audited execution gateway with retries, failure states, idempotency and receipts.
- Scores derive from reproducible evidence, not AI guesses or a fabricated example (the source's sample 27→39 change is illustrative only).
- Never expose secrets in the frontend, mix tenants, claim a connector is ready from a UI card, or silently replace live failures with mock success.

## CodeRabbit implementation sequence
1. Inventory the current Bonga modules, DB, auth, routes and connection system.
2. Register each proposed repository as **candidate / verified / installed / configured / authorized / healthy**.
3. Implement common input/output contracts and evidence normalizer around existing components.
4. Add one tested public investigation adapter and real proof links.
5. Add deterministic scoring and business problem/opportunity recommendations.
6. Add permission-gated Studio and publishing adapters only when working endpoints and accounts exist.
7. Add monitoring, event history, failure recovery, privacy and mobile accessibility tests.
8. Review changes for architecture preservation, licenses, security, resource limits and real execution receipts.

**Status:** File 21 aligned and documented. This commit does not install the listed tools, alter the live app, or deploy any integration.
