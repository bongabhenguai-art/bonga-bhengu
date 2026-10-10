# Bonga Bhengu AI OS — All AI Teams Master Registry

**Source-backed consolidation:** `Pasted markdown(2).md` (five workplace agent teams); `Pasted markdown(10).md` (AI Coach/Mentor and specialist advisor team); `AI_Enterprise_Intelligence_Workplace_Detailed_Business_Plan_FULL.docx` (executive, customer, growth, sales and operations teams); `Connected_Enterprise_Intelligence_Architecture_FULL.md` (shared real-data intelligence workspaces); historical Bonga AI employee requirements and prior [AI Employees implementation contract](./bonga-ai-employees-consolidated-implementation-contract.md).

**Architecture:** Bonga Bhengu App is authoritative. This is an additive **team and employee registry**, not a replacement app or confirmation that the listed employees run in production.

## 1. Complete consolidated team directory

| Team / department | AI employees and aliases | Responsibility | Evidence-backed inputs → deliverables |
| --- | --- | --- | --- |
| **Executive & Business Intelligence** | CEO Agent, COO Agent, CFO Agent, CTO Agent, Operations Agent, Reporting Agent, Business Analyst | Business priorities, operational health, finance/technology decisions, management reporting | Business Master File, authorized finance/operations data → executive briefs, risks, reports, prioritized decisions |
| **Customer Intelligence & Success** | CRM Agent, Onboarding Agent, Support Agent, Customer Success Agent, Customer Advisor | Customer onboarding, service, lifecycle, retention and handoffs | Consent-based CRM, enquiries, service history → customer records, support outcomes, follow-up plans |
| **Discovery, Research & Opportunities** | Business Scraper AI, Discovery Agent, FBL/Public Visibility Profiler, DeepSearch Agent, Market Research Agent, Competitor/Competitive Intelligence Agent, Visibility Agent, SEO Agent, Google Agent, Hunting AI | Discover public business presence, real customer needs and business problems, demand and growth opportunities | Business identity, public evidence, connected search data → cited findings, diagnosed needs, opportunities, qualified lead candidates |
| **Strategy, Advisory & Learning** | AI Business Coach, AI Business Mentor, Business Operations System Advisor, Business Strategist, Strategy Planner, Brand Advisor, Marketing Advisor, Financial Planner, Growth Advisor, Performance Advisor, Market Agent, Knowledge/Learning Agent | Daily priorities, 30/60/90-day planning, strategy, bottleneck analysis, financial planning and institutional learning | Evidence, goals, performance, process maps → actionable plans, learning records, SOPs, measurable recommendations |
| **Sales & Business Conversion** | Fishing AI, Closer AI, Business Converter AI, Sales Agent, Lead Agent, Proposal Agent, Follow-up Agent, Sales Advisor, Negotiation Voice Assistant, Customer Agent | Build offers, qualify leads, respond to objections, propose quotes, guide negotiations, manage consented follow-ups | Customer intent, approved offers, pipeline and authorized conversations → proposals, response suggestions, quotes, tracked sales outcomes |
| **Brand, Marketing & Visibility Growth** | Brand Agent, Branding Agent, Marketing Agent, Social Agent, Content Agent, Amplifier Agent, Hook/Offer Engines, Reputation Agent | Positioning, creative briefs, content planning, channel adaptation, review/visibility improvement | Brand guidelines, verified research, approved strategy → campaigns, content briefs, measurable growth experiments |
| **Creative Studio & Production** | Studio Agent/Advisor, DesignForge, Illustration AI, Architecture Workflow AI, Image/Video/Audio Agents, Podcast/Livestream Production Agents, Digital Banner Builder Agent | Create and repurpose real media, banners, branding assets, podcast and livestream productions | Approved brief, source media, brand rules, available devices/models → durable media assets, previews, exports and authorized publication receipts |
| **Engineering, Website & Infrastructure** | AI Engineer, Frontend Engineer, Website Agent, WebBuilderBot, Fixer AI, Problem Resolver AI, Workflow Architecture AI, Tech/Integration Agent | Improve existing software, build websites, test, fix errors and manage approved releases | Existing repository, tests, site requirements, logs → reviewed patches, tests, verified builds/deployments |
| **Operations, Systemization & Delivery** | Project Manager Agent, Scheduler Agent, Procurement Agent, Inventory Agent, Sourcing Agent, Operations System Advisor, Systemization Agent, Automation Agent, Workflow Agent | Map owner-dependent processes, organize jobs, schedule work, source supply and automate approved tasks | Real orders, process maps, inventory/supplier records → task plans, SOPs, schedules, purchase proposals, measured savings |
| **Execution, Connections & Autopilot** | Execution Agent/Advisor, Connection/Vault Agent, Third-Party Connector Bot, Autopilot Agent/Advisor, Publishing Agent, Assistant Agent, Storage/Library Bot | Route jobs through available capabilities, manage permissions, deliver work, monitor and recover | Approved jobs, valid scopes, available providers → real external action receipts, job logs, monitoring alerts, recoveries |
| **Finance, Analytics & Risk** | Money Agent, CFO Agent, Financial Planner, Analytics Agent, Reporting Agent, Performance Agent, Fraud/Risk Agent | Monitor cash flow, billing, invoices, profitability, anomalies and verified performance | Authorized financial records, transactions and campaign metrics → reports, alerts, reconciliations, traceable KPIs |
| **Education & Accessibility** | AI Tutor, LMS/Academy Bots, Learning Coach, Voice Assistant, Sign-language/Accessibility Assistant | Business learning, digital skills, voice navigation and inclusive assistance | Approved lessons, learner progress, accessibility preferences → learning content, accessible interactions, progress records |

