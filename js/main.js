/* ============================================
   GLOBAL BALI HOME — Main JS
   Dark Premium Theme
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.querySelector('.header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 50) {
        header.classList.remove('header--transparent');
        header.classList.add('header--solid');
      } else {
        header.classList.add('header--transparent');
        header.classList.remove('header--solid');
      }
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader);
  }

  // --- Mobile menu ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header__nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Active nav link ---
  const navLinks = document.querySelectorAll('.header__nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage.startsWith('project-') && href === 'projects.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal Animations ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // Stagger children reveal
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.transitionDelay = (i * 0.12) + 's';
          child.classList.add('visible');
        });
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-stagger').forEach(el => {
    staggerObserver.observe(el);
  });

  // --- Hero Video ---
  const heroVideo = document.querySelector('.hero__video');
  const heroSection = document.querySelector('.hero');
  if (heroVideo && heroSection) {
    heroVideo.addEventListener('canplay', () => {
      heroSection.classList.add('loaded');
    }, { once: true });
  }

  // --- Hero Parallax (disabled for home hero) ---

  // Page hero parallax
  const pageHeroBg = document.querySelector('.page-hero__bg');
  const pageHeroSection = document.querySelector('.page-hero');
  if (pageHeroBg && pageHeroSection) {
    let ticking = false;
    const heroHeight = pageHeroSection.offsetHeight;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < heroHeight) {
            pageHeroBg.style.transform = `translateY(${scrolled * 0.2}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Number Counter Animation ---
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^(\$?)([\d,.]+)(\+?%?\+?)$/);

        if (match) {
          const prefix = match[1];
          const numStr = match[2].replace(/,/g, '');
          const suffix = match[3];
          const target = parseFloat(numStr);
          const isDecimal = numStr.includes('.');
          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (isDecimal) {
              el.textContent = prefix + current.toFixed(1) + suffix;
            } else if (target >= 1000) {
              el.textContent = prefix + Math.floor(current).toLocaleString('en-US') + suffix;
            } else {
              el.textContent = prefix + Math.floor(current) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = text;
            }
          };

          requestAnimationFrame(animate);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });

  // --- Dynamic Gallery ---
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryEmpty = document.getElementById('gallery-empty');
  const filterBtns = document.querySelectorAll('.gallery-filter');
  const loadMoreWrap = document.getElementById('gallery-load-more');
  const loadMoreBtn = document.getElementById('load-more-btn');

  if (galleryGrid) {
    const galleryData = typeof GALLERY_DATA !== 'undefined' ? GALLERY_DATA : {};
    const INITIAL_COUNT = 20;
    let allCurrentItems = [];
    let visibleCount = 0;

    const categoryNames = {
      villas: 'Serenity Villas',
      estates: 'Serenity Estates',
      village: 'Serenity Village'
    };

    // Curated picks for "All" — best images from each project, fixed order
    const curatedAll = [
      { src: 'images/serenity-villas/aerial-view.jpg', category: 'villas' },
      { src: 'images/serenity-estates/Static.0000.jpg', category: 'estates' },
      { src: 'images/serenity-village/6House_Max.0001.jpg', category: 'village' },
      { src: 'images/serenity-villas/R1_LR_K_ (1).jpg', category: 'villas' },
      { src: 'images/serenity-estates/villa-a2.jpg', category: 'estates' },
      { src: 'images/serenity-village/Pool_Max.0000.jpg', category: 'village' },
      { src: 'images/serenity-villas/bathroom.jpg', category: 'villas' },
      { src: 'images/serenity-estates/pool-villa-a1.jpg', category: 'estates' },
      { src: 'images/serenity-village/Night.0000.jpg', category: 'village' },
      { src: 'images/serenity-villas/R1_BR_ (1).jpg', category: 'villas' },
      { src: 'images/serenity-estates/Static.0006.jpg', category: 'estates' },
      { src: 'images/serenity-village/1BR S Village_Living room.jpg', category: 'village' },
      { src: 'images/serenity-villas/exterior-view.jpg', category: 'villas' },
      { src: 'images/serenity-estates/villa-a1.jpg', category: 'estates' },
      { src: 'images/serenity-village/SunRise.0001.jpg', category: 'village' },
      { src: 'images/serenity-villas/waterfall.jpg', category: 'villas' },
      { src: 'images/serenity-estates/Static.0010.jpg', category: 'estates' },
      { src: 'images/serenity-village/Restoran.0000.jpg', category: 'village' },
    ];

    // Add photo counts to filter buttons
    const totalCount = Object.values(galleryData).reduce((sum, arr) => sum + arr.length, 0);
    filterBtns.forEach(btn => {
      const filter = btn.dataset.filter;
      const count = filter === 'all' ? totalCount : (galleryData[filter] || []).length;
      if (count > 0) {
        const span = document.createElement('span');
        span.className = 'filter-count';
        span.textContent = count;
        btn.appendChild(span);
      }
    });

    const createItem = (src, category) => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.dataset.category = category;
      const img = document.createElement('img');
      img.src = src;
      img.alt = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      img.loading = 'lazy';
      const overlay = document.createElement('div');
      overlay.className = 'gallery-item__overlay';
      const label = document.createElement('span');
      label.className = 'gallery-item__label';
      label.textContent = categoryNames[category] || category;
      overlay.appendChild(label);
      div.appendChild(img);
      div.appendChild(overlay);
      return div;
    };

    const resizeItem = (el) => {
      const img = el.querySelector('img');
      const imgHeight = img.naturalHeight / img.naturalWidth * el.offsetWidth;
      const span = Math.round(imgHeight + 8); // 8px bottom margin baked into span
      el.style.gridRowEnd = 'span ' + span;
    };

    const showItems = (startIndex, count) => {
      const end = Math.min(startIndex + count, allCurrentItems.length);
      for (let i = startIndex; i < end; i++) {
        const item = allCurrentItems[i];
        const el = createItem(item.src, item.category);
        el.style.opacity = '0';
        galleryGrid.appendChild(el);
        const img = el.querySelector('img');
        img.addEventListener('load', () => {
          resizeItem(el);
          el.style.transition = 'opacity 0.6s ease';
          el.style.opacity = '1';
        });
      }
      visibleCount = end;
      if (loadMoreWrap) {
        loadMoreWrap.style.display = visibleCount < allCurrentItems.length ? '' : 'none';
      }
    };

    const renderGallery = (filter) => {
      galleryGrid.innerHTML = '';
      visibleCount = 0;

      if (filter === 'all') {
        // Start with curated picks, then add remaining photos
        const curatedSrcs = new Set(curatedAll.map(i => i.src));
        const remaining = [];
        for (const [cat, paths] of Object.entries(galleryData)) {
          paths.forEach(p => {
            if (!curatedSrcs.has(p)) remaining.push({ src: p, category: cat });
          });
        }
        allCurrentItems = [...curatedAll, ...remaining];
      } else {
        const paths = galleryData[filter] || [];
        allCurrentItems = paths.map(p => ({ src: p, category: filter }));
      }

      if (allCurrentItems.length === 0) {
        galleryGrid.style.display = 'none';
        galleryEmpty.style.display = '';
        if (loadMoreWrap) loadMoreWrap.style.display = 'none';
        return;
      }

      galleryGrid.style.display = '';
      galleryEmpty.style.display = 'none';
      showItems(0, INITIAL_COUNT);
    };

    // Load More
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        showItems(visibleCount, 20);
      });
    }

    // Filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGallery(btn.dataset.filter);
      });
    });

    // Render initial view (support hash filter: gallery.html#villas)
    const hashFilter = window.location.hash.replace('#', '');
    const validFilters = ['villas', 'estates', 'village'];
    const initialFilter = validFilters.includes(hashFilter) ? hashFilter : 'all';

    if (initialFilter !== 'all') {
      filterBtns.forEach(b => b.classList.remove('active'));
      const target = [...filterBtns].find(b => b.dataset.filter === initialFilter);
      if (target) target.classList.add('active');
    }

    if (Object.keys(galleryData).length > 0) {
      renderGallery(initialFilter);
    } else {
      galleryGrid.innerHTML = '<p style="color: var(--color-text-muted); padding: 40px;">Gallery data not found. Run: powershell -File generate-gallery.ps1</p>';
    }
  }

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbClose = lightbox.querySelector('.lightbox__close');
    const lbPrev = lightbox.querySelector('.lightbox__prev');
    const lbNext = lightbox.querySelector('.lightbox__next');
    const lbCounter = lightbox.querySelector('.lightbox__counter');
    const lbCaption = lightbox.querySelector('.lightbox__caption');
    let currentIndex = 0;
    let lbImages = [];
    let lbCategories = [];

    const categoryNames = {
      villas: 'Serenity Villas',
      estates: 'Serenity Estates',
      village: 'Serenity Village'
    };

    const updateLightboxInfo = () => {
      if (lbCounter) lbCounter.textContent = (currentIndex + 1) + ' / ' + lbImages.length;
      if (lbCaption) lbCaption.textContent = categoryNames[lbCategories[currentIndex]] || '';
    };

    const openLightbox = (index, images, categories) => {
      lbImages = images;
      lbCategories = categories || [];
      currentIndex = index;
      lbImg.src = lbImages[currentIndex];
      updateLightboxInfo();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const navigate = (dir) => {
      currentIndex = (currentIndex + dir + lbImages.length) % lbImages.length;
      lbImg.src = lbImages[currentIndex];
      updateLightboxInfo();
    };

    // Event delegation for dynamically created gallery items
    const galleryGridEl = document.getElementById('gallery-grid');
    if (galleryGridEl) {
      galleryGridEl.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        const allItems = Array.from(galleryGridEl.querySelectorAll('.gallery-item'));
        const images = allItems.map(i => i.querySelector('img').src);
        const categories = allItems.map(i => i.dataset.category);
        const index = allItems.indexOf(item);
        openLightbox(index >= 0 ? index : 0, images, categories);
      });
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (lbPrev) lbPrev.addEventListener('click', () => navigate(-1));
    if (lbNext) lbNext.addEventListener('click', () => navigate(1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  // --- Photo Mosaic (index.html) ---
  const mosaicGrid = document.getElementById('photo-mosaic');
  if (mosaicGrid && typeof GALLERY_DATA !== 'undefined') {
    const all = [];
    for (const paths of Object.values(GALLERY_DATA)) {
      paths.forEach(p => all.push(p));
    }
    // Shuffle and pick 5
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    all.slice(0, 5).forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'photo-mosaic__item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      img.loading = i > 1 ? 'lazy' : 'eager';
      div.appendChild(img);
      mosaicGrid.appendChild(div);
      // Animate in
      div.style.opacity = '0';
      div.style.transform = 'translateY(30px)';
      setTimeout(() => {
        div.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
      }, i * 120);
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('active');
        fi.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Contact form validation ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('.form-group[data-required]').forEach(group => {
        const input = group.querySelector('input, select, textarea');
        group.classList.remove('error');

        if (!input.value.trim()) {
          group.classList.add('error');
          valid = false;
        }

        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            group.classList.add('error');
            valid = false;
          }
        }
      });

      if (valid) {
        alert('Thank you for your inquiry! We will get back to you shortly.');
        contactForm.reset();
      }
    });
  }

  // --- Quiz Popup ---
  const quizSteps = [
    {
      question: 'What is your investment goal?',
      options: [
        { icon: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><rect x="9" y="10" width="6" height="5" rx="0.5"/><path d="M12 15v6"/></svg>', label: 'Personal residence' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>', label: 'Rental income' },
        { icon: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>', label: 'Long-term investment' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>', label: 'All of the above' }
      ]
    },
    {
      question: 'What is your budget?',
      options: [
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', label: 'Under $150K' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', label: '$150K – $350K' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', label: '$350K – $500K' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', label: '$500K+' }
      ]
    },
    {
      question: 'How many bedrooms do you need?',
      options: [
        { icon: '<svg viewBox="0 0 24 24"><path d="M2 16h20M4 16V8a4 4 0 018 0M20 16v-4a2 2 0 00-4 0v4M2 16v4M22 16v4"/></svg>', label: '1–2 bedrooms' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M2 16h20M2 16v4M22 16v4"/><path d="M4 16V9a3 3 0 016 0M14 16V9a3 3 0 00-6 0"/><path d="M14 16V9a3 3 0 016 0"/></svg>', label: '3 bedrooms' },
        { icon: '<svg viewBox="0 0 24 24"><path d="M2 16h20M2 16v4M22 16v4"/><path d="M3 16V9a2.5 2.5 0 015 0M8 16V9a2.5 2.5 0 015 0M13 16V9a2.5 2.5 0 015 0"/><path d="M18 9a2.5 2.5 0 012.5 2.5V16"/></svg>', label: '4+ bedrooms' },
        { icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>', label: 'Not sure yet' }
      ]
    },
    {
      question: 'When are you planning to buy?',
      options: [
        { icon: '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', label: 'Ready to buy now' },
        { icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>', label: 'Within 6 months' },
        { icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>', label: 'Just exploring' }
      ]
    }
  ];

  const quizRecommend = (answers) => {
    const budget = answers[1];
    if (budget === 'Under $150K') return { project: 'Serenity Village', url: 'project-serenity-village.html', desc: 'Affordable 1-2 bedroom villas from $119,000 in a vibrant community setting.' };
    if (budget === '$150K – $350K') return { project: 'Serenity Villas', url: 'project-serenity-villas.html', desc: 'Premium 2-3 bedroom villas from $335,000 with private pools and gardens.' };
    if (budget === '$350K – $500K') return { project: 'Serenity Estates', url: 'project-serenity-estates.html', desc: 'Exclusive 2-4.5 bedroom estates with panoramic views and spacious design.' };
    return { project: 'Serenity Estates', url: 'project-serenity-estates.html', desc: 'Our most exclusive properties — spacious estates designed for premium living.' };
  };

  // Build quiz DOM
  const quizOverlay = document.createElement('div');
  quizOverlay.className = 'quiz-overlay';
  quizOverlay.innerHTML = `
    <div class="quiz">
      <button class="quiz__close">&times;</button>
      <div class="quiz__progress"><div class="quiz__progress-bar"></div></div>
      <div class="quiz__body"></div>
    </div>
  `;
  document.body.appendChild(quizOverlay);

  let quizStep = 0;
  const quizAnswers = [];
  const quizBody = quizOverlay.querySelector('.quiz__body');
  const quizBar = quizOverlay.querySelector('.quiz__progress-bar');
  const totalSteps = quizSteps.length + 1;

  const updateProgress = () => {
    quizBar.style.width = ((quizStep + 1) / (totalSteps + 1) * 100) + '%';
  };

  const renderStep = () => {
    updateProgress();
    const step = quizSteps[quizStep];
    quizBody.innerHTML = `
      <p class="quiz__step-label">Step ${quizStep + 1} of ${totalSteps}</p>
      <h3 class="quiz__question">${step.question}</h3>
      <div class="quiz__options">
        ${step.options.map(opt => `<button class="quiz__option"><span class="quiz__option-icon">${opt.icon}</span><span>${opt.label}</span></button>`).join('')}
      </div>
      ${quizStep > 0 ? '<button class="quiz__back">&larr; Back</button>' : ''}
    `;
    quizBody.querySelectorAll('.quiz__option').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        quizAnswers[quizStep] = step.options[idx].label;
        quizStep++;
        if (quizStep < quizSteps.length) {
          renderStep();
        } else {
          renderContactStep();
        }
      });
    });
    const backBtn = quizBody.querySelector('.quiz__back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        quizStep--;
        renderStep();
      });
    }
  };

  const renderContactStep = () => {
    updateProgress();
    quizBody.innerHTML = `
      <p class="quiz__step-label">Final step</p>
      <h3 class="quiz__question">Where should we send your personalized recommendation?</h3>
      <form class="quiz__form">
        <input type="text" class="quiz__input" name="quiz-name" placeholder="Your name" required>
        <input type="email" class="quiz__input" name="quiz-email" placeholder="Email address" required>
        <input type="tel" class="quiz__input" name="quiz-phone" placeholder="WhatsApp / Phone (optional)">
        <button type="submit" class="btn btn--primary" style="width:100%;">Get My Recommendation</button>
      </form>
      <button class="quiz__back">&larr; Back</button>
    `;
    quizBody.querySelector('.quiz__form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = quizBody.querySelector('[name="quiz-name"]').value.trim();
      const email = quizBody.querySelector('[name="quiz-email"]').value.trim();
      const phone = quizBody.querySelector('[name="quiz-phone"]').value.trim();

      const rec = quizRecommend(quizAnswers);
      const body = [
        'New Quiz Lead',
        '',
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + (phone || '—'),
        '',
        'Answers:',
        '1. Goal: ' + (quizAnswers[0] || '—'),
        '2. Budget: ' + (quizAnswers[1] || '—'),
        '3. Bedrooms: ' + (quizAnswers[2] || '—'),
        '4. Timeline: ' + (quizAnswers[3] || '—'),
        '',
        'Recommended: ' + rec.project
      ].join('\n');

      window.open('mailto:office@globalbalihome.com?subject=New Lead: ' + encodeURIComponent(name) + '&body=' + encodeURIComponent(body));
      renderResult(rec);
    });
    quizBody.querySelector('.quiz__back').addEventListener('click', () => {
      quizStep--;
      renderStep();
    });
  };

  const renderResult = (rec) => {
    quizBar.style.width = '100%';
    quizBody.innerHTML = `
      <div class="quiz__result">
        <p class="quiz__step-label">Your match</p>
        <h3 class="quiz__question">${rec.project}</h3>
        <p class="quiz__result-desc">${rec.desc}</p>
        <a href="${rec.url}" class="btn btn--primary" style="width:100%;">View Project</a>
      </div>
    `;
  };

  const openQuiz = () => {
    quizStep = 0;
    quizAnswers.length = 0;
    renderStep();
    quizOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeQuiz = () => {
    quizOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  quizOverlay.querySelector('.quiz__close').addEventListener('click', closeQuiz);
  quizOverlay.addEventListener('click', (e) => {
    if (e.target === quizOverlay) closeQuiz();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quizOverlay.classList.contains('active')) closeQuiz();
  });

  // Attach quiz to CTA section buttons and header CTA
  document.querySelectorAll('.cta-section .btn--primary, [data-quiz]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
  });

  // --- Availability Bar animation ---
  document.querySelectorAll('.availability-bar__fill').forEach(bar => {
    const target = bar.style.width;
    bar.dataset.percent = target;
    bar.style.width = '0';
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        bar.style.width = bar.dataset.percent;
        observer.unobserve(bar);
      }
    }, { threshold: 0.5 });
    observer.observe(bar);
  });

  // --- ROI Calculator ---
  const roiRange = document.querySelector('.roi-calculator__range:not(#roi-occupancy)');
  if (roiRange) {
    let rentalYield = 0.12;
    let growthRate = 0.10;
    const amountEl = document.querySelector('.roi-calculator__amount');
    const annualEl = document.getElementById('roi-annual');
    const yr5El = document.getElementById('roi-5yr');
    const yr10El = document.getElementById('roi-10yr');
    const occRange = document.getElementById('roi-occupancy');
    const occValue = document.getElementById('occupancy-value');
    const scenarioBtns = document.querySelectorAll('.roi-calculator__scenario');

    const calculate = () => {
      const inv = parseInt(roiRange.value);
      const occupancy = parseInt(occRange.value) / 100;
      const annualRental = inv * rentalYield * occupancy;
      let rental5 = 0, rental10 = 0, pv = inv;
      for (let y = 1; y <= 10; y++) {
        rental10 += pv * rentalYield * occupancy;
        pv *= (1 + growthRate);
        if (y === 5) rental5 = rental10 + (pv - inv);
      }
      const total10 = rental10 + (pv - inv);
      amountEl.textContent = '$' + inv.toLocaleString();
      annualEl.textContent = '$' + Math.round(annualRental).toLocaleString();
      yr5El.textContent = '$' + Math.round(rental5).toLocaleString();
      yr10El.textContent = '$' + Math.round(total10).toLocaleString();
    };

    roiRange.addEventListener('input', calculate);
    occRange.addEventListener('input', () => {
      occValue.textContent = occRange.value + '%';
      calculate();
    });

    scenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scenarioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        rentalYield = parseFloat(btn.dataset.yield);
        growthRate = parseFloat(btn.dataset.growth);
        calculate();
      });
    });

    calculate();
  }

  // --- Lead Magnet form ---
  document.querySelectorAll('.lead-magnet__form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const subject = encodeURIComponent('Investment Guide Request');
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nPlease send me the Bali Investment Guide.');
      window.location.href = 'mailto:office@globalbalihome.com?subject=' + subject + '&body=' + body;
      sessionStorage.setItem('leadCaptured', 'true');
      form.closest('.lead-magnet__form-wrap').innerHTML = '<div class="lead-magnet__success"><h3>Thank You!</h3><p>Check your email for the guide.</p></div>';
    });
  });

  // --- Sticky CTA Bar (mobile) ---
  const stickyCTA = document.createElement('div');
  stickyCTA.className = 'sticky-cta';
  stickyCTA.innerHTML = '<button class="sticky-cta__btn btn btn--primary" data-quiz>Get Started</button>';
  document.body.appendChild(stickyCTA);
  stickyCTA.querySelector('[data-quiz]').addEventListener('click', (e) => {
    e.preventDefault();
    openQuiz();
  });

  const hero = document.querySelector('.hero') || document.querySelector('.page-hero');
  const waBtn = document.querySelector('.whatsapp-float');
  if (hero) {
    const showSticky = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const isOverlayOpen = quizOverlay.classList.contains('active');
      if (heroBottom < 0 && !isOverlayOpen) {
        stickyCTA.classList.add('visible');
        if (waBtn) waBtn.classList.add('lifted');
      } else {
        stickyCTA.classList.remove('visible');
        if (waBtn) waBtn.classList.remove('lifted');
      }
    };
    window.addEventListener('scroll', showSticky);
    showSticky();
  }

  // --- Exit Intent Popup ---
  const exitOverlay = document.createElement('div');
  exitOverlay.className = 'exit-overlay';
  exitOverlay.innerHTML = `
    <div class="exit-popup">
      <button class="exit-popup__close">&times;</button>
      <span class="section-header__tag">Free Guide</span>
      <h3 class="exit-popup__title">Wait — Don't Miss Our Free Investment Guide</h3>
      <p class="exit-popup__text">Download our comprehensive Bali Real Estate Investment Guide with market analysis, ROI projections, and expert insights.</p>
      <form class="exit-popup__form">
        <input type="email" class="exit-popup__input" placeholder="Your email address" required>
        <button type="submit" class="btn btn--primary" style="width:100%">Download Free Guide</button>
      </form>
    </div>
  `;
  document.body.appendChild(exitOverlay);

  const closeExit = () => {
    exitOverlay.classList.remove('active');
    document.body.style.overflow = '';
    sessionStorage.setItem('exitShown', 'true');
  };

  exitOverlay.querySelector('.exit-popup__close').addEventListener('click', closeExit);
  exitOverlay.addEventListener('click', (e) => {
    if (e.target === exitOverlay) closeExit();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && exitOverlay.classList.contains('active')) closeExit();
  });

  exitOverlay.querySelector('.exit-popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = exitOverlay.querySelector('.exit-popup__input').value;
    const subject = encodeURIComponent('Investment Guide Request');
    const body = encodeURIComponent('Email: ' + email + '\n\nPlease send me the Bali Investment Guide.');
    window.location.href = 'mailto:office@globalbalihome.com?subject=' + subject + '&body=' + body;
    sessionStorage.setItem('leadCaptured', 'true');
    closeExit();
  });

  const pageLoadTime = Date.now();
  document.documentElement.addEventListener('mouseleave', (e) => {
    if (e.clientY > 0) return;
    if (Date.now() - pageLoadTime < 30000) return;
    if (sessionStorage.getItem('exitShown')) return;
    if (sessionStorage.getItem('leadCaptured')) return;
    if (quizOverlay.classList.contains('active')) return;
    exitOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

});
