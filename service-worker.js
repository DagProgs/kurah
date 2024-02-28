self.addEventListener('push', function(event) {
  const options = {
    body: 'Время для намаза!',
    icon: 'path/to/icon.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    }
  };

  event.waitUntil(
    self.registration.showNotification('Намаз', options)
  );
});

