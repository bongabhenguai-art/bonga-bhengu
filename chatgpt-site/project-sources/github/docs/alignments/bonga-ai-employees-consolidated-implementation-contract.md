# Bonga Bhengu AI OS — AI Employees Consolidated Alignment

**Purpose:** Consolidate existing Bonga Bhengu App Library requirements for AI employees into an additive implementation contract. This is not a replacement app or proof of deployed agents.

## Source alignment
- `Pasted markdown(2).md`: agent teams across Business (CEO, CFO, Operations, Reporting), Customer (CRM, Onboarding, Support), Opportunity (Market Research, SEO, Competitive Intelligence, Visibility), Strategy (Strategy Planner, Business Analyst, Financial Planner, Growth Advisor) and Execution (Marketing, Content, Sales, Automation, Project Manager). Requires shared dashboards, tasks, reports, analytics, workflow builder, documents, chat, notifications, approval queue and audit trail.
- `Pasted markdown(10).md`: AI Coach for daily priorities; Mentor for 30/60/90-day direction; Business Operations System Advisor for bottlenecks and processes; Business Strategist, Brand, Marketing, Sales/Closer, Customer, Growth, Studio, Execution, Performance and Autopilot Advisors. Requires real business context, not generic claims.
- `Connected_Enterprise_Intelligence_Architecture_FULL.md`: shared, live-data-connected Business, Customer, Opportunity, Strategy and Execution Intelligence workspaces; agents are not isolated chatbots.
- `AI_Enterprise_Intelligence_Workplace_Detailed_Business_Plan_FULL.docx`: module/engine/agent registry, secure permissions, audit logs, approvals, agent pause/disable, durable workflows and deployment stages.
- Prior Bonga requirements: Hunting, Fishing, Closer, Business Scraper (discover customer needs/business problems, not merely scrape contacts), Business Converter, Business Coach, Business Mentor, Fixer/Problem Resolver, AI Engineer/Frontend Engineer, Illustration/Architecture Workflow AI, Branding, Website Builder, Creative Studio, Marketing, Sales, Amplifier, Sourcing, Money, Workflow, Research, Storage and Connection agents; voice-supported negotiation in Digital Studio.

## Architectural placement
**Bonga Bhengu App remains authoritative.** Add one shared **AI Employees & Execution Engine** behind its existing application shell, tenant database, authentication, four products (Website Builder & Hosting, Digital Visibility, Creative Studio, Digital Banner Builder), subscriptions, admin override, localization and accessibility. Do not create a second application, duplicate tenant records or replace existing AI services.

The customer requests an outcome (voice, chat, upload, tap). Bonga's orchestrator interprets intent, finds existing capabilities, assembles a permitted plan, delegates jobs, checks outputs and returns actual deliverables. Users do not configure repositories or API keys. Bonga centrally manages available engines, but external personal accounts may still require provider-mandated one-time consent.

## Employee registry contract
Each employee must have:
- Stable `agent_id`, display name, department, role, purpose and accountable owner.
- Supported customer intents and task types; required inputs, optional inputs and schema validation.
- Allowed tools/MCP adapters, model routing, knowledge scope and data access permissions.
- Structured output schema, real artifact references, evidence/provenance and execution receipts.
- Collaboration edges, handoff criteria, fallback behavior, timeout/retry limits and escalation.
- Tenant and subscription entitlements, consent/approval policies, cost/usage limits, audit log and admin kill switch.
- Explicit `available / needs_configuration / authorized / running / completed / failed / disabled` operational status; never display an employee as live because an icon exists.

## Core AI employee teams and handoffs
| Team | Employees | Inputs | Outputs |
| --- | --- | --- | --- |
| Discover | Business Scraper, DeepSearch, Visibility, Market/Competitor Research, Hunting | Business name, public sources, confirmed identity, market intent | Evidence-backed needs/problems, qualified opportunities, candidate leads within privacy limits |
| Diagnose | Coach, Operations Advisor, Business Analyst, Fixer | Business Master File, permitted metrics, customer pain points | Bottleneck diagnosis, prioritized action plan, repair tasks |
| Strategize | Mentor, Business Strategist, Brand/Marketing Advisor, Fishing | Goals, customer segments, constraints, evidence | 30/60/90-day strategy, campaigns, offers, positioning |
| Create | AI Engineer, Frontend Engineer, Website Builder, Branding, Illustration/Architecture Workflow, Creative Studio, Banner | Approved brief, assets, brand rules, accessible requirements | Tested code or stored designs, real media assets, previews |
| Sell | Closer, Business Converter, Sales, CRM, Negotiation Assistant | Qualified lead, customer intent, offer, consent | Response suggestions, quotes, permitted follow-ups, sale outcomes |
| Execute | Workflow, Amplifier, Publishing, Sourcing, Connection Agent | Approved jobs, valid integrations, scopes | Real execution receipts, published IDs, supplier options and status |
| Measure | Performance, Analytics, Money, Reporting, Learning | Verified provider events, business records, job results | Measured KPIs, cashflow insights, experiments, next actions |

Agents are workers in one system, not seven additional standalone products.

## Operational workflows
1. **Customer asks for a website:** intake → Business Scraper/Coach identify requirements → Brand Advisor → Website Builder/Engineer → preview/tests → customer approval → deployment via authorized existing route → verify live URL → report.
2. **Customer asks for visibility and leads:** confirm business identity → public evidence scan → Hunting finds opportunity → Fishing develops strategy → Content/Studio generates assets → approval → Amplifier publishes through authorized provider → CRM/Closer follows up → measure verified outcomes.
3. **Customer asks for a video:** accept media/brief → Studio Agent selects available real engine → generate/repurpose → store actual asset → preview → approve → export or publish with provider receipt.
4. **Customer uses voice negotiation:** consented live conversation context → Sales/Closer proposes on-screen/earphone guidance → user chooses response; no undisclosed recording or unauthorized external messaging.

## Android-like experience without technical setup
- One home screen, AI Employees app drawer, universal ask bar, tasks, notifications, files, progress and history.
- Internal engines preconfigured by Bonga; no end-user GitHub, MCP or infrastructure setup.
- Only ask for indispensable business facts, legally required consent or platform account authorization.
- If a provider is unavailable, use an approved compatible fallback or report a clear failure; never simulate completion.
- Users see requested deliverables and their status; admins see providers, logs, policies and overrides.

## CodeRabbit acceptance gates
1. Inspect current Bonga repository and reuse existing agent/module registries; do not rebuild or rename architecture.
2. For each employee, document input → tools → permissions → action → actual output → verification, with typed contracts and tests.
3. Test multi-agent handoffs, tenant isolation, rate limits, provider failure, retries, approval, audit and admin override.
4. Require durable artifact IDs and provider receipts before marking tasks completed.
5. Distinguish planned, implemented, connected, verified and live employees.
6. Preserve Bonga's existing four-package access rules and accessible mobile/voice interface.

**Status:** Consolidated source-backed implementation specification only. No AI agent code, model, provider, GitHub merge or deployment is claimed.
