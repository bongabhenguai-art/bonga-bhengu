import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';import {sourceMerge} from '../worker/project-merge.mjs';
assert.equal(sourceMerge.libraryArtifacts,80);assert.equal(sourceMerge.additionalOsArtifacts,2);assert.equal(sourceMerge.githubSources,138);assert.equal(sourceMerge.files.length,220);
for(const f of sourceMerge.files){assert.ok(fs.existsSync(f.path),f.path);assert.equal(createHash('sha256').update(fs.readFileSync(f.path)).digest('hex'),f.sha256,f.path);if(f.origin==='library')assert.equal(f.originalHashMatched,true,f.name);}
for(const file of ['docs/education-partner-os-school-app.md','creative-studio/command_engine.py','creative-studio/test_command_engine.py'])assert.ok(fs.existsSync('project-sources/github/'+file));
assert.equal(sourceMerge.builderRepositories.filter(r=>r.state==='installed').length,1);assert.equal(sourceMerge.builderRepositories[0].id,'grapesjs');
const html=fs.readFileSync('dist/website-editor.html','utf8');assert.match(html,/<iframe[^>]+sandbox=""/);assert.match(fs.readFileSync('dist/website-editor.js','utf8'),/allowScripts:false/);assert.match(fs.readFileSync('dist/website-editor.js','utf8'),/default-src 'none'/);
console.log('PASS 220 preserved source hashes, original three-file inclusion, accurate dependency status and sandboxed editor preview');
