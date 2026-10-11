import test from 'node:test';
import assert from 'node:assert/strict';
import {qualifyFishingLead} from '../worker/fishing-qualification.mjs';

const evidence=[{url:'https://example.com',observation:'Public page has no checkout link',observedAt:'2026-10-11'}];
test('evidence-backed checkout gap recommends storefront',()=>{
 const result=qualifyFishingLead({businessName:'Example Store',gaps:['missing_checkout','weak_call_to_action'],evidence});
 assert.equal(result.recommendedPlanId,'storefront');
 assert.equal(result.opportunityScore,45);
 assert.equal(result.launchMonthlyZar,799);
 assert.equal(result.ownerApproved,false);
});
test('without evidence, score is zero and outreach is not approved',()=>{
 const result=qualifyFishingLead({businessName:'Example',gaps:['missing_checkout']});
 assert.equal(result.opportunityScore,0);
 assert.equal(result.evidence.length,0);
 assert.equal(result.ownerApproved,false);
});
test('unrecognized gaps cannot inflate scores',()=>{
 const result=qualifyFishingLead({businessName:'Example',gaps:['fake_gap','missing_website','missing_website'],evidence});
 assert.equal(result.opportunityScore,25);
 assert.equal(result.recommendedPlanId,'website');
});
test('missing business name is rejected',()=>assert.throws(()=>qualifyFishingLead({}),TypeError));
