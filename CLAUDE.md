# CLAUDE.md

Этот файл содержит инструкции для Claude Code (claude.ai/code) при работе с кодом в этом репозитории.

## Обзор проекта

Global Bali Home — многостраничный маркетинговый сайт премиального девелопера недвижимости на Бали. Чистый HTML/CSS/JS, без фреймворков и сборщиков.

## Архитектура

- **9 HTML-страниц** в корне (EN) + зеркала в `ru/` (RU), `id/` (Bahasa Indonesia) — **27 страниц всего**.
  - Страницы: `index.html`, `about.html`, `projects.html`, `services.html`, `gallery.html`, `contacts.html`, `project-serenity-villas.html`, `project-serenity-estates.html`, `project-serenity-village.html`
  - Коды языков: `en` (корень), `ru/`, `id/`
- **`css/style.css`** — вся дизайн-система публичного сайта: CSS-переменные, тёмная тема, компоненты, responsive (1024px, 768px)
- **`css/reset.css`** — стандартный CSS reset
- **`js/main.js`** — вся интерактивность сайта (скролл, меню, анимации, галерея, формы, попапы, калькулятор)
- **`data/site-data.js`** — централизованные данные проекта (статистика, курс валют, ROI, exit popup тексты). Редактируется через админку.
- **`gallery-data.js`** — автогенерируемый манифест изображений галереи
- **`generate-gallery.ps1`** — PowerShell-скрипт для генерации `gallery-data.js`
- **`Base info.md`** — справочный файл с актуальными данными проектов. Сначала обновлять этот файл, затем синхронизировать в HTML.

### Админка (`admin/`)

- **`admin/index.html`** — SPA-интерфейс с вкладками (Dashboard, Projects ×3, SEO, FAQ, Testimonials, Analytics, Exit Popup, Settings)
- **`admin/admin.js`** — логика: загрузка/сохранение через GitHub API, i18n (EN/RU), dirty-tracking, live preview
- **`admin/admin.css`** — стили админки (отдельная дизайн-система, см. секцию ниже)
- Данные сохраняются коммитом в `data/site-data.js` через GitHub API

### JS-инжектируемые компоненты (DOM создаётся в main.js)

- **Квиз-попап** — квалификация лида (цель → бюджет → сроки → рекомендация + форма). Вызов: `[data-quiz]` или `.cta-section .btn--primary:not([data-tour])`.
- **Tour-попап** — запись на показ недвижимости (проект → сроки → интересы → форма). Вызов: `[data-tour]` или `[data-tour="Project Name"]` (пропускает шаг выбора проекта).
- **Exit intent попап** — на `mouseleave` (десктоп) после задержки. Тексты/настройки из `SITE_DATA.exitPopup`.
- **Sticky CTA бар** — нижняя панель на мобильных. На страницах проектов открывает tour, на остальных — quiz.

## Деплой

- **GitHub Pages**: ветка `master` → https://winstik13.github.io/global-bali-home/
- **GitHub CLI**: `"C:\Program Files\GitHub CLI\gh.exe"` (не в PATH для bash, использовать полный путь)
- **Push = деплой** (~1-2 мин)

## Разработка

Нет шага сборки. Открыть `.html` в браузере. Генерация галереи:
```
powershell -ExecutionPolicy Bypass -File generate-gallery.ps1
```

Сжатие изображений (FFmpeg, макс. 1920px):
```
"C:\Users\Winst\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe" -i input.jpg -vf "scale='min(1920,iw)':-1" -q:v 4 -update 1 -y output.jpg
```

## Правила разработки

### Обязательные (нарушение ломает сайт или UX)

- **27 страниц**: изменения в шапке, подвале, WhatsApp-кнопке — реплицировать на все 9 EN + 9 RU + 9 ID файлов
- **Относительные пути в `ru/`, `id/`**: префикс `../` для CSS, JS, изображений, видео. Навигация — без префикса (`index.html`, не `../index.html`). Языковой переключатель — `../` для EN, `../ru/`, `../id/` для остальных.
- **Внешние ссылки**: всегда `target="_blank" rel="noopener noreferrer"`
- **Изображения ниже fold**: `loading="lazy"`
- **SEO**: каждая страница — `<title>`, `<meta description>`, OG, Twitter Card, canonical, favicon. Проекты и контакты — JSON-LD.

### Стилевые (нарушение портит визуал)

- **Чередование фона секций**: `.bg-alt` для альтернативных секций, не допускать слияния
- **БЭМ-нейминг**: `block__element--modifier`
- **SVG-иконки**: `stroke: var(--color-accent); stroke-width: 1.5; fill: none`
- **Scroll-анимации**: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-stagger` + IntersectionObserver добавляет `.visible`
- **Счётчик чисел**: атрибут `data-counter`
- **Порядок навигации**: Home, Projects, Services, About, Gallery, Contact + CTA + язык

## Дизайн-система: отступы и типографика

Сайт и админка используют **разные** системы. Не смешивать.

### Публичный сайт (`css/style.css`)

- **Масштаб**: крупный, маркетинговый. Секции 80–120px, внутри 20–40px.
- **Токены**: `--section-padding`, `--side-padding`. Спейсинг-токенов `--sp-*` нет.
- **Типографика**: `--font-heading` (Playfair Display), `--font-body` (Montserrat). Размеры через `clamp()`.

### Админка (`admin/admin.css`)

- **Масштаб**: компактный, утилитарный.
- **Спейсинг-токены** (base 4px): `--sp-xs: 4px`, `--sp-sm: 8px`, `--sp-md: 16px`, `--sp-lg: 24px`, `--sp-xl: 32px`, `--sp-2xl: 48px`
- **Типографика лейблов**: `--label-size: 0.75rem`, `--label-weight: 600`, `--label-spacing: 0.1em`, uppercase, `color: var(--color-text-dim)`

#### Иерархия отступов админки:

| Элемент | Свойство | Значение |
|---------|----------|----------|
| `.admin-tab h2` | margin-bottom | 28px |
| `.editor-section` | padding / margin-bottom | `--sp-lg` (24px) |
| `.editor-section h3` | margin-bottom | `--sp-lg` (24px) |
| `.form-group` | margin-bottom | `--sp-md` (16px) |
| `.form-group` | gap (label→input) | `--sp-sm` (8px) |
| `.form-grid` | margin-bottom | `--sp-md` (16px) |
| `.form-grid` | gap | 20px 16px |

#### Обязательные правила админки:

1. `.form-group` и `.form-grid` получают `margin-bottom` автоматически через CSS. Внутри `.form-grid` margin обнуляется.
2. Внутри `.editor-section` — защитный ритм `> * + * { margin-top: --sp-md }`.
3. Лейблы — только через `.form-group label`. Не стилизовать инлайном.
4. **Inline styles запрещены** для grid, margin, padding. Использовать `.form-grid`, `.form-grid--3`, `.form-grid--4`.
5. Новые секции оборачивать в `.editor-section` с `<h3>`.

## Коммуникация

Все инструкции и объяснения — на русском языке (по предпочтению пользователя).
