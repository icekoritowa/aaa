import React from "react";

export default function Header({ metrics, filters, categories, onFilterChange }) {
  return (
    <header className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Industrial Equipment Marketplace</p>
        <h1 className="hero__title">BuildTools Store</h1>
        <p className="hero__description">
          Каталог строительной техники, профессионального электроинструмента и
          оборудования для подрядчиков, монтажных бригад и снабженческих отделов.
        </p>

        <div className="hero__pills">
          <span className="hero__pill">Техника и инструмент в наличии</span>
          <span className="hero__pill">Оперативное обновление каталога</span>
          <span className="hero__pill">Прозрачные остатки и цены</span>
        </div>

        <div className="hero__stats">
          <article className="hero__stat-card">
            <span className="hero__stat-label">SKU в каталоге</span>
            <strong>{metrics.totalItems}</strong>
          </article>
          <article className="hero__stat-card">
            <span className="hero__stat-label">Текущий остаток</span>
            <strong>{metrics.totalStock}</strong>
          </article>
          <article className="hero__stat-card">
            <span className="hero__stat-label">Позиции от 50 000 ₽</span>
            <strong>{metrics.premiumCount}</strong>
          </article>
        </div>
      </div>

      <div className="hero__panel">
        <div className="hero__panel-top">
          <span className="hero__panel-kicker">Каталог</span>
          <h2>Поиск и навигация</h2>
          <p>Отфильтруйте ассортимент по назначению и быстро перейдите к нужной категории.</p>
        </div>

        <label className="field">
          <span>Поиск по каталогу</span>
          <input
            type="search"
            placeholder="Например, перфоратор"
            value={filters.search}
            onChange={(event) =>
              onFilterChange((current) => ({ ...current, search: event.target.value }))
            }
          />
        </label>

        <label className="field">
          <span>Категория</span>
          <select
            value={filters.category}
            onChange={(event) =>
              onFilterChange((current) => ({ ...current, category: event.target.value }))
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "Все категории" : category}
              </option>
            ))}
          </select>
        </label>

        <a className="hero__docs-link" href="http://localhost:3000/api-docs" target="_blank" rel="noreferrer">
          API Docs
        </a>
      </div>
    </header>
  );
}
