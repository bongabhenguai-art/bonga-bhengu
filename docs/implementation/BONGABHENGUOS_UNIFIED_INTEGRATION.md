# Bonga Bhengu OS — Unified integration contract

Target domain: https://bongabhenguos.online
Existing app: https://bonga-bhenguai.donlegendwear.chatgpt.site/
Repository: bongabhenguai-art/bonga-bhengu

## Non-destructive rules
- One application, shared authentication, tenant isolation, backend, design system and navigation.
- Do not replace production entrypoints or remove existing modules until their imports, routes and data contracts are audited.
- One storefront home route and header; no duplicate homepage/hero/navigation mounts.
- Keep three top-level surfaces: Storefront (customers), Seller (leased stores), Admin (mall management). Digital Studio and Zuxuru are integrated products/workspaces, not duplicate applications.
- Preserve the current deployed website and DNS/email configuration; GitHub commits alone do not publish the domain.

## Integration order
1. Locate actual deployed frontend root, hosting provider, production branch and build commands. Verify that bongabhenguos.online redirects or resolves to the intended deployment.
2. Inventory duplicate homepage components, routes, layouts and headers. Identify canonical storefront; route aliases should redirect or reuse a single component rather than mount a second copy.
3. Reconcile open PRs #3 (fashion workspace), #7 (Studio device modules), #8 (CodeRabbit follow-ups), #5 (gated archival image inspection), #4 (audit); do not merge blindly. PR #8 and #7 touch overlapping files.
4. Integrate approved functionality behind existing authorization, feature flags and tested APIs. Keep unavailable AI, camera transport, video generation and remote-streaming features clearly marked until operational.
5. Test mobile Android layout, one header/hero per page, storefront-seller-admin navigation, sign-in, orders, tenant permissions, email/contact, studio local camera, accessibility, and backend health.
6. Request CodeRabbit review, resolve blockers, merge reviewed changes and deploy through verified hosting pipeline. Confirm production content and rollback route.

## Release acceptance
- One homepage and top navigation; no duplicated sections.
- No broken links between the three interfaces.
- Existing user/store/order data retained.
- Tests and actual deployment evidence recorded before calling features live.

This file is an integration plan, not a claim that the app has been merged or deployed.
