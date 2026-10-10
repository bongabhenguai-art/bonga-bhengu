/* Real capability adapters. Only connected and healthy services are marked live.
   API base URL must point to an authenticated tenant-scoped backend. */
import {FutureOS} from './future-os.js';
const normalize=(url)=>{const u=new URL(url,globalThis.location?.href||'http://localhost');if(!['http:','https:'].includes(u.protocol))throw Error('Invalid API URL');return u};
export function connectBusinessModules({apiBase,authorize,visibilityScan,createWebsite,renderBanner}={}){
 const undo=[];
 const base=apiBase?normalize(apiBase):null;
 async function post(path,input,context={}){
  if(!base)throw Error('Backend is not configured');
  if(typeof authorize!=='function')throw Error('Authentication is not configured');
  const token=await authorize(context);
  if(!token)throw Error('Authentication required');
  const url=new URL(path.replace(/^\//,''),base.href.endsWith('/')?base.href:base.href+'/');
  const res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify(input),signal:context.signal});
  if(!res.ok)throw Error('Service request failed ('+res.status+')');
  return res.json();
 }
 const register=(id,product,description,run,available)=>undo.push(FutureOS.register({id,product,description,run,available}));
 if(typeof createWebsite==='function')register('website.build','website','Generate approved business website',(input,ctx)=>createWebsite(input,ctx),()=>true);
 if(typeof visibilityScan==='function')register('visibility.scan','visibility','Analyze real business visibility',(input,ctx)=>visibilityScan(input,ctx),()=>true);
 if(typeof renderBanner==='function')register('banner.render','banner','Render digital banner',(input,ctx)=>renderBanner(input,ctx),()=>true);
 if(base&&typeof authorize==='function'){
  register('creative.image','creative','Render a branded studio image',(input,ctx)=>post('jobs',input,ctx),()=>true);
  register('banner.animation','banner','Render animated HTML banner',(input,ctx)=>post('animation/preview',input,ctx),()=>true);
 }
 return ()=>undo.reverse().forEach(fn=>fn());
}
