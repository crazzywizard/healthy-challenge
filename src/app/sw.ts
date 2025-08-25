/// <reference lib="webworker" />

const CACHE_NAME = '75hard-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

self.addEventListener('install', (event: Event) => {
  const installEvent = event as ExtendableEvent;
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('activate', (event: Event) => {
  const activateEvent = event as ExtendableEvent;
  activateEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
