import {phoneIcon, renderModules} from './phone-modules.js';
import './app-embed.js';
import './laptop-shell.js';
import {desktopDevice} from './laptop-modules.js';

if(new URLSearchParams(location.search).get('embedded') !== '1' && !document.body.classList.contains('bbapp')) {
  document.body.classList.add('bbphone-ready');
  const shell=document.createElement('div');shell.className='bbphone-shell';
  shell.innerHTML=`<nav class="bbphone-dock" aria-label="App navigation">
    <a href="/phone.html" data-phone-nav="home">${phoneIcon('home')}<span>Home</span></a>
    <a href="/fashion-service.html" data-phone-nav="business">${phoneIcon('business')}<span>Business</span></a>
    <a href="/digital-studio.html" data-phone-nav="studio">${phoneIcon('studio')}<span>Studio</span></a>
    <button type="button" data-phone-apps aria-haspopup="dialog">${phoneIcon('apps')}<span>Modules</span></button>
  </nav>
  <dialog class="bbphone-dialog" id="bbphone-app-drawer" aria-labelledby="bbphone-drawer-title">
    <div class="bbphone-dialog-top"><h2 id="bbphone-drawer-title">Your modules</h2><button type="button" data-phone-close aria-label="Close modules">✕</button></div>
    <label class="bbphone-search">Find a module<input type="search" placeholder="Camera, engine, orders…" autocomplete="off"></label>
    <div class="bbphone-app-grid"></div>
    <button type="button" data-phone-install class="bbphone-button">Add app to your phone</button>
  </dialog>
  <dialog class="bbphone-dialog bbphone-install-dialog" id="bbphone-install-dialog" aria-labelledby="bbphone-install-title">
    <div class="bbphone-dialog-top"><h2 id="bbphone-install-title">Add Bonga Bhengu</h2><button type="button" data-phone-close aria-label="Close installation help">✕</button></div>
    <p data-phone-install-message>On Android, open this app in Chrome or Samsung Internet. Open the browser menu and choose “Install app” or “Add to Home screen”.</p>
    <p>Open the new Bonga Bhengu icon to return to your app home. Your business workspace still requires your sign-in and an internet connection.</p>
  </dialog>`;
  document.body.append(shell);
  const drawer=shell.querySelector('#bbphone-app-drawer'),installDialog=shell.querySelector('#bbphone-install-dialog');
  renderModules(drawer.querySelector('.bbphone-app-grid'));
  drawer.querySelector('input').addEventListener('input',event=>renderModules(drawer.querySelector('.bbphone-app-grid'),event.target.value));
  function openDialog(dialog) {if(!dialog.open)dialog.showModal();}
  document.querySelectorAll('[data-phone-apps]').forEach(button=>button.addEventListener('click',()=>openDialog(drawer)));
  shell.querySelectorAll('[data-phone-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  // Selecting a module inside this same page must also dismiss the drawer.
  drawer.addEventListener('click',event=>{if(event.target.closest('a'))drawer.close();});
  const path=location.pathname;
  const active=path==='/phone.html'?'home':path.includes('fashion-service')?'business':path.includes('digital-studio')?'studio':null;
  if(active)shell.querySelector(`[data-phone-nav="${active}"]`).setAttribute('aria-current','page');
  const standalone=matchMedia('(display-mode: standalone)');
  let installPrompt=null,installed=standalone.matches;
  function installState(){document.querySelectorAll('[data-phone-install]').forEach(button=>{button.textContent=installed?'App installed':desktopDevice()?'Install app':'Add app to your phone';button.disabled=installed;});}
  if(desktopDevice())installDialog.querySelector('[data-phone-install-message]').textContent='Use your browser’s install icon or open its menu and choose “Install app”. If the browser does not offer installation, bookmark the laptop workspace to return to it.';
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
  window.addEventListener('appinstalled',()=>{installed=true;installPrompt=null;installState();});
  document.querySelectorAll('[data-phone-install]').forEach(button=>button.addEventListener('click',async()=>{
    if(drawer.open)drawer.close();
    if(!installPrompt){openDialog(installDialog);return;}
    const prompt=installPrompt;installPrompt=null;
    try{await prompt.prompt();await prompt.userChoice;}catch{openDialog(installDialog);}
  }));
  installState();
  if(standalone.matches)document.body.classList.add('bbphone-standalone');
  document.querySelectorAll('[data-phone-back]').forEach(button=>button.addEventListener('click',()=>{
    let sameOrigin=false;try{sameOrigin=new URL(document.referrer).origin===location.origin;}catch{}
    if(history.length>1&&(sameOrigin||standalone.matches))history.back();else location.assign('/phone.html');
  }));
  // Keep the long designer navigation out of the way on phones; retain all links.
  const sidebar=document.querySelector('.designer-sidebar');
  if(sidebar){
    const toggle=document.createElement('button');toggle.type='button';toggle.className='bbphone-workspace-menu';toggle.textContent='Workspace sections';toggle.setAttribute('aria-expanded','false');
    sidebar.id='bbphone-workspace-sections';toggle.setAttribute('aria-controls',sidebar.id);sidebar.before(toggle);
    const collapse=()=>{sidebar.classList.remove('bbphone-menu-open');toggle.setAttribute('aria-expanded','false');};
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));sidebar.classList.toggle('bbphone-menu-open',open);});
    sidebar.addEventListener('click',event=>{if(event.target.closest('a'))collapse();});
    window.addEventListener('hashchange',collapse);
  }
}
