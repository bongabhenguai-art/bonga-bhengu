# Bonga Bhengu App — merged master file

Existing application, not a replacement. The original three files are reproduced below without flattening their executable imports. All 219 retained source artifacts and the complete 484-file application master archive are committed to the existing ChatGPT Sites source.

Source commit: `d6a19db639d9310665c9ca72bf75d97fd49fbb17`. Saved Sites version: **117**. Deployment status is recorded separately; a commit alone does not prove publication.

Validation: 27 JavaScript suites and 31 Python tests passed. CodeRabbit login returned `environment_unsupported`; no new local CodeRabbit review ran.

Implemented additions: account-private school records, enrollment, attendance, assignments, reviewed grading; GrapesJS website editing, save/load, preview and HTML export. Institution role sharing, APK builds and candidate coding workers are not implemented.

## docs/education-partner-os-school-app.md

````markdown
# Education Partner OS — School App integration into Bonga Bhengu App

Status: consolidated implementation specification; no claim of deployment.

## Identity and scope
**Education Partner OS** is the school/education product INSIDE the existing Bonga Bhengu App storefront, never a separate app, operating system, login, AI engine, or duplicate dashboard. Support primary schools, high schools, TVET colleges, universities, private colleges, and training academies. Use shared Bonga Bhengu App tenant identity, AI employees, model routing, approved MCP integrations, billing, storage, security, accessibility and execution ledger.

## Education workspaces
- Institution administrator: organization setup, branches, academic years, grades, subjects, curricula, admissions, enrollment, teacher assignment, permissions, schedules, finances, compliance, reporting and audit.
- Teacher/lecturer: class lists, lesson planning, teaching materials, assignments, marking, assessment rubrics, learner progress, attendance, parent communication and AI teaching assistance.
- Student/learner: timetable, lessons, study content, homework, quizzes, examinations, feedback, AI tutoring, portfolio, career guidance and accessibility settings.
- Parent/guardian: authorized child overview, attendance, performance, school announcements, communication, consent and fees.
- Finance/operations: invoices, payment reconciliation, financial aid, budgeting, school assets, inventory, transport, safety and incident workflows.
- Institution support: counseling/wellbeing, careers, learning support, safeguarding, student support and administrative assistants.

## Unified modules
1. Admissions, registration, enrollment and student records.
2. Timetables, calendars, classes, staff allocation and attendance.
3. Curriculum mapping, learning outcomes, lesson plans and resource library.
4. LMS: courses, video/audio lessons, assignments, quizzes and progress.
5. Assessment: question banks, exam scheduling, rubric-based marking, moderated results and transcripts.
6. AI tutor: personalized explanations, revision, adaptive exercises, teacher-reviewed feedback, multilingual voice/text support.
7. Learner intelligence: evidence-backed progress indicators, intervention suggestions, no unverified diagnoses.
8. Parent and staff messaging with consent, notification preferences and official integrations.
9. Finance: fees, receipts, invoices, financial aid, provider-based payments and reconciliation.
10. Safety: emergency contacts, incidents, role-specific safeguarding and restricted data.
11. Careers, placements, skills and portfolio building, including TVET practical assessments.
12. Institution dashboards, reporting, exports, document retention and compliance.

## AI workforce routing
Reuse existing Bonga Bhengu AI employees rather than clone them:
- Business Coach/Mentor -> institution strategy and support
- Engineer/Fixer -> school technology and issue resolution
- Workflow/Assistant -> schedules, reminders and administrative processes
- Researcher -> curricula and authorized learning resources
- Branding/Amplifier -> approved institution communications
- Money -> finance reconciliation and reporting
- Problem Resolver -> operational or learner support triage
- Academy/LMS AI -> lessons, tutoring, assessments and coaching
- Business Scraper -> institutional needs discovery and evidence-based service matching

Create **education-specific skills and permissions**, not another central agent orchestration engine.

## School workflows
Admissions: applicant -> consent and documents -> review -> decision -> enrollment -> class allocation -> parent/student access.
Learning: curriculum -> teacher lesson plan -> teaching -> student work -> assessment -> moderation -> feedback -> intervention -> reporting.
Finance: authorized invoice -> payment provider -> verified callback -> ledger reconciliation -> receipt -> institution report.
Student safety: restricted report -> authorized safeguarding staff -> documented response -> escalation -> audit; never autonomous disciplinary decisions.

## Core data model (proposed, adapt to actual schema)
Institution, Campus, AcademicYear, Term, GradeOrProgram, Course, Subject, ClassGroup, UserRole, Learner, GuardianRelationship, Staff, Enrollment, Attendance, Lesson, Resource, Assignment, Submission, Assessment, Grade, Moderation, Timetable, Invoice, PaymentReference, Message, Consent, Incident, Portfolio, AuditEvent.
Every record includes institution/tenant scope; enforce object-level access and guardianship verification. Do not rely on client-supplied tenant IDs for authorization.

## Safeguarding and legal requirements
- Children’s personal information: age-appropriate privacy, guardian access verification, consent/legal basis, minimal collection, retention controls and POPIA-aligned policies.
- AI cannot make final decisions about admissions, discipline, grades, safeguarding or financial aid without authorized human review.
- Separate student, teacher, guardian and institutional administrator permissions; prevent cross-school leakage.
- Accessibility: screen-reader labels, keyboard navigation, reduced motion, voice and multilingual support; sign-language video where actually available.
- Never claim integrations to South African government education systems without verified authorization.

## Open-source candidates to evaluate, not automatically install
Moodle (moodle/moodle), Open edX (openedx/edx-platform), H5P (h5p), Frappe Education (frappe/education), Frappe HRMS (frappe/hrms), Cal.com (calcom/cal.com), Jitsi (jitsi/jitsi-meet), LiveKit (livekit/livekit), BigBlueButton (bigbluebutton/bigbluebutton), Nextcloud (nextcloud/server), Docling (docling-project/docling), i18next (i18next/i18next), LibreTranslate (LibreTranslate/LibreTranslate), whisper.cpp (ggml-org/whisper.cpp). Confirm repository, licence, cost and integration fit before adopting.

## Minimum first working release
1. Audit existing Bonga Bhengu App source and shared identity/tenant controls.
2. Institution onboarding with administrator approval.
3. Student/teacher/guardian role permissions.
4. Classes, enrollment, timetable and attendance.
5. Lesson/assignment submission and teacher-reviewed grading.
6. Role-specific dashboard integrated into Bonga Bhengu storefront.
7. Verified notification and audit logs.
8. Automated tenant isolation, permissions, data retention and regression tests.

## Integration contract
Entry: existing Bonga Bhengu App storefront -> Education Partner OS product -> institution workspace.
Shared services: Identity/tenant permissions | AI Command Engine | AI Employees | Technology Gateway/MCP | Execution Ledger | Billing | Files/Media | Notifications.
Never expose the current development-only Creative Studio tenant endpoints as secure production identity. Do not change existing Creative Studio routes unless needed and tested.

## Completion criteria
Real school management and learning workflows work under the single Bonga Bhengu App, with tested access boundaries, teacher-controlled grades, guardian verification, auditable AI actions and a responsive accessible interface. **Not yet implemented or deployed.**
````

## creative-studio/command_engine.py

````python
"""Pure command planning and execution state contracts for the shared Bonga Bhengu backend.

No network calls, credentials, tenant authentication bypass, or live actions.
Wire into authenticated routes only after the existing identity service is connected.
"""
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional
from uuid import uuid4
from datetime import datetime, timezone


class ExecutionStatus(str, Enum):
    DRAFT = "draft"
    AWAITING_APPROVAL = "awaiting_approval"
    APPROVED = "approved"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


SENSITIVE_INTENTS = frozenset({
    "publish_campaign", "send_outreach", "issue_refund",
    "transfer_funds", "deploy_production", "change_account_permissions",
    "modify_business_profile", "place_order",
})

INTENT_EMPLOYEES = {
    "diagnose_business": ("business_scraper", "business_coach", "problem_resolver"),
    "build_website": ("engineer", "branding", "fixer"),
    "create_campaign": ("marketing", "branding", "amplifier"),
    "prepare_quote": ("closer", "money"),
    "investigate_orders": ("workflow", "problem_resolver"),
    "explain_finances": ("money", "business_coach"),
}


@dataclass
class Command:
    tenant_id: str
    requested_by: str
    intent: str
    instruction: str
    idempotency_key: str
    id: str = field(default_factory=lambda: str(uuid4()))
    status: ExecutionStatus = ExecutionStatus.DRAFT
    approved_by: Optional[str] = None
    result: Optional[str] = None
    events: list = field(default_factory=list)

    def __post_init__(self):
        if not all((self.tenant_id, self.requested_by, self.intent,
                    self.instruction.strip(), self.idempotency_key)):
            raise ValueError("Tenant, actor, intent, instruction and idempotency key are required")
        self.record("created")

    @property
    def employees(self):
        return INTENT_EMPLOYEES.get(self.intent, ("business_coach",))

    @property
    def requires_approval(self):
        return self.intent in SENSITIVE_INTENTS

    def record(self, event):
        self.events.append({
            "at": datetime.now(timezone.utc).isoformat(),
            "event": event, "status": self.status.value,
        })

    def prepare(self):
        if self.status != ExecutionStatus.DRAFT:
            raise ValueError("Only draft commands can be prepared")
        self.status = (ExecutionStatus.AWAITING_APPROVAL
                       if self.requires_approval else ExecutionStatus.APPROVED)
        self.record("prepared")

    def approve(self, actor, *, authorized=False):
        if self.status != ExecutionStatus.AWAITING_APPROVAL:
            raise ValueError("Command is not awaiting approval")
        if not actor or not authorized:
            raise PermissionError("Approval requires a verified authorized actor")
        self.approved_by = actor
        self.status = ExecutionStatus.APPROVED
        self.record("approved")

    def start(self, *, authenticated=False, tenant_authorized=False):
        if self.status != ExecutionStatus.APPROVED:
            raise ValueError("Command must be approved before execution")
        if not authenticated or not tenant_authorized:
            raise PermissionError("Verified tenant authorization is required")
        self.status = ExecutionStatus.RUNNING
        self.record("started")

    def finish(self, result, *, verified=False):
        if self.status != ExecutionStatus.RUNNING:
            raise ValueError("Command is not running")
        if not verified:
            raise ValueError("Verified execution evidence is required")
        self.result = result
        self.status = ExecutionStatus.COMPLETED
        self.record("completed")

    def fail(self, reason):
        if self.status not in (ExecutionStatus.RUNNING, ExecutionStatus.APPROVED):
            raise ValueError("Command cannot fail from current state")
        self.result = reason
        self.status = ExecutionStatus.FAILED
        self.record("failed")
````

## creative-studio/test_command_engine.py

````python
"""Tests for command approval, tenancy guards and verified outcomes."""
import unittest
from command_engine import Command, ExecutionStatus


