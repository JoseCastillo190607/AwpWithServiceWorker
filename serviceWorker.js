self.addEventListener('install', e =>{
    const cacheProm = caches.open('cache-v1')
        .then(cache => {
            return cache.addAll([
            '/',
            'index.html',
            'styles/styles.css',
            'images/Logo.jpeg',
            'images/changuito2.jpeg',
            'images/FlowCabron.png',
            'images/changuitoSikario.PNG',
            'js/app.js',
            'images/makakoZancos.mp4',
            'images/makakoKbronFluxo.mp4',
            'images/makakoGritando.mp4',
            // 'https://www.youtube.com/embed/vQE4eiRIv7c',
            // 'https://www.youtube.com/embed/uOFR_qacFf8',
            // 'https://www.youtube.com/embed/yV2QheODq8Q',
            'images/facebook.png',
            'images/twiter.png',
            'images/instagram.png',
        ])
          
    });
e.waitUntil(cacheProm);
});


self.addEventListener('fetch', e =>{
//cache with network fallback
const respuesta = caches.match( e.request )
    .then ( res => {
        if ( res ) return res;
        //no existe el archivo
        //tengo que ir a la web
        console.log('No existe', e.request.url);
        return fetch( e.request ).then ( newResp => {
            caches.open('cache-v1')
                .then( cache => {
                    cache.put( e.request, newResp);
                }

                )
            return newResp.clone;
        });
    });
    e.respondWith(respuesta);
//only cache
//e.respondWith( caches.match(e.request));
});
