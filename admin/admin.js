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
      'pat.title': 'GitHub Access',
      'pat.desc': 'Enter your GitHub Personal Access Token to enable publishing.',
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
      'nav.dashboard': 'Dashboard',
      'nav.projects': 'Projects',
      'nav.seo': 'SEO',
      'nav.gallery': 'Gallery',
      'nav.faq': 'FAQ',
      'nav.testimonials': 'Testimonials',
      'nav.colors': 'Colors',
      'dash.title': 'Dashboard',
      'dash.totalUnits': 'Total Units',
      'dash.soldBooked': 'Sold / Booked',
      'dash.available': 'Available',
      'dash.overallProgress': 'Overall Progress',
      'dash.estRevenue': 'Est. Revenue',
      'dash.preSale': 'Pre-Sale',
      'dash.inProgress': 'In Progress',
      'dash.sold': 'Sold',
      'dash.left': 'Left',
      'dash.from': 'From',
      'dash.revenue': 'Revenue',
      'dash.editProject': 'Edit Project',
      'dash.viewOnSite': 'View on Site',
      'dash.recentChanges': 'Recent Changes',
      'dash.noChanges': 'No recent changes to project data.',
      'dash.loading': 'Loading...',
      'dash.couldNotLoad': 'Could not load commit history.',
      'dash.breakAvailable': 'available',
      'dash.breakBooked': 'booked',
      'dash.breakSold': 'sold',
      'dash.breakResale': 'resale',
      'rate.title': 'Exchange Rate (USD → IDR)',
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
      'projects.overwriteWarn': 'Pages for "{name}" already exist.\n\n• "Update SEO Only" — updates only meta tags (title, description, OG) without touching the page content.\n• "Overwrite All" — replaces the entire page. All manual edits will be lost.\n\nChoose an action:',
      'projects.overwriteAll': 'Overwrite All',
      'projects.cancel': 'Cancel',
      'projects.unsaved': 'Unsaved changes',
      'projects.publishing': 'Publishing...',
      'projects.published': 'Published! Site updating (~1-2 min)',
      'projects.units': 'Units',
      'projects.unitTypes': 'Unit Types',
      'projects.availability': 'Availability',
      'projects.heroStats': 'Hero Stats',
      'projects.showcaseCard': 'Showcase Card',
      'projects.addUnit': '+ Add Unit',
      'projects.addType': '+ Add Type',
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
      'seo.saveAll': 'Save All Languages',
      'seo.savingAll': 'Saving all languages...',
      'seo.loadingLangs': 'Loading all languages...',
      'gallery.title': 'Gallery Manager',
      'gallery.upload': 'Upload Photos',
      'gallery.photos': 'photos',
      'gallery.noImages': 'No images in this project. Drag & drop or click Upload to add photos.',
      'gallery.dragDrop': 'Drag & drop images here or use Upload button',
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
      'test.text': 'Text',
      'test.stars': 'Stars',
      'colors.title': 'Site Colors',
      'colors.backgrounds': 'Backgrounds',
      'colors.textBorders': 'Text & Borders',
      'colors.accent': 'Accent',
      'colors.mainBg': 'Main Background',
      'colors.altBg': 'Alternate Background',
      'colors.cardPanel': 'Card / Panel',
      'colors.primaryText': 'Primary Text',
      'colors.cream': 'Cream (Buttons)',
      'colors.brandAccent': 'Brand Accent',
      'colors.derivedHint': 'Muted text, dim text, and border colors are automatically derived from the primary text color.',
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
      'newProject.title': 'Add New Project',
      'newProject.name': 'Project Name',
      'newProject.slug': 'Slug (auto)',
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
    },
    ru: {
      'login.title': 'Панель управления',
      'login.email': 'Email',
      'login.password': 'Пароль',
      'login.submit': 'Войти',
      'login.signingIn': 'Вход...',
      'pat.title': 'Доступ к GitHub',
      'pat.desc': 'Введите Personal Access Token GitHub для публикации изменений.',
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
      'nav.dashboard': 'Обзор',
      'nav.projects': 'Проекты',
      'nav.seo': 'SEO',
      'nav.gallery': 'Галерея',
      'nav.faq': 'FAQ',
      'nav.testimonials': 'Отзывы',
      'nav.colors': 'Цвета',
      'dash.title': 'Обзор',
      'dash.totalUnits': 'Всего юнитов',
      'dash.soldBooked': 'Продано / Бронь',
      'dash.available': 'Доступно',
      'dash.overallProgress': 'Общий прогресс',
      'dash.estRevenue': 'Ожид. выручка',
      'dash.preSale': 'Предпродажа',
      'dash.inProgress': 'Строится',
      'dash.sold': 'Продано',
      'dash.left': 'Осталось',
      'dash.from': 'От',
      'dash.revenue': 'Выручка',
      'dash.editProject': 'Редактировать',
      'dash.viewOnSite': 'На сайте',
      'dash.recentChanges': 'Последние изменения',
      'dash.noChanges': 'Нет недавних изменений.',
      'dash.loading': 'Загрузка...',
      'dash.couldNotLoad': 'Не удалось загрузить историю.',
      'dash.breakAvailable': 'доступно',
      'dash.breakBooked': 'бронь',
      'dash.breakSold': 'продано',
      'dash.breakResale': 'перепродажа',
      'rate.title': 'Курс валют (USD → IDR)',
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
      'projects.overwriteWarn': 'Страницы для "{name}" уже существуют.\n\n• «Обновить только SEO» — обновит только мета-теги (title, description, OG), контент страницы не изменится.\n• «Перезаписать всё» — заменит всю страницу. Все ручные правки будут потеряны.\n\nВыберите действие:',
      'projects.overwriteAll': 'Перезаписать всё',
      'projects.cancel': 'Отмена',
      'projects.unsaved': 'Есть несохранённые изменения',
      'projects.publishing': 'Публикация...',
      'projects.published': 'Опубликовано! Сайт обновится (~1-2 мин)',
      'projects.units': 'Юниты',
      'projects.unitTypes': 'Типы юнитов',
      'projects.availability': 'Доступность',
      'projects.heroStats': 'Статистика Hero',
      'projects.showcaseCard': 'Карточка проекта',
      'projects.addUnit': '+ Добавить юнит',
      'projects.addType': '+ Добавить тип',
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
      'seo.saveAll': 'Сохранить все языки',
      'seo.savingAll': 'Сохранение всех языков...',
      'seo.loadingLangs': 'Загрузка всех языков...',
      'gallery.title': 'Менеджер галереи',
      'gallery.upload': 'Загрузить фото',
      'gallery.photos': 'фото',
      'gallery.noImages': 'Нет изображений. Перетащите файлы или нажмите Загрузить.',
      'gallery.dragDrop': 'Перетащите изображения сюда или нажмите Загрузить',
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
      'test.text': 'Текст',
      'test.stars': 'Звёзды',
      'colors.title': 'Цвета сайта',
      'colors.backgrounds': 'Фоны',
      'colors.textBorders': 'Текст и границы',
      'colors.accent': 'Акцент',
      'colors.mainBg': 'Основной фон',
      'colors.altBg': 'Альтернативный фон',
      'colors.cardPanel': 'Карточки / Панели',
      'colors.primaryText': 'Основной текст',
      'colors.cream': 'Кремовый (Кнопки)',
      'colors.brandAccent': 'Акцентный цвет',
      'colors.derivedHint': 'Приглушённый, тусклый текст и цвета рамок вычисляются из основного цвета текста.',
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
      'newProject.title': 'Добавить проект',
      'newProject.name': 'Название проекта',
      'newProject.slug': 'Slug (авто)',
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
      if (val.includes('<strong>') || val.includes('<b>') || val.includes('<br>')) {
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
  const dirtyTabs = { projects: false, faq: false, testimonials: false, seo: false, colors: false, contacts: false, rate: false };

  function getActiveTab() {
    const btn = document.querySelector('.admin-nav__btn.active');
    return btn ? btn.dataset.tab : 'dashboard';
  }

  function isAnyDirty() {
    return Object.values(dirtyTabs).some(v => v);
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
    renderProjectEditor();
    updateRateLimit();
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
        <div class="dash-summary__label">${t('dash.totalUnits')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalSold}</div>
        <div class="dash-summary__label">${t('dash.soldBooked')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalAvailable}</div>
        <div class="dash-summary__label">${t('dash.available')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">${totalPct}%</div>
        <div class="dash-summary__label">${t('dash.overallProgress')}</div>
      </div>
      <div class="dash-summary__item">
        <div class="dash-summary__value">$${(totalRevenue / 1000000).toFixed(1)}M</div>
        <div class="dash-summary__label">${t('dash.estRevenue')}</div>
      </div>
    </div>`;

    // Project cards
    html += '<div class="dashboard-grid">';
    projectStats.forEach(({ key, p, sold, total, pct, left, revenue }) => {
      const badgeClass = p.status === 'pre-sale' ? 'presale' : 'progress';
      const badgeText = p.status === 'pre-sale' ? t('dash.preSale') : t('dash.inProgress');

      // Unit breakdown for Villas/Estates
      let breakdown = '';
      if (p.units) {
        const counts = { available: 0, booked: 0, sold: 0, resale: 0 };
        p.units.forEach(u => { counts[u.status] = (counts[u.status] || 0) + 1; });
        breakdown = `<div class="dash-card__breakdown">
          ${counts.available ? `<span class="dash-break dash-break--available">${counts.available} ${t('dash.breakAvailable')}</span>` : ''}
          ${counts.booked ? `<span class="dash-break dash-break--booked">${counts.booked} ${t('dash.breakBooked')}</span>` : ''}
          ${counts.sold ? `<span class="dash-break dash-break--sold">${counts.sold} ${t('dash.breakSold')}</span>` : ''}
          ${counts.resale ? `<span class="dash-break dash-break--resale">${counts.resale} ${t('dash.breakResale')}</span>` : ''}
        </div>`;
      }

      html += `<div class="dash-card" data-card-project="${key}">
        <div class="dash-card__header">
          <span class="dash-card__name">${p.name}</span>
          <span class="dash-card__badge dash-card__badge--${badgeClass}">${badgeText}</span>
        </div>
        <div class="dash-card__stats">
          <div><div class="dash-card__stat-value">${sold}/${total}</div><div class="dash-card__stat-label">${t('dash.sold')}</div></div>
          <div><div class="dash-card__stat-value">${left}</div><div class="dash-card__stat-label">${t('dash.left')}</div></div>
          <div><div class="dash-card__stat-value">$${(p.startingPrice / 1000).toFixed(0)}K</div><div class="dash-card__stat-label">${t('dash.from')}</div></div>
          <div><div class="dash-card__stat-value">$${revenue >= 1000000 ? (revenue / 1000000).toFixed(1) + 'M' : (revenue / 1000).toFixed(0) + 'K'}</div><div class="dash-card__stat-label">${t('dash.revenue')}</div></div>
        </div>
        <div class="dash-card__bar">
          <div class="dash-card__bar-track"><div class="dash-card__bar-fill" style="width:${pct}%"></div></div>
          <span class="dash-card__bar-label">${pct}%</span>
        </div>
        ${breakdown}
        <div class="dash-card__actions">
          <button class="dash-card__edit btn btn--outline btn--sm" data-goto="${key}">${t('dash.editProject')}</button>
          <a href="https://winstik13.github.io/global-bali-home/${p.page || 'project-' + p.slug + '.html'}" target="_blank" rel="noopener" class="btn btn--outline btn--sm" style="text-decoration:none">${t('dash.viewOnSite')}</a>
        </div>
      </div>`;
    });
    html += '</div>';

    // Recent commits
    html += `<div class="dash-commits"><h3>${t('dash.recentChanges')}</h3><div id="dash-commits-list"><span style="color:var(--color-text-dim)">${t('dash.loading')}</span></div></div>`;

    container.innerHTML = html;

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
          <td data-label="${t('projects.area')}"><input type="text" data-unit="${i}" data-field="area" class="unit-text" value="${u.area}" style="width:72px"></td>
          <td data-label="${t('projects.land')}"><input type="text" data-unit="${i}" data-field="land" class="unit-text" value="${u.land}" style="width:72px"></td>
          <td data-label="${t('projects.badge')}"><input type="text" data-unit="${i}" data-field="badge" class="unit-text" value="${u.badge || ''}" style="width:72px" placeholder="—"></td>
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
          <td data-label="${t('projects.area')}"><input type="text" data-utype="${i}" data-field="area" class="utype-text" value="${ut.area}" style="width:72px"></td>
          <td data-label="${t('projects.land')}"><input type="text" data-utype="${i}" data-field="land" class="utype-text" value="${ut.land}" style="width:72px"></td>
          <td data-label="${t('projects.unit')}"><input type="number" data-utype="${i}" data-field="count" class="utype-text" value="${ut.count}" style="width:48px" min="0"></td>
          <td data-label="${t('projects.price')}"><input type="number" data-utype="${i}" data-field="price" class="utype-price" value="${ut.price || ''}" min="0" step="1000"></td>
          <td><button class="btn--icon btn--danger" data-delete-utype="${i}" title="${t('projects.deleteType')}">&times;</button></td>
        </tr>`;
      });
      html += `</tbody></table><button class="btn btn--outline btn--sm" id="btn-add-utype" style="margin-top:8px">${t('projects.addType')}</button></div>`;
    }

    // Availability (auto-calculated)
    // For projects with units: both sold and total are computed from unit statuses
    // For unitTypes (Village): total = sum of counts, sold is editable
    const canEditSold = !p.units && p.unitTypes;
    if (p.units) {
      // Force recalc from units
      p.availability.sold = p.units.filter(u => u.status === 'sold' || u.status === 'booked').length;
      p.availability.total = p.units.length;
    } else if (p.unitTypes) {
      p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
    }
    const availPct = p.availability.total ? Math.round(p.availability.sold / p.availability.total * 100) : 0;
    html += `<div class="editor-section"><h3>${t('projects.availability')}</h3>
      <div style="display:flex;gap:24px;align-items:center;">
        <div class="form-group" style="width:120px">
          <label>${t('projects.sold')}</label>
          <input type="number" id="avail-sold" value="${p.availability.sold}" min="0" max="${p.availability.total}" ${canEditSold ? '' : 'readonly'}>
        </div>
        <div class="form-group" style="width:120px">
          <label>${t('projects.total')}</label>
          <input type="number" id="avail-total" value="${p.availability.total}" min="1" readonly>
        </div>
        <div style="font-size:1.3rem;font-family:var(--font-heading);color:var(--color-cream)">${availPct}%</div>
      </div>
      ${canEditSold ? '' : `<small class="field-hint" style="margin-top:4px;display:block">${t('projects.availAutoHint')}</small>`}
    </div>`;

    // Hero Stats (4 languages)
    html += `<div class="editor-section"><h3>${t('projects.heroStats')}</h3>`;
    ['en', 'ru', 'id'].forEach(lng => {
      const stats = p.heroStats[lng] || [];
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
        <div class="form-group"><label>${t('projects.priceLabel')}</label><input type="text" class="showcase-input" data-lang="${lng}" data-field="showcasePrice" value="${(p.showcasePrice[lng] || '')}"></div>
        <div class="form-group" style="margin-top:8px"><label>${t('projects.description')}</label><textarea class="showcase-input" data-lang="${lng}" data-field="showcaseDesc" rows="2">${(p.showcaseDesc[lng] || '')}</textarea></div>
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

    // Only allow manual sold editing for Village (unitTypes without per-unit statuses)
    if (!p.units && p.unitTypes) {
      $('#avail-sold').addEventListener('input', (e) => {
        p.availability.sold = +e.target.value;
        markChanged();
      });
    }

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
    const globalKeys = ['comparisonLabels', 'comparisonData', 'unitTableHeaders', 'statusLabels', 'availabilityLabels', 'villageTableHeaders'];
    globalKeys.forEach(gk => { if (projectsData[gk]) data[gk] = projectsData[gk]; });

    return '/* eslint-disable */\nconst PROJECTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  // ─── SEO Editor ───
  const LANGS = ['en', 'ru', 'id'];
  const LANG_NAMES = { en: 'English', ru: 'Russian', id: 'Indonesian' };
  const BASE_URL = 'https://winstik13.github.io/global-bali-home';
  let seoCache = {}; // { lang: { html, sha, fields } }
  let currentSeoLang = 'en';

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
        const html = atob(file.content);
        const fields = extractSEO(html);
        return { lng, path, html, sha: file.sha, fields };
      }));

      results.forEach(r => { seoCache[r.lng] = r; });
      renderSeoFields();
    } catch (err) {
      editor.innerHTML = `<p style="color:var(--color-danger)">Error: ${err.message}</p>`;
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
    btn.style.marginLeft = '12px';
    actions.appendChild(btn);

    const btnSeo = document.createElement('button');
    btnSeo.id = 'btn-update-seo-only';
    btnSeo.className = 'btn btn--outline';
    btnSeo.textContent = t('projects.updateSeoOnly');
    btnSeo.style.marginLeft = '8px';
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

          let html = atob(file.content);
          const desc = (p.showcaseDesc && (p.showcaseDesc[cfg.lang] || p.showcaseDesc.en)) || p.name;
          const image = p.showcaseImage ? `https://winstik13.github.io/global-bali-home/${p.showcaseImage}` : '';

          html = replaceMeta(html, 'title', `${p.name} — Global Bali Home`);
          html = replaceMeta(html, 'description', desc);
          html = replaceMeta(html, 'ogTitle', `${p.name} — Global Bali Home`);
          html = replaceMeta(html, 'ogDescription', desc);
          if (image) html = replaceMeta(html, 'ogImage', image);

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
          <h2>${t('newProject.title')}</h2>
          <button class="admin-modal__close">&times;</button>
        </div>
        <div class="admin-modal__body">
          <div class="form-group"><label>${t('newProject.name')}</label><input type="text" id="np-name" placeholder="e.g. Serenity Heights"></div>
          <div class="form-group"><label>${t('newProject.slug')}</label><input type="text" id="np-slug" placeholder="serenity-heights" readonly></div>
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
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.showcaseImage')}</label><input type="text" id="np-image" placeholder="images/project/hero.jpg"></div>
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
    if (!siteData.contacts) siteData.contacts = { phone: '', phoneRaw: '', whatsapp: '', email: '', location: { en: '', ru: '', id: '' } };
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

  // ─── FAQ Editor ───
  let faqData = null;
  // faqChanged is now dirtyTabs.faq

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
          <div class="faq-editor-lang__label">${LANG_NAMES[lng]}</div>
          <div class="form-group"><label>${t('faq.question')}</label><input type="text" data-faq-field="question" data-faq-i="${i}" data-faq-lng="${lng}" value="${escAttr(item.question[lng] || '')}"></div>
          <div class="form-group"><label>${t('faq.answer')}</label><textarea data-faq-field="answer" data-faq-i="${i}" data-faq-lng="${lng}" rows="3">${escAttr(item.answer[lng] || '')}</textarea></div>
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
        dirtyTabs.faq = true;
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
        if (!confirm('Delete this FAQ item?')) return;
        const i = +btn.dataset.faqDelete;
        faqData.splice(i, 1);
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
  // testimonialsChanged is now dirtyTabs.testimonials

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
      return `<div class="faq-editor-item" data-test-idx="${i}">
        <div class="faq-editor-item__header">
          <span class="faq-editor-item__num">#${idx + 1}</span>
          <div class="faq-editor-item__controls">
            <button class="btn btn--icon" data-test-up="${i}" title="Move Up" ${idx === 0 ? 'disabled' : ''}>↑</button>
            <button class="btn btn--icon" data-test-down="${i}" title="Move Down" ${idx === sorted.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="btn btn--icon btn--danger" data-test-delete="${i}" title="Delete">🗑</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
          <div class="form-group"><label>${t('test.stars')}</label><input type="number" data-test-field="stars" data-test-i="${i}" min="1" max="5" value="${item.stars || 5}"></div>
        </div>
        ${LANGS.map(lng => `<div class="faq-editor-lang">
          <div class="faq-editor-lang__label">${LANGS_FULL[lng] || lng}</div>
          <div class="form-group"><label>${t('test.name')}</label><input type="text" data-test-field="name" data-test-i="${i}" data-test-lng="${lng}" value="${escAttr(item.name[lng] || '')}"></div>
          <div class="form-group"><label>${t('test.role')}</label><input type="text" data-test-field="role" data-test-i="${i}" data-test-lng="${lng}" value="${escAttr(item.role[lng] || '')}"></div>
          <div class="form-group"><label>${t('test.text')}</label><textarea data-test-field="text" data-test-i="${i}" data-test-lng="${lng}" rows="3">${escAttr(item.text[lng] || '')}</textarea></div>
        </div>`).join('')}
      </div>`;
    }).join('');

    // Bind input changes
    editor.querySelectorAll('[data-test-field]').forEach(el => {
      el.addEventListener('input', () => {
        const i = parseInt(el.dataset.testI);
        const field = el.dataset.testField;
        const lng = el.dataset.testLng;
        if (field === 'stars') {
          testimonialsData[i].stars = parseInt(el.value) || 5;
        } else {
          testimonialsData[i][field][lng] = el.value;
        }
        dirtyTabs.testimonials = true;
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
      if (!confirm('Delete this testimonial?')) return;
      testimonialsData.splice(i, 1);
      dirtyTabs.testimonials = true;
      renderTestimonialsEditor();
    }));
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

  // Colors tab activation
  const colorsNavBtn = document.querySelector('.admin-nav__btn[data-tab="colors"]');
  if (colorsNavBtn) {
    colorsNavBtn.addEventListener('click', () => {
      renderColorsTab();
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
