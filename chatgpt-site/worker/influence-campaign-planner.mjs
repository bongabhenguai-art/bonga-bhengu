/**
 * Bonga Bhengu OS influence campaign planner.
 * Creates draft scripts and a platform-specific content plan; does not
 * create accounts, fabricate followers, publish posts or scrape contacts.
 */
const platforms=new Set(['Instagram','Facebook','TikTok','X','LinkedIn','YouTube','Pinterest']);
const safeText=(v,max)=>typeof v==='string'?v.trim().slice(0,max):'';
export function buildInfluenceCampaign(input){
  if(!input||typeof input!=='object')throw new TypeError('Campaign input required');
  const business=safeText(input.businessName,120),audience=safeText(input.audience,180),problem=safeText(input.customerProblem,400),offer=safeText(input.offer,240);
  if(!business||!audience||!problem||!offer)throw new TypeError('Business, audience, problem and offer required');
  const requested=Array.isArray(input.platforms)?input.platforms:[];
  const selected=[...new Set(requested.filter(p=>platforms.has(p)))];
  if(!selected.length)throw new RangeError('Select a supported social platform');
  const hook='Still struggling with '+problem.replace(/[.!?]+$/,'')+'?';
  const script=[hook, business+' helps '+audience+' with '+offer+'.','See how it works, ask questions and choose what fits your needs.'].join(' ');
  const closer='Ask us about '+offer+' and request a clear next step.';
  return {
    brand:business,audience,customerProblem:problem,offer,
    funnel:{fishingInsight:problem,hook,script,loop:'Reply to opted-in enquiries, answer questions, then review engagement and adjust the next approved post.',closer},
    posts:selected.map(platform=>({platform,caption:script+' '+closer,mediaBrief:'Create an authentic demonstration of the offer; use permission-cleared assets.',status:'draft'})),
    socialProfile:{displayName:business,bio:business+' | '+offer,callToAction:closer,status:'draft'},
    avatarDisclosure:'Disclose AI-generated spokespersons or synthetic media where used.',
    approvalRequired:true,publishingStatus:'not_connected',metricsStatus:'not_connected'
  };
}
