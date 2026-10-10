import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../dist/server/index.js';
import {laptopModules,findLaptopModules,LaptopPreferences,desktopDevice} from '../dist/laptop-modules.js';
import {LaptopRecorder} from '../dist/laptop-recorder.js';
import {LaptopFiles} from '../dist/laptop-files.js';

const env={JARVIS_OWNER_EMAIL:'owner@example.com'};
for(const route of ['/app-launch.js','/laptop.html','/laptop-shell.css','/laptop-shell.js','/laptop-home.js','/laptop-modules.js','/laptop-recorder.js','/laptop-files.js']) {
  const response=await worker.fetch(new Request('https://site.example'+route),env);assert.equal(response.status,200,route);assert.ok((await response.text()).length>40);
}
assert.equal(laptopModules.length,25);assert.equal(new Set(laptopModules.map(module=>module.name)).size,25);assert.equal(new Set(laptopModules.map(module=>module.href)).size,25);
for(const module of laptopModules){
  const url=new URL(module.href,'https://site.example');
  const response=await worker.fetch(new Request(url),env);assert.ok([200,302].includes(response.status),module.name);
  if(url.hash){const html=fs.readFileSync(`dist${url.pathname}`,'utf8');assert.ok(html.includes(`id="${url.hash.slice(1)}"`),`${module.name} section exists`);}
}
for(const route of ['/fashion-service.html','/digital-studio.html','/platform','/workspace'])assert.equal((await worker.fetch(new Request('https://site.example'+route),env)).status,302);
assert.equal((await worker.fetch(new Request('https://site.example/platform',{headers:{'oai-authenticated-user-id':'other','oai-authenticated-user-email':'other@example.com'}}),env)).status,403);
assert.deepEqual(findLaptopModules('business engine').map(module=>module.name),['Business engine']);assert.deepEqual(findLaptopModules('record window').map(module=>module.name),['Screen recorder']);assert.equal(findLaptopModules('nothing matches').length,0);assert.equal(findLaptopModules('','owner').length,2);
assert.equal(desktopDevice(()=>({matches:true})),true);assert.equal(desktopDevice(()=>({matches:false})),false);

// Corrupt, malicious or unavailable device storage cannot add arbitrary links.
const storage=new Map(), adapter={getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)},preferences=new LaptopPreferences(adapter);
storage.set(preferences.key,'bad json');assert.deepEqual(preferences.read(),{pinned:[],recent:[],compact:false});
storage.set(preferences.key,JSON.stringify({pinned:['javascript:alert(1)','/laptop.html#files','/laptop.html#files'],recent:['https://untrusted.example'],compact:'true'}));assert.deepEqual(preferences.read(),{pinned:['/laptop.html#files'],recent:[],compact:false});
assert.equal(preferences.pin('/platform'),true);assert.ok(preferences.read().pinned.includes('/platform'));preferences.pin('/platform');assert.ok(!preferences.read().pinned.includes('/platform'));assert.equal(preferences.visit('https://untrusted.example'),false);
for(const module of laptopModules)preferences.visit(module.href);assert.equal(preferences.read().recent.length,6);preferences.visit(laptopModules[0].href);preferences.visit(laptopModules[0].href);assert.equal(preferences.read().recent.filter(href=>href===laptopModules[0].href).length,1);
preferences.density(true);assert.equal(preferences.read().compact,true);preferences.reset();assert.deepEqual(preferences.read(),{pinned:[],recent:[],compact:false});
const blocked=new LaptopPreferences({getItem(){throw new Error();},setItem(){throw new Error();},removeItem(){throw new Error();}});assert.deepEqual(blocked.read(),{pinned:[],recent:[],compact:false});assert.equal(blocked.pin('/platform'),false);assert.equal(blocked.reset(),false);

// File limits, duplicate filtering and preview URL ownership use the real model.
const revoked=[],urlAPI={createObjectURL:file=>'blob:'+file.name,revokeObjectURL:url=>revoked.push(url)},list=new LaptopFiles({urlAPI,maxFiles:3,maxBytes:10,maxTotal:15});
const file=(name,size)=>new File([new Uint8Array(size)],name,{type:'text/plain',lastModified:1}),first=file('first.txt',6),second=file('second.txt',7);
assert.deepEqual(list.add([first,first,file('oversize.txt',11),second,file('over-total.txt',3)]),{added:2,skipped:3,count:2});
const firstId=[...list.items.keys()][0];assert.equal(list.url(firstId),'blob:first.txt');assert.equal(list.url(firstId),'blob:first.txt');list.remove(firstId);assert.deepEqual(revoked,['blob:first.txt']);assert.equal(await first.text(),'\0'.repeat(6),'Removing a list entry does not modify the original');
list.url([...list.items.keys()][0]);list.releaseURLs();assert.equal(list.items.size,1);assert.equal([...list.items.values()][0].url,null);list.url([...list.items.keys()][0]);list.clear();assert.equal(list.items.size,0);assert.equal(revoked.filter(url=>url==='blob:second.txt').length,2);
const capped=new LaptopFiles({urlAPI,maxFiles:1});assert.deepEqual(capped.add([first,second]),{added:1,skipped:1,count:1});

