# ZUXURU — Master App Build & Alignment Specification

**Version:** 1.0  
**Status:** Master build specification  
**Purpose:** Align the existing Fukulisane Business Innovation architecture into one unified Zuxuru SaaS system.

## 1. Product Identity

**Zuxuru** is the single customer-facing brand.

Fukulisane Business Innovation (FBI) is retained as the architectural foundation and is progressively aligned underneath Zuxuru. Customers should experience one product, not two competing brands.

**Core promise:** Zuxuru helps skills-based small businesses become digitally visible, measurable, systemized and capable of continuous growth.

**Alive-system principle:** Zuxuru continuously sees the business, understands changes, recommends actions, executes approved work, measures results and learns from results.

## 2. Master Architecture

```text
                              ZUXURU
                                |
                    Customer Experience Layer
                                |
                       Zuxuru Orchestrator
                                |
          +---------------------+---------------------+
          |                     |                     |
       DISCOVER              CONNECT                BUILD
          |                     |                     |
     DeepSearch              Vault                Strategy
     Visibility              Connectors           Studio
     Business Profile        Integrations         Website
          |                     |                     |
          +---------------------+---------------------+
                                |
                         BUSINESS GRAPH
                                |
          +---------------------+---------------------+
          |                     |                     |
     INTELLIGENCE             AGENTS              EXECUTION
          |                     |                     |
       SEO                    AI Agents             Postiz
       Branding               Discovery             Netlify
       Customer               Website               ToolJet
       Market                 SEO                   Other
       Strategy               Brand
          |                     |
          +---------------------+---------------------+
                                |
                           SYSTEMIZE
                                |
                       Owner Dependency
                                |
                            LEVERAGE
                                |
                              GROW
                                |
                           AUTOPILOT
                                |
                                +------> SEE AGAIN
```

## 3. Primary Customer Journey

```text
Business Name
→ DeepSearch
→ Founding Name Visibility
→ Public Visibility Findings
→ Business Profile
→ Sign Up / Login
→ Zuxuru Vault
→ Connect Business Platforms
→ Real Business Data
→ Digital Visibility Growth
→ Brand Strategy
→ Marketing Strategy
→ Studio
→ Digital Execution
→ Systemize
→ Autopilot
→ Continuous Growth
→ Monitor Again
```

## 4. Storefront

Customer-facing areas:

- Business Visibility Audit
- Connect Business
- Digital Visibility Growth
- Company Branding
- Market Growth
- Customer & Lead Intelligence
- Business Growth Strategy
- Digital Execution
- Continuous Growth / Autopilot

Internal engines remain hidden unless an advanced/admin experience is intentionally exposed.

## 5. Founding Name Visibility

Starting intelligence engine for discovering how a business name is publicly visible.

Search targets:

- Business name
- Website/domain
- Google presence
- Maps
- Social presence
- Directories
- Reviews
- Search results
- Brand references
- Competitors
- Public digital assets

Example output:

```text
Business Visibility: 64/100
Website       30/100
Google        25/100
Instagram      0/100
Facebook      25/100
SEO            5/100
Branding      72/100
```

Every score requires an evidence-backed explanation.

**Never manufacture findings.** If a source cannot be verified, the system must say so.

## 6. DeepSearch

DeepSearch performs deeper public discovery behind the initial audit.

```text
Business Name
→ DeepSearch
→ Public Sources
→ Evidence
→ Business Profile + Visibility
```

It should produce structured evidence, not unsupported conclusions.

## 7. Business Profile

The shared structured business identity:

```text
Business
├── Identity
├── Location
├── Contact
├── Website
├── Industry
├── Services
├── Digital Assets
├── Social Accounts
├── Reviews
├── Brand Information
├── Competitors
├── Visibility
└── Evidence
```

## 8. Zuxuru Vault

Central connection and capability layer.

```text
ZUXURU VAULT
├── Plugs
├── Links
├── Integrations
├── Connectors
├── Connection Pipeline
└── Authority / Permissions
```

Wizard:

```text
Choose Service
→ Connect
→ Login / Authorize
→ Verify
→ Connected
```

No API-key configuration should be required from customers when normal provider authorization is available.

## 9. Connection Pipeline

A connection is not live merely because a card exists.

```text
SELECT
→ AUTHORIZE
→ CONNECT
→ VERIFY
→ SYNC
→ READY
```

