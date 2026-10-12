// Chatbliz OS: shared, provider-neutral action catalog and routing contract.
// This module is additive; callers must enforce identity and authorization server-side.
export const SERVICES = Object.freeze({
  brand: {label:'My Brand', actions:['brand.audit','brand.create','brand.assets']},
  website: {label:'My Website', actions:['website.create','website.edit','website.publish']},
  content: {label:'My Content', actions:['content.plan','content.studio','content.publish']},
  business: {label:'My Business', actions:['business.audit','business.leads','business.sales','business.orders']}
});
export const EMPLOYEES = Object.freeze({
  mentor:['business.audit','brand.audit'],
  coach:['business.audit','content.plan'],
  advisor:['business.audit','website.create'],
  assistant:['business.orders','content.plan'],
  negotiator:['business.sales'],
  hunting:['business.leads'],
  fishing:['content.plan','business.leads'],
  closer:['business.sales'],
  studio:['content.studio','content.publish']
});
export function resolveChatblizAction({service,action,role} = {}) {
  const selected = SERVICES[service];
  if (!selected) return {ok:false,code:'UNKNOWN_SERVICE'};
  if (!selected.actions.includes(action)) return {ok:false,code:'UNKNOWN_ACTION'};
  if (role && (!EMPLOYEES[role] || !EMPLOYEES[role].includes(action)))
    return {ok:false,code:'ROLE_ACTION_MISMATCH'};
  return {ok:true,service,action,role:role||null,requiresAuthorization:true,requiresHandler:true};
}
export async function dispatchChatblizAction(request,{authorize,handlers}={}) {
  const resolved=resolveChatblizAction(request);
  if(!resolved.ok)return resolved;
  if(typeof authorize!=='function'||!(await authorize(request)))
    return {ok:false,code:'UNAUTHORIZED'};
  const handler=handlers?.[resolved.action];
  if(typeof handler!=='function')return {ok:false,code:'NOT_IMPLEMENTED'};
  return {ok:true,result:await handler(request)};
}
