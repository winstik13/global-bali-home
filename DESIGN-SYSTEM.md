# Global Bali Home — Design System

Полная документация дизайн-системы сайта. Всё основано на `css/style.css`.

---

## 1. Design Tokens (CSS Custom Properties)

### Цвета темы

| Token | Value | Назначение |
|-------|-------|------------|
| `--color-bg` | `#1a1a14` | Основной фон страницы |
| `--color-bg-alt` | `#111110` | Чередующийся фон секций |
| `--color-bg-card` | `#2a2a20` | Фон карточек |
| `--color-bg-elevated` | `#333328` | Приподнятые поверхности |

### Бренд-цвета (из Brandbook)

| Token | Value | Назначение |
|-------|-------|------------|
| `--color-dark` | `#3B3B2E` | Тёмный земляной |
| `--color-beige` | `#E1D9C9` | Основной бежевый |
| `--color-green` | `#4A5530` | Зелёный |
| `--color-deep-green` | `#1E2E1B` | Глубокий лесной |
| `--color-cream` | `#F7F7F0` | Кремовый |
| `--color-accent` | `#6B8F4E` | Акцент / CTA |

### Текст

| Token | Value | Назначение |
|-------|-------|------------|
| `--color-text` | `#E1D9C9` | Заголовки, акцентный текст |
| `--color-text-muted` | `rgba(225, 217, 201, 0.75)` | Body, описания, ссылки |
| `--color-text-dim` | `rgba(225, 217, 201, 0.5)` | Лейблы, копирайт, мета, breadcrumbs |

### Границы

| Token | Value | Назначение |
|-------|-------|------------|
| `--color-border` | `rgba(225, 217, 201, 0.1)` | Дефолтные бордеры |
| `--color-border-hover` | `rgba(225, 217, 201, 0.25)` | Hover-бордеры |

### Шрифты

| Token | Value | Роль |
|-------|-------|------|
| `--font-heading` | `'Playfair Display', Georgia, serif` | Заголовки h1–h3, акцентные числа |
| `--font-body` | `'Montserrat', sans-serif` | Body, навигация, кнопки |

### Шкала размеров шрифта

| Token | Value | px (18px base) | Ratio | Роль |
|-------|-------|----------------|-------|------|
| `--font-xs` | `0.75rem` | 13.5px | — | Лейблы, кнопки, теги, мета |
| `--font-sm` | `0.85rem` | 15.3px | 1.13x | Навигация, описания, инпуты |
| `--font-md` | `1.2rem` | 21.6px | 1.41x | h4, FAQ, цены, заголовки карт |
| `--font-xl` | `1.75rem` | 31.5px | 1.46x | Числа статистики, display |
| `--font-2xl` | `2rem` | 36px | 1.14x | Декоративные числа (01–06) |
| `--font-3xl` | `2.5rem` | 45px | 1.25x | Крупные акцентные числа |

Хардкод-размеры (не переменные): `18px` (body base), `1.5rem` (lightbox/popup кнопки).

### Заголовки

| Элемент | Размер | Вес | Семейство |
|---------|--------|-----|-----------|
| h1 | `clamp(3rem, 6vw, 5.5rem)` | 400 | Playfair Display |
| h2 | `clamp(2rem, 4vw, 3.5rem)` | 400 | Playfair Display |
| h3 | `clamp(1.5rem, 3vw, 2.25rem)` | 400 | Playfair Display |
| h4–h6 | `1.125rem` | 600 | Montserrat |

### Лейаут

| Token | Desktop | Tablet (1024px) | Mobile (768px) |
|-------|---------|-----------------|----------------|
| `--max-width` | 1280px | 1280px | 1280px |
| `--side-padding` | 80px | 40px | 20px |
| `--section-padding` | 120px | 80px | 60px |
| `--header-height` | 80px | 80px | 64px |

### Анимации

| Token | Value | Назначение |
|-------|-------|------------|
| `--transition` | `0.3s ease` | Дефолтный переход |
| `--transition-slow` | `0.6s ease` | Scroll reveals |

---

## 2. Шкала отступов

Повторяющиеся значения в системе:

| Значение | Использование |
|----------|---------------|
| 4px | Мелкие зазоры (messenger toggle, labels) |
| 8px | Зазоры компонентов, иконок |
| 12px | Средние зазоры (кнопки, списки, карточки) |
| 16px | Паддинг форм, header lang |
| 20px | Соцсети, средний spacing |
| 24px | Крупные зазоры, form groups |
| 28px | FAQ items, form groups margin |
| 32px | Паддинг карточек, features gap |
| 40px | Паддинг карточек, секционный |
| 48px | Showcase padding, grid gaps |
| 60px | Contact grid gap |
| 80px | Split section gap, footer padding |
| 120px | Section padding (default) |

