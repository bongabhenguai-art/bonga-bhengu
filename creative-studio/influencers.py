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

# Category profiles change presentation and campaign behavior, never the avatar's
# synthetic identity. Profiles are presets, not professional qualifications.
CATEGORY_PROFILES = {
    "fashion": {"role": "Fashion ambassador", "wardrobe": "Designer collection", "formats": ["runway", "product_showcase"]},
    "technology": {"role": "Technology presenter", "wardrobe": "Modern professional", "formats": ["demo", "tutorial"]},
    "property": {"role": "Property presenter", "wardrobe": "Corporate", "formats": ["property_tour", "listing"]},
    "food": {"role": "Hospitality host", "wardrobe": "Branded hospitality", "formats": ["menu", "restaurant_promo"]},
    "education": {"role": "Learning presenter", "wardrobe": "Educator professional", "formats": ["course_intro", "learning"]},
    "business": {"role": "Business ambassador", "wardrobe": "Client brand corporate", "formats": ["service_explainer", "case_study"]},
}

@router.get("/categories")
def influencer_categories():
    return {"categories": CATEGORY_PROFILES, "rendering_enabled": False}

@router.get("/{avatar_id}/category/{category_id}")
def influencer_category_preview(avatar_id: str, category_id: str):
    from fastapi import HTTPException
    persona = next((p for p in _PERSONAS if p[0] == avatar_id), None)
    if persona is None:
        raise HTTPException(404, "Avatar not found")
    profile = CATEGORY_PROFILES.get(category_id)
    if profile is None:
        raise HTTPException(404, "Category not found")
    return {
        "avatar_id": avatar_id,
        "avatar_name": persona[1],
        "category": category_id,
        "presentation": profile,
        "synthetic_identity": True,
        "disclosure_required": True,
        "status": "preview_configuration_only",
        "requires_verified_company_brief": True,
    }

# Fashion is the first validation vertical, not a restriction on the platform.
# Category briefs must be verified per tenant before any persuasive claims.
VALIDATION_VERTICAL = "fashion"

@router.get("/validation-plan")
def validation_plan():
    return {
        "pilot_category": VALIDATION_VERTICAL,
        "platform_scope": "multi_industry",
        "pipeline": [
            "company_onboarding", "verified_business_intelligence",
            "industry_knowledge", "avatar_adaptation",
            "digital_studio_production", "approved_publishing",
            "opt_in_lead_capture", "closer_handoff", "sales_analytics"
        ],
        "fashion_pilot_checks": [
            "fabric_and_construction_accuracy", "size_and_fit_claims",
            "brand_consistency", "product_catalog_accuracy",
            "consent_and_ai_disclosure", "lead_attribution"
        ],
        "production_ready": False,
        "requires_tenant_authorization": True,
    }
