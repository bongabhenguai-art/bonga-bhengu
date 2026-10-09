# File 24 — Investigation HTML API Prototype and Demo-Fallback Audit

**Source reviewed:** `index(7).html`, a five-line minified standalone HTML/CSS/JavaScript document titled *Zuxuru Investigation*. It is a frontend prototype with **three HTTP endpoints referenced**, not evidence that the endpoints exist or work.

## Bonga architecture preservation
The existing Bonga Bhengu App remains authoritative for branding, routes, tenant auth, four products, subscriptions and admin override. The Zuxuru page is a candidate UI workflow for the existing **Digital Visibility / Business Investigation** product, not a replacement shell, new login or second database.

## What this source implements
- Responsive sidebar and business-name form; mobile CSS hides the sidebar below 850px.
- `POST /api/discover` with `{name}`, expecting `candidates` containing business name, website, phone, rating, reviews, confidence and reason.
- Candidate-selection buttons that invoke `run(index)`; user selects the business identity before investigating.
- `POST /api/investigate` with `{candidate}`, expecting `findings` with finding, reason, fact, interpretation, confidence and source.
- `GET /api/status`, expecting a `dataforseo` boolean, to show a connection status.
- Basic error text, progress bar, button disable while discovery runs, Enter-key support and an `esc()` helper for interpolated HTML.
- **On any discovery request failure**, a single demo/unverified candidate is generated from the user-entered name.
- **On any investigation request failure**, a fabricated local test finding is displayed with the current page URL as `source`, and progress is set to **“Investigation complete” 100%**.

## Critical issues to fix before production
1. **Silent fallback masks provider outages.** A 401, 429, 500, offline failure or malformed response becomes a demo candidate/finding; production must show the real error and offer retry. Only explicit demo mode may show simulated entries.
2. **“Observed fact” is misused for test success.** Accepting a typed name is an observed UI event, not verified public evidence about the business.
3. **The current page URL is not an external evidence source.** Never present `location.href` as business investigation provenance.
4. **No tenant identity, authorization, audit or persistence** appears in this standalone HTML. Backend endpoints must enforce tenant-scoped permissions.
5. **Candidate objects are passed directly from the browser** into `/api/investigate`. Use server-issued candidate IDs and revalidate ownership and identity rather than trusting client-supplied fields.
6. **No input limits, response schema validation or timeout/abort logic.** Add bounded name length, JSON schema checks, request cancellation, timeouts and clear retry states.
7. **Untrusted URL handling.** Although `esc()` HTML-escapes the candidate website and finding source, it does not validate allowed URL schemes. Block `javascript:`, `data:` and other unsafe URLs; use safe HTTP(S) links and `rel="noopener noreferrer"` for `target="_blank"`.
8. **`/api/status` boolean is not sufficient proof** that the search provider is authenticated, healthy and able to deliver a real result. Report verified health, authorization, time and failure reason.
9. **Navigation is decorative.** The sidebar items are static `div` elements, not functional route controls; on mobile the entire sidebar disappears without a replacement navigation path.
10. **Accessibility needs improvement.** Add explicit input label, progress announcements, keyboard focus on results, semantic navigation and accessible candidate selection.
11. **Race and UI states.** Investigate buttons can be clicked repeatedly; add in-flight protection, cancellation and deterministic error/empty/success states.
12. **No real evidence storage or replay.** Findings are rendered in the browser only; require immutable source metadata and persisted investigation run IDs.

## Additive API contract for the existing Bonga service
- `POST /investigations/discover`: authenticated tenant/business context, validated business-name query and optional location; returns candidate IDs, source references, confidence and provider status.
- `POST /investigations/{runId}/select-candidate`: selected server candidate ID; verifies tenant and records decision.
- `POST /investigations/{runId}/execute`: durable investigation job with provider receipts and progress events.
- `GET /investigations/{runId}`: state = queued/running/completed/partial/failed, with separate evidence and interpretation records.
- `GET /connectors/health`: actual provider configuration, authorization and recent test outcome; no secret values.

These are proposed conceptual endpoints; adapt names to the existing Bonga backend rather than creating duplicate services.

## CodeRabbit QA gates
- Preserve all Bonga navigation, branding, billing, tenant security and admin override.
- Demonstrate both real provider success and explicit unavailable/error states.
- Never mark a fallback test result as a live investigation.
- Validate external URLs and server-issued candidate IDs.
- Test 401, 403, 429, 500, timeout, offline, empty results and provider revocation.
- Verify mobile navigation and assistive-technology usability.
- Store real evidence with provenance, timestamps and identity disambiguation.

**Status:** Reviewed and aligned as a frontend/API prototype audit. This documentation-only commit does not create API endpoints, connect DataForSEO, implement investigation jobs or deploy the app.
