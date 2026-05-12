# Design System Assets — Global Bali Home

Папка для загрузки в Claude design system setup.

## Что внутри

- `logo.png` — основной логотип (на прозрачном фоне)
- `logo-original.png` — исходный логотип
- `favicon.svg` / `favicon.ico` — иконка
- `palette-and-tokens.md` — все цвета, шрифты, spacing, токены
- `brand-and-context.md` — позиционирование, аудитория, тон, контекст
- `screenshots/` — 6 ключевых экранов сайта:
  - `01-home-hero.png`
  - `02-projects-page.png`
  - `03-project-detail.png`
  - `04-about-hero.png`
  - `05-stats-section.png`
  - `06-team-cards.png`

## Что ещё стоит докинуть вручную

- **Шрифты `.ttf`**: скачать с
  - https://fonts.google.com/specimen/Playfair+Display
  - https://fonts.google.com/specimen/Montserrat
  и положить сюда же. Без этого Claude всё равно знает оба шрифта, но с файлами надёжнее.

- **Ссылка на репо** (если публичный) — в отдельное поле формы.

## Как использовать в форме настройки

1. **Link code from your computer** → drag сюда папку `CLODE` (или подпапку `css/` + 2-3 HTML)
2. **Add fonts, logos and assets** → drag всю эту папку `design-system-assets/`
3. **Any other notes** → скопировать содержимое `brand-and-context.md`
