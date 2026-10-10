# File 25 — Investigation API Fail-Closed Prototype and Version Comparison

**Source reviewed:** `index(6).html` (five minified lines), a standalone HTML/JavaScript *Zuxuru Investigation* page. This is an earlier sibling of file 24 (`index(7).html`), sharing nearly identical layout and API calls but with materially different error handling.

## Verified source behavior
- Business-name input, responsive three-column candidate cards, progress indicator, selection and evidence display.
- `POST /api/discover` with `{name}`, then a user-selected candidate.
- `POST /api/investigate` with `{candidate}`; renders finding, reason, fact, interpretation, source and confidence.
- `GET /api/status` checks a `dataforseo` field and labels an unavailable connector.
- **Discovery and investigation errors remain errors.** Unlike file 24, this version does not generate a demo candidate or local synthetic finding when an API call fails. It shows `Blocked` and the error message.
- This file has no proof that the server endpoints, DataForSEO credentials, source verification, persistence or tenant authorization are actually operational.

## File 24 comparison
| Behavior | File 25: `index(6).html` | File 24: `index(7).html` | Preferred Bonga contract |
|---|---|---|---|
| Discovery API failure | Error shown; progress blocked | Silently creates demo candidate | **File 25 fail-closed behavior** |
| Investigation API failure | Error shown; progress blocked | Silently creates synthetic test finding and marks complete | **File 25 fail-closed behavior** |
| Status API failure | Promise rejection has no `.catch()` | Displays explicit test-mode status | Add proper catch that says **Unavailable / not verified**, without demo substitution |
| Candidate selection | Client sends entire candidate object | Same | Server-issued candidate ID and server-side tenant validation |
| URL rendering | HTML-escaped but no URL scheme validation | Same | Validate HTTP(S), safe rel attributes |
| Mobile navigation | Sidebar hidden below 850px | Same | Accessible replacement navigation |

## Alignment to the existing Bonga Bhengu App
Preserve existing branding, product navigation, authentication, tenant boundaries, four products, subscriptions and administrator override. Reuse only the investigation interaction pattern inside the existing **Digital Visibility / Business Scraper** area; do not introduce a standalone Zuxuru app or second backend.

Business Scraper remains a customer-needs and business-problem discovery agent, not just a lead/contact harvester. Public business evidence must be verified before diagnosis, and all customer data must be authorized and minimized.

## Required production behavior
1. Distinguish **queued**, **running**, **completed**, **partial**, **failed**, **unavailable** and **not assessed**.
2. Never replace provider failures with a simulated candidate, fake source or success score.
3. Show empty-state messaging when a real provider returns no candidates; do not invent a business.
4. Verify candidate identity using source evidence and confirmation; do not trust browser-submitted candidate fields.
5. Persist tenant-scoped investigation IDs, provenance, timestamps, provider errors and user confirmation.
6. Enforce input length/schema, API response validation, abort/timeouts, rate limits and server permissions.
7. Keep raw external facts separate from AI interpretation and recommendations.
8. Validate external source URLs and render safely; never use the app's own URL as external business evidence.
9. Handle status endpoint errors explicitly and keep the Investigate button appropriately disabled when necessary.
10. Make all routes and progress updates accessible on mobile, keyboard and screen readers.

## CodeRabbit checks
- Compare file 25 and file 24 before implementing; **do not copy the latter's catch-and-demo fallback**.
- Reuse the current Bonga API architecture and existing connector health service where available.
- Test 401/403/429/500, malformed JSON, timeout, offline, empty candidates and revoked provider credentials.
- Require actual evidence links and provider receipts before marking a real investigation complete.
- No claims of live DataForSEO or production deployment without direct verification.

**Status:** Reviewed and aligned as a version-specific fail-closed frontend audit. Documentation-only commit; no app code or deployment changed.
