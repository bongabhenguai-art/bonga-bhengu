# File 30 — Original Brand Autopilot HTML Baseline

**Source reviewed:** `index(1).html`, 55-line self-contained HTML/CSS/JavaScript prototype titled *Zuxuru — Brand Autopilot*. Earlier than files 29, 28, 27 and 26.

## Version-specific findings
This is the **earliest Brand Autopilot baseline** in the reviewed sequence:
- Sidebar has eight views: Dashboard, BFI Public Scanner, CIA Connected Intelligence, Brand Continuity, Content Studio, Lead Closer AI, Autopilot and Reports.
- **No Global Visibility Network view, provider platform arrays or global scan functions**; these appear in the subsequent `index(2).html` baseline.
- **No Execution view, GitHub connection or execution queue**; these are introduced conceptually in later versions.
- No backend API calls, external provider integration, real camera, publishing worker or tenant auth.

## Verified local behaviors
1. `saveSetup()` stores only the typed business name as `zuxuruBusiness` in browser localStorage; the other setup fields are not saved. It schedules `runScan()` after 600 ms.
2. `runScan()` hardcodes **82/100**, then displays a success toast; no real public investigation occurs.
3. `connectSource()` only shows “Authorization started”; there is no OAuth redirect or verified connection.
4. `generateCampaign()` appends ten HTML asset cards and says they were generated; no real files or AI service requests are created.
5. `openPackage()` displays fixed content and says the package was sent to Closer AI, but invokes no agent or CRM.
6. Brand DNA save, report generation and “Build with Autopilot” show toasts only.
7. Autopilot switches toggle CSS classes only; they do not change durable policy or background jobs.
8. Six-camera Studio labels are conceptual, not camera preview or recording.
9. Dashboard values (82, +14, 94%, 27 leads, 18 actions, 10–36% sales growth) and report scores are sample data, not evidence.
10. Mobile sidebar shrinks text to first-letter symbols; accessible navigation, keyboard controls and meaningful focus state need improvement.

## Preserve the existing Bonga Bhengu App
The master platform retains its current application architecture, auth, tenant isolation, billing, administrator override, four product families and working modules. **Do not install this HTML as another dashboard or change Bonga branding to Zuxuru.**

| Original prototype | Bonga capability |
|---|---|
| BFI Public Scanner | Digital Visibility / Business Investigation, verified public sources and reproducible score |
| CIA Connected Intelligence | Authorized Connection Wizard with official OAuth and connector health |
| Brand Continuity / Brand DNA | Branding Agent and shared versioned brand record |
| Content Studio / six-camera concept | Existing Creative Studio with actual media generation and capture |
| Lead Closer AI | Existing Business Scraper, Business Converter, CRM and Closer agents |
| Autopilot | Existing approval-gated orchestration and verified execution receipts |
| Reports | Evidence-backed analytics and before/after measurements |

## Deduplication instructions for CodeRabbit
- Reference `docs/alignments/26-brand-autopilot-html-execution-audit.md` through `29-brand-autopilot-pre-execution-html-baseline.md`.
- Treat files 26–30 as **one historical prototype lineage**, not five separate modules or five builds.
- Do not claim live provider access or completed execution based on a UI toast, timer, placeholder score or synthetic asset card.
- Any future implementation must be an additive change to existing Bonga code with tenant-scoped storage, consent, secure OAuth, job receipts and accessible mobile UI.
- Do not override existing subscription pricing or duplicate existing Creative Studio/Closer/Autopilot modules.

**Status:** Reviewed and aligned as original prototype baseline; documentation-only GitHub commit. No application code, CodeRabbit approval or deployment changed.
