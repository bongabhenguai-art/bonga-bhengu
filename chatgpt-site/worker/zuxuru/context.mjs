import {AsyncLocalStorage} from 'node:async_hooks';
const requests=new AsyncLocalStorage();
export function currentContext(){const context=requests.getStore();if(!context)throw Error('Zuxuru request context unavailable.');return context;}
export async function getChatGPTUser(){return currentContext().user;}
export function withZuxuruContext(request,env,operation){
 const userId=request.headers.get('oai-authenticated-user-id');
 const email=request.headers.get('oai-authenticated-user-email')||'';
 const adapted={...env,BUCKET:env.MEDIA,OPENAI_API_KEY:undefined};
 // Reuse the existing vault key without rotating it or reading another app's ciphertext.
 if(!adapted.SEARCH_VAULT_KEY&&/^[a-f0-9]{64}$/.test(env.JARVIS_VAULT_KEY||''))adapted.SEARCH_VAULT_KEY=btoa(String.fromCharCode(...env.JARVIS_VAULT_KEY.match(/../g).map(v=>parseInt(v,16))));
 return requests.run({env:adapted,user:userId?{userId,email,displayName:request.headers.get('oai-authenticated-user-name')||'Zuxuru account'}:null},operation);
}
