# ZUXURU — Final Master Build Specification

**Version:** 1.0 Final Master
**Status:** Build baseline
**Product:** Zuxuru SaaS
**Architectural foundation:** Fukulisane Business Innovation

## 1. Product Definition

Zuxuru is a business digital-visibility and growth system for small skilled businesses. It discovers how a business is publicly visible, identifies visible and invisible gaps, connects authorized platforms, builds or improves missing digital assets, executes visibility improvements, measures outcomes, learns from evidence, and continuously improves.

### Core loop

```text
SEE → UNDERSTAND → CONNECT → IMPROVE → CREATE → DISTRIBUTE → MEASURE → LEARN → GROW → SEE AGAIN
```

Zuxuru is one product. Internal engines, agents, integrations and external tools are implementation capabilities, not separate products.

## 2. Customer Journey

```text
Business Name
    ↓
DeepSearch
    ↓
Founding Name / Digital Visibility
    ↓
Public Findings + Evidence
    ↓
Business Profile
    ↓
Connect Existing Platforms
    ↓
Deeper Platform Intelligence
    ↓
Visibility + Brand + Website + SEO Gaps
    ↓
Prioritized Recommendations
    ↓
Strategy
    ↓
Digital Content Creation & Visibility Studio
    ↓
Execution / Publishing
    ↓
Measurement
    ↓
Rescore
    ↓
Business Graph
    ↓
Autopilot
```

## 3. Product Pillars

1. Founding Name / Digital Visibility
2. DeepSearch
3. Business Profile
4. Vault / Connection Layer
5. Website + SEO
6. Company Branding
7. Digital Visibility Growth
8. Brand Strategy
9. Marketing Strategy
10. Customer & Lead Intelligence
11. Market Intelligence
12. Digital Content Creation & Visibility Studio
13. Digital Execution
14. Business Graph / Shared Business Memory
15. AI Agent Layer
16. Autopilot
17. Admin Control Centre

## 4. Visibility Intelligence

The starting intelligence engine discovers public presence across available sources such as:

- business name
- website/domain
- search presence
- maps/local presence
- social presence
- directories
- reviews
- brand references
- competitors
- public digital assets

Every finding should distinguish verified evidence from inference. Do not manufacture unavailable findings.

## 5. Business Profile

The shared business record contains:

- identity
- location
- website
- contact details
- industry
- services
- digital assets
- social accounts
- reviews
- brand information
- competitors
- visibility scores
- evidence

## 6. Vault / Connection Layer

Vault is the integration and connector layer.

```text
Vault
├── Plugs
├── Links
├── Integrations
└── External capabilities
```

Connection lifecycle:

```text
SELECT → AUTHORIZE → CONNECT → VERIFY → SYNC → READY → MONITOR
```

A connector is not considered live merely because a UI card exists. Its real authorization, verification and sync state must be known.

## 7. Platform Connections

Potential connector families include:

- Google Business Profile / Search / Maps / Search Console / Analytics where supported
- Facebook / Instagram
- LinkedIn
- TikTok
- YouTube
- WhatsApp Business
- Website/CMS
- SEO and analytics services
- Other authorized services

Only capabilities actually supported by the provider and authorized by the user may be executed.

## 8. Website + SEO

Zuxuru can verify, analyse, improve or create a website where appropriate.

SEO intelligence includes:

- search visibility
- technical findings
- content gaps
- keyword opportunities
- local SEO
- authority signals
- indexed content

## 9. Company Branding

Brand intelligence covers:

- logo
- colour system
- typography
- imagery
- video style
- messaging
- business description
- consistency
- positioning
- reputation presentation

Output: evidence-backed brand findings and improvement opportunities.

## 10. Digital Visibility Growth

The system improves platforms iteratively:

```text
MEASURE → IMPROVE → VERIFY → MEASURE AGAIN
```

Improvement must be demonstrated through before/after evidence where measurable.

## 11. Strategy Layer

Brand Strategist and Marketing Strategist use the Business Profile, visibility findings, brand intelligence, market intelligence and performance data to create prioritized plans.

