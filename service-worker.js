const CACHE_NAME = "izu-adventure-v5";
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

// ★ インストール：キャッシュして即 skipWaiting
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// ★ 有効化：古いキャッシュ削除＋即 clients.claim()
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ★ fetch：ネット優先（最強）
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(fetchRes => {
        // 新しいファイルをキャッシュに保存
        const clone = fetchRes.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return fetchRes;
      })
      .catch(() => {
        // オフライン時はキャッシュから取得
        return caches.match(event.request);
      })
  );
});
