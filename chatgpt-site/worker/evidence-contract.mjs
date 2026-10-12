// Evidence-based recommendations: pure, provider-independent validation.
// No research claim is considered verified merely because a model generated it.
const text = value => typeof value === 'string' ? value.trim() : '';
const validUrl = value => { try { const u = new URL(value); return ['https:','http:'].includes(u.protocol) && !!u.hostname; } catch { return false; } };
export function validateEvidence(item) {
  if (!item || typeof item !== 'object') return {ok:false,errors:['Evidence must be an object']};
  const errors=[];
  if (!text(item.claim)) errors.push('Missing claim');
  if (!text(item.sourceTitle)) errors.push('Missing source title');
  if (!validUrl(item.sourceUrl) && !text(item.documentRef)) errors.push('Missing valid source URL or document reference');
  if (!text(item.publisher)) errors.push('Missing publisher');
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(text(item.observedDate))) errors.push('Missing ISO observation date');
  if (!['fact','estimate','hypothesis','promotional','case-study'].includes(item.kind)) errors.push('Missing evidence kind');
  return {ok:errors.length===0,errors};
}
export function evaluateRecommendation(proposal) {
  const errors=[];
  if (!proposal || typeof proposal !== 'object') return {status:'incomplete',errors:['Recommendation must be an object'],verifiedEvidence:0};
  if (!text(proposal.problem)) errors.push('Missing business problem');
  if (!text(proposal.solution)) errors.push('Missing proposed solution');
  if (!text(proposal.measure)) errors.push('Missing measurable outcome');
  const evidence=Array.isArray(proposal.evidence)?proposal.evidence:[];
  const verified=evidence.filter(item=>validateEvidence(item).ok);
  if (!verified.length) errors.push('No traceable evidence supplied');
  // Syntactic validation alone cannot verify that a source supports a claim.
  return {status:errors.length?'needs-evidence':'sources-require-review',errors,verifiedEvidence:verified.length,requiresHumanApproval:true};
}
