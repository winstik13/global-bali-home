# Responsive Audit — Global Bali Home
**Дата:** 2026-03-29
**Аудитор:** Claude Opus 4.6 (автоматизированный)
**Файлы:** `css/style.css` (3235 строк), `css/reset.css`, `js/main.js`, 36 HTML-страниц

---

## 1. СТРУКТУРА

### [1.1] Viewport meta
**Результат:** Все 36 HTML-страниц содержат `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
> ✅ Без проблем

### [1.2] CSS breakpoints
**Результат:** Присутствуют два основных breakpoint:
- `@media (max-width: 1024px)` — строка 2785 и 3146
- `@media (max-width: 768px)` — строка 2838

Покрыты: header, nav, hero, stats-grid, project-showcase, services-grid, split-section, founder, contact-grid, features-grid, gallery-grid, photo-mosaic, footer, wanayu, why-bali, quiz, roi-calculator, lead-magnet, exit-popup, sticky-cta, testimonials, hero-stats, logo-watermark.
> ✅ Без проблем

### [1.3] CSS-переменные в breakpoints
**Результат:**
- `1024px`: `--side-padding: 40px`, `--section-padding: 80px`
- `768px`: `--side-padding: 20px`, `--section-padding: 60px`, `--header-height: 64px`
> ✅ Без проблем

---

## 2. LAYOUT

### [2.1] Фиксированные ширины
**Результат:** Найдены крупные фиксированные ширины только в декоративных элементах:
- `.logo-watermark::after` — `width: 900px` / `1260px` (строки 152, 173) — декоративный, уменьшается на мобильных (строки 2992-2999)
- `max-width: 1280px` — ограничитель контейнера, безопасен

Inline styles в HTML используют только `max-width` (600px, 700px) — безопасно.
> ✅ Без проблем

### [2.2] Таблицы — overflow-x: auto
**Результат:** Таблицы `comparison-table` (projects.html) и `unit-table` (project-serenity-*.html) НЕ обёрнуты в контейнер с `overflow-x: auto`. На экранах <400px содержимое может выходить за пределы viewport.

**Файлы:** `projects.html:156`, `project-serenity-villas.html:143`, `project-serenity-estates.html`, `project-serenity-village.html` (+ все 3 языковые копии = 16 файлов)
**CSS:** `css/style.css` — нет `overflow-x: auto` для `.unit-table` или `.comparison-table`

> 🟡 ВАЖНО [2.2]
> **Fix:** Обернуть каждую `<table>` в `<div style="overflow-x: auto">` или добавить в CSS:
> ```css
> .unit-table, .comparison-table {
>   display: block;
>   overflow-x: auto;
>   -webkit-overflow-scrolling: touch;
> }
> ```
> Лучший вариант — CSS-обёртка `.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }` + HTML `<div class="table-wrap"><table>...</table></div>`.

### [2.3] Изображения — max-width: 100%
**Результат:** `css/reset.css:30-33`:
```css
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  height: auto;
}
```
Глобальный сброс покрывает все изображения. Inline width/height в HTML (`<img width="1000" height="740">`) переопределяется через CSS reset.
> ✅ Без проблем

### [2.4] Горизонтальные flex/grid — wrap на мобильных
**Результат:** Все основные grid/flex компоненты переключаются на 1 колонку или wrap:
- `.stats-grid` → `1fr` на 768px
- `.services-grid` → `2fr` на 1024px, `1fr` на 768px
- `.footer__grid` → `2fr` на 1024px, `1fr` на 768px
- `.project-showcase` → `1fr` на 1024px
- `.features-grid` → `2fr` на 1024px и 768px
- `.why-bali-stats` → `column` на 768px
- `.wanayu-features` → `flex-wrap: wrap` на 768px
- `.roi-calculator__scenarios` → `flex-wrap: wrap` на 768px
- `.gallery-filters` → имеет `flex-wrap: wrap` изначально
- `.hero__stats` → `flex-wrap: wrap` на 768px
- `.hero-stats` → `grid 2x2` на 768px

> ✅ Без проблем

### [2.5] Видео — адаптивность
**Результат:** Все `<video>` элементы используют `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover` — корректная адаптивная обёртка.
> ✅ Без проблем

---

## 3. TOUCH & ИНТЕРАКТИВНОСТЬ

### [3.1] Touch targets — минимум 44x44px
**Результат:**

| Элемент | Размер | Статус |
|---------|--------|--------|
| `.btn` | `min-height: 44px`, padding 16px 40px | ✅ OK |
| `.header__nav a` (моб.) | `font-size: var(--font-md)` ~22px + gap 28px | ✅ OK |
| `.header__lang-toggle` | padding `6px 10px` → ~26x22px | **Проблема** |
| `.hamburger` | padding `4px`, span 24x1.5px, gap 5px → total ~32x20px | **Проблема** |
| `.footer__social a` | SVG 20x20, без padding | **Проблема** |
| `.whatsapp-float` | 52x52px | ✅ OK |
| `.lightbox__close` | padding 8px, font-size 1.5rem → ~40x40px | **Граница** |
| `.lightbox__prev/.next` | padding 20px | ✅ OK |
| `.quiz__close` | нет explicit width/height, padding отсутствует | **Проблема** |
| `.quiz__option` | padding 16px 20px | ✅ OK |
| `.faq-question` | padding 28px 0, full width | ✅ OK |

> 🟡 ВАЖНО [3.1a]
> **`.hamburger`** — `css/style.css:391-396`. Padding всего 4px, итоговый tap target ~32x20px.
> **Fix:** Увеличить padding до минимум 10px:
> ```css
> .hamburger { padding: 10px; }
> ```

> 🟡 ВАЖНО [3.1b]
> **`.header__lang-toggle`** — `css/style.css:295-310`. Padding `6px 10px` дает ~26px высоту.
> **Fix:** Увеличить padding:
> ```css
> .header__lang-toggle { padding: 10px 12px; min-height: 44px; }
> ```

> 🟠 СРЕДНЕ [3.1c]
> **`.footer__social a`** — `css/style.css:1062-1066`. SVG 20x20px, нет padding. Tap target 20x20px.
> **Fix:**
> ```css
> .footer__social a { padding: 12px; }
> ```

> 🟠 СРЕДНЕ [3.1d]
> **`.quiz__close`** — `css/style.css:1612-1626`. Нет explicit width/height/padding.
> **Fix:**
> ```css
> .quiz__close { padding: 8px; min-width: 44px; min-height: 44px; }
> ```

### [3.2] Hamburger меню — desktop/mobile переключение
**Результат:**
- Desktop: `.hamburger { display: none }` (строка 391)
- Mobile (768px): `.hamburger { display: flex }` (строка 2886)
- Nav: скрывается, показывается `.header__nav.active { display: flex }` с frosted glass эффектом
> ✅ Без проблем

### [3.3] Hover-only стили
**Результат:** Найден `@media (hover: hover)` для `.quiz__option:hover` (строка 1683). Также есть `.quiz__option:active` fallback (строка 1694).

Однако остальные `:hover` стили (кнопки, ссылки, карточки, gallery items) **не обёрнуты** в `@media (hover: hover)`. На touch-устройствах hover-эффекты будут "залипать" после тапа.

> 🟠 СРЕДНЕ [3.3]
> Множество hover-эффектов без `@media (hover: hover)`: `.btn--primary:hover`, `.project-showcase__image:hover img`, `.gallery-item:hover img`, `.service-card:hover`, `.stat-card:hover`.
> **Fix:** Обернуть визуальные hover-эффекты (scale, color changes на карточках) в `@media (hover: hover)`. Базовые `:hover` на ссылках можно оставить — они безвредны.

### [3.4] Sticky/fixed — z-index иерархия
**Результат:**
| Элемент | z-index | Позиция |
|---------|---------|---------|
| `.header` | 1000 | fixed top |
| `.header__lang-dropdown` | 1001 | absolute |
| `.whatsapp-float` | 999 | fixed bottom-right |
| `.sticky-cta` | 998 | fixed bottom (mobile) |
| `.lightbox` | 9999 | fixed fullscreen |
| `.quiz-overlay` | 10000 | fixed fullscreen |
| `.exit-overlay` | 10000 | fixed fullscreen |

WhatsApp float (999) и sticky CTA (998) — `bottom: 30px` vs `bottom: 0`. При sticky-cta visible, WhatsApp поднимается через `.whatsapp-float.lifted { bottom: 75px }`.

> ✅ Без проблем — z-index иерархия корректная, элементы не перекрываются

### [3.5] Формы — input font-size >= 16px на мобильных
**Результат:** Все input'ы используют `font-size: var(--font-sm)` = `0.85rem`. При базовом `font-size: 18px` это дает `15.3px` — **меньше 16px**.

На iOS Safari при фокусе на input с font-size < 16px происходит автоматический зум страницы.

> 🔴 КРИТИЧНО [3.5]
> **Файл:** `css/style.css`, строки 1755, 1829, 2671, 2767
> **Элементы:** `.quiz__input`, `.form-group input/select/textarea`, `.lead-magnet__input`, `.exit-popup__input`
> `font-size: var(--font-sm)` = 0.85rem = **15.3px** (< 16px)
> **Fix:** Добавить в мобильный breakpoint (768px):
> ```css
> @media (max-width: 768px) {
>   .quiz__input,
>   .form-group input,
>   .form-group select,
>   .form-group textarea,
>   .lead-magnet__input,
>   .exit-popup__input {
>     font-size: 16px;
>   }
> }
> ```

---

## 4. ТИПОГРАФИКА

### [4.1] Минимальный font-size
**Результат:**
- `--font-xs: 0.75rem` = 13.5px — используется для labels, tags, metadata
- `.comparison-table__cta .btn` на 768px: `font-size: 0.6rem` = **10.8px** (строка 2362)
- `.comparison-table__cta .btn` desktop: `font-size: 0.65rem` = **11.7px** (строка 2347)

> 🟡 ВАЖНО [4.1]
> **Файл:** `css/style.css:2347, 2362`
> `font-size: 0.6rem` (10.8px) и `0.65rem` (11.7px) — слишком мелко, особенно на мобильных.
> **Fix:** Минимум `var(--font-xs)` (0.75rem = 13.5px):
> ```css
> .comparison-table__cta .btn { font-size: var(--font-xs); }
> ```

### [4.2] Длина строки — max-width на текстовых контейнерах
**Результат:**
- `p { max-width: 65ch }` — глобально (строка 97)
- `.section-header p { max-width: 550px }` (строка 602)
- `.why-bali__content { max-width: 720px }` (строка 872)
- `.faq-list { max-width: 900px }` (строка 2058)
> ✅ Без проблем

### [4.3] Заголовки — масштабирование на мобильных
**Результат:**
- `h1 { font-size: clamp(3rem, 6vw, 5.5rem) }` — адаптивный (строка 88)
- `h2 { font-size: clamp(2rem, 4vw, 3.5rem) }` — адаптивный (строка 89)
- `h3 { font-size: clamp(1.5rem, 3vw, 2.25rem) }` — адаптивный (строка 90)

Использование `clamp()` обеспечивает плавное масштабирование.
> ✅ Без проблем

### [4.4] Line-height
**Результат:**
- `body { line-height: 1.6 }` (строка 65)
- `h1-h3 { line-height: 1.2 }` — допустимо для заголовков
- `h4-h6 { line-height: 1.3 }` — допустимо
> ✅ Без проблем

---

## 5. ПРОИЗВОДИТЕЛЬНОСТЬ

### [5.1] display: none на мобильных
**Результат:**
- `.header__cta { display: none }` на 768px (строка 2891) — легкий элемент, не критично
- `.header__nav { display: none }` на 768px (строка 2846) — текстовые ссылки, не критично

Видео и тяжёлые изображения НЕ скрываются через display: none — они всегда отображаются.
> ✅ Без проблем

### [5.2] Video autoplay
**Результат:** Найдено 3 уникальных видео (hero, why-bali, wanayu) на index.html и projects.html (x4 языка = 12 случаев). Все используют:
- `preload="metadata"` — грузит только метаданные, не весь файл
- `poster="..."` — показывает изображение до загрузки видео

Однако `autoplay` загружает видео на мобильных, где bandwidth ограничен. Нет условной загрузки через JS (matchMedia) для мобильных.

> 🟠 СРЕДНЕ [5.2]
> 3 видео с autoplay загружаются на мобильных. Рекомендация — добавить в JS условную загрузку:
> ```js
> if (window.matchMedia('(min-width: 769px)').matches) {
>   video.src = videoSrc;
> }
> ```
> Или использовать `<source>` с media query (поддержка ограничена).

### [5.3] Hero preload
**Результат:** Все 4 версии `index.html` имеют `<link rel="preload" as="image" href="images/home/hero-bg.jpg">`. Остальные страницы (about, services, project-*) с fullbleed-hero **не имеют** preload для фоновых изображений.

> 🟠 СРЕДНЕ [5.3]
> Страницы с `fullbleed-hero` (about, services, contacts, project-serenity-*) не имеют preload для hero-фона. Фон задан через CSS `background-image`, что откладывает загрузку.

### [5.4] Google Fonts — начертания
**Результат:** `Playfair Display:wght@400;600` (2 начертания) + `Montserrat:wght@400;500;600` (3 начертания) = **5 начертаний, 2 семейства**. Используется `display=swap`.

> ✅ Без проблем — 5 начертаний — умеренная нагрузка, `display=swap` предотвращает FOIT

---

## 6. СПЕЦИФИКА ПРОЕКТА

### [6.1] Availability bars
**Результат:** `.availability-bar` имеет `max-width: 500px`, в showcase `max-width: 100%`. Track — `height: 6px`. Масштабируется корректно.
> ✅ Без проблем

### [6.2] ROI Calculator — touch
**Результат:**
- Slider `.roi-calculator__range` — стандартный `<input type="range">`, touch-совместим
- Thumb: 20x20px с box-shadow 4px — итого ~28px, **меньше 44px**
- Scenario tabs: `padding: 14px 12px`, `flex: 1` → достаточный размер
- На 768px: scenarios переходят на `flex-wrap: wrap`, `flex: 1 1 calc(50% - 6px)` — корректно

> 🟠 СРЕДНЕ [6.2]
> **Файл:** `css/style.css:2487-2494`
> Thumb слайдера 20x20px — рекомендуемый минимум для touch 28-32px.
> **Fix:**
> ```css
> .roi-calculator__range::-webkit-slider-thumb {
>   width: 28px;
>   height: 28px;
> }
> .roi-calculator__range::-moz-range-thumb {
>   width: 28px;
>   height: 28px;
> }
> ```

### [6.3] Gallery lightbox — кнопки закрытия
**Результат:** `.lightbox__close` — `font-size: 1.5rem` (27px), `padding: 8px`. Итого ~43x43px — на грани.
> 🟠 СРЕДНЕ [6.3]
> **Fix:** Увеличить padding до 12px или добавить `min-width: 44px; min-height: 44px`.

### [6.4] Hero-stats (pipe-separated) — перенос
**Результат:** На 768px `.hero-stats` переключается на `grid-template-columns: repeat(2, 1fr)` с `gap: 20px 0`. Нечетные элементы теряют border-left. Корректный wrap.
> ✅ Без проблем

### [6.5] Сравнительная таблица (projects.html) — горизонтальный скролл
**Результат:** На 768px уменьшаются padding и font-size, но нет `overflow-x: auto`. Таблица с 4 колонками (feature + 3 проекта) может не поместиться на экранах <375px.

> 🟡 ВАЖНО [6.5]
> **Файл:** `css/style.css:2279-2364`, HTML: `projects.html:156` (+ 3 языковые копии)
> `.comparison-table` — нет overflow-x scroll. Также `td:first-child { white-space: nowrap }` (строка 2307) усугубляет проблему.
> **Fix:** Обернуть в `.table-wrap` или добавить:
> ```css
> @media (max-width: 768px) {
>   .comparison-table td:first-child { white-space: normal; }
> }
> ```
> И/или обёртка с overflow-x.

### [6.6] Language dropdown — обрезка экраном
**Результат:** `.header__lang-dropdown` имеет `position: absolute; right: 0; min-width: 180px`. На мобильных (768px) `.header__lang` использует `margin-left: auto; margin-right: 16px` (строка 2896-2898). Dropdown выпадает вниз-вправо с `right: 0` — привязан к правому краю кнопки, не выходит за viewport.
> ✅ Без проблем

---

## ИТОГО

| Приоритет | Кол-во | Коды |
|-----------|--------|------|
| КРИТИЧНО | 1 | [3.5] |
| ВАЖНО | 3 | [2.2], [3.1a], [3.1b], [4.1], [6.5] |
| СРЕДНЕ | 5 | [3.1c], [3.1d], [3.3], [5.2], [5.3], [6.2], [6.3] |
| Без проблем | 16 | [1.1], [1.2], [1.3], [2.1], [2.3], [2.4], [2.5], [3.2], [3.4], [4.2], [4.3], [4.4], [5.1], [5.4], [6.1], [6.4], [6.6] |

### Топ-3 приоритетных исправления:

1. **[3.5] Input font-size < 16px** — iOS зум при фокусе на всех формах сайта. Затрагивает quiz, contact form, lead magnet, exit popup. Быстрый fix — одно правило в @media 768px.

2. **[2.2] + [6.5] Таблицы без overflow-x** — comparison-table и unit-table могут ломать layout на узких экранах. Затрагивает 16 HTML-файлов.

3. **[3.1a-b] Touch targets гамбургера и lang toggle** — основные элементы навигации на мобильных слишком маленькие. Fix — увеличить padding.
