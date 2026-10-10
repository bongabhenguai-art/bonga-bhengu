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
