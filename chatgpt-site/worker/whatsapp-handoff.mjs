/** WhatsApp Business handoff: user-initiated click-to-chat only. No messages are sent by this API. */
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
export function createWhatsAppHandoff(data){
 if(!data||typeof data!=='object')throw Error('Enter a recipient and message.');
 const phone=String(data.phone||'').trim();
 if(!/^\+[1-9]\d{7,14}$/.test(phone))throw Error('Use an international number such as +27821234567.');
 const message=String(data.message||'').trim();
 if(!message||message.length>2000)throw Error('Message must be between 1 and 2000 characters.');
 if(data.consent!==true)throw Error('Confirm you have a legitimate reason to contact this recipient.');
 return {url:'https://wa.me/'+phone.slice(1)+'?text='+encodeURIComponent(message),recipient:phone,message,mode:'user_initiated',sent:false,providerConnected:false};
}
export async function whatsappHandoff(request){
 const url=new URL(request.url);
 if(request.method==='GET'&&url.pathname==='/api/whatsapp/status')return reply({mode:'click_to_chat',businessApiConnected:false,inboxConnected:false,automaticSending:false});
 if(request.method!=='POST'||url.pathname!=='/api/whatsapp/handoff')return reply({error:'Not found'},404);
 if(!request.headers.get('oai-authenticated-user-id'))return reply({error:'Sign in required'},401);
 if(request.headers.get('origin')!==url.origin)return reply({error:'Open your dashboard to prepare a message'},403);
 const raw=await request.text();
 if(raw.length>5000)return reply({error:'Request too large'},413);
 try{return reply(createWhatsAppHandoff(JSON.parse(raw)));}
 catch(e){return reply({error:e instanceof SyntaxError?'Invalid JSON':e.message},400);}
}
