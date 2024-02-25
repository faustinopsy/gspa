const CACHE_NAME = 'app-cache-v9';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/index.html',
    '/favicon.ico',
    '/assets/img/imagem1.webp',
    '/assets/img/imagem2.webp',
    '/assets/img/imagem3.webp',
    '/assets/img/img0.webp',
    '/assets/img/img1.webp',
    '/assets/img/img2.webp',
    '/assets/img/img3.webp',
    '/assets/img/js1.webp',
    '/assets/img/js2.webp',
    '/assets/img/js3.webp',
    '/assets/img/config.webp',
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
    '/assets/js/componentes/Modal.js',
    '/assets/js/componentes/slides/slideImages.js',
    '/assets/js/componentes/slides/slideControls.js',
    '/assets/js/api/FetchData.js',
    '/assets/json/postagens.json',
    '/assets/js/paginas/home.js',
    '/assets/js/paginas/sobre.js',
    '/assets/js/paginas/contato.js',
    '/assets/js/paginas/extra.js',
    '/assets/i18n/en.json',
    '/assets/i18n/es.json',
    '/assets/i18n/pt.json',
    '/assets/js/libs/I18nService.js',
    '/assets/js/libs/LocalStorageService.js',
    '/assets/js/paginas/Configuracoes.js',
    '/assets/json/slides.json',
    '/assets/js/componentes/floatingButton.js'
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
              const slidesURL = './assets/json/slides.json';
              const slidesResponse = await fetch(slidesURL);
              if (slidesResponse.ok) {
                await cache.put(slidesURL, slidesResponse);
              }
              const enURL = './assets/i18n/en.json';
              const enResponse = await fetch(enURL);
              if (enResponse.ok) {
                await cache.put(enURL, enResponse);
              }
              const esURL = './assets/i18n/es.json';
              const esResponse = await fetch(esURL);
              if (esResponse.ok) {
                await cache.put(esURL, esResponse);
              }
              const ptURL = './assets/i18n/pt.json';
              const ptResponse = await fetch(ptURL);
              if (ptResponse.ok) {
                await cache.put(ptURL, ptResponse);
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
 
  
  
  
  