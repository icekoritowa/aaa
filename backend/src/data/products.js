const { nanoid } = require("nanoid");

const createProduct = (product) => ({
  id: nanoid(8),
  ...product,
});

const initialProducts = () => [
  createProduct({
    name: "Экскаватор-погрузчик Titan BX90",
    category: "Строительная техника",
    description: "Универсальная машина для земляных работ, планировки участка и погрузки сыпучих материалов.",
    price: 6850000,
    stock: 3,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Мини-погрузчик RockLift S450",
    category: "Погрузчики",
    description: "Компактный погрузчик для складов, стройплощадок и благоустройства территорий.",
    price: 4120000,
    stock: 4,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Бетономешалка MasterMix 180",
    category: "Бетонное оборудование",
    description: "Надёжная бетономешалка для частного и профессионального строительства.",
    price: 28990,
    stock: 15,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Перфоратор ProDrill X28",
    category: "Электроинструменты",
    description: "Мощный перфоратор с тремя режимами работы для бурения, сверления и долбления.",
    price: 18990,
    stock: 26,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Шуруповерт BuildForce 18V",
    category: "Электроинструменты",
    description: "Аккумуляторный шуруповерт с двумя батареями для монтажа и сборочных работ.",
    price: 9990,
    stock: 31,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1581147036324-c1c7d8a81a89?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Угловая шлифмашина SteelCut 125",
    category: "Электроинструменты",
    description: "Болгарка для резки металла, бетона и камня с защитой от перегрева.",
    price: 7490,
    stock: 22,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1619160976998-92d0c0f9b939?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Виброплита Compact VP60",
    category: "Дорожное оборудование",
    description: "Оборудование для уплотнения грунта, песка и тротуарной плитки.",
    price: 67990,
    stock: 8,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Компрессор AirPower 100L",
    category: "Компрессоры",
    description: "Поршневой компрессор для пневмоинструмента, покраски и обслуживания техники.",
    price: 35990,
    stock: 12,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Сварочный аппарат WeldPro 220",
    category: "Сварочное оборудование",
    description: "Инверторный аппарат для ручной дуговой сварки с защитой от перепадов напряжения.",
    price: 21490,
    stock: 17,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80",
  }),
  createProduct({
    name: "Лазерный нивелир LevelMax 360",
    category: "Измерительные приборы",
    description: "Точный нивелир с круговой проекцией для отделочных и монтажных работ.",
    price: 15990,
    stock: 19,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
  }),
];

module.exports = {
  initialProducts,
};
