# File 22 — Digital Investigation Positioning, Visibility Funnel and MCP Priorities

**Source reviewed:** `Pasted markdown(5).md` (1,464 lines). This is a historical Fukulisane/Zuxuru product strategy critique, 90-day validation proposal and MCP capability shortlist. It includes illustrative screenshots, scores, funnel assumptions and pricing experiments, **not verified customer outcomes or current live product settings**.

## Preserve the existing Bonga Bhengu App
Bonga Bhengu is the master platform. Keep its current application architecture, authentication, tenant model, four products (Website Builder & Hosting, Digital Visibility, Creative Studio, Digital Banner Builder), subscription configuration and administrator override. Historical Fukulisane/Zuxuru positioning, prices and dashboard layouts are capability inputs, not replacements.

## Terminology and customer promise
The source explicitly corrects the terminology: **Investigation**, not **Scan**, is the preferred customer-facing action. Use:
- **Start Investigation** for a business-name-based public investigation.
- **Digital Intelligence Report** for findings with evidence, sources and uncertainty.
- **Digital Visibility Score** for a reproducible, coverage-qualified calculation.
- **Investigate → Discover → Verify → Score → Diagnose → Recommend → Authorize → Execute → Measure → Grow** as the shared workflow.

A new business may have only a name and no registration, website or social profiles. That is a valid investigation starting point, not a failed onboarding case.

## Four intelligence layers, mapped additively
1. **Business Visibility Intelligence:** Public name/brand discovery, candidate matching, public footprint, source evidence, rankings and visibility.
2. **Business Connection Intelligence:** Owner-authorized first-party data, platform permission health and secure access; do not infer ownership from public matches.
3. **Business Growth Intelligence:** Customer problems, root causes, three ranked opportunities, evidence-based business/brand/marketing recommendations and offers.
4. **Execution Intelligence:** Owner-approved website fixes, Studio content, digital banners, publishing, measurement and verified before/after outcomes.

## Customer dashboard and funnel
Prefer a focused summary of: **Where am I? What is hurting me? What should I do first?** Expand into evidence, score components and detailed tools on demand. A proposed conversion journey is:
Public investigation → useful evidence and diagnosis → optional authorized connection → paid execution → measured improvement → retention.

Track investigation completion, evidence coverage, verified identity rate, qualified leads, connection opt-in, offer acceptance, paid conversion, actual action completion and customer retention. Historical examples such as 27% current visibility, 74% potential, a 47-point gap and funnel counts are **illustrations only**; never present them as actual scores, guaranteed attainable potential or customer traction.

## Historical prices and validation
The source discusses trial pricing at **R1,999 / R3,999 / R6,999 monthly**. These are historical proposed service tests, **not the Bonga subscription catalogue**. Do not overwrite the existing four-tier entitlements or checkout. Any future premium managed-service offering needs separate product approval and pricing validation.

A suggested validation sequence: recruit 20–30 businesses for evidence-based investigations; test willingness to pay; deliver verified improvements with human help if automation is incomplete; measure changes and customer outcomes. No case study, conversion or revenue claim is valid without records.

## MCP capability shortlist and contracts
| Capability | Input | Verified output | Rule |
|---|---|---|---|
| Web/search discovery | Business name, location context | URLs, snippets, observed timestamps, source metadata | No invented result or ownership |
| Maps/local discovery | Business candidate, locality | Listings, ratings/reviews where permitted | Do not conflate same-name businesses |
| Username discovery (e.g., Maigret) | Candidate brand handles | Possible public accounts | Candidate only; not a people-dossier service |
| Website intelligence | Verified URL | Crawl, metadata, links, structured data, technical observations | Honor source policies and failures |
| Search/SEO intelligence | Defined queries, location, device, time | Observed positions/coverage where permitted | No unmeasured universal rank |
| Review intelligence | Verified business listing | Review count, recency, themes and source | Respect terms, retention and privacy |

**MCPs collect evidence; Bonga's intelligence engine normalizes, verifies, scores and prioritizes.** A candidate MCP or vendor named in the source (Exa, HasData, Outscraper, generic Fetch) is not an installed or approved integration. Verify licenses, provider terms, API availability, rate limits, costs and data handling before adding. Prefer a small verified set rather than activating dozens of overlapping tools.

## Future Bonga Intelligence MCP
Possible *future* internal capabilities: `investigate_business`, `get_visibility_score`, `get_visibility_evidence`, `get_platform_scores`, `find_opportunities`, `prioritize_actions`, `generate_action_plan`, `get_score_history`, `calculate_visibility_change`. These are **proposed interfaces, not deployed tools**. Replace the historical `scan_business()` label in new customer-facing flows with investigation terminology.

## CodeRabbit acceptance checks
1. Do not rebuild the app or duplicate engines, billing, authentication or tenant storage.
2. Investigation must accept business names without requiring a website or registration.
3. Public findings distinguish verified, likely, not found in checked sources and unknown; display source links and observation time.
4. Visibility scoring must be deterministic with explicit weights, coverage and evidence; distinguish actual from estimated potential.
5. Present three prioritized actions without hiding detailed reports.
6. Connectors never imply authorization until a provider confirms it.
7. Any external publishing, spending or customer messaging needs explicit owner/admin policy and execution receipts.
8. No example scores, case studies, customer counts or revenue numbers are presented as actual data.
9. Existing Bonga four-product subscriptions remain unchanged.

**Status:** File 22 aligned as product strategy, UX terminology and MCP implementation guidance. This documentation commit does not install MCPs, modify live billing, implement app features or deploy the public site.
