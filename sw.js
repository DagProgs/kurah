// public/sw.js
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Слушаем команду на запуск цикла
self.addEventListener('message', (event) => {
  if (event.data === 'start-push-loop') {
    // Внимание: setInterval в SW на мобилках живет недолго.
    // Для реального фонового пуша нужен сервер. 
    // Но для открытого/свернутого PWA этот метод сработает:
    setInterval(() => {
      self.registration.showNotification('PWA Уведомление', {
        body: 'Привет!',
        icon: '/vite.svg',
        vibrate: [200, 100, 200],
        tag: 'vibrate-sample'
      });
    }, 10000);
  }
});
