/* ============================================
   ADMIN PANEL — Global Bali Home
   Firebase Auth + GitHub API
   ============================================ */

(function () {
  'use strict';

  // ─── Firebase Config ───
  // Replace with your Firebase project config from console.firebase.google.com
  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyBuvItBRQT7mRdsIISEsWI_gJSVYzjlbwE',
    authDomain: 'gbhproject-d8c12.firebaseapp.com',
    projectId: 'gbhproject-d8c12'
  };

  // ─── GitHub Config ───
  const GITHUB_OWNER = 'winstik13';
  const GITHUB_REPO = 'global-bali-home';
  const GITHUB_API = 'https://api.github.com';

  // ─── State ───
  let githubPAT = '';
  let currentProject = 'serenity-villas';
  let projectsData = null;    // working copy of PROJECTS_DATA
  let pendingChanges = false;

  // ─── DOM Refs ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const loginScreen = $('#login-screen');
  const patScreen = $('#pat-screen');
  const adminApp = $('#admin-app');
  const loginForm = $('#login-form');
  const loginError = $('#login-error');
  const patForm = $('#pat-form');
  const patError = $('#pat-error');

  // ─── Init Firebase ───
  if (typeof firebase === 'undefined') {
    loginError.textContent = 'Firebase SDK failed to load. Check your internet connection.';
    loginError.hidden = false;
    return;
  }

  // Warn if opened via file:// (Firebase requires http/https)
  if (location.protocol === 'file:') {
    loginError.innerHTML = 'Admin panel requires a web server.<br>Use <b>Live Server</b> in VS Code or open from GitHub Pages.';
    loginError.hidden = false;
  }

  let auth;
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
  } catch (err) {
    console.error('Firebase init error:', err);
    loginError.textContent = 'Firebase init error: ' + err.message;
    loginError.hidden = false;
    return;
  }

  // ─── Auth State ───
  auth.onAuthStateChanged(user => {
    if (user) {
      loginScreen.hidden = true;
      $('#admin-user').textContent = user.email;
      // Check for stored PAT
      githubPAT = localStorage.getItem('gbh_pat') || sessionStorage.getItem('gbh_pat') || '';
      if (githubPAT) {
        validatePAT(githubPAT).then(valid => {
          if (valid) {
            showAdmin();
          } else {
            localStorage.removeItem('gbh_pat');
            sessionStorage.removeItem('gbh_pat');
            githubPAT = '';
            showPATScreen();
          }
        }).catch(err => {
          console.error('PAT validation error:', err);
          showPATScreen();
        });
      } else {
        showPATScreen();
      }
    } else {
      loginScreen.hidden = false;
      patScreen.hidden = true;
      adminApp.hidden = true;
    }
  });

  // ─── Login Form ───
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.hidden = true;
    const email = $('#login-email').value;
    const password = $('#login-password').value;
    const btn = loginForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Signing in...';
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error('Login error:', err);
      loginError.textContent = friendlyError(err.code);
      loginError.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In';
    }
  });

  function friendlyError(code) {
    const map = {
      'auth/wrong-password': 'Wrong password. Try again.',
      'auth/user-not-found': 'No account with this email.',
      'auth/too-many-requests': 'Too many attempts. Try later.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/invalid-credential': 'Invalid email or password.'
    };
    return map[code] || 'Authentication failed. Please try again.';
  }

  // ─── PAT Screen ───
  function showPATScreen() {
    loginScreen.hidden = true;
    patScreen.hidden = false;
    adminApp.hidden = true;
  }

  patForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    patError.hidden = true;
    const pat = $('#pat-input').value.trim();
    const valid = await validatePAT(pat);
    if (valid) {
      githubPAT = pat;
      if ($('#pat-remember').checked) {
        localStorage.setItem('gbh_pat', pat);
      } else {
        sessionStorage.setItem('gbh_pat', pat);
      }
      showAdmin();
    } else {
      patError.textContent = 'Invalid token. Ensure it has "contents:write" scope for this repo.';
      patError.hidden = false;
    }
  });

  async function validatePAT(pat) {
    try {
      const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, {
        headers: { 'Authorization': `token ${pat}` }
      });
      return res.ok;
    } catch { return false; }
  }

  // ─── Logout ───
  $('#btn-logout').addEventListener('click', () => {
    auth.signOut();
    localStorage.removeItem('gbh_pat');
    sessionStorage.removeItem('gbh_pat');
    githubPAT = '';
  });

  // ─── Show Admin ───
  function showAdmin() {
    patScreen.hidden = true;
    adminApp.hidden = false;
    loadProjectsData();
    renderDashboard();
    renderProjectEditor();
    updateRateLimit();
  }

  // ─── Tab Navigation ───
  $$('.admin-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.admin-nav__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $$('.admin-tab').forEach(t => t.hidden = true);
      $(`#tab-${btn.dataset.tab}`).hidden = false;
    });
  });

  // ─── Project Tabs ───
  $$('.project-tabs__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.project-tabs__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProject = btn.dataset.proj;
      renderProjectEditor();
    });
  });

  // ─── Load Projects Data ───
  function loadProjectsData() {
    // Deep clone from the global constant loaded via <script>
    if (typeof PROJECTS_DATA !== 'undefined') {
      projectsData = JSON.parse(JSON.stringify(PROJECTS_DATA));
    }
  }

  // ─── Dashboard ───
  function renderDashboard() {
    if (!projectsData) return;
    const container = $('#dashboard-cards');
    const projects = ['serenity-villas', 'serenity-estates', 'serenity-village'];

    // Compute totals
    let totalUnits = 0, totalSold = 0, totalAvailable = 0, totalRevenue = 0;
    const projectStats = projects.map(key => {
      const p = projectsData[key];
      const { sold, total } = p.availability;
      const pct = Math.round((sold / total) * 100);
      const left = total - sold;
      totalUnits += total;
      totalSold += sold;
      totalAvailable += left;

      // Estimate revenue from sold units
      let revenue = 0;
      if (p.units) {
        p.units.forEach(u => {
          if (u.status === 'sold' || u.status === 'booked') {
            revenue += u.price || p.startingPrice;
          }
        });
      } else if (p.unitTypes) {
        // Village: estimate from types proportionally
        const soldCount = sold;
        let assigned = 0;
        p.unitTypes.forEach(ut => {
          const share = Math.min(Math.round(soldCount * ut.count / total), ut.count);
          revenue += share * ut.price;
          assigned += share;
        });
        if (assigned < soldCount) revenue += (soldCount - assigned) * p.startingPrice;
      }
      totalRevenue += revenue;

      return { key, p, sold, total, pct, left, revenue };
    });

    // Summary row
    const totalPct = totalUnits ? Math.round((totalSold / totalUnits) * 100) : 0;
    let html = `<div class="dash-summary">
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalUnits}</div>
        <div class="dash-summary__label">Total Units</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalSold}</div>
        <div class="dash-summary__label">Sold / Booked</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalAvailable}</div>
        <div class="dash-summary__label">Available</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalPct}%</div>
        <div class="dash-summary__label">Overall Progress</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">$${(totalRevenue / 1000000).toFixed(1)}M</div>
        <div class="dash-summary__label">Est. Revenue</div>
      </div>
    </div>`;

    // Project cards
    html += '<div class="dashboard-grid">';
    projectStats.forEach(({ key, p, sold, total, pct, left, revenue }) => {
      const badgeClass = p.status === 'pre-sale' ? 'presale' : 'progress';
      const badgeText = p.status === 'pre-sale' ? 'Pre-Sale' : 'In Progress';

      // Unit breakdown for Villas/Estates
      let breakdown = '';
      if (p.units) {
        const counts = { available: 0, booked: 0, sold: 0, resale: 0 };
        p.units.forEach(u => { counts[u.status] = (counts[u.status] || 0) + 1; });
        breakdown = `<div class="dash-card__breakdown">
          ${counts.available ? `<span class="dash-break dash-break--available">${counts.available} available</span>` : ''}
          ${counts.booked ? `<span class="dash-break dash-break--booked">${counts.booked} booked</span>` : ''}
          ${counts.sold ? `<span class="dash-break dash-break--sold">${counts.sold} sold</span>` : ''}
          ${counts.resale ? `<span class="dash-break dash-break--resale">${counts.resale} resale</span>` : ''}
        </div>`;
      }

      html += `<div class="dash-card" data-card-project="${key}">
        <div class="dash-card__header">
          <span class="dash-card__name">${p.name}</span>
          <span class="dash-card__badge dash-card__badge--${badgeClass}">${badgeText}</span>
        </div>
        <div class="dash-card__stats">
          <div><div class="dash-card__stat-value">${sold}/${total}</div><div class="dash-card__stat-label">Sold</div></div>
          <div><div class="dash-card__stat-value">${left}</div><div class="dash-card__stat-label">Left</div></div>
          <div><div class="dash-card__stat-value">$${(p.startingPrice / 1000).toFixed(0)}K</div><div class="dash-card__stat-label">From</div></div>
          <div><div class="dash-card__stat-value">$${revenue >= 1000000 ? (revenue / 1000000).toFixed(1) + 'M' : (revenue / 1000).toFixed(0) + 'K'}</div><div class="dash-card__stat-label">Revenue</div></div>
        </div>
        <div class="dash-card__bar">
          <div class="dash-card__bar-track"><div class="dash-card__bar-fill" style="width:${pct}%"></div></div>
          <span class="dash-card__bar-label">${pct}%</span>
        </div>
        ${breakdown}
        <button class="dash-card__edit btn btn--outline btn--sm" data-goto="${key}">Edit Project →</button>
      </div>`;
    });
    html += '</div>';

    // Recent commits
    html += '<div class="dash-commits"><h3>Recent Changes</h3><div id="dash-commits-list"><span style="color:var(--color-text-dim)">Loading...</span></div></div>';

    container.innerHTML = html;

    // Quick edit buttons
    container.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentProject = btn.dataset.goto;
        $$('.admin-nav__btn').forEach(b => b.classList.remove('active'));
        $$('.admin-nav__btn').forEach(b => { if (b.dataset.tab === 'projects') b.classList.add('active'); });
        $$('.admin-tab').forEach(t => t.hidden = true);
        $('#tab-projects').hidden = false;
        $$('.project-tabs__btn').forEach(b => b.classList.remove('active'));
        $$('.project-tabs__btn').forEach(b => { if (b.dataset.proj === currentProject) b.classList.add('active'); });
        renderProjectEditor();
      });
    });

    // Load recent commits
    loadRecentCommits();
  }

  async function loadRecentCommits() {
    try {
      const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=5&path=data/projects-data.js`, {
        headers: { 'Authorization': `token ${githubPAT}` }
      });
      const commits = await res.json();
      const list = $('#dash-commits-list');
      if (!commits.length || !Array.isArray(commits)) {
        list.innerHTML = '<span style="color:var(--color-text-dim)">No recent changes to project data.</span>';
        return;
      }
      list.innerHTML = commits.map(c => {
        const date = new Date(c.commit.author.date);
        const ago = timeAgo(date);
        return `<div class="dash-commit">
          <span class="dash-commit__msg">${escAttr(c.commit.message.split('\n')[0])}</span>
          <span class="dash-commit__time">${ago}</span>
        </div>`;
      }).join('');
    } catch {
      $('#dash-commits-list').innerHTML = '<span style="color:var(--color-text-dim)">Could not load commit history.</span>';
    }
  }

  function timeAgo(date) {
    const s = Math.floor((Date.now() - date.getTime()) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
  }

  // ─── Project Editor ───
  function renderProjectEditor() {
    if (!projectsData) return;
    const editor = $('#project-editor');
    const p = projectsData[currentProject];
    if (!p) return;

    let html = '';

    // Unit Table
    if (p.units) {
      html += `<div class="editor-section"><h3>Units</h3>
        <table class="admin-unit-table"><thead><tr>
          <th>Unit</th><th>Type</th><th>Area</th><th>Land</th><th>Status</th><th>Price ($)</th>
        </tr></thead><tbody>`;

      p.units.forEach((u, i) => {
        html += `<tr>
          <td>${u.id}${u.badge ? ` <span style="color:var(--color-accent);font-size:0.7rem">${u.badge}</span>` : ''}</td>
          <td>${u.type}</td>
          <td>${u.area}</td>
          <td>${u.land}</td>
          <td><select data-unit="${i}" data-field="status" class="unit-status">
            ${['available', 'booked', 'sold', 'resale'].map(s => `<option value="${s}"${u.status === s ? ' selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`).join('')}
          </select></td>
          <td><input type="number" data-unit="${i}" data-field="price" class="unit-price" value="${u.price || ''}" placeholder="—" min="0" step="1000"></td>
        </tr>`;
      });
      html += '</tbody></table></div>';
    }

    // Village Unit Types
    if (p.unitTypes) {
      html += `<div class="editor-section"><h3>Unit Types</h3>
        <table class="admin-unit-table"><thead><tr>
          <th>Type</th><th>Area</th><th>Land</th><th>Units</th><th>Price ($)</th>
        </tr></thead><tbody>`;

      p.unitTypes.forEach((ut, i) => {
        html += `<tr>
          <td>${ut.type}</td>
          <td>${ut.area}</td>
          <td>${ut.land}</td>
          <td>${ut.count}</td>
          <td><input type="number" data-utype="${i}" data-field="price" class="utype-price" value="${ut.price || ''}" min="0" step="1000"></td>
        </tr>`;
      });
      html += '</tbody></table></div>';
    }

    // Availability
    html += `<div class="editor-section"><h3>Availability</h3>
      <div style="display:flex;gap:24px;align-items:center;">
        <div class="form-group" style="width:120px">
          <label>Sold</label>
          <input type="number" id="avail-sold" value="${p.availability.sold}" min="0" max="${p.availability.total}">
        </div>
        <div class="form-group" style="width:120px">
          <label>Total</label>
          <input type="number" id="avail-total" value="${p.availability.total}" min="1" readonly>
        </div>
        <div style="font-size:1.3rem;font-family:var(--font-heading);color:var(--color-cream)">${Math.round(p.availability.sold / p.availability.total * 100)}%</div>
      </div>
    </div>`;

    // Hero Stats (4 languages)
    html += `<div class="editor-section"><h3>Hero Stats</h3>`;
    ['en', 'ru', 'id', 'zh'].forEach(lng => {
      const stats = p.heroStats[lng] || [];
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="hero-stats-grid">`;
      stats.forEach((s, i) => {
        html += `<div class="hero-stat-field">
          <div class="form-group"><label>Number</label><input type="text" data-lang="${lng}" data-stat="${i}" data-field="number" class="stat-input" value="${s.number}"></div>
          <div class="form-group"><label>Label</label><input type="text" data-lang="${lng}" data-stat="${i}" data-field="label" class="stat-input" value="${s.label}"></div>
        </div>`;
      });
      html += '</div></div>';
    });
    html += '</div>';

    // Showcase Text (4 languages)
    html += `<div class="editor-section"><h3>Showcase Card</h3>`;
    ['en', 'ru', 'id', 'zh'].forEach(lng => {
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="form-group"><label>Price</label><input type="text" class="showcase-input" data-lang="${lng}" data-field="showcasePrice" value="${(p.showcasePrice[lng] || '')}"></div>
        <div class="form-group" style="margin-top:8px"><label>Description</label><textarea class="showcase-input" data-lang="${lng}" data-field="showcaseDesc" rows="2">${(p.showcaseDesc[lng] || '')}</textarea></div>
      </div>`;
    });
    html += '</div>';

    editor.innerHTML = html;

    // Bind change events
    editor.querySelectorAll('.unit-status').forEach(sel => {
      sel.addEventListener('change', () => {
        const idx = +sel.dataset.unit;
        p.units[idx].status = sel.value;
        recalcAvailability();
        markChanged();
      });
    });

    editor.querySelectorAll('.unit-price').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.unit;
        p.units[idx].price = inp.value ? +inp.value : null;
        markChanged();
      });
    });

    editor.querySelectorAll('.utype-price').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.utype;
        p.unitTypes[idx].price = inp.value ? +inp.value : null;
        markChanged();
      });
    });

    editor.querySelectorAll('.stat-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const lng = inp.dataset.lang;
        const idx = +inp.dataset.stat;
        const field = inp.dataset.field;
        p.heroStats[lng][idx][field] = inp.value;
        markChanged();
      });
    });

    editor.querySelectorAll('.showcase-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const lng = inp.dataset.lang;
        const field = inp.dataset.field;
        p[field][lng] = inp.value;
        markChanged();
      });
    });

    $('#avail-sold').addEventListener('input', (e) => {
      p.availability.sold = +e.target.value;
      markChanged();
    });
  }

  function recalcAvailability() {
    const p = projectsData[currentProject];
    if (!p.units) return;
    const sold = p.units.filter(u => u.status === 'sold' || u.status === 'booked').length;
    p.availability.sold = sold;
    const soldInput = $('#avail-sold');
    if (soldInput) soldInput.value = sold;
  }

  function markChanged() {
    pendingChanges = true;
    $('#publish-status').textContent = 'Unsaved changes';
    $('#publish-status').className = 'publish-status';
  }

  // ─── Publish ───
  $('#btn-publish').addEventListener('click', async () => {
    if (!pendingChanges) return;
    const btn = $('#btn-publish');
    const status = $('#publish-status');
    btn.disabled = true;
    status.textContent = 'Publishing...';
    status.className = 'publish-status';

    try {
      // Build the JS file content
      const dataContent = buildProjectsDataJS();
      await commitFile('data/projects-data.js', dataContent, 'Update project data via admin panel');
      pendingChanges = false;
      status.textContent = 'Published! Site updating (~1-2 min)';
      status.className = 'publish-status success';
      renderDashboard();
      updateRateLimit();
    } catch (err) {
      status.textContent = 'Error: ' + err.message;
      status.className = 'publish-status error';
    }
    btn.disabled = false;
  });

  function buildProjectsDataJS() {
    // Rebuild the JS file preserving the exact format
    const data = {};
    ['serenity-villas', 'serenity-estates', 'serenity-village'].forEach(key => {
      data[key] = {};
      const src = projectsData[key];
      // Copy all fields except comparison/labels (those are global)
      for (const k of Object.keys(src)) {
        data[key][k] = src[k];
      }
    });

    // Copy global fields
    data.comparisonLabels = projectsData.comparisonLabels;
    data.comparisonData = projectsData.comparisonData;
    data.unitTableHeaders = projectsData.unitTableHeaders;
    data.statusLabels = projectsData.statusLabels;
    data.availabilityLabels = projectsData.availabilityLabels;
    data.villageTableHeaders = projectsData.villageTableHeaders;

    return '/* eslint-disable */\nconst PROJECTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  // ─── SEO Editor ───
  $('#btn-seo-load').addEventListener('click', loadSEO);

  async function loadSEO() {
    const page = $('#seo-page').value;
    const lang = $('#seo-lang').value;
    const path = lang === 'en' ? page : `${lang}/${page}`;

    const editor = $('#seo-editor');
    editor.innerHTML = '<p style="color:var(--color-text-dim)">Loading...</p>';

    try {
      const file = await fetchFile(path);
      const html = atob(file.content);
      const fields = extractSEO(html);

      editor.innerHTML = `
        <div class="editor-section">
          <h3>${page} — ${lang.toUpperCase()}</h3>
          ${seoFieldHTML('title', 'Page Title', fields.title, 60)}
          ${seoFieldHTML('description', 'Meta Description', fields.description, 160)}
          ${seoFieldHTML('ogTitle', 'OG Title', fields.ogTitle, 60)}
          ${seoFieldHTML('ogDescription', 'OG Description', fields.ogDescription, 160)}
          <div style="margin-top:16px">
            <button id="btn-seo-save" class="btn btn--primary btn--sm">Save SEO</button>
            <span id="seo-save-status" class="publish-status" style="margin-left:12px"></span>
          </div>
        </div>
      `;

      // Char counters
      editor.querySelectorAll('.seo-input').forEach(inp => {
        inp.addEventListener('input', () => updateSEOCounter(inp));
        updateSEOCounter(inp);
      });

      // Save button
      $('#btn-seo-save').addEventListener('click', async () => {
        const status = $('#seo-save-status');
        status.textContent = 'Saving...';
        try {
          let updated = html;
          updated = replaceMeta(updated, 'title', editor.querySelector('[data-seo="title"]').value);
          updated = replaceMeta(updated, 'description', editor.querySelector('[data-seo="description"]').value);
          updated = replaceMeta(updated, 'ogTitle', editor.querySelector('[data-seo="ogTitle"]').value);
          updated = replaceMeta(updated, 'ogDescription', editor.querySelector('[data-seo="ogDescription"]').value);

          await commitFile(path, updated, `Update SEO: ${page} (${lang})`, file.sha);
          status.textContent = 'Saved!';
          status.className = 'publish-status success';
        } catch (err) {
          status.textContent = 'Error: ' + err.message;
          status.className = 'publish-status error';
        }
      });
    } catch (err) {
      editor.innerHTML = `<p style="color:var(--color-danger)">Error: ${err.message}</p>`;
    }
  }

  function seoFieldHTML(key, label, value, maxLen) {
    return `<div class="seo-field">
      <div class="seo-field__header">
        <span class="seo-field__label">${label}</span>
        <span class="seo-field__counter" data-counter-for="${key}" data-max="${maxLen}">0/${maxLen}</span>
      </div>
      <div class="form-group"><input type="text" class="seo-input" data-seo="${key}" data-max="${maxLen}" value="${escAttr(value)}"></div>
    </div>`;
  }

  function updateSEOCounter(inp) {
    const key = inp.dataset.seo;
    const max = +inp.dataset.max;
    const len = inp.value.length;
    const counter = document.querySelector(`[data-counter-for="${key}"]`);
    if (!counter) return;
    counter.textContent = `${len}/${max}`;
    counter.className = 'seo-field__counter' + (len > max ? ' over' : len > max * 0.9 ? ' warn' : '');
  }

  function extractSEO(html) {
    const get = (re) => { const m = html.match(re); return m ? m[1] : ''; };
    return {
      title: get(/<title>([^<]*)<\/title>/),
      description: get(/<meta\s+name="description"\s+content="([^"]*)"/),
      ogTitle: get(/<meta\s+property="og:title"\s+content="([^"]*)"/),
      ogDescription: get(/<meta\s+property="og:description"\s+content="([^"]*)"/),
    };
  }

  function replaceMeta(html, key, value) {
    const safe = value.replace(/"/g, '&quot;');
    if (key === 'title') {
      return html.replace(/<title>[^<]*<\/title>/, `<title>${value}</title>`);
    }
    if (key === 'description') {
      return html.replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${safe}"`);
    }
    if (key === 'ogTitle') {
      return html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${safe}"`);
    }
    if (key === 'ogDescription') {
      return html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${safe}"`);
    }
    return html;
  }

  // ─── Gallery Manager ───
  const galleryProject = $('#gallery-project');
  const galleryGrid = $('#gallery-grid');
  const galleryUploadBtn = $('#btn-gallery-upload');
  const galleryFileInput = $('#gallery-file-input');

  galleryProject.addEventListener('change', renderGallery);
  galleryUploadBtn.addEventListener('click', () => galleryFileInput.click());
  galleryFileInput.addEventListener('change', handleGalleryUpload);

  function renderGallery() {
    const cat = galleryProject.value;
    const galleryData = typeof GALLERY_DATA !== 'undefined' ? GALLERY_DATA : {};
    const images = galleryData[cat] || [];

    galleryGrid.innerHTML = images.map((img, i) => `
      <div class="admin-gallery-item" data-index="${i}">
        <img src="../${img}" alt="" loading="lazy">
        <div class="admin-gallery-item__actions">
          <button class="admin-gallery-item__btn" data-delete="${i}" title="Delete">&times;</button>
        </div>
      </div>
    `).join('') || '<p style="color:var(--color-text-dim)">No images in this category.</p>';

    galleryGrid.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteGalleryImage(cat, +btn.dataset.delete));
    });
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const cat = galleryProject.value;
    const folderMap = { villas: 'serenity-villas', estates: 'serenity-estates', village: 'serenity-village' };
    const folder = `images/${folderMap[cat]}`;

    for (const file of files) {
      const resized = await resizeImage(file, 1920, 0.8);
      const base64 = resized.split(',')[1];
      const path = `${folder}/${file.name}`;
      try {
        await commitFile(path, null, `Add gallery image: ${file.name}`, null, base64);
      } catch (err) {
        console.error('Upload failed:', file.name, err);
      }
    }

    // Update gallery-data.js
    await regenerateGalleryData();
    renderGallery();
    galleryFileInput.value = '';
  }

  async function deleteGalleryImage(cat, index) {
    const galleryData = typeof GALLERY_DATA !== 'undefined' ? GALLERY_DATA : {};
    const images = galleryData[cat];
    if (!images || !images[index]) return;

    if (!confirm(`Delete ${images[index]}?`)) return;

    try {
      const file = await fetchFile(images[index]);
      await deleteFile(images[index], file.sha, `Remove gallery image`);
      images.splice(index, 1);
      await regenerateGalleryData();
      renderGallery();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  }

  async function regenerateGalleryData() {
    const galleryData = typeof GALLERY_DATA !== 'undefined' ? GALLERY_DATA : {};
    const content = 'const GALLERY_DATA = ' + JSON.stringify(galleryData, null, 2) + ';\n';
    await commitFile('gallery-data.js', content, 'Update gallery data via admin panel');
  }

  function resizeImage(file, maxWidth, quality) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ─── GitHub API Helpers ───
  async function fetchFile(path) {
    const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
      headers: { 'Authorization': `token ${githubPAT}` }
    });
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    return res.json();
  }

  async function commitFile(path, content, message, sha, base64Content) {
    // Get current SHA if not provided
    if (!sha) {
      try {
        const existing = await fetchFile(path);
        sha = existing.sha;
      } catch { /* new file */ }
    }

    const body = {
      message,
      content: base64Content || btoa(unescape(encodeURIComponent(content))),
    };
    if (sha) body.sha = sha;

    const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubPAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    return res.json();
  }

  async function deleteFile(path, sha, message) {
    const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${githubPAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, sha })
    });
    if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
    return res.json();
  }

  async function updateRateLimit() {
    try {
      const res = await fetch(`${GITHUB_API}/rate_limit`, {
        headers: { 'Authorization': `token ${githubPAT}` }
      });
      const data = await res.json();
      const remaining = data.resources.core.remaining;
      const limit = data.resources.core.limit;
      $('#rate-limit').textContent = `API: ${remaining}/${limit} requests remaining`;
    } catch { /* ignore */ }
  }

  // ─── Helpers ───
  function escAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
