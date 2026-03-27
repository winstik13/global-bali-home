# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Global Bali Home — a multi-page marketing website for a premium real estate development company in Bali. Pure HTML/CSS/JS, no frameworks or build tools.

## Architecture

- **9 HTML pages** in root: `index.html` (home), `about.html`, `projects.html`, `services.html`, `gallery.html`, `contacts.html`, and 3 project detail pages (`project-serenity-villas.html`, `project-serenity-estates.html`, `project-serenity-village.html`)
- **`css/style.css`** — entire design system: CSS variables, dark theme, all components, responsive breakpoints (1024px, 768px)
- **`css/reset.css`** — standard CSS reset
- **`js/main.js`** — all interactivity: header scroll, hamburger menu, scroll reveal (IntersectionObserver), parallax, number counters, dynamic gallery rendering, lightbox, FAQ accordion, contact form validation, quiz popup, ROI calculator, exit intent popup, sticky CTA bar, lead magnet form
- **`gallery-data.js`** — auto-generated manifest of gallery images, loaded as a `<script>` in `gallery.html` and `index.html`
- **`generate-gallery.ps1`** — PowerShell script that scans image folders and generates `gallery-data.js`
- **`Base info.md`** — reference file with current project data (villas count, bedrooms, prices, handover dates, unit status). Update this file first, then sync changes to HTML.

### JS-injected components (DOM created in main.js, no HTML duplication)

- **Quiz popup** — 4-step lead qualification (goal → budget → bedrooms → timeline → contact form → project recommendation). Triggered by `[data-quiz]` attribute or `.cta-section .btn--primary`.
- **Exit intent popup** — fires on `mouseleave` (desktop only) after 30s, suppressed if quiz is open or lead already captured. Uses `sessionStorage` (`exitShown`, `leadCaptured`).
- **Sticky CTA bar** — mobile-only fixed bottom bar, appears after scrolling past hero, opens quiz.

## Deployment

- **GitHub repo**: `winstik13/global-bali-home` (public)
- **GitHub Pages**: site auto-deploys from `master` branch to https://winstik13.github.io/global-bali-home/
- **GitHub CLI**: installed at `C:\Program Files\GitHub CLI\gh.exe` (not in PATH for bash, use full path)
- **Push to deploy**: `git push` triggers GitHub Pages rebuild (~1-2 min)

## Development

No build step. Open any `.html` file directly in a browser. To preview:
```
start index.html
```

### Gallery workflow

Gallery images are loaded dynamically from `gallery-data.js`. After adding/removing images in project folders, regenerate the manifest:
```
powershell -ExecutionPolicy Bypass -File generate-gallery.ps1
```

### Image optimization

Compress images with FFmpeg (max 1920px width, quality 85%):
```
"C:\Users\Winst\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe" -i input.jpg -vf "scale='min(1920,iw)':-1" -q:v 3 -y output.jpg
```

## Key Conventions

- **Dark premium theme**: background `#1a1a14`, text `#E1D9C9`, accent `#6B8F4E`
- **Fonts**: Playfair Display (headings via `--font-heading`), Montserrat (body via `--font-body`), loaded via `<link>` from Google Fonts CDN with `preconnect`
- **CSS classes for scroll animations**: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-stagger` — triggered by IntersectionObserver adding `.visible`
- **Number counter**: add `data-counter` attribute to elements with numeric text
- **Section backgrounds**: default is `--color-bg`, use `.bg-alt` for alternate darker sections
- **Video background sections**: hero, Why Bali, and Wanayu use `<video autoplay muted loop playsinline>` with overlay div for text readability
- **Decorative watermark**: add `.logo-watermark .logo-watermark--right` or `.logo-watermark--left` to sections for decorative lotus background. Use `--large` modifier for 40% bigger size.
- **Component naming**: BEM-like (`block__element--modifier`), e.g. `.project-showcase__content`, `.project-card__badge--presale`
- **All pages share**: identical header (with "Get Started" CTA button), footer (with SVG social icons), and WhatsApp floating button — changes must be replicated across all 9 HTML files
- **Header nav order**: Home, Projects, Services, About, Gallery, Contact + "Get Started" CTA button (opens quiz)
- **Icons**: SVG line-art style (`stroke: var(--color-accent); stroke-width: 1.5; fill: none`) — used in service cards, project features, and quiz options
- **External links**: always use `target="_blank" rel="noopener noreferrer"`
- **Images**: organized in `images/common/`, `images/home/`, `images/serenity-villas/`, `images/serenity-estates/`, `images/serenity-village/`. All below-fold images use `loading="lazy"`.
- **SEO**: every page has `<title>`, `<meta description>`, OG tags, Twitter Card tags, canonical link, and `<link rel="icon">`. Project pages and contacts have JSON-LD structured data.
- **Availability bars**: project showcase cards and detail pages show unit sold progress bars. Village uses presale variant (pulsing dot, no progress bar). Data is hardcoded in HTML.
- **ROI Calculator** (index.html): interactive with 3 scenarios (Conservative/Normal/Optimistic), adjustable occupancy slider, CTA button opening quiz.

## Communication

All instructions and explanations should be in Russian (per user preference).
