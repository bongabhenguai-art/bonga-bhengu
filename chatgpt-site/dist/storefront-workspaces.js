import {appWorkspaces,workspaceModules,searchAppModules,moduleFor,moduleURL,routeForURL} from './app-routes.js?entry=storefront-1';
import {phoneIcon} from './phone-modules.js';

// The public storefront and its retained app view share the same module registry.
const origin=location.origin;
let owner=false,installPrompt=null,inApp=false;
try{inApp=window.parent!==window&&window.parent.document.body.classList.contains('bbapp');}catch{}
function linkFor(module){const link=document.createElement('a');link.href=moduleURL(module.id);link.innerHTML=phoneIcon(module.icon);const label=document.createElement('span');label.textContent=module.name;link.append(label);return link;}
if(inApp)document.body.classList.add('bbstore-embedded');
let hub=document.getElementById('fashion-platform');
if(!hub){
  hub=document.createElement('section');hub.id='fashion-platform';hub.className='app-entry section';
  hub.innerHTML='<p class="eyebrow">YOUR NEXT MOVE</p><h2>One place to build.<br>Space to grow.</h2><div class="app-entry-grid"></div>';
  const grid=hub.querySelector('.app-entry-grid');
  for(const workspace of appWorkspaces){
    const link=document.createElement('a');link.href=moduleURL(workspace.entry);
    const label=document.createElement('span'),title=document.createElement('h3'),description=document.createElement('p');
    label.textContent=`${workspace.number} / ${workspace.name.toUpperCase()}`;title.textContent=workspace.title;description.textContent=workspace.description;
    link.append(label,title,description);grid.append(link);
  }
  document.querySelector('main').prepend(hub);
}
// Owner-published storefronts get the same entry points as the default homepage.
if(!hub.querySelector('.bbstore-feature-tools')){
  const tools=document.createElement('nav');tools.setAttribute('class','bbstore-feature-tools');tools.setAttribute('aria-label','Website and school tools');
  for(const id of ['visual-website-editor','education'])tools.append(linkFor(moduleFor(id)));
  hub.append(tools);
}
const entry=document.createElement('div');entry.className='bbstore-entry-actions';entry.innerHTML='<button type="button" data-storefront-modules>All workspace modules</button><a href="/app.html?module=business-engine#business-engine">Workflow engine ↗</a>';
hub.append(entry);
const menu=document.createElement('dialog');menu.id='storefront-modules-dialog';menu.className='bbstore-modules';menu.setAttribute('aria-labelledby','storefront-modules-title');
menu.innerHTML='<div class="bbstore-menu-heading"><h2 id="storefront-modules-title">Bonga Bhengu workspaces</h2><button type="button" data-storefront-close aria-label="Close modules">✕</button></div><label class="bbstore-search">Find a tool<input type="search" placeholder="Brand, website, content, business…" autocomplete="off"></label><div class="bbstore-module-list"></div><p class="bbstore-menu-status" role="status"></p><button type="button" data-storefront-install>Install Bonga Bhengu App</button><p class="bbstore-install-status" role="status"></p>';
document.body.append(menu);
const input=menu.querySelector('input'),list=menu.querySelector('.bbstore-module-list'),status=menu.querySelector('.bbstore-menu-status');
function render(){
  const matches=searchAppModules(input.value,owner).filter(module=>module.id!=='home');list.replaceChildren();
  for(const workspace of appWorkspaces){
    const modules=workspaceModules(workspace.id,owner).filter(module=>matches.includes(module));if(!modules.length)continue;
    const heading=document.createElement('h3'),grid=document.createElement('div');heading.textContent=`${workspace.number} / ${workspace.name}`;grid.className='bbstore-module-grid';
    for(const module of modules)grid.append(linkFor(module));list.append(heading,grid);
  }
  status.textContent=matches.length?`${matches.length} tools. Open one from your storefront.`:'No matching tool.';
}
function open(){
  if(inApp){window.parent.document.querySelector('[data-app-more]')?.click();return;}
  render();if(!menu.open)menu.showModal();input.focus();
}
document.querySelectorAll('[data-storefront-modules]').forEach(button=>button.addEventListener('click',open));
input.addEventListener('input',render);menu.querySelector('[data-storefront-close]').addEventListener('click',()=>menu.close());
menu.addEventListener('click',event=>{if(event.target.closest('a'))menu.close();});
input.addEventListener('keydown',event=>{if(event.key==='Enter'){const link=list.querySelector('a');if(link){event.preventDefault();link.click();}}});
// Keep the storefront mounted when it is opened from a working app session.
document.addEventListener('click',event=>{
  if(!inApp||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const link=event.target.closest('a[href]');if(!link||link.hasAttribute('download'))return;
  const url=new URL(link.href,location.href);if(!routeForURL(url.href,origin))return;
  if(window.parent.bongaAppNavigate(url.href))event.preventDefault();
});
document.addEventListener('keydown',event=>{if(!event.defaultPrevented&&!event.isComposing&&(event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();open();}});
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
const install=menu.querySelector('[data-storefront-install]'),installStatus=menu.querySelector('.bbstore-install-status');
function installState(){const installed=matchMedia('(display-mode: standalone)').matches;install.disabled=installed;install.textContent=installed?'App installed':'Install Bonga Bhengu App';}
window.addEventListener('appinstalled',installState);installState();
install.addEventListener('click',async()=>{
  if(!installPrompt){installStatus.textContent='Use your browser menu to install the app or add it to your home screen. Opening the app starts at this storefront.';return;}
  const prompt=installPrompt;installPrompt=null;try{await prompt.prompt();await prompt.userChoice;}catch{installStatus.textContent='Use your browser menu to install the app.';}
});
try{const response=await fetch('/api/jarvis/status',{cache:'no-store'});const data=await response.json();owner=response.ok&&data.owner===true;}catch{}
render();
