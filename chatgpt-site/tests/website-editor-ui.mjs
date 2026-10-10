import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {builderStyles,builderSections,builderTemplates} from '../dist/website-builder-library.js';
class Element{
 constructor(){this.handlers={};this.value='';this.disabled=false;this.checked=false;this.hidden=false;this.children=[];this.textContent='';this.dataset={};this.attributes={};this.classes=new Set();this.classList={toggle:name=>{if(this.classes.has(name)){this.classes.delete(name);return false;}this.classes.add(name);return true;}};}
 addEventListener(type,fn){(this.handlers[type]||=[]).push(fn);}fire(type){for(const fn of this.handlers[type]||[])fn({preventDefault(){}});}replaceChildren(...nodes){this.children=nodes;}append(node){this.children.push(node);}showModal(){this.open=true;}close(){this.open=false;}remove(){}
 setAttribute(name,value){this.attributes[name]=value;}click(){return this.onclick?.();}
}
const html=fs.readFileSync('dist/website-editor.html','utf8'),nodes=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));nodes.get('project-name').value='My saved website';
const updates={},undo=[],redo=[];
const editor={html:'',css:'h1{color:gold}',device:'Desktop',getContainer:()=>nodes.get('editor'),on:(type,fn)=>updates[type]=fn,setComponents(value){undo.push(this.html);redo.length=0;this.html=value;updates.update?.();},setStyle(css){this.css=css;updates.update?.();},addStyle(css){this.css+=css;},getCss(){return this.css;},getHtml(){return this.html;},getProjectData(){return {pages:[{component:this.html}],styles:[]};},loadProjectData(data){this.setComponents(data.pages[0].component);},addComponents(content){this.setComponents(this.html+content);return [{content}];},select(component){this.selected=component;},setDevice(device){this.device=device;updates['device:select']?.();},getDevice(){return this.device;},refresh(){this.refreshed=true;}};
editor.UndoManager={hasUndo:()=>undo.length>0,hasRedo:()=>redo.length>0,clear(){undo.length=0;redo.length=0;},undo(){redo.push(editor.html);editor.html=undo.pop();updates.undo?.();},redo(){undo.push(editor.html);editor.html=redo.pop();updates.redo?.();}};
let saved=null,published=null,failSave=false;
const id='12345678-abcd-1234-abcd-123456789abc',calls=[];
const fetch=async(path,options={})=>{const method=options.method||'GET',body=options.body?JSON.parse(options.body):null;calls.push({path,method,body});
 if(path.endsWith('/publication')){if(method==='GET')return Response.json(published||{published:false,publicationRevision:0,projectRevision:0,url:'/websites/'+id});if(method==='POST'){assert.equal(body.revision,saved.revision);assert.equal(body.approved,true);published={published:true,publicationRevision:(published?.publicationRevision||0)+1,projectRevision:saved.revision,url:'/websites/'+id};return Response.json(published);}published={...published,published:false,publicationRevision:published.publicationRevision+1};return Response.json(published);}
 if(method==='POST'||method==='PUT'){if(failSave)return Response.json({error:'Save failed'}, {status:503});saved={...body,id,revision:(saved?.revision||0)+1};return Response.json({id,revision:saved.revision});}
 return Response.json(path.endsWith(id)?saved:{projects:saved?[{id,name:saved.name}]:[]});};