// Mock only browser hardware; exercise recording state, races and output.
let stopped=0,instances=[];
class Track extends EventTarget {constructor(kind){super();this.kind=kind;this.readyState='live';}stop(){if(this.readyState!=='ended'){this.readyState='ended';stopped++;}}end(){this.readyState='ended';this.dispatchEvent(new Event('ended'));}}
class Stream {constructor(tracks){this.tracks=tracks;}getTracks(){return this.tracks;}getVideoTracks(){return this.tracks.filter(track=>track.kind==='video');}getAudioTracks(){return this.tracks.filter(track=>track.kind==='audio');}}
class Recorder {
  static isTypeSupported(type){return type.startsWith('video/webm');}
  constructor(stream,{mimeType}={}){this.stream=stream;this.mimeType=mimeType;this.state='inactive';instances.push(this);}
  start(){this.state='recording';}pause(){this.state='paused';}resume(){this.state='recording';}
  stop(){this.state='inactive';this.ondataavailable?.({data:new Blob(['screen'],{type:this.mimeType})});this.onstop?.();}
}
const stream=(audio=false)=>new Stream([new Track('video'),...(audio?[new Track('audio')]:[])]),base={Recorder,Stream},states=[],outputs=[];
const capture=stream(true), engine=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:async()=>capture},onState:(state,message)=>states.push([state,message]),onFile:file=>outputs.push(file)});
await engine.start();await engine.start();assert.equal(instances.length,1);assert.equal(engine.state,'recording');engine.pause();assert.equal(engine.state,'paused');engine.pause();assert.equal(engine.state,'recording');engine.stop();assert.equal(engine.state,'idle');assert.equal(outputs.length,1);assert.equal(await outputs[0].text(),'screen');assert.match(outputs[0].name,/\.webm$/);assert.equal(stopped,2);assert.deepEqual(states.map(item=>item[0]),['requesting','recording','paused','recording','stopping','idle']);
let allow;const delayed=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:()=>new Promise(resolve=>{allow=resolve;})}});const pending=delayed.start();delayed.stop();const delayedStream=stream();allow(delayedStream);await pending;assert.equal(delayedStream.getVideoTracks()[0].readyState,'ended');assert.equal(delayed.state,'idle');assert.equal(instances.length,1);
let allowMic;const duringMic=stream();const micPending=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:async()=>duringMic,getUserMedia:()=>new Promise(resolve=>{allowMic=resolve;})}});const startMic=micPending.start('microphone');await Promise.resolve();assert.equal(micPending.state,'requesting');duringMic.getVideoTracks()[0].end();const micStream=new Stream([new Track('audio')]);allowMic(micStream);await startMic;assert.equal(micPending.state,'idle');assert.equal(micStream.getAudioTracks()[0].readyState,'ended');assert.equal(instances.length,1,'Ending display selection while waiting for microphone cannot begin recording');
let message='';const denied=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:async()=>{throw Object.assign(new Error(),{name:'NotAllowedError'});}},onState:(_state,value)=>message=value});await denied.start();assert.equal(denied.state,'idle');assert.match(message,/permission was cancelled or denied/);
const deniedDisplay=stream();const deniedMic=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:async()=>deniedDisplay,getUserMedia:async()=>{throw Object.assign(new Error(),{name:'NotAllowedError'});}}});await deniedMic.start('microphone');assert.equal(deniedDisplay.getVideoTracks()[0].readyState,'ended');assert.equal(deniedMic.state,'idle');
const endedFiles=[],endedDisplay=stream();const ended=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:async()=>endedDisplay},onFile:file=>endedFiles.push(file)});await ended.start('none');endedDisplay.getVideoTracks()[0].end();assert.equal(ended.state,'idle');assert.equal(endedFiles.length,1);
const limitedFiles=[],limited=new LaptopRecorder({...base,maxDuration:5,mediaDevices:{getDisplayMedia:async()=>stream()},onFile:file=>limitedFiles.push(file)});await limited.start();await new Promise(resolve=>setTimeout(resolve,15));assert.equal(limited.state,'idle');assert.equal(limitedFiles.length,1);
const sizeFiles=[],sizeLimited=new LaptopRecorder({...base,maxBytes:2,mediaDevices:{getDisplayMedia:async()=>stream()},onFile:file=>sizeFiles.push(file)});await sizeLimited.start();sizeLimited.recorder.ondataavailable({data:new Blob(['chunk'])});assert.equal(sizeLimited.state,'idle');assert.equal(sizeFiles.length,1);
const disposingFiles=[],disposing=new LaptopRecorder({...base,mediaDevices:{getDisplayMedia:async()=>stream()},onFile:file=>disposingFiles.push(file)});await disposing.start();disposing.pause();disposing.dispose();assert.equal(disposing.state,'idle');assert.equal(disposingFiles.length,0);assert.equal(disposing.recorder.state,'inactive');
let unsupported='';const unavailable=new LaptopRecorder({mediaDevices:{},Recorder:null,onState:(_state,value)=>unsupported=value});await unavailable.start();assert.match(unsupported,/unavailable/);
for(const recorder of [engine,delayed,micPending,denied,deniedMic,ended,limited,sizeLimited,disposing])recorder.dispose();
console.log('PASS laptop module routes, no duplicate modules, access rules, device preference validation, file limits and URL cleanup, screen recording lifecycle, pause/resume, cancelled permissions, microphone races, size/time limits and navigation cleanup');
