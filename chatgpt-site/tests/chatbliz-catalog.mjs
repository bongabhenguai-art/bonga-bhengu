import assert from "node:assert/strict";
import {CHATBLIZ_SERVICES,findChatblizService,resolveChatblizEngines,prepareChatblizEnquiry,evaluateChatblizOffer} from "../src/chatbliz/catalog.mjs";
assert.equal(CHATBLIZ_SERVICES.length,4);
assert.deepEqual(CHATBLIZ_SERVICES.map(s=>s.id),["my-brand","my-website","my-content","my-business"]);
assert.deepEqual(CHATBLIZ_SERVICES.map(s=>s.priceZAR),[299,499,600,2000]);
assert.equal(findChatblizService("unknown"),null);
const business=resolveChatblizEngines("my-business").map(x=>x.engine);
for(const id of ["my-brand","my-website","my-content"]){
 for(const {engine} of resolveChatblizEngines(id))assert.ok(business.includes(engine),id+" must reuse "+engine);
}
assert.deepEqual(findChatblizService("my-business").includes,["my-brand","my-website","my-content"]);
assert.throws(()=>prepareChatblizEnquiry({serviceId:"my-brand"}),/required/);
const draft=prepareChatblizEnquiry({serviceId:"my-business",businessName:"Sample business",need:"Improve leads",channel:"whatsapp",contact:"+27000000000",contactConsent:false});
assert.equal(draft.contact,"");assert.equal(draft.paymentStatus,"unverified");assert.equal(draft.appointment,null);
const consented=prepareChatblizEnquiry({serviceId:"my-brand",businessName:"Sample business",need:"Logo",channel:"email",contact:"test@example.org",contactConsent:true});
assert.equal(consented.contact,"test@example.org");assert.equal(consented.status,"draft");
const quote=evaluateChatblizOffer({serviceId:"my-content",verifiedNeeds:["Studio video"],priceZAR:4500});
assert.equal(quote.catalogPriceZAR,600);assert.equal(quote.paid,false);assert.equal(quote.quoteStatus,"requires-approval");
assert.throws(()=>evaluateChatblizOffer({serviceId:"my-content",priceZAR:-1}),/Invalid quote/);
console.log("Chatbliz catalog tests passed");