class CommandEngineTests(unittest.TestCase):
    def make(self, intent="diagnose_business"):
        return Command("tenant-a", "user-a", intent, "Help my business", "request-001")

    def test_safe_plan(self):
        c = self.make()
        c.prepare()
        self.assertEqual(c.status, ExecutionStatus.APPROVED)
        self.assertIn("business_scraper", c.employees)

    def test_sensitive_action_requires_approval(self):
        c = self.make("transfer_funds")
        c.prepare()
        self.assertEqual(c.status, ExecutionStatus.AWAITING_APPROVAL)
        with self.assertRaises(ValueError):
            c.start(authenticated=True, tenant_authorized=True)
        with self.assertRaises(PermissionError):
            c.approve("user-a", authorized=False)
        c.approve("admin", authorized=True)
        with self.assertRaises(PermissionError):
            c.start(authenticated=True, tenant_authorized=False)
        c.start(authenticated=True, tenant_authorized=True)
        with self.assertRaises(ValueError):
            c.finish("sent", verified=False)
        c.finish("provider-confirmed", verified=True)
        self.assertEqual(c.status, ExecutionStatus.COMPLETED)

    def test_no_duplicate_preparation(self):
        c = self.make()
        c.prepare()
        with self.assertRaises(ValueError):
            c.prepare()

    def test_missing_identity_rejected(self):
        with self.assertRaises(ValueError):
            Command("", "user", "diagnose_business", "test", "key")


if __name__ == "__main__":
    unittest.main()
````

## chatgpt-site/worker/education-workspace.mjs

````javascript
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
````

## chatgpt-site/worker/builder-projects.mjs

````javascript
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
````

## chatgpt-site/worker/project-merge.mjs

````javascript
import manifest from '../project-sources/merge-manifest.json' with {type:'json'};
import masterArchive from '../project-sources/master-archive.json' with {type:'json'};
export const builderRepositories=[
 {id:'grapesjs',name:'GrapesJS',repository:'https://github.com/GrapesJS/grapesjs',license:'BSD-3-Clause',version:'0.23.6',state:'installed',role:'Visual HTML/CSS website editing',route:'/website-editor.html'},
 {id:'puck',name:'Puck',repository:'https://github.com/puckeditor/puck',license:'MIT',state:'candidate',role:'React page editing; requires a React output adapter'},
 {id:'expo',name:'Expo',repository:'https://github.com/expo/expo',license:'MIT',state:'candidate',role:'Native Android/iOS project builds; requires an Android build worker'},
 {id:'bolt-diy',name:'bolt.diy',repository:'https://github.com/stackblitz-labs/bolt.diy',license:'MIT',state:'candidate',role:'AI coding workspace; separate WebContainer runtime terms apply'},
 {id:'openhands',name:'OpenHands',repository:'https://github.com/OpenHands/OpenHands',license:'MIT core; enterprise paths have separate terms',state:'candidate',role:'Software engineering worker; requires an isolated server'},
 {id:'appsmith',name:'Appsmith',repository:'https://github.com/appsmithorg/appsmith',license:'Apache-2.0 community; commercial features have separate terms',state:'candidate',role:'Internal business applications; requires an external service'}
];
export const sourceMerge={...manifest,masterArchive,builderRepositories,implementation:{education:'Account-private classes, admissions, enrollment, attendance, assignments and human-reviewed grades saved in D1. Institution role sharing is not implemented.',visualWebsiteEditor:'GrapesJS editing, account-private save/load, sandboxed preview and CSP-protected HTML export. Export does not publish a website.',existingApp:'Existing storefront, seller, owner admin, shared AI, Studio, device and MCP routes retained.',pythonModules:'Source and original tests retained. Python backend services are not executed in the Cloudflare Worker.'},coderabbit:{localReview:'not_run',reason:'Agent login returned environment_unsupported; no authenticated local CodeRabbit review.'}};
````

## chatgpt-site/dist/education.html

