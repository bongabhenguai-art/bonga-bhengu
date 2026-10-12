# Chatbliz OS — Engineering execution baseline
Status: proposed, Phase 0 discovery required. This document is an implementation handoff, not a claim of deployed functionality.
Repository: bongabhenguai-art/bonga-bhengu. Existing ChatGPT site mirror: chatgpt-site/.
## Product boundary
One chat-first workplace with exactly four customer-facing services: My Brand, My Website, My Content, My Business. Preserve existing frontend, Worker, database migrations, Studio, website editor, user data and account boundaries. No parallel app or dashboard.
## Architectural corrections
1. Define a persistent Task Engine contract during Phase 2 and implement a minimum task record alongside Jarvis in Phase 3; expand orchestration in Phase 4.
2. One coordinated backend architecture and shared identity/authorization, not necessarily one runtime or database. Assign authoritative stores: GitHub code; primary database operational records; Master Library resource metadata; Skills Vault skill definitions; Task Engine task state.
3. Four services are product surfaces, not four separate backends.
4. Route business actions through canonical Jarvis commands. Keep ordinary navigation, typing and purely presentational controls local and accessible.
5. Ship external integrations incrementally, beginning with providers required for verified customer journeys; never infer provider success.
6. Release small verified vertical slices, preserving Phase 0 security and rollback gates.
## Phase 0 — mandatory before functional replacement
- Inventory repositories, build entry points, frontend routes, Worker/Python services, storage, migrations, secrets boundaries, integrations and deployment ownership.
- Trace every chat, voice, button, menu, card and form business action to handlers. Classify working, disconnected, simulated, provider-dependent or unknown.
- Inventory duplicate shells and command engines; propose retention or migration, never delete without approval.
- Record preservation invariants, backup/restore procedure, rollback commands, and current test evidence.
- Record owners, dependencies, risks, test requirements and signoff. Unverified items remain open.
## First release — smallest safe implementation
1. Confirm live ChatGPT-site source and publish pipeline; GitHub commits alone do not deploy.
2. Rebrand the existing shell to Chatbliz OS without replacing routes or customer data.
3. Present four services inside one responsive shell; fix overlapping/zoomed UI and test mobile, tablet and desktop.
4. Reuse the existing Studio and website editor; test real camera permissions/recording and draft/review/publish workflows separately.
5. Introduce canonical Jarvis command and minimum persistent task interfaces with tenant authorization, idempotency, verification and audit.
6. Wire a small set of real service actions; explicitly show pending/failed/unavailable status instead of fake completion.
7. Run existing Node test suites, build, security/tenant regression, critical journey checks, and documented rollback rehearsal before merging or deploying.
## Existing evidence and limits
- chatgpt-site/README.md documents a mirrored frontend, Worker, migrations, tests and source assets.
- chatgpt-site/scripts/build-ai.mjs references existing digital-studio, studio-jobs, multistream, Jarvis and other Worker modules.
- chatgpt-site/scripts/dev-preview.mjs returns HTTP 503 for local /api/ calls: preview cannot verify backend workflows.
- chatgpt-site/docs/APP-UPGRADE-2026-10-10.md reports earlier test success and static website publishing, but explicitly excludes real phone/provider validation. Re-run tests for current commits.
## Release gates
No completion without real handler, correct tenant authorization, saved/retrievable result, verifiable execution evidence, passing tests, rollback and deployment verification. No removal of existing functionality without approved migration. Provider-dependent integrations must show real connection states. Production controls must not be decorative or simulated.
## Ownership and next action
Technical Lead: finish Phase 0 evidence and confirm source/deployment ownership. Frontend Lead: shell/control map. Backend/Security Lead: data/auth/tenant audit. Jarvis Lead: command path. QA/Release: tests and rollback. Codex should implement from this document in small reviewed commits after discovery, not rebuild the application.
