"""Tenant-scoped subscription access service (development).

Never accept tenant_id alone as proof of ownership. The caller must supply an
authenticated principal with verified tenant membership.
"""
from dataclasses import dataclass
from catalog import Subscription, validate_selection
from limits import RESOURCE_PRODUCT, remaining

@dataclass(frozen=True)
class Principal:
    user_id: str
    tenant_ids: frozenset[str]

def authorize(principal: Principal, subscription: Subscription, product: str, resource: str, used: int = 0) -> dict:
    if not principal.user_id or subscription.tenant_id not in principal.tenant_ids:
        raise PermissionError("Tenant membership required")
    validate_selection(subscription)
    if subscription.status != "active":
        return {"allowed":False,"reason":"subscription_inactive","remaining":0}
    if product not in subscription.selected_products:
        return {"allowed":False,"reason":"product_not_selected","remaining":0}
    if resource in RESOURCE_PRODUCT and RESOURCE_PRODUCT[resource] != product:
        return {"allowed":False,"reason":"resource_product_mismatch","remaining":0}
    available = remaining(subscription, resource, used)
    if available <= 0:
        return {"allowed":False,"reason":"limit_reached","remaining":0}
    return {"allowed":True,"reason":"allowed","remaining":available}