**Aliases and shared roles:** CFO, Operations, Marketing, Reporting and other overlapping labels must resolve to one registered employee capability with multiple team memberships rather than duplicate deployed agents. All teams work against the same tenant-scoped Business Master File and shared event/workflow services.

## 2. Minimum contract for every employee
Each employee has `agent_id`, canonical name, aliases, team memberships, role, accepted intents, input schema, allowed tools and MCP capabilities, authorized data sources, evidence requirements, output schema, artifact IDs, handoff routes, approvals, entitlements, model fallback, limits, error policy, audit log and admin disable/override. Use the [canonical status fields and mapping](./bonga-ai-employees-consolidated-implementation-contract.md#canonical-status-fields):

| Field | Allowed values | Scope |
| --- | --- | --- |
| `implementation_stage` | `planned`, `implemented`, `configured`, `verified` | Capability development and verification evidence. |
| `readiness_status` | `available`, `needs_configuration`, `authorized`, `disabled` | Current employee availability, required configuration and consent, or admin disablement. |
| `execution_status` | `idle`, `queued`, `running`, `completed`, `failed`, `cancelled` | Individual task state, with verified outputs required for completion. |

Map legacy values to the corresponding field above. `completed` is a task outcome, never employee readiness. `connected` and `live` are historical labels requiring fresh evidence, not additional allowed values. A completed task never proves current authorization, and an authorized employee is not necessarily running a task.

## 3. Unified collaboration: one request, coordinated delivery
**Example: “Grow my clothing business and build my website.”**
1. Business Scraper + Hunting identify the customer's genuine business needs, market opportunities and evidence (not merely contact scraping).
2. Coach + Mentor + Strategist prioritize realistic outcomes and budgets.
3. Fishing + Brand/Marketing Advisors design the offer, positioning and campaign.
4. Website Builder/Engineer and Studio/Banner agents create tangible assets using the existing Bonga services.
5. Fixer validates outputs; customer approves significant changes.
6. Connection/Execution agents publish or deploy through configured and authorized capabilities.
7. Closer + CRM manage permitted customer follow-ups.
8. Analytics/Performance/Money record measured results; Coach updates the next plan.

## 4. Android-like, outcome-first user experience
Customer speaks, taps, types or uploads; Bonga routes to its preconfigured AI teams without asking the customer to manage GitHub repositories, MCP setup, API keys or tool routing. Only essential information and provider-mandated one-time customer authorization should interrupt the flow. UI surfaces: AI Employees app drawer, team roster, task status, approvals, files, notifications, voice guidance and delivered results. Do not present icons as working agents until a verified executable workflow exists.

## 5. Preserve existing Bonga product and governance boundaries
- **Four products:** Website Builder & Hosting; Digital Visibility; Creative Studio; Digital Banner Builder. Teams support these products and other existing Bonga services; do not create new compulsory subscription products.
- **Four subscriptions:** Preserve existing 1-product, 2-product, 3-product and all-in-one entitlements and established prices; never overwrite with historical Zuxuru tiers.
- **One authoritative platform:** Preserve app shell, authentication, tenant isolation, storage, admin override, country/currency/language support, mobile-first behavior, voice and deaf/blind accessibility.
- **Approval and truthfulness:** Real evidence, provider status, saved artifacts and execution receipts. Never fake integrations, rankings, lead counts, conversions, generated videos or publication. Publishing, payments, outreach and sensitive operations require authorized scopes and policy approval.
- **Privacy:** Business Scraper discovers customer needs/business problems from legitimate evidence, not private-person dossiers or unauthorized personal data collection.

## 6. CodeRabbit implementation gates
1. Inspect existing Bonga repository and reconcile this roster with existing code before creating or renaming modules.
2. Build/extend a canonical employee registry, alias mapping and team membership table without duplicate agents.
3. Wire one genuine cross-team vertical slice from customer request to durable deliverable and verified completion.
4. Implement team handoff contracts, workflow retries, idempotency, per-tenant data isolation, model/provider fallback and logs.
5. Test approval, role permissions, account revocation, budget caps, admin override, accessibility and subscription enforcement.
6. Provide an evidence-based employee readiness matrix: **existing / partial / missing / blocked**, with actual code paths and tests.
7. CodeRabbit review, merge, deployment and real running-agent status must be verified separately.

**Commit status:** Documentation-only AI Teams master registry pushed for architecture alignment. It does not install agents, create integrations or deploy a running AI OS.
