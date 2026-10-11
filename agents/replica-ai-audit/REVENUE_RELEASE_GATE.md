# Pre-deployment revenue acceptance gate — Bonga Bhengu OS

Continue the existing Bonga Bhengu OS after the user's next build session. Do not rebuild, fork into another application, or claim deployment without verification.

## Two independent audit gates
1. Replica-Entrepreneur AI: verify the customer-to-revenue journey, tenant-specific value, lead quality, business KPIs, checkout, orders, reserve-pay provider readiness, and AI employee orchestration.
2. CodeRabbit: review code changes, tests, security, permissions, performance, accessibility, payment logic, and deployment risks. Obtain an actual review before recording this gate as passed. Do not fabricate review approval.

## Required sales pipeline
Discover consent-appropriate prospective customers and public business needs -> create evidence-backed lead profiles with provenance -> qualify fit and intent -> create truthful, relevant hooks and offers -> run consented nurturing loops and follow-ups with opt-out -> Closer prepares and routes offers -> real secure checkout -> verified order/payment webhook -> fulfilment -> payout/refund/reconciliation -> reporting and learning.

## Customer and platform revenue
Multi-tenant isolation: each seller can see only their own leads, campaigns, orders and revenue; platform administration receives scoped aggregate and authorized operational views. Track revenue separately for the platform and its customers. No invented lead, revenue or conversion metrics.

## Reserve Pay
Design for regulated payment provider support, escrow/split settlement where permitted, clear release conditions, refunds/disputes, idempotent webhooks, reconciled ledgers, KYC and local regulatory review. Do not implement custody of customer funds in an unlicensed wallet or mark it live without provider authorization and real transaction tests.

## Autopilot controls
Automate research, scoring, offer drafting, permitted follow-ups, order-state updates, reporting and non-financial optimization. Require authorization for outreach, marketing spend, price changes, refunds, transfers and payouts. Rate limit and respect privacy/consent/opt-out. Log actions and allow pause/rollback.

## Deployment acceptance
- Existing storefront, seller and admin surfaces preserved and responsive on Android/laptop
- No duplicated overlays, broken zoom, disconnected navigation or dead CTAs
- Lead -> offer -> checkout -> payment -> fulfilment -> payout paths tested end-to-end
- Tenant isolation, secrets, fraud controls, audit logs and data protection tested
- Replica audit evidence attached; CodeRabbit review findings resolved or explicitly approved
- CI tests green, rollback ready, production secrets configured and human release approval obtained

Status: requirements only; no implementation, CodeRabbit review or production deployment implied.
