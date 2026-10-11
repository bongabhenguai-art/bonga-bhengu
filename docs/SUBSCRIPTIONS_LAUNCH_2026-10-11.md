# Subscription packages — approved implementation brief (2026-10-11)

Integrate into the EXISTING Bonga Bhengu OS storefront, checkout, seller and admin dashboards. Do not create a second app or duplicate homepage.

## Pricing (ZAR)
| Plan | Regular monthly | Launch monthly | Regular annual (10x monthly) | Founding annual |
|---|---:|---:|---:|---:|
| Profile Builder | 399 | 299 | 3990 | 2990 |
| Website Growth | 699 | 499 | 6990 | 4990 |
| Storefront Growth | 1199 | 799 | 11990 | 7990 |
| Business App Pro | 3499 | 2599 | 34990 | 25990 |

Enterprise: Contact Sales; custom quotation.

Founding launch limited to first 100 verified paying subscribers. Launch duration and renewal policy MUST be configured and disclosed before enabling live payments. Do not claim limited places are sold without data. Annual founding price is prepaid for 12 months. Taxes/VAT treatment, domain/hosting/third-party costs and cancellation terms must be displayed before checkout.

## Entitlements
- Profile: business profile, basic brand messaging, WhatsApp CTA, 2 approved sales-post tasks/week, 60 studio minutes/month.
- Website: Profile plus template website up to 5 pages, 4 sales-post tasks/week, 60 studio minutes/month.
- Storefront: Website plus up to 20 products and checkout/order tracking, 6 sales-post tasks/week, 180 studio minutes/month.
- App Pro: Storefront plus template-based branded web app, 8 sales-post tasks/week, 360 studio minutes/month, priority support.
- No unlimited studio access. 24-hour booking availability means session times may be booked throughout the day, NOT 24 free hours. Custom native mobile apps quoted separately.
- Tasks are weekly entitlements, NOT all credited in advance. Annual billing does not accelerate token grants. Weekly resets use Africa/Johannesburg business timezone; monthly studio minutes reset on subscription anniversary. Define prorations and timezone boundary tests.
- One task = one customer-approved campaign post with hook, offer, CTA, tracking; do not promise leads or sales. Technical failures refund tokens idempotently.
- Studio reservations deduct actual billable minutes with concurrency protection, booking capacity and clear cancellation rules. Tokens cannot transfer between accounts; no rollover by default.
- Customer sees balances, usage ledger, billing status, next reset, renewal price and upgrade path. Admin can audit grants and adjustments.
- Payment webhook signature validation, idempotency, role checks, server-side entitlement enforcement, upgrade/downgrade handling, cancellation and refunds are required before activation.
- Require explicit authorization before publishing or customer outreach; obey platform rules and privacy law. Do not enable unsolicited bulk messages.

## UI
Keep existing black #0B0B0B, gold #D4AF37, blue #2F6BFF design system. Four concise package cards, featured Storefront Growth, monthly/annual switch, launch/regular pricing, and Contact Sales. No purple, duplicate layers or extra homepages. Mobile-first layout without zoom or overflow.

## Rollout acceptance
1. Verify current checkout and subscription architecture; integrate with existing payment provider rather than mocking paid state.
2. Add server-owned plan catalog and entitlement ledger, tests for resets and failed jobs.
3. Add storefront pricing UI, dashboard balances and admin controls.
4. Run lint, build, tests and mobile visual checks.
5. Deploy only after validated payment and environment configuration. Do not claim live deployment from this document alone.
