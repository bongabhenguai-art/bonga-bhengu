import {phoneIcon} from './phone-modules.js';
import {appModules,appWorkspaces,workspaceFor,workspaceModules,moduleFor,businessSection,searchAppModules,routeForURL,frameLocation} from './app-routes.js?upgrade=1';
import {guideFor} from './app-guides.js?upgrade=1';

const $=id=>document.getElementById(id),origin=location.origin,frames=new Map();
let owner=false,current='home',previous=[],appsReady=Boolean(window.designerAppsLoaded);
const dialog=$('app-modules-dialog');
const helpDialog=$('app-guide-dialog');
function renderGuide(){
 const module=moduleFor(current),guide=guideFor(current);$('app-guide-title').textContent=module.name+' · How it works';
 $('app-guide-input').textContent=guide.input;$('app-guide-output').textContent=guide.output;$('app-guide-needs').textContent=guide.needs;
 $('app-guide-steps').replaceChildren(...guide.steps.map(step=>{const li=document.createElement('li');li.textContent=step;return li;}));
 $('app-guide-related').replaceChildren(...guide.related.filter(id=>owner||!moduleFor(id)?.owner).map(id=>appLink(id)));
}
$('app-guide-open').addEventListener('click',()=>{renderGuide();helpDialog.showModal();});
$('app-guide-close').addEventListener('click',()=>helpDialog.close());
helpDialog.addEventListener('click',event=>{if(event.target.closest('a'))helpDialog.close();});
function appLink(id,shortName){const module=moduleFor(id),link=document.createElement('a');link.href='#'+id;link.innerHTML=phoneIcon(module.icon);const label=document.createElement('span');label.textContent=shortName||module.name;link.append(label);return link;}
for(const workspace of appWorkspaces){for(const id of ['app-rail','app-dock']){const link=appLink(workspace.entry,workspace.name);link.dataset.workspace=workspace.id;$(id).append(link);}}
for(const node of document.querySelectorAll('[data-app-icon]'))node.innerHTML=phoneIcon(node.dataset.appIcon);

function renderModules(){
  const matches=searchAppModules($('app-search').value,owner).filter(module=>module.id!=='home'),list=$('app-module-list');list.replaceChildren();
  for(const workspace of appWorkspaces){
    const modules=workspaceModules(workspace.id,owner).filter(module=>matches.includes(module));if(!modules.length)continue;
    const label=document.createElement('p');label.className='bbapp-module-group';label.textContent=`${workspace.number} / ${workspace.name}`;
    const grid=document.createElement('div');grid.className='bbapp-module-group-grid';for(const module of modules)grid.append(appLink(module.id));list.append(label,grid);
  }
  $('app-search-status').textContent=matches.length?`${matches.length} modules in four workspaces. Select one to open it here.`:'No matching module. Try “brand”, “content” or “business”.';
}
function openModules(){renderModules();if(!dialog.open)dialog.showModal();$('app-search').focus();}
document.querySelectorAll('[data-app-more]').forEach(button=>button.addEventListener('click',openModules));
$('app-search').addEventListener('input',renderModules);$('app-dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target.closest('a'))dialog.close();});
$('app-search').addEventListener('keydown',event=>{if(event.key==='Enter'){const link=$('app-module-list').querySelector('a');if(link){event.preventDefault();link.click();}}});

function loadStudio(){const frame=$('studio-dashboard-frame');if(!frame.getAttribute('src'))frame.src=frame.dataset.appSrc;return frame;}
function activateFrame(module){
  const {key,src}=frameLocation(module,origin);let frame=frames.get(key);
  if(!frame){
    frame=document.createElement('iframe');frame.className='bbapp-module-frame';frame.title=module.name;frame.allow='camera; microphone; display-capture; fullscreen';frame.src=src;frames.set(key,frame);$('app-frame-stage').append(frame);
  }else{
    const target=new URL(src,origin);try{if(frame.contentWindow.location.pathname===target.pathname)frame.contentWindow.location.hash=target.hash;}catch{}
  }
  for(const item of frames.values())item.hidden=item!==frame;
  frame.title=module.name;
}
function actionState(){
  const action=moduleFor(current)?.action,button=$('app-module-action');button.hidden=!action;
  if(!action)return;button.textContent=action.label;
  const target=$(action.click||action.focus);button.disabled=!appsReady||!target||(action.click&&target.disabled);
}
function renderRoute(){
  const id=routeForURL('/app.html'+(location.search||'')+location.hash,origin)||'home',module=moduleFor(id);
  if(current!==id){previous.push(current);previous=previous.slice(-20);current=id;}
  const workspace=workspaceFor(id);document.body.dataset.appModule=id;document.body.dataset.appWorkspace=workspace?.id||'home';document.title=`${module.name} · Bonga Bhengu App`;$('app-title').textContent=module.name;$('app-breadcrumb').textContent=workspace?`${workspace.number} / ${workspace.name.toUpperCase()}`:'BONGA BHENGU / STOREFRONT';
  const blocked=module.owner&&!owner,home=id==='home',framed=Boolean(module.frame);
  $('app-home').hidden=!home;$('app-blocked').hidden=!blocked;$('app-business').hidden=home||blocked||framed;$('app-frame-stage').hidden=home||blocked||!framed;
  for(const section of document.querySelectorAll('.designer-content>section'))section.hidden=section.id!==businessSection(id);
  if(framed&&!blocked)activateFrame(module);
  if(id==='digital-studio')loadStudio();
  const nav=$('app-workspace-nav');nav.hidden=!workspace||blocked;
  if(workspace&&!blocked){
    if(nav.dataset.workspace!==workspace.id||nav.dataset.owner!==String(owner)){nav.replaceChildren(...workspaceModules(workspace.id,owner).map(item=>appLink(item.id)));nav.dataset.workspace=workspace.id;nav.dataset.owner=String(owner);}
    for(const link of nav.querySelectorAll('a')){const active=link.getAttribute('href')==='#'+id;active?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current');}
  }
  for(const link of document.querySelectorAll('#app-rail a,#app-dock a')){const active=!blocked&&link.dataset.workspace===workspace?.id;active?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current');}
  $('app-back').disabled=!previous.length;actionState();$('app-main').scrollTop=0;
  if(home)loadStorefront();
}
window.addEventListener('hashchange',renderRoute);
$('app-back').addEventListener('click',()=>{const destination=previous.pop();if(destination){current=destination;location.hash=destination;}});
$('app-module-action').addEventListener('click',()=>{
  const action=moduleFor(current)?.action;if(!action||!appsReady)return;
  const target=$(action.click||action.focus);if(!target)return;
  if(action.click){if(!target.disabled)target.click();}
  else{target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});const field=target.matches('input,textarea,select')?target:target.querySelector('input:not([type=hidden]),textarea,select');field?.focus({preventScroll:true});}
  actionState();
});

// Route recognized internal functions without replacing the application document.
window.bongaAppNavigate=value=>{const id=routeForURL(value,origin);if(!id)return false;location.hash=id;return true;};
document.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const link=event.target.closest('a[href]');if(!link||link.hasAttribute('download'))return;
  const url=new URL(link.href,location.href),id=routeForURL(url.href,origin);if(!id)return;
  event.preventDefault();location.hash=id;
});

