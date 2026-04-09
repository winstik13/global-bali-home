# STRUCTURE.md

Единый источник истины по структуре сайта Global Bali Home. Что где находится, какие решения утверждены, что динамично, что осталось открытым.

**Scope**: 27 страниц (9 EN + 9 RU + 9 ID) + admin-панель.

---

## 1. Общие элементы (все 27 страниц)

| Элемент | Что это | Где настраивается |
|---|---|---|
| **Header** | Logo + nav (Home / Projects / Services / About / Gallery / Contact) + language dropdown (EN/RU/ID) + CTA "Find My Villa" (`data-quiz`) + hamburger на мобильных | HTML: `.header.header--transparent` |
| **Footer** | Бренд + nav + проекты + контакты + соцсети (SVG) + copyright. Honeycomb-паттерн фоном | HTML: `.footer` + `SITE_DATA.social` / `.contact` |
| **WhatsApp float** | Плавающая кнопка справа снизу. Класс `.lifted` при видимости Sticky CTA | `SITE_DATA.contact.whatsapp` |
| **Quiz popup** | 3-шаговый квиз (цель → бюджет → сроки → рекомендация проекта + контактная форма). DOM-инъекция из `main.js` | Триггеры: `[data-quiz]`, `.cta-section .btn--primary:not([data-tour])` |
| **Tour popup** | Запись на показ. Если триггер `data-tour="Project Name"` — пропускает шаг выбора проекта | Триггеры: `[data-tour]` |
| **Exit Intent popup** | Попап при уходе со страницы (`mouseleave` + задержка, только десктоп). Lead magnet "Investment Guide" | `SITE_DATA.exitPopup` |
| **Sticky CTA** | Фиксированная кнопка внизу экрана (только мобильный, появляется после прокрутки hero). На проектных страницах → tour, на остальных → quiz | Автоматически по странице |

---

## 2. Мультиязычность

| Язык | Путь | Примечание |
|---|---|---|
| **EN** | `/*.html` (корень) | x-default для hreflang |
| **RU** | `/ru/*.html` | Префикс `../` для ресурсов |
| **ID** | `/id/*.html` | Префикс `../` для ресурсов |

- Все 3 версии **структурно идентичны**, отличается только текстовый контент
- Языковой dropdown в header позволяет переключаться между версиями одной и той же страницы
- hreflang теги: EN / RU / ID + x-default (на EN)
- Внешние ссылки — всегда `target="_blank" rel="noopener noreferrer"`

---

## 3. Data layer — централизованные источники

Вся динамика на сайте привязана к 4 data-файлам в `data/`:

| Файл | Что содержит | Где применяется |
|---|---|---|
| **`data/projects-data.js`** | `PROJECTS_DATA` — 3 проекта с полными данными (hero stats, units[], positioning, availability, showcaseMeta, floorPlans, heroStats) + глобальные labels (statusLabels, comparisonLabels, availabilityLabels) | Везде где есть `data-project="serenity-X"` — hero stats, showcase cards, master plan, unit tables, availability bars, comparison table, final CTA с dynamic scarcity |
| **`data/site-data.js`** | `SITE_DATA` — контакты, соцсети, stats, ROI параметры, PDF паттерны | `data-stat="key"`, `data-contact`, `data-scenario`, `data-usd` |
| **`data/faq-data.js`** | `FAQ_DATA` — 12 FAQ с EN/RU/ID переводами | `.faq-list` с `data-faq-ids="2,4,..."` |
| **`data/testimonials-data.js`** | `TESTIMONIALS_DATA` — отзывы с EN/RU/ID | `[data-testimonials-container]`, `data-testimonials-ids` |

**Принцип**: данные правятся через админку или напрямую в JS-файлах, HTML-страницы становятся тонким шаблоном, вся конкретика тянется из data при загрузке.

---

## 4. Страницы сайта

### index.html — **Landing**
Порядок: Hero (видео-фон) → Featured Projects → Stats → Why Bali → Testimonials → ROI Calculator → About Intro → Photo Mosaic → Lead Magnet → Final CTA.

Ключевая точка входа, содержит все якоря воронки. 10 секций.

### projects.html — **Catalog**
Порядок: Hero (breadcrumbs + H1) → Project Showcases (3 карточки через `data-projects-container`) → **Comparison Table** (через `data-dynamic`, перерисовывается из `PROJECTS_DATA`) → Testimonials → Wanayu Territory (видео) → Final CTA.

Роль: обзорная витрина, даёт покупателю сравнить 3 проекта side-by-side. Comparison table полностью dynamic.

### project-serenity-villas.html / estates.html / village.html — **Product** ⭐
**Утверждённая 9-блочная research-driven структура** (см. Раздел 5). Применяется ко всем 3 проектам с вариациями (см. Раздел 6).

