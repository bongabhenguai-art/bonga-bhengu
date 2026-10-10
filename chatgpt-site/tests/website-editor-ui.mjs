import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
class Element{
 constructor(){this.handlers={};this.value='';this.disabled=false;this.checked=false;this.hidden=false;this.children=[];this.textContent='';}
 addEventListener(type,fn){(this.handlers[type]||=[]).push(fn);}fire(type){for(const fn of this.handlers[type]||[])fn({preventDefault(){}});}replaceChildren(...nodes){this.children=nodes;}append(node){this.children.push(node);}showModal(){this.open=true;}close(){this.open=false;}remove(){}
}
const html=fs.readFileSync('dist/website-editor.html','utf8'),nodes=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));nodes.get('project-name').value='My saved website';
const updates={},editor={html:'',css:'h1{color:gold}',getContainer:()=>nodes.get('editor'),on:(type,fn)=>updates[type]=fn,setComponents(value){this.html=value;updates.update?.();},getCss(){return this.css;},getHtml(){return this.html;},getProjectData(){return {pages:[{component:this.html}],styles:[]};},loadProjectData(data){this.html=data.pages[0].component;updates.update?.();}};
let saved=null,published=null,failSave=false;
const id='12345678-abcd-1234-abcd-123456789abc',calls=[];
const fetch=async(path,options={})=>{const method=options.method||'GET',body=options.body?JSON.parse(options.body):null;calls.push({path,method,body});
 if(path.endsWith('/publication')){if(method==='GET')return Response.json(published||{published:false,publicationRevision:0,projectRevision:0,url:'/websites/'+id});if(method==='POST'){assert.equal(body.revision,saved.revision);assert.equal(body.approved,true);published={published:true,publicationRevision:(published?.publicationRevision||0)+1,projectRevision:saved.revision,url:'/websites/'+id};return Response.json(published);}published={...published,published:false,publicationRevision:published.publicationRevision+1};return Response.json(published);}
 if(method==='POST'||method==='PUT'){if(failSave)return Response.json({error:'Save failed'}, {status:503});saved={...body,id,revision:(saved?.revision||0)+1};return Response.json({id,revision:saved.revision});}
 return Response.json(path.endsWith(id)?saved:{projects:saved?[{id,name:saved.name}]:[]});};
const context={document:{getElementById:id=>nodes.get(id),createElement:()=>new Element(),body:new Element()},grapesjs:{init:()=>editor},fetch,window:{addEventListener(){}},confirm:()=>true,URL,Blob,setTimeout,console};
await vm.runInNewContext('(async()=>{'+fs.readFileSync('dist/website-editor.js','utf8')+'})()',context);
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
console.log('PASS real editor controller save/review/publish/unpublish, dirty and failed-save guards, public link, revision status and new-project reset');
