# Global Bali Home — Typography & Design System

---

## Fonts

| Role     | Family            | Fallback          | Google Fonts |
|----------|-------------------|-------------------|--------------|
| Headings | Playfair Display  | Georgia, serif    | Weights: 400, 500, 600, 700 |
| Body     | Montserrat        | sans-serif        | Weights: 300, 400, 500, 600, 700 |

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

6 unified steps for small/body text + clamp() for headings:

| Step     | Value   | px (at 18px base) | Role                                        |
|----------|---------|--------------------|---------------------------------------------|
| xs       | 0.65rem | 11.7px             | Small uppercase labels, badges, table heads  |
| sm       | 0.7rem  | 12.6px             | Buttons, tags, social links, copyright       |
| base-sm  | 0.85rem | 15.3px             | Descriptions, footer text, meta info         |
| base     | 0.9rem  | 16.2px             | Form inputs, table data, feature headings    |
| body     | 1rem    | 18px               | Navigation, hero text, body                  |
| md       | 1.1rem  | 19.8px             | FAQ questions                                |

Larger sizes (not consolidated):

| Value     | Role                          |
|-----------|-------------------------------|
| 1.125rem  | h4, card prices               |
| 1.25rem   | Showcase prices, service titles, timeline |
| 1.6rem    | Hero stat numbers             |
| 1.75rem   | Founder name, card titles     |

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
| p             | inherit | 300    | --color-text-muted | -           | 65ch      |

---

## Component Typography

### Header Navigation
| Property       | Value                |
|----------------|----------------------|
| Font size      | 1rem                 |
| Font weight    | 500                  |
| Letter spacing | 0.15em               |
| Text transform | uppercase            |
| Color          | --color-text-muted   |
| Color (hover)  | --color-text         |

### Hero Section
| Element          | Size      | Weight | Spacing  | Transform | Color              |
|------------------|-----------|--------|----------|-----------|--------------------|
| Subtitle         | 0.7rem    | 600    | 0.3em    | uppercase | --color-accent     |
| Tag              | 0.7rem    | 500    | 0.3em    | uppercase | --color-accent     |
| Description      | 1rem      | 300    | -        | -         | --color-text-muted |
| Stat number      | 1.6rem    | -      | -        | -         | --color-cream      |
| Stat label       | 0.85rem   | 400    | 0.12em   | uppercase | --color-text       |

### Section Headers
| Element          | Size      | Weight | Spacing  | Transform | Color              |
|------------------|-----------|--------|----------|-----------|--------------------|
| Tag (.section-header__tag) | 0.65rem | 600 | 0.3em | uppercase | --color-accent |

### Stats Section (Large Numbers)
| Element          | Size                        | Weight | Color          |
|------------------|-----------------------------|--------|----------------|
| Number           | clamp(2.5rem, 4vw, 4rem)    | -      | --color-cream  |
| Label            | 0.7rem                      | 500    | --color-text-muted |

### Buttons
| Variant      | Size    | Weight | Spacing | Transform | Padding      |
|--------------|---------|--------|---------|-----------|--------------|
| Base (.btn)  | 0.7rem  | 600    | 0.15em  | uppercase | 14px 36px    |

| Variant        | Background      | Text Color     | Border Color         |
|----------------|-----------------|----------------|----------------------|
| --primary      | --color-beige   | --color-bg     | --color-beige        |
| --outline      | transparent     | --color-text   | --color-border-hover |
| --accent       | --color-accent  | --color-cream  | --color-accent       |

### Badges
| Element               | Size    | Weight | Spacing | Transform |
|-----------------------|---------|--------|---------|-----------|
| Project badge         | 0.65rem | 600    | 0.15em  | uppercase |
| Project card badge    | 0.65rem | 600    | 0.15em  | uppercase |

### Project Showcase
| Element          | Size    | Weight | Color              | Line Height |
|------------------|---------|--------|--------------------|-------------|
| Description      | 0.9rem  | -      | --color-text-muted | 1.7         |
| Meta values      | 0.85rem | -      | -                  | -           |
| Meta strong      | -       | 600    | -                  | -           |
| Price            | 1.25rem | -      | -                  | -           |

### Project Detail Pages
| Element            | Size      | Weight | Color              | Line Height |
|--------------------|-----------|--------|--------------------|-------------|
| Feature label      | 0.65rem   | 600    | --color-text-dim   | -           |
| Feature value      | 0.85rem   | 300    | -                  | -           |
| Highlight title    | 1.75rem   | -      | -                  | -           |
| Highlight tag      | 0.7rem    | 600    | --color-accent     | -           |
| Description text   | 0.85rem   | 300    | --color-text-muted | 1.7         |
| Unit table data    | 0.85rem   | -      | -                  | -           |
| Unit table header  | 0.65rem   | 600    | --color-text-dim   | -           |

### Gallery
| Element          | Size    | Weight | Spacing | Color              |
|------------------|---------|--------|---------|--------------------|
| Filter button    | 0.65rem | 600    | 0.15em  | --color-text-dim   |
| Filter (active)  | -       | -      | -       | --color-text       |
| Empty message    | 1.2rem  | -      | 0.1em   | --color-text-muted |

### Footer
| Element          | Size    | Weight | Spacing | Color              |
|------------------|---------|--------|---------|---------------------|
| Heading          | 0.65rem | 600    | 0.2em   | --color-text-muted  |
| Links            | 0.85rem | 300    | -       | --color-text-muted  |
| Contact item     | 0.85rem | 300    | 0.1em   | --color-text-muted  |
| Social links     | 0.7rem  | 500    | 0.1em   | --color-text-muted  |
| Brand text       | 0.85rem | 300    | -       | --color-text-muted  |
| Bottom text      | 0.7rem  | 300    | -       | --color-text-dim    |

### Services
| Element          | Size    | Weight | Color              |
|------------------|---------|--------|--------------------|
| Icon             | 40×40px SVG | -  | --color-accent     |
| Title            | 1.25rem | -      | --color-text       |
| Description      | 0.85rem | -      | --color-text-muted |
| Stat label       | 0.65rem | 600    | --color-accent     |

### Form Elements
| Element          | Size    | Weight | Color              |
|------------------|---------|--------|--------------------|
| Input/Textarea   | 0.9rem  | -      | --color-text       |
| Label            | 0.65rem | -      | --color-text-muted |

### FAQ Accordion
| Element          | Size      | Weight | Color              |
|------------------|-----------|--------|--------------------|
| Question         | 1.1rem    | 400    | --color-text       |
| Answer           | -         | 300    | --color-text-muted |

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

---

## Transitions

| Token             | Value     | Usage          |
|-------------------|-----------|----------------|
| --transition      | 0.3s ease | Default        |
| --transition-slow | 0.6s ease | Scroll reveals |

---

*Auto-generated from css/style.css*
*Last updated: 2026-03-27*
