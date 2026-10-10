import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const code = fs.readFileSync('dist/motion.js','utf8');
function fixture(saved = null, reduce = false, supported = true) {
  const windowEvents = {}, docEvents = {}, frames = new Map(), storage = new Map(), classes = new Set(), animations = [];
  if (saved !== null) storage.set('bonga-motion-enabled', saved);
  let nextFrame = 1, intersection, mutation;
  const media = {matches: reduce, addEventListener(_, fn) { this.change = fn; }};
  const button = {handlers: {}, setAttribute(k,v) { this[k] = v; }, addEventListener(k, fn) { this.handlers[k] = fn; }};
  const card = {isConnected: true, handlers: {}, classList: {add() {}}, style: {values: {}, setProperty(k,v) { this.values[k] = v; }, removeProperty(k) { delete this.values[k]; }}, addEventListener(k,fn) { this.handlers[k] = fn; }, getBoundingClientRect() { return {left: 0, top: 0, width: 100, height: 100}; }, closest() { return null; }};
  const stage = {...card, style: card.style, handlers: {}};
  if (supported) for (const node of [card, stage]) node.animate = () => { const value = {cancelled: false, cancel() { this.cancelled = true; }}; animations.push(value); return value; };
  const doc = {hidden: false, body: {}, documentElement: {classList: {toggle(name,on) { on ? classes.add(name) : classes.delete(name); }}}, querySelectorAll(selector) { return selector === '[data-motion-control]' ? [button] : selector.includes('.front-launch-grid') ? [card] : []; }, querySelector() { return stage; }, addEventListener(k, fn) { (docEvents[k] ||= []).push(fn); }};
  const win = {addEventListener(k, fn) { (windowEvents[k] ||= []).push(fn); }, dispatchEvent(event) { for (const fn of windowEvents[event.type] || []) fn(event); }};
  const globals = {window: win, document: doc, matchMedia: value => value.includes('reduced-motion') ? media : {matches: true}, localStorage: {getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v)}, CustomEvent: class {constructor(type, values) { this.type = type; Object.assign(this,values); }}, requestAnimationFrame(fn) { const id = nextFrame++; frames.set(id,fn); return id; }, cancelAnimationFrame(id) { frames.delete(id); }, IntersectionObserver: class {constructor(callback) { intersection = callback; } observe() {} unobserve() {}}, MutationObserver: class {constructor(callback) { mutation = callback; } observe() {}}};
  win.IntersectionObserver = globals.IntersectionObserver; win.MutationObserver = globals.MutationObserver;
  vm.runInNewContext(code, globals);
  return {card, stage, button, media, animations, storage, classes, frames, win, doc, intersect: () => intersection([{target: card, isIntersecting: true}]), flush() { for (const [id, fn] of [...frames]) { frames.delete(id); fn(); } }, visibility(hidden) { doc.hidden = hidden; for (const fn of docEvents.visibilitychange) fn(); }, mutate: () => mutation([{addedNodes: [card], removedNodes: []}])};
}
let f = fixture();
f.intersect(); assert.equal(f.animations.length,1);
f.card.handlers.pointermove({pointerType:'mouse',clientX:90,clientY:80}); f.flush();
assert(f.card.style.values['--bb-tilt-x']);
f.button.handlers.click();
assert.equal(f.storage.get('bonga-motion-enabled'),'false');
assert(f.animations[0].cancelled); assert.equal(f.button['aria-pressed'],'false');
assert.equal(Object.keys(f.card.style.values).length,0);
f.win.dispatchEvent({type:'hashchange'}); f.flush(); assert.equal(f.animations.length,1,'Paused motion never runs after navigation');
f.button.handlers.click(); f.win.dispatchEvent({type:'hashchange'}); f.flush(); assert.equal(f.animations.length,2);
f.visibility(true); assert(f.animations[1].cancelled);
f.visibility(false); f.media.matches=true; f.media.change(); assert(f.button.disabled); assert(f.classes.has('bb-motion-off'));
f = fixture('false'); f.intersect(); assert.equal(f.animations.length,0); assert.equal(f.button['aria-pressed'],'false');
f = fixture(null,true); f.intersect(); assert.equal(f.animations.length,0); assert(f.button.disabled);
f = fixture(null,false,false); f.intersect(); f.win.dispatchEvent({type:'hashchange'}); f.flush(); assert.equal(f.animations.length,0,'Unsupported animation API leaves content readable');
f.card.handlers.pointermove({pointerType:'touch',clientX:90,clientY:80}); assert.equal(f.frames.size,0,'Touch interaction does not schedule tilt');
for (const file of ['index.html','app.html','platform.html']) {
  const html=fs.readFileSync('dist/'+file,'utf8');
  assert(html.includes('/motion.js?release=20261010')); assert(html.includes('data-motion-control'));
}
console.log('PASS motion preference persistence, reduced-motion enforcement, route animations, visibility cancellation, touch behavior and API fallback.');
