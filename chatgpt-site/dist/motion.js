(() => {
  'use strict';
  if (window.bongaMotion) return;
  const root = document.documentElement, reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const key = 'bonga-motion-enabled', surfaces = new WeakSet(), surfaceStates = new Map(), revealed = new WeakSet(), active = new Set();
  const buttons = [...document.querySelectorAll('[data-motion-control]')];
  let preference = true, observer, visible = !document.hidden, pendingScan = 0, routeFrame = 0;
  try { preference = localStorage.getItem(key) !== 'false'; } catch {}
  const enabled = () => preference && !reduced.matches && visible;
  function animate(node, frames, options) {
    if (!enabled() || !node?.animate || node.closest('[hidden]')) return null;
    const animation = node.animate(frames, options);
    active.add(animation);
    animation.finished?.then(() => active.delete(animation), () => active.delete(animation));
    return animation;
  }
  function stop() { for (const animation of active) animation.cancel(); active.clear(); }
  function state() {
    root.classList.toggle('bb-motion-off', !preference || reduced.matches);
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(preference && !reduced.matches));
      button.textContent = reduced.matches ? 'Reduced motion' : preference ? 'Motion on' : 'Motion off';
      button.disabled = reduced.matches;
      button.title = reduced.matches ? 'Motion follows your device accessibility setting.' : 'Turn interface animation on or off.';
    }
    if (!enabled()) stop();
    for (const reset of surfaceStates.values()) reset();
    window.dispatchEvent(new CustomEvent('bonga-motion-change', {detail: {enabled: preference && !reduced.matches}}));
  }
  for (const button of buttons) button.addEventListener('click', () => {
    preference = !preference;
    try { localStorage.setItem(key, String(preference)); } catch {}
    state();
  });
  function observe(node) {
    if (revealed.has(node)) return;
    revealed.add(node);
    observer?.observe(node);
  }
  if ('IntersectionObserver' in window) observer = new IntersectionObserver(entries => {
    let index = 0;
    for (const entry of entries) if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      animate(entry.target, [{opacity: .4, transform: 'translateY(16px)'}, {opacity: 1, transform: 'none'}], {duration: 440, delay: Math.min(index++ * 45, 135), easing: 'cubic-bezier(.2,.7,.25,1)'});
    }
  }, {threshold: .06});
  const cardSelector = '.front-launch-grid>a,.bbapp-workspace-card,.package-grid>article,.studio-offers>article,a.card';
  function surface(node) {
    if (surfaces.has(node)) return;
    surfaces.add(node); node.classList.add('bb-motion-surface'); observe(node);
    let frame = 0, point;
    const reset = () => { cancelAnimationFrame(frame); frame = 0; node.style.removeProperty('--bb-tilt-x'); node.style.removeProperty('--bb-tilt-y'); };
    node.addEventListener('pointermove', event => {
      if (!enabled() || !fine.matches || event.pointerType === 'touch') return;
      point = {x: event.clientX, y: event.clientY};
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!enabled() || !node.isConnected) { reset(); return; }
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const clamp = value => Math.max(-1, Math.min(1, value));
        node.style.setProperty('--bb-tilt-x', `${-clamp((point.y - rect.top) / rect.height * 2 - 1) * 2}deg`);
        node.style.setProperty('--bb-tilt-y', `${clamp((point.x - rect.left) / rect.width * 2 - 1) * 2}deg`);
      });
    }, {passive: true});
    node.addEventListener('pointerleave', reset);
    node.addEventListener('blur', reset, true);
    surfaceStates.set(node, reset);
  }
  function scan() {
    pendingScan = 0;
    for (const [node, reset] of surfaceStates) if (!node.isConnected) { reset(); observer?.unobserve(node); surfaceStates.delete(node); }
    document.querySelectorAll(cardSelector).forEach(surface);
    document.querySelectorAll('.section-heading,.collection-heading,.studio-intro,.front-app-heading').forEach(observe);
  }
  function route() {
    cancelAnimationFrame(routeFrame);
    routeFrame = requestAnimationFrame(() => {
      routeFrame = 0;
      stop();
      const stage = document.querySelector('.bbapp-main>:not([hidden])');
      animate(stage, [{opacity: .6, transform: 'translateY(7px)'}, {opacity: 1, transform: 'none'}], {duration: 220, easing: 'ease-out'});
      scan();
    });
  }
  const mutation = 'MutationObserver' in window ? new MutationObserver(records => {
    if (!records.some(record => record.addedNodes.length || record.removedNodes.length) || pendingScan) return;
    pendingScan = requestAnimationFrame(scan);
  }) : null;
  mutation?.observe(document.body, {childList: true, subtree: true});
  window.addEventListener('hashchange', route);
  reduced.addEventListener?.('change', state);
  window.addEventListener('storage', event => { if (event.key === key) { preference = event.newValue !== 'false'; state(); } });
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (!visible) { stop(); for (const reset of surfaceStates.values()) reset(); } });
  window.addEventListener('pagehide', () => { stop(); cancelAnimationFrame(pendingScan); cancelAnimationFrame(routeFrame); });
  // A decorative orbit uses finite animations; nothing runs continuously in the background.
  document.querySelectorAll('.bb-tech-orbit>span').forEach((node, index) => {
    animate(node, [{opacity: .3, transform: `rotate(${index * 22 - 35}deg) scale(.92)`}, {opacity: 1, transform: `rotate(${index * 22 - 20}deg) scale(1)`}], {duration: 1500 + index * 160, easing: 'ease-out'});
  });
  state(); scan();
  window.bongaMotion = Object.freeze({enabled: () => preference && !reduced.matches});
})();
