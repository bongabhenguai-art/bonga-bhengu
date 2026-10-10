import {phoneIcon} from './phone-modules.js';
import {findLaptopModules, laptopModules, LaptopPreferences} from './laptop-modules.js';
import {LaptopRecorder} from './laptop-recorder.js';
import {LaptopFiles} from './laptop-files.js';
import {canShareFile} from './phone-recorder.js';
if(new URLSearchParams(location.search).get('embedded')!=='1')location.replace(['#files','#recorder','#settings'].includes(location.hash)?'/app.html'+location.hash:'/');

const $=id=>document.getElementById(id), preferences=new LaptopPreferences();
let group='all';
for(const icon of document.querySelectorAll('[data-icon]'))icon.innerHTML=phoneIcon(icon.dataset.icon);
function announce(message){$('laptop-operation-status').textContent=message;}
function renderRecent(){
  const container=$('laptop-recent'); container.replaceChildren();
  for(const href of preferences.read().recent){const module=laptopModules.find(item=>item.href===href);const link=document.createElement('a');link.href=href;link.textContent=module.name;container.append(link);}
  if(!container.childElementCount){const text=document.createElement('p');text.textContent='Modules you open will appear here.';container.append(text);}
}
function render(){
  const data=preferences.read(), matches=findLaptopModules($('laptop-search').value,group,data.pinned), grid=$('laptop-module-grid');grid.replaceChildren();
  for(const module of matches){
    const card=document.createElement('article');card.className='bblaptop-module';
    const link=document.createElement('a');link.href=module.href;
    const icon=document.createElement('span');icon.className=`bblaptop-icon bblaptop-${module.color}`;icon.innerHTML=phoneIcon(module.icon);
    const title=document.createElement('strong'), detail=document.createElement('small');title.textContent=module.name;detail.textContent=module.detail;
    link.append(icon,title,detail);
    const pin=document.createElement('button');pin.type='button';pin.className='bblaptop-pin';pin.textContent=data.pinned.includes(module.href)?'★':'☆';pin.setAttribute('aria-pressed',String(data.pinned.includes(module.href)));pin.setAttribute('aria-label',`${data.pinned.includes(module.href)?'Unpin':'Pin'} ${module.name}`);
    pin.addEventListener('click',()=>{const next=matches[matches.indexOf(module)+1]?.href;const saved=preferences.pin(module.href);render();const current=[...grid.querySelectorAll('.bblaptop-module')].find(item=>item.querySelector('a').getAttribute('href')===module.href)||[...grid.querySelectorAll('.bblaptop-module')].find(item=>item.querySelector('a').getAttribute('href')===next);(current?.querySelector('button')||document.querySelector('[data-laptop-filter="pinned"]')).focus();announce(saved?`${module.name} ${preferences.read().pinned.includes(module.href)?'pinned':'unpinned'} on this device.`:'Device preferences could not be saved. Check your browser storage settings.');});
    card.append(link,pin);grid.append(card);
  }
  if(!matches.length){const text=document.createElement('p');text.className='bblaptop-empty';text.textContent=group==='pinned'&&!$('laptop-search').value?'Pin a module with its star to keep it here.':'No matching module. Try another name or choose All modules.';grid.append(text);}
  $('laptop-module-count').textContent=`${matches.length} modules`;
  $('laptop-compact').checked=data.compact;document.body.classList.toggle('bblaptop-compact',data.compact);renderRecent();
}
$('laptop-search').addEventListener('input',render);
for(const button of document.querySelectorAll('[data-laptop-filter]'))button.addEventListener('click',()=>{group=button.dataset.laptopFilter;for(const item of document.querySelectorAll('[data-laptop-filter]'))item.setAttribute('aria-pressed',String(item===button));render();});
function panel(){const id=['files','recorder','settings'].includes(location.hash.slice(1))?location.hash.slice(1):'modules';for(const section of document.querySelectorAll('[data-laptop-view]'))section.hidden=section.id!==id;for(const link of document.querySelectorAll('[data-laptop-panel]')){if(link.dataset.laptopPanel===id)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}renderRecent();}
window.addEventListener('hashchange',panel);window.addEventListener('storage',render);panel();render();
$('laptop-compact').addEventListener('change',event=>{const saved=preferences.density(event.target.checked);render();window.dispatchEvent(new Event('bblaptop:preferences'));announce(saved?'Display preference saved.':'Display preference could not be saved.');});
$('laptop-preferences-reset').addEventListener('click',()=>{const saved=preferences.reset();render();window.dispatchEvent(new Event('bblaptop:preferences'));announce(saved?'Laptop preferences reset.':'Preferences could not be reset.');});
function network(){$('laptop-network').textContent=navigator.onLine?'Device online · workspace ready to open':'Device offline · reconnect for business work';}network();window.addEventListener('online',network);window.addEventListener('offline',network);

