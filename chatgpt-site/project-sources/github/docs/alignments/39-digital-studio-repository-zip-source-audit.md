# File 39 — Digital Studio Repository ZIP: Actual Source Audit and Bonga Integration

**Source:** `zuxuru-digital-studio-repository.zip` (22,503 bytes). Materialized and inspected as a ZIP, including frontend pages, backend, manifests, architecture documents and adapter directories. This is a **Next.js + FastAPI starter monorepo**, not a deployed or complete production Studio.

## Verified repository structure
- `apps/web/`: Next.js App Router frontend, React/TypeScript, pages for Studio home, Website Builder, Social Builder, Phone Camera, Recording, Podcast, Livestream and Content Engine; root app page.
- `apps/web/package.json`: `next`, `react` and `react-dom` pinned to **`latest`**, with dev/build/start scripts; no lockfile seen in archive.
- `apps/api/app/main.py`: FastAPI 0.1.0 with `GET /health`, `GET /api/studio/modules`, `POST /api/studio/projects`. The POST accepts `name`, `type`, optional `goal` and returns the **fixed** `project-demo-001` ID without persistence.
- `packages/core/README.md`: planned domain entities (Business, GrowthBlockage, Opportunity, Hook, Offer, ContentProject, Recording, Asset, Website, SocialPost, PodcastEpisode, Livestream, Lead, ClosePackage, Publication, Result); **documentation, not implemented types**.
- `packages/adapters/{website,social,streaming,podcast,storage,ai-editing,analytics,publishing}/README.md`: placeholder interface directories with explanatory text, **not real provider implementations**.
- `docs/architecture.md`, `docs/product-flow.md`, `docs/github.md`, root README: workflow and architecture guidance. Historical GitHub handoff proposes creating a new `zuxuru-digital-studio` repository; **do not follow this for Bonga**.
- `.env.example` and `.gitignore`: configuration examples; no evidence of connected production accounts or secrets.

## What code does today
- Studio home displays seven linked feature areas; pages show forms, controls and descriptions.
- **Phone Camera** is a genuine browser device-access attempt: `navigator.mediaDevices.getUserMedia({video:true,audio:true})`, attaches stream to a `video` element and toggles `Camera active`. It does **not** call MediaRecorder, capture a file, upload content or stop tracks.
- Livestream UI shows title, YouTube/Facebook/LinkedIn/Custom RTMP buttons and “Create live session” button; **no handlers, provider authorization, RTMP/SRT ingest, scene mixer, actual stream or recording**.
- Podcast, Recording, Website, Social and Content pages are planning UI starters; no verified operational publish, AI editing, site deployment or platform sync.
- FastAPI `/api/studio/projects` returns a static demo ID; **no database, tenant isolation, queue, storage or audit**.
- No evidence of working frontend→FastAPI integration, tests, CI, deployed endpoint or CodeRabbit review.

## Technical and safety gaps
1. **Camera cleanup:** `getUserMedia` lacks try/catch and explicit stop/release on unmount; audio is requested despite muted local preview. Add permission states, device selection, privacy controls, track cleanup and secure-context requirements.
2. **No recording pipeline:** implement MediaRecorder or supported capture transport, media MIME/size validation, resumable upload, signed tenant-scoped storage and retention policy.
3. **No livestream pipeline:** production requires camera/audio capture, preview/program scenes, mixing, ingestion service (RTMP/SRT/WebRTC as appropriate), destination auth, stream health, stop/reconnect and recording receipts.
4. **Static project ID:** API responds `project-demo-001` for every request; must replace with tenant-authorized unique IDs and persistent project state before multi-user use.
5. **No auth, OAuth, permissions or approval:** no access control on API or proof of real social, streaming, website or analytics adapters. Publishing and spend must be owner-approved.
6. **Unpinned dependency versions:** `latest` introduces non-reproducible builds. Pin compatible versions and commit lockfile within existing Bonga package strategy.
7. **No shared state or persistence:** drafts and project metadata are not connected to Bonga's actual business records, brand kit, asset library or campaign history.
8. **No evidence of output:** buttons and workflow diagrams do not prove generated videos, podcasts, sites, live sessions, scheduled posts, leads or results.
9. **Accessibility:** test responsive camera controls, keyboard focus, labeled fields, media permissions, screen readers, captions/transcripts and multilingual/voice workflows.

## Additive mapping to Bonga Bhengu App
**Keep the current Bonga application, repository, authentication, tenant schema, design system, admin override, four subscription packages and four product families.**

- **Creative Studio:** adapt Camera, Recording, Podcast, Livestream, Content Engine and Social content creation into existing Studio modules; do not create a second Studio shell.
- **Website Builder & Hosting:** map Website page ideas to the existing builder, publishing pipeline and hosting integration.
- **Digital Visibility:** feed real business growth blockage, opportunity, campaign and analytics data to Studio briefs.
- **Digital Banner Builder:** reuse brand kit, media templates and asset pipelines for static/animated banners.
- **Shared AI employees:** Business Scraper/Coach/Mentor/Hook/Fishing/Closer propose content and conversion objectives; authorized execution uses real adapters and job receipts.
- **Integration layer:** provider-independent adapter contracts for camera, storage, AI editing, publishing, social, streaming and analytics; implement only missing connectors through Bonga's existing connection wizard and credentials vault.
- **Production loop:** verified business problem → campaign objective → brief → capture/generation → review → explicit approval → publish → leads → qualified opportunities → closes → measured results.

## CodeRabbit staged acceptance gates
1. Inventory existing Bonga Creative Studio and Website Builder components to avoid duplicates.
2. Extract only reusable, compatible camera and page-level code behind existing Bonga interfaces; no new app or repository.
3. Verify secure camera permission handling, error display, device release, real recording and persisted output receipts.
4. Implement tenant-scoped unique project IDs, authenticated APIs, persistent storage and access/audit policies.
5. Connect actual streaming/social/publishing adapters only with provider authorization, sandbox tests, rate limits and idempotency.
6. Add accessibility, cross-device, media lifecycle, no-fake-success and build/test CI coverage.
7. Treat adapter README folders as **future contracts** until real implementation and integration tests prove otherwise.

**Status:** Source-specific ZIP review complete. This is a **documentation-only** alignment commit; no Next.js/FastAPI runtime code has been merged into Bonga, no Studio feature deployed, and no live publishing/streaming integration verified.
