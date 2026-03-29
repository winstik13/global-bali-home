# Полный аудит основного сайта Global Bali Home
**Дата:** 2026-03-30
**Охват:** 27 HTML-страниц (9 EN + 9 RU + 9 ID), css/style.css, js/main.js, data-файлы
**Архитектура:** Чистый HTML/CSS/JS, GitHub Pages, без фреймворков

---

## 1. БАГИ И КРИТИЧЕСКИЕ ПРОБЛЕМЫ

**[BUG-1] ~~ROI калькулятор: null reference crash~~ ✅ РЕШЕНО**
- ~~DOM-элементы не проверяются на null.~~
- **Исправлено:** добавлена проверка `if (!amountEl || !annualEl || !yr5El || !yr10El || !occRange) return;`

**[BUG-2] ~~Утечка памяти: незакрытые setInterval в countdown~~ ✅ РЕШЕНО**
- ~~Exit popup countdown продолжал работать после закрытия модала.~~
- **Исправлено:** interval ID сохраняется в `exitOverlay._countdownIv`, очищается в `closeExit()`. Lead magnet countdown не требовал фикса (inline-блок, нельзя закрыть).

**[BUG-3] ~~Пустой catch на fetch курса валют~~ ✅ РЕШЕНО**
- ~~Ошибки API глотались молча.~~
- **Исправлено:** добавлен `console.warn` с сообщением об ошибке в обоих catch.

**[BUG-4] ~~CSS: переменная --font-base не определена~~ ✅ РЕШЕНО**
- ~~`.faq-answer__inner` использовала несуществующую `var(--font-base)`.~~
- **Исправлено:** заменено на `var(--font-sm)` (0.85rem).

**[BUG-5] ~~Галерея ID: noscript fallback с неправильными классами~~ ✅ РЕШЕНО**
- ~~ID версия использовала `.photo-mosaic` вместо `.gallery-grid`, другие изображения и непереведённые alt.~~
- **Исправлено:** унифицированы классы, изображения и alt-тексты с EN/RU версиями.

---

## 2. i18n — НЕПЕРЕВЕДЁННЫЙ ТЕКСТ

**[I18N-1] ~~ID index.html: "From $119K" не переведено~~ ✅ РЕШЕНО**
- ~~`id/index.html:69` — "From $119K" на английском.~~
- **Исправлено:** заменено на "Mulai $119K".

**[I18N-2] ID index.html: "A Global Bali Home Development" — ❌ НЕ НУЖНО**
- Бренд-слоган, намеренно на английском во всех языковых версиях. Премиальный брендинг.

**[I18N-3] Бейдж "Premium" на RU и ID — ❌ НЕ НУЖНО**
- Международное слово, понятно на всех языках без перевода.

**[I18N-4] ~~ID gallery.html: alt-тексты noscript~~ ✅ РЕШЕНО (BUG-5)**
- **Исправлено в BUG-5.**

**[I18N-5] ~~RU/ID about.html: JSON-LD отсутствует numberOfEmployees~~ ✅ РЕШЕНО**
- ~~Schema не содержала numberOfEmployees в RU и ID версиях.~~
- **Исправлено:** добавлен блок numberOfEmployees в обе версии.

---

## 3. SEO

**[SEO-1] Нет страницы Privacy Policy**
- Формы содержат чекбоксы consent со ссылкой на Privacy Policy, но самой страницы нет.
- Требуется для GDPR и обработки данных.
- **Фикс:** создать privacy-policy.html (EN/RU/ID), добавить ссылку в footer.

**[SEO-2] ~~Заголовки проектных страниц слишком короткие~~ ✅ РЕШЕНО**
- ~~Были 37-38 символов без ключевых слов.~~
- **Исправлено:** EN "Serenity Villas in Bali from $335K — Global Bali Home" (55 символов), аналогично RU и ID. Все 9 файлов (title + og:title + twitter:title).

**[SEO-3] ~~Заголовки projects.html и contacts.html слишком короткие~~ ✅ РЕШЕНО**
- ~~projects: 34 символа, contacts: 31 символ.~~
- **Исправлено:** EN "Bali Villa Projects from $119K to $580K" / "Contact Us | Free Bali Villa Consultation". Все 6 файлов (title + og:title + twitter:title).

**[SEO-4] ~~Meta description без CTA на большинстве страниц~~ ✅ РЕШЕНО**
- ~~about, projects, services — описания без призыва к действию.~~
- **Исправлено:** добавлены CTA во все 9 файлов (meta description + og:description + twitter:description). EN: "Schedule a free consultation" / "Request pricing" / "Get a free consultation".

**[SEO-5] Alt-тексты изображений слишком общие**
- `alt="Aerial view"`, `alt="Living room"`, `alt="Bathroom"` — без упоминания проекта или локации.
- **Фикс:** "Modern living room in Serenity Villas, Bali", "Aerial view of Serenity Estates complex".

**[SEO-6] ~~Нет JSON-LD LocalBusiness на contacts.html~~ ✅ РЕШЕНО**
- ~~Была только FAQPage schema, без LocalBusiness.~~
- **Исправлено:** добавлен RealEstateAgent JSON-LD с адресом, телефоном, email, geo, часами работы и соцсетями. Все 3 файла contacts.html.

