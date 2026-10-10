// Shortcuts use the existing modules and their existing access rules.
export const phoneModules = [
  {name:'Business engine', detail:'Run connected workflows', href:'/fashion-service.html#business-engine', icon:'engine', color:'gold'},
  {name:'My business', detail:'Orders and business overview', href:'/fashion-service.html#overview', icon:'business', color:'blue'},
  {name:'Camera', detail:'Capture a photo or video', href:'/phone-tools.html#camera', icon:'camera', color:'cyan'},
  {name:'Voice notes', detail:'Record and share audio', href:'/phone-tools.html#voice', icon:'mic', color:'violet'},
  {name:'Files & share', detail:'Open and share device files', href:'/phone-tools.html#files', icon:'files', color:'blue'},
  {name:'Digital studio', detail:'Five cameras, video and podcast', href:'/digital-studio.html', icon:'studio', color:'violet'},
  {name:'Fashion OS', detail:'Prepare and save a design brief', href:'/fashion-os.html', icon:'fashion', color:'gold'},
  {name:'Jarvis', detail:'Research and plan with your AI', href:'/fashion-service.html#fashion-jarvis', icon:'spark', color:'cyan'},
  {name:'Daily work', detail:'Tasks and next actions', href:'/fashion-service.html#my-work', icon:'check', color:'green'},
  {name:'Collection', detail:'Designs, costing and catalogue', href:'/fashion-service.html#catalogue', icon:'fashion', color:'violet'},
  {name:'Orders', detail:'Sales and delivery', href:'/fashion-service.html#orders', icon:'bag', color:'gold'},
  {name:'Campaigns', detail:'Prepare posts for your platforms', href:'/fashion-service.html#social-campaigns', icon:'campaign', color:'blue'},
  {name:'My website', detail:'Edit and publish your storefront', href:'/fashion-service.html#storefront-editor', icon:'web', color:'green'},
  {name:'Media library', detail:'Upload images, video and files', href:'/fashion-service.html#media-library', icon:'files', color:'cyan'},
  {name:'Companies', detail:'Manage your brands', href:'/fashion-service.html#company-console', icon:'business', color:'blue'},
  {name:'Connections', detail:'Connected platform status', href:'/fashion-service.html#connections', icon:'link', color:'green'},
  {name:'Visibility', detail:'Demand and evidence', href:'/fashion-service.html#evidence', icon:'eye', color:'violet'},
  {name:'Prospects', detail:'Customer needs and offers', href:'/fashion-service.html#prospects', icon:'people', color:'gold'},
  {name:'Partners', detail:'Sourcing and suppliers', href:'/fashion-service.html#partners', icon:'people', color:'blue'},
  {name:'Growth', detail:'Measure your business', href:'/fashion-service.html#growth', icon:'chart', color:'green'},
  {name:'System health', detail:'Check services and readiness', href:'/fashion-service.html#system-health', icon:'pulse', color:'cyan'},
  {name:'Shop', detail:'Bonga Bhengu storefront', href:'/', icon:'bag', color:'gold'},
  {name:'Owner console', detail:'Owner access required', href:'/platform', icon:'shield', color:'violet'},
  {name:'Owner workroom', detail:'Owner access required', href:'/workspace', icon:'engine', color:'blue'}
];
const paths = {
  engine:'M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  business:'M4 21V7h16v14M9 7V3h6v4M8 11h1m6 0h1m-8 4h1m6 0h1M10 21v-3h4v3',
  camera:'M4 6h4l2-3h4l2 3h4v14H4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  mic:'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8',
  files:'M4 5h6l2 3h8v12H4ZM8 12h8m-8 4h5',
  studio:'M3 6h13v12H3ZM16 10l5-3v10l-5-3',
  fashion:'M8 3l4 3 4-3 5 5-4 3v10H7V11L3 8Z',
  spark:'M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
  check:'M5 12l4 4L19 6M4 3h16v18H4',
  bag:'M5 7h14l2 14H3ZM8 7V5a4 4 0 0 1 8 0v2',
  campaign:'M4 10h4l12-5v14L8 14H4ZM8 14l2 7h4l-3-6',
  web:'M3 4h18v16H3ZM3 9h18M7 6.5h.1m3 0h.1',
  link:'M9 15l6-6M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0',
  eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  people:'M15 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M5 21v-4a7 7 0 0 1 14 0v4M19 3a3 3 0 0 1 0 6M3 3a3 3 0 0 0 0 6',
  chart:'M4 3v18h17M8 16l4-5 4 2 5-8',
  pulse:'M2 12h5l3-8 4 16 3-8h5',
  shield:'M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6ZM8 12l3 3 5-6',
  home:'M3 11l9-8 9 8M5 10v11h5v-7h4v7h5V10',
  apps:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
  back:'M15 5l-7 7 7 7',
  download:'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',
};
export function phoneIcon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.apps}"/></svg>`;
}
export function matchingModules(query='') {
  const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return phoneModules.filter(module=>words.every(word=>`${module.name} ${module.detail}`.toLowerCase().includes(word)));
}
export function renderModules(container, query='') {
  const matches=matchingModules(query);
  container.replaceChildren();
  for(const module of matches) {
    const link=document.createElement('a');
    link.className='bbphone-app';link.href=module.href;link.title=module.detail;
    const icon=document.createElement('span');icon.className=`bbphone-icon bbphone-${module.color}`;icon.innerHTML=phoneIcon(module.icon);
    const label=document.createElement('span');label.textContent=module.name;
    link.append(icon,label);container.append(link);
  }
  if(!matches.length) {const p=document.createElement('p');p.className='bbphone-empty';p.textContent='No matching module. Try “camera”, “orders” or “engine”.';container.append(p);}
  return matches.length;
}
