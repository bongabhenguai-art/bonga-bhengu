import {preparePartnerAction} from '../src/chatbliz/partners.mjs';
import {CHATBLIZ_SERVICES} from '../src/chatbliz/catalog.mjs';
const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
const matchers=[['my-website',/website|web app|build (?:an? )?app/i],['my-content',/podcast|video|studio|livestream|content/i],['my-brand',/brand|visibility|business audit/i],['my-business',/business|sales|crm|lead/i]];
const actions=Object.freeze({
 'my-brand':{title:'Open business visibility workspace',url:'/app.html?module=visibility#visibility'},
 'my-website':{title:'Open website builder',url:'/website-editor.html'},
 'my-content':{title:'Open Digital Studio',url:'/digital-studio.html'},
 'my-business':{title:'Open business dashboard',url:'/app.html?module=overview#overview'}
});
export async function chatblizPlan(request){
 const url=new URL(request.url);
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 if(!request.headers.get('oai-authenticated-user-id'))return json({error:'Sign in to use your private Chatbliz workspace.'},401);
 if(request.headers.get('origin')!==url.origin)return json({error:'Origin not permitted'},403);
 if(Number(request.headers.get('content-length')||0)>6000)return json({error:'Request too large'},413);
 let input;try{const raw=await request.text();if(raw.length>6000)return json({error:'Request too large'},413);input=JSON.parse(raw);}catch{return json({error:'Invalid JSON'},400);}
 if(typeof input?.message!=='string'||!input.message.trim()||input.message.length>3000)return json({error:'Enter a message of up to 3000 characters'},400);
 const plan=preparePartnerAction(input.message);
 const serviceId=matchers.find(([,regex])=>regex.test(plan.message))?.[0]||null;
 const service=CHATBLIZ_SERVICES.find(s=>s.id===serviceId);
 return json({status:'planned',partners:plan.partners,service:service?{id:service.id,name:service.name}:null,
 nextAction:serviceId?actions[serviceId]:null,executed:false,requiresApproval:true,
 message:'Your request has been routed for planning. No customer contact, publication, payment or booking has been performed.'});
}
