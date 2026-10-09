"""Four Bonga Bhengu products, configurable packages and entitlement checks."""
from dataclasses import dataclass
from typing import Optional

PRODUCTS = {
    "website_builder_hosting": "Website Builder & Hosting",
    "digital_visibility": "Digital Visibility",
    "creative_studio": "Digital Creative Studio",
    "digital_banner": "Digital Banner",
}
PACKAGES = {
    "choose_one": {"product_count":1,"monthly_zar":299},
    "choose_two": {"product_count":2,"monthly_zar":499},
    "choose_three": {"product_count":3,"monthly_zar":None},
    "all_in_one": {"product_count":4,"monthly_zar":None},
}
LEGACY_THREE_PRODUCT_ALL_IN_ONE_ZAR = 699

@dataclass(frozen=True)
class Subscription:
    tenant_id: str
    package: str
    selected_products: tuple[str, ...]
    status: str = "pending"

def validate_selection(subscription: Subscription):
    if subscription.package not in PACKAGES:
        raise ValueError("Unknown subscription package")
    products = subscription.selected_products
    if len(set(products)) != len(products):
        raise ValueError("Duplicate products")
    if any(p not in PRODUCTS for p in products):
        raise ValueError("Unknown product")
    if len(products) != PACKAGES[subscription.package]["product_count"]:
        raise ValueError("Product count does not match package")
    if subscription.package == "all_in_one" and set(products) != set(PRODUCTS):
        raise ValueError("All-in-One must include all products")
    return True

def can_use(subscription: Subscription, product: str) -> bool:
    validate_selection(subscription)
    return subscription.status == "active" and product in subscription.selected_products

def price_ready(package: str) -> bool:
    if package not in PACKAGES:
        raise ValueError("Unknown package")
    return PACKAGES[package]["monthly_zar"] is not None
