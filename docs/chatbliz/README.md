# Run the Chatbliz OS prototype

This is a **local, single-user development prototype**, not a deployed multi-tenant product.

Requires Python 3.10+ (standard library only).

From this directory:

```bash
python3 server.py
```

Open **http://127.0.0.1:8765**. The chatboard shows exactly four products. Enter a brief and select **Create task**. Tasks persist in `chatbliz.sqlite3` and reload after refresh.

## Implemented
- Responsive four-product chatboard using scoped CSS
- Task creation, listing and persistence in SQLite
- Server-side input validation, generated task IDs, timestamps, explicit `queued_for_review` status
- Health endpoint `GET /api/health`

## Not implemented
AI model inference, Jarvis, MCP tools, authenticated users, tenant isolation, WhatsApp API, payments, real agent execution, production deployment. Do not call this a fully working AI business OS.

## API
`GET /api/tasks` lists the most recent 100 tasks.

`POST /api/tasks` with JSON `{"service":"My Business","brief":"Build a lead qualification workflow"}` creates a queued task.

**Security:** The API has no authentication and binds to `127.0.0.1` by default. Do not expose this server to the internet or bind it to `0.0.0.0`. Production requires authentication, tenant authorization, CSRF/origin protections, migrations, request limits and audit logs.

## Next Codex tasks
1. Identify and create/use the separate `chatbliz-os` application repository.
2. Add authentication and multi-tenant task ownership before public hosting.
3. Introduce the Jarvis orchestrator and MCP registry with explicit tool schemas and approval gates.
4. Reconnect the full AI workforce and shared CRM, test end-to-end, and add authorized WhatsApp Business APIs.
5. Add integration tests, accessibility checks and deployment pipeline.
