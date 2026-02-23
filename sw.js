// public/sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

let intervalId = null;

self.addEventListener('message', (event) => {
  if (event.data === 'start-push') {
    if (intervalId) return; // Чтобы не запускать несколько раз
    
    intervalId = setInterval(() => {
      self.registration.showNotification('PWA Уведомление', {
        body: 'Привет!',
        icon: '/vite.svg',
        tag: 'repeat-msg',
        renotify: true
      });
    }, 10000);
  }
  
  if (event.data === 'stop-push') {
    clearInterval(intervalId);
    intervalId = null;
  }
});
