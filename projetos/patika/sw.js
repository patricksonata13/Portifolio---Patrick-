// Service Worker do Patika

const CACHE_NAME = 'patika-v1';
const ASSETS_TO_CACHE = [
  '/patika/',
  '/patika/index.html',
  '/patika/editor.html',
  '/patika/css/mobile.css',
  '/patika/js/editor.js',
  '/patika/js/db.js',
  '/patika/js/touch.js',
  '/patika/templates/cinema-longa.md',
  '/patika/templates/cinema-curta.md',
  '/patika/templates/teatro.md',
  '/assets/css/style.css',
  '/assets/js/main.js'
];

// Instalação
self.addEventListener('install', event => {
  console.log('🔧 Service Worker instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cacheando recursos');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('✅ Service Worker instalado');
        return self.skipWaiting();
      })
  );
});

// Ativação
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker ativando...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑️  Removendo cache antigo: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker ativado');
      return self.clients.claim();
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  // Ignorar requisições não-GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar requisições do Chrome extension
  if (event.request.url.includes('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retornar resposta do cache
        if (response) {
          return response;
        }
        
        // Clonar a requisição
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Checar se recebemos uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar a resposta
            const responseToCache = response.clone();
            
            // Adicionar ao cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.log('❌ Fetch falhou:', error);
            
            // Fallback para página offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/patika/offline.html');
            }
          });
      })
  );
});

// Mensagens
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Sincronização em background
self.addEventListener('sync', event => {
  if (event.tag === 'sync-projects') {
    console.log('🔄 Sincronizando projetos...');
    event.waitUntil(syncProjects());
  }
});

async function syncProjects() {
  // Implementar sincronização com backend
  console.log('📡 Sincronização iniciada');
  return Promise.resolve();
}
