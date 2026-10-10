// Apply only to our own modules hosted inside the unified application.
if(new URLSearchParams(location.search).get('embedded')==='1'&&window.parent!==window){
  let inApp=false;try{inApp=window.parent.document.body.classList.contains('bbapp');}catch{}
  if(inApp){
    document.body.classList.add('bbapp-embedded');const css=document.createElement('link');css.rel='stylesheet';css.href='/app-embed.css';document.head.append(css);
    const toolVisibility=()=>{for(const section of document.querySelectorAll('.bbphone-tool-card'))section.classList.toggle('bbapp-tool-active',section.id===(location.hash.slice(1)||'camera'));};toolVisibility();window.addEventListener('hashchange',toolVisibility);
    document.addEventListener('click',event=>{
      if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      const link=event.target.closest('a[href]');if(!link||link.hasAttribute('download'))return;
      const url=new URL(link.href,location.href);
      if(url.pathname===location.pathname)return;
      if(window.parent.bongaAppNavigate?.(url.href))event.preventDefault();
    });
    document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();window.parent.document.querySelector('[data-app-more]')?.click();}});
  }
}
