/**
 * Fishing AI: deterministic evidence-first opportunity qualification.
 * No scraping, sending or contact enrichment happens in this module.
 */
import { getPlan } from './subscription-catalog.mjs';

const validGaps = new Set(['missing_profile','missing_website','weak_call_to_action','missing_checkout','missing_lead_tracking','missing_web_app']);
const weights = Object.freeze({missing_profile:15,missing_website:25,weak_call_to_action:20,missing_checkout:25,missing_lead_tracking:10,missing_web_app:5});
export function qualifyFishingLead(lead) {
  if (!lead || typeof lead !== 'object' || typeof lead.businessName !== 'string' || !lead.businessName.trim()) throw new TypeError('Business name required');
  const evidence = Array.isArray(lead.evidence) ? lead.evidence.filter(item => {
    if (!item || typeof item !== 'object') return false;
    try { const url = new URL(item.url); return ['https:','http:'].includes(url.protocol) && typeof item.observation === 'string' && item.observation.trim() && !Number.isNaN(Date.parse(item.observedAt)); } catch { return false; }
  }) : [];
  const requestedGaps = Array.isArray(lead.gaps) ? lead.gaps : [];
  const gaps = [...new Set(requestedGaps.filter(gap => validGaps.has(gap)))];
  const opportunityScore = evidence.length ? Math.min(100, gaps.reduce((sum,gap)=>sum+weights[gap],0)) : 0;
  const planId = gaps.includes('missing_web_app') ? 'app' : gaps.includes('missing_checkout') || gaps.includes('missing_lead_tracking') ? 'storefront' : gaps.includes('missing_website') ? 'website' : 'profile';
  const plan = getPlan(planId);
  return {
    businessName: lead.businessName.trim(),
    publicBusinessUrl: typeof lead.publicBusinessUrl === 'string' ? lead.publicBusinessUrl : '',
    evidence,
    gaps: evidence.length ? gaps : [],
    opportunityScore,
    recommendedPlanId: planId,
    recommendedPlanLabel: plan.label,
    launchMonthlyZar: plan.launchMonthlyZar,
    outreachPermissionStatus: 'unknown',
    ownerApproved: false,
    pipelineStage: 'discovered',
    needsHumanReview: true
  };
}
