# Bonga Bhengu Unified App — Integration Contract

Status: integration specification, not a claim of completed deployment.

## Source of truth
Preserve the existing ChatGPT Work site and its routes, UI, data, and functioning modules. This repository currently contains an independent Creative Studio backend; it must be integrated as an optional service, never treated as a replacement frontend. Audit actual application source and deployment access before changing production.

## One app / one authenticated workspace
- Public storefront, seller workspace, admin workspace with strict role-based authorization.
- My Brand: profile, identity, portfolio, storytelling, fashion design and collections.
- My Website: storefront editor, previews, hosting/publishing with explicit approval.
- My Content: digital studio, image/video/audio, livestream/podcast, media library.
- Business Growth: visibility, connection wizard, growth intelligence, execution, CRM and analytics.
- Zuxuru/Transition marketplace: five uploads, AI suggests three for seller approval; order-first manufacturing; stage-based unlocks; store lease, wallet, payout, tax and refunds subject to payment-provider/legal validation.
- AI employee orchestration: Hunting, Fishing, Closer, Spy, Business Scraper (customer problems), Business Converter, Listing, Negotiation voice assistant, Business Coach/Mentor, Fixer, Researcher, Branding, Marketing, Sourcing, Workflow, Money, Amplifier, DesignForge and WebBuilder. Share tools and state; do not duplicate agents.
- Connections: provider OAuth/approved credentials, MCP tools, GitHub, WhatsApp and social publishing; tenant-scoped credential broker and explicit consent.
- Admin override: authorized, audited controls for module activation, AI actions, approvals and policies, without bypassing tenant isolation or financial safeguards.
- Accessibility: mobile responsive, voice navigation, screen readers, captions/sign-language paths, localization, country/currency selection.

## Engineering rules
1. Inventory and map every existing file/module before implementation; preserve working behavior and routes.
2. Implement as additive feature modules behind flags and use existing navigation, design tokens and tenant identity.
3. Distinguish working adapters from unsupported connectors; no pretend API calls or fake successful outputs.
4. Jobs: intake → authorization → plan → execution → human approval → publish/deliver → measure; record status and errors.
5. Protect payments with regulated providers, webhook verification, reconciliation and idempotency; never imply an unlicensed escrow wallet is operational.
6. Test mobile layout, keyboard navigation, tenant separation, permissions, rollback and regression before deployment.
7. Production site deployment requires the actual ChatGPT site source and authorized deployment workflow.

## Visual system
Cyber-dark foundation #050507; gold #D4AF37 for brand, cyan #00FFFF for technical interactions, blue #2F6BFF for primary actions. Keep responsive navigation compact and prevent a giant single-page interface. Preserve existing brand styling where already established.

## Delivery sequence
Inventory → dependency graph → source mapping → non-destructive implementation PRs → tests → authorized site deployment → verification.
