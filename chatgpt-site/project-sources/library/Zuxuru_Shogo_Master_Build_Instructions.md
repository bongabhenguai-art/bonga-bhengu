# ZUXURU — SHOGO AI MASTER BUILD FILE

## INSTRUCTION TO SHOGO AI

You are building Zuxuru.

Treat this document as the **master implementation contract**.

Do not redesign the product concept while implementing it.
Do not create disconnected features.
Do not replace existing components unnecessarily.
Reuse existing work wherever practical.

Build from the architecture and contracts below.

The central product is:

**Zuxuru = Business Visibility Operating System**

Its permanent loop is:

**DISCOVER → UNDERSTAND → DIAGNOSE → PRIORITIZE → CREATE → APPROVE → EXECUTE → MEASURE → LEARN → IMPROVE → RESCORE → REPEAT**

Your implementation must make this loop work end-to-end.

---

## BUILD RULES

1. Every component must have one clear responsibility.
2. Every component must have defined inputs and outputs.
3. Components communicate through explicit API/service boundaries.
4. Business state belongs in the Business Graph / Supabase.
5. Investigation tools produce evidence; they do not decide Zuxuru scores.
6. AI models produce analysis or creative output; they do not bypass Zuxuru permissions.
7. No agent may directly execute actions against customer accounts.
8. All external actions pass through the Execution Engine.
9. Approval and automation permissions must be explicit.
10. Every action must produce an execution record and, where possible, a measurable result.
11. Monitoring must feed new evidence back into the system.
12. Rescoring must use the new verified state.
13. Learning must update the Business Brain.
14. Do not force Business Tree onto single-location businesses.
15. Preserve existing useful repositories and capabilities; wrap or adapt them instead of discarding them.
16. Build the core visibility loop before adding optional features.

---

# PRODUCT MODEL

## Visibility problems

Zuxuru detects:

- Invisible
- Unclear
- Untrusted
- Inconsistent
- Inactive
- Unconverted
- Decaying

## Visibility dimensions

- Discoverability
- Clarity
- Trust
- Activity
- Consistency
- Conversion
- Visibility Health / Decay

## Core data chain

**BUSINESS → INVESTIGATION → EVIDENCE → VERIFICATION → FINDING → SCORE → OPPORTUNITY → RECOMMENDATION → ACTION → EXECUTION → RESULT → NEW EVIDENCE → NEW SCORE**

This is the permanent Zuxuru data spine.

---

# CORE ENGINES

Build and maintain these engines:

1. Business Identity Engine
2. Discovery / Investigation Engine
3. Verification Engine
4. Evidence Engine
5. Business Graph
6. Intelligence Engine
7. Score Engine
8. Opportunity Engine
9. Strategy / Recommendation Engine
10. Creation / Studio Engine
11. Execution Engine
12. Distribution / Publishing Engine
13. Monitoring Engine
14. Learning Engine
15. Rescore / Proof Engine
16. Autopilot Engine
17. Connection / Permission Engine
18. Business Tree Engine
19. Admin Control Centre

---

# BUSINESS BRAIN

Every business has a Business Brain containing:

- Identity
- Locations
- Services
- Products
- Contact information
- Opening hours
- Brand
- Audience
- Platforms
- Accounts
- Websites
- Listings
- Reviews
- Content
- Media
- Campaigns
- Visibility scores
- Findings
- Gaps
- Opportunities
- Recommendations
- Actions
- Execution history
- Performance
- Preferences
- Learning
- Automation rules

All Zuxuru engines use the Business Brain.

---

# INVESTIGATION

The Investigation Engine coordinates external intelligence.

Use existing capabilities where available:

- Agent-Reach
- Maigret
- Maps MCP
- Website Intelligence
- Search Intelligence

### Rule

Investigation tools discover information.

They must NOT contain Zuxuru's scoring or business strategy logic.

Their outputs are normalized into evidence.

Pipeline:

**TOOL → EVIDENCE NORMALIZER → VERIFICATION → BUSINESS GRAPH**

---

# EVIDENCE

Every meaningful external observation should become structured evidence.

Evidence should retain, where available:

- Source
- URL
- Platform
- Source type
- Retrieved time
- Business relationship
- Raw/normalized finding
- Verification status
- Confidence

