import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import worker from '../dist/server/index.js';
import {guideFor} from '../dist/app-guides.js';
import {phoneIcon} from '../dist/phone-modules.js';
import {appModules,appWorkspaces,workspaceFor,workspaceModules,moduleFor,businessSection,searchAppModules,routeForURL,frameLocation,workSummary} from '../dist/app-routes.js';

const origin='https://site.example',env={JARVIS_OWNER_EMAIL:'owner@example.com'},headers={'oai-authenticated-user-id':'customer','oai-authenticated-user-email':'customer@example.com'};
assert.equal((await worker.fetch(new Request(origin+'/app.html'),env)).status,302);
const storefrontResponse=await worker.fetch(new Request(origin+'/',{headers}),env);assert.equal(storefrontResponse.status,200,'Signed-in visitors start at the storefront');const storefront=await storefrontResponse.text();
assert.equal((await worker.fetch(new Request(origin+'/?view=website',{headers}),env)).status,200);
assert.equal((await worker.fetch(new Request(origin+'/'),env)).status,200);
const response=await worker.fetch(new Request(origin+'/app.html',{headers}),env);assert.equal(response.status,200);const html=await response.text();
assert.ok(html.includes('class="bbapp cyber-fashion designer-dashboard"'));assert.ok(!/<script[^>]+src="\/phone-shell/.test(html),'App must not add another phone or desktop navigation');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);assert.equal(new Set(ids).size,ids.length,'No duplicated component IDs');
const original=fs.readFileSync('dist/fashion-service.html','utf8');for(const id of [...original.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]))assert.ok(ids.includes(id),`Existing component ${id} preserved`);
assert.ok(html.includes('data-app-src="/digital-studio.html?embedded=1"'));assert.ok(!html.includes('iframe src="/digital-studio.html'),'Studio is lazy-mounted once');
for(const file of ['app-shell.css','app-runtime.js','app-routes.js','app-embed.js','app-embed.css'])assert.equal((await worker.fetch(new Request(origin+'/'+file),env)).status,200);
for(const module of appModules){if(!module.frame&&module.id!=='home')assert.ok(ids.includes(businessSection(module.id)),module.id);if(module.action)assert.ok(ids.includes(module.action.click||module.action.focus),module.name+' action target');}
assert.equal(new Set(appModules.map(module=>module.id)).size,appModules.length);assert.equal(searchAppModules('',false).some(module=>module.owner),false);assert.equal(searchAppModules('',true).filter(module=>module.owner).length,2);
assert.deepEqual(appWorkspaces.map(workspace=>workspace.id),['brand','website','content','business']);
const assigned=appWorkspaces.flatMap(workspace=>workspaceModules(workspace.id,true).map(module=>module.id));
assert.deepEqual([...assigned].sort(),appModules.filter(module=>module.id!=='home').map(module=>module.id).sort(),'Every existing module belongs to exactly one workspace');
for(const workspace of appWorkspaces){assert.equal(workspaceFor(workspace.entry).id,workspace.id);assert.equal(workspaceModules(workspace.id)[0].id,workspace.entry);}
assert.ok(storefront.includes('data-customer-storefront'));assert.ok(!storefront.includes('MY BRAND'));
assert.ok(!storefront.includes('class="app-entry-grid"'), 'No duplicate homepage workspace grid');assert.ok(html.includes('id="app-storefront-frame" data-app-src="/?embedded=1"'),'App home reuses the real storefront');assert.equal(workspaceFor('business-engine').id,'business');assert.equal(workspaceFor('install').id,'website');assert.equal(workspaceModules('business',false).some(module=>module.owner),false);
const legacy=fs.readFileSync('dist/app-entry.js','utf8');
function entryRedirect(pathname,hash='',embedded=false){let redirected;const window={};window.parent=embedded?{}:window;vm.runInNewContext(legacy,{window,URLSearchParams,location:{pathname,hash,search:embedded?'?embedded=1':'',replace:value=>redirected=value}}, {timeout:1000});return redirected;}
// The window and parent identities must match for standalone entry redirects.
for(const [pathname,hash,expected] of [['/phone.html','','/'],['/laptop.html','','/'],['/laptop.html','#files','/app.html?module=files#files'],['/Bonga_Bhengu_Fashion_OS.html','','/app.html?module=fashion-os#fashion-os'],['/fashion-service.html','','/'],['/fashion-service.html','#designer','/app.html?module=designer#designer'],['/digital-studio.html','','/app.html?module=digital-studio#digital-studio'],['/fashion-os.html','','/app.html?module=fashion-os#fashion-os'],['/platform','','/app.html?module=admin#admin'],['/workspace','','/app.html?module=workroom#workroom']]){let redirected;const window={};window.parent=window;vm.runInNewContext(legacy,{window,URLSearchParams,location:{pathname,hash,search:'',replace:value=>redirected=value}});assert.equal(redirected,expected);}
assert.equal(entryRedirect('/digital-studio.html','',true),undefined,'Embedded Studio stays mounted');assert.equal(entryRedirect('/app.html'),undefined);assert.equal(entryRedirect('/phone-camera.html'),undefined,'Pairing page retains its room session');
assert.equal(routeForURL('/',origin),'home');assert.equal(routeForURL('/#collections',origin),null);assert.equal(routeForURL('/fashion-service.html#orders',origin),'orders');assert.equal(routeForURL('/laptop.html#files',origin),'files');assert.equal(routeForURL('/digital-studio.html',origin),'digital-studio');assert.equal(routeForURL('https://other.example/app.html#orders',origin),null);assert.equal(routeForURL('javascript:alert(1)',origin),null);assert.equal(routeForURL('/api/designer/workspace',origin),null);
assert.deepEqual(frameLocation(moduleFor('files'),origin),{key:'/laptop.html',src:'/laptop.html?embedded=1#files'});
assert.equal(businessSection('fashion-jarvis'),'overview');assert.equal(businessSection('orders'),'orders');assert.equal(businessSection('files'),null);
const payload={'zuxuru-fashion-service-v1':{designer:{name:'Customer'},products:[{id:'p'}],orders:[{stage:'Quoted'},{stage:'Delivered'}]},'zuxuru-designer-work-v1':{tasks:[{title:'Saved task',done:false,status:'Review'},{title:'Completed task',done:true}]}};
assert.equal(workSummary(null),null);assert.deepEqual(workSummary(payload),{name:'Customer',products:1,orders:1,tasks:1,next:[{title:'Saved task',note:'',status:'Review'}]});

