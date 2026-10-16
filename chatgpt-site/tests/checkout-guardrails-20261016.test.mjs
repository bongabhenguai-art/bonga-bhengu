import test from 'node:test';
import assert from 'node:assert/strict';
import { landingSystem, fashionPackages } from '../worker/landing-system.mjs';

const origin = 'https://site.example';
const request = (path, init) => new Request(origin + path, init);
const read = async response => ({status:response.status, data:await response.json()});

test('all public package quotes remain explicitly unpaid and use server catalogue prices', async () => {
  for (const plan of fashionPackages) {
    const {status,data} = await read(await landingSystem(request('/api/public/checkout?tier='+plan.id+'&price=1'), {}));
    assert.equal(status,200);
    assert.equal(data.subscription.amountMinor,plan.price*100);
    assert.equal(data.subscription.paymentStatus,'not_connected');
    assert.equal(data.subscription.active,false);
    assert.equal(data.billingConnected,false);
  }
});
test('invalid tier cannot create a quote', async () => {
  assert.equal((await landingSystem(request('/api/public/checkout?tier=missing'),{})).status,400);
});
test('unauthenticated package requests are rejected', async () => {
  assert.equal((await landingSystem(request('/api/designer/package',{method:'POST',headers:{origin},body:'{"tier":"start"}'}),{DB:{}})).status,401);
});
test('cross-origin package requests are rejected before any database write', async () => {
  const result=await landingSystem(request('/api/designer/package',{method:'POST',headers:{origin:'https://untrusted.example','oai-authenticated-user-id':'test-user'},body:'{"tier":"start"}'}),{DB:{}});
  assert.equal(result.status,403);
});
test('oversized and invalid JSON bodies are rejected before database write', async () => {
  const headers={origin,'oai-authenticated-user-id':'test-user'};
  const tooLarge=await landingSystem(request('/api/designer/package',{method:'POST',headers,body:'x'.repeat(1001)}),{DB:{}});
  assert.equal(tooLarge.status,413);
  const invalid=await landingSystem(request('/api/designer/package',{method:'POST',headers,body:'{bad json'}),{DB:{}});
  assert.equal(invalid.status,400);
});
test('missing database cannot silently claim activation or payment', async () => {
  const result=await read(await landingSystem(request('/api/designer/package',{method:'POST',headers:{origin,'oai-authenticated-user-id':'test-user'},body:'{"tier":"start"}'}),{}));
  assert.equal(result.status,503);
  assert.equal(result.data.active,undefined);
});
