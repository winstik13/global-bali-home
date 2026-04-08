# STRUCTURE.md

Утверждённые шаблоны структур страниц Global Bali Home.
Служит контрактом между сессиями планирования и реализации.

---

## Product Template (villas / estates / village)

**Утверждено.** Применяется к 3 project-страницам с небольшими вариациями.

### Порядок блоков

```
1.  Hero (с inline scarcity strip)
2.  Concept
3.  Location
4.  Trust / Developer (с embedded progress photo)
5.  Features
6.  Master Plan                         [опционально — нет на village]
7.  Availability
8.  Floor Plans
9.  Investment Logic / ROI
10. Gallery
11. FAQ
12. Process / How It Works
13. Testimonials
14. Final CTA
```

### Логика воронки

```
Hero                                       = ЗАЦЕПИТЬ  (3 сек)
Concept → Location → Trust                 = УБЕДИТЬ   (эмоция → место → люди)
Features → Master Plan → Availability
  → Floor Plans → ROI → Gallery            = ПОКАЗАТЬ  (продукт)
FAQ → Process → Testimonials               = ОПРАВДАТЬ (вопросы → страх → соц. пруф)
Final CTA                                  = ЗАКРЫТЬ
```

---

### Описание блоков

#### 1. Hero
- **Цель:** за 3 секунды ответить: где, что, сколько, когда
- **Содержит:**
  - Фоновое изображение/видео проекта
  - Breadcrumbs
  - Subtitle-оффер с конкретикой (не описание атмосферы)
  - H1 — название проекта
  - Hero-stats: 5 фактов (units / bedrooms / handover / price from / yield)
  - 2 CTA: primary (Tour) + secondary (Details)
  - **Scarcity-строка под CTA** (встроена): *«Only X villas remain · Handover QX 20XX»*

#### 2. Concept
- **Цель:** эмоциональный якорь — почему проект существует
- **Содержит:**
  - Split-section (фото + текст)
  - Тег секции
  - H2 — обещание, не название
  - 2 коротких абзаца с фактами (ары, материалы, архитектурный принцип)
  - 3-4 key facts в строку (высота потолков / материал / leasehold срок / warranty)

#### 3. Location
- **Цель:** ответ на «где это и насколько ликвидно»
- **Содержит:**
  - Статичная карта или Google Maps iframe
  - 5-6 distance-пунктов (Canggu, Seminyak, Airport, пляж, ресторан, центр района)
  - 1-2 строки про район
  - Маленькие иконки рядом с пунктами (опционально)

#### 4. Trust / Developer
- **Цель:** ответ на «кто строит и почему им доверять»
- **Содержит:**
  - Фото основателя (Mark Feldman)
  - Короткая bio: 2 строки
  - 4 key stats ($1B+ / 25 years Wall Street / 15+ years construction / CAR insured)
  - Логотипы партнёров (страховщик, notary, management)
  - **Embedded: progress photo** с датой «Last updated: XXX» (для активных строек)
  - Ссылка на About: *«Read our full story»*

#### 5. Features
- **Цель:** что именно входит в покупку
- **Содержит:**
  - 6 карточек в стиле `service-card` (номер + иконка + H3 + описание 2-3 строки + маленький stat)
  - Настоящие дифференциаторы, не базовые ожидания
  - Примеры: *Turnkey rental program / Freehold-equivalent leasehold / Developer warranty / Premium materials / 24/7 security / Wanayu access*

#### 6. Master Plan *(опционально)*
- **Цель:** структура комплекса + интерактивный выбор юнита
- **Содержит:** интерактивный план с hotspot'ами
- **Для кого:** villas, estates. Village — нет (pre-sale)

#### 7. Availability
- **Цель:** финальный выбор конкретного unit
- **Содержит:**
  - Availability bar (X of Y sold · %)
  - Табличка юнитов: Unit / Type / Area / Land / Status / Price (USD + IDR)
  - Toggle *«Show available only»*
  - Кликабельные строки → tour popup с предзаполненным юнитом

#### 8. Floor Plans
- **Цель:** визуализация жизни внутри
- **Содержит:** tabs + panel с чертежом + specs + tagline (текущая реализация)

#### 9. Investment Logic / ROI
- **Цель:** рациональное оправдание цены
- **Содержит:**
  - Короткое объяснение «как работает доход» (rental partner + split + occupancy + expected yield)
  - ROI Calculator (текущий)
  - Пример расчёта: *«$335K villa → $40-50K/year → 7-8 yr payback + 8-12% appreciation»*

#### 10. Gallery
- **Цель:** максимум визуальных доказательств перед CTA
- **Содержит:**
  - 10-12 фото
  - Категории/табы: Exterior / Interiors / Amenities / Construction *(опционально)*
  - Ссылка «View all X photos» → gallery.html с фильтром проекта

#### 11. FAQ
- **Цель:** снять последние логические возражения
- **Содержит:**
  - 5-6 вопросов (Legal/leasehold, ROI, Management, Buying process, Risks, Resale)
  - Accordion-формат (как на contacts.html)
  - Ссылка «More questions →» на contacts.html

#### 12. Process / How It Works
- **Цель:** снять страх неопределённости «что произойдёт после клика»
- **Содержит:**
  - 5-шаговый визуальный timeline: Tour → Reservation → Contract → Milestone payments → Handover
  - Иконки + короткое описание каждого шага
  - Общий срок (typical: 12-18 месяцев от reservation до handover)

#### 13. Testimonials
- **Цель:** социальное доказательство перед CTA
- **Содержит:**
  - 2-3 отзыва с фильтром по данному проекту (testimonials-data.js)
  - Имя, страна, фото, цитата
  - Видео — если есть

#### 14. Final CTA
- **Цель:** единственная конверсионная точка
- **Содержит:**
  - H2 — утверждение с scarcity (**не** вопрос)
  - 1 строка конкретики про next step (*«45-min private tour, hotel pickup included»*)
  - 2 CTA: primary (Tour) + secondary (Quiz)
  - Фоновое изображение или градиент с logo-watermark

---

### Variации по проектам

| Блок | Villas | Estates | Village |
|---|---|---|---|
| Master Plan | ✅ | ✅ | ❌ (pre-sale) |
| Progress photo в Trust | ✅ | ✅ | ❌ |
| Pre-sale banner (между Hero и Concept) | ❌ | ❌ | ✅ |
| Availability таблица | ✅ 12 units | ✅ 4 units | Unit Types + Register Interest |

---

## Landing Template (index.html)

_TBD — следующая сессия._

---

## Catalog Template (projects.html)

_TBD._

---

## Info Template (services.html / about.html)

_TBD._

---

## Conversion Template (contacts.html)

_TBD — сейчас это лучшая страница сайта, возможно не требует перестройки._
