/* Bonga Bhengu Business OS — approval-gated, tenant-scoped action engine.
 * Backend MUST independently verify session, tenant, permissions and approvals.
 * This frontend controller never treats a tenant id or stored token as authority.
 */
import {FutureOS} from './future-os.js';

const subscribers=new Set();
const jobs=new Map();
const states=new Set(['queued','running','awaiting_approval','completed','failed','cancelled']);
const emit=(job)=>{
  const snapshot={...job,history:job.history.map(x=>({...x}))};
  for(const fn of subscribers){try{fn(snapshot)}catch{}}
};
const transition=(job,status,detail)=>{
  if(!states.has(status))throw Error('Invalid workflow status');
  job.status=status;
  job.history.push({status,detail,time:new Date().toISOString()});
  emit(job);
};
const newId=()=>globalThis.crypto?.randomUUID?.()||'job-'+Date.now()+'-'+Math.random().toString(36).slice(2);

export const BusinessWorkflow={
  subscribe(fn){subscribers.add(fn);return()=>subscribers.delete(fn)},
  get(id){const job=jobs.get(id);return job?{...job,history:job.history.map(x=>({...x}))}:null},
  list(){return [...jobs.values()].map(j=>BusinessWorkflow.get(j.id))},
  async start({capability,input,context,requiresApproval=false,summary=''}){
    if(!context?.tenantId||!context?.sessionVerified)throw Error('Verified session and tenant required');
    const id=newId();
    const job={id,capability,tenantId:context.tenantId,status:'queued',summary,history:[],result:null};
    jobs.set(id,job);
    transition(job,'queued','Request accepted locally');
    if(requiresApproval){transition(job,'awaiting_approval','Customer approval required');return BusinessWorkflow.get(id)}
    return BusinessWorkflow.run(id,input,context);
  },
  async approve(id,input,context){
    const job=jobs.get(id);
    if(!job||job.status!=='awaiting_approval')throw Error('No pending approval');
    if(job.tenantId!==context?.tenantId||!context?.sessionVerified)throw Error('Session or tenant mismatch');
    // This approval is a UI intent. The backend must validate authorization again.
    return BusinessWorkflow.run(id,input,{...context,approved:true});
  },
  async run(id,input,context){
    const job=jobs.get(id);
    if(!job||job.tenantId!==context?.tenantId||!context?.sessionVerified)throw Error('Unauthorized workflow');
    if(job.status==='running'||job.status==='completed')throw Error('Workflow already executed');
    transition(job,'running','Executing connected capability');
    try{
      const result=await FutureOS.execute(job.capability,input,context);
      job.result=result.output;
      transition(job,'completed','Result ready');
    }catch(error){transition(job,'failed',String(error?.message||error))}
    return BusinessWorkflow.get(id);
  },
  cancel(id,context){
    const job=jobs.get(id);
    if(!job||job.tenantId!==context?.tenantId||!context?.sessionVerified)throw Error('Unauthorized workflow');
    if(['completed','failed','cancelled'].includes(job.status))throw Error('Workflow already finished');
    transition(job,'cancelled','Customer cancelled pending workflow');
    return BusinessWorkflow.get(id);
  }
};
