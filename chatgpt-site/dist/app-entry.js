// Existing full-page entries open their module in the same four-workspace app.
// Embedded tools and camera pairing documents keep their own working session.
(()=>{
  if(new URLSearchParams(location.search).get('embedded')==='1'||window.parent!==window)return;
  const entries={'/phone.html':'home','/laptop.html':'home','/Bonga_Bhengu_Fashion_OS.html':'fashion-os','/fashion-service.html':'home','/digital-studio.html':'digital-studio','/fashion-os.html':'fashion-os','/fashion-studio.html':'fashion-os','/phone-tools.html':'camera','/platform':'admin','/platform.html':'admin','/workspace':'workroom','/workspace.html':'workroom'};
  const entry=entries[location.pathname];if(!entry)return;
  const destination=['/fashion-service.html','/phone-tools.html','/laptop.html'].includes(location.pathname)&&location.hash?location.hash:'#'+entry;
  const id=destination.slice(1);
  location.replace(id==='home'?'/':'/app.html?module='+encodeURIComponent(id)+destination);
})();