Candidate information must remain a candidate until verified.

---

# INTELLIGENCE

The Intelligence Engine converts verified evidence into:

- Findings
- Gaps
- Scores
- Opportunities
- Recommendations
- Strategy

Example:

Verified evidence:
- Website exists
- Instagram exists
- Instagram inactive
- Google listing exists
- Reviews are limited
- Website local signals are weak

Intelligence:
- Social activity gap
- Trust gap
- Local visibility gap

Then calculate score and prioritize opportunities.

---

# OPPORTUNITY ENGINE

Do not let AI recommendations become an unranked list.

Rank opportunities using:

**Impact × Confidence × Business Relevance ÷ Effort**

Show the owner the highest-value actions first.

---

# AI / OMNIROUTE

OmniRoute is infrastructure.

Zuxuru sends it structured tasks with:

- Business context
- Verified evidence
- Task
- Requirements
- Constraints

OmniRoute decides:

- Model
- Provider
- Fallback
- Cost/latency considerations

Zuxuru remains responsible for business decisions, interpretation, permissions, and workflow.

---

# CREATION STUDIO

Studio converts strategy into production.

Pipeline:

**OPPORTUNITY → CONTENT RECOMMENDATION → CREATIVE BRIEF → STUDIO → COMFYUI / OTHER CREATIVE CAPABILITY → ASSET → APPROVAL → PUBLISH**

Studio may create:

- Images
- Videos
- Reels
- Social posts
- Educational content
- Service content
- Promotional content
- Customer stories
- Website copy
- Campaign assets

### Phone camera

Phone-camera capture is a first-class Studio input:

**PHONE → RECORD → STUDIO → AI PROCESSING → EDIT → BRAND → VARIANTS → APPROVAL → PUBLISH**

---

# EXECUTION

The Execution Engine is the only normal gateway for external business actions.

Correct:

**AGENT / AI → RECOMMENDATION → APPROVAL / AUTOMATION POLICY → EXECUTION ENGINE → CONNECTOR → EXTERNAL PLATFORM**

Never:

**AGENT → DIRECT CUSTOMER ACCOUNT ACTION**

Execution must support:

- Permissions
- Approval
- Audit trail
- Retries
- Errors
- Execution history
- Rollback where supported

---

# PUBLISHING

Use Postiz or another connected publishing capability behind the Distribution/Execution boundary.

Zuxuru creates a publishing job containing:

- Business
- Platform
- Account
- Content
- Media
- Publish time
- Campaign

Store:

- Status
- External post ID
- External URL
- Publish time
- Errors
- Available analytics

---

# AUTOPILOT

Autopilot is an operating layer, not a single feature.

Loop:

**OBSERVE → DETECT → DECIDE → CREATE → APPROVE/AUTO-APPROVE → PUBLISH/EXECUTE → MEASURE → LEARN → REPEAT**

Automation levels:

### GREEN
Safe repetitive actions may run automatically.

### YELLOW
Owner approval required.

### RED
Human decision required.

Never silently expand automation permissions.

---

# MONITORING

After execution, continue watching.

Example:

**PUBLISHED → WAIT → REINVESTIGATE → COMPARE → DETECT CHANGE → RESCORE**

Monitoring turns Zuxuru from a one-time audit into a continuous visibility system.

---

# LEARNING

For every action, record:

- What happened
- Where
- When
- Audience/context
- Result
- Visibility impact
- Engagement impact
- Enquiry impact where measurable
- Conversion impact where measurable

Update the Business Brain.

The system should become increasingly specific to each business.

---

# RESCORING / PROOF

Show progress over time.

Example:

**27 → 39 → 52 → 67**

Explain:

- What improved
- Why it improved
- What remains weak
- What should happen next

The score is proof of progress, not the entire product.

---

# BUSINESS TREE

Only use Business Tree when a business/brand has multiple identifiable locations or branches.

Single location:

**BUSINESS → NORMAL VISIBILITY WORKFLOW**

Multi-location:

**HEAD OFFICE / PARENT → BRANCHES → INDIVIDUAL VISIBILITY**

Use public information to identify possible parent/head-office/franchise/network relationships.

Deeper branch investigation requires appropriate authorization.

