const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
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
