/**
 * Hunter AI — source-grounded business opportunity intelligence.
 * Receives verified public-source records from authorized search/connectors.
 * Does NOT scrape the web or send WhatsApp/email by itself.
 */
const clean=(v,n=500)=>String(v??"").trim().slice(0,n);
const httpUrl=v=>{try{const u=new URL(v);return ["https:","http:"].includes(u.protocol)?u.href:null}catch{return null}};
const weights={missing_website:25,poor_mobile:20,missing_booking:15,missing_contact_cta:15,weak_product_content:15,missing_local_presence:10};
export function profileBusiness({name,industry="",location="",sources=[],observations=[],contacts=[]}={}){
 if(!clean(name))throw new Error("Business name required");
 const evidence=sources.map(s=>({url:httpUrl(s.url),title:clean(s.title,180),observedAt:clean(s.observedAt,40)})).filter(s=>s.url&&s.title);
 const findings=observations.filter(o=>weights[o.type]&&evidence.some(s=>s.url===httpUrl(o.sourceUrl)))
  .map(o=>({type:o.type,sourceUrl:httpUrl(o.sourceUrl),finding:clean(o.finding,350),points:weights[o.type]}));
 const unique=[...new Map(findings.map(f=>[f.type,f])).values()];
 const contactChannels=contacts.filter(c=>["official_website","published_business_email","published_business_phone","published_business_whatsapp"].includes(c.type))
 .filter(c=>evidence.some(s=>s.url===httpUrl(c.sourceUrl)))
 .map(c=>({type:c.type,value:clean(c.value,180),sourceUrl:httpUrl(c.sourceUrl),permissionToMessage:c.permissionToMessage===true}));
 const score=Math.min(100,unique.reduce((a,f)=>a+f.points,0));
 return {name:clean(name,160),industry:clean(industry,120),location:clean(location,120),evidence,findings:unique,contactChannels,
 opportunityScore:score,scoreLabel:score>=60?"High documented improvement opportunity":score>=30?"Moderate documented improvement opportunity":"Limited documented evidence",
 buyerIntent:"unknown",contactPermission:"not established by public listing",scoredAt:new Date().toISOString()};
}
export function matchServices(profile,catalog=[]){
 const matches={missing_website:["website","storefront"],poor_mobile:["website","optimization"],missing_booking:["booking","crm"],missing_contact_cta:["marketing","lead"],weak_product_content:["branding","studio"],missing_local_presence:["seo","visibility"]};
 const needs=new Set(profile.findings.flatMap(f=>matches[f.type]||[]));
 return catalog.filter(p=>p.active===true&&Array.isArray(p.tags)&&p.tags.some(t=>needs.has(t)))
 .map(p=>({id:clean(p.id,80),name:clean(p.name,140),priceZAR:Number.isFinite(p.priceZAR)?p.priceZAR:null,reason:profile.findings.filter(f=>(matches[f.type]||[]).some(t=>p.tags.includes(t))).map(f=>f.finding)})).slice(0,3);
}
export function draftOutreach(profile,offers,{channel="email",sender="Bonga Bhengu OS",serviceUrl="https://bongabhenguos.online",permissionToContact=false}={}){
 if(!["email","whatsapp"].includes(channel))throw new Error("Unsupported channel");
 const link=httpUrl(serviceUrl);if(!link)throw new Error("Valid service link required");
 const first=profile.findings[0];
 const evidenceLine=first?`I noticed a possible improvement area from publicly available information: ${first.finding} (source: ${first.sourceUrl}).`:"I would like to learn more about your business goals.";
 const offerLine=offers.length?`We offer ${offers.map(o=>o.name).join(" and ")} services that may be relevant.`:"We provide business branding, digital growth and sales-support services.";
 const message=`Hello ${profile.name} team, I'm reaching out from ${clean(sender,100)}. ${evidenceLine} ${offerLine} You can see our services at ${link}. Which area of your business would you most like help with? If this isn't relevant, please let me know and I won't follow up.`;
 return {channel,subject:channel==="email"?`Business growth ideas for ${profile.name}`:null,message,sendStatus:"draft_only",permissionToContact:permissionToContact===true,
 warning:"A publicly listed contact is not consent. Verify recipient relevance, applicable direct-marketing rules and channel policies before any individual outreach. No bulk auto-send."};
}
