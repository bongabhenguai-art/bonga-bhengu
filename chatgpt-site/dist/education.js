const $=id=>document.getElementById(id),status=$('status');let revision=0,payload=null,busy=false,ready=false;
const empty=()=>({institutionName:'',academicYear:String(new Date().getFullYear()),classes:[],learners:[],assignments:[],attendance:[],grades:[]});
const node=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
function table(target,headers,rows){const root=$(target);root.replaceChildren();if(!rows.length){root.append(node('p','No records saved yet.'));return;}const t=node('table'),thead=node('thead'),head=node('tr');headers.forEach(v=>head.append(node('th',v)));thead.append(head);t.append(thead);const body=node('tbody');for(const row of rows){const tr=node('tr');row.forEach(v=>{const td=node('td');v instanceof HTMLElement?td.append(v):td.textContent=String(v??'');tr.append(td);});body.append(tr);}t.append(body);root.append(t);}
const className=id=>payload.classes.find(r=>r.id===id)?.name||'Unassigned',learnerName=id=>payload.learners.find(r=>r.id===id)?.name||'Unknown',assignmentName=id=>payload.assignments.find(r=>r.id===id)?.title||'Unknown';
function render(){
 $('summary').textContent=`${payload.classes.length} classes · ${payload.learners.length} learners · ${payload.assignments.length} assignments · ${payload.grades.length} reviewed results`;
 for(const field of ['institutionName','academicYear'])$('institution-form').elements[field].value=payload[field];
 for(const [selector,items,label]of [['[data-classes]',payload.classes,r=>r.name],['[data-learners]',payload.learners,r=>r.name],['[data-assignments]',payload.assignments,r=>r.title]])for(const select of document.querySelectorAll(selector)){const current=select.value;select.replaceChildren();const hint=node('option',items.length?'Choose a record':'Add records first');hint.value='';select.append(hint);for(const item of items){const option=node('option',label(item));option.value=item.id;select.append(option);}if(items.some(r=>r.id===current))select.value=current;}
 table('classes-list',['Class'],payload.classes.map(r=>[r.name]));
 table('learners-list',['Learner','Class','Enrollment','Action'],payload.learners.map(r=>{const button=node('button',r.status==='Applicant'?'Enroll learner':'Enrolled');button.type='button';button.disabled=r.status==='Enrolled'||busy;button.onclick=()=>save(next=>{next.learners.find(x=>x.id===r.id).status='Enrolled';});return [r.name,className(r.classId),r.status,button];}));
 table('attendance-list',['Learner','Date','Status'],payload.attendance.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(r=>[learnerName(r.learnerId),r.date,r.status]));
 table('assignments-list',['Assignment','Class','Due','Instructions'],payload.assignments.map(r=>[r.title,className(r.classId),r.dueDate,r.notes]));
 table('grades-list',['Learner','Assignment','Mark','Feedback','Reviewed'],payload.grades.map(r=>[learnerName(r.learnerId),assignmentName(r.assignmentId),`${r.score}/${r.outOf}`,r.feedback,r.reviewedAt?new Date(r.reviewedAt).toLocaleDateString():'Pending']));
 controls();
}
function controls(){document.querySelectorAll('form button').forEach(b=>b.disabled=busy||!ready);$('reload').disabled=busy;}
async function load(){if(busy)return;busy=true;controls();try{const r=await fetch('/api/education/workspace',{cache:'no-store'}),data=await r.json();if(!r.ok)throw Error(data.error||'Records could not be loaded.');revision=data.revision;payload=data.payload||empty();ready=true;render();status.textContent=data.payload?'Saved school records loaded.':'Start by saving your institution.';}catch(e){ready=false;status.textContent=e.message;}finally{busy=false;controls();}}
async function save(edit){if(busy||!ready)return;busy=true;controls();try{const next=structuredClone(payload);edit(next);const r=await fetch('/api/education/workspace',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({payload:next,revision})}),data=await r.json();if(!r.ok)throw Error(data.error||'Save failed.');payload=data.payload;revision=data.revision;status.textContent='School records saved.';render();}catch(e){status.textContent=e.message;}finally{busy=false;render();}}
const data=form=>Object.fromEntries(new FormData(form));
$('institution-form').onsubmit=e=>{e.preventDefault();const d=data(e.target);save(next=>Object.assign(next,d));};
$('class-form').onsubmit=e=>{e.preventDefault();const d=data(e.target);save(next=>next.classes.push({id:crypto.randomUUID(),name:d.name}));};
$('learner-form').onsubmit=e=>{e.preventDefault();const d=data(e.target);save(next=>next.learners.push({id:crypto.randomUUID(),...d}));};
$('attendance-form').elements.date.value=new Date().toISOString().slice(0,10);
$('attendance-form').onsubmit=e=>{e.preventDefault();const d=data(e.target);save(next=>{const old=next.attendance.find(r=>r.learnerId===d.learnerId&&r.date===d.date);old?Object.assign(old,d):next.attendance.push({id:crypto.randomUUID(),...d});});};
$('assignment-form').onsubmit=e=>{e.preventDefault();const d=data(e.target);save(next=>next.assignments.push({id:crypto.randomUUID(),...d}));};
$('grade-form').onsubmit=e=>{e.preventDefault();const d=data(e.target);d.score=Number(d.score);d.outOf=Number(d.outOf);save(next=>{const old=next.grades.find(r=>r.learnerId===d.learnerId&&r.assignmentId===d.assignmentId);old?Object.assign(old,d):next.grades.push({id:crypto.randomUUID(),...d});});};
$('reload').onclick=load;await load();
