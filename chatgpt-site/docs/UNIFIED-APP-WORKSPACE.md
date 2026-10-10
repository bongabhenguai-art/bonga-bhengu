# Bonga Bhengu storefront and unified app — 10 October 2026

The Bonga Bhengu storefront at `/` is the main entry for both public and signed-in visitors. Signing in no longer bypasses the storefront. Its four “YOUR NEXT MOVE” cards, top navigation and full searchable module menu lead into the same existing application. The installed app starts at `/`; its existing `/phone.html` manifest identity and icons are retained. Old phone and laptop home entries open the storefront, while explicit device-tool links still open their module.

`/app.html` remains the signed-in working surface. Its home view mounts the actual storefront at `/?embedded=1` in one retained frame, including any homepage previously published by the owner. Selecting a storefront workspace or tool while inside the application routes into the parent app without replacing its document. Returning to the storefront retains open form inputs, loaded Studio and device-tool instances. The storefront uses the same route registry and owner filtering as the app. Public visitors can browse the storefront and select tools; saved business work requires the original sign-in. The selected module travels in the URL query so it survives the sign-in round trip even when the fragment is unavailable.

## Four workspaces

| Workspace | Entry | Modules |
| --- | --- | --- |
| 01 / My Brand | Profile & identity | Profile, companies and brands, collection and costing, Fashion brief |
| 02 / My Website | Storefront & hosting | Website builder, preview and publishing, visibility, website button and links |
| 03 / My Content | Digital studio | Studio, creative projects, campaigns, media library, device files, screen recorder, voice notes, photo capture |
| 04 / My Business | Customers & delivery | Orders, prospects, sourcing, tasks, workflow engine, connected system overview, AI assistant, business plan, results, connections, platform accounts, service health, settings; owner console and owner workroom for the owner only |

`dist/app-routes.js` assigns each of the 31 non-home modules exactly once. The laptop rail, phone dock, workspace module bar and storefront module menu use this registry. The public menu excludes owner tools until the existing server status identifies the owner; server owner checks remain authoritative.

## Preserve the existing architecture

`scripts/build-app-shell.mjs` generates the working app from `fashion-service.html`, retaining all original business component IDs, handlers, cloud initialization, account isolation, revision checks and workflow run gates. Business modules switch within one document. Contextual actions focus the original form or click its original guarded run control. Forms stay inert until the existing cloud loader finishes. Account setup and browser-record migration remain explicit existing-workspace choices.

The original dashboard routing script defers panel visibility to the app shell when mounted there. Its own standalone routing behavior remains available. Existing Studio retains its component ID and parent integration and mounts only once. Device files, screen recording and settings share one retained laptop-tools document; voice and camera share one phone-tools document. Committing existing workflows may still reload their saved records. Captures must be stopped and downloaded before closing or reloading the application.

Existing full-page module entries and OS filename aliases open their canonical app module. Embedded tools remain in their working session. Phone camera pairing keeps its invitation and room credentials in the dedicated participation page. Source and entry asset URLs are versioned for this release.

## OS file merge

The current `Bonga_Bhengu_Fashion_OS.html`, `bonga-bhengu-app.zip` and its linked `index.html` were inspected. The original Fashion OS collection interface, tier navigation, editable specs, image preview, brief generation, downloads, clipboard fallback and WhatsApp handoff already exist in the integrated Fashion OS. Every original component ID is retained.

The standalone package's Website Builder and Digital Banner briefs are now available alongside Digital Visibility and Creative Studio in the original brief form. All four save into the existing account-scoped work queue with revision checks, deduplication and Proposed status. Website and visibility briefs route to the visibility work area; Studio and banner briefs route to marketing. Existing tasks, creative projects and other account records remain intact. No new business store or execution engine is created.

`docs/OS-SOURCE-MERGE.json` records source identities, package hashes, preserved component IDs and the mapping into current modules. `fashion-studio.html` and `Bonga_Bhengu_Fashion_OS.html` are compatibility aliases to the single integrated Fashion OS. External generation and publishing retain their current connection and approval requirements.

## Validation

All 23 automated test files pass. The app controller test checks the real storefront frame, retained forms and sessions, module grouping, owner guards, legacy entry and original guarded engine delegation. The storefront test runs its actual menu controller for guest and owner filtering, all module destinations, custom published homepage entry, sign-in route retention, and handoff from the retained storefront into the parent app. OS save tests use the actual Worker to verify new website and banner briefs, account isolation, preservation, deduplication, stale revision rejection and queue limits. The existing engine, media, task and recording regression checks also pass.

Visual browser and real device testing remain unverified because no browser-control skill is available in the managed environment. A fresh authenticated CodeRabbit review is also unverified.
