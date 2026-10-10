"""Safe, additive bridge for embedding the preserved Fashion OS UI.

This module never modifies the original ChatGPT Sites project. An existing
authenticated application may mount the router under its own route after
validating the tenant and user permissions.
"""
from pathlib import Path
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["fashion-os"])
ORIGINAL = Path(__file__).resolve().parents[1] / "project-sources" / "originals" / "Bonga_Bhengu_Fashion_OS.html"

@router.get("/fashion-os/preview", response_class=HTMLResponse, include_in_schema=False)
def fashion_os_preview():
    """Read-only preview; original file is served unmodified.

    Mount this only behind the host app's authorization controls. Do not
    expose it publicly without reviewing inline scripts, CSP and branding.
    """
    if not ORIGINAL.is_file():
        raise HTTPException(status_code=503, detail="Original Fashion OS asset unavailable")
    return HTMLResponse(ORIGINAL.read_text(encoding="utf-8"))