````html
<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Education Partner OS · Bonga Bhengu App</title><style>
:root{color-scheme:dark;font:16px system-ui;--gold:#d4af37;--line:#34383d}*{box-sizing:border-box}body{margin:0;background:#0b0b0b;color:#fafafa}main{max-width:1150px;margin:auto;padding:24px}h1,h2{color:var(--gold)}a{color:var(--gold)}nav{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}button,input,select,textarea{font:inherit;padding:10px;border-radius:8px;border:1px solid var(--line);background:#161a21;color:#fff}button{cursor:pointer;background:#2f6bff}button:disabled{opacity:.5;cursor:wait}label{display:grid;gap:6px}form{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;align-items:end;padding:18px;border:1px solid var(--line);border-radius:12px;margin:14px 0}form button{align-self:end}table{width:100%;border-collapse:collapse}th,td{text-align:left;border-bottom:1px solid var(--line);padding:12px}.scroll{overflow:auto}section{margin-bottom:30px}.muted{color:#b6becb}#status{min-height:24px}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid var(--gold);outline-offset:3px}@media(max-width:550px){main{padding:14px}form{grid-template-columns:1fr}h1{font-size:26px}}
</style><script type="module" src="/education.js"></script></head><body><main><a href="/app.html#education">Bonga Bhengu App</a><h1>Education Partner OS</h1><p class="muted">Manage your institution, classes and learning records in your account.</p><p id="status" role="status" aria-live="polite">Loading saved records…</p><nav aria-label="Education sections"><a href="#institution">Institution</a><a href="#classes">Classes</a><a href="#learners">Admissions & learners</a><a href="#attendance">Attendance</a><a href="#assignments">Assignments</a><a href="#grades">Reviewed grades</a></nav><p id="summary"></p>
<section id="institution"><h2>Institution</h2><form id="institution-form"><label>Institution name<input name="institutionName" required maxlength="150"></label><label>Academic year<input name="academicYear" required maxlength="30"></label><button>Save institution</button></form></section>
<section id="classes"><h2>Classes</h2><form id="class-form"><label>Class or programme<input name="name" required maxlength="120"></label><button>Add class</button></form><div id="classes-list" class="scroll"></div></section>
<section id="learners"><h2>Admissions & learners</h2><form id="learner-form"><label>Learner name<input name="name" required maxlength="150"></label><label>Class<select name="classId" data-classes required></select></label><label>Enrollment<select name="status"><option>Applicant</option><option>Enrolled</option></select></label><button>Save learner</button></form><div id="learners-list" class="scroll"></div></section>
<section id="attendance"><h2>Attendance</h2><form id="attendance-form"><label>Learner<select name="learnerId" data-learners required></select></label><label>Date<input name="date" type="date" required></label><label>Status<select name="status"><option>Present</option><option>Absent</option><option>Excused</option></select></label><button>Save attendance</button></form><div id="attendance-list" class="scroll"></div></section>
<section id="assignments"><h2>Assignments</h2><form id="assignment-form"><label>Title<input name="title" required maxlength="200"></label><label>Class<select name="classId" data-classes required></select></label><label>Due date<input name="dueDate" type="date" required></label><label>Instructions<textarea name="notes" maxlength="2000"></textarea></label><button>Add assignment</button></form><div id="assignments-list" class="scroll"></div></section>
<section id="grades"><h2>Teacher-reviewed grades</h2><form id="grade-form"><label>Learner<select name="learnerId" data-learners required></select></label><label>Assignment<select name="assignmentId" data-assignments required></select></label><label>Score<input name="score" type="number" min="0" step="0.01" required></label><label>Out of<input name="outOf" type="number" min="0.01" max="10000" step="0.01" value="100" required></label><label>Feedback<textarea name="feedback" maxlength="2000"></textarea></label><button>Review & save grade</button></form><div id="grades-list" class="scroll"></div></section>
<p class="muted">Records belong to your signed-in account. Teacher and guardian sharing require an institution access setup. Grades are entered and reviewed by you.</p><button id="reload" type="button">Reload saved records</button></main></body></html>
````

## chatgpt-site/dist/education.js

````javascript
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
````

## chatgpt-site/dist/website-editor.html

````html
<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Visual Website Editor · Bonga Bhengu App</title><link rel="stylesheet" href="/vendor/grapesjs/grapes.min.css"><style>
:root{color-scheme:dark;font:14px system-ui}*{box-sizing:border-box}body{margin:0;background:#0b0b0b;color:#fff}header{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:12px;border-bottom:1px solid #444}a{color:#d4af37}input,select,button{padding:9px;border:1px solid #555;border-radius:6px;background:#20242d;color:#fff;font:inherit}button{cursor:pointer}button:disabled{opacity:.5;cursor:wait}.primary{background:#2f6bff}#status{margin:0;padding:10px;min-height:37px}#editor{height:calc(100dvh - 155px);min-height:500px}dialog{width:min(1100px,95vw);height:90dvh;background:#111;color:#fff;border:1px solid #d4af37;border-radius:12px}dialog iframe{width:100%;height:calc(100% - 45px);border:0;background:#fff}#preview-close{float:right;margin-bottom:10px}button:focus-visible,a:focus-visible{outline:2px solid #d4af37;outline-offset:3px}@media(max-width:650px){header{gap:6px;padding:8px}input{width:100%}#editor{height:70dvh}.gjs-pn-views-container{width:28%}.gjs-cv-canvas{width:72%}}
</style><script src="/vendor/grapesjs/grapes.min.js"></script><script type="module" src="/website-editor.js"></script></head><body><header><a href="/app.html#visual-website-editor">Bonga Bhengu App</a><strong>Visual website editor</strong><input id="project-name" aria-label="Project name" placeholder="Website project name" maxlength="150" value="My business website"><select id="projects" aria-label="Saved projects"><option value="">New project</option></select><button id="new" type="button">New</button><button id="save" class="primary" type="button">Save</button><button id="preview" type="button">Preview</button><button id="export" type="button">Export HTML</button></header><p id="status" role="status" aria-live="polite">Opening editor…</p><div id="editor"></div><dialog id="preview-dialog"><button id="preview-close" type="button">Close preview</button><iframe id="preview-frame" title="Website preview" sandbox="" referrerpolicy="no-referrer"></iframe></dialog></body></html>
````

## chatgpt-site/dist/website-editor.js

````javascript
const $=id=>document.getElementById(id);let projectId='',revision=0,busy=false,dirty=false;
const safePolicy="default-src 'none'; img-src https: data: blob:; style-src 'unsafe-inline'; font-src https: data:; base-uri 'none'; form-action 'none'; frame-src 'none'";
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const editor=grapesjs.init({container:'#editor',height:'100%',storageManager:false,allowScripts:false,parser:{optionsHtml:{allowScripts:false,allowUnsafeAttr:false}},deviceManager:{devices:[{name:'Desktop',width:''},{name:'Tablet',width:'768px',widthMedia:'992px'},{name:'Phone',width:'375px',widthMedia:'480px'}]},blockManager:{blocks:[
 {id:'hero',label:'Hero',content:'<section style="padding:60px 24px;background:#0b0b0b;color:#fff;text-align:center"><h1 style="color:#d4af37">Your business name</h1><p>Your story. Your offer. Your next chapter.</p></section>'},
 {id:'text',label:'Text',content:'<section style="padding:30px"><h2>About our business</h2><p>Tell your customers what you do and how you help.</p></section>'},
 {id:'services',label:'Services',content:'<section style="padding:30px"><h2>Our services</h2><div style="display:flex;gap:20px;flex-wrap:wrap"><article><h3>Service one</h3><p>Explain your first offer.</p></article><article><h3>Service two</h3><p>Explain your second offer.</p></article></div></section>'},
 {id:'image',label:'Image',content:{type:'image'}},
 {id:'contact',label:'Contact',content:'<footer style="padding:30px;background:#171717;color:#fff"><h2>Contact us</h2><p>Add your public contact details here.</p></footer>'}
]}});
const starter='<main><section style="padding:60px 24px;background:#0b0b0b;color:#fff;text-align:center"><h1 style="color:#d4af37">Your business name</h1><p>Build a website that tells your story.</p></section><section style="padding:30px"><h2>What we do</h2><p>Edit this section, then drag more blocks into your page.</p></section></main>';
editor.on('update',()=>{dirty=true;});editor.setComponents(starter);dirty=false;
function output(){return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="'+esc(safePolicy)+'"><title>'+esc($('project-name').value)+'</title><style>'+editor.getCss().replaceAll('</style','<\\/style')+'</style></head><body>'+editor.getHtml()+'</body></html>';}
function controls(){editor.getContainer().inert=busy;$('project-name').disabled=busy;for(const id of ['save','new','projects','preview','export'])$(id).disabled=busy;}
async function list(){const r=await fetch('/api/builder/projects',{cache:'no-store'}),data=await r.json();if(!r.ok)throw Error(data.error||'Saved projects could not be loaded.');const option=document.createElement('option');option.value='';option.textContent='New project';$('projects').replaceChildren(option);for(const row of data.projects){const o=document.createElement('option');o.value=row.id;o.textContent=row.name;$('projects').append(o);}$('projects').value=projectId;}
$('project-name').addEventListener('input',()=>{dirty=true;});
$('save').onclick=async()=>{if(busy)return;if(!$('project-name').value.trim()){$('status').textContent='Enter a project name.';return;}busy=true;controls();try{const body={name:$('project-name').value,projectData:editor.getProjectData(),html:editor.getHtml(),css:editor.getCss(),revision};const r=await fetch('/api/builder/projects'+(projectId?'/'+projectId:''),{method:projectId?'PUT':'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}),data=await r.json();if(!r.ok)throw Error(data.error||'Save failed.');projectId=data.id;revision=data.revision;dirty=false;$('status').textContent='Website saved to your account.';await list();}catch(e){$('status').textContent=e.message;}finally{busy=false;controls();}};
$('projects').onchange=async()=>{if(busy)return;const selected=$('projects').value;if(dirty&&!confirm('Open another project and discard unsaved edits?')){$('projects').value=projectId;return;}if(!selected){newProject();return;}busy=true;controls();try{const r=await fetch('/api/builder/projects/'+selected,{cache:'no-store'}),data=await r.json();if(!r.ok)throw Error(data.error||'Project could not be loaded.');editor.loadProjectData(data.projectData);$('project-name').value=data.name;projectId=data.id;revision=data.revision;dirty=false;$('status').textContent='Saved website opened.';}catch(e){$('status').textContent=e.message;$('projects').value=projectId;}finally{busy=false;controls();}};
function newProject(){projectId='';revision=0;editor.loadProjectData({pages:[{component:starter}],styles:[],assets:[]});$('project-name').value='My business website';$('projects').value='';dirty=false;$('status').textContent='New website draft. Drag blocks into the page, edit and save.';}
$('new').onclick=()=>{if(!dirty||confirm('Start a new project and discard unsaved edits?'))newProject();};
$('preview').onclick=()=>{$('preview-frame').srcdoc=output();$('preview-dialog').showModal();};$('preview-close').onclick=()=>{$('preview-dialog').close();$('preview-frame').srcdoc='';};
$('export').onclick=()=>{const url=URL.createObjectURL(new Blob([output()],{type:'text/html'})),a=document.createElement('a');a.href=url;a.download='website.html';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('status').textContent='HTML exported. Review the website before publishing.';};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
try{await list();$('status').textContent='Drag blocks, edit, save, preview and export your website.';}catch(e){$('status').textContent=e.message;}
````

## chatgpt-site/tests/education-workspace.mjs

````javascript
import assert from 'node:assert/strict';
import {educationWorkspace,validateEducation} from '../worker/education-workspace.mjs';
const rows=new Map();
const DB={prepare(sql){return {bind(...v){return {async first(){return rows.get(v[0])||null;},async run(){if(sql.startsWith('INSERT')){const [user,payload,now]=v;if(rows.has(user))return {meta:{changes:0}};rows.set(user,{payload,revision:1,updated_at:now});return {meta:{changes:1}};}const [payload,now,user,revision]=v;const row=rows.get(user);if(row?.revision!==revision)return {meta:{changes:0}};rows.set(user,{payload,revision:revision+1,updated_at:now});return {meta:{changes:1}};}};}};}};
const req=(user='a',method='GET',body,origin='https://site.example')=>new Request('https://site.example/api/education/workspace',{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),'content-type':'application/json',origin},...(body!==undefined?{body:JSON.stringify(body)}:{})});
const run=(...args)=>educationWorkspace(req(...args),{DB});
const payload={institutionName:'School <script>',academicYear:'2026',classes:[{id:'class-a',name:'Grade 9'}],learners:[{id:'learner-a',name:'Learner',classId:'class-a',status:'Enrolled'}],assignments:[{id:'assignment-a',title:'Fashion technology',classId:'class-a',dueDate:'2026-10-20',notes:''}],attendance:[{id:'attendance-a',learnerId:'learner-a',date:'2026-10-10',status:'Present'}],grades:[{id:'grade-a',learnerId:'learner-a',assignmentId:'assignment-a',score:70,outOf:100,feedback:'Reviewed by teacher',reviewedBy:'forged'}]};
assert.equal((await run('')).status,401);assert.equal((await run('a','PUT',{payload,revision:0},'https://other.example')).status,403);assert.equal((await run('a','PUT',null)).status,400);
assert.equal((await run('a','PUT',{payload,revision:0})).status,200);const saved=await (await run()).json();assert.equal(saved.revision,1);assert.equal(saved.payload.grades[0].reviewedBy,'a');assert.ok(saved.payload.grades[0].reviewedAt);assert.equal(saved.payload.audit[0].actor,'a');
assert.equal((await (await run('b')).json()).payload,null,'Other accounts cannot read school records');
assert.equal((await run('a','PUT',{payload,revision:0})).status,409,'Stale writes cannot replace newer data');
assert.equal((await run('a','PUT',{payload,revision:1})).status,200);const unchanged=await (await run()).json();assert.equal(unchanged.payload.grades[0].reviewedAt,saved.payload.grades[0].reviewedAt);
const invalid=structuredClone(payload);invalid.grades[0].score=101;assert.throws(()=>validateEducation(invalid),/grade/);invalid.grades[0].score=80;invalid.learners[0].classId='missing';assert.throws(()=>validateEducation(invalid),/learner/);
const duplicate=structuredClone(payload);duplicate.attendance.push({...duplicate.attendance[0],id:'different'});assert.throws(()=>validateEducation(duplicate),/one record/);
const wrongDate=structuredClone(payload);wrongDate.assignments[0].dueDate='2026-02-30';assert.throws(()=>validateEducation(wrongDate),/due date/);
console.log('PASS school persistence, account isolation, revision conflicts, same-origin writes, cross-record validation and server-stamped grading audit');
````

## chatgpt-site/tests/builder-projects.mjs

````javascript
import assert from 'node:assert/strict';
import {builderProjects,cleanBuilderProject} from '../worker/builder-projects.mjs';
const rows=new Map(),id='12345678-abcd-1234-abcd-123456789abc';
const DB={prepare(sql){return {bind(...v){return {async all(){return {results:[...rows.values()].filter(r=>r.user===v[0]).map(({id,name,revision,updated_at})=>({id,name,revision,updated_at}))};},async first(){if(sql.includes('COUNT'))return {total:[...rows.values()].filter(r=>r.user===v[0]).length};return rows.get(v[0]+':'+v[1])||null;},async run(){if(sql.startsWith('INSERT')){const [id,user,name,payload,now]=v;rows.set(user+':'+id,{id,user,name,payload,revision:1,updated_at:now});return {meta:{changes:1}};}const [name,payload,now,user,id,revision]=v;const row=rows.get(user+':'+id);if(!row||row.revision!==revision)return {meta:{changes:0}};Object.assign(row,{name,payload,updated_at:now,revision:revision+1});return {meta:{changes:1}};}};}};}};
const req=(user='a',method='GET',body,path='',origin='https://site.example')=>new Request('https://site.example/api/builder/projects'+path,{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),'content-type':'application/json',origin},...(body!==undefined?{body:JSON.stringify(body)}:{})});
const run=(...args)=>builderProjects(req(...args),{DB});
const p={name:'Business website',projectData:{pages:[{component:'<h1>Business</h1>'}],styles:[]},html:'<h1>Business</h1>',css:'h1{color:gold}'};
assert.equal((await run('')).status,401);assert.equal((await run('a','POST',p,'','https://other.example')).status,403);assert.equal((await run('a','POST',null)).status,400);
const result=await run('a','POST',p);assert.equal(result.status,201);const created=await result.json(),path='/'+created.id;
assert.equal((await run('b','GET',undefined,path)).status,404,'Other accounts cannot read projects');assert.equal((await (await run('b')).json()).projects.length,0);
assert.equal((await run('a','PUT',{...p,revision:1},path)).status,200);assert.equal((await run('a','PUT',{...p,revision:1},path)).status,409,'Stale project updates cannot overwrite newer work');
assert.equal((await run('b','PUT',{...p,revision:2},path)).status,409,'Other account cannot alter projects');const stored=await (await run('a','GET',undefined,path)).json();assert.equal(stored.revision,2);assert.equal(stored.html,p.html);
assert.throws(()=>cleanBuilderProject({...p,html:'a'.repeat(200001)}),/large/);assert.throws(()=>cleanBuilderProject({...p,name:''}),/name/);
console.log('PASS website save/load, account isolation, optimistic revisions, same-origin authorization and project size checks');
````

## Source inventory

```json
{
  "parent": "Bonga Bhengu App",
  "existingSiteBaseline": "f910bbecc2a60244bb6641787482aa64147c39f9",
  "githubBaseline": "bd28dcdbd57344900ae2625351afd82a5f14c307",
  "libraryArtifacts": 79,
  "additionalOsArtifacts": 2,
  "githubSources": 138,
  "scope": "All sources resolved by the current 79-artifact project ledger, two OS package artifacts and all accessible GitHub project branch additions. ChatGPT project attachment membership is not exposed; this does not certify all 99 attachments. Original files are retained in source, not served as public executable pages.",
  "files": [
    {
      "name": "AI_Business_Intelligence_Platform_Solution.md",
      "path": "project-sources/library/AI_Business_Intelligence_Platform_Solution.md",
      "origin": "library",
      "sha256": "88d7de1d80e27fdd48c57961d06865e1d077fac33bc4dd3898097aa388ae4dc4",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "learning"
      ]
    },
    {
      "name": "AI_Enterprise_Intelligence_Workplace_Detailed_Business_Plan_FULL.docx",
      "path": "project-sources/library/AI_Enterprise_Intelligence_Workplace_Detailed_Business_Plan_FULL.docx",
      "origin": "library",
      "sha256": "c7b2fcf3c3f6b546b0fe19c77df72da2aab7ce27a534ecf6f6a84808114bb9b6",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Bonga_Bhengu_14_Oct_Work_Handoff.md",
      "path": "project-sources/library/Bonga Bhengu app/Bonga_Bhengu_14_Oct_Work_Handoff.md",
      "origin": "library",
      "sha256": "8922db5fa727493e0975ccc95a334b3ce70b43e929837ec528849ebafc499da9",
      "originalHashMatched": true,
      "disposition": "apply",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Bonga_Bhengu_App_4_Packages.docx",
      "path": "project-sources/library/Bonga Bhengu app/Bonga_Bhengu_App_4_Packages.docx",
      "origin": "library",
      "sha256": "44967e9f347d2aece09d9106d2aef97cf1aae112f21229c19221baa768705608",
      "originalHashMatched": true,
      "disposition": "proposal only",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "execution",
        "governance"
      ]
    },
    {
      "name": "Bonga_Bhengu_Fashion_OS.html",
      "path": "project-sources/library/Bonga_Bhengu_Fashion_OS.html",
      "origin": "library",
      "sha256": "ac416c2a074d3c53c2fdad7fb7bc5c83c0111ae00eb0c4a5b769bbd45c36a3bf",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Connected_Enterprise_Intelligence_Architecture_FULL.md",
      "path": "project-sources/library/Connected_Enterprise_Intelligence_Architecture_FULL.md",
      "origin": "library",
      "sha256": "cb7ad7794e5cb3fb2639937ad5324fef2c6983aa17fcbcc042f980690883dc9d",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Fukulisane_Business_Identity_and_Growth_Builder_Spec(1).md",
      "path": "project-sources/library/Fukulisane_Business_Identity_and_Growth_Builder_Spec(1).md",
      "origin": "library",
      "sha256": "9827f1808fa866b1a3d2ae35a1ed86692e6e92f61701faa0229752f208e323d6",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning"
      ]
    },
    {
      "name": "Fukulisane_Business_Identity_and_Growth_Builder_Spec.md",
      "path": "project-sources/library/Fukulisane_Business_Identity_and_Growth_Builder_Spec.md",
      "origin": "library",
      "sha256": "9827f1808fa866b1a3d2ae35a1ed86692e6e92f61701faa0229752f208e323d6",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning"
      ]
    },
    {
      "name": "Fukulisane_One_Master_Concept_Architecture.md",
      "path": "project-sources/library/Fukulisane_One_Master_Concept_Architecture.md",
      "origin": "library",
      "sha256": "c9e31e3668cce819c52c0e95d832b703d7a71dfd756433c608ad05976b0d4358",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(1).md",
      "path": "project-sources/library/Pasted markdown(1).md",
      "origin": "library",
      "sha256": "52cd50ebc3ebe149a530ef244227955a152c2e866166eaae18eb96c8371939c7",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(10).md",
      "path": "project-sources/library/Pasted markdown(10).md",
      "origin": "library",
      "sha256": "0e0432ca3a851edc974afad0dfcfea31d89b04cffa124df27eb581e404c52c15",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(2).md",
      "path": "project-sources/library/Pasted markdown(2).md",
      "origin": "library",
      "sha256": "a0d1cc668834792c85cade9fbef4f88d45cabfadd8780278b1a76fd2b7212f13",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(3).md",
      "path": "project-sources/library/Pasted markdown(3).md",
      "origin": "library",
      "sha256": "073f5de4783d37b58e7e375a69d294d24161a5e053b4deb703d68eb197dd2d75",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(4).md",
      "path": "project-sources/library/Pasted markdown(4).md",
      "origin": "library",
      "sha256": "d77037d091ae18a6f715b1542f6a5fde66b7b8c2a7048e0a829cf44ddf2df111",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(5).md",
      "path": "project-sources/library/Pasted markdown(5).md",
      "origin": "library",
      "sha256": "58869a3243de8b9cdfef9a4d35b5325ff80e8009cc2c9db49d2fe16d026449bc",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(6).md",
      "path": "project-sources/library/Pasted markdown(6).md",
      "origin": "library",
      "sha256": "e8be75ebe39022e77f33778923da005d82ac1af4051e3bf71a55219715dba169",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(7).md",
      "path": "project-sources/library/Pasted markdown(7).md",
      "origin": "library",
      "sha256": "5732a67518173ebb6eb47cc3c118c80c3f2affbd74e413c3f7c6090406a93a04",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(8).md",
      "path": "project-sources/library/Pasted markdown(8).md",
      "origin": "library",
      "sha256": "5732a67518173ebb6eb47cc3c118c80c3f2affbd74e413c3f7c6090406a93a04",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown(9).md",
      "path": "project-sources/library/Pasted markdown(9).md",
      "origin": "library",
      "sha256": "5732a67518173ebb6eb47cc3c118c80c3f2affbd74e413c3f7c6090406a93a04",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted markdown.md",
      "path": "project-sources/library/Pasted markdown.md",
      "origin": "library",
      "sha256": "52cd50ebc3ebe149a530ef244227955a152c2e866166eaae18eb96c8371939c7",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(1).txt",
      "path": "project-sources/library/Pasted text(1).txt",
      "origin": "library",
      "sha256": "6ff243741f23a86817dfac8f115716823e9fd138e63ebfcb51970bc92bae566f",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(2).txt",
      "path": "project-sources/library/Pasted text(2).txt",
      "origin": "library",
      "sha256": "8b81e424a1f1ad1ebbfa194ebd175bdcc1e921525e2a19cbbbe8b9f687751813",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(3).txt",
      "path": "project-sources/library/Pasted text(3).txt",
      "origin": "library",
      "sha256": "b35789c4eb97acbbd4cfbd6e1e1911e8c6e0c15f3feeb98410f8e60b72865f75",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(4).txt",
      "path": "project-sources/library/Pasted text(4).txt",
      "origin": "library",
      "sha256": "fb0f48fba330189b08d380bc8e757edd52d8fda736f9b60ff39bf8729c488a8c",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(5).txt",
      "path": "project-sources/library/Pasted text(5).txt",
      "origin": "library",
      "sha256": "23494a782cbfd8de9171d44734976fce8060376e5befedd57565cc0c2b1dac75",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "connections",
        "strategy",
        "sales",
        "studio",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(6).txt",
      "path": "project-sources/library/Pasted text(6).txt",
      "origin": "library",
      "sha256": "51f7a8e2813d4afcf5b1dff745931e5b66b6edc84f941e90b34ee8481c861279",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(7).txt",
      "path": "project-sources/library/Pasted text(7).txt",
      "origin": "library",
      "sha256": "c754bd4843002b72a7904e2a761af943001023a3fd0be7fc7f1d38b7e0afee70",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "fashion",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text(8).txt",
      "path": "project-sources/library/Pasted text(8).txt",
      "origin": "library",
      "sha256": "95cd63830da0a8e894fcb646f2aad502aeaebc8a9325522de58a3eee958fbb22",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Pasted text.txt",
      "path": "project-sources/library/Pasted text.txt",
      "origin": "library",
      "sha256": "6ff243741f23a86817dfac8f115716823e9fd138e63ebfcb51970bc92bae566f",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_ALIGNED_PUBLIC_APP.tar.gz",
      "path": "project-sources/library/ZUXURU_ALIGNED_PUBLIC_APP.tar.gz",
      "origin": "library",
      "sha256": "acf81cf06e027d881fa768579a4f8b9dd98c18b4c2f4fca318fd1bf567994609",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_APP_MVP.zip",
      "path": "project-sources/library/ZUXURU_APP_MVP.zip",
      "origin": "library",
      "sha256": "fdbceefc6a2badcf3e42b0ee81425804d0309f1e2563007e965d37fa06e1136f",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_FINAL_BUILD_README.md",
      "path": "project-sources/library/ZUXURU_FINAL_BUILD_README.md",
      "origin": "library",
      "sha256": "776201477b4ea36b64ac590fbcac949bc9b6d72e45055388fbd915b5afc73413",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "connections",
        "sales",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_FINAL_MASTER_BUILD_FILES.zip",
      "path": "project-sources/library/ZUXURU_FINAL_MASTER_BUILD_FILES.zip",
      "origin": "library",
      "sha256": "e3a6ebb59cd2d305269593a6a0301b3ec46b13fac3ceabef52e25d1fafe20961",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_FINAL_MASTER_BUILD_SPEC.md",
      "path": "project-sources/library/ZUXURU_FINAL_MASTER_BUILD_SPEC.md",
      "origin": "library",
      "sha256": "2acfe9b486ffb8254bc7b79927df92bf3e115499ade33891439547d191eed151",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_IMPLEMENTATION_BLUEPRINT.md",
      "path": "project-sources/library/ZUXURU_IMPLEMENTATION_BLUEPRINT.md",
      "origin": "library",
      "sha256": "d12539b0bde2124a9ff4337e1e49acfe756ec1fecc57a77f3f069f3c57c0857a",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_INTEGRATION_MATRIX.md",
      "path": "project-sources/library/ZUXURU_INTEGRATION_MATRIX.md",
      "origin": "library",
      "sha256": "765969457314b33d123b7a12e61646f74766560503c6d078b9b3b398863ac002",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_Master_App_Build_Alignment_Specification.md",
      "path": "project-sources/library/ZUXURU_Master_App_Build_Alignment_Specification.md",
      "origin": "library",
      "sha256": "f0c142b4c8c37c9575af4e362cc150c9184aea0cfba1f3e4b472d703505f7649",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "ZUXURU_USABLE_MVP.zip",
      "path": "project-sources/library/ZUXURU_USABLE_MVP.zip",
      "origin": "library",
      "sha256": "4e5d83be4a8bfe0d189a859188164ccd02a454e5faed62fa5ebc059af971d415",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru-Phase1-Foundation.zip",
      "path": "project-sources/library/Zuxuru-Phase1-Foundation.zip",
      "origin": "library",
      "sha256": "533d87a6511f06ac22e1bfec3de8ee5d7c471946c216a665472d013dfec857bf",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "studio",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "Zuxuru1_real-execution-build.zip",
      "path": "project-sources/library/Zuxuru1_real-execution-build.zip",
      "origin": "library",
      "sha256": "9e8ac1c5e77a3790fb74877a7a4e0ee21b91cbb138e779c795eb012d869e7387",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Build_Spec_Files.zip",
      "path": "project-sources/library/Zuxuru_Build_Spec_Files.zip",
      "origin": "library",
      "sha256": "6d6508fd806ebbe60d0e65c89831a41b8ef25e10d472af62ffe14767a912515a",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Business_Visibility_Station_Builder(1).html",
      "path": "project-sources/library/Zuxuru_Business_Visibility_Station_Builder(1).html",
      "origin": "library",
      "sha256": "215a302ac4b4666d8cd812b86cd4857f23a2a2534fbcd787abbe9ac47d43461e",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Business_Visibility_Station_Builder.html",
      "path": "project-sources/library/Zuxuru_Business_Visibility_Station_Builder.html",
      "origin": "library",
      "sha256": "215a302ac4b4666d8cd812b86cd4857f23a2a2534fbcd787abbe9ac47d43461e",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Business_Visibility_Station_Builder_Spec.md",
      "path": "project-sources/library/Zuxuru_Business_Visibility_Station_Builder_Spec.md",
      "origin": "library",
      "sha256": "fab3ce97d18c1ddba922fb9936f70defe33f9dc3d7cc49c435ef27544ed86179",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Fashion_Design.docx",
      "path": "project-sources/library/Zuxuru_Fashion_Design.docx",
      "origin": "library",
      "sha256": "e336efb07f5e0d5d2bcb0c53650c7771aaedab46842801ad778934748fbd913a",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "connections",
        "sales",
        "studio",
        "builder",
        "fashion",
        "learning"
      ]
    },
    {
      "name": "Zuxuru_Fukulisane_Alignment_Master_File.md",
      "path": "project-sources/library/Zuxuru_Fukulisane_Alignment_Master_File.md",
      "origin": "library",
      "sha256": "11041cc7df1e2f0985d3f2fd77d9cd829b0be4c0b188d86ef91a86b3c6aa1822",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Mall_BusinessTree_Fashion_Builder_Packages_Master.docx",
      "path": "project-sources/library/Zuxuru_Mall_BusinessTree_Fashion_Builder_Packages_Master.docx",
      "origin": "library",
      "sha256": "30d859585a8a2c3c592a3465d5b4e035360cf9245e524ec2118632cca47069a1",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Master_Builder.txt",
      "path": "project-sources/library/Zuxuru_Master_Builder.txt",
      "origin": "library",
      "sha256": "b366848de2a29defb5e4d416221c9602b685c098fdf85b346df07f07aea8c535",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Shogo_Master_Build_Instructions.md",
      "path": "project-sources/library/Zuxuru_Shogo_Master_Build_Instructions.md",
      "origin": "library",
      "sha256": "fcf7aeaa7e939e7c019875708b8adeae0b3650101343cd733c54c94901c42ea5",
      "originalHashMatched": true,
      "disposition": "reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "Zuxuru_Storefront.zip",
      "path": "project-sources/library/Zuxuru_Storefront.zip",
      "origin": "library",
      "sha256": "46ab0f2a825e770a0393d144385a1ab390c3a4c4528c749a4ed06db2d0abc4cc",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "studio",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "app.html",
      "path": "project-sources/library/app.html",
      "origin": "library",
      "sha256": "50f3d2496365d5be8b9f0158a392aa7c5905feda88c3a3d67098723c8aecc17a",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisane-app.zip",
      "path": "project-sources/library/fukulisane-app.zip",
      "origin": "library",
      "sha256": "fdb4a681d40ae98d831927e81301bab370176229f74d317db9b1c0661e945ca0",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "governance"
      ]
    },
    {
      "name": "fukulisane-construction-platform-history.zip",
      "path": "project-sources/library/fukulisane-construction-platform-history.zip",
      "origin": "library",
      "sha256": "feea0c1a7c2caaae58eca06de6d65cee67454e695d1b10ea0fd10279aa08861b",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisane-live-netlify.zip",
      "path": "project-sources/library/fukulisane-live-netlify.zip",
      "origin": "library",
      "sha256": "092c63af67ba53793222d693d6e9e306905566828a4b4ba51de52153649bdc06",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisane-mvp.zip",
      "path": "project-sources/library/fukulisane-mvp.zip",
      "origin": "library",
      "sha256": "62d9ac763b00c6dd321cef34a8447da3b76a15c21d5d5005b04d4eceb9665bbf",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "sales",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "fukulisane_one_history_derived.zip",
      "path": "project-sources/library/fukulisane_one_history_derived.zip",
      "origin": "library",
      "sha256": "1a5c819078b5754713fbc4f3104b46c9330094abdfdc25961bdb9421cf0158cf",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisaneconstruction-connected.zip",
      "path": "project-sources/library/fukulisaneconstruction-connected.zip",
      "origin": "library",
      "sha256": "ca90881a3734881cf4e19e1a20ca5ea3d668ebec46a4dbaafa28cf765f4d3354",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "connections",
        "sales",
        "builder",
        "governance"
      ]
    },
    {
      "name": "fukulisani-agent-os-handoff.zip",
      "path": "project-sources/library/fukulisani-agent-os-handoff.zip",
      "origin": "library",
      "sha256": "13e24148746d2c2b2fb9fbe484eaf800d26a1c54cdfd896eac0f08fe73c92c81",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisani-app-option3.tar.gz",
      "path": "project-sources/library/fukulisani-app-option3.tar.gz",
      "origin": "library",
      "sha256": "6314c5294eb317e9afaabf04e86bd5bfcfc0491cd583b06de0de4d323ba9956d",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisani-app.tar.gz",
      "path": "project-sources/library/fukulisani-app.tar.gz",
      "origin": "library",
      "sha256": "c2db3311bf0b4c092615d626f5501432409f920fa7c9c10c57ce1db27327d7ab",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "fukulisneconstruction-ready.zip",
      "path": "project-sources/library/fukulisneconstruction-ready.zip",
      "origin": "library",
      "sha256": "a6ddec4725235adf8926e8b9c497605a2a69fb8876cbdfddfcaffc1b996e9c33",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "connections",
        "builder",
        "governance"
      ]
    },
    {
      "name": "index(1).html",
      "path": "project-sources/library/index(1).html",
      "origin": "library",
      "sha256": "dd96bee79c0e16f41f18c12446f8b2596379f12970285a8233fc4927e9753748",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "index(2).html",
      "path": "project-sources/library/index(2).html",
      "origin": "library",
      "sha256": "538537bde3abf4bd4ad5aa4542b1e4cc7fa40734a51083d007fe8d70a96cdf72",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "index(3).html",
      "path": "project-sources/library/index(3).html",
      "origin": "library",
      "sha256": "ed2ad501c0b3a416c7372668ab7bb8c06d86cc515bbfa9dc41039e138811a6dd",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "index(4).html",
      "path": "project-sources/library/index(4).html",
      "origin": "library",
      "sha256": "ed2ad501c0b3a416c7372668ab7bb8c06d86cc515bbfa9dc41039e138811a6dd",
      "originalHashMatched": true,
      "disposition": "duplicate reference",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "index(5).html",
      "path": "project-sources/library/index(5).html",
      "origin": "library",
      "sha256": "0970fd117543f7b7bd5c73645fecfba505b66dc5204177d7bdcde6f1ab245b16",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "index(6).html",
      "path": "project-sources/library/index(6).html",
      "origin": "library",
      "sha256": "c8a3eceec0f810fb4fd8c4dc733d7f33070a82622c175b06e1f05a105c246a9c",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder"
      ]
    },
    {
      "name": "index(7).html",
      "path": "project-sources/library/index(7).html",
      "origin": "library",
      "sha256": "cb7d1aca96ee80763d70fcf8bd9d34a0133d34ca339bebcd708827b768ca839f",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder"
      ]
    },
    {
      "name": "index(8).html",
      "path": "project-sources/library/index(8).html",
      "origin": "library",
      "sha256": "87e2d903017dd99a22e2118e1010beb1718685b3e0a64f61c3222a5559255f8e",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "index.html",
      "path": "project-sources/library/index.html",
      "origin": "library",
      "sha256": "b7eec574bc896a7724a1d7a9f21755ee45592554dceea9f3d7bd627699fce6b8",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "builder",
        "fashion",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "open-source-image-to-app-builder.zip",
      "path": "project-sources/library/open-source-image-to-app-builder.zip",
      "origin": "library",
      "sha256": "f54c5936b0952bc7771432782ab9bd9f5878636bccb829f720bdaad45f4d818d",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "builder",
        "governance"
      ]
    },
    {
      "name": "zuxuru-digital-studio-repository.zip",
      "path": "project-sources/library/zuxuru-digital-studio-repository.zip",
      "origin": "library",
      "sha256": "27ba26e3779b8939cc1d32fb8b5d2d2cb623c8a678f36302b0530b27e22b1b60",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "zuxuru-engine.zip",
      "path": "project-sources/library/zuxuru-engine.zip",
      "origin": "library",
      "sha256": "7c8666e91de9e2bb030a48a90ffd0c9983f8446964cfe999dbbd1eb103e8c948",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "zuxuru-galleria-evidence-module.zip",
      "path": "project-sources/library/zuxuru-galleria-evidence-module.zip",
      "origin": "library",
      "sha256": "c06dd68475c2f9ad3b7eaf9839cb97ab9f25b9771f6c2c09363d4bcf4c684210",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "visibility",
        "connections",
        "strategy",
        "sales",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "zuxuru-growth-engine-mvp.zip",
      "path": "project-sources/library/zuxuru-growth-engine-mvp.zip",
      "origin": "library",
      "sha256": "68884ee63e21aa84f419e14dc019024b9012bbb5dab0b1262f59a738fa60ccc4",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "zuxuru-investigation-platform.zip",
      "path": "project-sources/library/zuxuru-investigation-platform.zip",
      "origin": "library",
      "sha256": "1916399662e7330c443f23d38c5d071fa2ece3db8c3532b82ee21cdff04cbba8",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "zuxuru-render-ready.zip",
      "path": "project-sources/library/zuxuru-render-ready.zip",
      "origin": "library",
      "sha256": "397997d9d373ef67514ae5467108b6c38d641afa06a6cdbfca3a7879a6c2e261",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "sales",
        "studio",
        "builder",
        "execution",
        "governance"
      ]
    },
    {
      "name": "zuxuru-storefront-v0.1.zip",
      "path": "project-sources/library/zuxuru-storefront-v0.1.zip",
      "origin": "library",
      "sha256": "912a51bf3a703d0d0f8c4a495ac8bae64d851515267a6ae0482a951afe19c5b5",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "strategy",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "zuxuru-storefront.zip",
      "path": "project-sources/library/zuxuru-storefront.zip",
      "origin": "library",
      "sha256": "9cc7f3b4a7f2c761bb09318d7d013d4c31101752a8a1f5c9c3801d4e17b2e760",
      "originalHashMatched": true,
      "disposition": "adapt after verification",
      "modules": [
        "identity",
        "visibility",
        "connections",
        "studio",
        "execution",
        "learning",
        "governance"
      ]
    },
    {
      "name": "bonga-bhengu-app.zip",
      "path": "project-sources/library/os/bonga-bhengu-app.zip",
      "origin": "library/os",
      "sha256": "f410702c7e0286f56837bd933e2b653dad20c0821d8340ab330638f9d7dc4662",
      "disposition": "already adapted into app workspace"
    },
    {
      "name": "index.html",
      "path": "project-sources/library/os/index.html",
      "origin": "library/os",
      "sha256": "2bd555d617475c3b33455d46fb2dbae3e2f220709f86ebf5f28e85d7bcc10e97",
      "disposition": "already adapted into app workspace"
    },
    {
      "name": ".github/workflows/studio-check.yml",
      "path": "project-sources/github/.github/workflows/studio-check.yml",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "7a1dcc72490652d52d05b378bcea7377d7bcb36f58a4e0dd67a6ab31a6ce2620",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "ALIGNMENT_AUDIT_2026-10-10.md",
      "path": "project-sources/github/ALIGNMENT_AUDIT_2026-10-10.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0674ddd2d3ae51d6c49ed15b75e64cea12c0799cea97889b6a7f76dc248b832d",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "MODULES.md",
      "path": "project-sources/github/MODULES.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "7d589ca2337761d1973f664f433c26db4733702ffa7e63767ea69fbe3109dc03",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "README.md",
      "path": "project-sources/github/README.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "fd990ab0cf9d9cb7305878c7df31d4185d736c5df7c6c33d003e292d200b3ef2",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/.gitignore",
      "path": "project-sources/github/creative-studio/.gitignore",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "22ac2424d653830105ba9467215ab3cb4001e1f9aece7319e00d5aaef2dc1c43",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/Dockerfile",
      "path": "project-sources/github/creative-studio/Dockerfile",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "562bdf5d88059567858b772e45445733cae073beac71243f2e81e40d861f9381",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/SECURITY.md",
      "path": "project-sources/github/creative-studio/SECURITY.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "cc25f143d85757b724f1406eb8187bbafe8ce8fca79859623a4beada431fe689",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/WORKERS.md",
      "path": "project-sources/github/creative-studio/WORKERS.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "ea2f189d7a16bae3d6f7b535e9f5c8d89b66910f7d5939052206ef9abc842b57",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/animation.py",
      "path": "project-sources/github/creative-studio/animation.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "b32aeeac85c32f2603e25762c8f813aaa1b6b3938c1b5116ba7cdcf8961ce003",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/app.py",
      "path": "project-sources/github/creative-studio/app.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "30ed610f09637bc61874a8d2b42d2ad634ade891e90c6fc3f92162302e2ff3af",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/camera-preview.html",
      "path": "project-sources/github/creative-studio/camera-preview.html",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "596f47adc2aeb5b0b99301f72c00506eba11c26336ecfabf43e2b452e4dc8edf",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/command_engine.py",
      "path": "project-sources/github/creative-studio/command_engine.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e12124d4bb18027ed4c5150d67a67406e548e4271f344f7a205436537f69e9dc",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/connections.py",
      "path": "project-sources/github/creative-studio/connections.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1a84133dcc424d8fc9803f22241b63fbc8d02f028861d4a5d4c6654c20229fd8",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/device_modules.py",
      "path": "project-sources/github/creative-studio/device_modules.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1732ec81d6778a757897c252aac4f0b4060e129a487416d2a583beb47a397569",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/fashion_runway.py",
      "path": "project-sources/github/creative-studio/fashion_runway.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "48865c2a681d597b602da3d2ea979e31149b3524d31d1f31285cf66b2dec724c",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/requirements.txt",
      "path": "project-sources/github/creative-studio/requirements.txt",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "ac94048c841eb04e441ad228dd9ef73b7aca021c7431b775787c8461dd39db9a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/test_command_engine.py",
      "path": "project-sources/github/creative-studio/test_command_engine.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "f4ffea8cd900196047ad057f220b1f1b8d1c4807163316ed6d966310a6be5e35",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/tests/test_worker_router.py",
      "path": "project-sources/github/creative-studio/tests/test_worker_router.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "85f473544d03af0668cf8bdac5c0eedc2536e08be51239709506daa2bc3de9ea",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "creative-studio/worker_router.py",
      "path": "project-sources/github/creative-studio/worker_router.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "c99e2a798ff90cc0f8701de86f36859f0bedcf64b043ce7b258490a954da830b",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "design-system/legendary-luxury.css",
      "path": "project-sources/github/design-system/legendary-luxury.css",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "45b178ababede0af8af763b4f900ceb5e7d2e52fbddc76d115bd6d5bd4c647f7",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "design-system/smart-tech-os.css",
      "path": "project-sources/github/design-system/smart-tech-os.css",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "56eae7d9d42a393b3def32535631305e392653da9317f391e6a0abdac8e27043",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docker-compose.yml",
      "path": "project-sources/github/docker-compose.yml",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "a2fd3c8ebb6765f67234840efbf2ae22846ffeedd4a93705a1d2e4ea2af93b43",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/FILE_BY_FILE_ALIGNMENT.md",
      "path": "project-sources/github/docs/FILE_BY_FILE_ALIGNMENT.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0e9920041d63e58fc1327b2aa7161c7a4f19385b18baf89299d7cc4c3c09b2e3",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/PROJECT_FILE_INTEGRATION_HANDOFF.md",
      "path": "project-sources/github/docs/PROJECT_FILE_INTEGRATION_HANDOFF.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "edb7bcb56f1fa83cb3b77a822102d9c70037966b476217c5c40d8bb1937af51e",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/UNIFIED_APP_INTEGRATION.md",
      "path": "project-sources/github/docs/UNIFIED_APP_INTEGRATION.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "cfac1d1c44581cbd056a95a3f447623a46f32faa8954cd42e7527b3e60a8b28f",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/02-zuxuru-master-spec.md",
      "path": "project-sources/github/docs/alignments/02-zuxuru-master-spec.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e2498a4334d6818ff9bcd45e1b781342ebaae97af81d28f00b221647e243cacd",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/03-zuxuru-master-builder.md",
      "path": "project-sources/github/docs/alignments/03-zuxuru-master-builder.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e218fad887d718de3e9be3c58e5f43a5c40bb6737fc912f61938aabce28091c2",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/04-shogo-master-build.md",
      "path": "project-sources/github/docs/alignments/04-shogo-master-build.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "601c7b0a1ae439eefa8369781b440b4f301ad389f776b5f3bb80b08edbe03bbf",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/05-fukulisane-business-innovation.md",
      "path": "project-sources/github/docs/alignments/05-fukulisane-business-innovation.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "5fdedc036a9f14e8949de6cf432bc83b80326698b71fb21544a26f8ee5138ce6",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/06-bonga-four-packages.md",
      "path": "project-sources/github/docs/alignments/06-bonga-four-packages.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "00b9651f0e45f5c54d1ec22329fbde2aa9cca80a8bbba8cc46a9ead3c45942f5",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/07-oct14-work-handoff.md",
      "path": "project-sources/github/docs/alignments/07-oct14-work-handoff.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "382292725ca774175890ea43c4380d523d949d51a24b18e9bc41f41af886ee61",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/08-fashion-design-vertical.md",
      "path": "project-sources/github/docs/alignments/08-fashion-design-vertical.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "caf7c83cd01c88c1fd924aa92e214f327b1b1cba782a2555fece4f60e46d4427",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/09-mall-business-tree-fashion-builder-packages.md",
      "path": "project-sources/github/docs/alignments/09-mall-business-tree-fashion-builder-packages.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1dd82142c12d957bc343adcde97448073668df8aff4d24e4d75577412a2e27c2",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/10-business-visibility-station.md",
      "path": "project-sources/github/docs/alignments/10-business-visibility-station.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "33cc577ace10ba67821910cfb80f15df7c59df8b1c8d6915a01e9ced3889f94c",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/11-tech-fashion-animation-shared-engine.md",
      "path": "project-sources/github/docs/alignments/11-tech-fashion-animation-shared-engine.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "47f5fd8efd49f95fa4e0d466c56b942985a9b74eca66aadb85f46b378f043435",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/12-fashion-career-portfolio-source.md",
      "path": "project-sources/github/docs/alignments/12-fashion-career-portfolio-source.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e1900af73dd66c7d22a461244ae7e81c71f70dd812a54fe9614b12e7a08f1a77",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/13-bonga-live-site-content-baseline.md",
      "path": "project-sources/github/docs/alignments/13-bonga-live-site-content-baseline.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0267ef38f41b1339ccd92e5e3b50e09ce525b8e644925bc7dd7ab2ea4f55f46a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/14-zuxuru-growth-os-public-baseline.md",
      "path": "project-sources/github/docs/alignments/14-zuxuru-growth-os-public-baseline.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "fd5130ae012e656ecf5497b2276831bb35c6a3ea12840e98e63df751af86fab0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/15-bonga-fashion-os-html-review.md",
      "path": "project-sources/github/docs/alignments/15-bonga-fashion-os-html-review.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "b78fe27f76f30cfc849a56801c0988a08ed1c8bad7350468c12f89ae0b717111",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/16-business-visibility-station-html-audit.md",
      "path": "project-sources/github/docs/alignments/16-business-visibility-station-html-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "f0703684fbc3a87fd560bb9bc73e52f977a8134738f6a4759d1ae8631004ba68",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/17-arena-business-os-agents.md",
      "path": "project-sources/github/docs/alignments/17-arena-business-os-agents.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "060f605f0c9871c21677f01e3fc68adc3f18d5460453c2dce12e019f8bcbd289",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/18-investigation-live-engine-build-record.md",
      "path": "project-sources/github/docs/alignments/18-investigation-live-engine-build-record.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "292aeeef45bd0c0f690f65d5df79e82f4152f1ebea0e47a790d9165932b8dee3",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/19-live-engine-record-deduplication.md",
      "path": "project-sources/github/docs/alignments/19-live-engine-record-deduplication.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "a4fbb95ba35e71a9808dacaf15e7143c20083d9695d4edd43d4bf5ff6ed40cca",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/20-deepsearch-proof-safety-person-boundaries.md",
      "path": "project-sources/github/docs/alignments/20-deepsearch-proof-safety-person-boundaries.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e0de82cea8802343959bfae98f673cac6de11db43e1a8551585d4df93dd5e361",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/21-repository-implementation-contracts.md",
      "path": "project-sources/github/docs/alignments/21-repository-implementation-contracts.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "b724e1eb1b0eb3513c391d4b69e19c095f5b888506acce368c87e710d0ec3a94",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/22-digital-investigation-mcp-product-positioning.md",
      "path": "project-sources/github/docs/alignments/22-digital-investigation-mcp-product-positioning.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4c5392af704de150d01f36eafc24521e92d9abdfed7f2e61a9af04aa85f2dd2a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/23-zuxuru-growth-os-html-prototype-audit.md",
      "path": "project-sources/github/docs/alignments/23-zuxuru-growth-os-html-prototype-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0fd630c25e5ee128b55ca815ce28907c802009a63a7c38c25b5fc95833fb5ad9",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/24-investigation-api-demo-fallback-audit.md",
      "path": "project-sources/github/docs/alignments/24-investigation-api-demo-fallback-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "324f78090a2ee94a9822984b3ea316c1c234c770c1d63f8faebcf7ab55f9dabf",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/25-investigation-fail-closed-html-version-audit.md",
      "path": "project-sources/github/docs/alignments/25-investigation-fail-closed-html-version-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "6f8622f30ca843f1b10c28641bd7a4d237fe108ee2139df18a78940d8f277123",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/26-brand-autopilot-html-execution-audit.md",
      "path": "project-sources/github/docs/alignments/26-brand-autopilot-html-execution-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "71aff3f9fe060deb0a9a5b3ff421b7734781feada023ef3a8269913e293c8832",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/27-brand-autopilot-early-html-defect-audit.md",
      "path": "project-sources/github/docs/alignments/27-brand-autopilot-early-html-defect-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "da39ef740fd7db803a3a63e91529bab3cb38c5ff80a77b221781e925c2ee5ce9",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/28-brand-autopilot-legacy-html-deduplication.md",
      "path": "project-sources/github/docs/alignments/28-brand-autopilot-legacy-html-deduplication.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0e27bf1b11e2c5da2eb53cc2e6d891cf143a0dc1b1f5d509c12df81ccafba342",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/29-brand-autopilot-pre-execution-html-baseline.md",
      "path": "project-sources/github/docs/alignments/29-brand-autopilot-pre-execution-html-baseline.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "36cf471824f3838e85526081ce277e5a15c2830c3a12fd656874c3a1821965bf",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/30-brand-autopilot-original-html-baseline.md",
      "path": "project-sources/github/docs/alignments/30-brand-autopilot-original-html-baseline.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "986b5fa5c2e7d4d4c8f5860c528238ae326a98ca8769a563ddbc3092948eddf2",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/31-business-visibility-station-duplicate-alias.md",
      "path": "project-sources/github/docs/alignments/31-business-visibility-station-duplicate-alias.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "3e6d70a789f818d883c34d5e87678883406f56550dfd6e36c1e559252fcafc27",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/32-business-visibility-dashboard-visual-reference.md",
      "path": "project-sources/github/docs/alignments/32-business-visibility-dashboard-visual-reference.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0bc463311425a214d051689ab728b8b095804373146fd9a0f56a9e56d545c89f",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/33-galleria-evidence-module-zip-source-audit.md",
      "path": "project-sources/github/docs/alignments/33-galleria-evidence-module-zip-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4fff4cd14898a8c194107493c7cf08d688d44656cc1a2bc6fd979434dc8ad343",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/34-zuxuru-build-spec-zip-architecture-alignment.md",
      "path": "project-sources/github/docs/alignments/34-zuxuru-build-spec-zip-architecture-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "9e59c6fea7cf801205a966d9385005ba88a79101ca311d7ee9e397aa7fcb3716",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/35-render-ready-zip-deployment-source-audit.md",
      "path": "project-sources/github/docs/alignments/35-render-ready-zip-deployment-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "51f4ada32fcc51cf7eb74d2da21821810e6b1f27dabcd841f185b5e41e25cede",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/36-investigation-platform-zip-real-backend-audit.md",
      "path": "project-sources/github/docs/alignments/36-investigation-platform-zip-real-backend-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "5e6ebbd35fca95ec46affaf0738ad6add547bb630bd865e4d040055adc0c698e",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/37-growth-engine-mvp-browser-source-audit.md",
      "path": "project-sources/github/docs/alignments/37-growth-engine-mvp-browser-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "537a79292f99d9448f64379494a87644a9c869aeba0b5e267f97dc42263bb12d",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/38-investigation-opportunity-engine-zip-source-audit.md",
      "path": "project-sources/github/docs/alignments/38-investigation-opportunity-engine-zip-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4e7ac209c1cb3dc3252fa56bee8e052a93356146f648e5cd4919f4375731755a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/39-digital-studio-repository-zip-source-audit.md",
      "path": "project-sources/github/docs/alignments/39-digital-studio-repository-zip-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "514c286a1198d36338044d9b46750147666a41d24c3c46bf9dde8ff7cbe59ae3",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/40-zuxuru-storefront-zip-landing-source-audit.md",
      "path": "project-sources/github/docs/alignments/40-zuxuru-storefront-zip-landing-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "2103a55cd90caca82659b1fc136c4be0694bca9b169fa13c1bf3ad6b3b915aa0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/41-zuxuru-platform-ecosystem-image-architecture-alignment.md",
      "path": "project-sources/github/docs/alignments/41-zuxuru-platform-ecosystem-image-architecture-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "8d45a4df8a2aea4fc465b8259ddb49fd77b9e9490b763a15623a108544169988",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/42-zuxuru-ecosystem-infographic-customer-journey-alignment.md",
      "path": "project-sources/github/docs/alignments/42-zuxuru-ecosystem-infographic-customer-journey-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4029eb718646d9fd835bbb36552047c6b1b0d13d2f1f4d30e9181acefdc7d526",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/43-ai-powered-growth-architecture-image-screen-mapping.md",
      "path": "project-sources/github/docs/alignments/43-ai-powered-growth-architecture-image-screen-mapping.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1303ed865e7145f9e9c63aacde25c542771d0275270454ee301e52c433c21e37",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/44-real-execution-build-zip-claim-vs-code-audit.md",
      "path": "project-sources/github/docs/alignments/44-real-execution-build-zip-claim-vs-code-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "501104a1a93e618c93bed323a7f062c85f914b397151f101a388d11faa596cb9",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/45-fukulisane-growth-intelligence-demo-zip-source-audit.md",
      "path": "project-sources/github/docs/alignments/45-fukulisane-growth-intelligence-demo-zip-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "3e7344829ba3cd740f81c02d44496dfb254f1e368d720847427a59b956ae07b4",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/46-zuxuru-public-app-targz-landing-and-claims-audit.md",
      "path": "project-sources/github/docs/alignments/46-zuxuru-public-app-targz-landing-and-claims-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "44e63a84e0e4ca86e55d4aa009b64fab29d38cb2c9ce994115403458d562abc6",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/47-business-identity-search-growth-builder-spec-alignment.md",
      "path": "project-sources/github/docs/alignments/47-business-identity-search-growth-builder-spec-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "9645d1df1c760eed76cf95d601ea8cad0d40f17a6e55c31f1b1882f905523c6a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/48-business-identity-growth-builder-duplicate-source-record.md",
      "path": "project-sources/github/docs/alignments/48-business-identity-growth-builder-duplicate-source-record.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "30dbb2aa6043461d5de1cc9391b95af95768b74fb0391e8f0aa4880cea94a0cc",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/49-lm-studio-github-mcp-connection-screenshot-audit.md",
      "path": "project-sources/github/docs/alignments/49-lm-studio-github-mcp-connection-screenshot-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "995506850daeefd0f3fa2d7e56b857862ee56bde97fadcdbaefdd024571bb898",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/50-ods-private-ai-server-video-screenshot-candidate-audit.md",
      "path": "project-sources/github/docs/alignments/50-ods-private-ai-server-video-screenshot-candidate-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "d33b7ff393e115abe0fb1bacf217dc99ddb6e25128eeafd2bce2a11e751a3a3f",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/51-zuxuru-usable-mvp-zip-browser-source-audit.md",
      "path": "project-sources/github/docs/alignments/51-zuxuru-usable-mvp-zip-browser-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "2a386170e885b6e7f8b6029b2682b09c3baff95ed4ae11ec2dc7051810d00fe2",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/52-zuxuru-app-mvp-zip-static-shell-source-audit.md",
      "path": "project-sources/github/docs/alignments/52-zuxuru-app-mvp-zip-static-shell-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "9900a7e8d5258fb3969f06ed36d0a6f2d17fda2e424fae2cce7cb17e6e112e92",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/53-zuxuru-phase1-foundation-zip-evidence-first-source-audit.md",
      "path": "project-sources/github/docs/alignments/53-zuxuru-phase1-foundation-zip-evidence-first-source-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "3a59cb60fcb15725f8237561c505d3e8e5ff140bcb1028c37e7b83729df1657c",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/54-zuxuru-final-build-readme-document-set-alignment.md",
      "path": "project-sources/github/docs/alignments/54-zuxuru-final-build-readme-document-set-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "5cc3821cd63551437c9209d70c882e395a3daf42eaa55f1eab0d742566bc4f10",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/55-zuxuru-integration-matrix-connector-state-alignment.md",
      "path": "project-sources/github/docs/alignments/55-zuxuru-integration-matrix-connector-state-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "40034e72dbdf3b84fd4b2fce64242b80a477bc4db393bf395940fea22130a8b9",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/56-zuxuru-implementation-blueprint-bonga-release-gates.md",
      "path": "project-sources/github/docs/alignments/56-zuxuru-implementation-blueprint-bonga-release-gates.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0d08821ecfc7819962b09bc9ca89edd720f72217a38157948716e844edbcb4e8",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/56-zuxuru-implementation-blueprint-release-gates-alignment.md",
      "path": "project-sources/github/docs/alignments/56-zuxuru-implementation-blueprint-release-gates-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "7aa3b23fabf2695ac02d3b166e40b5308d1163eaeea8c1c94781bb89b0aecc35",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/57-zuxuru-final-master-build-spec-bonga-capability-alignment.md",
      "path": "project-sources/github/docs/alignments/57-zuxuru-final-master-build-spec-bonga-capability-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "fdfe6f9936e4f76beb5cf0267e68aa17f9e2aafc3e6abe8caf5f29aff029b0be",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/58-zuxuru-final-master-build-files-zip-bundle-audit.md",
      "path": "project-sources/github/docs/alignments/58-zuxuru-final-master-build-files-zip-bundle-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "9035e1f04117bb69884fbbd1d639467a2add6f52a6b9511c16f97e14bedd0149",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/59-zuxuru-master-app-build-alignment-systemization-audit.md",
      "path": "project-sources/github/docs/alignments/59-zuxuru-master-app-build-alignment-systemization-audit.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "49471d5b29abfd7f8efdbb9a24a82eea8a2f26233d9e9ea6aafdc85be0ce0d1a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/60-fukulisane-visibility-audience-growth-studio-loop-alignment.md",
      "path": "project-sources/github/docs/alignments/60-fukulisane-visibility-audience-growth-studio-loop-alignment.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "12fd280d2e6ea39f4a41ec62fd465cd8be3168cacfcef06f7e59b5eee106a54d",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/bonga-ai-employees-consolidated-implementation-contract.md",
      "path": "project-sources/github/docs/alignments/bonga-ai-employees-consolidated-implementation-contract.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "db78f923fd9983737e731fd588981a15904382a1d1ed754ccb3ddf037ad862d4",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/alignments/bonga-all-ai-teams-master-registry.md",
      "path": "project-sources/github/docs/alignments/bonga-all-ai-teams-master-registry.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "5f48b6fc1fe4ba8456fb27f226cbc54f9edf794ed178f09db100ae81bbc579b0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/android-phone-module.md",
      "path": "project-sources/github/docs/android-phone-module.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "71802dc29405c01d8b79e3b8c26a052888bf93ab2aad82e8d585a444a80022df",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/conversation-architecture-sections-1-99.md",
      "path": "project-sources/github/docs/conversation-architecture-sections-1-99.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "29f1861aaf54e1a3baec413aa20589d5c3fbe3120756a3aa5b79ded0ac5659f2",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/education-partner-os-school-app.md",
      "path": "project-sources/github/docs/education-partner-os-school-app.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "2db1dbe7c55062e5878baed5bc43a4c4067f64d8eb103bd68a694450ae0d4f6c",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/01-preservation-and-architecture.md",
      "path": "project-sources/github/docs/implementation/01-preservation-and-architecture.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "9a993c316d7395dac66da025f30fc971fac1b86ba13a6430b776f8fb035d1cb3",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/02-school-app-build-sequence.md",
      "path": "project-sources/github/docs/implementation/02-school-app-build-sequence.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "3f6f960cc800ab8c59b58d17a3b0a1cd846980b08ec0b471d6a5e50a32fd418e",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/03-ai-employees-and-execution.md",
      "path": "project-sources/github/docs/implementation/03-ai-employees-and-execution.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "a8a749a44d7b8eb0da8aacde5b5e77ee95a3d36961b2ebb559da2df0c4a307be",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/04-connection-wizard-and-technology-gateway.md",
      "path": "project-sources/github/docs/implementation/04-connection-wizard-and-technology-gateway.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "147dd7742f5a28fcab328d54a8909cd0bd3c411b69efb77ad5c2ff3aa6c6aedf",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/05-customer-workspaces-and-release-checklist.md",
      "path": "project-sources/github/docs/implementation/05-customer-workspaces-and-release-checklist.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "30f74b513f3d1c26cca68b8dd03c7abba853874746d22fb4ff9db1d94059d7d3",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/06-project-file-reconciliation.md",
      "path": "project-sources/github/docs/implementation/06-project-file-reconciliation.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "f20af72904e0ce69004de5be02118193e7d248ee7d78461e4cdc34835dc3463f",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/implementation/06-source-audit-and-integration-gates.md",
      "path": "project-sources/github/docs/implementation/06-source-audit-and-integration-gates.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "67ab90beb2ce4951b2e997bf51d4a88810d78535f8362b7b2451a2c0e37169ca",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/studio/archival-photo-fashion-show.md",
      "path": "project-sources/github/docs/studio/archival-photo-fashion-show.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "a16055f3544ed6c760f5af64a465efd6f8f0ba9d6e65b8a4c06da922573bf85e",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/studio/image-to-fashion-runway.md",
      "path": "project-sources/github/docs/studio/image-to-fashion-runway.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0037319a917a81b75cd9e0af9c91cfeaa0c9a86b40a5f2f82fbdce5bc6e40aa7",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/studio/two-hour-character-video-generator.md",
      "path": "project-sources/github/docs/studio/two-hour-character-video-generator.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4770aa8bb7cd1788960de4976189b4647ac61c7016ce7b4289dd70ea33ea5603",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/unified-ai-business-command-expansion.md",
      "path": "project-sources/github/docs/unified-ai-business-command-expansion.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "2f4fb348bf755d24847523f1a8edebbfeb379d851ded0a0f188166ea7e8e1db7",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "docs/zuxuru-app-website-builder-integration.md",
      "path": "project-sources/github/docs/zuxuru-app-website-builder-integration.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "b637faa4c554380b545d8086f1bdea1c99415d9e56d354ab0ef9c43208768d39",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "integrations/fashion_os_preview.py",
      "path": "project-sources/github/integrations/fashion_os_preview.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "81121c8cadfa5798389c1f31febb63b8c35230f9159d43c4559f297ace985a8a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "mobile/README.md",
      "path": "project-sources/github/mobile/README.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e3f4641af642def9c967d3cacdaf4126b183ff0f817c4db486b3858132ae131b",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "mobile/android-capabilities.js",
      "path": "project-sources/github/mobile/android-capabilities.js",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "d08a8557016b404f167da2af28161ea96b294613e5a3cfe90cd9d5778736a1b1",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "mobile/android-responsive.css",
      "path": "project-sources/github/mobile/android-responsive.css",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "b9b2122fa39ce2fbcd59306d0ca83d69d73ce521905da769792c193a5d6aab6f",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "mobile/manifest.webmanifest",
      "path": "project-sources/github/mobile/manifest.webmanifest",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "ad3ed23328e06c801fc28a02b6030715a729a5bb96c005b9cb66f74d9faafb0a",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "mobile/smartphone-runtime.js",
      "path": "project-sources/github/mobile/smartphone-runtime.js",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "146c2a1adb3ac21212ba24551ecf79f4c54726fb2e2f136ed54bf40a7e035fdd",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "platform/BONGA_BHENGU_CANONICAL_MERGE.md",
      "path": "project-sources/github/platform/BONGA_BHENGU_CANONICAL_MERGE.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1e7983217e940ec36d8384620ecb149db9396d54c9749ee4ac9e2b1165e78561",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "platform/SIMPLIFIED_APP_ARCHITECTURE.md",
      "path": "project-sources/github/platform/SIMPLIFIED_APP_ARCHITECTURE.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "7385f9e6b01800f08c1ce91c008404952e216e603220e1e50b38c77e6fac86c3",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "platform/SMART_OS_INTEGRATION_CONTRACT.md",
      "path": "project-sources/github/platform/SMART_OS_INTEGRATION_CONTRACT.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "2aef1f59256a5f4431654511e8e3decbd16db74c2934dfd71c8f687f77c10eb0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "platform/business-workflow.js",
      "path": "project-sources/github/platform/business-workflow.js",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "d9be0ab8535ca37f9bd31c57cdfd8fb9a4c5bb4fa992f4177f5dd81f4ae39423",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "platform/future-os.js",
      "path": "project-sources/github/platform/future-os.js",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4b06863c960d4f406514cee299439318cb123942ee4bbc66887189302f662816",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "platform/live-module-connectors.js",
      "path": "project-sources/github/platform/live-module-connectors.js",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "24eea23d431ba21347ad204a989934e0331e5b9ffe5dc94fccb5ef5f38c9a048",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "project-docs/Bonga_Bhengu_14_Oct_Work_Handoff.md",
      "path": "project-sources/github/project-docs/Bonga_Bhengu_14_Oct_Work_Handoff.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "624f93fa33e7f247c31c5f6ea8489acb352b0693588431b6d58cb5b87a29eede",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "project-sources/BONGA_BHENGU_PROJECT_MANIFEST.md",
      "path": "project-sources/github/project-sources/BONGA_BHENGU_PROJECT_MANIFEST.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "6dfc92fc5154fd45c4783c24d0332603a325402fd4e643ae813d91ab441ef616",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "project-sources/WORK_INTEGRATION_HANDOFF.md",
      "path": "project-sources/github/project-sources/WORK_INTEGRATION_HANDOFF.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "3a939347d85f299b8ecaa41ccb2d2cb8840395cdc0dbf52d802a84990c4f4a74",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "project-sources/originals/Bonga_Bhengu_Fashion_OS.html",
      "path": "project-sources/github/project-sources/originals/Bonga_Bhengu_Fashion_OS.html",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "766de8bc68f61b4d0afd76cf44291c5c1113dfb45af6daf3f6ceb17baf3d8ca0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/ACCESS.md",
      "path": "project-sources/github/subscriptions/ACCESS.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e1c62f939c35032cc3138061a6da051df6cb1c7c530633ceb05b8f7f9644ef49",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/LIMITS.md",
      "path": "project-sources/github/subscriptions/LIMITS.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "4210f35f8052add5654ee4f4a2e0f2370cba8ced9551831cd3c8463b09cc51f6",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/README.md",
      "path": "project-sources/github/subscriptions/README.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "9e6363ddd2d221183b699e1915e7b06e93319a9878c33bbda1a70bcfd38a3c5b",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/access.py",
      "path": "project-sources/github/subscriptions/access.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "47b16b08f4b87a830e22e5f25c3a6f98fc3d9ad3c63ab04c86afd172618ac2d0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/catalog.py",
      "path": "project-sources/github/subscriptions/catalog.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "6ae30228b50ae75fbc052aa6368bd9d8bb6a98ade2f225f3a5d8193b3318b164",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/integrations.py",
      "path": "project-sources/github/subscriptions/integrations.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "f1314c4175cefe8ecd3b6e178bc484b34f2ecd2641d98bdabb46a4563850ff79",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/limits.py",
      "path": "project-sources/github/subscriptions/limits.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "5a94d242e56de5115fb1867e92c4c5d37aadb7b62dd88122248ca76c4a4a4647",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/tests/test_access.py",
      "path": "project-sources/github/subscriptions/tests/test_access.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "0d9dceb57a3d123e98c53845d79c5310533cd6b8a28de2cc486fb4e29203523e",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/tests/test_catalog.py",
      "path": "project-sources/github/subscriptions/tests/test_catalog.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "fc0f63a34bb5baa20c3e99c8489bd389afcbf0cbca6f8f94fb22dd86f54667c7",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/tests/test_limits.py",
      "path": "project-sources/github/subscriptions/tests/test_limits.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e942d0b5c29b377c0d6647e5729bf4b9a86fceca7ff0d2aeef3c59532fab246c",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/tests/test_usage_ledger.py",
      "path": "project-sources/github/subscriptions/tests/test_usage_ledger.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "ee00390df04c1bd0701d990aa54e45f85e3d17f4d93df7317a795cfe40433bd5",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "subscriptions/usage_ledger.py",
      "path": "project-sources/github/subscriptions/usage_ledger.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "cef85a486e9e3ba2fe6d6029e220199de283e10e0eaa46c2fc9ea79c210f9ee1",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/README.md",
      "path": "project-sources/github/website-builder/README.md",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1bae7ebb16ac6215dd7313b9ed84034e7565419a5fb42db3766c93a55d7da5c8",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/builder.py",
      "path": "project-sources/github/website-builder/builder.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "1e7029d894c366b5d9ed5a22a90d85db88b5d25dca9f27a0bb54952052194622",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/business_master.py",
      "path": "project-sources/github/website-builder/business_master.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "77cc01ae6b494395c9cbf249a5728c5569253bc9fa0c277ab0ce9a630634077b",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/public/fashion-os.html",
      "path": "project-sources/github/website-builder/public/fashion-os.html",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "766de8bc68f61b4d0afd76cf44291c5c1113dfb45af6daf3f6ceb17baf3d8ca0",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/site_pipeline.py",
      "path": "project-sources/github/website-builder/site_pipeline.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "fbb3db295e78646ff6cf31646829067aec4d131118041a2e05031b9df6bb22bd",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/tests/test_builder.py",
      "path": "project-sources/github/website-builder/tests/test_builder.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "e17a002a1d46bb4aabfa5bb7f8fac7c49d25e5bdf9445428719e632ac0982c50",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/tests/test_business_master.py",
      "path": "project-sources/github/website-builder/tests/test_business_master.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "cc0692c098280f108e0e8e8c32d706f7daf630a714e56ed8bd0ac417ba625dbc",
      "disposition": "source retained; Python runtime remains external to the Worker"
    },
    {
      "name": "website-builder/tests/test_site_pipeline.py",
      "path": "project-sources/github/website-builder/tests/test_site_pipeline.py",
      "origin": "bongabhenguai-art/bonga-bhengu",
      "sha256": "f2b968c14ea87d78fb46cabf9c18c91f352dc0753c06785ba3911eefef3a148d",
      "disposition": "source retained; Python runtime remains external to the Worker"
    }
  ]
}
```
