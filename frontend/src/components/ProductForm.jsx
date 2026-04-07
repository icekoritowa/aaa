import React from "react";

const fields = [
  { name: "name", label: "Название", type: "text", placeholder: "Например, Компрессор AirPower 100L" },
  { name: "category", label: "Категория", type: "text", placeholder: "Например, Компрессоры" },
  { name: "description", label: "Описание", type: "textarea", placeholder: "Кратко опишите товар" },
  { name: "price", label: "Цена", type: "number", placeholder: "35990" },
  { name: "stock", label: "Количество на складе", type: "number", placeholder: "12" },
  { name: "rating", label: "Рейтинг", type: "number", placeholder: "4.5" },
  { name: "image", label: "Ссылка на изображение", type: "url", placeholder: "https://..." },
];

export default function ProductForm({
  form,
  editingId,
  onChange,
  onSubmit,
  onCancel,
  status,
}) {
  return (
    <aside className="editor">
      <div className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Панель каталога</p>
          <h2>{editingId ? "Редактирование карточки" : "Новая позиция"}</h2>
        </div>
      </div>

      <form className="editor__form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="field">
            <span>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                rows="4"
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(event) =>
                  onChange((current) => ({ ...current, [field.name]: event.target.value }))
                }
              />
            ) : (
              <input
                type={field.type}
                step={field.name === "rating" ? "0.1" : undefined}
                min={field.name === "rating" ? "0" : field.type === "number" ? "0" : undefined}
                max={field.name === "rating" ? "5" : undefined}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(event) =>
                  onChange((current) => ({ ...current, [field.name]: event.target.value }))
                }
              />
            )}
          </label>
        ))}

        <div className="editor__actions">
          <button type="submit" className="button">
            {editingId ? "Сохранить изменения" : "Добавить товар"}
          </button>

          {editingId ? (
            <button type="button" className="button button--ghost" onClick={onCancel}>
              Отменить
            </button>
          ) : null}
        </div>
      </form>

      {status.message ? (
        <p className={`status-message status-message--${status.type}`}>{status.message}</p>
      ) : null}
    </aside>
  );
}
