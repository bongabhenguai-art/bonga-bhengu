import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBSCRIPTION_PLANS, ENTITLEMENT_POLICY, getPlan, canUseFeature, planPriceZar } from '../worker/subscription-catalog.mjs';

test('prices and allowances match package contract', () => {
  const expected = [
    ['profile',299,2990,2,60,0,0,false],
    ['website',499,4990,4,60,5,0,false],
    ['storefront',799,7990,6,180,5,20,false],
    ['app',2599,25990,8,360,5,20,true]
  ];
  for (const [id,monthly,annual,tasks,minutes,pages,products,app] of expected) {
    const p=getPlan(id);
    assert.equal(planPriceZar(id,'monthly',true),monthly);
    assert.equal(planPriceZar(id,'annual',true),annual);
    assert.equal(p.salesPostsPerWeek,tasks);
    assert.equal(p.studioMinutesPerMonth,minutes);
    assert.equal(p.maxWebsitePages,pages);
    assert.equal(p.maxStoreProducts,products);
    assert.equal(p.webApp,app);
  }
});
test('higher tiers inherit features',()=>{
  const ids=['profile','website','storefront','app'];
  for(let i=1;i<ids.length;i++){
    for(const feature of SUBSCRIPTION_PLANS[ids[i-1]].features){
      assert.equal(canUseFeature(ids[i],feature),true);
    }
  }
});
test('invalid plans and billing periods fail closed',()=>{
  assert.throws(()=>getPlan('unknown'),RangeError);
  assert.throws(()=>planPriceZar('profile','weekly'),RangeError);
  assert.equal(canUseFeature('profile','storefront'),false);
});
test('launch and payment gates remain disabled',()=>{
  assert.equal(ENTITLEMENT_POLICY.foundingOfferEnabled,false);
  assert.equal(ENTITLEMENT_POLICY.livePaymentsEnabled,false);
  assert.equal(ENTITLEMENT_POLICY.annualTokensGrantedUpfront,false);
});
