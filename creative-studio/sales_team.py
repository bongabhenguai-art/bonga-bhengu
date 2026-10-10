"""Sales team coordination contract for the existing Bonga Bhengu App.

No external messaging, prospect scraping, publishing or autonomous execution.
Plans are previews until authenticated tenant jobs and consented CRM are wired.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/ai-employees/sales", tags=["AI sales team"])
SALES_TEAM = (
    ("business_scraper", "Discover customer business needs"),
    ("spy", "Research public competitive signals"),
    ("hunting", "Match relevant products and services"),
    ("fishing", "Plan permission-based lead nurturing"),
    ("marketing", "Prepare brand-aligned campaign"),
    ("influencer_manager", "Choose suitable synthetic influencer"),
    ("closer", "Prepare human-approved conversion follow-up"),
)
class SalesBrief(BaseModel):
    company_name: str = Field(min_length=1, max_length=120)
    industry: str = Field(min_length=1, max_length=80)
    offer: str = Field(min_length=1, max_length=500)
    target_audience: str = Field(min_length=1, max_length=250)

@router.get("/readiness")
def sales_readiness():
    return {
        "team": [{"id": key, "responsibility": responsibility,
                  "execution_enabled": False} for key, responsibility in SALES_TEAM],
        "state": "configuration_only",
        "requires": ["authenticated_tenant", "verified_business_brief",
                     "consented_lead_source", "authorized_provider",
                     "approved_messaging_channel"],
    }

@router.post("/plan")
def sales_plan(brief: SalesBrief):
    return {
        "company": brief.company_name,
        "industry": brief.industry,
        "offer": brief.offer,
        "audience": brief.target_audience,
        "status": "draft_not_executed",
        "steps": [{"employee": key, "task": responsibility}
                  for key, responsibility in SALES_TEAM],
        "approval_required": True,
        "messages_sent": 0,
        "leads_contacted": 0,
    }
