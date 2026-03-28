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
const LANGS = ['', 'ru', 'id', 'zh'];
const ALL_FILES = LANGS.flatMap(lang =>
  PAGES.map(p => lang ? `${lang}/${p}` : p)
);

// ─── EXPECTED TRANSLATIONS (sample key phrases) ──────────────────────────────
const LANG_CHECKS = {
  ru: {
    nav:    ['Главная', 'Проекты', 'Услуги', 'О нас', 'Галерея', 'Контакты'],
    cta:    'Начать',
    footer: 'Навигация',
    lang_toggle: '>RU ',  // space before svg
  },
  id: {
    nav:    ['Beranda', 'Proyek', 'Layanan', 'Tentang Kami', 'Galeri', 'Kontak'],
    cta:    'Mulai',
    footer: 'Navigasi',
    lang_toggle: '>ID ',  // space before svg
  },
  zh: {
    nav:    ['首页', '项目', '服务', '关于我们', '画廊', '联系我们'],
    cta:    '开始咨询',
    footer: '导航',
    lang_toggle: '中文 ',  // space before svg
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
const EXPECTED_LANG = { '': 'en', ru: 'ru', id: 'id', zh: 'zh-CN' };

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
        ? { '': `../${page}`, ru: `../ru/${page}`, id: `../id/${page}`, zh: `../zh/${page}` }
        : { '': page, ru: `ru/${page}`, id: `id/${page}`, zh: `zh/${page}` };

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
      ['message textarea', /<textarea/i],
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
        ['CTA section', /class="cta-section/i],
      ];
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

process.exit(failures > 0 ? 1 : 0);
