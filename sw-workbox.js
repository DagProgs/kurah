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
    "revision": "150aa350a623b15dcc4f30dd112b6785"
  },
  {
    "url": "main.js",
    "revision": "408c5f091260ed36048e454b104e6b64"
  },
  {
    "url": "js/jquery-3.2.1.min.js",
    "revision": "473957cfb255a781b42cb2af51d54a3b"
  },
  {
    "url": "js/jquery.embedvkgallery.js",
    "revision": "2f481a9feb40fca67b24f377ace7b499"
  },
  {
    "url": "css/style.css",
    "revision": "dd0c5731c59413c78ac150fea271ea32"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "434a9872c7bb0f4bdf9f179bceaaeb6a"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "9d535667979599ee9d89c170411e2eea"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "761705e2a371d05c73e1cad74d7b3cbc"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "b48393baedd23ec7c76f6cfffea8936d"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "aee64f3847f7f4a51278367e2a0c55f5"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "d9e62390bdf27cf995b8e962216fd6d7"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "4e79cc467357c663e36a598f01f670e3"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "740d8205e6a612fb7784e50a5468b98c"
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

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
