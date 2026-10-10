import {phoneModules} from './phone-modules.js';

const creative = new Set(['Camera','Voice notes','Digital studio','Fashion OS','Collection','Campaigns','Media library']);
const system = new Set(['Files & share','Connections','System health']);
export const laptopModules = phoneModules.map(module => ({
  ...module,
  name: module.name === 'Camera' ? 'Laptop camera' : module.name,
  detail: module.name === 'Camera' ? 'Live webcam in your digital studio' : module.name === 'Files & share' ? 'Drop, preview and download device files' : module.detail,
  href: module.name === 'Camera' ? '/digital-studio.html#studio-cameras' : module.name === 'Files & share' ? '/laptop.html#files' : module.href,
  group: module.name.startsWith('Owner ') ? 'owner' : creative.has(module.name) ? 'creative' : system.has(module.name) ? 'system' : 'business'
}));
laptopModules.splice(5, 0, {name:'Screen recorder', detail:'Record a window, tab or screen', href:'/laptop.html#recorder', icon:'studio', color:'blue', group:'system'});

export function findLaptopModules(query = '', group = 'all', pinned = []) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return laptopModules.filter(module => (group === 'all' || (group === 'pinned' ? pinned.includes(module.href) : module.group === group)) && words.every(word => `${module.name} ${module.detail}`.toLowerCase().includes(word)));
}

// Only module locations and interface preferences live in this device's storage.
export class LaptopPreferences {
  constructor(storage) { try { this.storage = storage === undefined ? globalThis.localStorage : storage; } catch { this.storage = null; } this.key = 'bonga-laptop-v1'; }
  read() {
    let data; try { data = JSON.parse(this.storage?.getItem(this.key) || '{}'); } catch { data = {}; }
    const known = new Set(laptopModules.map(module => module.href));
    const clean = (values, max) => [...new Set(Array.isArray(values) ? values : [])].filter(value => known.has(value)).slice(0, max);
    return {pinned:clean(data?.pinned, 25), recent:clean(data?.recent, 6), compact:data?.compact === true};
  }
  write(data) { try { this.storage?.setItem(this.key, JSON.stringify(data)); return Boolean(this.storage); } catch { return false; } }
  pin(href) {
    const data = this.read(); if (!laptopModules.some(module => module.href === href)) return false;
    data.pinned = data.pinned.includes(href) ? data.pinned.filter(value => value !== href) : [...data.pinned, href];
    return this.write(data);
  }
  visit(href) {
    if (!laptopModules.some(module => module.href === href)) return false;
    const data = this.read(); data.recent = [href, ...data.recent.filter(value => value !== href)].slice(0, 6); return this.write(data);
  }
  density(compact) { const data = this.read(); data.compact = Boolean(compact); return this.write(data); }
  reset() { try { this.storage?.removeItem(this.key); return Boolean(this.storage); } catch { return false; } }
}

export function desktopDevice(media = globalThis.matchMedia) {
  return Boolean(media?.('(min-width: 900px) and (pointer: fine)').matches);
}
