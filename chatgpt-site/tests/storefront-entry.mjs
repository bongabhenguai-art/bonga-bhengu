import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import worker from '../dist/server/index.js';
import {cleanStoreDesign} from '../worker/storefront-design.mjs';
import {appWorkspaces,workspaceModules,searchAppModules,moduleFor,moduleURL,routeForURL} from '../dist/app-routes.js';
import {phoneIcon} from '../dist/phone-modules.js';

const origin='https://site.example',headers={'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'owner@example.com'},env={JARVIS_OWNER_EMAIL:'owner@example.com'};
for(const requestHeaders of [{},headers]){
  const response=await worker.fetch(new Request(origin+'/',{headers:requestHeaders}),env);assert.equal(response.status,200);assert.equal(response.headers.has('location'),false);
  const html=await response.text();assert.ok(html.includes('storefront-workspaces.js'));assert.equal((html.match(/id="fashion-platform"/g)||[]).length,1);
  for(const workspace of appWorkspaces)assert.ok(html.includes(moduleURL(workspace.entry)));
  for(const id of ['education','visual-website-editor'])assert.ok(html.includes(moduleURL(id)),'New workspace has a direct storefront entry');
}
const data={designer:{name:'My saved storefront',location:'Durban',style:'Fashion',story:'My existing story'},products:[],design:cleanStoreDesign()};
const custom=await worker.fetch(new Request(origin+'/',{headers}),{...env,DB:{prepare:()=>({first:async()=>({slug:'a'.repeat(32),public_data:JSON.stringify(data)})})}});
assert.equal(custom.status,200);const customHTML=await custom.text();assert.ok(customHTML.includes('My saved storefront'));assert.ok(customHTML.includes('storefront-workspaces.js'),'An owner-selected homepage keeps the same module entry');
const signin=await worker.fetch(new Request(origin+'/app.html?module=storefront-editor'),env);assert.equal(signin.status,302);assert.equal(new URL(signin.headers.get('location')).searchParams.get('return_to'),'/app.html?module=storefront-editor','Selected workspace survives sign-in without relying on a URL fragment');
for(const id of ['education','visual-website-editor']){
  const path=moduleURL(id).split('#')[0],response=await worker.fetch(new Request(origin+path),env);
  assert.equal(response.status,302);assert.equal(new URL(response.headers.get('location')).searchParams.get('return_to'),path,'Website and school destinations survive sign-in');
}
assert.equal(routeForURL('/app.html?module=storefront-editor',origin),'storefront-editor');assert.equal(routeForURL('/app.html?module=orders#camera',origin),'camera');assert.equal(routeForURL('/app.html?module=unknown',origin),'home');
for(const workspace of appWorkspaces)for(const module of workspaceModules(workspace.id,true))assert.equal(routeForURL(moduleURL(module.id),origin),module.id);

// Run the actual public menu controller for guest and owner menus, and the
// retained storefront's handoff into its parent app. Layout is not simulated.
class Element{
  constructor(tag='div',attrs={}){this.tagName=tag.toUpperCase();this.attrs=attrs;this.children=[];this.handlers={};this.classList={contains:name=>(this.attrs.class||'').split(' ').includes(name),add:name=>this.attrs.class=(this.attrs.class||'')+' '+name};}
  append(...children){this.children.push(...children);}prepend(...children){this.children.unshift(...children);}replaceChildren(...children){this.children=children;}
  set innerHTML(html){this.children=[...html.matchAll(/<(button|input|div|p|h2|a|svg)\b([^>]*)>/g)].map(([,tag,attrs])=>new Element(tag,Object.fromEntries([...attrs.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(([,name,value])=>[name,value||'']))));}
  set href(value){this.attrs.href=value;}get href(){return new URL(this.attrs.href||'',origin).href;}
  setAttribute(key,value){this.attrs[key]=value;}hasAttribute(key){return key in this.attrs;}
  matches(selector){return selector==='a'||selector==='a[href]'?this.tagName==='A':selector.startsWith('.')?(this.attrs.class||'').split(' ').includes(selector.slice(1)):selector.startsWith('[')?this.hasAttribute(selector.slice(1,-1)):this.tagName===selector.toUpperCase();}
  descendants(){return this.children.flatMap(child=>[child,...child.descendants()]);}querySelectorAll(selector){return this.descendants().filter(child=>child.matches(selector));}querySelector(selector){return this.querySelectorAll(selector)[0];}
  addEventListener(type,handler){(this.handlers[type]||=[]).push(handler);}fire(type,event={}){for(const handler of this.handlers[type]||[])handler(event);}click(){this.fire('click');}closest(selector){return this.matches(selector)?this:null;}showModal(){this.open=true;}close(){this.open=false;}focus(){this.focused=true;}
}
async function menuFixture({owner=false,embedded=false,published=false}={}){
  const body=new Element('body'),main=new Element('main'),hub=published?null:new Element('section'),trigger=new Element('button',{'data-storefront-modules':''});if(hub){hub.id='fashion-platform';main.append(hub);}body.append(main,trigger);
  let handedOff,opens=0;const events={},document={body,querySelector:selector=>selector==='main'?main:body.querySelector(selector),querySelectorAll:selector=>body.querySelectorAll(selector),createElement:tag=>new Element(tag),getElementById:id=>body.descendants().find(node=>node.id===id),addEventListener:(type,handler)=>(events[type]||=[]).push(handler)};
  const window={addEventListener(){}};window.parent=embedded?{document:{body:new Element('body',{class:'bbapp'}),querySelector:()=>({click:()=>opens++})},bongaAppNavigate:href=>{handedOff=href;return true;}}:window;
  const code=fs.readFileSync('dist/storefront-workspaces.js','utf8').replace(/^import .*;\n/gm,'');
  await vm.runInNewContext(`(async()=>{${code}})()`,{document,window,location:{origin,href:origin+'/'},fetch:async()=>({ok:true,json:async()=>({owner})}),URL,phoneIcon,appWorkspaces,workspaceModules,searchAppModules,moduleFor,moduleURL,routeForURL,matchMedia:()=>({matches:false})});
  const dialog=document.getElementById('storefront-modules-dialog'),list=dialog.querySelector('.bbstore-module-list'),links=list.querySelectorAll('a');
  assert.equal(links.length,owner?33:31);assert.equal(links.some(link=>link.href.endsWith('#admin')),owner);trigger.click();assert.equal(embedded?opens:dialog.open,embedded?1:true);
  const toolLinks=document.getElementById('fashion-platform').querySelector('.bbstore-feature-tools').querySelectorAll('a');
  assert.deepEqual(toolLinks.map(link=>link.href),['visual-website-editor','education'].map(id=>origin+moduleURL(id)),'Every storefront exposes the same website and school tools');
  if(published)assert.equal(document.getElementById('fashion-platform').querySelector('.app-entry-grid').querySelectorAll('a').length,4,'The published homepage gets the same four entry cards');
  if(embedded){let prevented=false;const link=new Element('a',{href:moduleURL('orders')});for(const handler of events.click)handler({target:link,button:0,preventDefault:()=>prevented=true});assert.equal(handedOff,origin+moduleURL('orders'));assert.equal(prevented,true,'A module opens in the parent app without replacing the storefront');}
}
await menuFixture();await menuFixture({owner:true});await menuFixture({embedded:true});await menuFixture({published:true});

// Brand creation must enter the retained app when the storefront is embedded.
async function brandFormFixture(embedded=false){
  const form={},input={value:'Bonga Bhengu',setCustomValidity(){},reportValidity:()=>true,addEventListener(){}};
  const saved={},location={href:origin+'/?embedded=1'};let handedOff;
  const window={};window.parent=embedded?{bongaAppNavigate:href=>{handedOff=href;return true;}}:window;
  await vm.runInNewContext(fs.readFileSync('dist/tech-landing.js','utf8'),{
    document:{getElementById:id=>id==='landing-profile-form'?form:id==='landing-brand'?input:null},
    window,location,sessionStorage:{setItem:(key,value)=>saved[key]=value},setInterval(){},
    fetch:async()=>({ok:true,json:async()=>({})})
  });
  let prevented=false;form.onsubmit({preventDefault:()=>prevented=true});
  assert.equal(prevented,true);assert.equal(saved['bonga-profile-name'],'Bonga Bhengu');
  if(embedded){assert.equal(handedOff,moduleURL('designer'));assert.equal(location.href,origin+'/?embedded=1','The brand form keeps the storefront iframe mounted');}
  else assert.equal(location.href,moduleURL('designer'));
}
await brandFormFixture();await brandFormFixture(true);
console.log('PASS storefront entry for guests and signed-in owners, preserved published homepage, post-sign-in module route, complete menus, owner filtering and retained storefront link and brand-form handoff');