---

# DATA FOUNDATION

Use Supabase as the system of record.

Core entities include:

- organizations
- businesses
- users
- memberships
- roles
- permissions
- investigations
- investigation_targets
- investigation_runs
- sources
- evidence
- evidence_relationships
- verification_results
- platforms
- accounts
- listings
- websites
- domains
- social_profiles
- scores
- score_components
- score_history
- findings
- gaps
- opportunities
- recommendations
- strategies
- actions
- content
- content_assets
- campaigns
- publishing_jobs
- executions
- execution_results
- agents
- skills
- agent_runs
- skill_runs
- connections
- connection_permissions
- autopilot_rules
- autopilot_runs
- notifications
- audit_events
- system_events

Use appropriate foreign keys, timestamps, statuses, ownership, permissions, and audit fields.

---

# EXISTING COMPONENT PLACEMENT

## KEEP

- Supabase — system of record
- Logto — identity/RBAC
- OmniRoute — AI routing
- Agent-Reach — investigation
- Maigret — account candidate discovery
- Postiz — publishing capability
- ComfyUI — creative capability
- ToolJet — internal operations

## ADAPT / WRAP

- Maps MCP → Zuxuru evidence contract
- Website Intelligence → Zuxuru Investigation API
- Search Intelligence → normalized evidence
- Agent-Reach → Investigation Engine boundary
- Postiz → Distribution/Execution boundary
- ComfyUI → Studio/Creative boundary

## ZUXURU-OWNED IP

- Orchestrator
- Investigation Engine
- Verification Engine
- Evidence Engine
- Business Graph
- Business Brain
- Intelligence Engine
- Score Engine
- Opportunity Engine
- Strategy Engine
- Execution Engine
- Monitoring Engine
- Learning Engine
- Rescore Engine
- Autopilot
- Connection/Permission layer
- Customer experience
- Admin Control Centre

---

# USER EXPERIENCE

The first journey must be simple:

1. Enter business name.
2. Zuxuru discovers the public presence.
3. Show Public Visibility Score.
4. Explain the biggest problems.
5. Ask the owner to connect relevant platforms.
6. Perform deeper connected analysis.
7. Show prioritized opportunities.
8. Let the owner activate automation.
9. Zuxuru performs permitted work.
10. Show what was done.
11. Measure results.
12. Rescore.
13. Learn.
14. Continue.

The dashboard must answer:

- How visible am I?
- What is wrong?
- What is Zuxuru doing?
- What improved?
- What happens next?

---

# BUILD ORDER

## Phase 1 — FOUNDATION

Build:

- Business creation
- Business Brain
- Business Passport
- Public discovery
- Public Visibility Score
- Problem detection
- Basic dashboard

## Phase 2 — CONNECTED INTELLIGENCE

Build:

- Platform connections
- Connected data
- Deeper scoring
- Diagnostics
- Opportunity Engine

## Phase 3 — CREATION

Build:

- Studio
- AI content creation
- Phone-camera capture
- Content library

## Phase 4 — EXECUTION

Build:

- Publishing
- Action management
- Approval system
- Visibility calendar

## Phase 5 — AUTOPILOT

Build:

- Automation rules
- Green/Yellow/Red policy
- Monitoring
- Automated permitted execution

## Phase 6 — LEARNING

Build:

- Performance measurement
- Business-specific learning
- Content intelligence
- Visibility trends
- Adaptive recommendations

## Phase 7 — PROOF

Build:

- Rescoring
- Improvement history
- Reports
- Business health
- Value evidence

## Phase 8 — BUSINESS TREE

Build:

- Multi-location detection
- Parent/head-office relationships
- Branch management
- Network visibility

---

# IMPLEMENTATION DISCIPLINE

Before implementing any repository/component, answer:

1. Why does it exist?
2. Who calls it?
3. What does it receive?
4. What does it produce?
5. Where is the result stored?
6. Who can use it?
7. Can it execute actions?
8. Where does it sit in the Zuxuru pipeline?

If an existing component does not fit cleanly:

**DO NOT DELETE IT AUTOMATICALLY.**

Determine whether it should be:

- Wrapped
- Adapted
- Merged
- Promoted to a service
- Reused internally
- Deferred

