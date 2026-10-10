# File 11 — Tech-Fashion Animation and Shared AI Engine

**Source:** `Pasted text(8).txt` (user-collected web excerpts and creative prompts, 8 October 2026). This is a **design and implementation reference**, not evidence that named third-party tools or integrations are installed, free, or available. Preserve Bonga Bhengu App architecture and the existing four-product subscription structure.

## Relevant concepts to adopt
- Progressive enhancement: animated blueprint grids, cyber-dark visual treatment, optional cyan/magenta/green accent states, garment lookbook scroll reveals, spec-line hover feedback and media banners.
- A shared, **multi-tenant** creative/growth engine: the agency and subscribed customer businesses use the same generation and distribution pipeline with tenant-specific branding, permissions and credentials.
- Product surfaces: Creative Studio, Website Builder/Digital Visibility and Digital Banner Builder; Content Automation is a capability spanning these products, **not a replacement subscription tier**.
- Separate marketing claims from proven production actions. Never label a simulated graph, render status, ad inventory or campaign as live.

## UI placement — preserve existing components
| Source idea | Additive Bonga location | Constraint |
|---|---|---|
| Animated lookbook and garment tech specs | Existing fashion/creative studio UI | IntersectionObserver with reduced-motion fallback; no invented fabric/poly count |
| Blueprint grid and neon hover treatments | Scoped fashion/creative CSS | Do not override global Bonga branding or force zero-radius everywhere |
| Studio/website/banner panels | Existing product navigation | Use current four-product entitlement and existing tier selection |
| Video ad slot and rent action | Digital Banner Builder | Show real inventory, real approved creative and valid checkout only |
| Tier toggle prototype | Historical design reference | Do **not** replace four subscription packages with three-tier demo |

## Shared workflow contract
Authorized tenant and active entitlement → fetch tenant-specific brand assets/strategy → create creative brief → queue reusable script/render/banner nodes → persist versioned asset → review/approval → authorized publish via verified connector → record provider receipt → measure performance → learn.

**Tenant isolation:** scope every database query, media path, job, cache key, callback, API token and publishing target to an authenticated tenant. Agency-owned assets must not leak into customer jobs. Store credentials in a secure server-side vault, never in a front-end script or GitHub.

## Provider evaluation
Google AI Studio, Flow/Veo, Dyad, Replit, Bolt, V0, Make.com, Leonardo.ai, Runway and other tools appear in source excerpts as examples. Their prices, licensing, quotas, integration availability and compatibility are **unverified** here. Prefer existing app tooling and inspect each tool before adding it. A Google Sites embed HTML is not the canonical source for the deployed Bonga ChatGPT Site.

## Quality and CodeRabbit checks
1. No mock 'ONLINE' statuses or placeholder checkout links presented as real.
2. No invented ad rental slots, fabricated SEO metrics, false '100% automated' claims or stock-video rights assumptions.
3. Animation respects `prefers-reduced-motion`, keyboard navigation, mobile layout and performance budgets.
4. Shared engine job execution enforces tenant ownership, subscription entitlements and approval policy.
5. External publishing only through verified authorized connectors with receipts and audit trail.
6. Maintain existing site routes, products, prices, shared engines and admin override.

**Status:** File 11 reviewed and aligned as documentation. This commit does not deploy animation code or enable any external provider.
