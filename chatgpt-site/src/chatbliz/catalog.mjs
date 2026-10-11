/** Chatbliz four mini-platforms. Catalog prices in ZAR; billing requires verified integration. */
export const CHATBLIZ_SHARED_ENGINES=Object.freeze({
 visibility:"business-visibility-intelligence",
 connection:"business-connection-intelligence",
 growth:"business-growth-intelligence",
 execution:"execution-intelligence",
 builder:"shared-ai-website-app-builder",
 studio:"bonga-bhengu-digital-studio",
 business:"zuxuru-business-workspace"
});
export const CHATBLIZ_SERVICES=Object.freeze([
 {id:"my-brand",name:"My Brand",priceZAR:299,currency:"ZAR",billingPeriod:"to-confirm",
  summary:"FBI/CIA business discovery, connection and growth visibility intelligence",
  engines:["visibility","connection","growth","execution"],
  deliverables:["Evidence-based business visibility audit","Authorized account connections","Brand and visibility growth action plan"],
  agents:["Hunter","Fishing","Design Influence"]},
 {id:"my-website",name:"My Website",priceZAR:499,currency:"ZAR",billingPeriod:"to-confirm",
  summary:"AI website and app builder using authorized ChatGPT, Claude Code and repository workflows",
  engines:["builder"],deliverables:["Website or app requirements","AI-assisted build and repository workflow","Build and launch verification"],
  agents:["AI Builder","Fixer"]},
 {id:"my-content",name:"My Content",priceZAR:600,currency:"ZAR",billingPeriod:"to-confirm",
  summary:"Shared Digital Studio from Bonga Bhengu OS for video, podcast, livestream and content",
  engines:["studio"],deliverables:["Studio content brief","Recording or production workflow","Approved content publishing plan"],
  agents:["Studio","Design Influence"]},
 {id:"my-business",name:"My Business",priceZAR:2000,currency:"ZAR",billingPeriod:"to-confirm",
  summary:"Rebranded ZUXURU business platform with Brand, Website and Studio shared capabilities",
  engines:["business","visibility","connection","growth","execution","builder","studio"],
  includes:["my-brand","my-website","my-content"],
  deliverables:["Business workspace and growth intelligence","Shared brand and website tools","Shared Digital Studio and sales operations"],
  agents:["Hunter","Fishing","Closer","Jarvis","Fixer","Studio"]}
]);
const clean=(value,max=500)=>String(value??"").trim().slice(0,max);
export function findChatblizService(id){return CHATBLIZ_SERVICES.find(s=>s.id===id)??null;}
export function resolveChatblizEngines(serviceId){
 const service=findChatblizService(serviceId);
 if(!service)throw new Error("Unknown service");
 return service.engines.map(id=>({id,engine:CHATBLIZ_SHARED_ENGINES[id]}));
}
export function prepareChatblizEnquiry(input={}){
 const service=findChatblizService(input.serviceId);
 if(!service)throw new Error("Select a Chatbliz service");
 const businessName=clean(input.businessName,120);
 const need=clean(input.need,1200);
 if(!businessName||!need)throw new Error("Business name and need are required");
 const channel=clean(input.channel,30);
 if(!["email","whatsapp","phone","video","in-person"].includes(channel))throw new Error("Choose a supported contact channel");
 const consent=input.contactConsent===true;
 return {serviceId:service.id,businessName,need,channel,contactConsent:consent,contact:consent?clean(input.contact,180):"",status:"draft",customerAgreedToAppointment:false,appointment:null,paymentStatus:"unverified",quotedPriceZAR:null,
  guidance:consent?"Request customer approval and check availability before any booking.":"No outreach allowed without contact consent."};
}
export function evaluateChatblizOffer({serviceId,verifiedNeeds=[],priceZAR=null}={}){
 const service=findChatblizService(serviceId);if(!service)throw new Error("Unknown service");
 if(priceZAR!==null&&(!Number.isFinite(priceZAR)||priceZAR<0))throw new Error("Invalid quote price");
 return {serviceId:service.id,catalogPriceZAR:service.priceZAR,billingPeriod:service.billingPeriod,
  needs:verifiedNeeds.map(v=>clean(v,180)).filter(Boolean).slice(0,5),suggestedDeliverables:service.deliverables,
  quoteStatus:"requires-approval",priceZAR,paid:false,warning:"Do not promise results, collect payment or mark an appointment confirmed without verification."};
}
