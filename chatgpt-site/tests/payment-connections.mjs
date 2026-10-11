import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { paymentConnectionStatus, registerPaymentTools } from '../worker/payment-connections.mjs';

const originalFetch = globalThis.fetch;
globalThis.fetch = () => { throw new Error('Payment setup must not call providers'); };
try {
  const status = paymentConnectionStatus();
  assert.equal(status.country, 'ZA');
  assert.equal(status.currency, 'ZAR');
  assert.equal(status.livePaymentsEnabled, false);
  assert.deepEqual(status.connections.map(c => c.id), ['google-pay', 'paypal', 'bank']);
  assert.ok(status.connections.every(c => !c.livePaymentsEnabled));
  assert.equal(status.connections[2].name, 'Capitec Business');
  assert.equal(status.connections[2].developerMcpUrl, undefined);
  status.connections[0].status = 'connected';
  assert.equal(paymentConnectionStatus().connections[0].status, 'not_connected');

  for (const user of [null, '', 'authenticated-test-user']) {
    const registered = [];
    registerPaymentTools({ registerTool: (...args) => registered.push(args) }, user);
    assert.equal(registered.length, 1);
    const [name, definition, handler] = registered[0];
    assert.equal(name, 'bonga_payment_connection_status');
    assert.equal(definition.annotations.readOnlyHint, true);
    assert.equal(definition.annotations.openWorldHint, false);
    const result = await handler({});
    if (!user) {
      assert.equal(result.isError, true);
      assert.equal(result.structuredContent, undefined);
    } else {
      assert.equal(result.structuredContent.livePaymentsEnabled, false);
      assert.equal(result.structuredContent.connections.length, 3);
    }
  }
  const example = JSON.parse(await readFile(new URL('../integrations/payment-mcp.example.json', import.meta.url), 'utf8'));
  assert.deepEqual(Object.values(example.mcpServers).map(c => c.url), [
    'https://paydeveloper.googleapis.com/mcp', 'https://mcp.sandbox.paypal.com/http'
  ]);
  assert.ok(Object.values(example.mcpServers).every(c => Object.keys(c).length === 1));
  const source = await readFile(new URL('../worker/business-mcp.mjs', import.meta.url), 'utf8');
  assert.match(source, /registerPaymentTools\(server,user\)/);
  console.log('PASS payment setup: authenticated read-only tool, disabled connections, no provider calls or credentials.');
} finally { globalThis.fetch = originalFetch; }
