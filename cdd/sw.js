const CACHE_NAME = 'cdd3001-v3';
const urlsToCache = [
    '/cdd/',
    '/cdd/index.html',
    '/cdd/assets/css/global.css',
    '/cdd/assets/js/rpg-system.js',
    '/cdd/assets/js/clima.js',
    '/cdd/assets/audio/radio-vigia.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
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
