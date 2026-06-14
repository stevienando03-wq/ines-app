var C='masemaine-v1';
var ASSETS=['./','index.html','semaine-ines.ics','manifest.json','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(ASSETS)}).then(function(){return self.skipWaiting()}).catch(function(){}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==C)return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return; // laisse passer météo & co
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(resp){var cp=resp.clone();caches.open(C).then(function(c){try{c.put(e.request,cp)}catch(x){}});return resp;}).catch(function(){return caches.match('index.html')})}));
});