// Run the actual shell controller with a small DOM fixture. Hardware and layout
// are not simulated; verify navigation, mounted instances and action delegation.
class Node {
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.attrs={};this.dataset={};this.handlers={};this.hidden=false;this.disabled=false;this.value='';this.textContent='';this.clicks=0;this.classList={contains:name=>(this.className||'').split(' ').includes(name),add(){},toggle(){}};}
  append(...nodes){this.children.push(...nodes);}prepend(...nodes){this.children.unshift(...nodes);}replaceChildren(...nodes){this.children=[...nodes];}
  set innerHTML(value){this.html=value;this.children=value.includes('<svg')?[new Node('svg')]:[];}
  get innerHTML(){return this.html||'';}
  set href(value){this.attrs.href=value;}get href(){return new URL(this.attrs.href||'',origin+'/app.html').href;}
  set src(value){this.attrs.src=value;const url=new URL(value,origin);this.contentWindow={location:{pathname:url.pathname,hash:url.hash}};}get src(){return this.attrs.src;}
  setAttribute(key,value){this.attrs[key]=value;}getAttribute(key){return this.attrs[key]??null;}removeAttribute(key){delete this.attrs[key];}hasAttribute(key){return key in this.attrs;}
  descendants(){return this.children.flatMap(child=>[child,...child.descendants()]);}
  querySelector(selector){if(selector==='svg')return this.descendants().find(node=>node.tagName==='SVG');if(selector==='a')return this.descendants().find(node=>node.tagName==='A');if(selector.startsWith('input'))return this.descendants().find(node=>['INPUT','TEXTAREA','SELECT'].includes(node.tagName));return null;}
  querySelectorAll(selector){return selector==='a'?this.descendants().filter(node=>node.tagName==='A'):[];}
  addEventListener(type,handler){(this.handlers[type]||=[]).push(handler);}fire(type,event={}){for(const handler of this.handlers[type]||[])handler({target:this,preventDefault(){},...event});}
  click(){this.clicks++;this.fire('click');}focus(){this.focused=true;}scrollIntoView(){this.scrolled=true;}showModal(){this.open=true;}close(){this.open=false;}matches(selector){return selector.split(',').map(tag=>tag.toUpperCase()).includes(this.tagName);}closest(){return null;}
}
const nodes=new Map(ids.map(id=>[id,new Node()]));
for(const [id,node] of nodes)node.id=id;
for(const match of html.matchAll(/<(\w+)[^>]*\bid="([^"]+)"/g))nodes.get(match[2]).tagName=match[1].toUpperCase();
nodes.get('cloud-status').textContent='Cloud account opened.';nodes.get('studio-dashboard-frame').dataset.appSrc='/digital-studio.html?embedded=1';
nodes.get('app-storefront-frame').dataset.appSrc='/?embedded=1';
const form=new Node('form'),field=new Node('input');form.append(field);nodes.set('order-form',form);nodes.get('app-business').append(form);
const more=[new Node('button')],windowEvents={},documentEvents={},body=new Node('body');body.className='bbapp';
const sections=[...new Set(appModules.map(module=>businessSection(module.id)).filter(Boolean))].map(id=>nodes.get(id));
const document={body,title:'',getElementById:id=>nodes.get(id),createElement:tag=>new Node(tag),querySelector:selector=>selector==='dialog[open]'&&nodes.get('app-modules-dialog').open?nodes.get('app-modules-dialog'):null,querySelectorAll:selector=>selector==='[data-app-more]'?more:selector==='[data-app-icon]'?[]:selector==='#app-business form'?[form]:selector==='.designer-content>section'?sections:selector==='#app-rail a,#app-dock a'?[...nodes.get('app-rail').descendants(),...nodes.get('app-dock').descendants()].filter(node=>node.tagName==='A'):[],addEventListener:(type,handler)=>(documentEvents[type]||=[]).push(handler)};
const location={origin,href:origin+'/app.html',hash:'#home'},window={designerAppsLoaded:true,addEventListener:(type,handler)=>(windowEvents[type]||=[]).push(handler)};
const globals={document,window,location,navigator:{onLine:true},MutationObserver:class{observe(){}},fetch:async path=>({ok:true,json:async()=>path==='/api/jarvis/status'?{owner:false}: {payload}}),URL,setTimeout,clearTimeout,phoneIcon,guideFor,appModules,appWorkspaces,workspaceFor,workspaceModules,moduleFor,businessSection,searchAppModules,routeForURL,frameLocation,workSummary,matchMedia:()=>({matches:true}),localStorage:{getItem:key=>JSON.stringify(payload[key])}};
const code=fs.readFileSync('dist/app-runtime.js','utf8').replace(/^import .*;\r?\n/gm,'');await vm.runInNewContext(`(async()=>{${code}\n})()`,globals);await new Promise(resolve=>setTimeout(resolve,0));
assert.equal(nodes.get('app-storefront-frame').src,'/?embedded=1');assert.equal(nodes.get('app-business').hidden,true);const storefrontFrame=nodes.get('app-storefront-frame');
function go(id){location.hash='#'+id;for(const handler of windowEvents.hashchange)handler();}
for(const id of ['app-rail','app-dock'])assert.deepEqual(nodes.get(id).querySelectorAll('a').map(link=>link.dataset.workspace),appWorkspaces.map(workspace=>workspace.id),'Four primary workspace destinations');
go('catalogue');nodes.get('app-guide-open').click();assert.equal(nodes.get('app-guide-dialog').open,true);assert.equal(nodes.get('app-guide-input').textContent,guideFor('catalogue').input);assert.equal(nodes.get('app-guide-steps').children.length,guideFor('catalogue').steps.length);nodes.get('app-guide-close').click();assert.equal(nodes.get('app-guide-dialog').open,false);assert.equal(body.dataset.appWorkspace,'brand');assert.equal(nodes.get('app-workspace-nav').querySelectorAll('a').length,workspaceModules('brand').length);assert.equal(nodes.get('app-rail').querySelectorAll('a').find(link=>link.getAttribute('aria-current')==='page').dataset.workspace,'brand');
assert.equal(nodes.get('app-workspace-nav').querySelectorAll('a').find(link=>link.getAttribute('aria-current')==='page').getAttribute('href'),'#catalogue');
vm.runInNewContext(fs.readFileSync('dist/designer-dashboard.js','utf8'),globals);assert.equal(nodes.get('catalogue').hidden,false,'Late original dashboard loading cannot override the app module');assert.equal(nodes.get('overview').hidden,true);
go('install');assert.equal(body.dataset.appWorkspace,'website');assert.equal(nodes.get('install').hidden,false);go('home');assert.equal(nodes.get('app-workspace-nav').hidden,true);
field.value='Unsaved customer input';go('orders');assert.equal(nodes.get('app-business').hidden,false);nodes.get('app-module-action').click();assert.equal(field.focused,true,'Context action focuses the existing form');go('home');assert.equal(nodes.get('app-storefront-frame'),storefrontFrame,'Returning home reuses the same storefront');go('orders');assert.equal(field.value,'Unsaved customer input','Returning from the storefront retains form input');
go('files');assert.equal(nodes.get('app-frame-stage').children.length,1);const filesFrame=nodes.get('app-frame-stage').children[0];go('recorder');assert.equal(nodes.get('app-frame-stage').children.length,1,'Device tools reuse one mounted document');assert.equal(filesFrame.contentWindow.location.hash,'#recorder');go('home');go('files');assert.equal(nodes.get('app-frame-stage').children[0],filesFrame,'Returning retains the same device-tool instance');
go('digital-studio');assert.equal(nodes.get('studio-dashboard-frame').src,'/digital-studio.html?embedded=1');go('my-work');go('digital-studio');assert.equal(nodes.get('studio-dashboard-frame').src,'/digital-studio.html?embedded=1');
assert.equal(body.dataset.appWorkspace,'content');assert.ok(nodes.get('app-workspace-nav').querySelectorAll('a').some(link=>link.getAttribute('href')==='#camera'));assert.ok(!nodes.get('app-workspace-nav').querySelectorAll('a').some(link=>link.getAttribute('href')==='#business-engine'));
go('admin');assert.equal(nodes.get('app-blocked').hidden,false);assert.equal(nodes.get('app-frame-stage').children.length,1,'Non-owner cannot mount the owner workspace');
assert.equal(window.bongaAppNavigate('https://other.example/app.html'),false);assert.equal(window.bongaAppNavigate('/fashion-service.html#orders'),true);assert.equal(location.hash,'orders');
go('business-engine');const target=nodes.get('run-business-engine');nodes.get('app-module-action').click();assert.equal(target.clicks,1,'Workflow action delegates to the original guarded button');target.disabled=true;nodes.get('app-module-action').click();assert.equal(target.clicks,1,'Busy original controls cannot be triggered twice');
go('overview');nodes.get('app-module-action').click();assert.equal(nodes.get('run-connected-system').clicks,1,'Connected system uses its existing guarded run control');
console.log('PASS four workspace navigation, complete single module assignment, legacy page entry, no dashboard route conflicts, auth, safe routing, saved summaries, retained forms and frames, owner guards and original engine control delegation');
