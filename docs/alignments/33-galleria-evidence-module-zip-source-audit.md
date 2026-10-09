# File 33 — Galleria Evidence & Meeting Module ZIP Source Audit

**Source:** `zuxuru-galleria-evidence-module.zip` (5,482-byte ZIP), materialized and inspected as a ZIP archive, not inferred from its filename.

## Exact archive inventory
- `zuxuru-galleria-module/src/components/zuxuru/GalleriaEvidenceWorkspace.tsx` — React evidence/meeting UI (5,268 bytes).
- `zuxuru-galleria-module/src/lib/zuxuru/galleria-evidence.ts` — TypeScript types, Galleria seed questions and immutable helpers (3,365 bytes).
- `zuxuru-galleria-module/README.md` — integration instructions (1,430 bytes).

**Important:** The README targets the historical `bongabhenguexceed-pixel/zuxuru` repository and Vite/React/Tailwind/Hono/Prisma stack. This is **not** authority to redirect work away from `bongabhenguai-art/bonga-bhengu` or change the current Bonga architecture.

## Implemented code — precise behavior
- `EvidenceStatus` union: `verified`, `observed`, `customer-provided`, `likely`, `contradicted`, `unknown`, `missing`, `stale`, `unverified`.
- `Evidence` records: ID, subject, claim, source, source type (public/customer/connected/meeting), capture time, status, nullable confidence and notes.
- `GalleriaWorkspace`: mall entity, location, evidence, contacts, meeting questions.
- Four useful **open** meeting questions about visitor measurement, marketing outcomes, tenant data and authorized system access.
- `addEvidence()` appends a record; `reconcileClaim()` changes an evidence status; `answerQuestion()` records an answer and associated evidence IDs; `evidenceSummary()` counts statuses.
- `GalleriaEvidenceWorkspace` displays a seed visitor-volume claim marked **unverified**, an evidence register, status totals and questions; saving an answer changes React component state.

## Gaps and risks discovered in actual code
1. **Not persistent:** `useState` holds answers and evidence only for the current component lifetime. Refresh loses meeting answers.
2. **Not generic/multi-tenant:** type `businessName: 'Galleria Mall'` is a literal and UI title/location are hardcoded. Must accept authorized tenant and business IDs; no customer can see another tenant's records.
3. **Seed data is not real evidence:** seed visitor-volume claim uses `new Date().toISOString()` at render initialization, a fabricated capture timestamp for historical discussion. Keep as explicit sample data only; never pass into real metrics.
4. **No proof workflow:** `reconcileClaim()` allows changing a record to `verified` without requiring supporting source IDs, verifier, method, timestamp or authorization.
5. **Question answers are not verified:** `saveAnswer()` passes an empty evidence ID array and `answered` status; distinguish “answer recorded” from “claim verified.”
6. **No access control, audit log or server validation:** helper functions operate on in-memory data and have no RBAC, tenant checks, revision history or provenance enforcement.
7. **No API, AI or connector integration:** no actual Investigation/Business Scraper service, CIA OAuth, Jarvis orchestration or external evidence ingestion.
8. **Limited UI:** evidence cannot be added/edited/reconciled from this component; no document attachments, source URL inspection, evidence filters, explicit consent controls, export or error/loading states.
9. **Confidence/status semantics:** nullable confidence is useful; define evidence-level validation and avoid treating missing/unknown as zero or automatically turning customer-provided statements into verified facts.
10. **Accessibility:** link the textarea label to the field, provide selection semantics for question buttons and visible success/error feedback; test mobile/screen-reader behavior.

## Bonga Bhengu App additive integration contract
- **Host:** existing Bonga Business Visibility Intelligence / Investigation and Business Connection Intelligence, not a standalone Zuxuru mall app.
- **Reuse:** evidence status model, source provenance, meeting question workflow and immutable helper patterns.
- **Generalize:** `entityType` (business/mall/retailer/etc.), tenant ID, business ID, case/investigation ID, authorized user and source references.
- **Evidence chain:** observed source → stored evidence record → confidence/contradiction assessment → verified claim with reviewer/receipt → diagnosis → recommendation → owner-approved execution → measured outcome.
- **Meeting workflow:** answers remain customer-provided/needs-verification until corroborated; record author, consent, timestamp and related evidence.
- **Storage:** use the existing Bonga persistence and authorization layers. Do not introduce Prisma/Hono or a new DB merely because the legacy README names them.
- **Business Scraper:** identify customer needs and business problems from consented evidence; do not scrape private contacts or assert unverified mall performance.
- **Admin override:** allow authorized audited correction, not silent alteration of historical source records.

## CodeRabbit acceptance tests
- Test status transitions (including rejection of unproven `verified`), provenance, contradictions and stale evidence.
- Test tenant isolation, RBAC, duplicate IDs, malformed input, optimistic concurrency and immutable audit history.
- Test question answer persistence and separation between `answered` and `verified`.
- Test empty/loading/error and accessible mobile behavior.
- Verify that no historical Galleria facts, visitor figures, marketing results or system access are inferred without evidence.

**Status:** ZIP bytes and all three files reviewed. This is a source-specific **documentation-only** alignment commit. The React/TypeScript files have **not** been copied into, built, tested or deployed from the existing Bonga application.
