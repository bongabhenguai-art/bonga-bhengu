const respond=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
const text=(value,max)=>typeof value==='string'&&value.trim().length>0&&value.length<=max;
const id=value=>typeof value==='string'&&/^[a-zA-Z0-9_-]{1,80}$/.test(value);
const date=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;
export function validateEducation(p){
 if(!p||typeof p!=='object'||Array.isArray(p)||!text(p.institutionName,150)||!text(p.academicYear,30))throw Error('Enter an institution name and academic year.');
 for(const key of ['classes','learners','assignments','attendance','grades']){
  if(!Array.isArray(p[key])||p[key].length>500||p[key].some(r=>!r||typeof r!=='object'||!id(r.id))||new Set(p[key].map(r=>r.id)).size!==p[key].length)throw Error('Invalid or duplicate '+key+' records (maximum 500).');
 }
 const classes=new Set(p.classes.map(r=>r.id)),learners=new Map(p.learners.map(r=>[r.id,r])),assignments=new Map(p.assignments.map(r=>[r.id,r]));
 for(const r of p.classes)if(!text(r.name,120))throw Error('Each class needs a name.');
 for(const r of p.learners)if(!text(r.name,150)||!['Applicant','Enrolled'].includes(r.status)||(r.classId&&!classes.has(r.classId))||(r.status==='Enrolled'&&!classes.has(r.classId)))throw Error('Check learner name, enrollment and class.');
 for(const r of p.assignments)if(!text(r.title,200)||!classes.has(r.classId)||!date(r.dueDate)||typeof r.notes!=='string'||r.notes.length>2000)throw Error('Check assignment title, class and due date.');
 const attendanceKeys=new Set();
 for(const r of p.attendance){const key=r.learnerId+':'+r.date;if(!learners.has(r.learnerId)||!date(r.date)||!['Present','Absent','Excused'].includes(r.status)||attendanceKeys.has(key))throw Error('Check attendance; one record per learner and date.');attendanceKeys.add(key);}
 const gradeKeys=new Set();
 for(const r of p.grades){const learner=learners.get(r.learnerId),assignment=assignments.get(r.assignmentId),key=r.learnerId+':'+r.assignmentId;if(!learner||!assignment||learner.classId!==assignment.classId||!Number.isFinite(r.score)||!Number.isFinite(r.outOf)||r.outOf<=0||r.outOf>10000||r.score<0||r.score>r.outOf||typeof r.feedback!=='string'||r.feedback.length>2000||gradeKeys.has(key))throw Error('Check grade, class membership and assessment range.');gradeKeys.add(key);}
 const pick=(r,keys)=>Object.fromEntries(keys.map(k=>[k,r[k]]));
 return {institutionName:p.institutionName.trim(),academicYear:p.academicYear.trim(),classes:p.classes.map(r=>pick(r,['id','name'])),learners:p.learners.map(r=>({...pick(r,['id','name','status']),classId:r.classId||''})),assignments:p.assignments.map(r=>pick(r,['id','title','classId','dueDate','notes'])),attendance:p.attendance.map(r=>pick(r,['id','learnerId','date','status'])),grades:p.grades.map(r=>pick(r,['id','learnerId','assignmentId','score','outOf','feedback']))};
}
export async function educationWorkspace(request,env){
 const user=request.headers.get('oai-authenticated-user-id');
 if(!user)return respond({error:'Sign in to open your education workspace.'},401);
 if(!['GET','PUT'].includes(request.method))return respond({error:'Method not allowed'},405);
 if(!env.DB)return respond({error:'School storage is unavailable. Your draft has not been saved.'},503);
 try{
  const row=await env.DB.prepare('SELECT payload,revision,updated_at FROM education_workspaces WHERE user_id = ?').bind(user).first();
  if(request.method==='GET')return respond({payload:row?JSON.parse(row.payload):null,revision:row?.revision||0,updatedAt:row?.updated_at||null,access:'account_private'});
  if(request.headers.get('origin')!==new URL(request.url).origin)return respond({error:'Open the education workspace on this website to save.'},403);
  if(!request.headers.get('content-type')?.includes('application/json'))return respond({error:'JSON required'},415);
  const raw=await request.text();if(raw.length>250000)return respond({error:'School workspace is too large (maximum 250 KB).'},413);
  let body;try{body=JSON.parse(raw);}catch{return respond({error:'Invalid JSON'},400);}
  if(!body||!Number.isInteger(body.revision)||body.revision<0)return respond({error:'Invalid revision'},400);
  let payload;try{payload=validateEducation(body.payload);}catch(e){return respond({error:e.message},400);}
  if(body.revision!==(row?.revision||0))return respond({error:'Another device changed these records. Reload before saving.'},409);
  const previous=row?JSON.parse(row.payload):{},previousGrades=new Map((previous.grades||[]).map(r=>[r.id,r])),now=new Date().toISOString();
  payload.grades=payload.grades.map(r=>{const old=previousGrades.get(r.id),unchanged=old&&['learnerId','assignmentId','score','outOf','feedback'].every(k=>old[k]===r[k]);return {...r,reviewedBy:unchanged?old.reviewedBy:user,reviewedAt:unchanged?old.reviewedAt:now};});
  payload.audit=[...(previous.audit||[]).slice(-99),{at:now,actor:user,event:'school_records_saved',revision:body.revision+1}];
  let result;
  if(body.revision===0)result=await env.DB.prepare('INSERT INTO education_workspaces (user_id,payload,revision,updated_at) VALUES (?,?,1,?) ON CONFLICT(user_id) DO NOTHING').bind(user,JSON.stringify(payload),now).run();
  else result=await env.DB.prepare('UPDATE education_workspaces SET payload = ?, revision = revision + 1, updated_at = ? WHERE user_id = ? AND revision = ?').bind(JSON.stringify(payload),now,user,body.revision).run();
  if(!result.meta?.changes)return respond({error:'Another device changed these records. Reload before saving.'},409);
  return respond({payload,revision:body.revision+1,updatedAt:now,access:'account_private'});
 }catch{return respond({error:'School records could not be saved or loaded. Keep your draft and retry.'},503);}
}
