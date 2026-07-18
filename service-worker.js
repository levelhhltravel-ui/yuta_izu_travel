const CACHE_NAME = "izu-adventure-v4";
const URLS_TO_CACHE = [
  "./index.html",
  "./splash.html",
  "./home.html",
  "./reverse-bingo.html",
  "./missions.html",
  "./schedule.html",
  "./collection.html",
  "./roulette.html",
  "./settings.html",
  "./map.html",
  "./rules.html",

  "./home.css",
  "./home.js",
  "./reverse-bingo.css",
  "./reverse-bingo.js",
  "./missions.css",
  "./missions.js",
  "./schedule.css",
  "./schedule.js",
  "./collection.css",
  "./collection.js",
  "./roulette.css",
  "./roulette.js",
  "./settings.css",
  "./settings.js",
  "./splash.css",
  "./splash.js",
  "./map.css",
  "./map.js",
  "./rules.css",
  "./rules.js",

  "./compass.png",
  "./compass2.png",
  "./izu-map.png",
  "./images/logo-reverse-bingo.png",
  "./images/map.png",
  "./images/quest-log.png",
  "./images/reverse-bingo-logo.png",
  "./images/rule.png",
  "./images/schedule-logo.png",
  "./images/roulette-map-title.png",
  "./images/roulette.png",
  "./images/reset.png",

  "./icons/izu-icon-192.png",
  "./icons/izu-icon-512.png"
];


// インストール
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// 有効化（古いキャッシュ削除）
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// fetch（キャッシュ優先＋更新反映）
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});

