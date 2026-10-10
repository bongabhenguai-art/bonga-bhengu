"""Archival runway image inspection. No synthetic-video provider is claimed."""
from io import BytesIO
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from PIL import Image, ImageOps, UnidentifiedImageError
from pathlib import Path
from uuid import uuid4
import os
import sqlite3

router = APIRouter(prefix="/studio/fashion-runway", tags=["fashion-runway"])
ROOT = Path(__file__).parent
DB = Path(os.environ.get("STUDIO_DB", str(ROOT / "studio.sqlite3")))
ASSETS = ROOT / "outputs" / "runway"
MAX_BYTES = 15 * 1024 * 1024

def db_connect():
    db = sqlite3.connect(DB)
    db.row_factory = sqlite3.Row
    return db

def check_tenant(tenant_id):
    with db_connect() as db:
        if not db.execute("SELECT id FROM tenants WHERE id=?", (tenant_id,)).fetchone():
            raise HTTPException(404, "Tenant not found")

@router.post("/inspect")
async def inspect_archival_image(
    image: UploadFile = File(...),
    tenant_id: str = Form(...),
    mode: str = Form("preserve"),
    rights_confirmed: bool = Form(False),
):
    # Existing Studio uses tenant IDs, not real authentication. Keep this
    # endpoint disabled until the platform's authenticated tenant context is wired.
    if os.getenv("STUDIO_AUTH_INTEGRATED") != "1":
        raise HTTPException(503, "Authenticated tenant integration required")
    if mode not in ("preserve", "recreate"):
        raise HTTPException(422, "mode must be preserve or recreate")
    if not rights_confirmed:
        raise HTTPException(422, "Image and likeness rights confirmation required")
    check_tenant(tenant_id)
    payload = await image.read(MAX_BYTES + 1)
    if len(payload) > MAX_BYTES:
        raise HTTPException(413, "Image exceeds 15 MB")
    try:
        source = Image.open(BytesIO(payload))
        source.verify()
        source = Image.open(BytesIO(payload))
        source = ImageOps.exif_transpose(source).convert("RGB")
    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(422, "Invalid image")
    if source.width * source.height > 40_000_000:
        raise HTTPException(413, "Image resolution too large")
    identifier = str(uuid4())
    folder = ASSETS / tenant_id
    folder.mkdir(parents=True, exist_ok=True)
    destination = folder / (identifier + ".png")
    source.save(destination)
    return {
        "id": identifier, "tenant_id": tenant_id, "mode": mode,
        "width": source.width, "height": source.height,
        "asset_path": str(destination.relative_to(ROOT)),
        "status": "image_inspected",
        "garment_analysis": "not_configured",
        "video_generation": "not_configured",
        "next_step": "Connect licensed segmentation and image-to-video providers",
    }
