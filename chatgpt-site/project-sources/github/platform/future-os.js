/* Bonga Bhengu Future Business OS — additive intelligence orchestration.
 * No pretend AI outputs: every capability must register a real executor.
 * Does not require or request sensitive device permissions on startup.
 */
const PRODUCTS=['website','visibility','creative','banner'];
const handlers=new Map();
const listeners=new Set();
const events=[];
export const FutureOS={
 products:Object.freeze([...PRODUCTS]),
 register({id,product,run,available=()=>true,description=''}) {
  if(!id||!PRODUCTS.includes(product)||typeof run!=='function')throw Error('Invalid capability registration');
  if(handlers.has(id))throw Error('Duplicate capability: '+id);
  handlers.set(id,{id,product,run,available,description});
  FutureOS.emit('capability.registered',{id,product});
  return ()=>{handlers.delete(id);FutureOS.emit('capability.removed',{id})};
 },
 list(product){return [...handlers.values()].filter(h=>(!product||h.product===product)&&h.available()).map(({id,product,description})=>({id,product,description}))},
 async execute(id,input,context={}){
  const h=handlers.get(id);
  if(!h)throw Error('Capability not connected: '+id);
  if(!h.available())throw Error('Capability unavailable: '+id);
  if(context.signal?.aborted)throw Error('Task cancelled');
  const taskId=globalThis.crypto?.randomUUID?.()||String(Date.now())+'-'+Math.random().toString(36).slice(2);
  FutureOS.emit('task.started',{taskId,id,product:h.product});
  try{const output=await h.run(input,{...context,taskId});FutureOS.emit('task.completed',{taskId,id});return {taskId,output}}
  catch(error){FutureOS.emit('task.failed',{taskId,id,message:String(error?.message||error)});throw error}
 },
 subscribe(fn){listeners.add(fn);return ()=>listeners.delete(fn)},
 emit(type,detail={}){const event={type,detail,time:new Date().toISOString()};events.push(event);if(events.length>100)events.shift();for(const fn of listeners){try{fn(event)}catch{}}},
 recentEvents(){return events.map(e=>({...e,detail:{...e.detail}}))},
 status(){return {products:PRODUCTS.map(id=>({id,connected:FutureOS.list(id).length})),capabilities:FutureOS.list().length}},
};
export function mountFutureOS(root=document){
 const status=root.querySelector('[data-future-os-status]');
 if(!status)return ()=>{};
 const render=()=>{const s=FutureOS.status();status.textContent=s.capabilities+' connected capabilities · '+s.products.filter(p=>p.connected).length+'/4 products online';};
 render();return FutureOS.subscribe(render);
}
