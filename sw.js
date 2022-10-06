function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }
                })
        });
}


self.addEventListener('install', event => {


    const cacheProm = caches.open('estatico-v4')
        .then(cache => {
            return cache.addAll(
                [
                    '/',
                    '/css/style.css',
                    '/pages/offline.html',
                    '/img/main.jpg',
                    '/img/main-patas-arriba.jpg',
                    '/js/app.js',
                    '/img/no-img.jpg'
                ]
            );
        });

    const cacheInmutable = caches.open('inmutable-v1')
        .then(cache => {
            return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        });

    event.waitUntil(Promise.all([cacheProm, cacheInmutable]));

});


self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key != 'estatico-v4' && key.includes('estatico')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
});


self.addEventListener('fetch', event => {

    // 2 - Cache with network fullback
    const respuesta = caches.match(event.request)
        .then(resp => {
            if (resp) return resp;

            // Si no existe el archivo entonces tengo que pedirlo de internet
            console.log('No existe', event.request.url);
            return fetch(event.request).then(newResp => {
                caches.open('dinamico-v1')
                    .then(cache => {
                        cache.put(event.request, newResp);
                        limpiarCache('dinamico-v1', 50)

                    });
                return newResp.clone();
            })
                .catch(err => caches.match('/pages/offline.html'));
        });

    event.respondWith(respuesta);


})

