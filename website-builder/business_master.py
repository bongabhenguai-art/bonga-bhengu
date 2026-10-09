"""Persistent Business Master File with tenant-scoped access and source evidence."""
from dataclasses import dataclass, asdict
from pathlib import Path
from datetime import datetime, timezone
import json, re, sqlite3, uuid

@dataclass
class BusinessRecord:
    tenant_id: str
    name: str
    description: str
    services: list[str]
    website: str = ""
    location: str = ""
    contact_email: str = ""
    brand_color: str = "#D4AF37"
    evidence_links: list[str] | None = None
    approved: bool = False

def open_db(db_path: str):
    db = sqlite3.connect(db_path)
    db.row_factory = sqlite3.Row
    db.execute("""CREATE TABLE IF NOT EXISTS business_profiles (
      tenant_id TEXT PRIMARY KEY, record TEXT NOT NULL, updated_at TEXT NOT NULL)""")
    db.execute("""CREATE TABLE IF NOT EXISTS business_audit (
      event_id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL,
      action TEXT NOT NULL, created_at TEXT NOT NULL)""")
    return db

def save_profile(db_path: str, record: BusinessRecord):
    if not re.fullmatch(r"[A-Za-z0-9-]{1,64}",record.tenant_id):
        raise ValueError("Invalid tenant ID")
    if not re.fullmatch(r"#[0-9a-fA-F]{6}",record.brand_color):
        raise ValueError("Invalid brand color")
    links = record.evidence_links or []
    if any(not link.startswith(("https://","http://")) for link in links):
        raise ValueError("Evidence links must be HTTP(S) URLs")
    now = datetime.now(timezone.utc).isoformat()
    payload = json.dumps(asdict(record),ensure_ascii=False)
    with open_db(db_path) as db:
        db.execute("""INSERT INTO business_profiles VALUES (?,?,?)
          ON CONFLICT(tenant_id) DO UPDATE SET record=excluded.record,updated_at=excluded.updated_at""",
          (record.tenant_id,payload,now))
        db.execute("INSERT INTO business_audit VALUES (?,?,?,?)",
                   (str(uuid.uuid4()),record.tenant_id,"profile_saved",now))

def get_profile(db_path: str, tenant_id: str) -> BusinessRecord | None:
    with open_db(db_path) as db:
        row = db.execute("SELECT record FROM business_profiles WHERE tenant_id=?", (tenant_id,)).fetchone()
    return BusinessRecord(**json.loads(row["record"])) if row else None
