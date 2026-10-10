import {guideFor} from './app-guides.js?upgrade=1';
// Four workspaces own the existing capabilities. Each module has one home.
export const appWorkspaces=[
 {id:'brand',number:'01',name:'My Brand',entry:'designer',icon:'business',title:'Profile & identity',description:'Tell your story and present your work.'},
 {id:'website',number:'02',name:'My Website',entry:'storefront-editor',icon:'web',title:'Storefront & hosting',description:'Build, preview and publish your collection.'},
 {id:'content',number:'03',name:'My Content',entry:'digital-studio',icon:'studio',title:'Digital studio',description:'Phone cameras, images, recording and podcasts.'},
 {id:'business',number:'04',name:'My Business',entry:'orders',icon:'people',title:'Customers & delivery',description:'Track your enquiries, production and next action.'}
];
// One application route per capability; business routes reuse the existing DOM.
export const appModules=[
 {id:'visual-website-editor',name:'Visual website editor',icon:'web',group:'website',frame:'/website-editor.html'},
 {id:'education',name:'Education Partner OS',icon:'business',group:'business',frame:'/education.html'},
 {id:'home',name:'Bonga Bhengu storefront',icon:'home',group:'home'},
 {id:'my-work',name:'My work',icon:'check',group:'business',action:{label:'Add task',focus:'designer-task-form'}},
 {id:'business-engine',name:'Workflow engine',icon:'engine',group:'business',action:{label:'Run next tasks',click:'run-business-engine'}},
 {id:'overview',name:'Business overview',icon:'business',group:'business',action:{label:'Run connected system',click:'run-connected-system'}},
 {id:'fashion-jarvis',name:'AI assistant',icon:'spark',group:'business',action:{label:'Write request',focus:'fashion-jarvis-form'}},
 {id:'fashion-command',name:'Business plan',icon:'chart',group:'business',action:{label:'Refresh plan',click:'fashion-plan-refresh'}},
 {id:'orders',name:'Customers & orders',icon:'people',group:'business',action:{label:'Add enquiry',focus:'order-form'}},
 {id:'prospects',name:'Prospects',icon:'people',group:'business',action:{label:'Add prospect',focus:'fashion-prospect-form'}},
 {id:'catalogue',name:'Collection & costing',icon:'fashion',group:'brand',action:{label:'Add design',focus:'product-form'}},
 {id:'designer',name:'Profile & identity',icon:'business',group:'brand',action:{label:'Edit profile',focus:'designer-form'}},
 {id:'company-console',name:'Companies & brands',icon:'business',group:'brand'},
 {id:'partners',name:'Sourcing',icon:'link',group:'business'},
 {id:'growth',name:'Results',icon:'chart',group:'business'},
 {id:'digital-studio',name:'Digital studio',icon:'studio',group:'content'},
 {id:'my-studio',name:'Creative projects',icon:'fashion',group:'content'},
 {id:'social-campaigns',name:'Campaigns',icon:'campaign',group:'content',action:{label:'New campaign',click:'campaign-reset'}},
 {id:'media-library',name:'Media library',icon:'files',group:'content',action:{label:'Choose files',focus:'media-input'}},
 {id:'fashion-os',name:'Fashion brief',icon:'fashion',group:'brand',frame:'/fashion-os.html'},
 {id:'storefront-editor',name:'Storefront & hosting',icon:'web',group:'website',action:{label:'Edit website',focus:'store-design-form'}},
 {id:'evidence',name:'Visibility',icon:'eye',group:'website'},
 {id:'launch',name:'Preview & publish',icon:'campaign',group:'website'},
 {id:'install',name:'Website button & links',icon:'link',group:'website'},
 {id:'connections',name:'Connections',icon:'link',group:'business'},
 {id:'account-vault',name:'Platform accounts',icon:'shield',group:'business'},
 {id:'system-health',name:'Service health',icon:'pulse',group:'business',action:{label:'Check services',click:'refresh-health'}},
 {id:'files',name:'Device files',icon:'files',group:'content',frame:'/laptop.html#files'},
 {id:'recorder',name:'Screen recorder',icon:'studio',group:'content',frame:'/laptop.html#recorder'},
 {id:'voice',name:'Voice notes',icon:'mic',group:'content',frame:'/phone-tools.html#voice'},
 {id:'camera',name:'Photo capture',icon:'camera',group:'content',frame:'/phone-tools.html#camera'},
 {id:'settings',name:'App settings',icon:'shield',group:'business',frame:'/laptop.html#settings'},
 {id:'admin',name:'Owner console',icon:'shield',group:'business',owner:true,frame:'/platform'},
 {id:'workroom',name:'Owner workroom',icon:'engine',group:'business',owner:true,frame:'/workspace'}
];
export const moduleFor=id=>appModules.find(module=>module.id===id);
export const moduleURL=id=>id==='home'?'/':`/app.html?module=${encodeURIComponent(id)}#${encodeURIComponent(id)}`;
export const workspaceFor=id=>appWorkspaces.find(workspace=>workspace.id===moduleFor(id)?.group);
export function workspaceModules(workspace,owner=false){const entry=appWorkspaces.find(item=>item.id===workspace)?.entry;return appModules.filter(module=>module.group===workspace&&(owner||!module.owner)).sort((a,b)=>a.id===entry?-1:b.id===entry?1:0);}
export function businessSection(id){return ['fashion-jarvis','fashion-command'].includes(id)?'overview':id==='home'||moduleFor(id)?.frame?null:id;}
export function searchAppModules(query='',owner=false){const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);return appModules.filter(module=>(owner||!module.owner)&&words.every(word=>`${module.name} ${module.group} ${workspaceFor(module.id)?.name||''} ${guideFor(module.id)?.input||''} ${guideFor(module.id)?.output||''}`.toLowerCase().includes(word)));}
export function routeForURL(value,origin='https://site.example'){
 let url;try{url=new URL(value,origin);}catch{return null;}
 if(url.origin!==origin)return null;
 const section=url.hash.slice(1);
 if(url.pathname==='/'&&(!section||section==='home'))return 'home';
 if(url.pathname==='/app.html')return moduleFor(section)?section:moduleFor(url.searchParams.get('module'))?.id||'home';
 if(url.pathname==='/fashion-service.html')return moduleFor(section)&&!moduleFor(section).frame?section:'overview';
 if(url.pathname==='/website-editor.html')return 'visual-website-editor';
 if(url.pathname==='/education.html')return 'education';
 if(url.pathname==='/digital-studio.html')return 'digital-studio';
 if(['/fashion-os.html','/fashion-studio.html','/Bonga_Bhengu_Fashion_OS.html'].includes(url.pathname))return 'fashion-os';
 if(['/platform','/platform.html'].includes(url.pathname))return 'admin';
 if(['/workspace','/workspace.html'].includes(url.pathname))return 'workroom';
 if(url.pathname==='/laptop.html')return ['files','recorder','settings'].includes(section)?section:'home';
 if(url.pathname==='/phone.html')return 'home';
 if(url.pathname==='/phone-tools.html')return ['voice','camera'].includes(section)?section:'files';
 return null;
}
export function frameLocation(module,origin){const url=new URL(module.frame,origin);url.searchParams.set('embedded','1');return {key:url.pathname,src:url.pathname+url.search+url.hash};}
export function workSummary(payload){
 if(!payload)return null;
 const business=payload['zuxuru-fashion-service-v1']||{},work=payload['zuxuru-designer-work-v1']||{};
 const orders=Array.isArray(business.orders)?business.orders:[],tasks=Array.isArray(work.tasks)?work.tasks:[],products=Array.isArray(business.products)?business.products:[];
 const open=tasks.filter(task=>!task.done);
 return {name:String(business.designer?.name||''),products:products.length,orders:orders.filter(order=>!['Delivered','Closed'].includes(order.stage)).length,tasks:open.length,next:open.slice(0,3).map(task=>({title:String(task.title||'Untitled task'),note:String(task.deliverable||''),status:String(task.status||'Proposed')}))};
}
