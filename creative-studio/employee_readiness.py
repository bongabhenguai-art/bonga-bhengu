"""Capability-aware status for existing AI employee roles.

No automatic activation or provider claims. This endpoint is informational;
actual execution must be authorized and wired to the existing job router.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/ai-employees", tags=["AI employees"])
ROLES = {
    "hunting": "Product opportunity and catalog selection",
    "spy": "Public market and competitor research",
    "business_scraper": "Evidence-based customer problem discovery",
    "fishing": "Approved lead nurture strategy",
    "closer": "Qualified sales conversation assistance",
    "branding": "Brand identity and consistency",
    "marketing": "Campaign planning",
    "amplifier": "Approved social content distribution",
    "studio": "Media production orchestration",
    "workflow": "Authorized task coordination",
    "money": "Finance reporting with permissions",
    "researcher": "Source-grounded research",
    "business_coach": "Business guidance",
    "problem_solver": "Issue triage and repair recommendations",
    "influencer_manager": "AI avatar casting and campaigns",
}

@router.get("/readiness")
def readiness():
    return {
        "application": "bonga-bhengu",
        "deployment": "source_only",
        "employees": [
            {"id": key, "responsibility": role, "defined": True,
             "connected": False, "operational": False,
             "status": "requires_provider_and_permission_verification"}
            for key, role in ROLES.items()
        ],
        "next_action": "Verify actual live worker registry, credentials, tenant authorization and job execution before activation",
    }
