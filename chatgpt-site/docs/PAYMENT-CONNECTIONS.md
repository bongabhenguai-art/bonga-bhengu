# Bonga Bhengu OS Payment Connections

## Current state

This is a setup foundation, not a live payment integration. The existing business MCP workspace now exposes `bonga_payment_connection_status`, an authenticated read-only tool. It returns provider requirements only, without accessing credentials, bank records or external services. No new app interface or separate payment agent is introduced.

Country: South Africa (`ZA`). Currency: `ZAR`. Proposed bank: Capitec Business. All payment execution remains disabled. The country and bank describe this deployment, not an authenticated user's bank account.

## Official developer connections

`integrations/payment-mcp.example.json` is an example for an HTTP-capable MCP client. It is not automatically loaded by the app and contains no credentials. Complete authorization in the provider's hosted flow, not by pasting secrets into a repository or chat. Client-specific configuration may differ.

- [Google Pay & Wallet Developer MCP](https://developers.google.com/pay/api/web/guides/use-pay-wallet-mcp): enable its Google Cloud API and configure OAuth/IAM. The preview service supports merchant integration status and diagnostics. It does not replace checkout. Customer payments still require [Google Pay checkout](https://developers.google.com/pay/api/web/overview), a supported processor, and merchant production approval.
- [PayPal official MCP](https://developer.paypal.com/ai-tools/mcp-server): the example uses the sandbox Streamable HTTP endpoint. Merchant consent is required. Do not connect production or enable financial write tools until permissions and per-action confirmation are reviewed. For customer checkout, use [server-side PayPal Checkout](https://developer.paypal.com/studio/checkout/standard/integrate) separately.
- [Capitec Business](https://www.capitecbank.co.za/business/): choose an approved merchant gateway or bank integration after confirming the use case and onboarding requirements. No bank endpoint is guessed. [Capitec Pay](https://www.capitecbank.co.za/personal/transact/capitec-pay-payment-provider/) is a provider integration option, not proof that this business account is connected or eligible.

## Before enabling payments

1. Confirm whether the use case is receiving customer payments or account-data access.
2. Select the approved South African provider and complete merchant/settlement onboarding.
3. Store provider secrets only in approved server-side encrypted storage. Never store card numbers, security codes, bank passwords or access tokens in GitHub, localStorage, tool responses or logs.
4. Use tenant-scoped authorization. Compute amounts and currency server-side from authoritative orders. Require explicit customer consent; AI may not autonomously debit, refund or transfer.
5. Add provider adapters, idempotent order handling, verified webhooks and reconciliation. A browser redirect or draft invoice must never mark an order paid.
6. Test success, cancellation, duplicate callbacks, rejected authorization and tenant isolation in sandbox before a separately approved production release.

The example endpoints do not establish a connection merely by existing in GitHub. Site deployment remains a separate step through the existing publication workflow.

## Verification

Run `node tests/payment-connections.mjs`, then build the app and run `node tests/mcp-worker.mjs` in a fully installed checkout. No bank or merchant credentials are needed for the unit tests.