// Selected files and capture output are temporary device-local objects.
const fileList=new LaptopFiles(), files=fileList.items;let selected=null, previewGeneration=0, recording=null, recordingURL=null;
function filesStatus(message){$('laptop-files-status').textContent=message;}
function renderFiles(){
  const list=$('laptop-files-list');list.replaceChildren();
  for(const [id,item] of files){
    const row=document.createElement('div');row.className='bblaptop-file-row';
    const choose=document.createElement('button');choose.type='button';choose.className='bblaptop-file-select';choose.setAttribute('aria-pressed',String(id===selected));
    const name=document.createElement('span'), size=document.createElement('small');name.textContent=item.file.name;size.textContent=`${(item.file.size/1024/1024).toFixed(2)} MB`;choose.append(name,size);choose.addEventListener('click',()=>selectFile(id));
    const remove=document.createElement('button');remove.type='button';remove.className='bblaptop-file-remove';remove.textContent='✕';remove.setAttribute('aria-label',`Remove ${item.file.name} from this list`);
    remove.addEventListener('click',()=>{fileList.remove(id);if(selected===id)selectFile(files.keys().next().value??null);else renderFiles();filesStatus(`${files.size} files in this session. Original device files stay in place.`);const next=list.querySelector('button');if(next)next.focus();else $('laptop-files-input').focus();});
    row.append(choose,remove);list.append(row);
  }
  $('laptop-files-clear').disabled=!files.size;
}
async function selectFile(id){
  selected=id;const generation=++previewGeneration, item=files.get(id), preview=$('laptop-file-preview');preview.replaceChildren();renderFiles();
  $('laptop-file-download').hidden=!item;$('laptop-file-share').disabled=!item||!canShareFile(item.file);
  $('laptop-file-download').removeAttribute('href');$('laptop-file-download').removeAttribute('download');
  $('laptop-file-name').textContent=item?item.file.name:'File preview';
  if(!item){const p=document.createElement('p');p.textContent='Select a file to preview it.';preview.append(p);return;}
  const file=item.file,url=fileList.url(id);$('laptop-file-download').href=url;$('laptop-file-download').download=file.name;
  const kind=/^image\/(jpeg|png|webp|gif|avif|bmp)$/.test(file.type)?'img':file.type.startsWith('video/')?'video':file.type.startsWith('audio/')?'audio':null;
  if(kind){const media=document.createElement(kind);media.src=url;if(kind==='img')media.alt=file.name;else{media.controls=true;media.preload='metadata';media.playsInline=true;}media.addEventListener('error',()=>{if(generation===previewGeneration)filesStatus('This format cannot be previewed here. Download it to open in a compatible app.');});preview.append(media);}
  else if(file.size<=1024*1024 && (/\.(txt|md|json|csv|log)$/i.test(file.name)||file.type==='text/plain')){
    try{const text=await file.text();if(generation!==previewGeneration)return;const pre=document.createElement('pre');pre.textContent=text.slice(0,50000)+(text.length>50000?'\n… Preview shortened. Download to read the complete file.':'');preview.append(pre);}catch{if(generation===previewGeneration){const p=document.createElement('p');p.textContent='Preview unavailable. Download this file to open it.';preview.append(p);}}
  }else{const p=document.createElement('p');p.textContent='Download this file to open it in a compatible app. Documents are not executed in this workspace.';preview.append(p);}
}
function addFiles(incoming){
  const {added,skipped}=fileList.add(incoming);
  if(selected===null&&files.size)selectFile(files.keys().next().value);else renderFiles();
  filesStatus(`${added} added · ${files.size} files in this session.${skipped?` ${skipped} skipped: already selected or above the file limits.`:''} Download or upload anything you want to keep.`);
}
$('laptop-files-input').addEventListener('change',event=>{addFiles(event.target.files||[]);event.target.value='';});
for(const name of ['dragenter','dragover'])$('laptop-drop').addEventListener(name,event=>{event.preventDefault();$('laptop-drop').classList.add('bblaptop-drag');});
for(const name of ['dragleave','drop'])$('laptop-drop').addEventListener(name,event=>{event.preventDefault();$('laptop-drop').classList.remove('bblaptop-drag');if(name==='drop')addFiles(event.dataTransfer.files);});
// Keep dropping a file outside the target from navigating away from unsaved media.
for(const name of ['dragover','drop'])window.addEventListener(name,event=>{if(event.dataTransfer?.types.includes('Files'))event.preventDefault();});
$('laptop-files-clear').addEventListener('click',()=>{fileList.clear();selectFile(null);filesStatus('File list cleared. Original device files stay in place.');$('laptop-files-input').focus();});
async function share(file,status){if(!file)return;try{await navigator.share({files:[file],title:file.name});status('Share action completed.');}catch(error){status(error.name==='AbortError'?'Sharing cancelled. Your file is still available.':'Sharing is unavailable for this file. Download it and share it from your device.');}}
$('laptop-file-share').addEventListener('click',()=>share(files.get(selected)?.file,filesStatus));

