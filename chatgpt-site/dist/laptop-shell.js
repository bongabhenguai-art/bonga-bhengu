import {phoneIcon} from './phone-modules.js';
import {findLaptopModules, laptopModules, LaptopPreferences, desktopDevice} from './laptop-modules.js';

if (new URLSearchParams(location.search).get('embedded') !== '1' && !document.body.classList.contains('bbapp')) {
  const style=document.createElement('link'); style.rel='stylesheet'; style.href='/laptop-shell.css';
  if (!document.querySelector('link[href="/laptop-shell.css"]')) document.head.append(style);
  const preferences=new LaptopPreferences(), shell=document.createElement('div'); shell.className='bblaptop-shell';
  shell.innerHTML=`<div class="bblaptop-bar"><nav aria-label="Laptop app navigation">
    <a href="/laptop.html" data-laptop-nav="home">${phoneIcon('apps')}<span>Laptop home</span></a>
    <a href="/fashion-service.html#business-engine" data-laptop-nav="business">${phoneIcon('engine')}<span>Business engine</span></a>
    <a href="/digital-studio.html" data-laptop-nav="studio">${phoneIcon('studio')}<span>Studio</span></a>
    <a href="/laptop.html#files" data-laptop-nav="files">${phoneIcon('files')}<span>Files</span></a>
  </nav><div class="bblaptop-bar-actions"><small data-laptop-network></small><button type="button" data-laptop-switch aria-haspopup="dialog">Switch module <kbd>Ctrl / ⌘ K</kbd></button><button type="button" data-laptop-fullscreen>Full screen</button></div></div>
  <dialog class="bblaptop-switcher" aria-labelledby="bblaptop-switcher-title"><div class="bblaptop-switcher-top"><h2 id="bblaptop-switcher-title">Open a module</h2><button type="button" data-laptop-close aria-label="Close module switcher">✕</button></div><label>Search your modules<input type="search" placeholder="Engine, orders, screen, studio…" autocomplete="off"></label><p class="bblaptop-shell-status" role="status"></p><div class="bblaptop-switcher-results"></div></dialog>`;
  document.body.prepend(shell);
  const dialog=shell.querySelector('dialog'), input=dialog.querySelector('input'), results=dialog.querySelector('.bblaptop-switcher-results');
  function filter() {
    const matches=findLaptopModules(input.value); results.replaceChildren();
    for (const module of matches) {
      const link=document.createElement('a'); link.href=module.href; link.innerHTML=phoneIcon(module.icon);
      const text=document.createElement('span'), title=document.createElement('strong'), detail=document.createElement('small');
      title.textContent=module.name; detail.textContent=module.detail; text.append(title,detail); link.append(text); results.append(link);
    }
    dialog.querySelector('[role=status]').textContent=matches.length ? `${matches.length} modules. Use Tab to choose one.` : 'No matching module. Try “engine”, “orders” or “screen”.';
  }
  function open() { input.value=''; filter(); if(!dialog.open) dialog.showModal(); input.focus(); }
  shell.querySelector('[data-laptop-switch]').addEventListener('click',open);
  shell.querySelector('[data-laptop-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target.closest('a'))dialog.close();});
  input.addEventListener('input',filter);
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){const first=results.querySelector('a');if(first){event.preventDefault();first.click();}}});
  function sync() {
    document.body.classList.toggle('bblaptop-active',desktopDevice());
    document.body.classList.toggle('bblaptop-compact',preferences.read().compact);
    shell.querySelector('[data-laptop-network]').textContent=navigator.onLine?'Device online':'Device offline';
    const active=location.pathname==='/laptop.html' ? location.hash==='#files'?'files':'home' : location.pathname.includes('fashion-service')?'business':location.pathname.includes('digital-studio')?'studio':null;
    for(const link of shell.querySelectorAll('[data-laptop-nav]')) { if(link.dataset.laptopNav===active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current'); }
  }
  const desktop=matchMedia('(min-width: 900px) and (pointer: fine)'); desktop.addEventListener('change',sync);
  window.addEventListener('online',sync); window.addEventListener('offline',sync); window.addEventListener('hashchange',sync); window.addEventListener('bblaptop:preferences',sync); window.addEventListener('storage',sync); sync();
  function visitCurrent() { preferences.visit(location.pathname+location.hash); }
  visitCurrent(); window.addEventListener('hashchange',visitCurrent);
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]'); if(!link)return;
    const target=new URL(link.href,location.href);
    if(target.origin===location.origin)preferences.visit(target.pathname+target.hash);
  });
  document.addEventListener('keydown',event=>{
    if(!desktopDevice()||event.defaultPrevented||event.isComposing)return;
    const editing=event.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
    if(event.key.toLowerCase()==='k'&&(event.ctrlKey||event.metaKey)&&!event.altKey){
      if(document.querySelector('dialog[open]')&&!dialog.open)return;
      event.preventDefault();open();return;
    }
    if(editing||document.querySelector('dialog[open]'))return;
    if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey){
      event.preventDefault(); const search=document.getElementById('laptop-search');
      if(search){location.hash='modules';document.querySelector('[data-laptop-filter="all"]').click();search.focus();search.select();}else open();
    }
    if(event.altKey&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey){const destinations={'1':'/laptop.html','2':'/fashion-service.html#business-engine','3':'/digital-studio.html'};if(destinations[event.key]){event.preventDefault();location.assign(destinations[event.key]);}}
  });
  const fullscreenButtons=document.querySelectorAll('[data-laptop-fullscreen]');
  function fullState(){fullscreenButtons.forEach(button=>{button.disabled=!document.fullscreenEnabled;button.textContent=document.fullscreenElement?'Exit full screen':'Full screen';});}
  fullscreenButtons.forEach(button=>button.addEventListener('click',async()=>{
    try { if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen(); }
    catch { const status=document.getElementById('laptop-operation-status');if(status)status.textContent='Full screen was unavailable or cancelled. You can use your browser’s full-screen control.'; }
  }));
  document.addEventListener('fullscreenchange',fullState);fullState();
}
