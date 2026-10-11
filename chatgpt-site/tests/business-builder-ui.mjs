import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {briefFields,cleanBrief,questionFor,teamBrief,guidedCopy,renderBusinessDraft,appPlan} from '../dist/business-builder-core.js';
class Element{
 constructor(){this.value='';this.disabled=false;this.hidden=false;this.handlers={};this.children=[];}
 addEventListener(t,fn){this.handlers[t]=fn;}append(...n){this.children.push(...n);}replaceChildren(...n){this.children=n;}focus(){this.focused=true;}showModal(){this.open=true;}close(){this.open=false;this.handlers.close?.();}click(){return this.onclick?.();}
}
const html=fs.readFileSync('dist/website-editor.html','utf8'),nodes=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));
const b={name:'Bonga',industry:'Fashion',offer:'Custom garments',customer:'Local customers',goal:'Enquire',location:'Durban',contact:'+27831234567',story:'Made with care'};
let current={version:1,projectId:'one',revision:2,busy:false,brief:b},applied=null,resolveAI;
class Speech{start(){}abort(){this.aborted=true;}}
const speeches=[];class Capture extends Speech{constructor(){super();speeches.push(this);}}
const ctx={briefFields,cleanBrief,questionFor,teamBrief,guidedCopy,renderBusinessDraft,appPlan,document:{getElementById:id=>nodes.get(id),createElement:()=>new Element(),createDocumentFragment:()=>new Element()},window:{SpeechRecognition:Capture,bongaWebsiteBuilder:{context:()=>({...current}),apply:(draft,expected)=>{if(expected.version!==current.version)return {ok:false,error:'Editor changed'};applied=draft;return {ok:true};}}},fetch:async(path,options)=>options?.method==='POST'?new Promise(resolve=>{resolveAI=resolve;}):Response.json({setup:'Ready'}),URL,Blob,AbortController,setTimeout,navigator:{},console};
vm.runInNewContext(fs.readFileSync('dist/business-builder-ui.js','utf8').replace(/^import .*;\r?\n/,''),ctx);
await nodes.get('business-builder').click();assert.equal(nodes.get('business-builder-dialog').open,true);assert.match(nodes.get('builder-question').textContent,/name/);
nodes.get('builder-guided').click();assert.equal(nodes.get('builder-review').hidden,false);assert.match(nodes.get('builder-source').textContent,/no AI call/);assert.equal(applied,null,'Generation does not apply or publish');
current.version++;nodes.get('builder-apply').click();assert.equal(applied,null);assert.equal(nodes.get('builder-guide-status').textContent,'Editor changed');
nodes.get('builder-guided').click();nodes.get('builder-apply').click();assert.equal(applied.name,b.name);assert.equal(nodes.get('business-builder-dialog').open,false);
await nodes.get('business-builder').click();nodes.get('builder-voice').click();const speech=speeches.at(-1);speech.onerror({error:'not-allowed'});assert.match(nodes.get('builder-guide-status').textContent,/denied/);nodes.get('builder-guide-close').click();assert.equal(speech.aborted,true,'Closing releases voice input');
await nodes.get('business-builder').click();const pending=nodes.get('builder-ai').click();assert.equal(nodes.get('builder-answer').disabled,true);nodes.get('builder-guide-close').click();await nodes.get('business-builder').click();resolveAI(Response.json({copy:guidedCopy(b),source:'AI-generated draft'}));await pending;assert.equal(nodes.get('builder-review').hidden,true,'Late generation cannot overwrite a reopened interview');assert.equal(nodes.get('builder-answer').disabled,false);
console.log('PASS builder interview, guided review, explicit application, changed-editor rejection, denied microphone, voice cleanup and stale AI response isolation.');
