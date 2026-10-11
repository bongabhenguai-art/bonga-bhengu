# Launch gate — 2026-10-12

Target domain: bongabhenguos.online. Sales objective: 100 verified paying customers; daily revenue target R5,000–R20,000. Targets are not guaranteed.

## Priority channels
LinkedIn and TikTok, with support for multiple separately authorized social accounts per tenant and per platform.

## Account connection contract
- Account table keyed by tenant_id + provider + provider_account_id, with independent OAuth grant, token reference, scopes, expiry, state, owner and audit log.
- Connect, list, select, disconnect, refresh and reconnect account flows. Never store raw credentials in browser storage or logs.
- Allow many authorized accounts on one platform, subject to official API availability and provider rules. Never evade rate limits, spam rules or account restrictions.
- Map campaigns, content, leads and analytics to the exact account and tenant. Enforce isolation and deduplication.
- Publishing and messaging must use approved official APIs and permissions. Where platform APIs restrict actions, provide manual review/hand-off instead of claiming automation.

## Launch critical path
1. Verify DNS, TLS, homepage and Android layout at target domain.
2. Verify storefront products, prices, package selection, checkout, order confirmation and receipt.
3. Verify seller/admin access, tenant isolation and webhook reconciliation.
4. Connect at least one real authorized LinkedIn account and one TikTok account, then test connecting a second account on each where supported.
5. Launch approved offers with trackable links, consent-aware lead capture, qualification, follow-up and Closer workflow.
6. Monitor funnel: reach -> visits -> qualified leads -> checkout starts -> paid orders -> refunds -> net revenue. Count customers by unique paid buyer, not leads.
7. Replica-Entrepreneur audits business funnel; CodeRabbit reviews code where connected; run end-to-end tests and approve release.
8. Deploy via the existing site's actual deployment process, verify live production; a GitHub commit alone does not deploy.

## Hard gates
No fabricated connections, successful sales, payment settlements or audit approvals. Do not send unsolicited bulk outreach. Human approval for ad spending, payouts, refunds, pricing and release.

Status: launch acceptance criteria, not completed implementation or live deployment.
