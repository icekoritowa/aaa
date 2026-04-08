# BuildTools Store

Коротко: что сделано и где это находится.

## Запуск

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

- сайт: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000/api/products](http://localhost:3000/api/products)
- Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Что реализовано

- Каталог строительной техники и инструментов
- Не меньше 10 товаров
- Карточки с названием, категорией, описанием, ценой, остатком, рейтингом и фото
- Поиск по товарам
- Фильтр по категориям
- Добавление товара
- Редактирование товара
- Удаление товара
- REST API на Express
- Swagger-документация
- Postman-коллекции для локального и внешнего API

## Практики

### Практика 1

Что требовалось:
- сделать карточку товара
- использовать препроцессор стилей
- применить переменные, миксин и вложенные селекторы

Как реализовано:
- использован `Sass`
- стили находятся в `frontend/src/styles/index.scss`
- карточка товара находится в `frontend/src/components/ProductCard.jsx`
- в `index.scss` есть переменные цветов и размеров, миксин `button-surface` и вложенные блоки вроде `.hero`, `.catalog`, `.product-card`

Как это работает:
- браузер не читает `Sass` напрямую
- `Vite` компилирует `Sass` в обычный `CSS`
- в работе сайта это выглядит как обычные стили, но писать и поддерживать их удобнее

### Практика 2

Что требовалось:
- сделать CRUD API для товаров

Как реализовано:
- backend находится в `backend/src/server.js`
- стартовые товары лежат в `backend/src/data/products.js`
- реализованы маршруты `GET`, `GET by id`, `POST`, `PATCH`, `DELETE`

### Практика 3

Что требовалось:
- протестировать свой API
- сделать запросы к внешнему API

Как реализовано:
- локальная коллекция Postman: `postman/buildtools-store-local.postman_collection.json`
- внешняя коллекция Postman: `postman/external-api-research.postman_collection.json`

### Практика 4

Что требовалось:
- связать frontend и backend в один сайт интернет-магазина
- показать не меньше 10 товаров
- в карточке должны быть основные поля товара

Как реализовано:
- основная логика фронтенда находится в `frontend/src/App.jsx`
- запросы к API идут через `frontend/src/api/products.js`
- список товаров выводится через `frontend/src/components/ProductGrid.jsx`
- карточка товара отображается в `frontend/src/components/ProductCard.jsx`
- форма добавления и редактирования находится в `frontend/src/components/ProductForm.jsx`

### Практика 5

Что требовалось:
- подключить Swagger
- описать сущность и CRUD-операции

Как реализовано:
- Swagger подключён в `backend/src/server.js`
- документация доступна по `http://localhost:3000/api-docs`

### Практика 6

Что требовалось:
- собрать проект в рабочем виде
- оформить описание проекта

Как реализовано:
- проект запускается как единое приложение frontend + backend
- описание собрано в этом `README.md`

## Где что находится

- Backend API и маршруты CRUD: `backend/src/server.js`
- Стартовые товары: `backend/src/data/products.js`
- Главная логика фронтенда: `frontend/src/App.jsx`
- Запросы с фронта к API: `frontend/src/api/products.js`
- Верхний блок и фильтры: `frontend/src/components/Header.jsx`
- Каталог товаров: `frontend/src/components/ProductGrid.jsx`
- Карточка товара: `frontend/src/components/ProductCard.jsx`
- Форма добавления и редактирования: `frontend/src/components/ProductForm.jsx`
- Все стили на Sass: `frontend/src/styles/index.scss`
- Postman для локального API: `postman/buildtools-store-local.postman_collection.json`
- Postman для внешнего API: `postman/external-api-research.postman_collection.json`

## Маршруты API

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`
