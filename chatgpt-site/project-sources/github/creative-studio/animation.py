"""Animated HTML banner generator. Local, offline-capable, no paid API."""
from html import escape
from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
import re

router = APIRouter(prefix="/animation", tags=["animation"])
ROOT = Path(__file__).parent / "outputs" / "animations"

class AnimationRequest(BaseModel):
    tenant_id: str = Field(pattern=r"^[a-zA-Z0-9-]{1,64}$")
    brand_name: str = Field(min_length=1, max_length=70)
    headline: str = Field(min_length=1, max_length=120)
    tagline: str = Field(default="Creative intelligence in motion", max_length=160)
    accent: str = Field(default="#D4AF37", pattern=r"^#[a-fA-F0-9]{6}$")
    theme: str = Field(default="luxury", pattern=r"^(luxury|neon)$")

def render(data: AnimationRequest) -> str:
    brand, title, tagline = (escape(x) for x in (data.brand_name, data.headline, data.tagline))
    accent = data.accent
    bg = "#0B0B0B" if data.theme == "luxury" else "#050507"
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{brand} — Animated Banner</title>
<style>
*{{box-sizing:border-box}}body{{margin:0;background:{bg};color:#fff;font-family:Arial,Helvetica,sans-serif}}
.stage{{width:100%;min-height:100vh;display:grid;place-items:center;overflow:hidden;position:relative;
background:radial-gradient(circle at 75% 25%,{accent}33,transparent 42%),{bg}}}
.stage:before{{content:"";position:absolute;inset:-100%;background:repeating-linear-gradient(90deg,transparent 0 79px,{accent}19 80px 81px);transform:rotate(-12deg);animation:drift 25s linear infinite}}
.frame{{position:relative;width:min(92vw,1120px);min-height:420px;border:1px solid {accent}88;padding:clamp(24px,6vw,80px);display:flex;flex-direction:column;justify-content:center;box-shadow:0 0 90px {accent}19}}
.brand{{color:{accent};font-size:clamp(15px,2vw,24px);letter-spacing:.34em;text-transform:uppercase;animation:reveal 1s both}}
h1{{font-size:clamp(36px,7vw,94px);line-height:1.06;max-width:950px;margin:24px 0;animation:reveal 1s .25s both}}
p{{font-size:clamp(16px,2vw,26px);color:#d5d5d5;animation:reveal 1s .55s both}}
.line{{width:120px;height:3px;background:{accent};animation:grow 1.4s .6s both}}
@keyframes reveal{{from{{opacity:0;transform:translateY(30px)}}to{{opacity:1;transform:translateY(0)}}}}
@keyframes grow{{from{{transform:scaleX(0);transform-origin:left}}to{{transform:scaleX(1);transform-origin:left}}}}
@keyframes drift{{to{{transform:translateX(160px) rotate(-12deg)}}}}
@media(prefers-reduced-motion:reduce){{*,*:before{{animation:none!important}}}}
</style></head><body><main class="stage"><section class="frame"><div class="brand">{brand}</div>
<h1>{title}</h1><div class="line"></div><p>{tagline}</p></section></main></body></html>"""

@router.post("/preview", response_class=HTMLResponse)
def preview(data: AnimationRequest):
    return HTMLResponse(render(data))

# Local files are drafts. Tenant authorization must be added before public deployment.
@router.post("/export")
def export_html(data: AnimationRequest):
    folder = ROOT / data.tenant_id
    folder.mkdir(parents=True, exist_ok=True)
    file = folder / f"{uuid4()}.html"
    file.write_text(render(data), encoding="utf-8")
    return {"status":"created","tenant_id":data.tenant_id,"file":str(file.relative_to(Path(__file__).parent)),"format":"html"}
