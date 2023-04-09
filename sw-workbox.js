importScripts('workbox-v4.3.0/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.0/'
});

// Turn on logging
workbox.setConfig({
  debug: true
});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "608369e73de06a1381753879324b8974"
  },
  {
    "url": "css/style.css",
    "revision": "6cc45e5d0dbb911c3512787aa220a20a"
  },
  {
    "url": "js/jquery-3.2.1.min.js",
    "revision": "c9f5aeeca3ad37bf2aa006139b935f0a"
  },
  {
    "url": "js/jquery.embedvkgallery.js",
    "revision": "333a97130b7552eb03e730d1305b07f1"
  },
  {
    "url": "js/jquery.slimbox2.js",
    "revision": "3ad181914071520493f29abe32592435"
  },
  {
    "url": "img/close.svg",
    "revision": "19e268f10b76d7613c2b8fade102a363"
  },
  {
    "url": "img/icons/icon-128x128.png",
    "revision": "02e3f7031e8d1ed07ae414dc5685bfc4"
  },
  {
    "url": "img/icons/icon-144x144.png",
    "revision": "76e540794d311e9c09d0416ba1521e2c"
  },
  {
    "url": "img/icons/icon-152x152.png",
    "revision": "154c6fd390363a2df64ba1e97379f2e4"
  },
  {
    "url": "img/icons/icon-192x192.png",
    "revision": "24acf5f5628d0ca466525dbcb543b8b7"
  },
  {
    "url": "img/icons/icon-284x284.png",
    "revision": "4f661fbe1c9d40fdb220a1afe5e53385"
  },
  {
    "url": "img/icons/icon-48x48.png",
    "revision": "fe0362dfdc2ea0afdc124231f36c43f1"
  },
  {
    "url": "img/icons/icon-512x512.png",
    "revision": "10ad286df7044b21fae9065df540ccf1"
  },
  {
    "url": "img/icons/icon-72x72.png",
    "revision": "eba0dd8adbcb8c26f401274224d5c577"
  },
  {
    "url": "img/icons/icon-96x96.png",
    "revision": "55d9842a9f1b0fbb579d54da7e4cd914"
  }
]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
)

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
