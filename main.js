import { Workbox } from './workbox-v4.3.0/workbox-window.prod.mjs';

if (!localStorage.getItem('appInstalled') && !window.matchMedia('(display-mode: standalone)').matches) {
    alert('Для лучшего опыта использования, установите приложение на вашем устройстве. Нажмите кнопку "1-Поделиться" и выберете "2-Добавить на главный экран" и "3-Добавить".<img src="Screen.png" alt="Add to Home Screen">');
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
