# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Global Bali Home — a multi-page marketing website for a premium real estate development company in Bali. Pure HTML/CSS/JS, no frameworks or build tools.

## Architecture

- **9 HTML pages** in root: `index.html` (home), `about.html`, `projects.html`, `services.html`, `gallery.html`, `contacts.html`, and 3 project detail pages (`project-serenity-villas.html`, `project-serenity-estates.html`, `project-serenity-village.html`)
- **`css/style.css`** — entire design system: CSS variables, dark theme, all components, responsive breakpoints (1024px, 768px)
- **`css/reset.css`** — standard CSS reset
- **`js/main.js`** — all interactivity: header scroll, hamburger menu, scroll reveal (IntersectionObserver), parallax, number counters, dynamic gallery rendering, lightbox, FAQ accordion, contact form validation
- **`gallery-data.js`** — auto-generated manifest of gallery images, loaded as a `<script>` in `gallery.html`
- **`generate-gallery.ps1`** — PowerShell script that scans image folders and generates `gallery-data.js`

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

### Video compression (FFmpeg)

FFmpeg is installed via winget. Full build path:
```
C:\Users\Winst\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe
```

## Key Conventions

- **Dark premium theme**: background `#1a1a14`, text `#E1D9C9`, accent `#6B8F4E`
- **Fonts**: Playfair Display (headings via `--font-heading`), Montserrat (body via `--font-body`), loaded from Google Fonts CDN
- **CSS classes for scroll animations**: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-stagger` — triggered by IntersectionObserver adding `.visible`
- **Number counter**: add `data-counter` attribute to elements with numeric text
- **Section backgrounds**: default is `--color-bg`, use `.bg-alt` for alternate darker sections
- **Component naming**: BEM-like (`block__element--modifier`), e.g. `.project-showcase__content`, `.project-card__badge--presale`
- **All pages share**: identical header (with Home link), footer, and WhatsApp floating button markup — changes must be replicated across all 9 HTML files
- **Hero video**: `index.html` uses `<video>` background with poster fallback; on mobile (<768px) video is replaced with static poster image
- **Images**: organized in `images/common/`, `images/home/`, `images/serenity-villas/`, `images/serenity-estates/`, `images/serenity-village/`
- **Unused files**: stored in `1/` folder (Temp, example reference, raw Tilda downloads)

## Communication

All instructions and explanations should be in Russian (per user preference).
