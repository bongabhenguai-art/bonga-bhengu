import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../scripts/build-app-shell.mjs',import.meta.url),'utf8');
for(const name of ['Chatbliz OS','CHATBLIZ OS','app-main','app-workspace-nav','app-storefront-frame','app-frame-stage','app-modules-dialog','app-guide-dialog'])assert.ok(source.includes(name),'Missing retained shell contract: '+name);
for(const retained of ['digital-studio.html?embedded=1','/app-runtime.js','/os-navigation.js','/chatbliz-labels.js','/signout-with-chatgpt'])assert.ok(source.includes(retained),'Existing integration removed: '+retained);
assert.ok(source.includes('data-app-src="/digital-studio.html?embedded=1"'),'Studio must stay lazy-loaded');
assert.ok(!source.includes('<title>Bonga Bhengu OS</title>'),'Old document title returned');
console.log('Chatbliz shell source contracts passed.');