States should include Available, Authorization Required, Connecting, Verifying, Syncing, Connected, Sync Error, Expired, Disconnected and Revoked.

## 10. External Platform Connectors

### Google
Potential connectors:

- Google Business Profile
- Google Search
- Google Maps
- Google Search Console
- Google Analytics

### Social
Potential connectors:

- Facebook
- Instagram
- LinkedIn
- TikTok
- YouTube
- WhatsApp Business

### Website
Existing website path:

**Verify → Inspect → Analyse → Recommend → Improve**

Missing website path:

**Plan → Generate → Review → Deploy → Verify → Add to Business Graph**

## 11. SEO Engine

Measures and improves:

- Search visibility
- Technical SEO
- Content gaps
- Keyword opportunities
- Local SEO
- Authority signals
- Website findings

SEO findings feed back into visibility scoring.

## 12. Company Branding Engine

Analyses:

- Logo
- Colours
- Typography
- Images
- Videos
- Messaging
- Business description
- Brand consistency
- Positioning
- Reputation presentation

Output:

**Brand score + evidence + recommendations + improvement opportunities.**

## 13. Digital Visibility Growth

Operating loop:

```text
MEASURE
→ IMPROVE
→ VERIFY
→ RESCORE
→ NEXT
```

Example:

```text
Google      25 → 61
Website     30 → 70
Instagram    0 → Established
SEO          5 → 48
```

Customers should see evidence of improvement.

## 14. Brand Strategist

Uses Business Profile, Visibility, Branding, Competitor Intelligence, Market Information and Existing Assets to produce Brand Strategy.

## 15. Marketing Strategist

Uses Business Profile, Audience, Market, Competitors, Visibility, Brand Strategy and Opportunities to produce:

- Positioning
- Campaign strategy
- Channels
- Content strategy
- Growth priorities

## 16. Customer & Lead Intelligence

Profiles:

- Customers
- Leads
- Segments
- Behaviour
- Intent
- Value
- Churn risk
- Referral potential

This is connected to the Business Graph, not treated as an isolated CRM.

## 17. Market Intelligence

Analyses:

- Competitors
- Market position
- Competitor visibility
- Competitor branding
- Market opportunities
- Gaps
- Positioning opportunities

## 18. Business Growth Strategy

Combines:

```text
Business Intelligence
+
Customer Intelligence
+
Market Intelligence
+
Brand Intelligence
+
Visibility Intelligence
→ Growth Strategy
```

## 19. Studio

Turns approved strategy into:

- Brand content
- Marketing content
- Campaign assets
- Social content
- Website content
- Visual content
- Other approved marketing materials

Studio should not invent conflicting strategy when an approved strategy exists.

## 20. Digital Execution

```text
Approved Strategy
→ Execution
→ Connected Platforms
→ Published / Implemented Work
→ Verification
→ Business Graph
```

Every execution must have an auditable result.

## 21. Zuxuru Systemize Layer

The major expansion beyond digital visibility.

```text
Physical Business
→ Map Work
→ Identify Owner Dependency
→ Measure Time / Cost
→ Design Process
→ Assign Human / Software / AI
→ Automate Where Appropriate
→ Measure Leverage
```

The goal is to expose where the owner is effectively buying themselves a job and help convert work into repeatable systems.

## 22. Business Graph / Shared Business Memory

```text
BUSINESS
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
├── Market
├── Strategies
├── Content
├── Execution
├── Processes
├── Owner Dependency
└── Performance
```

All engines should read from and write appropriate structured results back to this model.

## 23. AI Agent Layer

Agents are workers, not separate products.

Initial agents:

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
- Systemization Agent

Agents operate through approved Zuxuru engines and Vault connectors.

## 24. Zuxuru Orchestrator

Responsible for deciding:

1. Relevant business context
2. Existing verified evidence
3. Appropriate engine
4. Appropriate agent
5. Required connector/capability
6. Whether approval is required
7. What must be recorded
8. How results update the Business Graph
9. What happens next

The Orchestrator coordinates; it does not invent business facts.

## 25. Autopilot

```text
MONITOR
→ DETECT CHANGE
→ ANALYSE
→ PRIORITIZE
→ RECOMMEND
→ APPROVE / AUTO-EXECUTE
→ EXECUTE
→ VERIFY
→ MEASURE
→ UPDATE BUSINESS GRAPH
→ MONITOR AGAIN
```