**[SEO-7] Нет VideoObject schema для hero-видео**
- Главная, Why Bali, Wanayu секции используют `<video>`, но нет VideoObject structured data.
- **Влияние:** Низкое — Google может не индексировать видео.

---

## 4. CSS

**[CSS-1] ~~Захардкоженные цвета вне CSS-переменных~~ ✅ РЕШЕНО**
- ~~11 мест с хардкоженными цветами.~~
- **Исправлено:** добавлены переменные `--color-error`, `--color-error-light`, `--color-status-booked`, `--color-status-resale`, `--color-whatsapp`, `--color-presale`, `--color-hover-bg`. Все 14 вхождений заменены.

**[CSS-2] Нет print-стилей**
- Нет `@media print`. При печати: навигация, floating кнопки, анимации остаются.
- **Фикс:** добавить `@media print` — скрыть nav, footer, WhatsApp, sticky CTA.

**[CSS-3] Нет breakpoint для маленьких экранов (375px, 480px)**
- Текущие breakpoints: 1024px, 900px, 768px. Нет стилей для экранов < 768px.
- На iPhone SE (375px) могут быть проблемы с layout.
- **Фикс:** добавить `@media (max-width: 480px)` для критичных элементов.

**[CSS-4] ~~Мобильное меню без max-height~~ ✅ РЕШЕНО**
- ~~`.header__nav` без `max-height`, могло выйти за viewport.~~
- **Исправлено:** добавлено `max-height: calc(100vh - var(--header-height))`.

**[CSS-5] ~~Повторяющиеся rgba() значения без переменной~~ ✅ РЕШЕНО (CSS-1)**
- ~~`rgba(225, 217, 201, 0.05)` повторялся 4 раза.~~
- **Исправлено в CSS-1:** заменено на `var(--color-hover-bg)`.

---

## 5. JAVASCRIPT

**[JS-1] Квиз и exit popup: нет focus trap**
- **Суть:** Когда открыт квиз или exit popup, пользователь нажимает Tab и фокус уходит на элементы под модалом (ссылки в шапке, кнопки на странице). Скринридеры «не знают», что модал — главное окно.
- **Решение:** При открытии модала ограничить Tab только элементами внутри него. При закрытии — вернуть фокус на кнопку, которая открыла модал.

**[JS-2] ~~Квиз: progressbar не сообщает прогресс скринридерам~~ ✅ РЕШЕНО**
- ~~Атрибут `aria-valuenow` не обновлялся, скринридер всегда говорил "0%".~~
- **Исправлено:** `updateProgress()` теперь вычисляет процент и устанавливает `aria-valuenow`.

**[JS-3] Exit popup не показывается на мобильных**
- **Суть:** Exit popup срабатывает по `mouseleave` (курсор ушёл вверх к адресной строке). На телефонах нет мыши → popup никогда не покажется мобильным пользователям.
- **Решение:** Для мобильных добавить таймер — показать popup через 45-60 секунд на странице (если квиз не открыт и лид не захвачен).

**[JS-4] В лайтбоксе нельзя свайпать фото на телефоне**
- **Суть:** Галерея открывает полноэкранный лайтбокс. Листать фото можно стрелками и кнопками, но свайп пальцем влево/вправо не работает.
- **Решение:** Добавить обработчики `touchstart`/`touchend`, определять направление свайпа и переключать фото.

**[JS-5] ~~Параллакс hero дёргается на слабых телефонах~~ ✅ РЕШЕНО**
- ~~Scroll handler пересчитывал `translateY` на каждый скролл, вызывая jank на мобильных.~~
- **Исправлено:** параллакс отключён на экранах ≤768px через `matchMedia('(min-width: 769px)')`.

**[JS-6] ~~Для каждого availability bar создаётся отдельный observer~~ ✅ РЕШЕНО**
- ~~Создавался отдельный `IntersectionObserver` для каждого бара (до 12 штук).~~
- **Исправлено:** один общий observer, все бары добавлены через `observe()`. `unobserve` при срабатывании.

**[JS-7] ~~Галерея пересчитывает список фото при каждом клике~~ ✅ РЕШЕНО**
- ~~`querySelectorAll` + `map` вызывались на каждый клик по фото.~~
- **Исправлено:** массив кешируется, обновляется автоматически через `MutationObserver` при смене фильтра или загрузке новых фото.

---

## 6. МАРКЕТИНГ И КОНВЕРСИЯ

**[MKT-1] Нет Privacy Policy и Terms of Service**
- Критично для доверия и юридической защиты. Формы собирают email, телефон, имя.
- Чекбоксы consent ссылаются на "Privacy Policy" — ссылка должна работать.

**[MKT-2] Нет cross-linking между проектами**
- На странице project-serenity-villas.html нет секции "Other Projects" / "Вам также может понравиться".
- Потенциальный отток — если один проект не подходит, пользователь уходит.
- **Фикс:** добавить блок "Explore Other Projects" со ссылками на 2 других проекта.

