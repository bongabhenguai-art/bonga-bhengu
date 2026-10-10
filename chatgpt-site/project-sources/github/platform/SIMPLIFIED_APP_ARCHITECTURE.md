# Bonga Bhengu App — Simplified Product Architecture

## Customer navigation (six destinations, no duplicate menus)
1. **Home** — one overview, latest results, next recommended action.
2. **My Business** — profile, brand, website and business assets.
3. **Tools** — four product cards only: Website, Visibility, Creative Studio, Digital Banner.
4. **Activity** — one task queue and history for every tool.
5. **Connections** — one authorization wizard for all APIs, MCP, social accounts and plugins.
6. **Account** — subscription, permissions, devices and settings.

Admin controls are role-gated inside Account, not a second customer-facing app. Android and laptop share the same routes and workflow engine; only layout changes.

## Canonical code ownership
| Responsibility | Canonical owner | Reuse / retire duplicate behavior |
|---|---|---|
| Capability routing | `platform/future-os.js` | All four products register here; no private registries per tool |
| Customer action lifecycle | `platform/business-workflow.js` | One queue/history/approval model, not per-product workflow engines |
| Frontend-to-service adapters | `platform/live-module-connectors.js` | No duplicate API client per module |
| Responsive Android layer | `mobile/smartphone-runtime.js` | `mobile/android-capabilities.js` stays low-level device API; CSS stays presentation only |
| Premium design | `design-system/legendary-luxury.css` | Keep original design features; consolidate shared colors and controls |
| Website generation | `website-builder/builder.py` | `site_pipeline.py` may orchestrate; do not implement a second generator |
| Creative rendering | `creative-studio/app.py` | One studio API; animation.py is the animation capability |
| Banner animation | `creative-studio/animation.py` | Banner uses studio service; avoid a second unrelated banner service |
| Connections | Future backend vault/service (not built) | `creative-studio/connections.py` remains a legacy registry until migrated |
| Subscription enforcement | `subscriptions/access.py` and `subscriptions/limits.py` | Enforce server-side; no duplicated paywall logic in each tool |

## Simplification rules
- Never delete customer data or existing features just to remove a duplicate UI entry.
- Merge duplicated **navigation and orchestration**, not distinct capabilities.
- One identity, one tenant context, one connector directory, one activity feed, one approval flow.
- Each tool is discoverable once in Tools and may appear as a shortcut on Home.
- Show results and next action by default; hide technical logs, infrastructure, model selection and GitHub controls from customers.
- Builder/admin can open advanced controls by role; tenant customers cannot see another tenant's data.
- Mark a capability live only after real backend health, authentication and end-to-end execution checks.
- Original ChatGPT Sites website remains unchanged until its source/deployment integration is authorized.

## Migration order
1. Inventory original UI routes and map duplicate buttons to six canonical destinations.
2. Wire existing four modules to one capability registry and one workflow lifecycle.
3. Move connector permissions into a tenant-aware server vault and connect session-based auth.
4. Verify output, approvals, cancellation, audit history and tenant isolation.
5. Test on Android and laptop, then publish the **original** application.
