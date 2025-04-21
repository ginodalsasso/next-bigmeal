const CACHE_VERSION = "v1";
const CACHE_NAME = `bigmeal-cache-${CACHE_VERSION}`;

// Fichiers à mettre en cache
const ASSETS_TO_CACHE = [
    "/",
    "/offline",
    "/favicon192x192.png",
    "/favicon512x512.png",
];

// Installation - mise en cache des ressources
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing new service worker...");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching app shell");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );

    // Force l'activation immédiate du SW
    self.skipWaiting();
});

// Activation - nettoyage des vieux caches
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating new service worker...");

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter(
                        (cacheName) =>
                            cacheName.startsWith("bigmeal-cache-") &&
                            cacheName !== CACHE_NAME
                    )
                    .map((cacheName) => {
                        console.log(
                            "[Service Worker] Deleting old cache:",
                            cacheName
                        );
                        return caches.delete(cacheName);
                    })
            );
        })
    );

    // Permet au SW de contrôler immédiatement les pages
    return self.clients.claim();
});

// Gestion des requêtes - stratégie "network first" avec fallback sur le cache
self.addEventListener("fetch", (event) => {
    // On ne gère que les requêtes GET
    if (event.request.method !== "GET") return;

    // On exclut les requêtes d'API pour éviter de mettre en cache des données dynamiques
    if (event.request.url.includes("/api/")) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // On met en cache la réponse fraîche
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // En cas d'échec du réseau, on utilise le cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // Si le contenu n'est pas en cache, on renvoie la page offline
                    if (
                        event.request.headers
                            .get("accept")
                            ?.includes("text/html")
                    ) {
                        return caches.match("/offline");
                    }

                    return new Response("Network error", {
                        status: 408,
                        headers: { "Content-Type": "text/plain" },
                    });
                });
            })
    );
});
