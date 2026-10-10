import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../dist/server/index.js';
const env={JARVIS_OWNER_EMAIL:'owner@example.com',OPENAI_API_KEY:'test-only'};
const headers={'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'owner@example.com'};
const req=(path,h={},method='GET',body)=>new Request('https://site.example'+path,{method,headers:h,...(body?{body:JSON.stringify(body)}:{})});
for(const h of [{},{'oai-authenticated-user-id':'other','oai-authenticated-user-email':'other@example.com'},{'oai-authenticated-user-email':'owner@example.com'}]){
 const r=await worker.fetch(req('/api/platform/alignment',h),env);assert.equal(r.status,403);assert.ok(!(await r.text()).includes('libraryFileId'));
}
assert.equal((await worker.fetch(req('/api/platform/alignment',headers,'POST',{}),env)).status,405);
const response=await worker.fetch(req('/api/platform/alignment',headers),env);assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');const data=await response.json();
assert.equal(data.inventory.files.length,79);assert.equal(data.modules.length,11);assert.deepEqual(data.packages.map(p=>p.price),[299,499,699,999]);
assert.equal(data.verification.sourceMetadataMatched,79);assert.equal(data.verification.allSourcesImplemented,false);
assert.equal(data.verification.files.length,79);assert.ok(data.verification.files.every(f=>f.metadataMatched));
assert.equal(data.verification.github.documentationFiles,63);assert.equal(data.verification.github.changedFiles,64);assert.equal(data.verification.github.merged,false);
assert.equal(data.verification.coderabbit.githubReviews.length,2);assert.equal(data.verification.coderabbit.unresolvedIssues.length,2);assert.equal(data.verification.coderabbit.latestHeadReviewVerified,false);
for(const m of data.modules){
 for(const file of m.files)assert.ok(fs.existsSync(file),file);
 const [path,anchor]=m.route.split('#');const page=path==='/platform'?'platform.html':path==='/workspace'?'workspace.html':path.slice(1);const text=fs.readFileSync('dist/'+page,'utf8');if(anchor)assert.ok(text.includes('id="'+anchor+'"'),m.route);
}
for(const f of data.inventory.files){assert.match(f.sha256,/^[a-f0-9]{64}$/);for(const id of f.modules)assert.ok(data.modules.some(m=>m.id===id));}
// Verify the actual outgoing model request, without making a paid provider call.
const original=globalThis.fetch;let payload;
globalThis.fetch=async(url,options)=>{payload=JSON.parse(options.body);return Response.json({output:[{content:[{type:'output_text',text:JSON.stringify({answer:'Review the supplied evidence.',tasks:[]})}]}]});};
try{
 const r=await worker.fetch(req('/api/jarvis/chat',{...headers,origin:'https://site.example','content-type':'application/json'},'POST',{role:'needs',prompt:'Help my business grow.',mode:'plan'}),env);
 assert.equal(r.status,200);assert.ok(payload.instructions.includes('Bonga Bhengu App is the parent platform'));assert.ok(payload.instructions.includes('Current monthly package requests'));assert.ok(payload.instructions.includes('Studio R999'));assert.ok(payload.instructions.includes('customer needs'));assert.ok(!payload.instructions.includes('libraryFileId'));
}finally{globalThis.fetch=original;}
console.log('PASS owner-only inventory, canonical packages, existing route anchors, source references and shared AI instructions');
