# File 37 — Growth Engine MVP ZIP: Browser-Only Evidence and Opportunity Audit

**Source:** `zuxuru-growth-engine-mvp.zip` (6,537 bytes). Inspected actual ZIP bytes. It contains exactly two files: `zuxuru-app/README.md` (936 bytes) and `zuxuru-app/index.html` (16,706 bytes).

## What is actually implemented
- Standalone responsive HTML/CSS/vanilla JavaScript application, no build tools or external services. README suggests opening `index.html` or serving via `python3 -m http.server 8080`.
- Seven views: **Home, Investigate, Diagnosis, Opportunities, Studio, Leads, Results**.
- Business-name input, client-side navigation, example identity candidates, evidence ledger, customer segments, assets, opportunity graph, diagnosis, Studio preview, lead cards and a growth-loop diagram.
- `demo` object contains hardcoded ABC Fitness Studio/Durban example candidates, **visibility score 74**, four findings, four customer groups, four assets and three opportunities with fit scores **91/86/78**. The R2,000/month advertiser figure is an **illustrative offer**, not measured revenue or current Bonga pricing.
- `investigate()` sets `state.running=true`, then `setTimeout(...,1000)` marks investigation complete; there are **zero `fetch()` calls** and no actual search, evidence retrieval, identity verification or scoring.
- Candidate “THIS IS MY BUSINESS”, “Generate offers”, “Open close package”, Studio mode controls and other prominent buttons have **no functional handlers**. A static “AI-generated production preview” is not a generated asset.
- State is held only in a JavaScript object; **no `localStorage`, server persistence, authentication, OAuth, job queue or external action receipts**.
- On mobile (<=650px) the entire sidebar is hidden with no replacement navigation, preventing ordinary access to the seven views.

## Critical security and correctness issues
1. **DOM XSS:** user-controlled `state.business` is inserted unescaped into template strings subsequently assigned to `view.innerHTML` (investigation toolbar input value, diagnosis text, Studio title). Use DOM-safe text/value assignments or trusted escaping/sanitization and strict URL validation.
2. **Unverified results:** the UI presents a generic 74/100 score and evidence as if tied to the entered business; no real source URL, capture time, provider receipt, confidence calibration or owner confirmation is attached.
3. **Fake completion:** the one-second timer signals “Investigation complete” even though no work occurred. Keep simulation visibly labeled DEMO and never use it for customer decisions.
4. **No identity selection:** the owner confirmation buttons are inert, so the workflow cannot bind a verified candidate.
5. **No lead consent or provenance:** opportunity matches and “leads” are fixed examples, not permissioned business relationships.
6. **No real Studio:** recording, livestream, image and video modes do not activate devices or generation jobs.
7. **Inaccessible mobile navigation:** hidden sidebar, small type and inactive controls need responsive, keyboard and screen-reader redesign.
8. **No execution or measurement:** results are fixed counts, with no before/after metrics, verified leads, revenue or publishing receipts.

## Architecture-preserving Bonga integration
The **existing Bonga Bhengu App is authoritative**: preserve its current repository, navigation, design system, auth, tenant storage, administrator override, four product families and subscription entitlements. Do not deploy a second Zuxuru app or replace the Bonga Digital Visibility interface.

- **Digital Visibility:** business-name-first Investigation → candidate identity confirmation → evidence with provenance → reproducible score → diagnosis.
- **Business Scraper:** infer prospective customers' business needs and problems from verified evidence; do not use example lead cards as real prospects.
- **Business Growth Intelligence:** model customer segments, assets, root causes and mutually relevant opportunities; distinguish observed facts from AI hypotheses.
- **Business Converter / Hunting / Fishing / Closer:** convert approved opportunities into consented offers, CRM records, negotiation and outcomes, with actual source references.
- **Creative Studio:** use Bonga's existing operational generation/recording/publishing pipelines; no fake preview or completed job.
- **Website Builder & Hosting / Digital Banner Builder:** invoke existing tools only when an authorized solution calls for them.
- **Execution Intelligence:** require owner approval, tenant-safe jobs, idempotency, provider receipts and measured results.

## CodeRabbit implementation gates
- First inventory existing Bonga workflows; import **conceptual contracts**, not the HTML shell or fixed demo data.
- Block XSS from arbitrary business names and safe handling of HTML attributes.
- Replace timer with real backend job status, failure states and evidence; distinguish public discovery from owner-authorized connectors.
- Wire candidate selection, offer generation and Closer actions to verified handlers or visibly disable them.
- Restore accessible mobile navigation and test keyboard/screen-reader use.
- Verify tenant isolation, consent, evidence provenance, audit history, job receipts and measurable results.
- Treat the example 74 score, fit percentages and R2,000 figure as samples only.

**Status:** Both ZIP files reviewed and aligned; documentation-only GitHub commit. No app source code, deployment, live integration or CodeRabbit approval was changed.
