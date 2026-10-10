# Shared Creative Studio module registry

One backend for the agency and customer tenants. All integrations are optional adapters, not duplicated per tenant.

| Module | Source | Runtime | State |
|---|---|---|---|
| Studio API | creative-studio/app.py | local/cloud Python | starter |
| Animation | creative-studio/animation.py | local/cloud HTML | starter |
| Connections | creative-studio/connections.py | local/cloud Python | registry only |
| ComfyUI | https://github.com/comfyanonymous/ComfyUI | GPU local/cloud | candidate; not installed |
| Ollama | https://github.com/ollama/ollama | local/cloud | candidate; not installed |
| FFmpeg | https://github.com/FFmpeg/FFmpeg | local/cloud | candidate; not installed |
| Remotion | https://github.com/remotion-dev/remotion | Node local/cloud | candidate; not installed |
| n8n | https://github.com/n8n-io/n8n | local/cloud | candidate; not installed |
| Postiz | https://github.com/gitroomhq/postiz-app | local/cloud | candidate; not installed |
| OpenX Flow | https://github.com/OpenX-Inc/flow | GPU cloud | candidate; not installed |
| Open Generative AI | https://github.com/Anil-matcha/Open-Generative-AI | review requirements | candidate; not installed |

Do not copy third-party code until licenses, dependencies, and hardware requirements have been verified. A GitHub repository is a source and CI host, not an always-on server.

Security: starter API is unauthenticated; localhost only. No real customer data or public exposure until auth, tenant isolation, encrypted credentials and authorization tests exist.
