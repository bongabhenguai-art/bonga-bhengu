import {boundedRequest,requestAllowance} from './backend-runtime.mjs';
const reply=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
const id=()=>crypto.randomUUID();
const validID=value=>typeof value==='string'&&/^[a-f0-9-]{36}$/.test(value);
function text(value,max){return typeof value==='string'?value.trim().slice(0,max+1):'';}
export async function community(request,env){
 const url=new URL(request.url),user=request.headers.get('oai-authenticated-user-id');
 if(!user)return reply({error:'Sign in to open Community.'},401);
 if(!env.DB)return reply({error:'Community storage is unavailable.'},503);
 if(!['GET','POST','DELETE'].includes(request.method))return reply({error:'Method not allowed'},405);
 if(request.method!=='GET'&&request.headers.get('origin')!==url.origin)return reply({error:'Open Community to make changes.'},403);
 const db=env.DB,now=new Date().toISOString();
 try{
  let me=await db.prepare('SELECT id,name FROM community_profiles WHERE user_id=?').bind(user).first();
  if(request.method==='GET'){
   if(url.pathname==='/api/community/profile')return reply({profile:me||null});
   if(!me)return reply({error:'Save a display name first.'},409);
   if(url.pathname==='/api/community/invite'){
    const invite=await db.prepare('SELECT visits,created_at FROM community_invites WHERE profile_id=?').bind(me.id).first();return reply({invite:invite?{url:url.origin+'/r/'+me.id,requests:invite.visits,createdAt:invite.created_at}:null});
   }
   if(url.pathname==='/api/community/feed'){
    const posts=(await db.prepare(`SELECT p.id,p.author,p.body,p.created_at,u.name,
      (SELECT COUNT(*) FROM community_likes l WHERE l.post_id=p.id) AS likes,
      (SELECT COUNT(*) FROM community_likes l WHERE l.post_id=p.id AND l.profile_id=?) AS liked
      FROM community_posts p JOIN community_profiles u ON u.id=p.author ORDER BY p.created_at DESC,p.id DESC LIMIT 50`).bind(me.id).all()).results;
    return reply({posts:posts.map(p=>({...p,mine:p.author===me.id}))});
   }
   if(url.pathname==='/api/community/comments'){
    const post=url.searchParams.get('post');if(!validID(post))return reply({error:'Choose a post.'},400);
    return reply({comments:(await db.prepare('SELECT c.id,c.author,c.body,c.created_at,u.name FROM community_comments c JOIN community_profiles u ON u.id=c.author WHERE c.post_id=? ORDER BY c.created_at,c.id LIMIT 100').bind(post).all()).results});
   }
   if(url.pathname==='/api/community/messages'){
    const peer=url.searchParams.get('peer');if(!validID(peer))return reply({error:'Choose a member.'},400);
    const member=await db.prepare('SELECT id,name FROM community_profiles WHERE id=?').bind(peer).first();if(!member)return reply({error:'Member not found.'},404);
    const messages=(await db.prepare('SELECT id,sender,recipient,body,created_at FROM community_messages WHERE (sender=? AND recipient=?) OR (sender=? AND recipient=?) ORDER BY created_at DESC,id DESC LIMIT 100').bind(me.id,peer,peer,me.id).all()).results.reverse();
    return reply({peer:member,messages});
   }
   if(url.pathname==='/api/community/conversations')return reply({members:(await db.prepare(`SELECT u.id,u.name FROM community_profiles u WHERE u.id IN (SELECT recipient FROM community_messages WHERE sender=? UNION SELECT sender FROM community_messages WHERE recipient=?) ORDER BY u.name LIMIT 100`).bind(me.id,me.id).all()).results});
   return reply({error:'Not found'},404);
  }
  const bounded=await boundedRequest(request,10000);if(bounded.response)return bounded.response;
  const allowance=await requestAllowance(db,user,'community-write',30);if(!allowance.allowed)return reply({error:'Please wait a minute before sending more.'},429);
  const raw=await bounded.request.text();if(raw.length>10000)return reply({error:'Message too large.'},413);
  let data;try{data=JSON.parse(raw);}catch{return reply({error:'Invalid request.'},400);}
  if(!data||typeof data!=='object')return reply({error:'Invalid request.'},400);
  if(url.pathname==='/api/community/profile'&&request.method==='POST'){
   const name=text(data.name,60);if(!name||name.length>60)return reply({error:'Enter a display name of 1–60 characters.'},400);
   await db.prepare('INSERT INTO community_profiles(id,user_id,name,updated_at) VALUES(?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET name=excluded.name,updated_at=excluded.updated_at').bind(me?.id||id(),user,name,now).run();
   me=await db.prepare('SELECT id,name FROM community_profiles WHERE user_id=?').bind(user).first();return reply({profile:me});
  }
  if(!me)return reply({error:'Save a display name first.'},409);
  if(url.pathname==='/api/community/invite'&&request.method==='POST'){
   await db.prepare('INSERT OR IGNORE INTO community_invites(profile_id,visits,created_at) VALUES(?,0,?)').bind(me.id,now).run();return reply({url:url.origin+'/r/'+me.id});
  }
  if(url.pathname==='/api/community/posts'){
   if(request.method==='DELETE'){
    if(!validID(data.id))return reply({error:'Choose a post.'},400);
    const own=await db.prepare('SELECT id FROM community_posts WHERE id=? AND author=?').bind(data.id,me.id).first();if(!own)return reply({error:'Post not found.'},404);
    await db.batch([db.prepare('DELETE FROM community_comments WHERE post_id=?').bind(data.id),db.prepare('DELETE FROM community_likes WHERE post_id=?').bind(data.id),db.prepare('DELETE FROM community_posts WHERE id=? AND author=?').bind(data.id,me.id)]);return reply({deleted:true});
   }
   const body=text(data.body,2000);if(!body||body.length>2000)return reply({error:'Write a post of 1–2,000 characters.'},400);
   const post=id();await db.prepare('INSERT INTO community_posts(id,author,body,created_at) VALUES(?,?,?,?)').bind(post,me.id,body,now).run();return reply({id:post},201);
  }
  if(request.method!=='POST')return reply({error:'Method not allowed'},405);
  if(['/api/community/likes','/api/community/comments'].includes(url.pathname)){
   if(!validID(data.post)||!await db.prepare('SELECT id FROM community_posts WHERE id=?').bind(data.post).first())return reply({error:'Post not found.'},404);
   if(url.pathname.endsWith('/likes')){
    if(typeof data.liked!=='boolean')return reply({error:'Choose like or unlike.'},400);
    await (data.liked?db.prepare('INSERT OR IGNORE INTO community_likes(post_id,profile_id) VALUES(?,?)'):db.prepare('DELETE FROM community_likes WHERE post_id=? AND profile_id=?')).bind(data.post,me.id).run();return reply({liked:data.liked});
   }
   const body=text(data.body,500);if(!body||body.length>500)return reply({error:'Write a comment of 1–500 characters.'},400);
   const comment=id();await db.prepare('INSERT INTO community_comments(id,post_id,author,body,created_at) VALUES(?,?,?,?,?)').bind(comment,data.post,me.id,body,now).run();return reply({id:comment},201);
  }
  if(url.pathname==='/api/community/messages'){
   if(!validID(data.peer)||data.peer===me.id||!await db.prepare('SELECT id FROM community_profiles WHERE id=?').bind(data.peer).first())return reply({error:'Choose another community member.'},400);
   const body=text(data.body,2000);if(!body||body.length>2000)return reply({error:'Write a message of 1–2,000 characters.'},400);
   const message=id();await db.prepare('INSERT INTO community_messages(id,sender,recipient,body,created_at) VALUES(?,?,?,?,?)').bind(message,me.id,data.peer,body,now).run();return reply({id:message},201);
  }
  return reply({error:'Not found'},404);
 }catch{return reply({error:'Community could not load or save. Try again.'},503);}
}

export async function communityReferral(request,env){
 const url=new URL(request.url),profile=url.pathname.slice(3);
 if(!['GET','HEAD'].includes(request.method))return reply({error:'Method not allowed'},405);
 if(!validID(profile))return reply({error:'Invite not found.'},404);
 if(!env.DB)return reply({error:'Invites unavailable.'},503);
 try{
  const row=request.method==='HEAD'?await env.DB.prepare('SELECT profile_id FROM community_invites WHERE profile_id=?').bind(profile).first():await env.DB.prepare('UPDATE community_invites SET visits=visits+1 WHERE profile_id=? RETURNING profile_id').bind(profile).first();
  if(!row)return reply({error:'Invite not found.'},404);
  return new Response(null,{status:302,headers:{location:url.origin+'/','cache-control':'no-store','referrer-policy':'no-referrer'}});
 }catch{return reply({error:'Invites unavailable.'},503);}
}
