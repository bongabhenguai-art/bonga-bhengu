import {paymentPreference} from './payment-policy.mjs';
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
export const isOperationsAdmin=(request,env)=>!!request.headers.get('oai-authenticated-user-id')&&!!env.JARVIS_OWNER_EMAIL&&request.headers.get('oai-authenticated-user-email')?.toLowerCase()===env.JARVIS_OWNER_EMAIL.toLowerCase();
const policyId=user=>'ai-control:'+user;
async function policy(DB,user){const row=await DB.prepare("SELECT payload FROM business_book WHERE id = ? AND kind = 'ai-control'").bind(policyId(user)).first();return row?JSON.parse(row.payload):{enabled:false,revision:0};}
export async function aiTeamEnabled(env,user){
  if(!env.DB)return false;
  const global=await policy(env.DB,'*');
  if(!global.enabled)return false;
  const row=await env.DB.prepare("SELECT payload FROM business_book WHERE id = ? AND kind = 'ai-control'").bind(policyId(user)).first();
  return !row||JSON.parse(row.payload).enabled===true;
}
export function dailyReport(payload,now=new Date()){
  const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Johannesburg',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  const business=payload?.['zuxuru-fashion-service-v1']||{},work=payload?.['zuxuru-designer-work-v1']||{};
  const orders=Array.isArray(business.orders)?business.orders:[],tasks=Array.isArray(work.tasks)?work.tasks:[];
  const open=orders.filter(o=>!['Delivered','Closed'].includes(o.stage)),pending=tasks.filter(t=>!t.done&&t.status!=='Completed');
  return {date,mode:'Saved-record review',name:String(business.designer?.name||'Seller workspace').slice(0,150),
    orders:{open:open.length,delivered:orders.filter(o=>o.stage==='Delivered').length,overdue:open.filter(o=>/^\d{4}-\d{2}-\d{2}$/.test(o.due||'')&&o.due<date).length},
    tasks:{open:pending.length,overdue:pending.filter(t=>/^\d{4}-\d{2}-\d{2}$/.test(t.due||'')&&t.due<date).length,next:pending.slice(0,8).map(t=>({title:String(t.title||'Task').slice(0,200),due:String(t.due||''),status:String(t.status||'Proposed')}))},
    brief:[{role:'Personal assistant',note:`Review ${pending.length} open tasks and their deadlines.`},{role:'Business coach',note:'Choose one measurable priority from the saved work queue.'},{role:'Business mentor',note:'Review the evidence behind the next growth experiment.'},{role:'Managing director',note:`Review ${open.length} open orders and confirm delivery commitments.`},{role:'CFO',note:'Payment reconciliation, cash balance and profit are unavailable until authorized financial records are connected.'}],
    connections:{bank:'Authorization required',social:'Authorization required',courier:'Manual records; live tracking unavailable'}};
}
export async function sellerOperations(request,env){
  const user=request.headers.get('oai-authenticated-user-id'),url=new URL(request.url),admin=url.pathname==='/api/admin/operations';
  if(!user)return reply({error:'Sign in required'},401);
  if(admin&&!isOperationsAdmin(request,env))return reply({error:'Admin access required'},403);
  if(!env.DB)return reply({error:'Operations storage unavailable'},503);
  if(!['GET','POST'].includes(request.method))return reply({error:'Method not allowed'},405);
  if(request.method==='POST'&&request.headers.get('origin')!==url.origin)return reply({error:'Open your own dashboard to save'},403);
  try{
    if(request.method==='GET'){
      if(admin){
        const rows=await env.DB.prepare('SELECT user_id,payload,updated_at FROM designer_workspaces ORDER BY updated_at DESC LIMIT 100').all();
        const control=await policy(env.DB,'*');
        const sellers=[];for(const row of rows.results||[]){const report=dailyReport(JSON.parse(row.payload));sellers.push({userId:row.user_id,name:report.name,orders:report.orders,tasks:{open:report.tasks.open,overdue:report.tasks.overdue},updatedAt:row.updated_at,aiEnabled:await aiTeamEnabled(env,row.user_id),control:await policy(env.DB,row.user_id)});}
        const audit=await env.DB.prepare("SELECT payload,updated_at FROM business_book WHERE kind = 'ai-audit' ORDER BY updated_at DESC LIMIT 30").all();
        const own=await env.DB.prepare('SELECT payload FROM designer_workspaces WHERE user_id = ?').bind(user).first();
        return reply({report:dailyReport(own?JSON.parse(own.payload):{}),control,sellers,limit:100,audit:(audit.results||[]).map(r=>JSON.parse(r.payload)),secretAccess:false});
      }
      const row=await env.DB.prepare('SELECT payload,updated_at FROM designer_workspaces WHERE user_id = ?').bind(user).first();
      const setup=await env.DB.prepare("SELECT payload FROM business_book WHERE id = ? AND user_id = ? AND kind = 'payment-preference'").bind('payment-preference:'+user,user).first();
      return reply({report:dailyReport(row?JSON.parse(row.payload):{}),updatedAt:row?.updated_at||null,payment:paymentPreference(setup?JSON.parse(setup.payload):null),aiEnabled:await aiTeamEnabled(env,user)});
    }
    const raw=await request.text();if(raw.length>2000)return reply({error:'Request too large'},413);
    let body;try{body=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
    if(admin){
      if(body.action!=='ai-control'||typeof body.enabled!=='boolean'||!Number.isSafeInteger(body.revision)||body.revision<0||typeof body.reason!=='string'||!body.reason.trim()||body.reason.length>300)return reply({error:'Choose activation, revision and an audit reason'},400);
      const target=body.target;if(typeof target!=='string'||!target||target.length>200)return reply({error:'Choose a workspace'},400);
      if(target!=='*'&&!await env.DB.prepare('SELECT user_id FROM designer_workspaces WHERE user_id = ?').bind(target).first())return reply({error:'Workspace not found'},404);
      const current=await policy(env.DB,target);if(current.revision!==body.revision)return reply({error:'Control changed. Refresh before retrying.'},409);
      const now=new Date().toISOString(),token=crypto.randomUUID(),next={enabled:body.enabled,revision:current.revision+1,at:now,reason:body.reason.trim(),token},id=policyId(target);
      const saved=await env.DB.batch([
        env.DB.prepare("INSERT INTO business_book (id,user_id,kind,payload,updated_at) VALUES (?,?,'ai-control',?,?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload,updated_at = excluded.updated_at WHERE json_extract(business_book.payload,'$.revision') = ?").bind(id,user,JSON.stringify(next),now,body.revision),
        env.DB.prepare("INSERT INTO business_book (id,user_id,kind,payload,updated_at) SELECT ?,?,'ai-audit',?,? WHERE EXISTS (SELECT 1 FROM business_book WHERE id = ? AND json_extract(payload,'$.token') = ?)").bind('ai-audit:'+token,user,JSON.stringify({target,actor:user,...next}),now,id,token)
      ]);
      if(!saved[0].meta?.changes)return reply({error:'Control changed. Refresh before retrying.'},409);
      return reply({saved:true,control:next});
    }
    // Only onboarding preferences are accepted; account numbers and secrets must stay with the provider.
    if(Object.keys(body).some(k=>!['bank','provider'].includes(k))||!['Capitec Business','Other South African bank'].includes(body.bank)||!['PayPal','Bank payment provider','Google Pay gateway'].includes(body.provider))return reply({error:'Choose a bank and payment provider; do not send card or bank credentials'},400);
    const data=paymentPreference(body),now=new Date().toISOString();
    await env.DB.prepare("INSERT INTO business_book (id,user_id,kind,payload,updated_at) VALUES (?,?,'payment-preference',?,?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload,updated_at = excluded.updated_at WHERE business_book.user_id = excluded.user_id").bind('payment-preference:'+user,user,JSON.stringify(data),now).run();
    return reply({saved:true,payment:data});
  }catch{return reply({error:'Operations unavailable. Refresh to check saved state before retrying.'},503);}
}
