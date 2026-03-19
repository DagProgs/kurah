const admin = require("firebase-admin");

// 1. Путь к вашему секретному ключу из консоли Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 2. Список токенов (в реальности вы загрузите их из вашей БД: MongoDB, MySQL и т.д.)
const registrationTokens = [
  'e7HSgIIphM44TGed4P17pc:APA91bGw8URVo6ovg3rUoZVNlirzc0HgcWKuRmEx_fL5Obql-OXQ4ssMo_Zyy4tJ5oNqJotz77ETfK9VMX_UKXmply5Xf1i8mziNp4uuWuiDtrgac7vGUB0' // Вставьте сюда токен из консоли браузера
];

// 3. Формируем сообщение
const message = {
  notification: {
    title: 'Привет от сервера! 🚀',
    body: 'Это автоматическое уведомление для всех пользователей.'
  },
  // Можно добавить данные, которые не видит пользователь, но видит JS
  data: {
    score: '850',
    time: '2:45'
  },
  tokens: registrationTokens, // Массовая отправка (multicast)
};

// 4. Отправка
admin.messaging().sendEachForMulticast(message)
  .then((response) => {
    console.log(response.successCount + ' уведомлений успешно отправлено');
    
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log('Список неудачных токенов (их стоит удалить из БД):', failedTokens);
    }
  })
  .catch((error) => {
    console.log('Ошибка при отправке:', error);
  });
