// public/sw.js
self.addEventListener('install', () => {
  console.log('Service Worker установлен');
});

self.addEventListener('activate', () => {
  console.log('Service Worker активирован');
});

// Слушаем сообщения от основного приложения
self.addEventListener('message', (event) => {
  if (event.data === 'start-timer') {
    setInterval(() => {
      self.registration.showNotification('PWA Сообщение', {
        body: 'Привет',
        icon: '/vite.svg', // путь к иконке
      });
    }, 10000); // 10 секунд
  }
});
