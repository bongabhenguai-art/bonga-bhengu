# Project source reconciliation — 2026-10-10

## Scope
Existing application: Bonga Bhengu App. GitHub repository: bongabhenguai-art/bonga-bhengu. This is an additive audit branch, not a new app or a production deployment.

## Verified repository snapshot
- Base tree: a2ed023991ec54ef910c8e4f23770a36a412d22a
- 61 tracked files (excluding directories).
- Existing modules: creative-studio, design-system, mobile, platform, subscriptions, website-builder, integrations, docs, project-sources.
- Existing tests: creative-studio and subscription and website-builder unit tests; passing status not established by this inventory.

## Source reconciliation
- User-reported project total: 99 files. This count has not been independently established from a complete project-file listing.
- ChatGPT Project attachment inventory: not available in current conversation file search.
- GitHub tracked files: 61; do not assume 38 missing files, since the two inventories may overlap or include different file types.
- Library sources include Bonga_Bhengu_Fashion_OS.html and Zuxuru_Master_Builder.txt; do not merge unreviewed source into production.
- Original ChatGPT Sites editable source has not been verified as connected to GitHub.

## Required acceptance checks
1. Obtain a full Project file listing, names, hashes, and provenance.
2. Compare each file to GitHub and classify as implemented, documentation, duplicate, missing, or incompatible.
3. Preserve original site design and approved four-product subscription catalog.
4. Add authenticated tenant ownership and persistent shared Business Master File.
5. Verify billing, OAuth authorization, consent gates, and provider adapters before enabling live actions.
6. Run all unit/integration tests and security checks; collect CI evidence.
7. Request CodeRabbit review where installed and record review status, not assumed approval.
8. Merge verified code only; publish to existing site only after verified source link, backup, staging, and approval.

## Status
Inventory completed for GitHub tree only. No assertion that all 99 project files are coded or reviewed. No deployment performed.
