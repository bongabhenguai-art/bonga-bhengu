(() => {
  'use strict';
  const button = document.getElementById('backend-health-check');
  const status = document.getElementById('backend-health-status');
  if (!button || !status) return;
  button.onclick = async () => {
    button.disabled = true;
    status.textContent = 'Checking live backend services…';
    try {
      const response = await fetch('/api/platform/backend-health', {cache: 'no-store', signal: AbortSignal.timeout(15000)});
      const data = await response.json();
      if (!data.checks) throw Error(data.error || 'Service check unavailable.');
      status.textContent = 'Database: ' + data.checks.database + ' · Saved files: ' + data.checks.media +
        ' · Backend schema: ' + data.checks.schema + ' · Update ' + data.version;
    } catch (error) {
      status.textContent = error.name === 'TimeoutError' ? 'Service check timed out. Retry shortly.' : error.message;
    } finally { button.disabled = false; }
  };
})();
