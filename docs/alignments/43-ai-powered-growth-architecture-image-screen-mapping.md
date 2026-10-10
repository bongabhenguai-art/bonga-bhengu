# File 43 — AI-Powered Growth Architecture: 15-Screen Product and Data Flow Alignment

**Source:** `Zuxuru AI-Powered Growth Architecture.png` (1,599,015 bytes). Full infographic visually reviewed. It is a product/technical **reference diagram**, not proof that depicted modules or integrations are installed.

## Eight-step customer journey shown
1. **Enter Business Name** — initiate discovery.
2. **Digital Visibility Investigation** — discover public presence and missing assets.
3. **Public Visibility Score** — initial evidence-backed baseline.
4. **Connect Platforms** — user-authorized linking of owned accounts.
5. **Deeper Investigation** — platform-specific authorized analytics and insights.
6. **AI Recommendations** — prioritized opportunities.
7. **Take Action** — create content, improve and publish.
8. **Rescore & Grow** — measure and track change.

The **public-vs-connected boundary** between steps 3 and 4 is particularly important: public investigation must never claim owner permissions or private platform data.

## Fifteen application screens / areas actually drawn
1. Dashboard — overall/visibility/trust/brand/content/AI-readiness scores, opportunities, activity.
2. Business Profile — identity, location, contact, branding, services, audience.
3. Digital Visibility Investigation — public presence, assets, search footprint, gaps, initial score.
4. Connected Platforms — link social, Google, website and other platforms, permissions and status.
5. AI Business Analysis — strengths, positioning, audience, brand, competition and recommendations.
6. Recommendations — priorities, quick wins, growth opportunities, content ideas and implementation.
7. Zuxuru Studio — create/edit content, images, videos, assets and templates.
8. Content — blog, social posts, website content, email campaigns, calendar, library.
9. Images — AI generation, editing, brand assets, library, sizes and export.
10. Video — phone recording, AI creation, subtitles, video library and export.
11. Publishing — social/website publishing, scheduling, tracking, calendar and platform management.
12. Competitors — analysis, benchmarking, strengths/weaknesses, positioning and opportunity gaps.
13. Analytics — traffic, engagement, audiences, content performance, platform analytics, growth reports.
14. Rescoring — re-investigate, compare, measure impact, history and next steps.
15. Settings — accounts, business, team, integrations, notifications, security and privacy.

**Navigation rail:** Dashboard, Business, Visibility, AI Insights, Recommendations, Studio, Content, Media, Publishing, Competitors, Analytics, Settings.

## Technical architecture depicted
Users ↔ Frontend (responsive UI, state, accessibility) ↔ Backend (APIs, business logic, auth, validation) ↔ Database (business/user/connection/analytics/score history) ↔ AI Intelligence (analysis, scoring, recommendations, image/video intelligence) ↔ External Services (social/Google/LLM/MCP) ↔ Media Processing (image/video, CDN, storage) ↔ Publishing (social, websites, scheduling, reporting).

**Security panel:** separate user data, secure auth, encrypted storage, GDPR readiness. These are **requirements**, not audited security controls.

**Supported integration logos (phase-one aspirations):** Google Services, OpenAI, Claude, Gemini, GitHub, Supabase, Canva, YouTube, Instagram, LinkedIn, TikTok and more. Their presence in the image does **not** verify API access, OAuth, licensing or working accounts.

## Architecture-preserving Bonga mapping
- **Bonga Bhengu App** remains the authoritative app, repository, navigation, design system, authentication, tenant model, subscriptions, administrator override and four products.
- **Digital Visibility** owns public Investigation, verified scoring, competitor and visibility analytics, diagnosis, rescore history.
- **Business Connection Intelligence** owns platform authorization, scope consent, token refresh/revocation, tenant-safe access and connection health.
- **Business Growth Intelligence** owns AI business analysis, opportunities, prioritization, Business Scraper needs discovery, coaching and strategy.
- **Creative Studio** owns image/video/content creation, recording, captions, editing, asset library and production workflows.
- **Website Builder & Hosting** owns website content and deployment; **Digital Banner Builder** owns branded creative/banner outputs.
- **Execution Intelligence** owns approval-gated publishing, campaigns, scheduling, real external action receipts and outcome measurement.
- **AI employees** Hunting, Fishing, Closer, Business Converter, Coach/Mentor, Fixer and others use the shared evidence and permissioned business context, not a second standalone intelligence engine.
- Maintain Bonga four-tier product selection (1/2/3/all 4), mobile accessibility, voice/sign language and country/language/currency controls.

## Key safeguards
- Never present conceptual scores (Trust, Brand, AI Readiness, etc.) without a documented scoring rubric, timestamp, input coverage, source IDs and explicit unknown states.
- Public results are not equivalent to connected/private analytics. Owners must explicitly authorize each platform and action scope.
- “AI image/video creation,” “publishing,” “competitor intelligence” and “analytics” are feature **requirements**, not working integrations until verified in code and provider receipts.
- Avoid duplicate Studio/Media/Content implementations: expose shared services through existing Bonga modules and navigation.
- Respect lawful business-relevant research, platform terms, data minimization and opt-in lead workflows.
- Every external write requires appropriate authorization, idempotency, auditable status and failure recovery.

## CodeRabbit incremental acceptance gates
1. Map each of 15 screens to existing Bonga routes; classify **exists / partial / missing / not appropriate** before changes.
2. Add missing screen capabilities as extensions, not a replacement shell or architecture.
3. Test business-name investigation with real provenance, verified score and clear not-found/unknown states.
4. Test connection wizard consent, revoked/expired tokens and tenant isolation.
5. Test approved image/video jobs, file storage, real publishing receipts and failure reporting.
6. Test before/after scoring with evidence, history and repeatable calculations.
7. Test mobile, keyboard, screen reader, multilingual and administrative override flows.

**Status:** Infographic visually inspected; documentation-only alignment committed. No application code, API integrations, billing or deployment changed.
