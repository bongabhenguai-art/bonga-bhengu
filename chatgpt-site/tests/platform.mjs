import assert from 'node:assert/strict';
import worker from '../dist/server/index.js';
import {jarvisRole} from '../worker/jarvis-team.mjs';
const env={JARVIS_OWNER_EMAIL:'owner@example.com'};
for(const route of ['/platform','/platform.html']){
 const guest=await worker.fetch(new Request('https://site.example'+route),env);assert.equal(guest.status,302);assert.ok(guest.headers.get('location').includes('return_to=%2Fplatform'));
 const other=await worker.fetch(new Request('https://site.example'+route,{headers:{'oai-authenticated-user-id':'other','oai-authenticated-user-email':'other@example.com'}}),env);assert.equal(other.status,403);
 const owner=await worker.fetch(new Request('https://site.example'+route,{headers:{'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'owner@example.com'}}),env);assert.equal(owner.status,200);const html=await owner.text();assert.ok(html.includes('Business Scraper AI'));assert.ok(html.includes('/app.html?module=growth#growth'));assert.ok(!html.includes('https://zuxuru.donlegendwear.chatgpt.site'));assert.ok(html.includes('/fashion-service.html#storefront-editor'));
}
assert.ok(jarvisRole('needs').brief.includes('customer needs')||jarvisRole('needs').brief.includes('customer needs'.replace('customer','prospective customer')));
assert.ok(jarvisRole('needs').brief.includes('evidence'));
assert.ok(jarvisRole('builder').brief.includes('Preserve working modules'));
console.log('PASS platform routes, owner-only access, integrated system links and specialist scope');