The goal is to preserve useful existing work while preventing disconnected architecture.

---

# FINAL ACCEPTANCE TEST

The build is not considered complete when screens exist.

The minimum working product must demonstrate this complete path:

**BUSINESS NAME**
↓
**PUBLIC DISCOVERY**
↓
**PUBLIC SCORE**
↓
**PROBLEMS**
↓
**CONNECTED DATA**
↓
**DEEPER SCORE**
↓
**OPPORTUNITIES**
↓
**RECOMMENDATION**
↓
**CONTENT / ACTION**
↓
**APPROVAL**
↓
**EXECUTION**
↓
**RESULT**
↓
**MONITORING**
↓
**LEARNING**
↓
**RESCORE**
↓
**NEXT ACTION**

If this loop works, Zuxuru has its foundation.

If a feature does not strengthen this loop, do not prioritize it over completing the loop.

# END OF MASTER BUILD INSTRUCTIONS


---

# DETAILED REPOSITORY / COMPONENT BLUEPRINT

## Next: Repository-to-Implementation Blueprint

We now move from **architecture** to **implementation contracts**.

The rule is:

> **Every repository/component must have a defined home, responsibility, input, output, API boundary, data destination, and place in the Zuxuru pipeline.**

### 1. Master runtime map

```
```

```
USER
 │
 ▼
ZUXURU APP
 │
 ▼
ZUXURU API / ORCHESTRATOR
 │
 ├──────────────► LOGTO
 │                 Identity / RBAC
 │
 ├──────────────► BUSINESS GRAPH
 │                 Business state
 │
 ▼
INVESTIGATION ENGINE
 │
 ├── Agent-Reach ─────► Web / Social intelligence
 ├── Maigret ─────────► Username discovery
 ├── Maps MCP ────────► Local business intelligence
 ├── Website Engine ──► Website intelligence
 └── Search Engine ───► Search intelligence
 │
 ▼
VERIFICATION ENGINE
 │
 ▼
EVIDENCE STORE
 │
 ▼
BUSINESS GRAPH
 │
 ▼
ZUXURU INTELLIGENCE ENGINE
 │
 ├── Score Engine
 ├── Gap Engine
 ├── Opportunity Engine
 ├── Recommendation Engine
 └── Strategy Engine
 │
 ▼
OMNIROUTE
 │
 ├── AI Models
 ├── MCPs
 ├── Skills
 └── Agents
 │
 ▼
APPROVAL
 │
 ▼
EXECUTION ENGINE
 │
 ├── Studio
 │    └── ComfyUI
 │
 ├── Social Publishing
 │    └── Postiz
 │
 ├── Website Actions
 │
 └── Connected Platforms
 │
 ▼
MONITORING ENGINE
 │
 ▼
RESCORE ENGINE
 │
 ▼
BUSINESS GRAPH
 │
 ▼
ZUXURU
"Your visibility improved from 27 → 39"
```

---

# 2. Repository-by-repository implementation contract

| Repository / ComponentRuns AsZuxuru PositionReceivesProducesWrites To |                      |                         |                       |                        |                   |
| --------------------------------------------------------------------- | -------------------- | ----------------------- | --------------------- | ---------------------- | ----------------- |
| **Zuxuru**                                                            | Web app              | Customer experience     | User/business state   | UI/actions             | API               |
| **OmniRoute**                                                         | Service              | AI infrastructure       | AI tasks              | Model response/routing | Logs/telemetry    |
| **Agent-Reach**                                                       | Service/tool layer   | Investigation           | Investigation queries | External intelligence  | Evidence          |
| **Maigret**                                                           | Worker/tool          | Identity discovery      | Usernames             | Account candidates     | Evidence          |
| **Maps MCP**                                                          | MCP server           | Local investigation     | Business/location     | Listings/reviews       | Evidence          |
| **Website Intelligence**                                              | Worker/MCP           | Website investigation   | URL                   | Website findings       | Evidence          |
| **Search Intelligence**                                               | Worker/MCP           | Search investigation    | Query/entity          | Search evidence        | Evidence          |
| **Supabase**                                                          | Backend/database     | System of record        | Application records   | Persistent records     | PostgreSQL        |
| **Logto**                                                             | Identity service     | Authentication          | Credentials/session   | Identity/claims        | Identity store    |
| **Postiz**                                                            | Publishing service   | Social execution        | Approved content      | Published content      | Execution records |
| **ComfyUI**                                                           | Creative engine      | AI Studio backend       | Creative workflow     | Media assets           | Asset storage     |
| **ToolJet**                                                           | Internal app         | Operations              | Internal data         | Admin actions          | API/Supabase      |
| **Vault**                                                             | Secure service       | Connection layer        | OAuth credentials     | Connection passport    | Secure store      |
| **Business Graph**                                                    | Zuxuru service/model | Business intelligence   | All business entities | Unified state          | Supabase/graph    |
| **Intelligence Engine**                                               | Zuxuru service       | Proprietary IP          | Verified evidence     | Scores/findings        | Business Graph    |
| **Execution Engine**                                                  | Zuxuru service       | Action layer            | Approved actions      | Execution results      | Business Graph    |
| **Monitoring Engine**                                                 | Zuxuru service       | Continuous intelligence | New evidence/events   | Change events          | Business Graph    |
| **Rescore Engine**                                                    | Zuxuru service       | Outcome measurement     | Previous/new state    | Improvement            | Score history     |

