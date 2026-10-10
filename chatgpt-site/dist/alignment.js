(()=>{'use strict';
 const byId=id=>document.getElementById(id); let data=null;
 const node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
 function renderFiles(){
  if(!data)return;
  const query=byId('alignment-search').value.trim().toLowerCase();
  const files=data.inventory.files.filter(f=>[f.name,f.purpose,...f.modules,f.action].join(' ').toLowerCase().includes(query));
  byId('alignment-count').textContent=files.length+' of '+data.inventory.files.length+' source files';
  const fragment=document.createDocumentFragment();
  for(const f of files){const article=node('article');const verified=data.verification?.files.find(v=>v.name===f.name);article.append(node('h3',f.name),node('p','Destination: '+f.modules.join(', ')),node('p','Decision: '+f.action+' · '+f.verification));if(verified)article.append(node('p','Implementation: '+verified.implementation));fragment.append(article);}
  byId('alignment-files').replaceChildren(fragment);
 }
 async function load(){
  byId('alignment-retry').hidden=true;byId('alignment-status').textContent='Loading alignment…';
  try{
   const response=await fetch('/api/platform/alignment',{cache:'no-store'});
   if(!response.ok)throw Error(response.status===403?'Sign in as the owner to view the alignment.':'The alignment could not be loaded.');
   data=await response.json();
   if(data.sourceMerge){const m=data.sourceMerge;byId('source-merge-status').textContent=m.libraryArtifacts+' original artifacts + '+m.additionalOsArtifacts+' OS artifacts + '+m.githubSources+' GitHub files retained in this app source.';byId('source-merge-scope').textContent=m.scope;const list=node('ul');for(const f of m.files){list.append(node('li',f.name+' · '+f.disposition));}byId('source-merge-files').replaceChildren(list);}

   byId('alignment-status').textContent=data.inventory.sourceCount+' source files mapped into '+data.modules.length+' existing capability areas. These are source review findings, not live connection checks.';
   byId('alignment-scope').textContent=data.inventory.scope;
   const audit=byId('alignment-verification');audit.replaceChildren();if(data.verification){const v=data.verification;audit.append(node('p',v.summary),node('p','CodeRabbit: '+v.coderabbit.githubReviews.length+' GitHub reviews; '+v.coderabbit.unresolvedIssues.length+' unresolved minor issues at the checked commit. Review of the latest branch head has not been verified.'));const link=node('a','Open the GitHub alignment PR ↗');link.href=v.github.url;link.target='_blank';link.rel='noopener noreferrer';audit.append(link);}
   const fragment=document.createDocumentFragment();
   for(const m of data.modules){
    const card=node('article');card.className='card';card.append(node('h3',m.name),node('p',m.purpose));const list=node('dl');
    for(const [label,value] of [['Input',m.input],['Output',m.output],['Current scope',m.implementation],['Needs',m.dependencies]])list.append(node('dt',label),node('dd',value));
    card.append(list);const link=node('a','Open existing workspace ↗');link.href=m.route;card.append(link);
    const button=node('button','Brief this specialist');button.type='button';button.onclick=()=>{
     const prompt=byId('prompt');if(prompt.value.trim()&&!window.confirm('Replace the current unsent brief with this module brief?'))return;
     byId('role').value=m.role;prompt.value='Bonga Bhengu App — '+m.name+'\nGoal: '+m.purpose+'\nRequired input: '+m.input+'\nExpected output: '+m.output+'\nCurrent boundary: '+m.implementation+'\nNext step: '+m.next+'\n\nBusiness details and evidence: ';
     document.getElementById('team').scrollIntoView();prompt.focus();
    };card.append(button);fragment.append(card);
   }
   byId('alignment-modules').replaceChildren(fragment);renderFiles();byId('alignment-export').disabled=false;
  }catch(error){byId('alignment-status').textContent=error.message;byId('alignment-retry').hidden=false;}
 }
 byId('alignment-search').addEventListener('input',renderFiles);byId('alignment-retry').onclick=load;
 byId('alignment-export').onclick=()=>{if(!data)return;const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=node('a');a.href=url;a.download='Bonga_Bhengu_App_Alignment.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 load();
})();
