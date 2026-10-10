# File 10 — Business Visibility Station Builder Specification

**Source:** `Zuxuru_Business_Visibility_Station_Builder_Spec.md` (Library). Companion `Zuxuru_Business_Visibility_Station_Builder.html` is described by the source as a localStorage-based prototype; its behavior and security must be inspected before any reuse.

## Architecture preservation
Bonga Bhengu App remains the main customer-facing platform. This is an **additive Business Visibility Station workspace** using the existing business-system, website-builder, creative-studio, subscription and admin boundaries. Do not replace app navigation, authentication, styling, or backend with the Zuxuru prototype. The source's purple/pink theme is historical design guidance, **not** authorization to override Bonga's established visual identity.

## Onboarding contract
Set up your business → enter name and optional location → public DeepSearch → disambiguate candidate identities → owner reviews and confirms profile → sign up/login through existing auth → persist tenant-scoped business → open Visibility Station.

Do not automatically claim public listings or infer that the person entering a name owns the business. Registration/verification fields must distinguish user claim from verified records.

## Business Profile / Brain
Persist existing or newly normalized: business/legal name, owner/founder (authorized), industry, history, location, contact, site, social profiles, products/services, review/listing evidence, score snapshots, gaps, opportunities, connections, content assets, lead and execution history. Preserve provenance, timestamps, verification state and tenant ownership.

## Evidence disposition — nothing goes to waste
Each discovered observation is classified as one or more of:
- owner-accepted profile candidate;
- verified/unverified evidence;
- possible platform profile;
- not-found/unknown observation (not an assertion that the asset does not exist);
- authorized connection task;
- evidence-backed visibility gap;
- prioritized opportunity;
- immutable history event.

Identity resolution and verification precede score calculations. Never treat unknown or unavailable as zero.

## Workspace destinations
| Visibility Station section | Existing Bonga destination |
|---|---|
| Business Profile, Builder | Business identity / `website-builder/` |
| Visibility & Score, Platform Profiles | Business-system evidence and intelligence |
| Connections / CIA | Shared authorization/connector boundary |
| Digital Studio | Existing `creative-studio/` |
| Marketing & Growth, Leads / Inbox | Existing sales and growth agents |
| AI Autopilot | Admin-approved policy and execution gate |
| Analytics, History | Shared measurement, audit and timeline |

## Execution loop
Evidence → verified platform profile → owner authorization (official OAuth or provider mechanism) → connected analysis → opportunity → hook → personalized offer → qualified lead → approved close package → execution receipt → measured result → next opportunity.

Studio may support image/video generation, phone capture, livestream, podcast, audio, branding and publishing **only when the relevant real capabilities exist and are authorized**. Do not label a prototype action as live execution.

## Data and UX safeguards
- Existing identity, tenant isolation and backend persistence take priority over prototype `localStorage`.
- Public evidence and private connected records must have separate scopes.
- Mobile-responsive navigation and accessible controls; no forced redesign.
- History records should show actual events and timestamps.
- External writes, social posts and messages require appropriate permissions, approval and auditable receipts.

## CodeRabbit acceptance
1. Existing app routes and four products unaffected.
2. Business onboarding disambiguates identical names and does not auto-claim profiles.
3. Refresh/logout/login preserves data server-side and respects tenant access.
4. Platform connection state reflects real provider authorization and revocation.
5. Score provenance and missing-data handling are testable.
6. Visibility Station navigation is responsive and keyboard accessible.
7. No seeded sample business or localStorage mock is passed off as a real connected customer.

**Status:** File 10 specification aligned to Bonga architecture and committed as documentation. Companion HTML and actual feature code still require separate inspection/integration and tests.
