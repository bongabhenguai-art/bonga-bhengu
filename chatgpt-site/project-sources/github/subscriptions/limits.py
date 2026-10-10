"""Draft monthly fair-use quotas; configuration only, not a billing engine."""
from catalog import PACKAGES, PRODUCTS, Subscription, validate_selection, can_use

# Product-specific limits apply only if that product is selected.
# These are PROPOSED values pending business-owner approval.
LIMITS = {
    "choose_one":   {"websites":1,"creative_jobs":10,"banners":5,"visibility_scans":2,"team_members":1},
    "choose_two":   {"websites":1,"creative_jobs":25,"banners":10,"visibility_scans":5,"team_members":2},
    "choose_three": {"websites":2,"creative_jobs":50,"banners":20,"visibility_scans":10,"team_members":3},
    "all_in_one":   {"websites":3,"creative_jobs":100,"banners":40,"visibility_scans":20,"team_members":5},
}
RESOURCE_PRODUCT = {
    "websites":"website_builder_hosting",
    "creative_jobs":"creative_studio",
    "banners":"digital_banner",
    "visibility_scans":"digital_visibility",
}
def allowance(subscription: Subscription, resource: str) -> int:
    validate_selection(subscription)
    if resource not in LIMITS[subscription.package]:
        raise ValueError("Unknown resource")
    if subscription.status != "active":
        return 0
    product = RESOURCE_PRODUCT.get(resource)
    if product and not can_use(subscription, product):
        return 0
    return LIMITS[subscription.package][resource]

def remaining(subscription: Subscription, resource: str, used: int) -> int:
    if used < 0:
        raise ValueError("Usage cannot be negative")
    return max(0, allowance(subscription,resource)-used)
