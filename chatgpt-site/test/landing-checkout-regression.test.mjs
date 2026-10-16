import test from 'node:test';
import assert from 'node:assert/strict';
import { landingSystem } from '../worker/landing-system.mjs';

const request = (path, init={}) => new Request('https://example.test'+path,init);
const json = async response => ({status:response.status,body:await response.json()});

test('package listing does not imply that payment is enabled', async () => {
  const {status,body}=await json(await landingSystem(request('/api/public/packages'),{}));
  assert.equal(status,200);
  assert.equal(body.billingConnected,false);
  assert.ok(body.packages.length>0);
  assert.ok(body.packages.every(p=>Number.isInteger(p.amountMinor)&&p.amountMinor>0));
});

test('checkout must not report a paid or active subscription without provider verification',async()=>{
  const {status,body}=await json(await landingSystem(request('/api/public/checkout?tier=start'),{}));
  assert.equal(status,200);
  assert.equal(body.billingConnected,false);
  assert.equal(body.subscription.paymentStatus,'not_connected');
  assert.equal(body.subscription.active,false);
});

test('checkout rejects unknown tiers and mutation requests',async()=>{
  const unknown=await landingSystem(request('/api/public/checkout?tier=unlisted'),{});
  assert.equal(unknown.status,400);
  const post=await landingSystem(request('/api/public/checkout?tier=start',{method:'POST'}),{});
  assert.equal(post.status,405);
});

test('package requests require authenticated identity and do not create a sale',async()=>{
  const {status,body}=await json(await landingSystem(request('/api/designer/package',{method:'POST',headers:{origin:'https://example.test','content-type':'application/json'},body:JSON.stringify({tier:'start'})}),{}));
  assert.equal(status,401);
  assert.equal(body.error,'Sign in to request a package.');
});

test('public operational status does not manufacture connected services',async()=>{
  const {status,body}=await json(await landingSystem(request('/api/public/status'),{}));
  assert.equal(status,200);
  assert.equal(body.workspace,'Unavailable');
  assert.equal(body.fileStorage,'Unavailable');
  assert.equal(body.ai,'Disconnected');
});
