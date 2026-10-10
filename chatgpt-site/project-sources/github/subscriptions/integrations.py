"""Product-specific integration requirements; readiness is never assumed."""
from catalog import PRODUCTS

INTEGRATIONS = {
 "website_builder_hosting": {
    "required": ["hosting"],
    "optional": ["github","cloudflare","wordpress"]},
 "digital_visibility": {
    "required": ["analytics_source"],
    "optional": ["google","meta","tiktok"]},
 "creative_studio": {
    "required": ["creative_worker"],
    "optional": ["ollama","comfyui","runway","leonardo","storage"]},
 "digital_banner": {
    "required": ["banner_renderer"],
    "optional": ["meta","google","postiz","website_publisher"]},
}

def integration_plan(selected_products: list[str], connected: set[str]):
    if any(product not in PRODUCTS for product in selected_products):
        raise ValueError("Unknown product")
    return {
        product: {
            "required": INTEGRATIONS[product]["required"],
            "optional": INTEGRATIONS[product]["optional"],
            "missing_required": [key for key in INTEGRATIONS[product]["required"] if key not in connected],
            "ready": all(key in connected for key in INTEGRATIONS[product]["required"])
        } for product in selected_products
    }
