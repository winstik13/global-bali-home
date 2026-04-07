/* ============================================
   ADMIN PANEL — Global Bali Home
   Firebase Auth + GitHub API
   ============================================ */

(function () {
  'use strict';

  // ─── i18n ───
  let adminLang = localStorage.getItem('admin_lang') || 'en';

  const ADMIN_I18N = {
    en: {
      'login.title': 'Admin Panel',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.submit': 'Sign In',
      'login.signingIn': 'Signing in...',
      'pat.title': 'GBH Access',
      'pat.desc': 'Enter your access token to enable publishing.',
      'pat.why': 'This token allows the admin panel to publish your changes to the live website.',
      'pat.step1': 'Open <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noopener noreferrer">GitHub Token Settings</a>',
      'pat.step2': 'Click <strong>Generate new token</strong>, select repo <strong>global-bali-home</strong>',
      'pat.step3': 'Under Permissions → Contents → set <strong>Read and write</strong>',
      'pat.step4': 'Copy the token and paste it below',
      'pat.label': 'Personal Access Token',
      'pat.remember': 'Remember on this device',
      'pat.submit': 'Connect',
      'pat.error': 'Invalid token. Ensure it has "contents:write" scope for this repo.',
      'header.title': 'Admin Panel',
      'header.rateLabel': 'USD / IDR',
      'header.signOut': 'Sign Out',
      'deploy.deploying': 'Deploying...',
      'deploy.live': 'Live!',
      'deploy.failed': 'Deploy failed',
      'nav.dashboard': 'Dashboard',
      'nav.projects': 'Projects',
      'nav.seo': 'SEO',
      'nav.gallery': 'Gallery',
      'nav.faq': 'FAQ',
      'nav.testimonials': 'Testimonials',
      'nav.analytics': 'Analytics',
      'nav.settings': 'Settings',
      'dash.title': 'Dashboard',
      'dash.loading': 'Loading data...',
      'dash.totalUnits': 'Total Units',
      'dash.soldBooked': 'Sold / Booked',
      'dash.available': 'Available',
      'dash.progress': 'Progress',
      'dash.potential': 'Potential',
      'dash.price': 'Price',
      'dash.preSale': 'Pre-Sale',
      'dash.inProgress': 'In Progress',
      'dash.status_pre-sale': 'Pre-Sale',
      'dash.status_in-progress': 'In Progress',
      'dash.status_completed': 'Completed',
      'dash.status_sold-out': 'Sold Out',
      'dash.sold': 'Sold',
      'dash.left': 'Left',
      'dash.priceRange': 'Price Range',
      'dash.editProject': 'Edit Project',
      'dash.viewOnSite': 'View on Site',
      'dash.recentChanges': 'Recent Changes',
      'dash.noChanges': 'No recent changes to project data.',
      'dash.couldNotLoad': 'Could not load commit history.',
      'dash.breakAvailable': 'available',
      'dash.breakBooked': 'booked',
      'dash.breakSold': 'sold',
      'dash.breakResale': 'resale',
      'rate.title': 'Exchange Rate (USD → IDR)',
      'rate.navTitle': 'Rate',
      'rate.auto': 'Auto (live rate from API)',
      'rate.save': 'Save Rate',
      'rate.currentRate': 'Current rate:',
      'rate.updated': 'Updated:',
      'rate.manual': '(manual)',
      'rate.autoMode': '(auto)',
      'rate.defaultMsg': 'Default rate. Update to show accurate IDR prices on the site.',
      'rate.invalidRate': 'Enter a valid rate (e.g. 16500)',
      'help.rate.manual': '<strong>Manual:</strong> Enter the rate manually and click Save.',
      'help.rate.auto': '<strong>Auto:</strong> Rate updates from API every hour. Manual input is disabled.',
      'help.rate.fallback': '<strong>Fallback:</strong> If API is unavailable, the last saved rate is used on the site.',
      'contacts.title': 'Contact Information',
      'contacts.phone': 'Phone',
      'contacts.whatsapp': 'WhatsApp Number',
      'contacts.email': 'Email',
      'contacts.locationEn': 'Location (EN)',
      'contacts.locationRu': 'Location (RU)',
      'contacts.locationId': 'Location (ID)',
      'contacts.save': 'Save Contacts',
      'contacts.hint.phone': 'Display format, e.g. +62 813 251 438 49',
      'contacts.hint.whatsapp': 'Digits only, with country code, no +',
      'help.contacts.phone': '<strong>Phone:</strong> Any format with spaces/dashes, start with +country code.',
      'help.contacts.whatsapp': '<strong>WhatsApp:</strong> DIGITS ONLY, no +, spaces or dashes. Example: 6281338741177',
      'help.contacts.email': '<strong>Email:</strong> Standard email format.',
      'help.contacts.location': '<strong>Location:</strong> Display text, translate manually for each language.',
      'guide.title': 'Investment Guide PDF',
      'guide.navTitle': 'Guide',
      'guide.upload': 'Upload PDF',
      'guide.currentFile': 'Current file:',
      'guide.version': 'Version:',
      'guide.updated': 'Updated:',
      'guide.noFile': 'No PDF uploaded yet. Upload a file to enable the Investment Guide download.',
      'guide.selectPdf': 'Please select a PDF file',
      'guide.uploading': 'Uploading PDF...',
      'help.guide.format': '<strong>Format:</strong> PDF only.',
      'help.guide.afterUpload': '<strong>After upload:</strong> File is committed to the repository and available to site visitors.',
      'help.guide.deployTime': '<strong>Deploy time:</strong> ~1-2 minutes after upload.',
      'projects.title': 'Project Editor',
      'projects.publish': 'Publish Changes',
      'projects.generatePages': 'Generate Detail Pages',
      'projects.updateSeoOnly': 'Update SEO Only',
      'projects.overwriteWarn': '⚠️ DANGER: Pages for "{name}" already exist.\n\nClicking OK will OVERWRITE the entire HTML files (EN + RU + ID) with the auto-generated template.\n\nYOU WILL LOSE:\n• Curated gallery images and any custom photo selections\n• Any manual content edits made directly to the HTML\n• Any custom sections added outside the template\n\nThe template DOES include: Hero, Concept, Units table, Gallery, ROI Calculator, Tour CTA, Final CTA.\n\nIf you only need to update SEO meta tags — CANCEL and use "Update SEO Only" instead.\n\nAre you absolutely sure you want to overwrite?',
      'projects.overwriteAll': 'Overwrite All',
      'projects.cancel': 'Cancel',
      'projects.unsaved': 'Unsaved changes',
      'projects.publishing': 'Publishing...',
      'projects.published': 'Published! Site updating (~1-2 min)',
      'projects.projectStatus': 'Project Status',
      'projects.statusLabel': 'Status',
      'projects.soldOutAuto': 'Auto: all units sold',
      'projects.floorPlans': 'Floor Plans',
      'projects.noPlan': 'No plan',
      'projects.uploadPlan': 'Upload',
      'projects.deletePlan': 'Delete plan',
      'projects.confirmDeletePlan': 'Delete floor plan for {type}?',
      'projects.uploading': 'Uploading...',
      'projects.units': 'Units',
      'projects.unitTypes': 'Unit Types',
      'projects.availability': 'Availability',
      'projects.heroStats': 'Hero Stats',
      'projects.showcaseCard': 'Showcase Card',
      'projects.addUnit': '+ Add Unit',
      'projects.addType': '+ Add Type',
      'projects.deleteUnit': 'Delete',
      'projects.deleteType': 'Delete',
      'projects.confirmDeleteUnit': 'Delete unit {id}?',
      'projects.confirmDeleteType': 'Delete type "{type}"?',
      'gallery.confirmDelete': 'Delete "{name}"?',
      'gallery.deleteError': 'Error deleting: ',
      'faq.confirmDelete': 'Delete this FAQ item?',
      'test.confirmDelete': 'Delete this testimonial?',
      'projects.unit': 'Unit',
      'projects.type': 'Type',
      'projects.floors': 'Floors',
      'projects.area': 'Area',
      'projects.land': 'Land',
      'projects.badge': 'Badge',
      'projects.status': 'Status',
      'projects.price': 'Price ($)',
      'projects.sold': 'Sold',
      'projects.total': 'Total',
      'projects.availAutoHint': 'Auto-calculated from unit statuses above',
      'projects.number': 'Number',
      'projects.label': 'Label',
      'projects.priceLabel': 'Price',
      'projects.description': 'Description',
      'projects.positioning': 'Positioning Tagline',
      'projects.positioningPh': 'e.g. Boutique Yield Play',
      'projects.projectDetails': 'Project Details',
      'projects.startingPrice': 'Starting Price (USD)',
      'projects.bedrooms': 'Bedrooms',
      'projects.compArea': 'Area Range',
      'projects.compLand': 'Land Range',
      'projects.totalUnits': 'Total Units',
      'projects.compPool': 'Pool',
      'projects.handover': 'Handover',
      'projects.newProject': '+ New Project',
      'seo.title': 'SEO Editor',
      'seo.page': 'Page',
      'seo.selectPage': '— Select page —',
      'seo.home': 'Home',
      'seo.about': 'About',
      'seo.projects': 'Projects',
      'seo.services': 'Services',
      'seo.gallery': 'Gallery',
      'seo.contacts': 'Contacts',
      'seo.googlePreview': 'Google Search Preview',
      'seo.socialPreview': 'Social Share Preview',
      'seo.noOgImage': 'No OG Image',
      'seo.pageTitle': 'Page Title',
      'seo.metaDesc': 'Meta Description',
      'seo.ogTitle': 'OG Title',
      'seo.ogDesc': 'OG Description',
      'seo.ogImage': 'OG Image URL',
      'seo.canonical': 'Canonical URL',
      'seo.viewOnSite': 'View on Site ↗',
      'seo.saveAll': 'Save All Languages',
      'seo.savingAll': 'Saving all languages...',
      'seo.loadingLangs': 'Loading all languages...',
      'gallery.title': 'Gallery Manager',
      'gallery.project': 'Project',
      'gallery.selectProject': '— Select project —',
      'gallery.upload': 'Upload Photos',
      'gallery.photos': 'photos',
      'gallery.noImages': 'No images in this project. Drag & drop or click Upload to add photos.',
      'gallery.dragDrop': 'Drag & drop images here or use Upload button',
      'gallery.formats': 'JPG, PNG, WebP — max 10 MB per file',
      'gallery.uploading': 'Uploading',
      'gallery.savingData': 'Saving gallery data...',
      'gallery.uploaded': 'photos uploaded!',
      'gallery.moveLeft': 'Move left',
      'gallery.moveRight': 'Move right',
      'gallery.delete': 'Delete',
      'gallery.previewTitle': 'Ready to upload',
      'gallery.uploadAll': 'Upload All',
      'gallery.cancelUpload': 'Cancel',
      'gallery.duplicate': 'Already exists',
      'gallery.filesSelected': 'files selected',
      'faq.title': 'FAQ Editor',
      'faq.addQuestion': '+ Add Question',
      'faq.publish': 'Publish FAQ',
      'faq.publishing': 'Publishing FAQ...',
      'faq.published': 'Published! Site updating (~1-2 min)',
      'faq.noItems': 'No FAQ items yet. Click "+ Add Question" to create one.',
      'faq.question': 'Question',
      'faq.answer': 'Answer',
      'test.title': 'Testimonials Editor',
      'test.add': '+ Add Testimonial',
      'test.publish': 'Publish Testimonials',
      'test.publishing': 'Publishing testimonials...',
      'test.published': 'Published! Site updating (~1-2 min)',
      'test.noItems': 'No testimonials yet. Click "+ Add Testimonial" to create one.',
      'test.name': 'Name',
      'test.role': 'Role',
      'test.avatar': 'Photo',
      'test.text': 'Text',
      'test.stars': 'Stars',
      'test.sourceUrl': 'Review Link',
      'test.sourceName': 'Source',
      'test.sourceHint': 'e.g. Google Reviews, Trustpilot',
      'test.copyFromEn': 'Copy from EN',
      'faq.copyFromEn': 'Copy from EN',
      'colors.title': 'Site Colors',
      'colors.navTitle': 'Colors',
      'colors.mainBg': 'Main Background',
      'colors.altBg': 'Alternate Background',
      'colors.cardPanel': 'Card / Panel',
      'colors.primaryText': 'Primary Text',
      'colors.cream': 'Cream (Buttons)',
      'colors.brandAccent': 'Brand Accent',
      'colors.muted': 'Muted 75%',
      'colors.dim': 'Dim 50%',
      'colors.border': 'Border 10%',
      'colors.save': 'Save Colors',
      'colors.reset': 'Reset to Defaults',
      'colors.resetDone': 'Reset to defaults (not saved yet)',
      'colors.invalidHex': 'Invalid hex for ',
      'help.colors.text': '<strong>Text color</strong> determines derived colors (muted text, borders).',
      'help.colors.live': '<strong>Live preview:</strong> Changes apply instantly in admin panel.',
      'help.colors.site': '<strong>On site:</strong> Colors apply after Save + ~1-2 min deploy.',
      'help.colors.reset': 'Use <strong>Reset to Defaults</strong> to restore original palette.',
      'help.exitpopup.what': '<strong>What it does:</strong> Shows a popup when a desktop visitor moves the cursor toward closing the tab. Offers a free investment guide in exchange for an email — a lead capture tool.',
      'help.exitpopup.enabled': '<strong>Enabled:</strong> Turn the popup on or off across the entire site.',
      'help.exitpopup.delay': '<strong>Trigger Delay:</strong> Minimum seconds a visitor must spend on the page before the popup can appear. Prevents annoying new visitors (recommended: 15–30 sec).',
      'help.exitpopup.content': '<strong>Content:</strong> All texts are fully customizable per language. Badge, title, description, button label, and success message. After submission, "Read Online" and "Download PDF" buttons appear automatically.',
      'nav.exitpopup': 'Popups',
      'popups.title': 'Popups',
      'exitpopup.title': 'Exit Intent Popup',
      'exitpopup.settings': 'Settings',
      'exitpopup.content': 'Content',
      'exitpopup.preview': 'Preview',
      'exitpopup.afterSubmit': 'After Submit',
      'exitpopup.enabled': 'Enabled',
      'exitpopup.delay': 'Trigger Delay (sec)',
      'exitpopup.field.tag': 'Badge Text',
      'exitpopup.field.title': 'Popup Title',
      'exitpopup.field.text': 'Description',
      'exitpopup.field.placeholder': 'Email Placeholder',
      'exitpopup.field.submit': 'Submit Button',
      'exitpopup.field.success': 'Success Message',
      'exitpopup.save': 'Save Exit Popup',
      'tour.title': 'Tour Popup',
      'tour.steps': 'Steps',
      'tour.step': 'Step',
      'tour.question': 'Question',
      'tour.option': 'Option',
      'tour.form': 'Contact Form',
      'tour.formTitle': 'Form Title',
      'tour.formSubtitle': 'Form Subtitle',
      'tour.name': 'Name Placeholder',
      'tour.whatsapp': 'WhatsApp Placeholder',
      'tour.email': 'Email Placeholder',
      'tour.time': 'Time Label',
      'tour.timeOption': 'Time Option',
      'tour.comment': 'Comment Placeholder',
      'tour.consent': 'Consent Text',
      'tour.submit': 'Submit Button',
      'tour.thankYou': 'Thank You Screen',
      'tour.thankTitle': 'Title',
      'tour.thankText': 'Text',
      'tour.thankWa': 'WhatsApp Button',
      'tour.thankProject': 'Project Link Text',
      'tour.save': 'Save Tour Popup',
      'social.title': 'Social Media',
      'social.facebook': 'Facebook URL',
      'social.instagram': 'Instagram URL',
      'social.save': 'Save Social',
      'stats.title': 'Company Statistics',
      'stats.navTitle': 'Stats',
      'stats.investorsWorldwide': 'Investors Worldwide',
      'stats.villasDesigned': 'Villas in Portfolio',
      'stats.occupancyRate': 'Occupancy Rate',
      'stats.founderExperience': 'Transaction Experience',
      'stats.touristArrivals': 'Tourist Arrivals',
      'stats.rentalYield': 'Rental Yield',
      'stats.propertyGrowth': 'Property Growth',
      'stats.paybackPeriod': 'Payback Period',
      'stats.save': 'Save Statistics',
      'roi.title': 'ROI Calculator Parameters',
      'roi.navTitle': 'ROI',
      'roi.scenarios': 'Scenarios',
      'roi.minInvestment': 'Min Investment ($)',
      'roi.maxInvestment': 'Max Investment ($)',
      'roi.step': 'Step ($)',
      'roi.defaultInvestment': 'Default Investment ($)',
      'roi.defaultOccupancy': 'Default Occupancy (%)',
      'roi.occupancyRange': 'Occupancy Range (%)',
      'roi.conservative': 'Conservative — Yield / Growth (%)',
      'roi.normal': 'Normal — Yield / Growth (%)',
      'roi.optimistic': 'Optimistic — Yield / Growth (%)',
      'roi.save': 'Save ROI Settings',
      'roi.textsTitle': 'Calculator Texts (3 languages)',
      'roi.textsHint': 'Use {project} placeholder in titleProject — it will be replaced with the project name.',
      'roi.textsSave': 'Save Calculator Texts',
      'help.roi.investment': '<strong>Investment range:</strong> Min/max/step for the slider on homepage.',
      'help.roi.scenarios': '<strong>Scenarios:</strong> Yield and growth rates for Conservative/Normal/Optimistic.',
      'help.roi.occupancy': '<strong>Occupancy:</strong> Default occupancy rate and its slider range.',
      'analytics.title': 'Analytics & Tracking',
      'analytics.tracking': 'Tracking Services',
      'analytics.seo': 'SEO Verification',
      'analytics.ga4': 'Google Analytics 4',
      'analytics.facebookPixel': 'Facebook Pixel',
      'analytics.yandexMetrika': 'Yandex Metrika',
      'analytics.clarity': 'Microsoft Clarity',
      'analytics.gsc': 'Google Search Console',
      'analytics.save': 'Save Analytics',
      'analytics.hint.ga4': 'Measurement ID from GA4 property',
      'analytics.hint.facebook': 'Pixel ID from Meta Events Manager',
      'analytics.hint.yandex': 'Counter ID from metrika.yandex.ru',
      'analytics.hint.clarity': 'Project ID from clarity.microsoft.com',
      'analytics.hint.gsc': 'Verification code (content value of meta tag)',
      'help.analytics.intro': '<strong>How it works:</strong> Paste your tracking IDs below. Scripts are injected automatically — no code changes needed.',
      'help.analytics.empty': '<strong>Empty field</strong> = tracker disabled. Fill in only the services you use.',
      'help.analytics.events': '<strong>Auto-tracked events:</strong> form submissions (contact, quiz, lead magnet, exit popup), WhatsApp clicks, PDF downloads.',
      'newProject.title': 'Add New Project',
      'newProject.name': 'Project Name',
      'newProject.slug': 'Slug',
      'newProject.slugHint': 'Auto-generated from name, editable',
      'newProject.status': 'Status',
      'newProject.startingPrice': 'Starting Price ($)',
      'newProject.totalUnits': 'Total Units',
      'newProject.bedrooms': 'Bedrooms',
      'newProject.handover': 'Handover',
      'newProject.showcaseImage': 'Showcase Image',
      'newProject.showcaseText': 'Showcase Text (EN)',
      'newProject.subtitle': 'Short Subtitle',
      'newProject.desc': 'Description',
      'newProject.comparisonData': 'Comparison Data',
      'newProject.areaRange': 'Area Range',
      'newProject.landRange': 'Land Range',
      'newProject.pool': 'Pool',
      'newProject.cancel': 'Cancel',
      'newProject.create': 'Create Project',
      'newProject.nameRequired': 'Name is required',
      'newProject.slugExists': 'Project with this slug already exists',
      'preview.title': 'Preview',
      'common.saving': 'Saving...',
      'common.saved': 'Saved! Site updating (~1-2 min)',
      'common.error': 'Error: ',
      'common.unsavedWarn': 'You have unsaved changes. Switch tab anyway?',
      'auth.wrongPassword': 'Wrong password. Try again.',
      'auth.userNotFound': 'No account with this email.',
      'auth.tooManyRequests': 'Too many attempts. Try later.',
      'auth.invalidEmail': 'Invalid email address.',
      'auth.invalidCredential': 'Invalid email or password.',
      'auth.failed': 'Authentication failed. Please try again.',
      'validate.wa.required': 'Required',
      'validate.wa.digitsOnly': 'Digits only — no +, spaces or dashes',
      'validate.wa.tooShort': 'Too short — include country code (e.g. 62...)',
      'validate.wa.tooLong': 'Too long — max 15 digits',
      'validate.wa.link': 'Link: wa.me/',
      'validate.phone.required': 'Required',
      'validate.phone.tooShort': 'Too short',
      'time.justNow': 'just now',
      'time.mAgo': 'm ago',
      'time.hAgo': 'h ago',
      'time.dAgo': 'd ago',
    },
    ru: {
      'login.title': 'Панель управления',
      'login.email': 'Email',
      'login.password': 'Пароль',
      'login.submit': 'Войти',
      'login.signingIn': 'Вход...',
      'pat.title': 'GBH Access',
      'pat.desc': 'Введите токен доступа для публикации изменений.',
      'pat.why': 'Этот токен позволяет админ-панели публиковать ваши изменения на сайт.',
      'pat.step1': 'Откройте <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noopener noreferrer">Настройки токенов GitHub</a>',
      'pat.step2': 'Нажмите <strong>Generate new token</strong>, выберите репо <strong>global-bali-home</strong>',
      'pat.step3': 'В Permissions → Contents → выберите <strong>Read and write</strong>',
      'pat.step4': 'Скопируйте токен и вставьте ниже',
      'pat.label': 'Personal Access Token',
      'pat.remember': 'Запомнить на этом устройстве',
      'pat.submit': 'Подключить',
      'pat.error': 'Неверный токен. Убедитесь, что scope "contents:write" включён.',
      'header.title': 'Панель управления',
      'header.rateLabel': 'USD / IDR',
      'header.signOut': 'Выйти',
      'deploy.deploying': 'Деплой...',
      'deploy.live': 'Опубликовано!',
      'deploy.failed': 'Ошибка деплоя',
      'nav.dashboard': 'Обзор',
      'nav.projects': 'Проекты',
      'nav.seo': 'SEO',
      'nav.gallery': 'Галерея',
      'nav.faq': 'FAQ',
      'nav.testimonials': 'Отзывы',
      'nav.analytics': 'Аналитика',
      'nav.settings': 'Настройки',
      'dash.title': 'Обзор',
      'dash.loading': 'Загрузка данных...',
      'dash.totalUnits': 'Всего юнитов',
      'dash.soldBooked': 'Продано / Бронь',
      'dash.available': 'Доступно',
      'dash.progress': 'Прогресс',
      'dash.potential': 'Потенциал',
      'dash.price': 'Цена',
      'dash.preSale': 'Предпродажа',
      'dash.inProgress': 'Строится',
      'dash.status_pre-sale': 'Предпродажа',
      'dash.status_in-progress': 'Строится',
      'dash.status_completed': 'Завершён',
      'dash.status_sold-out': 'Всё продано',
      'dash.sold': 'Продано',
      'dash.left': 'Осталось',
      'dash.priceRange': 'Диапазон цен',
      'dash.editProject': 'Редактировать',
      'dash.viewOnSite': 'На сайте',
      'dash.recentChanges': 'Последние изменения',
      'dash.noChanges': 'Нет недавних изменений.',
      'dash.couldNotLoad': 'Не удалось загрузить историю.',
      'dash.breakAvailable': 'доступно',
      'dash.breakBooked': 'бронь',
      'dash.breakSold': 'продано',
      'dash.breakResale': 'перепродажа',
      'rate.title': 'Курс валют (USD → IDR)',
      'rate.navTitle': 'Курс',
      'rate.auto': 'Авто (курс из API)',
      'rate.save': 'Сохранить курс',
      'rate.currentRate': 'Текущий курс:',
      'rate.updated': 'Обновлён:',
      'rate.manual': '(ручной)',
      'rate.autoMode': '(авто)',
      'rate.defaultMsg': 'Курс по умолчанию. Обновите для корректных цен в IDR.',
      'rate.invalidRate': 'Введите корректный курс (напр. 16500)',
      'help.rate.manual': '<strong>Вручную:</strong> Введите курс и нажмите Сохранить.',
      'help.rate.auto': '<strong>Авто:</strong> Курс обновляется из API каждый час. Ручной ввод блокируется.',
      'help.rate.fallback': '<strong>Резерв:</strong> Если API недоступен, используется последний сохранённый курс.',
      'contacts.title': 'Контактная информация',
      'contacts.phone': 'Телефон',
      'contacts.whatsapp': 'Номер WhatsApp',
      'contacts.email': 'Email',
      'contacts.locationEn': 'Адрес (EN)',
      'contacts.locationRu': 'Адрес (RU)',
      'contacts.locationId': 'Адрес (ID)',
      'contacts.save': 'Сохранить контакты',
      'contacts.hint.phone': 'Формат отображения, напр. +62 813 251 438 49',
      'contacts.hint.whatsapp': 'Только цифры, с кодом страны, без +',
      'help.contacts.phone': '<strong>Телефон:</strong> Любой формат с пробелами/дефисами, начинать с +код страны.',
      'help.contacts.whatsapp': '<strong>WhatsApp:</strong> ТОЛЬКО ЦИФРЫ, без +, пробелов или дефисов. Пример: 6281338741177',
      'help.contacts.email': '<strong>Email:</strong> Стандартный формат email.',
      'help.contacts.location': '<strong>Адрес:</strong> Отображаемый текст, переводить вручную для каждого языка.',
      'guide.title': 'PDF Гид по инвестициям',
      'guide.navTitle': 'Гид',
      'guide.upload': 'Загрузить PDF',
      'guide.currentFile': 'Текущий файл:',
      'guide.version': 'Версия:',
      'guide.updated': 'Обновлён:',
      'guide.noFile': 'PDF ещё не загружен. Загрузите файл для активации скачивания гида.',
      'guide.selectPdf': 'Выберите PDF файл',
      'guide.uploading': 'Загрузка PDF...',
      'help.guide.format': '<strong>Формат:</strong> Только PDF.',
      'help.guide.afterUpload': '<strong>После загрузки:</strong> Файл сохраняется в репозитории и доступен посетителям.',
      'help.guide.deployTime': '<strong>Деплой:</strong> ~1-2 минуты после загрузки.',
      'projects.title': 'Редактор проектов',
      'projects.publish': 'Опубликовать',
      'projects.generatePages': 'Сгенерировать страницы',
      'projects.updateSeoOnly': 'Обновить только SEO',
      'projects.overwriteWarn': '⚠️ ОПАСНО: Страницы для "{name}" уже существуют.\n\nНажав OK, вы ПОЛНОСТЬЮ ПЕРЕЗАПИШЕТЕ HTML-файлы (EN + RU + ID) автогенерируемым шаблоном.\n\nВЫ ПОТЕРЯЕТЕ:\n• Курированные изображения галереи и кастомные подборки фото\n• Любые ручные правки контента внесённые прямо в HTML\n• Любые кастомные секции добавленные вне шаблона\n\nШаблон ВКЛЮЧАЕТ: Hero, Концепцию, Таблицу юнитов, Галерею, ROI калькулятор, Tour CTA, Финальный CTA.\n\nЕсли нужно обновить только SEO мета-теги — НАЖМИТЕ ОТМЕНА и используйте кнопку "Обновить только SEO".\n\nВы абсолютно уверены, что хотите перезаписать?',
      'projects.overwriteAll': 'Перезаписать всё',
      'projects.cancel': 'Отмена',
      'projects.unsaved': 'Есть несохранённые изменения',
      'projects.publishing': 'Публикация...',
      'projects.published': 'Опубликовано! Сайт обновится (~1-2 мин)',
      'projects.projectStatus': 'Статус проекта',
      'projects.statusLabel': 'Статус',
      'projects.soldOutAuto': 'Авто: все юниты проданы',
      'projects.floorPlans': 'Планировки',
      'projects.noPlan': 'Нет планировки',
      'projects.uploadPlan': 'Загрузить',
      'projects.deletePlan': 'Удалить планировку',
      'projects.confirmDeletePlan': 'Удалить планировку для {type}?',
      'projects.uploading': 'Загрузка...',
      'projects.units': 'Юниты',
      'projects.unitTypes': 'Типы юнитов',
      'projects.availability': 'Доступность',
      'projects.heroStats': 'Статистика Hero',
      'projects.showcaseCard': 'Карточка проекта',
      'projects.addUnit': '+ Добавить юнит',
      'projects.addType': '+ Добавить тип',
      'projects.deleteUnit': 'Удалить',
      'projects.deleteType': 'Удалить',
      'projects.confirmDeleteUnit': 'Удалить юнит {id}?',
      'projects.confirmDeleteType': 'Удалить тип «{type}»?',
      'gallery.confirmDelete': 'Удалить «{name}»?',
      'gallery.deleteError': 'Ошибка удаления: ',
      'faq.confirmDelete': 'Удалить этот вопрос?',
      'test.confirmDelete': 'Удалить этот отзыв?',
      'projects.unit': 'Юнит',
      'projects.type': 'Тип',
      'projects.floors': 'Этажи',
      'projects.area': 'Площадь',
      'projects.land': 'Участок',
      'projects.badge': 'Бейдж',
      'projects.status': 'Статус',
      'projects.price': 'Цена ($)',
      'projects.sold': 'Продано',
      'projects.total': 'Всего',
      'projects.availAutoHint': 'Рассчитывается автоматически из статусов юнитов',
      'projects.number': 'Число',
      'projects.label': 'Подпись',
      'projects.priceLabel': 'Цена',
      'projects.description': 'Описание',
      'projects.positioning': 'Позиционирование (тэглайн)',
      'projects.positioningPh': 'напр. Бутик-доходность',
      'projects.projectDetails': 'Детали проекта',
      'projects.startingPrice': 'Начальная цена (USD)',
      'projects.bedrooms': 'Спальни',
      'projects.compArea': 'Диапазон площади',
      'projects.compLand': 'Диапазон участка',
      'projects.totalUnits': 'Всего юнитов',
      'projects.compPool': 'Бассейн',
      'projects.handover': 'Сдача',
      'projects.newProject': '+ Новый проект',
      'seo.title': 'SEO Редактор',
      'seo.page': 'Страница',
      'seo.selectPage': '— Выберите страницу —',
      'seo.home': 'Главная',
      'seo.about': 'О нас',
      'seo.projects': 'Проекты',
      'seo.services': 'Услуги',
      'seo.gallery': 'Галерея',
      'seo.contacts': 'Контакты',
      'seo.googlePreview': 'Превью в Google',
      'seo.socialPreview': 'Превью в соцсетях',
      'seo.noOgImage': 'Нет OG-изображения',
      'seo.pageTitle': 'Заголовок страницы',
      'seo.metaDesc': 'Мета-описание',
      'seo.ogTitle': 'OG Заголовок',
      'seo.ogDesc': 'OG Описание',
      'seo.ogImage': 'OG Изображение URL',
      'seo.canonical': 'Canonical URL',
      'seo.viewOnSite': 'Открыть на сайте ↗',
      'seo.saveAll': 'Сохранить все языки',
      'seo.savingAll': 'Сохранение всех языков...',
      'seo.loadingLangs': 'Загрузка всех языков...',
      'gallery.title': 'Менеджер галереи',
      'gallery.project': 'Проект',
      'gallery.selectProject': '— Выберите проект —',
      'gallery.upload': 'Загрузить фото',
      'gallery.photos': 'фото',
      'gallery.noImages': 'Нет изображений. Перетащите файлы или нажмите Загрузить.',
      'gallery.dragDrop': 'Перетащите изображения сюда или нажмите Загрузить',
      'gallery.formats': 'JPG, PNG, WebP — макс. 10 МБ на файл',
      'gallery.uploading': 'Загрузка',
      'gallery.savingData': 'Сохранение данных галереи...',
      'gallery.uploaded': 'фото загружено!',
      'gallery.moveLeft': 'Влево',
      'gallery.moveRight': 'Вправо',
      'gallery.delete': 'Удалить',
      'gallery.previewTitle': 'Готово к загрузке',
      'gallery.uploadAll': 'Загрузить все',
      'gallery.cancelUpload': 'Отмена',
      'gallery.duplicate': 'Уже существует',
      'gallery.filesSelected': 'файлов выбрано',
      'faq.title': 'Редактор FAQ',
      'faq.addQuestion': '+ Добавить вопрос',
      'faq.publish': 'Опубликовать FAQ',
      'faq.publishing': 'Публикация FAQ...',
      'faq.published': 'Опубликовано! Сайт обновится (~1-2 мин)',
      'faq.noItems': 'Пока нет вопросов. Нажмите "+ Добавить вопрос".',
      'faq.question': 'Вопрос',
      'faq.answer': 'Ответ',
      'test.title': 'Редактор отзывов',
      'test.add': '+ Добавить отзыв',
      'test.publish': 'Опубликовать отзывы',
      'test.publishing': 'Публикация отзывов...',
      'test.published': 'Опубликовано! Сайт обновится (~1-2 мин)',
      'test.noItems': 'Пока нет отзывов. Нажмите "+ Добавить отзыв".',
      'test.name': 'Имя',
      'test.role': 'Роль',
      'test.avatar': 'Фото',
      'test.text': 'Текст',
      'test.stars': 'Звёзды',
      'test.sourceUrl': 'Ссылка на отзыв',
      'test.sourceName': 'Источник',
      'test.sourceHint': 'напр. Google Reviews, Trustpilot',
      'test.copyFromEn': 'Скопировать из EN',
      'faq.copyFromEn': 'Скопировать из EN',
      'colors.title': 'Цвета сайта',
      'colors.navTitle': 'Цвета',
      'colors.mainBg': 'Основной фон',
      'colors.altBg': 'Альтернативный фон',
      'colors.cardPanel': 'Карточки / Панели',
      'colors.primaryText': 'Основной текст',
      'colors.cream': 'Кремовый (Кнопки)',
      'colors.brandAccent': 'Акцентный цвет',
      'colors.muted': 'Приглуш. 75%',
      'colors.dim': 'Тусклый 50%',
      'colors.border': 'Рамка 10%',
      'colors.save': 'Сохранить цвета',
      'colors.reset': 'Сбросить к стандартным',
      'colors.resetDone': 'Сброшено (не сохранено)',
      'colors.invalidHex': 'Неверный HEX для ',
      'help.colors.text': '<strong>Цвет текста</strong> определяет производные цвета (приглушённый, рамки).',
      'help.colors.live': '<strong>Предпросмотр:</strong> Изменения видны мгновенно в админке.',
      'help.colors.site': '<strong>На сайте:</strong> Цвета применятся после сохранения + ~1-2 мин.',
      'help.colors.reset': 'Используйте <strong>Сбросить</strong> для возврата палитры.',
      'help.exitpopup.what': '<strong>Что делает:</strong> Показывает попап, когда десктопный посетитель двигает курсор к закрытию вкладки. Предлагает бесплатный гид по инвестициям в обмен на email — инструмент сбора лидов.',
      'help.exitpopup.enabled': '<strong>Включён:</strong> Включает или выключает попап на всём сайте.',
      'help.exitpopup.delay': '<strong>Задержка:</strong> Минимальное время (секунды) на странице до срабатывания попапа. Не раздражает новых посетителей (рекомендуется: 15–30 сек).',
      'help.exitpopup.content': '<strong>Контент:</strong> Все тексты настраиваются для каждого языка. Бейдж, заголовок, описание, тексты кнопок и сообщение об успехе.',
      'nav.exitpopup': 'Popups',
      'popups.title': 'Попапы',
      'exitpopup.title': 'Exit Intent попап',
      'exitpopup.settings': 'Настройки',
      'exitpopup.content': 'Контент',
      'exitpopup.preview': 'Превью',
      'exitpopup.afterSubmit': 'После отправки',
      'exitpopup.enabled': 'Включён',
      'exitpopup.delay': 'Задержка срабатывания (сек)',
      'exitpopup.field.tag': 'Бейдж',
      'exitpopup.field.title': 'Заголовок попапа',
      'exitpopup.field.text': 'Описание',
      'exitpopup.field.placeholder': 'Плейсхолдер email',
      'exitpopup.field.submit': 'Кнопка отправки',
      'exitpopup.field.success': 'Сообщение об успехе',
      'exitpopup.save': 'Сохранить Exit Popup',
      'tour.title': 'Попап тура',
      'tour.steps': 'Шаги',
      'tour.step': 'Шаг',
      'tour.question': 'Вопрос',
      'tour.option': 'Вариант',
      'tour.form': 'Форма контактов',
      'tour.formTitle': 'Заголовок формы',
      'tour.formSubtitle': 'Подзаголовок формы',
      'tour.name': 'Плейсхолдер имени',
      'tour.whatsapp': 'Плейсхолдер WhatsApp',
      'tour.email': 'Плейсхолдер Email',
      'tour.time': 'Метка времени',
      'tour.timeOption': 'Вариант времени',
      'tour.comment': 'Плейсхолдер комментария',
      'tour.consent': 'Текст согласия',
      'tour.submit': 'Кнопка отправки',
      'tour.thankYou': 'Экран благодарности',
      'tour.thankTitle': 'Заголовок',
      'tour.thankText': 'Текст',
      'tour.thankWa': 'Кнопка WhatsApp',
      'tour.thankProject': 'Текст ссылки на проект',
      'tour.save': 'Сохранить попап тура',
      'social.title': 'Социальные сети',
      'social.facebook': 'URL Facebook',
      'social.instagram': 'URL Instagram',
      'social.save': 'Сохранить соцсети',
      'stats.title': 'Статистика компании',
      'stats.navTitle': 'Стат.',
      'stats.investorsWorldwide': 'Инвесторов по миру',
      'stats.villasDesigned': 'Виллы в портфолио',
      'stats.occupancyRate': 'Заполняемость',
      'stats.founderExperience': 'Опыт транзакций',
      'stats.touristArrivals': 'Приезд туристов',
      'stats.rentalYield': 'Арендная доходность',
      'stats.propertyGrowth': 'Рост стоимости',
      'stats.paybackPeriod': 'Срок окупаемости',
      'stats.save': 'Сохранить статистику',
      'roi.title': 'Параметры ROI-калькулятора',
      'roi.navTitle': 'ROI',
      'roi.scenarios': 'Сценарии',
      'roi.minInvestment': 'Мин. инвестиция ($)',
      'roi.maxInvestment': 'Макс. инвестиция ($)',
      'roi.step': 'Шаг ($)',
      'roi.defaultInvestment': 'Инвестиция по умолчанию ($)',
      'roi.defaultOccupancy': 'Заполняемость по умолчанию (%)',
      'roi.occupancyRange': 'Диапазон заполняемости (%)',
      'roi.conservative': 'Консервативный — Доход / Рост (%)',
      'roi.normal': 'Обычный — Доход / Рост (%)',
      'roi.optimistic': 'Оптимистичный — Доход / Рост (%)',
      'roi.save': 'Сохранить настройки ROI',
      'roi.textsTitle': 'Тексты калькулятора (3 языка)',
      'roi.textsHint': 'Используйте плейсхолдер {project} в titleProject — он заменится на название проекта.',
      'roi.textsSave': 'Сохранить тексты калькулятора',
      'help.roi.investment': '<strong>Диапазон инвестиций:</strong> Мин/макс/шаг для слайдера на главной.',
      'help.roi.scenarios': '<strong>Сценарии:</strong> Ставки доходности и роста для каждого сценария.',
      'help.roi.occupancy': '<strong>Заполняемость:</strong> Стандартное значение и диапазон слайдера.',
      'analytics.title': 'Аналитика и трекинг',
      'analytics.tracking': 'Сервисы трекинга',
      'analytics.seo': 'SEO-верификация',
      'analytics.ga4': 'Google Analytics 4',
      'analytics.facebookPixel': 'Facebook Pixel',
      'analytics.yandexMetrika': 'Яндекс Метрика',
      'analytics.clarity': 'Microsoft Clarity',
      'analytics.gsc': 'Google Search Console',
      'analytics.save': 'Сохранить аналитику',
      'analytics.hint.ga4': 'Measurement ID из свойства GA4',
      'analytics.hint.facebook': 'Pixel ID из Meta Events Manager',
      'analytics.hint.yandex': 'Номер счётчика с metrika.yandex.ru',
      'analytics.hint.clarity': 'ID проекта с clarity.microsoft.com',
      'analytics.hint.gsc': 'Код верификации (значение content мета-тега)',
      'help.analytics.intro': '<strong>Как это работает:</strong> Вставьте ID трекеров ниже. Скрипты подключаются автоматически — менять код не нужно.',
      'help.analytics.empty': '<strong>Пустое поле</strong> = трекер отключён. Заполняйте только те сервисы, которые используете.',
      'help.analytics.events': '<strong>Авто-события:</strong> отправка форм (контакт, квиз, лид-магнит, exit popup), клики WhatsApp, скачивание PDF.',
      'newProject.title': 'Добавить проект',
      'newProject.name': 'Название проекта',
      'newProject.slug': 'Slug',
      'newProject.slugHint': 'Генерируется из имени, можно редактировать',
      'newProject.status': 'Статус',
      'newProject.startingPrice': 'Начальная цена ($)',
      'newProject.totalUnits': 'Всего юнитов',
      'newProject.bedrooms': 'Спальни',
      'newProject.handover': 'Сдача',
      'newProject.showcaseImage': 'Изображение',
      'newProject.showcaseText': 'Текст карточки (EN)',
      'newProject.subtitle': 'Короткий подзаголовок',
      'newProject.desc': 'Описание',
      'newProject.comparisonData': 'Данные для сравнения',
      'newProject.areaRange': 'Диапазон площади',
      'newProject.landRange': 'Диапазон участка',
      'newProject.pool': 'Бассейн',
      'newProject.cancel': 'Отмена',
      'newProject.create': 'Создать проект',
      'newProject.nameRequired': 'Укажите название',
      'newProject.slugExists': 'Проект с таким slug уже существует',
      'preview.title': 'Превью',
      'common.saving': 'Сохранение...',
      'common.saved': 'Сохранено! Сайт обновится (~1-2 мин)',
      'common.error': 'Ошибка: ',
      'common.unsavedWarn': 'Есть несохранённые изменения. Переключить вкладку?',
      'auth.wrongPassword': 'Неверный пароль.',
      'auth.userNotFound': 'Аккаунт не найден.',
      'auth.tooManyRequests': 'Слишком много попыток. Попробуйте позже.',
      'auth.invalidEmail': 'Неверный email.',
      'auth.invalidCredential': 'Неверный email или пароль.',
      'auth.failed': 'Ошибка аутентификации.',
      'validate.wa.required': 'Обязательное поле',
      'validate.wa.digitsOnly': 'Только цифры — без +, пробелов или дефисов',
      'validate.wa.tooShort': 'Слишком короткий — укажите код страны (напр. 62...)',
      'validate.wa.tooLong': 'Слишком длинный — макс. 15 цифр',
      'validate.wa.link': 'Ссылка: wa.me/',
      'validate.phone.required': 'Обязательное поле',
      'validate.phone.tooShort': 'Слишком короткий',
      'time.justNow': 'только что',
      'time.mAgo': 'м назад',
      'time.hAgo': 'ч назад',
      'time.dAgo': 'д назад',
    }
  };

  function t(key) {
    return (ADMIN_I18N[adminLang] && ADMIN_I18N[adminLang][key]) || ADMIN_I18N.en[key] || key;
  }

  function translateUI() {
    // Static elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val.includes('<strong>') || val.includes('<b>') || val.includes('<br>') || val.includes('<a ')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    // Update active language toggle (both login screen and header)
    document.querySelectorAll('[data-admin-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.adminLang === adminLang);
    });
  }

  function setAdminLang(lang) {
    adminLang = lang;
    localStorage.setItem('admin_lang', lang);
    translateUI();
    // Re-render dynamic sections
    if (!adminApp.hidden) {
      renderDashboard();
      renderRateInfo();
      renderGuideInfo();
      renderProjectEditor();
      renderGallery();
      if (faqData) renderFaqEditor();
      if (testimonialsData) renderTestimonialsEditor();
      // Re-render SEO if open
      const seoPage = $('#seo-page');
      if (seoPage && seoPage.value && Object.keys(seoCache).length) {
        saveSeoFieldsToCache(currentSeoLang);
        renderSeoFields();
      }
    }
  }

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
  const _dirtyState = { projects: false, faq: false, testimonials: false, seo: false, colors: false, contacts: false, rate: false, exitpopup: false };
  const dirtyTabs = new Proxy(_dirtyState, {
    set(target, prop, value) {
      target[prop] = value;
      updateDirtyIndicators();
      return true;
    }
  });

  function updateDirtyIndicators() {
    // Map dirty keys to nav tab names (rate/contacts/colors share "settings" tab)
    const tabMap = { rate: 'settings', contacts: 'settings', colors: 'settings' };
    document.querySelectorAll('.admin-nav__btn[data-tab]').forEach(btn => {
      const tab = btn.dataset.tab;
      const isDirty = Object.entries(_dirtyState).some(([key, val]) => val && (tabMap[key] || key) === tab);
      btn.classList.toggle('dirty', isDirty);
    });
  }

  function getActiveTab() {
    const btn = document.querySelector('.admin-nav__btn.active');
    return btn ? btn.dataset.tab : 'dashboard';
  }

  function isAnyDirty() {
    return Object.values(_dirtyState).some(v => v);
  }

  // ─── Live Exchange Rate ───
  let rateInterval = null;

  async function fetchLiveRate() {
    const valEl = document.getElementById('header-rate-value');
    const timeEl = document.getElementById('header-rate-time');
    if (!valEl) return;
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data.result === 'success' && data.rates && data.rates.IDR) {
        const rate = Math.round(data.rates.IDR);
        valEl.textContent = rate.toLocaleString('id-ID');
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      }
    } catch (e) {
      valEl.textContent = '—';
      timeEl.textContent = 'offline';
    }
  }

  function startRateUpdates() {
    fetchLiveRate();
    if (rateInterval) clearInterval(rateInterval);
    rateInterval = setInterval(fetchLiveRate, 3600000);
  }

  // ─── DOM Refs ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Security: escape HTML to prevent XSS in dynamic content
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  const loginScreen = $('#login-screen');
  const patScreen = $('#pat-screen');
  const adminApp = $('#admin-app');
  const loginForm = $('#login-form');
  const loginError = $('#login-error');
  const patForm = $('#pat-form');
  const patError = $('#pat-error');

  // ─── Init Firebase ───
  if (typeof firebase === 'undefined') {
    loginError.textContent = t('auth.failed');
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
    const authLoading = $('#auth-loading');
    if (authLoading) authLoading.remove();
    if (user) {
      loginScreen.hidden = true;
      $('#admin-user').textContent = user.email;
      startRateUpdates();
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
    btn.textContent = t('login.signingIn');
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error('Login error:', err);
      loginError.textContent = friendlyError(err.code);
      loginError.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = t('login.submit');
    }
  });

  function friendlyError(code) {
    const map = {
      'auth/wrong-password': t('auth.wrongPassword'),
      'auth/user-not-found': t('auth.userNotFound'),
      'auth/too-many-requests': t('auth.tooManyRequests'),
      'auth/invalid-email': t('auth.invalidEmail'),
      'auth/invalid-credential': t('auth.invalidCredential')
    };
    return map[code] || t('auth.failed');
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
      patError.textContent = t('pat.error');
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
    translateUI();
    buildDynamicUI();
    renderDashboard();
    renderRateInfo();
    renderContactsForm();
    renderGuideInfo();
    renderSocialForm();
    renderRoiForm();
    renderRoiTextsForm();
    renderStatsForm();
    populateExitPopup();
    renderProjectEditor();
    renderGallery();
    renderColorsTab();
    loadFaqData();
    loadTestimonialsData();
    updateRateLimit();
    // Restore last active tab
    try {
      const savedTab = localStorage.getItem('admin_active_tab');
      if (savedTab) {
        const tabBtn = document.querySelector('.admin-nav__btn[data-tab="' + savedTab + '"]');
        if (tabBtn) tabBtn.click();
      }
    } catch(e) {}
    // Hide loading spinner
    const loader = document.getElementById('admin-loader');
    if (loader) loader.hidden = true;
  }

  // ─── Unsaved Changes Warning ───
  window.addEventListener('beforeunload', (e) => {
    if (pendingChanges || isAnyDirty()) { e.preventDefault(); e.returnValue = ''; }
  });

  // ─── Loading Button Helper ───
  function btnLoading(btn, loading) {
    if (loading) {
      btn.classList.add('is-loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('is-loading');
      btn.disabled = false;
    }
  }

  // ─── Tab Navigation ───
  $$('.admin-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTab = getActiveTab();
      const isDirty = currentTab === 'dashboard'
        ? (dirtyTabs.rate || dirtyTabs.contacts)
        : (pendingChanges || dirtyTabs[currentTab]);
      if (isDirty && !confirm(t('common.unsavedWarn'))) return;
      $$('.admin-nav__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $$('.admin-tab').forEach(tab => tab.hidden = true);
      $(`#tab-${btn.dataset.tab}`).hidden = false;
      try { localStorage.setItem('admin_active_tab', btn.dataset.tab); } catch(e) {}
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
        `<button class="project-tabs__btn${i === 0 ? ' active' : ''}" data-proj="${k}">${escapeHtml(projectsData[k].name)}</button>`
      ).join('') + `<button class="project-tabs__btn project-tabs__btn--add" id="btn-new-project">${t('projects.newProject')}</button>`;
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
      galSelect.innerHTML = `<option value="">${t('gallery.selectProject')}</option>` + keys.map(k => {
        const shortName = k.replace('serenity-', '');
        return `<option value="${shortName}">${escapeHtml(projectsData[k].name)}</option>`;
      }).join('');
    }

    currentProject = keys[0];
  }

  // ─── Dashboard ───
  function renderDashboard() {
    if (!projectsData) return;
    const container = $('#dashboard-cards');
    const projects = getProjectKeys();

    // Recompute availability (resale counts as sold)
    projects.forEach(key => {
      const p = projectsData[key];
      if (p.units) {
        p.availability.sold = p.units.filter(u => u.status === 'sold' || u.status === 'booked' || u.status === 'resale').length;
        p.availability.total = p.units.length;
      }
    });

    // Compute totals
    let totalUnits = 0, totalSold = 0, totalAvailable = 0, totalPotential = 0;
    const projectStats = projects.map(key => {
      const p = projectsData[key];
      const { sold, total } = p.availability;
      const pct = Math.round((sold / total) * 100);
      const left = total - sold;
      totalUnits += total;
      totalSold += sold;
      totalAvailable += left;

      let potential = 0;
      if (p.units) {
        p.units.forEach(u => { if (u.status === 'available') potential += u.price || p.startingPrice; });
      } else if (p.unitTypes) {
        const availCount = total - sold;
        let assigned = 0;
        p.unitTypes.forEach(ut => {
          const share = Math.min(Math.round(availCount * ut.count / total), ut.count);
          potential += share * ut.price;
          assigned += share;
        });
        if (assigned < availCount) potential += (availCount - assigned) * p.startingPrice;
      }
      totalPotential += potential;

      return { key, p, sold, total, pct, left, potential };
    });

    // Summary row
    const totalPct = totalUnits ? Math.round((totalSold / totalUnits) * 100) : 0;
    let html = `<div class="dash-summary">
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalUnits}</div>
        <div class="dash-summary__label">${t('dash.totalUnits')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalSold}</div>
        <div class="dash-summary__label">${t('dash.sold')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalAvailable}</div>
        <div class="dash-summary__label">${t('dash.available')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalPct}%</div>
        <div class="dash-summary__label">${t('dash.progress')}</div>
        <div class="dash-summary__bar"><div class="dash-summary__bar-fill" style="width:${totalPct}%"></div></div>
      </div>
      <div class="dash-summary__item dash-summary__item--accent">
        <div class="dash-summary__value">$${totalPotential >= 1000000 ? (totalPotential / 1000000).toFixed(1) + 'M' : (totalPotential / 1000).toFixed(0) + 'K'}</div>
        <div class="dash-summary__label">${t('dash.potential')}</div>
      </div>
    </div>`;

    // Project cards
    html += '<div class="dashboard-grid">';
    projectStats.forEach(({ key, p, sold, total, pct, left, potential }) => {
      const isAllSoldDash = p.units ? p.units.every(u => u.status === 'sold' || u.status === 'resale') : (p.availability.sold >= p.availability.total);
      const dashStatus = isAllSoldDash ? 'sold-out' : (p.status || 'in-progress');
      const badgeClassMap = { 'pre-sale': 'presale', 'in-progress': 'progress', 'completed': 'completed', 'sold-out': 'soldout' };
      const badgeClass = badgeClassMap[dashStatus] || 'progress';
      const badgeText = t('dash.status_' + dashStatus);

      // Price range
      let prices = [];
      if (p.units) {
        p.units.forEach(u => { if (u.price) prices.push(u.price); });
      } else if (p.unitTypes) {
        p.unitTypes.forEach(ut => { prices.push(ut.price); });
      }
      if (!prices.length) prices.push(p.startingPrice);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const fmtPrice = v => v >= 1000000 ? '$' + (v / 1000000).toFixed(1) + 'M' : '$' + (v / 1000).toFixed(0) + 'K';
      const priceRange = minPrice === maxPrice ? fmtPrice(minPrice) : fmtPrice(minPrice) + ' – ' + fmtPrice(maxPrice);

      // Segmented bar counts
      const counts = { available: 0, booked: 0, sold: 0, resale: 0 };
      if (p.units) {
        p.units.forEach(u => { counts[u.status] = (counts[u.status] || 0) + 1; });
      } else {
        counts.sold = sold;
        counts.available = total - sold;
      }
      const segSold = Math.round((counts.sold / total) * 100);
      const segBooked = Math.round((counts.booked / total) * 100);
      const segResale = Math.round((counts.resale / total) * 100);

      // Legend
      const legend = [
        counts.sold ? `<span class="seg-legend seg-legend--sold">${counts.sold} ${t('dash.breakSold')}</span>` : '',
        counts.booked ? `<span class="seg-legend seg-legend--booked">${counts.booked} ${t('dash.breakBooked')}</span>` : '',
        counts.resale ? `<span class="seg-legend seg-legend--resale">${counts.resale} ${t('dash.breakResale')}</span>` : '',
        counts.available ? `<span class="seg-legend seg-legend--available">${counts.available} ${t('dash.breakAvailable')}</span>` : ''
      ].filter(Boolean).join('');

      html += `<div class="dash-card" data-card-project="${key}">
        <div class="dash-card__header">
          <span class="dash-card__name">${escapeHtml(p.name)}</span>
          <span class="dash-card__badge dash-card__badge--${badgeClass}">${badgeText}</span>
        </div>
        <div class="dash-card__stats dash-card__stats--2x2">
          <div><div class="dash-card__stat-value">${sold}/${total}</div><div class="dash-card__stat-label">${t('dash.sold')}</div></div>
          <div><div class="dash-card__stat-value">${left}</div><div class="dash-card__stat-label">${t('dash.left')}</div></div>
          <div><div class="dash-card__stat-value">${priceRange}</div><div class="dash-card__stat-label">${t('dash.price')}</div></div>
          <div><div class="dash-card__stat-value">${fmtPrice(potential)}</div><div class="dash-card__stat-label">${t('dash.potential')}</div></div>
        </div>
        <div class="dash-card__bar">
          <div class="dash-card__bar-track dash-card__bar-track--seg">
            <div class="dash-card__seg dash-card__seg--sold" style="width:${segSold}%"></div>
            <div class="dash-card__seg dash-card__seg--booked" style="width:${segBooked}%"></div>
            <div class="dash-card__seg dash-card__seg--resale" style="width:${segResale}%"></div>
          </div>
          <span class="dash-card__bar-label">${pct}%</span>
        </div>
        <div class="seg-legend-row">${legend}</div>
        <div class="dash-card__actions">
          <button class="dash-card__edit btn btn--outline btn--sm btn--accent" data-goto="${key}">${t('dash.editProject')}</button>
          <a href="https://winstik13.github.io/global-bali-home/${p.page || 'project-' + p.slug + '.html'}" target="_blank" rel="noopener" class="btn btn--outline btn--sm" style="text-decoration:none">${t('dash.viewOnSite')}</a>
        </div>
      </div>`;
    });
    html += '</div>';

    container.innerHTML = html;

    // Recent commits (rendered separately below project cards)
    const recentEl = $('#dash-recent-changes');
    if (recentEl) recentEl.innerHTML = `<div class="dash-commits"><h3>${t('dash.recentChanges')}</h3><div id="dash-commits-list"><span style="color:var(--color-text-dim)">${t('dash.loading')}</span></div></div>`;

    // Quick edit buttons
    container.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentProject = btn.dataset.goto;
        $$('.admin-nav__btn').forEach(b => b.classList.remove('active'));
        $$('.admin-nav__btn').forEach(b => { if (b.dataset.tab === 'projects') b.classList.add('active'); });
        $$('.admin-tab').forEach(tab => tab.hidden = true);
        $('#tab-projects').hidden = false;
        $$('.project-tabs__btn').forEach(b => b.classList.remove('active'));
        $$('.project-tabs__btn').forEach(b => { if (b.dataset.proj === currentProject) b.classList.add('active'); });
        renderProjectEditor();
        $('#tab-projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        list.innerHTML = `<span style="color:var(--color-text-dim)">${t('dash.noChanges')}</span>`;
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
      $('#dash-commits-list').innerHTML = `<span style="color:var(--color-text-dim)">${t('dash.couldNotLoad')}</span>`;
    }
  }

  function timeAgo(date) {
    const s = Math.floor((Date.now() - date.getTime()) / 1000);
    if (s < 60) return t('time.justNow');
    if (s < 3600) return Math.floor(s / 60) + t('time.mAgo');
    if (s < 86400) return Math.floor(s / 3600) + t('time.hAgo');
    return Math.floor(s / 86400) + t('time.dAgo');
  }

  // ─── Project Editor ───
  function renderProjectEditor() {
    if (!projectsData) return;
    const editor = $('#project-editor');
    const p = projectsData[currentProject];
    if (!p) return;

    let html = '';

    // Project Status + Availability (merged)
    const canEditSold = !p.units && p.unitTypes;
    if (p.units) {
      p.availability.sold = p.units.filter(u => u.status === 'sold' || u.status === 'booked' || u.status === 'resale').length;
      p.availability.total = p.units.length;
    } else if (p.unitTypes) {
      p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
    }
    const availPct = p.availability.total ? Math.round(p.availability.sold / p.availability.total * 100) : 0;
    const isAllSold = p.units ? p.units.every(u => u.status === 'sold' || u.status === 'resale') : (p.availability.sold >= p.availability.total);
    const effectiveStatus = isAllSold ? 'sold-out' : (p.status || 'in-progress');
    const statusOptions = ['pre-sale', 'in-progress', 'completed'];
    const badgeMap = { 'pre-sale': 'presale', 'in-progress': 'progress', 'completed': 'completed', 'sold-out': 'soldout' };
    html += `<div class="editor-section"><h3>${t('projects.projectStatus')}</h3>
      <div class="status-row">
        <select id="project-status" ${isAllSold ? 'disabled' : ''}>
          ${statusOptions.map(s => `<option value="${s}"${p.status === s ? ' selected' : ''}>${t('dash.status_' + s)}</option>`).join('')}
          ${isAllSold ? `<option value="sold-out" selected>${t('dash.status_sold-out')}</option>` : ''}
        </select>
        ${canEditSold ? `<input type="number" id="avail-sold" value="${p.availability.sold}" min="0" max="${p.availability.total}" class="status-sold-input">` : `<input type="hidden" id="avail-sold" value="${p.availability.sold}">`}
        <input type="hidden" id="avail-total" value="${p.availability.total}">
        <span class="status-sold-text">${p.availability.sold} / ${p.availability.total} ${t('dash.sold').toLowerCase()}</span>
        <div class="status-bar"><div class="status-bar__fill" style="width:${availPct}%"></div></div>
        <span class="status-pct">${availPct}%</span>
      </div>
      ${isAllSold ? `<small class="field-hint">${t('projects.soldOutAuto')}</small>` : ''}
      ${!canEditSold && !isAllSold ? `<small class="field-hint">${t('projects.availAutoHint')}</small>` : ''}
    </div>`;

    // Unit Table
    if (p.units) {
      html += `<div class="editor-section"><h3>${t('projects.units')}</h3>
        <table class="admin-unit-table"><thead><tr>
          <th>${t('projects.unit')}</th><th>${t('projects.type')}</th><th>${t('projects.floors')}</th><th>${t('projects.area')}</th><th>${t('projects.land')}</th><th>${t('projects.badge')}</th><th>${t('projects.status')}</th><th>${t('projects.price')}</th><th></th>
        </tr></thead><tbody>`;

      p.units.forEach((u, i) => {
        html += `<tr>
          <td data-label="${t('projects.unit')}"><input type="text" data-unit="${i}" data-field="id" class="unit-text" value="${u.id}" style="width:48px"></td>
          <td data-label="${t('projects.type')}"><select data-unit="${i}" data-field="type" class="unit-text-sel">
            ${['1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', '4.5 Bedroom', '5 Bedroom'].map(v => `<option value="${v}"${u.type === v ? ' selected' : ''}>${v}</option>`).join('')}
          </select></td>
          <td data-label="${t('projects.floors')}"><input type="number" data-unit="${i}" data-field="floors" class="unit-text" value="${u.floors}" style="width:48px" min="1" max="5"></td>
          <td data-label="${t('projects.area')}"><div class="unit-suffix"><input type="number" data-unit="${i}" data-field="area" class="unit-text" value="${parseFloat(u.area) || ''}" style="width:56px" min="0" step="1"><span>m²</span></div></td>
          <td data-label="${t('projects.land')}"><div class="unit-suffix"><input type="number" data-unit="${i}" data-field="land" class="unit-text" value="${parseFloat(u.land) || ''}" style="width:56px" min="0" step="0.01"><span>are</span></div></td>
          <td data-label="${t('projects.badge')}"><select data-unit="${i}" data-field="badge" class="unit-badge">
            ${[['', '—'], ['Premium', 'Premium'], ['Front Row', 'Front Row'], ['Large Plot', 'Large Plot'], ['Corner', 'Corner'], ['Last Unit', 'Last Unit'], ['Best Seller', 'Best Seller']].map(([v, l]) => `<option value="${v}"${(u.badge || '') === v ? ' selected' : ''}>${l}</option>`).join('')}
          </select></td>
          <td data-label="${t('projects.status')}"><select data-unit="${i}" data-field="status" class="unit-status">
            ${['available', 'booked', 'sold', 'resale'].map(s => `<option value="${s}"${u.status === s ? ' selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`).join('')}
          </select></td>
          <td data-label="${t('projects.price')}"><input type="number" data-unit="${i}" data-field="price" class="unit-price" value="${u.price || ''}" placeholder="—" min="0" step="1000"></td>
          <td><button class="btn--icon btn--danger" data-delete-unit="${i}" title="${t('projects.deleteUnit')}">&times;</button></td>
        </tr>`;
      });
      html += `</tbody></table><button class="btn btn--outline btn--sm" id="btn-add-unit" style="margin-top:8px">${t('projects.addUnit')}</button></div>`;
    }

    // Village Unit Types
    if (p.unitTypes) {
      html += `<div class="editor-section"><h3>${t('projects.unitTypes')}</h3>
        <table class="admin-unit-table"><thead><tr>
          <th>${t('projects.type')}</th><th>${t('projects.floors')}</th><th>${t('projects.area')}</th><th>${t('projects.land')}</th><th>${t('projects.unit')}</th><th>${t('projects.price')}</th><th></th>
        </tr></thead><tbody>`;

      p.unitTypes.forEach((ut, i) => {
        html += `<tr>
          <td data-label="${t('projects.type')}"><input type="text" data-utype="${i}" data-field="type" class="utype-text" value="${ut.type}" style="width:100px"></td>
          <td data-label="${t('projects.floors')}"><input type="number" data-utype="${i}" data-field="floors" class="utype-text" value="${ut.floors}" style="width:48px" min="1" max="5"></td>
          <td data-label="${t('projects.area')}"><div class="unit-suffix"><input type="number" data-utype="${i}" data-field="area" class="utype-text" value="${parseFloat(ut.area) || ''}" style="width:56px" min="0" step="1"><span>m²</span></div></td>
          <td data-label="${t('projects.land')}"><div class="unit-suffix"><input type="number" data-utype="${i}" data-field="land" class="utype-text" value="${parseFloat(ut.land) || ''}" style="width:56px" min="0" step="0.01"><span>are</span></div></td>
          <td data-label="${t('projects.unit')}"><input type="number" data-utype="${i}" data-field="count" class="utype-text" value="${ut.count}" style="width:48px" min="0"></td>
          <td data-label="${t('projects.price')}"><input type="number" data-utype="${i}" data-field="price" class="utype-price" value="${ut.price || ''}" min="0" step="1000"></td>
          <td><button class="btn--icon btn--danger" data-delete-utype="${i}" title="${t('projects.deleteType')}">&times;</button></td>
        </tr>`;
      });
      html += `</tbody></table><button class="btn btn--outline btn--sm" id="btn-add-utype" style="margin-top:8px">${t('projects.addType')}</button></div>`;
    }


    // Project Details (comparison table fields)
    if (!p.compPool || typeof p.compPool === 'string') {
      p.compPool = { en: p.compPool || '', ru: '', id: '' };
    }
    html += `<div class="editor-section"><h3>${t('projects.projectDetails')}</h3>
      <div class="form-grid--3">
        <div class="form-group"><label>${t('projects.startingPrice')}</label><input type="number" id="pd-startingPrice" value="${p.startingPrice || ''}" min="0" step="1000"></div>
        <div class="form-group"><label>${t('projects.bedrooms')}</label><input type="text" id="pd-bedrooms" value="${p.bedrooms || ''}" placeholder="2–3"></div>
        <div class="form-group"><label>${t('projects.handover')}</label><input type="text" id="pd-handover" value="${p.handover || ''}" placeholder="Q2 2026"></div>
      </div>
      <div class="form-grid--3">
        <div class="form-group"><label>${t('projects.compArea')}</label><input type="text" id="pd-compArea" value="${p.compArea || ''}" placeholder="167–210 m²"></div>
        <div class="form-group"><label>${t('projects.compLand')}</label><input type="text" id="pd-compLand" value="${p.compLand || ''}" placeholder="2–3 are"></div>
        <div class="form-group"><label>${t('projects.totalUnits')}</label><input type="number" id="pd-totalUnits" value="${p.totalUnits || ''}" min="1"></div>
      </div>
      <div class="form-grid--3">
        <div class="form-group"><label>${t('projects.compPool')} (EN)</label><input type="text" class="pd-compPool" data-lang="en" value="${p.compPool.en || ''}" placeholder="Private"></div>
        <div class="form-group"><label>${t('projects.compPool')} (RU)</label><input type="text" class="pd-compPool" data-lang="ru" value="${p.compPool.ru || ''}" placeholder="Приватный"></div>
        <div class="form-group"><label>${t('projects.compPool')} (ID)</label><input type="text" class="pd-compPool" data-lang="id" value="${p.compPool.id || ''}" placeholder="Pribadi"></div>
      </div>
    </div>`;

    // Floor Plans
    if (!p.floorPlans) p.floorPlans = {};
    // Migrate: ensure { floors, specs } structure
    const specIconOptions = ['bedrooms', 'bathrooms', 'building', 'plot', 'pool', 'terrace', 'parking', 'garden'];
    Object.keys(p.floorPlans).forEach(type => {
      const entry = p.floorPlans[type];
      if (typeof entry === 'string') {
        p.floorPlans[type] = { floors: { 'Ground Floor': entry }, specs: [] };
      } else if (!entry.floors) {
        const floors = {};
        const specs = entry.specs || [];
        Object.keys(entry).forEach(k => { if (k !== 'specs') floors[k] = entry[k]; });
        p.floorPlans[type] = { floors, specs };
      }
      if (!p.floorPlans[type].specs) p.floorPlans[type].specs = [];
    });
    const planTypes = Object.keys(p.floorPlans);
    html += `<div class="editor-section"><h3>${t('projects.floorPlans')}</h3>
      <div class="floor-plans-types">`;
    planTypes.forEach(type => {
      const data = p.floorPlans[type];
      const floors = data.floors || {};
      const specs = data.specs || [];
      const floorKeys = Object.keys(floors);
      html += `<div class="fp-type" data-plan-type="${type}">
        <div class="fp-type__header">
          <div class="fp-type__order">
            <button class="btn--icon fp-move-up" data-type="${type}" title="Move up"${planTypes.indexOf(type) === 0 ? ' disabled' : ''}>&#9650;</button>
            <button class="btn--icon fp-move-down" data-type="${type}" title="Move down"${planTypes.indexOf(type) === planTypes.length - 1 ? ' disabled' : ''}>&#9660;</button>
          </div>
          <span class="fp-type__name" data-rename="${type}" title="Click to rename">${type} <span class="fp-type__rename-icon">✎</span></span>
          <div class="fp-type__actions">
            <button class="btn btn--outline btn--sm fp-add-floor" data-type="${type}">+ Floor</button>
            <button class="btn--icon btn--danger fp-delete-type" data-type="${type}" title="Delete type">&times;</button>
          </div>
        </div>
        <div class="fp-type__specs">
          <div class="fp-specs-label">Specs</div>
          <div class="fp-specs-list">`;
      specs.forEach((s, si) => {
        html += `<div class="fp-spec-row">
          <select class="fp-spec-icon" data-type="${type}" data-si="${si}">
            ${specIconOptions.map(ico => `<option value="${ico}"${ico === s.icon ? ' selected' : ''}>${ico}</option>`).join('')}
          </select>
          <input type="text" class="fp-spec-text" data-type="${type}" data-si="${si}" value="${s.text}" placeholder="e.g. 2 Bedrooms">
          <button class="btn--icon btn--danger fp-spec-delete" data-type="${type}" data-si="${si}">&times;</button>
        </div>`;
      });
      html += `</div>
          <button class="btn btn--outline btn--sm fp-add-spec" data-type="${type}" style="margin-top:6px">+ Spec</button>
        </div>
        <div class="fp-type__floors">`;
      floorKeys.forEach(floor => {
        const path = floors[floor] || '';
        html += `<div class="fp-floor" data-type="${type}" data-floor="${floor}">
            <div class="fp-floor__label">${floor} <button class="fp-floor__delete fp-delete-floor" data-type="${type}" data-floor="${floor}" title="Delete floor">&times;</button></div>
            <div class="fp-floor__preview">${path ? `<img src="https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/master/${path}" alt="${type} — ${floor}">` : `<span class="fp-floor__empty">No image</span>`}</div>
            <div class="fp-floor__actions">
              <label class="btn btn--outline btn--sm">Upload<input type="file" accept="image/*" class="fp-upload" data-type="${type}" data-floor="${floor}" hidden></label>
            </div>
          </div>`;
      });
      html += `</div></div>`;
    });
    html += `</div>
      <button class="btn btn--outline btn--sm" id="add-plan-type" style="margin-top:12px">+ Add Plan Type</button>
    </div>`;

    // Hero Stats (4 languages)
    html += `<div class="editor-section"><h3>${t('projects.heroStats')}</h3>`;
    ['en', 'ru', 'id'].forEach(lng => {
      const stats = (p.heroStats && p.heroStats[lng]) || [];
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="hero-stats-grid">`;
      stats.forEach((s, i) => {
        html += `<div class="hero-stat-field">
          <div class="form-group"><label>${t('projects.number')}</label><input type="text" data-lang="${lng}" data-stat="${i}" data-field="number" class="stat-input" value="${s.number}"></div>
          <div class="form-group"><label>${t('projects.label')}</label><input type="text" data-lang="${lng}" data-stat="${i}" data-field="label" class="stat-input" value="${s.label}"></div>
        </div>`;
      });
      html += '</div></div>';
    });
    html += '</div>';

    // Showcase Text (4 languages)
    html += `<div class="editor-section"><h3>${t('projects.showcaseCard')}</h3>`;
    ['en', 'ru', 'id'].forEach(lng => {
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="form-group"><label>${t('projects.positioning')}</label><input type="text" class="showcase-input" data-lang="${lng}" data-field="positioning" value="${escAttr((p.positioning && p.positioning[lng]) || '')}" placeholder="${t('projects.positioningPh')}"></div>
        <div class="form-group"><label>${t('projects.description')}</label><textarea class="showcase-input" data-lang="${lng}" data-field="showcaseDesc" rows="2">${(p.showcaseDesc && p.showcaseDesc[lng]) || ''}</textarea></div>
      </div>`;
    });
    html += '</div>';

    editor.innerHTML = html;

    // Bind project status
    const statusSel = $('#project-status');
    if (statusSel && !statusSel.disabled) {
      statusSel.addEventListener('change', () => {
        p.status = statusSel.value;
        markChanged();
        renderProjectEditor();
      });
    }

    // Bind change events — unit fields
    editor.querySelectorAll('.unit-text').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.unit;
        const field = inp.dataset.field;
        if (field === 'floors') {
          p.units[idx][field] = +inp.value;
        } else if (field === 'area') {
          p.units[idx][field] = inp.value ? inp.value + ' m²' : '';
        } else if (field === 'land') {
          p.units[idx][field] = inp.value ? inp.value + ' are' : '';
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

    editor.querySelectorAll('.unit-badge').forEach(sel => {
      sel.addEventListener('change', () => {
        const idx = +sel.dataset.unit;
        p.units[idx].badge = sel.value || null;
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
        } else if (field === 'area') {
          p.unitTypes[idx][field] = inp.value ? inp.value + ' m²' : '';
        } else if (field === 'land') {
          p.unitTypes[idx][field] = inp.value ? inp.value + ' are' : '';
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
        if (!p[field] || typeof p[field] !== 'object') p[field] = { en: '', ru: '', id: '' };
        p[field][lng] = inp.value;
        markChanged();
      });
    });

    // Project Details bindings
    ['startingPrice', 'totalUnits'].forEach(field => {
      const inp = document.getElementById('pd-' + field);
      if (inp) inp.addEventListener('input', () => { p[field] = +inp.value || 0; markChanged(); });
    });
    ['bedrooms', 'compArea', 'compLand', 'handover'].forEach(field => {
      const inp = document.getElementById('pd-' + field);
      if (inp) inp.addEventListener('input', () => { p[field] = inp.value; markChanged(); });
    });
    editor.querySelectorAll('.pd-compPool').forEach(inp => {
      inp.addEventListener('input', () => {
        if (!p.compPool || typeof p.compPool === 'string') p.compPool = { en: '', ru: '', id: '' };
        p.compPool[inp.dataset.lang] = inp.value;
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
        if (!confirm(t('projects.confirmDeleteUnit').replace('{id}', p.units[idx].id))) return;
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
        if (!confirm(t('projects.confirmDeleteType').replace('{type}', p.unitTypes[idx].type))) return;
        p.unitTypes.splice(idx, 1);
        p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
        markChanged();
        renderProjectEditor();
      });
    });

    // Only allow manual sold editing for Village (unitTypes without per-unit statuses)
    if (!p.units && p.unitTypes) {
      $('#avail-sold').addEventListener('input', (e) => {
        p.availability.sold = +e.target.value;
        markChanged();
      });
    }

    // Floor plan upload (per floor)
    editor.querySelectorAll('.fp-upload').forEach(inp => {
      inp.addEventListener('change', async () => {
        const type = inp.dataset.type;
        const floor = inp.dataset.floor;
        const file = inp.files[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { alert('File exceeds 10 MB limit'); return; }
        try {
          inp.closest('.fp-floor').querySelector('.fp-floor__preview').innerHTML = `<span class="fp-floor__empty">Uploading...</span>`;
          const resized = await resizeImage(file, 1200, 0.85);
          const base64 = resized.split(',')[1];
          const safeName = (type + '-' + floor).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const path = `images/${p.slug}/plans/${safeName}.webp`;
          await commitFile(path, null, `Add floor plan: ${type} — ${floor} (${p.name})`, null, base64);
          p.floorPlans[type].floors[floor] = path;
          inp.closest('.fp-floor').querySelector('.fp-floor__preview').innerHTML =
            `<img src="${resized}" alt="${type} — ${floor}">`;
          markChanged();
        } catch (err) {
          console.error('Floor plan upload error:', err);
          inp.closest('.fp-floor').querySelector('.fp-floor__preview').innerHTML = `<span class="fp-floor__empty">Upload failed</span>`;
        }
      });
    });

    // Delete floor plan image
    editor.querySelectorAll('.fp-delete-img').forEach(btn => {
      btn.addEventListener('click', () => {
        const { type, floor } = btn.dataset;
        if (!confirm(`Remove image for "${type} — ${floor}"?`)) return;
        p.floorPlans[type].floors[floor] = '';
        markChanged();
        renderProjectEditor();
      });
    });

    // Delete entire floor
    editor.querySelectorAll('.fp-delete-floor').forEach(btn => {
      btn.addEventListener('click', () => {
        const { type, floor } = btn.dataset;
        if (!confirm(`Delete floor "${floor}" from "${type}"?`)) return;
        delete p.floorPlans[type].floors[floor];
        if (!Object.keys(p.floorPlans[type].floors).length) delete p.floorPlans[type];
        markChanged();
        renderProjectEditor();
      });
    });

    // Delete entire type
    editor.querySelectorAll('.fp-delete-type').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        if (!confirm(`Delete type "${type}" and all its floor plans?`)) return;
        delete p.floorPlans[type];
        markChanged();
        renderProjectEditor();
      });
    });

    // Add floor to type
    editor.querySelectorAll('.fp-add-floor').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const name = prompt('Floor name (e.g. "Upper Floor", "Roof Terrace"):');
        if (!name || !name.trim()) return;
        const trimmed = name.trim();
        if (p.floorPlans[type].floors[trimmed] !== undefined) { alert('This floor already exists'); return; }
        p.floorPlans[type].floors[trimmed] = '';
        markChanged();
        renderProjectEditor();
      });
    });

    // Specs: icon change
    editor.querySelectorAll('.fp-spec-icon').forEach(sel => {
      sel.addEventListener('change', () => {
        const { type, si } = sel.dataset;
        p.floorPlans[type].specs[+si].icon = sel.value;
        markChanged();
      });
    });

    // Specs: text change
    editor.querySelectorAll('.fp-spec-text').forEach(inp => {
      inp.addEventListener('input', () => {
        const { type, si } = inp.dataset;
        p.floorPlans[type].specs[+si].text = inp.value;
        markChanged();
      });
    });

    // Specs: delete
    editor.querySelectorAll('.fp-spec-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const { type, si } = btn.dataset;
        p.floorPlans[type].specs.splice(+si, 1);
        markChanged();
        renderProjectEditor();
      });
    });

    // Specs: add
    editor.querySelectorAll('.fp-add-spec').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        p.floorPlans[type].specs.push({ icon: 'bedrooms', text: '' });
        markChanged();
        renderProjectEditor();
      });
    });

    // Rename plan type
    editor.querySelectorAll('.fp-type__name[data-rename]').forEach(label => {
      label.addEventListener('click', () => {
        const oldName = label.dataset.rename;
        const newName = prompt('Rename plan type:', oldName);
        if (!newName || !newName.trim() || newName.trim() === oldName) return;
        const trimmed = newName.trim();
        if (p.floorPlans[trimmed] !== undefined) { alert('This type already exists'); return; }
        // Rebuild object preserving key order
        const reordered = {};
        Object.keys(p.floorPlans).forEach(k => {
          if (k === oldName) reordered[trimmed] = p.floorPlans[oldName];
          else reordered[k] = p.floorPlans[k];
        });
        p.floorPlans = reordered;
        markChanged();
        renderProjectEditor();
      });
    });

    // Add plan type
    const addPlanBtn = editor.querySelector('#add-plan-type');
    if (addPlanBtn) {
      addPlanBtn.addEventListener('click', () => {
        const name = prompt('Plan type name (e.g. "Type A — 2BR Villa"):');
        if (!name || !name.trim()) return;
        const trimmed = name.trim();
        if (p.floorPlans[trimmed] !== undefined) { alert('This type already exists'); return; }
        p.floorPlans[trimmed] = { floors: { 'Ground Floor': '' }, specs: [] };
        markChanged();
        renderProjectEditor();
      });
    }

    // Arrow buttons to reorder plan types
    editor.querySelectorAll('.fp-move-up, .fp-move-down').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const keys = Object.keys(p.floorPlans);
        const idx = keys.indexOf(type);
        const isUp = btn.classList.contains('fp-move-up');
        const swapIdx = isUp ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= keys.length) return;
        [keys[idx], keys[swapIdx]] = [keys[swapIdx], keys[idx]];
        const reordered = {};
        keys.forEach(k => { reordered[k] = p.floorPlans[k]; });
        p.floorPlans = reordered;
        markChanged();
        renderProjectEditor();
      });
    });

    // Add generate pages button
    addGeneratePagesButton();
  }

  function recalcAvailability() {
    const p = projectsData[currentProject];
    if (!p.units) return;
    const sold = p.units.filter(u => u.status === 'sold' || u.status === 'booked' || u.status === 'resale').length;
    p.availability.sold = sold;
    const soldInput = $('#avail-sold');
    if (soldInput) soldInput.value = sold;
  }

  function markChanged() {
    pendingChanges = true;
    dirtyTabs.projects = true;
    $('#publish-status').textContent = t('projects.unsaved');
    $('#publish-status').className = 'publish-status';
  }

  // ─── Publish ───
  $('#btn-publish').addEventListener('click', async () => {
    if (!pendingChanges) return;
    const btn = $('#btn-publish');
    const status = $('#publish-status');
    btnLoading(btn, true);
    status.textContent = t('projects.publishing');
    status.className = 'publish-status';

    try {
      const dataContent = buildProjectsDataJS();
      await commitFile('data/projects-data.js', dataContent, 'Update project data via admin panel');
      pendingChanges = false;
      dirtyTabs.projects = false;
      status.textContent = t('projects.published');
      status.className = 'publish-status success';
      renderDashboard();
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  function buildProjectsDataJS() {
    // Rebuild the JS file — copy all projects + global fields
    const data = {};
    getProjectKeys().forEach(key => {
      data[key] = projectsData[key];
    });

    // Copy global fields
    const globalKeys = ['comparisonLabels', 'unitTableHeaders', 'statusLabels', 'availabilityLabels', 'villageTableHeaders'];
    globalKeys.forEach(gk => { if (projectsData[gk]) data[gk] = projectsData[gk]; });

    return '/* eslint-disable */\nconst PROJECTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  // ─── SEO Editor ───
  const LANGS = ['en', 'ru', 'id'];
  const LANG_NAMES = { en: 'English', ru: 'Russian', id: 'Indonesian' };
  const BASE_URL = 'https://winstik13.github.io/global-bali-home';
  let seoCache = {}; // { lang: { html, sha, fields } }
  let currentSeoLang = 'en';

  function updateSeoPreviewLink() {
    const link = $('#seo-preview-link');
    if (!link) return;
    const page = $('#seo-page').value;
    if (!page) { link.hidden = true; return; }
    const langPrefix = currentSeoLang === 'en' ? '' : currentSeoLang + '/';
    link.href = `${BASE_URL}/${langPrefix}${page}`;
    link.hidden = false;
  }

  $('#seo-page').addEventListener('change', () => {
    seoCache = {};
    currentSeoLang = 'en';
    const page = $('#seo-page').value;
    const langTabs = $('#seo-lang-tabs');
    if (page) {
      if (langTabs) langTabs.hidden = false;
      // Reset active tab to EN
      langTabs.querySelectorAll('.seo-lang-tab').forEach(b => b.classList.toggle('active', b.dataset.seoLang === 'en'));
      loadAllSEO(page);
    } else {
      if (langTabs) langTabs.hidden = true;
      $('#seo-editor').innerHTML = '';
    }
    updateSeoPreviewLink();
  });

  // Language tab switching
  $('#seo-lang-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.seo-lang-tab');
    if (!btn) return;
    const lng = btn.dataset.seoLang;
    if (lng === currentSeoLang) return;
    // Save current field values before switching
    saveSeoFieldsToCache(currentSeoLang);
    currentSeoLang = lng;
    $('#seo-lang-tabs').querySelectorAll('.seo-lang-tab').forEach(b => b.classList.toggle('active', b.dataset.seoLang === lng));
    renderSeoFields();
    updateSeoPreviewLink();
  });

  function saveSeoFieldsToCache(lng) {
    const editor = $('#seo-editor');
    if (!seoCache[lng]) return;
    editor.querySelectorAll('.seo-input').forEach(inp => {
      seoCache[lng].fields[inp.dataset.seo] = inp.value;
    });
  }

  async function loadAllSEO(page) {
    const editor = $('#seo-editor');
    editor.innerHTML = `<p style="color:var(--color-text-dim)">${t('seo.loadingLangs')}</p>`;

    try {
      // Load all 3 languages in parallel
      const results = await Promise.all(LANGS.map(async (lng) => {
        const path = lng === 'en' ? page : `${lng}/${page}`;
        const file = await fetchFile(path);
        const html = decodeBase64UTF8(file.content);
        const fields = extractSEO(html);
        return { lng, path, html, sha: file.sha, fields };
      }));

      results.forEach(r => { seoCache[r.lng] = r; });
      renderSeoFields();
    } catch (err) {
      editor.innerHTML = `<p style="color:var(--color-danger)">Error: ${escapeHtml(err.message)}</p>`;
    }
  }

  function renderSeoFields() {
    const editor = $('#seo-editor');
    const lng = currentSeoLang;
    const page = $('#seo-page').value;
    if (!seoCache[lng]) return;

    const f = seoCache[lng].fields;
    const langPath = lng === 'en' ? page : `${lng}/${page}`;
    const pageUrl = `${BASE_URL}/${langPath}`;

    let html = '';

    // SERP Preview for current language
    html += `<div class="editor-section seo-preview-section">
      <h3>${t('seo.googlePreview')}</h3>
      <div class="serp-preview">
        <div class="serp-preview__title" id="serp-title">${escAttr(f.title)}</div>
        <div class="serp-preview__url">${pageUrl}</div>
        <div class="serp-preview__desc" id="serp-desc">${escAttr(f.description)}</div>
      </div>
      <h3 style="margin-top:20px">${t('seo.socialPreview')}</h3>
      <div class="og-preview">
        <div class="og-preview__image">${f.ogImage ? `<img src="${escAttr(f.ogImage)}" alt="">` : `<span>${t('seo.noOgImage')}</span>`}</div>
        <div class="og-preview__text">
          <div class="og-preview__site">winstik13.github.io</div>
          <div class="og-preview__title" id="og-title">${escAttr(f.ogTitle || f.title)}</div>
          <div class="og-preview__desc" id="og-desc">${escAttr(f.ogDescription || f.description)}</div>
        </div>
      </div>
    </div>`;

    // Fields for current language only
    html += `<div class="editor-section seo-lang-section">
      ${seoFieldHTML(lng, 'title', t('seo.pageTitle'), f.title, 60)}
      ${seoFieldHTML(lng, 'description', t('seo.metaDesc'), f.description, 160)}
      ${seoFieldHTML(lng, 'ogTitle', t('seo.ogTitle'), f.ogTitle, 60)}
      ${seoFieldHTML(lng, 'ogDescription', t('seo.ogDesc'), f.ogDescription, 160)}
      ${seoFieldHTML(lng, 'ogImage', t('seo.ogImage'), f.ogImage, 0)}
      ${seoFieldHTML(lng, 'canonical', t('seo.canonical'), f.canonical, 0)}
    </div>`;

    // Save button
    html += `<div class="editor-section" style="display:flex;align-items:center;gap:16px">
      <button id="btn-seo-save" class="btn btn--primary">${t('seo.saveAll')}</button>
      <span id="seo-save-status" class="publish-status"></span>
    </div>`;

    editor.innerHTML = html;

    // Bind counters + live SERP preview update
    editor.querySelectorAll('.seo-input').forEach(inp => {
      inp.addEventListener('input', () => {
        dirtyTabs.seo = true;
        updateSEOCounter(inp);
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
          if (el) el.textContent = inp.value || inp.closest('.seo-lang-section').querySelector('[data-seo="title"]').value || '(no title)';
        }
        if (key === 'ogDescription') {
          const el = $('#og-desc');
          if (el) el.textContent = inp.value || inp.closest('.seo-lang-section').querySelector('[data-seo="description"]').value || '';
        }
      });
      updateSEOCounter(inp);
    });

    // Save button — use onclick to avoid stacking listeners on re-render
    $('#btn-seo-save').onclick = saveAllSEO;
  }

  async function saveAllSEO() {
    // Save current fields to cache before saving
    saveSeoFieldsToCache(currentSeoLang);
    const page = $('#seo-page').value;

    const status = $('#seo-save-status');
    const btn = $('#btn-seo-save');
    btnLoading(btn, true);
    status.textContent = t('seo.savingAll');
    status.className = 'publish-status';

    let saved = 0;
    let errors = [];

    for (const lng2 of LANGS) {
      const cache = seoCache[lng2];
      if (!cache) continue;

      try {
        let updated = cache.html;
        const getVal = (key) => cache.fields[key] || '';
        updated = replaceMeta(updated, 'title', getVal('title'));
        updated = replaceMeta(updated, 'description', getVal('description'));
        updated = replaceMeta(updated, 'ogTitle', getVal('ogTitle'));
        updated = replaceMeta(updated, 'ogDescription', getVal('ogDescription'));
        updated = replaceMeta(updated, 'ogImage', getVal('ogImage'));
        updated = replaceMeta(updated, 'canonical', getVal('canonical'));

        const result = await commitFile(cache.path, updated, `Update SEO: ${page} (${lng2})`, cache.sha);
        cache.sha = result.content.sha;
        saved++;
        status.textContent = `${t('common.saving')} ${saved}/${LANGS.length}`;
      } catch (err) {
        errors.push(`${lng2}: ${err.message}`);
      }
    }

    if (errors.length) {
      status.textContent = `Saved ${saved}/${LANGS.length}. Errors: ${errors.join('; ')}`;
      status.className = 'publish-status error';
    } else {
      dirtyTabs.seo = false;
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
    }
    btnLoading(btn, false);
    updateRateLimit();
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

  const galleryPreview = $('#gallery-upload-preview');
  let pendingFiles = []; // files staged for upload

  galleryProject.addEventListener('change', renderGallery);
  galleryUploadBtn.addEventListener('click', () => galleryFileInput.click());
  galleryFileInput.addEventListener('change', (e) => {
    stageFiles(Array.from(e.target.files));
    galleryFileInput.value = '';
  });

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
    if (files.length) stageFiles(files);
  });

  function stageFiles(files) {
    if (!files.length) return;
    // Add to pending, avoiding duplicates by name
    files.forEach(f => {
      if (!pendingFiles.some(p => p.name === f.name)) pendingFiles.push(f);
    });
    renderUploadPreview();
  }

  function renderUploadPreview() {
    if (!pendingFiles.length) {
      galleryPreview.hidden = true;
      galleryPreview.innerHTML = '';
      return;
    }

    const cat = galleryProject.value;
    const data = getGalleryData();
    const existingImages = (data[cat] || []).map(p => p.split('/').pop());

    let html = `<div class="gallery-preview__header">
      <span class="gallery-preview__title">${t('gallery.previewTitle')}: ${pendingFiles.length} ${t('gallery.filesSelected')}</span>
      <div class="gallery-preview__actions">
        <button class="btn btn--primary btn--sm" id="btn-preview-upload">${t('gallery.uploadAll')}</button>
        <button class="btn btn--outline btn--sm" id="btn-preview-cancel">${t('gallery.cancelUpload')}</button>
      </div>
    </div><div class="gallery-preview__grid">`;

    pendingFiles.forEach((file, i) => {
      const isDuplicate = existingImages.includes(file.name);
      const sizeKB = Math.round(file.size / 1024);
      const url = URL.createObjectURL(file);
      html += `<div class="gallery-preview__item${isDuplicate ? ' gallery-preview__item--duplicate' : ''}">
        <img src="${url}" alt="${escAttr(file.name)}">
        <div class="gallery-preview__info">
          <span class="gallery-preview__name">${escAttr(file.name)}</span>
          <span class="gallery-preview__size">${sizeKB} KB</span>
          ${isDuplicate ? `<span class="gallery-preview__warn">${t('gallery.duplicate')}</span>` : ''}
        </div>
        <button class="gallery-preview__remove" data-remove="${i}">&times;</button>
      </div>`;
    });

    html += '</div>';
    galleryPreview.innerHTML = html;
    galleryPreview.hidden = false;

    // Bind remove buttons
    galleryPreview.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingFiles.splice(+btn.dataset.remove, 1);
        renderUploadPreview();
      });
    });

    // Upload all
    $('#btn-preview-upload').addEventListener('click', () => {
      const filesToUpload = [...pendingFiles];
      pendingFiles = [];
      galleryPreview.hidden = true;
      galleryPreview.innerHTML = '';
      handleGalleryUpload(filesToUpload);
    });

    // Cancel
    $('#btn-preview-cancel').addEventListener('click', () => {
      pendingFiles = [];
      galleryPreview.hidden = true;
      galleryPreview.innerHTML = '';
    });
  }

  function renderGallery() {
    const cat = galleryProject.value;
    const noProject = !cat;

    // Hide/show upload controls based on project selection
    galleryUploadBtn.style.display = noProject ? 'none' : '';
    galleryDropZone.style.display = noProject ? 'none' : '';
    galleryCount.style.display = noProject ? 'none' : '';

    if (noProject) {
      galleryGrid.innerHTML = `<div class="empty-state"><div class="empty-state__icon">&#128247;</div><div class="empty-state__text">${t('gallery.selectProject')}</div></div>`;
      return;
    }

    const data = getGalleryData();
    const images = data[cat] || [];

    galleryCount.textContent = `${images.length} ${t('gallery.photos')}`;

    if (!images.length) {
      galleryGrid.innerHTML = `<div class="empty-state"><div class="empty-state__icon">&#128247;</div><div class="empty-state__text">${t('gallery.noImages')}</div></div>`;
      return;
    }

    galleryGrid.innerHTML = images.map((img, i) => {
      const name = img.split('/').pop();
      return `<div class="admin-gallery-item" data-index="${i}">
        <img src="../${img}" alt="${escAttr(name)}" loading="lazy">
        <div class="admin-gallery-item__info">${escAttr(name)}</div>
        <div class="admin-gallery-item__actions">
          <button class="admin-gallery-item__btn admin-gallery-item__btn--up" data-move-up="${i}" title="${t('gallery.moveLeft')}">&#8592;</button>
          <button class="admin-gallery-item__btn admin-gallery-item__btn--down" data-move-down="${i}" title="${t('gallery.moveRight')}">&#8594;</button>
          <button class="admin-gallery-item__btn admin-gallery-item__btn--delete" data-delete="${i}" title="${t('gallery.delete')}">&times;</button>
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
      galleryProgress.innerHTML = `<div class="gallery-progress__text">${t('gallery.uploading')} ${uploaded + 1}/${files.length}: ${escAttr(file.name)}</div>
        <div class="gallery-progress__bar"><div class="gallery-progress__fill" style="width:${Math.round((uploaded / files.length) * 100)}%"></div></div>`;

      try {
        const resized = await resizeImage(file, 1920, 0.8);
        const base64 = resized.split(',')[1];
        const webpName = file.name.replace(/\.[^.]+$/, '.webp');
        const path = `${folder}/${webpName}`;
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
    galleryProgress.innerHTML = `<div class="gallery-progress__text">${t('gallery.savingData')}</div>
      <div class="gallery-progress__bar"><div class="gallery-progress__fill" style="width:100%"></div></div>`;
    await saveGalleryData('Add gallery images via admin panel');

    galleryProgress.innerHTML = `<div class="gallery-progress__text" style="color:var(--color-success)">${uploaded}/${files.length} ${t('gallery.uploaded')}</div>`;
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
    if (!confirm(t('gallery.confirmDelete').replace('{name}', fileName))) return;

    try {
      const file = await fetchFile(images[index]);
      await deleteFile(images[index], file.sha, `Remove gallery image: ${fileName}`);
      images.splice(index, 1);
      await saveGalleryData('Remove gallery image: ' + fileName);
      renderGallery();
      updateRateLimit();
    } catch (err) {
      alert(t('gallery.deleteError') + err.message);
    }
  }

  async function saveGalleryData(message) {
    const data = getGalleryData();
    const content = 'const GALLERY_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
    await commitFile('gallery-data.js', content, message);
  }

  function resizeImage(file, maxWidth, quality) {
    return new Promise((resolve, reject) => {
      if (file.size > 10 * 1024 * 1024) {
        return reject(new Error('File exceeds 10 MB limit'));
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Invalid image file'));
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const result = canvas.toDataURL('image/webp', quality);
          canvas.width = 0;
          canvas.height = 0;
          resolve(result);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ─── File commit lock (prevents race conditions on same file) ───
  const _commitLocks = {};
  async function withCommitLock(path, fn) {
    while (_commitLocks[path]) {
      await _commitLocks[path];
    }
    let resolve;
    _commitLocks[path] = new Promise(r => { resolve = r; });
    try {
      return await fn();
    } finally {
      delete _commitLocks[path];
      resolve();
    }
  }

  // ─── GitHub API Helpers ───
  function decodeBase64UTF8(base64) {
    const binary = atob(base64.replace(/\s/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }

  async function fetchFile(path) {
    const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
      headers: { 'Authorization': `token ${githubPAT}` }
    });
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    return res.json();
  }

  async function commitFile(path, content, message, sha, base64Content) {
    return withCommitLock(path, async () => {
      const MAX_RETRIES = 2;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        // Get current SHA if not provided (or refresh on retry)
        if (!sha || attempt > 0) {
          try {
            const existing = await fetchFile(path);
            sha = existing.sha;
          } catch { sha = null; /* new file */ }
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

        if (res.ok) return res.json();

        // Retry on 409 Conflict (SHA mismatch)
        if (res.status === 409 && attempt < MAX_RETRIES) {
          sha = null;
          continue;
        }

        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
    });
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
    checkDeployStatus();
  }

  // ─── Deploy Status Indicator ───
  let deployPollTimer = null;

  async function checkDeployStatus() {
    const el = $('#deploy-status');
    if (!el) return;
    try {
      const res = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs?per_page=1&branch=master`, {
        headers: { 'Authorization': `token ${githubPAT}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      const run = data.workflow_runs && data.workflow_runs[0];
      if (!run) return;

      const dot = el.querySelector('.admin-header__deploy-dot');
      const txt = el.querySelector('.admin-header__deploy-text');
      el.hidden = false;

      if (run.status === 'in_progress' || run.status === 'queued' || run.status === 'waiting') {
        el.className = 'admin-header__deploy admin-header__deploy--pending';
        txt.setAttribute('data-i18n', 'deploy.deploying');
        txt.textContent = t('deploy.deploying');
        // Poll every 15s
        if (deployPollTimer) clearTimeout(deployPollTimer);
        deployPollTimer = setTimeout(checkDeployStatus, 15000);
      } else if (run.conclusion === 'success') {
        el.className = 'admin-header__deploy admin-header__deploy--success';
        txt.setAttribute('data-i18n', 'deploy.live');
        txt.textContent = t('deploy.live');
        if (deployPollTimer) { clearTimeout(deployPollTimer); deployPollTimer = null; }
        // Hide after 30s
        setTimeout(() => { el.hidden = true; }, 30000);
      } else {
        el.className = 'admin-header__deploy admin-header__deploy--failed';
        txt.setAttribute('data-i18n', 'deploy.failed');
        txt.textContent = t('deploy.failed');
        if (deployPollTimer) { clearTimeout(deployPollTimer); deployPollTimer = null; }
      }
    } catch { /* ignore — no Actions access or network error */ }
  }

  // ─── Generate Detail Pages ───
  function getLangConfigs(p) {
    return [
      { lang: 'en', langFull: 'English', prefix: '', htmlLang: 'en', path: p.page },
      { lang: 'ru', langFull: 'Русский', prefix: '../', htmlLang: 'ru', path: `ru/${p.page}` },
      { lang: 'id', langFull: 'Bahasa Indonesia', prefix: '../', htmlLang: 'id', path: `id/${p.page}` },
    ];
  }

  function addGeneratePagesButton() {
    const actions = $('.editor-actions');
    if (!actions) return;
    // Remove existing buttons
    const existing = $('#btn-generate-pages');
    if (existing) existing.remove();
    const existingSeo = $('#btn-update-seo-only');
    if (existingSeo) existingSeo.remove();

    const btn = document.createElement('button');
    btn.id = 'btn-generate-pages';
    btn.className = 'btn btn--outline';
    btn.textContent = t('projects.generatePages');
    actions.appendChild(btn);

    const btnSeo = document.createElement('button');
    btnSeo.id = 'btn-update-seo-only';
    btnSeo.className = 'btn btn--outline';
    btnSeo.textContent = t('projects.updateSeoOnly');
    actions.appendChild(btnSeo);

    // Generate full pages
    btn.addEventListener('click', async () => {
      const p = projectsData[currentProject];
      if (!p) return;

      // Check if pages already exist
      let pageExists = false;
      try { await fetchFile(p.page); pageExists = true; } catch { /* new file */ }

      if (pageExists) {
        const msg = t('projects.overwriteWarn').replace('{name}', p.name);
        if (!confirm(msg)) return;
      }

      btnLoading(btn, true);
      const status = $('#publish-status');

      try {
        const langConfigs = getLangConfigs(p);
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
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(btn, false);
      updateRateLimit();
    });

    // Update SEO only — preserve page content, update only meta tags
    btnSeo.addEventListener('click', async () => {
      const p = projectsData[currentProject];
      if (!p) return;

      btnLoading(btnSeo, true);
      const status = $('#publish-status');
      status.textContent = '';
      status.className = 'publish-status';

      try {
        const langConfigs = getLangConfigs(p);
        let updated = 0;

        for (const cfg of langConfigs) {
          let file;
          try { file = await fetchFile(cfg.path); } catch { continue; } // skip if page doesn't exist

          let html = decodeBase64UTF8(file.content);
          const desc = (p.showcaseDesc && (p.showcaseDesc[cfg.lang] || p.showcaseDesc.en)) || p.name;
          const image = p.showcaseImage ? `https://winstik13.github.io/global-bali-home/${p.showcaseImage}` : '';

          html = replaceMeta(html, 'title', `${p.name} — Global Bali Home`);
          html = replaceMeta(html, 'description', desc);
          html = replaceMeta(html, 'ogTitle', `${p.name} — Global Bali Home`);
          html = replaceMeta(html, 'ogDescription', desc);
          if (image) html = replaceMeta(html, 'ogImage', image);
          // Update JSON-LD price
          if (p.startingPrice) {
            html = html.replace(/"lowPrice":\s*"[^"]*"/, `"lowPrice": "${p.startingPrice}"`);
          }

          await commitFile(cfg.path, html, `Update SEO: ${p.name} (${cfg.lang})`, file.sha);
          updated++;
          status.textContent = `Updating SEO... ${updated}/${langConfigs.length}`;
        }

        status.textContent = updated ? `SEO updated for ${updated} pages!` : 'No existing pages found';
        status.className = 'publish-status success';
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(btnSeo, false);
      updateRateLimit();
    });
  }

  const PAGE_LABELS = {
    en: { home: 'Home', projects: 'Projects', services: 'Services', about: 'About', gallery: 'Gallery', contact: 'Contact', findVilla: 'Find My Villa', nav: 'Navigation', concept: 'The Concept', conceptTitle: 'About This Project', availability: 'Availability', unitSelection: 'Unit Selection', galleryTitle: 'Project Images', viewPhotos: 'View Photos', interested: 'Interested in', getConsult: 'Get a Consultation', wantToSee: 'Want to see it in person?', scheduleTour: 'Schedule a Private Tour', investmentDetails: 'Investment Details', footer: 'Global Bali Home is an international real estate company focused on the development of high-quality properties in Bali.', copyright: '&copy; 2024–2026 Global Bali Home. All rights reserved.' },
    ru: { home: 'Главная', projects: 'Проекты', services: 'Услуги', about: 'О нас', gallery: 'Галерея', contact: 'Контакты', findVilla: 'Найти виллу', nav: 'Навигация', concept: 'Концепция', conceptTitle: 'О проекте', availability: 'Доступность', unitSelection: 'Выбор юнитов', galleryTitle: 'Фотографии проекта', viewPhotos: 'Смотреть фото', interested: 'Интересует', getConsult: 'Получить консультацию', wantToSee: 'Хотите увидеть лично?', scheduleTour: 'Записаться на приватный тур', investmentDetails: 'Детали инвестиций', footer: 'Global Bali Home — международная компания по строительству премиальной недвижимости на Бали.', copyright: '&copy; 2024–2026 Global Bali Home. Все права защищены.' },
    id: { home: 'Beranda', projects: 'Proyek', services: 'Layanan', about: 'Tentang', gallery: 'Galeri', contact: 'Kontak', findVilla: 'Temukan Villa', nav: 'Navigasi', concept: 'Konsep', conceptTitle: 'Tentang Proyek Ini', availability: 'Ketersediaan', unitSelection: 'Pilihan Unit', galleryTitle: 'Galeri Proyek', viewPhotos: 'Lihat Foto', interested: 'Tertarik dengan', getConsult: 'Hubungi Kami', wantToSee: 'Ingin melihat langsung?', scheduleTour: 'Jadwalkan Tur Pribadi', investmentDetails: 'Detail Investasi', footer: 'Global Bali Home adalah perusahaan real estate internasional yang fokus pada pengembangan properti berkualitas tinggi di Bali.', copyright: '&copy; 2024–2026 Global Bali Home. Hak cipta dilindungi.' },
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

  <!-- Gallery -->
  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-header__tag">${L.gallery}</span>
        <h2>${L.galleryTitle}</h2>
      </div>
      <div class="photo-mosaic reveal-stagger" data-project-gallery="${slug}"></div>
      <div class="photo-mosaic__more reveal">
        <a href="gallery.html#${slug.replace('serenity-', '')}" class="btn btn--outline">${L.viewPhotos}</a>
      </div>
      <div class="tour-cta-inline reveal">
        <p>${L.wantToSee}</p>
        <button class="btn btn--primary" data-tour="${escAttr(proj.name)}">${L.scheduleTour}</button>
      </div>
    </div>
  </section>

  <!-- ROI Calculator (auto-rendered) -->
  <section data-roi-calc data-project="${slug}"></section>

  <section class="cta-section logo-watermark logo-watermark--right">
    <div class="container reveal">
      <h2>${L.interested} ${proj.name}?</h2>
      <p>${escAttr(desc)}</p>
      <button class="btn btn--primary" data-tour="${escAttr(proj.name)}">${L.scheduleTour}</button>
      <button class="btn btn--outline" data-quiz style="margin-left:12px;">${L.investmentDetails}</button>
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
          <p class="footer__contact-item" data-contact="phone">+62 813 251 438 49</p>
          <p class="footer__contact-item" data-contact="email">office@globalbalihome.com</p>
          <p class="footer__contact-item" data-contact="location">Bali, Indonesia</p>
          <div class="footer__social"><a href="https://www.facebook.com/serenityvillasbali" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a><a href="https://www.instagram.com/serenity_villas_bali" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a></div>
        </div>
      </div>
      <div class="footer__bottom">${L.copyright}</div>
    </div>
  </footer>

  <a href="https://wa.me/6281338741177" class="whatsapp-float" data-contact="whatsapp-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
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
      "addressLocality": "Bali",
      "addressRegion": "Bali",
      "addressCountry": "ID"
    }
  }
  </script>
  <script src="${p}data/projects-data.js" defer></script>
  <script src="${p}data/site-data.js" defer></script>
  <script src="${p}gallery-data.js" defer></script>
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
          <h2>${t('newProject.title')}</h2>
          <button class="admin-modal__close">&times;</button>
        </div>
        <div class="admin-modal__body">
          <div class="form-group"><label>${t('newProject.name')}</label><input type="text" id="np-name" placeholder="e.g. Serenity Heights"></div>
          <div class="form-group"><label>${t('newProject.slug')}</label><input type="text" id="np-slug" placeholder="serenity-heights"><small class="field-hint">${t('newProject.slugHint')}</small></div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.status')}</label>
              <select id="np-status"><option value="pre-sale">Pre-Sale</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select>
            </div>
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.startingPrice')}</label><input type="number" id="np-price" placeholder="119000" min="0" step="1000"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.totalUnits')}</label><input type="number" id="np-units" value="1" min="1"></div>
          </div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.bedrooms')}</label><input type="text" id="np-bedrooms" placeholder="2–3"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.handover')}</label><input type="text" id="np-handover" placeholder="Q1 2028"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.showcaseImage')}</label><input type="text" id="np-image" placeholder="images/project/hero.webp"></div>
          </div>
          <h3 style="margin-top:16px">${t('newProject.showcaseText')}</h3>
          <div class="form-group"><label>${t('newProject.subtitle')}</label><input type="text" id="np-subtitle" placeholder="12 modern villas with jungle views"></div>
          <div class="form-group"><label>${t('newProject.desc')}</label><textarea id="np-desc" rows="2" placeholder="Full description for projects page"></textarea></div>
          <h3 style="margin-top:16px">${t('newProject.comparisonData')}</h3>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:120px"><label>${t('newProject.areaRange')}</label><input type="text" id="np-area" placeholder="100–200 m²"></div>
            <div class="form-group" style="flex:1;min-width:120px"><label>${t('newProject.landRange')}</label><input type="text" id="np-land" placeholder="2–3 are"></div>
            <div class="form-group" style="flex:1;min-width:120px"><label>${t('newProject.pool')}</label><input type="text" id="np-pool" placeholder="Private"></div>
          </div>
        </div>
        <div class="admin-modal__footer">
          <button class="btn btn--outline" id="np-cancel">${t('newProject.cancel')}</button>
          <button class="btn btn--primary" id="np-create">${t('newProject.create')}</button>
        </div>
      </div>`;

    document.body.appendChild(modal);

    // Auto-generate slug from name (stops if user edits slug manually)
    let slugManuallyEdited = false;
    $('#np-slug').addEventListener('input', () => { slugManuallyEdited = true; });
    $('#np-name').addEventListener('input', () => {
      if (slugManuallyEdited) return;
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
      if (!name || !slug) { alert(t('newProject.nameRequired')); return; }
      if (projectsData[slug]) { alert(t('newProject.slugExists')); return; }

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
        showcaseStatus: {
          en: status === 'pre-sale' ? 'Pre-Sale' : status === 'completed' ? 'Completed' : 'In Progress',
          ru: status === 'pre-sale' ? 'Предпродажа' : status === 'completed' ? 'Завершён' : 'Строится',
          id: status === 'pre-sale' ? 'Pra-Penjualan' : status === 'completed' ? 'Selesai' : 'Dalam Pembangunan',
        },
        positioning: {
          en: 'Investment Opportunity',
          ru: 'Инвестиционная возможность',
          id: 'Peluang Investasi',
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
    if (!siteData.contacts) siteData.contacts = { phone: '', phoneRaw: '', whatsapp: '', email: '', location: { en: '', ru: '', id: '' } };
    if (!siteData.exitPopup) siteData.exitPopup = { enabled: true, delay: 30, texts: { en: {}, ru: {}, id: {} } };
  }

  function renderRateInfo() {
    if (!siteData) loadSiteData();
    const info = $('#rate-info');
    const input = $('#rate-input');
    const autoBox = $('#rate-auto');
    if (!info) return;
    const rate = siteData.exchangeRate;
    input.value = rate.usdToIdr;
    if (autoBox) {
      autoBox.checked = !!rate.auto;
      input.disabled = !!rate.auto;
    }
    if (rate.updatedAt) {
      const modeLabel = rate.auto ? ' ' + t('rate.autoMode') : ' ' + t('rate.manual');
      info.innerHTML = `<p><strong>${t('rate.currentRate')}</strong> 1 USD = ${Number(rate.usdToIdr).toLocaleString('id-ID')} IDR${modeLabel} &bull; <strong>${t('rate.updated')}</strong> ${rate.updatedAt}</p>`;
    } else {
      info.innerHTML = `<p style="color:var(--color-text-dim)">${t('rate.defaultMsg')}</p>`;
    }
  }

  // Track rate changes
  const rateInput = $('#rate-input');
  if (rateInput) rateInput.addEventListener('input', () => { dirtyTabs.rate = true; });

  // Auto-rate checkbox toggle
  const rateAutoBox = $('#rate-auto');
  if (rateAutoBox) {
    rateAutoBox.addEventListener('change', async () => {
      dirtyTabs.rate = true;
      const input = $('#rate-input');
      input.disabled = rateAutoBox.checked;
      if (rateAutoBox.checked) {
        // Fetch live rate and fill input
        try {
          const res = await fetch('https://open.er-api.com/v6/latest/USD');
          const data = await res.json();
          if (data.result === 'success' && data.rates && data.rates.IDR) {
            input.value = Math.round(data.rates.IDR);
          }
        } catch (e) { /* keep current value */ }
      }
    });
  }

  const rateSaveBtn = $('#btn-rate-save');
  if (rateSaveBtn) {
    rateSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const input = $('#rate-input');
      const newRate = parseInt(input.value, 10);
      if (!newRate || newRate < 1000) { alert(t('rate.invalidRate')); return; }

      btnLoading(rateSaveBtn, true);
      const status = $('#rate-save-status');
      status.textContent = t('common.saving');
      status.className = 'publish-status';

      try {
        siteData.exchangeRate.usdToIdr = newRate;
        siteData.exchangeRate.auto = !!(rateAutoBox && rateAutoBox.checked);
        siteData.exchangeRate.updatedAt = new Date().toISOString().split('T')[0];
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update exchange rate: 1 USD = ' + newRate + ' IDR');
        dirtyTabs.rate = false;
        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        renderRateInfo();
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(rateSaveBtn, false);
    });
  }

  function renderGuideInfo() {
    if (!siteData) loadSiteData();
    const info = $('#guide-info');
    if (!info) return;
    const guide = siteData.investmentGuide;
    if (guide.updatedAt) {
      info.innerHTML = `<p><strong>${t('guide.currentFile')}</strong> ${escAttr(guide.path)}</p><p><strong>${t('guide.version')}</strong> ${guide.version} &bull; <strong>${t('guide.updated')}</strong> ${guide.updatedAt}</p>`;
    } else {
      info.innerHTML = `<p style="color:var(--color-text-dim)">${t('guide.noFile')}</p>`;
    }
  }

  // ─── Contact Info Editor ───
  function sanitizeWhatsApp(val) {
    return val.replace(/[\s\-\(\)\+]/g, '');
  }

  function validateWhatsApp(val) {
    if (!val) return { ok: false, msg: t('validate.wa.required') };
    if (/[^0-9]/.test(val)) return { ok: false, msg: t('validate.wa.digitsOnly') };
    if (val.length < 10) return { ok: false, msg: t('validate.wa.tooShort') };
    if (val.length > 15) return { ok: false, msg: t('validate.wa.tooLong') };
    return { ok: true };
  }

  function updateWaPreview() {
    const input = $('#contact-whatsapp');
    const preview = $('#wa-preview');
    if (!input || !preview) return;
    const clean = sanitizeWhatsApp(input.value);
    if (clean !== input.value) input.value = clean;
    const result = validateWhatsApp(clean);
    if (!clean) {
      preview.textContent = '';
      input.classList.remove('input--error', 'input--ok');
      return;
    }
    if (result.ok) {
      preview.textContent = t('validate.wa.link') + clean;
      preview.classList.remove('field-hint--error');
      input.classList.remove('input--error');
      input.classList.add('input--ok');
    } else {
      preview.textContent = result.msg;
      preview.classList.add('field-hint--error');
      input.classList.add('input--error');
      input.classList.remove('input--ok');
    }
  }

  function validatePhone(val) {
    if (!val) return { ok: false, msg: t('validate.phone.required') };
    const digits = val.replace(/[^0-9]/g, '');
    if (digits.length < 10) return { ok: false, msg: t('validate.phone.tooShort') };
    return { ok: true };
  }

  function renderContactsForm() {
    if (!siteData) loadSiteData();
    const c = siteData.contacts || {};
    const v = (id, val) => { const el = $('#' + id); if (el) el.value = val || ''; };
    v('contact-phone', c.phone);
    v('contact-whatsapp', c.whatsapp);
    v('contact-email', c.email);
    if (c.location && typeof c.location === 'object') {
      v('contact-location-en', c.location.en);
      v('contact-location-ru', c.location.ru);
      v('contact-location-id', c.location.id);
    }
    // Attach live validation
    const waInput = $('#contact-whatsapp');
    if (waInput) {
      waInput.addEventListener('input', updateWaPreview);
      waInput.addEventListener('paste', () => setTimeout(updateWaPreview, 0));
      updateWaPreview();
    }

    // Track contacts changes
    ['contact-phone', 'contact-whatsapp', 'contact-email', 'contact-location-en', 'contact-location-ru', 'contact-location-id'].forEach(id => {
      const el = $('#' + id);
      if (el) el.addEventListener('input', () => { dirtyTabs.contacts = true; });
    });
  }

  const contactsSaveBtn = $('#btn-contacts-save');
  if (contactsSaveBtn) {
    contactsSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const g = (id) => ($('#' + id) || {}).value || '';
      // Validate before saving
      const waVal = sanitizeWhatsApp(g('contact-whatsapp'));
      const waCheck = validateWhatsApp(waVal);
      const phoneCheck = validatePhone(g('contact-phone'));
      const status = $('#contacts-save-status');
      if (!waCheck.ok) {
        status.textContent = 'WhatsApp: ' + waCheck.msg;
        status.className = 'publish-status error';
        updateWaPreview();
        return;
      }
      if (!phoneCheck.ok) {
        status.textContent = 'Phone: ' + phoneCheck.msg;
        status.className = 'publish-status error';
        return;
      }
      siteData.contacts = {
        phone: g('contact-phone'),
        phoneRaw: g('contact-phone').replace(/[\s\-\+]/g, ''),
        whatsapp: waVal,
        email: g('contact-email'),
        location: {
          en: g('contact-location-en'),
          ru: g('contact-location-ru'),
          id: g('contact-location-id')
        }
      };

      btnLoading(contactsSaveBtn, true);
      status.textContent = t('common.saving');
      status.className = 'publish-status';

      try {
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update contact info via admin panel');
        dirtyTabs.contacts = false;
        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(contactsSaveBtn, false);
    });
  }

  const guideUploadBtn = $('#btn-guide-upload');
  const guideFileInput = $('#guide-file-input');

  if (guideUploadBtn && guideFileInput) {
    guideUploadBtn.addEventListener('click', () => guideFileInput.click());

    guideFileInput.addEventListener('change', async () => {
      const file = guideFileInput.files[0];
      if (!file) return;
      if (!file.name.endsWith('.pdf')) {
        alert(t('guide.selectPdf'));
        return;
      }

      const status = $('#guide-upload-status');
      btnLoading(guideUploadBtn, true);
      status.textContent = t('guide.uploading');
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

        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        renderGuideInfo();
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(guideUploadBtn, false);
      guideFileInput.value = '';
    });
  }

  // ─── Social Media ───
  function renderSocialForm() {
    if (!siteData) return;
    const social = siteData.social || {};
    $('#social-facebook').value = social.facebook || '';
    $('#social-instagram').value = social.instagram || '';
  }

  $('#btn-social-save')?.addEventListener('click', async () => {
    const btn = $('#btn-social-save');
    const status = $('#social-save-status');
    btnLoading(btn, true);
    try {
      if (!siteData.social) siteData.social = {};
      siteData.social.facebook = $('#social-facebook').value.trim();
      siteData.social.instagram = $('#social-instagram').value.trim();
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update social media links via admin');
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // ─── ROI Calculator Settings ───
  function renderRoiForm() {
    if (!siteData) return;
    const roi = siteData.roi || {};
    $('#roi-min').value = roi.minInvestment || 100000;
    $('#roi-max').value = roi.maxInvestment || 1000000;
    $('#roi-step').value = roi.step || 10000;
    $('#roi-default').value = roi.defaultInvestment || 335000;
    $('#roi-occ-default').value = roi.defaultOccupancy || 80;
    $('#roi-occ-min').value = roi.minOccupancy || 50;
    $('#roi-occ-max').value = roi.maxOccupancy || 95;
    const sc = roi.scenarios || {};
    $('#roi-cons-yield').value = (sc.conservative?.yield || 0.08) * 100;
    $('#roi-cons-growth').value = (sc.conservative?.growth || 0.06) * 100;
    $('#roi-norm-yield').value = (sc.normal?.yield || 0.12) * 100;
    $('#roi-norm-growth').value = (sc.normal?.growth || 0.10) * 100;
    $('#roi-opt-yield').value = (sc.optimistic?.yield || 0.15) * 100;
    $('#roi-opt-growth').value = (sc.optimistic?.growth || 0.12) * 100;
  }

  $('#btn-roi-save')?.addEventListener('click', async () => {
    const btn = $('#btn-roi-save');
    const status = $('#roi-save-status');
    btnLoading(btn, true);
    try {
      // Preserve existing texts when saving numeric params
      const existingTexts = (siteData.roi && siteData.roi.texts) || undefined;
      siteData.roi = {
        minInvestment: parseInt($('#roi-min').value) || 100000,
        maxInvestment: parseInt($('#roi-max').value) || 1000000,
        step: parseInt($('#roi-step').value) || 10000,
        defaultInvestment: parseInt($('#roi-default').value) || 335000,
        minOccupancy: parseInt($('#roi-occ-min').value) || 50,
        maxOccupancy: parseInt($('#roi-occ-max').value) || 95,
        occupancyStep: 5,
        defaultOccupancy: parseInt($('#roi-occ-default').value) || 80,
        scenarios: {
          conservative: { yield: parseFloat($('#roi-cons-yield').value) / 100 || 0.08, growth: parseFloat($('#roi-cons-growth').value) / 100 || 0.06 },
          normal: { yield: parseFloat($('#roi-norm-yield').value) / 100 || 0.12, growth: parseFloat($('#roi-norm-growth').value) / 100 || 0.10 },
          optimistic: { yield: parseFloat($('#roi-opt-yield').value) / 100 || 0.15, growth: parseFloat($('#roi-opt-growth').value) / 100 || 0.12 }
        }
      };
      if (existingTexts) siteData.roi.texts = existingTexts;
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update ROI calculator parameters via admin');
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // ─── ROI Calculator Texts (i18n) ───
  const ROI_TEXT_KEYS = [
    { key: 'tag', label: 'Tag (eyebrow)' },
    { key: 'title', label: 'Title — Homepage' },
    { key: 'titleProject', label: 'Title — Project page (use {project})' },
    { key: 'subtitle', label: 'Subtitle — Homepage' },
    { key: 'subtitleProject', label: 'Subtitle — Project page' },
    { key: 'investmentLabel', label: 'Investment Amount label' },
    { key: 'scenarioLabel', label: 'Scenario label' },
    { key: 'conservative', label: 'Conservative scenario name' },
    { key: 'normal', label: 'Normal scenario name' },
    { key: 'optimistic', label: 'Optimistic scenario name' },
    { key: 'yieldSuffix', label: 'Yield suffix (e.g. "yield")' },
    { key: 'occupancyLabel', label: 'Occupancy Rate label' },
    { key: 'annualIncome', label: 'Annual Rental Income label' },
    { key: 'return5y', label: '5-Year Return label' },
    { key: 'return10y', label: '10-Year Return label' },
    { key: 'disclaimer', label: 'Disclaimer (small text under results)' },
    { key: 'ctaHome', label: 'CTA button — Homepage' },
    { key: 'ctaProject', label: 'CTA button — Project page' },
  ];
  const ROI_TEXT_DEFAULTS = {
    en: { tag: 'Investment Calculator', title: 'Calculate Your Returns', titleProject: 'Calculate Returns for {project}', subtitle: 'See the potential of your Bali real estate investment', subtitleProject: 'See the potential income from your investment in this project', investmentLabel: 'Investment Amount', scenarioLabel: 'Scenario', conservative: 'Conservative', normal: 'Normal', optimistic: 'Optimistic', yieldSuffix: 'yield', occupancyLabel: 'Occupancy Rate', annualIncome: 'Annual Rental Income', return5y: '5-Year Total Return', return10y: '10-Year Total Return', disclaimer: '*Projections based on current market data. Actual returns may vary.', ctaHome: 'Discuss Your Investment', ctaProject: 'Schedule a Private Tour' },
    ru: { tag: 'Инвестиционный калькулятор', title: 'Рассчитайте доходность', titleProject: 'Рассчитайте доходность {project}', subtitle: 'Оцените потенциал инвестиций в недвижимость на Бали', subtitleProject: 'Оцените потенциальный доход от инвестиций в этот проект', investmentLabel: 'Сумма инвестиций', scenarioLabel: 'Сценарий', conservative: 'Консервативный', normal: 'Обычный', optimistic: 'Оптимистичный', yieldSuffix: 'доходность', occupancyLabel: 'Заполняемость', annualIncome: 'Годовой доход от аренды', return5y: 'Общий доход за 5 лет', return10y: 'Общий доход за 10 лет', disclaimer: '*Прогнозы основаны на текущих рыночных данных.', ctaHome: 'Обсудить инвестиции', ctaProject: 'Записаться на приватный тур' },
    id: { tag: 'Kalkulator Investasi', title: 'Hitung Keuntungan Anda', titleProject: 'Hitung Imbal Hasil {project}', subtitle: 'Lihat potensi investasi properti Bali Anda', subtitleProject: 'Lihat potensi pendapatan dari investasi Anda di proyek ini', investmentLabel: 'Jumlah Investasi', scenarioLabel: 'Skenario', conservative: 'Konservatif', normal: 'Normal', optimistic: 'Optimistis', yieldSuffix: 'imbal hasil', occupancyLabel: 'Tingkat Hunian', annualIncome: 'Pendapatan Sewa Tahunan', return5y: 'Total Imbal Hasil 5 Tahun', return10y: 'Total Imbal Hasil 10 Tahun', disclaimer: '*Proyeksi berdasarkan data pasar terkini.', ctaHome: 'Diskusikan Investasi Anda', ctaProject: 'Jadwalkan Tur Pribadi' },
  };
  let roiTextsActiveLang = 'en';

  function renderRoiTextsPane() {
    const pane = $('#roi-texts-pane');
    if (!pane) return;
    const lang = roiTextsActiveLang;
    const texts = (siteData.roi && siteData.roi.texts && siteData.roi.texts[lang]) || ROI_TEXT_DEFAULTS[lang];
    let html = '';
    ROI_TEXT_KEYS.forEach(({ key, label }) => {
      const val = (texts[key] || '').replace(/"/g, '&quot;');
      const isLong = key === 'disclaimer' || key === 'subtitle' || key === 'subtitleProject';
      html += `<div class="form-group"><label>${label}</label>` +
        (isLong
          ? `<textarea class="roi-text-input" data-roi-text="${key}" rows="2">${val}</textarea>`
          : `<input type="text" class="roi-text-input" data-roi-text="${key}" value="${val}">`) +
        `</div>`;
    });
    pane.innerHTML = html;
  }

  function renderRoiTextsForm() {
    if (!siteData) return;
    if (!siteData.roi) siteData.roi = {};
    if (!siteData.roi.texts) siteData.roi.texts = JSON.parse(JSON.stringify(ROI_TEXT_DEFAULTS));
    roiTextsActiveLang = 'en';
    const tabs = document.querySelectorAll('#roi-texts-tabs .lang-tab');
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.lang === 'en');
      t.onclick = () => {
        // Save current pane values into siteData first
        captureRoiTextsPane();
        roiTextsActiveLang = t.dataset.lang;
        tabs.forEach(x => x.classList.toggle('active', x.dataset.lang === roiTextsActiveLang));
        renderRoiTextsPane();
      };
    });
    renderRoiTextsPane();
  }

  function captureRoiTextsPane() {
    const lang = roiTextsActiveLang;
    if (!siteData.roi.texts[lang]) siteData.roi.texts[lang] = {};
    document.querySelectorAll('#roi-texts-pane .roi-text-input').forEach(inp => {
      siteData.roi.texts[lang][inp.dataset.roiText] = inp.value;
    });
  }

  $('#btn-roi-texts-save')?.addEventListener('click', async () => {
    const btn = $('#btn-roi-texts-save');
    const status = $('#roi-texts-status');
    btnLoading(btn, true);
    try {
      captureRoiTextsPane();
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update calculator texts via admin');
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // ─── Company Statistics ───
  const STAT_KEYS = ['investorsWorldwide', 'villasDesigned', 'occupancyRate', 'founderExperience', 'touristArrivals', 'rentalYield', 'propertyGrowth', 'paybackPeriod'];

  function updateStatsPreview() {
    STAT_KEYS.forEach(key => {
      const preview = $(`#sp-${key}`);
      const input = $(`#stat-${key}`);
      if (preview && input) preview.textContent = input.value || '—';
    });
  }

  function renderStatsForm() {
    if (!siteData) return;
    const stats = siteData.stats || {};
    STAT_KEYS.forEach(key => {
      const el = $(`#stat-${key}`);
      if (el) el.value = stats[key] || '';
    });
    updateStatsPreview();
  }

  // Live stats preview
  STAT_KEYS.forEach(key => {
    const el = $(`#stat-${key}`);
    if (el) el.addEventListener('input', () => { updateStatsPreview(); });
  });

  $('#btn-stats-save')?.addEventListener('click', async () => {
    const btn = $('#btn-stats-save');
    const status = $('#stats-save-status');
    btnLoading(btn, true);
    try {
      if (!siteData.stats) siteData.stats = {};
      STAT_KEYS.forEach(key => {
        const el = $(`#stat-${key}`);
        if (el) siteData.stats[key] = el.value.trim();
      });
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update company statistics via admin');
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // ─── FAQ Editor ───
  let faqData = null;
  // faqChanged is now dirtyTabs.faq
  let faqPreviewLang = 'en';

  function loadFaqData() {
    if (typeof FAQ_DATA !== 'undefined') {
      faqData = JSON.parse(JSON.stringify(FAQ_DATA));
    } else {
      faqData = [];
    }
  }

  function updateFaqPreview() {
    const container = $('#faq-preview');
    if (!container || !faqData) return;
    const sorted = faqData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
    if (!sorted.length) {
      container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.8rem;text-align:center;padding:24px 0">' + t('faq.noItems') + '</p>';
      return;
    }
    container.innerHTML = sorted.map((item, idx) => {
      const q = item.question[faqPreviewLang] || item.question.en || '';
      const a = item.answer[faqPreviewLang] || item.answer.en || '';
      return '<div class="faq-preview__item' + (idx === 0 ? ' open' : '') + '">' +
        '<div class="faq-preview__q">' + escapeHtml(q) + '</div>' +
        '<div class="faq-preview__a"><div class="faq-preview__a-inner">' + escapeHtml(a) + '</div></div></div>';
    }).join('');
    container.querySelectorAll('.faq-preview__q').forEach(q => {
      q.addEventListener('click', () => {
        q.parentElement.classList.toggle('open');
      });
    });
  }

  function renderFaqEditor() {
    if (!faqData) loadFaqData();
    const editor = $('#faq-editor');
    if (!editor) return;

    const sorted = faqData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));

    if (!sorted.length) {
      editor.innerHTML = `<div class="empty-state"><div class="empty-state__icon">&#10067;</div><div class="empty-state__text">${t('faq.noItems')}</div></div>`;
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
          <div class="faq-editor-lang__label">${LANG_NAMES[lng]}${lng !== 'en' ? ` <button class="btn btn--outline btn--xs" data-faq-copy-en="${i}" data-faq-copy-lng="${lng}">${t('faq.copyFromEn')}</button>` : ''}</div>
          <div class="form-group"><label>${t('faq.question')}</label><input type="text" data-faq-field="question" data-faq-i="${i}" data-faq-lng="${lng}" value="${escAttr(item.question[lng] || '')}"></div>
          <div class="form-group"><label>${t('faq.answer')}</label><textarea data-faq-field="answer" data-faq-i="${i}" data-faq-lng="${lng}" rows="3">${escAttr(item.answer[lng] || '')}</textarea></div>
        </div>`).join('')}
      </div>`;
    }).join('');

    updateFaqPreview();

    // Bind input events
    editor.querySelectorAll('[data-faq-field]').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.faqI;
        const field = el.dataset.faqField;
        const lng = el.dataset.faqLng;
        faqData[i][field][lng] = el.value;
        faqPreviewLang = lng;
        dirtyTabs.faq = true;
        updateFaqPreview();
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
        dirtyTabs.faq = true;
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
        dirtyTabs.faq = true;
        renderFaqEditor();
      });
    });

    // Delete
    editor.querySelectorAll('[data-faq-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm(t('faq.confirmDelete'))) return;
        const i = +btn.dataset.faqDelete;
        faqData.splice(i, 1);
        dirtyTabs.faq = true;
        renderFaqEditor();
      });
    });

    // Copy from EN
    editor.querySelectorAll('[data-faq-copy-en]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.faqCopyEn;
        const lng = btn.dataset.faqCopyLng;
        ['question', 'answer'].forEach(field => {
          faqData[i][field][lng] = faqData[i][field].en || '';
        });
        dirtyTabs.faq = true;
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
      dirtyTabs.faq = true;
      renderFaqEditor();
    });
  }

  // Publish FAQ
  const faqPublishBtn = $('#btn-faq-publish');
  if (faqPublishBtn) {
    faqPublishBtn.addEventListener('click', async () => {
      if (!dirtyTabs.faq || !faqData) return;
      btnLoading(faqPublishBtn, true);
      const status = $('#faq-publish-status');
      status.textContent = t('faq.publishing');
      status.className = 'publish-status';

      try {
        const content = buildFaqDataJS();
        await commitFile('data/faq-data.js', content, 'Update FAQ data via admin panel');
        dirtyTabs.faq = false;
        status.textContent = t('faq.published');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(faqPublishBtn, false);
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

  // ─── Testimonials Editor ───
  const LANGS_FULL = { en: 'English', ru: 'Русский', id: 'Bahasa Indonesia' };
  let testimonialsData = null;
  let testPreviewIdx = 0;
  let testPreviewLang = 'en';

  function updateTestPreview() {
    const container = $('#test-preview');
    if (!container || !testimonialsData || !testimonialsData.length) {
      if (container) container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.8rem;text-align:center;padding:24px 0">' + t('test.noItems') + '</p>';
      return;
    }
    const sorted = testimonialsData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
    const idx = Math.min(testPreviewIdx, sorted.length - 1);
    const item = sorted[idx];
    const lng = testPreviewLang;
    const name = item.name[lng] || item.name.en || '';
    const role = item.role[lng] || item.role.en || '';
    const text = item.text[lng] || item.text.en || '';
    const stars = '★'.repeat(item.stars || 5);
    let avatarHTML;
    if (item.avatar) {
      avatarHTML = '<img class="test-preview__avatar" src="../' + item.avatar + '" alt="">';
    } else {
      const inits = name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || '??';
      avatarHTML = '<span class="test-preview__avatar test-preview__avatar--initials">' + inits + '</span>';
    }
    let verifiedHTML = '';
    if (item.sourceName) {
      verifiedHTML = '<span class="test-preview__verified">✓ Verified via ' + escapeHtml(item.sourceName) + '</span>';
    }
    container.innerHTML = '<div class="test-preview__card">' +
      '<div class="test-preview__stars">' + stars + '</div>' +
      '<blockquote class="test-preview__text">' + escapeHtml(text) + '</blockquote>' +
      '<div class="test-preview__author">' + avatarHTML +
      '<div class="test-preview__info">' +
      '<span class="test-preview__name">' + escapeHtml(name) + '</span>' +
      '<span class="test-preview__role">' + escapeHtml(role) + '</span>' +
      verifiedHTML +
      '</div></div></div>' +
      '<p class="test-preview__hint">#' + (idx + 1) + ' / ' + sorted.length + '</p>';
  }

  function loadTestimonialsData() {
    if (typeof TESTIMONIALS_DATA !== 'undefined') {
      testimonialsData = JSON.parse(JSON.stringify(TESTIMONIALS_DATA));
    } else {
      testimonialsData = [];
    }
  }

  function renderTestimonialsEditor() {
    if (!testimonialsData) loadTestimonialsData();
    const editor = $('#testimonials-editor');
    if (!editor) return;

    const sorted = testimonialsData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));

    if (!sorted.length) {
      editor.innerHTML = `<div class="empty-state"><div class="empty-state__icon">&#128172;</div><div class="empty-state__text">${t('test.noItems')}</div></div>`;
      return;
    }

    editor.innerHTML = sorted.map((item, idx) => {
      const i = testimonialsData.indexOf(item);
      const initials = (item.name.en || '??').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const avatarPreview = item.avatar
        ? `<img src="../${item.avatar}" alt="" class="test-avatar__img">`
        : `<span class="test-avatar__initials">${initials}</span>`;
      return `<div class="faq-editor-item" data-test-idx="${i}">
        <div class="faq-editor-item__header">
          <span class="faq-editor-item__num">#${idx + 1}</span>
          <div class="faq-editor-item__controls">
            <button class="btn btn--icon" data-test-up="${i}" title="Move Up" ${idx === 0 ? 'disabled' : ''}>↑</button>
            <button class="btn btn--icon" data-test-down="${i}" title="Move Down" ${idx === sorted.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="btn btn--icon btn--danger" data-test-delete="${i}" title="Delete">🗑</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:12px;margin-bottom:12px;align-items:end">
          <div class="test-avatar" data-test-avatar="${i}">
            <div class="test-avatar__preview">${avatarPreview}</div>
            <button class="btn btn--outline btn--xs" data-test-avatar-btn="${i}">${t('test.avatar')}</button>
            <input type="file" data-test-avatar-input="${i}" accept="image/*" hidden>
          </div>
          <div class="form-group"><label>${t('test.stars')}</label><input type="number" data-test-field="stars" data-test-i="${i}" min="1" max="5" value="${item.stars || 5}"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
          <div class="form-group"><label>${t('test.sourceUrl')}</label><input type="url" data-test-field="sourceUrl" data-test-i="${i}" value="${escAttr(item.sourceUrl || '')}" placeholder="https://..."></div>
          <div class="form-group"><label>${t('test.sourceName')}</label><input type="text" data-test-field="sourceName" data-test-i="${i}" value="${escAttr(item.sourceName || '')}" placeholder="${t('test.sourceHint')}"></div>
        </div>
        ${LANGS.map(lng => `<div class="faq-editor-lang">
          <div class="faq-editor-lang__label">${LANGS_FULL[lng] || lng}${lng !== 'en' ? ` <button class="btn btn--outline btn--xs" data-test-copy-en="${i}" data-test-copy-lng="${lng}">${t('test.copyFromEn')}</button>` : ''}</div>
          <div class="form-group"><label>${t('test.name')}</label><input type="text" data-test-field="name" data-test-i="${i}" data-test-lng="${lng}" value="${escAttr(item.name[lng] || '')}"></div>
          <div class="form-group"><label>${t('test.role')}</label><input type="text" data-test-field="role" data-test-i="${i}" data-test-lng="${lng}" value="${escAttr(item.role[lng] || '')}"></div>
          <div class="form-group"><label>${t('test.text')}</label><textarea data-test-field="text" data-test-i="${i}" data-test-lng="${lng}" rows="3">${escAttr(item.text[lng] || '')}</textarea></div>
        </div>`).join('')}
      </div>`;
    }).join('');

    updateTestPreview();

    // Bind input changes
    editor.querySelectorAll('[data-test-field]').forEach(el => {
      el.addEventListener('input', () => {
        const i = parseInt(el.dataset.testI);
        const field = el.dataset.testField;
        const lng = el.dataset.testLng;
        if (field === 'stars') {
          testimonialsData[i].stars = parseInt(el.value) || 5;
        } else if (field === 'sourceUrl' || field === 'sourceName') {
          testimonialsData[i][field] = el.value;
        } else {
          testimonialsData[i][field][lng] = el.value;
          testPreviewLang = lng;
        }
        // Find which sorted index this item is at
        const sorted = testimonialsData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
        testPreviewIdx = sorted.indexOf(testimonialsData[i]);
        dirtyTabs.testimonials = true;
        updateTestPreview();
      });
    });

    // Copy from EN buttons
    editor.querySelectorAll('[data-test-copy-en]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.testCopyEn);
        const lng = btn.dataset.testCopyLng;
        ['name', 'role', 'text'].forEach(field => {
          testimonialsData[i][field][lng] = testimonialsData[i][field].en || '';
        });
        dirtyTabs.testimonials = true;
        renderTestimonialsEditor();
      });
    });

    // Bind reorder/delete
    editor.querySelectorAll('[data-test-up]').forEach(btn => btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.testUp);
      const sorted2 = testimonialsData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
      const idx2 = sorted2.indexOf(testimonialsData[i]);
      if (idx2 > 0) { const tmp = sorted2[idx2].order; sorted2[idx2].order = sorted2[idx2 - 1].order; sorted2[idx2 - 1].order = tmp; }
      dirtyTabs.testimonials = true;
      renderTestimonialsEditor();
    }));
    editor.querySelectorAll('[data-test-down]').forEach(btn => btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.testDown);
      const sorted2 = testimonialsData.slice().sort((a, b) => (a.order || 99) - (b.order || 99));
      const idx2 = sorted2.indexOf(testimonialsData[i]);
      if (idx2 < sorted2.length - 1) { const tmp = sorted2[idx2].order; sorted2[idx2].order = sorted2[idx2 + 1].order; sorted2[idx2 + 1].order = tmp; }
      dirtyTabs.testimonials = true;
      renderTestimonialsEditor();
    }));
    editor.querySelectorAll('[data-test-delete]').forEach(btn => btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.testDelete);
      if (!confirm(t('test.confirmDelete'))) return;
      testimonialsData.splice(i, 1);
      dirtyTabs.testimonials = true;
      renderTestimonialsEditor();
    }));

    // Avatar upload buttons
    editor.querySelectorAll('[data-test-avatar-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = editor.querySelector(`[data-test-avatar-input="${btn.dataset.testAvatarBtn}"]`);
        if (input) input.click();
      });
    });
    editor.querySelectorAll('[data-test-avatar-input]').forEach(input => {
      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const i = parseInt(input.dataset.testAvatarInput);
        const preview = editor.querySelector(`[data-test-avatar="${i}"] .test-avatar__preview`);
        preview.innerHTML = `<span class="test-avatar__initials">...</span>`;
        try {
          const resized = await resizeImage(file, 200, 0.85);
          const base64 = resized.split(',')[1];
          const safeName = (testimonialsData[i].name.en || 'avatar').replace(/[^a-z0-9]/gi, '-').toLowerCase();
          const path = `images/testimonials/${safeName}.webp`;
          await commitFile(path, null, `Add testimonial avatar: ${safeName}`, null, base64);
          testimonialsData[i].avatar = path;
          dirtyTabs.testimonials = true;
          preview.innerHTML = `<img src="../${path}" alt="" class="test-avatar__img">`;
          updateRateLimit();
        } catch (err) {
          preview.innerHTML = `<span class="test-avatar__initials" style="color:var(--color-danger)">!</span>`;
          console.error('Avatar upload failed:', err);
        }
      });
    });
  }

  // Add testimonial
  const testAddBtn = $('#btn-testimonial-add');
  if (testAddBtn) {
    testAddBtn.addEventListener('click', () => {
      if (!testimonialsData) loadTestimonialsData();
      const maxOrder = testimonialsData.reduce((m, t) => Math.max(m, t.order || 0), 0);
      testimonialsData.push({
        name: { en: '', ru: '', id: '' },
        role: { en: '', ru: '', id: '' },
        text: { en: '', ru: '', id: '' },
        stars: 5,
        sourceUrl: '',
        sourceName: '',
        order: maxOrder + 1
      });
      dirtyTabs.testimonials = true;
      renderTestimonialsEditor();
    });
  }

  // Publish testimonials
  const testPublishBtn = $('#btn-testimonials-publish');
  if (testPublishBtn) {
    testPublishBtn.addEventListener('click', async () => {
      if (!dirtyTabs.testimonials || !testimonialsData) return;
      btnLoading(testPublishBtn, true);
      const status = $('#testimonials-publish-status');
      status.textContent = t('test.publishing');
      status.className = 'publish-status';

      try {
        const content = '/* eslint-disable */\nconst TESTIMONIALS_DATA = ' + JSON.stringify(testimonialsData, null, 2) + ';\n';
        await commitFile('data/testimonials-data.js', content, 'Update testimonials via admin panel');
        dirtyTabs.testimonials = false;
        status.textContent = t('test.published');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(testPublishBtn, false);
    });
  }

  // Auto-render testimonials when tab is activated
  const testNavBtn = document.querySelector('.admin-nav__btn[data-tab="testimonials"]');
  if (testNavBtn) {
    testNavBtn.addEventListener('click', () => {
      if (!testimonialsData) loadTestimonialsData();
      renderTestimonialsEditor();
    });
  }

  // ─── Help Tooltips ───
  document.querySelectorAll('.editor-help-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const popup = $('#help-' + btn.dataset.help);
      if (!popup) return;
      const wasHidden = popup.hidden;
      // Close all popups first
      document.querySelectorAll('.editor-help-popup').forEach(p => p.hidden = true);
      popup.hidden = !wasHidden;
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.editor-help-popup').forEach(p => p.hidden = true);
  });

  // ─── Colors Tab ───
  const DEFAULT_COLORS = {
    bg: '#1a1a14', bgAlt: '#111110', bgCard: '#2a2a20',
    accent: '#6B8F4E', text: '#E1D9C9', cream: '#F7F7F0'
  };

  const COLOR_VAR_MAP = {
    bg: '--color-bg', bgAlt: '--color-bg-alt', bgCard: '--color-bg-card',
    accent: '--color-accent', text: '--color-text', cream: '--color-cream'
  };

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function isValidHex(str) {
    return /^#[0-9A-Fa-f]{6}$/.test(str);
  }

  function applyDerivedColors(hex) {
    const { r, g, b } = hexToRgb(hex);
    const root = document.documentElement.style;
    root.setProperty('--color-text-muted', `rgba(${r},${g},${b},0.75)`);
    root.setProperty('--color-text-dim', `rgba(${r},${g},${b},0.5)`);
    root.setProperty('--color-border', `rgba(${r},${g},${b},0.1)`);
    root.setProperty('--color-border-hover', `rgba(${r},${g},${b},0.25)`);
    // Update swatches
    const sm = $('#swatch-muted');
    const sd = $('#swatch-dim');
    const sb = $('#swatch-border');
    if (sm) sm.style.background = `rgba(${r},${g},${b},0.75)`;
    if (sd) sd.style.background = `rgba(${r},${g},${b},0.5)`;
    if (sb) sb.style.background = `rgba(${r},${g},${b},0.1)`;
  }

  function applyColorLive(key, hex) {
    const varName = COLOR_VAR_MAP[key];
    if (varName) document.documentElement.style.setProperty(varName, hex);
    if (key === 'text') applyDerivedColors(hex);
  }

  function renderColorsTab() {
    if (!siteData) loadSiteData();
    if (!siteData.colors) siteData.colors = JSON.parse(JSON.stringify(DEFAULT_COLORS));
    const colors = siteData.colors;
    for (const key of Object.keys(DEFAULT_COLORS)) {
      const picker = $('#color-' + key);
      const hexInput = $('#color-' + key + '-hex');
      if (picker) picker.value = colors[key] || DEFAULT_COLORS[key];
      if (hexInput) hexInput.value = (colors[key] || DEFAULT_COLORS[key]).toUpperCase();
    }
    applyDerivedColors(colors.text || DEFAULT_COLORS.text);
  }

  // Wire color picker events
  for (const key of Object.keys(DEFAULT_COLORS)) {
    const picker = $('#color-' + key);
    const hexInput = $('#color-' + key + '-hex');
    if (picker && hexInput) {
      picker.addEventListener('input', () => {
        dirtyTabs.colors = true;
        hexInput.value = picker.value.toUpperCase();
        hexInput.classList.remove('input--error');
        applyColorLive(key, picker.value);
      });
      hexInput.addEventListener('input', () => {
        dirtyTabs.colors = true;
        let val = hexInput.value.trim();
        if (val.length > 0 && val[0] !== '#') val = '#' + val;
        if (isValidHex(val)) {
          picker.value = val;
          hexInput.classList.remove('input--error');
          applyColorLive(key, val);
        } else {
          hexInput.classList.add('input--error');
        }
      });
    }
  }

  // Settings tab activation (colors + other settings)
  const settingsNavBtn = document.querySelector('.admin-nav__btn[data-tab="settings"]');
  if (settingsNavBtn) {
    settingsNavBtn.addEventListener('click', () => {
      renderColorsTab();
      renderRateInfo();
      renderContactsForm();
      renderGuideInfo();
      renderSocialForm();
      renderRoiForm();
      renderRoiTextsForm();
      renderStatsForm();
    });
  }

  // Save colors
  const colorsSaveBtn = $('#btn-colors-save');
  if (colorsSaveBtn) {
    colorsSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const status = $('#colors-save-status');
      const colors = {};
      for (const key of Object.keys(DEFAULT_COLORS)) {
        const hexInput = $('#color-' + key + '-hex');
        const val = hexInput ? hexInput.value.trim() : '';
        if (!isValidHex(val)) {
          status.textContent = t('colors.invalidHex') + key;
          status.className = 'publish-status error';
          return;
        }
        colors[key] = val.toUpperCase();
      }
      siteData.colors = colors;
      btnLoading(colorsSaveBtn, true);
      status.textContent = t('common.saving');
      status.className = 'publish-status';
      try {
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update site colors via admin panel');
        dirtyTabs.colors = false;
        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(colorsSaveBtn, false);
    });
  }

  // Reset colors
  const colorsResetBtn = $('#btn-colors-reset');
  if (colorsResetBtn) {
    colorsResetBtn.addEventListener('click', () => {
      for (const key of Object.keys(DEFAULT_COLORS)) {
        const picker = $('#color-' + key);
        const hexInput = $('#color-' + key + '-hex');
        if (picker) picker.value = DEFAULT_COLORS[key];
        if (hexInput) {
          hexInput.value = DEFAULT_COLORS[key].toUpperCase();
          hexInput.classList.remove('input--error');
        }
        applyColorLive(key, DEFAULT_COLORS[key]);
      }
      const status = $('#colors-save-status');
      if (status) {
        status.textContent = t('colors.resetDone');
        status.className = 'publish-status';
      }
    });
  }

  // ─── Analytics Tab ───
  const ANALYTICS_FIELDS = [
    { id: 'analytics-ga4', key: 'ga4' },
    { id: 'analytics-facebook', key: 'facebookPixel' },
    { id: 'analytics-yandex', key: 'yandexMetrika' },
    { id: 'analytics-clarity', key: 'clarity' },
    { id: 'analytics-gsc', key: 'gscVerification' }
  ];

  function renderAnalyticsForm() {
    if (!siteData) loadSiteData();
    const a = (siteData && siteData.analytics) || {};
    for (const f of ANALYTICS_FIELDS) {
      const input = $('#' + f.id);
      if (input) input.value = a[f.key] || '';
    }
  }

  const analyticsNavBtn = document.querySelector('.admin-nav__btn[data-tab="analytics"]');
  if (analyticsNavBtn) {
    analyticsNavBtn.addEventListener('click', () => {
      renderAnalyticsForm();
    });
  }

  const analyticsSaveBtn = $('#btn-analytics-save');
  if (analyticsSaveBtn) {
    analyticsSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const status = $('#analytics-save-status');
      const analytics = {};
      for (const f of ANALYTICS_FIELDS) {
        const input = $('#' + f.id);
        analytics[f.key] = input ? input.value.trim() : '';
      }
      siteData.analytics = analytics;
      btnLoading(analyticsSaveBtn, true);
      status.textContent = t('common.saving');
      status.className = 'publish-status';
      try {
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update analytics settings via admin panel');
        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(analyticsSaveBtn, false);
    });
  }

  // ─── Exit Intent Popup Settings ───
  const EP_LANGS = ['en', 'ru', 'id'];
  const EP_FIELDS = ['tag', 'title', 'text', 'placeholder', 'submit', 'success'];
  let epActiveLang = 'en';

  function updateEpPreview() {
    const lang = epActiveLang;
    const tagVal = ($(`#exitpopup-${lang}-tag`) || {}).value || '';
    const titleVal = ($(`#exitpopup-${lang}-title`) || {}).value || '';
    const textVal = ($(`#exitpopup-${lang}-text`) || {}).value || '';
    const placeholderVal = ($(`#exitpopup-${lang}-placeholder`) || {}).value || '';
    const submitVal = ($(`#exitpopup-${lang}-submit`) || {}).value || '';
    const successVal = ($(`#exitpopup-${lang}-success`) || {}).value || '';

    var cssHead = '<link rel="preconnect" href="https://fonts.googleapis.com">'
      + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;500;600&display=swap">'
      + '<link rel="stylesheet" href="../css/reset.css">'
      + '<link rel="stylesheet" href="../css/style.css">'
      + '<style>html,body{margin:0;padding:0;height:auto;min-height:0!important;background:var(--color-bg-card);font-family:var(--font-body)}'
      + '.exit-popup{border:none;padding:32px 28px;max-width:100%;box-sizing:border-box;position:relative;background:var(--color-bg-card)}'
      + '.exit-popup__close{position:absolute;top:12px;right:16px}'
      + '</style>';

    // Main preview
    var mainHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8">' + cssHead + '</head><body>'
      + '<div class="exit-popup">'
      + '<button class="exit-popup__close" disabled>&times;</button>'
      + '<span class="section-header__tag">' + escAttr(tagVal) + '</span>'
      + '<h3 class="exit-popup__title">' + escAttr(titleVal) + '</h3>'
      + '<p class="exit-popup__text">' + escAttr(textVal) + '</p>'
      + '<div class="exit-popup__form">'
      + '<input type="email" class="exit-popup__input" placeholder="' + escAttr(placeholderVal) + '" disabled>'
      + '<div class="form-consent"><input type="checkbox" class="form-consent__checkbox" disabled checked><label class="form-consent__text">I agree to the Privacy Policy</label></div>'
      + '<button class="btn btn--primary" style="width:100%" disabled>' + escAttr(submitVal) + '</button>'
      + '</div></div></body></html>';

    var mainContainer = document.getElementById('ep-preview-main');
    if (mainContainer) {
      var mainIframe = mainContainer.querySelector('iframe');
      if (!mainIframe) {
        mainContainer.innerHTML = '';
        mainIframe = document.createElement('iframe');
        mainIframe.style.cssText = 'width:100%;border:none;display:block;border-radius:8px;';
        mainContainer.appendChild(mainIframe);
      }
      mainIframe.srcdoc = mainHtml;
      mainIframe.onload = function() { try { mainIframe.style.height = (mainIframe.contentDocument.body.scrollHeight + 8) + 'px'; } catch(e) {} };
    }

    // After-submit preview
    var afterHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8">' + cssHead + '</head><body>'
      + '<div class="exit-popup" style="text-align:center">'
      + '<button class="exit-popup__close" disabled>&times;</button>'
      + '<svg viewBox="0 0 48 48" width="56" height="56" style="display:block;margin:0 auto 16px"><circle cx="24" cy="24" r="22" stroke="var(--color-accent)" stroke-width="1.5" fill="none"/><path d="M15 24l7 7 11-11" stroke="var(--color-accent)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '<p style="font-weight:600;margin-bottom:16px;color:var(--color-text)">' + escAttr(successVal) + '</p>'
      + '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'
      + '<span class="btn btn--primary" style="pointer-events:none">Read Online</span>'
      + '<span class="btn btn--outline" style="pointer-events:none">Download PDF</span>'
      + '</div></div></body></html>';

    var afterContainer = document.getElementById('ep-preview-after');
    if (afterContainer) {
      var afterIframe = afterContainer.querySelector('iframe');
      if (!afterIframe) {
        afterContainer.innerHTML = '';
        afterIframe = document.createElement('iframe');
        afterIframe.style.cssText = 'width:100%;border:none;display:block;border-radius:8px;';
        afterContainer.appendChild(afterIframe);
      }
      afterIframe.srcdoc = afterHtml;
      afterIframe.onload = function() { try { afterIframe.style.height = (afterIframe.contentDocument.body.scrollHeight + 8) + 'px'; } catch(e) {} };
    }
  }

  function populateExitPopup() {
    if (!siteData) loadSiteData();
    const ep = siteData.exitPopup || {};
    const enabledBox = $('#exitpopup-enabled');
    if (enabledBox) enabledBox.checked = ep.enabled !== false;
    const delayInput = $('#exitpopup-delay');
    if (delayInput) delayInput.value = ep.delay || 30;
    EP_LANGS.forEach(lang => {
      const texts = (ep.texts && ep.texts[lang]) || {};
      EP_FIELDS.forEach(field => {
        const el = $(`#exitpopup-${lang}-${field}`);
        if (!el) return;
        el.value = texts[field] || '';
      });
    });
    updateEpPreview();
  }

  // Live preview: update on every keystroke
  document.querySelectorAll('.ep-live').forEach(input => {
    input.addEventListener('input', () => { updateEpPreview(); });
  });

  // Language tab switching
  document.querySelectorAll('.exitpopup-lang-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.exitpopup-lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      epActiveLang = tab.dataset.lang;
      document.querySelectorAll('.exitpopup-lang-panel').forEach(p => {
        p.hidden = p.dataset.lang !== epActiveLang;
      });
      updateEpPreview();
    });
  });

  // Save handler
  const exitPopupSaveBtn = $('#btn-exitpopup-save');
  if (exitPopupSaveBtn) {
    exitPopupSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const status = $('#exitpopup-save-status');
      siteData.exitPopup = {
        enabled: !!$('#exitpopup-enabled')?.checked,
        delay: parseInt($('#exitpopup-delay')?.value, 10) || 30,
        texts: {}
      };
      EP_LANGS.forEach(lang => {
        const g = (field) => ($(`#exitpopup-${lang}-${field}`) || {}).value || '';
        siteData.exitPopup.texts[lang] = {
          tag: g('tag'),
          title: g('title'),
          text: g('text'),
          placeholder: g('placeholder'),
          submit: g('submit'),
          success: g('success')
        };
      });
      btnLoading(exitPopupSaveBtn, true);
      status.textContent = t('common.saving');
      status.className = 'publish-status';
      try {
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update exit popup settings via admin panel');
        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(exitPopupSaveBtn, false);
    });
  }

  // ─── Tour Popup Editor ───
  var tourActiveLang = 'en';
  const TOUR_LANGS = ['en', 'ru', 'id'];

  function getTourData() {
    if (!siteData) loadSiteData();
    if (!siteData.tourPopup) siteData.tourPopup = { steps: {}, form: {}, thankYou: {}, title: {} };
    return siteData.tourPopup;
  }

  function renderTourSteps() {
    const td = getTourData();
    const lang = tourActiveLang;
    const steps = (td.steps && td.steps[lang]) || [];
    const container = $('#tour-steps-editor');
    if (!container) return;
    let html = '';
    steps.forEach((step, si) => {
      html += '<div class="tour-step-block"><div class="tour-step-block__header">' + t('tour.step') + ' ' + (si + 1) + (step.multi ? ' (multi-select)' : '') + '</div>';
      html += '<div class="form-group"><label>' + t('tour.question') + '</label><input type="text" class="tour-step-q" data-step="' + si + '" value="' + (step.question || '').replace(/"/g, '&quot;') + '"></div>';
      html += '<div class="tour-options-list">';
      (step.options || []).forEach((opt, oi) => {
        html += '<div class="form-group tour-option-row"><label>' + t('tour.option') + ' ' + (oi + 1) + '</label><input type="text" class="tour-step-opt" data-step="' + si + '" data-opt="' + oi + '" value="' + (opt || '').replace(/"/g, '&quot;') + '"></div>';
      });
      html += '</div></div>';
    });
    container.innerHTML = html;

    // Bind inputs
    container.querySelectorAll('.tour-step-q').forEach(inp => {
      inp.addEventListener('input', () => {
        const si = +inp.dataset.step;
        td.steps[lang][si].question = inp.value;
        dirtyTabs.exitpopup = true;
        updateTourPreview();
      });
    });
    container.querySelectorAll('.tour-step-opt').forEach(inp => {
      inp.addEventListener('input', () => {
        const si = +inp.dataset.step;
        const oi = +inp.dataset.opt;
        td.steps[lang][si].options[oi] = inp.value;
        dirtyTabs.exitpopup = true;
        updateTourPreview();
      });
    });
  }

  function renderTourForm() {
    const td = getTourData();
    const lang = tourActiveLang;
    const f = (td.form && td.form[lang]) || {};
    const container = $('#tour-form-editor');
    if (!container) return;
    let html = '<div class="form-grid">';
    html += '<div class="form-group"><label>' + t('tour.formTitle') + '</label><input type="text" id="tf-title" value="' + (f.title || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.submit') + '</label><input type="text" id="tf-submit" value="' + (f.submit || '').replace(/"/g, '&quot;') + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>' + t('tour.formSubtitle') + '</label><input type="text" id="tf-subtitle" value="' + (f.subtitle || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-grid--3">';
    html += '<div class="form-group"><label>' + t('tour.name') + '</label><input type="text" id="tf-name" value="' + (f.name || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.whatsapp') + '</label><input type="text" id="tf-whatsapp" value="' + (f.whatsapp || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.email') + '</label><input type="text" id="tf-email" value="' + (f.email || '').replace(/"/g, '&quot;') + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>' + t('tour.comment') + '</label><input type="text" id="tf-comment" value="' + (f.comment || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.consent') + '</label><textarea id="tf-consent" rows="2">' + (f.consent || '') + '</textarea></div>';
    html += '<div class="form-group"><label>' + t('tour.time') + '</label><input type="text" id="tf-time" value="' + (f.time || '').replace(/"/g, '&quot;') + '"></div>';
    var timeOpts = f.timeOptions || [];
    html += '<div class="form-grid--4">';
    for (var i = 0; i < 4; i++) {
      html += '<div class="form-group"><label>' + t('tour.timeOption') + ' ' + (i + 1) + '</label><input type="text" class="tf-timeopt" data-idx="' + i + '" value="' + (timeOpts[i] || '').replace(/"/g, '&quot;') + '"></div>';
    }
    html += '</div>';
    container.innerHTML = html;

    // Bind
    const fields = ['title', 'subtitle', 'name', 'whatsapp', 'email', 'comment', 'time', 'submit'];
    fields.forEach(fld => {
      const el = document.getElementById('tf-' + fld);
      if (el) el.addEventListener('input', () => {
        if (!td.form[lang]) td.form[lang] = {};
        td.form[lang][fld] = el.value;
        dirtyTabs.exitpopup = true;
        updateTourPreview();
      });
    });
    const consentEl = document.getElementById('tf-consent');
    if (consentEl) consentEl.addEventListener('input', () => {
      if (!td.form[lang]) td.form[lang] = {};
      td.form[lang].consent = consentEl.value;
      dirtyTabs.exitpopup = true;
      updateTourPreview();
    });
    container.querySelectorAll('.tf-timeopt').forEach(inp => {
      inp.addEventListener('input', () => {
        if (!td.form[lang]) td.form[lang] = {};
        if (!td.form[lang].timeOptions) td.form[lang].timeOptions = [];
        td.form[lang].timeOptions[+inp.dataset.idx] = inp.value;
        dirtyTabs.exitpopup = true;
        updateTourPreview();
      });
    });
  }

  function renderTourThankYou() {
    const td = getTourData();
    const lang = tourActiveLang;
    const ty = (td.thankYou && td.thankYou[lang]) || {};
    const container = $('#tour-thankyou-editor');
    if (!container) return;
    let html = '<div class="form-grid">';
    html += '<div class="form-group"><label>' + t('tour.thankTitle') + '</label><input type="text" id="ty-title" value="' + (ty.title || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.thankWa') + '</label><input type="text" id="ty-wa" value="' + (ty.whatsapp || '').replace(/"/g, '&quot;') + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>' + t('tour.thankText') + '</label><input type="text" id="ty-text" value="' + (ty.text || '').replace(/"/g, '&quot;') + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.thankProject') + '</label><input type="text" id="ty-project" value="' + (ty.projectLink || '').replace(/"/g, '&quot;') + '"></div>';
    container.innerHTML = html;

    const map = { title: 'ty-title', text: 'ty-text', whatsapp: 'ty-wa', projectLink: 'ty-project' };
    Object.keys(map).forEach(key => {
      const el = document.getElementById(map[key]);
      if (el) el.addEventListener('input', () => {
        if (!td.thankYou[lang]) td.thankYou[lang] = {};
        td.thankYou[lang][key] = el.value;
        dirtyTabs.exitpopup = true;
        updateTourPreview();
      });
    });
  }

  function renderTourEditor() {
    renderTourSteps();
    renderTourForm();
    renderTourThankYou();
    updateTourPreview();
  }

  var tourPreviewStep = 0;

  function updateTourPreview(step) {
    if (step !== undefined) tourPreviewStep = step;
    const container = document.getElementById('tp-preview');
    if (!container) return;
    const td = getTourData();
    const lang = tourActiveLang;
    const steps = (td.steps && td.steps[lang]) || [];
    const form = (td.form && td.form[lang]) || {};
    const ty = (td.thankYou && td.thankYou[lang]) || {};
    const title = (td.title && td.title[lang]) || '';
    const totalSteps = steps.length || 3;

    // Update nav active state
    document.querySelectorAll('.tp-preview-nav__btn').forEach(btn => {
      btn.classList.toggle('tp-preview-nav__btn--active', +btn.dataset.tpStep === tourPreviewStep);
    });

    // Build body HTML using the same classes as the real popup (main.js)
    let body = '';
    const pctStep = ((Math.min(tourPreviewStep, totalSteps) + 1) / (totalSteps + 2)) * 100;
    const pct = tourPreviewStep > totalSteps ? 100 : pctStep;

    // Same SVG icons as main.js tourIcons
    var previewIcons = [
      [
        '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><rect x="9" y="10" width="6" height="5" rx="0.5"/><path d="M12 15v6"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M3 21h18M9 21V13h6v8"/><path d="M3 7l9-4 9 4"/><rect x="5" y="7" width="14" height="14" rx="0" fill="none"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V8l4-3v16"/><path d="M9 21V5l6-3v19"/><path d="M15 21V4l4 3v14"/></svg>',
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
      ],
      [
        '<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h2v2H8z"/></svg>',
        '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M14 14h2v2h-2z"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-1 1 3 2 2 3 1-1v-3l3-2 3.7 7.3c.2.4.7.6 1.1.3l.5-.3c.4-.2.5-.6.5-1.1z"/></svg>'
      ],
      [
        '<svg viewBox="0 0 24 24"><path d="M2 20h20"/><path d="M5 20V8l5-3 5 3v12"/><path d="M15 20V10l5-3v13"/><rect x="8" y="10" width="4" height="3" rx="0.5"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M9 7h6"/></svg>',
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'
      ]
    ];

    if (tourPreviewStep < totalSteps) {
      const s = steps[tourPreviewStep] || { question: '', options: [] };
      body += '<p class="tour__step-label">Step ' + (tourPreviewStep + 1) + ' of ' + totalSteps + '</p>';
      body += '<h3 class="tour__question">' + escAttr(s.question || '—') + '</h3>';
      body += '<div class="tour__options">';
      var stepIcons = previewIcons[tourPreviewStep] || [];
      (s.options || []).forEach(function(opt, oi) {
        var icon = stepIcons[oi] || '';
        if (s.multi) {
          body += '<label class="tour__checkbox"><input type="checkbox" disabled><span class="tour__checkbox-icon">' + icon + '</span><span>' + escAttr(opt) + '</span></label>';
        } else {
          body += '<button class="tour__option" disabled><span class="tour__option-icon">' + icon + '</span><span>' + escAttr(opt) + '</span></button>';
        }
      });
      body += '</div>';
    } else if (tourPreviewStep === totalSteps) {
      body += '<p class="tour__step-label">' + escAttr(form.title || 'How can we reach you?') + '</p>';
      body += '<h3 class="tour__question" style="font-size:1.2rem;margin-bottom:8px;">' + escAttr(title || 'Schedule a Private Tour') + '</h3>';
      body += '<p class="tour__form-sub">' + escAttr(form.subtitle || '') + '</p>';
      body += '<div class="tour__form">';
      body += '<input type="text" class="tour__input" placeholder="' + escAttr(form.name || 'Your name') + '" disabled>';
      body += '<input type="text" class="tour__input" placeholder="' + escAttr(form.whatsapp || 'WhatsApp') + '" disabled>';
      body += '<input type="text" class="tour__input" placeholder="' + escAttr(form.email || 'Email') + '" disabled>';
      if (form.time) {
        body += '<div class="tour__time-group"><label class="tour__time-label">' + escAttr(form.time) + '</label>';
        body += '<div class="tour__time-options">';
        (form.timeOptions || []).forEach(function(opt, i) {
          body += '<label class="tour__time-option' + (i === 3 ? ' active' : '') + '"><input type="radio" disabled' + (i === 3 ? ' checked' : '') + '><span>' + escAttr(opt) + '</span></label>';
        });
        body += '</div></div>';
      }
      body += '<textarea class="tour__input tour__textarea" placeholder="' + escAttr(form.comment || 'Comments') + '" rows="2" disabled></textarea>';
      body += '<div class="form-consent"><input type="checkbox" class="form-consent__checkbox" disabled><label class="form-consent__text">' + escAttr((form.consent || '').substring(0, 120)) + (form.consent && form.consent.length > 120 ? '…' : '') + '</label></div>';
      body += '<button class="btn btn--primary" style="width:100%;" disabled>' + escAttr(form.submit || 'Request a Tour') + '</button>';
      body += '</div>';
    } else {
      body += '<div class="tour__result">';
      body += '<svg class="tour__result-icon" viewBox="0 0 48 48" width="56" height="56"><circle cx="24" cy="24" r="22" stroke="var(--color-accent)" stroke-width="1.5" fill="none"/><path d="M15 24l7 7 11-11" stroke="var(--color-accent)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      body += '<h3 class="tour__question">' + escAttr(ty.title || 'Tour Request Sent!') + '</h3>';
      body += '<p class="tour__result-desc">' + escAttr(ty.text || '') + '</p>';
      body += '<span class="btn btn--primary" style="width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px;">';
      body += '<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/></svg>';
      body += escAttr(ty.whatsapp || 'Message us on WhatsApp');
      body += '</span>';
      if (ty.projectLink) body += '<a class="tour__project-link">' + escAttr(ty.projectLink) + ' Serenity Villas &rarr;</a>';
      body += '</div>';
    }

    // Build full HTML document for iframe with real site styles
    var iframeHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
      + '<link rel="preconnect" href="https://fonts.googleapis.com">'
      + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;500;600&display=swap">'
      + '<link rel="stylesheet" href="../css/reset.css">'
      + '<link rel="stylesheet" href="../css/style.css">'
      + '<style>html,body{margin:0;padding:0;height:auto;min-height:0!important;background:var(--color-bg);font-family:var(--font-body)}'
      + '.tour{border:none;padding:32px 28px;max-width:100%;width:100%;box-sizing:border-box}'
      + '.tour__result-icon{display:block;margin:0 auto 20px}'
      + '</style></head><body>'
      + '<div class="tour">'
      + '<div class="tour__progress"><div class="tour__progress-bar" style="width:' + pct + '%"></div></div>'
      + '<div class="tour__body">' + body + '</div>'
      + '</div></body></html>';

    // Render into iframe
    var iframe = container.querySelector('iframe');
    if (!iframe) {
      container.innerHTML = '';
      iframe = document.createElement('iframe');
      iframe.style.cssText = 'width:100%;border:none;display:block;border-radius:8px;';
      container.appendChild(iframe);
    }
    iframe.srcdoc = iframeHtml;

    // Auto-resize iframe to content height
    iframe.onload = function() {
      try {
        var h = iframe.contentDocument.body.scrollHeight;
        iframe.style.height = (h + 8) + 'px';
      } catch(e) {}
    };
  }

  // Tour preview nav buttons
  document.querySelectorAll('.tp-preview-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateTourPreview(+btn.dataset.tpStep);
    });
  });

  // Tour language tabs
  document.querySelectorAll('.tour-lang-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tour-lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tourActiveLang = tab.dataset.lang;
      renderTourEditor();
    });
  });

  // Initialize tour editor when tab is shown
  const tourEditorInit = () => { getTourData(); renderTourEditor(); };
  const navBtns = document.querySelectorAll('.admin-nav__btn');
  navBtns.forEach(btn => {
    if (btn.dataset.tab === 'exitpopup') {
      btn.addEventListener('click', () => setTimeout(tourEditorInit, 50));
    }
  });

  // Tour save
  const tourSaveBtn = $('#btn-tour-save');
  if (tourSaveBtn) {
    tourSaveBtn.addEventListener('click', async () => {
      if (!siteData) loadSiteData();
      const status = $('#tour-save-status');
      btnLoading(tourSaveBtn, true);
      status.textContent = t('common.saving');
      status.className = 'publish-status';
      try {
        const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
        await commitFile('data/site-data.js', content, 'Update tour popup settings via admin panel');
        status.textContent = t('common.saved');
        status.className = 'publish-status success';
        updateRateLimit();
      } catch (err) {
        status.textContent = t('common.error') + err.message;
        status.className = 'publish-status error';
      }
      btnLoading(tourSaveBtn, false);
    });
  }

  // ─── Language Toggle ───
  document.querySelectorAll('[data-admin-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      setAdminLang(btn.dataset.adminLang);
    });
  });

  // Apply saved language on load (for login/pat screens)
  translateUI();

  // ─── Helpers ───
  function escAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})();