Action classes:

- Observe only
- Recommend
- Approval required
- Automatically executable
- Human escalation required

High-impact external actions must respect configured authorization.

## 26. Infrastructure Integration Map

| Technology | Zuxuru role |
|---|---|
| GitHub | Source control, codebase, engineering workflow, CI/CD source |
| Supabase | Core data, Business Graph, persistence, storage/backend services |
| Logto | Authentication, identity, organizations and access roles |
| Netlify | Web deployment and delivery |
| Agent-Reach | External agent capabilities where supported |
| OmniRoute | AI/model/tool routing |
| Postiz | Social publishing/scheduling |
| ToolJet | Internal operations/admin tooling |
| ComfyUI | Creative generation workflows |

These are replaceable capabilities. **Zuxuru remains the product.**

## 27. Data Ownership

External provider:

```text
External Provider
→ Connector
→ Normalization
→ Zuxuru Business Graph
```

The Business Graph must not depend on a vendor-specific data format.

## 28. Authority / Permissions

Each integration should record:

- Authorizing user
- Business
- Granted scopes
- Authorization time
- Connection health
- Last successful sync
- Last failed sync
- Revocation state
- Permitted actions

Secrets must never be stored in GitHub/source code.

## 29. Admin Control Centre

```text
Admin Control Centre
├── Businesses
├── Engines
├── Agents
├── Vault
├── Plugs
├── Links
├── Integrations
├── Connection Pipelines
├── Workflows
├── Business Memory
├── Jobs
├── Errors
├── Health
├── Logs
└── Permissions
```

## 30. Recommended Repository Direction

```text
zuxuru/
├── apps/
│   └── web/
├── packages/
│   ├── core/
│   ├── business-graph/
│   ├── intelligence/
│   ├── vault/
│   ├── connectors/
│   ├── agents/
│   ├── execution/
│   ├── studio/
│   └── ui/
├── supabase/
├── docs/
├── tests/
└── README.md
```

This is a target architecture. Existing healthy code should be preserved and aligned incrementally rather than rewritten blindly.

## 31. Development Phases

### Phase 0 — Foundation
- Inspect repository
- Identify existing framework and modules
- Establish environments
- Configure GitHub workflow
- Configure deployment
- Establish secrets management
- Establish database/auth foundations

### Phase 1 — First live intelligence loop
Build and verify:

**Business Name → DeepSearch → Visibility Evidence → Visibility Score → Business Profile**

### Phase 2 — Vault
- Connection catalog
- Wizard
- OAuth
- Verification
- Sync
- Connection status
- Permissions

### Phase 3 — Digital Visibility
- Website connector
- Google connectors
- Social connectors
- SEO engine
- Branding engine
- Rescoring

### Phase 4 — Strategy
- Brand Strategist
- Marketing Strategist
- Market Intelligence
- Customer & Lead Intelligence
- Growth Strategy

### Phase 5 — Studio & Execution
- Content generation
- Visual generation
- Website improvements
- Social execution
- Approval workflows
- Verification

### Phase 6 — Systemize
- Process mapping
- Owner-dependency analysis
- Time/cost analysis
- Workflow design
- Automation recommendations

### Phase 7 — Autopilot
- Monitoring
- Event processing
- Recommendations
- Approval policy
- Authorized autonomous execution
- Measurement
- Continuous improvement

## 32. Functional Definition of Done

A module is **not complete** merely because a screen, button, mock result, database table or integration card exists.

A module is complete only when its real end-to-end behaviour has been verified.

### Connector

```text
Select
→ Authorize
→ Connect
→ Verify
→ Sync
→ Store
→ Use Data
→ Disconnect
```

### Visibility

```text
Business
→ Search
→ Evidence
→ Score
→ Explanation
→ Persist
→ Display
```

### Execution

```text
Recommendation
→ Approval
→ Execute
→ External Result
→ Verify
→ Record
→ Rescore
```

## 33. First End-to-End Acceptance Test

Minimum genuine Zuxuru demonstration:

1. Enter a real business name.
2. Discover public information.
3. Produce evidence-backed visibility findings.
4. Create a Business Profile.
5. Create an account.
6. Connect at least one real platform.
7. Verify the connection.
8. Sync real data.
9. Update the Business Graph.
10. Identify a visibility gap.
11. Recommend an action.
12. Obtain required approval.
13. Execute the action.
14. Verify the result.
15. Rescore/measure.
16. Record the result.
17. Show the customer what improved.

