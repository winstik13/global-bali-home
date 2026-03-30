/* ============================================
   GLOBAL BALI HOME — Main JS
   Dark Premium Theme
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Apply custom colors from SITE_DATA ---
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.colors) {
    var cc = SITE_DATA.colors;
    var root = document.documentElement.style;
    var cmap = { bg: '--color-bg', bgAlt: '--color-bg-alt', bgCard: '--color-bg-card', accent: '--color-accent', text: '--color-text', cream: '--color-cream' };
    for (var ck in cmap) { if (cc[ck]) root.setProperty(cmap[ck], cc[ck]); }
    if (cc.text) {
      var r = parseInt(cc.text.slice(1, 3), 16), g = parseInt(cc.text.slice(3, 5), 16), b = parseInt(cc.text.slice(5, 7), 16);
      root.setProperty('--color-text-muted', 'rgba(' + r + ',' + g + ',' + b + ',0.75)');
      root.setProperty('--color-text-dim', 'rgba(' + r + ',' + g + ',' + b + ',0.5)');
      root.setProperty('--color-border', 'rgba(' + r + ',' + g + ',' + b + ',0.1)');
      root.setProperty('--color-border-hover', 'rgba(' + r + ',' + g + ',' + b + ',0.25)');
    }
  }

  // --- Inject analytics from SITE_DATA ---
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.analytics) {
    var an = SITE_DATA.analytics;
    var idOk = {
      ga4: /^G-[A-Z0-9]{4,10}$/,
      facebookPixel: /^\d{10,20}$/,
      yandexMetrika: /^\d{5,12}$/,
      clarity: /^[a-z0-9]{8,12}$/i,
      gscVerification: /^[A-Za-z0-9_-]{30,60}$/
    };

    // Google Search Console verification
    if (an.gscVerification && idOk.gscVerification.test(an.gscVerification)) {
      var gscMeta = document.createElement('meta');
      gscMeta.name = 'google-site-verification';
      gscMeta.content = an.gscVerification;
      document.head.appendChild(gscMeta);
    }

    // Google Analytics 4
    if (an.ga4 && idOk.ga4.test(an.ga4)) {
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(an.ga4);
      document.head.appendChild(gaScript);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', an.ga4);
    }

    // Facebook Pixel
    if (an.facebookPixel && idOk.facebookPixel.test(an.facebookPixel)) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', an.facebookPixel);
      fbq('track', 'PageView');
    }

    // Yandex Metrika
    if (an.yandexMetrika && idOk.yandexMetrika.test(an.yandexMetrika)) {
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
      k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
      (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
      ym(Number(an.yandexMetrika), 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
    }

    // Microsoft Clarity
    if (an.clarity && idOk.clarity.test(an.clarity)) {
      (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+encodeURIComponent(i);
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})
      (window,document,'clarity','script',an.clarity);
    }
  }

  // Analytics event helper — sends to all active trackers
  function trackEvent(action, category, label) {
    if (typeof gtag === 'function') gtag('event', action, { event_category: category, event_label: label });
    if (typeof fbq === 'function') fbq('track', action === 'generate_lead' ? 'Lead' : (action === 'contact' ? 'Contact' : 'ViewContent'), { content_name: label });
    if (typeof ym === 'function' && typeof SITE_DATA !== 'undefined' && SITE_DATA.analytics && SITE_DATA.analytics.yandexMetrika) ym(Number(SITE_DATA.analytics.yandexMetrika), 'reachGoal', action, { category: category, label: label });
  }

  // --- Apply contacts from SITE_DATA ---
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.contacts) {
    var ct = SITE_DATA.contacts;
    var lang0 = document.documentElement.lang || 'en';
    // Phone in footer
    document.querySelectorAll('[data-contact="phone"]').forEach(function(el) {
      if (ct.phone) el.textContent = ct.phone;
    });
    // Email in footer
    document.querySelectorAll('[data-contact="email"]').forEach(function(el) {
      if (ct.email) el.textContent = ct.email;
    });
    // Email links (contacts page)
    document.querySelectorAll('[data-contact="email-link"]').forEach(function(el) {
      if (ct.email) {
        el.href = 'mailto:' + ct.email;
        el.textContent = ct.email;
      }
    });
    // Location (language-aware)
    document.querySelectorAll('[data-contact="location"]').forEach(function(el) {
      if (ct.location) {
        el.textContent = (typeof ct.location === 'object') ? (ct.location[lang0] || ct.location.en) : ct.location;
      }
    });
    // WhatsApp links (footer float + contacts page)
    document.querySelectorAll('[data-contact="whatsapp-link"]').forEach(function(el) {
      if (ct.whatsapp) el.href = 'https://wa.me/' + ct.whatsapp;
    });
  }

  // --- Apply social links from SITE_DATA ---
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.social) {
    var sc = SITE_DATA.social;
    document.querySelectorAll('.footer__social a[aria-label="Facebook"]').forEach(function(el) {
      if (sc.facebook) el.href = sc.facebook;
    });
    document.querySelectorAll('.footer__social a[aria-label="Instagram"]').forEach(function(el) {
      if (sc.instagram) el.href = sc.instagram;
    });
  }

  // --- Apply stats from SITE_DATA ---
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.stats) {
    var st = SITE_DATA.stats;
    document.querySelectorAll('[data-stat]').forEach(function(el) {
      var key = el.dataset.stat;
      if (st[key]) el.textContent = st[key];
    });
  }

  // --- Localisation ---
  const lang = document.documentElement.lang || 'en';
  const i18n = {
    en: {
      quizSteps: [
        {
          question: 'What is your investment goal?',
          options: ['Personal residence', 'Rental income', 'Long-term investment', 'All of the above']
        },
        {
          question: 'What is your budget?',
          options: ['Exploring Options', '$150K – $350K', '$350K – $500K', '$500K+']
        },
        {
          question: 'When are you planning to buy?',
          options: ['Ready to buy now', 'Within 6 months', 'Just exploring']
        }
      ],
      quizRec: 'Our Recommendation for You',
      quizMatch: 'match',
      quizName: 'Your name',
      quizEmail: 'Email address',
      quizPhone: 'WhatsApp / Phone (optional)',
      quizConsent: 'I agree to the processing of my personal data in accordance with the Privacy Policy',
      quizSubmit: 'Send Me Full Details',
      quizSkip: 'View project without submitting',
      quizBack: 'Back',
      quizThankTitle: 'Thank you!',
      quizThankText: "We'll be in touch soon",
      quizThankDesc: 'In the meantime, explore your recommended project:',
      quizThankBtn: 'View',
      stepOf: 'Step',
      of: 'of',
      stickyCta: 'Find My Villa',
      exitTag: 'Exclusive Guide',
      exitTitle: 'Before You Go — A Complimentary Resource',
      exitText: 'Access our comprehensive Bali Real Estate Investment Guide with market analysis, ROI projections, and expert insights.',
      exitPlaceholder: 'Your email address',
      exitSubmit: 'Access the Investment Guide',
      exitSuccess: 'Your guide will be ready in <span class="countdown-num">7</span>',
      exitOpenBtn: 'Open the Guide',
      leadThankTitle: 'Your Guide Is Ready!',
      leadThankText: 'Your guide will be ready in <span class="countdown-num">7</span>',
      leadThankSub: 'Have a question? Chat with our advisor now',
      leadThankWa: 'WhatsApp Us',
      leadOpenBtn: 'Open the Guide',
      valName: 'Please enter your name',
      valEmail: 'Please enter a valid email',
      valConsent: 'Please accept the privacy policy',
      // Tour popup
      tourTitle: 'Schedule a Private Tour',
      tourSteps: [
        {
          question: 'Which project interests you?',
          options: ['Serenity Villas', 'Serenity Estates', 'Serenity Village', 'Not sure yet']
        },
        {
          question: 'When are you in Bali?',
          options: ['I\'m already here', 'Within 2 weeks', 'Within a month', 'Planning a trip']
        },
        {
          question: 'What would you like to see?',
          multi: true,
          options: ['Construction site visit', 'Meet the architect', 'Investment terms review', 'View completed villas', 'Explore the area']
        }
      ],
      tourFormTitle: 'How can we reach you?',
      tourFormSub: 'Our manager will contact you within 2 hours to confirm the tour details.',
      tourName: 'Your name',
      tourWhatsapp: 'WhatsApp or phone number',
      tourEmail: 'Email (optional)',
      tourTime: 'Preferred time',
      tourTimeOptions: ['Morning (9–12)', 'Afternoon (12–17)', 'Evening (17–20)', 'Any time'],
      tourComment: 'Any special requests? (optional)',
      tourConsent: 'I agree to the processing of my personal data in accordance with the Privacy Policy',
      tourSubmit: 'Request a Tour',
      tourThankTitle: 'Tour Request Sent!',
      tourThankText: 'Our manager will contact you within 2 hours to arrange the details.',
      tourThankWa: 'Message us on WhatsApp',
      tourThankProject: 'Learn more about',
      descs: {
        village: {
          'Rental income': 'Compact villas from $119K — ideal for short-term rental with strong occupancy rates and low entry cost.',
          'Personal residence': 'Cozy 1-2 bedroom villas from $119K in a vibrant complex with shared pool and café.',
          'Long-term investment': 'Our most accessible entry point from $119K — high rental demand and strong capital growth potential.',
          'default': 'Affordable 1-2 bedroom villas from $119K in a vibrant complex with shared amenities.'
        },
        villas: {
          'Rental income': 'Premium 2-3 bedroom villas from $335K — jungle views, private pools, and proven 12-15% rental yields.',
          'Personal residence': 'Spacious 2-3 bedroom villas from $335K surrounded by jungle and natural waterfalls — your Bali home.',
          'Long-term investment': '2-3 bedroom villas from $335K in a high-demand location — 67% already sold, strong appreciation expected.',
          'default': 'Premium 2-3 bedroom villas from $335K with jungle views, private pools, and full management.'
        },
        estates: {
          'Rental income': 'Exclusive estates from $310K with private pools and up to 250m² — premium nightly rates and high-end guests.',
          'Personal residence': 'Spacious estates from $310K with private pools, fish ponds, and panoramic rice terrace views — luxury living.',
          'Long-term investment': 'Only 4 exclusive estates from $310K — limited collection with strong value appreciation in Bali\'s top location.',
          'default': 'Exclusive 2-4.5 bedroom estates from $310K with private pools and panoramic views.'
        }
      }
    },
    ru: {
      quizSteps: [
        {
          question: 'Какова ваша цель инвестиции?',
          options: ['Личная резиденция', 'Арендный доход', 'Долгосрочная инвестиция', 'Все вышеперечисленное']
        },
        {
          question: 'Какой у вас бюджет?',
          options: ['Изучаю варианты', '$150K – $350K', '$350K – $500K', '$500K+']
        },
        {
          question: 'Когда планируете покупку?',
          options: ['Готов купить сейчас', 'В ближайшие 6 месяцев', 'Просто изучаю']
        }
      ],
      quizRec: 'Наша рекомендация для вас',
      quizMatch: 'совпадение',
      quizName: 'Ваше имя',
      quizEmail: 'Email',
      quizPhone: 'WhatsApp / Телефон (необязательно)',
      quizConsent: 'Я согласен на обработку персональных данных в соответствии с Политикой конфиденциальности',
      quizSubmit: 'Получить подробности',
      quizSkip: 'Смотреть проект без отправки',
      quizBack: 'Назад',
      quizThankTitle: 'Спасибо!',
      quizThankText: 'Мы свяжемся с вами в ближайшее время',
      quizThankDesc: 'А пока — изучите рекомендованный проект:',
      quizThankBtn: 'Смотреть',
      stepOf: 'Шаг',
      of: 'из',
      stickyCta: 'Подобрать виллу мечты',
      exitTag: 'Эксклюзивный гид',
      exitTitle: 'Прежде чем уйти — бесплатный ресурс',
      exitText: 'Получите наш подробный гид по инвестициям в недвижимость Бали с анализом рынка, прогнозами доходности и экспертными оценками.',
      exitPlaceholder: 'Ваш email',
      exitSubmit: 'Получить инвестиционный гид',
      exitSuccess: 'Ваш гид будет готов через <span class="countdown-num">7</span>',
      exitOpenBtn: 'Открыть гид',
      leadThankTitle: 'Ваш гид готов!',
      leadThankText: 'Ваш гид будет готов через <span class="countdown-num">7</span>',
      leadThankSub: 'Есть вопросы? Напишите нашему консультанту',
      leadThankWa: 'Написать в WhatsApp',
      leadOpenBtn: 'Открыть гид',
      valName: 'Пожалуйста, введите имя',
      valEmail: 'Введите корректный email',
      valConsent: 'Необходимо согласие с политикой',
      // Tour popup
      tourTitle: 'Запланировать частный тур',
      tourSteps: [
        {
          question: 'Какой проект вас интересует?',
          options: ['Serenity Villas', 'Serenity Estates', 'Serenity Village', 'Ещё не определился']
        },
        {
          question: 'Когда вы на Бали?',
          options: ['Я уже здесь', 'В ближайшие 2 недели', 'В ближайший месяц', 'Планирую поездку']
        },
        {
          question: 'Что хотите увидеть?',
          multi: true,
          options: ['Осмотр стройплощадки', 'Встреча с архитектором', 'Обзор условий инвестиций', 'Показ готовых вилл', 'Знакомство с районом']
        }
      ],
      tourFormTitle: 'Как с вами связаться?',
      tourFormSub: 'Наш менеджер свяжется с вами в течение 2 часов для подтверждения деталей тура.',
      tourName: 'Ваше имя',
      tourWhatsapp: 'WhatsApp или телефон',
      tourEmail: 'Email (необязательно)',
      tourTime: 'Удобное время',
      tourTimeOptions: ['Утро (9–12)', 'День (12–17)', 'Вечер (17–20)', 'Любое время'],
      tourComment: 'Особые пожелания? (необязательно)',
      tourConsent: 'Я согласен на обработку персональных данных в соответствии с Политикой конфиденциальности',
      tourSubmit: 'Запросить тур',
      tourThankTitle: 'Заявка на тур отправлена!',
      tourThankText: 'Наш менеджер свяжется с вами в течение 2 часов для согласования деталей.',
      tourThankWa: 'Написать в WhatsApp',
      tourThankProject: 'Подробнее о проекте',
      descs: {
        village: {
          'Rental income': 'Компактные виллы от $119K — идеально для краткосрочной аренды с высокой заполняемостью и низким порогом входа.',
          'Personal residence': 'Уютные виллы 1–2 спальни от $119K в живом комплексе с общим бассейном и кафе.',
          'Long-term investment': 'Самый доступный вход от $119K — высокий спрос на аренду и сильный потенциал роста капитала.',
          'default': 'Доступные виллы 1–2 спальни от $119K в комплексе с общими удобствами.'
        },
        villas: {
          'Rental income': 'Премиальные виллы 2–3 спальни от $335K — вид на джунгли, приватные бассейны и подтверждённая доходность 12–15%.',
          'Personal residence': 'Просторные виллы 2–3 спальни от $335K в окружении джунглей и водопадов — ваш дом на Бали.',
          'Long-term investment': 'Виллы 2–3 спальни от $335K в востребованной локации — 67% уже продано, ожидается рост стоимости.',
          'default': 'Премиальные виллы 2–3 спальни от $335K с видом на джунгли, приватными бассейнами и полным управлением.'
        },
        estates: {
          'Rental income': 'Эксклюзивные эстейты от $310K с приватными бассейнами и площадью до 250 м² — премиальные ставки аренды.',
          'Personal residence': 'Просторные эстейты от $310K с приватными бассейнами, прудами и панорамным видом на рисовые террасы.',
          'Long-term investment': 'Всего 4 эксклюзивных эстейта от $310K — лимитированная коллекция с высоким потенциалом роста.',
          'default': 'Эксклюзивные эстейты 2–4.5 спален от $310K с приватными бассейнами и панорамными видами.'
        }
      }
    },
    id: {
      quizSteps: [
        {
          question: 'Apa tujuan investasi Anda?',
          options: ['Hunian pribadi', 'Pendapatan sewa', 'Investasi jangka panjang', 'Semua di atas']
        },
        {
          question: 'Berapa anggaran Anda?',
          options: ['Menjelajahi opsi', '$150K – $350K', '$350K – $500K', '$500K+']
        },
        {
          question: 'Kapan Anda berencana membeli?',
          options: ['Siap membeli sekarang', 'Dalam 6 bulan', 'Sekadar melihat-lihat']
        }
      ],
      quizRec: 'Rekomendasi Kami untuk Anda',
      quizMatch: 'kecocokan',
      quizName: 'Nama Anda',
      quizEmail: 'Alamat email',
      quizPhone: 'WhatsApp / Telepon (opsional)',
      quizConsent: 'Saya menyetujui pemrosesan data pribadi saya sesuai dengan Kebijakan Privasi',
      quizSubmit: 'Kirimkan Detail Lengkap',
      quizSkip: 'Lihat proyek tanpa mengirim',
      quizBack: 'Kembali',
      quizThankTitle: 'Terima kasih!',
      quizThankText: 'Kami akan segera menghubungi Anda',
      quizThankDesc: 'Sementara itu, jelajahi proyek yang direkomendasikan:',
      quizThankBtn: 'Lihat',
      stepOf: 'Langkah',
      of: 'dari',
      stickyCta: 'Temukan Vila Impian',
      exitTag: 'Panduan Eksklusif',
      exitTitle: 'Sebelum Anda Pergi — Sumber Daya Gratis',
      exitText: 'Akses panduan investasi properti Bali kami yang komprehensif dengan analisis pasar, proyeksi ROI, dan wawasan ahli.',
      exitPlaceholder: 'Alamat email Anda',
      exitSubmit: 'Akses Panduan Investasi',
      exitSuccess: 'Panduan Anda akan siap dalam <span class="countdown-num">7</span>',
      exitOpenBtn: 'Buka Panduan',
      leadThankTitle: 'Panduan Anda Siap!',
      leadThankText: 'Panduan Anda akan siap dalam <span class="countdown-num">7</span>',
      leadThankSub: 'Ada pertanyaan? Hubungi konsultan kami sekarang',
      leadThankWa: 'WhatsApp Kami',
      leadOpenBtn: 'Buka Panduan',
      valName: 'Silakan masukkan nama Anda',
      valEmail: 'Masukkan email yang valid',
      valConsent: 'Harap setujui kebijakan privasi',
      // Tour popup
      tourTitle: 'Jadwalkan Tur Pribadi',
      tourSteps: [
        {
          question: 'Proyek mana yang menarik bagi Anda?',
          options: ['Serenity Villas', 'Serenity Estates', 'Serenity Village', 'Belum yakin']
        },
        {
          question: 'Kapan Anda di Bali?',
          options: ['Saya sudah di sini', 'Dalam 2 minggu', 'Dalam sebulan', 'Merencanakan perjalanan']
        },
        {
          question: 'Apa yang ingin Anda lihat?',
          multi: true,
          options: ['Kunjungan lokasi konstruksi', 'Bertemu arsitek', 'Tinjauan ketentuan investasi', 'Lihat villa yang selesai', 'Jelajahi area']
        }
      ],
      tourFormTitle: 'Bagaimana kami dapat menghubungi Anda?',
      tourFormSub: 'Manajer kami akan menghubungi Anda dalam 2 jam untuk mengonfirmasi detail tur.',
      tourName: 'Nama Anda',
      tourWhatsapp: 'WhatsApp atau nomor telepon',
      tourEmail: 'Email (opsional)',
      tourTime: 'Waktu yang diinginkan',
      tourTimeOptions: ['Pagi (9–12)', 'Siang (12–17)', 'Sore (17–20)', 'Kapan saja'],
      tourComment: 'Permintaan khusus? (opsional)',
      tourConsent: 'Saya menyetujui pemrosesan data pribadi saya sesuai dengan Kebijakan Privasi',
      tourSubmit: 'Minta Tur',
      tourThankTitle: 'Permintaan Tur Terkirim!',
      tourThankText: 'Manajer kami akan menghubungi Anda dalam 2 jam untuk mengatur detailnya.',
      tourThankWa: 'Hubungi kami di WhatsApp',
      tourThankProject: 'Pelajari lebih lanjut tentang',
      descs: {
        village: {
          'Rental income': 'Vila kompak mulai $119K — ideal untuk sewa jangka pendek dengan tingkat hunian tinggi dan biaya masuk rendah.',
          'Personal residence': 'Vila nyaman 1–2 kamar mulai $119K di kompleks dinamis dengan kolam renang bersama dan kafe.',
          'Long-term investment': 'Titik masuk paling terjangkau mulai $119K — permintaan sewa tinggi dan potensi pertumbuhan modal kuat.',
          'default': 'Vila terjangkau 1–2 kamar mulai $119K di kompleks dengan fasilitas bersama.'
        },
        villas: {
          'Rental income': 'Vila premium 2–3 kamar mulai $335K — pemandangan hutan, kolam pribadi, dan imbal hasil sewa 12–15%.',
          'Personal residence': 'Vila luas 2–3 kamar mulai $335K dikelilingi hutan dan air terjun alami — rumah Bali Anda.',
          'Long-term investment': 'Vila 2–3 kamar mulai $335K di lokasi permintaan tinggi — 67% sudah terjual, apresiasi kuat diharapkan.',
          'default': 'Vila premium 2–3 kamar mulai $335K dengan pemandangan hutan, kolam pribadi, dan manajemen penuh.'
        },
        estates: {
          'Rental income': 'Estat eksklusif mulai $310K dengan kolam pribadi dan luas hingga 250m² — tarif sewa premium.',
          'Personal residence': 'Estat luas mulai $310K dengan kolam pribadi, kolam ikan, dan pemandangan sawah panoramik — hunian mewah.',
          'Long-term investment': 'Hanya 4 estat eksklusif mulai $310K — koleksi terbatas dengan potensi apresiasi tinggi di lokasi terbaik Bali.',
          'default': 'Estat eksklusif 2–4.5 kamar mulai $310K dengan kolam pribadi dan pemandangan panoramik.'
        }
      }
    }
  };

  const t = i18n[lang] || i18n[lang.split('-')[0]] || i18n.en;

  // Override exit popup texts from SITE_DATA if available
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.exitPopup && SITE_DATA.exitPopup.texts) {
    var epTexts = SITE_DATA.exitPopup.texts[lang] || SITE_DATA.exitPopup.texts.en || {};
    if (epTexts.tag) t.exitTag = epTexts.tag;
    if (epTexts.title) t.exitTitle = epTexts.title;
    if (epTexts.text) t.exitText = epTexts.text;
    if (epTexts.placeholder) t.exitPlaceholder = epTexts.placeholder;
    if (epTexts.submit) t.exitSubmit = epTexts.submit;
    if (epTexts.success) t.exitSuccess = epTexts.success;
    if (epTexts.openBtn) t.exitOpenBtn = epTexts.openBtn;
  }

  // Map localised option labels back to EN keys for scoring
  const enOptions = i18n.en.quizSteps.map(s => s.options);

  // --- Custom inline validation helper ---
  function showFieldError(input, msg) {
    clearFieldError(input);
    input.classList.add('field-error');
    var err = document.createElement('span');
    err.className = 'field-error-msg';
    err.textContent = msg;
    input.parentNode.insertBefore(err, input.nextSibling);
  }
  function clearFieldError(input) {
    input.classList.remove('field-error');
    var next = input.nextElementSibling;
    if (next && next.classList.contains('field-error-msg')) next.remove();
  }
  function validateField(input, type) {
    clearFieldError(input);
    var val = input.value.trim();
    if (type === 'name' && !val) { showFieldError(input, t.valName); return false; }
    if (type === 'email') {
      if (!val) { showFieldError(input, t.valEmail); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { showFieldError(input, t.valEmail); return false; }
    }
    return true;
  }

  // Disable native browser validation on all forms
  document.querySelectorAll('form').forEach(function(f) { f.setAttribute('novalidate', ''); });

  // --- Skip navigation & main landmark ---
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  const mainSection = document.querySelector('.hero, .fullbleed-hero, .page-hero');
  if (mainSection) mainSection.id = 'main-content';

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
    let headerTicking = false;
    window.addEventListener('scroll', () => {
      if (!headerTicking) {
        requestAnimationFrame(() => { updateHeader(); headerTicking = false; });
        headerTicking = true;
      }
    }, { passive: true });
  }

  // --- Mobile menu ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header__nav');
  if (hamburger && nav) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'main-nav');
    nav.id = 'main-nav';

    const openMenu = () => {
      hamburger.classList.add('active');
      nav.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // backdrop-filter on header creates a containing block that breaks
      // position:fixed on the nav overlay — disable it while menu is open
      if (header) header.classList.add('header--menu-open');
    };

    const closeMenu = () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (header) header.classList.remove('header--menu-open');
    };

    hamburger.addEventListener('click', () => {
      nav.classList.contains('active') ? closeMenu() : openMenu();
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Language dropdown ---
  // Auto-assign section IDs by index so lang switcher can preserve scroll position.
  // All language versions have identical section order, so sec-N maps to same section.
  document.querySelectorAll('section').forEach((sec, i) => {
    if (!sec.id) sec.id = 'sec-' + i;
  });

  function getCurrentSectionHash() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const threshold = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= threshold) current = sec;
      else break;
    }
    return current ? '#' + current.id : '';
  }

  const langWidget = document.querySelector('.header__lang');
  const langToggle = document.querySelector('.header__lang-toggle');
  if (langWidget && langToggle) {
    langToggle.setAttribute('aria-expanded', 'false');
    langToggle.setAttribute('aria-haspopup', 'true');

    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langWidget.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        const hash = getCurrentSectionHash();
        langWidget.querySelectorAll('.header__lang-dropdown a').forEach(a => {
          a.href = a.href.split('#')[0] + hash;
        });
      }
    });

    document.addEventListener('click', (e) => {
      if (!langWidget.contains(e.target)) {
        langWidget.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langWidget.classList.contains('open')) {
        langWidget.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        langToggle.focus();
      }
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
  if (pageHeroBg && pageHeroSection && window.matchMedia('(min-width: 769px)').matches) {
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
    }, { passive: true });
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
    // Detect subfolder pages (ru/, id/) — they use ../css/style.css
    const isSubfolder = !!document.querySelector('link[href^="../css/"]');
    const imgPathPrefix = isSubfolder ? '../' : '';
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
      img.src = imgPathPrefix + src;
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
      preloadAdjacent();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const preloadAdjacent = () => {
      if (lbImages.length < 2) return;
      var next = new Image();
      next.src = lbImages[(currentIndex + 1) % lbImages.length];
      var prev = new Image();
      prev.src = lbImages[(currentIndex - 1 + lbImages.length) % lbImages.length];
    };

    const navigate = (dir) => {
      currentIndex = (currentIndex + dir + lbImages.length) % lbImages.length;
      lbImg.src = lbImages[currentIndex];
      updateLightboxInfo();
      preloadAdjacent();
    };

    // Event delegation for dynamically created gallery items
    const galleryGridEl = document.getElementById('gallery-grid');
    if (galleryGridEl) {
      let cachedItems = [];
      let cachedImages = [];
      let cachedCategories = [];

      const updateGalleryCache = () => {
        cachedItems = Array.from(galleryGridEl.querySelectorAll('.gallery-item'));
        cachedImages = cachedItems.map(i => i.querySelector('img').src);
        cachedCategories = cachedItems.map(i => i.dataset.category);
      };

      // Update cache when gallery content changes (filter/load more)
      const galleryCacheObserver = new MutationObserver(updateGalleryCache);
      galleryCacheObserver.observe(galleryGridEl, { childList: true });
      updateGalleryCache();

      galleryGridEl.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        const index = cachedItems.indexOf(item);
        openLightbox(index >= 0 ? index : 0, cachedImages, cachedCategories);
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
    const mosaicPathPrefix = !!document.querySelector('link[href^="../css/"]') ? '../' : '';
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
      img.src = mosaicPathPrefix + src;
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

  // --- Project Gallery (detail pages) ---
  document.querySelectorAll('[data-project-gallery]').forEach(function(container) {
    if (typeof GALLERY_DATA === 'undefined') return;
    var slug = container.getAttribute('data-project-gallery');
    var key = slug.replace('serenity-', '');
    var images = GALLERY_DATA[key];
    if (!images || !images.length) return;
    var prefix = document.querySelector('link[href^="../css/"]') ? '../' : '';
    images.slice(0, 5).forEach(function(src) {
      var div = document.createElement('div');
      div.className = 'photo-mosaic__item';
      var img = document.createElement('img');
      img.src = prefix + src;
      img.alt = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      img.loading = 'lazy';
      div.appendChild(img);
      container.appendChild(div);
    });
  });

  // --- Dynamic FAQ Rendering from FAQ_DATA ---
  if (typeof FAQ_DATA !== 'undefined') {
    const faqList = document.querySelector('.faq-list');
    if (faqList) {
      const faqLang = lang;
      const sorted = FAQ_DATA.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
      faqList.innerHTML = sorted.map(item => {
        const q = (item.question[faqLang] || item.question.en || '');
        const a = (item.answer[faqLang] || item.answer.en || '');
        return '<div class="faq-item"><button class="faq-question">' + q + '</button><div class="faq-answer"><div class="faq-answer__inner">' + a + '</div></div></div>';
      }).join('');
    }
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach((btn, idx) => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const answerId = 'faq-answer-' + idx;
    answer.id = answerId;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', answerId);
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', btn.id || ('faq-q-' + idx));
    if (!btn.id) btn.id = 'faq-q-' + idx;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('active');
        fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        fi.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Contact form validation ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    // Real-time inline validation
    contactForm.querySelectorAll('.form-group[data-required]').forEach(group => {
      const input = group.querySelector('input, select, textarea');
      if (!input) return;

      const validate = () => {
        const val = input.value.trim();
        group.classList.remove('error', 'valid');
        if (!val) return; // Don't show error while empty (only on submit)
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          group.classList.toggle('error', !emailRegex.test(val));
          group.classList.toggle('valid', emailRegex.test(val));
        } else {
          group.classList.add('valid');
        }
      };

      input.addEventListener('input', validate);
      input.addEventListener('blur', () => {
        if (!input.value.trim() && group.dataset.required !== undefined) {
          group.classList.add('error');
          group.classList.remove('valid');
        }
      });
    });

    // Live clear consent error
    var consentBoxEl = contactForm.querySelector('#consent');
    if (consentBoxEl) {
      consentBoxEl.addEventListener('change', function() {
        var grp = contactForm.querySelector('#consent-group');
        if (grp) grp.classList.remove('error');
      });
    }

    // Submit validation
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('.form-group[data-required]').forEach(group => {
        const input = group.querySelector('input, select, textarea');
        group.classList.remove('error', 'valid');

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

      const consentGroup = contactForm.querySelector('#consent-group');
      const consentBox = contactForm.querySelector('#consent');
      if (consentGroup && consentBox) {
        consentGroup.classList.remove('error');
        if (!consentBox.checked) {
          consentGroup.classList.add('error');
          valid = false;
        }
      }

      if (valid) {
        trackEvent('generate_lead', 'contact_form', 'contact_page');
        const formWrap = contactForm.parentElement;
        contactForm.style.display = 'none';
        const success = document.createElement('div');
        success.className = 'form-success';
        success.innerHTML = '<h3>Thank you!</h3><p>Our advisors will get back to you as soon as possible.</p>';
        formWrap.appendChild(success);
        contactForm.reset();
      }
    });
  }

  // --- Quiz Popup ---
  const quizIcons = [
    [
      '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><rect x="9" y="10" width="6" height="5" rx="0.5"/><path d="M12 15v6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>',
      '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>'
    ],
    [
      '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'
    ],
    [
      '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
      '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>'
    ]
  ];
  const quizSteps = t.quizSteps.map((step, i) => ({
    question: step.question,
    options: step.options.map((label, j) => ({ icon: quizIcons[i][j], label }))
  }));

  const quizRecommend = (answers) => {
    // Map localised answers back to EN keys for scoring
    const toEn = (stepIdx, localLabel) => {
      const localOpts = t.quizSteps[stepIdx].options;
      const idx = localOpts.indexOf(localLabel);
      return idx >= 0 ? enOptions[stepIdx][idx] : localLabel;
    };
    const goal = toEn(0, answers[0]);
    const budget = toEn(1, answers[1]);
    const timeline = toEn(2, answers[2]);

    // Score each project: Village, Villas, Estates
    const scores = { village: 0, villas: 0, estates: 0 };

    // Budget (60% weight)
    if (budget === 'Exploring Options')    { scores.village += 60; scores.villas += 15; scores.estates += 10; }
    else if (budget === '$150K – $350K')   { scores.village += 30; scores.villas += 60; scores.estates += 35; }
    else if (budget === '$350K – $500K')   { scores.village += 5;  scores.villas += 35; scores.estates += 60; }
    else /* $500K+ */                      { scores.village += 0;  scores.villas += 20; scores.estates += 60; }

    // Goal (25% weight)
    if (goal === 'Rental income')          { scores.village += 25; scores.villas += 20; scores.estates += 15; }
    else if (goal === 'Personal residence') { scores.village += 5;  scores.villas += 20; scores.estates += 25; }
    else if (goal === 'Long-term investment') { scores.village += 20; scores.villas += 25; scores.estates += 20; }
    else /* All of the above */            { scores.village += 15; scores.villas += 25; scores.estates += 20; }

    // Timeline (15% weight)
    if (timeline === 'Ready to buy now')   { scores.village += 5;  scores.villas += 15; scores.estates += 10; }
    else if (timeline === 'Within 6 months') { scores.village += 10; scores.villas += 15; scores.estates += 12; }
    else /* Just exploring */              { scores.village += 15; scores.villas += 10; scores.estates += 10; }

    // Determine winner
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const matchPct = best[1];

    const projects = {
      village: { project: 'Serenity Village', url: 'project-serenity-village.html' },
      villas:  { project: 'Serenity Villas',  url: 'project-serenity-villas.html' },
      estates: { project: 'Serenity Estates',  url: 'project-serenity-estates.html' }
    };

    const winner = projects[best[0]];
    const descs = t.descs[best[0]];
    const desc = descs[goal] || descs['default'];

    return { project: winner.project, url: winner.url, desc: desc, match: matchPct };
  };

  // Build quiz DOM
  const quizOverlay = document.createElement('div');
  quizOverlay.className = 'quiz-overlay';
  quizOverlay.innerHTML = `
    <div class="quiz" role="dialog" aria-modal="true" aria-label="Investment quiz">
      <button class="quiz__close" aria-label="Close quiz">&times;</button>
      <div class="quiz__progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="quiz__progress-bar"></div></div>
      <div class="quiz__body"></div>
    </div>
  `;
  document.body.appendChild(quizOverlay);

  let quizStep = 0;
  const quizAnswers = [];
  const quizBody = quizOverlay.querySelector('.quiz__body');
  const quizBar = quizOverlay.querySelector('.quiz__progress-bar');
  const totalSteps = quizSteps.length + 1;

  const quizProgressBar = quizOverlay.querySelector('.quiz__progress');
  const updateProgress = () => {
    const pct = Math.round((quizStep + 1) / (totalSteps + 1) * 100);
    quizBar.style.width = pct + '%';
    quizProgressBar.setAttribute('aria-valuenow', pct);
  };

  const renderStep = () => {
    updateProgress();
    const step = quizSteps[quizStep];
    quizBody.innerHTML = `
      <p class="quiz__step-label">${t.stepOf} ${quizStep + 1} ${t.of} ${totalSteps}</p>
      <h3 class="quiz__question">${step.question}</h3>
      <div class="quiz__options">
        ${step.options.map(opt => `<button class="quiz__option"><span class="quiz__option-icon">${opt.icon}</span><span>${opt.label}</span></button>`).join('')}
      </div>
      ${quizStep > 0 ? `<button class="quiz__back">&larr; ${t.quizBack}</button>` : ''}
    `;
    quizBody.querySelectorAll('.quiz__option').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        btn.blur();
        quizAnswers[quizStep] = step.options[idx].label;
        quizStep++;
        if (quizStep < quizSteps.length) {
          renderStep();
        } else {
          renderRecommendation();
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

  const renderRecommendation = () => {
    const rec = quizRecommend(quizAnswers);
    updateProgress();
    quizBody.innerHTML = `
      <p class="quiz__step-label">${t.quizRec}</p>
      <h3 class="quiz__question">${rec.project} <span class="quiz__match">${rec.match}% ${t.quizMatch}</span></h3>
      <p class="quiz__result-desc">${rec.desc}</p>
      <form class="quiz__form" novalidate>
        <input type="text" class="quiz__input" name="quiz-name" placeholder="${t.quizName}">
        <input type="email" class="quiz__input" name="quiz-email" placeholder="${t.quizEmail}">
        <input type="tel" class="quiz__input" name="quiz-phone" placeholder="${t.quizPhone}">
        <div class="form-consent" id="quiz-consent-group">
          <input type="checkbox" class="form-consent__checkbox" id="quiz-consent" name="quiz-consent">
          <label class="form-consent__text" for="quiz-consent">${t.quizConsent}</label>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%;">${t.quizSubmit}</button>
      </form>
      <a href="${rec.url}" class="quiz__skip-link">${t.quizSkip} &rarr;</a>
      <button class="quiz__back">&larr; ${t.quizBack}</button>
    `;
    // Live clear errors on input
    quizBody.querySelectorAll('.quiz__input').forEach(function(inp) {
      inp.addEventListener('input', function() { clearFieldError(inp); });
    });
    var quizConsentEl = quizBody.querySelector('#quiz-consent');
    if (quizConsentEl) {
      quizConsentEl.addEventListener('change', function() {
        var grp = quizBody.querySelector('#quiz-consent-group');
        if (grp) grp.classList.remove('error');
        clearFieldError(quizConsentEl);
      });
    }

    quizBody.querySelector('.quiz__form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = quizBody.querySelector('[name="quiz-name"]');
      const emailInput = quizBody.querySelector('[name="quiz-email"]');
      const phone = quizBody.querySelector('[name="quiz-phone"]').value.trim();

      var valid = true;
      if (!validateField(nameInput, 'name')) valid = false;
      if (!validateField(emailInput, 'email')) valid = false;

      const quizConsentGroup = quizBody.querySelector('#quiz-consent-group');
      const quizConsentBox = quizBody.querySelector('#quiz-consent');
      if (quizConsentGroup && quizConsentBox && !quizConsentBox.checked) {
        quizConsentGroup.classList.add('error');
        showFieldError(quizConsentBox, t.valConsent);
        valid = false;
      }

      if (!valid) return;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      // TODO: Connect to backend when ready for production
      // Currently in test mode — no data is sent anywhere
      console.log('Quiz lead (test mode):', { name, email, phone, answers: quizAnswers, recommended: rec.project });
      trackEvent('generate_lead', 'quiz', rec.project);
      sessionStorage.setItem('leadCaptured', 'true');
      quizBar.style.width = '100%';
      quizBody.innerHTML = `
        <div class="quiz__result">
          <p class="quiz__step-label">${t.quizThankTitle}</p>
          <h3 class="quiz__question">${t.quizThankText}</h3>
          <p class="quiz__result-desc">${t.quizThankDesc}</p>
          <a href="${rec.url}" class="btn btn--primary" style="width:100%;">${t.quizThankBtn} ${rec.project}</a>
        </div>
      `;
    });
    quizBody.querySelector('.quiz__back').addEventListener('click', () => {
      quizStep--;
      renderStep();
    });
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
  // Exclude [data-tour] buttons — they open tour popup, not quiz
  document.querySelectorAll('.cta-section .btn--primary:not([data-tour]), [data-quiz]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
  });

  // --- Tour Booking Popup ---
  const tourIcons = [
    // Step 1: Projects
    [
      '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><rect x="9" y="10" width="6" height="5" rx="0.5"/><path d="M12 15v6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M3 21h18M9 21V13h6v8"/><path d="M3 7l9-4 9 4"/><rect x="5" y="7" width="14" height="14" rx="0" fill="none"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V8l4-3v16"/><path d="M9 21V5l6-3v19"/><path d="M15 21V4l4 3v14"/></svg>',
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
    ],
    // Step 2: When in Bali
    [
      '<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h2v2H8z"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M14 14h2v2h-2z"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 3.7 7.3c.2.4.7.6 1.1.3l.5-.3c.4-.2.5-.6.5-1.1z"/></svg>'
    ],
    // Step 3: What to see (checkboxes)
    [
      '<svg viewBox="0 0 24 24"><path d="M2 20h20"/><path d="M5 20V8l5-3 5 3v12"/><path d="M15 20V10l5-3v13"/><rect x="8" y="10" width="4" height="3" rx="0.5"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M9 7h6"/></svg>',
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'
    ]
  ];

  const tourProjectUrls = {
    'Serenity Villas': 'project-serenity-villas.html',
    'Serenity Estates': 'project-serenity-estates.html',
    'Serenity Village': 'project-serenity-village.html'
  };

  const tourSteps = t.tourSteps.map((step, i) => ({
    question: step.question,
    multi: step.multi || false,
    options: step.options.map((label, j) => ({ icon: tourIcons[i][j], label }))
  }));

  const tourOverlay = document.createElement('div');
  tourOverlay.className = 'tour-overlay';
  tourOverlay.innerHTML = `
    <div class="tour" role="dialog" aria-modal="true" aria-label="${t.tourTitle}">
      <button class="tour__close" aria-label="Close">&times;</button>
      <div class="tour__progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="tour__progress-bar"></div></div>
      <div class="tour__body"></div>
    </div>
  `;
  document.body.appendChild(tourOverlay);

  const tourBody = tourOverlay.querySelector('.tour__body');
  const tourBar = tourOverlay.querySelector('.tour__progress-bar');
  const tourProgressBar = tourOverlay.querySelector('.tour__progress');
  let tourStep = 0;
  let tourAnswers = [];
  let tourMultiSelected = [];
  const tourTotalSteps = tourSteps.length + 1; // steps + contact form

  const updateTourProgress = () => {
    const pct = Math.round((tourStep + 1) / (tourTotalSteps + 1) * 100);
    tourBar.style.width = pct + '%';
    tourProgressBar.setAttribute('aria-valuenow', pct);
  };

  const renderTourStep = () => {
    updateTourProgress();
    const step = tourSteps[tourStep];

    if (step.multi) {
      // Multi-select step (checkboxes)
      tourMultiSelected = [];
      tourBody.innerHTML = `
        <p class="tour__step-label">${t.stepOf} ${tourStep + 1} ${t.of} ${tourTotalSteps}</p>
        <h3 class="tour__question">${step.question}</h3>
        <div class="tour__options tour__options--multi">
          ${step.options.map((opt, idx) => `<label class="tour__checkbox"><input type="checkbox" value="${idx}"><span class="tour__checkbox-icon">${opt.icon}</span><span>${opt.label}</span></label>`).join('')}
        </div>
        <button class="btn btn--primary tour__continue" style="width:100%;margin-top:24px;" disabled>${t.tourSubmit.replace(/tour|tur|тур/i, '').trim() || 'Continue'}</button>
        ${tourStep > 0 ? `<button class="tour__back">&larr; ${t.quizBack}</button>` : ''}
      `;

      const continueBtn = tourBody.querySelector('.tour__continue');
      continueBtn.textContent = lang === 'ru' ? 'Продолжить' : lang === 'id' ? 'Lanjutkan' : 'Continue';

      tourBody.querySelectorAll('.tour__checkbox input').forEach(cb => {
        cb.addEventListener('change', () => {
          tourMultiSelected = Array.from(tourBody.querySelectorAll('.tour__checkbox input:checked')).map(c => step.options[c.value].label);
          // Toggle active class on label
          cb.closest('.tour__checkbox').classList.toggle('active', cb.checked);
          continueBtn.disabled = tourMultiSelected.length === 0;
        });
      });

      continueBtn.addEventListener('click', () => {
        tourAnswers[tourStep] = tourMultiSelected;
        tourStep++;
        renderTourForm();
      });
    } else {
      // Single-select step (buttons)
      tourBody.innerHTML = `
        <p class="tour__step-label">${t.stepOf} ${tourStep + 1} ${t.of} ${tourTotalSteps}</p>
        <h3 class="tour__question">${step.question}</h3>
        <div class="tour__options">
          ${step.options.map(opt => `<button class="tour__option"><span class="tour__option-icon">${opt.icon}</span><span>${opt.label}</span></button>`).join('')}
        </div>
        ${tourStep > 0 ? `<button class="tour__back">&larr; ${t.quizBack}</button>` : ''}
      `;

      tourBody.querySelectorAll('.tour__option').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          btn.blur();
          tourAnswers[tourStep] = step.options[idx].label;
          tourStep++;
          if (tourStep < tourSteps.length) {
            renderTourStep();
          } else {
            renderTourForm();
          }
        });
      });
    }

    // Back button
    const backBtn = tourBody.querySelector('.tour__back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        tourStep--;
        renderTourStep();
      });
    }
  };

  const renderTourForm = () => {
    updateTourProgress();
    const selectedProject = tourAnswers[0] || '';
    tourBody.innerHTML = `
      <p class="tour__step-label">${t.tourFormTitle}</p>
      <h3 class="tour__question" style="font-size:1.2rem;margin-bottom:8px;">${t.tourTitle}</h3>
      <p class="tour__form-sub">${t.tourFormSub}</p>
      <form class="tour__form" novalidate>
        <input type="text" class="tour__input" name="tour-name" placeholder="${t.tourName}" required>
        <input type="tel" class="tour__input" name="tour-whatsapp" placeholder="${t.tourWhatsapp}" required>
        <input type="email" class="tour__input" name="tour-email" placeholder="${t.tourEmail}">
        <div class="tour__time-group">
          <label class="tour__time-label">${t.tourTime}</label>
          <div class="tour__time-options">
            ${t.tourTimeOptions.map((opt, i) => `<label class="tour__time-option${i === 3 ? ' active' : ''}"><input type="radio" name="tour-time" value="${opt}"${i === 3 ? ' checked' : ''}><span>${opt}</span></label>`).join('')}
          </div>
        </div>
        <textarea class="tour__input tour__textarea" name="tour-comment" placeholder="${t.tourComment}" rows="2"></textarea>
        <div class="form-consent" id="tour-consent-group">
          <input type="checkbox" class="form-consent__checkbox" id="tour-consent" name="tour-consent">
          <label class="form-consent__text" for="tour-consent">${t.tourConsent}</label>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%;">${t.tourSubmit}</button>
      </form>
      <button class="tour__back">&larr; ${t.quizBack}</button>
    `;

    // Time option toggle
    tourBody.querySelectorAll('.tour__time-option input').forEach(radio => {
      radio.addEventListener('change', () => {
        tourBody.querySelectorAll('.tour__time-option').forEach(el => el.classList.remove('active'));
        radio.closest('.tour__time-option').classList.add('active');
      });
    });

    // Form submit
    tourBody.querySelector('.tour__form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = tourBody.querySelector('[name="tour-name"]');
      const waInput = tourBody.querySelector('[name="tour-whatsapp"]');
      let valid = true;

      if (!validateField(nameInput, 'name')) valid = false;
      // Validate WhatsApp - treat as name (non-empty)
      if (!waInput.value.trim()) {
        waInput.classList.add('field-error');
        valid = false;
      } else {
        waInput.classList.remove('field-error');
      }

      const consentGroup = tourBody.querySelector('#tour-consent-group');
      const consentBox = tourBody.querySelector('#tour-consent');
      if (consentGroup && consentBox && !consentBox.checked) {
        consentGroup.classList.add('error');
        showFieldError(consentBox, t.valConsent);
        valid = false;
      }
      if (!valid) return;

      const data = {
        name: nameInput.value.trim(),
        whatsapp: waInput.value.trim(),
        email: (tourBody.querySelector('[name="tour-email"]').value || '').trim(),
        time: (tourBody.querySelector('[name="tour-time"]:checked') || {}).value || '',
        comment: (tourBody.querySelector('[name="tour-comment"]').value || '').trim(),
        project: tourAnswers[0] || '',
        whenInBali: tourAnswers[1] || '',
        interests: tourAnswers[2] || [],
        lang: lang
      };

      console.log('Tour booking lead (test mode):', data);
      trackEvent('generate_lead', 'tour_booking', data.project);
      sessionStorage.setItem('leadCaptured', 'true');

      // Thank you screen
      tourBar.style.width = '100%';
      const projectUrl = tourProjectUrls[data.project] || '';
      const waNum = (typeof SITE_DATA !== 'undefined' && SITE_DATA.contacts) ? SITE_DATA.contacts.whatsapp : '6281338741177';
      tourBody.innerHTML = `
        <div class="tour__result">
          <div class="tour__result-icon">
            <svg viewBox="0 0 24 24" width="48" height="48"><circle cx="12" cy="12" r="10" stroke="var(--color-accent)" stroke-width="1.5" fill="none"/><path d="M8 12l3 3 5-5" stroke="var(--color-accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="tour__question">${t.tourThankTitle}</h3>
          <p class="tour__result-desc">${t.tourThankText}</p>
          <a href="https://wa.me/${waNum}" target="_blank" rel="noopener noreferrer" class="btn btn--primary" style="width:100%;margin-bottom:12px;">
            <svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;margin-right:8px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="var(--color-bg)"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="var(--color-bg)" stroke-width="0" fill="var(--color-accent)"/></svg>
            ${t.tourThankWa}
          </a>
          ${projectUrl ? `<a href="${projectUrl}" class="tour__project-link">${t.tourThankProject} ${data.project} &rarr;</a>` : ''}
        </div>
      `;
    });

    // Back button
    tourBody.querySelector('.tour__back').addEventListener('click', () => {
      tourStep = tourSteps.length - 1;
      renderTourStep();
    });
  };

  const openTour = (preselectedProject) => {
    tourStep = 0;
    tourAnswers.length = 0;
    tourMultiSelected = [];
    // If triggered from a specific project page, pre-select project and skip step 1
    if (preselectedProject) {
      tourAnswers[0] = preselectedProject;
      tourStep = 1;
    }
    renderTourStep();
    tourOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeTour = () => {
    tourOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  tourOverlay.querySelector('.tour__close').addEventListener('click', closeTour);
  tourOverlay.addEventListener('click', (e) => {
    if (e.target === tourOverlay) closeTour();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tourOverlay.classList.contains('active')) closeTour();
  });

  // Attach tour to [data-tour] buttons
  document.querySelectorAll('[data-tour]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const project = btn.dataset.tour || '';
      openTour(project || null);
    });
  });

  // --- Availability Bar animation ---
  var availBars = document.querySelectorAll('.availability-bar__fill');
  if (availBars.length) {
    var availObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.percent;
          availObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    availBars.forEach(function(bar) {
      bar.dataset.percent = bar.style.width;
      bar.style.width = '0';
      availObserver.observe(bar);
    });
  }

  // ─── IDR Currency Helpers ───
  var xRate = (typeof SITE_DATA !== 'undefined' && SITE_DATA.exchangeRate) ? SITE_DATA.exchangeRate.usdToIdr : 0;
  var xRateAuto = (typeof SITE_DATA !== 'undefined' && SITE_DATA.exchangeRate && SITE_DATA.exchangeRate.auto);

  function fmtIdr(usd, short) {
    if (!usd || !xRate) return '';
    var idr = Math.round(usd * xRate);
    if (short) {
      if (idr >= 1e9) return 'Rp ' + (idr / 1e9).toFixed(1).replace('.', ',') + ' Miliar';
      return 'Rp ' + Math.round(idr / 1e6).toLocaleString('id-ID') + ' jt';
    }
    return 'Rp ' + idr.toLocaleString('id-ID');
  }

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
    if (!amountEl || !annualEl || !yr5El || !yr10El || !occRange) return;

    // Apply ROI params from SITE_DATA
    if (typeof SITE_DATA !== 'undefined' && SITE_DATA.roi) {
      var roi = SITE_DATA.roi;
      if (roi.minInvestment) roiRange.min = roi.minInvestment;
      if (roi.maxInvestment) roiRange.max = roi.maxInvestment;
      if (roi.step) roiRange.step = roi.step;
      if (roi.defaultInvestment) roiRange.value = roi.defaultInvestment;
      if (roi.minOccupancy) occRange.min = roi.minOccupancy;
      if (roi.maxOccupancy) occRange.max = roi.maxOccupancy;
      if (roi.occupancyStep) occRange.step = roi.occupancyStep;
      if (roi.defaultOccupancy) { occRange.value = roi.defaultOccupancy; occValue.textContent = roi.defaultOccupancy + '%'; }
      if (roi.scenarios) {
        scenarioBtns.forEach(function(btn) {
          var sc = btn.dataset.scenario;
          if (sc && roi.scenarios[sc]) {
            btn.dataset.yield = roi.scenarios[sc].yield;
            btn.dataset.growth = roi.scenarios[sc].growth;
            if (btn.classList.contains('active')) {
              rentalYield = roi.scenarios[sc].yield;
              growthRate = roi.scenarios[sc].growth;
            }
          }
        });
      }
    }

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
      amountEl.innerHTML = '$' + inv.toLocaleString() + (fmtIdr(inv) ? '<span class="price-idr">' + fmtIdr(inv) + '</span>' : '');
      annualEl.innerHTML = '$' + Math.round(annualRental).toLocaleString() + (fmtIdr(annualRental) ? '<span class="price-idr">' + fmtIdr(Math.round(annualRental)) + '</span>' : '');
      yr5El.innerHTML = '$' + Math.round(rental5).toLocaleString() + (fmtIdr(rental5) ? '<span class="price-idr">' + fmtIdr(Math.round(rental5)) + '</span>' : '');
      yr10El.innerHTML = '$' + Math.round(total10).toLocaleString() + (fmtIdr(total10) ? '<span class="price-idr">' + fmtIdr(Math.round(total10)) + '</span>' : '');
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
  function getGuidePath() {
    if (typeof SITE_DATA !== 'undefined' && SITE_DATA.investmentGuide && SITE_DATA.investmentGuide.path) {
      var prefix = (lang !== 'en') ? '../' : '';
      return prefix + SITE_DATA.investmentGuide.path;
    }
    return '';
  }

