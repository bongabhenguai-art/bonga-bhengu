/** Chatbliz: Your Business Partner in Your Hands. Role selection does not imply tool execution. */
export const CHATBLIZ_TAGLINE="Your Business Partner in Your Hands";
export const CHATBLIZ_PARTNERS=Object.freeze([
 {id:"mentor",name:"AI Mentor",purpose:"Teach business skills and guide long-term development",examples:["teach me branding","help me learn business"]},
 {id:"coach",name:"AI Business Coach",purpose:"Set goals, diagnose gaps and track execution",examples:["coach me","improve my sales"]},
 {id:"assistant",name:"AI Assistant",purpose:"Organize work, prepare drafts and coordinate approved tasks",examples:["schedule a meeting","draft a message"]},
 {id:"advisor",name:"AI Advisor",purpose:"Evaluate options, risks, competitors and pricing with evidence",examples:["advise me","compare competitors"]},
 {id:"negotiator",name:"AI Negotiator",purpose:"Prepare and coach customer negotiations without unauthorized commitments",examples:["help me negotiate","prepare an offer"]}
]);
const rules=[
 {id:"negotiator",match:/negotiat|deal|close (?:a |the )?sale|counteroffer/i},
 {id:"mentor",match:/mentor|teach|learn|lesson|train me/i},
 {id:"coach",match:/coach|goal|performance|improve (?:my )?sales|accountab/i},
 {id:"assistant",match:/assist|schedule|appointment|remind|draft|organize/i},
 {id:"advisor",match:/advi[sc]|compare|risk|competitor|pricing|decision/i}
];
export function routeChatblizPartners(message){
 const text=String(message??"").trim().slice(0,4000);
 if(!text)return [];
 return rules.filter(rule=>rule.match.test(text)).map(rule=>CHATBLIZ_PARTNERS.find(p=>p.id===rule.id));
}
export function preparePartnerAction(message){
 const partners=routeChatblizPartners(message);
 return {message:String(message??"").trim().slice(0,4000),partners:partners.map(p=>p.id),
  state:"planning",executed:false,externalActionsRequireApproval:true,
  note:"Routing identifies the appropriate AI partners; it does not execute tools, book appointments, contact customers or verify results."};
}