Strategy should feed the Studio and Execution layers rather than operating as an isolated AI feature.

## 12. Digital Content Creation & Visibility Studio

This is a first-class Zuxuru component inside Digital Visibility Growth.

### Purpose

Turn real business material and strategy into useful content, distribute it through authorized channels, measure performance, and feed learning back into Zuxuru.

### Studio layers

```text
CAPTURE → INGEST → ANALYSE → CREATE → APPROVE → DISTRIBUTE → MEASURE → LEARN
```

### Physical studio

Optional professional capture environment:

- 5–8 cameras
- synchronized recording
- microphones/audio
- lighting
- video switcher
- multiview screen
- production screen
- recording/storage
- timecode synchronization where supported

Recommended six-camera layout:

```text
CAM 1 → Wide master
CAM 2 → Main close-up
CAM 3 → Second-person close-up
CAM 4 → Side angle
CAM 5 → Alternate/wide
CAM 6 → Creative/detail/overhead
```

The Studio must also work without physical studio hardware by accepting phone video, single-camera footage, images and uploads.

### Multi-camera architecture

```text
CAM 1 ─┐
CAM 2 ─┤
CAM 3 ─┤
CAM 4 ─┼→ VIDEO SWITCHER → RECORDING
CAM 5 ─┤                    ├→ MULTIVIEW
CAM 6 ─┘                    └→ PROGRAM
```

Preserve individual camera recordings and program recording where the equipment/software supports it.

### AI production

Potential capabilities:

- transcription
- captions
- speaker detection
- face tracking
- scene detection
- highlight detection
- best-shot suggestions
- clip generation
- summaries
- format adaptation
- graphics
- metadata
- content recommendations

AI remains assistive and reviewable. Basic capture/recording should not depend on AI.

### Repurposing

```text
1 LONG PRODUCTION
       ↓
ZUXURU STUDIO
       ↓
FULL VIDEO + SHORTS + REELS + IMAGES + QUOTES + WEBSITE + SEO CONTENT
```

### Daily visibility campaign

Support a configurable campaign, including a target such as 10 content assets per day where appropriate. This is not a promise of virality or a universal requirement.

```text
OPPORTUNITY → CREATE/REPURPOSE → PLATFORM VERSIONS → APPROVE → SCHEDULE → PUBLISH → MEASURE
```

## 13. Organic Visibility Experiment Engine

Zuxuru does not promise that content will go viral. It measures organic response and learns.

Social metrics where available:

- reach
- views
- watch time
- engagement
- shares
- saves
- comments
- followers
- profile visits
- leads

Search metrics where available:

- impressions
- clicks
- search visibility
- rankings
- website traffic
- indexed content
- local visibility
- branded search activity

Do not create a fake universal social-algorithm score. Clearly label observed data, calculated metrics, interpretation and recommendations.

## 14. Business Graph

The Business Graph is shared memory across the system:

```text
Business
├── Identity
├── Visibility
├── Branding
├── Platforms
├── Website
├── SEO
├── Reviews
├── Customers
├── Leads
├── Competitors
├── Strategies
├── Content
├── Publishing
├── Performance
├── Execution
└── Autopilot Events
```

## 15. AI Agent Layer

Agents are workers using shared business context and tools, not separate products.

Potential agents:

- Discovery Agent
- Visibility Agent
- Website Agent
- SEO Agent
- Brand Agent
- Social Agent
- Google Agent
- Competitor Agent
- Customer Agent
- Market Agent
- Strategy Agent
- Studio Agent
- Execution Agent
- Autopilot Agent

## 16. Digital Execution

Approved work flows through authorized integrations:

```text
APPROVED PLAN → EXECUTE → VERIFY → RECORD → MEASURE
```

## 17. Autopilot

Autopilot closes the loop:

```text
MONITOR
 ↓
DETECT CHANGE
 ↓
RECOMMEND
 ↓
APPROVE / EXECUTE BY POLICY
 ↓
MEASURE
 ↓
LEARN
 ↓
IMPROVE
 ↓
MONITOR AGAIN
```

