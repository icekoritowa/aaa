# BuildTools Store

BuildTools Store is a full-stack catalog platform for construction equipment,
power tools and industrial supplies. The application combines a React storefront
with an Express API for product management, filtering and inventory updates.

## Стек

- Frontend: `React`, `Vite`, `Sass`, `Axios`
- Backend: `Node.js`, `Express`, `CORS`, `nanoid`
- API docs: `swagger-jsdoc`, `swagger-ui-express`

## Возможности

- Каталог строительной техники и профессионального инструмента
- Поиск по названию и описанию
- Фильтрация по категории
- Добавление нового товара
- Редактирование товара
- Удаление товара
- Swagger UI для API
- Готовые Postman-коллекции для локального и внешнего API

## Структура проекта

```text
backend/
  src/
    data/products.js
    server.js
frontend/
  src/
    api/products.js
    components/
    styles/index.scss
postman/
README.md
```

## Запуск проекта

Установить зависимости:

```bash
npm install
```

Запустить backend:

```bash
npm run dev:backend
```

Запустить frontend:

```bash
npm run dev:frontend
```

После запуска:
- frontend: [http://localhost:5173](http://localhost:5173)
- backend API: [http://localhost:3000/api/products](http://localhost:3000/api/products)
- Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Архитектура

Backend реализует REST API для товаров:
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`

Сущность товара содержит:
- `id`
- `name`
- `category`
- `description`
- `price`
- `stock`
- `rating`
- `image`

Frontend включает:
- каталог товаров
- фильтрацию по категории
- строку поиска
- форму создания и редактирования
- отображение цены, наличия и рейтинга

## API и интеграции

В проект включены коллекции:
- `postman/buildtools-store-local.postman_collection.json`
- `postman/external-api-research.postman_collection.json`

Основные клиентские модули:
- `frontend/src/App.jsx`
- `frontend/src/api/products.js`
- `frontend/src/components/ProductGrid.jsx`
- `frontend/src/components/ProductCard.jsx`
- `frontend/src/components/ProductForm.jsx`

Swagger подключён на backend и доступен по адресу:
- [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Документированы:
- схема `Product`
- все CRUD-операции

## Примеры запросов

### Создание товара

```json
{
  "name": "Генератор PowerBase 6500",
  "category": "Энергетическое оборудование",
  "description": "Бензиновый генератор для стройплощадки и аварийного питания.",
  "price": 74990,
  "stock": 6,
  "rating": 4.7,
  "image": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80"
}
```
