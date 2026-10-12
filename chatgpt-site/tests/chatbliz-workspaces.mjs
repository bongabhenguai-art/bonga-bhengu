import assert from 'node:assert/strict';
import {CHATBLIZ_WORKSPACES,CHATBLIZ_WORKFLOW,listChatblizWorkspaces} from '../src/chatbliz/workspaces.mjs';
import {CHATBLIZ_SERVICES} from '../src/chatbliz/catalog.mjs';
import {preparePartnerAction} from '../src/chatbliz/partners.mjs';
assert.equal(CHATBLIZ_WORKSPACES.length,8);
assert.equal(new Set(CHATBLIZ_WORKSPACES.map(w=>w.id)).size,8);
assert.ok(CHATBLIZ_WORKFLOW.includes('Measure'));
for(const workspace of CHATBLIZ_WORKSPACES){
 assert.ok(CHATBLIZ_SERVICES.some(service=>service.id===workspace.service),workspace.id);
 assert.ok(workspace.agents.length>0,workspace.id);
 if(workspace.state==='existing-workspace')assert.ok(workspace.href?.startsWith('/'),workspace.id);
 else assert.equal(workspace.state,'integration-required',workspace.id);
}
assert.equal(listChatblizWorkspaces('my-content').length,1);
assert.ok(preparePartnerAction('Help me negotiate a sale').partners.includes('negotiator'));
assert.equal(preparePartnerAction('Schedule a meeting').executed,false);
console.log('Chatbliz component contract tests passed');