---

## 3. Border Radius

| Значение | Использование |
|----------|---------------|
| `2px` | Кнопки, слайдеры |
| `3px` | Progress bars, availability bar |
| `4px` | Testimonial карточки, skip-link |
| `50%` | Круглые элементы (WhatsApp, slider thumb, dots) |

---

## 4. Box Shadows

| Компонент | Значение |
|-----------|----------|
| WhatsApp float | `0 4px 24px rgba(37, 211, 102, 0.25)` |
| WhatsApp hover | `0 6px 32px rgba(37, 211, 102, 0.35)` |
| Slider thumb | `0 0 0 4px rgba(107, 143, 78, 0.2)` |
| Input focus-visible | `0 0 0 3px rgba(107, 143, 78, 0.25)` |

---

## 5. Z-Index слои

| Слой | Значение | Компонент |
|------|----------|-----------|
| -1 | Фоновые элементы | pseudo-elements, скрытая навигация |
| 0 | Фон | Watermark, оверлеи |
| 1 | Контент | Текст поверх видео/фонов |
| 2 | Навигация | Hamburger button |
| 998 | Sticky UI | Sticky CTA (mobile) |
| 999 | Floating UI | WhatsApp float |
| 1000 | Header | Фиксированный header |
| 1001 | Lang dropdown | Выпадающий список языков (поверх header контента) |
| 9999 | Модальные | Lightbox |
| 10000 | Критические модальные | Quiz, Exit popup, Skip-link |

---

## 6. Фоновые паттерны

### Honeycomb (соты)

SVG-паттерн, применяется через `::before` на `.bg-alt`, `.lead-magnet`, `.footer`:
- Размер: 56px × 100px
- Stroke: `#E1D9C9`, stroke-width: 0.5
- Opacity: `0.03`
- Pointer-events: none

### Logo Watermark

Декоративный полупрозрачный логотип через `::before`:
- Размер: 900px × 900px (`.logo-watermark--large`: 1260px)
- Opacity: `0.12`
- Изображение: `logo-transparent.png` (33KB)
- Варианты: `--right` (right-bottom), `--left` (left-top)

### Градиентные оверлеи

| Секция | Направление | Стопы |
|--------|-------------|-------|
| Hero | 180deg | 0.3 → 0.5 → 0.95 |
| Why Bali | 135deg | 0.85 → 0.6 |
| Wanayu | — | 0.7 сплошной |
| Page Hero | 180deg | 0.2 → 0.85 |
| Fullbleed Hero | 180deg | 0.3 → 0.7 → 0.95 → solid |
| Gallery item hover | 0deg | 0.6 → transparent 50% |

### Backdrop Filters

| Компонент | Значение |
|-----------|----------|
| Lightbox, Quiz, Exit popup | `blur(10px)` |
| Header (solid) | `blur(20px)` |
| Mobile menu | `blur(24px)` |

---

## 7. Компоненты

### 7.1 Кнопки (`.btn`)

**Базовые свойства:**
- Padding: `16px 40px`, min-height: `44px`
- Font: `--font-xs`, weight: 600, uppercase, letter-spacing: `0.15em`
- Border-radius: `2px`
- Transition: `all 0.3s ease`

| Вариант | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `--primary` | `--color-beige` | `--color-bg` | `--color-beige` | Transparent bg, beige text |
| `--outline` | transparent | `--color-text` | `--color-border-hover` | Lighter border, overlay bg |

Primary кнопка в hero пульсирует: `scale 1 → 1.06`, 4s ease-in-out, infinite. Останавливается на hover.

### 7.2 Header (`.header`)

**Два состояния:**
- `--transparent`: градиент overlay (rgba(0,0,0,0.75) → transparent)
- `--solid`: solid bg + backdrop-filter: blur(20px)

**Структура:**
```
.header (fixed, z-index: 1000)
  .header__logo (height: 56px / mobile: 39px)
  .header__nav (flex, gap: 36px) → links uppercase, 0.15em spacing
  .header__lang (position: relative) → language dropdown
    .header__lang-toggle (button) → текущий код + chevron SVG
    .header__lang-dropdown → список языков
      <span class="active"> → текущий язык + ✓ через ::after
      <a> × 3 → остальные языки
  .header__cta → скрыт на mobile
  .hamburger → виден только на mobile
```

