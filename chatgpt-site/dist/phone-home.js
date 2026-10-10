import {phoneIcon, renderModules} from './phone-modules.js';
if(new URLSearchParams(location.search).get('embedded')!=='1')location.replace('/');
const grid=document.getElementById('phone-modules');
function filter(query=''){const count=renderModules(grid,query);document.getElementById('phone-module-count').textContent=`${count} modules`;}
document.getElementById('phone-search').addEventListener('input',event=>filter(event.target.value));filter();
document.getElementById('phone-engine-icon').innerHTML=phoneIcon('engine');
function clock(){const now=new Date();document.getElementById('phone-clock').textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});document.getElementById('phone-date').textContent=now.toLocaleDateString([], {weekday:'short',month:'short',day:'numeric'});}
function network(){document.getElementById('phone-network').textContent=navigator.onLine?'Device online':'Device offline · reconnect to use your workspace';}
clock();setInterval(clock,30000);network();window.addEventListener('online',network);window.addEventListener('offline',network);
