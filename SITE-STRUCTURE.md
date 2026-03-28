# Структура сайта Global Bali Home

## Общие элементы (все 18 страниц: 9 EN + 9 RU)

- **Header** — логотип, навигация (Home, Projects, Services, About, Gallery, Contact), CTA "Get Started" (квиз), EN|RU переключатель языка, hamburger на мобильных
- **Footer** — бренд, навигация, проекты, контакты, соцсети
- **WhatsApp** — плавающая кнопка (на мобильном поднимается при видимости Sticky CTA)
- **Квиз** — 4-шаговый попап (цель → бюджет → спальни → сроки → контактная форма → рекомендация проекта), DOM-инъекция из JS
- **Exit Intent Popup** — попап при уходе со страницы, лид-магнит "Investment Guide", DOM-инъекция из JS
- **Sticky CTA** — фиксированная кнопка "Get Started" внизу экрана (только мобильный, появляется после прокрутки hero)

## Мультиязычность

- **EN** — корневая директория (`/index.html`, `/about.html`, ...)
- **RU** — папка `/ru/` (`/ru/index.html`, `/ru/about.html`, ...)
- Переключатель языка в header связывает EN↔RU версии каждой страницы
- RU-версии идентичны по структуре, отличается только текстовый контент

---

## Страницы

### index.html — Главная
1. **Hero** — видео-фон, заголовок, CTA-кнопка, 3 стата
2. **Projects** — 3 showcase-карточки проектов с availability bar
4. **Stats** — 4 карточки с цифрами
5. **Why Bali** — видео-фон (дрон), текст об инвестициях + 3 ключевые цифры
6. **ROI Calculator** — интерактивный калькулятор доходности (3 сценария + occupancy)
7. **About Intro** — фото + текст о компании
8. **Photo Mosaic** — мозаика из галереи
9. **Lead Magnet** — "Bali Investment Guide 2026" + форма (имя, email)
10. **CTA** — призыв к действию

### about.html — О компании
1. **Fullbleed Hero** — фоновое изображение с градиентным затуханием, breadcrumbs (Home / About Us), subtitle, h1. `__bottom` содержит Our Story (split-section)
2. **Mission & Vision** — миссия, видение, устойчивость
4. **Timeline** — 2023–2026, ключевые этапы
5. **Founder** — фото и биография основателя
6. **CTA**

### projects.html — Проекты
1. **Hero** — заголовок страницы
2. **Showcases** — 3 карточки проектов с availability bar
3. **Wanayu** — видео-фон с дрона, описание территории (5+ проектов, 70+ вилл)
4. **CTA**

### services.html — Услуги
1. **Fullbleed Hero** — фоновое изображение с градиентным затуханием, breadcrumbs (Home / Services), subtitle, h1. `__bottom` содержит Services Grid
2. **Services Grid** — 6 карточек услуг (нумерация 01-06, иконки, без фона, border-top разделители)
3. **Partners** — партнёрства
4. **CTA**

### gallery.html — Галерея
1. **Hero** — заголовок страницы
2. **Gallery** — фильтры с счётчиком + masonry-сетка + lightbox со счётчиком + Load More
3. **CTA**

### contacts.html — Контакты
1. **Fullbleed Hero** — фоновое изображение с градиентным затуханием, breadcrumbs (Home / Contact), subtitle, h1. `__bottom` содержит FAQ
2. **Form + Info** — форма обратной связи + контакты + карта

### project-serenity-villas.html
1. **Fullbleed Hero** — фоновое изображение, breadcrumbs (Home / Projects / Serenity Villas), subtitle, h1, инлайн hero-stats (12 Villas | 2-3 Bedrooms | Q2 2026 | $335K+)
2. **Concept** (`bg-alt`) — концепция + дата сдачи
3. **Features** — 6 особенностей вилл
5. **Units** — availability bar (8/12 sold) + таблица доступности 12 юнитов
6. **Gallery** — 5 фото мозаика + View More → gallery
7. **CTA**

### project-serenity-estates.html
1. **Fullbleed Hero** — фоновое изображение, breadcrumbs (Home / Projects / Serenity Estates), subtitle, h1, инлайн hero-stats (4 Villas | 2-4.5 Bedrooms | Q1 2027 | $310K+)
2. **Overview** (`bg-alt`) — описание 4 вилл
3. **Features** — 8 особенностей
5. **Units** — availability bar (1/4 sold) + таблица 4 юнитов
6. **Gallery** — 5 фото мозаика + View More → gallery
7. **CTA**

### project-serenity-village.html
1. **Fullbleed Hero** — фоновое изображение, breadcrumbs (Home / Projects / Serenity Village), subtitle, h1, инлайн hero-stats (26 Villas | 1-2 Bedrooms | $119K | Pre-Sale)
2. **Pre-Sale Banner** — баннер предпродажи
3. **Overview** — концепция комьюнити
4. **Concept** (`bg-alt`) — концепция дизайна
5. **Features** — 6 особенностей
6. **Units** — pre-sale индикатор + таблица типов юнитов
7. **Vision + Interiors** — объединённая секция: архитектурное видение и интерьеры
8. **Gallery** — 5 фото мозаика + View More → gallery
9. **Register** — регистрация интереса
10. **CTA**
