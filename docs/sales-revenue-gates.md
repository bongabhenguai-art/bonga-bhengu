# Bonga Bhengu OS — Sales Revenue Gates (16 October 2026)

Scope: Bonga Bhengu OS only. Chatbliz OS is a separate product/repository. This is an implementation specification, not evidence of deployed functionality.

## Release gates (block live sales claims until verified)
1. Checkout: provider-hosted payment initiation, server-side webhook signature verification, idempotent order/payment event processing, amount/currency validation, refund reconciliation, and paid status only after verified provider settlement/confirmation. Never store card details. Remove or truthfully surface `billingConnected: false` until operational. See #18.
2. Enquiries/CRM: explicit consent, purpose and channel, opt-out/suppression, qualification (need, budget, authority, timeframe), assigned owner, follow-up due date, history and audit trail. No unsolicited bulk outreach. See #19.
3. Appointment booking: query calendar availability before proposing; create only after affirmative customer acceptance and confirmation; preserve timezone Africa/Johannesburg, contact method and consent.
4. Pricing: single canonical package catalog, approved currency/tax policy and offer/upgrade eligibility. Do not quote unapproved prices.
5. One workspace: fix navigation and service boundaries without rebuilding or importing Chatbliz OS. See #15.
6. Sales metrics: daily SAST report with verified paid orders, paid amount/refunds, actual replies, confirmed appointments, consented qualified pipeline value, and blockers. Unknown is not zero.

## AI employee handoffs
- Hunting: permitted public signals and first-party inbound only; provenance + relevance.
- Fishing: verify fit and purchase intent; record consent and qualification.
- Closer: draft one-to-one authorized follow-up; request approval when required; confirm meetings.
- Design Influence: generate only scoped proposal/design briefs.
- Studio: produce only approved customer content, using licensed assets and consent.
- Fixer: alert on payment, webhook, form, CRM and booking failures; do not silently simulate success.

## Acceptance tests
- Unconfigured checkout clearly refuses paid-order claims.
- Duplicate webhook creates one order only; invalid signature rejected.
- Declined payment cannot become paid; refunds update net revenue.
- Enquiry with no consent cannot enter outbound queue; opt-out stops all future contact.
- Meeting without affirmative customer confirmation cannot show as booked.
- All timestamps and revenue reports distinguish SAST local day.
- Run end-to-end browser tests on deployed frontend and backend, with actual provider sandbox events and documented evidence.

## Current state
GitHub issues #18, #19, #15, #10 remain open as of review. No production fix or payment has been verified by this document.
