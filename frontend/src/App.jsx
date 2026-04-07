import React, { useEffect, useMemo, useState } from "react";
import { productsApi } from "./api/products.js";
import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import ProductForm from "./components/ProductForm.jsx";

const emptyForm = {
  name: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  rating: "4.5",
  image: "",
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "all" });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
        setStatus({ type: "success", message: "Каталог успешно загружен." });
      } catch (error) {
        setStatus({
          type: "error",
          message: "Не удалось загрузить товары. Проверьте, что backend запущен на порту 3000.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      const categoryMatch =
        filters.category === "all" ? true : product.category === filters.category;

      return searchMatch && categoryMatch;
    });
  }, [filters, products]);

  const metrics = useMemo(() => {
    const totalItems = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const premiumCount = products.filter((product) => product.price >= 50000).length;

    return { totalItems, totalStock, premiumCount };
  }, [products]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const fillForm = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      rating: String(product.rating ?? 4.5),
      image: product.image ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      image: form.image,
    };

    try {
      if (editingId) {
        const updatedProduct = await productsApi.update(editingId, payload);
        setProducts((current) =>
          current.map((product) => (product.id === editingId ? updatedProduct : product)),
        );
        setStatus({ type: "success", message: "Товар успешно обновлён." });
      } else {
        const createdProduct = await productsApi.create(payload);
        setProducts((current) => [createdProduct, ...current]);
        setStatus({ type: "success", message: "Товар успешно добавлен." });
      }

      resetForm();
    } catch (error) {
      const message =
        error?.response?.data?.errors?.join(" ") ||
        error?.response?.data?.error ||
        "Операция не выполнена.";
      setStatus({ type: "error", message });
    }
  };

  const handleDelete = async (id) => {
    try {
      await productsApi.remove(id);
      setProducts((current) => current.filter((product) => product.id !== id));
      if (editingId === id) {
        resetForm();
      }
      setStatus({ type: "success", message: "Товар удалён." });
    } catch (error) {
      setStatus({ type: "error", message: "Не удалось удалить товар." });
    }
  };

  return (
    <div className="page-shell">
      <Header
        metrics={metrics}
        filters={filters}
        categories={categories}
        onFilterChange={setFilters}
      />

      <main className="layout">
        <ProductForm
          form={form}
          editingId={editingId}
          onChange={setForm}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          status={status}
        />

        <ProductGrid
          loading={loading}
          products={filteredProducts}
          onEdit={fillForm}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
