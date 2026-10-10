# File 20 — DeepSearch Proof, Safety Controls and Person-Search Boundaries

**Source reviewed:** `Pasted markdown(7).md` (2,514 lines), a historical Zuxuru build transcript. Its opening Investigation/Live Engine material overlaps files 18 and 19; later sections add distinct safety controls, proof-of-presence UX, GitHub/Ollama integration claims, seven-part DeepSearch reporting, growth-tool claims and person-search requirements. These are historical descriptions, **not verified source code or live integrations**.

## Master architecture
Bonga Bhengu App remains the sole product host: existing authentication, tenant separation, four products, subscriptions, Studio, routes and admin override stay unchanged. Reuse files 18–19 for the duplicate engine record; do not install a second orchestration engine.

## Distinct capabilities to align
| Source capability | Additive Bonga destination | Acceptance |
|---|---|---|
| DeepSearch by business name, including unregistered/new ventures | Digital Visibility / Business Scraper | Search candidate identities without requiring a website or company registration |
| Proof-of-Presence seven-section report | Visibility Intelligence | Identity, public presence, search engines, website, social map, name consistency, reproducible score |
| Direct evidence links and investigation replay | Evidence graph | Working source URL, observation time, confidence and entity match |
| Public versus connected intelligence | Connection Wizard and Digital Twin | Public discovery never impersonates an owner; connected private data needs verified consent |
| Safety/authorization engine | Shared agent and admin controls | Observe → Recommend → Act with explicit approval for external side effects |
| GitHub and local Ollama modules | Existing tool registry | Verify executable code, licenses, security and local resource requirements |
| Opportunity, hook, lead, marketing and closing workspaces | Existing Business Growth and CRM agents | Evidence-linked offers and measured outcomes, not generated fictional sales |
| Claimed person search and Claude integration | Restricted professional identity research capability | Strict purpose, privacy and lawful-access gates; no unrestricted people-finder |

## Proof-first investigation contract
Business-name input → multiple candidates → user confirmation → authorized public discovery → evidence-linked findings → confidence and unknown statuses → explainable score → diagnosed gaps → optional account connection → approved growth action.

Distinguish VERIFIED FOUND, LIKELY FOUND, NOT FOUND IN CHECKED SOURCES, UNKNOWN and NOT ASSESSED. “Not found” is not proof of nonexistence. Scores are computed from actual measured categories, with coverage and missing-data explanations; illustrative scores, URLs, addresses and profiles in the source are **examples**, not verified findings.

## Person-search guardrails
The source requests full-name research with emails, telephone numbers, home addresses and public-record aggregation. **Do not implement an unrestricted dossier builder or bulk aggregation of private individuals' contact/location data.** Limit any people-related investigation to a legitimate, disclosed business purpose: founder/director identity verification, publicly self-published professional roles, business-affiliated profiles and owner-provided contact channels. Minimize data, avoid home addresses and sensitive personal information, provide identity-disambiguation and correction/deletion controls, and respect applicable privacy law, source terms and rate limits. Do not infer a person's identity from matching names alone. Any outreach needs proper authorization and consent where required.

## Safety and operational design
- Observe: authorized public/business evidence, health and status checks.
- Recommend: draft plans, offers, content and actions, with source attribution.
- Act: authenticated owner/admin approval for posting, messaging, CRM changes, purchases or spending.
- Enforce cost budgets, bounded concurrency, retries, rate limits, idempotency, circuit breakers and emergency stop.
- Never convert an API failure into silent mock data or show a platform as connected without provider verification.
- Use server-side durable workers rather than claiming browser polling provides always-on automation.
- Record action, evidence, permission, provider response, result and audit trail separately.

## CodeRabbit migration checks
1. Inspect actual historical code before claiming GitHub, Ollama, Claude or ten API integrations are operational.
2. Deduplicate engines and reuse Bonga modules, tenant models and connection vault.
3. Validate every direct proof link and identity association; keep sources and observation timestamps.
4. Show incomplete or unavailable results honestly, including businesses with no site or registration.
5. Prevent cross-tenant leakage and unrestricted person/contact harvesting.
6. Require owner approval and actual execution receipts for external actions.
7. Test provider failure, consent revocation, privacy controls, circuit breakers and mobile accessibility.

**Status:** File 20 aligned as a requirements and risk-control document. No historical Zuxuru source was imported, no person search activated, and no production deployment is implied by this GitHub documentation commit.
