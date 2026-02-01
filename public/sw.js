const CACHE_NAME = 'gx-v1';
const IMAGE_CACHE_NAME = 'gx-images-v1';

const PRECACHE_URLS = [
    '/',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        return caches.delete(cacheName);
                    })
                );
            })
        ])
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle GET requests
    if (request.method !== 'GET') return;

    // Cache strategy for images
    if (request.destination === 'image' || request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/)) {
        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then((cache) => {
                return cache.match(request).then((response) => {
                    return response || fetch(request).then((networkResponse) => {
                        if (networkResponse.status === 200) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // Offline fallback for images could be added here
                    });
                });
            })
        );
        return;
    }

    // Stale-while-revalidate for other assets
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                if (networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {
                return cachedResponse; // Return cached if fetch fails
            });
            return cachedResponse || fetchPromise;
        })
    );
});