### about.html — **Info**
Our Story → Stats Grid → Mission & Vision → Timeline → Meet Founder → CTA. Статическая страница с историей компании.

### services.html — **Info**
Hero → What We Offer (6 service-cards) → Trusted Partnerships → CTA. Презентует услуги кроме девелопмента (management, consulting, etc.).

### gallery.html — **Showcase**
Hero → Gallery Filters (All / Villas / Estates / Village + счётчик) → Masonry Grid (данные из `gallery-data.js`) → Lightbox (prev/next/close) → CTA.

### contacts.html — **Conversion**
Hero → **FAQ** (9 вопросов аккордеоном, `faq-list` без filter → показывает все) → Contact Form + Info (split: форма + карта + WhatsApp/email/address) → **нет отдельной CTA секции** (форма сама и есть CTA).

Текущий лучший конверсионный блок на сайте.

---

## 5. ⭐ Project Template — утверждённая 9-блочная структура

**Статус: ✅ ЗАВЕРШЕНА.** Применена ко всем 3 проектным страницам × 3 языка = 9 HTML файлов.

### Порядок блоков (research-driven)

```
1. Hero
2. Project Overview (Why [Project])
3. Pick Your Villa (Master Plan + Availability + Unit Table)
4. Inside (Floor Plans + Photo Mosaic)
5. The Place (Map + Place Ribbon)
6. Who's Building This (Trust / Founder)
7. ROI Calculator
8. Answered (FAQ)
9. Final CTA
```

### Логика порядка

Структура основана на ресерче по LP конверсии (NN/G scroll depth, HubSpot trust-before-scarcity, Zillow patterns):

- **Hero** — зацепить за 3 секунды (AIDA: Attention)
- **Project Overview** — 3 proj-specific карточки (AIDA: Interest, proof points)
- **Pick Your Villa** — визуальный master plan + таблица юнитов (AIDA: Desire, "я могу выбрать свой юнит")
- **Inside** — планировки + интерьеры (AIDA: Desire intensified)
- **The Place** — локация как verification (не как scarcity trigger — противоречит research)
- **Who's Building This** — trust перед scarcity (research: buyers doubt → need credibility first)
- **ROI Calculator** — рациональное оправдание (AIDA: Desire → Action bridge)
- **FAQ** — снятие возражений перед CTA
- **Final CTA** — единственная action-точка с dynamic scarcity

### Детализация блоков

#### 1. Hero
- **Класс**: `.fullbleed-hero`
- **Содержит**: фоновое изображение проекта + gradient overlay → subtitle (positioning + texture) → H1 (название) → hero-stats (3 stats, dynamic из data) → primary CTA `Schedule a Private Tour`
- **Важно**: subtitle **НЕ дублирует** stats. Stats = цифры, subtitle = позиционирование
- **Пример для Villas**: *"Boutique Yield Play — Passive Income in the Ubud Jungle"* + stats `12 Villas · Q2 2026 · 12–15% Yield`

#### 2. Project Overview — "Why [Project]"
- **Класс**: `.section` + `.services-grid.services-grid--bordered`
- **Содержит**: H2 с proj-specific позиционированием (*"Built for Boutique Yield"* / *"Built for Capital Growth"* / *"Built for Cashflow"*) → 3 service-cards, адаптированных под buyer persona каждого проекта
- **Карточки адаптируются** (см. Раздел 6 для деталей)

#### 3. Pick Your Villa — Master Plan + Availability + Unit Table
- **Класс**: `.section.bg-alt`
- **Содержит**:
  - `.section-header--master-plan` с динамическим H2 (*"Only X villas remain"* — рассчитывается в `buildMasterPlanTitle()` с пл­юрализацией для RU)
  - `.master-plan` с `data-master-plan="serenity-X"` — интерактивное изображение с clickable hotspots
  - `.master-plan__legend` со статус-бейджами (Available / Booked / Resale / Sold — Village показывает только Available/Sold)
  - `.availability-bar` с unified scarcity framing: *"Only X of Y units left · Z% sold"*
  - `.unit-filter` с toggle Available / All units
  - Unit table через `[data-project]` — рендерится автоматически из `proj.units`
- **Hotspots**: координаты хранятся в `MASTER_PLAN_POSITIONS` в `main.js`. Click → bottom sheet с деталями юнита. Sold dimmed.

#### 4. Inside — Floor Plans + Photo Mosaic
- **Класс**: `.section` + `#floor-plans`
- **Содержит**:
  - `.floor-plans-showcase` с `data-project` — tabs (types) + panel с image + specs + tagline. Если пути пустые → placeholder "Coming Soon" (Village сейчас в этом состоянии, ждём планы)
  - `.photo-mosaic` — 5 фото asymmetric grid
  - `.photo-mosaic__more` — кнопка "View All Villa Photos" → `gallery.html#project-slug`
  - `.tour-cta-inline` — *"Like what you see? Come walk through in person."* + CTA

