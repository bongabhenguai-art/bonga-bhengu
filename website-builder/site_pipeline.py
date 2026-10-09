"""Generate approved website from a stored Business Master File."""
from pathlib import Path
from business_master import get_profile
from builder import BusinessProfile, build_site

def generate_from_master(db_path: str, tenant_id: str, destination: Path):
    record = get_profile(db_path,tenant_id)
    if record is None:
        raise LookupError("Business Master File not found")
    return build_site(BusinessProfile(
        tenant_id=record.tenant_id,
        business_name=record.name,
        description=record.description,
        services=record.services,
        contact_email=record.contact_email,
        location=record.location,
        accent=record.brand_color,
        approved=record.approved,
    ),destination)
