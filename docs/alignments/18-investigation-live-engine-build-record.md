# File 18 — Zuxuru Investigation and Live System Engine Build Record

**Source:** `Pasted markdown(9).md` (~22 KB), a pasted historical development transcript containing architecture diagrams, code-tool summaries and claims of completed React/TypeScript components. **The original source files mentioned in the transcript were not supplied or verified in this review.** Treat this as a migration inventory and requirements source, not proof of deployed functionality.

## Preserve Bonga Bhengu App architecture
Bonga Bhengu is the host application. Retain existing routes, authentication, tenancy, Website Builder, Digital Visibility, Creative Studio, Digital Banner Builder, subscriptions and admin override. Historical Zuxuru navigation and React components may donate features, not replace the application shell.

## Source-described component inventory — verify before reuse
- `Layout.tsx`, `Sidebar.tsx`, `Dashboard.tsx`, `Investigate.tsx`, `Login.tsx`, `Settings.tsx`.
- Business/Customer/Asset Intelligence, Diagnosis, Opportunities, Solutions, Studio and related pages.
- `ZuxuruAlgorithm.ts`, `Algorithm.tsx`, `SEO_ALGORITHM_ENHANCEMENTS.md`, `CROSS_PLATFORM_FOUNDER_DISCOVERY.md`.
- `LiveAPIIntegration.ts`, `APISettings.tsx`, `ModuleConnector.ts`, `ModuleRegistry.ts`, `Modules.tsx`.
- `LiveSystemEngine.ts`, `PlatformAdapters.ts`, `LiveDashboard.tsx`, `initialize.ts`.
- Documentation and `.env.example` are mentioned, but neither credentials nor actual file contents were inspected.

**Do not claim** that the listed 20 algorithms, 24 GitHub modules, 10 APIs, six platform adapters, 1-second loop or “all buttons live” are running. The source is a historical claim without test artifacts, code, provider receipts or accessible runtime.

## Additive Bonga capability mapping
| Historical subsystem | Existing Bonga integration | Real-world acceptance |
|---|---|---|
| Investigation Engine and replay | Digital Visibility / Business Scraper | Business identity resolution, evidence URLs, timestamps, replayable steps |
| Founder discovery | Business graph | Verified founder/person-to-company relationship, not name coincidence |
| Multi-engine SEO | Visibility Intelligence | Authorized/observable source metrics, coverage, unknown state |
| Opportunity/diagnosis graph | Business Growth agents | Evidence-linked problems, root causes, prioritized repairs |
| Module registry | Shared agent/tool registry | Installed version, license, health, allowed tenant capabilities |
| Live API integration | Existing connector wizard / Vault | Official provider auth, scopes, error and revocation states |
| Platform adapters | Execution/analytics services | Documented API data, rate limits, permissions and verified measurements |
| Live System Engine | Shared event/queue scheduler | Durable jobs, bounded retries, idempotency, resource limits, audit trail |
| Live Dashboard | Existing admin/seller dashboard | Only measured statuses, clear demo/pending/error states |

## Critical technical corrections
1. **A browser-side 1-second tick is not a reliable always-on backend.** Use durable queues, scheduled workers and event subscriptions, with intervals appropriate to each provider's limits.
2. Proprietary Google/Meta/TikTok/YouTube/LinkedIn ranking algorithms are not accessible via ordinary APIs. Model observable signals; never claim to read private algorithms.
3. **No silent fallback from live API failure to mock data in production.** Surface unavailable/error/stale, and isolate explicit demos.
4. No platform marked connected unless official authorization and an authenticated provider check succeed.
5. Founder names and social profiles require disambiguation, provenance and privacy controls; do not scrape or merge unrelated people.
6. Visibility scoring must be deterministic and based on fresh evidence, not AI guesses or artificial increments.
7. Open-source modules require repository identity, compatible license, security review, deployment fit and version pinning.
8. “All buttons live” means every action has real behavior or is visibly disabled with an explanation, not a fake success toast.
9. Agent actions that publish, send, spend or alter third-party systems require appropriate owner/admin permission and execution receipts.

## Incremental implementation order
1. Inspect the current Bonga code and locate actual historical Zuxuru source repositories/archives before importing anything.
2. Reuse existing authentication and tenant-scoped business profiles.
3. Implement evidence capture and investigation replay first, with tested connectors.
4. Register vetted modules as capability adapters rather than bundling unverified repositories.
5. Implement durable orchestration, event history and live health telemetry.
6. Integrate Studio, lead management, sales and publishing through existing modules.
7. Test cross-tenant access, provider revocation, failure states, score reproducibility, background recovery and mobile accessibility.

## CodeRabbit gates
- No architectural replacement, new parallel login or duplicate billing engine.
- No simulated data shown as real provider output.
- No hard-coded secrets or API keys in frontend.
- No unbounded polling or unnecessary API spend.
- Every automated external action has authorization, audit and idempotency.
- Claims of production readiness require repository evidence, tests and real execution receipts.

**Status:** File 18 reviewed and aligned as a build-record audit and migration plan. This GitHub documentation commit does not import historical source code, run APIs, deploy workers or establish that historical implementation claims are true.