---

# 3. Supabase becomes the foundation

The database should be organized around the Zuxuru business model rather than around whichever repository happens to need a table.

### Core tables

```
```

```
organizations
businesses
users
memberships
roles
permissions

investigations
investigation_targets
investigation_runs

sources
evidence
evidence_relationships
verification_results

platforms
accounts
listings
websites
domains
social_profiles

scores
score_components
score_history

findings
gaps
opportunities
recommendations
strategies
actions

content
content_assets
campaigns
publishing_jobs
executions
execution_results

agents
skills
agent_runs
skill_runs

connections
connection_permissions

autopilot_rules
autopilot_runs

notifications
audit_events
system_events
```

### The important relationship

```
```

```
business
   ↓
investigation
   ↓
evidence
   ↓
verification
   ↓
finding
   ↓
score
   ↓
opportunity
   ↓
recommendation
   ↓
action
   ↓
execution
   ↓
result
   ↓
new evidence
   ↓
new score
```

That becomes the permanent Zuxuru data spine.

---

# 4. Agent-Reach contract

Agent-Reach should **not know Zuxuru's score formula**.

### Zuxuru sends:

```
```

```
{
  "business": "Example Business",
  "location": "Durban",
  "investigation_type": "digital_presence",
  "queries": [
    "Example Business",
    "Example Business Durban"
  ]
}
```

### Agent-Reach returns conceptually:

```
```

```
{
  "source": "...",
  "url": "...",
  "platform": "...",
  "title": "...",
  "content": "...",
  "retrieved_at": "...",
  "source_type": "web"
}
```

Then Zuxuru takes over:

```
```

```
Agent-Reach
     ↓
Evidence Normalizer
     ↓
Verification
     ↓
Business Graph
```

---

# 5. Maigret contract

Maigret becomes a **candidate account discovery engine**.

```
```

```
Business Name
      ↓
Username Generator
      ↓
Maigret
      ↓
Possible Accounts
      ↓
Verification Engine
```

Example:

```
```

```
ABC Plumbing
     ↓
abcplumbing
abc_plumbing
abcplumbingdurban
abcplumbingza
     ↓
Maigret
     ↓
Instagram
Facebook
TikTok
YouTube
etc.
```

But Maigret's result remains:

> **Candidate**

until Zuxuru verifies it.

---

# 6. Maps investigation contract

Maps provides local evidence.

### Input

```
```

```
Business name
Location
Category
```

### Output

```
```

```
Business listing
Address
Phone
Website
Category
Rating
Review count
Reviews
Photos
Posts
Location
Competitors
```

Then:

```
```

```
Maps
 ↓
Evidence
 ↓
Verification
 ↓
Business Graph
 ↓
Local Visibility Score
```

---

# 7. Website Intelligence contract

This should eventually become a Zuxuru-owned adapter rather than allowing website logic to leak into the rest of the platform.

### Input

```
```

```
URL
```

### Output

```
```

