# Bonga Bhengu App — Consolidated Conversation Architecture (Sections 1–99)

**Purpose:** Preserve the full actionable architecture and repository roadmap discussed in this chat. **Status:** specification and partial code only; not a deployed app. Existing ChatGPT Work storefront is the primary application; this GitHub repository is an independent shared Creative Studio backend.

## Non-negotiable platform principles
1. **One Bonga Bhengu App**, one public storefront, one tenant-aware identity and one shared technology infrastructure. Zuxuru App & Website Builder, Fashion Lab, Creative Studio, Business Growth OS, Academy and industry products are products within that app, not separate platforms.
2. Preserve working code, routes, UI, login and architecture; inspect before changing; add capabilities instead of stacking duplicate interfaces.
3. Premium responsive tech UI: black #0B0B0B, gold #D4AF37, action blue #2F6BFF; elegant typography and restrained animation, reduced-motion option, voice/text accessibility and support for relevant African languages.
4. Customer-facing AI employees cooperate via shared orchestration and evidence-based Business Execution Ledger. Business Scraper AI discovers customer needs and business problems, not just contact details.
5. Human approval, tenant authorization, consent, secure secrets, cost limits, verifiable outcomes, rollback and audit for sensitive work. Never simulate successful provider connection, payment or deployment.

## Products and business journeys
- **Storefront:** services, leased digital stores, product discovery, customer onboarding and order placement.
- **Seller dashboard:** list five images, Hunting AI selects three, price/SEO/story suggestions, orders, payouts, wallet, social/WhatsApp links, location and security; AI design tools unlock after five sales, advanced website tools after fifty sales, subject to configured rules.
- **Admin dashboard:** tenants, approvals, commissions, payouts/refunds, tax, AI employee permissions, tools, security and analytics.
- **Zuxuru:** customer-facing AI website/app builder, publishing, branding and integrations.
- **Creative Studio:** multi-camera podcast/livestream/recording, phones as cameras, audio mixing, editing, branded video generation and approved social publishing.
- **Business Growth:** visibility discovery -> permissioned connections -> evidence-backed recommendations -> approved execution -> lead/revenue measurement.
- **Fashion Lab:** designs, patterns, materials, manufacturing/sourcing and sell-before-production workflows.
- **Academy:** coaching, courses, assessments, voice and sign-language support.
- **Service journey:** customer problem -> evidence -> diagnosis -> AI team -> proposal/negotiation -> approval/payment -> action -> quality verification -> delivery -> outcome measurement.

## AI workforce
Existing role catalogue to consolidate rather than duplicate:
Business Scraper (customer problem discovery); Hunting (product/listing opportunity); Fishing (sales strategy and returning customers); Closer (budget/objection/quote); Spy (trends and competitors); Business Coach and Mentor; Problem Resolver/Fixer; Engineer; Workflow; Assistant; Amplifier/Marketing; Branding; Money; DesignForge/Studio; Sourcing; Research; Storage/Library; Connector; Academy/LMS; Listing and voice Negotiation; Business Converter; customer-facing AI advisor.
All employees share tenant context, authorization, task IDs, status, evidence, approvals and measured outcomes.

## Technology catalogue and integrations (Sections 1–73)
Candidate open-source repositories and tools mentioned in the conversation, to evaluate **individually** for licence, deployment, maintenance, security and fit; not all should be installed:
- **Models/gateways:** Ollama, llama.cpp, Qwen, vLLM, Hugging Face Transformers, LiteLLM, TGI; provider adapters for Gemini/OpenAI/Claude when explicitly configured; fallback, budgets and quotas.
- **Agent intelligence:** LangGraph, CrewAI, Dify, LlamaIndex, mem0, Graphiti, GPT Researcher, Firecrawl, browser-use, Aider, OpenHands, Continue.
- **MCP/API/connectors:** Model Context Protocol SDK/reference servers, GitHub MCP, Kong, Apache Camel, Activepieces, n8n, Airbyte, Debezium, Hasura, Directus, Svix.
- **Data and knowledge:** PostgreSQL/pgvector, Supabase, Redis, Meilisearch, Typesense, Qdrant, Neo4j, DuckDB, DataHub, OpenMetadata, dbt, Great Expectations, Soda Core.
- **Customer/business tools:** Twenty CRM, Chatwoot, Zammad, ERPNext, Odoo, Medusa, Saleor, Invoice Ninja, Akaunting, Mautic, Postiz, Cal.com, OpenProject.
- **Creative/studio:** OBS Studio, VDO.Ninja, MediaMTX/SRS, FFmpeg, LiveKit, Kdenlive, Video.js, Shaka Player, hls.js, Jellyfin, C2PA, Immich.
- **UX/app platform:** React, PWA, Capacitor, Tauri, React Bits, Motion, Three Fiber, GSAP, Playwright, axe-core, Yjs, RxDB, ElectricSQL.
- **Monitoring and evaluation:** Prometheus, Grafana, Sentry, PostHog, Matomo, Plausible, Metabase, Superset, Lightdash, Langfuse, Promptfoo, GrowthBook, Unleash, OpenCost.
- **Identity/security:** Keycloak, Ory, OpenFGA, OPA, Infisical, Wazuh, CrowdSec, Fail2ban, Trivy, Semgrep, Syft, Cosign, Restic, Borg.
- **Deployment/workflow:** Docker, Coolify, GitHub Actions, Argo CD, Renovate, Temporal, BullMQ, Airflow, Dagster, PM4Py, Flowable.
- **Education/documentation:** Moodle, Open edX, H5P, JupyterLab, Docling, Unstructured, Paperless-ngx, Documenso, Nextcloud.
- **Location/accessibility:** OpenStreetMap, MapLibre, Leaflet, OSRM, Valhalla, VROOM, i18next, LibreTranslate, whisper.cpp, Piper.
- **Analytics/simulation:** Prophet, Darts, PyCaret, FLAML, Optuna, OR-Tools, SimPy, Pyomo, Plotly.
- **Finance/metering:** Kill Bill, Firefly III, ledger-based reconciliation and charge/refund verification; regulated fund custody must use appropriately authorized payment providers.
These are **research candidates** rather than approved dependencies.

