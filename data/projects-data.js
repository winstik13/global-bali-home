/* eslint-disable */
/**
 * PROJECTS_DATA — single source of truth for all project data.
 * Consumed by main.js render functions and the admin panel.
 * Pattern mirrors gallery-data.js (global constant loaded via <script>).
 */
const PROJECTS_DATA = {

  /* ───────────────────────────── SERENITY VILLAS ───────────────────────────── */
  "serenity-villas": {
    slug: "serenity-villas",
    page: "project-serenity-villas.html",
    name: "Serenity Villas",
    totalUnits: 12,
    bedrooms: "2–3",
    handover: "Q2 2026",
    status: "in-progress",
    startingPrice: 335000,

    heroStats: {
      en: [
        { number: "12",      label: "Villas" },
        { number: "2–3",     label: "Bedrooms" },
        { number: "Q2 2026", label: "Handover" },
        { number: "$335K+",  label: "From" },
        { number: "12–15%",  label: "Yield" }
      ],
      ru: [
        { number: "12",      label: "Вилл" },
        { number: "2–3",     label: "Спальни" },
        { number: "Q2 2026", label: "Сдача" },
        { number: "$335K+",  label: "От" },
        { number: "12–15%",  label: "Доходность" }
      ],
      id: [
        { number: "12",      label: "Vila" },
        { number: "2–3",     label: "Kamar Tidur" },
        { number: "Q2 2026", label: "Serah Terima" },
        { number: "$335K+",  label: "Mulai Dari" },
        { number: "12–15%",  label: "Imbal Hasil" }
      ],
      zh: [
        { number: "12",      label: "别墅" },
        { number: "2–3",     label: "卧室" },
        { number: "Q2 2026", label: "交房" },
        { number: "$335K+",  label: "起价" },
        { number: "12–15%",  label: "收益率" }
      ]
    },

    availability: { sold: 8, total: 12 },

    showcasePrice: {
      en: "From $335,000",
      ru: "От $335,000",
      id: "From $335,000",
      zh: "From $335,000"
    },

    showcaseStatus: {
      en: "In Progress",
      ru: "Строится",
      id: "Dalam Pembangunan",
      zh: "建设中"
    },

    showcaseAvailability: {
      en: "Only 4 of 12 units left",
      ru: "Осталось всего 4 из 12",
      id: "8 dari 12 unit terjual",
      zh: "12套仅剩4套"
    },

    showcaseDesc: {
      en: "Unwinding in tropical surroundings. 12 modernly designed villa residences with jungle views, natural waterfalls, and full privacy. 2-3 bedroom configurations.",
      ru: "Отдых в тропическом окружении. 12 современных вилл-резиденций с видами на джунгли, природными водопадами и полной приватностью. Конфигурации с 2-3 спальнями.",
      id: "Bersantai di lingkungan tropis. 12 unit villa dengan desain modern, pemandangan hutan, air terjun alami, dan privasi penuh. Konfigurasi 2-3 kamar tidur.",
      zh: "热带环境中的惬意生活。12栋现代设计别墅，坐拥丛林美景、天然瀑布与完全私密空间。2-3卧室配置。"
    },

    showcaseCta: {
      en: "View Details",
      ru: "Подробнее",
      id: "Lihat Detail",
      zh: "查看详情"
    },

    units: [
      { id: "A1", type: "2 Bedroom", floors: 1, area: "122 m²", land: "2.8 are", status: "booked",    price: null,   badge: "Premium" },
      { id: "A2", type: "2 Bedroom", floors: 1, area: "122 m²", land: "2.6 are", status: "sold",      price: null,   badge: "Premium" },
      { id: "A3", type: "2 Bedroom", floors: 1, area: "122 m²", land: "2.6 are", status: "available", price: 399000, badge: "Premium" },
      { id: "A4", type: "2 Bedroom", floors: 1, area: "122 m²", land: "2.8 are", status: "available", price: 399000, badge: "Premium" },
      { id: "B1", type: "3 Bedroom", floors: 2, area: "210 m²", land: "2.3 are", status: "available", price: 357000, badge: null },
      { id: "B2", type: "2 Bedroom", floors: 2, area: "184 m²", land: "2.4 are", status: "sold",      price: null,   badge: null },
      { id: "B3", type: "2 Bedroom", floors: 2, area: "184 m²", land: "2.4 are", status: "sold",      price: null,   badge: null },
      { id: "B4", type: "3 Bedroom", floors: 2, area: "210 m²", land: "2.3 are", status: "sold",      price: null,   badge: null },
      { id: "C1", type: "2 Bedroom", floors: 2, area: "168 m²", land: "2.1 are", status: "sold",      price: null,   badge: null },
      { id: "C2", type: "2 Bedroom", floors: 2, area: "168 m²", land: "2.3 are", status: "sold",      price: null,   badge: null },
      { id: "C3", type: "2 Bedroom", floors: 2, area: "168 m²", land: "2.3 are", status: "resale",    price: 335000, badge: null },
      { id: "C4", type: "2 Bedroom", floors: 2, area: "168 m²", land: "2.4 are", status: "sold",      price: null,   badge: null }
    ]
  },

  /* ──────────────────────────── SERENITY ESTATES ──────────────────────────── */
  "serenity-estates": {
    slug: "serenity-estates",
    page: "project-serenity-estates.html",
    name: "Serenity Estates",
    totalUnits: 4,
    bedrooms: "2–4.5",
    handover: "Q1 2027",
    status: "in-progress",
    startingPrice: 310000,

    heroStats: {
      en: [
        { number: "4",       label: "Villas" },
        { number: "2–4.5",   label: "Bedrooms" },
        { number: "Q1 2027", label: "Handover" },
        { number: "$310K",   label: "From" },
        { number: "12–15%",  label: "Yield" }
      ],
      ru: [
        { number: "4",       label: "Виллы" },
        { number: "2–4.5",   label: "Спальни" },
        { number: "Q1 2027", label: "Сдача" },
        { number: "$310K",   label: "От" },
        { number: "12–15%",  label: "Доходность" }
      ],
      id: [
        { number: "4",       label: "Vila" },
        { number: "2–4.5",   label: "Kamar Tidur" },
        { number: "Q1 2027", label: "Serah Terima" },
        { number: "$310K",   label: "Mulai Dari" },
        { number: "12–15%",  label: "Imbal Hasil" }
      ],
      zh: [
        { number: "4",       label: "别墅" },
        { number: "2–4.5",   label: "卧室" },
        { number: "Q1 2027", label: "交房" },
        { number: "$310K",   label: "起价" },
        { number: "12–15%",  label: "收益率" }
      ]
    },

    availability: { sold: 1, total: 4 },

    showcasePrice: {
      en: "From $310,000",
      ru: "От $310,000",
      id: "From $310,000",
      zh: "From $310,000"
    },

    showcaseStatus: {
      en: "In Progress",
      ru: "Строится",
      id: "Dalam Pembangunan",
      zh: "建设中"
    },

    showcaseAvailability: {
      en: "1 of 4 units sold",
      ru: "1 из 4 продано",
      id: "1 dari 4 unit terjual",
      zh: "4套中已售1套"
    },

    showcaseDesc: {
      en: "Where nature and design blend seamlessly. A boutique complex of only 4 exclusive villas with private pools, fish ponds, and stunning rice terrace views.",
      ru: "Где природа и дизайн сливаются воедино. Бутик-комплекс из 4 эксклюзивных вилл с частными бассейнами, рыбными прудами и потрясающими видами на рисовые террасы.",
      id: "Di mana alam dan desain berpadu sempurna. Kompleks butik hanya 4 villa eksklusif dengan kolam renang pribadi, kolam ikan, dan pemandangan sawah bertingkat yang menakjubkan.",
      zh: "自然与设计完美融合。仅4栋独享别墅的精品项目，配备私人泳池、鱼塘及令人惊叹的梯田美景。"
    },

    showcaseCta: {
      en: "View Details",
      ru: "Подробнее",
      id: "Lihat Detail",
      zh: "查看详情"
    },

    units: [
      { id: "A1", type: "4.5 Bedroom", floors: 1, area: "230 m²", land: "9 are",   status: "available", price: 990000,  badge: "Premium" },
      { id: "A2", type: "4.5 Bedroom", floors: 1, area: "250 m²", land: "14 are",  status: "available", price: 1190000, badge: "Premium" },
      { id: "B1", type: "2 Bedroom",   floors: 2, area: "180 m²", land: "3.5 are", status: "sold",      price: null,    badge: null },
      { id: "B2", type: "2 Bedroom",   floors: 2, area: "155 m²", land: "3.5 are", status: "available", price: 310000,  badge: null }
    ]
  },

  /* ──────────────────────────── SERENITY VILLAGE ──────────────────────────── */
  "serenity-village": {
    slug: "serenity-village",
    page: "project-serenity-village.html",
    name: "Serenity Village",
    totalUnits: 26,
    bedrooms: "1–2",
    handover: "Q3 2027",
    status: "pre-sale",
    startingPrice: 119000,

    heroStats: {
      en: [
        { number: "26",     label: "Villas" },
        { number: "1–2",    label: "Bedrooms" },
        { number: "$119K",  label: "From" },
        { number: "12–15%", label: "Yield" },
        { number: "Pre-Sale", label: "Status" }
      ],
      ru: [
        { number: "26",          label: "Вилл" },
        { number: "1-2",         label: "Спальни" },
        { number: "$119K",       label: "От" },
        { number: "12–15%",      label: "Доходность" },
        { number: "Предпродажа", label: "Статус" }
      ],
      id: [
        { number: "26",       label: "Vila" },
        { number: "1–2",      label: "Kamar Tidur" },
        { number: "$119K",    label: "Mulai Dari" },
        { number: "12–15%",   label: "Imbal Hasil" },
        { number: "Pre-Sale", label: "Status" }
      ],
      zh: [
        { number: "26",     label: "别墅" },
        { number: "1-2",    label: "卧室" },
        { number: "$119K",  label: "起价" },
        { number: "12–15%", label: "收益率" },
        { number: "预售中",  label: "状态" }
      ]
    },

    availability: { sold: 9, total: 26 },

    preSaleBanner: {
      en: "Pre-Sale Now Open — Register Your Interest Today",
      ru: "Предпродажа открыта — Зарегистрируйте ваш интерес",
      id: "Pra-Penjualan Dibuka — Daftarkan Minat Anda Hari Ini",
      zh: "预售已开启 — 立即登记您的意向"
    },

    showcasePrice: {
      en: "From $119,000",
      ru: "От $119,000",
      id: "From $119,000",
      zh: "起价 $119,000"
    },

    showcaseStatus: {
      en: "Pre-Sale",
      ru: "Предпродажа",
      id: "Pra-Penjualan",
      zh: "预售"
    },

    showcaseAvailability: {
      en: "Pre-Sale Open",
      ru: "Предпродажа открыта",
      id: "Pra-Penjualan Dibuka",
      zh: "预售开放"
    },

    showcaseDesc: {
      en: "Complex of 26 villas with 1 and 2 bedroom options. Shared amenities include a large swimming pool and cafe. Maximum investment potential.",
      ru: "Комплекс из 26 вилл с вариантами на 1 и 2 спальни. Общая инфраструктура включает большой бассейн и кафе. Максимальный инвестиционный потенциал.",
      id: "Kompleks 26 villa dengan pilihan 1 dan 2 kamar tidur. Fasilitas bersama mencakup kolam renang besar dan kafe kompleks. Potensi investasi maksimal.",
      zh: "由26栋别墅组成的活力综合体，提供1卧室和2卧室户型选择。共享设施包括大型游泳池和咖啡厅。我们最具投资潜力的项目。"
    },

    showcaseCta: {
      en: "View Details",
      ru: "Подробнее",
      id: "Lihat Detail",
      zh: "了解详情"
    },

    unitTypes: [
      { type: "1 Bedroom", floors: 1, area: "50 m²",  land: "1.16 are", count: 12, price: 119000 },
      { type: "2 Bedroom", floors: 2, area: "84 m²",  land: "1.54 are", count: 14, price: 187000 }
    ]
  },

  /* ──────────────────────────── COMPARISON TABLE ──────────────────────────── */
  comparisonLabels: {
    en: { price: "Price from", bedrooms: "Bedrooms", area: "Area", land: "Land", units: "Total Units", pool: "Pool", handover: "Handover", status: "Status", cta: "View Details" },
    ru: { price: "Цена от", bedrooms: "Спальни", area: "Площадь", land: "Земля", units: "Всего юнитов", pool: "Бассейн", handover: "Сдача", status: "Статус", cta: "Подробнее" },
    id: { price: "Harga mulai", bedrooms: "Kamar Tidur", area: "Luas", land: "Lahan", units: "Total Unit", pool: "Kolam", handover: "Serah Terima", status: "Status", cta: "Lihat Detail" },
    zh: { price: "起价", bedrooms: "卧室", area: "面积", land: "土地", units: "总套数", pool: "泳池", handover: "交房", status: "状态", cta: "查看详情" }
  },

  comparisonData: {
    "serenity-villas":  { price: "$335K", area: "167–210 m²", land: "2–3 are",  pool: { en: "Private", ru: "Приватный", id: "Pribadi", zh: "私人" } },
    "serenity-estates": { price: "$310K", area: "155–250 m²", land: "3–14 are", pool: { en: "Private", ru: "Приватный", id: "Pribadi", zh: "私人" } },
    "serenity-village":  { price: "$119K", area: "51–86 m²",  land: "1–1.5 are", pool: { en: "Private + Shared", ru: "Приватный + Общий", id: "Pribadi + Bersama", zh: "私人 + 共享" } }
  },

  /* ──────────────────────── UNIT TABLE COLUMN HEADERS ─────────────────────── */
  unitTableHeaders: {
    en: { unit: "Unit", type: "Type", floors: "Floors", area: "Area", land: "Land", status: "Status", price: "Price" },
    ru: { unit: "Юнит", type: "Тип", floors: "Этажи", area: "Площадь", land: "Земля", status: "Статус", price: "Цена" },
    id: { unit: "Unit", type: "Tipe", floors: "Lantai", area: "Luas", land: "Lahan", status: "Status", price: "Harga" },
    zh: { unit: "单元", type: "类型", floors: "楼层", area: "面积", land: "土地", status: "状态", price: "价格" }
  },

  /* ──────────────────────── STATUS LABELS (for tables) ────────────────────── */
  statusLabels: {
    en: { available: "Available", sold: "Sold", booked: "Booked", resale: "Resale" },
    ru: { available: "Доступен", sold: "Продан", booked: "Забронирован", resale: "Перепродажа" },
    id: { available: "Tersedia", sold: "Terjual", booked: "Dipesan", resale: "Dijual Kembali" },
    zh: { available: "可购买", sold: "已售", booked: "已预订", resale: "转售" }
  },

  /* ──────────────────── AVAILABILITY BAR LABELS ──────────────────────────── */
  availabilityLabels: {
    en: { sold: "sold", of: "of", unitsSold: "units sold", unitsLeft: "units left", preSale: "Pre-Sale Open" },
    ru: { sold: "продано", of: "из", unitsSold: "продано", unitsLeft: "осталось", preSale: "Предпродажа открыта" },
    id: { sold: "terjual", of: "dari", unitsSold: "unit terjual", unitsLeft: "unit tersisa", preSale: "Pra-Penjualan Dibuka" },
    zh: { sold: "已售", of: "套中", unitsSold: "套已售", unitsLeft: "套可售", preSale: "预售开放" }
  },

  /* ──────────────────── VILLAGE UNIT TYPE HEADERS ─────────────────────────── */
  villageTableHeaders: {
    en: { type: "Type", floors: "Floors", area: "Area", land: "Land", units: "Units", price: "Price from" },
    ru: { type: "Тип", floors: "Этажи", area: "Площадь", land: "Земля", units: "Юниты", price: "Цена от" },
    id: { type: "Tipe", floors: "Lantai", area: "Luas", land: "Lahan", units: "Unit", price: "Harga mulai" },
    zh: { type: "类型", floors: "楼层", area: "面积", land: "土地", units: "套数", price: "起价" }
  }
};
