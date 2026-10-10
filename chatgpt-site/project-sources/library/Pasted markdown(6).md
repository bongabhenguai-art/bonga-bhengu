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