```
Page title
Meta description
Headings
Content
Business name
Phone
Email
Address
Links
Structured data
Social links
Contact information
Technical signals
Local SEO signals
Brand signals
Content signals
```

Then Zuxuru interprets those results.

---

# 8. Intelligence Engine contract

This is the most important internal service.

```
```

```
Evidence
   ↓
Normalize
   ↓
Verify
   ↓
Classify
   ↓
Calculate
   ↓
Score
   ↓
Gap detection
   ↓
Opportunity detection
```

### Example

Evidence:

```
```

```
Google listing exists
Rating = 4.1
Reviews = 18
Website exists
Instagram exists
Instagram inactive
Website has no local schema
```

Intelligence Engine:

```
```

```
Google = moderate
Reviews = weak/moderate
Website = weak
Social = weak
Local SEO = weak
```

Then:

```
```

```
Overall Visibility = 34%
```

Then:

```
```

```
Opportunity #1
Complete Google Business Profile

Opportunity #2
Improve local website signals

Opportunity #3
Restart social publishing
```

---

# 9. Opportunity Engine

This needs its own logic rather than being an AI prompt.

Conceptually:

```
```

```
Opportunity Score =
Impact
× Confidence
× Business Relevance
÷ Effort
```

So Zuxuru can distinguish:

### High value

> Fix Google Business Profile

from:

### Low value

> Change website button color

Even though an AI model might recommend both.

---

# 10. OmniRoute contract

OmniRoute receives **tasks**, not arbitrary business decisions.

Example:

```
```

```
TASK:
Analyse why this business has weak local visibility.

CONTEXT:
Verified business evidence

REQUIREMENTS:
- Explain causes
- Rank opportunities
- Provide actionable recommendations

CONSTRAINTS:
- Use approved business context
- Return structured output
```

OmniRoute determines:

```
```

```
Which model?
Which provider?
Fallback?
Cost?
Latency?
```

Zuxuru determines:

```
```

```
Why are we asking?
What does the result mean?
What should happen next?
```

---

# 11. Studio contract

Studio becomes the bridge between:

**strategy → content → creative production → approval → publishing**

```
```

```
Opportunity
 ↓
Content recommendation
 ↓
Creative brief
 ↓
Studio
 ↓
ComfyUI
 ↓
Assets
 ↓
Human approval
 ↓
Postiz
```

And smartphone capture becomes a first-class input:

```
```

```
PHONE CAMERA
     ↓
STUDIO
     ↓
AI PROCESSING
     ↓
EDITING
     ↓
BRAND APPLICATION
     ↓
CONTENT VARIANTS
     ↓
APPROVAL
     ↓
PUBLISH
```

---

# 12. Postiz contract

Postiz should receive **approved publishing jobs**.

```
```

```
{
  business_id,
  platform,
  account_id,
  content,
  media,
  publish_at,
  campaign_id
}
```

It returns:

```
```

```
status
platform_post_id
platform_url
published_at
errors
analytics
```

Zuxuru then stores the execution result.

---

# 13. ComfyUI contract

ComfyUI should receive a **creative workflow**, not business strategy.

```
```

```
Zuxuru Strategy
      ↓
Creative Brief
      ↓
ComfyUI
```

Input:

```
```

```
brand assets
creative brief
style
format
dimensions
workflow
reference assets
```

Output:

```
```

```
image
video
audio
animation
creative variations
```

---

# 14. Execution Engine

This becomes the single gateway for actions.

Nothing should directly jump from an AI agent to a customer account.

Correct:

```
```

```
Agent
 ↓
Recommendation
 ↓
Approval
 ↓
Execution Engine
 ↓
Connector
 ↓
External platform
```

That gives us:

-  permission control 
-  auditability 
-  retries 
-  error handling 
-  human approval 
-  execution history 
-  rollback where possible 

---

# 15. Monitoring Engine

Monitoring watches the business after execution.

For example:

```
```

```
POST PUBLISHED
       ↓
WAIT
       ↓
REINVESTIGATE
       ↓
COMPARE
       ↓
CHANGE DETECTED
       ↓
RESCORE
```

This is what transforms Zuxuru from a one-time audit into a **continuous business visibility system**.

---

# 16. The complete engine hierarchy

I would lock the architecture around these engines:

