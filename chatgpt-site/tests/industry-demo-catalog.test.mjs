import test from 'node:test';
import assert from 'node:assert/strict';
import {industryDemos,getIndustryDemo} from '../dist/industry-demo-catalog.js';

test('six distinct industry presets include both preview modes',()=>{
 assert.equal(industryDemos.length,6);
 assert.equal(new Set(industryDemos.map(x=>x.id)).size,6);
 for(const item of industryDemos){
  assert.deepEqual(item.previewModes,['website','mobile-app']);
  assert.ok(item.sections.length>=5);
  assert.ok(item.appModules.length>=4);
  assert.equal(item.status,'template-only');
  assert.ok(item.stack.source.includes('website-builder-library'));
 }
});
test('unknown industry fails and callers cannot mutate catalog',()=>{
 assert.throws(()=>getIndustryDemo('other'),RangeError);
 const demo=getIndustryDemo('school');
 demo.sections.push('Demo');
 assert.equal(getIndustryDemo('school').sections.includes('Demo'),false);
});
test('traditional practice demo includes compliance caveat',()=>{
 assert.match(getIndustryDemo('inyanga').stack.compliance,/no medical diagnosis/i);
});
