# 05 — Customer Workspaces and Release Checklist

Unified product workspaces: Storefront, Seller, Admin, Zuxuru App & Website Builder, Fashion/Creative Lab, Digital Studio, Business Growth, Education Partner OS.

Customer-visible execution: task request, assigned AI employee, stage, evidence, pending approvals, progress, error/retry, duration/cost, verified output and next action.

Before release:
- Locate actual ChatGPT Work storefront code and determine integration ownership.
- Preserve existing routes and UI; prevent duplicate navigation/login.
- Test authenticated tenant isolation, permissions, guardian/student access where relevant.
- Verify signed webhooks, payment reconciliation and no duplicate charges.
- Verify accessibility on phone/laptop, reduced motion and language fallbacks.
- Verify working provider adapters and explicit failure states.
- Run automated unit/integration/security checks and test rollback.
- Confirm production deployment separately from GitHub push.

This file is a checklist, not a claim of completed tests or deployment.
