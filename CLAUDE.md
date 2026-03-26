# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Global Bali Home — a multi-page marketing website for a premium real estate development company in Bali. Pure HTML/CSS/JS, no frameworks or build tools.

## Architecture

- **9 HTML pages** in root: `index.html` (home), `about.html`, `projects.html`, `services.html`, `gallery.html`, `contacts.html`, and 3 project detail pages (`project-serenity-villas.html`, `project-serenity-estates.html`, `project-serenity-village.html`)
- **`css/style.css`** — entire design system: CSS variables, dark theme, all components, responsive breakpoints (1024px, 768px)
- **`css/reset.css`** — standard CSS reset
- **`js/main.js`** — all interactivity: header scroll, hamburger menu, scroll reveal (IntersectionObserver), parallax, number counters, dynamic gallery rendering, lightbox, FAQ accordion, contact form validation
- **`gallery-data.js`** — auto-generated manifest of gallery images, loaded as a `<script>` in `gallery.html` and `index.html`
- **`generate-gallery.ps1`** — PowerShell script that scans image folders and generates `gallery-data.js`
- **`Base info.txt`** — reference file with current project data (villas count, bedrooms, prices, handover dates, status). Update this file first, then sync changes to HTML.

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
- **Decorative watermark**: add `.logo-watermark .logo-watermark--right` or `.logo-watermark--left` to sections for decorative lotus background. Use `--large` modifier for 40% bigger size.
- **Component naming**: BEM-like (`block__element--modifier`), e.g. `.project-showcase__content`, `.project-card__badge--presale`
- **All pages share**: identical header (with nav dropdown for Projects), footer (with SVG social icons), and WhatsApp floating button — changes must be replicated across all 9 HTML files
- **Header nav order**: Home, Projects (dropdown with 3 sub-links), Gallery, Services, About, Contact
- **Icons**: SVG line-art style (`stroke: var(--color-accent); stroke-width: 1.5; fill: none`) — used in service cards and project feature grids
- **External links**: always use `target="_blank" rel="noopener noreferrer"`
- **Images**: organized in `images/common/`, `images/home/`, `images/serenity-villas/`, `images/serenity-estates/`, `images/serenity-village/`. All below-fold images use `loading="lazy"`.
- **SEO**: every page has `<title>`, `<meta description>`, OG tags, Twitter Card tags, canonical link, and `<link rel="icon">`. Project pages and contacts have JSON-LD structured data.
- **Hero video**: `index.html` uses `<video autoplay muted loop playsinline preload="metadata">` with poster fallback. CTA button has CSS `pulse` animation.

## Communication

All instructions and explanations should be in Russian (per user preference).