If this works with real services, Zuxuru has its first genuine alive-system loop.

## 34. Product Principles

1. One brand: **Zuxuru**.
2. One customer experience.
3. Evidence before intelligence.
4. Real connections before claiming functionality.
5. Business Graph as shared memory.
6. Agents are workers, not products.
7. Vault is the connection/capability layer.
8. Strategy informs execution.
9. Execution must be verifiable.
10. Autopilot respects permissions.
11. External providers are replaceable.
12. Customer data is separated from source code.
13. Never fake integrations or results.
14. Build incrementally and test each real loop.
15. The system becomes more useful as the business connects more data.

## 35. Master Product Loop

```text
ZUXURU
  |
SEE THE BUSINESS
  |
DEEPSEARCH
  |
VISIBILITY AUDIT
  |
BUSINESS PROFILE
  |
CONNECT
  |
ZUXURU VAULT
  |
REAL DATA
  |
UNDERSTAND
  |
BUSINESS INTELLIGENCE
  |
DECIDE
  |
STRATEGY + PLAN
  |
BUILD
  |
STUDIO / WEB
  |
EXECUTE
  |
VERIFY RESULTS
  |
MEASURE
  |
SYSTEMIZE
  |
LEVERAGE
  |
GROW
  |
AUTOPILOT
  |
  +----> SEE AGAIN
```

## 36. Immediate Build Order

1. Repository inspection
2. Existing-code alignment
3. App foundation
4. Supabase + Logto
5. Business entity / Business Graph
6. DeepSearch
7. Founding Name Visibility
8. Business Profile
9. Vault
10. First real connector
11. Visibility rescore

Only after this first loop works should the wider ecosystem be expanded.

## Final Alignment Statement

**Fukulisane Business Innovation provided the foundation. Zuxuru becomes the living system built on that foundation.**

The customer experiences one product:

# ZUXURU

The system underneath is modular, connected, measurable, permission-aware and continuously improving.

This document is the master build reference and should be updated as implementation decisions are verified.

---

# 37. Digital Content Creation & Visibility Studio

The Digital Content Creation & Visibility Studio is a native Zuxuru component, not a separate application. It connects physical content production to Zuxuru's digital visibility system.

```text
PHYSICAL CONTENT
      ↓
CAPTURE
      ↓
CREATE / REPURPOSE
      ↓
BRAND + STRATEGY ALIGNMENT
      ↓
DISTRIBUTE
      ↓
MEASURE
      ↓
LEARN
      ↓
VISIBILITY IMPROVEMENT
```

## 37.1 Studio Architecture

```text
                         ZUXURU
                           |
                    DIGITAL VISIBILITY
                           |
                 CONTENT CREATION STUDIO
                           |
       +-------------------+-------------------+
       |                   |                   |
     CAPTURE             CREATE            DISTRIBUTE
       |                   |                   |
 Multi-camera         AI + Human          Connected
 physical studio       production          platforms
       |                   |                   |
       +-------------------+-------------------+
                           |
                       OPTIMIZE
                           |
                        PUBLISH
                           |
                       MEASURE
                           |
                         LEARN
                           |
                        RESCORE
                           |
                       AUTOPILOT
                           |
                           +------> BUSINESS GRAPH
```

## 37.2 Physical Studio Capture

The physical studio is optional. Zuxuru can also receive content from phones, existing cameras, uploads or other approved sources.

Recommended professional configuration:

- 5–8 cameras
- synchronized recording
- microphones/audio
- lighting
- video switcher
- multiview display
- production display
- recording computer/storage
- timecode synchronization where supported

Recommended six-camera model:

```text
CAMERA 1 → Wide master
CAMERA 2 → Main close-up
CAMERA 3 → Second-person close-up
CAMERA 4 → Side angle
CAMERA 5 → Alternate/wide angle
CAMERA 6 → Creative/detail/overhead
```

## 37.3 Capture Architecture

```text
CAM 1 ─┐
CAM 2 ─┤
CAM 3 ─┤
CAM 4 ─┼──→ VIDEO SWITCHER ──→ RECORDING SYSTEM
CAM 5 ─┤             │
CAM 6 ─┘             ├──→ MULTIVIEW
                      └──→ PROGRAM OUTPUT
```