**Language dropdown:**
- Toggle: `border: 1px solid --color-border`, padding 6px 10px, border-radius 2px
- Dropdown: `position: absolute`, top: calc(100% + 8px), right: 0, min-width: 180px, bg-card
- Появление: opacity/visibility/translateY(-8px → 0) при классе `.open`
- JS логика: клик на toggle → `.open`, клик вне → закрыть, Escape → закрыть + вернуть фокус
- ARIA: `aria-expanded`, `aria-haspopup="true"` на toggle

**Языки (4):** English (EN), Русский (RU), Bahasa Indonesia (ID), 简体中文 (中文)

**Mobile menu (768px):** position: fixed, backdrop-filter: blur(24px), bg: rgba(26,26,20,0.75), lotus watermark 400×400 at 0.3 opacity.

### 7.3 Hero секции

**Main Hero (`.hero`):** полная высота viewport, видео-фон, 3-стоп градиент, статы внизу.

**Fullbleed Hero (`.fullbleed-hero`):** для внутренних страниц (about, contacts, services, проекты). Фоновое изображение + 4-стоп градиент. Структура: `__bg` + `__overlay` + `__top` (breadcrumbs, h1) + `__bottom` (первая секция контента).

**Page Hero (`.page-hero`):** min-height: 40vh (280px min), 2-стоп градиент.

**Hero Stats (`.hero-stats`):** inline stats row на project pages. Flex row, pipe-separated items, padding 0 28px. Mobile: 2×2 grid.

### 7.4 Section Header (`.section-header`)

```html
<div class="section-header reveal">
  <span class="section-header__tag">Tag Text</span>
  <h2>Heading</h2>
  <p>Description</p>
</div>
```

- `__tag`: accent color, uppercase, letter-spacing: 0.3em, font-size: --font-xs
- По умолчанию center. `.section-header--left` для выравнивания влево.

### 7.5 Project Showcase (`.project-showcase`)

Grid: `1.2fr 1fr` (реверс: `1fr 1.2fr`). Mobile: 1 колонка.

```
.project-showcase
  .project-showcase__image (aspect-ratio: 16/10)
    img
    .project-showcase__badge (absolute, top: 20px, left: 20px)
  .project-showcase__content (bg-card, padding: 48px)
    .project-showcase__title
    .project-showcase__desc
    .project-showcase__meta (flex, gap: 32px, borders)
    .project-showcase__price (serif, --font-md)
    .project-showcase__link (hover: gap 8px → 14px)
```

### 7.6 Карточки статистики (`.stat-card`)

Grid: 4 колонки → 2 (1024px) → 1 (768px).

- Padding: `40px 20px`, border: 1px, text-align: center
- Hover: accent border, bg-card background
- `__number`: serif, `clamp(2.5rem, 4vw, 4rem)`, cream color
- `__label`: uppercase, letter-spacing: 0.15em

### 7.7 Service Cards (`.service-card`)

Grid: 3 колонки → 2 (1024px) → 1 (768px).

- Padding: `40px 32px`, border-top: 1px
- Hover: accent border-top, accent число
- `__number`: serif, --font-2xl, dim → accent on hover
- `__icon svg`: 32px, stroke: accent, fill: none
- `__title`: serif, --font-md, weight: 400
- `__stat`: serif, --font-md, weight: 600, cream — контраст с title через weight

### 7.8 Testimonials (`.testimonials`)

Background: `rgba(107, 143, 78, 0.05)` + logo watermark left.

Grid: 3 колонки → 1 (1024px, max-width: 600px centered).

```
.testimonials__card (bg-card, border: 1px, padding: 40px 32px, radius: 4px)
  .testimonials__stars (accent color, --font-md)
  .testimonials__text (serif, italic, --font-sm, line-height: 1.8)
  .testimonials__author (border-top, flex, gap: 12px)
    .testimonials__name (--font-xs, weight: 600, uppercase)
    .testimonials__role (--font-xs, dim)
```

### 7.9 Формы

**Contact Form (`.contact-form`):**

Grid: 2 колонки → 1 (1024px), gap: 80px.

- Labels: uppercase, weight: 600, letter-spacing: 0.15em, --font-xs
- Inputs: padding: 14px 0, border-bottom: 1px, transparent bg
- Focus: border-color → text
- Error: border-color: `#c0392b`, `.error-msg` visible
- Valid: border-color: accent
- Success: `.form-success` — centered h3 (accent) + p (muted)

