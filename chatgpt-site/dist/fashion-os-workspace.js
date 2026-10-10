const workKey = 'zuxuru-designer-work-v1';
const serviceAreas = {website: 'visibility', visibility: 'visibility', studio: 'marketing', banner: 'marketing', automation: 'marketing', collection: 'products', rental: 'opportunities'};
const serviceNames = {website: 'Website Builder', visibility: 'Digital Visibility', studio: 'Creative Studio', banner: 'Digital Banner', automation: 'Content Automation', collection: 'Fashion collection', rental: 'Digital space rental'};

function fail(message, code = 'unavailable') {
  const error = new Error(message);
  error.code = code;
  throw error;
}

async function result(response) {
  let data;
  try { data = await response.json(); } catch { fail('Workspace response unavailable. Your brief is still here.'); }
  if (!response.ok) fail(data?.error || 'Your brief could not be saved.', response.status === 401 ? 'signin' : response.status === 409 ? 'conflict' : 'unavailable');
  return data;
}

// Reuse the existing account-scoped workspace API and its revision guard.
// Never initialize an empty account here: the dashboard owns browser-record migration.
export async function saveFashionBrief(packet, request = globalThis.fetch) {
  if (!packet || typeof packet.id !== 'string' || !/^[a-f0-9-]{36}$/.test(packet.id) ||
      typeof packet.brand !== 'string' || !packet.brand.trim() || packet.brand.length > 120 ||
      !Object.hasOwn(serviceAreas, packet.service) || typeof packet.brief !== 'string' ||
      !packet.brief.trim() || packet.brief.length > 6000) fail('Prepare a valid brief before saving.', 'invalid');
  const account = await result(await request('/api/designer/workspace', {cache: 'no-store'}));
  if (!account?.payload) fail('Open your seller workspace to set up saved records, then return to save this brief.', 'setup');
  if (!Number.isSafeInteger(account.revision) || account.revision < 1 || typeof account.payload !== 'object' || Array.isArray(account.payload)) fail('Workspace records could not be read safely. Your brief is still here.');
  const payload = account.payload;
  const work = payload[workKey] || {tasks: [], studio: []};
  if (!Array.isArray(work.tasks) || !Array.isArray(work.studio)) fail('Your work queue needs attention in the seller workspace. No records were changed.');
  const id = 'fashion-brief-' + packet.id;
  const existing = work.tasks.find(task => task.id === id);
  if (existing) {
    if (existing.sourceFashionBriefId !== packet.id || existing.deliverable !== packet.brief || existing.sourceFashionBriefService !== packet.service) fail('This brief changed after saving. Prepare a new brief to save another version.', 'conflict');
    return {saved: true, alreadySaved: true, url: '/fashion-service.html#my-work'};
  }
  if (work.tasks.length >= 500) fail('Your work queue is full. Export your work and remove an old task before saving this brief.', 'full');
  work.tasks.push({id, title: ('Fashion OS · ' + serviceNames[packet.service] + ' · ' + packet.brand.trim()).slice(0, 200),
    area: serviceAreas[packet.service], deliverable: packet.brief, status: 'Proposed', done: false, due: '',
    sourceFashionBriefId: packet.id, sourceFashionBriefService: packet.service, createdAt: new Date().toISOString()});
  payload[workKey] = work;
  const body = JSON.stringify({revision: account.revision, payload});
  if (body.length > 2000000) fail('Workspace storage is full. Export and review your records before adding this brief.', 'full');
  const receipt = await result(await request('/api/designer/workspace', {method: 'PUT', headers: {'content-type': 'application/json'}, body}));
  if (receipt?.revision !== account.revision + 1) fail('Save confirmation unavailable. Retry saving to check for your existing task.');
  return {saved: true, alreadySaved: false, url: '/fashion-service.html#my-work'};
}
