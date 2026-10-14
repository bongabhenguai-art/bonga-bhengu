/**
 * Bonga Bhengu OS subscription catalog — server-side policy source.
 * This module defines entitlements; it does NOT activate payments or provision access.
 * Integrate with verified checkout and a transactional usage ledger before production.
 */
export const SUBSCRIPTION_PLANS = Object.freeze({
  profile: { label: 'Profile Builder', regularMonthlyZar: 399, launchMonthlyZar: 299, annualZar: 3990, foundingAnnualZar: 2990, salesPostsPerWeek: 2, studioMinutesPerMonth: 60, maxWebsitePages: 0, maxStoreProducts: 0, webApp: false, features: ['business_profile','brand_basics','whatsapp_cta'] },
  website: { label: 'Website Growth', regularMonthlyZar: 699, launchMonthlyZar: 499, annualZar: 6990, foundingAnnualZar: 4990, salesPostsPerWeek: 4, studioMinutesPerMonth: 60, maxWebsitePages: 5, maxStoreProducts: 0, webApp: false, features: ['business_profile','brand_basics','whatsapp_cta','template_website','website_analytics'] },
  storefront: { label: 'Storefront Growth', regularMonthlyZar: 1199, launchMonthlyZar: 799, annualZar: 11990, foundingAnnualZar: 7990, salesPostsPerWeek: 6, studioMinutesPerMonth: 180, maxWebsitePages: 5, maxStoreProducts: 20, webApp: false, features: ['business_profile','brand_basics','whatsapp_cta','template_website','website_analytics','storefront','order_tracking','lead_tracking'] },
  app: { label: 'Business App Pro', regularMonthlyZar: 3499, launchMonthlyZar: 2599, annualZar: 34990, foundingAnnualZar: 25990, salesPostsPerWeek: 8, studioMinutesPerMonth: 360, maxWebsitePages: 5, maxStoreProducts: 20, webApp: true, features: ['business_profile','brand_basics','whatsapp_cta','template_website','website_analytics','storefront','order_tracking','lead_tracking','template_web_app','priority_support'] }
});
export const ENTITLEMENT_POLICY = Object.freeze({
  timezone: 'Africa/Johannesburg',
  weeklySalesReset: true,
  monthlyStudioReset: true,
  rollover: false,
  transferable: false,
  publicationRequiresApproval: true,
  tokensDeductOnSuccessfulExecution: true,
  refundTechnicalFailuresIdempotently: true,
  studioBillingUnit: 'actual_minutes',
  studio24HourAccessMeans: 'booking_window_only_not_free_hours',
  annualTokensGrantedUpfront: false,
  paymentActivationRequiresVerifiedWebhook: true,
  foundingOfferCapacity: 100,
  foundingOfferEnabled: false, // enable only after terms, deadline, renewal pricing and checkout are configured
  livePaymentsEnabled: false
});
export function getPlan(planId) {
  const plan = SUBSCRIPTION_PLANS[planId];
  if (!plan) throw new RangeError('Unknown subscription plan');
  return structuredClone(plan);
}
export function canUseFeature(planId, feature) {
  return getPlan(planId).features.includes(feature);
}
export function planPriceZar(planId, billing = 'monthly', founding = false) {
  const plan = getPlan(planId);
  if (!['monthly','annual'].includes(billing)) throw new RangeError('Unsupported billing period');
  // Inactive promotions must never change the authoritative quoted price.
  const foundingEligible = founding === true && ENTITLEMENT_POLICY.foundingOfferEnabled === true;
  return billing === 'monthly'
    ? (foundingEligible ? plan.launchMonthlyZar : plan.regularMonthlyZar)
    : (foundingEligible ? plan.foundingAnnualZar : plan.annualZar);
}
