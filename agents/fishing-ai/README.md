# Fishing AI — customer opportunity search and sales handoff

Existing Bonga Bhengu OS module. Do not create a second app.

## Mission
Discover relevant public businesses with good products but measurable visibility or conversion gaps. Focus initially on fashion designers, clothing makers, small retailers, salons, spaza shops and other small businesses. Do not infer that a business is struggling financially from its social activity.

## Pipeline
1. **Discover:** search public business directories, indexed websites and official APIs where permitted. Follow robots, terms, rate limits and privacy requirements. No login bypass, private contact harvesting or mass scraping.
2. **Evidence:** record business name, sector, public business URL, observation, observation date, confidence and what is unknown. Detect missing website, unclear offer, weak CTA, absent enquiry/checkout path and inconsistent branding.
3. **Score:** visibility gap (0-25), conversion gap (0-25), product/offer fit (0-20), reachable public business channel (0-10), evidence quality (0-20). Scores measure *potential service fit*, not buying intent.
4. **Match:** Profile Builder R299 launch / R399 regular, Website Growth R499 / R699, Storefront Growth R799 / R1199, Business App Pro R2599 / R3499 monthly. Respect restricted entitlements from worker/subscription-catalog.mjs.
5. **Handoff:** send evidence-backed lead brief to Hunter, Branding, Marketing and Closer agents. Draft one relevant, helpful message and suggested appointment, but require owner review, appropriate lawful contact basis and opt-out handling before sending.
6. **Learn:** measure sourced leads, consented conversations, appointments, proposals, paid conversions, CAC and churn. Fixer reviews weak funnel stages; no guaranteed sales or invented results.

## Lead schema
```json
{
  "businessName": "",
  "industry": "",
  "publicBusinessUrl": "",
  "evidence": [{"url":"","observedAt":"","observation":"","confidence":"low|medium|high"}],
  "opportunityScore": 0,
  "missingInformation": [],
  "recommendedPlanId": "profile",
  "reason": "",
  "publicContactChannel": "",
  "outreachPermissionStatus": "unknown",
  "draftMessage": "",
  "ownerApproved": false,
  "pipelineStage": "discovered"
}
```

## Safety and production gates
Do not claim searches are running continuously without a scheduler. Never send messages or schedule customer meetings without the requisite authorization and integration. Deduplicate businesses, enforce per-source limits and maintain audit logs. Search and qualification are separate from billable customer sales-post task allowances; any executed customer campaign must check server-side subscription entitlements. Customer records require access control, retention limits and lawful processing under POPIA.
