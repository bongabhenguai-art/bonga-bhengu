import {boundedRequest} from './backend-runtime.mjs';
const podcastJSON=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
const podcastText=(value,limit)=>typeof value==='string'?value.trim().replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'').slice(0,limit):'';
const podcastXML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const podcastId=value=>/^[a-f0-9]{32}$/.test(value||'');
const publishAudio=new Set(['audio/mpeg','audio/mp4']);

function publicEpisode(row,origin){
  const data=JSON.parse(row.published_data);
  return {id:row.id,show:row.show_slug,title:data.title,description:data.description,showTitle:data.showTitle,duration:data.duration,audio:origin+'/podcasts/audio/'+row.id,feed:origin+'/podcasts/shows/'+row.show_slug+'/feed.xml',publishedAt:row.published_at};
}
function privateEpisode(row){return {id:row.id,...JSON.parse(row.payload),revision:row.revision,publicationRevision:row.publication_revision,published:!!row.published_data,publishedAt:row.published_at,show:row.show_slug};}

async function podcastAudio(request,env,row){
  const data=JSON.parse(row.published_data);
  const file=await env.DB.prepare('SELECT object_key,content_type,size FROM designer_media WHERE id = ? AND user_id = ?').bind(data.mediaId,row.user_id).first();
  if(!file||!publishAudio.has(file.content_type)||file.content_type!==data.audioType)return podcastJSON({error:'Episode audio unavailable.'},404);
  if(!env.MEDIA)return podcastJSON({error:'Audio storage unavailable.'},503);
  const meta=await env.MEDIA.head(file.object_key);
  if(!meta)return podcastJSON({error:'Episode audio unavailable.'},404);
  const size=meta.size,range=request.headers.get('range');let offset=0,length=size,partial=false;
  if(range){
    const match=range.match(/^bytes=(\d*)-(\d*)$/);
    if(!match||(!match[1]&&!match[2]))return new Response(null,{status:416,headers:{'content-range':'bytes */'+size}});
    if(!match[1]){const suffix=Number(match[2]);if(!Number.isSafeInteger(suffix)||suffix<1)return new Response(null,{status:416,headers:{'content-range':'bytes */'+size}});offset=Math.max(0,size-suffix);length=size-offset;}
    else{offset=Number(match[1]);const end=match[2]?Math.min(Number(match[2]),size-1):size-1;if(!Number.isSafeInteger(offset)||!Number.isSafeInteger(end)||offset>=size||end<offset)return new Response(null,{status:416,headers:{'content-range':'bytes */'+size}});length=end-offset+1;}
    partial=true;
  }
  const headers=new Headers({'content-type':file.content_type,'content-length':String(length),'accept-ranges':'bytes','cache-control':'no-store','x-content-type-options':'nosniff','content-disposition':'inline; filename="episode.'+(file.content_type==='audio/mpeg'?'mp3':'m4a')+'"'});
  if(partial)headers.set('content-range',`bytes ${offset}-${offset+length-1}/${size}`);
  if(request.method==='HEAD')return new Response(null,{status:partial?206:200,headers});
  const object=await env.MEDIA.get(file.object_key,partial?{range:{offset,length}}:undefined);
  if(!object)return podcastJSON({error:'Episode audio unavailable.'},404);
  return new Response(object.body,{status:partial?206:200,headers});
}

