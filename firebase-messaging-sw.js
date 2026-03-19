importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAFLm5-JqR0QgYgbE3-jCuUc7e1pyMwyRc",
    authDomain: "dagprogs-434a1.firebaseapp.com",
    projectId: "dagprogs-434a1",
    storageBucket: "dagprogs-434a1.firebasestorage.app",
    messagingSenderId: "168327388040",
    appId: "1:168327388040:web:476feca4a7e1650203f83d"
});

const messaging = firebase.messaging();

// Фоновая обработка (setBackgroundMessageHandler - стандарт для v8)
messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico'
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});
