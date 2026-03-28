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
    loadSiteData();
    buildDynamicUI();
    renderDashboard();
    renderRateInfo();
    renderGuideInfo();
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

  // Project tabs are now generated dynamically in buildDynamicUI()

  // ─── Load Projects Data ───
  function loadProjectsData() {
    // Deep clone from the global constant loaded via <script>
    if (typeof PROJECTS_DATA !== 'undefined') {
      projectsData = JSON.parse(JSON.stringify(PROJECTS_DATA));
    }
  }

  // Helper: get project keys sorted by order
  function getProjectKeys() {
    if (!projectsData) return [];
    return Object.keys(projectsData)
      .filter(k => projectsData[k] && projectsData[k].slug)
      .sort((a, b) => (projectsData[a].order || 99) - (projectsData[b].order || 99));
  }

  // Build dynamic tabs/selectors from project data
  function buildDynamicUI() {
    const keys = getProjectKeys();
    if (!keys.length) return;

    // Project tabs + "New Project" button
    const tabsContainer = $('.project-tabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = keys.map((k, i) =>
        `<button class="project-tabs__btn${i === 0 ? ' active' : ''}" data-proj="${k}">${projectsData[k].name}</button>`
      ).join('') + '<button class="project-tabs__btn project-tabs__btn--add" id="btn-new-project">+ New Project</button>';
      tabsContainer.querySelectorAll('.project-tabs__btn[data-proj]').forEach(btn => {
        btn.addEventListener('click', () => {
          tabsContainer.querySelectorAll('.project-tabs__btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentProject = btn.dataset.proj;
          renderProjectEditor();
        });
      });
      const newProjBtn = $('#btn-new-project');
      if (newProjBtn) newProjBtn.addEventListener('click', showNewProjectModal);
    }

    // SEO page select — add project pages dynamically
    const seoSelect = $('#seo-page');
    if (seoSelect) {
      // Remove old project options
      seoSelect.querySelectorAll('option[data-dynamic]').forEach(o => o.remove());
      keys.forEach(k => {
        const opt = document.createElement('option');
        opt.value = projectsData[k].page;
        opt.textContent = projectsData[k].name;
        opt.setAttribute('data-dynamic', '');
        seoSelect.appendChild(opt);
      });
    }

    // Gallery project select
    const galSelect = $('#gallery-project');
    if (galSelect) {
      galSelect.innerHTML = keys.map(k => {
        const shortName = k.replace('serenity-', '');
        return `<option value="${shortName}">${projectsData[k].name}</option>`;
      }).join('');
    }

    currentProject = keys[0];
  }

  // ─── Dashboard ───
  function renderDashboard() {
    if (!projectsData) return;
    const container = $('#dashboard-cards');
    const projects = getProjectKeys();

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
          <th>Unit</th><th>Type</th><th>Floors</th><th>Area</th><th>Land</th><th>Badge</th><th>Status</th><th>Price ($)</th><th></th>
        </tr></thead><tbody>`;

      p.units.forEach((u, i) => {
        html += `<tr>
          <td><input type="text" data-unit="${i}" data-field="id" class="unit-text" value="${u.id}" style="width:48px"></td>
          <td><select data-unit="${i}" data-field="type" class="unit-text-sel">
            ${['1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', '4.5 Bedroom', '5 Bedroom'].map(t => `<option value="${t}"${u.type === t ? ' selected' : ''}>${t}</option>`).join('')}
          </select></td>
          <td><input type="number" data-unit="${i}" data-field="floors" class="unit-text" value="${u.floors}" style="width:48px" min="1" max="5"></td>
          <td><input type="text" data-unit="${i}" data-field="area" class="unit-text" value="${u.area}" style="width:72px"></td>
          <td><input type="text" data-unit="${i}" data-field="land" class="unit-text" value="${u.land}" style="width:72px"></td>
          <td><input type="text" data-unit="${i}" data-field="badge" class="unit-text" value="${u.badge || ''}" style="width:72px" placeholder="—"></td>
          <td><select data-unit="${i}" data-field="status" class="unit-status">
            ${['available', 'booked', 'sold', 'resale'].map(s => `<option value="${s}"${u.status === s ? ' selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`).join('')}
          </select></td>
          <td><input type="number" data-unit="${i}" data-field="price" class="unit-price" value="${u.price || ''}" placeholder="—" min="0" step="1000"></td>
          <td><button class="btn--icon btn--danger" data-delete-unit="${i}" title="Delete unit">&times;</button></td>
        </tr>`;
      });
      html += '</tbody></table><button class="btn btn--outline btn--sm" id="btn-add-unit" style="margin-top:8px">+ Add Unit</button></div>';
    }

    // Village Unit Types
    if (p.unitTypes) {
      html += `<div class="editor-section"><h3>Unit Types</h3>
        <table class="admin-unit-table"><thead><tr>
          <th>Type</th><th>Floors</th><th>Area</th><th>Land</th><th>Units</th><th>Price ($)</th><th></th>
        </tr></thead><tbody>`;

      p.unitTypes.forEach((ut, i) => {
        html += `<tr>
          <td><input type="text" data-utype="${i}" data-field="type" class="utype-text" value="${ut.type}" style="width:100px"></td>
          <td><input type="number" data-utype="${i}" data-field="floors" class="utype-text" value="${ut.floors}" style="width:48px" min="1" max="5"></td>
          <td><input type="text" data-utype="${i}" data-field="area" class="utype-text" value="${ut.area}" style="width:72px"></td>
          <td><input type="text" data-utype="${i}" data-field="land" class="utype-text" value="${ut.land}" style="width:72px"></td>
          <td><input type="number" data-utype="${i}" data-field="count" class="utype-text" value="${ut.count}" style="width:48px" min="0"></td>
          <td><input type="number" data-utype="${i}" data-field="price" class="utype-price" value="${ut.price || ''}" min="0" step="1000"></td>
          <td><button class="btn--icon btn--danger" data-delete-utype="${i}" title="Delete type">&times;</button></td>
        </tr>`;
      });
      html += '</tbody></table><button class="btn btn--outline btn--sm" id="btn-add-utype" style="margin-top:8px">+ Add Type</button></div>';
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
    ['en', 'ru', 'id'].forEach(lng => {
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
    ['en', 'ru', 'id'].forEach(lng => {
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="form-group"><label>Price</label><input type="text" class="showcase-input" data-lang="${lng}" data-field="showcasePrice" value="${(p.showcasePrice[lng] || '')}"></div>
        <div class="form-group" style="margin-top:8px"><label>Description</label><textarea class="showcase-input" data-lang="${lng}" data-field="showcaseDesc" rows="2">${(p.showcaseDesc[lng] || '')}</textarea></div>
      </div>`;
    });
    html += '</div>';

    editor.innerHTML = html;

    // Bind change events — unit fields
    editor.querySelectorAll('.unit-text').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.unit;
        const field = inp.dataset.field;
        if (field === 'floors') {
          p.units[idx][field] = +inp.value;
        } else if (field === 'badge') {
          p.units[idx][field] = inp.value || null;
        } else {
          p.units[idx][field] = inp.value;
        }
        markChanged();
      });
    });

    editor.querySelectorAll('.unit-text-sel').forEach(sel => {
      sel.addEventListener('change', () => {
        const idx = +sel.dataset.unit;
        p.units[idx][sel.dataset.field] = sel.value;
        markChanged();
      });
    });

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

    // Village unit type fields
    editor.querySelectorAll('.utype-text').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.utype;
        const field = inp.dataset.field;
        if (field === 'floors' || field === 'count') {
          p.unitTypes[idx][field] = +inp.value;
        } else {
          p.unitTypes[idx][field] = inp.value;
        }
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

    // Add/Delete units
    const addUnitBtn = $('#btn-add-unit');
    if (addUnitBtn) {
      addUnitBtn.addEventListener('click', () => {
        p.units.push({ id: 'NEW', type: '2 Bedroom', floors: 1, area: '', land: '', status: 'available', price: null, badge: null });
        p.availability.total = p.units.length;
        recalcAvailability();
        markChanged();
        renderProjectEditor();
      });
    }

    editor.querySelectorAll('[data-delete-unit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.deleteUnit;
        if (!confirm(`Delete unit ${p.units[idx].id}?`)) return;
        p.units.splice(idx, 1);
        p.availability.total = p.units.length;
        recalcAvailability();
        markChanged();
        renderProjectEditor();
      });
    });

    // Add/Delete unit types (Village)
    const addUtypeBtn = $('#btn-add-utype');
    if (addUtypeBtn) {
      addUtypeBtn.addEventListener('click', () => {
        p.unitTypes.push({ type: '1 Bedroom', floors: 1, area: '', land: '', count: 0, price: null });
        p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
        markChanged();
        renderProjectEditor();
      });
    }

    editor.querySelectorAll('[data-delete-utype]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.deleteUtype;
        if (!confirm(`Delete type "${p.unitTypes[idx].type}"?`)) return;
        p.unitTypes.splice(idx, 1);
        p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
        markChanged();
        renderProjectEditor();
      });
    });

    $('#avail-sold').addEventListener('input', (e) => {
      p.availability.sold = +e.target.value;
      markChanged();
    });

    // Add generate pages button
    addGeneratePagesButton();
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
    // Rebuild the JS file — copy all projects + global fields
    const data = {};
    getProjectKeys().forEach(key => {
      data[key] = projectsData[key];
    });

    // Copy global fields
    const globalKeys = ['comparisonLabels', 'comparisonData', 'unitTableHeaders', 'statusLabels', 'availabilityLabels', 'villageTableHeaders'];
    globalKeys.forEach(gk => { if (projectsData[gk]) data[gk] = projectsData[gk]; });

    return '/* eslint-disable */\nconst PROJECTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  // ─── SEO Editor ───
  const LANGS = ['en', 'ru', 'id'];
  const LANG_NAMES = { en: 'English', ru: 'Russian', id: 'Indonesian' };
  const BASE_URL = 'https://winstik13.github.io/global-bali-home';
  let seoCache = {}; // { lang: { html, sha, fields } }

  $('#seo-page').addEventListener('change', () => {
    seoCache = {};
    const page = $('#seo-page').value;
    if (page) loadAllSEO(page);
    else $('#seo-editor').innerHTML = '';
  });

  async function loadAllSEO(page) {
    const editor = $('#seo-editor');
    editor.innerHTML = '<p style="color:var(--color-text-dim)">Loading all languages...</p>';

    try {
      // Load all 4 languages in parallel
      const results = await Promise.all(LANGS.map(async (lng) => {
        const path = lng === 'en' ? page : `${lng}/${page}`;
        const file = await fetchFile(path);
        const html = atob(file.content);
        const fields = extractSEO(html);
        return { lng, path, html, sha: file.sha, fields };
      }));

      results.forEach(r => { seoCache[r.lng] = r; });

      // Build editor UI
      let html = '';

      // SERP Preview (EN)
      const enFields = seoCache.en.fields;
      const pageUrl = `${BASE_URL}/${page}`;
      html += `<div class="editor-section seo-preview-section">
        <h3>Google Search Preview</h3>
        <div class="serp-preview">
          <div class="serp-preview__title" id="serp-title">${escAttr(enFields.title)}</div>
          <div class="serp-preview__url">${pageUrl}</div>
          <div class="serp-preview__desc" id="serp-desc">${escAttr(enFields.description)}</div>
        </div>
        <h3 style="margin-top:20px">Social Share Preview</h3>
        <div class="og-preview">
          <div class="og-preview__image">${enFields.ogImage ? `<img src="${escAttr(enFields.ogImage)}" alt="">` : '<span>No OG Image</span>'}</div>
          <div class="og-preview__text">
            <div class="og-preview__site">winstik13.github.io</div>
            <div class="og-preview__title" id="og-title">${escAttr(enFields.ogTitle || enFields.title)}</div>
            <div class="og-preview__desc" id="og-desc">${escAttr(enFields.ogDescription || enFields.description)}</div>
          </div>
        </div>
      </div>`;

      // Fields per language
      LANGS.forEach(lng => {
        const f = seoCache[lng].fields;
        html += `<div class="editor-section seo-lang-section">
          <h3><span class="seo-lang-badge">${lng.toUpperCase()}</span> ${LANG_NAMES[lng]}</h3>
          ${seoFieldHTML(lng, 'title', 'Page Title', f.title, 60)}
          ${seoFieldHTML(lng, 'description', 'Meta Description', f.description, 160)}
          ${seoFieldHTML(lng, 'ogTitle', 'OG Title', f.ogTitle, 60)}
          ${seoFieldHTML(lng, 'ogDescription', 'OG Description', f.ogDescription, 160)}
          ${seoFieldHTML(lng, 'ogImage', 'OG Image URL', f.ogImage, 0)}
          ${seoFieldHTML(lng, 'canonical', 'Canonical URL', f.canonical, 0)}
        </div>`;
      });

      // Save button
      html += `<div class="editor-section" style="display:flex;align-items:center;gap:16px">
        <button id="btn-seo-save" class="btn btn--primary">Save All Languages</button>
        <span id="seo-save-status" class="publish-status"></span>
      </div>`;

      editor.innerHTML = html;

      // Bind counters + live SERP preview update
      editor.querySelectorAll('.seo-input').forEach(inp => {
        inp.addEventListener('input', () => {
          updateSEOCounter(inp);
          // Update live previews from EN fields
          if (inp.dataset.lang === 'en') {
            const key = inp.dataset.seo;
            if (key === 'title') {
              const el = $('#serp-title');
              if (el) el.textContent = inp.value || '(no title)';
            }
            if (key === 'description') {
              const el = $('#serp-desc');
              if (el) el.textContent = inp.value || '(no description)';
            }
            if (key === 'ogTitle') {
              const el = $('#og-title');
              if (el) el.textContent = inp.value || editor.querySelector('[data-lang="en"][data-seo="title"]').value || '(no title)';
            }
            if (key === 'ogDescription') {
              const el = $('#og-desc');
              if (el) el.textContent = inp.value || editor.querySelector('[data-lang="en"][data-seo="description"]').value || '';
            }
          }
        });
        updateSEOCounter(inp);
      });

      // Save all languages
      $('#btn-seo-save').addEventListener('click', async () => {
        const status = $('#seo-save-status');
        const btn = $('#btn-seo-save');
        btn.disabled = true;
        status.textContent = 'Saving all languages...';
        status.className = 'publish-status';

        let saved = 0;
        let errors = [];

        for (const lng of LANGS) {
          const cache = seoCache[lng];
          if (!cache) continue;

          try {
            let updated = cache.html;
            const getVal = (key) => editor.querySelector(`[data-lang="${lng}"][data-seo="${key}"]`).value;
            updated = replaceMeta(updated, 'title', getVal('title'));
            updated = replaceMeta(updated, 'description', getVal('description'));
            updated = replaceMeta(updated, 'ogTitle', getVal('ogTitle'));
            updated = replaceMeta(updated, 'ogDescription', getVal('ogDescription'));
            updated = replaceMeta(updated, 'ogImage', getVal('ogImage'));
            updated = replaceMeta(updated, 'canonical', getVal('canonical'));

            const result = await commitFile(cache.path, updated, `Update SEO: ${page} (${lng})`, cache.sha);
            // Update SHA for potential re-save
            cache.sha = result.content.sha;
            saved++;
            status.textContent = `Saving... ${saved}/${LANGS.length}`;
          } catch (err) {
            errors.push(`${lng}: ${err.message}`);
          }
        }

        if (errors.length) {
          status.textContent = `Saved ${saved}/${LANGS.length}. Errors: ${errors.join('; ')}`;
          status.className = 'publish-status error';
        } else {
          status.textContent = `All ${saved} languages saved!`;
          status.className = 'publish-status success';
        }
        btn.disabled = false;
        updateRateLimit();
      });

    } catch (err) {
      editor.innerHTML = `<p style="color:var(--color-danger)">Error: ${err.message}</p>`;
    }
  }

  function seoFieldHTML(lng, key, label, value, maxLen) {
    const counterAttr = maxLen ? `data-max="${maxLen}"` : '';
    const counterHTML = maxLen ? `<span class="seo-field__counter" data-counter-for="${lng}-${key}" data-max="${maxLen}">0/${maxLen}</span>` : '';
    return `<div class="seo-field">
      <div class="seo-field__header">
        <span class="seo-field__label">${label}</span>
        ${counterHTML}
      </div>
      <div class="form-group"><input type="text" class="seo-input" data-lang="${lng}" data-seo="${key}" ${counterAttr} value="${escAttr(value || '')}"></div>
    </div>`;
  }

  function updateSEOCounter(inp) {
    const lng = inp.dataset.lang;
    const key = inp.dataset.seo;
    const max = +inp.dataset.max;
    if (!max) return;
    const len = inp.value.length;
    const counter = document.querySelector(`[data-counter-for="${lng}-${key}"]`);
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
      ogImage: get(/<meta\s+property="og:image"\s+content="([^"]*)"/),
      canonical: get(/<link\s+rel="canonical"\s+href="([^"]*)"/),
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
    if (key === 'ogImage' && value) {
      return html.replace(/(<meta\s+property="og:image"\s+content=")[^"]*"/, `$1${safe}"`);
    }
    if (key === 'canonical' && value) {
      return html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/, `$1${safe}"`);
    }
    return html;
  }

  // ─── Gallery Manager ───
  const galleryProject = $('#gallery-project');
  const galleryGrid = $('#gallery-grid');
  const galleryUploadBtn = $('#btn-gallery-upload');
  const galleryFileInput = $('#gallery-file-input');
  const galleryProgress = $('#gallery-upload-progress');
  const galleryDropZone = $('#gallery-drop-zone');
  const galleryCount = $('#gallery-count');
  let galleryDataCopy = null; // working copy

  function getGalleryData() {
    if (!galleryDataCopy) {
      galleryDataCopy = typeof GALLERY_DATA !== 'undefined' ? JSON.parse(JSON.stringify(GALLERY_DATA)) : { villas: [], estates: [], village: [] };
    }
    return galleryDataCopy;
  }

  galleryProject.addEventListener('change', renderGallery);
  galleryUploadBtn.addEventListener('click', () => galleryFileInput.click());
  galleryFileInput.addEventListener('change', (e) => handleGalleryUpload(Array.from(e.target.files)));

  // Drag & drop
  galleryDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    galleryDropZone.classList.add('dragover');
  });
  galleryDropZone.addEventListener('dragleave', () => {
    galleryDropZone.classList.remove('dragover');
  });
  galleryDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    galleryDropZone.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) handleGalleryUpload(files);
  });

  function renderGallery() {
    const cat = galleryProject.value;
    const data = getGalleryData();
    const images = data[cat] || [];

    galleryCount.textContent = `${images.length} photos`;

    if (!images.length) {
      galleryGrid.innerHTML = '<p style="color:var(--color-text-dim);padding:20px 0">No images in this project. Upload some photos.</p>';
      return;
    }

    galleryGrid.innerHTML = images.map((img, i) => {
      const name = img.split('/').pop();
      return `<div class="admin-gallery-item" data-index="${i}">
        <img src="../${img}" alt="${escAttr(name)}" loading="lazy">
        <div class="admin-gallery-item__info">${escAttr(name)}</div>
        <div class="admin-gallery-item__actions">
          <button class="admin-gallery-item__btn admin-gallery-item__btn--up" data-move-up="${i}" title="Move left">&#8592;</button>
          <button class="admin-gallery-item__btn admin-gallery-item__btn--down" data-move-down="${i}" title="Move right">&#8594;</button>
          <button class="admin-gallery-item__btn admin-gallery-item__btn--delete" data-delete="${i}" title="Delete">&times;</button>
        </div>
      </div>`;
    }).join('');

    // Bind actions
    galleryGrid.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteGalleryImage(cat, +btn.dataset.delete));
    });
    galleryGrid.querySelectorAll('[data-move-up]').forEach(btn => {
      btn.addEventListener('click', () => moveGalleryImage(cat, +btn.dataset.moveUp, -1));
    });
    galleryGrid.querySelectorAll('[data-move-down]').forEach(btn => {
      btn.addEventListener('click', () => moveGalleryImage(cat, +btn.dataset.moveDown, 1));
    });
  }

  function moveGalleryImage(cat, index, direction) {
    const data = getGalleryData();
    const images = data[cat];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    [images[index], images[newIndex]] = [images[newIndex], images[index]];
    renderGallery();
    // Auto-save order
    saveGalleryData('Reorder gallery: ' + cat);
  }

  async function handleGalleryUpload(files) {
    if (!files.length) return;

    const cat = galleryProject.value;
    // Build folder from project slug: "villas" → "serenity-villas" → "images/serenity-villas"
    const matchKey = getProjectKeys().find(k => k.replace('serenity-', '') === cat) || ('serenity-' + cat);
    const folder = `images/${matchKey}`;
    const data = getGalleryData();

    galleryProgress.hidden = false;
    let uploaded = 0;

    for (const file of files) {
      galleryProgress.innerHTML = `<div class="gallery-progress__text">Uploading ${uploaded + 1}/${files.length}: ${escAttr(file.name)}</div>
        <div class="gallery-progress__bar"><div class="gallery-progress__fill" style="width:${Math.round((uploaded / files.length) * 100)}%"></div></div>`;

      try {
        const resized = await resizeImage(file, 1920, 0.8);
        const base64 = resized.split(',')[1];
        const path = `${folder}/${file.name}`;
        await commitFile(path, null, `Add gallery image: ${file.name}`, null, base64);

        // Add to local data
        if (!data[cat]) data[cat] = [];
        if (!data[cat].includes(path)) data[cat].push(path);
        uploaded++;
      } catch (err) {
        console.error('Upload failed:', file.name, err);
        galleryProgress.innerHTML += `<div style="color:var(--color-danger);font-size:0.8rem">Failed: ${escAttr(file.name)} — ${err.message}</div>`;
      }
    }

    // Update gallery-data.js
    galleryProgress.innerHTML = `<div class="gallery-progress__text">Saving gallery data...</div>
      <div class="gallery-progress__bar"><div class="gallery-progress__fill" style="width:100%"></div></div>`;
    await saveGalleryData('Add gallery images via admin panel');

    galleryProgress.innerHTML = `<div class="gallery-progress__text" style="color:var(--color-success)">${uploaded}/${files.length} photos uploaded!</div>`;
    setTimeout(() => { galleryProgress.hidden = true; }, 3000);

    renderGallery();
    galleryFileInput.value = '';
    updateRateLimit();
  }

  async function deleteGalleryImage(cat, index) {
    const data = getGalleryData();
    const images = data[cat];
    if (!images || !images[index]) return;

    const fileName = images[index].split('/').pop();
    if (!confirm(`Delete "${fileName}"?`)) return;

    try {
      const file = await fetchFile(images[index]);
      await deleteFile(images[index], file.sha, `Remove gallery image: ${fileName}`);
      images.splice(index, 1);
      await saveGalleryData('Remove gallery image: ' + fileName);
      renderGallery();
      updateRateLimit();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  }

  async function saveGalleryData(message) {
    const data = getGalleryData();
    const content = 'const GALLERY_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
    await commitFile('gallery-data.js', content, message);
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

  // ─── Generate Detail Pages ───
  function addGeneratePagesButton() {
    const actions = $('.editor-actions');
    if (!actions) return;
    // Remove existing generate button
    const existing = $('#btn-generate-pages');
    if (existing) existing.remove();

    const btn = document.createElement('button');
    btn.id = 'btn-generate-pages';
    btn.className = 'btn btn--outline';
    btn.textContent = 'Generate Detail Pages';
    btn.style.marginLeft = '12px';
    actions.appendChild(btn);

    btn.addEventListener('click', async () => {
      const p = projectsData[currentProject];
      if (!p) return;

      // Check if pages already exist
      let pageExists = false;
      try {
        await fetchFile(p.page);
        pageExists = true;
      } catch { /* new file */ }

      if (pageExists && !confirm(`Pages for "${p.name}" already exist. Overwrite?`)) return;

      btn.disabled = true;
      btn.textContent = 'Generating...';
      const status = $('#publish-status');

      try {
        const langConfigs = [
          { lang: 'en', langFull: 'English', prefix: '', htmlLang: 'en', path: p.page },
          { lang: 'ru', langFull: 'Русский', prefix: '../', htmlLang: 'ru', path: `ru/${p.page}` },
          { lang: 'id', langFull: 'Bahasa Indonesia', prefix: '../', htmlLang: 'id', path: `id/${p.page}` },
        ];

        let generated = 0;
        for (const cfg of langConfigs) {
          const html = buildDetailPage(p, currentProject, cfg);
          let sha;
          try { sha = (await fetchFile(cfg.path)).sha; } catch { /* new */ }
          await commitFile(cfg.path, html, `Generate detail page: ${p.name} (${cfg.lang})`, sha);
          generated++;
          status.textContent = `Generating... ${generated}/${langConfigs.length}`;
        }

        status.textContent = `${generated} pages generated!`;
        status.className = 'publish-status success';
      } catch (err) {
        status.textContent = 'Error: ' + err.message;
        status.className = 'publish-status error';
      }
      btn.disabled = false;
      btn.textContent = 'Generate Detail Pages';
      updateRateLimit();
    });
  }

  const PAGE_LABELS = {
    en: { home: 'Home', projects: 'Projects', services: 'Services', about: 'About', gallery: 'Gallery', contact: 'Contact', findVilla: 'Find My Villa', nav: 'Navigation', concept: 'The Concept', conceptTitle: 'About This Project', availability: 'Availability', unitSelection: 'Unit Selection', galleryTitle: 'Project Images', viewPhotos: 'View Photos', interested: 'Interested in', getConsult: 'Get a Consultation', footer: 'Global Bali Home is an international real estate company focused on the development of high-quality properties in Bali.', copyright: '&copy; 2024–2026 Global Bali Home. All rights reserved.' },
    ru: { home: 'Главная', projects: 'Проекты', services: 'Услуги', about: 'О нас', gallery: 'Галерея', contact: 'Контакты', findVilla: 'Найти виллу', nav: 'Навигация', concept: 'Концепция', conceptTitle: 'О проекте', availability: 'Доступность', unitSelection: 'Выбор юнитов', galleryTitle: 'Фотографии проекта', viewPhotos: 'Смотреть фото', interested: 'Интересует', getConsult: 'Получить консультацию', footer: 'Global Bali Home — международная компания по строительству премиальной недвижимости на Бали.', copyright: '&copy; 2024–2026 Global Bali Home. Все права защищены.' },
    id: { home: 'Beranda', projects: 'Proyek', services: 'Layanan', about: 'Tentang', gallery: 'Galeri', contact: 'Kontak', findVilla: 'Temukan Villa', nav: 'Navigasi', concept: 'Konsep', conceptTitle: 'Tentang Proyek Ini', availability: 'Ketersediaan', unitSelection: 'Pilihan Unit', galleryTitle: 'Galeri Proyek', viewPhotos: 'Lihat Foto', interested: 'Tertarik dengan', getConsult: 'Hubungi Kami', footer: 'Global Bali Home adalah perusahaan real estate internasional yang fokus pada pengembangan properti berkualitas tinggi di Bali.', copyright: '&copy; 2024–2026 Global Bali Home. Hak cipta dilindungi.' },
  };

  function buildDetailPage(proj, slug, cfg) {
    const L = PAGE_LABELS[cfg.lang] || PAGE_LABELS.en;
    const p = cfg.prefix;
    const BASE_URL = 'https://winstik13.github.io/global-bali-home';
    const pageUrl = `${BASE_URL}/${proj.page}`;
    const desc = (proj.showcaseDesc && (proj.showcaseDesc[cfg.lang] || proj.showcaseDesc.en)) || proj.name;
    const subtitle = (proj.showcaseSubtitle && (proj.showcaseSubtitle[cfg.lang] || proj.showcaseSubtitle.en)) || '';
    const image = proj.showcaseImage ? `${BASE_URL}/${proj.showcaseImage}` : '';

    // Lang switcher
    const langLinks = [
      { lang: 'en', label: 'English', href: `${p}${proj.page}` },
      { lang: 'id', label: 'Bahasa Indonesia', href: `${cfg.lang === 'en' ? 'id/' : (cfg.lang === 'id' ? '' : '../id/')}${proj.page}` },
      { lang: 'ru', label: 'Русский', href: `${cfg.lang === 'en' ? 'ru/' : (cfg.lang === 'ru' ? '' : '../ru/')}${proj.page}` },
    ];
    const langToggleLabel = cfg.lang === 'en' ? 'EN' : cfg.lang === 'ru' ? 'RU' : 'ID';
    const langDropdown = langLinks.map(l =>
      l.lang === cfg.lang ? `<span class="active">${l.label}</span>` : `<a href="${l.href}">${l.label}</a>`
    ).join('');

    return `<!DOCTYPE html>
<html lang="${cfg.htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escAttr(desc)}">
  <title>${escAttr(proj.name)} — Global Bali Home</title>
  <link rel="icon" href="${p}images/common/favicon.ico">
  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="en" href="${BASE_URL}/${proj.page}">
  <link rel="alternate" hreflang="ru" href="${BASE_URL}/ru/${proj.page}">
  <link rel="alternate" hreflang="id" href="${BASE_URL}/id/${proj.page}">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/${proj.page}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escAttr(proj.name)} — Global Bali Home">
  <meta property="og:description" content="${escAttr(desc)}">
  ${image ? `<meta property="og:image" content="${escAttr(image)}">` : ''}
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Global Bali Home">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escAttr(proj.name)} — Global Bali Home">
  <meta name="twitter:description" content="${escAttr(desc)}">
  ${image ? `<meta name="twitter:image" content="${escAttr(image)}">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="${p}css/reset.css">
  <link rel="stylesheet" href="${p}css/style.css">
</head>
<body>

  <header class="header header--transparent">
    <div class="container">
      <a href="index.html" class="header__logo"><img src="${p}images/common/logo-transparent.png" alt="GlobalBaliHome" width="1000" height="740"></a>
      <nav class="header__nav">
        <a href="index.html">${L.home}</a>
        <a href="projects.html">${L.projects}</a>
        <a href="services.html">${L.services}</a>
        <a href="about.html">${L.about}</a>
        <a href="gallery.html">${L.gallery}</a>
        <a href="contacts.html">${L.contact}</a>
      </nav>
      <div class="header__lang"><button class="header__lang-toggle">${langToggleLabel} <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown">${langDropdown}</div></div>
      <button class="header__cta btn btn--outline" data-quiz>${L.findVilla}</button>
      <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </header>

  <section class="fullbleed-hero">
    <div class="fullbleed-hero__bg"${proj.showcaseImage ? ` style="background-image: url('${p}${proj.showcaseImage}');"` : ''}></div>
    <div class="fullbleed-hero__overlay"></div>
    <div class="fullbleed-hero__top">
      <div class="container">
        <nav class="page-hero__breadcrumbs"><a href="index.html">${L.home}</a> <span>/</span> <a href="projects.html">${L.projects}</a> <span>/</span> <span>${proj.name}</span></nav>
        <p class="page-hero__subtitle">${escAttr(subtitle)}</p>
        <h1>${proj.name}</h1>
        <div class="hero-stats" data-project="${slug}"></div>
      </div>
    </div>
  </section>

  <section class="section bg-alt">
    <div class="container">
      <div class="split-section reveal">
        <div class="split-section__content" style="max-width:100%">
          <span class="section-header__tag">${L.concept}</span>
          <h2>${L.conceptTitle}</h2>
          <p>${escAttr(desc)}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-header__tag">${L.availability}</span>
        <h2>${L.unitSelection}</h2>
      </div>
      <div class="availability-bar reveal" data-project="${slug}"></div>
      <div class="reveal">
        <div class="table-wrap"><table class="unit-table" data-project="${slug}"></table></div>
      </div>
    </div>
  </section>

  <section class="cta-section logo-watermark logo-watermark--right">
    <div class="container reveal">
      <h2>${L.interested} ${proj.name}?</h2>
      <p>${escAttr(desc)}</p>
      <a href="contacts.html" class="btn btn--primary">${L.getConsult}</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <img src="${p}images/common/logo-transparent.png" alt="GlobalBaliHome" loading="lazy" width="1000" height="740">
          <p>${L.footer}</p>
        </div>
        <div>
          <h4 class="footer__heading">${L.nav}</h4>
          <div class="footer__links"><a href="about.html">${L.about}</a><a href="projects.html">${L.projects}</a><a href="services.html">${L.services}</a><a href="gallery.html">${L.gallery}</a><a href="contacts.html">${L.contact}</a></div>
        </div>
        <div>
          <h4 class="footer__heading">${L.projects}</h4>
          <div class="footer__links" data-footer-projects><a href="project-serenity-villas.html">Serenity Villas</a><a href="project-serenity-estates.html">Serenity Estates</a><a href="project-serenity-village.html">Serenity Village</a></div>
        </div>
        <div>
          <h4 class="footer__heading">${L.contact}</h4>
          <p class="footer__contact-item">+62 813 251 438 49</p>
          <p class="footer__contact-item">office@globalbalihome.com</p>
          <p class="footer__contact-item">Ubud, Bali, Indonesia</p>
          <div class="footer__social"><a href="https://www.facebook.com/serenityvillasbali" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a><a href="https://www.instagram.com/serenity_villas_bali" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a></div>
        </div>
      </div>
      <div class="footer__bottom">${L.copyright}</div>
    </div>
  </footer>

  <a href="https://wa.me/6281338741177" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "${escAttr(proj.name)}",
    "description": "${escAttr(desc)}",
    "url": "${pageUrl}",
    ${image ? `"image": "${escAttr(image)}",` : ''}
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "${proj.startingPrice || 0}",
      "priceCurrency": "USD"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ubud",
      "addressRegion": "Bali",
      "addressCountry": "ID"
    }
  }
  </script>
  <script src="${p}data/projects-data.js" defer></script>
  <script src="${p}js/main.js" defer></script>
</body>
</html>`;
  }

  // ─── New Project Modal ───
  function showNewProjectModal() {
    // Remove existing modal
    const existing = $('#new-project-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'new-project-modal';
    modal.className = 'admin-modal';
    modal.innerHTML = `<div class="admin-modal__backdrop"></div>
      <div class="admin-modal__content">
        <div class="admin-modal__header">
          <h2>Add New Project</h2>
          <button class="admin-modal__close">&times;</button>
        </div>
        <div class="admin-modal__body">
          <div class="form-group"><label>Project Name</label><input type="text" id="np-name" placeholder="e.g. Serenity Heights"></div>
          <div class="form-group"><label>Slug (auto)</label><input type="text" id="np-slug" placeholder="serenity-heights" readonly></div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:140px"><label>Status</label>
              <select id="np-status"><option value="pre-sale">Pre-Sale</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select>
            </div>
            <div class="form-group" style="flex:1;min-width:140px"><label>Starting Price ($)</label><input type="number" id="np-price" placeholder="119000" min="0" step="1000"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>Total Units</label><input type="number" id="np-units" value="1" min="1"></div>
          </div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:140px"><label>Bedrooms</label><input type="text" id="np-bedrooms" placeholder="2–3"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>Handover</label><input type="text" id="np-handover" placeholder="Q1 2028"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>Showcase Image</label><input type="text" id="np-image" placeholder="images/project/hero.jpg"></div>
          </div>
          <h3 style="margin-top:16px">Showcase Text (EN)</h3>
          <div class="form-group"><label>Short Subtitle</label><input type="text" id="np-subtitle" placeholder="12 modern villas with jungle views"></div>
          <div class="form-group"><label>Description</label><textarea id="np-desc" rows="2" placeholder="Full description for projects page"></textarea></div>
          <h3 style="margin-top:16px">Comparison Data</h3>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:120px"><label>Area Range</label><input type="text" id="np-area" placeholder="100–200 m²"></div>
            <div class="form-group" style="flex:1;min-width:120px"><label>Land Range</label><input type="text" id="np-land" placeholder="2–3 are"></div>
            <div class="form-group" style="flex:1;min-width:120px"><label>Pool</label><input type="text" id="np-pool" placeholder="Private"></div>
          </div>
        </div>
        <div class="admin-modal__footer">
          <button class="btn btn--outline" id="np-cancel">Cancel</button>
          <button class="btn btn--primary" id="np-create">Create Project</button>
        </div>
      </div>`;

    document.body.appendChild(modal);

    // Auto-generate slug from name
    $('#np-name').addEventListener('input', () => {
      const name = $('#np-name').value;
      $('#np-slug').value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    });

    // Close
    modal.querySelector('.admin-modal__backdrop').addEventListener('click', () => modal.remove());
    modal.querySelector('.admin-modal__close').addEventListener('click', () => modal.remove());
    $('#np-cancel').addEventListener('click', () => modal.remove());

    // Create
    $('#np-create').addEventListener('click', () => {
      const name = $('#np-name').value.trim();
      const slug = $('#np-slug').value.trim();
      if (!name || !slug) { alert('Name is required'); return; }
      if (projectsData[slug]) { alert('Project with this slug already exists'); return; }

      const status = $('#np-status').value;
      const price = +$('#np-price').value || 0;
      const totalUnits = +$('#np-units').value || 1;
      const bedrooms = $('#np-bedrooms').value || '1–2';
      const handover = $('#np-handover').value || '';
      const image = $('#np-image').value || '';
      const subtitle = $('#np-subtitle').value || name;
      const desc = $('#np-desc').value || subtitle;
      const area = $('#np-area').value || '';
      const land = $('#np-land').value || '';
      const pool = $('#np-pool').value || 'Private';
      const priceLabel = price ? 'From $' + price.toLocaleString('en-US') : '';

      const nextOrder = getProjectKeys().length + 1;

      // Build the project object
      const proj = {
        slug: slug,
        page: `project-${slug}.html`,
        name: name,
        order: nextOrder,
        totalUnits: totalUnits,
        bedrooms: bedrooms,
        handover: handover,
        status: status,
        startingPrice: price,
        showcaseImage: image,
        showcaseSubtitle: { en: subtitle, ru: subtitle, id: subtitle },
        showcaseMeta: {
          en: [{ strong: String(totalUnits), label: 'Villas' }, { strong: bedrooms, label: 'Bedrooms' }, { strong: handover || status, label: handover ? 'Handover' : 'Status' }],
          ru: [{ strong: String(totalUnits), label: 'Вилл' }, { strong: bedrooms, label: 'Спальни' }, { strong: handover || status, label: handover ? 'Сдача' : 'Статус' }],
          id: [{ strong: String(totalUnits), label: 'Villa' }, { strong: bedrooms, label: 'Kamar Tidur' }, { strong: handover || status, label: handover ? 'Serah Terima' : 'Status' }],
        },
        compArea: area,
        compLand: land,
        compPool: { en: pool, ru: pool, id: pool },
        heroStats: {
          en: [{ number: String(totalUnits), label: 'Villas' }, { number: bedrooms, label: 'Bedrooms' }, { number: priceLabel ? '$' + (price / 1000 | 0) + 'K' : '', label: 'From' }],
          ru: [{ number: String(totalUnits), label: 'Вилл' }, { number: bedrooms, label: 'Спальни' }, { number: priceLabel ? '$' + (price / 1000 | 0) + 'K' : '', label: 'От' }],
          id: [{ number: String(totalUnits), label: 'Vila' }, { number: bedrooms, label: 'Kamar Tidur' }, { number: priceLabel ? '$' + (price / 1000 | 0) + 'K' : '', label: 'Mulai Dari' }],
        },
        availability: { sold: 0, total: totalUnits },
        showcasePrice: { en: priceLabel, ru: priceLabel.replace('From', 'От'), id: priceLabel },
        showcaseStatus: {
          en: status === 'pre-sale' ? 'Pre-Sale' : status === 'completed' ? 'Completed' : 'In Progress',
          ru: status === 'pre-sale' ? 'Предпродажа' : status === 'completed' ? 'Завершён' : 'Строится',
          id: status === 'pre-sale' ? 'Pra-Penjualan' : status === 'completed' ? 'Selesai' : 'Dalam Pembangunan',
        },
        showcaseAvailability: {
          en: status === 'pre-sale' ? 'Pre-Sale Open' : '0 of ' + totalUnits + ' units sold',
          ru: status === 'pre-sale' ? 'Предпродажа открыта' : '0 из ' + totalUnits + ' продано',
          id: status === 'pre-sale' ? 'Pra-Penjualan Dibuka' : '0 dari ' + totalUnits + ' unit terjual',
        },
        showcaseDesc: { en: desc, ru: desc, id: desc },
        showcaseCta: { en: 'View Details', ru: 'Подробнее', id: 'Lihat Detail' },
        units: []
      };

      // Pre-populate units
      for (let i = 0; i < totalUnits; i++) {
        proj.units.push({ id: String.fromCharCode(65 + (i / 4 | 0)) + ((i % 4) + 1), type: '2 Bedroom', floors: 1, area: '', land: '', status: 'available', price: price, badge: null });
      }

      // Add pre-sale banner for pre-sale projects
      if (status === 'pre-sale') {
        proj.preSaleBanner = {
          en: 'Pre-Sale Now Open — Register Your Interest Today',
          ru: 'Предпродажа открыта — Зарегистрируйте ваш интерес',
          id: 'Pra-Penjualan Dibuka — Daftarkan Minat Anda Hari Ini',
        };
      }

      // Add to data
      projectsData[slug] = proj;
      currentProject = slug;
      markChanged();

      // Rebuild UI
      buildDynamicUI();
      renderDashboard();
      renderProjectEditor();

      // Activate the new project tab
      $$('.project-tabs__btn').forEach(b => b.classList.remove('active'));
      const newTab = document.querySelector(`.project-tabs__btn[data-proj="${slug}"]`);
      if (newTab) newTab.classList.add('active');

      modal.remove();
    });
  }

  // ─── Investment Guide PDF Upload ───
  let siteData = null;

  function loadSiteData() {
    if (typeof SITE_DATA !== 'undefined') {
      siteData = JSON.parse(JSON.stringify(SITE_DATA));
    } else {
      siteData = { investmentGuide: { path: 'assets/bali-investment-guide-2026.pdf', version: '2026', updatedAt: '' }, exchangeRate: { usdToIdr: 16500, updatedAt: '' } };
    }
    if (!siteData.exchangeRate) siteData.exchangeRate = { usdToIdr: 16500, updatedAt: '' };
  }

  function renderRateInfo() {
    if (!siteData) loadSiteData();
    const info = $('#rate-info');
    const input = $('#rate-input');
    if (!info) return;
    const rate = siteData.exchangeRate;
    input.value = rate.usdToIdr;
    if (rate.updatedAt) {
      info.innerHTML = `<p><strong>Current rate:</strong> 1 USD = ${Number(rate.usdToIdr).toLocaleString('id-ID')} IDR &bull; <strong>Updated:</strong> ${rate.updatedAt}</p>`;
    } else {
      info.innerHTML = '<p style="color:var(--color-text-dim)">Default rate. Update to show accurate IDR prices on the site.</p>';
    }
  }

  const rateSaveBtn = $('#btn-rate-save');
  if (rateSaveBtn) {
    rateSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const input = $('#rate-input');
      const newRate = parseInt(input.value, 10);
      if (!newRate || newRate < 1000) { alert('Enter a valid rate (e.g. 16500)'); return; }

      rateSaveBtn.disabled = true;
      const status = $('#rate-save-status');
      status.textContent = 'Saving...';
      status.className = 'publish-status';

      try {
        siteData.exchangeRate.usdToIdr = newRate;
        siteData.exchangeRate.updatedAt = new Date().toISOString().split('T')[0];
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update exchange rate: 1 USD = ' + newRate + ' IDR');
        status.textContent = 'Saved! Site updating (~1-2 min)';
        status.className = 'publish-status success';
        renderRateInfo();
        updateRateLimit();
      } catch (err) {
        status.textContent = 'Error: ' + err.message;
        status.className = 'publish-status error';
      }
      rateSaveBtn.disabled = false;
    });
  }

  function renderGuideInfo() {
    if (!siteData) loadSiteData();
    const info = $('#guide-info');
    if (!info) return;
    const guide = siteData.investmentGuide;
    if (guide.updatedAt) {
      info.innerHTML = `<p><strong>Current file:</strong> ${escAttr(guide.path)}</p><p><strong>Version:</strong> ${guide.version} &bull; <strong>Updated:</strong> ${guide.updatedAt}</p>`;
    } else {
      info.innerHTML = '<p style="color:var(--color-text-dim)">No PDF uploaded yet. Upload a file to enable the Investment Guide download.</p>';
    }
  }

  const guideUploadBtn = $('#btn-guide-upload');
  const guideFileInput = $('#guide-file-input');

  if (guideUploadBtn && guideFileInput) {
    guideUploadBtn.addEventListener('click', () => guideFileInput.click());

    guideFileInput.addEventListener('change', async () => {
      const file = guideFileInput.files[0];
      if (!file) return;
      if (!file.name.endsWith('.pdf')) {
        alert('Please select a PDF file');
        return;
      }

      const status = $('#guide-upload-status');
      guideUploadBtn.disabled = true;
      status.textContent = 'Uploading PDF...';
      status.className = 'publish-status';

      try {
        // Read file as base64
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        if (!siteData) loadSiteData();
        const pdfPath = siteData.investmentGuide.path || 'assets/bali-investment-guide-2026.pdf';

        // Upload PDF via GitHub API
        await commitFile(pdfPath, '', 'Upload Investment Guide PDF via admin', null, base64);

        // Update site-data.js
        const today = new Date().toISOString().split('T')[0];
        siteData.investmentGuide.updatedAt = today;
        const siteDataContent = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', siteDataContent, 'Update site data: investment guide metadata');

        status.textContent = 'Uploaded! Site updating (~1-2 min)';
        status.className = 'publish-status success';
        renderGuideInfo();
        updateRateLimit();
      } catch (err) {
        status.textContent = 'Error: ' + err.message;
        status.className = 'publish-status error';
      }
      guideUploadBtn.disabled = false;
      guideFileInput.value = '';
    });
  }

  // ─── FAQ Editor ───
  let faqData = null;
  let faqChanged = false;

  function loadFaqData() {
    if (typeof FAQ_DATA !== 'undefined') {
      faqData = JSON.parse(JSON.stringify(FAQ_DATA));
    } else {
      faqData = [];
    }
  }

  function renderFaqEditor() {
    if (!faqData) loadFaqData();
    const editor = $('#faq-editor');
    if (!editor) return;

    const sorted = faqData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));

    if (!sorted.length) {
      editor.innerHTML = '<p style="color:var(--color-text-dim)">No FAQ items. Click "+ Add Question" to create one.</p>';
      return;
    }

    editor.innerHTML = sorted.map((item, idx) => {
      const i = faqData.indexOf(item);
      return `<div class="faq-editor-item" data-faq-idx="${i}">
        <div class="faq-editor-item__header">
          <span class="faq-editor-item__num">#${idx + 1}</span>
          <div class="faq-editor-item__controls">
            <button class="btn btn--icon" data-faq-up="${i}" title="Move Up" ${idx === 0 ? 'disabled' : ''}>↑</button>
            <button class="btn btn--icon" data-faq-down="${i}" title="Move Down" ${idx === sorted.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="btn btn--icon btn--danger" data-faq-delete="${i}" title="Delete">🗑</button>
          </div>
        </div>
        ${LANGS.map(lng => `<div class="faq-editor-lang">
          <div class="faq-editor-lang__label">${LANG_NAMES[lng]}</div>
          <div class="form-group"><label>Question</label><input type="text" data-faq-field="question" data-faq-i="${i}" data-faq-lng="${lng}" value="${escAttr(item.question[lng] || '')}"></div>
          <div class="form-group"><label>Answer</label><textarea data-faq-field="answer" data-faq-i="${i}" data-faq-lng="${lng}" rows="3">${escAttr(item.answer[lng] || '')}</textarea></div>
        </div>`).join('')}
      </div>`;
    }).join('');

    // Bind input events
    editor.querySelectorAll('[data-faq-field]').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.faqI;
        const field = el.dataset.faqField;
        const lng = el.dataset.faqLng;
        faqData[i][field][lng] = el.value;
        faqChanged = true;
      });
    });

    // Move up/down
    editor.querySelectorAll('[data-faq-up]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.faqUp;
        const item = faqData[i];
        const sorted2 = faqData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
        const pos = sorted2.indexOf(item);
        if (pos <= 0) return;
        const prev = sorted2[pos - 1];
        const tmpOrder = item.order;
        item.order = prev.order;
        prev.order = tmpOrder;
        faqChanged = true;
        renderFaqEditor();
      });
    });

    editor.querySelectorAll('[data-faq-down]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.faqDown;
        const item = faqData[i];
        const sorted2 = faqData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
        const pos = sorted2.indexOf(item);
        if (pos >= sorted2.length - 1) return;
        const next = sorted2[pos + 1];
        const tmpOrder = item.order;
        item.order = next.order;
        next.order = tmpOrder;
        faqChanged = true;
        renderFaqEditor();
      });
    });

    // Delete
    editor.querySelectorAll('[data-faq-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Delete this FAQ item?')) return;
        const i = +btn.dataset.faqDelete;
        faqData.splice(i, 1);
        faqChanged = true;
        renderFaqEditor();
      });
    });
  }

  // Add Question
  const faqAddBtn = $('#btn-faq-add');
  if (faqAddBtn) {
    faqAddBtn.addEventListener('click', () => {
      if (!faqData) loadFaqData();
      const maxOrder = faqData.reduce((m, it) => Math.max(m, it.order || 0), 0);
      faqData.push({
        order: maxOrder + 1,
        question: { en: '', ru: '', id: '' },
        answer: { en: '', ru: '', id: '' }
      });
      faqChanged = true;
      renderFaqEditor();
    });
  }

  // Publish FAQ
  const faqPublishBtn = $('#btn-faq-publish');
  if (faqPublishBtn) {
    faqPublishBtn.addEventListener('click', async () => {
      if (!faqChanged || !faqData) return;
      faqPublishBtn.disabled = true;
      const status = $('#faq-publish-status');
      status.textContent = 'Publishing FAQ...';
      status.className = 'publish-status';

      try {
        const content = buildFaqDataJS();
        await commitFile('data/faq-data.js', content, 'Update FAQ data via admin panel');
        faqChanged = false;
        status.textContent = 'Published! Site updating (~1-2 min)';
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = 'Error: ' + err.message;
        status.className = 'publish-status error';
      }
      faqPublishBtn.disabled = false;
    });
  }

  function buildFaqDataJS() {
    return '/* eslint-disable */\nconst FAQ_DATA = ' + JSON.stringify(faqData, null, 2) + ';\n';
  }

  // Auto-render FAQ when tab is activated
  const faqNavBtn = document.querySelector('.admin-nav__btn[data-tab="faq"]');
  if (faqNavBtn) {
    faqNavBtn.addEventListener('click', () => {
      if (!faqData) loadFaqData();
      renderFaqEditor();
    });
  }

  // ─── Helpers ───
  function escAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
