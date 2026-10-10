# Customer Segmentation & Channel Intelligence

Status: product specification; integration into running application pending.

## Purpose
Use authorized customer and business data to identify the right customer, business problem, matching Bonga Bhengu App product, marketing channel and conversion workflow. Extend the existing central Jarvis intelligence and admin dashboard; do not create a separate application.

## Initial segments and channel priorities
| Segment | Offer | Channels |
| --- | --- | --- |
| Fashion designers and clothing brands | Fashion AI, Digital Studio, marketplace store | Instagram, TikTok, Pinterest, WhatsApp |
| Small businesses and spaza shops | Business Visibility, WhatsApp sales, website | WhatsApp, Facebook, Google Search |
| Startups | Zuxuru Builder, AI Business Coach | YouTube, Google Search, LinkedIn |
| Established SMEs | Growth Intelligence, CRM, AI Sales Engine | Google Search, LinkedIn, permission-based email |
| Schools and institutions | Education Partner OS, AI Academy | LinkedIn, email, Google Search |
| Creators | Digital Studio, AI Influencer Engine | TikTok, Instagram, YouTube |
| Professional services | Visibility Intelligence, Closer AI | Google Search, LinkedIn, WhatsApp |
| Retail and ecommerce | Marketplace, Hunting and Fishing AI | Google Shopping, Facebook, Instagram |
| Agencies and enterprise | AI employees, Partner OS | LinkedIn, email, partnerships |

These are hypotheses; refine based on measured opt-in customer conversion, not assumptions about protected traits.

## Workflow
1. Business Scraper AI and Spy AI collect permitted business-needs evidence and public competitor insights, respecting source terms.
2. Segmentation AI classifies by industry, location at appropriate granularity, company size, needs, declared budget and demonstrated purchase intent.
3. Central Jarvis AI and Strategy Engine select the suitable existing product, value proposition, channels and proposed budget.
4. Digital Studio and ten AI influencer personas prepare approved, clearly identified synthetic-avatar content tailored to product category, without impersonation or demographic stereotyping.
5. Hunting AI, Fishing AI and Closer AI qualify inbound leads, offer solutions, and follow up only where consent or another lawful basis exists.
6. CRM and analytics measure leads, qualified leads, quotes, customers, revenue, channel attribution, CAC, CPL, conversion, ROAS and repeat purchases.

## Admin Dashboard module requirements
- Segment explorer: filters, customer counts, needs, matched offers, evidence and confidence.
- Channel planner: channel ranking, creative brief, expected cost ranges labeled estimates, budget approval.
- Campaign production queue: studio jobs, persona assignment, preview, review and publish status.
- Sales pipeline: opted-in leads, source, stage, owner, consent, follow-up and outcomes.
- Performance dashboard: actual spend, leads, revenue, conversion, CAC and ROAS.
- RBAC and audit log: only authorized staff can access data, approve outbound communications or commit spend.
- Use official APIs and approved connectors; never assume an integration is connected.
- Handle POPIA and applicable privacy rules, consent, opt-out, retention and deletion.
- No autonomous posting, ad spend or unsolicited messaging without approval.

## Implementation acceptance criteria
- Reuse existing platform architecture, shared AI intelligence and Admin Dashboard.
- Persist segment and campaign definitions with tenant isolation.
- Every channel suggestion includes supporting data or is marked unvalidated.
- No fabricated performance numbers; show unavailable metrics as unavailable.
- Tests cover segment-to-product matching, tenant isolation, consent gates and approval gates.
- Production rollout requires build, tests, connector validation and deployment verification.
