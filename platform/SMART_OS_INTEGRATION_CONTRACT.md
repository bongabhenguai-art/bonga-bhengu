# Bonga Bhengu OS — Unified Smart Device & Connector Contract

This contract extends existing modules; it does not replace the original Fashion OS or deploy to ChatGPT Sites.

## One engine, separate tenants
- Every customer receives an authenticated tenant workspace. Tenant identifiers alone are never authorization.
- The server resolves the authenticated identity and tenant memberships, verifies role/plan and scopes every read/write.
- Builder/admin may approve available integrations and control policies but must not automatically gain access to customers' third-party accounts.
- Every third-party OAuth/API/MCP connector is activated only after its owner grants appropriate permissions. GitHub repository code is not an authorization grant.
- Connections store encrypted credentials in a server-side vault; never in browser localStorage, repository files, logs or frontend bundles.
- Session persistence uses secure HttpOnly cookies, rotation, idle expiry, device revocation and reauthentication for sensitive operations. Never promise permanent non-expiring access.

## Phone-like customer experience
- One consistent shell on Android and laptop: Home, Workspace, Apps, Activity, Connections, Settings.
- Tap/click an app to open a task; only request the inputs necessary for that task.
- Display progress: queued -> running -> awaiting_approval -> completed/failed.
- Show a clear human-readable result and suggested next action; user approves before publishing, spending money, contacting customers, or changing connected accounts.
- No fabricated 'connected', 'live', 'sent', 'published', 'approved' or 'completed' statuses.
- Accessible keyboard navigation, touch targets, screen readers and reduced motion.

## Server workflow contract
- POST /api/workflows: server validates session, tenant, plan, capability, payload; returns durable workflow ID.
- GET /api/workflows/:id: returns only jobs belonging to authorized tenant.
- POST /api/workflows/:id/approve: checks authenticated approver, action details and single-use approval token; records immutable audit entry.
- POST /api/workflows/:id/cancel: cancels pending work and signals running workers if supported.
- GET /api/connectors: reports actual provider connection states per tenant.
- POST /api/connectors/:provider/authorize: starts provider OAuth/authorization with tenant-bound state and PKCE where applicable.
- POST /api/connectors/:provider/revoke: revokes connection and disables related capabilities.
- Require rate limits, idempotency keys, authorization on every request, background queues for long-running work, encrypted storage and audit logs.

## Integration acceptance criteria
1. Verify real session and tenant on backend; reject cross-tenant access.
2. Connect existing website, visibility, creative and banner executors to shared capability registry without duplicates.
3. Confirm actions produce real outputs and persisted history; report unavailable integrations honestly.
4. Verify approval before external side effects; confirm denial/cancellation does not execute.
5. Test Android and desktop, including offline/connection loss and accessibility.
6. Deploy only after source integration, secrets configuration, backend security checks and real end-to-end tests.

Current repository additions are contracts and browser-side orchestration, NOT a deployed or security-complete SaaS backend.
