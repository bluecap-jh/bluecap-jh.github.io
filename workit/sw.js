const CACHE='workit-showcase-v2';
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/workit-logo.svg','./assets/01-core.svg','./assets/02-owner-tasks.svg','./assets/03-owner-expand.svg','./assets/04-employee-core.svg','./assets/05-employee-tasks.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html'))))});