## Additional architecture from Sections 74–98
### Technology Intelligence Controller (74–79)
GitHub repository discovery, capability matching, licence/dependency/security scanning (GitHub MCP, OpenSSF Scorecard, OSS Review Toolkit, Syft, Trivy, Renovate, Semgrep); change proposals, admin approval, test and rollback. Maintain integration registry (repo/version/licence/dependencies/permissions/owner/tenant scope/test/deployment state).
### Real-World Business Operations Controller (80–85)
Authorized POS, QR/barcodes, receipts, device integration, stock, procurement, workforce, scheduling, logistics, financial reconciliation and audit. Candidate tools: ZXing JS, node-escpos, Mosquitto, Node-RED, Frappe HRMS, Kimai, Cal.com, Traccar, ERPNext, Kill Bill. Enforce idempotent payments and provider-signed callbacks; never mistake a software wallet for licensed fund custody.
### AI Communication & Event Intelligence Controller (86–92)
A2A for compatible agent messaging, MCP for tools/resources, NATS/Temporal for reliable events/workflows, Centrifugo/Novu for updates. Verify event origin, schema, tenant and idempotency; dead-letter/retry handling, service recovery and observability. Internationalization via i18next, LibreTranslate and Unicode CLDR; location via Leaflet/MapLibre; digital trust via C2PA/Cosign/credential frameworks.
### Universal Business Command Engine (93–99)
One voice/text command surface for customer needs, websites, account connections, campaigns, quotes, orders and finance questions. Pipeline: command -> intent/context -> tenant/auth/subscription/budget checks -> existing AI employee delegation -> evidence-based proposal -> approval -> authorized tool execution -> verified outcome -> execution ledger -> customer-facing status.
Connection Wizard: provider selection -> permission explanation -> official OAuth/approved auth -> encrypted vault -> verify -> scope -> revoke. Execution Centre: progress, employee, evidence, approvals, errors, costs and outcomes.

## Actual GitHub work completed in this chat
- `docs/unified-ai-business-command-expansion.md`: detailed architecture specification for sections 74–98.
- `creative-studio/command_engine.py`: **pure Python state-machine contract**, employee routing, approval gating and verification guards. Not a live route or autonomous executor.
- `creative-studio/test_command_engine.py`: unit tests for state transitions and approval checks; not yet run in CI.
- Existing `creative-studio/app.py` retains /tenants, /jobs, /health, animation and connections routers.
- Existing `creative-studio/connections.py` returns configuration-required; real OAuth, vault, session auth and deployment are not present.

## Implementation backlog (in order)
1. Identify and access actual ChatGPT Work storefront source and deployment; audit routes, components, user/tenant auth and existing integration points. Do not merge blindly with this backend.
2. Add authenticated session + role/tenant authorization and persistent event/command ledger; idempotency and input validation.
3. Mount command routes only after security checks; ensure no fake execution results.
4. Connect one existing employee to one permitted tool, verify real outcome, test failures and approvals.
5. Implement customer command surface, connection wizard and execution timeline **inside existing Bonga Bhengu storefront**.
6. Add integration registry, event bus and operations connectors incrementally; tests and staged deployments with rollback.
7. Validate UX on mobile/desktop and accessibility; run CI tests and secure production release.

## Definition of done
One live Bonga Bhengu App entry point, no duplicate OS; authenticated tenants; one shared AI execution system; official account connections; evidence-based results; secure payments; tested/approved deployments; documented rollback. **This definition is not yet met.**

**Note:** This document consolidates the visible conversation and prior section summaries, not a verbatim export of every past message or every project file.
