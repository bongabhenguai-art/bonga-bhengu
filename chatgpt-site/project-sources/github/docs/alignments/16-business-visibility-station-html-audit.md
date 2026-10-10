# File 16 — Business Visibility Station HTML Prototype Review

**Source inspected:** `Zuxuru_Business_Visibility_Station_Builder.html` (~23.6 KB). Companion specification was aligned as file 10. This is a standalone HTML/CSS/JavaScript prototype, **not** an authorized Bonga production module.

## Verified implementation in the source
- Responsive left-sidebar dashboard with navigation for Visibility Station, Business Profile, Business Builder, Visibility & Score, Platform Profiles, Connections/CIA, Digital Studio, Marketing & Growth, Leads/Inbox, AI Autopilot, Analytics and History.
- Editable business profile inputs and an illustrative platform/evidence inventory.
- Seeded fictional **Sunrise Café & Bistro** business, score of **72**, mock platform statuses and mock history.
- Local state persisted in browser `localStorage` under `zuxuru_station`.
- Client-side click handlers update simulated connections, asset drafts, gap completion and visibility score.

## Critical gaps found by reviewing actual JavaScript
1. `connectPlatform()` sets a provider to **Connected** without OAuth, provider confirmation or credentials.
2. `connectSystem()` similarly marks an integration connected without contacting any system.
3. The “Rescan & Rescore” button increments the visibility score by **3** without gathering evidence.
4. `closeGap()` removes a visibility gap without performing the required fix.
5. `createAsset()` adds a text-only mock draft; it does not generate an image, video or audio file.
6. The “DeepSearch completed” and other history events are seeded examples, not proof of live investigations.
7. Lead, AI and analytics pages are generic placeholder workspaces.
8. `localStorage` is not a multi-tenant database and cannot enforce user roles or isolation.
9. Inline `onclick` handlers and large `innerHTML` rendering are not a suitable basis for secure authenticated production interactions.
10. No real login, secure storage, evidence retrieval, score calculation, publishing or audit backend exists in this HTML.

## Preserve and adapt to Bonga Bhengu App
| Source UI | Existing Bonga destination | Required implementation boundary |
|---|---|---|
| Visibility Station shell | Digital Visibility customer dashboard | Keep existing navigation, brand, authentication and roles |
| Business Profile/Builder | Existing business profile / Website Builder | Server-side tenant-scoped CRUD and owner confirmation |
| Score, Platforms and DeepSearch | Business Visibility Intelligence | Evidence URLs, timestamps, coverage, reproducible scoring |
| Connections/CIA | Existing connection wizard | Real OAuth, consent, permission state and revoke |
| Studio | Existing `creative-studio/` | Actual capture/generation/editing services and asset persistence |
| Marketing, leads, AI agents | Existing growth/CRM/agents | Real jobs, approvals, verified results and audit |
| History and Analytics | Shared reporting and event store | Append-only events backed by actual executions |

The historical Zuxuru purple/pink design is optional inspiration. Do not replace Bonga's existing branding or four-product subscription model.

## Safe implementation sequence
1. Preserve the original prototype in source records; do not ship seeded business or mock status actions to production.
2. Reuse the existing app shell and components; implement Visibility Station as an additive routed workspace.
3. Replace `localStorage` as the source of truth with authenticated backend persistence and tenant permissions.
4. Implement business discovery and identity resolution with real evidence before scores.
5. Integrate provider connections using authorized APIs and server-side token storage.
6. Make rescoring depend on new evidence, not an arbitrary increment.
7. Connect Studio and CRM actions to real services with pending/success/failure receipts.
8. Add mobile, keyboard, screen-reader, failure-state and tenant-isolation tests.

## CodeRabbit acceptance tests
- Fake Connect cannot display a real connected state.
- Rescore cannot increase without new validated measurements.
- One tenant cannot access another tenant's business, assets or events.
- Demo seeded businesses never appear as actual customer data.
- History and analytics are derived from recorded actions, not optimistic client-only clicks.
- Existing Bonga products, routes, pricing and admin override remain intact.

**Status:** File 16 reviewed and aligned as a concrete code audit and migration contract. The source HTML and functional app code have **not** been deployed by this documentation commit.
