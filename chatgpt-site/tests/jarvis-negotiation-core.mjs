import assert from "node:assert/strict";
import {startNegotiation,addCustomerTurn,coachNegotiation,recordAppointment,closeNegotiation} from "../src/agents/jarvis-negotiation-core.mjs";
const s=startNegotiation({tenantId:"t1",customerId:"c1",channel:"in-person"});
assert.throws(()=>addCustomerTurn(s,{source:"transcript",text:"hello"}),/consent/);
const withTurn=addCustomerTurn(s,{text:"We need better marketing"});
const response=coachNegotiation(withTurn,{offers:[
 {tenantId:"t1",active:true,id:"ok",name:"Growth",priceZAR:4000},
 {tenantId:"other",active:true,id:"bad",name:"Private",priceZAR:100},
 {tenantId:"t1",active:false,id:"inactive",name:"Inactive",priceZAR:1}
]});
assert.equal(response.eligibleOffers.length,1);
assert.equal(response.eligibleOffers[0].id,"ok");
assert.equal(response.suggestions.length,3);
assert.throws(()=>recordAppointment(s,{startsAt:"2026-10-12T10:00:00Z",method:"phone"}),/agreement/);
const booked=recordAppointment(s,{customerAgreed:true,startsAt:"2026-10-12T10:00:00Z",method:"phone"});
assert.equal(booked.confirmedAppointment.customerAgreed,true);
assert.throws(()=>addCustomerTurn(closeNegotiation(s),{text:"x"}),/not active/);
console.log("Jarvis negotiation core tests passed");
