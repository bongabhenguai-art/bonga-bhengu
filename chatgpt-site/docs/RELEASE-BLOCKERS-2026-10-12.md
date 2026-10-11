# Bonga Bhengu OS — launch blocking implementation checklist (12 October 2026)

**Extend existing app. No rebuild, duplicate shell, false paid orders or unapproved production release.**

## P0 Checkout
GitHub issue #18: https://github.com/bongabhenguai-art/bonga-bhengu/issues/18
- Current public checkout responds billingConnected:false. Choose payment provider, authenticate and authorize account; secure server-side session creation and fixed catalog pricing.
- Verify signed payment webhooks and idempotent transitions; separate request, pending, paid, refunded and payout states; create receipts and reconcile against provider transactions.
- Implement Reserve Pay only with provider support, required licensing and seller consent; never simulate escrow.
- Run sandbox tests for success, failure, duplicate events, cancellation, refunds and unauthorized requests. Production requires owner approval.

## P0 Build and mobile integration
- Resolve PR #14 conflicts and CodeRabbit findings: request body limits, AI allowance charging order, route test specificity; run full Node tests and build.
- Review and merge PR #12 mobile overlap fix after responsive Android checks.
- Review PR #11 Fishing AI qualification and verify tenant separation.
- Wire Jarvis meeting page and Hunter core to existing navigation, authenticated routes and packaging; preserve mic consent and typed fallback.
- Audit every actionable button, top navigation, duplicate storefront layer and mobile viewport.

## P1 Sales pipeline
- Hunter: authorized public search connector, source attribution and freshness, no assumption that a public contact is permission to message.
- Fishing/Closer: evidence-based lead qualification, truthful offers and approved individual contact; track actual responses and opt-outs.
- Jarvis: in-person/phone coaching and appointment creation only after customer agreement; check real calendar conflicts.
- Studio: working recording/preview/download, then hooks/loops/closer videos with content approval.
- LinkedIn/TikTok: separate official OAuth authorization per account and tenant; test token refresh/revoke, provider scopes and allowed publishing.
- CRM and revenue: consented lead -> appointment -> quote -> checkout -> reconciled payment; dashboard distinguishes unknown from zero.

## P0 Production readiness
- Verify bongabhenguos.online domain ownership and registrar contact verification, DNS/SSL, actual deployment pipeline, API origin and health checks.
- Independent Replica/CodeRabbit review, passing CI and smoke tests, documented rollback and explicit production approval.
- Target R5,000–R20,000/day and five qualified appointments; never promise or fabricate results.

This checklist is tracking and implementation guidance, not proof of completed integration, tests, deployments, customer replies or revenue.
