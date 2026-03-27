# Global Bali Home — Typography & Design System

---

## Fonts

| Role     | Family            | Fallback          | Google Fonts |
|----------|-------------------|-------------------|--------------|
| Headings | Playfair Display  | Georgia, serif    | Weights: 400, 600 |
| Body     | Montserrat        | sans-serif        | Weights: 400, 500, 600 |

CSS variables:
```
--font-heading: 'Playfair Display', Georgia, serif
--font-body:    'Montserrat', sans-serif
```

---

## Color Palette

### Brand Colors (from Brandbook)
| Token              | Hex/Value                    | Usage                  |
|--------------------|------------------------------|------------------------|
| --color-dark       | #3B3B2E                      | Brand dark             |
| --color-beige      | #E1D9C9                      | Brand beige            |
| --color-green      | #4A5530                      | Brand green            |
| --color-deep-green | #1E2E1B                      | Brand deep green       |
| --color-cream      | #F7F7F0                      | Brand cream            |
| --color-accent     | #6B8F4E                      | Accent / CTA highlight |

### Theme Colors
| Token              | Value                        | Usage                    |
|--------------------|------------------------------|--------------------------|
| --color-bg         | #1a1a14                      | Page background          |
| --color-bg-alt     | #111110                      | Alternate section bg     |
| --color-bg-card    | #2a2a20                      | Card backgrounds         |
| --color-bg-elevated| #333328                      | Elevated surfaces        |

### Text Colors
| Token              | Value                        | Usage                          |
|--------------------|------------------------------|--------------------------------|
| --color-text       | #E1D9C9                      | Headings, accent text          |
| --color-text-muted | rgba(225, 217, 201, 0.75)    | Body text, links, descriptions |
| --color-text-dim   | rgba(225, 217, 201, 0.35)    | Small labels, copyright        |

### Border Colors
| Token                | Value                      | Usage                  |
|----------------------|----------------------------|------------------------|
| --color-border       | rgba(225, 217, 201, 0.1)   | Default borders        |
| --color-border-hover | rgba(225, 217, 201, 0.25)  | Hover borders          |

---

## Font Size Scale

4 unified steps for small/body text + clamp() for headings:

| Step  | Value   | px (at 18px base) | Role                                           |
|-------|---------|--------------------|------------------------------------------------|
| xs    | 0.75rem | 13.5px             | Labels, buttons, tags, badges, form labels     |
| sm    | 0.85rem | 15.3px             | Nav, descriptions, forms, footer, meta, tables |
| body  | 1rem    | 18px               | Hero text, body                                |
| md    | 1.1rem  | 19.8px             | FAQ questions, mobile nav, pre-sale banner     |

Larger sizes:

| Value     | Role                          |
|-----------|-------------------------------|
| 1.125rem  | h4, card prices               |
| 1.25rem   | Showcase prices, timeline |
| 1.75rem   | ROI calculator result values   |
| 2rem      | Why Bali stat numbers          |
| 2.5rem    | ROI calculator amount, Why Bali stat numbers (video bg) |
| 1.6rem    | Hero stat numbers             |
| 1.75rem   | Founder name, card titles     |
| 2rem      | Service card numbers (01-06)  |
| 1.1rem    | Service card stats            |

---

## Heading Sizes

| Element | Size                          | Weight | Spacing      | Line Height |
|---------|-------------------------------|--------|--------------|-------------|
| h1      | clamp(3rem, 6vw, 5.5rem)     | 400    | -0.02em      | 1.2         |
| h2      | clamp(2rem, 4vw, 3.5rem)     | 400    | -0.02em      | 1.2         |
| h3      | clamp(1.5rem, 3vw, 2.25rem)  | 400    | -0.02em      | 1.2         |
| h4      | 1.125rem                      | 600    | -0.02em      | 1.3         |

- h1-h3: Playfair Display
- h4-h6: Montserrat

---

## Body Text

| Element       | Size    | Weight | Color              | Line Height | Max Width |
|---------------|---------|--------|--------------------|-------------|-----------|
| body          | 18px    | 400    | --color-text       | 1.6         | -         |
| p             | inherit | 400    | --color-text-muted | -           | 65ch      |

---

## Font Weights

| Weight | Usage                                         |
|--------|-----------------------------------------------|
| 400    | Body text, headings (h1-h3), footer, hero     |
| 500    | Navigation, stat labels                       |
| 600    | h4-h6, buttons, labels, tags, badges, banners |

---

## Letter Spacing

| Value  | Usage                                  |
|--------|----------------------------------------|
| 0.05em | Pre-sale banner                        |
| 0.1em  | Hero stat labels, service stats, social|
| 0.15em | Buttons, nav, labels, badges, tables   |
| 0.2em  | Footer headings, mobile nav            |
| 0.3em  | Section tags, hero subtitle/tag        |

---

## Component Typography

### Header Navigation
| Property       | Desktop | Mobile (768px) |
|----------------|---------|----------------|
| Font size      | 0.85rem | 1.1rem         |
| Font weight    | 500     | 500            |
| Letter spacing | 0.15em  | 0.2em          |

### Buttons
| Size     | Weight | Spacing | Padding   | Border Radius |
|----------|--------|---------|-----------|---------------|
| 0.75rem  | 600    | 0.15em  | 14px 36px | 2px           |

| Variant   | Background      | Text           | Border               |
|-----------|-----------------|----------------|----------------------|
| --primary | --color-beige   | --color-bg     | --color-beige        |
| --outline | transparent     | --color-text   | --color-border-hover |

### Service Cards
| Element          | Size    | Weight | Family         | Color              |
|------------------|---------|--------|----------------|--------------------|
| Number (01-06)   | 2rem    | 400    | --font-heading | --color-text-dim → --color-accent (hover) |
| Title            | inherit | 400    | --font-heading | --color-text       |
| Description      | 0.85rem | 400    | --font-body    | --color-text-muted |
| Stat             | 1.1rem  | 400    | --font-heading | --color-cream      |

### Pre-Sale Banner
| Font size | Weight | Spacing | Background     | Color      |
|-----------|--------|---------|----------------|------------|
| 1.1rem    | 600    | 0.05em  | --color-accent | --color-bg |

---

## Layout

| Token            | Value   | Usage                         |
|------------------|---------|-------------------------------|
| --max-width      | 1280px  | Content max width             |
| --side-padding   | 80px    | Horizontal page padding       |
| --section-padding| 120px   | Vertical section spacing      |
| --header-height  | 80px    | Fixed header height           |

### Mobile (max-width: 768px)
| Token            | Value   |
|------------------|---------|
| --side-padding   | 20px    |
| --section-padding| 60px    |
| --header-height  | 64px    |
| Logo height      | 39px    |

---

## Transitions

| Token             | Value     | Usage          |
|-------------------|-----------|----------------|
| --transition      | 0.3s ease | Default        |
| --transition-slow | 0.6s ease | Scroll reveals |

---

### Mobile Burger Menu
| Property         | Value                        |
|------------------|------------------------------|
| Background       | rgba(26, 26, 20, 0.75)       |
| Backdrop-filter  | blur(24px)                   |
| Lotus watermark  | opacity 0.3, right-bottom    |

---

*Auto-generated from css/style.css*
*Last updated: 2026-03-27*
