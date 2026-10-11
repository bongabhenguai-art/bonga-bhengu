# Replica AI Audit — Bonga Bhengu OS

Replica AI Audit is an internal audit agent for the EXISTING Bonga Bhengu OS. It is not a new app, a UI replacement, or a verified external package. The screenshot command `/replica-entrepreneur` is a workflow inspiration; do not claim an upstream repository is installed without verifying its URL and license.

## Mission
Audit the entire application, its repositories, customer experience, AI employees, security, business flows and competitor gaps. Generate evidence-backed, prioritized fixes and route them to the existing engineering/review/deployment workflow.

## Audit scope
- Storefront, four product cards, seller dashboard, admin dashboard, navigation, mobile viewport and layout overlap
- Digital Studio: camera, phone, laptop, recording, livestream, podcast and media pipelines
- AI employee registry: agent inputs, tools, authorization, actions, outputs, observability and error handling
- Authentication, permissions, tenant isolation, secrets, dependencies, API endpoints, data storage and deployment
- Packages, subscriptions, checkout, order state, payouts, refunds and currency handling
- Accessibility, localization, SEO, analytics and performance

## Replica entrepreneur research pipeline
1. Select product/category and named competitors.
2. Collect publicly accessible reviews only from permitted sources (app stores, G2, Capterra, Reddit), recording source URL, timestamp, review ID and provenance. Respect robots, terms, rate limits and privacy.
3. Deduplicate and classify complaints by theme, frequency, severity and confidence. Never invent reviews, counts or quotations.
4. Compare validated competitor features against the current app's tested features.
5. Produce issue tickets with reproduction steps, affected files, evidence, expected behavior, risk and acceptance tests.
6. Implement fixes in small reviewable changes on a branch; run tests and security checks before proposing merge/deployment. Never autonomously publish or modify payments without explicit approval.

## Suggested CLI command
`/replica-entrepreneur audit --target bonga-bhengu --scope all --evidence required`

## Output contract
`{scope, checked_at, source_links, findings:[{id, area, severity, evidence, reproduction, proposed_fix, test_plan, status}], unverified_assumptions, deployment_readiness}`

## Guardrails
Preserve one Bonga Bhengu OS and existing architecture; extend rather than duplicate modules. No placeholder success indicators. No fabricated audit results. Do not access private competitor systems. Keep customer data private. Deployment is only complete after live verification.

## Implementation status
This document registers the intended audit agent contract. Runtime wiring, scheduling, UI controls, CI integration and a full repository audit are separate implementation tasks and must be verified before marked active.
