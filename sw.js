// sw.js - Basic caching service worker
const CACHE_NAME = 'oral-health-v1';
const ASSETS_TO_CACHE = [
  './',
  './OralHealthCare01.html',
  './manifest.json',
  'https://cdn.tailwindcss.com/3.4.17',
  'https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
];

// Install: Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => 
      cached || fetch(event.request).catch(() => caches.match('./OralHealthCare01.html'))
    )
  );
});
