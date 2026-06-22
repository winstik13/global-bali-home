/**
 * Точечное обновление FAQ · site_content[faq] в Supabase + data/faq-data.js
 *
 * Заменяет ВЕСЬ набор FAQ на новый (из FAQ_for_Bali_Projects.docx).
 * НЕ трогает остальные data/*.js (site, projects, testimonials, gallery).
 *
 * Запуск:
 *   node --env-file=.env.local scripts/update-faq.mjs            # dry-run
 *   node --env-file=.env.local scripts/update-faq.mjs --apply    # применить
 *
 * После --apply: локальный data/faq-data.js перезаписывается тем же контентом,
 * что и в Supabase, чтобы Vercel-build (build-data.mjs) сгенерил идентичный файл.
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

const APPLY = process.argv.includes('--apply');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('❌ SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY обязательны (.env.local).');
  process.exit(1);
}

// ─── Новый FAQ ───
// HTML в ответах допустим: main.js рендерит answer как innerHTML.
// project: 'all' — все пункты общие (привязка в админке = «Все проекты»).
const WA = 'https://wa.me/6281325143849';
const FAQ_DATA = [
  {
    order: 1,
    project: 'all',
    question: {
      en: 'Why invest in real estate in Bali?',
      ru: 'Почему стоит инвестировать в недвижимость на Бали?',
    },
    answer: {
      en: `<ul>
<li>Rental yield: 10–18% per annum</li>
<li>Capital appreciation during construction: +20–40% from the launch price</li>
<li>Annual property value growth: +10–20%</li>
<li>Payback period: 5–8 years</li>
<li>Occupancy of modern hospitality properties: from 75%</li>
<li>Tourist season and great weather: 365 days a year</li>
<li>Growing Indonesian economy: ~5% annual GDP growth over the past 20 years</li>
</ul>
<p>The combination of these factors makes Bali one of the most attractive real estate markets in Southeast Asia, with strong potential for further growth.</p>`,
      ru: `<ul>
<li>Доходность от аренды: 10–18% годовых</li>
<li>Прирост стоимости за время строительства: +20–40% от стартовой цены</li>
<li>Ежегодный прирост стоимости: +10–20%</li>
<li>Окупаемость: 5–8 лет</li>
<li>Заполняемость современных туристических объектов: от 75%</li>
<li>Туристический сезон и отличная погода: 365 дней в году</li>
<li>Растущая экономика Индонезии: ~5% прироста ВВП в год последние 20 лет</li>
</ul>
<p>Сочетание этих факторов делает Бали одним из самых привлекательных рынков недвижимости в Юго-Восточной Азии с дальнейшим потенциалом роста.</p>`,
    },
  },
  {
    order: 2,
    project: 'all',
    question: {
      en: "Why is Ubud one of Bali's most attractive destinations?",
      ru: 'Почему Убуд — одно из самых привлекательных направлений на Бали?',
    },
    answer: {
      en: `<p>Ubud is the cultural capital of Bali and a renowned center for luxury hospitality, gastronomy (49 MICHELIN Guide-listed hotels and world-class restaurants such as Apéritif and Mozaic) and wellness tourism (300+ wellness centers and yoga retreats).</p>
<p>Its unique landscapes — UNESCO-recognized rice terraces, lush jungles and waterfalls — combined with its central location make Ubud highly appealing to international visitors.</p>
<p><strong>Investment highlights:</strong></p>
<ul>
<li><strong>Real estate market growth:</strong> +15–25% annual appreciation in land and villa prices over the last three years</li>
<li><strong>Tourism demand:</strong> 6.3 million international visitors to Bali in 2024</li>
<li><strong>Recognition:</strong> ranked among the Top 10 Best Cities in Asia by Travel + Leisure (2024); highlighted by Airbnb and AirDNA as one of the most promising destinations for hospitality investment</li>
<li><strong>High demand:</strong> exceptional occupancy, with ~50% of Bali visitors staying in Ubud for 2–3 nights</li>
<li><strong>Demand shift:</strong> investors and travelers are increasingly moving from overcrowded areas toward calmer destinations such as Ubud</li>
<li><strong>Infrastructure:</strong> new roads, international schools and coworking spaces support long-term asset appreciation</li>
</ul>
<p><a href="https://drive.google.com/file/d/1SzXkNjKVjDigUlyRePi-kqMu3NsZCBU9/view" target="_blank" rel="noopener noreferrer">Learn more →</a></p>`,
      ru: `<p>Убуд — культурная столица Бали и признанный центр роскошного отдыха, гастрономии (49 отелей из гида MICHELIN, рестораны уровня Apéritif и Mozaic) и оздоровительного туризма (300+ центров, йога-ретриты).</p>
<p>Уникальные ландшафты — рисовые террасы ЮНЕСКО, джунгли и водопады — в сочетании с центральной локацией делают регион привлекательным для туристов.</p>
<p><strong>Инвестиционная привлекательность:</strong></p>
<ul>
<li><strong>Рост рынка недвижимости:</strong> +15–25% в год на землю и виллы за последние 3 года</li>
<li><strong>Турпоток:</strong> 6,3 млн международных гостей на Бали в 2024 году</li>
<li><strong>Признание:</strong> в топ-10 лучших городов Азии по версии Travel + Leisure (2024); отмечен Airbnb и AirDNA как одно из самых перспективных направлений для гостиничного бизнеса</li>
<li><strong>Высокий спрос:</strong> максимальная заполняемость, ~50% туристов останавливаются в Убуде на 2–3 ночи</li>
<li><strong>Сдвиг спроса:</strong> инвесторы и гости переходят из перегруженных районов в более спокойные локации, такие как Убуд</li>
<li><strong>Инфраструктура:</strong> новые дороги, международные школы и рабочие пространства поддерживают долгосрочный рост стоимости активов</li>
</ul>
<p><a href="https://drive.google.com/file/d/1SzXkNjKVjDigUlyRePi-kqMu3NsZCBU9/view" target="_blank" rel="noopener noreferrer">Подробнее →</a></p>`,
    },
  },
  {
    order: 3,
    project: 'all',
    question: {
      en: 'Why is this location promising?',
      ru: 'Чем перспективна эта локация?',
    },
    answer: {
      en: `<p>All of our projects are located within Wanayu Village — a carefully master-planned community in Bedulu. This secluded destination features scenic waterfalls, walking trails, restaurants, yoga venues and lush natural surroundings, while still offering convenient access to essential infrastructure and being only about 10 minutes from central Ubud.</p>
<p>The location attracts thousands of visitors annually and generates strong rental demand throughout the area.</p>
<p><a href="https://drive.google.com/file/d/1BBsqHJQcGzORuVFRbdiGcNvQQIYdmiEg/view" target="_blank" rel="noopener noreferrer">Wanayu village map →</a></p>`,
      ru: `<p>Все наши проекты расположены в деревне Wanayu — тщательно спланированном пространстве в Бедулу. Это уединённое место с живописными водопадами, пешеходными тропами, ресторанами и площадками для йоги, при этом с доступом ко всей необходимой инфраструктуре и всего в ~10 минутах от центра Убуда.</p>
<p>Локация привлекает тысячи посетителей ежегодно и обеспечивает высокий спрос на аренду по всему району.</p>
<p><a href="https://drive.google.com/file/d/1pVUtmJuhX7vfEjFO4MFVwaLxUTS-ZiLW/view" target="_blank" rel="noopener noreferrer">Карта Wanayu →</a></p>`,
    },
  },
  {
    order: 4,
    project: 'all',
    question: {
      en: 'What infrastructure is included?',
      ru: 'Какая инфраструктура предусмотрена?',
    },
    answer: {
      en: `<ul>
<li>Restaurant</li>
<li>Shared swimming pool with pool bar</li>
<li>Parking area</li>
<li>Jungle-view relaxation zone</li>
<li>Natural waterfalls</li>
<li>Rice-field walking trail (2+ km)</li>
<li>Wellness &amp; SPA</li>
<li>Kids' playground</li>
<li>Art market</li>
<li>Local event space</li>
<li>Scooter rental</li>
</ul>
<p>Top international schools and kindergartens are located nearby, including British School of Bali, School of Leaders Bali, Wood School and others.</p>
<p><a href="https://drive.google.com/file/d/1eibpZXPlz0LYRpVMg3xo1ogRYST1AIj9/view" target="_blank" rel="noopener noreferrer">Learn more →</a></p>`,
      ru: `<ul>
<li>Ресторан</li>
<li>Общий бассейн с баром</li>
<li>Парковка</li>
<li>Зона отдыха с видом на джунгли</li>
<li>Водопады</li>
<li>Дорожка для прогулок среди рисовых полей (2+ км)</li>
<li>Зона велнес и СПА</li>
<li>Детская площадка</li>
<li>Арт-ярмарка</li>
<li>Локальная ивент-площадка</li>
<li>Аренда байков</li>
</ul>
<p>Рядом — лучшие международные школы и детские сады: British School of Bali, School of Leaders Bali, Wood School и другие.</p>
<p><a href="https://drive.google.com/file/d/1J_a24lYfpDSgO_gKXBoxOheF8QteQK0W/view" target="_blank" rel="noopener noreferrer">Подробнее →</a></p>`,
    },
  },
  {
    order: 5,
    project: 'all',
    question: {
      en: 'Can I visit a show unit or construction site?',
      ru: 'Можно ли посмотреть шоу-юнит или строительную площадку?',
    },
    answer: {
      en: `<p>We organize private property tours so you can personally evaluate the construction quality, finishes, layouts and overall atmosphere of the project.</p>
<ul>
<li>Message us on <a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a> to arrange a convenient date.</li>
<li>Or <a href="contacts.html">fill in the form</a> and our manager will get in touch.</li>
</ul>`,
      ru: `<p>Мы организуем персональные просмотры — вы сможете вживую оценить качество отделки, планировку и атмосферу проекта.</p>
<ul>
<li>Напишите нам в <a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a> — согласуем удобную дату.</li>
<li>Или <a href="contacts.html">заполните форму</a> — менеджер свяжется с вами.</li>
</ul>`,
    },
  },
  {
    order: 6,
    project: 'all',
    question: {
      en: 'Can I live in the villa myself?',
      ru: 'Можно ли проживать на виллах самостоятельно?',
    },
    answer: {
      en: `<p>Absolutely. You can use your villa for personal residence, rental income, or a combination of both. Usage schedules can be arranged individually with the property management company.</p>`,
      ru: `<p>Да, конечно. Виллу можно использовать как для личного проживания, так и для сдачи в аренду — гибкий график обсуждается индивидуально с управляющей компанией.</p>`,
    },
  },
  {
    order: 7,
    project: 'all',
    question: {
      en: 'Can foreigners own property in Bali?',
      ru: 'Может ли иностранец владеть недвижимостью на Бали?',
    },
    answer: {
      en: `<p>The most common ownership structure is leasehold (long-term lease). At Global Bali Home, leasehold is granted for 30 years, with a guaranteed option to extend for an additional 30 years. The lease agreement is officially registered with the local land office and protected under Indonesian law.</p>`,
      ru: `<p>Наиболее распространённая форма владения — долгосрочная аренда (Leasehold). В Global Bali Home она оформляется на 30 лет с гарантированным правом продления ещё на 30 лет. Договор аренды регистрируется в местном земельном управлении и защищается индонезийским законодательством.</p>`,
    },
  },
  {
    order: 8,
    project: 'all',
    question: {
      en: 'What type of ownership is offered?',
      ru: 'Какой тип владения предлагается?',
    },
    answer: {
      en: `<p><strong>Leasehold (long-term lease)</strong></p>
<ul>
<li><strong>Initial term:</strong> 25–30 years</li>
<li><strong>Extension:</strong> an additional 25–30 years under the conditions fixed in the original agreement</li>
</ul>
<p>All leasehold terms — duration, extension cost, lessee rights — are set out in a notarized agreement and protected under Indonesian law.</p>
<p>All Serenity Collection projects include a guaranteed 30-year extension, secured by a prepaid extension deposit.</p>`,
      ru: `<p><strong>Leasehold (долгосрочная аренда)</strong></p>
<ul>
<li><strong>Первоначальный срок:</strong> 25–30 лет</li>
<li><strong>Продление:</strong> ещё 25–30 лет на условиях, зафиксированных в первоначальном договоре</li>
</ul>
<p>Все условия Leasehold — срок, стоимость продления, права арендатора — прописаны в нотариально заверенном договоре и защищены индонезийским законодательством.</p>
<p>Проекты Serenity Collection имеют гарантированное продление ещё на 30 лет, обеспеченное предоплаченным депозитом.</p>`,
    },
  },
  {
    order: 9,
    project: 'all',
    question: {
      en: 'Are all required permits in place?',
      ru: 'Есть ли все необходимые разрешения?',
    },
    answer: {
      en: `<p>Global Bali Home operates strictly in compliance with Indonesian regulations — every project obtains all required permits.</p>
<ul>
<li><strong>Independent legal review:</strong> before launch, each project undergoes an independent audit by licensed Indonesian law firms.</li>
<li><strong>Phased approval:</strong> land, construction, operational and rental permits are obtained sequentially — no stage begins without official approval.</li>
</ul>`,
      ru: `<p>Global Bali Home действует строго в рамках законодательства Индонезии — каждый проект получает все необходимые разрешения.</p>
<ul>
<li><strong>Независимый аудит:</strong> перед запуском каждый проект проходит проверку лицензированными юридическими компаниями Индонезии.</li>
<li><strong>Поэтапное согласование:</strong> разрешения на землю, строительство, эксплуатацию и аренду оформляются последовательно — ни один этап не начинается без официального допуска.</li>
</ul>`,
    },
  },
  {
    order: 10,
    project: 'all',
    question: {
      en: 'What does the purchase process look like?',
      ru: 'Как выглядит процесс покупки?',
    },
    answer: {
      en: `<ol>
<li>Select your preferred project and villa — we provide layouts, pricing and a financial model.</li>
<li>Sign a booking agreement and pay a deposit to secure pricing and terms.</li>
<li>Conduct legal due diligence on the company and project — we openly provide all permits and supporting documents.</li>
<li>Upon successful due diligence, sign the main purchase agreement before a licensed notary.</li>
<li>Receive your completed villa, ready for personal use or rental.</li>
</ol>`,
      ru: `<ol>
<li>Выбор проекта и виллы — мы предоставим планировки, цены и финансовую модель.</li>
<li>Подписание договора бронирования и внесение депозита для фиксации условий.</li>
<li>Проверка юридической благонадёжности (due diligence) компании и проектов — мы открыто предоставляем все разрешения и документы.</li>
<li>После успешной проверки — подписание основного договора у лицензированного нотариуса.</li>
<li>Приёмка виллы, готовой к проживанию или сдаче в аренду.</li>
</ol>`,
    },
  },
  {
    order: 11,
    project: 'all',
    question: {
      en: 'Can I purchase a villa remotely?',
      ru: 'Можно ли приобрести виллу удалённо?',
    },
    answer: {
      en: `<p>Yes. All agreements can be executed remotely through international electronic document-signing platforms, while physical copies are notarized by a licensed Indonesian notary.</p>`,
      ru: `<p>Да. Договоры подписываются удалённо через международные платформы электронного документооборота, а физические копии заверяются лицензированным индонезийским нотариусом.</p>`,
    },
  },
  {
    order: 12,
    project: 'all',
    question: {
      en: 'Is an installment plan available?',
      ru: 'Есть ли рассрочка?',
    },
    answer: {
      en: `<p>Yes. Flexible installment plans are available, and customized payment schedules can be arranged upon request.</p>`,
      ru: `<p>Да. Доступна рассрочка с гибкими условиями; при необходимости график платежей согласуется индивидуально.</p>`,
    },
  },
  {
    order: 13,
    project: 'all',
    question: {
      en: 'How is construction quality controlled?',
      ru: 'Как контролируется качество строительства?',
    },
    answer: {
      en: `<p>Construction is managed by a team of experienced architects and engineers, working with some of Bali's most reputable contractors specializing in tropical-climate developments (<a href="https://www.instagram.com/tikajaya_company/" target="_blank" rel="noopener noreferrer">Tika Jaya</a>, <a href="https://jejaktrikaryaperkasa.com" target="_blank" rel="noopener noreferrer">Jejak Tri Karya Perkasa</a>). We use carefully selected, high-quality materials designed for long-term durability in Bali's climate.</p>
<p>Each project undergoes regular quality inspections, and investors receive ongoing photo and video progress reports throughout construction.</p>
<p>You are welcome to visit the construction site at any time — message us on <a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a> or <a href="contacts.html">fill in the form</a>.</p>
<p><a href="https://drive.google.com/file/d/1q3SCAPM-OhUENt_llEkUdIJSaygjB_cF/view" target="_blank" rel="noopener noreferrer">Technical specifications →</a></p>`,
      ru: `<p>Строительство ведёт команда архитекторов и инженеров с привлечением лучших подрядчиков Бали, имеющих опыт работы в тропическом климате (<a href="https://www.instagram.com/tikajaya_company/" target="_blank" rel="noopener noreferrer">Tika Jaya</a>, <a href="https://jejaktrikaryaperkasa.com" target="_blank" rel="noopener noreferrer">Jejak Tri Karya Perkasa</a>). Мы используем качественные материалы, подобранные для долговечности в климате Бали.</p>
<p>Каждый проект проходит регулярные проверки качества, а инвесторы получают фото- и видеоотчёты на протяжении всего строительства.</p>
<p>Посетить стройплощадку можно в любое время — напишите в <a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a> или <a href="contacts.html">заполните форму</a>.</p>
<p><a href="https://drive.google.com/file/d/1qMVuThVJeF3IcpwQpDxzhYi_eAsvYyx9/view" target="_blank" rel="noopener noreferrer">Технические характеристики →</a></p>`,
    },
  },
  {
    order: 14,
    project: 'all',
    question: {
      en: 'How is rental management handled, and do owners get reports?',
      ru: 'Как организовано управление арендой и получает ли владелец отчётность?',
    },
    answer: {
      en: `<p>Guest acquisition and property management are handled by <a href="https://balisuperhost.com" target="_blank" rel="noopener noreferrer">BaliSuperHost</a>, an experienced French-owned company with 10+ years in Bali, based in Ubud. It maintains an average occupancy of ~80% and runs everything without your involvement — you receive passive income with full transparency, no need to be in Bali.</p>
<p><strong>Awards &amp; recognition:</strong></p>
<ul>
<li>Named Best Villa Management Operator in Bali by Exquisite Media (2024)</li>
<li>Airbnb Superhost and Guest Favorite status consistently since 2021</li>
<li>Booking.com Traveller Review Awards in 2023 and 2024</li>
</ul>
<p><strong>Services:</strong></p>
<ul>
<li>Listings on Airbnb, Booking.com and direct channels</li>
<li>Guest check-in / check-out</li>
<li>Housekeeping and maintenance</li>
<li>Monthly financial reporting</li>
<li>Personal dashboard with real-time income and occupancy</li>
<li>Full-service accounting, tax and legal support</li>
<li>A dedicated team keeping your villa in excellent condition</li>
</ul>`,
      ru: `<p>Поиском гостей и управлением занимается <a href="https://balisuperhost.com" target="_blank" rel="noopener noreferrer">BaliSuperHost</a> — опытная французская компания с более чем 10-летним опытом на Бали, базируется в Убуде. Обеспечивает стабильную загрузку ~80% и управление без вашего участия: вы получаете пассивный доход с полной прозрачностью, без необходимости присутствовать на Бали.</p>
<p><strong>Награды и признание:</strong></p>
<ul>
<li>Лучший управляющий оператор вилл на Бали по версии Exquisite Media (2024)</li>
<li>Статус Superhost и «Любимый гостями объект» на Airbnb стабильно с 2021 года</li>
<li>Traveller Review Awards от Booking.com в 2023 и 2024 годах</li>
</ul>
<p><strong>Сервисы:</strong></p>
<ul>
<li>Размещение на Airbnb, Booking.com и через прямые каналы</li>
<li>Заезд/выезд гостей</li>
<li>Уборка и техническое обслуживание</li>
<li>Ежемесячная финансовая отчётность</li>
<li>Личный кабинет с онлайн-отчётностью по доходу и загрузке</li>
<li>Бухгалтерия, налоги и юридическая поддержка «под ключ»</li>
<li>Выделенная служба — ваша вилла всегда в идеальном состоянии</li>
</ul>`,
    },
  },
];

// ─── helpers ───
function buildFileContent(data, updatedAt) {
  const json = JSON.stringify(data, null, 2);
  return `/* eslint-disable */\n/* AUTO-GENERATED by scripts/build-data.mjs · DO NOT EDIT MANUALLY */\n/* Source: Supabase site_content[faq] · updated ${updatedAt} */\nconst FAQ_DATA = ${json};\n`;
}

async function main() {
  console.log(`🔄 update-faq ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}`);
  console.log(`   ${FAQ_DATA.length} FAQ-пунктов (order 1..${FAQ_DATA.length})`);

  if (!APPLY) {
    console.log('🚧 DRY-RUN — ничего не записано. Запусти с --apply.');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const updatedAt = new Date().toISOString();
  const { error } = await supabase
    .from('site_content')
    .upsert({ key: 'faq', data: FAQ_DATA, updated_at: updatedAt }, { onConflict: 'key' });

  if (error) {
    console.error('❌ UPSERT site_content[faq] failed:', error.message);
    process.exit(1);
  }
  console.log('✅ Supabase site_content[faq] обновлён.');

  const filePath = resolve(ROOT, 'data/faq-data.js');
  writeFileSync(filePath, buildFileContent(FAQ_DATA, updatedAt), 'utf8');
  console.log(`✅ data/faq-data.js перезаписан (${FAQ_DATA.length} items).`);
  console.log('\n🎉 Done.');
}

main().catch(err => {
  console.error('❌ update-faq failed:', err);
  process.exit(1);
});
