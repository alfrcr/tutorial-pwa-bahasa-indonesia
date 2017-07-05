/*
 *  Kita akan ubah nama
 *  pada cacheVersion
 *  supaya browser tahu bahwa
 *  ada perubahan terbaru
 */
const cacheVersion = 'v2-pwa-dasar';

const filesToCache = [
  '/',
  '/css/materialize.min.css',
  '/css/styles.css',
  '/js/jquery.min.js',
  '/js/materialize.min.js',
  '/js/app.js',
  '/js/index.js',
  '/fonts/roboto/Roboto-Medium.woff',
  '/fonts/roboto/Roboto-Medium.woff2',
  '/fonts/roboto/Roboto-Regular.woff',
  '/fonts/roboto/Roboto-Regular.woff2',
  '/fonts/roboto/Roboto-Bold.woff',
  '/fonts/roboto/Roboto-Bold.woff2',
  '/fonts/material-icons/material-icons.woff',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion)
      .then(function(cache) {
        return cache.addAll(filesToCache)
      })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) return res;

        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName !== cacheVersion;
          })
          .map(function(cacheName) {
            caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
