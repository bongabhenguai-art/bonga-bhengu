/** Chatbliz DeepSearch intake and evidence contract. No search is claimed until a provider returns proof. */
export const DEEPSEARCH_INPUTS=Object.freeze(['description','name','phone','domain','socialUrl']);
export const DEEPSEARCH_SURFACES=Object.freeze(['web-search','search-engines','websites','maps','social','directories','images-video','reviews']);
export const DEEPSEARCH_STATES=Object.freeze(['VERIFIED_FOUND','LIKELY_FOUND','NOT_FOUND','UNKNOWN','NOT_ASSESSED']);
const clean=(value,max=500)=>String(value??'').trim().slice(0,max);
export function prepareDeepSearch(input={}){
 const description=clean(input.description,1500),name=clean(input.name,180),phone=clean(input.phone,40),domain=clean(input.domain,220),socialUrl=clean(input.socialUrl,350),location=clean(input.location,180);
 if(![description,name,phone,domain,socialUrl].some(Boolean))throw Error('Describe the business or provide a name, phone, domain or social URL.');
 if(domain&&!/^(?:https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s]*)?$/i.test(domain))throw Error('Enter a valid domain or website URL.');
 if(socialUrl&&!/^https:\/\/[^\s/]+\.[^\s/]+\//i.test(socialUrl))throw Error('Enter a full HTTPS social profile URL.');
 return {input:{description,name,phone,domain,socialUrl,location},status:'awaiting-search-provider',searched:false,findings:[],surfaces:DEEPSEARCH_SURFACES.map(surface=>({surface,status:'NOT_ASSESSED',evidence:[]})),requiresOwnerAuthorizationForPrivateData:true};
}
export function evidenceFinding({surface,url,claim,checkedAt,confidence=0,status='UNKNOWN'}={}){
 if(!DEEPSEARCH_SURFACES.includes(surface))throw Error('Unknown evidence surface');
 if(!DEEPSEARCH_STATES.includes(status))throw Error('Unknown evidence status');
 if(!/^https:\/\//.test(String(url||'')))throw Error('Evidence requires an HTTPS source URL');
 if(!Number.isFinite(confidence)||confidence<0||confidence>1)throw Error('Confidence must be between 0 and 1');
 if(!/^\d{4}-\d{2}-\d{2}/.test(String(checkedAt||'')))throw Error('Evidence requires a checked date');
 return {surface,url,claim:clean(claim,600),checkedAt,confidence,status,sourceType:'public'};
}

export function buildDeepSearchReport(intake, findings = []) {
  if (!intake || !Array.isArray(intake.surfaces)) throw new Error("Invalid search intake");
  if (!Array.isArray(findings) || findings.length > 100) throw new Error("Invalid findings");
  const evidence = findings.map(evidenceFinding);
  const surfaces = DEEPSEARCH_SURFACES.map(surface => {
    const items = evidence.filter(item => item.surface === surface);
    const verified = items.some(item => item.status === "VERIFIED_FOUND");
    const likely = items.some(item => item.status === "LIKELY_FOUND");
    return {surface, status: verified ? "VERIFIED_FOUND" : likely ? "LIKELY_FOUND" : items.length ? "UNKNOWN" : "NOT_ASSESSED", evidence: items};
  });
  return {
    input: intake.input,
    searched: false,
    status: evidence.length ? "evidence-supplied" : "not-assessed",
    surfaces,
    findings: evidence,
    visibilityScore: null,
    report: {
      visible: evidence.filter(item => item.status === "VERIFIED_FOUND"),
      notVisible: [],
      unknown: evidence.filter(item => item.status === "UNKNOWN"),
      notAssessed: surfaces.filter(item => item.status === "NOT_ASSESSED").map(item => item.surface),
      competitors: [],
      opportunities: [],
      recommendedActions: []
    },
    note: "Evidence supplied to this function has not been independently searched or verified. Missing evidence does not mean missing online presence."
  };
}
