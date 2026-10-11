/** Safe connection capabilities; no account may be labelled connected without verified OAuth state. */
const response=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
const platforms=['whatsapp','youtube','facebook','instagram','tiktok','google_business'];
export async function connectionStatus(request){
 const url=new URL(request.url);
 if(request.method!=='GET')return response({error:'Method not allowed'},405);
 if(!request.headers.get('oai-authenticated-user-id'))return response({error:'Sign in required'},401);
 return response({connections:platforms.map(platform=>({platform,status:'not_configured',canAuthorize:false,canPublish:false})),message:'OAuth applications, callback verification and token storage are not configured. External management links are not authenticated connections.'});
}
