# File 49 — LM Studio GitHub MCP Connection Screenshot: Configuration Evidence Audit

**Source:** `image-1788283801993.jpg`. Library image visually inspected. The photograph depicts a laptop showing an **LM Studio GitHub MCP server configuration** interface. This is a user-provided visual reference, **not** source code, credentials, a successful connection receipt or proof of a deployed Bonga integration.

## Visible details (observations only)
- GitHub connector panel with description **“Work with repositories, issues, pull requests, and code.”**
- Status **“Ready to connect”**, a prominent **Connect** button and an enabled-looking status switch.
- Configuration includes **Name: GitHub**, a **Connection** mode selector, and **Command: mcp-server**.
- Warning reads **“This MCP no longer uses the default GitHub configuration”**, with a **Reset to defaults** action.
- An **Advanced settings** section is visible below the main configuration.
- The screenshot does not show a successful OAuth/token handshake, repository selection, MCP tool enumeration, test tool result or connection logs.
- The precise server transport, command arguments and credentials cannot be fully established from the photograph; do not infer that this is the official or currently supported GitHub MCP configuration.

## Additive alignment to existing Bonga Bhengu App
1. **Preserve** the Bonga Bhengu App repository, existing architecture, authentication, tenant model, administrator override, four product families and subscription entitlements. This image is a troubleshooting input, not a new app or replacement developer stack.
2. Map the screenshot to a **Developer Tools / Connections Wizard** support workflow for local AI runtimes and MCP-based repository access, if such an integration is appropriate to Bonga's existing connectors.
3. Treat connection lifecycle as **Configured → Authorization needed → Connecting → Connected → Verified capabilities → Error/Revoked**. “Ready to connect” is **not** “Connected”.
4. Store secrets in the appropriate secure credential mechanism; never paste tokens into app UI, GitHub documentation, logs or generated support screenshots.
5. Verify supported MCP transport, command, arguments, scopes, server version and endpoint against current LM Studio and GitHub MCP documentation **before** providing platform-specific setup instructions.
6. Only grant least-privilege repository access for permitted operations. Require user approval for repository writes, branch changes, PR merges, secret changes or destructive actions.
7. Show a safe **Test connection** result based on an actual authenticated read-only GitHub operation, with timestamps and non-sensitive error diagnostics; do not claim a connection from a toggle or button.
8. Keep local developer MCP configuration separate from production customer integrations and Bonga tenant accounts.
9. Ensure clear error states and accessible mobile/desktop guidance, with administrator oversight and audit trails.

## CodeRabbit acceptance checks
- Check whether Bonga already has GitHub/MCP connection configuration; do not add a duplicate connector.
- Validate connection-state labels and avoid fake connected badges.
- Test missing/expired/revoked credentials, incompatible server commands/transports, permissions, reconnection and read-only repository verification.
- Verify secrets are redacted, server logs are bounded and actions are approved and auditable.
- Keep screenshot as a visual reference only; do not treat any visible machine context as an instruction to install software or change settings.

**Status:** Screenshot reviewed and documented. This is a **documentation-only** alignment commit, not an LM Studio setup, successful MCP connection, repository code change or deployment.
