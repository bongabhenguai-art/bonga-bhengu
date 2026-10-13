"""Chatbliz OS prototype task API. Python stdlib only. Not an AI/MCP executor."""
from __future__ import annotations
import json
import os
import sqlite3
import uuid
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

SERVICES = {"My Brand", "My Website", "My Content", "My Business"}
ROOT = Path(__file__).resolve().parent
DB = Path(os.environ.get("CHATBLIZ_DB", str(ROOT / "chatbliz.sqlite3"))).resolve()
HOST = os.environ.get("CHATBLIZ_HOST", "127.0.0.1")
PORT = int(os.environ.get("CHATBLIZ_PORT", "8765"))
MAX_BODY = 12000

def connect():
    db = sqlite3.connect(DB)
    db.row_factory = sqlite3.Row
    db.execute("""CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY, service TEXT NOT NULL, brief TEXT NOT NULL,
        status TEXT NOT NULL, created_at TEXT NOT NULL)""")
    db.commit()
    return db

def create_task(service, brief):
    if service not in SERVICES or not isinstance(brief, str) or not 1 <= len(brief.strip()) <= 5000:
        raise ValueError("Valid service and brief (1-5000 characters) required")
    task = {"id": str(uuid.uuid4()), "service": service, "brief": brief.strip(),
            "status": "queued_for_review", "created_at": datetime.now(timezone.utc).isoformat()}
    with connect() as db:
        db.execute("INSERT INTO tasks VALUES (:id,:service,:brief,:status,:created_at)", task)
    return task

def list_tasks():
    with connect() as db:
        return [dict(row) for row in db.execute("SELECT * FROM tasks ORDER BY created_at DESC LIMIT 100")]

class Handler(BaseHTTPRequestHandler):
    def send_json(self, code, value):
        payload = json.dumps(value).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            return self.send_json(200, {"ok": True, "mode": "local_prototype", "ai_connected": False, "mcp_connected": False})
        if path == "/api/tasks":
            return self.send_json(200, {"tasks": list_tasks()})
        if path in ("/", "/index.html", "/chatbliz-ui.css"):
            filename = "index.html" if path == "/" else path[1:]
            target = ROOT / filename
            if not target.is_file():
                return self.send_json(404, {"error": "File missing"})
            data = target.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/css; charset=utf-8" if filename.endswith(".css") else "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(data)
            return
        return self.send_json(404, {"error": "Not found"})

    def do_POST(self):
        if urlparse(self.path).path != "/api/tasks":
            return self.send_json(404, {"error": "Not found"})
        try:
            size = int(self.headers.get("Content-Length", "-1"))
            if size < 0 or size > MAX_BODY:
                return self.send_json(413, {"error": "Invalid body size"})
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict):
                raise ValueError("JSON object required")
            task = create_task(data.get("service"), data.get("brief"))
            return self.send_json(201, {"task": task})
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            return self.send_json(400, {"error": str(exc)})

if __name__ == "__main__":
    with connect():
        pass
    print(f"Chatbliz local prototype: http://{HOST}:{PORT} (NO AUTH; bind localhost only)")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
