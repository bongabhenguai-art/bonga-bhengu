import {withZuxuruContext} from './context.mjs';
import {GET,POST} from './os.ts';
import {get} from './zuxuru.ts';
const reply=(data,status)=>Response.json(data,{status,headers:{'cache-control':'private, no-store'}});
export async function zuxuruBackend(request,env){
 if(!request.headers.get('oai-authenticated-user-id'))return reply({error:'Sign in to use Zuxuru.'},401);
 const path=new URL(request.url).pathname;
 if(path==='/api/zuxuru/os'&&!['GET','POST'].includes(request.method))return reply({error:'Method not allowed'},405);
 if(path!=='/api/zuxuru/os'&&!/^\/api\/zuxuru\/capture\/[a-f0-9-]{36}$/.test(path))return reply({error:'Not found'},404);
 if(path!=='/api/zuxuru/os'&&!['GET','HEAD'].includes(request.method))return reply({error:'Method not allowed'},405);
 if(!env.DB||!env.MEDIA)return reply({error:'Zuxuru database or private media storage is unavailable.'},503);
 return withZuxuruContext(request,env,async()=>{
  if(path==='/api/zuxuru/os')return request.method==='GET'?GET():POST(request);
  try{
   const asset=await get(request.headers.get('oai-authenticated-user-id'),'asset',path.split('/').pop());
   if(!asset.filePath)return reply({error:'No attachment'},404);
   const object=await env.MEDIA.get(asset.filePath);if(!object)return reply({error:'Attachment unavailable'},404);
   return new Response(request.method==='HEAD'?null:object.body,{headers:{'content-type':asset.mime,'cache-control':'private, no-store','x-content-type-options':'nosniff'}});
  }catch{return reply({error:'Permission Missing'},403);}
 });
}
