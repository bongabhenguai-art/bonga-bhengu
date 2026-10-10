# ZUXURU — Integration Matrix

| Capability | Role in Zuxuru | Data direction | Initial status rule |
|---|---|---|---|
| GitHub | Source repository | Zuxuru ↔ repo | Must be explicitly accessible |
| Supabase | Application data/infrastructure | App ↔ DB/services | Verify project and credentials |
| Logto | Identity | User ↔ identity provider | Verify tenant/config |
| Netlify | Web deployment | Repo → deployment | Verify site/build connection |
| Postiz | Social publishing capability | Zuxuru ↔ publishing layer | Verify supported platforms/actions |
| ComfyUI | Creative generation capability | Zuxuru → generation workflow | Verify endpoint/workflows |
| OmniRoute | Model/provider routing | Zuxuru ↔ model routing | Verify endpoint/auth |
| Agent-Reach | Agent capability | Zuxuru ↔ agent service | Verify exact API/capability |
| ToolJet | Internal operational UI/capability | Zuxuru ↔ internal tools | Verify deployment/access |
| Website/CMS | Business website | Website ↔ Zuxuru | Verify ownership/authorization |
| Google services | Search/local/analytics intelligence | Provider ↔ Zuxuru | Use supported authorized APIs |
| Social platforms | Organic visibility/distribution | Platform ↔ Zuxuru | Respect platform permissions/limits |

## Connector state model

```text
DISCOVERED
  ↓
AVAILABLE
  ↓
AUTHORIZING
  ↓
CONNECTED
  ↓
VERIFIED
  ↓
SYNCING
  ↓
ACTIVE
  ↓
MONITORING
```

Failure states must be explicit:

```text
AUTH_FAILED
PERMISSION_REVOKED
SYNC_FAILED
RATE_LIMITED
PROVIDER_ERROR
DISCONNECTED
```

## Integration rule

An external service is a plug/capability. Zuxuru owns the business workflow, shared context, permissions, evidence, recommendations and learning loop.