**Messenger Toggle:**
```
.messenger-toggle__label (--font-xs, dim, uppercase, 0.1em spacing)
.messenger-toggle (flex, gap: 8px)
  .messenger-toggle__option (padding: 6px 16px, border: 1px)
    input[type="radio"] (hidden)
    span
  :has(input:checked) → accent border + text
```

### 7.10 Quiz Popup (`.quiz`)

Overlay: fixed, z-index: 10000, backdrop-filter: blur(10px).

- Container: max-width: 520px, padding: 48px 40px (mobile: 40px 24px)
- `role="dialog"`, `aria-modal="true"`, `aria-label="Investment quiz"`
- Progress bar: 3px height, accent fill, `role="progressbar"`
- Question: serif, `clamp(1.4rem, 3vw, 1.8rem)`
- Options: flex column, gap: 12px, padding: 16px 20px, border: 1px
  - Icon: 24px SVG, stroke: accent
  - Hover: text border, text color, light bg overlay
- Inputs: padding: 14px 16px, transparent bg, border: 1px
- Flow: 3 шага → рекомендация + форма → thank you

### 7.11 Exit Intent Popup (`.exit-popup`)

Overlay: fixed, z-index: 10000, backdrop-filter: blur(10px).

- Container: max-width: 480px, padding: 48px (mobile: 36px 24px)
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="exit-popup-title"`
- Title: serif, 1.5rem
- Input: padding: 14px 16px, border: 1px

### 7.12 Gallery

**Filters:** flex center, gap: 12px, wrap. Кнопки: border: 1px, uppercase, 0.15em. Active: inverted (text bg, bg text).

**Masonry Grid:** 3 колонки → 2 (768px), grid-auto-rows: 1px.

**Lightbox:** fixed, z-index: 9999, backdrop-filter: blur(10px). Image: max 90vw × 85vh. Навигация: prev/next, counter, close.

### 7.13 Photo Mosaic

Grid: 4 колонки, 2 ряда × 280px, gap: 8px. Первый элемент: span 2 cols × 2 rows.
Tablet: 2 колонки auto. Mobile: 1 колонка.

### 7.14 ROI Calculator

Grid: 1fr 1fr → 1 колонка (768px), gap: 60px.

- Range slider: custom thumb 20px circle, accent bg, shadow ring
- Scenarios: 3 кнопки flex, padding: 14px 12px, border: 1px. Active: accent border/text, light accent bg
- Results: bg-card + bg-elevated, border: 1px, padding: 40px
- Highlight result: --font-3xl, accent color

### 7.15 Availability Bar

- Track: height: 6px, border-radius: 3px, bg: color-border
- Fill: accent bg, transition: width 1.5s ease
- Label: --font-sm text
- Presale variant: pulsing dot (8px, animation: pulse-dot 2s), no progress bar

### 7.16 Footer

Background: --color-bg-alt + honeycomb pattern. Padding: 80px 0 32px.

Grid: 2fr 1fr 1fr 1fr → 2 cols (1024px) → 1 col (768px), gap: 48px.

- Brand: logo with brightness/invert filter
- Headings: uppercase, letter-spacing: 0.2em, --font-xs
- Links: display: block, hover: accent color
- Social SVGs: 20px, fill: currentColor
- Bottom: border-top, flex space-between, dim text

### 7.17 WhatsApp Float

Position: fixed, bottom: 24px, right: 24px, z-index: 999.
Size: 56px circle, bg: `#25D366`, green box-shadow.
SVG icon: 26px, fill: white.
`.lifted`: bottom: 75px (when sticky CTA visible on mobile).

### 7.18 Sticky CTA (mobile only)

Position: fixed bottom, z-index: 998. Hidden by default (display: none on desktop).
Transform: translateY(100%) → 0 on `.visible`. Background: bg with honeycomb.

### 7.19 Pre-Sale Banner

Background: accent, color: bg. Font: --font-md, weight: 600, letter-spacing: 0.05em. Padding: 18px 0.

---

## 8. Scroll-анимации

