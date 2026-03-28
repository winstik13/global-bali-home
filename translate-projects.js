const fs = require('fs');

// Common translations for nav, footer, table
function applyCommon(c, lang) {
  const isZH = lang === 'zh';
  if (isZH) {
    c = c.replace(/lang="en"/g, 'lang="zh-CN"');
    c = c.replace(/<a href="index.html">Home<\/a>/g, '<a href="index.html">首页</a>');
    c = c.replace(/<a href="projects.html">Projects<\/a>/g, '<a href="projects.html">项目</a>');
    c = c.replace(/<a href="services.html">Services<\/a>/g, '<a href="services.html">服务</a>');
    c = c.replace(/<a href="about.html">About<\/a>/g, '<a href="about.html">关于我们</a>');
    c = c.replace(/<a href="gallery.html">Gallery<\/a>/g, '<a href="gallery.html">画廊</a>');
    c = c.replace(/<a href="contacts.html">Contact<\/a>/g, '<a href="contacts.html">联系我们</a>');
    c = c.replace(/aria-label="Menu"/g, 'aria-label="菜单"');
    c = c.replace(/>Get Started</g, '>开始咨询<');
    c = c.replace(/<a href="index.html">Home<\/a> <span>\/<\/span> <a href="projects.html">Projects<\/a>/g, '<a href="index.html">首页</a> <span>/</span> <a href="projects.html">项目</a>');
    c = c.replace(/hero-stats__label">Villas/g, 'hero-stats__label">别墅');
    c = c.replace(/hero-stats__label">Bedrooms/g, 'hero-stats__label">卧室');
    c = c.replace(/hero-stats__label">Handover/g, 'hero-stats__label">交房');
    c = c.replace(/hero-stats__label">From/g, 'hero-stats__label">起价');
    c = c.replace(/hero-stats__label">Units/g, 'hero-stats__label">套数');
    c = c.replace(/hero-stats__label">Completion/g, 'hero-stats__label">竣工');
    c = c.replace(/section-header__tag">Availability/g, 'section-header__tag">可售情况');
    c = c.replace(/<h2>Unit Selection<\/h2>/g, '<h2>单元选择</h2>');
    c = c.replace(/Explore available units and find the right fit for your investment or lifestyle\./g, '浏览可售单元，找到最适合您投资或生活的选择。');
    c = c.replace(/8 of 12 units sold/g, '12套中已售8套');
    c = c.replace(/16 of 24 units sold/g, '24套中已售16套');
    c = c.replace(/<th>Unit<\/th>/g, '<th>单元</th>');
    c = c.replace(/<th>Type<\/th>/g, '<th>类型</th>');
    c = c.replace(/<th>Status<\/th>/g, '<th>状态</th>');
    c = c.replace(/<th>Price<\/th>/g, '<th>价格</th>');
    c = c.replace(/>Booked</g, '>已预订<');
    c = c.replace(/>Not Available</g, '>不可售<');
    c = c.replace(/>Available</g, '>可售<');
    c = c.replace(/>Resale</g, '>转售<');
    c = c.replace(/2 Bedroom/g, '2卧室');
    c = c.replace(/3 Bedroom/g, '3卧室');
    c = c.replace(/4 Bedroom/g, '4卧室');
    c = c.replace(/1 Bedroom/g, '1卧室');
    c = c.replace(/section-header__tag">Gallery/g, 'section-header__tag">画廊');
    c = c.replace(/<h2>Project Images<\/h2>/g, '<h2>项目图集</h2>');
    c = c.replace(/>View More</g, '>查看更多<');
    c = c.replace(/>Contact Us</g, '>联系我们<');
    c = c.replace(/footer__heading">Navigation/g, 'footer__heading">导航');
    c = c.replace(/>About Us</g, '>关于我们<');
    c = c.replace(/footer__heading">Projects/g, 'footer__heading">项目');
    c = c.replace(/footer__heading">Contact/g, 'footer__heading">联系方式');
    c = c.replace(/Global Bali Home is an international real estate company focused on the development of high-quality properties in Bali\./g, 'Global Bali Home 是一家专注于巴厘岛高品质房产开发的国际房地产公司。');
    c = c.replace(/All rights reserved\./g, '版权所有。');
  } else {
    c = c.replace(/lang="en"/g, 'lang="id"');
    c = c.replace(/<a href="index.html">Home<\/a>/g, '<a href="index.html">Beranda</a>');
    c = c.replace(/<a href="projects.html">Projects<\/a>/g, '<a href="projects.html">Proyek</a>');
    c = c.replace(/<a href="services.html">Services<\/a>/g, '<a href="services.html">Layanan</a>');
    c = c.replace(/<a href="about.html">About<\/a>/g, '<a href="about.html">Tentang Kami</a>');
    c = c.replace(/<a href="gallery.html">Gallery<\/a>/g, '<a href="gallery.html">Galeri</a>');
    c = c.replace(/<a href="contacts.html">Contact<\/a>/g, '<a href="contacts.html">Kontak</a>');
    c = c.replace(/>Get Started</g, '>Mulai Sekarang<');
    c = c.replace(/<a href="index.html">Beranda<\/a> <span>\/<\/span> <a href="projects.html">Proyek<\/a>/g, '<a href="index.html">Beranda</a> <span>/</span> <a href="projects.html">Proyek</a>');
    c = c.replace(/<a href="index.html">Home<\/a> <span>\/<\/span> <a href="projects.html">Projects<\/a>/g, '<a href="index.html">Beranda</a> <span>/</span> <a href="projects.html">Proyek</a>');
    c = c.replace(/hero-stats__label">Villas/g, 'hero-stats__label">Vila');
    c = c.replace(/hero-stats__label">Bedrooms/g, 'hero-stats__label">Kamar Tidur');
    c = c.replace(/hero-stats__label">Handover/g, 'hero-stats__label">Serah Terima');
    c = c.replace(/hero-stats__label">From/g, 'hero-stats__label">Mulai Dari');
    c = c.replace(/hero-stats__label">Units/g, 'hero-stats__label">Unit');
    c = c.replace(/hero-stats__label">Completion/g, 'hero-stats__label">Penyelesaian');
    c = c.replace(/section-header__tag">Availability/g, 'section-header__tag">Ketersediaan');
    c = c.replace(/<h2>Unit Selection<\/h2>/g, '<h2>Pilihan Unit</h2>');
    c = c.replace(/Explore available units and find the right fit for your investment or lifestyle\./g, 'Jelajahi unit yang tersedia dan temukan yang paling sesuai untuk investasi atau gaya hidup Anda.');
    c = c.replace(/8 of 12 units sold/g, '8 dari 12 unit terjual');
    c = c.replace(/16 of 24 units sold/g, '16 dari 24 unit terjual');
    c = c.replace(/<th>Unit<\/th>/g, '<th>Unit</th>');
    c = c.replace(/<th>Type<\/th>/g, '<th>Tipe</th>');
    c = c.replace(/<th>Status<\/th>/g, '<th>Status</th>');
    c = c.replace(/<th>Price<\/th>/g, '<th>Harga</th>');
    c = c.replace(/>Booked</g, '>Dipesan<');
    c = c.replace(/>Not Available</g, '>Tidak Tersedia<');
    c = c.replace(/>Available</g, '>Tersedia<');
    c = c.replace(/>Resale</g, '>Jual Kembali<');
    c = c.replace(/2 Bedroom/g, '2 Kamar');
    c = c.replace(/3 Bedroom/g, '3 Kamar');
    c = c.replace(/4 Bedroom/g, '4 Kamar');
    c = c.replace(/1 Bedroom/g, '1 Kamar');
    c = c.replace(/section-header__tag">Gallery/g, 'section-header__tag">Galeri');
    c = c.replace(/<h2>Project Images<\/h2>/g, '<h2>Foto Proyek</h2>');
    c = c.replace(/>View More</g, '>Lihat Lebih<');
    c = c.replace(/>Contact Us</g, '>Hubungi Kami<');
    c = c.replace(/footer__heading">Navigation/g, 'footer__heading">Navigasi');
    c = c.replace(/>About Us</g, '>Tentang Kami<');
    c = c.replace(/footer__heading">Projects/g, 'footer__heading">Proyek');
    c = c.replace(/footer__heading">Contact/g, 'footer__heading">Kontak');
    c = c.replace(/Global Bali Home is an international real estate company focused on the development of high-quality properties in Bali\./g, 'Global Bali Home adalah perusahaan real estate internasional yang berfokus pada pengembangan properti berkualitas tinggi di Bali.');
    c = c.replace(/All rights reserved\./g, 'Hak cipta dilindungi.');
  }
  return c;
}

// ===== SERENITY VILLAS =====
['zh','id'].forEach(lang => {
  let c = fs.readFileSync('project-serenity-villas.html', 'utf8');
  // fix image paths (already done for zh/id copies but source is EN root)
  c = c.replace(/src="images\//g, 'src="../images/');
  c = c.replace(/url\('images\//g, "url('../images/");
  c = c.replace(/src="js\//g, 'src="../js/');
  c = c.replace(/href="css\//g, 'href="../css/');
  c = c.replace(/href="favicon/g, 'href="../favicon');
  c = applyCommon(c, lang);

  // lang switcher
  const oldSwitcher = '<div class="header__lang"><button class="header__lang-toggle">EN <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><span class="active">English</span><a href="ru/project-serenity-villas.html">Русский</a><a href="id/project-serenity-villas.html">Bahasa Indonesia</a><a href="zh/project-serenity-villas.html">简体中文</a></div></div>';
  if (lang === 'zh') {
    c = c.replace(oldSwitcher, '<div class="header__lang"><button class="header__lang-toggle">中文 <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><a href="../project-serenity-villas.html">English</a><a href="../ru/project-serenity-villas.html">Русский</a><a href="../id/project-serenity-villas.html">Bahasa Indonesia</a><span class="active">简体中文</span></div></div>');
    c = c.replace('Unwinding in tropical surroundings', '在热带自然中放松身心');
    c = c.replace('section-header__tag">The Concept', 'section-header__tag">设计理念');
    c = c.replace('<h2>Living in Harmony with Nature</h2>', '<h2>与自然和谐共生</h2>');
    c = c.replace("Serenity Villas is designed to blend modern comfort with the raw beauty of Bali's tropical landscape. Each villa is thoughtfully positioned to maximize views of the surrounding jungle canopy and natural waterfalls.", 'Serenity Villas 的设计旨在将现代舒适与巴厘岛热带自然之美融为一体。每栋别墅经过精心布局，最大化展现周围丛林林冠与天然瀑布的壮丽景观。');
    c = c.replace("The project embraces sustainable architecture, using natural materials and open-plan designs that invite the outdoors in. Residents enjoy the tranquility of the jungle while being just minutes from Ubud's vibrant cultural center.", '项目采用可持续建筑理念，运用天然材料和开放式设计将室外自然引入室内。居民在享受丛林静谧的同时，仅需数分钟即可抵达乌布充满活力的文化中心。');
    c = c.replace('<strong>Handover:</strong> Q2 2026', '<strong>交房：</strong>2026年第二季度');
    c = c.replace('section-header__tag">Amenities', 'section-header__tag">配套设施');
    c = c.replace('<h2>Villa Features</h2>', '<h2>别墅特色</h2>');
    c = c.replace('>Private Bathrooms<', '>独立卫浴<');
    c = c.replace('>Fully Equipped Kitchen<', '>全配厨房<');
    c = c.replace('>Smart Home Technology<', '>智能家居系统<');
    c = c.replace('>Tropical Views<', '>热带美景<');
    c = c.replace('>Natural Waterfalls<', '>天然瀑布<');
    c = c.replace('>Garden Promenade<', '>花园步道<');
    c = c.replace('<h2>Interested in Serenity Villas?</h2>', '<h2>对 Serenity Villas 感兴趣？</h2>');
    c = c.replace('Get in touch with our team to learn more about available units, pricing, and investment opportunities.', '联系我们的团队，了解更多关于可售单元、价格及投资机会的详情。');
    fs.writeFileSync('zh/project-serenity-villas.html', c, 'utf8');
  } else {
    c = c.replace(oldSwitcher, '<div class="header__lang"><button class="header__lang-toggle">ID <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><a href="../project-serenity-villas.html">English</a><a href="../ru/project-serenity-villas.html">Русский</a><span class="active">Bahasa Indonesia</span><a href="../zh/project-serenity-villas.html">简体中文</a></div></div>');
    c = c.replace('Unwinding in tropical surroundings', 'Relaksasi di alam tropis');
    c = c.replace('section-header__tag">The Concept', 'section-header__tag">Konsep');
    c = c.replace('<h2>Living in Harmony with Nature</h2>', '<h2>Hidup Selaras dengan Alam</h2>');
    c = c.replace("Serenity Villas is designed to blend modern comfort with the raw beauty of Bali's tropical landscape. Each villa is thoughtfully positioned to maximize views of the surrounding jungle canopy and natural waterfalls.", 'Serenity Villas dirancang untuk memadukan kenyamanan modern dengan keindahan alam tropis Bali. Setiap villa diposisikan secara cermat untuk memaksimalkan pemandangan kanopi hutan dan air terjun alami.');
    c = c.replace("The project embraces sustainable architecture, using natural materials and open-plan designs that invite the outdoors in. Residents enjoy the tranquility of the jungle while being just minutes from Ubud's vibrant cultural center.", 'Proyek ini menganut arsitektur berkelanjutan, menggunakan material alami dan desain terbuka yang menghadirkan alam ke dalam ruangan. Penghuni menikmati ketenangan hutan sambil berada hanya beberapa menit dari pusat budaya Ubud.');
    c = c.replace('<strong>Handover:</strong> Q2 2026', '<strong>Serah Terima:</strong> Q2 2026');
    c = c.replace('section-header__tag">Amenities', 'section-header__tag">Fasilitas');
    c = c.replace('<h2>Villa Features</h2>', '<h2>Fitur Villa</h2>');
    c = c.replace('>Private Bathrooms<', '>Kamar Mandi Pribadi<');
    c = c.replace('>Fully Equipped Kitchen<', '>Dapur Lengkap<');
    c = c.replace('>Smart Home Technology<', '>Teknologi Rumah Pintar<');
    c = c.replace('>Tropical Views<', '>Pemandangan Tropis<');
    c = c.replace('>Natural Waterfalls<', '>Air Terjun Alami<');
    c = c.replace('>Garden Promenade<', '>Taman Promenade<');
    c = c.replace('<h2>Interested in Serenity Villas?</h2>', '<h2>Tertarik dengan Serenity Villas?</h2>');
    c = c.replace('Get in touch with our team to learn more about available units, pricing, and investment opportunities.', 'Hubungi tim kami untuk mengetahui lebih lanjut tentang unit tersedia, harga, dan peluang investasi.');
    fs.writeFileSync('id/project-serenity-villas.html', c, 'utf8');
  }
});
console.log('Serenity Villas: zh + id done');

// ===== SERENITY ESTATES =====
['zh','id'].forEach(lang => {
  let c = fs.readFileSync('project-serenity-estates.html', 'utf8');
  c = c.replace(/src="images\//g, 'src="../images/');
  c = c.replace(/url\('images\//g, "url('../images/");
  c = c.replace(/src="js\//g, 'src="../js/');
  c = c.replace(/href="css\//g, 'href="../css/');
  c = c.replace(/href="favicon/g, 'href="../favicon');
  c = applyCommon(c, lang);

  const oldSwitcher = '<div class="header__lang"><button class="header__lang-toggle">EN <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><span class="active">English</span><a href="ru/project-serenity-estates.html">Русский</a><a href="id/project-serenity-estates.html">Bahasa Indonesia</a><a href="zh/project-serenity-estates.html">简体中文</a></div></div>';
  if (lang === 'zh') {
    c = c.replace(oldSwitcher, '<div class="header__lang"><button class="header__lang-toggle">中文 <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><a href="../project-serenity-estates.html">English</a><a href="../ru/project-serenity-estates.html">Русский</a><a href="../id/project-serenity-estates.html">Bahasa Indonesia</a><span class="active">简体中文</span></div></div>');
    c = c.replace('Refined luxury for discerning investors', '为卓越投资者打造的精致豪华');
    c = c.replace('section-header__tag">The Concept', 'section-header__tag">设计理念');
    c = c.replace('<h2>Elevated Living Standards</h2>', '<h2>卓越生活标准</h2>');
    c = c.replace('<strong>Handover:</strong> Q4 2026', '<strong>交房：</strong>2026年第四季度');
    c = c.replace('section-header__tag">Amenities', 'section-header__tag">配套设施');
    c = c.replace('<h2>Estate Features</h2>', '<h2>庄园特色</h2>');
    c = c.replace('>Private Pool<', '>私人泳池<');
    c = c.replace('>Concierge Service<', '>礼宾服务<');
    c = c.replace('>Smart Home Technology<', '>智能家居系统<');
    c = c.replace('>Panoramic Views<', '>全景视野<');
    c = c.replace('>Private Garden<', '>私人花园<');
    c = c.replace('>Gourmet Kitchen<', '>美食厨房<');
    c = c.replace('<h2>Interested in Serenity Estates?</h2>', '<h2>对 Serenity Estates 感兴趣？</h2>');
    c = c.replace('Get in touch with our team to learn more about available units, pricing, and investment opportunities.', '联系我们的团队，了解更多关于可售单元、价格及投资机会的详情。');
    fs.writeFileSync('zh/project-serenity-estates.html', c, 'utf8');
  } else {
    c = c.replace(oldSwitcher, '<div class="header__lang"><button class="header__lang-toggle">ID <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><a href="../project-serenity-estates.html">English</a><a href="../ru/project-serenity-estates.html">Русский</a><span class="active">Bahasa Indonesia</span><a href="../zh/project-serenity-estates.html">简体中文</a></div></div>');
    c = c.replace('Refined luxury for discerning investors', 'Kemewahan refined untuk investor yang jeli');
    c = c.replace('section-header__tag">The Concept', 'section-header__tag">Konsep');
    c = c.replace('<h2>Elevated Living Standards</h2>', '<h2>Standar Hunian yang Tinggi</h2>');
    c = c.replace('<strong>Handover:</strong> Q4 2026', '<strong>Serah Terima:</strong> Q4 2026');
    c = c.replace('section-header__tag">Amenities', 'section-header__tag">Fasilitas');
    c = c.replace('<h2>Estate Features</h2>', '<h2>Fitur Estate</h2>');
    c = c.replace('>Private Pool<', '>Kolam Renang Pribadi<');
    c = c.replace('>Concierge Service<', '>Layanan Concierge<');
    c = c.replace('>Smart Home Technology<', '>Teknologi Rumah Pintar<');
    c = c.replace('>Panoramic Views<', '>Pemandangan Panoramik<');
    c = c.replace('>Private Garden<', '>Taman Pribadi<');
    c = c.replace('>Gourmet Kitchen<', '>Dapur Gourmet<');
    c = c.replace('<h2>Interested in Serenity Estates?</h2>', '<h2>Tertarik dengan Serenity Estates?</h2>');
    c = c.replace('Get in touch with our team to learn more about available units, pricing, and investment opportunities.', 'Hubungi tim kami untuk mengetahui lebih lanjut tentang unit tersedia, harga, dan peluang investasi.');
    fs.writeFileSync('id/project-serenity-estates.html', c, 'utf8');
  }
});
console.log('Serenity Estates: zh + id done');

// ===== SERENITY VILLAGE =====
['zh','id'].forEach(lang => {
  let c = fs.readFileSync('project-serenity-village.html', 'utf8');
  c = c.replace(/src="images\//g, 'src="../images/');
  c = c.replace(/url\('images\//g, "url('../images/");
  c = c.replace(/src="js\//g, 'src="../js/');
  c = c.replace(/href="css\//g, 'href="../css/');
  c = c.replace(/href="favicon/g, 'href="../favicon');
  c = applyCommon(c, lang);

  const oldSwitcher = '<div class="header__lang"><button class="header__lang-toggle">EN <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><span class="active">English</span><a href="ru/project-serenity-village.html">Русский</a><a href="id/project-serenity-village.html">Bahasa Indonesia</a><a href="zh/project-serenity-village.html">简体中文</a></div></div>';
  if (lang === 'zh') {
    c = c.replace(oldSwitcher, '<div class="header__lang"><button class="header__lang-toggle">中文 <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><a href="../project-serenity-village.html">English</a><a href="../ru/project-serenity-village.html">Русский</a><a href="../id/project-serenity-village.html">Bahasa Indonesia</a><span class="active">简体中文</span></div></div>');
    c = c.replace('A complex rooted in Bali', '植根于巴厘岛的综合体');
    c = c.replace('section-header__tag">The Concept', 'section-header__tag">设计理念');
    c = c.replace('<h2>A Village Within a Village</h2>', '<h2>村中之村</h2>');
    c = c.replace('section-header__tag">Pre-Sale', 'section-header__tag">预售');
    c = c.replace('<h2>Pre-Sale Now Open</h2>', '<h2>预售现已开启</h2>');
    c = c.replace('section-header__tag">Amenities', 'section-header__tag">配套设施');
    c = c.replace('<h2>Village Features</h2>', '<h2>村落特色</h2>');
    c = c.replace('>Complex Pool<', '>综合体泳池<');
    c = c.replace('>Yoga Pavilion<', '>瑜伽亭<');
    c = c.replace('>Organic Garden<', '>有机花园<');
    c = c.replace('>Co-working Space<', '>联合办公空间<');
    c = c.replace('>Kids Club<', '>儿童俱乐部<');
    c = c.replace('>Restaurant & Bar<', '>餐厅与酒吧<');
    c = c.replace('<h2>Interested in Serenity Village?</h2>', '<h2>对 Serenity Village 感兴趣？</h2>');
    c = c.replace('Get in touch with our team to learn more about available units, pricing, and investment opportunities.', '联系我们的团队，了解更多关于可售单元、价格及投资机会的详情。');
    c = c.replace(/>Register Interest</g, '>登记兴趣<');
    c = c.replace(/>Pre-Sale Registration</g, '>预售登记<');
    fs.writeFileSync('zh/project-serenity-village.html', c, 'utf8');
  } else {
    c = c.replace(oldSwitcher, '<div class="header__lang"><button class="header__lang-toggle">ID <svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4"/></svg></button><div class="header__lang-dropdown"><a href="../project-serenity-village.html">English</a><a href="../ru/project-serenity-village.html">Русский</a><span class="active">Bahasa Indonesia</span><a href="../zh/project-serenity-village.html">简体中文</a></div></div>');
    c = c.replace('A complex rooted in Bali', 'Kompleks yang berakar di Bali');
    c = c.replace('section-header__tag">The Concept', 'section-header__tag">Konsep');
    c = c.replace('<h2>A Village Within a Village</h2>', '<h2>Desa di Dalam Desa</h2>');
    c = c.replace('section-header__tag">Pre-Sale', 'section-header__tag">Pra-Penjualan');
    c = c.replace('<h2>Pre-Sale Now Open</h2>', '<h2>Pra-Penjualan Kini Dibuka</h2>');
    c = c.replace('section-header__tag">Amenities', 'section-header__tag">Fasilitas');
    c = c.replace('<h2>Village Features</h2>', '<h2>Fitur Desa</h2>');
    c = c.replace('>Complex Pool<', '>Kolam Renang Kompleks<');
    c = c.replace('>Yoga Pavilion<', '>Paviliun Yoga<');
    c = c.replace('>Organic Garden<', '>Taman Organik<');
    c = c.replace('>Co-working Space<', '>Ruang Co-working<');
    c = c.replace('>Kids Club<', '>Klub Anak<');
    c = c.replace('>Restaurant & Bar<', '>Restoran & Bar<');
    c = c.replace('<h2>Interested in Serenity Village?</h2>', '<h2>Tertarik dengan Serenity Village?</h2>');
    c = c.replace('Get in touch with our team to learn more about available units, pricing, and investment opportunities.', 'Hubungi tim kami untuk mengetahui lebih lanjut tentang unit tersedia, harga, dan peluang investasi.');
    c = c.replace(/>Register Interest</g, '>Daftar Minat<');
    c = c.replace(/>Pre-Sale Registration</g, '>Pendaftaran Pra-Penjualan<');
    fs.writeFileSync('id/project-serenity-village.html', c, 'utf8');
  }
});
console.log('Serenity Village: zh + id done');
