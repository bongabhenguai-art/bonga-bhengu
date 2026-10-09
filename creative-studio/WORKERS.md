# Hybrid worker execution

The task router is a starter implementation. It does **not** execute ComfyUI, Runway, Ollama, FFmpeg or other external tools yet.

- Local and cloud providers register their capabilities and availability.
- Unavailable workers must never be reported as working.
- Paid providers require explicit approval; the default is free/local.
- Tenant-scoped job identity and authorization must be verified before any external dispatch.
- Add queue persistence, retries, per-tenant limits, provider health checks and audit trails before production.
- An 8 GB laptop should not be assumed to support GPU video diffusion.

Run unit tests from `creative-studio` with `python -m unittest discover -s tests -v`.
