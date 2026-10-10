"""Bonga Bhengu shared studio starter: local render and tenant-isolated jobs."""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from pathlib import Path
from PIL import Image, ImageDraw
from uuid import uuid4
from threading import Lock
import sqlite3
import os

ROOT = Path(__file__).parent
OUTPUT = ROOT / "outputs"
OUTPUT.mkdir(exist_ok=True)
DB = Path(os.environ.get("STUDIO_DB", str(ROOT / "studio.sqlite3")))
lock = Lock()
app = FastAPI(title="Bonga Bhengu App — Unified API")

def connect():
    db = sqlite3.connect(DB)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys=ON")
    return db

with connect() as db:
    db.execute("CREATE TABLE IF NOT EXISTS tenants (id TEXT PRIMARY KEY, name TEXT NOT NULL, brand_color TEXT NOT NULL)")
    db.execute("CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), title TEXT NOT NULL, status TEXT NOT NULL, output_path TEXT)")

class TenantIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    brand_color: str = Field(default="#D4AF37", pattern=r"^#[0-9a-fA-F]{6}$")

class JobIn(BaseModel):
    tenant_id: str
    title: str = Field(min_length=1, max_length=120)

@app.get("/health")
def health():
    return {"status": "ok", "application": "bonga-bhengu", "mode": "local", "video_provider": "not_configured"}

@app.post("/tenants")
def create_tenant(data: TenantIn):
    tenant_id = str(uuid4())
    with lock, connect() as db:
        db.execute("INSERT INTO tenants VALUES (?,?,?)", (tenant_id, data.name, data.brand_color))
    return {"id": tenant_id, **data.model_dump()}

@app.post("/jobs")
def create_job(data: JobIn):
    with lock, connect() as db:
        tenant = db.execute("SELECT * FROM tenants WHERE id=?", (data.tenant_id,)).fetchone()
        if not tenant:
            raise HTTPException(404, "Tenant not found")
        job_id = str(uuid4())
        db.execute("INSERT INTO jobs VALUES (?,?,?,?,?)", (job_id, data.tenant_id, data.title, "processing", None))
        try:
            folder = OUTPUT / data.tenant_id
            folder.mkdir(exist_ok=True)
            path = folder / f"{job_id}.png"
            img = Image.new("RGB", (1280, 720), "#0B0B0B")
            draw = ImageDraw.Draw(img)
            draw.rectangle((60, 60, 1220, 660), outline=tenant["brand_color"], width=8)
            draw.text((100, 160), tenant["name"][:60], fill=tenant["brand_color"])
            draw.text((100, 320), data.title[:100], fill="white")
            img.save(path)
            db.execute("UPDATE jobs SET status=?,output_path=? WHERE id=?", ("completed", str(path.relative_to(ROOT)), job_id))
        except Exception:
            db.execute("UPDATE jobs SET status=? WHERE id=?", ("failed", job_id))
            raise
    return {"id": job_id, "tenant_id": data.tenant_id, "status": "completed"}

@app.get("/jobs/{job_id}")
def get_job(job_id: str, tenant_id: str):
    # Tenant filtering is a baseline guard, NOT authentication.
    with connect() as db:
        row = db.execute("SELECT * FROM jobs WHERE id=? AND tenant_id=?", (job_id, tenant_id)).fetchone()
    if not row:
        raise HTTPException(404, "Job not found")
    return dict(row)

# Animated banner routes (development only)
from animation import router as animation_router
app.include_router(animation_router)

from connections import router as connections_router
app.include_router(connections_router)

# Same-device browser camera preview; no server-side camera access or remote streaming.
from fastapi.responses import FileResponse

@app.get("/studio/camera", include_in_schema=True)
def studio_camera_preview():
    return FileResponse(ROOT / "camera-preview.html", media_type="text/html")