export async function podcasts(request,env){
  const url=new URL(request.url),path=url.pathname,user=request.headers.get('oai-authenticated-user-id');
  if(!env.DB)return podcastJSON({error:'Podcast storage unavailable.'},503);
  try{
    if(path==='/api/podcasts/public'||path.startsWith('/podcasts/')){
      if(!['GET','HEAD'].includes(request.method))return podcastJSON({error:'Method not allowed'},405);
      const audio=path.match(/^\/podcasts\/audio\/([a-f0-9]{32})$/);
      if(audio){const row=await env.DB.prepare('SELECT * FROM podcast_episodes WHERE id = ? AND published_data IS NOT NULL').bind(audio[1]).first();return row?await podcastAudio(request,env,row):podcastJSON({error:'Episode not found'},404);}
      const feed=path.match(/^\/podcasts\/shows\/([a-f0-9]{32})\/feed\.xml$/);
      if(path!=='/api/podcasts/public'&&!feed)return podcastJSON({error:'Not found'},404);
      const rows=await env.DB.prepare("SELECT e.* FROM podcast_episodes e JOIN designer_media m ON m.id = json_extract(e.published_data,'$.mediaId') AND m.user_id = e.user_id WHERE e.published_data IS NOT NULL AND (? = '' OR e.show_slug = ?) ORDER BY e.published_at DESC,e.id LIMIT 100").bind(feed?.[1]||'',feed?.[1]||'').all();
      if(!feed)return request.method==='HEAD'?new Response(null,{headers:{'content-type':'application/json','cache-control':'no-store'}}):podcastJSON({episodes:rows.results.map(row=>publicEpisode(row,url.origin))});
      if(!rows.results.length)return podcastJSON({error:'Published show not found'},404);
      const episodes=rows.results.map(row=>publicEpisode(row,url.origin)),showTitle=episodes[0].showTitle;
      const xml='<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel><title>'+podcastXML(showTitle)+'</title><link>'+podcastXML(url.origin+'/podcasts.html?show='+feed[1])+'</link><description>'+podcastXML(showTitle+' on Bonga Bhengu')+'</description><language>en-ZA</language>'+episodes.map((episode,index)=>{const data=JSON.parse(rows.results[index].published_data);return '<item><title>'+podcastXML(episode.title)+'</title><description>'+podcastXML(episode.description)+'</description><guid isPermaLink="false">'+episode.id+'</guid><pubDate>'+new Date(episode.publishedAt).toUTCString()+'</pubDate><enclosure url="'+podcastXML(episode.audio)+'" length="'+data.size+'" type="'+data.audioType+'"/><itunes:duration>'+episode.duration+'</itunes:duration></item>';}).join('')+'</channel></rss>';
      return new Response(request.method==='HEAD'?null:xml,{headers:{'content-type':'application/rss+xml; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
    }
    if(!user)return podcastJSON({error:'Sign in to manage podcast episodes.'},401);
    const match=path.match(/^\/api\/podcasts\/episodes(?:\/([a-f0-9]{32})(\/publication)?)?$/);
    if(!match)return podcastJSON({error:'Not found'},404);
    const id=match[1],publication=!!match[2];
    if(request.method==='GET'){
      if(id){const row=await env.DB.prepare('SELECT * FROM podcast_episodes WHERE id = ? AND user_id = ?').bind(id,user).first();return row?podcastJSON(privateEpisode(row)):podcastJSON({error:'Episode not found'},404);}
      const rows=await env.DB.prepare('SELECT * FROM podcast_episodes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 100').bind(user).all();return podcastJSON({episodes:rows.results.map(privateEpisode)});
    }
    if(!['POST','PUT','DELETE'].includes(request.method))return podcastJSON({error:'Method not allowed'},405);
    if(request.headers.get('origin')!==url.origin)return podcastJSON({error:'Open this action in your podcast workspace.'},403);
    const bounded=await boundedRequest(request,10000);if(bounded.response)return bounded.response;
    const raw=await bounded.request.text();
    let body;try{body=JSON.parse(raw);if(!body||typeof body!=='object'||Array.isArray(body))throw Error();}catch{return podcastJSON({error:'Invalid episode'},400);}
    let row=id?await env.DB.prepare('SELECT * FROM podcast_episodes WHERE id = ? AND user_id = ?').bind(id,user).first():null;
    if(id&&!row)return podcastJSON({error:'Episode not found'},404);
    if(id&&body.revision!==row.revision)return podcastJSON({error:'Episode changed. Reload before saving.'},409);
    if(publication){
      if(!['POST','DELETE'].includes(request.method))return podcastJSON({error:'Method not allowed'},405);
      if(body.publicationRevision!==row.publication_revision)return podcastJSON({error:'Publication changed. Reload before continuing.'},409);
      let data=null;
      if(request.method==='POST'){
        if(body.approved!==true)return podcastJSON({error:'Review and approve the saved episode first.'},400);
        const draft=JSON.parse(row.payload);
        const file=await env.DB.prepare('SELECT * FROM designer_media WHERE id = ? AND user_id = ?').bind(draft.mediaId,user).first();
        if(!file||!publishAudio.has(file.content_type))return podcastJSON({error:'Upload MP3 or AAC in an M4A file for publication. Browser WebM recordings can stay private.'},400);
        const meta=env.MEDIA&&await env.MEDIA.head(file.object_key);
        if(!meta||!meta.size)return podcastJSON({error:'Saved audio is unavailable.'},503);
        data=JSON.stringify({...draft,audioType:file.content_type,size:meta.size});
      }
      const now=new Date().toISOString(),result=await env.DB.prepare('UPDATE podcast_episodes SET published_data = ?, published_at = ?, publication_revision = publication_revision + 1 WHERE id = ? AND user_id = ? AND revision = ? AND publication_revision = ?').bind(data,data?now:null,id,user,body.revision,body.publicationRevision).run();
      if(!result.meta?.changes)return podcastJSON({error:'Episode changed during publication. Reload.'},409);
      return podcastJSON({published:!!data,publicationRevision:row.publication_revision+1});
    }
    if(request.method==='DELETE')return podcastJSON({error:'Unpublish the episode or keep its draft.'},405);
    if((id&&request.method!=='PUT')||(!id&&request.method!=='POST'))return podcastJSON({error:'Method not allowed'},405);
    const draft={showTitle:podcastText(body.showTitle,150),title:podcastText(body.title,180),description:podcastText(body.description,3000),mediaId:body.mediaId,duration:Number(body.duration||0)};
    if(!draft.showTitle||!draft.title||!podcastId(draft.mediaId)||!Number.isFinite(draft.duration)||draft.duration<0||draft.duration>86400)return podcastJSON({error:'Enter a show, episode title and saved audio file.'},400);
    const file=await env.DB.prepare('SELECT content_type FROM designer_media WHERE id = ? AND user_id = ?').bind(draft.mediaId,user).first();
    if(!file||!file.content_type.startsWith('audio/'))return podcastJSON({error:'Select an audio file owned by this account.'},400);
    const now=new Date().toISOString();
    if(row){
      const result=await env.DB.prepare('UPDATE podcast_episodes SET payload = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND user_id = ? AND revision = ?').bind(JSON.stringify(draft),now,id,user,body.revision).run();
      if(!result.meta?.changes)return podcastJSON({error:'Episode changed. Reload before saving.'},409);
      return podcastJSON({saved:true,id,revision:row.revision+1});
    }
    const count=await env.DB.prepare('SELECT COUNT(*) AS total FROM podcast_episodes WHERE user_id = ?').bind(user).first();if(count.total>=100)return podcastJSON({error:'Maximum 100 episode drafts per account.'},413);
    const existing=await env.DB.prepare('SELECT show_slug FROM podcast_episodes WHERE user_id = ? LIMIT 1').bind(user).first();
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('bonga-podcast-show:'+user));
    const newId=crypto.randomUUID().replaceAll('-',''),slug=existing?.show_slug||Array.from(new Uint8Array(digest)).slice(0,16).map(byte=>byte.toString(16).padStart(2,'0')).join('');
    const inserted=await env.DB.prepare('INSERT INTO podcast_episodes(id,user_id,show_slug,payload,updated_at) SELECT ?,?,?,?,? WHERE (SELECT COUNT(*) FROM podcast_episodes WHERE user_id = ?) < 100').bind(newId,user,slug,JSON.stringify(draft),now,user).run();
    if(!inserted.meta?.changes)return podcastJSON({error:'Maximum 100 episode drafts per account.'},413);
    return podcastJSON({saved:true,id:newId,revision:1},201);
  }catch(error){console.error('Podcast operation failed',error.message);return podcastJSON({error:'Podcast service unavailable. Try again.'},503);}
}
