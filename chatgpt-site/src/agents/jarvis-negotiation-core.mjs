/**
 * Jarvis live negotiation core — pure, dependency-free business rules.
 * UI, microphone, STT, CRM and provider connections are separate integrations.
 */
const safe = (v, max = 500) => String(v ?? "").trim().slice(0, max);
export function startNegotiation({tenantId, customerId, channel, consentToTranscribe = false} = {}) {
  if (!safe(tenantId) || !safe(customerId)) throw new Error("tenantId and customerId are required");
  if (!["in-person", "phone", "whatsapp", "video", "typed"].includes(channel)) throw new Error("Unsupported meeting channel");
  return {tenantId:safe(tenantId), customerId:safe(customerId), channel, consentToTranscribe:consentToTranscribe === true,
    status:"active", turns:[], confirmedAppointment:null, confirmedPayment:null, createdAt:new Date().toISOString()};
}
export function addCustomerTurn(session, {text, source = "typed"} = {}) {
  if (session.status !== "active") throw new Error("Session is not active");
  if (!["typed", "transcript"].includes(source)) throw new Error("Unsupported source");
  if (source === "transcript" && !session.consentToTranscribe) throw new Error("Transcription consent required");
  const message=safe(text, 4000);
  if (!message) throw new Error("Empty customer turn");
  return {...session,turns:[...session.turns,{role:"customer",source,text:message,at:new Date().toISOString()}]};
}
export function coachNegotiation(session, {offers = [], knownNeeds = [], budget = null} = {}) {
  if (session.status !== "active") throw new Error("Session is not active");
  const latest=session.turns.at(-1)?.text ?? "";
  const selected=offers.filter(o => o && o.active === true && o.tenantId === session.tenantId && Number.isFinite(o.priceZAR) && o.priceZAR >= 0)
    .filter(o => budget == null || o.priceZAR <= budget).slice(0,3);
  const needs=knownNeeds.map(v=>safe(v,120)).filter(Boolean).slice(0,3);
  const discovery=needs.length ? `Which of these is most urgent: ${needs.join(", ")}?` : "What is your biggest business challenge, and what would a successful result look like?";
  const value=selected.length ? `A relevant option is ${safe(selected[0].name,100)} at R${selected[0].priceZAR.toFixed(2)}. May I explain what is included?` : "May I understand your budget and timeline before suggesting a package?";
  const close="Would you prefer a written quote or a follow-up appointment to discuss the next step?";
  return {customerTurn:latest, suggestions:[discovery,value,close], eligibleOffers:selected.map(o=>({id:safe(o.id,100),name:safe(o.name,100),priceZAR:o.priceZAR})),
    warning:"Suggestions only. Confirm facts, terms and customer agreement before sending a quote or booking."};
}
export function recordAppointment(session,{customerAgreed,startsAt,method}={}){
  if (customerAgreed !== true) throw new Error("Customer agreement required");
  if (!startsAt || Number.isNaN(Date.parse(startsAt))) throw new Error("Valid appointment time required");
  if (!["in-person","phone","whatsapp","video"].includes(method)) throw new Error("Invalid method");
  return {...session,confirmedAppointment:{startsAt:new Date(startsAt).toISOString(),method,customerAgreed:true}};
}
export function closeNegotiation(session) { return {...session,status:"closed"}; }
