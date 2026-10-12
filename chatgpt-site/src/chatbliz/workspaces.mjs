/** Chatbliz recovered business operating system: component registry, not execution claims. */
export const CHATBLIZ_WORKSPACES=Object.freeze([
 {id:"discover",name:"Business Discovery",summary:"Public visibility, DeepSearch, competitors and evidence",service:"my-brand",agents:["Hunter","Researcher","Visibility Advisor"],state:"integration-required"},
 {id:"connect",name:"Connection Wizard",summary:"Authorize website, social, search and customer channels",service:"my-brand",agents:["Connection Advisor"],state:"integration-required"},
 {id:"twin",name:"Business Digital Twin",summary:"Shared identity, goals, offers, customers, operations and history",service:"my-business",agents:["Mentor","Operations Advisor"],state:"integration-required"},
 {id:"sales",name:"Sales & CRM",summary:"Lead discovery, Fishing, Closer, follow-up and conversion tracking",service:"my-business",agents:["Hunter","Fishing","Closer","Negotiator"],state:"integration-required"},
 {id:"builder",name:"Website & App Builder",summary:"Build, preview, test and approve publishing",service:"my-website",agents:["AI Builder","Fixer"],state:"existing-workspace",href:"/website-editor.html"},
 {id:"studio",name:"Creative Studio",summary:"Images, video, podcast, livestream and campaign production",service:"my-content",agents:["Studio","Amplifier"],state:"existing-workspace",href:"/digital-studio.html"},
 {id:"execution",name:"Execution & Approvals",summary:"Approve, execute, verify and record business tasks",service:"my-business",agents:["Assistant","Execution Advisor"],state:"integration-required"},
 {id:"performance",name:"Business Performance",summary:"Verified leads, sales, revenue, visibility and learning",service:"my-business",agents:["Coach","Performance Advisor"],state:"integration-required"}
]);
export const CHATBLIZ_WORKFLOW=Object.freeze(["Discover","Prove","Understand","Find","Build","Test","Measure","Learn","Repeat"]);
export function listChatblizWorkspaces(serviceId){return CHATBLIZ_WORKSPACES.filter(w=>!serviceId||w.service===serviceId);}
