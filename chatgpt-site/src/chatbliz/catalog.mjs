/** Chatbliz customer-facing service catalog. Prices are quotes, never automatic charges. */
export const CHATBLIZ_SERVICES=Object.freeze([
 {id:"my-brand",name:"My Brand",summary:"Brand identity, positioning and business storytelling",deliverables:["Brand discovery","Identity direction","Brand guidelines"],agents:["Design Influence","Fishing"]},
 {id:"my-website",name:"My Website",summary:"Websites and business apps with ZUXURU builder integrations",deliverables:["Requirements and sitemap","Responsive website or app plan","Launch readiness review"],agents:["ZUXURU","Fixer"]},
 {id:"my-content",name:"My Content",summary:"Digital Studio, content creation and authorized social publishing",deliverables:["Content brief","Studio production plan","Approved publishing schedule"],agents:["Studio","Design Influence"]},
 {id:"my-business",name:"My Business",summary:"Business visibility, leads, CRM and sales operations",deliverables:["Evidence-backed visibility audit","Sales funnel improvement plan","CRM and appointment workflow"],agents:["Hunter","Fishing","Closer","Jarvis"]}
]);
const clean=(value,max=500)=>String(value??"").trim().slice(0,max);
export function findChatblizService(id){return CHATBLIZ_SERVICES.find(s=>s.id===id)??null;}
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
 return {serviceId:service.id,needs:verifiedNeeds.map(v=>clean(v,180)).filter(Boolean).slice(0,5),suggestedDeliverables:service.deliverables,quoteStatus:"requires-approval",priceZAR,paid:false,warning:"Do not promise results, collect payment or mark an appointment confirmed without verification."};
}
