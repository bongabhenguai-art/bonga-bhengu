"""Read-only influencer catalog for the existing Bonga Bhengu Digital Studio.

This does not publish, generate video or expose tenant data. Production operations
must be wired to authenticated, tenant-scoped services before enabling autopilot.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/studio/influencers", tags=["Digital Studio influencers"])

_PERSONAS = (
    ("ayanda", "Ayanda", "female", "Youth fashion and streetwear"),
    ("sipho", "Sipho", "male", "Entrepreneurship and technology"),
    ("priya", "Priya", "female", "Family fashion and retail"),
    ("daniel", "Daniel", "male", "Professional lifestyle"),
    ("nomusa", "Nomusa", "female", "Heritage and mature fashion"),
    ("kenji", "Kenji", "male", "Technology and commerce"),
    ("amina", "Amina", "female", "Modest fashion and lifestyle"),
    ("mateo", "Mateo", "male", "Activewear and fitness"),
    ("sofia", "Sofia", "female", "Inclusive beauty and expression"),
    ("thabo", "Thabo", "male", "Accessible fashion and business"),
)

@router.get("")
def list_influencers():
    return {
        "application": "bonga-bhengu",
        "workspace": "digital-studio",
        "avatars": [
            {"id": slug, "name": name, "presentation": gender,
             "specialty": specialty, "synthetic_identity": True,
             "disclosure_required": True, "render_status": "not_configured"}
            for slug, name, gender, specialty in _PERSONAS
        ],
        "autopilot": {
            "mode": "supervised",
            "enabled": False,
            "publishing_enabled": False,
            "requires_approval": True,
            "reason": "Authenticated tenant-scoped production and official publishing connectors are not configured",
        },
    }
