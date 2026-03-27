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

});
