const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { initialProducts } = require("./data/products");

const app = express();
const port = Number(process.env.PORT) || 3000;

let products = initialProducts();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BuildTools Store API",
      version: "1.0.0",
      description: "REST API интернет-магазина строительной техники и инструментов.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/server.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         rating:
 *           type: number
 *         image:
 *           type: string
 *       example:
 *         id: "pr8G7d9K"
 *         name: "Перфоратор ProDrill X28"
 *         category: "Электроинструменты"
 *         description: "Мощный перфоратор для сверления и долбления."
 *         price: 18990
 *         stock: 26
 *         rating: 4.8
 *         image: "https://example.com/product.jpg"
 */

function toNumber(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateProductPayload(payload, { partial = false } = {}) {
  const errors = [];
  const name = normalizeText(payload.name);
  const category = normalizeText(payload.category);
  const description = normalizeText(payload.description);
  const image = normalizeText(payload.image);
  const price = payload.price === undefined ? null : toNumber(payload.price);
  const stock = payload.stock === undefined ? null : toNumber(payload.stock);
  const rating = payload.rating === undefined ? null : toNumber(payload.rating);

  if ((!partial || payload.name !== undefined) && !name) {
    errors.push("Поле name обязательно.");
  }
  if ((!partial || payload.category !== undefined) && !category) {
    errors.push("Поле category обязательно.");
  }
  if ((!partial || payload.description !== undefined) && !description) {
    errors.push("Поле description обязательно.");
  }
  if ((!partial || payload.price !== undefined) && (price === null || price < 0)) {
    errors.push("Поле price должно быть неотрицательным числом.");
  }
  if ((!partial || payload.stock !== undefined) && (stock === null || stock < 0 || !Number.isInteger(stock))) {
    errors.push("Поле stock должно быть целым неотрицательным числом.");
  }
  if (payload.rating !== undefined && (rating === null || rating < 0 || rating > 5)) {
    errors.push("Поле rating должно быть числом от 0 до 5.");
  }
  if (payload.image !== undefined && !image) {
    errors.push("Поле image не должно быть пустым.");
  }

  return {
    errors,
    product: {
      ...(payload.name !== undefined ? { name } : {}),
      ...(payload.category !== undefined ? { category } : {}),
      ...(payload.description !== undefined ? { description } : {}),
      ...(payload.price !== undefined ? { price } : {}),
      ...(payload.stock !== undefined ? { stock } : {}),
      ...(payload.rating !== undefined ? { rating } : {}),
      ...(payload.image !== undefined ? { image } : {}),
    },
  };
}

function findProductOr404(id, res) {
  const product = products.find((item) => item.id === id);
  if (!product) {
    res.status(404).json({ error: "Товар не найден." });
    return null;
  }
  return product;
}

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 */
app.get("/api/products", (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Найденный товар
 *       404:
 *         description: Товар не найден
 */
app.get("/api/products/:id", (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) {
    return;
  }
  res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Товар создан
 *       400:
 *         description: Ошибка валидации
 */
app.post("/api/products", (req, res) => {
  const { errors, product } = validateProductPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const newProduct = {
    id: nanoid(8),
    rating: product.rating ?? 4.5,
    image:
      product.image ??
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
    ...product,
  };

  products.unshift(newProduct);
  return res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновить данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Товар обновлён
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Товар не найден
 */
app.patch("/api/products/:id", (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) {
    return;
  }
  if (Object.keys(req.body || {}).length === 0) {
    return res.status(400).json({ error: "Нечего обновлять." });
  }

  const { errors, product: partialProduct } = validateProductPayload(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  Object.assign(product, partialProduct);
  return res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Товар удалён
 *       404:
 *         description: Товар не найден
 */
app.delete("/api/products/:id", (req, res) => {
  const exists = products.some((item) => item.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: "Товар не найден." });
  }

  products = products.filter((item) => item.id !== req.params.id);
  return res.status(204).send();
});

app.get("/", (req, res) => {
  res.json({
    message: "BuildTools Store API работает",
    docs: `http://localhost:${port}/api-docs`,
    products: `http://localhost:${port}/api/products`,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден." });
});

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Внутренняя ошибка сервера." });
});

app.listen(port, () => {
  console.log(`Backend started on http://localhost:${port}`);
});