| Класс | Начальное состояние | Финальное (`.visible`) | Длительность |
|-------|--------------------|-----------------------|-------------|
| `.reveal` | translateY(40px), opacity: 0 | translateY(0), opacity: 1 | 0.8s ease |
| `.reveal-left` | translateX(-40px), opacity: 0 | translateX(0), opacity: 1 | 0.8s ease |
| `.reveal-right` | translateX(40px), opacity: 0 | translateX(0), opacity: 1 | 0.8s ease |
| `.reveal-stagger` | Children staggered | Each child delay +0.1s | 0.6s ease |

Trigger: IntersectionObserver добавляет `.visible`.

**Keyframe-анимации:**
- `pulse`: scale 1 → 1.06 → 1, 4s ease-in-out, infinite (primary CTA в hero)
- `pulse-dot`: opacity/scale пульсация, 2s ease, infinite (presale indicator)

---

## 9. Иконки (SVG)

**Стиль:** line-art, outline

| Контекст | Размер | Stroke | Fill |
|----------|--------|--------|------|
| Service cards | 32px | `var(--color-accent)`, width: 1.5 | none |
| Feature items | 32px | `var(--color-accent)`, width: 1.5 | none |
| Quiz options | 24px | `var(--color-accent)`, width: 1.5 | none |
| Footer social | 20px | — | `currentColor` |
| WhatsApp | 26px | — | white |

---

## 10. Accessibility

### Focus States
- `*:focus-visible`: outline 2px solid accent, offset 2px
- `.btn:focus-visible`: offset 4px
- Inputs/textareas: outline: none, border-color: accent, box-shadow: 0 0 0 3px rgba(107, 143, 78, 0.25)
- `.faq-question:focus-visible`: offset -2px (внутренний)
- Header links: offset 4px

### Skip Navigation
JS-инъекция `.skip-link`: absolute top: -100px → focus: top: 0. Background: accent, color: bg.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
  .reveal, .reveal-left, .reveal-right { opacity: 1; transform: none; }
}
```

### ARIA
- Hamburger: `aria-expanded`, `aria-controls`
- FAQ: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`
- Quiz: `role="dialog"`, `aria-modal`, `aria-label`, `role="progressbar"`
- Exit popup: `role="dialog"`, `aria-modal`, `aria-labelledby`

---

## 11. Responsive Breakpoints

### Tablet (max-width: 1024px)

| Компонент | Изменение |
|-----------|-----------|
| Side padding | 80px → 40px |
| Section padding | 120px → 80px |
| Stats grid | 4 cols → 2 |
| Services grid | 3 cols → 2 |
| Project showcase | 2 cols → 1 |
| Split section | 2 cols → 1 |
| Contact grid | 2 cols → 1 |
| Features grid | 4 cols → 2 |
| Footer grid | 4 cols → 2 |
| Photo mosaic | 4 cols → 2 |
| Testimonials | 3 cols → 1 (max-width: 600px) |

### Mobile (max-width: 768px)

| Компонент | Изменение |
|-----------|-----------|
| Side padding | 40px → 20px |
| Section padding | 80px → 60px |
| Header height | 80px → 64px |
| Logo | 56px → 39px |
| Header nav | → fullscreen mobile menu |
| Header CTA | hidden |
| Hamburger | visible |
| Stats grid | 2 cols → 1 |
| Services grid | 2 cols → 1 |
| Gallery grid | 3 cols → 2 |
| Hero stats | flex → 2×2 grid |
| Footer grid | 2 cols → 1 |
| Photo mosaic | 2 cols → 1 |
| ROI calculator | 2 cols → 1 |
| Quiz | padding: 48px 40px → 40px 24px |
| Exit popup | padding: 48px → 36px 24px |
| Sticky CTA | hidden → visible (display: block) |
| WhatsApp | lifted +51px when sticky CTA visible |

---

## 12. Naming Convention

**BEM-подобный:**
- Block: `.service-card`, `.project-showcase`, `.hero`
- Element: `__` → `.service-card__title`, `.hero__stats`
- Modifier: `--` → `.btn--primary`, `.project-showcase--reverse`

**Utility-классы:**
- `.bg-alt` — альтернативный фон
- `.bg-card` — фон карточки
- `.reveal`, `.reveal-left`, `.reveal-right` — scroll-анимации
- `.logo-watermark`, `.logo-watermark--right/--left/--large` — декоративный водяной знак

**Data-атрибуты:**
- `data-quiz` — элемент открывает квиз popup
- `data-counter` — числовой счётчик при скролле
- `data-required` — обязательное поле формы
- `data-yield`, `data-growth` — параметры ROI-сценариев

---

*Auto-generated from css/style.css*
*Last updated: 2026-03-29*
