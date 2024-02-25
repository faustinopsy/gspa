const CACHE_NAME = 'app-cache-v9';
const STATIC_ASSETS = [
    'gspa/manifest.json',
    'gspa/index.html',
    'gspa/favicon.ico',
    'gspa/robots.txt',
    'gspa/sitemap.xml',
    'gspa/assets/img/imagem1.webp',
    'gspa/assets/img/imagem2.webp',
    'gspa/assets/img/imagem3.webp',
    'gspa/assets/img/img0.webp',
    'gspa/assets/img/img1.webp',
    'gspa/assets/img/img2.webp',
    'gspa/assets/img/img3.webp',
    'gspa/assets/img/js1.webp',
    'gspa/assets/img/js2.webp',
    'gspa/assets/img/js3.webp',
    'gspa/assets/img/config.webp',
    'gspa/assets/img/logo.png',
    'gspa/assets/css/style.css',
    'gspa/assets/css/w3.css',
    'gspa/assets/js/App.js',
    'gspa/assets/js/router.js',
    'gspa/assets/js/PWAInstaller.js',
    'gspa/assets/js/componentes/card.js',
    'gspa/assets/js/componentes/formContato.js',
    'gspa/assets/js/componentes/navbar.js',
    'gspa/assets/js/componentes/slides.js',
    'gspa/assets/js/componentes/Modal.js',
    'gspa/assets/js/componentes/slides/slideImages.js',
    'gspa/assets/js/componentes/slides/slideControls.js',
    'gspa/assets/js/api/FetchData.js',
    'gspa/assets/json/postagens.json',
    'gspa/assets/js/paginas/home.js',
    'gspa/assets/js/paginas/sobre.js',
    'gspa/assets/js/paginas/contato.js',
    'gspa/assets/js/paginas/extra.js',
    'gspa/assets/i18n/en.json',
    'gspa/assets/i18n/es.json',
    'gspa/assets/i18n/pt.json',
    'gspa/assets/js/libs/I18nService.js',
    'gspa/assets/js/libs/LocalStorageService.js',
    'gspa/assets/js/paginas/Configuracoes.js',
    'gspa/assets/json/slides.json',
    'gspa/assets/js/componentes/floatingButton.js'
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
 
  
  
  
  