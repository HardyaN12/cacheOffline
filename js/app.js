

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

// if ( window.caches ) {

//     // caches.open('prueba-1');

//     caches.open('prueba-2');

//     // caches.has('prueba-2').then( console.log );

//     caches.delete('prueba-1').then( console.log );

//     caches.open('cache-v1.1').then( cache => {

//         // cache.add('/page2.html');

//         cache.addAll([
//             '/page2.html',
//             '/css/style.css',
//             '/img/main.jpg'
//         ]).then( () => {

//             // cache.delete('/css/style.css');

//             cache.put( 'page2.html', new Response('Hola Mundo') );

//         });


//         // cache.match('/page2.html')
//         //         .then( res => {

//         //             res.text().then( console.log );

//         //         });



//     });



//     caches.keys().then( keys => {
//         console.log(keys);
//     });


// };