#### 5. The Place — Location verification
- **Класс**: `.section.bg-alt`
- **Содержит**:
  - H2 — **разный по каждому проекту** (см. Раздел 6)
  - `.place-compact` с Google Maps iframe (driving directions Tepi campuhan ubud → Bedulu)
  - `.place-ribbon` — 6 distance-пунктов: Ubud Center (~10 min) / Goa Gajah (~5) / Tegallalang (~20) / Sanur (~50) / Canggu (~60) / DPS Airport (~75)
  - Знак `~` — всегда. Приблизительно, зависит от трафика

#### 6. Who's Building This — Trust / Founder
- **Класс**: `.section`
- **Содержит**:
  - H2 *"Backed by $1B+ of Wall Street Experience"*
  - `.trust-founder` — фото Mark Feldman + bio + 4 stats ($1B+ transactions / 25 years Wall Street / 15+ years construction / CAR insured) + link to about
  - **Villas / Estates**: `.testimonials__grid--solo` с одним client testimonial (Mitchell / Chen)
  - **Village**: без testimonial (нет реального клиента для pre-handover проекта)
- **⚠️ Flagged for full redesign** — пользователь хочет переделать блок целиком, но решение отложено

#### 7. ROI Calculator
- **Класс**: `section[data-roi-calc][data-project]`
- **Полностью dynamic** — рендерится из `SITE_DATA.roi` + `proj.availability` + `proj.units`. 3 сценария (conservative/normal/optimistic) + occupancy слайдер + USD/IDR dual display

#### 8. Answered — FAQ
- **Класс**: `.section` + `.faq-list` с `data-faq-ids`
- **H2**: *"What Buyers Ask Before They Sign"*
- **Проектно-специфичные наборы из 5 вопросов**:

| Проект | FAQ IDs | Что покрывает |
|---|---|---|
| **Villas** | `2, 4, 10, 6, 7` | Legal / Management / Yield mechanics / **Buying process** / Risks |
| **Estates** | `2, 9, 11, 6, 7` | Legal / Resale / Capital appreciation / **Buying process** / Risks |
| **Village** | `2, 12, 4, 6, 7` | Legal / Deposit protection / Management / **Buying process** / Risks |

**FAQ 2 и 7** — общие якоря (universal legal + risks). **FAQ 6** — процесс покупки (унифицировано, та же информация для всех). Оставшиеся 2 — специфика проекта.

FAQ 6 выполняет роль "Process / How It Works" — покрывает 5-шаговый flow без отдельного визуального блока.

#### 9. Final CTA
- **Класс**: `.cta-section` + `data-final-cta data-project`
- **Полностью dynamic** — title и desc пересобираются в `main.js` на основе `proj.units.filter(u => u.status === 'available').length`
- **Title pattern** (с пл­юрализацией):
  - EN: `"Only X Villa(s) Left"`
  - RU: `"Осталось всего X вилла/виллы/вилл"`
  - ID: `"Hanya tersisa X vila"`
- **2 кнопки**: primary `Schedule a Private Tour` (→ tour popup) + outlined `Get Personalized Pricing` (→ quiz popup)

---

## 6. Вариации по проектам

Некоторые блоки отличаются между тремя продуктовыми страницами.

### Hero (3 stats)

| Проект | Stats |
|---|---|
| **Villas** | `12 · Villas` / `Q2 2026 · Handover` / `12–15% · Yield` |
| **Estates** | `4 · Villas` / `Q1 2027 · Handover` / `12–15% · Yield` |
| **Village** | `25 · Villas` / `Q1/Q2 2027 · Handover` / `$119K+ · From` |

Village заменяет Yield на `$119K+ From` — это его ключевой pitch (lowest ticket).

### Project Overview — 3 карточки

| Card | Villas | Estates | Village |
|---|---|---|---|
| **01** | Turnkey Rental Program · 80%+ Occupancy | Prime Ubud Land · 14 Are Max Plot | Entry from $119K · Lowest Entry Ticket |
| **02** | 12–15% Projected Yield · Underwritten Numbers | 60-Year Secured Leasehold · Fully Notarized | Shared Pool & Onsite Cafe · Premium Amenities |
| **03** | CAR-Insured Build · Zero Build Risk | CAR-Insured Build · Zero Build Risk | Turnkey Rental Program · 80%+ Occupancy |

Логика: каждая карточка отвечает на **#1 вопрос** buyer-persona этого проекта. Общие для всех (leasehold, CAR) используются только там где они реально ключевые.

