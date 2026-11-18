// Service worker: appka sa otvorí aj bez internetu (naposledy načítaná verzia).
var C = "nk-cache-v1";
var HOSTS = ["www.gstatic.com", "cdn.tailwindcss.com", "unpkg.com", "cdn.jsdelivr.net"];
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return clients.claim(); })
  );
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var u = new URL(e.request.url);
  var ok = u.origin === location.origin || HOSTS.indexOf(u.hostname) !== -1;
  if (!ok) return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      if (r && (r.ok || r.type === "opaque")) {
        var c = r.clone();
        caches.open(C).then(function (ch) { ch.put(e.request, c); });
      }
      return r;
    }).catch(function () { return caches.match(e.request); })
  );
});
