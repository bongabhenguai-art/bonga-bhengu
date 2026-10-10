import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const elements=new Map(),events={};let tick,state={},recordStarts=0,recordStops=0,checks=0;
const element=id=>elements.get(id)||elements.set(id,{dataset:{},textContent:'',open:false,click(){},scrollIntoView(){}}).get(id);
element('studio-record').click=()=>recordStarts++;
element('studio-stop').click=()=>recordStops++;
element('studio-check').click=()=>checks++;
const window={studioConsoleSnapshot:()=>state,addEventListener:(name,fn)=>events[name]=fn,dispatchEvent:event=>events[event.type]?.(event)};
vm.runInNewContext(fs.readFileSync('dist/studio-console.js','utf8'),{
  document:{getElementById:element},window,
  navigator:{onLine:true,storage:{estimate:async()=>({quota:5*1073741824,usage:1073741824})}},
  matchMedia:()=>({matches:true}),setInterval:fn=>(tick=fn,1),clearInterval(){},Date,Event
});
await Promise.resolve();
assert.equal(element('studio-program-badge').textContent,'DEMO');
assert.equal(element('studio-ready-label').textContent,'SET UP');
assert.equal(element('studio-camera-count').textContent,'0 connected');
assert.equal(element('studio-storage-state').textContent,'4.0 GB free');
state={hasProgram:true,hasPreview:true,cameraCount:1,microphone:true,active:0,nextCamera:0};tick();
assert.equal(element('studio-program-badge').textContent,'PRIVATE');
assert.equal(element('studio-ready-label').textContent,'READY');
assert.equal(element('studio-preview-label').textContent,'Local camera');
assert.equal(element('studio-audio-state').textContent,'Connected');
events['studio-broadcast-state']({detail:{connected:true,state:'Starting'}});
assert.equal(element('studio-program-badge').textContent,'PRIVATE','A configured or starting server is not live');
events['studio-broadcast-state']({detail:{connected:true,state:'Running'}});
assert.equal(element('studio-program-badge').textContent,'LIVE');
events['studio-broadcast-state']({detail:{connected:false,state:'Unknown'}});
assert.equal(element('studio-program-badge').textContent,'PRIVATE','A failed status check clears Live');
element('studio-record-action').onclick();assert.equal(recordStarts,1);assert.equal(recordStops,0);
state.recording=true;tick();assert.equal(element('studio-record-label').textContent,'STOP');
element('studio-record-action').onclick();assert.equal(recordStarts,1);assert.equal(recordStops,1);
state.paused=true;tick();assert.equal(element('studio-program-badge').textContent,'PAUSED');
element('studio-ready-action').onclick();assert.equal(checks,1);assert.equal(element('studio-production-tools').open,true);
console.log('PASS console source readiness, truthful demo/private/live states, failed broadcast checks, storage measurement and original recording control delegation');
