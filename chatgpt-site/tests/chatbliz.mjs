import assert from 'node:assert/strict';
import {fieldsFor,eligible,labelFor,businessRoute,validAnswer} from '../dist/chatbliz-core.js';
const field=(name,type='text',disabled=false)=>({name,type,disabled});
const form={id:'order-form',elements:[field('customer'),field('key','password'),field('disabled','text',true),field('file','file'),field('approval','checkbox')],querySelector:()=>null};
assert.deepEqual(fieldsFor(form).map(e=>e.name),['customer']);
assert.equal(eligible(form),true);
assert.equal(eligible({...form,id:'bank-form'}),false);
assert.equal(eligible({...form,querySelector:()=>({type:'password'})}),false);
assert.equal(labelFor({name:'customer',labels:[{textContent:' Customer   name '}]}),'Customer name');
console.log('PASS Chatbliz excludes credentials, uploads, approval controls and disabled fields.');

const modules=['designer','orders','visual-website-editor','my-work','fashion-jarvis'].map(id=>({id,name:id}));
assert.equal(businessRoute('help with my customers',modules).id,'orders');
assert.equal(businessRoute('prepare my business for investors',modules).id,'fashion-jarvis');
assert.equal(businessRoute('build my website',modules).id,'visual-website-editor');
assert.equal(validAnswer({type:'date',cloneNode:()=>({set value(v){this._v='';},get value(){return this._v;},checkValidity:()=>true})},'next Tuesday').ok,false);
