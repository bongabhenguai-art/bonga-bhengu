"""Education OS: tenant-scoped school management and learning API.

Disabled until EDUCATION_TOKEN_SECRET is configured. Tokens must be issued by a
trusted identity service; this module deliberately has no public token mint route.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import sqlite3
import time
from pathlib import Path
from threading import Lock
from uuid import uuid4

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/education", tags=["Education OS"])
_LOCK = Lock()
_DB = Path(os.environ.get("EDUCATION_DB", str(Path(__file__).parent / "education.sqlite3")))

def _db():
    conn = sqlite3.connect(_DB, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    return conn

def init_db():
    _DB.parent.mkdir(parents=True, exist_ok=True)
    with _LOCK, _db() as db:
        db.executescript("""
        CREATE TABLE IF NOT EXISTS institutions (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, name TEXT NOT NULL,
            created_at INTEGER NOT NULL);
        CREATE TABLE IF NOT EXISTS classes (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, institution_id TEXT NOT NULL,
            name TEXT NOT NULL, teacher_id TEXT NOT NULL,
            FOREIGN KEY(institution_id) REFERENCES institutions(id));
        CREATE TABLE IF NOT EXISTS enrollments (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, class_id TEXT NOT NULL,
            learner_id TEXT NOT NULL, UNIQUE(tenant_id,class_id,learner_id),
            FOREIGN KEY(class_id) REFERENCES classes(id));
        CREATE TABLE IF NOT EXISTS assignments (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, class_id TEXT NOT NULL,
            title TEXT NOT NULL, instructions TEXT NOT NULL,
            FOREIGN KEY(class_id) REFERENCES classes(id));
        CREATE TABLE IF NOT EXISTS submissions (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, assignment_id TEXT NOT NULL,
            learner_id TEXT NOT NULL, answer TEXT NOT NULL, grade TEXT,
            UNIQUE(tenant_id,assignment_id,learner_id),
            FOREIGN KEY(assignment_id) REFERENCES assignments(id));
        CREATE TABLE IF NOT EXISTS attendance (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, class_id TEXT NOT NULL,
            learner_id TEXT NOT NULL, day TEXT NOT NULL, present INTEGER NOT NULL,
            UNIQUE(tenant_id,class_id,learner_id,day));
        CREATE TABLE IF NOT EXISTS education_audit (
            id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, actor_id TEXT NOT NULL,
            action TEXT NOT NULL, resource_id TEXT NOT NULL, at INTEGER NOT NULL);
        """)

def _decode_token(value):
    secret = os.environ.get("EDUCATION_TOKEN_SECRET", "")
    if len(secret) < 32:
        raise HTTPException(503, "Education authentication not configured")
    if not value or not value.startswith("Bearer "):
        raise HTTPException(401, "Bearer token required")
    token = value[7:]
    try:
        payload_part, signature = token.split(".")
        expected = hmac.new(secret.encode(), payload_part.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected):
            raise ValueError("bad signature")
        payload = json.loads(base64.urlsafe_b64decode(payload_part + "=" * (-len(payload_part) % 4)))
        if not isinstance(payload, dict) or not all(payload.get(k) for k in ("sub", "tenant_id", "role")):
            raise ValueError("missing claims")
        if payload["role"] not in ("admin", "teacher", "learner"):
            raise ValueError("bad role")
        if not isinstance(payload.get("exp"), int) or payload["exp"] <= time.time():
            raise ValueError("expired")
        return payload
    except (ValueError, TypeError, KeyError, UnicodeDecodeError, json.JSONDecodeError):
        raise HTTPException(401, "Invalid or expired education token")

def actor(authorization: str | None = Header(default=None)):
    return _decode_token(authorization)

def require(user, *roles):
    if user["role"] not in roles:
        raise HTTPException(403, "Insufficient role")

def owned(db, table, resource_id, tenant):
    row = db.execute(f"SELECT * FROM {table} WHERE id=? AND tenant_id=?", (resource_id, tenant)).fetchone()
    if not row:
        raise HTTPException(404, "Resource not found")
    return row

def audit(db, user, action, resource):
    db.execute("INSERT INTO education_audit VALUES (?,?,?,?,?,?)",
               (str(uuid4()), user["tenant_id"], user["sub"], action, resource, int(time.time())))

class InstitutionIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)

class ClassIn(BaseModel):
    institution_id: str
    name: str = Field(min_length=1, max_length=100)
    teacher_id: str = Field(min_length=1, max_length=120)

class EnrollIn(BaseModel):
    class_id: str
    learner_id: str = Field(min_length=1, max_length=120)

class AssignmentIn(BaseModel):
    class_id: str
    title: str = Field(min_length=1, max_length=160)
    instructions: str = Field(min_length=1, max_length=10000)

class SubmissionIn(BaseModel):
    assignment_id: str
    answer: str = Field(min_length=1, max_length=20000)

class GradeIn(BaseModel):
    grade: str = Field(min_length=1, max_length=40)

class AttendanceIn(BaseModel):
    class_id: str
    learner_id: str
    day: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
    present: bool

@router.get("/status")
def status():
    return {"module": "education", "enabled": len(os.environ.get("EDUCATION_TOKEN_SECRET", "")) >= 32,
            "capabilities": ["institutions", "classes", "enrollment", "assignments", "submissions", "grading", "attendance"],
            "production_ready": False}

@router.post("/institutions")
def create_institution(data: InstitutionIn, user=Depends(actor)):
    require(user, "admin")
    init_db()
    rid = str(uuid4())
    with _LOCK, _db() as db:
        db.execute("INSERT INTO institutions VALUES (?,?,?,?)",
                   (rid, user["tenant_id"], data.name, int(time.time())))
        audit(db, user, "institution.created", rid)
    return {"id": rid, "name": data.name}

@router.get("/institutions")
def institutions(user=Depends(actor)):
    init_db()
    with _db() as db:
        return [dict(r) for r in db.execute("SELECT * FROM institutions WHERE tenant_id=?",
                                            (user["tenant_id"],))]

@router.post("/classes")
def create_class(data: ClassIn, user=Depends(actor)):
    require(user, "admin")
    init_db()
    rid = str(uuid4())
    with _LOCK, _db() as db:
        owned(db, "institutions", data.institution_id, user["tenant_id"])
        db.execute("INSERT INTO classes VALUES (?,?,?,?,?)",
                   (rid, user["tenant_id"], data.institution_id, data.name, data.teacher_id))
        audit(db, user, "class.created", rid)
    return {"id": rid, **data.model_dump()}

@router.get("/classes")
def classes(user=Depends(actor)):
    init_db()
    with _db() as db:
        if user["role"] == "teacher":
            rows = db.execute("SELECT * FROM classes WHERE tenant_id=? AND teacher_id=?",
                              (user["tenant_id"], user["sub"]))
        elif user["role"] == "learner":
            rows = db.execute("""SELECT c.* FROM classes c JOIN enrollments e ON e.class_id=c.id
                WHERE c.tenant_id=? AND e.tenant_id=? AND e.learner_id=?""",
                (user["tenant_id"], user["tenant_id"], user["sub"]))
        else:
            rows = db.execute("SELECT * FROM classes WHERE tenant_id=?", (user["tenant_id"],))
        return [dict(r) for r in rows]

def class_access(db, user, class_id, *roles):
    require(user, *roles)
    row = owned(db, "classes", class_id, user["tenant_id"])
    if user["role"] == "teacher" and row["teacher_id"] != user["sub"]:
        raise HTTPException(403, "Not assigned to this class")
    return row

@router.post("/enrollments")
def enroll(data: EnrollIn, user=Depends(actor)):
    require(user, "admin")
    init_db()
    rid = str(uuid4())
    with _LOCK, _db() as db:
        owned(db, "classes", data.class_id, user["tenant_id"])
        try:
            db.execute("INSERT INTO enrollments VALUES (?,?,?,?)",
                       (rid, user["tenant_id"], data.class_id, data.learner_id))
        except sqlite3.IntegrityError:
            raise HTTPException(409, "Already enrolled")
        audit(db, user, "learner.enrolled", rid)
    return {"id": rid, **data.model_dump()}

@router.post("/assignments")
def create_assignment(data: AssignmentIn, user=Depends(actor)):
    init_db()
    rid = str(uuid4())
    with _LOCK, _db() as db:
        class_access(db, user, data.class_id, "admin", "teacher")
        db.execute("INSERT INTO assignments VALUES (?,?,?,?,?)",
                   (rid, user["tenant_id"], data.class_id, data.title, data.instructions))
        audit(db, user, "assignment.created", rid)
    return {"id": rid, **data.model_dump()}

@router.get("/assignments")
def assignments(class_id: str, user=Depends(actor)):
    init_db()
    with _db() as db:
        row = owned(db, "classes", class_id, user["tenant_id"])
        if user["role"] == "teacher" and row["teacher_id"] != user["sub"]:
            raise HTTPException(403, "Not assigned to this class")
        if user["role"] == "learner":
            enrolled = db.execute("SELECT 1 FROM enrollments WHERE tenant_id=? AND class_id=? AND learner_id=?",
                                  (user["tenant_id"], class_id, user["sub"])).fetchone()
            if not enrolled:
                raise HTTPException(403, "Not enrolled")
        return [dict(r) for r in db.execute("SELECT * FROM assignments WHERE tenant_id=? AND class_id=?",
                                            (user["tenant_id"], class_id))]

@router.post("/submissions")
def submit(data: SubmissionIn, user=Depends(actor)):
    require(user, "learner")
    init_db()
    rid = str(uuid4())
    with _LOCK, _db() as db:
        assignment = owned(db, "assignments", data.assignment_id, user["tenant_id"])
        enrolled = db.execute("SELECT 1 FROM enrollments WHERE tenant_id=? AND class_id=? AND learner_id=?",
                              (user["tenant_id"], assignment["class_id"], user["sub"])).fetchone()
        if not enrolled:
            raise HTTPException(403, "Not enrolled")
        try:
            db.execute("INSERT INTO submissions VALUES (?,?,?,?,?,NULL)",
                       (rid, user["tenant_id"], data.assignment_id, user["sub"], data.answer))
        except sqlite3.IntegrityError:
            raise HTTPException(409, "Already submitted")
        audit(db, user, "assignment.submitted", rid)
    return {"id": rid, "assignment_id": data.assignment_id, "status": "submitted"}

@router.post("/submissions/{submission_id}/grade")
def grade(submission_id: str, data: GradeIn, user=Depends(actor)):
    init_db()
    with _LOCK, _db() as db:
        submission = owned(db, "submissions", submission_id, user["tenant_id"])
        assignment = owned(db, "assignments", submission["assignment_id"], user["tenant_id"])
        class_access(db, user, assignment["class_id"], "admin", "teacher")
        db.execute("UPDATE submissions SET grade=? WHERE id=? AND tenant_id=?",
                   (data.grade, submission_id, user["tenant_id"]))
        audit(db, user, "submission.graded", submission_id)
    return {"id": submission_id, "grade": data.grade}

@router.get("/submissions")
def submissions(assignment_id: str, user=Depends(actor)):
    init_db()
    with _db() as db:
        assignment = owned(db, "assignments", assignment_id, user["tenant_id"])
        if user["role"] == "learner":
            rows = db.execute("SELECT * FROM submissions WHERE tenant_id=? AND assignment_id=? AND learner_id=?",
                              (user["tenant_id"], assignment_id, user["sub"]))
        else:
            class_access(db, user, assignment["class_id"], "admin", "teacher")
            rows = db.execute("SELECT * FROM submissions WHERE tenant_id=? AND assignment_id=?",
                              (user["tenant_id"], assignment_id))
        return [dict(r) for r in rows]

@router.post("/attendance")
def mark_attendance(data: AttendanceIn, user=Depends(actor)):
    init_db()
    with _LOCK, _db() as db:
        class_access(db, user, data.class_id, "admin", "teacher")
        enrolled = db.execute("SELECT 1 FROM enrollments WHERE tenant_id=? AND class_id=? AND learner_id=?",
                              (user["tenant_id"], data.class_id, data.learner_id)).fetchone()
        if not enrolled:
            raise HTTPException(404, "Learner not enrolled")
        rid = str(uuid4())
        db.execute("""INSERT INTO attendance VALUES (?,?,?,?,?,?)
            ON CONFLICT(tenant_id,class_id,learner_id,day) DO UPDATE SET present=excluded.present""",
            (rid, user["tenant_id"], data.class_id, data.learner_id, data.day, int(data.present)))
        audit(db, user, "attendance.marked", data.class_id)
    return {"class_id": data.class_id, "learner_id": data.learner_id,
            "day": data.day, "present": data.present}
