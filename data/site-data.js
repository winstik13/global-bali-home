/* eslint-disable */
const SITE_DATA = {
  "investmentGuide": {
    "path": "assets/bali-investment-guide-2026.pdf",
    "version": "2026",
    "updatedAt": "2026-03-28"
  },
  "exchangeRate": {
    "usdToIdr": 16900,
    "updatedAt": "2026-03-29",
    "auto": false
  },
  "contacts": {
    "phone": "+62 813 251 438 49",
    "phoneRaw": "6281325143849",
    "whatsapp": "6281338741177",
    "email": "office@globalbalihome.com",
    "location": {
      "en": "Ubud, Bali, Indonesia",
      "ru": "Убуд, Бали, Индонезия",
      "id": "Ubud, Bali, Indonesia"
    }
  },
  "social": {
    "facebook": "https://www.facebook.com/serenityvillasbali",
    "instagram": "https://www.instagram.com/serenity_villas_bali"
  },
  "roi": {
    "minInvestment": 100000,
    "maxInvestment": 1000000,
    "step": 10000,
    "defaultInvestment": 335000,
    "minOccupancy": 50,
    "maxOccupancy": 95,
    "occupancyStep": 5,
    "defaultOccupancy": 80,
    "scenarios": {
      "conservative": {
        "yield": 0.08,
        "growth": 0.06
      },
      "normal": {
        "yield": 0.12,
        "growth": 0.1
      },
      "optimistic": {
        "yield": 0.15,
        "growth": 0.12
      }
    }
  },
  "stats": {
    "investorsWorldwide": "20+",
    "villasDesigned": "43",
    "occupancyRate": "80%+",
    "founderExperience": "$1B+",
    "touristArrivals": "16M+",
    "rentalYield": "12-15%",
    "propertyGrowth": "8-12%",
    "paybackPeriod": "7-8 yr"
  },
  "analytics": {
    "ga4": "",
    "facebookPixel": "",
    "yandexMetrika": "",
    "clarity": "",
    "gscVerification": ""
  },
  "exitPopup": {
    "enabled": true,
    "delay": 30,
    "countdown": 7,
    "texts": {
      "en": {
        "tag": "Exclusive Guide",
        "title": "Before You Go — A Complimentary Resource",
        "text": "Access our comprehensive Bali Real Estate Investment Guide with market analysis, ROI projections, and expert insights.",
        "placeholder": "Your email address",
        "submit": "Access the Investment Guide",
        "success": "Thank you! Your guide is ready.",
        "openBtn": "Open the Guide"
      },
      "ru": {
        "tag": "Эксклюзивный гид",
        "title": "Прежде чем уйти — бесплатный ресурс",
        "text": "Получите наш подробный гид по инвестициям в недвижимость Бали с анализом рынка, прогнозами доходности и экспертными оценками.",
        "placeholder": "Ваш email",
        "submit": "Получить инвестиционный гид",
        "success": "Спасибо! Ваш гид готов.",
        "openBtn": "Открыть гид"
      },
      "id": {
        "tag": "Panduan Eksklusif",
        "title": "Sebelum Anda Pergi — Sumber Daya Gratis",
        "text": "Akses panduan investasi properti Bali kami yang komprehensif dengan analisis pasar, proyeksi ROI, dan wawasan ahli.",
        "placeholder": "Alamat email Anda",
        "submit": "Akses Panduan Investasi",
        "success": "Terima kasih! Panduan Anda siap.",
        "openBtn": "Buka Panduan"
      }
    }
  },
  "tourPopup": {
    "steps": {
      "en": [
        { "question": "Which project interests you?", "options": ["Serenity Villas", "Serenity Estates", "Serenity Village", "Not sure yet"] },
        { "question": "When are you in Bali?", "options": ["I'm already here", "Within 2 weeks", "Within a month", "Planning a trip"] },
        { "question": "What would you like to see?", "multi": true, "options": ["Construction site visit", "Meet the architect", "Investment terms review", "View completed villas", "Explore the area"] }
      ],
      "ru": [
        { "question": "Какой проект вас интересует?", "options": ["Serenity Villas", "Serenity Estates", "Serenity Village", "Ещё не определился"] },
        { "question": "Когда вы на Бали?", "options": ["Я уже здесь", "В ближайшие 2 недели", "В ближайший месяц", "Планирую поездку"] },
        { "question": "Что хотите увидеть?", "multi": true, "options": ["Осмотр стройплощадки", "Встреча с архитектором", "Обзор условий инвестиций", "Показ готовых вилл", "Знакомство с районом"] }
      ],
      "id": [
        { "question": "Proyek mana yang menarik bagi Anda?", "options": ["Serenity Villas", "Serenity Estates", "Serenity Village", "Belum yakin"] },
        { "question": "Kapan Anda di Bali?", "options": ["Saya sudah di sini", "Dalam 2 minggu", "Dalam sebulan", "Merencanakan perjalanan"] },
        { "question": "Apa yang ingin Anda lihat?", "multi": true, "options": ["Kunjungan lokasi konstruksi", "Bertemu arsitek", "Tinjauan ketentuan investasi", "Lihat villa yang selesai", "Jelajahi area"] }
      ]
    },
    "form": {
      "en": {
        "title": "How can we reach you?",
        "subtitle": "Our manager will contact you within 2 hours to confirm the tour details.",
        "name": "Your name",
        "whatsapp": "WhatsApp or phone number",
        "email": "Email (optional)",
        "time": "Preferred time",
        "timeOptions": ["Morning (9–12)", "Afternoon (12–17)", "Evening (17–20)", "Any time"],
        "comment": "Any special requests? (optional)",
        "consent": "I agree to the processing of my personal data in accordance with the Privacy Policy",
        "submit": "Request a Tour"
      },
      "ru": {
        "title": "Как с вами связаться?",
        "subtitle": "Наш менеджер свяжется с вами в течение 2 часов для подтверждения деталей тура.",
        "name": "Ваше имя",
        "whatsapp": "WhatsApp или телефон",
        "email": "Email (необязательно)",
        "time": "Удобное время",
        "timeOptions": ["Утро (9–12)", "День (12–17)", "Вечер (17–20)", "Любое время"],
        "comment": "Особые пожелания? (необязательно)",
        "consent": "Я согласен на обработку персональных данных в соответствии с Политикой конфиденциальности",
        "submit": "Запросить тур"
      },
      "id": {
        "title": "Bagaimana kami dapat menghubungi Anda?",
        "subtitle": "Manajer kami akan menghubungi Anda dalam 2 jam untuk mengonfirmasi detail tur.",
        "name": "Nama Anda",
        "whatsapp": "WhatsApp atau nomor telepon",
        "email": "Email (opsional)",
        "time": "Waktu yang diinginkan",
        "timeOptions": ["Pagi (9–12)", "Siang (12–17)", "Sore (17–20)", "Kapan saja"],
        "comment": "Permintaan khusus? (opsional)",
        "consent": "Saya menyetujui pemrosesan data pribadi saya sesuai dengan Kebijakan Privasi",
        "submit": "Minta Tur"
      }
    },
    "thankYou": {
      "en": { "title": "Tour Request Sent!", "text": "Our manager will contact you within 2 hours to arrange the details.", "whatsapp": "Message us on WhatsApp", "projectLink": "Learn more about" },
      "ru": { "title": "Заявка на тур отправлена!", "text": "Наш менеджер свяжется с вами в течение 2 часов для согласования деталей.", "whatsapp": "Написать в WhatsApp", "projectLink": "Подробнее о проекте" },
      "id": { "title": "Permintaan Tur Terkirim!", "text": "Manajer kami akan menghubungi Anda dalam 2 jam untuk mengatur detailnya.", "whatsapp": "Hubungi kami di WhatsApp", "projectLink": "Pelajari lebih lanjut tentang" }
    },
    "title": {
      "en": "Schedule a Private Tour",
      "ru": "Запланировать частный тур",
      "id": "Jadwalkan Tur Pribadi"
    }
  },
  "colors": {
    "bg": "#1a1a14",
    "bgAlt": "#111110",
    "bgCard": "#2a2a20",
    "accent": "#6B8F4E",
    "text": "#E1D9C9",
    "cream": "#F7F7F0"
  }
};
