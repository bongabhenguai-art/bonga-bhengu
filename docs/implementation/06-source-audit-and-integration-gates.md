# Integration gate — 10 October 2026

This branch belongs to the **existing Bonga Bhengu App**. It is not a new app or a replacement for the live ChatGPT Sites project.

## Source-of-truth checks
- Preserve `main`, existing routes, working modules, branding, and original site.
- Repo source tree and alignment audit have been inspected. The claimed 99 Project files have **not** all been retrieved or individually verified; never mark them coded on that basis.
- Original ChatGPT Sites editable source and repository deployment linkage remain unverified.
- Historical standalone Fashion OS HTML is a reference, not a replacement.
- Zuxuru is a customer-facing builder product accessing centrally governed AI services, not a second platform.

## Existing verified code areas
- `creative-studio/`: local API, rendering and worker routing, with tests.
- `subscriptions/`: four-product catalog and entitlement prototypes.
- `website-builder/`: prototype site generation and business profile.
- `platform/`, `mobile/`, `design-system/`: supporting layers.
- `docs/`: school and AI employee implementation specifications.

## Implementation sequence and acceptance
1. Inventory all Project attachments and editable live-site source; record exact file hashes and module owners.
2. Run baseline CI and local tests, capture failures, and fix regressions without breaking existing APIs.
3. Introduce authenticated users, organizations, tenant memberships and authorization checks. Test cross-tenant denial.
4. Centralize business records, persistent jobs, audit events and secrets handling; migrate existing SQLite data safely.
5. Connect subscription entitlements to verified payments and configurable usage limits; test webhooks and idempotency.
6. Add OAuth authorization wizard with least privilege, revocation, encrypted token storage and explicit customer approval.
7. Wire Creative Studio, Website Builder, Visibility and Banner services through shared authorized interfaces.
8. Add Zuxuru and Education Partner OS as products/workspaces inside existing platform boundaries.
9. Run integration, security, accessibility and mobile tests; request CodeRabbit review **if installed and available**.
10. Publish only after approval and verified backup/rollback; test real customer journeys on deployed URL.

## Review checklist
- [ ] All 99 claimed project files located, hashed and mapped
- [ ] Existing live editable source backed up
- [ ] Baseline test results recorded
- [ ] Auth and tenant isolation tested
- [ ] Payment verification tested
- [ ] Real integrations authorized and tested
- [ ] CodeRabbit review result linked
- [ ] Production deployment and rollback verified

No box is checked without evidence. This file is an integration plan, not evidence of completed coding, CodeRabbit review or deployment.
