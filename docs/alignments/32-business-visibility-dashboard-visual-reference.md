# File 32 — Business Visibility Dashboard Visual Reference Audit

**Source reviewed:** `Zuxuru Business Visibility Dashboard.png` (visual reference, not executable HTML or application code).

## What is actually visible
The image depicts a full-width dark navy/purple Zuxuru business command-center mockup. It includes:
- Header with search, notifications, owner profile; sidebar Home, Business Profile, Business Builder, Visibility & Score, Platform Connections, Content & Studio, Marketing & Growth, AI Agents, Analytics & Reports, Inbox & Leads, Tasks & Automation, Packages & Offers, Settings.
- Sample business **Sunrise Café & Bistro** with contact/location details and a **Verified** badge, hero photo, and visibility score **72/100**.
- Score breakdown across Google Search **78**, Social Media **68**, Website **62**, Reviews **85**, Directories **70**, Maps & Local **76**, plus other platform indicators. A **+12%** last-30-days trend is shown.
- Seven-step business setup bar, each visually marked **Complete**: Business Details, Location & Contact, Website, Social Media, Visibility Scan, Platform Connection, Build Profile.
- Business Overview, Platform Profiles (Google Business, Facebook, Instagram, YouTube, TikTok, Website), Visibility Breakdown and AI Assistant.
- Growth Station cards (Branding, Marketing, Leads, Close Packages, Delivery, Analytics, Automation, Growth OS), Digital Studio (Create/Record/Edit/Publish; AI media, video, livestream, podcast), Integrations & Connections and Business History & Activity timeline.
- The visible names, scores, connection statuses, timestamps, business facts, metrics, notifications and activity entries are **design sample content**. A PNG cannot prove an API, OAuth connection, real business verification, score algorithm, AI employee, generated media, publishing or historical events.

## Preserve existing Bonga architecture
The current **Bonga Bhengu App** remains the authoritative application. Do not copy the Zuxuru branding, create another dashboard, replace existing routes or billing, or import this screenshot as a functioning application. Use it as a visual hierarchy and interaction reference only.

## Additive UI mapping
| Image element | Existing Bonga capability |
|---|---|
| Business identity, profile and onboarding progress | Tenant-safe business profile, verified evidence, setup wizard |
| Visibility score and platform breakdown | **Digital Visibility** Investigation, sourced and reproducible scoring |
| Platform Profiles and Integrations | Existing Connection Wizard with OAuth, scopes, provider health and revocation |
| Growth Station and AI Assistant | Existing Business Growth Intelligence and approved AI employees |
| Content & Studio / Studio modes | Existing **Creative Studio** real generation, recording, livestream and publishing |
| Business Builder | Existing **Website Builder & Hosting** |
| Promotional creative and campaign assets | Existing **Digital Banner Builder** |
| Leads, Close Packages and Inbox | Business Scraper (customer problems), CRM, Business Converter and Closer AI |
| Activity timeline and reports | Durable tenant-scoped jobs, real provider receipts and measurable outcomes |
| Packages & Offers | Current four product choices and four subscription tiers, without changing pricing |

## Production acceptance rules
1. **No false evidence:** display score, growth and verification only after actual source observations and calculation; otherwise use “Not assessed” or demo labeling.
2. **No fake connections:** “Connected” requires owner authorization, validated scopes and recent provider health; support revoked/degraded states.
3. **No fake activity:** history entries come from actual persisted events with actor, time, tenant and result/receipt.
4. **No misleading setup completion:** seven-step progress derives from verified stored completion criteria, not static green checkmarks.
5. **No fake AI/Studio execution:** media cards and AI actions require working jobs, asset IDs, previews and approval.
6. **Responsive and accessible:** adapt dense multi-column desktop layout to narrow screens; use semantic controls, keyboard focus, voice/screen-reader navigation, legible contrast and localized country/language/currency.
7. **Admin override:** preserve Bonga administrator permissions, audit trail and explicit approvals.
8. **Visual consistency:** borrow layout concepts but apply Bonga's existing design system rather than hardcoding a competing Zuxuru shell.

## CodeRabbit review plan
- First inventory current Bonga dashboard, profile, visibility, integrations, Studio, CRM and admin components; reuse rather than rebuild.
- Convert the screenshot into **small visual/UX requirements** for existing components only.
- Verify the UI against real loading, empty, disconnected, revoked, partial, error and completed states.
- Test mobile and accessibility, tenant isolation, authorization and evidence-backed metrics.
- Do not represent the screenshot as a running feature or deployed app.

**Status:** Visual reference inspected and aligned. Documentation-only GitHub push; PNG is not application source, and no code, deployment, provider connection or business verification has been performed.