### Master Plan

| Проект | Units | Layout |
|---|---|---|
| **Villas** | 12 | 3×4 grid (A/B/C types × 4 rows) |
| **Estates** | 4 | Asymmetric (A2/B2 top, A1/B1 bottom) |
| **Village** | 25 | 2 cluster — left side 1-19 (Q1 2027) + right side 20-25 (Q2 2027), с пустой зоной посередине (pool/cafe) |

Village не имеет booked/resale юнитов → legend показывает только Available/Sold.

### Place H2

| Проект | H2 |
|---|---|
| **Villas** | *"Jungle Quiet, ~10 Minutes from Ubud"* |
| **Estates** | *"Prime Ubud Corridor, Framed by Rice Terraces"* |
| **Village** | *"Ubud Access at Entry Pricing"* |

Каждый заголовок отражает angle своего проекта (peaceful rental / premium land / value entry).

### Trust — solo testimonial

| Проект | Testimonial |
|---|---|
| **Villas** | ✅ Mitchell (`data-testimonials-ids="1"`) |
| **Estates** | ✅ Chen (`data-testimonials-ids="2"`) |
| **Village** | ❌ Нет (pre-handover, нет реального клиента) |

---

## 7. Admin Panel (`admin/index.html`)

Отдельный SPA с авторизацией через GitHub PAT. Управление контентом через Firebase + GitHub API (PR-based commits).

### Вкладки

| Вкладка | Что редактируется |
|---|---|
| **Dashboard** | Сводка проектов (юниты, sold, booked, available, revenue, potential), карточки проектов |
| **Projects** | Редактор юнитов (статусы, цены, типы). Auto-recompute availability + `syncShowcaseAvailability()` |
| **SEO** | Meta теги (title, description, OG) по страницам и языкам |
| **FAQ** | Редактор вопросов/ответов × 3 языка |
| **Testimonials** | Редактор отзывов × 3 языка |
| **Analytics** | Events, goals |
| **Exit Popup** | Настройки exit-intent |
| **Settings** | Contact, Social, Exchange Rate, Investment Guide PDF, Stats, ROI parameters, Colors |

### i18n
Админка поддерживает EN/RU (не ID) через переключатель. Переводы в `ADMIN_I18N` в `admin.js`. Admin design system отдельная от публичного сайта — см. [admin/CLAUDE.md](admin/CLAUDE.md).

---

## 8. Открытые вопросы и неявные долги

### ✅ Закрыто
- 9-блочная structure для project pages — applied, validated
- Dynamic hero stats (3 items), scarcity frame, final CTA с count
- FAQ разделение по проектам + FAQ 6 (buying process)
- Unified dash typography (en-dash везде)
- `~` префикс для всех distance/time значений
- Place H2 разделение по проектам
- Consolidated site structure (этот файл)

### 🟡 Known debts (ждут внешних данных)
- **Village floor plans** — сейчас placeholder "Coming Soon". Ждём реальные PNG от архитектора. Когда будут — просто заполнить пути в `data/projects-data.js`, блок автоматически активируется
- **Village testimonial** — нет реального клиента (pre-handover). Добавим когда будет первый handover
- **Trust block redesign** — пользователь флагнул полный редизайн, но решение отложено. Текущий блок работоспособен

### 🟢 Известные мелочи (не блокеры)
- **Service cards orphan на планшете** (1024-768px, 3 карточки в 2-кол grid) — третья карточка одна во втором ряду
- **Service card stats не bottom-aligned** — flex + margin-top auto решит

### 🔮 Templates для других типов страниц
Деталь­ные templates для Landing/Catalog/Info/Conversion не описаны. Текущие страницы работают, но формального "контракта" нет. Можно сделать в будущем.

---

## История решений

**Research-based 9-block order** (вместо оригинального 14-block) принят на основании данных NN/G (scroll depth), HubSpot (trust-before-scarcity), Zillow (typical buyer flow). Приоритет: визуальный Master Plan как основной хук, Trust перед scarcity, Place как verification. Сохранено в memory [reference_lp_structure_research.md](../../Users/Winst/.claude/projects/d--CLODE/memory/reference_lp_structure_research.md).

**Process block как FAQ вместо отдельной секции** — решение сохранять чистоту страницы, использовать существующую FAQ 6 (buying process) вместо визуального timeline. Покрывает need без добавления ещё одной секции.

**Pre-sale убрано у Village** — проект перешёл в `in-progress` статус после заполнения реальных данных из sales tracker. Pre-sale banner удалён, master plan стал интерактивным с 25 юнитами.

---

*Last updated: 2026-04-09 — после завершения всех P0/P1/P2 фиксов, unified scarcity framing, FAQ split + Process addition.*