No autonomous action should exceed the permissions granted by the business or the connected platform.

## 18. External Capability Alignment

External systems are replaceable providers/capabilities:

```text
ZUXURU
├── Supabase → data/auth-adjacent infrastructure as selected
├── Netlify → web deployment
├── Logto → identity where selected
├── Postiz → publishing capability where supported
├── ComfyUI → creative generation where selected
├── OmniRoute → model/provider routing where selected
├── Agent-Reach → agent reach/capability where selected
├── ToolJet → internal operational interfaces where selected
└── GitHub → source repository
```

The exact production integration must be verified before implementation; names in this document are architectural targets, not claims that every connection is currently live.

## 19. Admin Control Centre

Admin sees the machinery that customers do not need to manage:

- engines
- agents
- Vault
- plugs
- integrations
- connection pipelines
- workflows
- Business Graph
- jobs
- errors
- health
- logs
- permissions

## 20. Security and Trust Rules

- Explicit authorization for external accounts
- Least-privilege permissions
- Clear connection state
- Audit trail for important actions
- Approval controls for publishing/automation
- No fabricated evidence
- No fabricated performance
- No promise of virality
- Provider/API limits must be respected
- Secrets must remain in secure environment configuration, never in source code

## 21. MVP Build Order

### Phase 1 — Foundation

- Web application shell
- Authentication
- Business/account model
- Supabase data foundation
- Business Profile
- Initial DeepSearch/visibility workflow
- Evidence model
- Basic dashboard

### Phase 2 — Connections

- Vault UI
- Connection lifecycle
- First production connector
- Website connection
- Sync state and logs

### Phase 3 — Visibility Growth

- Visibility scoring
- Website/SEO analysis
- Branding analysis
- Recommendations
- Before/after tracking

### Phase 4 — Studio

- Media library
- Upload/import
- Transcription
- Content briefs
- Repurposing
- Approval queue
- First real publishing integration
- Performance capture

### Phase 5 — Intelligence

- Business Graph
- Strategy agents
- Content experiment engine
- Cross-channel performance analysis

### Phase 6 — Autopilot

- Monitoring
- Recommendation loop
- Approval policies
- Automated execution where safely supported
- Continuous rescore

## 22. Definition of a Working Zuxuru System

The system is considered functionally alive when a test business can complete this real end-to-end path:

```text
ENTER BUSINESS NAME
→ DISCOVER PUBLIC PRESENCE
→ RECEIVE EVIDENCE-BACKED VISIBILITY FINDINGS
→ CREATE BUSINESS PROFILE
→ CONNECT A REAL PLATFORM
→ VERIFY CONNECTION
→ INGEST REAL DATA
→ IDENTIFY A GAP
→ CREATE/APPROVE AN IMPROVEMENT
→ EXECUTE IT
→ VERIFY EXECUTION
→ MEASURE RESULT
→ UPDATE BUSINESS GRAPH
→ RECOMMEND NEXT ACTION
```

The Studio is additionally working when:

```text
UPLOAD REAL CONTENT
→ ANALYSE
→ CREATE/REPURPOSE
→ APPROVE
→ PUBLISH THROUGH A REAL AUTHORIZED INTEGRATION
→ VERIFY PUBLICATION
→ COLLECT PERFORMANCE
→ LEARN
→ RECOMMEND NEXT CONTENT
```

## 23. Product Boundary

Zuxuru is not a generic CRM, accounting system, project-management application, generic AI chatbot, generic design application or generic scheduler.

Those capabilities may plug into Zuxuru when they directly support the visibility-and-growth loop.

## 24. Final Product Principle

> Zuxuru helps a small business see how visible it really is, understand what is missing, connect what already exists, build what is missing, execute improvements, measure what changes, learn from the evidence, and continuously grow its digital visibility.

**Fukulisane Business Innovation is the architectural foundation. Zuxuru is the unified product.**