**[MKT-3] Нет urgency-элементов на presale (Village)**
- Serenity Village — presale, но нет countdown таймера или "Limited Early Bird Pricing".
- **Фикс:** добавить визуальный индикатор presale-фазы с преимуществами.

---

## 7. ПРОИЗВОДИТЕЛЬНОСТЬ

**[PERF-1] Множество scroll-обработчиков**
- 3 отдельных scroll handler с rAF throttle (header, parallax, sticky CTA).
- **Фикс:** объединить в один scroll handler или использовать IntersectionObserver.

**[PERF-2] Gallery image load без preloading**
- Лайтбокс загружает следующее/предыдущее изображение только по клику.
- **Фикс:** preload next/prev image при открытии.

---

## 8. ACCESSIBILITY

**[A11Y-1] Мобильное меню: нет focus trap**
- При открытии бургер-меню Tab может уйти за пределы навигации.
- **Фикс:** добавить focus trap при открытии мобильного меню.

**[A11Y-2] Gallery alt-тексты генерируются из имён файлов**
- `main.js:603` — `img.alt = src.split('/').pop().replace(...)` — "villa a1 exterior" вместо описательного текста.
- **Фикс:** использовать описательные alt-тексты из GALLERY_DATA (если доступны).

---

## 9. ЧТО РАБОТАЕТ ХОРОШО (не трогать)

- **Hreflang** — идеальная реализация на всех 27 страницах
- **OG/Twitter Card теги** — полные на всех страницах
- **Canonical URLs** — правильные для каждого языка
- **Sitemap.xml** — полный, с hreflang аннотациями
- **robots.txt** — правильно блокирует /admin/, указывает sitemap
- **JSON-LD** — RealEstateAgent, RealEstateListing, FAQPage
- **data-contact** — динамические контакты на всех 27 страницах
- **Scroll animations** — IntersectionObserver, unobserve после триггера
- **Z-index** — чистая иерархия без конфликтов
- **Header/Footer** — идентичны на всех 27 страницах
- **Шрифты** — font-display через Google Fonts CDN
- **Безопасность** — все внешние ссылки с `target="_blank" rel="noopener noreferrer"`
- **Responsive** — viewport meta, основные breakpoints, iOS zoom prevention

---

## 10. СВОДКА ПО ПРИОРИТЕТАМ

### Критические (делать первыми)
| # | Пункт | Сложность |
|---|-------|-----------|
| BUG-1 | ROI калькулятор null checks | Низкая |
| BUG-2 | Утечка setInterval в countdown | Низкая |
| BUG-4 | --font-base не определена | Низкая |
| I18N-1 | "From $119K" не переведён в ID | Низкая |
| I18N-2 | Hero tag не переведён в ID | Низкая |

### Важные (делать во вторую очередь)
| # | Пункт | Сложность |
|---|-------|-----------|
| SEO-1/MKT-1 | Privacy Policy страница | Средняя |
| BUG-3 | Пустой catch на fetch | Низкая |
| BUG-5 | ID gallery noscript | Низкая |
| I18N-3 | Бейдж "Premium" не переведён | Низкая |
| SEO-2 | Заголовки проектов короткие | Низкая |
| SEO-3 | Заголовки projects/contacts короткие | Низкая |
| CSS-1 | Захардкоженные цвета | Низкая |
| CSS-4 | Мобильное меню max-height | Низкая |
| JS-3 | Exit intent для мобильных | Средняя |

### Средние (когда будет время)
| # | Пункт | Сложность |
|---|-------|-----------|
| JS-4 | Swipe в лайтбоксе | Средняя |
| JS-5 | Параллакс на мобильных | Низкая |
| CSS-3 | Breakpoint 480px | Средняя |
| SEO-4 | CTA в meta descriptions | Низкая |
| SEO-5 | Alt-тексты изображений | Низкая |
| MKT-2 | Cross-linking проектов | Средняя |

### Низкие (nice to have)
| # | Пункт | Сложность |
|---|-------|-----------|
| CSS-2 | Print стили | Низкая |
| CSS-5 | rgba() в переменную | Низкая |
| SEO-6 | JSON-LD LocalBusiness | Низкая |
| SEO-7 | VideoObject schema | Низкая |
| JS-1 | Focus trap в модалах | Средняя |
| JS-2 | aria-valuenow в квизе | Низкая |
| JS-6 | Один observer для bars | Низкая |
| JS-7 | Кеш gallery images | Низкая |
| PERF-1 | Объединить scroll handlers | Средняя |
| PERF-2 | Preload lightbox images | Низкая |
| A11Y-1 | Focus trap мобильного меню | Средняя |
| A11Y-2 | Gallery alt-тексты | Низкая |
| MKT-3 | Urgency для Village presale | Средняя |
| I18N-4 | ID gallery noscript alt | Низкая |
| I18N-5 | RU about.html JSON-LD | Низкая |

---

*Аудит проведён на основе анализа: 27 HTML-файлов, css/style.css (3506 строк), js/main.js (1785 строк), data-файлов.*
