# Zuxuru App & Website Builder — Integration Blueprint

This module belongs to the existing Bonga Bhengu App platform. It is a customer-facing product sold through the storefront; it must not replace the platform, shared AI services, tenant model, or Creative Studio.

## Candidate open-source repositories

| Module | Upstream | Role |
| --- | --- | --- |
| Puck | https://github.com/puckeditor/puck | React visual page editing |
| GrapesJS | https://github.com/GrapesJS/grapesjs | HTML/CSS drag-and-drop website editing |
| Expo | https://github.com/expo/expo | React Native Android/iOS development |
| bolt.diy | https://github.com/stackblitz-labs/bolt.diy | AI-assisted app coding workspace |
| OpenHands | https://github.com/All-Hands-AI/OpenHands | Agent-assisted software engineering |
| Appsmith | https://github.com/appsmithorg/appsmith | Business/internal dashboards |

These are evaluated upstream dependencies, **not installed modules**. Check current licenses, third-party runtime terms, resource requirements and version compatibility before adoption. Do not vendor entire repositories or automatically execute untrusted generated code.

## Integration rules

1. Preserve the existing Bonga Bhengu App architecture and all current routes, agents, permissions and tenants.
2. Expose Zuxuru as a storefront product and a tenant-scoped builder workspace; share centrally governed AI model routing, billing and permissions.
3. Introduce a capability registry for visual-web, code, mobile, testing and deployment adapters.
4. Use Puck first for editable React pages; use GrapesJS for HTML/CSS editing where appropriate. Avoid loading both editors in one view.
5. Use Expo only for mobile application projects, not for replacing the existing web storefront.
6. Run AI coding workers in isolated, resource-limited environments with explicit approval for file changes, shell commands, network access and deployments.
7. Keep generated source in tenant-scoped projects, separate from platform source. Require previews, tests and approval before publishing.
8. Store external service credentials in secrets management, never tenant rows or browser code.
9. Do not claim working integrations until packages are installed, backend routes implemented, tests pass and deployment is verified.

## Delivery phases

- Phase 1: audit repository and framework, identify extension points, document license/security checks.
- Phase 2: implement tenant-scoped builder project models and capability registry behind feature flags.
- Phase 3: embed one visual editor with save/load/preview and authorization tests.
- Phase 4: connect sandboxed AI coding and Expo export pipelines.
- Phase 5: deployment adapters, observability, accessibility, rollback and end-to-end tests.

## Acceptance criteria

- Existing Creative Studio functionality remains unchanged.
- Builder access is scoped to authorized tenants.
- Projects can be saved, reopened, edited and previewed.
- No external publish or GitHub write occurs without an authorized approval.
- Android/mobile build claims require a real successful build.
