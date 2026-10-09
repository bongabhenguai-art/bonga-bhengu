# File 8 — Fashion Design Vertical aligned to Bonga Bhengu App

**Source:** `Zuxuru_Fashion_Design.docx`, two pages, section 5 “Fashion Design / Fashion Business Vertical.”

## Preserve the existing Bonga Bhengu architecture
Fashion is a **vertical inside** the existing Bonga Bhengu App, not a replacement product, brand migration or second standalone app. Reuse `creative-studio/`, `website-builder/`, the existing business intelligence layer and shared customer/admin, agent and subscription boundaries.

## Feature-to-module contract
| Fashion source area | Additive module | Inputs | Outputs |
|---|---|---|---|
| Designer / founder profile | Business identity and fashion profile | Designer biography, brand identity, philosophy, source-backed awards and presentations | Editable profile with provenance |
| Collections / lookbooks | Fashion catalog + website-builder | Collection, season, garments, editorial assets, stories | Collection pages, lookbooks, launch briefs |
| Product presentation | Catalog/storefront integration | Materials, construction, size/variant, availability, pricing, product media | Structured product records and approved listings |
| Custom / made-to-order | Enquiry and CRM | Customer brief, specifications, measurements if voluntarily provided, delivery needs | Private quote request, status and follow-up |
| Corporate and wholesale | B2B CRM | Buyer/company brief, quantities, lead times and requirements | Enquiry, line sheet, quote and tracked outcome |
| Studio | Existing `creative-studio/` | Phone capture, runway video, photos, design assets | Edited and versioned product/editorial media |
| WhatsApp and other channels | Authorized connection/execution boundary | Approved message, recipient, consent and channel | Real provider receipt or explicit unavailable status |
| Website and growth | Existing `website-builder/` and business-system | Verified designer data, approved catalog and offers | Portfolio, enquiry/booking pages, campaign actions and measurement |

## Fashion commercial workflow
DESIGN IDEA / COLLECTION → SOURCE-ATTRIBUTED STORY → SHOOT OR PHONE CAPTURE → CREATIVE STUDIO → VERSIONED MEDIA → CHANNEL VARIANTS → OWNER APPROVAL → VERIFIED PUBLISH → ENQUIRY → CLOSER/SALES WORKFLOW → MEASURED RESULT → NEXT CAMPAIGN.

## Data model additions (only where not already represented)
- DesignerProfile, Brand, Collection, Garment, Material, Variant, Asset, Collaborator, PortfolioEvidence, BuyerEnquiry, CustomBrief, WholesaleEnquiry and Campaign.
- Every private record tenant-scoped; collection and product publication controlled by permissions.
- Preserve existing IDs and relationships; use adapters rather than duplicating product or asset tables.
- Awards, runway experience, press and editorial coverage must be owner-entered or linked to real evidence, not automatically treated as verified.

## AI employee collaboration
- Branding agent drafts positioning and product narratives.
- Fashion/Design agent assists with garment, fabric and collection ideas.
- Studio agents prepare media and channel-specific variants.
- Hunting/Fishing/Closer agents support relevant audience research, offers and approved follow-ups.
- Execution engine handles actual publishing; no direct agent access to customer accounts.

## Acceptance criteria for CodeRabbit
1. Existing Studio, Website Builder and app routes remain intact.
2. Fashion profile and collection CRUD persist with ownership checks.
3. Assets maintain versions and explicit approval states.
4. Product variants and stock/availability are not invented.
5. B2B and custom enquiries remain private and traceable.
6. Social/WhatsApp sending only via authorized verified connectors.
7. Mobile fashion portfolio and product pages are responsive and accessible.
8. No claimed sales, bookings, press, awards or provider success without proof.

**Status:** File 8 aligned as an implementation specification. This commit does not assert that fashion catalog, studio integrations or checkout have been implemented.
