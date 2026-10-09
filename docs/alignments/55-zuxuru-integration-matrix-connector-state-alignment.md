# File 55 — ZUXURU Integration Matrix: Verified Connector Contract Alignment

**Source:** `ZUXURU_INTEGRATION_MATRIX.md` (1,739 bytes, 51 indexed lines), read in full. This is a **candidate integration catalog and connection-state proposal**, not an installed dependency list or working API adapter.

## Exact capability categories in source
| Candidate | Proposed role | Verification required |
| --- | --- | --- |
| GitHub | Repository operations | Repository access and approved scopes |
| Supabase | Application data/services | Project, credentials and schema |
| Logto | Identity provider | Tenant and configuration |
| Netlify | Web deployment | Site and build/repository link |
| Postiz | Social publishing | Supported platforms, API actions and permissions |
| ComfyUI | Creative workflows | Running endpoint, installed models/workflows and resource capacity |
| OmniRoute | AI model/provider routing | Real endpoint and authentication |
| Agent-Reach | Agent capability | Exact API, behavior and permission scope |
| ToolJet | Internal operations UI | Running deployment and authorized access |
| Website/CMS | Customer website | Verified ownership and scoped access |
| Google services | Search/local/analytics | Supported authorized APIs and data provenance |
| Social platforms | Visibility and distribution | Provider permissions, limits and action receipts |

No vendor in this matrix is demonstrated as connected or deployed by the source. Any product choice must be checked for compatibility, cost, licensing, privacy and current support.

## Source's proposed state machine
Nominal: `DISCOVERED → AVAILABLE → AUTHORIZING → CONNECTED → VERIFIED → SYNCING → ACTIVE → MONITORING`.

Failures: `AUTH_FAILED`, `PERMISSION_REVOKED`, `SYNC_FAILED`, `RATE_LIMITED`, `PROVIDER_ERROR`, `DISCONNECTED`.

**Production refinements for Bonga:**
- `AVAILABLE` means an adapter can be configured, not that a customer has authorized it.
- `CONNECTED` means an authenticated session or credential exchange exists; `VERIFIED` requires an actual provider capability check.
- `ACTIVE` requires tenant-scoped permissions, healthy token, supported capability and recent successful request; `MONITORING` is a concurrent health process rather than necessarily a later exclusive status.
- Add explicit `CONFIG_REQUIRED`, `CONSENT_REQUIRED`, `TOKEN_EXPIRED`, `SCOPE_INSUFFICIENT`, `REAUTH_REQUIRED`, `PAUSED`, `DISABLED` and `UNSUPPORTED` where not already represented.
- Record `tenant_id`, `connection_id`, `provider`, `scopes`, `capabilities`, `authorized_by`, `last_verified_at`, `last_sync_at`, `error_code`, `revoked_at` and audit/receipt references using the **existing** Bonga data model.
- Use least privilege, server-side secrets, secure OAuth callbacks, CSRF/state protection, rate-limit/backoff and revocation handling. Never store plaintext tokens in client `localStorage`.
- Publishing, repository writes, deployments and payments require policy authorization and human approval; verification is not permission for unlimited action.

## Additive Bonga Bhengu App mapping
- **Preserve Bonga as architectural authority:** existing frontend, routes, tenant auth/database, admin override, four product families, four subscription tiers, accessibility and localization remain unchanged.
- **Business Connection Intelligence / Connection Wizard:** adopt or reconcile the matrix's state vocabulary with existing connector state contracts; avoid duplicate registries and databases.
- **Digital Visibility:** connect Google/public sources and authorized analytics through evidence-backed adapters with provenance and explicit unknown states.
- **Creative Studio / Digital Banner Builder:** integrate verified ComfyUI or other approved media engines only as swappable adapters; require actual output assets and job receipts.
- **Website Builder & Hosting:** GitHub/Netlify/CMS are optional, verified publishing/deployment routes, not assumed infrastructure.
- **Execution Intelligence / AI employees:** Postiz/social adapters must return genuine publish IDs, delivery outcomes, failure reasons and measured engagement; Hunting/Fishing/Closer/Business Converter operate within user-granted permissions.
- **Model and agent orchestration:** OmniRoute/Agent-Reach are optional capability providers; inspect endpoints and runtime requirements before adoption.
- **Admin controls:** feature flags, provider health, per-tenant enablement, audit logs, usage/cost controls, override and revocation.

## CodeRabbit acceptance criteria
1. Inventory existing Bonga integrations; map each candidate to existing/partial/missing/duplicate/unsupported.
2. Test real credential exchange and read-only capability verification; do not show ACTIVE from a UI toggle.
3. Test expired token, revoked scopes, permission denial, rate limiting, provider outage and reconnection.
4. Validate per-tenant isolation, secure secret storage, auditability, idempotent writes and rollback/retry.
5. Distinguish local AI processing from remote provider egress and document costs and consent.
6. Verify mobile/keyboard/screen-reader wizard, meaningful status/error messages and admin override.
7. No changes to existing architecture, subscriptions or production integrations without explicit approval and tests.

**Status:** Integration matrix reviewed and aligned. This is a **documentation-only** GitHub commit; no provider was installed, authenticated, connected, tested or deployed by this work.
