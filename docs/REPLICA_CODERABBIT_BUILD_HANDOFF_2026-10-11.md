# Replica AI + CodeRabbit — Build and review handoff

## Target
Build and validate the EXISTING Bonga Bhengu OS application in `chatgpt-site/`. Do not create a separate app, duplicate homepage, replace the existing architecture, or deploy without tests.

## Source already committed
- `docs/SUBSCRIPTIONS_LAUNCH_2026-10-11.md`
- `chatgpt-site/worker/subscription-catalog.mjs`
- `chatgpt-site/tests/subscription-catalog.test.mjs`
- `agents/fishing-ai/README.md`
- Existing `agents/replica-ai-audit/` and `agents/fixer-ai/` workflows.

## Implementation sequence
1. **Replica AI audit**: inspect actual storefront routes, package UI, authentication, backend payment connections, existing Studio, agent runtime, mobile layout, and deployment pipeline. Report existing functionality versus missing functionality. Do not fabricate audit results.
2. **Package integration**: render four concise tiers plus Contact Sales on existing storefront; monthly/annual switch; display founding offer only when eligibility and terms are configured. Enforce feature limits server-side, not just hidden buttons.
3. **Wallets**: transactional, account-scoped weekly sales-task credits and monthly studio-minute credits; idempotent deductions/refunds, renewal/reset logic, usage history and admin audit.
4. **Checkout**: use verified provider webhooks and subscription lifecycle events. Payment connections currently report livePaymentsEnabled=false; do not simulate real charges or enable production without configured credentials and approval.
5. **Fishing AI**: authorized public business discovery, source evidence, scoring, package matching, consent-aware owner-reviewed outreach drafts and CRM handoff. No unsolicited automated bulk outreach.
6. **Quality**: tests for plan entitlements, permission escalation, resets, webhook replay, refund idempotency, responsive Android layouts, no zoom/overlap and no purple. Run build and regression tests.
7. **CodeRabbit review**: run through an installed authorized CodeRabbit GitHub integration on a PR if available. Address findings and request another review; if unavailable, report blocked rather than claiming a review happened.
8. **Release**: deploy existing site only after passing checks; confirm actual deployment and `bongabhenguos.online` behavior.

## Definition of done
Real package checkout, verified payment, token usage enforcement, visible balances, functioning Fishing AI with lawful sources, responsive existing storefront and auditable deployment. No placeholders presented as live features.

## Constraints
Black #0B0B0B, gold #D4AF37, blue #2F6BFF. Preserve existing customer data and modules. Review and rollback before destructive migrations.
