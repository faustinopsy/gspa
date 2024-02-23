const CACHE_NAME = 'app-cache-v2';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/index.html',
    '/favicon.ico',
    '/assets/img/imagem1.png',
    '/assets/img/imagem2.png',
    '/assets/img/imagem3.png',
    '/assets/img/img0.jpg',
    '/assets/img/img1.jpg',
    '/assets/img/img2.jpg',
    '/assets/img/img3.jpg',
    '/assets/img/logo.png',
    '/assets/css/style.css',
    '/assets/css/w3.css',
    '/assets/js/App.js',
    '/assets/js/router.js',
    '/assets/js/PWAInstaller.js',
    '/assets/js/componentes/card.js',
    '/assets/js/componentes/formContato.js',
    '/assets/js/componentes/navbar.js',
    '/assets/js/componentes/slides.js',
    '/assets/js/componentes/slides/slideImages.js',
    '/assets/js/componentes/slides/slideControls.js',
    '/assets/js/api/FetchData.js',
    '/assets/json/postagens.json',
    '/assets/js/paginas/home.js',
    '/assets/js/paginas/sobre.js',
    '/assets/js/paginas/contato.js',
];
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; 
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(async cache => {
          try {
              await cache.addAll(STATIC_ASSETS);
              const jsonURL = './assets/json/postagens.json';
              const jsonResponse = await fetch(jsonURL);
              if (jsonResponse.ok) {
                await cache.put(jsonURL, jsonResponse);
            }
          } catch (error) {
              console.error("Erro durante o cache.addAll: ", error);
              throw error;
          }
      })
  );
});
  
self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
              return cachedResponse;
          }
          return fetch(event.request).then(networkResponse => {
              if (networkResponse.ok) {
                  return caches.open(CACHE_NAME).then(cache => {
                      cache.put(event.request, networkResponse.clone());
                      return networkResponse;
                  });
              }
              return caches.match('offline.html'); 
          }).catch(() => {
              return caches.match('offline.html'); 
          });
      }).catch(() => {
          return caches.match('offline.html'); 
      })
  );
}); 
 
  
  
  
  