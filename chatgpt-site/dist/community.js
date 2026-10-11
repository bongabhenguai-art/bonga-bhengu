const $=id=>document.getElementById(id);let me=null,peer=null,revision=0,loading=false,feedRevision=0,messageRevision=0;
const status=message=>{$('status').textContent=message;};
async function api(path,body,method='POST'){
 const response=await fetch('/api/community/'+path,{method:body===undefined?'GET':method,headers:body===undefined?{}:{'content-type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'Please try again.');return data;
}
function node(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
function date(value){const t=node('time',new Date(value).toLocaleString());t.dateTime=value;return t;}
function button(label,action){const b=node('button',label);b.type='button';b.addEventListener('click',()=>run(b,action));return b;}
async function run(control,action){if(control.disabled)return;control.disabled=true;try{await action();}catch(e){status(e.message);}finally{control.disabled=false;}}
function submit(form,action){form.addEventListener('submit',event=>{event.preventDefault();run(form.querySelector('button'),()=>action(new FormData(form)));});}
async function loadFeed(){
 const current=++feedRevision;const {posts}=await api('feed');if(current!==feedRevision)return;const fragment=document.createDocumentFragment();
 for(const post of posts){
  const article=node('article'),head=node('header');head.append(node('strong',post.name),date(post.created_at));article.append(head,node('p',post.body));
  const actions=node('div',undefined,'actions');actions.append(button(`${post.liked?'Unlike':'Like'} · ${post.likes}`,async()=>{await api('likes',{post:post.id,liked:!post.liked});await loadFeed();}));
  const comments=node('div',undefined,'comments');comments.hidden=true;
  actions.append(button('Comments',async()=>{comments.hidden=!comments.hidden;if(comments.hidden)return;await loadComments(comments,post.id);}));
  if(!post.mine)actions.append(button('Message',()=>choosePeer(post.author,post.name)));
  if(post.mine)actions.append(button('Delete',async()=>{if(!confirm('Delete this post and its comments?'))return;await api('posts',{id:post.id},'DELETE');await loadFeed();}));
  article.append(actions,comments);fragment.append(article);
 }
 if(!posts.length)fragment.append(node('p','Share the first update.','note'));
 $('feed').replaceChildren(fragment);
}
async function loadComments(container,post){
 const {comments}=await api('comments?post='+encodeURIComponent(post));container.replaceChildren();
 for(const c of comments){const row=node('div',undefined,'comment');row.append(node('strong',c.name),node('p',c.body),date(c.created_at));container.append(row);}
 const form=node('form'),label=node('label','Comment'),input=node('textarea');input.name='body';input.required=true;input.maxLength=500;input.rows=2;label.append(input);form.append(label,node('button','Add comment'));container.append(form);
 submit(form,async data=>{await api('comments',{post,body:data.get('body')});await loadComments(container,post);status('Comment saved.');});
}
async function loadConversations(){const {members}=await api('conversations');$('conversations').replaceChildren(...members.map(m=>button(m.name,()=>choosePeer(m.id,m.name))));}
async function choosePeer(id,name){peer=id;revision++;$('peer-title').textContent=name;$('messages').replaceChildren();$('message').hidden=false;$('message').reset();await loadMessages();$('message').elements.body.focus();}
async function loadMessages(){
 if(!peer)return;const selected=peer,current=revision,read=++messageRevision;const {messages}=await api('messages?peer='+encodeURIComponent(selected));if(current!==revision||selected!==peer||read!==messageRevision)return;
 const nearBottom=$('messages').scrollHeight-$('messages').scrollTop-$('messages').clientHeight<60;
 $('messages').replaceChildren(...messages.map(m=>{const row=node('div',m.body,'bubble'+(m.sender===me.id?' mine':''));row.append(date(m.created_at));return row;}));if(nearBottom)$('messages').scrollTop=$('messages').scrollHeight;
}
async function refresh(){if(loading||!me)return;loading=true;try{await Promise.all([loadFeed(),loadConversations(),loadMessages(),loadInvite()]);status('Up to date.');}catch(e){status(e.message);}finally{loading=false;}}
async function boot(){try{const data=await api('profile');me=data.profile;$('workspace').hidden=!me;$('profile').elements.name.value=me?.name||'';if(me)await refresh();else status('Save a display name to join.');}catch(e){status(e.message);}}
submit($('profile'),async data=>{me=(await api('profile',{name:data.get('name')})).profile;$('workspace').hidden=false;await refresh();status('Name saved.');});
submit($('post'),async data=>{await api('posts',{body:data.get('body')});$('post').reset();await loadFeed();status('Post published.');});
submit($('message'),async data=>{const selected=peer,current=revision,body=data.get('body');if(!selected)throw Error('Choose a member.');await api('messages',{peer:selected,body});if(peer===selected&&revision===current){if($('message').elements.body.value===body)$('message').reset();await loadMessages();}await loadConversations();status('Message saved.');});
$('refresh').addEventListener('click',()=>run($('refresh'),refresh));
setInterval(()=>{if(document.visibilityState==='visible'&&me&&!loading){loading=true;Promise.all([loadConversations(),loadMessages()]).catch(e=>status(e.message)).finally(()=>loading=false);}},15000);
boot();

async function showInvite(invite){
 $('invite').hidden=false;$('invite-link').value=invite.url;$('whatsapp-invite').href='https://wa.me/?text='+encodeURIComponent('Join Bonga Bhengu: '+invite.url);$('invite-count').textContent='Link requests: '+(invite.requests??0)+' · Includes repeat visits and automated requests.';
 try{const {renderQRCode}=await import('/community-qr.js');await renderQRCode($('invite-qr'),invite.url);$('download-qr').hidden=false;}catch{status('Invite link is ready. QR rendering is unavailable in this browser.');}
}
async function loadInvite(){const {invite}=await api('invite');if(invite)await showInvite(invite);}
$('create-invite').addEventListener('click',()=>run($('create-invite'),async()=>{await api('invite',{});await loadInvite();status('Invite link ready.');}));
$('copy-invite').addEventListener('click',()=>run($('copy-invite'),async()=>{try{await navigator.clipboard.writeText($('invite-link').value);status('Link copied.');}catch{$('invite-link').select();status('Select and copy your invite link.');}}));
$('download-qr').addEventListener('click',()=>{const link=node('a');link.href=$('invite-qr').toDataURL('image/png');link.download='bonga-bhengu-invite-qr.png';link.click();});
