# Bonga Bhengu App — original-site integration handoff

## Target and preservation
Original website: https://bonga-bhengu.donlegendwear.chatgpt.site
Original Sites project ID: appgprj_6ac5c90ea5188191b958757daafba005

**Do not rebuild the website.** Preserve its original fashion designer/AI strategist brand story, portfolio, services, contact/project brief, navigation and responsive styling.

## Work execution sequence
1. Open the original Sites project using authorized Work browser/editor access. Inspect editable source, routes, styles, dependencies, storage and deployment.
2. Back up the entire original editable project and record its version. Stop if editable source or backup is unavailable.
3. Read the Bonga Bhengu Library folder and other Bonga-named Library assets; compare them to `project-sources/BONGA_BHENGU_PROJECT_MANIFEST.md`. Historical Zuxuru archives are reference candidates, not automatic merge targets.
4. Identify insertion points for **new product/customer modules** without modifying original sections.
5. Connect existing repository modules: `subscriptions/`, `website-builder/`, `creative-studio/`. Implement verified authentication and tenant membership, payment-provider webhook validation, monthly billing-cycle derivation, customer permissions and usage ledger integration before granting paid access.
6. Add a customer dashboard with package selection, product access, Business Master File, service usage, jobs, approvals and connections. Add a separate admin control surface with audited overrides.
7. Connect Digital Visibility evidence gathering, Creative Studio, Website Builder & Hosting and Digital Banner to the same trusted server-side tenant context. No fabricated results or pretend connections.
8. Keep external account authorizations explicit. Protect secrets server-side. Verify responsive behavior, keyboard access, customer isolation, payment states and error handling.
9. Preview and test. Ask the owner before publishing the original site.

## Current subscriptions
R299 choose 1, R499 choose 2, R699 choose 3, R1,000 all 4, monthly. Product catalog in `subscriptions/catalog.py` is authoritative. Quotas in `subscriptions/limits.py` are proposed and require owner approval.

## Definition of done
Provide actual original-source backup/version, changed file list, GitHub commits, passing test output, verified app preview, connected provider status, explicit remaining blockers, and confirmation of owner-approved live deployment. Do not confuse a GitHub commit with publication.