Where supported, preserve individual camera recordings, synchronized footage, program recording, audio and production metadata.

## 37.4 Studio Screens

Multiview should show camera feeds, identifiers, recording status, audio meters, timecode, program/preview and stream status where supported.

The production screen can show program, preview, selected camera, teleprompter, graphics, playback or the editing/production interface.

## 37.5 Synchronization

Multi-camera footage should use the best synchronization supported by the equipment and software, including timecode and genlock where available, consistent frame rates and synchronized audio.

## 37.6 Content Intake

The Studio accepts:

- multi-camera recordings
- single-camera video
- mobile video
- images
- product photography
- interviews
- fashion shoots
- behind-the-scenes footage
- educational material
- product demonstrations
- customer stories
- existing content

```text
SOURCE CONTENT
      ↓
INGEST
      ↓
TRANSCRIBE / ANALYSE
      ↓
INDEX
      ↓
BUSINESS GRAPH
```

## 37.7 Content Intelligence

The Studio uses, where available:

- Business Profile
- Brand Strategy
- Marketing Strategy
- Visibility findings
- SEO opportunities
- target audience
- previous content
- previous performance
- current growth priorities

The question is:

> What content does this business need now?

not simply:

> What content can AI generate?

## 37.8 Content Repurposing

One production can become multiple assets:

```text
1 LONG INTERVIEW
       ↓
ZUXURU STUDIO
       ↓
├── Full video
├── Short video
├── Reel
├── TikTok version
├── YouTube Short
├── LinkedIn clip
├── Image
├── Quote graphic
├── Website content
└── SEO content
```

## 37.9 AI Production Layer

AI may assist with:

- speaker detection
- face detection/tracking
- scene detection
- highlight detection
- best-shot suggestions
- transcription
- captions
- clip selection
- summarization
- format adaptation
- graphics
- metadata
- content recommendations

AI suggestions remain reviewable. Authorized users can approve, reject, edit, re-cut, replace or reorder assets.

The core capture path should continue to work without AI where the underlying hardware/software supports it. AI is an intelligence layer, not the single point of failure.

## 37.10 Strategy Connection

```text
BUSINESS PROFILE
      +
VISIBILITY FINDINGS
      +
BRAND STRATEGY
      +
MARKETING STRATEGY
      +
SEO OPPORTUNITIES
      +
PREVIOUS PERFORMANCE
      ↓
CONTENT PLAN
      ↓
STUDIO
```

This keeps content creation connected to real business needs.

## 37.11 Daily Visibility Campaign

Zuxuru can provide a configurable daily content campaign:

```text
DAILY VISIBILITY CAMPAIGN
        ↓
Select content opportunities
        ↓
Create / repurpose assets
        ↓
Create platform-specific versions
        ↓
Review / approve
        ↓
Schedule
        ↓
Publish
        ↓
Measure
```

A target such as 10 content assets per day can be configured, but it is not a guaranteed outcome or universal requirement.

## 37.12 Multi-Platform Distribution

The Studio can distribute approved content through authorized integrations, potentially including:

- Instagram
- Facebook
- TikTok
- LinkedIn
- YouTube
- X
- Pinterest
- Threads
- WhatsApp Business
- other supported platforms

Zuxuru must respect each platform's actual API capabilities, media requirements, publishing limits and granted permissions.

## 37.13 Organic Visibility Experiment Engine

The goal is not to promise virality. Zuxuru runs measurable organic-growth experiments:

```text
CONTENT
   ↓
PLATFORM
   ↓
PUBLISH
   ↓
OBSERVE
   ↓
MEASURE
   ↓
COMPARE
   ↓
LEARN
   ↓
NEXT CONTENT
```

Social metrics may include reach, views, watch time, engagement, shares, saves, comments, followers, profile visits and leads where available.

Search/SEO metrics may include impressions, clicks, search visibility, rankings, website traffic, indexed content, local visibility and branded search activity where available.

## 37.14 Content Experiment Record

```text
Content Experiment
├── Asset
├── Business
├── Campaign
├── Strategy Objective
├── Platform
├── Publish Time
├── Format
├── Topic
├── Audience
├── CTA
├── Performance
├── Learning
└── Next Recommendation
```

