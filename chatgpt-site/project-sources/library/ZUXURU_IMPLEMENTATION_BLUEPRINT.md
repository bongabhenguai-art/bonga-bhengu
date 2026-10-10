# ZUXURU — Implementation Blueprint

## Purpose
Translate the Final Master Build Specification into a practical build sequence without changing the product architecture.

## Repository target

```text
zuxuru/
├── app/                    # web application
├── components/             # reusable UI
├── modules/
│   ├── discovery/
│   ├── visibility/
│   ├── business-profile/
│   ├── vault/
│   ├── website/
│   ├── seo/
│   ├── branding/
│   ├── strategy/
│   ├── content-studio/
│   ├── distribution/
│   ├── analytics/
│   ├── business-graph/
│   ├── agents/
│   ├── execution/
│   └── autopilot/
├── integrations/
├── database/
├── tests/
├── docs/
└── README.md
```

## Shared contracts

Every module should exchange structured business context through shared identifiers such as:

```text
organization_id
business_id
user_id
connection_id
asset_id
campaign_id
experiment_id
job_id
```

## Core data domains

```text
organizations
businesses
users
memberships
business_profiles
business_assets
connections
connection_events
visibility_scans
visibility_findings
evidence
brand_profiles
seo_findings
strategies
content_assets
content_versions
campaigns
publishing_jobs
published_posts
performance_metrics
experiments
recommendations
agent_runs
autopilot_events
audit_logs
```

## Build sequence

1. Establish repository and environment configuration.
2. Establish authentication and organization/business ownership.
3. Establish database schema and row-level access controls.
4. Build Business Profile.
5. Build public visibility discovery and evidence model.
6. Build Vault connection lifecycle.
7. Add one verified production integration before expanding connectors.
8. Build website/SEO/branding findings.
9. Build recommendations and strategy records.
10. Build Content Studio media library and intake.
11. Add transcription/analysis and content repurposing.
12. Add approval workflow.
13. Add one real publishing integration.
14. Add performance ingestion.
15. Build Business Graph aggregation.
16. Add agent orchestration.
17. Add controlled Autopilot.
18. Add additional integrations only after the core loop is stable.

## Testing principle

Every external integration must have tests for:

```text
CONNECT → VERIFY → SYNC → ACTION → VERIFY → ERROR → RECONNECT
```

Do not mark an integration "live" from UI presence alone.

## Release gates

### Gate A — Foundation
Users can create/access a business and view its profile.

### Gate B — Intelligence
A real business can receive evidence-backed visibility findings.

### Gate C — Connection
A real authorized integration can connect, verify and sync.

### Gate D — Execution
An approved change can be executed and verified.

### Gate E — Studio
Real content can be uploaded, processed, approved and published through a supported integration.

### Gate F — Learning
Real performance data updates the business record and produces a next recommendation.

### Gate G — Autopilot
Automation runs only inside configured permissions and approval policies.