document.querySelectorAll('.lead-magnet__form').forEach(form => {
    form.setAttribute('novalidate', '');
    form.querySelectorAll('input[type="text"], input[type="email"]').forEach(function(inp) {
      inp.addEventListener('input', function() { clearFieldError(inp); });
    });
    var leadConsentBox = form.querySelector('#lead-consent');
    if (leadConsentBox) {
      leadConsentBox.addEventListener('change', function() {
        var grp = form.querySelector('#lead-consent-group');
        if (grp) grp.classList.remove('error');
        clearFieldError(leadConsentBox);
      });
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      var nameInp = form.querySelector('input[type="text"]');
      var emailInp = form.querySelector('input[type="email"]');
      var ok = true;
      if (nameInp && !validateField(nameInp, 'name')) ok = false;
      if (emailInp && !validateField(emailInp, 'email')) ok = false;
      var leadConsentGrp = form.querySelector('#lead-consent-group');
      var leadConsentCb = form.querySelector('#lead-consent');
      if (leadConsentGrp && leadConsentCb && !leadConsentCb.checked) {
        leadConsentGrp.classList.add('error');
        showFieldError(leadConsentCb, t.valConsent);
        ok = false;
      }
      if (!ok) return;
      const name = nameInp ? nameInp.value.trim() : '';
      const email = emailInp ? emailInp.value.trim() : '';
      console.log('Lead magnet:', { name, email });
      trackEvent('generate_lead', 'lead_magnet', 'investment_guide');
      sessionStorage.setItem('leadCaptured', 'true');
      var wrap = form.closest('.lead-magnet__form-wrap');
      var waNum2 = (typeof SITE_DATA !== 'undefined' && SITE_DATA.contacts) ? SITE_DATA.contacts.whatsapp : '6281338741177';
      wrap.innerHTML = `<div class="lead-magnet__success"><h3>${t.leadThankTitle}</h3><p>${t.leadThankText}</p><div class="lead-magnet__divider"></div><p class="lead-magnet__sub">${t.leadThankSub}</p><a href="https://wa.me/${waNum2}" target="_blank" rel="noopener noreferrer" class="btn lead-magnet__wa">${t.leadThankWa}</a></div>`;
      var guidePath = getGuidePath();
      if (guidePath) {
        var cnt = 7;
        var numEl = wrap.querySelector('.countdown-num');
        var iv = setInterval(function() {
          cnt--;
          if (numEl) {
            numEl.textContent = cnt;
            numEl.classList.add('tick');
            setTimeout(function() { numEl.classList.remove('tick'); }, 300);
          }
          if (cnt <= 0) {
            clearInterval(iv);
            trackEvent('file_download', 'pdf', 'investment_guide');
            if (numEl) numEl.parentElement.innerHTML = '<a href="' + guidePath + '" target="_blank" rel="noopener noreferrer" class="btn btn--primary guide-open-btn">' + t.leadOpenBtn + '</a>';
          }
        }, 1000);
      }
    });
  });

  // --- Sticky CTA Bar (mobile) ---
  const isContactsPage = window.location.pathname.includes('contacts');
  const hero = document.querySelector('.hero') || document.querySelector('.fullbleed-hero') || document.querySelector('.page-hero');
  const waBtn = document.querySelector('.whatsapp-float');
  if (waBtn) {
    waBtn.addEventListener('click', function() { trackEvent('contact', 'whatsapp', 'float_button'); });
  }

  // Skip sticky CTA on contacts page (already has contact form)
  if (!isContactsPage) {
    const stickyCTA = document.createElement('div');
    stickyCTA.className = 'sticky-cta';

    // On project pages, sticky CTA opens tour popup instead of quiz
    const heroStatsEl = document.querySelector('.hero-stats[data-project]');
    const stickyProjectName = heroStatsEl ? {
      'serenity-villas': 'Serenity Villas',
      'serenity-estates': 'Serenity Estates',
      'serenity-village': 'Serenity Village'
    }[heroStatsEl.dataset.project] || '' : '';

    if (stickyProjectName) {
      const stickyTourLabel = lang === 'ru' ? 'Запланировать тур' : lang === 'id' ? 'Jadwalkan Tur' : 'Schedule a Tour';
      stickyCTA.innerHTML = `<button class="sticky-cta__btn btn btn--primary">${stickyTourLabel}</button>`;
      stickyCTA.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        openTour(stickyProjectName);
      });
    } else {
      stickyCTA.innerHTML = `<button class="sticky-cta__btn btn btn--primary" data-quiz>${t.stickyCta}</button>`;
      stickyCTA.querySelector('[data-quiz]').addEventListener('click', (e) => {
        e.preventDefault();
        openQuiz();
      });
    }
    document.body.appendChild(stickyCTA);

    if (hero) {
      const showSticky = () => {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const isOverlayOpen = quizOverlay.classList.contains('active') || tourOverlay.classList.contains('active');
        if (heroBottom < 0 && !isOverlayOpen) {
          stickyCTA.classList.add('visible');
          if (waBtn) { waBtn.classList.add('visible'); waBtn.classList.add('lifted'); }
        } else {
          stickyCTA.classList.remove('visible');
          if (waBtn) { waBtn.classList.remove('visible'); waBtn.classList.remove('lifted'); }
        }
      };
      let stickyTicking = false;
      window.addEventListener('scroll', () => {
        if (!stickyTicking) {
          requestAnimationFrame(() => { showSticky(); stickyTicking = false; });
          stickyTicking = true;
        }
      }, { passive: true });
      showSticky();
    }
  }

  // --- Exit Intent Popup ---
  var exitPopupEnabled = true;
  var exitPopupDelay = 30000;
  var exitCountdown = 7;
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.exitPopup) {
    exitPopupEnabled = SITE_DATA.exitPopup.enabled !== false;
    exitPopupDelay = (SITE_DATA.exitPopup.delay || 30) * 1000;
    exitCountdown = SITE_DATA.exitPopup.countdown || 7;
  }

  if (exitPopupEnabled) {
  const exitOverlay = document.createElement('div');
  exitOverlay.className = 'exit-overlay';
  exitOverlay.innerHTML = `
    <div class="exit-popup" role="dialog" aria-modal="true" aria-labelledby="exit-popup-title">
      <button class="exit-popup__close" aria-label="Close popup">&times;</button>
      <span class="section-header__tag">${t.exitTag}</span>
      <h3 class="exit-popup__title" id="exit-popup-title">${t.exitTitle}</h3>
      <p class="exit-popup__text">${t.exitText}</p>
      <form class="exit-popup__form" novalidate>
        <input type="email" class="exit-popup__input" placeholder="${t.exitPlaceholder}">
        <div class="form-consent" id="exit-consent-group">
          <input type="checkbox" class="form-consent__checkbox" id="exit-consent" name="exit-consent">
          <label class="form-consent__text" for="exit-consent">${t.quizConsent}</label>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%">${t.exitSubmit}</button>
      </form>
    </div>
  `;
  document.body.appendChild(exitOverlay);

  const closeExit = () => {
    exitOverlay.classList.remove('active');
    document.body.style.overflow = '';
    sessionStorage.setItem('exitShown', 'true');
    if (exitOverlay._countdownIv) { clearInterval(exitOverlay._countdownIv); exitOverlay._countdownIv = null; }
  };

  exitOverlay.querySelector('.exit-popup__close').addEventListener('click', closeExit);
  exitOverlay.addEventListener('click', (e) => {
    if (e.target === exitOverlay) closeExit();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && exitOverlay.classList.contains('active')) closeExit();
  });

  var exitInput = exitOverlay.querySelector('.exit-popup__input');
  exitInput.addEventListener('input', function() { clearFieldError(exitInput); });
  var exitConsentBox = exitOverlay.querySelector('#exit-consent');
  if (exitConsentBox) {
    exitConsentBox.addEventListener('change', function() {
      var grp = exitOverlay.querySelector('#exit-consent-group');
      if (grp) grp.classList.remove('error');
      clearFieldError(exitConsentBox);
    });
  }

  exitOverlay.querySelector('.exit-popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    var ok = true;
    if (!validateField(exitInput, 'email')) ok = false;
    var exitConsentGrp = exitOverlay.querySelector('#exit-consent-group');
    var exitConsentCb = exitOverlay.querySelector('#exit-consent');
    if (exitConsentGrp && exitConsentCb && !exitConsentCb.checked) {
      exitConsentGrp.classList.add('error');
      showFieldError(exitConsentCb, t.valConsent);
      ok = false;
    }
    if (!ok) return;
    const email = exitInput.value.trim();
    console.log('Exit popup lead:', { email });
    trackEvent('generate_lead', 'exit_popup', 'investment_guide');
    sessionStorage.setItem('leadCaptured', 'true');
    var exitForm = exitOverlay.querySelector('.exit-popup__form');
    exitForm.innerHTML = `<p style="text-align:center;font-weight:600;padding:12px 0;">${t.exitSuccess}</p>`;
    var guidePath = getGuidePath();
    if (guidePath) {
      var cnt = exitCountdown;
      var numEl = exitForm.querySelector('.countdown-num');
      exitOverlay._countdownIv = setInterval(function() {
        cnt--;
        if (numEl) {
          numEl.textContent = cnt;
          numEl.classList.add('tick');
          setTimeout(function() { numEl.classList.remove('tick'); }, 300);
        }
        if (cnt <= 0) {
          clearInterval(exitOverlay._countdownIv);
          exitOverlay._countdownIv = null;
          if (numEl) numEl.parentElement.innerHTML = '<a href="' + guidePath + '" target="_blank" rel="noopener noreferrer" class="btn btn--primary guide-open-btn">' + t.exitOpenBtn + '</a>';
        }
      }, 1000);
    } else {
      setTimeout(closeExit, 3000);
    }
  });

  const pageLoadTime = Date.now();
  document.documentElement.addEventListener('mouseleave', (e) => {
    if (e.clientY > 0) return;
    if (Date.now() - pageLoadTime < exitPopupDelay) return;
    if (sessionStorage.getItem('exitShown')) return;
    if (sessionStorage.getItem('leadCaptured')) return;
    if (quizOverlay.classList.contains('active')) return;
    exitOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  } // end exitPopupEnabled

  function refreshIdrDisplay() {
    document.querySelectorAll('[data-usd]').forEach(function(el) {
      var usd = parseFloat(el.dataset.usd);
      if (usd && xRate) {
        var idrEl = el.querySelector('.idr-amount') || el.nextElementSibling;
        if (idrEl && idrEl.classList.contains('idr-amount')) {
          idrEl.textContent = fmtIdr(usd);
        }
      }
    });
  }

  if (xRateAuto) {
    fetch('https://open.er-api.com/v6/latest/USD').then(function(res) { return res.json(); }).then(function(data) {
      if (data.result === 'success' && data.rates && data.rates.IDR) {
        xRate = Math.round(data.rates.IDR);
        refreshIdrDisplay();
      }
    }).catch(function(err) { console.warn('Exchange rate fetch failed, using saved rate:', err.message); });
    setInterval(function() {
      fetch('https://open.er-api.com/v6/latest/USD').then(function(res) { return res.json(); }).then(function(data) {
        if (data.result === 'success' && data.rates && data.rates.IDR) {
          xRate = Math.round(data.rates.IDR);
          refreshIdrDisplay();
        }
      }).catch(function(err) { console.warn('Exchange rate refresh failed:', err.message); });
    }, 3600000);
  }

  // Auto-inject IDR into any element with data-usd="123000"
  document.querySelectorAll('[data-usd]').forEach(function(el) {
    var usd = parseFloat(el.dataset.usd);
    var short = !!el.closest('.hero__stats, .hero-stats');
    var idr = fmtIdr(usd, short);
    if (idr) el.innerHTML = el.innerHTML + '<span class="price-idr">' + idr + '</span>';
  });

  // ─── Dynamic Contact Data from SITE_DATA ───
  if (typeof SITE_DATA !== 'undefined' && SITE_DATA.contacts) {
    var c = SITE_DATA.contacts;
    document.querySelectorAll('[data-contact="phone"]').forEach(function(el) { el.textContent = c.phone; });
    document.querySelectorAll('[data-contact="email"]').forEach(function(el) { el.textContent = c.email; });
    document.querySelectorAll('[data-contact="location"]').forEach(function(el) {
      var loc = c.location;
      el.textContent = (typeof loc === 'object') ? (loc[lang] || loc.en) : loc;
    });
    document.querySelectorAll('[data-contact="whatsapp-link"]').forEach(function(el) {
      el.href = 'https://wa.me/' + c.whatsapp;
    });
    // Update mailto links
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(el) {
      el.href = 'mailto:' + c.email;
      if (el.textContent.includes('@')) el.textContent = c.email;
    });
  }

  // ─── Dynamic Testimonials from TESTIMONIALS_DATA ───
  if (typeof TESTIMONIALS_DATA !== 'undefined') {
    var tContainers = document.querySelectorAll('[data-testimonials-container]');
    if (tContainers.length) {
      var sorted = TESTIMONIALS_DATA.slice().sort(function(a, b) { return (a.order || 99) - (b.order || 99); });
      var testimonialsHTML = sorted.map(function(t) {
        var stars = '';
        for (var s = 0; s < (t.stars || 5); s++) stars += '★';
        var authorName = t.name[lang] || t.name.en;
        var avatarHTML = '';
        if (t.avatar) {
          avatarHTML = '<img class="testimonials__avatar" src="' + t.avatar + '" alt="' + authorName + '" loading="lazy" width="48" height="48">';
        } else {
          var inits = authorName.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
          avatarHTML = '<span class="testimonials__avatar testimonials__avatar--initials">' + inits + '</span>';
        }
        var verifiedHTML = '';
        if (t.sourceName) {
          var verifiedText = '✓ Verified via ' + t.sourceName;
          verifiedHTML = t.sourceUrl
            ? '<a class="testimonials__verified" href="' + t.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + verifiedText + '</a>'
            : '<span class="testimonials__verified">' + verifiedText + '</span>';
        }
        return '<div class="testimonials__card reveal-stagger">' +
          '<div class="testimonials__stars">' + stars + '</div>' +
          '<blockquote class="testimonials__text">' + (t.text[lang] || t.text.en) + '</blockquote>' +
          '<div class="testimonials__author">' + avatarHTML + '<div class="testimonials__author-info">' +
          '<span class="testimonials__name">' + authorName + '</span>' +
          '<span class="testimonials__role">' + (t.role[lang] || t.role.en) + '</span>' +
          verifiedHTML +
          '</div></div></div>';
      }).join('');
      tContainers.forEach(function(tContainer) {
        tContainer.innerHTML = testimonialsHTML;
        if (typeof revealObserver !== 'undefined') {
          tContainer.querySelectorAll('.reveal-stagger').forEach(function(el) { revealObserver.observe(el); });
        }
      });
    }
  }

  // ─── Dynamic Render from PROJECTS_DATA ───
  if (typeof PROJECTS_DATA !== 'undefined') {
    const PD = PROJECTS_DATA;
    const dataLang = lang;
    const pathPrefix = (lang !== 'en') ? '../' : '';

    function fmtPrice(p) {
      if (!p) return '\u2014';
      return '$' + p.toLocaleString('en-US');
    }

    function fmtDualPrice(p) {
      if (!p) return '\u2014';
      var usd = '$' + p.toLocaleString('en-US');
      var idr = fmtIdr(p);
      if (!idr) return usd;
      return usd + '<span class="price-idr">' + idr + '</span>';
    }

    // Helper: get project keys sorted by order
    function getProjectKeys() {
      return Object.keys(PD).filter(function(k) { return PD[k] && PD[k].slug; })
        .sort(function(a, b) { return (PD[a].order || 99) - (PD[b].order || 99); });
    }

    // Auto-calculate project count
    var autoStatEl = document.querySelector('[data-auto-stat="projects-count"]');
    if (autoStatEl) { autoStatEl.textContent = getProjectKeys().length; }

    // Helper: get localized value
    function loc(obj) {
      if (!obj) return '';
      return obj[dataLang] || obj.en || '';
    }

    // --- Hero Stats ---
    document.querySelectorAll('.hero-stats[data-project]').forEach(el => {
      const key = el.dataset.project;
      const proj = PD[key];
      if (!proj || !proj.heroStats) return;
      const stats = proj.heroStats[lang] || proj.heroStats.en;
      el.innerHTML = stats.map(s => {
        return '<div class="hero-stats__item"><div class="hero-stats__number">' + s.number + '</div><div class="hero-stats__label">' + s.label + '</div></div>';
      }).join('');
    });

    // --- Availability Bar ---
    document.querySelectorAll('.availability-bar[data-project]').forEach(el => {
      const key = el.dataset.project;
      const proj = PD[key];
      if (!proj || !proj.availability) return;
      const av = proj.availability;
      const labels = PD.availabilityLabels[lang] || PD.availabilityLabels.en;

      if (proj.status === 'pre-sale') {
        el.innerHTML =
          '<div class="availability-bar__header"><span class="availability-bar__label availability-bar__label--presale"><span class="presale-dot"></span> ' + labels.preSale + '</span></div>';
      } else {
        const pct = Math.round((av.sold / av.total) * 100);
        const left = av.total - av.sold;
        el.innerHTML =
          '<div class="availability-bar__header"><span class="availability-bar__label">' + av.sold + ' ' + labels.of + ' ' + av.total + ' ' + labels.unitsSold + '</span><span class="availability-bar__percent">' + pct + '%</span></div>' +
          '<div class="availability-bar__track"><div class="availability-bar__fill" style="width:' + pct + '%"></div></div>';
      }
    });

    // --- Unit Table (Villas / Estates) ---
    document.querySelectorAll('.unit-table[data-project]').forEach(el => {
      const key = el.dataset.project;
      const proj = PD[key];
      if (!proj || !proj.units) return;
      const h = PD.unitTableHeaders[lang] || PD.unitTableHeaders.en;
      const sl = PD.statusLabels[lang] || PD.statusLabels.en;

      let html = '<thead><tr><th>' + h.unit + '</th><th>' + h.type + '</th><th>' + h.floors + '</th><th>' + h.area + '</th><th>' + h.land + '</th><th>' + h.status + '</th><th>' + h.price + '</th></tr></thead><tbody>';
      proj.units.forEach(u => {
        const cls = u.badge ? ' class="unit--premium"' : '';
        const badge = u.badge ? ' <span class="unit__badge">' + u.badge + '</span>' : '';
        html += '<tr' + cls + '><td>' + u.id + badge + '</td><td>' + u.type + '</td><td>' + u.floors + '</td><td>' + u.area + '</td><td>' + u.land + '</td><td class="status--' + u.status + '">' + (sl[u.status] || u.status) + '</td><td>' + fmtDualPrice(u.price) + '</td></tr>';
      });
      html += '</tbody>';
      el.innerHTML = html;
    });

    // --- Village Unit Types Table ---
    document.querySelectorAll('.unit-table[data-village-types]').forEach(el => {
      const proj = PD['serenity-village'];
      if (!proj || !proj.unitTypes) return;
      const h = PD.villageTableHeaders[lang] || PD.villageTableHeaders.en;

      let html = '<thead><tr><th>' + h.type + '</th><th>' + h.floors + '</th><th>' + h.area + '</th><th>' + h.land + '</th><th>' + h.units + '</th><th>' + h.price + '</th></tr></thead><tbody>';
      proj.unitTypes.forEach(u => {
        html += '<tr><td>' + u.type + '</td><td>' + u.floors + '</td><td>' + u.area + '</td><td>' + u.land + '</td><td>' + u.count + '</td><td>' + fmtDualPrice(u.price) + '</td></tr>';
      });
      html += '</tbody>';
      el.innerHTML = html;
    });

    // --- Pre-sale Banner ---
    document.querySelectorAll('[data-presale-banner]').forEach(el => {
      const proj = PD['serenity-village'];
      if (!proj || !proj.preSaleBanner) return;
      const text = proj.preSaleBanner[lang] || proj.preSaleBanner.en;
      const p = el.querySelector('.presale-banner__text, p');
      if (p) p.textContent = text;
    });

    // --- Helper: build availability bar HTML ---
    function buildAvailBar(proj) {
      if (!proj.availability) return '';
      var av = proj.availability;
      var labels = PD.availabilityLabels[dataLang] || PD.availabilityLabels.en;
      if (proj.status === 'pre-sale') {
        return '<div class="availability-bar availability-bar--presale"><div class="availability-bar__header"><span class="availability-bar__label"><span class="availability-bar__dot"></span> ' + labels.preSale + '</span></div></div>';
      }
      var pct = Math.round((av.sold / av.total) * 100);
      return '<div class="availability-bar"><div class="availability-bar__header"><span class="availability-bar__label">' + loc(proj.showcaseAvailability) + '</span><span class="availability-bar__percent">' + pct + '%</span></div><div class="availability-bar__track"><div class="availability-bar__fill" style="width:' + pct + '%"></div></div></div>';
    }

    // --- Helper: badge CSS class from status ---
    function badgeClass(status) {
      if (status === 'pre-sale') return 'project-card__badge--presale';
      if (status === 'completed') return 'project-card__badge--completed';
      return 'project-card__badge--construction';
    }

    // --- Generate Showcase Cards from data-projects-container ---
    document.querySelectorAll('[data-projects-container]').forEach(function(container) {
      var useShort = container.hasAttribute('data-projects-short');
      var keys = getProjectKeys();
      container.innerHTML = keys.map(function(key, i) {
        var proj = PD[key];
        var num = String(i + 1).padStart(2, '0');
        var meta = proj.showcaseMeta ? (proj.showcaseMeta[dataLang] || proj.showcaseMeta.en) : [];
        var text = useShort ? loc(proj.showcaseSubtitle) : loc(proj.showcaseDesc);
        if (!text) text = loc(proj.showcaseSubtitle) || loc(proj.showcaseDesc);
        var metaHtml = meta.map(function(m) { return '<div><strong>' + m.strong + '</strong> ' + m.label + '</div>'; }).join('');
        return '<div class="project-showcase reveal" data-project="' + key + '">' +
          '<a href="' + proj.page + '" class="project-showcase__image">' +
            '<img src="' + pathPrefix + (proj.showcaseImage || '') + '" alt="' + proj.name + '" loading="lazy" width="1920" height="1080">' +
            '<span class="project-showcase__badge ' + badgeClass(proj.status) + '">' + loc(proj.showcaseStatus) + '</span>' +
          '</a>' +
          '<div class="project-showcase__content">' +
            '<span class="section-header__tag">' + num + '</span>' +
            '<h3>' + proj.name + '</h3>' +
            '<p>' + text + '</p>' +
            '<div class="project-showcase__meta">' + metaHtml + '</div>' +
            '<p class="project-showcase__price">' + loc(proj.showcasePrice) + (proj.startingPrice ? '<span class="price-idr">' + fmtIdr(proj.startingPrice) + '</span>' : '') + '</p>' +
            buildAvailBar(proj) +
            '<a href="' + proj.page + '" class="btn btn--outline">' + loc(proj.showcaseCta) + '</a>' +
          '</div>' +
        '</div>';
      }).join('');
      // Re-register dynamically created .reveal elements with IntersectionObserver
      container.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });
    });

    // --- Fallback: update existing showcase cards ---
    document.querySelectorAll('.project-showcase[data-project]').forEach(function(el) {
      var key = el.dataset.project;
      var proj = PD[key];
      if (!proj) return;

      var price = el.querySelector('.project-showcase__price');
      if (price && proj.showcasePrice) price.innerHTML = loc(proj.showcasePrice) + (proj.startingPrice ? '<span class="price-idr">' + fmtIdr(proj.startingPrice) + '</span>' : '');

      var badge = el.querySelector('.project-showcase__badge');
      if (badge && proj.showcaseStatus) badge.textContent = loc(proj.showcaseStatus);

      var cta = el.querySelector('.btn');
      if (cta && proj.showcaseCta) cta.textContent = loc(proj.showcaseCta);

      var bar = el.querySelector('.availability-bar');
      if (bar && proj.availability) {
        bar.outerHTML = buildAvailBar(proj);
      }
    });

    // --- Comparison Table on projects.html ---
    document.querySelectorAll('table[data-dynamic]').forEach(function(el) {
      var labels = PD.comparisonLabels[dataLang] || PD.comparisonLabels.en;
      var projects = getProjectKeys();
      var html = '<thead><tr><th></th>';
      projects.forEach(function(k) { html += '<th>' + PD[k].name + '</th>'; });
      html += '</tr></thead><tbody>';
      var comp = PD.comparisonData || {};
      var rows = [
        { key: 'price', fn: function(k) { var p = (comp[k] && comp[k].price) || ('$' + (PD[k].startingPrice / 1000 | 0) + 'K'); var idr = fmtIdr(PD[k].startingPrice); return p + (idr ? '<span class="price-idr">' + idr + '</span>' : ''); } },
        { key: 'bedrooms', fn: function(k) { return PD[k].bedrooms; } },
        { key: 'area', fn: function(k) { return PD[k].compArea || (comp[k] && comp[k].area) || '\u2014'; } },
        { key: 'land', fn: function(k) { return PD[k].compLand || (comp[k] && comp[k].land) || '\u2014'; } },
        { key: 'units', fn: function(k) { return PD[k].totalUnits; } },
        { key: 'pool', fn: function(k) { var p = PD[k].compPool || (comp[k] && comp[k].pool); if (!p) return '\u2014'; return (typeof p === 'object') ? (p[dataLang] || p.en) : p; } },
        { key: 'handover', fn: function(k) { return PD[k].handover || '\u2014'; } },
        { key: 'status', fn: function(k) { return loc(PD[k].showcaseStatus) || '\u2014'; } }
      ];
      rows.forEach(function(r) {
        html += '<tr><td>' + labels[r.key] + '</td>';
        projects.forEach(function(k) { html += '<td>' + r.fn(k) + '</td>'; });
        html += '</tr>';
      });
      html += '<tr><td></td>';
      projects.forEach(function(k) {
        html += '<td><a href="' + PD[k].page + '" class="btn btn--primary btn--sm">' + labels.cta + '</a></td>';
      });
      html += '</tr></tbody>';
      el.innerHTML = html;
    });

    // --- Floor Plans ---
    var fpIcons = {
      bedrooms: '<svg viewBox="0 0 48 48" fill="none"><path d="M8 32V18a2 2 0 012-2h28a2 2 0 012 2v14" stroke="currentColor" stroke-width="1.5"/><path d="M4 32h40v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="20" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="26" y="20" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
      bathrooms: '<svg viewBox="0 0 48 48" fill="none"><path d="M18 8h-4a2 2 0 00-2 2v14" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="24" width="32" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M12 28v6a4 4 0 004 4h16a4 4 0 004-4v-6" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="16" r="1" fill="currentColor"/><circle cx="24" cy="14" r="1" fill="currentColor"/><circle cx="28" cy="16" r="1" fill="currentColor"/><circle cx="22" cy="19" r="1" fill="currentColor"/><circle cx="26" cy="19" r="1" fill="currentColor"/></svg>',
      building: '<svg viewBox="0 0 48 48" fill="none"><path d="M10 38V14l14-6 14 6v24" stroke="currentColor" stroke-width="1.5"/><path d="M10 38h28" stroke="currentColor" stroke-width="1.5"/><rect x="20" y="26" width="8" height="12" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="15" y="18" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="27" y="18" width="6" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
      plot: '<svg viewBox="0 0 48 48" fill="none"><path d="M6 38l8-24h20l8 24H6z" stroke="currentColor" stroke-width="1.5"/><path d="M14 14v-4h20v4" stroke="currentColor" stroke-width="1.5"/><path d="M18 22v8M24 20v12M30 22v8" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',
      pool: '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="20" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 36c4-3 8 3 12 0s8 3 12 0s8 3 12 0" stroke="currentColor" stroke-width="1.5"/><path d="M14 12V8M34 12V8" stroke="currentColor" stroke-width="1.5"/><path d="M14 8h20" stroke="currentColor" stroke-width="1.5"/></svg>',
      terrace: '<svg viewBox="0 0 48 48" fill="none"><path d="M6 38h36M10 38V22h28v16" stroke="currentColor" stroke-width="1.5"/><path d="M10 22L24 10l14 12" stroke="currentColor" stroke-width="1.5"/><path d="M6 28h4M38 28h4M6 33h4M38 33h4" stroke="currentColor" stroke-width="1.5"/><path d="M18 38V28h12v10" stroke="currentColor" stroke-width="1.5"/></svg>',
      parking: '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M18 34V14h8a6 6 0 010 12h-8" stroke="currentColor" stroke-width="1.5"/></svg>',
      garden: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 38V22" stroke="currentColor" stroke-width="1.5"/><path d="M24 22c-8 0-12-6-10-12 4 2 10 4 10 12z" stroke="currentColor" stroke-width="1.5"/><path d="M24 22c8 0 12-6 10-12-4 2-10 4-10 12z" stroke="currentColor" stroke-width="1.5"/><path d="M16 38h16" stroke="currentColor" stroke-width="1.5"/></svg>'
    };

    document.querySelectorAll('.floor-plans-showcase[data-project]').forEach(function(el) {
      var key = el.dataset.project;
      var proj = PD[key];
      if (!proj || !proj.floorPlans) return;
      var types = Object.keys(proj.floorPlans);
      if (!types.length) return;

      // Normalize data: ensure { floors, specs } structure
      types.forEach(function(t) {
        var entry = proj.floorPlans[t];
        if (typeof entry === 'string') {
          proj.floorPlans[t] = { floors: { 'Ground Floor': entry }, specs: [] };
        } else if (!entry.floors) {
          var floors = {};
          var specs = entry.specs || [];
          Object.keys(entry).forEach(function(k) { if (k !== 'specs') floors[k] = entry[k]; });
          proj.floorPlans[t] = { floors: floors, specs: specs };
        }
      });

      var comingSoon = dataLang === 'ru' ? 'Скоро' : dataLang === 'id' ? 'Segera' : 'Coming Soon';
      var placeholderSvg = '<svg viewBox="0 0 80 80" fill="none"><rect x="12" y="16" width="56" height="48" rx="3" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="40" x2="68" y2="40" stroke="currentColor" stroke-width="1.5"/><line x1="40" y1="16" x2="40" y2="64" stroke="currentColor" stroke-width="1.5"/><rect x="18" y="22" width="10" height="12" rx="1" stroke="currentColor" stroke-width="1"/><rect x="46" y="22" width="10" height="12" rx="1" stroke="currentColor" stroke-width="1"/></svg>';

      // Type selector tabs
      var html = '<div class="fp-tabs">';
      types.forEach(function(type, i) {
        html += '<button class="fp-tabs__btn' + (i === 0 ? ' fp-tabs__btn--active' : '') + '" data-fp-type="' + type + '">' + type + '</button>';
      });
      html += '</div>';

      // Content panels per type
      types.forEach(function(type, i) {
        var data = proj.floorPlans[type];
        var floors = data.floors;
        var specs = data.specs || [];
        var floorKeys = Object.keys(floors);
        var hasMultiFloor = floorKeys.length > 1;

        html += '<div class="fp-panel' + (i === 0 ? ' fp-panel--active' : '') + '" data-fp-panel="' + type + '">';

        // Specs grid
        if (specs.length) {
          html += '<div class="fp-specs">';
          specs.forEach(function(s) {
            var icon = fpIcons[s.icon] || '';
            html += '<div class="fp-specs__item"><div class="fp-specs__icon">' + icon + '</div><div class="fp-specs__text">' + s.text + '</div></div>';
          });
          html += '</div>';
        }

        // Floor tabs (only if multiple floors)
        if (hasMultiFloor) {
          html += '<div class="fp-floor-tabs">';
          floorKeys.forEach(function(floor, fi) {
            html += '<button class="fp-floor-tabs__btn' + (fi === 0 ? ' fp-floor-tabs__btn--active' : '') + '" data-fp-floor="' + floor + '">' + floor + '</button>';
          });
          html += '</div>';
        }

        // Floor images
        floorKeys.forEach(function(floor, fi) {
          var img = floors[floor];
          html += '<div class="fp-view' + (fi === 0 ? ' fp-view--active' : '') + '" data-fp-view="' + floor + '">';
          if (img) {
            html += '<div class="fp-view__img" data-lightbox-src="' + img + '"><img src="' + img + '" alt="' + type + ' — ' + floor + '" loading="lazy"></div>';
          } else {
            html += '<div class="fp-view__placeholder">' + placeholderSvg + '<span>' + comingSoon + '</span></div>';
          }
          html += '</div>';
        });

        html += '</div>';
      });

      el.innerHTML = html;

      // Type tab switching
      el.querySelectorAll('.fp-tabs__btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          el.querySelectorAll('.fp-tabs__btn').forEach(function(b) { b.classList.remove('fp-tabs__btn--active'); });
          el.querySelectorAll('.fp-panel').forEach(function(p) { p.classList.remove('fp-panel--active'); });
          btn.classList.add('fp-tabs__btn--active');
          var panel = el.querySelector('[data-fp-panel="' + btn.dataset.fpType + '"]');
          if (panel) panel.classList.add('fp-panel--active');
        });
      });

      // Floor tab switching
      el.querySelectorAll('.fp-floor-tabs__btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var panel = btn.closest('.fp-panel');
          panel.querySelectorAll('.fp-floor-tabs__btn').forEach(function(b) { b.classList.remove('fp-floor-tabs__btn--active'); });
          panel.querySelectorAll('.fp-view').forEach(function(v) { v.classList.remove('fp-view--active'); });
          btn.classList.add('fp-floor-tabs__btn--active');
          var view = panel.querySelector('[data-fp-view="' + btn.dataset.fpFloor + '"]');
          if (view) view.classList.add('fp-view--active');
        });
      });

      // Lightbox
      el.querySelectorAll('.fp-view__img[data-lightbox-src]').forEach(function(card) {
        card.addEventListener('click', function() {
          var src = this.dataset.lightboxSrc;
          if (!src) return;
          var overlay = document.createElement('div');
          overlay.className = 'floor-plan-lightbox';
          overlay.innerHTML = '<div class="floor-plan-lightbox__backdrop"></div>' +
            '<img src="' + src + '" class="floor-plan-lightbox__img" alt="">' +
            '<button class="floor-plan-lightbox__close" aria-label="Close">&times;</button>';
          document.body.appendChild(overlay);
          requestAnimationFrame(function() { overlay.classList.add('active'); });
          overlay.addEventListener('click', function(e) {
            if (e.target === overlay.querySelector('img')) return;
            overlay.classList.remove('active');
            setTimeout(function() { overlay.remove(); }, 300);
          });
        });
      });
    });

    // --- Dynamic Footer Project Links ---
    document.querySelectorAll('[data-footer-projects]').forEach(function(container) {
      var keys = getProjectKeys();
      container.innerHTML = keys.map(function(k) {
        return '<a href="' + PD[k].page + '">' + PD[k].name + '</a>';
      }).join('');
    });
  }

});
