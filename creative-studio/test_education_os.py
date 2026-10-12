"""Education OS integration smoke tests. Run: python -m unittest test_education_os.py"""
import base64
import hashlib
import hmac
import json
import os
import tempfile
import time
import unittest
from pathlib import Path

from fastapi import FastAPI
from fastapi.testclient import TestClient

import education_os as edu

class EducationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.old_db = edu._DB
        self.old_secret = os.environ.get("EDUCATION_TOKEN_SECRET")
        edu._DB = Path(self.temp.name) / "school.sqlite3"
        os.environ["EDUCATION_TOKEN_SECRET"] = "test-secret-education-32-bytes-long-minimum"
        app = FastAPI()
        app.include_router(edu.router)
        self.client = TestClient(app)

    def tearDown(self):
        edu._DB = self.old_db
        if self.old_secret is None:
            os.environ.pop("EDUCATION_TOKEN_SECRET", None)
        else:
            os.environ["EDUCATION_TOKEN_SECRET"] = self.old_secret
        self.temp.cleanup()

    def headers(self, role, sub, tenant="school-a"):
        payload = {"role": role, "sub": sub, "tenant_id": tenant, "exp": int(time.time()) + 3600}
        part = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
        signature = hmac.new(os.environ["EDUCATION_TOKEN_SECRET"].encode(), part.encode(), hashlib.sha256).hexdigest()
        return {"Authorization": "Bearer " + part + "." + signature}

    def test_requires_auth_and_tenant_isolation(self):
        self.assertEqual(self.client.get("/api/v1/education/institutions").status_code, 401)
        a = self.headers("admin", "admin-a")
        b = self.headers("admin", "admin-b", "school-b")
        result = self.client.post("/api/v1/education/institutions", headers=a, json={"name": "Example School"})
        self.assertEqual(result.status_code, 200)
        self.assertEqual(len(self.client.get("/api/v1/education/institutions", headers=b).json()), 0)

    def test_school_lifecycle_and_permissions(self):
        admin = self.headers("admin", "owner")
        teacher = self.headers("teacher", "teacher-1")
        other = self.headers("teacher", "teacher-2")
        learner = self.headers("learner", "student-1")
        institution = self.client.post("/api/v1/education/institutions", headers=admin, json={"name":"School"}).json()["id"]
        cls = self.client.post("/api/v1/education/classes", headers=admin,
                               json={"institution_id": institution,"name":"Grade 10","teacher_id":"teacher-1"}).json()["id"]
        self.assertEqual(self.client.post("/api/v1/education/assignments", headers=other,
                           json={"class_id":cls,"title":"Math","instructions":"Solve"}).status_code,403)
        self.client.post("/api/v1/education/enrollments", headers=admin,
                         json={"class_id":cls,"learner_id":"student-1"})
        assignment = self.client.post("/api/v1/education/assignments", headers=teacher,
                         json={"class_id":cls,"title":"Math","instructions":"Solve"}).json()["id"]
        submission = self.client.post("/api/v1/education/submissions", headers=learner,
                         json={"assignment_id":assignment,"answer":"42"}).json()["id"]
        self.assertEqual(self.client.post("/api/v1/education/submissions/"+submission+"/grade",
                         headers=learner,json={"grade":"A"}).status_code,403)
        self.assertEqual(self.client.post("/api/v1/education/submissions/"+submission+"/grade",
                         headers=teacher,json={"grade":"A"}).status_code,200)
        self.assertEqual(len(self.client.get("/api/v1/education/submissions",
                         headers=learner,params={"assignment_id":assignment}).json()),1)

if __name__ == "__main__":
    unittest.main()
