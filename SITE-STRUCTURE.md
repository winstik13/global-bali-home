# Структура сайта Global Bali Home

## Общие элементы (все 27 страниц: 9 EN + 9 RU + 9 ID)

- **Header** — логотип, навигация (Home, Projects, Services, About, Gallery, Contact), CTA "Find My Villa" (`data-quiz`), языковой дропдаун (EN/RU/ID), hamburger на мобильных
- **Footer** — бренд, навигация, проекты, контакты, соцсети (SVG-иконки), honeycomb-паттерн
- **WhatsApp** — плавающая кнопка (класс `.lifted` при видимости Sticky CTA на мобильном)
- **Квиз** — 3-шаговый попап (цель → бюджет → сроки → рекомендация проекта + контактная форма), DOM-инъекция из JS
- **Exit Intent Popup** — попап при уходе со страницы (`mouseleave`, только десктоп), лид-магнит "Investment Guide", DOM-инъекция из JS
- **Sticky CTA** — фиксированная кнопка внизу экрана (только мобильный, появляется после прокрутки hero)

## Мультиязычность

- **EN** — корневая директория (`/index.html`, `/about.html`, ...)
- **RU** — папка `/ru/` (`/ru/index.html`, `/ru/about.html`, ...)
- **ID** — папка `/id/` (`/id/index.html`, `/id/about.html`, ...)
- Языковой дропдаун в header: English, Русский, Bahasa Indonesia
- Все версии идентичны по структуре, отличается только текстовый контент
- Подпапки используют `../` для CSS, JS, изображений, видео

---

## Страницы

### index.html — Главная
1. **Hero** — видео-фон, заголовок, CTA-кнопка (пульсирующая), 3 стата (3 Projects, $119K Start, 12-15% ROI)
2. **Featured Projects** — 3 showcase-карточки проектов с availability bars
3. **Stats** (`bg-alt`) — 4 карточки с цифрами (3+ years, 43 villas, 80%+ occupancy, $1B+ experience)
4. **Why Bali** — видео-фон (дрон), текст об инвестициях + 3 ключевые цифры (16M+ tourists, 12-15% yield, 8-12% growth)
5. **Testimonials** (`bg-alt`, watermark) — 3 отзыва клиентов
6. **ROI Calculator** — интерактивный калькулятор доходности (3 сценария + occupancy слайдер)
7. **About Intro** — split-секция (фото + текст о компании)
8. **Photo Mosaic** — мозаика из галереи + кнопка "View Full Gallery"
9. **Lead Magnet** — "Bali Investment Guide 2026" + форма (имя, email)
10. **CTA** — "Start Your Investment Journey"

### about.html — О компании
1. **Fullbleed Hero** — фоновое изображение, breadcrumbs (Home / About Us), subtitle, h1
2. **Our Story** — section-header + 3 параграфа
3. **Stats Grid** (`bg-alt`) — 4 карточки (3 projects, 42 villas, 4 shareholders, $1B+ experience)
4. **Mission & Vision** — split-секция: 2 блока (Mission + Sustainability)
5. **Timeline** — 4 этапа (2023–2026, с маркером "upcoming")
6. **Meet Founder** (`bg-alt`) — фото, имя, роль, 3-параграфная биография
7. **CTA** — 2 кнопки (Explore Projects, Get Free Consultation)

### projects.html — Проекты
1. **Fullbleed Hero** — breadcrumbs, заголовок
2. **Project Showcases** — 3 карточки проектов с availability bars и кнопками
3. **Comparison Table** (`bg-alt`) — сравнительная таблица всех 3 проектов
4. **Testimonials** — 3 отзыва (аналогично главной)
5. **Wanayu Territory** — видео-фон, features grid (2km trails, 5+ projects, 8min to Ubud, 70+ villas)
6. **CTA**

### services.html — Услуги
1. **Fullbleed Hero** — фоновое изображение, breadcrumbs (Home / Services), subtitle, h1
2. **What We Offer** — section-header + 6 service-cards (01-06): Real Estate Development, Construction, Property Management, Insurance, Investment Consulting, Lifestyle Concierge
3. **Trusted Partnerships** (`bg-alt`) — split-секция с партнёрами
4. **CTA**

### gallery.html — Галерея
1. **Fullbleed Hero** — breadcrumbs, заголовок
2. **Gallery Filters** — 4 кнопки (All, Serenity Villas, Serenity Estates, Serenity Village) + счётчик
3. **Masonry Grid** — динамическая masonry-сетка (3 колонки → 2 на мобильном)
4. **Lightbox** — модальный просмотр (prev/next, counter, close)
5. **CTA**

### contacts.html — Контакты
1. **Fullbleed Hero** — фоновое изображение, breadcrumbs (Home / Contact), subtitle, h1
2. **FAQ** — 9 аккордеон-вопросов:
   - Why invest in Bali real estate?
   - Can foreigners buy property in Bali?
   - What ROI can I expect?
   - Do you offer property management?
   - What about insurance and legal protection?
   - What is the buying process?
   - What are the risks?
   - How is construction quality ensured?
   - What if I want to resell my villa?
3. **Contact Form + Info** — split layout: форма (Name, Email, Phone, Consent) + контакты (WhatsApp, Email, Location, карта)

### project-serenity-villas.html
1. **Fullbleed Hero** — breadcrumbs (Home / Projects / Serenity Villas), subtitle, h1, hero-stats (12 Villas | 2–3 Bedrooms | Q2 2026 | $335K+ | 12–15% Yield)
2. **Concept** (`bg-alt`) — split-секция (изображение + текст)
3. **Villa Features** — 6 feature items (bathrooms, kitchen, smart home, tropical views, waterfalls, garden)
4. **Unit Availability** (`bg-alt`) — availability bar (8/12 sold, 67%) + таблица 12 юнитов
5. **Gallery** — photo mosaic (5 фото) + кнопка "View Villa Photos"
6. **CTA**

### project-serenity-estates.html
1. **Fullbleed Hero** — breadcrumbs, hero-stats (4 Villas | 2–4.5 Bedrooms | Q1 2027 | $310K | 12–15% Yield)
2. **Project Overview** — split-секция (текст + изображение)
3. **Villa Features** — 8 feature items (pool, kitchen, bathrooms, garden, fish pond, terrace, chill-out, design)
4. **Unit Availability** (`bg-alt`) — availability bar (1/4 sold, 25%) + таблица 4 юнитов (2× 4.5BR, 2× 2BR)
5. **Gallery** — photo mosaic (5 фото)
6. **CTA**

### project-serenity-village.html
1. **Fullbleed Hero** — breadcrumbs, hero-stats (26 Villas | 1–2 Bedrooms | $119K | 12–15% Yield | Pre-Sale)
2. **Pre-Sale Banner** — акцентный баннер предпродажи
3. **Project Overview** (`bg-alt`) — split-секция (изображение + текст + кнопка "Register Interest")
4. **Complex Features** — 6 feature items (shared pool, cafe, walking trails, gardens, design, proximity)
5. **Unit Availability** (`bg-alt`) — availability bar (9/26 sold, 36%) + таблица типов (12× 1BR, 14× 2BR)
6. **Modern Tropical Living** — split-секция (изображение + текст)
7. **Thoughtful Interiors** — reverse split-секция
8. **Gallery** — photo mosaic (5 фото)
9. **Register Interest** — CTA-секция регистрации
10. **CTA**

---

*Last updated: 2026-03-29*
