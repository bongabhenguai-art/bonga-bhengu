# Bonga Bhengu OS — Unified Operating Contract

Status: implementation specification; not a claim of completed migration.

## Separation from Chatbliz OS
Bonga Bhengu OS and Chatbliz OS remain separate products, repositories, deployments, brands and customer data. Align architectural contracts and reusable patterns only; do not embed either application's UI in the other.

## Single operating path
One workplace shell -> one central operating engine -> one task orchestrator -> one authority wizard / integration gateway -> authorized skills and modules -> verification -> canonical persistence and UI updates.

- **One workplace**: persistent navigation, chat, context and in-place module panels. No duplicated homepages or unrelated app redirects.
- **One operating engine**: central command router and shared policies; domain-specific services may remain as internal adapters.
- **One backend authority**: shared API contracts, identity, tenant isolation and audit logging. Existing backend code must be mapped before consolidation.
- **One master library**: unified asset/knowledge registry, metadata, ownership and versions; binary storage may have multiple physical providers.
- **One skills vault**: versioned skill manifest with inputs, outputs, permissions, dependencies, tests and provenance. Secrets must never be stored in skill manifests.
- **One task engine**: persistent task IDs, states, subtasks, dependency graph, idempotency, retries, approvals, logs and recovery.
- **One pipeline**: command -> plan -> permission check -> execute -> verify -> persist -> report.
- **One authority wizard**: connect, link, test, renew, revoke and monitor external OAuth/API/MCP/device integrations. Use official consent screens and least-privilege scopes.
- **One source-of-truth policy**: GitHub is authoritative for code; primary database for transactions/tasks; library registry for assets/skills. Push/pull with revisions, conflict checks and traceability.

## Integration contract
Each adapter exposes: id, provider, tenant, scopes, connection state, health check, capabilities, authorization method, last sync, and revocation method. No module may directly access another module's private credentials.

## Safety of migration
1. Inventory current frontend routes, backend services, jobs, databases, integrations and deployment configuration.
2. Write compatibility tests and document existing working flows.
3. Introduce shared interfaces and adapters without replacing working modules.
4. Migrate one module at a time behind feature flags; preserve existing data and backups.
5. Verify Android layout, studio permissions, design tools, task completion, tenant isolation and OAuth renewal/revocation.
6. Deploy only after tests and approval. Do not delete legacy services until migration is verified.

## Acceptance criteria
A user can start a task in the workplace, authorize a required connector through the wizard, invoke multiple agents/modules, see progress and approvals in the same workplace, and retrieve the verified output from the master library. All events share a task ID and audit trail. No Chatbliz UI or customer data is imported.