let approveDiscard=true;const documentEvents={};
const context={builderStyles,builderSections,builderTemplates,document:{getElementById:id=>nodes.get(id),createElement:()=>new Element(),body:new Element(),addEventListener(type,fn){documentEvents[type]=fn;},querySelector:()=>[...nodes.values()].find(node=>node.open)||null},grapesjs:{init:()=>editor},fetch,window:{addEventListener(){}},confirm:()=>approveDiscard,URL,Blob,setTimeout,console};
await vm.runInNewContext('(async()=>{'+fs.readFileSync('dist/website-editor.js','utf8').replace(/^import .*;\n/,'')+'})()',context);
assert.equal(nodes.get('publish').disabled,true,'Unsaved drafts cannot be published');
await nodes.get('save').onclick();assert.equal(nodes.get('publish').disabled,false);assert.equal(published,null,'Save must not publish');
nodes.get('publish').onclick();assert.equal(nodes.get('publish-dialog').open,true);assert.equal(nodes.get('publish-confirm').disabled,true,'Publication requires explicit review');assert.equal(nodes.get('publish-review-frame').srcdoc.includes(editor.html),true);
await nodes.get('publish-confirm').onclick();assert.equal(published,null,'Unchecked publication cannot send');
nodes.get('publish-approved').checked=true;nodes.get('publish-approved').fire('change');assert.equal(nodes.get('publish-confirm').disabled,false);await nodes.get('publish-confirm').onclick();
// The click handler launches its promise; wait for the controller's response handlers.
await new Promise(resolve=>setTimeout(resolve,0));assert.equal(published.published,true);assert.equal(nodes.get('published-link').hidden,false);assert.equal(nodes.get('published-link').href,'/websites/'+id);assert.equal(nodes.get('publish-dialog').open,false);
editor.setComponents('<h1>New private content</h1>');assert.equal(nodes.get('publish').disabled,true,'Dirty canvas must be saved again before review');assert.equal(published.projectRevision,1);
failSave=true;await nodes.get('save').onclick();assert.equal(nodes.get('publish').disabled,true,'Failed saves never enable publication');assert.equal(nodes.get('status').textContent,'Save failed');
failSave=false;await nodes.get('save').onclick();assert.equal(nodes.get('publish').disabled,false);assert.match(nodes.get('publication-status').textContent,/newer draft/);assert.equal(published.projectRevision,1);
await nodes.get('unpublish').onclick();await new Promise(resolve=>setTimeout(resolve,0));assert.equal(published.published,false);assert.equal(nodes.get('published-link').hidden,true);assert.equal(saved.html,'<h1>New private content</h1>');
nodes.get('new').onclick();assert.equal(nodes.get('publish').disabled,true);assert.equal(nodes.get('unpublish').disabled,true);assert.equal(nodes.get('published-link').hidden,true);
assert.equal(calls.filter(c=>c.method==='POST'&&c.path.endsWith('/publication')).length,1);
// Templates never replace a saved website or publish on selection.
assert.equal(nodes.get('template-list').children.length,3);
assert.equal(nodes.get('undo').disabled,true,'New drafts clear history from the previous project');
const beforeSection=editor.html;nodes.get('section-select').value='services';nodes.get('insert-section').onclick();
assert.ok(editor.html.startsWith(beforeSection));assert.ok(editor.html.includes('Strategy & direction'));
assert.equal(nodes.get('save-state').textContent,'Unsaved changes');assert.equal(nodes.get('undo').disabled,false);
nodes.get('undo').onclick();assert.equal(editor.html,beforeSection);assert.equal(nodes.get('redo').disabled,false);
nodes.get('redo').onclick();assert.ok(editor.html.includes('Strategy & direction'));
nodes.get('device-phone').onclick();assert.equal(editor.device,'Phone');assert.equal(nodes.get('device-phone').attributes['aria-pressed'],'true');assert.equal(nodes.get('device-desktop').attributes['aria-pressed'],'false');
nodes.get('canvas-focus').onclick();assert.equal(context.document.body.classes.has('builder-focus'),true);assert.equal(editor.refreshed,true);
nodes.get('templates').onclick();assert.equal(nodes.get('template-dialog').open,true);
approveDiscard=false;const privateDraft=editor.html;nodes.get('template-list').children[1].onclick();assert.equal(editor.html,privateDraft,'Cancelling template selection preserves unsaved work');assert.equal(nodes.get('template-dialog').open,true);
approveDiscard=true;nodes.get('template-list').children[1].onclick();assert.match(editor.html,/bb-page--light/);assert.equal(nodes.get('template-dialog').open,false);assert.equal(nodes.get('publish').disabled,true);assert.equal(nodes.get('undo').disabled,true);assert.equal(saved.html,'<h1>New private content</h1>','Templates leave the saved website unchanged');
let prevented=false;documentEvents.keydown({key:'s',ctrlKey:true,preventDefault(){prevented=true;}});await new Promise(resolve=>setTimeout(resolve,0));assert.equal(prevented,true);assert.match(saved.html,/bb-page--light/);assert.equal(calls.filter(c=>c.method==='POST'&&c.path.endsWith('/publication')).length,1,'Keyboard save does not publish');assert.match(nodes.get('save-state').textContent,/Saved · revision/);
console.log('PASS editor save/review/publish safeguards, template cancellation, section undo/redo, device views, canvas focus and keyboard draft saving');
