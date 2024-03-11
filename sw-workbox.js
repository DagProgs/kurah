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
    "revision": "ef02a78d2f1b649238bfe03845a24977"
  },
  {
    "url": "main.js",
    "revision": "80846bb3403b82a07c7f84658f186b23"
  },
  {
    "url": "polyfills.js",
    "revision": "56f34b0f4d3a42d45bfdb1782adaa173"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "css/style.css",
    "revision": "ada81313ccf4695a5d35b492cd867908"
  },
  {
    "url": "manifest.json",
    "revision": "4a911727a535e0b1d6e237735d321734"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "85b3af9d309bdaa2fc0968de94fd428e"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "f113c3acffb6651e7dafc137686cda43"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "4ea984296e9afb23357cd21dfa419275"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "812fc767f3cad8e1d604356a9de83979"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "9e04e7a29ef912e08bcde9140bd01650"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "9ab42780aa76805a57e67427d22cce9e"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "4b996b7a168549987d2121cd83769396"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "7542b6327f938c0f7b876d0489c77eb9"
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
