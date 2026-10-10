"""JARVIS orchestration interface within the existing Bonga Bhengu App.

JARVIS is a coordinator, not an unbounded autonomous agent. These endpoints
prepare inspectable plans; execution requires authenticated tenant authorization,
a configured model/tool router and explicit approvals for external actions.
"""
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/jarvis", tags=["JARVIS intelligence"])
WORKFLOWS = {
    "sales": ["business_scraper", "spy", "hunting", "fishing", "closer"],
    "marketing": ["researcher", "branding", "marketing", "amplifier"],
    "studio": ["researcher", "influencer_manager", "studio", "amplifier"],
    "business": ["business_scraper", "researcher", "business_coach", "problem_solver"],
}
class JarvisRequest(BaseModel):
    objective: str = Field(min_length=3, max_length=1000)
    workflow: str = Field(default="business", pattern="^(sales|marketing|studio|business)$")
    company_context: str = Field(default="", max_length=3000)

@router.get("/readiness")
def jarvis_readiness():
    return {
        "engine": "jarvis", "application": "bonga-bhengu",
        "defined": True, "operational": False,
        "workflows": WORKFLOWS,
        "requires": ["authenticated_tenant", "configured_model_router",
                     "authorized_tools", "job_runner", "approval_policy"],
    }

@router.post("/plan")
def jarvis_plan(request: JarvisRequest):
    employees = WORKFLOWS[request.workflow]
    return {
        "objective": request.objective,
        "workflow": request.workflow,
        "company_context": request.company_context,
        "steps": [{"sequence": i + 1, "employee": employee,
                   "state": "pending_authorized_execution"}
                  for i, employee in enumerate(employees)],
        "status": "draft_not_executed",
        "approval_required": True,
        "external_actions_performed": 0,
    }
