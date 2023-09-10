document.addEventListener("DOMContentLoaded", function () {
    // Получаем ссылку на элемент, в котором будут отображаться изображения и описания
    const gallery = document.querySelector(".gallery");

    // Загружаем JSON-файл с помощью fetch
    fetch("js/json/images.json")
        .then(response => response.json())
        .then(imageData => {
            // Создаем элементы <img> и <p> для каждого изображения и его описания, и добавляем их в галерею
            imageData.forEach(image => {
                const description = document.createElement("p");
                description.textContent = image.description;
                gallery.appendChild(description);

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = image.alt;
                gallery.appendChild(img);
            });
        })
        .catch(error => {
            console.error("Ошибка загрузки JSON:", error);
        });
});
