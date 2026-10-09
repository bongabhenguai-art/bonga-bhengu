# Bonga Bhengu App — Project File Integration Handoff

Date: 2026-10-09
Status: integration inventory; NOT a completed implementation or deployment.

## Non-negotiable
Preserve existing application architecture, components, routes, tenant isolation and working functionality. Never replace the ChatGPT Work main app with this backend repository. Admin can override AI decisions. Review and test each module before merge.

## Source inventory to inspect
Library /Bonga Bhengu app/Bonga_Bhengu_App_4_Packages.docx
Library /Bonga Bhengu app/Bonga_Bhengu_14_Oct_Work_Handoff.md
Library /Bonga_Bhengu_Fashion_OS.html
Library /Zuxuru_Fashion_Design.docx
Library /Zuxuru — Business Growth OS.txt
Library /Zuxuru_Master_Builder.txt
Library /Zuxuru_Business_Visibility_Station_Builder_Spec.md
Library /Zuxuru_Build_Spec_Files.zip
Library /Zuxuru_Mall_BusinessTree_Fashion_Builder_Packages_Master.docx
Library /zuxuru-growth-engine-mvp.zip
Library /zuxuru-engine.zip
Library /zuxuru-digital-studio-repository.zip
Library /Zuxuru_Storefront.zip
Library /Zuxuru1_real-execution-build.zip
Library /fukulisane-app.zip

These are source references, not files copied into this repository. Obtain and inspect each file before implementing.

## Integration targets
1. AI app builder and technical engineer agents; CodeRabbit review gates.
2. Business Scraper AI for customer needs/problem discovery, not contact harvesting.
3. Business Coach, Mentor, Problem Resolver, Fixer, Listing and Negotiation voice agents.
4. Business Visibility, Connection, Growth and Execution Intelligence.
5. Storefront, Seller and Admin; staged AI generator unlock; wallets and payouts subject to compliance.
6. Fashion Lab, branding, video, podcast, livestream and digital studio.
7. MCP/connectors, OAuth authorization wizard, CRM, lead conversion, analytics.
8. Responsive mobile/tablet/desktop UX and accessibility.
9. Four commercial packages and pricing from authoritative project documents.

## Implementation workflow
- Identify the actual main app repository and inspect its source tree first.
- Compare all Library files with existing architecture and document conflicts.
- Add modules incrementally; do not rebuild or delete existing features.
- Define agent inputs, outputs, permissions, failure modes, tools and handoffs.
- Keep provider secrets out of code and database tenant rows.
- Add tests, security checks and migration plan.
- Run CodeRabbit review and resolve findings before any production merge.
- Deploy only after user approval and passing checks.
