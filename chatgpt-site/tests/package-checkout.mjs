import assert from 'node:assert/strict';
import {landingSystem,fashionPackages} from '../worker/landing-system.mjs';
import {testDatabase} from './support/sqlite.mjs';
const env={DB:testDatabase().DB},origin='https://site.example';
for(const p of fashionPackages){
 const quote=await landingSystem(new Request(origin+'/api/public/checkout?tier='+p.id+'&price=1'),env);assert.equal(quote.status,200);const q=await quote.json();assert.equal(q.subscription.amountMinor,p.price*100);assert.equal(q.subscription.currency,'ZAR');assert.equal(q.subscription.interval,'month');assert.equal(q.billingConnected,false);
 const request=await landingSystem(new Request(origin+'/api/designer/package',{method:'POST',headers:{origin,'oai-authenticated-user-id':'buyer'},body:JSON.stringify({tier:p.id,price:1})}),env);assert.equal(request.status,200);const d=await request.json();assert.deepEqual(d.subscription,q.subscription);assert.equal(d.active,false);
 const saved=await landingSystem(new Request(origin+'/api/designer/package',{headers:{'oai-authenticated-user-id':'buyer'}}),env);assert.deepEqual((await saved.json()).subscription,q.subscription);
}
assert.equal((await landingSystem(new Request(origin+'/api/public/checkout?tier=invalid'),env)).status,400);
assert.equal((await landingSystem(new Request(origin+'/api/designer/package',{method:'POST',headers:{origin},body:'{"tier":"start"}'}),env)).status,401);
console.log('PASS catalogue, checkout and saved request prices agree; client price ignored; no payment or activation claimed');