## 37.15 No Universal Algorithm Score

Zuxuru must not pretend that all platforms have one universal algorithm score.

Instead it combines, where available:

```text
SOCIAL PERFORMANCE
+
SEARCH PERFORMANCE
+
WEBSITE PERFORMANCE
+
LEAD / BUSINESS OUTCOMES
```

The system should distinguish observed data, calculated metrics, AI interpretation and recommendations.

## 37.16 Content Learning Loop

```text
CREATE
  ↓
PUBLISH
  ↓
OBSERVE
  ↓
MEASURE
  ↓
COMPARE
  ↓
IDENTIFY PATTERNS
  ↓
UPDATE CONTENT INTELLIGENCE
  ↓
UPDATE STRATEGY
  ↓
CREATE BETTER CONTENT
  ↓
PUBLISH AGAIN
```

Learning dimensions may include topic, format, platform, hook, length, timing, audience, CTA, visual style and content purpose.

Do not claim causation where the available data only supports correlation.

## 37.17 Business Graph Integration

```text
CONTENT
   ↓
PUBLISHED
   ↓
PERFORMANCE
   ↓
BUSINESS GRAPH
   ↓
VISIBILITY INTELLIGENCE
   ↓
STRATEGY
   ↓
NEXT CONTENT
```

The Business Graph can retain content, publishing, performance, visibility changes, successful patterns, failed experiments and strategic decisions.

## 37.18 Studio + Autopilot

Once reliable data and sufficient permissions exist:

```text
MONITOR
   ↓
IDENTIFY CONTENT OPPORTUNITY
   ↓
GENERATE / REPURPOSE
   ↓
QUALITY CHECK
   ↓
APPROVAL POLICY
   ↓
PUBLISH
   ↓
MEASURE
   ↓
LEARN
   ↓
IMPROVE
```

Autopilot must respect platform permissions and the business's configured approval policy.

## 37.19 Studio Components

```text
Content Studio
├── Media Library
├── Capture Intake
├── Multi-Camera Import
├── Video Analysis
├── Audio / Transcript
├── Editing Workspace
├── Clip Generator
├── Image Generator
├── Graphic Generator
├── Content Repurposer
├── SEO Content
├── Social Variants
├── Campaign Planner
├── Approval Queue
├── Publishing
├── Performance Analytics
├── Content Experiments
└── Learning Engine
```

## 37.20 External Capability Alignment

External tools are capabilities, not the product:

```text
ZUXURU STUDIO
      |
      +── Creative Generation → ComfyUI where appropriate
      |
      +── Social Publishing → Postiz where appropriate
      |
      +── AI / Model Routing → OmniRoute where appropriate
      |
      +── Internal Operations → ToolJet where appropriate
      |
      +── Storage / Data → Supabase where appropriate
      |
      +── Deployment → Netlify
```

Providers must remain replaceable.

## 37.21 Studio Definition of Done

A minimum functional Studio loop is:

1. Upload/import real content.
2. Store content.
3. Analyse/transcribe content.
4. Associate content with a business.
5. Connect it to a strategy objective.
6. Create or repurpose an asset.
7. Review/approve it.
8. Publish through an authorized integration.
9. Verify publication.
10. Collect available performance data.
11. Record the result.
12. Feed learning into Zuxuru.
13. Recommend the next content action.

## 37.22 Studio MVP

First version:

- media upload
- media library
- business association
- content brief
- AI transcription
- basic content analysis
- clip/asset recommendations
- image/content creation where supported
- approval workflow
- one real publishing integration
- performance recording
- Business Graph connection

Later versions can add advanced synchronized multi-camera editing, automated highlight detection, AI camera selection, more platform integrations, advanced experimentation and autonomous content optimization.

## 37.23 Alignment Decision

The Digital Content Creation & Visibility Studio is a first-class Zuxuru capability inside **Digital Visibility Growth**.

**Fukulisane Business Innovation remains the architectural foundation.**

**Zuxuru is the unified product.**

The physical studio is the optional capture environment.

Zuxuru is the intelligence, creation, distribution, measurement and learning system that turns content into ongoing digital visibility.

Its role in the master loop is:

```text
SEE
→ UNDERSTAND
→ CREATE
→ DISTRIBUTE
→ MEASURE
→ LEARN
→ IMPROVE
→ GROW
→ SEE AGAIN
```
