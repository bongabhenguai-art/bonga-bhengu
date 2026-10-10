import assert from 'node:assert/strict';
import {appModules,moduleFor,searchAppModules} from '../dist/app-routes.js';
import {appGuides,guideFor} from '../dist/app-guides.js';
assert.deepEqual(Object.keys(appGuides).sort(),appModules.map(m=>m.id).sort(),'Every real module has exactly one guide');
for(const module of appModules){const guide=guideFor(module.id);for(const key of ['input','output','needs'])assert.ok(guide[key]?.trim(),module.id+' '+key);assert.ok(guide.steps.length>=3,module.id+' usable steps');for(const id of guide.related)assert.ok(moduleFor(id),module.id+' related route '+id);}
assert.ok(searchAppModules('public static website').some(m=>m.id==='visual-website-editor'),'Input/output search finds the actual website publishing function');
assert.ok(searchAppModules('applicant').some(m=>m.id==='education'));assert.ok(searchAppModules('owner-only',false).every(m=>!m.owner));
assert.match(guideFor('social-campaigns').needs,/does not schedule/);assert.match(guideFor('fashion-jarvis').needs,/owner account/);assert.match(guideFor('digital-studio').needs,/authorized uplink/);
console.log('PASS complete module instructions, real related routes, searchable inputs/outputs and truthful service dependencies');
