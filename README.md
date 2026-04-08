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
