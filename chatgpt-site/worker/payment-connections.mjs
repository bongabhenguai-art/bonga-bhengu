const connections = [
  {
    id: 'google-pay', name: 'Google Pay', status: 'not_connected',
    environment: 'test', livePaymentsEnabled: false,
    developerMcpUrl: 'https://paydeveloper.googleapis.com/mcp',
    documentation: 'https://developers.google.com/pay/api/web/guides/use-pay-wallet-mcp',
    requires: ['Google Cloud project and Pay & Wallet Developer API', 'OAuth authorization and IAM permissions', 'Supported payment gateway and merchant approval'],
    note: 'Developer MCP manages integrations and diagnostics; it is not a checkout payment processor.'
  },
  {
    id: 'paypal', name: 'PayPal', status: 'not_connected',
    environment: 'sandbox', livePaymentsEnabled: false,
    developerMcpUrl: 'https://mcp.sandbox.paypal.com/http',
    documentation: 'https://developer.paypal.com/ai-tools/mcp-server',
    requires: ['PayPal sandbox merchant account', 'Merchant OAuth consent', 'Server-side checkout and verified webhooks before production'],
    note: 'Example configuration only. No PayPal authorization or provider calls have been made.'
  },
  {
    id: 'bank', name: 'Capitec Business', status: 'provider_required',
    country: 'ZA', currency: 'ZAR', livePaymentsEnabled: false,
    documentation: 'https://www.capitecbank.co.za/business/',
    requires: ['Approved South African bank or payment-provider integration', 'Merchant onboarding and settlement-account verification', 'Bank-hosted consent and signed server-side payment confirmation'],
    note: 'No direct bank API or MCP endpoint is configured. A payment card is not a bank API credential.'
  }
];

export function paymentConnectionStatus() {
  // Return fresh, public setup metadata; never inspect or return credential storage.
  return { platform: 'Bonga Bhengu OS', country: 'ZA', currency: 'ZAR',
    livePaymentsEnabled: false, connections: structuredClone(connections) };
}

export function registerPaymentTools(server, user) {
  server.registerTool('bonga_payment_connection_status', {
    title: 'Read Bonga Bhengu payment setup',
    description: 'Read setup requirements for Google Pay, PayPal sandbox and Capitec Business. All connections are disabled. Does not authorize providers, read bank accounts, create orders, charge cards or transfer money.',
    inputSchema: {},
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
  }, async () => {
    if (!user) return { isError: true, content: [{ type: 'text', text: 'Sign in before checking payment setup.' }] };
    const status = paymentConnectionStatus();
    return { structuredContent: status, content: [{ type: 'text', text: JSON.stringify(status) }] };
  });
}
