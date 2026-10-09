"""Shared website-builder engine: tenant-specific static sites, no external publishing."""
from dataclasses import dataclass, asdict
from pathlib import Path
from html import escape
import json, re

ROOT = Path(__file__).parent
OUTPUT = ROOT / "generated"

@dataclass(frozen=True)
class BusinessProfile:
    tenant_id: str
    business_name: str
    description: str
    services: list[str]
    contact_email: str = ""
    location: str = ""
    accent: str = "#D4AF37"
    approved: bool = False

def build_site(profile: BusinessProfile, destination: Path | None = None) -> Path:
    if not re.fullmatch(r"[A-Za-z0-9-]{1,64}", profile.tenant_id):
        raise ValueError("Invalid tenant identifier")
    if not re.fullmatch(r"#[0-9a-fA-F]{6}", profile.accent):
        raise ValueError("Invalid accent")
    if not profile.approved:
        raise PermissionError("Business profile requires owner approval before generation")
    target = (destination or OUTPUT) / profile.tenant_id
    target.mkdir(parents=True, exist_ok=True)
    name = escape(profile.business_name)
    description = escape(profile.description)
    services = "".join(f"<li>{escape(service)}</li>" for service in profile.services)
    location = escape(profile.location)
    email = escape(profile.contact_email)
    html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{escape(profile.description[:155],quote=True)}">
<title>{name} | Official Website</title>
<style>body{{margin:0;background:#0b0b0b;color:white;font-family:Arial,sans-serif}}
main{{max-width:960px;margin:auto;padding:clamp(24px,5vw,70px)}}
header{{border-bottom:1px solid {profile.accent};padding-bottom:24px}}
h1{{font-size:clamp(34px,7vw,68px)}}h2,a{{color:{profile.accent}}}
li{{margin:12px 0}}footer{{margin-top:65px;border-top:1px solid #444;padding-top:24px}}
</style></head><body><main><header><strong>{name}</strong></header>
<h1>{name}</h1><p>{description}</p><section><h2>Our Services</h2><ul>{services}</ul></section>
<footer><p>{location}</p><p>{email}</p></footer></main></body></html>"""
    (target / "index.html").write_text(html, encoding="utf-8")
    (target / "profile.json").write_text(json.dumps(asdict(profile),indent=2),encoding="utf-8")
    return target / "index.html"