function recordStatus(message){$('laptop-record-status').textContent=message;}
function showRecording(file){
  if(recordingURL)URL.revokeObjectURL(recordingURL);recording=file;recordingURL=URL.createObjectURL(file);
  const preview=$('laptop-record-preview');preview.src=recordingURL;preview.hidden=false;
  const download=$('laptop-record-download');download.href=recordingURL;download.download=file.name;download.hidden=false;$('laptop-record-share').disabled=!canShareFile(file);
}
const recorder=new LaptopRecorder({
  onState(state,message){
    recordStatus(message);const active=['requesting','recording','paused','stopping'].includes(state);
    $('laptop-record-start').disabled=active||!recorder.supported;$('laptop-record-audio').disabled=active;
    $('laptop-record-stop').disabled=!['requesting','recording','paused'].includes(state);$('laptop-record-stop').textContent=state==='requesting'?'Cancel request':'Stop recording';
    $('laptop-record-pause').disabled=!['recording','paused'].includes(state);$('laptop-record-pause').textContent=state==='paused'?'Resume recording':'Pause recording';
    document.title=active?'● Recording · Bonga Bhengu':'Bonga Bhengu · Laptop workspace';
    if(active&&location.hash!=='#recorder')announce('Screen recorder is active. Return to Screen recorder to stop it.');
  },
  onFile:showRecording,
  onTime(ms){const seconds=Math.floor(ms/1000);$('laptop-record-time').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
});
if(!recorder.supported){$('laptop-record-start').disabled=true;recordStatus('Screen recording is unavailable in this browser. Open Digital studio for other recording tools.');}
$('laptop-record-start').addEventListener('click',()=>recorder.start($('laptop-record-audio').value));$('laptop-record-stop').addEventListener('click',()=>recorder.stop());$('laptop-record-pause').addEventListener('click',()=>recorder.pause());
$('laptop-record-share').addEventListener('click',()=>share(recording,recordStatus));
$('laptop-record-preview').addEventListener('error',()=>recordStatus('This browser cannot preview the recording format. Download it to view in a compatible video player.'));
window.addEventListener('hashchange',()=>{if(['requesting','recording','paused','stopping'].includes(recorder.state))announce('Screen recorder is active. Return to Screen recorder to stop it.');else announce('');});
for(const [name,supported] of [['Screen recording',recorder.supported],['Microphone / webcam',Boolean(navigator.mediaDevices?.getUserMedia)],['File share sheet',Boolean(navigator.share&&navigator.canShare)],['Full screen',Boolean(document.fullscreenEnabled)]]){const li=document.createElement('li');li.textContent=`${name}: ${supported?'available to request':'unavailable in this browser'}`;$('laptop-capabilities').append(li);}
window.addEventListener('pagehide',()=>{recorder.dispose();previewGeneration++;fileList.releaseURLs();if(recordingURL)URL.revokeObjectURL(recordingURL);recordingURL=null;});
window.addEventListener('pageshow',event=>{if(event.persisted){selectFile(selected);if(recording)showRecording(recording);$('laptop-record-start').disabled=!recorder.supported;$('laptop-record-audio').disabled=false;$('laptop-record-stop').disabled=true;$('laptop-record-pause').disabled=true;recordStatus('Recording stopped when you left. Choose your screen to start again.');document.title='Bonga Bhengu · Laptop workspace';}});
