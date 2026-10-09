"""Development connector registry. No fake OAuth success or credential storage."""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal

router = APIRouter(prefix="/connections", tags=["connections"])
PROVIDERS = {
 "google": {"auth":"oauth2","features":["youtube","drive","business_profile"]},
 "meta": {"auth":"oauth2","features":["facebook","instagram"]},
 "tiktok": {"auth":"oauth2","features":["publishing"]},
 "github": {"auth":"oauth2","features":["repositories"]},
 "cloudflare": {"auth":"oauth2_or_token","features":["deployments"]},
 "wordpress": {"auth":"site_specific","features":["website_publishing"]},
 "runway": {"auth":"api_key","features":["video"]},
 "leonardo": {"auth":"api_key","features":["images"]},
 "comfyui": {"auth":"local_endpoint","features":["images","video"]},
 "ollama": {"auth":"local_endpoint","features":["text"]},
 "postiz": {"auth":"self_hosted","features":["social_publishing"]}
}
class ConnectRequest(BaseModel):
    tenant_id: str = Field(min_length=1)
    provider: str
    intent: Literal["connect","disconnect"] = "connect"

@router.get("/providers")
def providers():
    return [{"id":name, **value, "status":"configuration_required"} for name,value in PROVIDERS.items()]

@router.post("/prepare")
def prepare(data: ConnectRequest):
    if data.provider not in PROVIDERS:
        raise HTTPException(404, "Unsupported provider")
    # Real OAuth must generate a signed, expiring state and PKCE verifier,
    # redirect to a registered authorization endpoint, verify the callback,
    # and store encrypted tokens scoped to the authenticated tenant.
    return {"tenant_id":data.tenant_id, "provider":data.provider,
            "status":"configuration_required",
            "connected":False,
            "next_step":"Configure official provider credentials, callback, authenticated tenant session, and secure token vault"}
