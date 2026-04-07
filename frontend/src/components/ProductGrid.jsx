import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ loading, products, onEdit, onDelete }) {
  return (
    <section className="catalog">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Ассортимент</p>
          <h2>Профессиональная техника и инструмент</h2>
        </div>
      </div>

      {loading ? (
        <div className="catalog__empty">Загрузка товаров...</div>
      ) : products.length === 0 ? (
        <div className="catalog__empty">По текущим фильтрам товары не найдены.</div>
      ) : (
        <div className="catalog__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
