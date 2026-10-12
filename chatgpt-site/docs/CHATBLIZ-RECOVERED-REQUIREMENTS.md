# Chatbliz OS — recovered conversation requirements and implementation map

> Source: prior Chatbliz/Zuxuru discussions and user-provided project notes, consolidated 2026-10-12. This is a product specification, not a claim that features are deployed or operational.

## Identity and separation
- **Chatbliz: Your Business Partner in Your Hands.** Chat-first business-building platform for entrepreneurs.
- Chatbliz is independent of Bonga Bhengu OS (personal fashion workspace). Reuse existing capabilities through explicit, authorized integrations; do not merge product identities or duplicate engines.
- A single conversation is the front door; all features should operate in one coherent workplace.

## Five front-door business partners
| Partner | Responsibility | Expected output |
| --- | --- | --- |
| AI Mentor | Long-term business development and 30/60/90-day planning | Evidence-backed development plan |
| AI Coach | Daily priorities, accountability and growth | Prioritized action plan and progress |
| AI Assistant | Scheduling, communications and work organization | Drafts, approved tasks and confirmed appointments |
| AI Advisor | Business decisions, competitors, risks, operations | Options with evidence and limitations |
| AI Negotiator | Objection handling, offer preparation, live negotiation coaching | Proposed response and offer for human approval |

These partners coordinate additional specialist employees: Hunter, Fishing, Closer, Fixer, business strategist, operations, brand, marketing, customer, growth, execution, performance, Studio, and autopilot advisors. Specialist agents are not separate subscriptions.

## Four customer-facing products
- **My Brand — R299**: business discovery, visibility, connection and growth intelligence.
- **My Website — R499**: AI website/app builder and approved publishing.
- **My Content — R600**: Digital Studio for image, video, podcast, livestream, campaigns.
- **My Business — R2,000**: integrated business operating workplace, CRM, sales, operations, analytics and access to other three product areas.
- **Billing cadence unconfirmed.** Do not label as monthly or once-off without owner confirmation; no charges until checkout is verified.

## Business operating loops
- Discover → Prove → Understand → Find → Build → Test → Measure → Learn → Repeat.
- Hook → Offer → Lead → Personalization → Close → Delivery → Result → Next Hook.
- Morning → Coach → Prioritize → Act → Measure → Learn → Mentor → Update plan.
- Show only verified performance; missing data is **unknown/not assessed**, never zero or invented revenue.

## Shared intelligence and business digital twin
One customer-authorized business profile stores identity, market, offers, presence, search, maps, social, content, reviews, customers, leads, revenue, operations, strategies, actions and outcomes.
- Public business profiling and DeepSearch must retain source, date, confidence and explicit unknowns.
- Connection wizard must use authorized access to external accounts, with permissions scoped to the business.
- Business memory must be tenant-isolated, editable and auditable.

## Chat-first execution contract
1. Parse the user's intention and relevant business context.
2. Route to one or more partners and the correct existing engine.
3. Return a plan showing evidence, expected inputs, outputs, cost and required permissions.
4. For external side effects, request explicit approval and verify entitlement and authorization server-side.
5. Execute through the existing MCP/workflow integration with idempotency and audit trail.
6. Show truthful outcome: planned, awaiting approval, running, succeeded, failed or unverified.
7. Capture results for CRM, analytics, business memory and follow-up.

Never present local text generation as completed tool execution, booked meetings, customer contact, payment or publishing.

## One shared platform architecture
- One authenticated Chatbliz workspace, task pipeline, capability registry, skills vault, integration/authorization wizard, event/audit trail, billing and CRM.
- Shared Studio, builder, visibility and sales engines via integration boundaries; avoid duplicate screens and cloned backends.
- WhatsApp Business opt-in and official authorization are required for customer messaging; no unsolicited outbound.
- Accessible mobile-first chat with text and voice pathways, with additional accessibility support to be validated.

## Existing repository implementation (source-only; deployment unverified)
- `src/chatbliz/catalog.mjs`: four packages and price catalog.
- `src/chatbliz/partners.mjs`: five roles and rule-based routing.
- `src/chatbliz/chat-ui.mjs`: chat UI and links to existing workspaces.
- `worker/chatbliz-plan.mjs`: authenticated same-origin planning API, **not live AI execution**.
- `worker/business-mcp.mjs`: existing business MCP tool handler (currently primarily Bonga-specific; must be permissioned and tenant-isolated before general Chatbliz exposure).
- `worker/index.mjs`: shared worker route wiring.

## Delivery gates
- [x] Four-service catalog
- [x] Five-partner role definitions
- [x] Rule-based chat routing and planning endpoint in source
- [ ] Persist authenticated business context and conversation
- [ ] Build per-tenant access controls and secure consent records
- [ ] Connect actual AI inference to the five partners
- [ ] Implement approved MCP actions and structured receipts
- [ ] Wire CRM and official WhatsApp Business integrations
- [ ] Wire billing and verify package entitlements
- [ ] Verify end-to-end Studio and website-builder workflows
- [ ] Automated tests, build, mobile/browser QA, and live deployment verification

## Non-negotiable builder rules
Preserve the existing code and modules; fix rather than rebuild. No placeholders disguised as working functionality. Do not silently mix Bonga Bhengu OS and Chatbliz data, identity, URLs or permissions. All tools must have defined input, output, status, error and authorization contracts.
