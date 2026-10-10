# Bonga Bhengu App — Source Alignment Audit (2026-10-10)

## Authority and deployment boundary
- **Existing ChatGPT Sites project**: https://bonga-bhengu.donlegendwear.chatgpt.site ; project ID appgprj_6ac5c90ea5188191b958757daafba005 (from owner handoff).
- **GitHub staging**: https://github.com/bongabhenguai-art/bonga-bhengu
- These have NOT been verified as linked. No production site edit or deployment is claimed.
- Preserve the live website's routes, layout, visual identity, components and data until its actual source has been inspected and backed up.

## Inspected Bonga Bhengu Library folder
| File | Finding | Disposition |
|---|---|---|
| Bonga_Bhengu_14_Oct_Work_Handoff.md | Authoritative integration discipline: inspect live site, inventory, backup, additive changes, test and verify | REFERENCE as handoff |
| Bonga_Bhengu_App_4_Packages.docx | Historical proposed once-off Starter/Grow/Pro/Premium pricing (R200/R500/R1000/R2000), explicitly unconfirmed | ARCHIVE/reference only; do not override confirmed subscriptions |

## Additional relevant Library artifact (outside folder)
- Bonga_Bhengu_Fashion_OS.html: standalone three-tier HTML with Digital Visibility, Creative Studio and Content Automation; does not establish deployed website source. REFERENCE ONLY; do not replace original site.
- Bonga Bhengu — Fashion & AI.txt: candidate historical saved site content; not verified as live source.
- Zuxuru assets and repos: separate project; review individually before reusing, no blanket merges.

## Confirmed current commercial model
Four separately selectable products:
1. Website Builder & Hosting
2. Digital Visibility
3. Digital Creative Studio
4. Digital Banner

Monthly packages: choose one R299, choose two R499, choose three R699, all four R1000.
Draft usage limits are **not approved** and must remain configurable/unpublished.

## GitHub module-to-product map (verified paths)
| GitHub path | Purpose | Alignment | Production status |
|---|---|---|---|
| subscriptions/catalog.py | Four products, package selection, prices | ALIGNED | No billing |
| subscriptions/access.py | Pure entitlement decisions | ALIGNED | Not wired to authenticated accounts |
| subscriptions/limits.py | Proposed quotas | NEEDS OWNER APPROVAL | Not enforced |
| subscriptions/integrations.py | Connection requirements | PARTIAL | Registry only |
| website-builder/business_master.py | Shared business profile | PARTIAL | SQLite prototype, no verified tenant auth |
| website-builder/site_pipeline.py | Static website generator | PARTIAL | Not deployed |
| creative-studio/app.py | Shared API, banner prototype | PARTIAL | Unauthenticated; localhost development only |
| creative-studio/animation.py | HTML animation | PARTIAL | Not connected to live UI |
| creative-studio/connections.py | Provider catalog | PARTIAL | No OAuth callback/token vault |
| creative-studio/worker_router.py | Local/cloud routing decisions | PARTIAL | Does not execute external engines |
| docker-compose.yml | Local container setup | PARTIAL | Not verified running |
| .github/workflows/studio-check.yml | Syntax/unit checks | PARTIAL | Check workflow runs before claiming pass |

## Critical alignment gaps
1. Original live site source and route/component inventory unavailable; no verified merge or publish.
2. Four subscription products vs old three-tier standalone Fashion OS HTML: keep three-tier artifact as reference only.
3. Legacy once-off sales packages vs current four monthly product subscriptions: do not overwrite confirmed monthly pricing.
4. Backend tenant_id alone is not authentication; account membership, RLS, secure secrets and payment verification missing.
5. No live provider authorization, publishing, hosting, video generation or AI orchestration.
6. Creative Studio and Website Builder currently have separate SQLite storage and are not wired to one Business Master File.
7. Usage limits remain proposed; no atomic accounting or billing-cycle reset.
8. External third-party repos are listed as candidates, not installed or running.

## Safe integration sequence
1. In ChatGPT Work, inspect existing Sites project source and save versioned backup.
2. Inventory all live routes/components/assets and compare against this staging repo.
3. Build shared authenticated tenant + Business Master File service; migrate prototype data safely.
4. Integrate four-product entitlements, verified payments and quota accounting.
5. Add OAuth PKCE + secret vault + approved external connectors.
6. Integrate creative, visibility, banner and hosting adapters without changing existing UI.
7. Run tests, staging preview, human review, then publish to original project only with approval.
8. Verify deployed URLs and working functions; preserve rollback path.

## Status
This audit is a GitHub staging artifact, not proof of live application integration. No external account credentials or customer data were transferred.
