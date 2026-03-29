/**
 * Global Bali Home — Site Audit Script
 * Tests: file existence, structure, nav, lang switcher, translations,
 *        SEO meta, image refs, forms, gallery, CSS/JS paths.
 * Run: node site-audit.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ─── ANSI colours ────────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', white: '\x1b[37m', magenta: '\x1b[35m',
};
const ok  = `${C.green}✓${C.reset}`;
const fail = `${C.red}✗${C.reset}`;
const warn = `${C.yellow}⚠${C.reset}`;

// ─── ALL 36 PAGES ────────────────────────────────────────────────────────────
const PAGES = [
  'index.html','about.html','projects.html','services.html','gallery.html',
  'contacts.html','project-serenity-villas.html','project-serenity-estates.html',
  'project-serenity-village.html'
];
const LANGS = ['', 'ru', 'id'];
const ALL_FILES = LANGS.flatMap(lang =>
  PAGES.map(p => lang ? `${lang}/${p}` : p)
);

// ─── EXPECTED TRANSLATIONS (sample key phrases) ──────────────────────────────
const LANG_CHECKS = {
  ru: {
    nav:    ['Главная', 'Проекты', 'Услуги', 'О нас', 'Галерея', 'Контакты'],
    cta:    'Подобрать',
    footer: 'Навигация',
    lang_toggle: '>RU ',  // space before svg
  },
  id: {
    nav:    ['Beranda', 'Proyek', 'Layanan', 'Tentang Kami', 'Galeri', 'Kontak'],
    cta:    'Konsultasi',
    footer: 'Navigasi',
    lang_toggle: '>ID ',  // space before svg
  },
};

// ─── RESULT COLLECTOR ────────────────────────────────────────────────────────
const results = [];
let pass = 0, failures = 0, warnings = 0;

function addResult(category, name, status, message = '') {
  results.push({ category, name, status, message });
  if (status === 'pass') pass++;
  else if (status === 'fail') failures++;
  else warnings++;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function readHtml(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, 'utf8');
}

function has(html, pattern) {
  if (typeof pattern === 'string') return html.includes(pattern);
  return pattern.test(html);
}

function extractAttr(html, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

function extractAll(html, pattern) {
  const re = new RegExp(pattern, 'gi');
  const matches = [];
  let m;
  while ((m = re.exec(html)) !== null) matches.push(m[1]);
  return matches;
}

// ─── TEST 1: FILE EXISTENCE ───────────────────────────────────────────────────
function testFileExistence() {
  const cat = 'File Existence';
  for (const f of ALL_FILES) {
    const exists = fs.existsSync(path.join(ROOT, f));
    if (exists) addResult(cat, f, 'pass');
    else         addResult(cat, f, 'fail', 'File not found');
  }
}

// ─── TEST 2: HTML LANG ATTRIBUTE ─────────────────────────────────────────────
const EXPECTED_LANG = { '': 'en', ru: 'ru', id: 'id' };

function testHtmlLang() {
  const cat = 'HTML Lang Attribute';
  for (const lang of LANGS) {
    const page = lang ? `${lang}/index.html` : 'index.html';
    const html = readHtml(page);
    if (!html) continue;
    const m = html.match(/<html[^>]*\slang="([^"]*)"/i);
    const actual = m ? m[1] : 'MISSING';
    const expected = EXPECTED_LANG[lang] || lang;
    if (actual === expected) addResult(cat, page, 'pass', `lang="${actual}"`);
    else addResult(cat, page, 'fail', `expected lang="${expected}", got "${actual}"`);
  }
}

// ─── TEST 3: REQUIRED PAGE STRUCTURE ─────────────────────────────────────────
function testStructure() {
  const cat = 'Page Structure';
  const required = [
    ['header.header', /<header\s[^>]*class="[^"]*header/i],
    ['footer.footer', /<footer\s[^>]*class="[^"]*footer/i],
    ['nav.header__nav', /class="header__nav"/i],
    ['lang dropdown toggle', /class="header__lang-toggle"/i],
    ['lang dropdown list', /class="header__lang-dropdown"/i],
    ['WhatsApp float btn', /class="whatsapp-float"/i],
    ['main.js script', /src="[^"]*js\/main\.js"/i],
    ['style.css link', /href="[^"]*css\/style\.css"/i],
    ['"Get Started" CTA btn', /data-quiz/i],
    ['hamburger button', /class="hamburger"/i],
  ];
  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;
    for (const [name, pattern] of required) {
      if (has(html, pattern)) addResult(cat, `${relPath} → ${name}`, 'pass');
      else                    addResult(cat, `${relPath} → ${name}`, 'fail', `Missing: ${name}`);
    }
  }
}

// ─── TEST 4: NAVIGATION LINKS ─────────────────────────────────────────────────
function testNavLinks() {
  const cat = 'Navigation Links';
  const navPages = ['index.html','projects.html','services.html','about.html','gallery.html','contacts.html'];

  for (const lang of LANGS) {
    for (const page of PAGES) {
      const relPath = lang ? `${lang}/${page}` : page;
      const html = readHtml(relPath);
      if (!html) continue;

      // Extract nav block
      const navMatch = html.match(/class="header__nav">([\s\S]*?)<\/nav>/i);
      if (!navMatch) {
        addResult(cat, `${relPath} nav`, 'fail', 'No header__nav found');
        continue;
      }
      const navBlock = navMatch[1];
      const hrefs = extractAll(navBlock, 'href="([^"]*)"');

      for (const navPage of navPages) {
        const found = hrefs.some(h => h === navPage);
        if (found) addResult(cat, `${relPath} → ${navPage}`, 'pass');
        else        addResult(cat, `${relPath} → ${navPage}`, 'fail', `Nav link to "${navPage}" missing`);
      }
    }
  }
}

// ─── TEST 5: LANGUAGE SWITCHER LINKS ─────────────────────────────────────────
function testLangSwitcher() {
  const cat = 'Language Switcher';

  // For each page, the dropdown should contain links to all 4 versions
  for (const lang of LANGS) {
    for (const page of PAGES) {
      const relPath = lang ? `${lang}/${page}` : page;
      const html = readHtml(relPath);
      if (!html) continue;

      const dropMatch = html.match(/class="header__lang-dropdown">([\s\S]*?)<\/div>/i);
      if (!dropMatch) {
        addResult(cat, `${relPath} dropdown`, 'fail', 'Dropdown not found');
        continue;
      }
      const dropdown = dropMatch[1];

      // Active lang should be a <span class="active">
      const hasActive = /class="active"/.test(dropdown);
      if (hasActive) addResult(cat, `${relPath} active lang`, 'pass');
      else            addResult(cat, `${relPath} active lang`, 'fail', 'No active lang span in dropdown');

      // Check cross-lang links exist
      // From root: links to subfolders use no prefix (ru/page.html)
      // From subfolder: link to EN uses ../ prefix, links to other subfolders use ../xx/
      const langLinks = lang
        ? { '': `../${page}`, ru: `../ru/${page}`, id: `../id/${page}` }
        : { '': page, ru: `ru/${page}`, id: `id/${page}` };

      for (const [targetLang, expectedHref] of Object.entries(langLinks)) {
        if (targetLang === lang) continue; // active lang is span, not link
        const found = dropdown.includes(`href="${expectedHref}"`);
        if (found) addResult(cat, `${relPath} → ${targetLang || 'en'}`, 'pass');
        else        addResult(cat, `${relPath} → ${targetLang || 'en'}`, 'fail',
          `Missing link to "${expectedHref}"`);
      }
    }
  }
}

// ─── TEST 6: TRANSLATIONS ────────────────────────────────────────────────────
function testTranslations() {
  const cat = 'Translations';

  for (const [lang, checks] of Object.entries(LANG_CHECKS)) {
    for (const page of PAGES) {
      const relPath = `${lang}/${page}`;
      const html = readHtml(relPath);
      if (!html) continue;

      // Nav terms
      for (const term of checks.nav) {
        if (has(html, term)) addResult(cat, `${relPath} nav:"${term}"`, 'pass');
        else                 addResult(cat, `${relPath} nav:"${term}"`, 'fail',
          `Expected translated nav term "${term}" not found`);
      }

      // CTA button text
      const ctaOk = has(html, checks.cta);
      if (ctaOk) addResult(cat, `${relPath} CTA text`, 'pass');
      else        addResult(cat, `${relPath} CTA text`, 'warn',
        `CTA text "${checks.cta}" not found`);

      // Footer heading
      if (has(html, checks.footer)) addResult(cat, `${relPath} footer heading`, 'pass');
      else                          addResult(cat, `${relPath} footer heading`, 'fail',
        `Footer heading "${checks.footer}" not found`);

      // Lang toggle label
      if (has(html, checks.lang_toggle)) addResult(cat, `${relPath} lang toggle label`, 'pass');
      else                               addResult(cat, `${relPath} lang toggle label`, 'fail',
        `Lang toggle label "${checks.lang_toggle}" not found`);
    }
  }

  // EN pages should NOT contain Russian/Chinese/Indonesian nav terms
  const foreignTerms = ['Главная', '首页', 'Beranda'];
  for (const page of PAGES) {
    const html = readHtml(page);
    if (!html) continue;
    for (const term of foreignTerms) {
      if (has(html, term)) addResult(cat, `${page} EN no-foreign:"${term}"`, 'fail',
        `EN page contains foreign term "${term}"`);
      else addResult(cat, `${page} EN no-foreign:"${term}"`, 'pass');
    }
  }
}

// ─── TEST 7: SEO / META TAGS ──────────────────────────────────────────────────
function testSeoMeta() {
  const cat = 'SEO & Meta Tags';
  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;

    const checks = [
      ['<title>', /<title>[^<]+<\/title>/i],
      ['meta description', /<meta\s+name="description"\s+content="[^"]{10,}"/i],
      ['og:title', /property="og:title"/i],
      ['og:description', /property="og:description"/i],
      ['og:image', /property="og:image"/i],
      ['canonical', /rel="canonical"/i],
      ['favicon', /rel="icon"/i],
    ];
    for (const [name, pattern] of checks) {
      if (has(html, pattern)) addResult(cat, `${relPath} → ${name}`, 'pass');
      else                    addResult(cat, `${relPath} → ${name}`, 'fail', `Missing ${name}`);
    }
  }
}

// ─── TEST 8: IMAGE REFERENCES ─────────────────────────────────────────────────
function testImageRefs() {
  const cat = 'Image References';
  const checked = new Set();

  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;
    const dir = path.dirname(relPath);

    // src="..." and poster="..." attributes
    const srcs = extractAll(html, '(?:src|poster)="([^"]*\\.(?:jpg|jpeg|png|gif|ico|webp|mp4|webm))"');
    for (const src of srcs) {
      if (src.startsWith('http')) continue; // skip external
      const absImg = path.join(ROOT, dir, src);
      const key = absImg.toLowerCase();
      if (checked.has(key)) continue;
      checked.add(key);

      if (fs.existsSync(absImg)) addResult(cat, src, 'pass');
      else                       addResult(cat, src, 'fail', `File not found (ref in ${relPath})`);
    }
  }
}

// ─── TEST 9: FORMS ────────────────────────────────────────────────────────────
function testForms() {
  const cat = 'Contact Forms';

  for (const lang of LANGS) {
    const relPath = lang ? `${lang}/contacts.html` : 'contacts.html';
    const html = readHtml(relPath);
    if (!html) continue;

    const fields = [
      ['name input',    /name="name"\s+|name="[^"]*name[^"]*"/i],
      ['email input',   /type="email"|name="email"/i],
      ['phone input',   /type="tel"|name="phone"/i],
      ['submit button', /<button[^>]*type="submit"|<input[^>]*type="submit"/i],
    ];
    for (const [name, pattern] of fields) {
      if (has(html, pattern)) addResult(cat, `${relPath} → ${name}`, 'pass');
      else                    addResult(cat, `${relPath} → ${name}`, 'fail', `Missing ${name}`);
    }

    // Privacy / consent checkbox
    if (has(html, /type="checkbox"/i)) addResult(cat, `${relPath} → consent checkbox`, 'pass');
    else addResult(cat, `${relPath} → consent checkbox`, 'warn', 'No consent checkbox found');
  }
}

// ─── TEST 10: GALLERY PAGES ───────────────────────────────────────────────────
function testGallery() {
  const cat = 'Gallery';

  for (const lang of LANGS) {
    const relPath = lang ? `${lang}/gallery.html` : 'gallery.html';
    const html = readHtml(relPath);
    if (!html) continue;

    const checks = [
      ['gallery-data.js loaded', /src="[^"]*gallery-data\.js"/i],
      ['gallery grid container', /id="gallery-grid"/i],
      ['filter buttons', /class="gallery-filter/i],
      ['filter: all',     /data-filter="all"/i],
      ['filter: villas',  /data-filter="villas"/i],
      ['filter: estates', /data-filter="estates"/i],
      ['filter: village', /data-filter="village"/i],
      ['lightbox element', /class="lightbox"/i],
      ['load-more button', /id="load-more-btn"/i],
    ];
    for (const [name, pattern] of checks) {
      if (has(html, pattern)) addResult(cat, `${relPath} → ${name}`, 'pass');
      else                    addResult(cat, `${relPath} → ${name}`, 'fail', `Missing: ${name}`);
    }

    // Subfolders must use ../gallery-data.js
    if (lang) {
      const correct = has(html, 'src="../gallery-data.js"');
      if (correct) addResult(cat, `${relPath} → correct ../ path`, 'pass');
      else          addResult(cat, `${relPath} → correct ../ path`, 'fail',
        'gallery-data.js should use "../gallery-data.js" in subfolder');
    }
  }
}

// ─── TEST 11: CSS/JS PATH DEPTH ──────────────────────────────────────────────
function testPaths() {
  const cat = 'Asset Paths';

  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;
    const isSubfolder = relPath.includes('/');
    const prefix = isSubfolder ? '../' : '';

    const assetChecks = [
      ['style.css', `href="${prefix}css/style.css"`],
      ['reset.css', `href="${prefix}css/reset.css"`],
      ['main.js',   `src="${prefix}js/main.js"`],
      ['logo img',  `src="${prefix}images/common/logo-transparent.png"`],
    ];
    for (const [name, expected] of assetChecks) {
      if (has(html, expected)) addResult(cat, `${relPath} → ${name}`, 'pass');
      else                     addResult(cat, `${relPath} → ${name}`, 'fail',
        `Expected "${expected}"`);
    }
  }
}

// ─── TEST 12: PROJECT PAGES SPECIFIC ─────────────────────────────────────────
function testProjectPages() {
  const cat = 'Project Pages';
  const projectPages = [
    'project-serenity-villas.html',
    'project-serenity-estates.html',
    'project-serenity-village.html',
  ];

  for (const lang of LANGS) {
    for (const page of projectPages) {
      const relPath = lang ? `${lang}/${page}` : page;
      const html = readHtml(relPath);
      if (!html) continue;

      const checks = [
        ['hero stats', /class="hero-stats"/i],
        ['fullbleed hero', /class="fullbleed-hero"/i],
        ['price mention', /\$\d+K|\$\d{3}[,\s]/],
        ['availability bar or presale', /availability-bar|presale/i],
      ];
      // CTA section is optional for Village (presale page)
      if (!page.includes('village')) {
        checks.push(['CTA section', /class="cta-section/i]);
      }
      for (const [name, pattern] of checks) {
        if (has(html, pattern)) addResult(cat, `${relPath} → ${name}`, 'pass');
        else                    addResult(cat, `${relPath} → ${name}`, 'fail', `Missing: ${name}`);
      }
    }
  }
}

// ─── TEST 13: EXTERNAL LINKS ─────────────────────────────────────────────────
function testExternalLinks() {
  const cat = 'External Links';
  // All external links should have target="_blank" rel="noopener noreferrer"
  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;
    // Find all <a href="http..."> without target="_blank"
    const externalNoTarget = (html.match(/<a\s[^>]*href="https?:\/\/[^"]*"[^>]*>/gi) || [])
      .filter(tag => !tag.includes('target="_blank"'));
    if (externalNoTarget.length === 0) {
      addResult(cat, `${relPath} external links`, 'pass');
    } else {
      addResult(cat, `${relPath} external links`, 'warn',
        `${externalNoTarget.length} external link(s) missing target="_blank"`);
    }
  }
}

// ─── TEST 14: INDEX.HTML SPECIFIC ────────────────────────────────────────────
function testHomepage() {
  const cat = 'Homepage Sections';
  const sectionsEn = [
    ['hero video',       /class="fullbleed-hero"|class="hero/i],
    ['ROI calculator',   /roi-calculator|data-roi/i],
    ['testimonials',     /class="testimonials/i],
    ['photo mosaic',     /id="photo-mosaic"/i],
    ['quiz popup',       /data-quiz/i],
  ];

  for (const lang of LANGS) {
    const relPath = lang ? `${lang}/index.html` : 'index.html';
    const html = readHtml(relPath);
    if (!html) continue;
    for (const [name, pattern] of sectionsEn) {
      if (has(html, pattern)) addResult(cat, `${relPath} → ${name}`, 'pass');
      else                    addResult(cat, `${relPath} → ${name}`, 'fail', `Missing: ${name}`);
    }
  }
}

// ─── TEST 15: GALLERY-DATA.JS VALIDITY ───────────────────────────────────────
function testGalleryData() {
  const cat = 'Gallery Data';
  const gdPath = path.join(ROOT, 'gallery-data.js');
  if (!fs.existsSync(gdPath)) {
    addResult(cat, 'gallery-data.js', 'fail', 'File not found');
    return;
  }
  const content = fs.readFileSync(gdPath, 'utf8');

  // Check structure
  if (has(content, 'const GALLERY_DATA')) addResult(cat, 'GALLERY_DATA variable', 'pass');
  else addResult(cat, 'GALLERY_DATA variable', 'fail', 'Missing GALLERY_DATA declaration');

  for (const key of ['villas', 'estates', 'village']) {
    if (has(content, key)) addResult(cat, `gallery key: ${key}`, 'pass');
    else addResult(cat, `gallery key: ${key}`, 'fail', `Missing "${key}" key`);
  }

  // Check image files exist
  const imgPaths = extractAll(content, '"(images/[^"]+)"');
  let missingImages = 0;
  for (const imgPath of imgPaths) {
    if (!fs.existsSync(path.join(ROOT, imgPath))) missingImages++;
  }
  if (missingImages === 0) addResult(cat, `all ${imgPaths.length} gallery images exist`, 'pass');
  else addResult(cat, `gallery images on disk`, 'fail', `${missingImages} missing out of ${imgPaths.length}`);
}

// ─── TEST 16: DATA FILES INTEGRITY ───────────────────────────────────────────
function testDataFiles() {
  const cat = 'Data Files';
  const dataFiles = [
    ['data/site-data.js', 'SITE_DATA'],
    ['data/projects-data.js', 'PROJECTS_DATA'],
    ['data/faq-data.js', 'FAQ_DATA'],
    ['data/testimonials-data.js', 'TESTIMONIALS_DATA'],
  ];
  for (const [file, varName] of dataFiles) {
    const abs = path.join(ROOT, file);
    if (!fs.existsSync(abs)) {
      addResult(cat, file, 'fail', 'File not found');
      continue;
    }
    const content = fs.readFileSync(abs, 'utf8');
    if (content.includes(varName)) addResult(cat, `${file} → ${varName}`, 'pass');
    else addResult(cat, `${file} → ${varName}`, 'fail', `Missing ${varName} declaration`);

    // Validate it's parseable JS
    try {
      new Function(content);
      addResult(cat, `${file} → syntax`, 'pass');
    } catch (e) {
      addResult(cat, `${file} → syntax`, 'fail', `JS syntax error: ${e.message}`);
    }
  }

  // Validate site-data.js structure
  const sdPath = path.join(ROOT, 'data/site-data.js');
  if (fs.existsSync(sdPath)) {
    const sd = fs.readFileSync(sdPath, 'utf8');
    const requiredKeys = ['investmentGuide', 'exchangeRate', 'contacts'];
    for (const key of requiredKeys) {
      if (sd.includes(`"${key}"`)) addResult(cat, `site-data → ${key}`, 'pass');
      else addResult(cat, `site-data → ${key}`, 'fail', `Missing key "${key}"`);
    }
    // Validate WhatsApp is digits only
    const waMatch = sd.match(/"whatsapp":\s*"([^"]*)"/);
    if (waMatch) {
      if (/^\d{10,15}$/.test(waMatch[1])) addResult(cat, 'WhatsApp format', 'pass');
      else addResult(cat, 'WhatsApp format', 'fail', `Invalid: "${waMatch[1]}" — must be 10-15 digits`);
    }
    // Validate exchange rate
    const rateMatch = sd.match(/"usdToIdr":\s*(\d+)/);
    if (rateMatch) {
      const rate = parseInt(rateMatch[1]);
      if (rate >= 1000 && rate <= 50000) addResult(cat, `Exchange rate (${rate})`, 'pass');
      else addResult(cat, `Exchange rate (${rate})`, 'warn', 'Rate seems unusual');
    }
  }

  // Validate projects-data.js has all 3 projects
  const pdPath = path.join(ROOT, 'data/projects-data.js');
  if (fs.existsSync(pdPath)) {
    const pd = fs.readFileSync(pdPath, 'utf8');
    for (const slug of ['serenity-villas', 'serenity-estates', 'serenity-village']) {
      if (pd.includes(slug)) addResult(cat, `project → ${slug}`, 'pass');
      else addResult(cat, `project → ${slug}`, 'fail', `Missing project "${slug}"`);
    }
  }
}

// ─── TEST 17: ADMIN PANEL ────────────────────────────────────────────────────
function testAdminPanel() {
  const cat = 'Admin Panel';
  const adminHtml = readHtml('admin/index.html');
  if (!adminHtml) {
    addResult(cat, 'admin/index.html', 'fail', 'File not found');
    return;
  }

  // Required elements
  const checks = [
    ['login form', /id="login-form"/i],
    ['PAT form', /id="pat-form"/i],
    ['dashboard tab', /data-tab="dashboard"/i],
    ['projects tab', /data-tab="projects"/i],
    ['seo tab', /data-tab="seo"/i],
    ['gallery tab', /data-tab="gallery"/i],
    ['faq tab', /data-tab="faq"/i],
    ['testimonials tab', /data-tab="testimonials"/i],
    ['colors tab', /data-tab="colors"/i],
    ['rate input', /id="rate-input"/i],
    ['rate auto checkbox', /id="rate-auto"/i],
    ['contact phone', /id="contact-phone"/i],
    ['contact whatsapp', /id="contact-whatsapp"/i],
    ['contact email', /id="contact-email"/i],
    ['guide upload', /id="guide-file-input"/i],
    ['color pickers', /id="color-accent"/i],
    ['colors save btn', /id="btn-colors-save"/i],
    ['colors reset btn', /id="btn-colors-reset"/i],
  ];
  for (const [name, pattern] of checks) {
    if (has(adminHtml, pattern)) addResult(cat, name, 'pass');
    else addResult(cat, name, 'fail', `Missing: ${name}`);
  }

  // Help tooltips
  const helpSections = ['rate', 'contacts', 'guide', 'colors'];
  for (const section of helpSections) {
    if (has(adminHtml, `data-help="${section}"`)) addResult(cat, `help tooltip: ${section}`, 'pass');
    else addResult(cat, `help tooltip: ${section}`, 'warn', `Missing help tooltip for ${section}`);
  }

  // Admin JS and CSS
  for (const file of ['admin/admin.js', 'admin/admin.css']) {
    if (fs.existsSync(path.join(ROOT, file))) addResult(cat, file, 'pass');
    else addResult(cat, file, 'fail', 'File not found');
  }

  // JS syntax check
  const adminJs = path.join(ROOT, 'admin/admin.js');
  if (fs.existsSync(adminJs)) {
    try {
      new Function(fs.readFileSync(adminJs, 'utf8'));
      addResult(cat, 'admin.js syntax', 'pass');
    } catch (e) {
      addResult(cat, 'admin.js syntax', 'fail', `JS error: ${e.message}`);
    }
  }
}

// ─── TEST 18: CSS VARIABLES CONSISTENCY ──────────────────────────────────────
function testCssVariables() {
  const cat = 'CSS Variables';
  const cssPath = path.join(ROOT, 'css/style.css');
  if (!fs.existsSync(cssPath)) {
    addResult(cat, 'style.css', 'fail', 'File not found');
    return;
  }
  const css = fs.readFileSync(cssPath, 'utf8');

  // Required variables
  const requiredVars = [
    '--color-bg', '--color-bg-alt', '--color-bg-card',
    '--color-accent', '--color-text', '--color-cream',
    '--color-text-muted', '--color-text-dim',
    '--color-border', '--color-border-hover',
    '--font-heading', '--font-body',
  ];
  for (const v of requiredVars) {
    if (css.includes(`${v}:`)) addResult(cat, `defined: ${v}`, 'pass');
    else addResult(cat, `defined: ${v}`, 'fail', `Missing variable ${v} in :root`);
  }

  // Should NOT have removed/unused variables
  const removedVars = ['--color-beige', '--color-dark', '--color-green', '--color-deep-green'];
  for (const v of removedVars) {
    if (css.includes(`${v}:`)) addResult(cat, `unused: ${v}`, 'warn', `Variable ${v} is defined but should be removed`);
    else addResult(cat, `cleaned: ${v}`, 'pass');
  }

  // Check no references to removed variables
  for (const v of removedVars) {
    const usage = (css.match(new RegExp(`var\\(${v.replace(/[-]/g, '\\-')}\\)`, 'g')) || []).length;
    if (usage > 0) addResult(cat, `refs to ${v}`, 'fail', `${usage} reference(s) to removed variable`);
  }
}

// ─── TEST 19: CONSENT CHECKBOXES ─────────────────────────────────────────────
function testConsent() {
  const cat = 'Privacy Consent';
  // Lead-magnet forms on index pages should have consent checkboxes
  for (const lang of LANGS) {
    const relPath = lang ? `${lang}/index.html` : 'index.html';
    const html = readHtml(relPath);
    if (!html) continue;

    if (has(html, /id="lead-consent"/i)) addResult(cat, `${relPath} → lead-magnet consent`, 'pass');
    else addResult(cat, `${relPath} → lead-magnet consent`, 'fail', 'Missing consent checkbox on lead-magnet form');
  }
}

// ─── TEST 20: WHATSAPP DYNAMIC LINKS ─────────────────────────────────────────
function testWhatsAppLinks() {
  const cat = 'WhatsApp Links';
  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;
    // All wa.me links should have data-contact="whatsapp-link" for dynamic update
    const waLinks = (html.match(/<a\s[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*>/gi) || []);
    let missingDataAttr = 0;
    for (const tag of waLinks) {
      if (!tag.includes('data-contact="whatsapp-link"')) missingDataAttr++;
    }
    if (waLinks.length === 0) continue; // no WA links on this page
    if (missingDataAttr === 0) addResult(cat, `${relPath}`, 'pass', `${waLinks.length} link(s) OK`);
    else addResult(cat, `${relPath}`, 'warn', `${missingDataAttr}/${waLinks.length} WA link(s) missing data-contact`);
  }
}

// ─── TEST 21: MAIN.JS INTEGRITY ──────────────────────────────────────────────
function testMainJs() {
  const cat = 'Main JS';
  const jsPath = path.join(ROOT, 'js/main.js');
  if (!fs.existsSync(jsPath)) {
    addResult(cat, 'main.js', 'fail', 'File not found');
    return;
  }
  const js = fs.readFileSync(jsPath, 'utf8');

  // Syntax check
  try {
    new Function(js);
    addResult(cat, 'syntax valid', 'pass');
  } catch (e) {
    addResult(cat, 'syntax valid', 'fail', `JS error: ${e.message}`);
  }

  // Key features present
  const features = [
    ['color application', /SITE_DATA\.colors/],
    ['auto exchange rate', /exchangeRate\.auto/],
    ['custom validation', /showFieldError/],
    ['quiz popup', /openQuiz|closeQuiz/],
    ['exit intent', /exit.*overlay|exitOverlay/i],
    ['scroll reveal', /IntersectionObserver/],
    ['WhatsApp dynamic', /data-contact.*whatsapp/],
    ['IDR formatting', /fmtIdr/],
    ['i18n translations', /i18n\s*=\s*\{/],
    ['lead-magnet countdown', /countdown-num/],
  ];
  for (const [name, pattern] of features) {
    if (pattern.test(js)) addResult(cat, `feature: ${name}`, 'pass');
    else addResult(cat, `feature: ${name}`, 'fail', `Missing feature: ${name}`);
  }

  // No hardcoded WhatsApp numbers (should use SITE_DATA)
  const hardcodedWa = (js.match(/wa\.me\/\d+/g) || []);
  if (hardcodedWa.length === 0) addResult(cat, 'no hardcoded WA numbers', 'pass');
  else addResult(cat, 'no hardcoded WA numbers', 'warn', `${hardcodedWa.length} hardcoded wa.me link(s) found`);
}

// ─── TEST 22: SITE-DATA SCRIPTS LOADED ───────────────────────────────────────
function testDataScripts() {
  const cat = 'Data Scripts';
  // site-data.js and projects-data.js are only required on pages that use them
  const pagesNeedingSiteData = ['index.html', 'contacts.html', 'project-serenity-villas.html', 'project-serenity-estates.html', 'project-serenity-village.html'];
  const pagesNeedingProjectsData = ['index.html', 'projects.html', 'project-serenity-villas.html', 'project-serenity-estates.html', 'project-serenity-village.html'];

  for (const relPath of ALL_FILES) {
    const html = readHtml(relPath);
    if (!html) continue;
    const baseName = path.basename(relPath);

    if (pagesNeedingSiteData.includes(baseName)) {
      if (has(html, 'site-data.js')) addResult(cat, `${relPath} → site-data.js`, 'pass');
      else addResult(cat, `${relPath} → site-data.js`, 'fail', 'site-data.js required but not loaded');
    }
    if (pagesNeedingProjectsData.includes(baseName)) {
      if (has(html, 'projects-data.js')) addResult(cat, `${relPath} → projects-data.js`, 'pass');
      else addResult(cat, `${relPath} → projects-data.js`, 'fail', 'projects-data.js required but not loaded');
    }
  }
}

// ─── RUN ALL TESTS ────────────────────────────────────────────────────────────
console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════════════════${C.reset}`);
console.log(`${C.bold}${C.cyan}  Global Bali Home — Site Audit${C.reset}`);
console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════════════════${C.reset}\n`);

testFileExistence();
testHtmlLang();
testStructure();
testNavLinks();
testLangSwitcher();
testTranslations();
testSeoMeta();
testImageRefs();
testForms();
testGallery();
testPaths();
testProjectPages();
testExternalLinks();
testHomepage();
testGalleryData();
testDataFiles();
testAdminPanel();
testCssVariables();
testConsent();
testWhatsAppLinks();
testMainJs();
testDataScripts();

// ─── RENDER REPORT ────────────────────────────────────────────────────────────
const categories = [...new Set(results.map(r => r.category))];

for (const cat of categories) {
  const catResults = results.filter(r => r.category === cat);
  const catFail = catResults.filter(r => r.status === 'fail').length;
  const catWarn = catResults.filter(r => r.status === 'warn').length;
  const catPass = catResults.filter(r => r.status === 'pass').length;

  const badge = catFail > 0
    ? `${C.red}[${catFail} FAIL]${C.reset}`
    : catWarn > 0
      ? `${C.yellow}[${catWarn} WARN]${C.reset}`
      : `${C.green}[ALL PASS]${C.reset}`;

  console.log(`\n${C.bold}${cat}${C.reset} ${badge}`);
  console.log(`${'─'.repeat(55)}`);

  // Show failures and warnings only (pass would flood the console)
  const notable = catResults.filter(r => r.status !== 'pass');
  if (notable.length === 0) {
    console.log(`  ${ok} ${C.dim}${catPass} checks passed${C.reset}`);
  } else {
    for (const r of notable) {
      const icon = r.status === 'fail' ? fail : warn;
      console.log(`  ${icon} ${r.name}`);
      if (r.message) console.log(`     ${C.dim}→ ${r.message}${C.reset}`);
    }
    if (catPass > 0) console.log(`  ${ok} ${C.dim}+ ${catPass} passed${C.reset}`);
  }
}

// ─── SUMMARY ─────────────────────────────────────────────────────────────────
const total = pass + failures + warnings;
console.log(`\n${C.bold}${'═'.repeat(55)}${C.reset}`);
console.log(`${C.bold}SUMMARY${C.reset}  Total: ${total}  ${C.green}Pass: ${pass}${C.reset}  ${C.red}Fail: ${failures}${C.reset}  ${C.yellow}Warn: ${warnings}${C.reset}`);
console.log(`${C.bold}${'═'.repeat(55)}${C.reset}\n`);

// ─── ISSUES LIST ─────────────────────────────────────────────────────────────
const allFails = results.filter(r => r.status === 'fail');
const allWarns = results.filter(r => r.status === 'warn');

if (allFails.length > 0) {
  console.log(`${C.bold}${C.red}FAILURES (${allFails.length})${C.reset}`);
  for (const r of allFails) {
    console.log(`  ${fail} [${r.category}] ${r.name}`);
    if (r.message) console.log(`     ${C.dim}${r.message}${C.reset}`);
  }
  console.log();
}

if (allWarns.length > 0) {
  console.log(`${C.bold}${C.yellow}WARNINGS (${allWarns.length})${C.reset}`);
  for (const r of allWarns) {
    console.log(`  ${warn} [${r.category}] ${r.name}`);
    if (r.message) console.log(`     ${C.dim}${r.message}${C.reset}`);
  }
  console.log();
}

// ─── GENERATE AUDIT FILE ─────────────────────────────────────────────────────
const now = new Date();
const dateStr = now.toISOString().slice(0, 10);
const timeStr = now.toTimeString().slice(0, 5).replace(':', '-');
const auditDir = path.join(ROOT, 'audits');
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir);
const auditFile = path.join(auditDir, `site-audit-${dateStr}_${timeStr}.md`);

let md = `# Site Audit Report\n\n`;
md += `**Date:** ${now.toISOString().slice(0, 19).replace('T', ' ')}\n`;
md += `**Total checks:** ${total} | **Pass:** ${pass} | **Fail:** ${failures} | **Warn:** ${warnings}\n`;
md += `**Status:** ${failures === 0 ? (warnings === 0 ? 'ALL CLEAR' : 'STABLE (warnings only)') : 'ISSUES FOUND'}\n\n`;

md += `---\n\n## Summary by Category\n\n`;
md += `| Category | Pass | Fail | Warn | Status |\n`;
md += `|----------|------|------|------|--------|\n`;
for (const cat of categories) {
  const cr = results.filter(r => r.category === cat);
  const cp = cr.filter(r => r.status === 'pass').length;
  const cf = cr.filter(r => r.status === 'fail').length;
  const cw = cr.filter(r => r.status === 'warn').length;
  const st = cf > 0 ? 'FAIL' : cw > 0 ? 'WARN' : 'OK';
  md += `| ${cat} | ${cp} | ${cf} | ${cw} | ${st} |\n`;
}

if (allFails.length > 0) {
  md += `\n## Failures (${allFails.length})\n\n`;
  for (const r of allFails) {
    md += `- **[${r.category}]** ${r.name}`;
    if (r.message) md += ` — ${r.message}`;
    md += `\n`;
  }
}

if (allWarns.length > 0) {
  md += `\n## Warnings (${allWarns.length})\n\n`;
  for (const r of allWarns) {
    md += `- **[${r.category}]** ${r.name}`;
    if (r.message) md += ` — ${r.message}`;
    md += `\n`;
  }
}

md += `\n## Conclusion\n\n`;
if (failures === 0 && warnings === 0) {
  md += `All ${total} checks passed. Site is stable and ready for production.\n`;
} else if (failures === 0) {
  md += `No critical issues. ${warnings} warning(s) found — review recommended but not blocking.\n`;
} else {
  md += `${failures} critical issue(s) found that need attention. ${warnings} warning(s) also detected.\n`;
  md += `Fix failures before deploying.\n`;
}

fs.writeFileSync(auditFile, md, 'utf8');
console.log(`${C.cyan}Audit report saved: ${path.relative(ROOT, auditFile)}${C.reset}\n`);

process.exit(failures > 0 ? 1 : 0);
