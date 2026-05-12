# Global Bali Home — Design Tokens

Все токены из `css/style.css` `:root`. Публичный сайт — тёмная премиум-тема.

## Colors

### Backgrounds
- `--color-bg` — `#1a1a14` — основной тёмный фон
- `--color-bg-alt` — `#111110` — для чередования секций (.bg-alt)
- `--color-bg-card` — `#2a2a20` — карточки

### Brand
- `--color-cream` — `#F7F7F0` — светлый акцент
- `--color-accent` — `#6B8F4E` — оливковый/зелёный, главный бренд-цвет

### Text
- `--color-text` — `#E1D9C9` — тёплый бежевый, основной
- `--color-text-muted` — `rgba(225, 217, 201, 0.75)`
- `--color-text-dim` — `rgba(225, 217, 201, 0.5)`

### Borders
- `--color-border` — `rgba(225, 217, 201, 0.1)`
- `--color-border-hover` — `rgba(225, 217, 201, 0.25)`

### UI / Status
- `--color-hover-bg` — `rgba(225, 217, 201, 0.05)`
- `--color-error` — `#c0392b`
- `--color-whatsapp` — `#25D366`
- `--color-presale` — `#d99331`

## Typography

- **Headings**: `Playfair Display`, Georgia, serif
- **Body**: `Montserrat`, sans-serif
- Base: `1rem = 18px` (html font-size: 112.5%)

### Scale
- `--font-xs` — `0.75rem` (13.5px) — labels, tags, buttons
- `--font-sm` — `0.85rem` (15.3px) — nav, body text, inputs
- `--font-md` — `1.2rem` (21.6px) — h4, prices, card titles
- `--font-xl` — `1.75rem` (31.5px) — stat numbers
- `--font-2xl` — `2rem` (36px) — decorative numbers
- `--font-3xl` — `2.5rem` (45px) — large accents

Для заголовков H1–H3 используется `clamp()` (responsive scaling).

## Layout

- `--max-width` — `1280px`
- `--header-height` — `80px`

### Spacing (responsive)
| Token | Desktop | Tablet (≤1024px) | Mobile (≤768px) |
|-------|---------|------------------|-----------------|
| `--section-padding` | 120px | 80px | 60px |
| `--side-padding` | 80px | 40px | 20px |

## Transitions
- `--transition` — `0.3s ease`
- `--transition-slow` — `0.6s ease`

## Component patterns

- **BEM naming**: `block__element--modifier`
- **SVG icons**: `stroke: currentColor; stroke-width: 1.5; fill: none` (outline only)
- **Cards**: `--color-bg-card` background, `--color-border` outline, lift on hover via `box-shadow` (НЕ scale — ломает absolute children)
- **Section alternation**: `.bg-alt` для альтернативных секций
- **Scroll reveals**: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-stagger` + IntersectionObserver добавляет `.visible`
- **Number counters**: атрибут `data-counter` на элементе

## Buttons (визуально)

- **Primary CTA**: фон `--color-accent`, текст cream, hover — затемнение
- **Secondary**: outline `--color-border`, text `--color-text`, hover — fill бежевым
- **WhatsApp floating**: круглая, фон `--color-whatsapp`, fixed bottom-right
