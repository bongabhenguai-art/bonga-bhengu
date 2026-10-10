# Jarvis Sales Autopilot — Integration Layer

Status: integration specification, not a live activated service. Extend the existing Bonga Bhengu App; do not create a second application.

## Goals
- Month 1: R20,000 gross sales/day target.
- Month 6: R100,000 gross sales/day target.
- Show actual collected revenue separately from targets and forecasts.

## Existing employee orchestration
Jarvis coordinates Business Scraper, Spy, Hunting, Marketing Strategist, Branding, Amplifier, ten configurable AI Influencers, Digital Studio, Fishing, Listening, Business Coach, Negotiator, Closer, Converter, Money, CRM, and Retention agents. Reuse existing implementations and shared authentication, tenants, storefront, seller/admin workspaces, models, and integrations.

## Pipeline
1. Discover business needs from lawful public information and permitted first-party signals.
2. Score and deduplicate prospects, document evidence and consent/marketing basis.
3. Generate brand-aligned campaigns and AI presenter content, with required disclosures.
4. Route inbound/opted-in leads to CRM, qualification, solution matching and approved offers.
5. Generate quotes from server-controlled catalog/prices; allow negotiation only within configured thresholds.
6. Hand off to existing secure checkout; mark paid only from verified payment provider webhook with idempotency.
7. Create fulfillment tasks, monitor delivery and manage opted-in follow-ups and renewals.
8. Aggregate metrics: leads, qualified leads, quotes, paid orders, gross revenue, refunds, net revenue, conversion, CAC, ROAS, and fulfillment backlog.

## Configuration and safety
- Default disabled until deployment tests and admin activation.
- Modes: approval-required or supervised (only preapproved actions).
- Default ad budget R0; optional R200/R500/R1000 daily caps only after explicit authorization and connected provider credentials.
- Never autonomously spend, scrape private data, mass-message without appropriate permission, fabricate testimonials, misrepresent AI avatars as humans, or change pricing beyond limits.
- Escalate custom contracts, suspicious transactions, large discounts, disputes, refunds and budget changes.
- Tenant isolation, role-based permissions, audit log, retries, rate limits, opt-out enforcement, kill switch, secrets in environment/secret manager.

## Suggested integration contracts
- sales_autopilot_config(tenant_id, enabled, mode, daily_budget_zar, approval_required, updated_by)
- sales_leads(tenant_id, source, consent_status, stage, assigned_agent, evidence, created_at)
- sales_agent_runs(tenant_id, agent, input_ref, status, result_ref, approved_by, timestamps)
- sales_events(tenant_id, event_id, event_type, order_id, amount_zar, occurred_at)
- GET /api/sales-autopilot/status
- PUT /api/sales-autopilot/config (admin only)
- POST /api/sales-autopilot/approve (admin only)
- POST /api/sales-autopilot/stop (admin only)

These contracts are proposals: align with actual existing schemas/routes before implementing.

## Acceptance tests
- Existing app builds without regression; tenant separation enforced.
- Disabled mode performs no outbound action or spending.
- Duplicate payment webhooks never duplicate revenue/orders.
- Unapproved outbound or over-budget operations are blocked.
- Admin can stop all queued work and inspect logs.
- Dashboard uses verified transactions, not fabricated revenue.
- Existing frontend and backend remain intact.

## Deployment
Implement and test against current application modules, submit for review, then deploy using the existing site's pipeline. This document alone does not activate the autopilot.
