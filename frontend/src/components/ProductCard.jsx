import React from "react";

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card product-card--accent">
      <div className="product-card__media">
        <img src={product.image} alt={product.name} />
        <span className="product-card__badge">{product.category}</span>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span>Рейтинг {product.rating?.toFixed(1) ?? "4.5"}</span>
          <span>Склад: {product.stock}</span>
        </div>

        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <strong className="product-card__price">{formatPrice(product.price)}</strong>
          <div className="product-card__actions">
            <button type="button" className="button button--ghost" onClick={onEdit}>
              Изменить
            </button>
            <button type="button" className="button" onClick={onDelete}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
