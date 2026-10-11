import test from 'node:test';
import assert from 'node:assert/strict';
import {buildInfluenceCampaign} from '../worker/influence-campaign-planner.mjs';
const input={businessName:'Example Salon',audience:'local clients',customerProblem:'missing appointment enquiries',offer:'an online booking enquiry',platforms:['Instagram','Facebook','Instagram','Unknown']};
test('builds a draft social profile and deduplicated posts',()=>{
 const campaign=buildInfluenceCampaign(input);
 assert.equal(campaign.posts.length,2);
 assert.equal(campaign.socialProfile.displayName,'Example Salon');
 assert.equal(campaign.approvalRequired,true);
 assert.equal(campaign.publishingStatus,'not_connected');
 assert.ok(campaign.funnel.hook.includes('missing appointment enquiries'));
});
test('rejects missing campaign essentials',()=>{
 assert.throws(()=>buildInfluenceCampaign({...input,offer:''}),TypeError);
 assert.throws(()=>buildInfluenceCampaign({...input,platforms:['Unknown']}),RangeError);
});
