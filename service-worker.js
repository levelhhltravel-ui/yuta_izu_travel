const ROOT = "/yuta_izu_travel";   // ★ GitHub Pages のルート
const CACHE_NAME = "izu-adventure-v5";

const URLS_TO_CACHE = [
  `${ROOT}/index.html`,
  `${ROOT}/splash.html`,
  `${ROOT}/home.html`,
  `${ROOT}/reverse-bingo.html`,
  `${ROOT}/missions.html`,
  `${ROOT}/schedule.html`,
  `${ROOT}/collection.html`,
  `${ROOT}/roulette.html`,
  `${ROOT}/settings.html`,
  `${ROOT}/map.html`,
  `${ROOT}/rules.html`,

  `${ROOT}/home.css`,
  `${ROOT}/home.js`,
  `${ROOT}/reverse-bingo.css`,
  `${ROOT}/reverse-bingo.js`,
  `${ROOT}/missions.css`,
  `${ROOT}/missions.js`,
  `${ROOT}/schedule.css`,
  `${ROOT}/schedule.js`,
  `${ROOT}/collection.css`,
  `${ROOT}/collection.js`,
  `${ROOT}/roulette.css`,
  `${ROOT}/roulette.js`,
  `${ROOT}/settings.css`,
  `${ROOT}/settings.js`,
  `${ROOT}/splash.css`,
  `${ROOT}/splash.js`,
  `${ROOT}/map.css`,
  `${ROOT}/map.js`,
  `${ROOT}/rules.css`,
  `${ROOT}/rules.js`,

  `${ROOT}/compass.png`,
  `${ROOT}/compass2.png`,
  `${ROOT}/izu-map.png`,
  `${ROOT}/images/logo-reverse-bingo.png`,
  `${ROOT}/images/map.png`,
  `${ROOT}/images/quest-log.png`,
  `${ROOT}/images/reverse-bingo-logo.png`,
  `${ROOT}/images/rule.png`,
  `${ROOT}/images/schedule-logo.png`,
  `${ROOT}/images/roulette-map-title.png`,
  `${ROOT}/images/roulette.png`,
  `${ROOT}/images/reset.png`,

  `${ROOT}/icons/izu-icon-192.png`,
  `${ROOT}/icons/izu-icon-512.png`
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
        const clone = fetchRes.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return fetchRes;
      })
      .catch(() => caches.match(event.request))
  );
});