```
```

```
                 ZUXURU
                    │
             ORCHESTRATOR
                    │
     ┌──────────────┼───────────────┐
     │              │               │
     ▼              ▼               ▼
INVESTIGATION  INTELLIGENCE      EXECUTION
 ENGINE          ENGINE           ENGINE
     │              │               │
     │              │               │
Discovery       Scoring         Publishing
Verification    Opportunities   Creative
Evidence        Strategy        Website
     │              │               │
     └──────────────┼───────────────┘
                    ▼
              BUSINESS GRAPH
                    │
                    ▼
                MONITORING
                    │
                    ▼
                 RESCORE
                    │
                    ▼
                AUTOPILOT
```

---

# 17. Where the open-source stack fits

The final relationship becomes:

```
```

```
                 ZUXURU IP
 ┌───────────────────────────────────────┐
 │                                       │
 │ Investigation Engine                  │
 │ Verification Engine                   │
 │ Business Graph                        │
 │ Intelligence Engine                  │
 │ Score Engine                          │
 │ Opportunity Engine                    │
 │ Strategy Engine                       │
 │ Execution Engine                      │
 │ Monitoring Engine                     │
 │ Rescore Engine                        │
 │ Customer Experience                  │
 │                                       │
 └──────────────────┬────────────────────┘
                    │
             CAPABILITY LAYER
                    │
 ┌──────────────────┼────────────────────┐
 │                  │                    │
 ▼                  ▼                    ▼
Agent-Reach      Maigret              Maps MCP
Search           Identity             Local
 │                  │                    │
 └──────────────────┼────────────────────┘
                    │
              AI INFRASTRUCTURE
                    │
                 OmniRoute
                    │
             Models / MCPs
                    │
 ┌──────────────────┼────────────────────┐
 ▼                  ▼                    ▼
ComfyUI            Postiz              Website
Creative           Publishing           Actions
                    │
                    ▼
                 SUPABASE
                    │
                 LOGTO/Vault
```

---

# 18. KEEP / ADAPT / BUILD decision

### KEEP

**Supabase**

System of record.

**Logto**

Identity and permissions.

**OmniRoute**

AI routing infrastructure.

**Agent-Reach**

External investigation capability.

**Maigret**

Account discovery.

**Postiz**

Publishing.

**ComfyUI**

Creative production.

**ToolJet**

Internal operations.

### ADAPT

Maps MCP

→ make it conform to Zuxuru evidence contracts.

Website intelligence

→ wrap it behind Zuxuru's investigation API.

Search intelligence

→ standardize its output into evidence.

Agent-Reach

→ hide provider-specific details behind Zuxuru's Investigation Engine.

Postiz

→ hide publishing complexity behind Execution Engine.

ComfyUI

→ hide workflow complexity behind Studio/Creative Engine.

### BUILD / OWN

These are the strategic core:

```
```

```
Zuxuru Orchestrator
Investigation Engine
Verification Engine
Evidence Engine
Business Graph
Intelligence Engine
Score Engine
Opportunity Engine
Strategy Engine
Execution Engine
Monitoring Engine
Rescore Engine
Agent Registry
Skill Registry
Connection Passport
Autopilot
Admin Control Centre
```

---

# 19. The ultimate rule for the ecosystem

Every component must answer these **eight questions**:

| QuestionRequired answer                |                                           |
| -------------------------------------- | ----------------------------------------- |
| **Why does it exist?**                 | One specific responsibility               |
| **Who calls it?**                      | Defined upstream component                |
| **What does it receive?**              | Formal input contract                     |
| **What does it produce?**              | Formal output contract                    |
| **Where is the result stored?**        | Business Graph/Supabase/etc.              |
| **Who can use it?**                    | User/agent/service/administrator          |
| **Can it execute actions?**            | Explicit permission                       |
| **Where does it sit in the pipeline?** | Investigation/Intelligence/Execution/etc. |

If a repository cannot answer these questions, **we don't throw it away**. We determine whether it should be:

**wrapped, adapted, merged, promoted to a service, or relegated to an internal capability.**

That is the safest way to honor the **“nothing goes to waste”** principle while preventing the Zuxuru architecture from becoming a pile of disconnected repositories.