function loadStorefront(refresh=false){const frame=$('app-storefront-frame');if(refresh||!frame.getAttribute('src'))frame.src=frame.dataset.appSrc;}
$('app-home-refresh').addEventListener('click',()=>{if(current==='home')loadStorefront(true);else if(current==='system-health'&&appsReady)$('refresh-health').click();else cloudState();});
function ready(){appsReady=true;for(const form of document.querySelectorAll('#app-business form'))form.inert=false;actionState();}
for(const form of document.querySelectorAll('#app-business form'))form.inert=!appsReady;
window.addEventListener('designer-apps-ready',ready);
function cloudState(){const text=$('cloud-status').textContent;$('app-cloud-state').textContent=text||'Opening your account…';actionState();}
new MutationObserver(cloudState).observe($('cloud-status'),{childList:true,subtree:true,characterData:true});
new MutationObserver(actionState).observe($('app-business'),{attributes:true,attributeFilter:['disabled'],subtree:true});
const studioOpen=$('studio-open-inside');if(studioOpen){studioOpen.removeAttribute('onclick');studioOpen.onclick=loadStudio;}
function fullState(){$('app-fullscreen').disabled=!document.fullscreenEnabled;$('app-fullscreen').title=document.fullscreenElement?'Exit full screen':'Full screen';}
$('app-fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('app-cloud-state').textContent='Full screen unavailable. Your workspace is still open.';}});document.addEventListener('fullscreenchange',fullState);fullState();
document.addEventListener('keydown',event=>{if(event.defaultPrevented||event.isComposing)return;if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openModules();}else if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest('input,textarea,select,[contenteditable="true"]')&&!document.querySelector('dialog[open]')){event.preventDefault();openModules();}});
window.addEventListener('online',()=>{cloudState();});window.addEventListener('offline',()=>{$('app-cloud-state').textContent='Offline · reconnect to save business work';});
try{const response=await fetch('/api/jarvis/status',{cache:'no-store'}),status=await response.json();owner=response.ok&&status.owner===true;}catch{}
renderModules();renderRoute();cloudState();if(window.designerAppsLoaded)ready();
