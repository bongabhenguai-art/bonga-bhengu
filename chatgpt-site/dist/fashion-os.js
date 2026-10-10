import {saveFashionBrief} from './fashion-os-workspace.js?merge=os-1';
(()=>{'use strict';
const $=id=>document.getElementById(id),tabs=[...document.querySelectorAll('[data-tier]')],panels=[1,2,3].map(n=>$('tier-'+n));
function selectTier(n,focus=false){tabs.forEach((tab,i)=>{const active=i+1===n;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus()});panels.forEach((panel,i)=>panel.hidden=i+1!==n);$('selection-status').textContent='TIER_0'+n+' SELECTED';}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTier(i+1));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%3;if(e.key==='ArrowLeft')n=(i+2)%3;if(e.key==='Home')n=0;if(e.key==='End')n=2;if(n!==undefined){e.preventDefault();selectTier(n+1,true)}})});
const form=$('brief-form'),labels={website:'Website Builder',banner:'Digital Banner',visibility:'Digital Visibility',studio:'Creative Studio',automation:'Content Automation',collection:'Fashion collection',rental:'Rent a digital profile space'};let brief='',briefId='',imageURL='',saving=false;const draftKey='bonga-fashion-os-signin-draft';
function invalidate(){brief='';briefId='';$('save-workspace').disabled=true;$('saved-task').hidden=true;$('setup-workspace').hidden=true;try{sessionStorage.removeItem(draftKey)}catch{};$('download').disabled=true;$('copy').disabled=true;$('whatsapp').hidden=true;$('brief-output').hidden=true;$('form-status').textContent='';}
document.querySelectorAll('[data-brief]').forEach(btn=>btn.addEventListener('click',()=>{form.elements.service.value=btn.dataset.brief;invalidate();$('brief').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});form.elements.brand.focus({preventScroll:true})}));
$('edit-specs').addEventListener('click',()=>{form.elements.service.value='collection';invalidate();$('brief').scrollIntoView();form.elements.fabric.focus({preventScroll:true})});
form.addEventListener('input',()=>{invalidate();[['fabric','fabric-display'],['polygons','poly-display'],['render','render-display'],['collection','collection-display']].forEach(([field,id])=>$(id).textContent=form.elements[field].value.trim()||'Not specified')});
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const f=new FormData(form);brief=['BONGA BHENGU / PROJECT BRIEF','Created: '+new Date().toISOString(),'Service: '+labels[f.get('service')],'Brand: '+f.get('brand').trim(),'Email: '+(f.get('email')||'Not supplied'),'Location: '+(f.get('location')||'Not supplied'),'','GOAL',f.get('goal').trim(),'','COLLECTION / TECH SPECS','Collection: '+f.get('collection'),'Fabrication: '+f.get('fabric'),'Polygons: '+f.get('polygons'),'Render: '+f.get('render'),'Image: '+(imageURL?'Previewed locally; send separately.':'No image attached.'),'','NEXT STEP','Please confirm the scope, pricing, availability and required platform permissions.'].join('\n');briefId=crypto.randomUUID();$('save-workspace').disabled=saving;$('brief-output').textContent=brief;$('brief-output').hidden=false;$('download').disabled=false;$('copy').disabled=false;$('whatsapp').href='https://wa.me/27817746377?text='+encodeURIComponent(brief);$('whatsapp').hidden=false;$('form-status').textContent='Brief prepared. Nothing has been sent.'});
$('download').addEventListener('click',()=>{if(!brief)return;const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='Bonga_Bhengu_Project_Brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('form-status').textContent='Download requested. You can also copy the brief.'});
$('copy').addEventListener('click',async()=>{if(!brief)return;try{await navigator.clipboard.writeText(brief);$('form-status').textContent='Brief copied.'}catch{const range=document.createRange();range.selectNodeContents($('brief-output'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);$('brief-output').focus();$('form-status').textContent='Brief selected. Press Ctrl+C / Cmd+C, or use Copy from your device menu.'}});
function clearImage(){if(imageURL)URL.revokeObjectURL(imageURL);imageURL='';$('uploaded-look').hidden=true;$('uploaded-look').removeAttribute('src');$('concept-art').style.visibility='visible';$('reset-image').hidden=true;$('image-input').value='';$('art-caption').textContent='ORIGINAL VECTOR CONCEPT / ILLUSTRATIVE STUDY';invalidate();}
$('image-input').addEventListener('change',()=>{const file=$('image-input').files[0];if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024){$('image-status').textContent='Choose a JPEG, PNG or WebP image under 8 MB.';$('image-input').value='';return}if(imageURL)URL.revokeObjectURL(imageURL);imageURL=URL.createObjectURL(file);const img=$('uploaded-look');img.onload=()=>{img.hidden=false;$('concept-art').style.visibility='hidden';$('reset-image').hidden=false;$('art-caption').textContent='YOUR COLLECTION IMAGE / LOCAL PREVIEW';$('image-status').textContent='Image preview ready. It has not been uploaded.'};img.onerror=()=>{clearImage();$('image-status').textContent='This file could not be decoded. Choose another image.'};img.src=imageURL;invalidate();});
$('reset-image').addEventListener('click',()=>{clearImage();$('image-status').textContent='Original concept restored.'});window.addEventListener('pagehide',()=>{if(imageURL)URL.revokeObjectURL(imageURL)});$('year').textContent=new Date().getFullYear();

$('save-workspace').addEventListener('click',async()=>{
 if(!brief||!briefId||saving)return;
 const packet={id:briefId,brand:form.elements.brand.value.trim(),service:form.elements.service.value,brief};
 let draftStored=false;
 try{sessionStorage.setItem(draftKey,JSON.stringify({at:Date.now(),packet,fields:Object.fromEntries(new FormData(form))}));draftStored=true}catch{}
 saving=true;$('save-workspace').disabled=true;$('form-status').textContent='Saving this brief to your private work queue…';
 try{
  const receipt=await saveFashionBrief(packet);
  $('saved-task').href=receipt.url;$('saved-task').hidden=false;
  $('form-status').textContent=receipt.alreadySaved?'This brief is already saved in your work queue.':packet.id===briefId?'Brief saved as proposed work. Open your saved work to continue.':'Your previous brief was saved. Prepare your edited brief to save a new version.';
  if(packet.id===briefId){try{sessionStorage.removeItem(draftKey)}catch{}}
 }catch(error){
  if(error.code==='signin'){
   if(draftStored){location.href='/signin-with-chatgpt?return_to='+encodeURIComponent('/fashion-os.html#brief');return;}
   $('setup-workspace').hidden=false;$('form-status').textContent='Sign in from your seller workspace first. This browser could not preserve the brief during sign-in; download it before leaving.';
  }else{
   $('form-status').textContent=error.message||'Your brief could not be saved. It remains on this page.';
   $('setup-workspace').hidden=error.code!=='setup';
  }
 }finally{saving=false;$('save-workspace').disabled=!brief;}
});
try{
 const draft=JSON.parse(sessionStorage.getItem(draftKey));
 if(draft){
  if(!Number.isFinite(draft.at)||Date.now()-draft.at>3600000||draft.at>Date.now()+60000||!draft.packet||typeof draft.packet.brief!=='string'||draft.packet.brief.length>6000||!draft.fields||!Object.hasOwn(labels,draft.packet.service))throw Error();
  for(const [key,value] of Object.entries(draft.fields)){const field=form.elements.namedItem(key);if(field&&typeof value==='string'&&value.length<=Math.max(field.maxLength||0,2400))field.value=value;}
  if(!form.checkValidity()||draft.packet.brand!==form.elements.brand.value.trim()||draft.packet.service!==form.elements.service.value||!/^[a-f0-9-]{36}$/.test(draft.packet.id))throw Error();
  brief=draft.packet.brief;briefId=draft.packet.id;
  $('brief-output').textContent=brief;$('brief-output').hidden=false;$('download').disabled=false;$('copy').disabled=false;$('save-workspace').disabled=false;
  $('whatsapp').href='https://wa.me/27817746377?text='+encodeURIComponent(brief);$('whatsapp').hidden=false;
  [['fabric','fabric-display'],['polygons','poly-display'],['render','render-display'],['collection','collection-display']].forEach(([field,id])=>$(id).textContent=form.elements[field].value.trim()||'Not specified');
  $('form-status').textContent='Your text brief is restored. Choose Save to my work when you are ready. Preview images must be selected again.';
 }
}catch{try{sessionStorage.removeItem(draftKey)}catch{}}

})();
