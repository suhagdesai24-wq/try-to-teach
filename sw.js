const CACHE_NAME = 'try-to-tach-v1';
const urlsToCache = [
  '/try-to-teach/',
  '/try-to-teach/index.html',
  '/try-to-teach/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/try-to-teach/index.html'))
  );
});
