// static/products/scripts.js

// Функция для загрузки и отображения списка продуктов
function loadProducts() {
    fetch('/api/products/')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#products-table tbody');
            tbody.innerHTML = ''; // Очищаем текущие строки

            data.forEach(product => {
                const tr = document.createElement('tr');

                // Создаем ячейки таблицы для каждого поля продукта
                const tdId = document.createElement('td');
                tdId.textContent = product.id;
                tdId.setAttribute('data-label', 'ID');
                tr.appendChild(tdId);

                const tdName = document.createElement('td');
                tdName.textContent = product.name;
                tdName.setAttribute('data-label', 'Название');
                tr.appendChild(tdName);

                const tdDescription = document.createElement('td');
                tdDescription.textContent = product.description;
                tdDescription.setAttribute('data-label', 'Описание');
                tr.appendChild(tdDescription);

                const tdPrice = document.createElement('td');
                tdPrice.textContent = product.price;
                tdPrice.setAttribute('data-label', 'Цена');
                tr.appendChild(tdPrice);

                tbody.appendChild(tr); // Добавляем строку в таблицу
            });
        })
        .catch(error => console.error('Ошибка при загрузке продуктов:', error));
}

// Функция для обработки отправки формы
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем элементы формы
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const errorMessageDiv = document.getElementById('error-message');

    // Получаем значения из полей формы
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = parseFloat(priceInput.value);

    // Создаем объект с данными продукта
    const productData = {
        name: name,
        description: description,
        price: price
    };

    // Отправляем POST-запрос на создание нового продукта
    fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })
    .then(response => {
        if (!response.ok) {
            // Если ответ не успешен, выбрасываем ошибку
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        // Очистить форму после успешного добавления
        document.getElementById('product-form').reset();
        errorMessageDiv.textContent = ''; // Очистить сообщение об ошибке
        // Обновить список продуктов
        loadProducts();
    })
    .catch(error => {
        // Обработать ошибки (например, показать пользователю)
        if (error.name) {
            errorMessageDiv.textContent = error.name;
        } else if (error.price) {
            errorMessageDiv.textContent = error.price;
        } else {
            errorMessageDiv.textContent = 'Произошла ошибка при добавлении продукта.';
        }
        console.error('Ошибка при добавлении продукта:', error);
    });
});

// Загрузить продукты при загрузке страницы
window.onload = loadProducts;
