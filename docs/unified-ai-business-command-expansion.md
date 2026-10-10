# Bonga Bhengu App — Unified AI Business Command Expansion

Status: Architecture and implementation specification. Not deployed.

## Architectural constraints
- Bonga Bhengu App is the sole customer-facing entry point. Zuxuru, Creative Studio, Fashion Lab, Business Growth and other products remain services within it.
- This repository currently contains an independent shared multi-tenant Creative Studio backend, not the existing ChatGPT Work website. Do not represent this repository as the live website.
- Preserve existing modules, API routes, tenant boundaries and working functionality. Add shared capabilities only after code inspection; never create a competing login, storefront or operating system.
- All external services require authorized connections, scoped permissions, credential vaulting, and explicit approval for sensitive actions.
- AI employees must collaborate through one orchestrator and execution ledger, not duplicate each other.

## Expansion backlog — Sections 74–98

### 1. Technology Intelligence Controller (74–79)
Discover open-source GitHub projects, check licensing, maintenance, dependencies, security, compatibility and resource requirements; compare against existing capabilities; prepare change proposals; integrate only with admin approval, test and rollback.
Candidate references: github/github-mcp-server, ossf/scorecard, oss-review-toolkit/ort, anchore/syft, aquasecurity/trivy, renovatebot/renovate, semgrep/semgrep.
Registry fields: repository URL, version, licence, purpose, dependencies, permissions, tenant scope, test evidence, deployment state, owner and rollback revision.

### 2. Real-World Business Operations Controller (80–85)
Connect supported POS, barcode/QR, printers, stock, purchasing, workforce, scheduling, delivery and accounting through permissioned adapters.
Candidates: zxing-js/library, node-red/node-red, eclipse-mosquitto/mosquitto, frappe/hrms, kimai/kimai, calcom/cal.com, traccar/traccar, frappe/erpnext.
Finance requirements: verified payment provider, idempotent webhooks, double-entry transaction records, reconciliation, disputes, refunds, tax reporting, separation of tenant funds and financial audit. Do not claim an open-source ledger grants authorization to custody funds.
Business device support depends on drivers, hardware and deployment permissions.

### 3. AI Communication & Event Intelligence Controller (86–92)
Use typed business events, verified sources, idempotency keys, tenant-scoped event processing, dead-letter/retry handling and traceable workflow outcomes.
Candidates: a2aproject/A2A, modelcontextprotocol/servers, nats-io/nats-server, temporalio/temporal, centrifugal/centrifugo, novu/novu.
Add language/locale/currency and accessible interfaces using verified translation and exchange-rate providers. Candidate repositories: i18next/i18next, LibreTranslate/LibreTranslate, unicode-org/cldr-json.
Trust: software signing, verified media provenance, credential checks; no unsupported identity verification claims.
Safe service recovery: retry, fallback, alert and rollback with approval gates.

### 4. Universal Business Command Engine (93–98)
One customer-facing voice/text command surface, not another application.
Examples: diagnose low customer demand; build website; connect approved business accounts; generate campaign; quote client; investigate late orders; explain profits.
Workflow:
1. Capture command and tenant identity.
2. Resolve intent and retrieve consented business context.
3. Check subscription, permissions, budgets and connection status.
4. Assign existing Business Scraper, Coach, Engineer, Marketing, Fixer, Closer and other relevant AI employees.
5. Produce a preview or action plan with evidence and estimated cost.
6. Obtain explicit approval for publishing, financial changes, outreach, account modifications or production deployments.
7. Execute via authorized MCP/API adapters.
8. Verify tool responses and business outcomes, record in Business Execution Ledger.
9. Show customer progress, result, failures, approvals and next steps.

#### Connection Wizard
Choose provider -> explain access scopes -> official OAuth/provider authorization -> store secrets in approved vault -> verify connection -> grant tenant-specific AI permissions -> provide disconnect/revoke and audit controls. Never ask customers to paste platform passwords.

#### AI Execution Centre
Each task shows request, assigned AI employees, current stage, evidence, approval requirement, execution status, result, error/retry state, duration and cost. Never display illustrative demo statuses as real work completed.

## Suggested interfaces (implementation contract)
- `POST /commands`: tenant-scoped command with optional input modality, intent and idempotency key.
- `GET /commands/{id}`: verified workflow state and output.
- `POST /connections/{provider}/start`: authorized provider connection initiation.
- `GET /connections`: redacted connection status for tenant.
- `DELETE /connections/{id}`: revoke a connection and dependent permissions.
- `POST /executions/{id}/approve`: record explicit scoped human approval.
- `GET /executions/{id}/events`: customer-visible execution timeline.
These routes are proposals, NOT assertions that they already exist.

## Acceptance criteria
- Existing Creative Studio endpoints and tenancy remain functional.
- One login/tenant model and one shared execution record across modules.
- No cross-tenant reads/writes; no plaintext credentials in business tables or logs.
- Every external action has provenance, permissions, idempotency and verified result.
- High-impact actions require approval and show audit records.
- Unavailable integrations are marked unavailable rather than simulated.
- Works responsively on mobile and desktop with accessible voice/text alternatives.
- Automated tests cover permissions, approvals, retries, failure recovery and regressions.

## Delivery sequence
1. Inspect actual repository and live website source ownership; map existing routes, modules, tenant/auth mechanisms and deployment.
2. Add typed command/task/event contracts and tenant-scoped execution ledger.
3. Connect one existing AI employee to one authorized tool in a test environment.
4. Implement a functional connection wizard and task-status UI in the existing Bonga Bhengu App storefront.
5. Verify, review and deploy only after explicit production approval.

This file is an additive project specification. No application code or deployment configuration is changed by this document.
