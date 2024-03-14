import { Workbox } from './workbox-v4.3.0/workbox-window.prod.mjs';

if (!localStorage.getItem('appInstalled')) {
    alert('Для лучшего опыта использования, установите приложение на вашем устройстве. Нажмите кнопку "Поделиться" и выберете "Добавить на главный экран".');
    localStorage.setItem('appInstalled', 'true');
}

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            if (confirm(`Мы только что обновили версию приложения! Чтобы получить обновления, нажмите на кнопку OK.`)) {
                window.location.reload();
            } else {
                alert(`Вы отказались от обновления приложения. Для получения новых возможностей перезагрузите страницу в будущем.`);
            }
        } else {
            alert(`Приложение готово к работе в автономном режиме`);
        }
    });

    wb.register();
}
