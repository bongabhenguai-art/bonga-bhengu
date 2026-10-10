import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import worker from '../dist/server/index.js';
import {phoneModules,matchingModules} from '../dist/phone-modules.js';
import {PhoneRecorder,canShareFile} from '../dist/phone-recorder.js';

const env={JARVIS_OWNER_EMAIL:'owner@example.com'};
for(const path of ['/phone.html','/phone-tools.html','/phone-shell.css','/phone-shell.js','/phone-recorder.js','/phone-modules.js']){
  const response=await worker.fetch(new Request('https://site.example'+path),env);
  assert.equal(response.status,200,path);assert.ok((await response.text()).length>100);
}
const manifestResponse=await worker.fetch(new Request('https://site.example/manifest.webmanifest'),env);
assert.equal(manifestResponse.headers.get('content-type'),'application/manifest+json');
const manifest=await manifestResponse.json();assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'/');assert.equal(manifest.id,'/phone.html','Keep the installed app identity');
for(const icon of manifest.icons){const response=await worker.fetch(new Request('https://site.example'+icon.src),env);assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'image/png');const bytes=Buffer.from(await response.arrayBuffer());assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`,icon.sizes);}
for(const module of phoneModules){
  const url=new URL(module.href,'https://site.example');
  if(url.hash){const html=fs.readFileSync(`dist${url.pathname}`,'utf8');assert.ok(html.includes(`id="${url.hash.slice(1)}"`),`${module.name} target exists`);}
  const response=await worker.fetch(new Request(url),env);assert.ok([200,302].includes(response.status),`${module.name} route responds`);
}
assert.deepEqual(matchingModules('business engine').map(m=>m.name),['Business engine']);assert.equal(matchingModules('nonexistent module').length,0);
for(const route of ['/platform','/workspace','/fashion-service.html','/digital-studio.html'])assert.equal((await worker.fetch(new Request('https://site.example'+route),env)).status,302,`${route} sign-in remains required`);
assert.equal((await worker.fetch(new Request('https://site.example/platform',{headers:{'oai-authenticated-user-id':'other','oai-authenticated-user-email':'other@example.com'}}),env)).status,403);

// Exercise microphone state transitions and delayed permission without browser hardware.
let stopped=0,instances=[];
const stream=()=>({getTracks:()=>[{stop(){stopped++;}}]});
class Recorder{
  static isTypeSupported(type){return type.startsWith('audio/webm');}
  constructor(stream,{mimeType}={}){this.mimeType=mimeType;this.state='inactive';instances.push(this);}
  start(){this.state='recording';}
  stop(){this.state='inactive';this.ondataavailable?.({data:new Blob(['voice'],{type:this.mimeType})});this.onstop?.();}
}
const states=[],recordings=[];
const engine=new PhoneRecorder({mediaDevices:{getUserMedia:async()=>stream()},Recorder,onState:(state,message)=>states.push([state,message]),onFile:file=>recordings.push(file)});
await engine.start();assert.equal(engine.state,'recording');await engine.start();assert.equal(instances.length,1,'Repeated start cannot open another microphone');engine.stop();assert.equal(engine.state,'idle');assert.equal(stopped,1);assert.equal(recordings.length,1);assert.match(recordings[0].name,/\.webm$/);assert.equal(await recordings[0].text(),'voice');assert.deepEqual(states.map(s=>s[0]),['requesting','recording','stopping','idle']);
let allow;
const pending=new PhoneRecorder({mediaDevices:{getUserMedia:()=>new Promise(resolve=>{allow=resolve;})},Recorder});
const start=pending.start();pending.dispose();allow(stream());await start;assert.equal(pending.state,'idle');assert.equal(stopped,2,'Delayed microphone permission is closed after leaving');assert.equal(instances.length,1);
let deniedMessage='';const denied=new PhoneRecorder({mediaDevices:{getUserMedia:async()=>{throw Object.assign(new Error(),{name:'NotAllowedError'});}},Recorder,onState:(state,message)=>{deniedMessage=message;}});await denied.start();assert.equal(denied.state,'idle');assert.match(deniedMessage,/permission was denied/);
let unsupportedMessage='';const unsupported=new PhoneRecorder({mediaDevices:{},Recorder:null,onState:(state,message)=>{unsupportedMessage=message;}});await unsupported.start();assert.match(unsupportedMessage,/Choose an audio file/);
const automatic=[];const limited=new PhoneRecorder({mediaDevices:{getUserMedia:async()=>stream()},Recorder,maxDuration:5,onFile:file=>automatic.push(file)});await limited.start();await new Promise(resolve=>setTimeout(resolve,15));assert.equal(limited.state,'idle');assert.equal(automatic.length,1);assert.equal(stopped,3,'Duration limit releases microphone');
const file=recordings[0];assert.equal(canShareFile(file,{share(){},canShare:()=>true}),true);assert.equal(canShareFile(file,{}),false);assert.equal(canShareFile(file,{share(){},canShare:()=>{throw new Error();}}),false);
engine.dispose();pending.dispose();denied.dispose();limited.dispose();

// A Jarvis icon must reveal its parent workspace before scrolling to the nested panel.
const elements=new Map([...fs.readFileSync('dist/fashion-service.html','utf8').matchAll(/id="([^"]+)"/g)].map(match=>[match[1],{hidden:false,scrollIntoView(){this.scrolled=true;}}]));
const handlers={},location={hash:'#fashion-jarvis'};
const navigation=['#fashion-jarvis','#business-engine'].map(href=>({href,attrs:{},classList:{toggle(){}},getAttribute(){return href;},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}}));
vm.runInNewContext(fs.readFileSync('dist/designer-dashboard.js','utf8'),{document:{body:{classList:{contains:()=>false}},getElementById:id=>elements.get(id),querySelectorAll:()=>navigation,addEventListener(){}},window:{addEventListener:(type,handler)=>handlers[type]=handler},location,localStorage:{getItem:()=>null},setTimeout:callback=>callback()});
assert.equal(elements.get('overview').hidden,false);assert.equal(elements.get('fashion-jarvis').scrolled,true);assert.equal(navigation[0].attrs['aria-current'],'page');
location.hash='#business-engine';handlers.hashchange();assert.equal(elements.get('overview').hidden,true);assert.equal(elements.get('business-engine').hidden,false);assert.equal(navigation[1].attrs['aria-current'],'page');
console.log('PASS phone modules and routes, Android manifest/icons, access guards, recording, permission races, duration limit, share capability and nested workspace navigation');
