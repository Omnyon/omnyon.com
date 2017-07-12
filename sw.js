var version = 0.6
var CACHE_PREFIX = 'omnyon_'

self.addEventListener('install', function(e) {
  var timeStamp = Date.now()

  e.waitUntil(
    caches.open(CACHE_PREFIX + version).then(function(cache) {
      return cache
        .addAll([
          // pages
          //'/',
          '/careers',
          '/contact',
          '/events',
          '/expertise',

          // css

          '/css/style.css',

          // js

          '/js/expertise.js',
          '/js/index.js',
          '/js/html5shiv.min.js',

          // partner images
          '/images/partners/p1.jpg',
          '/images/partners/p2.png',
          '/images/partners/p3.png',
          '/images/partners/p4.png',
          '/images/partners/p5.png',
          '/images/partners/p6.png',
          '/images/partners/p8.png',
          '/images/partners/p10.png',
          '/images/partners/p12.png',
          '/images/partners/p13.png',
          '/images/partners/p14.png',
          '/images/partners/p15.png',
          '/images/partners/p16.png',
          '/images/partners/p17.png',
          '/images/partners/p18.png',
          '/images/partners/p20.png',

          // jumbo images

          '/images/omnyon_dinner.jpg',
          '/images/omnyon_dinner_hq.jpg',
          '/images/omnyon_5k.jpg',
          '/images/omnyon_5k_hq.jpg',

          // team images

          '/images/team/tim.jpg',
          '/images/team/taylor.jpg',
          '/images/team/marci.jpg'
        ])
        .then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_PREFIX + version) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request)
    })
  )
})
