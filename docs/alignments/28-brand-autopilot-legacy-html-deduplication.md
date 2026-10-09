# File 28 — Brand Autopilot Legacy HTML Deduplication

**Source reviewed:** `index(3).html` (68 lines). It repeats the earlier standalone *Zuxuru — Brand Autopilot* prototype analyzed in **file 27**, `index(4).html`. The observed HTML structure, navigation, styling, example metrics and JavaScript handlers match the prior version in the reviewed content.

## Decision: deduplicate, preserve Bonga architecture
Treat this as a second archived source of the **same historical prototype**, not a request to build a second app, dashboard, engine or connection registry. The existing Bonga Bhengu App remains the master platform, with its current branding, auth, tenants, navigation, four products, subscription entitlements and administrator override unchanged.

## Reconfirmed findings from the source
- Dashboard score **82**, brand continuity **94%**, leads **27**, actions **18**, sales-growth target **10–36%** and report numbers are illustrative static UI content.
- `runScan()` sets the score to 82 and displays a completion toast; it does not call a public-source provider.
- `connectSource()` displays an authorization toast, without OAuth or provider verification.
- `generateCampaign()` appends ten asset cards, not real generated media files.
- `openPackage()` creates fixed text and a toast rather than invoking a Closer AI service.
- Brand DNA “Save & propagate” is a toast, not a persisted brand record or publication.
- The Global Visibility Network `section#global` exists but is **not reachable from the sidebar**, which has no `data-view="global"` button.
- The execution button invokes **undefined `runExecution()`**, causing an error when clicked.
- The six-camera studio and GitHub repository authorization are conceptual labels only.
- `localStorage` holds only the saved business name; no tenant-scoped backend data, provider receipts or durable jobs.

## Reuse without duplication
Carry forward only these conceptual workflows into the existing Bonga modules:
1. Digital Visibility Investigation → verified public business evidence and reproducible scores.
2. Connection Intelligence → official provider authorization, server-side tokens, scope checks and revocation.
3. Branding and Creative Studio → approved Brand DNA and real media outputs.
4. Business Scraper / Business Converter / Closer AI → evidenced business needs and consented CRM activity.
5. Execution Intelligence → approved durable jobs, verifiable artifacts and external action receipts.
6. Analytics → measured outcomes and score history, never fixed prototype numbers.

## CodeRabbit instruction
- Cross-reference **`docs/alignments/27-brand-autopilot-early-html-defect-audit.md`** and **`docs/alignments/26-brand-autopilot-html-execution-audit.md`** rather than opening another implementation workstream.
- Keep a single existing Bonga Brand Autopilot / orchestration implementation.
- Fix unreachable navigation and missing handler only in an approved implementation PR.
- No fake success, fake OAuth, fabricated scores, unapproved publishing or duplicated tenant stores.
- Verify real behavior with provider calls, source provenance, receipts and automated tests.

**Status:** File 28 reviewed and classified as duplicate legacy prototype. This documentation-only alignment does not modify or deploy application code.
