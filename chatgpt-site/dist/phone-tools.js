import {PhoneRecorder,canShareFile} from './phone-recorder.js';
const $=id=>document.getElementById(id),files=new Map(),urls=new Map();
const MAX_SIZE=100*1024*1024;
function status(area,message){$(`${area}-status`).textContent=message;}
function selectedFile(area,file){
  if(!file)return;
  if(file.size>MAX_SIZE){status(area,'This file is larger than 100 MB. Choose a smaller file.');return;}
  const previous=urls.get(area);if(previous)URL.revokeObjectURL(previous);
  const url=URL.createObjectURL(file);urls.set(area,url);files.set(area,file);
  const preview=$(`${area}-preview`);preview.replaceChildren();
  const kind=file.type.startsWith('image/')?'img':file.type.startsWith('video/')?'video':file.type.startsWith('audio/')?'audio':null;
  if(kind){const media=document.createElement(kind);media.src=url;if(kind==='img')media.alt=file.name;else{media.controls=true;media.preload='metadata';if(kind==='video')media.playsInline=true;}media.addEventListener('error',()=>status(area,`${file.name}: this browser cannot preview the format. You can still download or share it.`));preview.append(media);}
  const download=$(`${area}-download`);download.href=url;download.download=file.name;download.hidden=false;
  $(`${area}-share`).disabled=!canShareFile(file);
  status(area,`${file.name} · ${(file.size/1024/1024).toFixed(2)} MB · ready${canShareFile(file)?' to share':''}.`);
}
for(const [input,area] of [['phone-photo','camera'],['phone-video','camera'],['phone-audio','voice'],['phone-file','files']]){
  $(input).addEventListener('change',event=>{selectedFile(area,event.target.files?.[0]);event.target.value='';});
}
for(const area of ['camera','voice','files']){
  $(`${area}-share`).addEventListener('click',async()=>{
    const file=files.get(area);if(!file)return;
    // Invoke the share sheet directly from the user's tap, without an async preflight.
    try{await navigator.share({files:[file],title:file.name});status(area,'Share action completed.');}
    catch(error){status(area,error.name==='AbortError'?'Sharing cancelled. Your file is still available.':'This file could not be shared. Download it, then share it from your phone’s Files app.');}
  });
}
$('phone-share-support').textContent=navigator.share&&navigator.canShare?'Sharing appears when your browser supports the selected file.':'File sharing is unavailable in this browser. Download the file and share it from your phone’s Files app.';
const recorder=new PhoneRecorder({
  onState(state,message){status('voice',message);$('voice-start').disabled=['requesting','recording','stopping'].includes(state);$('voice-stop').disabled=!['requesting','recording'].includes(state);$('phone-audio').disabled=['requesting','recording','stopping'].includes(state);},
  onFile(file){selectedFile('voice',file);},
  onTime(ms){const seconds=Math.floor(ms/1000);$('voice-time').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
});
if(!recorder.supported){$('voice-start').disabled=true;status('voice','Recording is unavailable in this browser. Choose an audio file instead.');}
$('voice-start').addEventListener('click',()=>recorder.start());$('voice-stop').addEventListener('click',()=>recorder.stop());
document.addEventListener('visibilitychange',()=>{if(document.hidden)recorder.stop();});
window.addEventListener('pagehide',()=>{recorder.dispose();for(const url of urls.values())URL.revokeObjectURL(url);urls.clear();});
window.addEventListener('pageshow',event=>{if(event.persisted){for(const [area,file] of files)selectedFile(area,file);$('voice-start').disabled=!recorder.supported;$('voice-stop').disabled=true;$('phone-audio').disabled=false;}});
