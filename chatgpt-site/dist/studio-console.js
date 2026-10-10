(()=>{
  'use strict';
  const $=id=>document.getElementById(id),tools=$('studio-production-tools');
  window.openStudioProduction=()=>{tools.open=true;};
  const show=id=>{window.openStudioProduction();$(id)?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  $('studio-account-open').onclick=()=>show('creative-job-panel');
  $('studio-ready-action').onclick=()=>{show('studio-local');$('studio-check').click();};
  $('studio-live-action').onclick=()=>{show('studio-live-heading');window.dispatchEvent(new Event('studio-broadcast-open'));};
  $('studio-record-action').onclick=()=>{
    const state=window.studioConsoleSnapshot?.();
    if(state?.recording)$('studio-stop').click();else {window.openStudioProduction();$('studio-record').click();show('studio-record-heading');}
    update();
  };
  let broadcast=null;
  window.addEventListener('studio-broadcast-state',event=>{broadcast=event.detail;update();});
  const source=id=>id===-2?'Shared screen':id===-1?'Collection media':id===0?'Local camera':'Phone '+id;
  function update(){
    const state=window.studioConsoleSnapshot?.()||{},ready=!!state.hasProgram,live=broadcast?.connected===true&&/^(running|streaming|broadcasting|live)$/i.test(broadcast.state||'');
    $('studio-ready-indicator').dataset.ready=String(ready);$('studio-ready-action').dataset.ready=String(ready);
    $('studio-ready-label').textContent=ready?'READY':'SET UP';$('studio-ready-detail').textContent=ready?'Source connected':'Connect a source';
    $('studio-camera-count').textContent=(state.cameraCount||0)+' connected';$('studio-camera-dot').dataset.good=String((state.cameraCount||0)>0);
    $('studio-audio-state').textContent=state.microphone?'Connected':'Not connected';$('studio-audio-dot').dataset.good=String(!!state.microphone);
    $('studio-network-state').textContent=navigator.onLine?'Online':'Offline';$('studio-network-dot').dataset.good=String(navigator.onLine);
    $('studio-preview-label').textContent=state.hasPreview?source(state.nextCamera):'Demo scene';
    $('studio-program-badge').textContent=live?'LIVE':state.recording?(state.paused?'PAUSED':'REC'):ready?'PRIVATE':'DEMO';
    $('studio-output-state').textContent=live?'Program Output · Live':state.recording?'Program Output · Recording':ready?'Program Output · Private':'Program Output · Demo';
    $('studio-record-action').dataset.recording=String(!!state.recording);$('studio-record-label').textContent=state.recording?'STOP':'RECORD';
    $('studio-wall-clock').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  }
  navigator.storage?.estimate?.().then(({quota,usage})=>{$('studio-storage-state').textContent=Number.isFinite(quota)&&Number.isFinite(usage)?Math.max(0,(quota-usage)/1073741824).toFixed(1)+' GB free':'Unavailable';}).catch(()=>{$('studio-storage-state').textContent='Unavailable';});
  if(!navigator.storage?.estimate)$('studio-storage-state').textContent='Unavailable';
  const interval=setInterval(update,500);window.addEventListener('pagehide',()=>clearInterval(interval));update();
})();
