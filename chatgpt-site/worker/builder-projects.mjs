const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
export const websitePolicy="sandbox; default-src 'none'; script-src 'none'; img-src https: data:; style-src 'unsafe-inline'; font-src https: data:; base-uri 'none'; form-action 'none'; frame-src 'none'; frame-ancestors 'self'";
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function websiteDocument(data){return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(data.name)+'</title><style>'+data.css.replace(/<\/style/gi,'<\\/style')+'</style></head><body>'+data.html+'</body></html>';}
export async function builderPublication(request,env){
 const url=new URL(request.url),publicMatch=url.pathname.match(/^\/websites\/([a-f0-9-]{36})$/),privateMatch=url.pathname.match(/^\/api\/builder\/projects\/([a-f0-9-]{36})\/publication$/);
 if(!publicMatch&&!privateMatch)return json({error:'Website not found'},404);
 if(publicMatch){
  if(!['GET','HEAD'].includes(request.method))return json({error:'Method not allowed'},405);
  if(!env.DB)return json({error:'Website storage is unavailable'},503);
  try{const row=await env.DB.prepare('SELECT payload FROM builder_publications WHERE project_id = ? AND is_published = 1').bind(publicMatch[1]).first();if(!row)return json({error:'This website is not published.'},404);const data=JSON.parse(row.payload);return new Response(request.method==='HEAD'?null:websiteDocument(data),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','content-security-policy':websitePolicy,'x-content-type-options':'nosniff','referrer-policy':'no-referrer','permissions-policy':'camera=(), microphone=(), display-capture=(), geolocation=()'}});}catch{return json({error:'Website could not be loaded'},503);}
 }
 const user=request.headers.get('oai-authenticated-user-id'),id=privateMatch[1];
 if(!user)return json({error:'Sign in to manage your website.'},401);
 if(!env.DB)return json({error:'Website storage is unavailable. Retry shortly.'},503);
 if(!['GET','POST','DELETE'].includes(request.method))return json({error:'Method not allowed'},405);
 if(request.method!=='GET'&&request.headers.get('origin')!==url.origin)return json({error:'Open the editor on this site to publish.'},403);
 try{
  const project=await env.DB.prepare('SELECT payload,revision FROM builder_projects WHERE user_id = ? AND id = ?').bind(user,id).first();if(!project)return json({error:'Project not found in your account'},404);
  const publication=await env.DB.prepare('SELECT revision,project_revision,is_published,updated_at FROM builder_publications WHERE user_id = ? AND project_id = ?').bind(user,id).first();
  const state=row=>({published:row?.is_published===1,publicationRevision:row?.revision||0,projectRevision:row?.project_revision||0,url:'/websites/'+id,updatedAt:row?.updated_at||null});
  if(request.method==='GET')return json(state(publication));
  if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'JSON required'},415);
  if(Number(request.headers.get('content-length')||0)>4096)return json({error:'Request too large'},413);
  const raw=await request.text();if(raw.length>4096)return json({error:'Request too large'},413);
  let body;try{body=JSON.parse(raw);}catch{return json({error:'Invalid JSON'},400);}
  if(!body||!Number.isSafeInteger(body.revision)||body.revision<1||!Number.isSafeInteger(body.publicationRevision)||body.publicationRevision<0)return json({error:'Reload the saved project before publishing.'},400);
  if(body.revision!==project.revision||body.publicationRevision!==(publication?.revision||0))return json({error:'The draft or publication changed. Reload before trying again.'},409);
  const now=new Date().toISOString();
  if(request.method==='POST'){
   if(body.approved!==true)return json({error:'Review the saved page and approve public publication.'},400);
   const data=cleanBuilderProject(JSON.parse(project.payload)),snapshot=JSON.stringify({name:data.name,html:data.html,css:data.css});
   const result=await env.DB.prepare('INSERT INTO builder_publications (project_id,user_id,payload,project_revision,revision,is_published,updated_at) SELECT id,user_id,?,revision,1,1,? FROM builder_projects WHERE user_id = ? AND id = ? AND revision = ? AND COALESCE((SELECT revision FROM builder_publications WHERE project_id = ?),0) = ? ON CONFLICT(project_id) DO UPDATE SET payload = excluded.payload, project_revision = excluded.project_revision, revision = builder_publications.revision + 1, is_published = 1, updated_at = excluded.updated_at WHERE builder_publications.user_id = excluded.user_id').bind(snapshot,now,user,id,body.revision,id,body.publicationRevision).run();
   if(!result.meta?.changes)return json({error:'The draft or publication changed. Reload before trying again.'},409);
   return json(state({is_published:1,revision:body.publicationRevision+1,project_revision:body.revision,updated_at:now}));
  }
  if(!publication)return json({error:'No publication exists for this project.'},409);
  const result=await env.DB.prepare('UPDATE builder_publications SET is_published = 0, revision = revision + 1, updated_at = ? WHERE user_id = ? AND project_id = ? AND revision = ? AND EXISTS (SELECT 1 FROM builder_projects WHERE user_id = ? AND id = ? AND revision = ?)').bind(now,user,id,body.publicationRevision,user,id,body.revision).run();
  if(!result.meta?.changes)return json({error:'The draft or publication changed. Reload before trying again.'},409);
  return json(state({...publication,is_published:0,revision:body.publicationRevision+1,updated_at:now}));
 }catch{return json({error:'Publication could not be updated. Keep your draft and retry.'},503);}
}
export function cleanBuilderProject(body){
 if(!body||typeof body!=='object'||typeof body.name!=='string'||!body.name.trim()||body.name.length>150)throw Error('Enter a project name (maximum 150 characters).');
 if(!body.projectData||typeof body.projectData!=='object'||Array.isArray(body.projectData)||JSON.stringify(body.projectData).length>400000)throw Error('Editor project is missing or too large.');
 if(typeof body.html!=='string'||body.html.length>200000||typeof body.css!=='string'||body.css.length>100000)throw Error('Website output is missing or too large.');
 return {name:body.name.trim(),projectData:body.projectData,html:body.html,css:body.css};
}
export async function builderProjects(request,env){
 const user=request.headers.get('oai-authenticated-user-id'),url=new URL(request.url),match=url.pathname.match(/^\/api\/builder\/projects(?:\/([a-f0-9-]{36}))?$/);
 if(!user)return json({error:'Sign in to open your website projects.'},401);
 if(!match)return json({error:'Project not found'},404);
 if(!env.DB)return json({error:'Website storage is unavailable. Keep your draft and retry.'},503);
 const projectId=match[1];
 try{
  if(request.method==='GET'){
   if(!projectId){const result=await env.DB.prepare('SELECT id,name,revision,updated_at FROM builder_projects WHERE user_id = ? ORDER BY updated_at DESC LIMIT 20').bind(user).all();return json({projects:result.results||[]});}
   const row=await env.DB.prepare('SELECT id,name,payload,revision,updated_at FROM builder_projects WHERE user_id = ? AND id = ?').bind(user,projectId).first();
   return row?json({id:row.id,...JSON.parse(row.payload),revision:row.revision,updatedAt:row.updated_at}):json({error:'Project not found in your account'},404);
  }
  if(!['POST','PUT'].includes(request.method))return json({error:'Method not allowed'},405);
  if(request.headers.get('origin')!==url.origin)return json({error:'Open the website editor on this site to save.'},403);
  if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'JSON required'},415);
  const raw=await request.text();if(raw.length>750000)return json({error:'Project request is too large.'},413);
  let body;try{body=JSON.parse(raw);}catch{return json({error:'Invalid JSON'},400);}
  let data;try{data=cleanBuilderProject(body);}catch(e){return json({error:e.message},400);}
  const now=new Date().toISOString();
  if(request.method==='POST'){
   if(projectId)return json({error:'Create projects at /api/builder/projects'},405);
   const count=await env.DB.prepare('SELECT COUNT(*) AS total FROM builder_projects WHERE user_id = ?').bind(user).first();if(count.total>=20)return json({error:'Maximum 20 website projects per account.'},413);
   const id=crypto.randomUUID();const saved=await env.DB.prepare('INSERT INTO builder_projects (id,user_id,name,payload,revision,updated_at) SELECT ?,?,?,?,1,? WHERE (SELECT COUNT(*) FROM builder_projects WHERE user_id = ?) < 20').bind(id,user,data.name,JSON.stringify(data),now,user).run();if(!saved.meta?.changes)return json({error:'Maximum 20 website projects per account.'},413);return json({id,revision:1,updatedAt:now},201);
  }
  if(!projectId||!Number.isSafeInteger(body.revision)||body.revision<1)return json({error:'Select a saved project and valid revision.'},400);
  const result=await env.DB.prepare('UPDATE builder_projects SET name = ?, payload = ?, revision = revision + 1, updated_at = ? WHERE user_id = ? AND id = ? AND revision = ?').bind(data.name,JSON.stringify(data),now,user,projectId,body.revision).run();
  if(!result.meta?.changes)return json({error:'Project changed or is not in your account. Reload before saving.'},409);
  return json({id:projectId,revision:body.revision+1,updatedAt:now});
 }catch{return json({error:'Website project could not be saved or loaded. Keep your draft and retry.'},503);}
}
