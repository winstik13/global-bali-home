/* ============================================
   ADMIN PANEL — Global Bali Home
   Supabase Auth + Supabase content storage
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
      'header.title': 'Admin Panel',
      'header.rateLabel': 'USD / IDR',
      'header.signOut': 'Sign Out',
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
      'dash.available': 'Available',
      'dash.progress': 'Progress',
      'dash.potential': 'Potential',
      'dash.price': 'Price',
      'dash.preSale': 'Pre-Sale',
      'dash.inProgress': 'In Progress',
      'dash.status_pre-sale': 'Pre-Sale',
      'dash.status_in-progress': 'In Progress',
      'dash.status_completed': 'Completed',
      'dash.status_sold-out': 'All Not Available',
      'dash.sold': 'Not Available',
      'dash.left': 'Available',
      'dash.priceRange': 'Price Range',
      'dash.editProject': 'Edit Project',
      'dash.viewOnSite': 'View on Site',
      'dash.recentChanges': 'Recent Changes',
      'dash.noChanges': 'No recent changes to project data.',
      'dash.couldNotLoad': 'Could not load commit history.',
      'dash.breakAvailable': 'available',
      'dash.breakSold': 'not available',
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
      'contacts.save': 'Save Contacts',
      'contacts.hint.phone': 'Display format, e.g. +62 813 251 438 49',
      'contacts.hint.whatsapp': 'Digits only, with country code, no +',
      'help.contacts.phone': '<strong>Phone:</strong> Any format with spaces/dashes, start with +country code.',
      'help.contacts.whatsapp': '<strong>WhatsApp:</strong> DIGITS ONLY, no +, spaces or dashes. Example: 6281325143849',
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
      'projects.unsaved': 'Unsaved changes',
      'projects.publishing': 'Publishing...',
      'projects.published': 'Published! Site updating (~1-2 min)',
      'projects.floorPlans': 'Floor Plans',
      'projects.noPlan': 'No plan',
      'projects.uploadPlan': 'Upload',
      'projects.deletePlan': 'Delete plan',
      'projects.confirmDeletePlan': 'Delete floor plan for {type}?',
      'projects.units': 'Units',
      'projects.unitTypes': 'Unit Types',
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
      'projects.priceLabel': 'Price',
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
      'faq.allProjects': 'All projects',
      'faq.projectHint': 'Which project does this question relate to? Choose "All projects" for general questions.',
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
      'analytics.title': 'Analytics & Tracking',
      'analytics.tracking': 'Direct Tracking (no GTM)',
      'analytics.gtm.title': 'Google Tag Manager',
      'analytics.gtm.warning': '⚠️ If GTM is used, leave the Tracking Services fields below EMPTY — duplicate trackers will inflate metrics.',
      'analytics.gtm': 'GTM Container ID',
      'analytics.hint.gtm': 'Container ID from tagmanager.google.com',
      'analytics.ga4': 'Google Analytics 4',
      'analytics.facebookPixel': 'Facebook Pixel',
      'analytics.yandexMetrika': 'Yandex Metrika',
      'analytics.clarity': 'Microsoft Clarity',
      'analytics.save': 'Save Analytics',
      'analytics.hint.ga4': 'Measurement ID from GA4 property',
      'analytics.hint.facebook': 'Pixel ID from Meta Events Manager',
      'analytics.hint.yandex': 'Counter ID from metrika.yandex.ru',
      'analytics.hint.clarity': 'Project ID from clarity.microsoft.com',
      'help.analytics.intro': '<strong>How it works:</strong> Paste your tracking IDs below. Scripts are injected automatically — no code changes needed.',
      'help.analytics.empty': '<strong>Empty field</strong> = tracker disabled. Fill in only the services you use.',
      'help.analytics.gtmConflict': '<strong>If GTM is connected above</strong> — leave all these fields empty. GTM handles tracking on its own.',
      'help.analytics.events': '<strong>Auto-tracked events:</strong> form submissions (contact, quiz, lead magnet, exit popup), WhatsApp clicks, PDF downloads.',
      'newUnit.title': 'Add New Unit',
      'newUnit.name': 'Unit Name',
      'newUnit.namePh': 'e.g. A1, B2, C3',
      'newUnit.nameHint': 'Fixed after creation — cannot be edited later.',
      'newUnit.type': 'Type',
      'newUnit.floors': 'Floors',
      'newUnit.add': 'Add Unit',
      'newUnit.cancel': 'Cancel',
      'newUnit.nameRequired': 'Unit name is required.',
      'newUnit.nameExists': 'Unit "{name}" already exists in this project.',
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
      'nav.users': 'Users',
      'users.title': 'Team Members',
      'users.invite': 'Invite a new member',
      'users.email': 'Email',
      'users.fullName': 'Full name',
      'users.role': 'Role',
      'users.send': 'Send invitation',
      'users.list': 'Active members',
      'users.you': 'you',
      'users.empty': 'No team members yet.',
      'users.col.email': 'Email',
      'users.col.name': 'Name',
      'users.col.role': 'Role',
      'users.col.status': 'Status',
      'users.col.lastSignIn': 'Last sign-in',
      'users.col.actions': 'Actions',
      'users.role.editor': 'Editor — gallery / FAQ / testimonials only',
      'users.role.admin': 'Admin — all content (no user management)',
      'users.role.editor.short': 'Editor',
      'users.role.admin.short': 'Admin',
      'users.role.super_admin.short': 'Super admin',
      'users.status.active': 'Active',
      'users.status.deactivated': 'Deactivated',
      'users.status.pending': 'Invited (pending)',
      'users.action.delete': 'Delete',
      'users.action.confirmDelete': 'Delete user {email}? This is irreversible.',
      'users.toast.sending': 'Sending invite…',
      'users.toast.sent': 'Invitation sent to {email}.',
      'users.toast.roleUpdated': 'Role updated.',
      'users.toast.userDeleted': 'User deleted.',
      // ── Brand Book ──
      'nav.brandbook': 'Brand Book',
      'bb.title': 'Brand Book',
      'bb.intro': "Visual identity guidelines for Global Bali Home. Reference for designers, marketers and partners. Click any value to copy.",
      'bb.nav.about': 'About',
      'bb.nav.voice': 'Tone of Voice',
      'bb.nav.logo': 'Logo',
      'bb.nav.rules': 'Logo Rules',
      'bb.nav.colors': 'Colors',
      'bb.nav.typography': 'Typography',
      'bb.nav.ui': 'UI Components',
      'bb.nav.icons': 'Icons',
      'bb.nav.photography': 'Photography',
      'bb.nav.margins': 'Margins',
      'bb.nav.social': 'Social Media',
      'bb.about.title': 'About the Brand',
      'bb.about.p1': "Global Bali Home is an international real estate company focused on the development of high-quality projects in Bali — one of the world's most attractive property markets. Drawing on global expertise in architecture, construction, and investment, we create projects defined by strong concepts and long-term value.",
      'bb.about.p2': 'Each development is delivered in line with international standards, combining solid investment potential with considered, refined design. Our approach goes beyond aesthetics: we create spaces designed for both comfortable living and sustainable income, with efficient layouts, high construction quality, and a long-term perspective.',
      'bb.about.p3': 'Global Bali Home brings together the character of Bali and international expertise through a strategic, forward-looking approach to real estate.',
      'bb.logo.title': 'Logo',
      'bb.logo.desc': 'Two systems coexist: the GBH parent brand and individual project marks (e.g. Serenity).',
      'bb.logo.primary': 'Primary — Global Bali Home',
      'bb.logo.project': 'Project Marks — Serenity',
      'bb.logo.projectDesc': 'Universal across formats (Villas, Estates, Village). Under the lotus — only «SERENITY», format goes in a separate caption.',
      'bb.logo.onDark': 'On Dark Green',
      'bb.logo.onLight': 'On Cream',
      'bb.logo.short': 'Short Logo — GBH',
      'bb.logo.shortDesc': 'For narrow contexts where the full wordmark won’t fit. Letters outlined from Montserrat Bold — SVG is portable, no font required.',
      'bb.logo.lightVer': 'Light variant',
      'bb.logo.fullcolor': 'Full-color asset',
      'bb.logo.clearspace': 'Clear Space',
      'bb.logo.clearspaceDesc': 'Minimum 1× the pyramid mark height (y) on every side. No text, graphics or other logos inside this zone — at any format.',
      'bb.logo.cs.cream': 'Cream · on dark',
      'bb.logo.cs.darkgreen': 'Dark Green · on cream',
      'bb.logo.minsize': 'Minimum Size',
      'bb.logo.minsizeDesc': 'Hard floor — below these sizes text stops being legible. Same minimum for all marks: 14px digital, 4mm print.',
      'bb.logo.minsize.group.full': 'Full Logo — pyramid + «GlobalBaliHome»',
      'bb.logo.minsize.group.short': 'Short Logo — pyramid + «GBH»',
      'bb.logo.minsize.group.mark': 'Favicon mark — pyramid only',
      'bb.logo.minsize.digitalFull': 'Digital · Full logo',
      'bb.logo.minsize.digitalFullUse': 'Absolute floor — tightest compact UI, footer credits',
      'bb.logo.minsize.printFull': 'Print · Full logo',
      'bb.logo.minsize.printFullUse': 'Business cards, contract footers, small ads',
      'bb.logo.minsize.digitalShort': 'Digital · Short logo',
      'bb.logo.minsize.digitalShortUse': 'Absolute floor — sticky bars, breadcrumbs, badges',
      'bb.logo.minsize.printShort': 'Print · Short logo',
      'bb.logo.minsize.printShortUse': 'Document signatures, brochure corners',
      'bb.logo.minsize.digitalMark': 'Digital · Favicon mark',
      'bb.logo.minsize.digitalMarkUse': 'Absolute floor — tab favicons, inline mentions',
      'bb.logo.minsize.printMark': 'Print · Favicon mark',
      'bb.logo.minsize.printMarkUse': 'Tags, badges, small repeated patterns',
      'bb.logo.favicon': 'Short Mark & Favicon',
      'bb.logo.faviconDesc': 'Pyramid mark in two premium colourways. Click any card to download the PNG in that size.',
      'bb.logo.favicon.cream': 'Cream · for dark backgrounds',
      'bb.logo.favicon.darkgreen': 'Dark Green · for light backgrounds',
      'bb.download.ico': 'ICO',
      'bb.download.svg': 'SVG',
      'bb.download.png': 'PNG',
      'bb.rules.title': 'Incorrect Usage',
      'bb.rules.desc': 'Avoid the following at any application:',
      'bb.rules.r1': 'The logo must not be distorted or resized in a way that alters its proportions.',
      'bb.rules.r2': 'Only the approved brand colors may be used.',
      'bb.rules.r3': 'The structure and order of the logo elements must remain unchanged.',
      'bb.rules.r4': 'The logo should only be placed on sufficiently contrasting brand backgrounds and must not be used on visually busy or highly detailed photographs.',
      'bb.colors.title': 'Color Palette',
      'bb.colors.desc': 'Brand colors are essential to the overall identity and emotional expression of the brand. The approved palette should be used consistently across all brand assets, including the logo. Color examples shown here are for reference — when precise reproduction is not possible, the closest visual match should be used.',
      'bb.colors.intro': 'Palette organised by role. Every value is paired with its use case — surface, brand, accent, or shade. Click any swatch to copy its HEX.',
      'bb.colors.surfacesDesc': 'Foundational backgrounds. Every screen sits on one of these three surfaces — page, raised panels, alternative sections.',
      'bb.colors.mainDesc': "The brand's two signature colours. Their combination — Dark Green + Cream — is how the brand is recognised across logo, hero blocks and headlines.",
      'bb.colors.supportingDesc': 'Auxiliary tones for contrast moments — inverted surfaces, forms on dark backgrounds, materials printed on coloured stock.',
      'bb.colors.accentDesc': 'The single active colour — reserved for things that demand attention: links, CTAs, progress, success states, eyebrow tags. Never used as background.',
      'bb.colors.main': 'Main',
      'bb.colors.supporting': 'Supporting',
      'bb.colors.accent': 'Accent',
      'bb.colors.surfaces': 'Surfaces',
      'bb.colors.darkGreen': 'Dark Green',
      'bb.colors.white': 'White',
      'bb.colors.creamLight': 'Cream Light',
      'bb.colors.cream': 'Cream',
      'bb.colors.deepGreen': 'Deep Green',
      'bb.typo.title': 'Typography',
      'bb.typo.desc': 'Two typefaces: <strong>Playfair Display</strong> for headings, <strong>Montserrat</strong> for body and UI. Editorial-meets-modern voice.',
      'bb.typo.headings': 'Headings — Display',
      'bb.typo.body': 'Body — UI',
      'bb.typo.family': 'Family',
      'bb.typo.weight': 'Weight',
      'bb.typo.spacing': 'Letter spacing',
      'bb.typo.lineHeight': 'Line height',
      'bb.typo.weights': 'Available Weights',
      'bb.typo.weightsHead': 'Available Weights — Playfair Display',
      'bb.typo.weightsBody': 'Available Weights — Montserrat',
      'bb.typo.scale': 'Type Scale',
      'bb.typo.scaleDesc': 'Site uses <code>html { font-size: 112.5% }</code>, so <strong>1rem = 18px</strong>. All sizes pulled from <code>css/style.css</code>.',
      'bb.typo.tokens': 'Size Tokens',
      'bb.typo.tokensDesc': 'CSS custom properties on <code>:root</code>. Reference tokens — never hardcode <code>rem</code> or <code>px</code>.',
      // Voice
      'bb.voice.title': 'Tone of Voice',
      'bb.voice.intro': 'Four attributes that combine, not compete. Applied across every channel — from sales calls to Instagram captions.',
      'bb.voice.attributes': 'Voice Attributes',
      'bb.voice.a1.title': 'Grounded',
      'bb.voice.a1.desc': 'We speak in numbers, contracts, and verifiable facts. No empty superlatives.',
      'bb.voice.a1.tag': 'We are confident, not boastful.',
      'bb.voice.a2.title': 'Considered',
      'bb.voice.a2.desc': "Every sentence earns its place. We respect the reader's time and intelligence.",
      'bb.voice.a2.tag': 'We are precise, not curt.',
      'bb.voice.a3.title': 'Transparent',
      'bb.voice.a3.desc': 'Full legality is our USP. We disclose ownership, leasehold terms, fees, and risks upfront.',
      'bb.voice.a3.tag': 'We are honest, not naive.',
      'bb.voice.a4.title': 'Calm',
      'bb.voice.a4.desc': 'Bali is nature, breath, perspective. We never pressure. Urgency comes from real facts, not artificial scarcity.',
      'bb.voice.a4.tag': 'We are inviting, not pushy.',
      'bb.voice.examples': "We Say / We Don't Say",
      'bb.voice.yes': 'We say',
      'bb.voice.no': "We don't say",
      'bb.voice.ex1.yes': '"Leasehold: 29 years initial + 30-year extension under signed PPJB."',
      'bb.voice.ex1.no': '"59-year ownership!" <em>(misleading — extension is conditional)</em>',
      'bb.voice.ex2.yes': '"Investment developer focused on Bali villas, legal title and managed rental income."',
      'bb.voice.ex2.no': '"Luxury villa builder in Bali paradise!" <em>(empty superlatives, no positioning)</em>',
      'bb.voice.ex3.yes': '"Available units in Wanayu — 3 out of 12. Handover Q4 2026."',
      'bb.voice.ex3.no': '"Hurry, only a few left!" <em>(artificial scarcity)</em>',
      'bb.voice.ex4.yes': '"PT-PMA structure, taxes filed quarterly, all permits in your name."',
      'bb.voice.ex4.no': "\"Don't worry about the legal stuff — we handle it.\" <em>(opaque, undermines trust)</em>",
      'bb.voice.langRules': 'Language Rules — EN ↔ RU',
      'bb.voice.lr1': 'RU: brand names stay in Latin script — <strong>Global Bali Home</strong>, <strong>Serenity Villas</strong>, <strong>Wanayu</strong>. Never transliterate ("Глобал Бали Хоум" is wrong).',
      'bb.voice.lr2': 'RU: no anglicisms when a normal Russian word exists. "эстейт", "single-family", "драйвер", "офер" → use plain Russian equivalents.',
      'bb.voice.lr3': 'RU: no calques like "коридор Убуда". Use "в Убуде", "в районе Убуда", or the specific village name.',
      'bb.voice.lr4': 'Positioning: <strong>"international investment developer in Bali"</strong> / <strong>"международный инвестиционный девелопер на Бали"</strong>. Not "villa builder", not "tied to Ubud".',
      'bb.voice.lr5': 'Pricing: every USD figure must be accompanied by IDR (Indonesian law UU 7/2011). On the site IDR is primary, USD is auxiliary reference.',
      'bb.voice.channels': 'By Channel',
      'bb.voice.ch.web': 'Website / Landings',
      'bb.voice.ch.web.desc': 'Full register. Facts first, emotion as flavour. Numbers in headlines beat adjectives.',
      'bb.voice.ch.email': 'Email / WhatsApp',
      'bb.voice.ch.email.desc': "Conversational but still precise. Use the client's name. Short paragraphs. No exclamation marks.",
      'bb.voice.ch.social': 'Instagram / Telegram',
      'bb.voice.ch.social.desc': 'Shorter, more visual. Lead with one strong line. Lowercase project names allowed in headlines.',
      'bb.voice.ch.ads': 'Paid Ads',
      'bb.voice.ch.ads.desc': 'One claim, one number, one CTA. Never "click here". Specify the action — "See available units", "Download leasehold guide".',
      // Colors expansion
      'bb.colors.tints': 'Tints & Shades',
      'bb.colors.tintsDesc': '10-stop scales for hover, borders, dividers, disabled UI, charts. Base sits at 500–800 depending on the colour.',
      'bb.colors.combos': 'Approved Combinations',
      'bb.colors.combosDesc': 'Curated pairings tested for contrast. Apply the 60-30-10 rule: main / secondary / accent.',
      'bb.colors.wcag': 'Accessibility — WCAG Contrast',
      'bb.colors.wcagDesc': 'Validated against WCAG 2.1. AA = 4.5:1, AAA = 7:1. All pairs below pass AAA — readable with reduced vision.',
      'bb.colors.wcag.pair': 'Pair',
      'bb.colors.wcag.preview': 'Preview',
      'bb.colors.wcag.ratio': 'Ratio',
      'bb.colors.wcag.grade': 'Grade',
      // UI
      'bb.ui.title': 'UI Components',
      'bb.ui.intro': 'Interface elements in brand colours. Work in both light (Cream) and dark (Deep Green) modes.',
      'bb.ui.buttons': 'Buttons',
      'bb.ui.forms': 'Form Controls',
      'bb.ui.cards': 'Cards',
      'bb.ui.tags': 'Tags & Badges',
      'bb.icons.title': 'Symbolic & Icons',
      'bb.icons.desc': 'Visual aids for navigation and clarity. Use on contrasting backgrounds at consistent sizes.',
      'bb.photo.title': 'Photography & Imagery',
      'bb.photo.intro': 'Calm, nature-driven Bali lifestyle: warmth and atmosphere, not overt luxury.',
      'bb.photo.do': 'Do',
      'bb.photo.dont': "Don't",
      'bb.photo.do1': 'Use natural light, soft daylight, gentle diffused illumination.',
      'bb.photo.do2': 'Keep compositions open and balanced with clear horizontals.',
      'bb.photo.do3': 'Focus on architecture, nature, and surrounding environment.',
      'bb.photo.do4': 'Maintain a consistent visual rhythm and high-quality standards.',
      'bb.photo.do5': 'License all stock images legally before use.',
      'bb.photo.dont1': 'Harsh shadows or high-contrast studio lighting.',
      'bb.photo.dont2': 'Staged or exaggerated emotions in stock photos.',
      'bb.photo.dont3': 'Heavy retouching or HDR effects.',
      'bb.photo.dont4': 'Overly promotional or aggressive imagery.',
      'bb.photo.dont5': 'Tight close-up details over wider environmental shots.',
      'bb.margins.title': 'Margins',
      'bb.margins.desc': 'Standard layout margin 80px digital, 30mm for A4 print. Provides rhythm across formats.',
      'bb.margins.margin': 'Margin',
      'bb.social.title': 'Social Media',
      'bb.social.desc': 'Templates for Instagram posts and stories. Brand colours, Montserrat, project name in lowercase.',
      'bb.social.posts': 'Posts · 1:1',
      'bb.social.stories': 'Stories · 9:16',

      // ===== BRAND BOOK — Phase 2: Motion / Logo ext / Color app / Typo comp / Multilingual =====

      // 07 Motion
      'bb.nav.motion': 'Motion',
      'bb.motion.title': 'Motion',
      'bb.motion.lede': 'Animation is not decoration — it is <strong>part of the brand</strong>. Calm, considered motion communicates confidence. Sharp, fast — cheapness. All movement runs on 4 duration tokens and 3 easing curves.',
      'bb.motion.durations': '4 duration tokens · :root',
      'bb.motion.durationsTitle': 'Durations',
      'bb.motion.durationsDesc': 'Any animation on the site uses one of four durations. No arbitrary <code>350ms</code> or <code>600ms</code> in code — only these 4 tokens.',
      'bb.motion.fastUse': 'Hover states, focus rings, button feedback',
      'bb.motion.baseUse': 'Cards, dropdowns, tooltips, accordion',
      'bb.motion.slowUse': 'Modals, drawers, large reveals',
      'bb.motion.heroUse': 'Page transitions, hero parallax, scroll reveals',
      'bb.motion.eases': '3 easing curves · cubic-bezier',
      'bb.motion.easesTitle': 'Easing curves',
      'bb.motion.easesDesc': 'Three curves cover 95% of cases. Linear <code>linear</code> — only for progress bars and loading indicators.',
      'bb.motion.ease.standard': 'Standard',
      'bb.motion.ease.standardUse': 'Default for anything that appears or disappears in UI. Hover, dropdown, modal.',
      'bb.motion.ease.expressive': 'Expressive',
      'bb.motion.ease.expressiveUse': 'Hero reveals, parallax, scroll triggers. Slight "throw" at the end — premium feel.',
      'bb.motion.ease.exit': 'Exit / sharp',
      'bb.motion.ease.exitUse': 'Closing modals, dismiss, swipe-out. Sharp start, fast exit.',
      'bb.motion.principles': '6 motion principles',
      'bb.motion.principlesTitle': 'Motion principles',
      'bb.motion.principlesDesc': 'Six rules that separate premium motion from cheap motion. If anything moves on the site — it passes through this filter.',
      'bb.motion.pr1.title': 'Purpose, not decoration',
      'bb.motion.pr1.desc': 'Every animation solves a problem: feedback, hierarchy, orientation. "Just nice" is not a reason.',
      'bb.motion.pr2.title': 'Calm pace',
      'bb.motion.pr2.desc': 'Default — Standard 250 ms. Faster only for feedback (150 ms). Slower only for large reveals.',
      'bb.motion.pr3.title': 'Spatial logic',
      'bb.motion.pr3.desc': 'Elements appear from bottom / right (where they "came from"), disappear in the same direction. No random directions.',
      'bb.motion.pr4.title': 'Choreography',
      'bb.motion.pr4.desc': 'A list of elements — staggered (40 ms delay between). Not all at once, not one by one with a long pause.',
      'bb.motion.pr5.title': 'Performance first',
      'bb.motion.pr5.desc': 'Only <code>transform</code> and <code>opacity</code>. No <code>width</code>, <code>height</code>, <code>top/left</code> — they jank.',
      'bb.motion.pr6.title': 'Respect reduced-motion',
      'bb.motion.pr6.desc': 'If the user disabled animations in the system — everything falls back to fade without motion. See rule below.',
      'bb.motion.logo': 'Brand reveal · logo intro',
      'bb.motion.logoTitle': 'Logo animation',
      'bb.motion.logoDesc': 'Logo appearance at the start of a video, on page load or in an email signature. 600 ms · expressive easing · fade + slight scale + slight Y-shift. No lasers, sparks or sound effects.',
      'bb.motion.logoSpec': 'Specification',
      'bb.motion.a11y': 'Accessibility · prefers-reduced-motion',
      'bb.motion.a11yTitle': 'Respect system settings',
      'bb.motion.a11ySubTitle': 'Reduced-motion fallback',
      'bb.motion.a11yDesc': 'If the user has <code>prefers-reduced-motion: reduce</code> set (Windows Settings → Accessibility, macOS → Reduce motion) — all animations longer than 200 ms fall back to <code>opacity</code> fade without transform. This is WCAG 2.1, non-negotiable.',

      // 03 Logo extensions
      'bb.logo.vlock': 'Vertical lockup · 2 colourways',
      'bb.logo.vlockTitle': 'Vertical lockup',
      'bb.logo.vlockDesc': 'For square avatars (LinkedIn, Telegram, print seals), narrow formats and scenarios where the horizontal lockup doesn’t fit. Pyramid on top, wordmark below, centred. Gap between mark and wordmark — half the pyramid height.',
      'bb.logo.cobrand': 'Co-branding · 3 patterns',
      'bb.logo.cobrandTitle': 'Sharing the row with partners',
      'bb.logo.cobrandDesc': 'When our logo appears next to a partner bank, agency or law firm — we are always on the left, the partner is on the right, separated by a thin vertical divider (height = text height). Logos must be optically the same size, not mathematically.',
      'bb.logo.cobrand1': 'Banking partner · escrow & mortgages',
      'bb.logo.cobrand2': 'Legal counsel · PT-PMA, PPJB, sertifikat',
      'bb.logo.cobrand3': 'Brokerage partner · referral programme',
      'bb.logo.onphoto': 'Logo on photo · 3 treatments',
      'bb.logo.onphotoTitle': 'Logo on photography',
      'bb.logo.onphotoDesc': 'On a photo the logo reads poorly without treatment. Three techniques: a light gradient from the top (for bright photos), a semi-transparent scrim (for complex ones), and — never — a bare logo on a detailed background.',
      'bb.logo.onphoto.ok': 'Light gradient · top-down',
      'bb.logo.onphoto.scrim': 'Full scrim · 30–70% opacity',
      'bb.logo.onphoto.bad': 'Bare logo on busy photo',

      // 05 Color application
      'bb.colors.app': 'Real application · 60-30-10 on the page',
      'bb.colors.appTitle': 'Colour at work',
      'bb.colors.appDesc': 'The palette in action — a slice of the home page. You can see how 5 colours distribute by the 60-30-10 rule: main background, sections, accents. Pins mark where each colour lives.',
      'bb.colors.app.heroTitle': 'Structured assets on Bali — 29+30 leasehold, verifiable title',
      'bb.colors.app.heroSub': '12 villas. 3 available. Handover Q4 2026. Managed rental 10–12% / year.',
      'bb.colors.app.card1eb': 'Available',
      'bb.colors.app.card2eb': 'Available',
      'bb.colors.app.card3eb': 'Sold',
      'bb.colors.app.legendTitle': 'Colours on the page',
      'bb.colors.app.legendDesc': 'Hero — Deep Green (60%). Body — Bg Primary (30%). Eyebrows and CTA — Accent + Cream (10%).',

      // 06 Typography composition
      'bb.typo.comp': 'Real composition · full layout',
      'bb.typo.compTitle': 'Typography in a real layout',
      'bb.typo.compDesc': 'Sizes in isolation are specimens. Here they work together: eyebrow, H1, lede, H3 cards, body, CTA. This is the layout benchmark for project page and landing.',
      'bb.typo.comp.eyebrow': 'Serenity Villas · Ubud area · Q4 2026',
      'bb.typo.comp.h1': 'Structured assets <em>on</em> the most beautiful island on earth',
      'bb.typo.comp.lede': '12 villas. 3 available. Leasehold 29 + 30 years with verifiable PPJB. Managed rental delivers 10–12% per year, reports quarterly. We don’t sell square metres — we deliver a structured asset.',
      'bb.typo.comp.cta': 'Reserve a viewing',
      'bb.typo.comp.col1title': 'Legal title',
      'bb.typo.comp.col1desc': 'PT-PMA structure, leasehold 29 years initial + 30 years extension under signed PPJB. Documents in your name, taxes filed quarterly.',
      'bb.typo.comp.col2title': 'Managed yield',
      'bb.typo.comp.col2desc': '10–12% net per year under our property management. Quarterly reports, transparent fees, zero hidden charges in the contract.',
      'bb.typo.comp.col3title': 'International build',
      'bb.typo.comp.col3desc': 'European architects, seismic engineering, premium materials. Construction time 14–18 months with milestone updates each two weeks.',
      'bb.typo.comp.ann1': 'Accent green · top of hero',
      'bb.typo.comp.ann2': 'Max 7 words · italic accent',
      'bb.typo.comp.ann3': 'Max 3 lines under H1',
      'bb.typo.comp.ann4': 'Serif subheads',
      'bb.typo.comp.ann5': 'Cream fill · Dark Green text',

      // 13 Multilingual & Naming
      'bb.nav.ml': 'Multilingual',
      'bb.ml.title': 'Multilingual & Naming',
      'bb.ml.lede': 'The brand operates in three markets: RU, EN, INA (internal). For materials to feel like one product, we share unified <strong>address rules, price formats, dates and project names</strong>.',
      'bb.ml.parity': 'Parity rules · 5 RU ↔ EN rules',
      'bb.ml.parityTitle': 'Language parity',
      'bb.ml.parityDesc': 'EN and RU are equal first languages. No "Google-translate version". Every publication ships in both languages at the same time.',
      'bb.ml.r1n': 'Facts, structure, ownership — three beats. No "amazing".',
      'bb.ml.r2n': 'Brand names in Latin. "Вы" capitalised. No "estate" (calque).',
      'bb.ml.r3n': '"59 years" misleading · superlatives · false urgency.',
      'bb.ml.r4n': 'Calque "эстейт" · "коридор Убуда" · transliterated brand · "59 years".',
      'bb.ml.naming': 'Naming conventions · 6 categories',
      'bb.ml.namingTitle': 'Naming formula',
      'bb.ml.namingDesc': 'Each entity has its formula: project, unit, URL, marketing asset file. This lets the team work the same way regardless of country or channel.',
      'bb.ml.naming.cat': 'Category',
      'bb.ml.naming.pat': 'Pattern',
      'bb.ml.naming.ex': 'Example',
      'bb.ml.naming.cat1': 'Project',
      'bb.ml.naming.cat2': 'Unit',
      'bb.ml.naming.cat3': 'URL',
      'bb.ml.naming.cat4': 'Marketing file',
      'bb.ml.naming.cat5': 'Email signature',
      'bb.ml.naming.cat6': 'Social handle',
      'bb.ml.formats': 'Formats · prices, dates, phones',
      'bb.ml.formatsTitle': 'Data formats',
      'bb.ml.formatsDesc': 'All materials — site, contract, email — use the same formats. This is not cosmetic; it reduces the risk of a price error on a $500K deal.',
      'bb.ml.fmt.priceRu': 'RU · price',
      'bb.ml.fmt.priceRuNote': 'IDR primary (UU 7/2011), USD aux. Non-breaking spaces as thousands separators.',
      'bb.ml.fmt.priceEn': 'EN · price',
      'bb.ml.fmt.priceEnNote': 'IDR primary. Comma as thousands separator. "USD" prefix, not "$".',
      'bb.ml.fmt.dateRu': 'RU · date',
      'bb.ml.fmt.dateRuNote': 'Month spelled out in hero, ISO digits in tables, quarters for handover dates.',
      'bb.ml.fmt.dateEn': 'EN · date',
      'bb.ml.fmt.dateEnNote': 'DMY in copy, ISO-8601 in tables and contracts. Quarters for handover.',
      'bb.ml.fmt.phone': 'Phone · WhatsApp',
      'bb.ml.fmt.phoneNote': 'E.164 format · "+" prefix · 3-4-4 grouping. No brackets or dashes.',
      'bb.ml.fmt.address': 'Project address',
      'bb.ml.fmt.addressNote': 'Balinese format: street · village · district · region · ZIP. No "Indonesia" at the end.',

      // ===== BRAND BOOK — 09 Photography mood-board =====
      'bb.photo.mood': 'Mood board · 12 reference shots',
      'bb.photo.moodTitle': 'Brand aesthetic in 12 frames',
      'bb.photo.moodDesc': 'When you hire a photographer or pick stock — this is the benchmark. Every shot must land in this atmosphere: warm light, open composition, nature reads. No gloss, no "heroic" sunsets.',
      'bb.photo.m1': 'Aerial · project view',
      'bb.photo.m2': 'Architecture · villa exterior',
      'bb.photo.m3': 'Balinese landscape',
      'bb.photo.m4': 'Interior · guest area',
      'bb.photo.m5': 'Rice terraces',
      'bb.photo.m6': 'Pool · open plan',
      'bb.photo.m7': 'Living room · day',
      'bb.photo.m8': 'Bathroom · materials',
      'bb.photo.m9': 'Night · warm lighting',
      'bb.photo.m10': 'Exterior · ¾ angle',
      'bb.photo.m11': 'Bird-eye · master plan',
      'bb.photo.specs': 'Production specs · 4 rules',
      'bb.photo.specsTitle': 'Technical standards',
      'bb.photo.specsDesc': 'These 4 specifications go to the photographer and 3D artist before the shoot. Without them the brand gets a "generic real-estate kit" instead of its own aesthetic.',
      'bb.photo.spec.drone': 'Drone',
      'bb.photo.spec.droneTitle': 'Aerial photography',
      'bb.photo.spec.drone1': 'Altitude: 30 / 80 / 120 m (3 options)',
      'bb.photo.spec.drone2': 'Time: golden hour ±1 h from sunset',
      'bb.photo.spec.drone3': 'Composition: 60% sky / 40% subject',
      'bb.photo.spec.drone4': 'No vertical 90° "map view"',
      'bb.photo.spec.render': '3D render',
      'bb.photo.spec.renderTitle': 'Render quality',
      'bb.photo.spec.render1': 'Minimum 4K (<code>3840×2160</code>)',
      'bb.photo.spec.render2': 'Day-lit · no night scenes by default',
      'bb.photo.spec.render3': 'Real materials, not glossy plastic',
      'bb.photo.spec.render4': 'No fake people · 1 silhouette max',
      'bb.photo.spec.grading': 'Color grading',
      'bb.photo.spec.gradingTitle': 'Colour grading',
      'bb.photo.spec.grading1': 'Warm tint <code>+200 K</code> from neutral',
      'bb.photo.spec.grading2': 'Matte profile, not glossy',
      'bb.photo.spec.grading3': 'Medium contrast, no HDR crunch',
      'bb.photo.spec.grading4': 'Saturation −5% from RAW',
      'bb.photo.spec.ai': 'AI imagery',
      'bb.photo.spec.aiTitle': 'AI imagery · policy',
      'bb.photo.spec.ai1': '<strong>OK:</strong> mood-boards, internal drafts',
      'bb.photo.spec.ai2': '<strong>OK:</strong> social filler, blog illustrations',
      'bb.photo.spec.ai3': '<strong>Never:</strong> real-estate listings, hero pages',
      'bb.photo.spec.ai4': '<strong>Never:</strong> "client" photos, GBH team',
      'bb.photo.principles': 'Principles · checklist',
      'bb.photo.principlesTitle': 'Shoot & stock-selection checklist',

      // ===== BRAND BOOK — 05 Print production =====
      'bb.colors.print': 'Print production · CMYK + Pantone + paper',
      'bb.colors.printTitle': 'Colour for print',
      'bb.colors.printDesc': 'HEX and RGB are screen values. For business cards, contracts, brochures and outdoor we need <strong>CMYK</strong> (process) and <strong>Pantone PMS</strong> (spot). These values are mandatory in any print order.',
      'bb.colors.print.color': 'Color',
      'bb.colors.print.use': 'Use case',
      'bb.colors.print.darkGreenUse': 'Logo, contracts, hero of printed materials',
      'bb.colors.print.creamUse': 'Premium backgrounds, lookbook covers',
      'bb.colors.print.creamLightUse': 'Brochure body pages, documents, off-white backgrounds',
      'bb.colors.print.deepGreenUse': 'Premium covers, endpapers, dark sections of the catalogue',
      'bb.colors.print.accentUse': 'Embossing, logo foil-stamping, active elements',
      'bb.colors.print.note': 'Pantone equivalents are approximate — for exact match (foil-stamping, brand-critical covers) <strong>always</strong> order Pantone comparison against a physical swatch before run.',
      'bb.colors.printRules': 'Production rules · paper + ink + finish',
      'bb.colors.printRulesTitle': 'Production rules',
      'bb.colors.printRulesDesc': 'These 3 specifications go to the printer with the artwork. Without them the brand prints "near enough".',
      'bb.colors.print.paper': 'Paper',
      'bb.colors.print.paperTitle': 'Stock and weight',
      'bb.colors.print.paperDesc': 'Business cards — <code>uncoated</code> 350 g/m², warm white tone. Brochures — <code>matte coated</code> 170 g/m² body + 300 g/m² cover. Premium lookbook — <code>Munken Pure</code> 130 g/m² (warm off-white, fits Cream).',
      'bb.colors.print.ink': 'Ink coverage',
      'bb.colors.print.inkTitle': 'Coverage and dot size',
      'bb.colors.print.inkDesc': 'Total ink coverage no more than <code>280%</code> (CMYK sum), otherwise set-off risk. Minimum dot for body text on Cream/Cream Light — <code>6 pt</code>, on Dark Green — <code>7 pt</code> (thin reads worse on dark).',
      'bb.colors.print.finish': 'Finish',
      'bb.colors.print.finishTitle': 'Foil and coating',
      'bb.colors.print.finishDesc': 'Logo on premium covers — <code>foil-stamping</code> Pantone 4685 (Cream) or silk-screen Dark Green. No glossy UV varnish full-bleed — only <code>spot UV</code> over the logo.',

      // ===== BRAND BOOK — 02 Voice depth =====
      'bb.voice.para': 'Paragraphs · long-form examples',
      'bb.voice.paraTitle': 'Voice in finished texts',
      'bb.voice.paraDesc': 'Three most frequent contexts — villa listing, post-viewing follow-up, delay notice. This is the benchmark: new copy must sound the same.',
      'bb.voice.para1.type': 'Property listing',
      'bb.voice.para1.body': 'Serenity Villas — twelve 2-bedroom villas in central Ubud. Handover Q4 2026. Title — leasehold 29 years + 30-year extension under signed PPJB. 3 of 12 units available, prices from $189,000. Managed rental delivers 10–12% per year, reports quarterly.',
      'bb.voice.para1.metaA': 'Channel · website, project page',
      'bb.voice.para1.metaB': '≈ 50 words',
      'bb.voice.para2.type': 'Follow-up email',
      'bb.voice.para2.body': 'Alexander, thank you for visiting Wanayu on Saturday. Attached: PPJB for unit B7, 5-year ROI projection and legal-flow timeline. Questions — I am available today until 6 pm Moscow time. If you decide — we can reserve the unit until end of the week with no commitment.',
      'bb.voice.para2.metaA': 'Channel · email, personal',
      'bb.voice.para2.metaB': '≈ 45 words',
      'bb.voice.para3.type': 'Delay notification',
      'bb.voice.para3.body': 'Handover of unit B7 moves from Q3 to Q4 2026. Reason — engineering rework after the audit, to meet new seismic standards. This is our decision, we absorb the timeline to protect quality. Compensation — two years of free property management after handover.',
      'bb.voice.para3.metaA': 'Channel · email, transactional',
      'bb.voice.para3.metaB': '≈ 55 words',

      'bb.voice.formulas': '5 headline formulas',
      'bb.voice.formulasTitle': 'How to build a headline',
      'bb.voice.formulasDesc': 'Any headline follows one of five formulas. No "exclusive offers", no "unique opportunities" — only specifics.',

      'bb.voice.cta': 'CTA library · 12 patterns',
      'bb.voice.ctaTitle': 'Buttons and calls to action',
      'bb.voice.ctaDesc': 'Each CTA names a <strong>concrete action</strong>, not abstract "learn more". Use these 12 — do not invent new without reason.',
      'bb.voice.cta1.ctx': 'Project page hero · primary action',
      'bb.voice.cta2.ctx': 'Listing page · secondary nav',
      'bb.voice.cta3.ctx': 'Lead magnet · education funnel',
      'bb.voice.cta4.ctx': 'Contact page · main contact CTA',
      'bb.voice.cta5.ctx': 'FAQ · trust signal',
      'bb.voice.cta6.ctx': 'Investor tool · ROI calculator',
      'bb.voice.cta7.ctx': 'Project page · video tour',
      'bb.voice.cta8.ctx': 'Hero · qualified lead',
      'bb.voice.cta9.ctx': 'Project details · download',
      'bb.voice.cta10.ctx': 'Sold-out project · capture interest',
      'bb.voice.cta11.ctx': 'Listing · helper utility',
      'bb.voice.cta12.ctx': 'Footer · long-form education',

      'bb.voice.msg': 'System messages · brand in product',
      'bb.voice.msgTitle': 'System messages',
      'bb.voice.msgDesc': 'Validation error, success, 404, 500 — these are the <strong>most visible</strong> places of the brand inside the product. Never "something went wrong" — always specifics and a human tone.',
      'bb.voice.msg.err': 'Validation error',
      'bb.voice.msg.err.text': 'Please include a country code (+62, +7, +971…). Without it we cannot call back.',
      'bb.voice.msg.ok': 'Form success',
      'bb.voice.msg.ok.text': 'Thank you, Anna. The investment manager will contact you within 24 hours on WhatsApp +62 812 3456 7890.',
      'bb.voice.msg.confirm': 'Booking confirmed',
      'bb.voice.msg.confirm.text': 'Serenity Villas viewing is booked for 15 March, 11:00. Address and driver — one day before the visit on WhatsApp.',
      'bb.voice.msg.sold': 'Sold notification',
      'bb.voice.msg.sold.text': 'Unit B7 is sold. 2 villas left on this floor — view remaining.',
      'bb.voice.msg.e404': '404 · page',
      'bb.voice.msg.e404.text': 'This page is no longer here. Browse current projects or return to the home page.',
      'bb.voice.msg.e500': '500 · server',
      'bb.voice.msg.e500.text': 'Outage on our side. The team already sees it, usually fixed in 5–10 minutes. Try refreshing the page.',

      'bb.voice.matrix': 'Voice matrix · 2×2',
      'bb.voice.matrixTitle': 'Which register, when',
      'bb.voice.matrixDesc': 'Two axes: formality × language complexity. Every channel falls into one of four cells. Changing register between cells — normal. Mixing inside one piece — no.',
      'bb.voice.matrix.technical': 'Technical · detailed',
      'bb.voice.matrix.accessible': 'Accessible · plain',
      'bb.voice.matrix.formal': 'Formal',
      'bb.voice.matrix.casual': 'Casual',
      'bb.voice.matrix.q1.title': 'Contracts, PPJB',
      'bb.voice.matrix.q1.desc': 'Legal terminology, full formulations, nothing abbreviated. No "etc.", no "convenient".',
      'bb.voice.matrix.q1.use': '→ contracts, legal docs, investor memo',
      'bb.voice.matrix.q2.title': 'Hero, home page',
      'bb.voice.matrix.q2.desc': 'Serious tone, no jargon. "Structured asset" yes; "PPJB compliance framework" no.',
      'bb.voice.matrix.q2.use': '→ site hero, investor pitch deck',
      'bb.voice.matrix.q3.title': 'FAQ, documentation',
      'bb.voice.matrix.q3.desc': 'Conversational but precise. "How leasehold 29+30 works" — with numbers and formula, in human language.',
      'bb.voice.matrix.q3.use': '→ FAQ, help center, knowledge base',
      'bb.voice.matrix.q4.title': 'Social, newsletter',
      'bb.voice.matrix.q4.desc': 'Light, image-driven, but no over-familiarity. Humour — yes. Emoji — one per post, max.',
      'bb.voice.matrix.q4.use': '→ Instagram, Telegram, email newsletter',

      'bb.voice.pron': 'EN · address',
      'bb.voice.pronTitle': 'Address rules · EN ↔ RU',
      'bb.voice.pronDesc': 'EN — single "you" register, no distinction. RU — default <strong>«Вы»</strong> for premium real estate. "Ты" allowed only in informal channels (Instagram captions, Reels). Never "ты" in email, documents, web body copy.',
      'bb.voice.pron.default': 'Default · 95% of contexts',
      'bb.voice.pron.casual': 'Casual · 5% of contexts',
      'bb.voice.pron.never': 'Never',
      'bb.voice.pron.youUse': 'Website, email, WhatsApp with client, contracts, documents, sales calls, pitch decks, offers.',
      'bb.voice.pron.tyUse': 'Instagram captions, Reels, Telegram channel. Only when the format is obviously informal.',
      'bb.voice.pron.neverUse': 'Impersonal constructions like "download is available". Always either "You can…" or a direct verb — "Download…".',

      // ===== BRAND BOOK — 00 Foundations =====
      'bb.nav.foundations': 'Foundations',
      'bb.fnd.title': 'Foundations',
      'bb.fnd.lede': 'Before we talk colour and logo — who we are, why and for whom. This chapter is a <strong>contract between the team and the brand</strong>. Re-read quarterly. Change only deliberately.',
      'bb.fnd.mv': 'Mission & vision',
      'bb.fnd.mvTitle': 'Why we exist and where we’re going',
      'bb.fnd.mvDesc': 'Mission — why we exist today. Vision — where we’ll be by 2030. Every decision is tested against these two sentences.',
      'bb.fnd.mission': 'Mission',
      'bb.fnd.missionText': 'Make cross-border real estate investing as transparent and clear as ordering a taxi in an app.',
      'bb.fnd.missionHorizon': 'Horizon — today and every day',
      'bb.fnd.vision': 'Vision',
      'bb.fnd.visionText': 'By 2030 — the standard for cross-border investing in emerging tropical real estate, starting in Southeast Asia.',
      'bb.fnd.visionHorizon': 'Horizon — 5 years',
      'bb.fnd.values': '4 values · principles',
      'bb.fnd.valuesTitle': 'How we make decisions',
      'bb.fnd.valuesDesc': 'When the choice isn’t obvious — we return to these four principles. They are older than any quarterly business goal.',
      'bb.fnd.v1.title': 'Transparency',
      'bb.fnd.v1.desc': 'We show everything: documents, deadlines, prices, risks. If a deal has a "but" — it’s spoken before the signature, not after.',
      'bb.fnd.v2.title': 'International standard',
      'bb.fnd.v2.desc': 'Architecture, materials, engineering and legal structure — at European-developer level. No "local compromises".',
      'bb.fnd.v3.title': 'Long-term value',
      'bb.fnd.v3.desc': 'We build to last 30 years, not to flip. Every engineering decision is tested against the ownership horizon, not the quarterly report.',
      'bb.fnd.v4.title': 'Respect for Bali',
      'bb.fnd.v4.desc': 'We are guests on the island. Architecture reads the Balinese landscape, the team is hired locally, profit is reinvested into the community.',
      'bb.fnd.promise': 'Brand promise',
      'bb.fnd.promiseTitle': 'What we promise the client',
      'bb.fnd.promiseDesc': 'One sentence the client must remember after the first meeting. All marketing materials are reformulations of this thought.',
      'bb.fnd.promiseText': 'A structured asset on the most beautiful island on earth — protected by paper, designed for return, built for decades.',
      'bb.fnd.archetype': 'Brand archetype · Jung framework',
      'bb.fnd.archetypeTitle': 'Archetype',
      'bb.fnd.archetypeDesc': 'Of the 12 Jungian archetypes, two are ours: primary — <strong>Sage</strong> (the wise one who knows the market and shares knowledge), secondary — <strong>Caregiver</strong> (the steward who protects the client after the deal).',
      'bb.fnd.archetype.primary': 'Primary archetype',
      'bb.fnd.archetype.secondary': 'Secondary archetype',
      'bb.fnd.sageDesc': 'We educate the client: explain UU 7/2011, the PT-PMA structure, the difference between 29+30 and "59 years". We don’t push, we don’t rush. The client decides on knowledge, not emotion.',
      'bb.fnd.caregiverDesc': 'We care for the asset after the deal: quarterly reports, taxes, rental management, repairs. The client knows they are not alone — this removes the main fear of the remote investor.',
      'bb.fnd.personas': '3 personas · who we sell to',
      'bb.fnd.personasTitle': 'Target audience',
      'bb.fnd.personasDesc': 'Three living portraits instead of an abstract "wealthy investor". Any phrase in marketing is tested: <em>would I say this to this exact person?</em>',
      'bb.fnd.p.budget': 'Budget',
      'bb.fnd.p.goal': 'Goal',
      'bb.fnd.p.fear': 'Fear',
      'bb.fnd.p.channel': 'Channel',
      'bb.fnd.p.lang': 'Language',
      'bb.fnd.p1.name': 'Alexander, 38',
      'bb.fnd.p1.meta': 'Moscow · IT entrepreneur',
      'bb.fnd.p1.quote': '"Sold my startup. I don’t want to hold everything in roubles and Moscow apartments. Bali — I’ve heard it grows steadily."',
      'bb.fnd.p1.budget': '$400 K – $700 K · 1 villa',
      'bb.fnd.p1.goal': 'Diversification · capital protection',
      'bb.fnd.p1.fear': 'Losing money to local fraud',
      'bb.fnd.p1.channel': 'Telegram · referrals',
      'bb.fnd.p1.lang': 'RU primary · EN ok',
      'bb.fnd.p2.name': 'Marcus, 45',
      'bb.fnd.p2.meta': 'Singapore · finance, expat',
      'bb.fnd.p2.quote': '"Need 10–12% net yield with verifiable legal title. Show me the numbers, the contract and the exit options."',
      'bb.fnd.p2.budget': '$300 K – $500 K · rental yield',
      'bb.fnd.p2.goal': 'Passive income 10–12% / year',
      'bb.fnd.p2.fear': 'Leasehold structure · exit liquidity',
      'bb.fnd.p2.channel': 'LinkedIn · Bloomberg · brokers',
      'bb.fnd.p2.lang': 'EN primary',
      'bb.fnd.p3.name': 'Elena & Dmitry, 50 + 52',
      'bb.fnd.p3.meta': 'Dubai · business family',
      'bb.fnd.p3.quote': '"We want a second home on the island. Somewhere kids will visit, somewhere to escape for two winter months."',
      'bb.fnd.p3.budget': '$500 K – $1 M · custom villa',
      'bb.fnd.p3.goal': 'Vacation home · future relocation',
      'bb.fnd.p3.fear': 'Legal title · family safety',
      'bb.fnd.p3.channel': 'WhatsApp · agent referral',
      'bb.fnd.p3.lang': 'RU / EN bilingual',
      'bb.fnd.positioning': 'Positioning matrix',
      'bb.fnd.positioningTitle': 'Where we are on the market',
      'bb.fnd.positioningDesc': 'Bali premium-villa market on two axes: price and transparency. Our position — top right. This is not a compromise, it is the definition of the brand.',
      'bb.fnd.pos.priceAxis': 'Price tier',
      'bb.fnd.pos.transAxis': 'Transparency',
      'bb.fnd.pos.low': 'low',
      'bb.fnd.pos.high': 'high',
      'bb.fnd.pos.local': 'Local builders',
      'bb.fnd.pyramid': 'Brand pyramid · 5 levels',
      'bb.fnd.pyramidTitle': 'Brand pyramid',
      'bb.fnd.pyramidDesc': 'From the narrow tip (essence — one word) down to the wide base (rational attributes). Each level rests on the one below. If the essence changes — the whole structure collapses.',
      'bb.fnd.pyr.essence': 'Stewardship',
      'bb.fnd.pyr.values': 'Transparency · Excellence · Longevity',
      'bb.fnd.pyr.personality': 'Calm · Confident · Considered · Inviting',
      'bb.fnd.pyr.benefits': 'Verifiable legal title · premium build · managed yield',
      'bb.fnd.pyr.attributes': 'Leasehold 29+30 · PT-PMA · quarterly reports · international architects',

      // ===== BRAND BOOK — mockup edition (cover, TOC, chapters, colophon) =====
      'bb.cover.edition': 'Brand Identity Reference · Edition 01',
      'bb.cover.version': 'v 1.0 · May 2026',
      'bb.cover.subtitle': 'Visual identity guidelines for an international investment developer on Bali. Reference for designers, marketers and partners — a living document.',
      'bb.cover.issued': 'Issued',
      'bb.cover.issuedDate': '22 May 2026',
      'bb.cover.owner': 'Owner',
      'bb.cover.ownerName': 'Brand & Design Team',
      'bb.cover.status': 'Status',
      'bb.cover.statusName': 'Internal & partners',
      'bb.cover.location': 'Brand Book · /admin',

      'bb.toc.edition': 'Edition 01 · v1.0',
      'bb.toc.contents': 'Contents',
      'bb.toc.note1': 'Click any HEX, token or spec to copy.',
      'bb.toc.note2': 'Print as A4 portrait for offline reference.',

      // 01 About
      'bb.about.lede': 'Global Bali Home is an <strong>international investment developer</strong> building premium residential projects on Bali — one of the world’s most attractive property markets. We combine global expertise in architecture, construction and finance with a deep respect for the Balinese landscape.',
      'bb.about.positioning': 'Positioning',
      'bb.about.posTitle': 'A holding, not a builder',
      'bb.about.posDesc': 'We position ourselves as an <strong>investment developer holding</strong>, not a "villa builder". Each project is delivered to international standards with verifiable legal title, considered architecture and a long-term investment perspective.',
      'bb.about.stat1': 'Legality as USP',
      'bb.about.stat2': 'Leasehold structure',
      'bb.about.stat3': 'Edition 01 · v1.0',
      'bb.about.manifesto': '"We don’t sell square metres. We deliver a structured asset on the most beautiful island on earth — protected by paper, designed for return, and built to last."',
      'bb.about.manifestoCite': '— Brand manifesto · internal',

      // 02 Voice
      'bb.voice.lede': 'How Global Bali Home sounds in every channel — from a sales call to an Instagram caption. Four attributes define the voice. <strong>Combine them, don’t pick one.</strong>',
      'bb.voice.pillars': 'Voice pillars',
      'bb.voice.practice': 'Voice in practice',
      'bb.voice.langTitle': 'Cross-language consistency',
      'bb.voice.byChannel': 'By channel',

      // 03 Logo
      'bb.logo.lede': 'The mark combines a stacked pyramid (growth, elevation, the layered Balinese landscape) with the residential complex name. <strong>Two logo systems coexist:</strong> the GBH parent brand and individual project marks.',
      'bb.logo.primary': 'Primary · Global Bali Home',
      'bb.logo.primaryTitle': 'Primary lockup',
      'bb.logo.primaryDesc': 'The full wordmark — pyramid + GlobalBaliHome. Use whenever space allows; this is the brand’s signature.',
      'bb.logo.short': 'Short · 2 colourways',
      'bb.logo.shortTitle': 'Short lockup — pyramid + GBH',
      'bb.logo.project': 'Project marks · Serenity',
      'bb.logo.projectTitle': 'Serenity — the project family',
      'bb.logo.clearspace': 'Clear space · 1y rule',
      'bb.logo.clearspaceTitle': 'Breathing room',
      'bb.logo.clearspaceDesc': 'Reserve <strong>1× the pyramid mark height (y)</strong> on every side. No text, graphics or other logos may enter this zone — at any format.',
      'bb.logo.cs.cream': 'Cream · on dark',
      'bb.logo.cs.darkgreen': 'Dark Green · on cream',
      'bb.logo.minsize': 'Minimum size · 3 marks · 6 floors',
      'bb.logo.minsizeTitle': 'Hard legibility floors',
      'bb.logo.minsizeDesc': 'Below these sizes text stops being legible and the lotus loses detail. Hard floors — never go smaller. Each mark has its own minimum because the amount of text differs.',
      'bb.logo.minsize.group.full': 'Full Logo',
      'bb.logo.minsize.group.fullSub': 'pyramid + «GlobalBaliHome»',
      'bb.logo.minsize.group.short': 'Short Logo',
      'bb.logo.minsize.group.shortSub': 'pyramid + «GBH»',
      'bb.logo.minsize.group.mark': 'Pyramid Mark',
      'bb.logo.minsize.group.markSub': 'standalone glyph',
      'bb.logo.minsize.digital': 'Digital',
      'bb.logo.minsize.print': 'Print',
      'bb.logo.minsize.digitalFullUse': 'Tightest UI · footer credits',
      'bb.logo.minsize.printFullUse': 'Business cards · contract footers',
      'bb.logo.minsize.digitalShortUse': 'Sticky bars · breadcrumbs · badges',
      'bb.logo.minsize.printShortUse': 'Document signatures · brochure corners',
      'bb.logo.minsize.digitalMarkUse': 'Tab favicons · inline mentions',
      'bb.logo.minsize.printMarkUse': 'Tags · badges · small repeated patterns',
      'bb.logo.favicon': 'Favicon · 5 sizes · 2 colourways',
      'bb.logo.faviconTitle': 'Browser & app marks',
      'bb.logo.faviconDesc': 'The pyramid extracted from the GBH device — used wherever the full wordmark won’t fit: browser tabs, social avatars, app icons. Pick the colour that matches your background.',
      'bb.logo.favicon.cream': 'Cream · for dark backgrounds',
      'bb.logo.favicon.darkgreen': 'Dark Green · for light backgrounds',
      'bb.logo.favicon.sizes': '5 sizes',

      // 04 Rules
      'bb.rules.lede': 'The four rules below apply to every surface. They are not stylistic preferences — breaking them dilutes the brand and breaks recognition.',
      'bb.rules.r1.title': 'Don’t distort',
      'bb.rules.r1.desc': 'Never stretch, squash or resize the logo in a way that alters its proportions. Always scale uniformly from a corner handle.',
      'bb.rules.r2.title': 'Don’t recolour',
      'bb.rules.r2.desc': 'Only the two approved colourways — Cream or Dark Green. Never apply gradients, photographic fills, or any colour outside the brand palette.',
      'bb.rules.r3.title': 'Don’t rearrange',
      'bb.rules.r3.desc': 'The structure and order of elements is fixed. Pyramid sits left of the wordmark; the wordmark sits on a single baseline. Never re-flow.',
      'bb.rules.r4.title': 'Don’t crowd',
      'bb.rules.r4.desc': 'Place the logo only on sufficiently contrasting brand surfaces. Never overlay on busy or detailed photographs without the clear-space frame.',

      // 05 Colors
      'bb.colors.lede': 'A restrained palette organised by role. Every value is paired with its use case — surface, brand, accent, shade. Apply the <strong>60-30-10 rule</strong>: 60% main background, 30% secondary surface, 10% accent.',
      'bb.colors.surfaces': '3 colours · backgrounds',
      'bb.colors.surfacesTitle': 'Surfaces',
      'bb.colors.surfacesDesc': 'Foundational backgrounds. Every screen sits on one of these three surfaces — page, raised panels, alternative sections.',
      'bb.colors.bgPrimaryRole': 'Page background, hero, footer',
      'bb.colors.bgSurfaceRole': 'Cards, raised panels, hover',
      'bb.colors.bgAltRole': 'Alt sections, lead-magnet, footer',
      'bb.colors.main': '2 colours · signature',
      'bb.colors.mainTitle': 'Main',
      'bb.colors.mainDesc': 'The brand’s two signature colours. Their combination — Dark Green + Cream — is how the brand is recognised across logo, hero blocks and headlines.',
      'bb.colors.darkGreenRole': 'Brand primary · logo on light',
      'bb.colors.creamRole': 'Brand secondary · logo on dark',
      'bb.colors.supporting': '2 colours · contrast',
      'bb.colors.supportingTitle': 'Supporting',
      'bb.colors.supportingDesc': 'Auxiliary tones for contrast moments — inverted surfaces, forms on dark backgrounds, materials printed on coloured stock.',
      'bb.colors.creamLightRole': 'Off-white · inverted surfaces, forms',
      'bb.colors.deepGreenRole': 'High-contrast moments · print',
      'bb.colors.accent': '1 colour · active',
      'bb.colors.accentTitle': 'Accent',
      'bb.colors.accentDesc': 'The single active colour — reserved for things that demand attention: links, CTAs, progress, success states, eyebrow tags. Never used as background.',
      'bb.colors.accentRole': 'Eyebrows · progress · links · success states · active items in navigation',
      'bb.colors.tints': '3 scales · 10 stops',
      'bb.colors.tintsTitle': 'Tints & shades',
      'bb.colors.tintsDesc': '10-stop scales for connective tissue — hover states, borders, dividers, disabled UI, charts. The numbered <strong>base sits at 200, 700 or 800</strong> depending on the colour (●). Click any swatch to copy.',
      'bb.colors.combos': 'Pairings',
      'bb.colors.combosTitle': 'Approved combinations',
      'bb.colors.combosDesc': 'Curated colour pairings for backgrounds, surfaces, and accent moments. Each combination has been tested for contrast.',
      'bb.colors.combo1.eyebrow': 'Primary surface',
      'bb.colors.combo1.title': 'Where Serenity becomes lifestyle',
      'bb.colors.combo1.desc': 'Cream text on Dark Green — the signature combination.',
      'bb.colors.combo2.eyebrow': 'Inverted surface',
      'bb.colors.combo2.title': 'Quiet sections, lead-capture forms',
      'bb.colors.combo2.desc': 'Deep Green on Cream — for breathing space.',
      'bb.colors.combo3.eyebrow': 'High contrast',
      'bb.colors.combo3.title': 'Hero overlays, footer, print',
      'bb.colors.combo3.desc': 'White on Deep Green — maximum contrast for headlines.',
      'bb.colors.combo4.eyebrow': 'Print primary',
      'bb.colors.combo4.title': 'Brochures, documents, business cards',
      'bb.colors.combo4.desc': 'Dark Green on White — preferred for printed materials.',
      'bb.colors.wcag': 'Accessibility',
      'bb.colors.wcagTitle': 'WCAG contrast — all pass AAA',
      'bb.colors.wcagDesc': 'Every approved text/background pair is validated against WCAG 2.1. AA requires 4.5:1, AAA requires 7:1. All combinations below pass AAA — readable for users with reduced vision.',
      'bb.colors.wcag.pair': 'Pair',
      'bb.colors.wcag.preview': 'Preview',
      'bb.colors.wcag.ratio': 'Ratio',
      'bb.colors.wcag.grade': 'Grade',

      // 06 Typography
      'bb.typo.lede': 'A two-typeface system. <strong>Playfair Display</strong> — serif, classical, premium — used for display and headings. <strong>Montserrat</strong> — geometric sans-serif — for body, navigation, UI labels. The combination gives the brand its editorial-yet-modern voice.',
      'bb.typo.specimens': 'Specimens',
      'bb.typo.specTitle': 'Typefaces in use',
      'bb.typo.tracking': 'Tracking',
      'bb.typo.leading': 'Leading',
      'bb.typo.cutsSerif': 'Available cuts — serif',
      'bb.typo.cutsSans': 'Available cuts — sans',
      'bb.typo.scale': '8 steps · 1rem = 18px',
      'bb.typo.scaleTitle': 'Type scale',
      'bb.typo.scaleDesc': 'The site sets <code>html { font-size: 112.5% }</code>, so <strong>1rem = 18px</strong> (not 16). All sizes below are taken from <code>css/style.css</code>.',
      'bb.typo.tokens': '6 tokens · :root',
      'bb.typo.tokensTitle': 'Size tokens — CSS custom properties',
      'bb.typo.tokensDesc': 'All sizes are exposed on <code>:root</code> in <code>css/style.css</code>. Reference these — never hardcode <code>rem</code> or <code>px</code>.',
      'bb.typo.tk.xs': 'labels, tags, buttons, metadata, eyebrows',
      'bb.typo.tk.sm': 'nav, descriptions, inputs, captions',
      'bb.typo.tk.md': 'h4, FAQ, prices, card titles',
      'bb.typo.tk.xl': 'stat numbers, display text',
      'bb.typo.tk.2xl': 'decorative numbers, close buttons',
      'bb.typo.tk.3xl': 'large accent numbers (rare)',

      // 07 UI
      'bb.ui.lede': 'Baseline interface elements rendered in brand colours. Apply the same patterns on the marketing site, landing pages, dashboards and printed forms. All components must remain functional in both light (Cream) and dark (Deep Green) modes.',
      'bb.ui.buttons': 'Buttons',
      'bb.ui.buttonsTitle': 'Action hierarchy',
      'bb.ui.buttonsDesc': 'Four levels: primary (Cream fill), secondary (outline), ghost (text-only), disabled. Default padding 14×28px, small variant 10×18px. Radius 4px.',
      'bb.ui.onDark': 'On Dark Green · hero & overlays',
      'bb.ui.onCream': 'On Cream · forms & quiet sections',
      'bb.ui.forms': 'Forms',
      'bb.ui.formsTitle': 'Inputs & validation',
      'bb.ui.formDefault': 'On Dark Green · default form',
      'bb.ui.cards': 'Cards',
      'bb.ui.cardsTitle': 'Project & status cards',
      'bb.ui.tags': 'Tags & badges',
      'bb.ui.tagsTitle': 'Status & feature tags',
      'bb.ui.tagsDark': 'On Dark Green · status tags',

      // 08 Icons
      'bb.icons.lede': 'Icons form an integral part of the visual system. They support navigation and improve overall visual clarity. Use on contrasting backgrounds at consistent sizes. <strong>Stroke 1.5 · 24 px grid · monoweight</strong>.',

      // 09 Photography
      'bb.photo.lede': 'The brand’s photography conveys a calm, nature-driven Bali lifestyle, focusing on warmth, atmosphere and way of life rather than overt luxury.',

      // 10 Margins
      'bb.margins.lede': 'A consistent margin of <strong>80 px</strong> is applied across digital layouts. Print (A4 · 210×297 mm) uses <strong>30 mm</strong>. These provide breathing room and maintain visual rhythm across formats.',
      'bb.margins.a4': 'Margin · 30 mm',
      'bb.margins.tablet': 'Margin · 80 px',
      'bb.margins.desktop': 'Margin · 80 px',

      // 11 Social
      'bb.social.lede': 'Approved templates for Instagram posts and stories. Use brand colours, Montserrat typography and consistent visual rhythm. Project names in lowercase, value propositions in elegant serif-style headings.',
      'bb.social.postsTitle': 'Feed templates',
      'bb.social.storiesTitle': 'Story templates',

      // Colophon
      'bb.colophon.signature': '"Identity is the discipline of doing the same thing the same way — every time, in every channel."',
      'bb.colophon.version': 'Version',
      'bb.colophon.versionVal': '1.0 · Edition 01',
      'bb.colophon.reviewed': 'Last reviewed',
      'bb.colophon.reviewedVal': '22 May 2026',
      'bb.colophon.stewards': 'Stewards',
      'bb.colophon.stewardsVal': 'Brand & Design',
      'bb.colophon.left': 'Global Bali Home · Internal & partners',
      'bb.colophon.right': 'Brand Book · admin / brandbook',
    },
    ru: {
      'login.title': 'Панель управления',
      'login.email': 'Email',
      'login.password': 'Пароль',
      'login.submit': 'Войти',
      'login.signingIn': 'Вход...',
      'header.title': 'Панель управления',
      'header.rateLabel': 'USD / IDR',
      'header.signOut': 'Выйти',
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
      'dash.available': 'Доступно',
      'dash.progress': 'Прогресс',
      'dash.potential': 'Потенциал',
      'dash.price': 'Цена',
      'dash.preSale': 'Предпродажа',
      'dash.inProgress': 'Строится',
      'dash.status_pre-sale': 'Предпродажа',
      'dash.status_in-progress': 'Строится',
      'dash.status_completed': 'Завершён',
      'dash.status_sold-out': 'Все недоступны',
      'dash.sold': 'Не доступно',
      'dash.left': 'Доступно',
      'dash.priceRange': 'Диапазон цен',
      'dash.editProject': 'Редактировать',
      'dash.viewOnSite': 'На сайте',
      'dash.recentChanges': 'Последние изменения',
      'dash.noChanges': 'Нет недавних изменений.',
      'dash.couldNotLoad': 'Не удалось загрузить историю.',
      'dash.breakAvailable': 'доступно',
      'dash.breakSold': 'не доступно',
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
      'contacts.save': 'Сохранить контакты',
      'contacts.hint.phone': 'Формат отображения, напр. +62 813 251 438 49',
      'contacts.hint.whatsapp': 'Только цифры, с кодом страны, без +',
      'help.contacts.phone': '<strong>Телефон:</strong> Любой формат с пробелами/дефисами, начинать с +код страны.',
      'help.contacts.whatsapp': '<strong>WhatsApp:</strong> ТОЛЬКО ЦИФРЫ, без +, пробелов или дефисов. Пример: 6281325143849',
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
      'projects.unsaved': 'Есть несохранённые изменения',
      'projects.publishing': 'Публикация...',
      'projects.published': 'Опубликовано! Сайт обновится (~1-2 мин)',
      'projects.floorPlans': 'Планировки',
      'projects.noPlan': 'Нет планировки',
      'projects.uploadPlan': 'Загрузить',
      'projects.deletePlan': 'Удалить планировку',
      'projects.confirmDeletePlan': 'Удалить планировку для {type}?',
      'projects.units': 'Юниты',
      'projects.unitTypes': 'Типы юнитов',
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
      'projects.priceLabel': 'Цена',
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
      'faq.allProjects': 'Все проекты',
      'faq.projectHint': 'К какому проекту относится вопрос? «Все проекты» — для общих вопросов.',
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
      'analytics.title': 'Аналитика и трекинг',
      'analytics.tracking': 'Прямой трекинг (без GTM)',
      'analytics.gtm.title': 'Google Tag Manager',
      'analytics.gtm.warning': '⚠️ Если используется GTM — поля «Прямого трекинга» ниже должны быть ПУСТЫМИ, иначе будут двойные события и удвоенные метрики.',
      'analytics.gtm': 'GTM Container ID',
      'analytics.hint.gtm': 'Container ID с tagmanager.google.com',
      'analytics.ga4': 'Google Analytics 4',
      'analytics.facebookPixel': 'Facebook Pixel',
      'analytics.yandexMetrika': 'Яндекс Метрика',
      'analytics.clarity': 'Microsoft Clarity',
      'analytics.save': 'Сохранить аналитику',
      'analytics.hint.ga4': 'Measurement ID из свойства GA4',
      'analytics.hint.facebook': 'Pixel ID из Meta Events Manager',
      'analytics.hint.yandex': 'Номер счётчика с metrika.yandex.ru',
      'analytics.hint.clarity': 'ID проекта с clarity.microsoft.com',
      'help.analytics.intro': '<strong>Как это работает:</strong> Вставьте ID трекеров ниже. Скрипты подключаются автоматически — менять код не нужно.',
      'help.analytics.empty': '<strong>Пустое поле</strong> = трекер отключён. Заполняйте только те сервисы, которые используете.',
      'help.analytics.gtmConflict': '<strong>Если GTM подключён выше</strong> — все эти поля оставляйте пустыми. GTM сам управляет всеми трекерами.',
      'help.analytics.events': '<strong>Авто-события:</strong> отправка форм (контакт, квиз, лид-магнит, exit popup), клики WhatsApp, скачивание PDF.',
      'newUnit.title': 'Добавить юнит',
      'newUnit.name': 'Название юнита',
      'newUnit.namePh': 'напр. A1, B2, C3',
      'newUnit.nameHint': 'Фиксируется при создании — потом изменить нельзя.',
      'newUnit.type': 'Тип',
      'newUnit.floors': 'Этажность',
      'newUnit.add': 'Добавить юнит',
      'newUnit.cancel': 'Отмена',
      'newUnit.nameRequired': 'Укажите название юнита.',
      'newUnit.nameExists': 'Юнит «{name}» уже есть в этом проекте.',
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
      'nav.users': 'Пользователи',
      'users.title': 'Команда',
      'users.invite': 'Пригласить участника',
      'users.email': 'Email',
      'users.fullName': 'Имя',
      'users.role': 'Роль',
      'users.send': 'Отправить приглашение',
      'users.list': 'Активные участники',
      'users.you': 'вы',
      'users.empty': 'Команда пуста.',
      'users.col.email': 'Email',
      'users.col.name': 'Имя',
      'users.col.role': 'Роль',
      'users.col.status': 'Статус',
      'users.col.lastSignIn': 'Последний вход',
      'users.col.actions': 'Действия',
      'users.role.editor': 'Editor — только галерея / FAQ / отзывы',
      'users.role.admin': 'Admin — весь контент (без управления пользователями)',
      'users.role.editor.short': 'Editor',
      'users.role.admin.short': 'Admin',
      'users.role.super_admin.short': 'Super admin',
      'users.status.active': 'Активен',
      'users.status.deactivated': 'Отключён',
      'users.status.pending': 'Приглашён',
      'users.action.delete': 'Удалить',
      'users.action.confirmDelete': 'Удалить пользователя {email}? Действие необратимо.',
      'users.toast.sending': 'Отправка приглашения…',
      'users.toast.sent': 'Приглашение отправлено на {email}.',
      'users.toast.roleUpdated': 'Роль обновлена.',
      'users.toast.userDeleted': 'Пользователь удалён.',
      // ── Brand Book ──
      'nav.brandbook': 'Бренд-бук',
      'bb.title': 'Бренд-бук',
      'bb.intro': 'Визуальные стандарты Global Bali Home. Справочник для дизайнеров, маркетологов и партнёров. Клик по значению — копирование.',
      'bb.nav.about': 'О бренде',
      'bb.nav.voice': 'Тон',
      'bb.nav.logo': 'Логотип',
      'bb.nav.rules': 'Правила лого',
      'bb.nav.colors': 'Цвета',
      'bb.nav.typography': 'Типографика',
      'bb.nav.ui': 'UI-компоненты',
      'bb.nav.icons': 'Иконки',
      'bb.nav.photography': 'Фотография',
      'bb.nav.margins': 'Отступы',
      'bb.nav.social': 'Соцсети',
      'bb.about.title': 'О бренде',
      'bb.about.p1': 'Global Bali Home — международная компания в сфере недвижимости, специализирующаяся на качественных проектах на Бали — одном из самых привлекательных рынков недвижимости в мире. Опираясь на международную экспертизу в архитектуре, строительстве и инвестициях, мы создаём проекты с сильной концепцией и долгосрочной ценностью.',
      'bb.about.p2': 'Каждый проект соответствует международным стандартам, сочетая надёжный инвестиционный потенциал с продуманным, выверенным дизайном. Наш подход выходит за рамки эстетики: мы создаём пространства одновременно для комфортной жизни и устойчивого дохода — с эффективными планировками, высоким качеством строительства и долгосрочной перспективой.',
      'bb.about.p3': 'Global Bali Home объединяет характер Бали и международную экспертизу через стратегический и перспективный подход к недвижимости.',
      'bb.logo.title': 'Логотип',
      'bb.logo.desc': 'В системе две группы знаков: материнский бренд GBH и знаки отдельных проектов (например, Serenity).',
      'bb.logo.primary': 'Основной — Global Bali Home',
      'bb.logo.project': 'Знаки проектов — Serenity',
      'bb.logo.projectDesc': 'Универсальный знак для всех форматов (Villas, Estates, Village). Под лотосом только «SERENITY» — формат указывается отдельной подписью.',
      'bb.logo.onDark': 'На зелёном',
      'bb.logo.onLight': 'На песочном',
      'bb.logo.stamp': 'Печать / favicon',
      'bb.logo.short': 'Короткий лого — GBH',
      'bb.logo.shortDesc': 'Для узких контекстов, где не помещается «GlobalBaliHome». Буквы переведены в кривые из Montserrat Bold — SVG работает без установленного шрифта.',
      'bb.logo.lightVer': 'Светлый вариант',
      'bb.logo.fullcolor': 'Полноцветная плашка',
      'bb.logo.clearspace': 'Защитное поле',
      'bb.logo.clearspaceDesc': 'Минимум 1× высоты пирамиды (y) с каждой стороны. Внутри — никаких текстов, графики или других логотипов, во всех форматах.',
      'bb.logo.cs.cream': 'Cream · на тёмном',
      'bb.logo.cs.darkgreen': 'Dark Green · на песочном',
      'bb.logo.minsize': 'Минимальный размер',
      'bb.logo.minsizeDesc': 'Жёсткий пол — ниже этих размеров текст не читается. Единый минимум для всех марок: 14px digital, 4mm print.',
      'bb.logo.minsize.group.full': 'Полный лого — пирамида + «GlobalBaliHome»',
      'bb.logo.minsize.group.short': 'Короткий лого — пирамида + «GBH»',
      'bb.logo.minsize.group.mark': 'Фавикон-знак — только пирамида',
      'bb.logo.minsize.digitalFull': 'Digital · Полный лого',
      'bb.logo.minsize.digitalFullUse': 'Абсолютный пол — компактный UI, footer credits',
      'bb.logo.minsize.printFull': 'Print · Полный лого',
      'bb.logo.minsize.printFullUse': 'Визитки, подписи договоров, мелкие объявления',
      'bb.logo.minsize.digitalShort': 'Digital · Короткий лого',
      'bb.logo.minsize.digitalShortUse': 'Абсолютный пол — sticky-бары, хлебные крошки, бейджи',
      'bb.logo.minsize.printShort': 'Print · Короткий лого',
      'bb.logo.minsize.printShortUse': 'Подписи к документам, углы брошюр',
      'bb.logo.minsize.digitalMark': 'Digital · Фавикон-знак',
      'bb.logo.minsize.digitalMarkUse': 'Абсолютный пол — favicon вкладок, упоминания в тексте',
      'bb.logo.minsize.printMark': 'Print · Фавикон-знак',
      'bb.logo.minsize.printMarkUse': 'Тэги, бейджи, мелкие повторяющиеся паттерны',
      'bb.logo.favicon': 'Короткий знак и фавикон',
      'bb.logo.faviconDesc': 'Знак-пирамида в двух премиальных цветах. Кликни по карточке — скачается PNG в этом размере.',
      'bb.logo.favicon.cream': 'Cream · для тёмного фона',
      'bb.logo.favicon.darkgreen': 'Dark Green · для светлого фона',
      'bb.download.ico': 'ICO',
      'bb.download.svg': 'SVG',
      'bb.download.png': 'PNG',
      'bb.rules.title': 'Неправильное использование',
      'bb.rules.desc': 'Никогда не делайте следующее:',
      'bb.rules.r1': 'Логотип нельзя искажать или менять его пропорции.',
      'bb.rules.r2': 'Использовать только одобренные цвета бренда.',
      'bb.rules.r3': 'Структура и порядок элементов логотипа должны оставаться неизменными.',
      'bb.rules.r4': 'Логотип размещать только на контрастных фоновых заливках бренда, не использовать на детализированных или визуально насыщенных фотографиях.',
      'bb.colors.title': 'Цветовая палитра',
      'bb.colors.desc': 'Цвета — основа айдентики и эмоционального выражения бренда. Утверждённая палитра должна последовательно применяться во всех материалах, включая логотип. Образцы здесь даны для справки — при невозможности точного воспроизведения используйте ближайший визуальный аналог.',
      'bb.colors.intro': 'Палитра построена по ролям. Каждый цвет соединён с конкретным сценарием — поверхность, бренд, акцент или шкала. Клик по плашке — копирование HEX.',
      'bb.colors.surfacesDesc': 'Базовые фоны: страница, карточки, альтернативные секции.',
      'bb.colors.mainDesc': 'Два фирменных цвета. Сочетание Dark Green + Cream — то, по чему бренд узнают.',
      'bb.colors.supportingDesc': 'Контрастные тона: инверсные поверхности, формы, печать на цветной бумаге.',
      'bb.colors.accentDesc': 'Единственный активный цвет: ссылки, CTA, прогресс, success-состояния. Никогда как фон.',
      'bb.colors.main': 'Основные',
      'bb.colors.supporting': 'Дополнительные',
      'bb.colors.accent': 'Акцент',
      'bb.colors.surfaces': 'Поверхности',
      'bb.colors.darkGreen': 'Тёмно-зелёный',
      'bb.colors.white': 'Белый',
      'bb.colors.creamLight': 'Кремовый светлый',
      'bb.colors.cream': 'Кремовый',
      'bb.colors.deepGreen': 'Глубокий зелёный',
      'bb.typo.title': 'Типографика',
      'bb.typo.desc': 'Два шрифта: <strong>Playfair Display</strong> для заголовков, <strong>Montserrat</strong> для текста и UI. Голос «редакционно, но современно».',
      'bb.typo.headings': 'Заголовки — Display',
      'bb.typo.body': 'Текст — UI',
      'bb.typo.family': 'Шрифт',
      'bb.typo.weight': 'Насыщенность',
      'bb.typo.spacing': 'Межбуквенный',
      'bb.typo.lineHeight': 'Межстрочный',
      'bb.typo.weights': 'Доступные насыщенности',
      'bb.typo.weightsHead': 'Доступные насыщенности — Playfair Display',
      'bb.typo.weightsBody': 'Доступные насыщенности — Montserrat',
      'bb.typo.scale': 'Шкала размеров',
      'bb.typo.scaleDesc': 'На сайте <code>html { font-size: 112.5% }</code>, поэтому <strong>1rem = 18px</strong>. Все размеры взяты из <code>css/style.css</code>.',
      'bb.typo.tokens': 'Токены размеров',
      'bb.typo.tokensDesc': 'CSS-переменные на <code>:root</code>. Используем токены — не хардкодим <code>rem</code> или <code>px</code>.',
      // Voice
      'bb.voice.title': 'Тон коммуникации',
      'bb.voice.intro': 'Четыре атрибута, сочетаются, не соперничают. Во всех каналах — от звонка до Instagram.',
      'bb.voice.attributes': 'Атрибуты голоса',
      'bb.voice.a1.title': 'Заземлённый',
      'bb.voice.a1.desc': 'Говорим цифрами, контрактами и проверяемыми фактами. Без пустых превосходных эпитетов.',
      'bb.voice.a1.tag': 'Уверенные, не хвастливые.',
      'bb.voice.a2.title': 'Продуманный',
      'bb.voice.a2.desc': 'Каждое предложение оправдывает своё место. Уважаем время и интеллект читателя.',
      'bb.voice.a2.tag': 'Точные, не отрывистые.',
      'bb.voice.a3.title': 'Прозрачный',
      'bb.voice.a3.desc': 'Полная легальность — наше УТП. Озвучиваем форму собственности, условия leasehold, налоги и риски заранее.',
      'bb.voice.a3.tag': 'Честные, не наивные.',
      'bb.voice.a4.title': 'Спокойный',
      'bb.voice.a4.desc': 'Бали — это природа, дыхание, перспектива. Не давим. Срочность даём только из реальных фактов, не из искусственного дефицита.',
      'bb.voice.a4.tag': 'Приглашаем, не вдавливаем.',
      'bb.voice.examples': 'Так говорим / так не говорим',
      'bb.voice.yes': 'Так говорим',
      'bb.voice.no': 'Так не говорим',
      'bb.voice.ex1.yes': '«Leasehold: 29 лет начально + 30 лет продления по подписанному PPJB.»',
      'bb.voice.ex1.no': '«Владение на 59 лет!» <em>(вводит в заблуждение — продление условное)</em>',
      'bb.voice.ex2.yes': '«Инвестиционный девелопер на Бали: вилла с легальным титулом и управляемым доходом от аренды.»',
      'bb.voice.ex2.no': '«Строитель элитных вилл в раю Бали!» <em>(пустые эпитеты, нет позиционирования)</em>',
      'bb.voice.ex3.yes': '«Доступные юниты в Wanayu — 3 из 12. Сдача Q4 2026.»',
      'bb.voice.ex3.no': '«Торопитесь, осталось всего несколько!» <em>(искусственный дефицит)</em>',
      'bb.voice.ex4.yes': '«PT-PMA структура, квартальная отчётность, все разрешения оформлены на ваше имя.»',
      'bb.voice.ex4.no': '«Не переживайте про юридическую часть — мы всё сделаем.» <em>(непрозрачно, подрывает доверие)</em>',
      'bb.voice.langRules': 'Правила EN ↔ RU',
      'bb.voice.lr1': 'RU: имена брендов остаются на латинице — <strong>Global Bali Home</strong>, <strong>Serenity Villas</strong>, <strong>Wanayu</strong>. Никогда не транслитерируем («Глобал Бали Хоум» — неправильно).',
      'bb.voice.lr2': 'RU: без англицизмов, если есть нормальное русское слово. «эстейт», «single-family», «драйвер», «офер» → простые русские эквиваленты.',
      'bb.voice.lr3': 'RU: без калек вроде «коридор Убуда». Используем «в Убуде», «в районе Убуда» или конкретное название деревни.',
      'bb.voice.lr4': 'Позиционирование: <strong>«международный инвестиционный девелопер на Бали»</strong> / <strong>"international investment developer in Bali"</strong>. Не «строитель вилл», не «привязка к Убуду».',
      'bb.voice.lr5': 'Цены: каждая сумма в USD должна сопровождаться IDR (закон Индонезии UU 7/2011). На сайте IDR — главная, USD — вспомогательная справка.',
      'bb.voice.channels': 'По каналам',
      'bb.voice.ch.web': 'Сайт / лендинги',
      'bb.voice.ch.web.desc': 'Полный регистр. Сначала факты, эмоции — приправа. Цифры в заголовках лучше прилагательных.',
      'bb.voice.ch.email': 'Email / WhatsApp',
      'bb.voice.ch.email.desc': 'Разговорно, но всё ещё точно. По имени. Короткие абзацы. Без восклицательных знаков.',
      'bb.voice.ch.social': 'Instagram / Telegram',
      'bb.voice.ch.social.desc': 'Короче, визуальнее. Одна сильная строка в начале. В заголовках можно строчными названия проектов.',
      'bb.voice.ch.ads': 'Платная реклама',
      'bb.voice.ch.ads.desc': 'Одно утверждение, одна цифра, один CTA. Никогда «нажмите здесь». Конкретизируем действие — «Смотреть доступные юниты», «Скачать гайд по leasehold».',
      // Colors expansion
      'bb.colors.tints': 'Оттенки и градации',
      'bb.colors.tintsDesc': '10-ступенчатые шкалы для hover, рамок, разделителей, графиков. База на 500–800.',
      'bb.colors.combos': 'Одобренные сочетания',
      'bb.colors.combosDesc': 'Подобранные пары, проверены на контраст. Правило 60-30-10: основной / вторичный / акцент.',
      'bb.colors.wcag': 'Доступность — WCAG-контраст',
      'bb.colors.wcagDesc': 'Проверено по WCAG 2.1. AA = 4.5:1, AAA = 7:1. Все пары ниже проходят AAA.',
      'bb.colors.wcag.pair': 'Пара',
      'bb.colors.wcag.preview': 'Превью',
      'bb.colors.wcag.ratio': 'Отношение',
      'bb.colors.wcag.grade': 'Уровень',
      // UI
      'bb.ui.title': 'UI-компоненты',
      'bb.ui.intro': 'Интерфейсные элементы в брендовых цветах. Работают и в светлой (Cream), и в тёмной (Deep Green) теме.',
      'bb.ui.buttons': 'Кнопки',
      'bb.ui.forms': 'Поля формы',
      'bb.ui.cards': 'Карточки',
      'bb.ui.tags': 'Тэги и бэйджи',
      'bb.icons.title': 'Символика и иконки',
      'bb.icons.desc': 'Визуальная поддержка навигации и ясности. На контрастных фонах, в единых размерах.',
      'bb.photo.title': 'Фотография',
      'bb.photo.intro': 'Спокойный, природный балийский лайфстайл: тепло и атмосфера, не показная роскошь.',
      'bb.photo.do': 'Делать',
      'bb.photo.dont': 'Не делать',
      'bb.photo.do1': 'Использовать естественный свет, мягкий дневной, рассеянное освещение.',
      'bb.photo.do2': 'Композиции делать открытыми и сбалансированными, с чёткими горизонталями.',
      'bb.photo.do3': 'Фокус на архитектуре, природе и окружающей среде.',
      'bb.photo.do4': 'Поддерживать визуальный ритм и высокий стандарт качества.',
      'bb.photo.do5': 'Все сток-фото покупать легально перед использованием.',
      'bb.photo.dont1': 'Жёсткие тени или контрастное студийное освещение.',
      'bb.photo.dont2': 'Постановочные или нарочитые эмоции на стоковых фото.',
      'bb.photo.dont3': 'Тяжёлая ретушь или HDR-эффекты.',
      'bb.photo.dont4': 'Излишне рекламные или агрессивные образы.',
      'bb.photo.dont5': 'Узкие крупные планы вместо широких сценических кадров.',
      'bb.margins.title': 'Отступы',
      'bb.margins.desc': 'Стандартный отступ макета 80px, для A4-печати — 30мм. Задаёт ритм между форматами.',
      'bb.margins.margin': 'Отступ',
      'bb.social.title': 'Социальные сети',
      'bb.social.desc': 'Шаблоны для постов и сторис Instagram. Брендовые цвета, Montserrat, имя проекта строчными.',
      'bb.social.posts': 'Посты · 1:1',
      'bb.social.stories': 'Сторис · 9:16',

      // ===== БРЕНДБУК — Фаза 2 (Motion / Logo ext / Color app / Typo comp / Multilingual) =====

      // 07 Motion
      'bb.nav.motion': 'Анимация',
      'bb.motion.title': 'Анимация',
      'bb.motion.lede': 'Анимация — не украшение, а <strong>часть бренда</strong>. Спокойный, продуманный motion коммуницирует уверенность. Резкий, быстрый — дешевизну. У нас всё движение строится на 4 токенах длительности и 3 кривых.',
      'bb.motion.durations': '4 токена длительности · :root',
      'bb.motion.durationsTitle': 'Длительности',
      'bb.motion.durationsDesc': 'Любая анимация на сайте использует одну из четырёх длительностей. Никаких произвольных <code>350ms</code>, <code>600ms</code> в коде. Только эти 4 токена.',
      'bb.motion.fastUse': 'Hover-states, focus-rings, button feedback',
      'bb.motion.baseUse': 'Cards, dropdowns, tooltips, accordion',
      'bb.motion.slowUse': 'Modals, drawers, large reveals',
      'bb.motion.heroUse': 'Page transitions, hero parallax, scroll reveals',
      'bb.motion.eases': '3 кривые · cubic-bezier',
      'bb.motion.easesTitle': 'Кривые анимации',
      'bb.motion.easesDesc': 'Три кривые покрывают 95% случаев. Линейный <code>linear</code> — только для прогресс-баров и индикаторов загрузки.',
      'bb.motion.ease.standard': 'Standard',
      'bb.motion.ease.standardUse': 'Дефолт для всего, что появляется и исчезает в UI. Hover, dropdown, modal.',
      'bb.motion.ease.expressive': 'Expressive',
      'bb.motion.ease.expressiveUse': 'Hero reveals, парралакс, scroll-trigger. Лёгкий «бросок» на конце — premium feel.',
      'bb.motion.ease.exit': 'Exit / sharp',
      'bb.motion.ease.exitUse': 'Закрытие модалок, dismiss, swipe-out. Резкое начало, быстрый exit.',
      'bb.motion.principles': '6 принципов движения',
      'bb.motion.principlesTitle': 'Принципы движения',
      'bb.motion.principlesDesc': 'Шесть правил, которые отличают premium-motion от cheap-motion. Если что-то двигается на сайте — оно проходит через этот фильтр.',
      'bb.motion.pr1.title': 'Purpose, not decoration',
      'bb.motion.pr1.desc': 'Каждая анимация решает задачу: feedback, иерархия, ориентация. «Просто красиво» — не повод.',
      'bb.motion.pr2.title': 'Спокойный темп',
      'bb.motion.pr2.desc': 'Дефолт — Standard 250 ms. Быстрее — только feedback (150 ms). Медленнее — только большие reveals.',
      'bb.motion.pr3.title': 'Пространственная логика',
      'bb.motion.pr3.desc': 'Элементы появляются снизу/справа (откуда «приехали»), исчезают в ту же сторону. Никаких рандомных направлений.',
      'bb.motion.pr4.title': 'Хореография',
      'bb.motion.pr4.desc': 'Список элементов — staggered (по 40 ms задержки между). Не всё разом, не по одному с большой паузой.',
      'bb.motion.pr5.title': 'Performance first',
      'bb.motion.pr5.desc': 'Только <code>transform</code> и <code>opacity</code>. Никаких <code>width</code>, <code>height</code>, <code>top/left</code> — они дёргают.',
      'bb.motion.pr6.title': 'Respect reduced-motion',
      'bb.motion.pr6.desc': 'Если пользователь выключил анимации в системе — всё переходит на fade без motion. См. правило ниже.',
      'bb.motion.logo': 'Brand reveal · logo intro',
      'bb.motion.logoTitle': 'Анимация логотипа',
      'bb.motion.logoDesc': 'Появление логотипа в начале видео, на загрузке страницы или в подписи письма. 600 ms · expressive easing · fade + slight scale + slight Y-shift. Никаких лазеров, искр и звукового эффекта.',
      'bb.motion.logoSpec': 'Спецификация',
      'bb.motion.a11y': 'Доступность · prefers-reduced-motion',
      'bb.motion.a11yTitle': 'Уважение к настройкам системы',
      'bb.motion.a11ySubTitle': 'Reduced-motion fallback',
      'bb.motion.a11yDesc': 'Если у пользователя в системе включено <code>prefers-reduced-motion: reduce</code> (Windows Settings → Accessibility, macOS → Reduce motion) — все анимации продолжительностью больше 200 ms переходят на <code>opacity</code> fade без transform. Это правило WCAG 2.1, нарушать нельзя.',

      // 03 Logo extensions
      'bb.logo.vlock': 'Вертикальный лок-ап · 2 цвета',
      'bb.logo.vlockTitle': 'Вертикальный лок-ап',
      'bb.logo.vlockDesc': 'Для квадратных аватарок (LinkedIn, Telegram, печатные печати), узких форматов и сценариев, где горизонтальный лок-ап не помещается. Пирамида сверху, wordmark снизу, выравнивание по центру. Расстояние между знаком и текстом — половина высоты пирамиды.',
      'bb.logo.cobrand': 'Co-branding · 3 паттерна',
      'bb.logo.cobrandTitle': 'Соседство с партнёрами',
      'bb.logo.cobrandDesc': 'Когда наш лого появляется рядом с банком-партнёром, агентским домом или юридической фирмой — слева всегда мы, справа — партнёр, через тонкий вертикальный разделитель (высота = высоте текста). Логотипы должны быть оптически одного размера, а не математически.',
      'bb.logo.cobrand1': 'Банк-партнёр · escrow и ипотека',
      'bb.logo.cobrand2': 'Юр.фирма · PT-PMA, PPJB, sertifikat',
      'bb.logo.cobrand3': 'Агентский партнёр · referral программа',
      'bb.logo.onphoto': 'Лого на фото · 3 техники',
      'bb.logo.onphotoTitle': 'Лого на фотографии',
      'bb.logo.onphotoDesc': 'На фото логотип читается плохо без обработки. Три приёма: лёгкий gradient сверху (для светлых фото), полупрозрачный scrim (для сложных), и — никогда — голый лого на детальном фоне.',
      'bb.logo.onphoto.ok': 'Light gradient · сверху',
      'bb.logo.onphoto.scrim': 'Full scrim · 30–70% opacity',
      'bb.logo.onphoto.bad': 'Голый лого на загруженном фото',

      // 05 Color application
      'bb.colors.app': 'Реальное применение · 60-30-10 на странице',
      'bb.colors.appTitle': 'Цвет в работе',
      'bb.colors.appDesc': 'Палитра в действии — фрагмент главной страницы. Видно, как 5 цветов распределяются по правилу 60-30-10: основной фон, секции, акценты. Пины показывают где какой цвет.',
      'bb.colors.app.heroTitle': 'Структурированные активы на Бали — 29+30 leasehold, проверяемое право',
      'bb.colors.app.heroSub': '12 вилл. 3 доступны. Сдача Q4 2026. Управляемая аренда 10–12% / год.',
      'bb.colors.app.card1eb': 'Доступно',
      'bb.colors.app.card2eb': 'Доступно',
      'bb.colors.app.card3eb': 'Продано',
      'bb.colors.app.legendTitle': 'Цвета на странице',
      'bb.colors.app.legendDesc': 'Hero — Deep Green (60%). Body — Bg Primary (30%). Eyebrows и CTA — Accent + Cream (10%).',

      // 06 Typography composition
      'bb.typo.comp': 'Реальный макет · полный layout',
      'bb.typo.compTitle': 'Типографика в реальном макете',
      'bb.typo.compDesc': 'Все размеры по отдельности — это специмен. Здесь они работают вместе: eyebrow, H1, lede, H3-карточки, body, CTA. Это эталон вёрстки для project page и landing.',
      'bb.typo.comp.eyebrow': 'Serenity Villas · район Убуда · Q4 2026',
      'bb.typo.comp.h1': 'Структурированные активы <em>на</em> самом красивом острове Земли',
      'bb.typo.comp.lede': '12 вилл. 3 доступны. Leasehold 29 + 30 лет с проверяемым PPJB. Управляемая аренда даёт 10–12% годовых, отчёты квартальные. Мы не продаём квадратные метры — мы передаём структурированный актив.',
      'bb.typo.comp.cta': 'Записаться на показ',
      'bb.typo.comp.col1title': 'Право собственности',
      'bb.typo.comp.col1desc': 'Структура PT-PMA, leasehold 29 лет первичная + 30 лет продление под подписанным PPJB. Документы оформлены на ваше имя, налоги — квартально.',
      'bb.typo.comp.col2title': 'Управляемая доходность',
      'bb.typo.comp.col2desc': '10–12% годовых под нашим управлением. Квартальные отчёты, прозрачные комиссии, нулевые скрытые платежи в договоре.',
      'bb.typo.comp.col3title': 'Международная стройка',
      'bb.typo.comp.col3desc': 'Европейские архитекторы, сейсмическая инженерия, премиум-материалы. Срок строительства 14–18 месяцев с milestone-апдейтами каждые две недели.',
      'bb.typo.comp.ann1': 'Accent green · верх hero',
      'bb.typo.comp.ann2': 'Макс 7 слов · italic-акцент',
      'bb.typo.comp.ann3': 'Макс 3 строки под H1',
      'bb.typo.comp.ann4': 'Серифные подзаголовки',
      'bb.typo.comp.ann5': 'Cream-заливка · Dark Green текст',

      // 13 Multilingual & Naming
      'bb.nav.ml': 'Языки и имена',
      'bb.ml.title': 'Языки и имена',
      'bb.ml.lede': 'Бренд работает на трёх рынках: RU, EN, INA (внутренне). Чтобы материалы выглядели как один продукт, у нас единые <strong>правила обращения, форматов цен, дат и имён проектов</strong>.',
      'bb.ml.parity': 'Parity rules · 5 правил RU ↔ EN',
      'bb.ml.parityTitle': 'Параллельность языков',
      'bb.ml.parityDesc': 'EN и RU — равноправные первые языки. Никакой версии «через гугл-переводчик». Любая публикация выпускается на обоих языках одновременно.',
      'bb.ml.r1n': 'Факты, структура, владение — три удара. Без «amazing».',
      'bb.ml.r2n': 'Brand names в латинице. «Вы» с большой. Никаких «эстейтов».',
      'bb.ml.r3n': '«59 years» вводит в заблуждение · superlatives · false urgency.',
      'bb.ml.r4n': 'Калька «эстейт» · «коридор Убуда» · транслит бренда · «59 лет».',
      'bb.ml.naming': 'Naming conventions · 6 категорий',
      'bb.ml.namingTitle': 'Формула имени',
      'bb.ml.namingDesc': 'У каждой сущности есть своя формула: проекта, юнита, URL, файла маркетингового ассета. Это позволяет команде работать одинаково независимо от страны и канала.',
      'bb.ml.naming.cat': 'Категория',
      'bb.ml.naming.pat': 'Формула',
      'bb.ml.naming.ex': 'Пример',
      'bb.ml.naming.cat1': 'Проект',
      'bb.ml.naming.cat2': 'Юнит',
      'bb.ml.naming.cat3': 'URL',
      'bb.ml.naming.cat4': 'Marketing файл',
      'bb.ml.naming.cat5': 'Email подпись',
      'bb.ml.naming.cat6': 'Social handle',
      'bb.ml.formats': 'Форматы · цены, даты, телефоны',
      'bb.ml.formatsTitle': 'Форматы данных',
      'bb.ml.formatsDesc': 'Все материалы — сайт, договор, email — используют одинаковые форматы. Это не косметика, это снижает риск ошибки в цене на сделке $500K.',
      'bb.ml.fmt.priceRu': 'RU · цена',
      'bb.ml.fmt.priceRuNote': 'IDR primary (UU 7/2011), USD aux. Неразрывные пробелы как разделители тысяч.',
      'bb.ml.fmt.priceEn': 'EN · price',
      'bb.ml.fmt.priceEnNote': 'IDR primary. Comma as thousands separator. «USD» префикс, не «$».',
      'bb.ml.fmt.dateRu': 'RU · дата',
      'bb.ml.fmt.dateRuNote': 'Месяц прописью в hero, ISO-цифры в таблицах, кварталы для handover-сроков.',
      'bb.ml.fmt.dateEn': 'EN · date',
      'bb.ml.fmt.dateEnNote': 'DMY in copy, ISO-8601 in tables and contracts. Quarters for handover.',
      'bb.ml.fmt.phone': 'Телефон · WhatsApp',
      'bb.ml.fmt.phoneNote': 'E.164 формат · префикс с «+» · группировка 3-4-4. Без скобок и тире.',
      'bb.ml.fmt.address': 'Адрес проекта',
      'bb.ml.fmt.addressNote': 'Балийский формат: улица · деревня · район · регион · ZIP. Без «Indonesia» в конце.',

      // ===== БРЕНДБУК — 09 Photography mood-board =====
      'bb.photo.mood': 'Mood board · 12 эталонных кадров',
      'bb.photo.moodTitle': 'Эстетика бренда в 12 кадрах',
      'bb.photo.moodDesc': 'Когда нанимаете фотографа или подбираете сток — это эталон. Все кадры должны попадать в эту атмосферу: тёплый свет, открытая композиция, природа считывается. Никакого глянца, никаких «героических» закатов.',
      'bb.photo.m1': 'Аэросъёмка проекта',
      'bb.photo.m2': 'Архитектура вилла',
      'bb.photo.m3': 'Балийский ландшафт',
      'bb.photo.m4': 'Интерьер · гостевая',
      'bb.photo.m5': 'Рисовые террасы',
      'bb.photo.m6': 'Pool · открытая планировка',
      'bb.photo.m7': 'Living room · day',
      'bb.photo.m8': 'Bathroom · материалы',
      'bb.photo.m9': 'Night · тёплое освещение',
      'bb.photo.m10': 'Exterior · ¾ angle',
      'bb.photo.m11': 'Bird-eye · мастер-план',
      'bb.photo.specs': 'Production specs · 4 правила',
      'bb.photo.specsTitle': 'Технические стандарты',
      'bb.photo.specsDesc': 'Эти 4 спецификации передаются фотографу и 3D-художнику до съёмки. Без них бренд получает «обычный риелторский набор» вместо своей эстетики.',
      'bb.photo.spec.drone': 'Drone',
      'bb.photo.spec.droneTitle': 'Аэросъёмка',
      'bb.photo.spec.drone1': 'Высота: 30 / 80 / 120 м (3 опции)',
      'bb.photo.spec.drone2': 'Время: golden hour ±1 ч от заката',
      'bb.photo.spec.drone3': 'Композиция: 60% небо / 40% объект',
      'bb.photo.spec.drone4': 'Никаких vertical 90° «карта-вид»',
      'bb.photo.spec.render': '3D render',
      'bb.photo.spec.renderTitle': 'Качество визуализации',
      'bb.photo.spec.render1': 'Минимум 4K (<code>3840×2160</code>)',
      'bb.photo.spec.render2': 'Day-lit · никаких ночных сцен по умолчанию',
      'bb.photo.spec.render3': 'Реальные материалы, а не glossy plastic',
      'bb.photo.spec.render4': 'Без fake-people · 1 силуэт max',
      'bb.photo.spec.grading': 'Color grading',
      'bb.photo.spec.gradingTitle': 'Цветокоррекция',
      'bb.photo.spec.grading1': 'Тёплая тонировка <code>+200 K</code> от neutral',
      'bb.photo.spec.grading2': 'Matte профиль, не glossy',
      'bb.photo.spec.grading3': 'Контраст средний, без HDR-кранча',
      'bb.photo.spec.grading4': 'Saturation −5% от RAW',
      'bb.photo.spec.ai': 'AI imagery',
      'bb.photo.spec.aiTitle': 'AI-генерация · политика',
      'bb.photo.spec.ai1': '<strong>Можно:</strong> mood-boards, internal drafts',
      'bb.photo.spec.ai2': '<strong>Можно:</strong> social filler, blog illustrations',
      'bb.photo.spec.ai3': '<strong>Нельзя:</strong> real estate listings, hero pages',
      'bb.photo.spec.ai4': '<strong>Нельзя:</strong> люди-«клиенты», команда GBH',
      'bb.photo.principles': 'Принципы · чек-лист',
      'bb.photo.principlesTitle': 'Чек-лист для съёмки и подбора стока',

      // ===== БРЕНДБУК — 05 Print production =====
      'bb.colors.print': 'Производство · CMYK + Pantone + бумага',
      'bb.colors.printTitle': 'Цвет для печати',
      'bb.colors.printDesc': 'HEX и RGB — это экран. Для визиток, контрактов, брошюр и наружной рекламы нужны <strong>CMYK</strong> (4-х красочная печать) и <strong>Pantone PMS</strong> (плашечная). Эти значения — обязательное приложение к заказу типографии.',
      'bb.colors.print.color': 'Цвет',
      'bb.colors.print.use': 'Применение',
      'bb.colors.print.darkGreenUse': 'Логотип, контракты, hero печатных материалов',
      'bb.colors.print.creamUse': 'Фоны премиальных материалов, обложки lookbook',
      'bb.colors.print.creamLightUse': 'Body-страницы брошюр, документы, off-white фоны',
      'bb.colors.print.deepGreenUse': 'Premium-обложки, форзацы, тёмные секции каталога',
      'bb.colors.print.accentUse': 'Тиснение, foil-stamping логотипа, активные элементы',
      'bb.colors.print.note': 'Pantone-эквиваленты приблизительные — для точного попадания (например, foil-stamping или brand-критичные обложки) <strong>обязательно</strong> заказывайте Pantone-сравнение по физическому образцу до тиража.',
      'bb.colors.printRules': 'Правила производства · бумага + краска + finish',
      'bb.colors.printRulesTitle': 'Правила производства',
      'bb.colors.printRulesDesc': 'Эти 3 спецификации передаются типографии вместе с макетом. Без них бренд печатается с риском «не туда».',
      'bb.colors.print.paper': 'Бумага',
      'bb.colors.print.paperTitle': 'Бумага и плотность',
      'bb.colors.print.paperDesc': 'Визитки — <code>uncoated</code> 350 г/м², оттенок warm white. Брошюры — <code>matte coated</code> 170 г/м² body + 300 г/м² cover. Премиум lookbook — <code>Munken Pure</code> 130 г/м² (тёплый off-white, fits Cream).',
      'bb.colors.print.ink': 'Покрытие краской',
      'bb.colors.print.inkTitle': 'Покрытие и dot',
      'bb.colors.print.inkDesc': 'Total ink coverage не более <code>280%</code> (CMYK сумма), иначе риск отмарывания. Минимальный dot для текста на Cream/Cream Light — <code>6 pt</code>, на Dark Green — <code>7 pt</code> (на тёмном тоньше читается хуже).',
      'bb.colors.print.finish': 'Финиш',
      'bb.colors.print.finishTitle': 'Тиснение и покрытие',
      'bb.colors.print.finishDesc': 'Логотип на премиум-обложках — <code>foil-stamping</code> Pantone 4685 (Cream) либо silk-screen Dark Green. Никакого глянцевого UV-лака на всём листе — только <code>spot UV</code> по логотипу.',

      // ===== БРЕНДБУК — 02 Voice depth =====
      'bb.voice.para': 'Готовые тексты',
      'bb.voice.paraTitle': 'Голос в готовых текстах',
      'bb.voice.paraDesc': 'Три самых частых контекста — описание виллы, фоллоуап после показа, уведомление о задержке. Это эталон: новая копия должна звучать так же.',
      'bb.voice.para1.type': 'Описание объекта',
      'bb.voice.para1.body': 'Serenity Villas — двенадцать вилл на 2 спальни в районе центрального Убуда. Сдача — Q4 2026. Право — leasehold 29 лет + продление 30 лет под подписанным PPJB. Доступно 3 из 12 юнитов, цены от $189 000. Управляемая аренда даёт 10–12% годовых, отчёты квартальные.',
      'bb.voice.para1.metaA': 'Канал · сайт, project page',
      'bb.voice.para1.metaB': '≈ 50 слов',
      'bb.voice.para2.type': 'Фоллоуап-письмо',
      'bb.voice.para2.body': 'Александр, спасибо за визит в Wanayu в субботу. Прикрепляю PPJB на юнит B7, расчёт ROI на 5 лет и план юридического оформления. Если есть вопросы — отвечу сегодня до 18:00 по Москве. Если решаетесь — можем зарезервировать юнит до конца недели без обязательств.',
      'bb.voice.para2.metaA': 'Канал · email, личный',
      'bb.voice.para2.metaB': '≈ 45 слов',
      'bb.voice.para3.type': 'Уведомление о задержке',
      'bb.voice.para3.body': 'Сдача юнита B7 переносится с Q3 на Q4 2026. Причина — переработка инженерной части по результатам аудита, чтобы соответствовать новым требованиям сейсмики. Это наше решение, мы берём на себя удлинение сроков, чтобы не сокращать качество. Компенсация — два года бесплатного property management после сдачи.',
      'bb.voice.para3.metaA': 'Канал · email, transactional',
      'bb.voice.para3.metaB': '≈ 55 слов',

      'bb.voice.formulas': '5 формул заголовков',
      'bb.voice.formulasTitle': 'Как строить заголовок',
      'bb.voice.formulasDesc': 'Любой headline собирается по одной из пяти формул. Никаких «эксклюзивных предложений» и «уникальных возможностей» — только конкретика.',

      'bb.voice.cta': 'Библиотека CTA · 12 паттернов',
      'bb.voice.ctaTitle': 'Кнопки и призывы',
      'bb.voice.ctaDesc': 'Каждый CTA указывает <strong>конкретное действие</strong>, не абстрактное «узнать больше». Используем эти 12, не изобретаем новые без причины.',
      'bb.voice.cta1.ctx': 'Hero проекта · primary action',
      'bb.voice.cta2.ctx': 'Listing page · secondary nav',
      'bb.voice.cta3.ctx': 'Lead magnet · education funnel',
      'bb.voice.cta4.ctx': 'Контакты · main contact CTA',
      'bb.voice.cta5.ctx': 'FAQ · trust signal',
      'bb.voice.cta6.ctx': 'Investor tool · ROI калькулятор',
      'bb.voice.cta7.ctx': 'Project page · video tour',
      'bb.voice.cta8.ctx': 'Hero · qualified lead',
      'bb.voice.cta9.ctx': 'Project details · download',
      'bb.voice.cta10.ctx': 'Sold-out проект · capture interest',
      'bb.voice.cta11.ctx': 'Listing · helper utility',
      'bb.voice.cta12.ctx': 'Footer · long-form education',

      'bb.voice.msg': 'Сообщения системы · бренд в продукте',
      'bb.voice.msgTitle': 'Сообщения системы',
      'bb.voice.msgDesc': 'Ошибка валидации, успех, 404, 500 — это <strong>самые заметные</strong> места бренда в продукте. Нет «Что-то пошло не так» — есть конкретика и человеческий тон.',
      'bb.voice.msg.err': 'Ошибка валидации',
      'bb.voice.msg.err.text': 'Укажите телефон с кодом страны (+62, +7, +971…). Без кода мы не сможем перезвонить.',
      'bb.voice.msg.ok': 'Форма отправлена',
      'bb.voice.msg.ok.text': 'Спасибо, Анна. Investment-менеджер свяжется в течение 24 часов по WhatsApp +62 812 3456 7890.',
      'bb.voice.msg.confirm': 'Бронь подтверждена',
      'bb.voice.msg.confirm.text': 'Показ Serenity Villas забронирован на 15 марта в 11:00. Адрес и водитель — за день до встречи в WhatsApp.',
      'bb.voice.msg.sold': 'Уведомление о продаже',
      'bb.voice.msg.sold.text': 'Юнит B7 продан. Осталось 2 виллы на этом этаже — посмотреть.',
      'bb.voice.msg.e404': '404 · страница',
      'bb.voice.msg.e404.text': 'Этой страницы больше нет. Посмотрите актуальные проекты или вернитесь на главную.',
      'bb.voice.msg.e500': '500 · сервер',
      'bb.voice.msg.e500.text': 'Сбой на нашей стороне. Команда уже видит, обычно фиксим за 5–10 минут. Попробуйте обновить страницу.',

      'bb.voice.matrix': 'Voice matrix · 2×2',
      'bb.voice.matrixTitle': 'Когда какой регистр',
      'bb.voice.matrixDesc': 'Две оси: формальность × сложность языка. Каждый канал попадает в одну из четырёх клеток. Менять регистр между клетками — нормально, путать в рамках одного материала — нет.',
      'bb.voice.matrix.technical': 'Technical · детально',
      'bb.voice.matrix.accessible': 'Accessible · просто',
      'bb.voice.matrix.formal': 'Formal',
      'bb.voice.matrix.casual': 'Casual',
      'bb.voice.matrix.q1.title': 'Контракты, PPJB',
      'bb.voice.matrix.q1.desc': 'Юридические термины, полные формулировки, ничего не сокращаем. Никаких «и тд», никаких «удобный».',
      'bb.voice.matrix.q1.use': '→ контракты, юр. доки, инвестор-меморандум',
      'bb.voice.matrix.q2.title': 'Hero, главная страница',
      'bb.voice.matrix.q2.desc': 'Серьёзный тон, но без жаргона. «Структурированный актив» — да, «PPJB compliance framework» — нет.',
      'bb.voice.matrix.q2.use': '→ hero сайта, pitch deck для инвестора',
      'bb.voice.matrix.q3.title': 'FAQ, документация',
      'bb.voice.matrix.q3.desc': 'Разговорно, но точно. «Как считается leasehold 29+30» — с цифрами и формулой, но человеческим языком.',
      'bb.voice.matrix.q3.use': '→ FAQ, help center, knowledge base',
      'bb.voice.matrix.q4.title': 'Social, newsletter',
      'bb.voice.matrix.q4.desc': 'Лёгкий, образный, но без панибратства. Юмор — да, эмодзи — максимум один на пост.',
      'bb.voice.matrix.q4.use': '→ Instagram, Telegram, email-рассылка',

      'bb.voice.pron': 'RU · обращение',
      'bb.voice.pronTitle': '«Вы» или «ты»',
      'bb.voice.pronDesc': 'Для premium-недвижимости и удалённой сделки на $500 K дефолт — <strong>«Вы»</strong>. «Ты» допустимо только в неформальных каналах (Instagram captions, Reels). Никогда «ты» в email, документах, web body copy.',
      'bb.voice.pron.default': 'Default · 95% контекстов',
      'bb.voice.pron.casual': 'Casual · 5% контекстов',
      'bb.voice.pron.never': 'Никогда',
      'bb.voice.pron.youUse': 'Сайт, email, WhatsApp с клиентом, контракты, документы, sales-звонок, презентация, оффер.',
      'bb.voice.pron.tyUse': 'Instagram captions, Reels, Telegram-канал. Только когда формат сам очевидно неформальный.',
      'bb.voice.pron.neverUse': 'Безличные конструкции вроде «доступно скачивание». Всегда либо «Вы можете», либо прямое действие — «Скачайте».',

      // ===== БРЕНДБУК — 00 Foundations =====
      'bb.nav.foundations': 'Основы',
      'bb.fnd.title': 'Основы',
      'bb.fnd.lede': 'Прежде чем говорить о цвете и логотипе — кто мы, зачем и для кого. Эта глава — <strong>контракт между командой и брендом</strong>. Перечитывать каждый квартал. Менять только осознанно.',
      'bb.fnd.mv': 'Миссия и видение',
      'bb.fnd.mvTitle': 'Зачем мы и куда идём',
      'bb.fnd.mvDesc': 'Миссия — почему мы существуем сегодня. Видение — куда придём к 2030 году. Каждое решение проверяется против этих двух предложений.',
      'bb.fnd.mission': 'Миссия',
      'bb.fnd.missionText': 'Делать международные инвестиции в недвижимость такими же прозрачными и понятными, как заказать такси через приложение.',
      'bb.fnd.missionHorizon': 'Горизонт — сегодня и каждый день',
      'bb.fnd.vision': 'Видение',
      'bb.fnd.visionText': 'К 2030 году — стандарт международных инвестиций в недвижимость на развивающихся тропических рынках, начиная с Юго-Восточной Азии.',
      'bb.fnd.visionHorizon': 'Горизонт — 5 лет',
      'bb.fnd.values': '4 принципа',
      'bb.fnd.valuesTitle': 'Как мы принимаем решения',
      'bb.fnd.valuesDesc': 'Когда выбор не очевиден — возвращаемся к этим четырём принципам. Они старше, чем любая бизнес-цель квартала.',
      'bb.fnd.v1.title': 'Прозрачность',
      'bb.fnd.v1.desc': 'Мы показываем всё: документы, сроки, цены, риски. Если в сделке есть «но» — оно проговаривается до подписи, а не после.',
      'bb.fnd.v2.title': 'Международный стандарт',
      'bb.fnd.v2.desc': 'Архитектура, материалы, инженерия и юр.структура — на уровне европейского девелопмента. Никаких «местных компромиссов».',
      'bb.fnd.v3.title': 'Долгосрочная ценность',
      'bb.fnd.v3.desc': 'Строим не «отжать», а на 30 лет. Каждое инженерное решение проверяется горизонтом владения, а не отчётом квартала.',
      'bb.fnd.v4.title': 'Уважение к Бали',
      'bb.fnd.v4.desc': 'Мы — гости на острове. Архитектура считывает балийский ландшафт, команда нанимает локально, прибыль реинвестируется в сообщество.',
      'bb.fnd.promise': 'Обещание бренда',
      'bb.fnd.promiseTitle': 'Что мы обещаем клиенту',
      'bb.fnd.promiseDesc': 'Одно предложение, которое клиент должен запомнить после первой встречи. Все маркетинговые материалы — переформулировки этой мысли.',
      'bb.fnd.promiseText': 'Структурированный актив на самом красивом острове Земли — защищённый бумагами, спроектированный для возврата, построенный на десятилетия.',
      'bb.fnd.archetype': 'Архетип бренда · Юнг',
      'bb.fnd.archetypeTitle': 'Архетип',
      'bb.fnd.archetypeDesc': 'Из 12 юнгианских архетипов нам близки два: основной — <strong>Sage</strong> (мудрец, который знает рынок и делится знанием), вспомогательный — <strong>Caregiver</strong> (опекун, который защищает интересы после сделки).',
      'bb.fnd.archetype.primary': 'Основной архетип',
      'bb.fnd.archetype.secondary': 'Вспомогательный архетип',
      'bb.fnd.sageDesc': 'Мы образовываем клиента: объясняем закон UU 7/2011, структуру PT-PMA, разницу 29+30 vs «59 лет». Не давим, не торопим. Решение клиент принимает на знаниях, а не на эмоциях.',
      'bb.fnd.caregiverDesc': 'Мы заботимся об активе после сделки: квартальные отчёты, налоги, сдача в аренду, ремонт. Клиент знает, что один не остался — это снимает главный страх удалённого инвестора.',
      'bb.fnd.personas': '3 портрета · кому мы продаём',
      'bb.fnd.personasTitle': 'Целевая аудитория',
      'bb.fnd.personasDesc': 'Три живых портрета вместо абстрактного «состоятельного инвестора». Любая фраза в маркетинге проверяется: <em>так бы я сказал именно ему?</em>',
      'bb.fnd.p.budget': 'Бюджет',
      'bb.fnd.p.goal': 'Цель',
      'bb.fnd.p.fear': 'Страх',
      'bb.fnd.p.channel': 'Канал',
      'bb.fnd.p.lang': 'Язык',
      'bb.fnd.p1.name': 'Александр, 38',
      'bb.fnd.p1.meta': 'Москва · IT-предприниматель',
      'bb.fnd.p1.quote': '«Продал стартап. Не хочу держать всё в рублях и квартирах в Москве. Бали — слышал, что стабильный рост.»',
      'bb.fnd.p1.budget': '$400 K – $700 K · 1 вилла',
      'bb.fnd.p1.goal': 'Диверсификация · защита капитала',
      'bb.fnd.p1.fear': 'Потерять из-за местного fraud',
      'bb.fnd.p1.channel': 'Telegram · рекомендации',
      'bb.fnd.p1.lang': 'RU primary · EN ok',
      'bb.fnd.p2.name': 'Marcus, 45',
      'bb.fnd.p2.meta': 'Сингапур · финансы, экспат',
      'bb.fnd.p2.quote': '«Need 10–12% net yield with verifiable legal title. Show me the numbers, the contract and the exit options.»',
      'bb.fnd.p2.budget': '$300 K – $500 K · rental yield',
      'bb.fnd.p2.goal': 'Пассивный доход 10–12% / год',
      'bb.fnd.p2.fear': 'Leasehold · ликвидность выхода',
      'bb.fnd.p2.channel': 'LinkedIn · Bloomberg · брокеры',
      'bb.fnd.p2.lang': 'EN primary',
      'bb.fnd.p3.name': 'Елена и Дмитрий, 50 + 52',
      'bb.fnd.p3.meta': 'Дубай · бизнес-семья',
      'bb.fnd.p3.quote': '«Хотим второе жильё на острове. Чтобы дети приезжали, чтобы было куда уехать на два месяца зимой.»',
      'bb.fnd.p3.budget': '$500 K – $1 M · custom villa',
      'bb.fnd.p3.goal': 'Дом для отпуска · будущий переезд',
      'bb.fnd.p3.fear': 'Право собственности · безопасность семьи',
      'bb.fnd.p3.channel': 'WhatsApp · агент по рекомендации',
      'bb.fnd.p3.lang': 'RU / EN bilingual',
      'bb.fnd.positioning': 'Матрица позиционирования',
      'bb.fnd.positioningTitle': 'Где мы на рынке',
      'bb.fnd.positioningDesc': 'Балийский рынок премиум-вилл — две оси: цена и прозрачность. Наша позиция — справа сверху. Это не предмет компромисса, это определение бренда.',
      'bb.fnd.pos.priceAxis': 'Ценовой сегмент',
      'bb.fnd.pos.transAxis': 'Прозрачность',
      'bb.fnd.pos.low': 'низкая',
      'bb.fnd.pos.high': 'высокая',
      'bb.fnd.pos.local': 'Локальные строители',
      'bb.fnd.pyramid': 'Пирамида бренда · 5 уровней',
      'bb.fnd.pyramidTitle': 'Пирамида бренда',
      'bb.fnd.pyramidDesc': 'От узкой вершины (essence — одно слово) до широкой базы (rational attributes). Каждый уровень опирается на нижний. Если эссенция меняется — рушится вся конструкция.',
      'bb.fnd.pyr.essence': 'Stewardship · попечительство',
      'bb.fnd.pyr.values': 'Прозрачность · Совершенство · Долговечность',
      'bb.fnd.pyr.personality': 'Спокойствие · Уверенность · Продуманность · Гостеприимство',
      'bb.fnd.pyr.benefits': 'Проверяемое право · премиум-стройка · управляемая доходность',
      'bb.fnd.pyr.attributes': 'Leasehold 29+30 · PT-PMA · квартальные отчёты · международные архитекторы',

      // ===== БРЕНДБУК — mockup edition (обложка, оглавление, главы, колофон) =====
      'bb.cover.edition': 'Гид по фирменному стилю · Издание 01',
      'bb.cover.version': 'v 1.0 · Май 2026',
      'bb.cover.subtitle': 'Гайдлайны визуальной идентичности международного инвестиционного девелопера на Бали. Справочник для дизайнеров, маркетологов и партнёров — живой документ.',
      'bb.cover.issued': 'Выпущено',
      'bb.cover.issuedDate': '22 мая 2026',
      'bb.cover.owner': 'Владелец',
      'bb.cover.ownerName': 'Бренд и дизайн',
      'bb.cover.status': 'Статус',
      'bb.cover.statusName': 'Внутренний и партнёры',
      'bb.cover.location': 'Бренд-бук · /admin',

      'bb.toc.edition': 'Издание 01 · v1.0',
      'bb.toc.contents': 'Содержание',
      'bb.toc.note1': 'Кликни по HEX, токену или спеке — скопируется.',
      'bb.toc.note2': 'Печатай как A4 портрет для офлайн-справки.',

      // 01 О бренде
      'bb.about.lede': 'Global Bali Home — <strong>международный инвестиционный девелопер</strong>, который строит премиальные жилые проекты на Бали — на одном из самых привлекательных рынков недвижимости в мире. Мы соединяем мировую экспертизу в архитектуре, строительстве и финансах с уважением к балийскому ландшафту.',
      'bb.about.positioning': 'Позиционирование',
      'bb.about.posTitle': 'Холдинг, а не строитель',
      'bb.about.posDesc': 'Мы позиционируемся как <strong>инвестиционный девелоперский холдинг</strong>, а не «строитель вилл». Каждый проект соответствует международным стандартам с проверяемым правом собственности, продуманной архитектурой и долгосрочной инвестиционной перспективой.',
      'bb.about.stat1': 'Легальность как УТП',
      'bb.about.stat2': 'Структура аренды',
      'bb.about.stat3': 'Издание 01 · v1.0',
      'bb.about.manifesto': '«Мы не продаём квадратные метры. Мы передаём структурированный актив на самом красивом острове Земли — защищённый бумагами, спроектированный для возврата и построенный надолго.»',
      'bb.about.manifestoCite': '— Манифест бренда · внутренний',

      // 02 Тон
      'bb.voice.lede': 'Как Global Bali Home звучит во всех каналах — от звонка отдела продаж до подписи в Instagram. Голос определяют четыре атрибута. <strong>Их нужно комбинировать, а не выбирать один.</strong>',
      'bb.voice.pillars': 'Опоры голоса',
      'bb.voice.practice': 'Голос на практике',
      'bb.voice.langTitle': 'Кросс-языковая консистентность',
      'bb.voice.byChannel': 'По каналам',

      // 03 Логотип
      'bb.logo.lede': 'Знак сочетает многослойную пирамиду (рост, возвышение, слоистый балийский ландшафт) с названием жилого комплекса. <strong>Две системы логотипа сосуществуют:</strong> родительский бренд GBH и марки отдельных проектов.',
      'bb.logo.primary': 'Главный · Global Bali Home',
      'bb.logo.primaryTitle': 'Главный логотип',
      'bb.logo.primaryDesc': 'Полный логотип — пирамида + GlobalBaliHome. Используй когда позволяет место; это подпись бренда.',
      'bb.logo.short': 'Короткий · 2 цветовые версии',
      'bb.logo.shortTitle': 'Короткий логотип — пирамида + GBH',
      'bb.logo.project': 'Марки проектов · Serenity',
      'bb.logo.projectTitle': 'Serenity — семейство проектов',
      'bb.logo.clearspace': 'Защитное поле · правило 1y',
      'bb.logo.clearspaceTitle': 'Воздух вокруг',
      'bb.logo.clearspaceDesc': 'Оставляй <strong>1× высоту пирамиды (y)</strong> с каждой стороны. Никакого текста, графики или других логотипов в этой зоне — в любом формате.',
      'bb.logo.cs.cream': 'Cream · на тёмном',
      'bb.logo.cs.darkgreen': 'Dark Green · на песочном',
      'bb.logo.minsize': 'Минимальный размер · 3 марки · 6 порогов',
      'bb.logo.minsizeTitle': 'Жёсткий порог читаемости',
      'bb.logo.minsizeDesc': 'Ниже этих размеров текст перестаёт читаться и лотос теряет детали. Жёсткие пороги — меньше не делать. У каждой марки свой минимум, потому что количество текста разное.',
      'bb.logo.minsize.group.full': 'Полный логотип',
      'bb.logo.minsize.group.fullSub': 'пирамида + «GlobalBaliHome»',
      'bb.logo.minsize.group.short': 'Короткий логотип',
      'bb.logo.minsize.group.shortSub': 'пирамида + «GBH»',
      'bb.logo.minsize.group.mark': 'Знак-пирамида',
      'bb.logo.minsize.group.markSub': 'отдельный символ',
      'bb.logo.minsize.digital': 'Digital',
      'bb.logo.minsize.print': 'Print',
      'bb.logo.minsize.digitalFullUse': 'Самый плотный UI · подписи в футере',
      'bb.logo.minsize.printFullUse': 'Визитки · подписи в договорах',
      'bb.logo.minsize.digitalShortUse': 'Sticky-бары · хлебные крошки · бейджи',
      'bb.logo.minsize.printShortUse': 'Подписи в документах · уголки брошюр',
      'bb.logo.minsize.digitalMarkUse': 'Favicon браузера · inline-упоминания',
      'bb.logo.minsize.printMarkUse': 'Бирки · бейджи · мелкие повторяющиеся паттерны',
      'bb.logo.favicon': 'Favicon · 5 размеров · 2 цвета',
      'bb.logo.faviconTitle': 'Метки браузера и приложений',
      'bb.logo.faviconDesc': 'Пирамида, извлечённая из знака GBH — используется там, где полный логотип не помещается: вкладки браузера, аватары соцсетей, иконки приложений. Выбирай цвет под фон.',
      'bb.logo.favicon.cream': 'Cream · для тёмных фонов',
      'bb.logo.favicon.darkgreen': 'Dark Green · для светлых фонов',
      'bb.logo.favicon.sizes': '5 размеров',

      // 04 Правила
      'bb.rules.lede': 'Четыре правила ниже применяются к любой поверхности. Это не стилистические предпочтения — нарушать их значит размывать бренд и ломать узнаваемость.',
      'bb.rules.r1.title': 'Не искажать',
      'bb.rules.r1.desc': 'Никогда не растягивать, сжимать или менять пропорции логотипа. Масштабируй равномерно из угла.',
      'bb.rules.r2.title': 'Не перекрашивать',
      'bb.rules.r2.desc': 'Только две утверждённые цветовые версии — Cream или Dark Green. Никаких градиентов, фото-заливок и цветов вне палитры.',
      'bb.rules.r3.title': 'Не переставлять',
      'bb.rules.r3.desc': 'Структура и порядок элементов фиксированы. Пирамида слева от названия; название на одной базовой линии. Никогда не переверстывать.',
      'bb.rules.r4.title': 'Не загромождать',
      'bb.rules.r4.desc': 'Размещай логотип только на достаточно контрастных фирменных поверхностях. Никогда поверх загруженных или детальных фотографий без защитного поля.',

      // 05 Цвета
      'bb.colors.lede': 'Сдержанная палитра, организованная по роли. Каждое значение привязано к use case — поверхность, бренд, акцент, тень. Применяй <strong>правило 60-30-10</strong>: 60% основной фон, 30% вторичная поверхность, 10% акцент.',
      'bb.colors.surfaces': '3 цвета · фоны',
      'bb.colors.surfacesTitle': 'Поверхности',
      'bb.colors.surfacesDesc': 'Базовые фоны. Каждый экран стоит на одной из трёх поверхностей — страница, приподнятые панели, альтернативные секции.',
      'bb.colors.bgPrimaryRole': 'Фон страницы, hero, футер',
      'bb.colors.bgSurfaceRole': 'Карточки, приподнятые панели, hover',
      'bb.colors.bgAltRole': 'Альт-секции, lead-magnet, футер',
      'bb.colors.main': '2 цвета · фирменные',
      'bb.colors.mainTitle': 'Основные',
      'bb.colors.mainDesc': 'Два фирменных цвета бренда. Их сочетание — Dark Green + Cream — то, по чему узнают бренд в логотипе, hero-блоках и заголовках.',
      'bb.colors.darkGreenRole': 'Бренд primary · логотип на светлом',
      'bb.colors.creamRole': 'Бренд secondary · логотип на тёмном',
      'bb.colors.supporting': '2 цвета · контраст',
      'bb.colors.supportingTitle': 'Поддерживающие',
      'bb.colors.supportingDesc': 'Вспомогательные тона для контрастных моментов — инвертированные поверхности, формы на тёмных фонах, материалы на цветной бумаге.',
      'bb.colors.creamLightRole': 'Off-white · инвертированные поверхности, формы',
      'bb.colors.deepGreenRole': 'Высокий контраст · печать',
      'bb.colors.accent': '1 цвет · активный',
      'bb.colors.accentTitle': 'Акцент',
      'bb.colors.accentDesc': 'Единственный активный цвет — зарезервирован для того, что требует внимания: ссылки, CTA, прогресс, состояние успеха, бровки-тэги. Никогда не используется как фон.',
      'bb.colors.accentRole': 'Бровки · прогресс · ссылки · успех · активные пункты навигации',
      'bb.colors.tints': '3 шкалы · 10 ступеней',
      'bb.colors.tintsTitle': 'Оттенки и тени',
      'bb.colors.tintsDesc': '10-ступенчатые шкалы для связующих тканей — hover, рамки, разделители, disabled UI, графики. Нумерованная <strong>база — на 200, 700 или 800</strong> в зависимости от цвета (●). Клик по любому образцу — копирование.',
      'bb.colors.combos': 'Сочетания',
      'bb.colors.combosTitle': 'Одобренные комбинации',
      'bb.colors.combosDesc': 'Кураторские сочетания для фонов, поверхностей и акцентов. Каждая комбинация проверена на контраст.',
      'bb.colors.combo1.eyebrow': 'Главная поверхность',
      'bb.colors.combo1.title': 'Где Serenity становится образом жизни',
      'bb.colors.combo1.desc': 'Cream-текст на Dark Green — фирменное сочетание.',
      'bb.colors.combo2.eyebrow': 'Инвертированная поверхность',
      'bb.colors.combo2.title': 'Тихие секции, формы захвата',
      'bb.colors.combo2.desc': 'Deep Green на Cream — для воздуха.',
      'bb.colors.combo3.eyebrow': 'Высокий контраст',
      'bb.colors.combo3.title': 'Hero-перекрытия, футер, печать',
      'bb.colors.combo3.desc': 'Белый на Deep Green — максимальный контраст для заголовков.',
      'bb.colors.combo4.eyebrow': 'Печать primary',
      'bb.colors.combo4.title': 'Брошюры, документы, визитки',
      'bb.colors.combo4.desc': 'Dark Green на белом — предпочтительный для печатных материалов.',
      'bb.colors.wcag': 'Доступность',
      'bb.colors.wcagTitle': 'Контраст WCAG — все проходят AAA',
      'bb.colors.wcagDesc': 'Каждая утверждённая пара текст/фон проверена против WCAG 2.1. AA требует 4.5:1, AAA — 7:1. Все комбинации ниже проходят AAA — читаемо для пользователей с пониженным зрением.',
      'bb.colors.wcag.pair': 'Пара',
      'bb.colors.wcag.preview': 'Превью',
      'bb.colors.wcag.ratio': 'Отношение',
      'bb.colors.wcag.grade': 'Оценка',

      // 06 Типографика
      'bb.typo.lede': 'Система из двух шрифтов. <strong>Playfair Display</strong> — серифный, классический, премиальный — для display и заголовков. <strong>Montserrat</strong> — геометрический гротеск — для текста, навигации, UI-меток. Их сочетание даёт бренду редакторско-современный голос.',
      'bb.typo.specimens': 'Образцы',
      'bb.typo.specTitle': 'Шрифты в работе',
      'bb.typo.tracking': 'Трекинг',
      'bb.typo.leading': 'Интерлиньяж',
      'bb.typo.cutsSerif': 'Доступные начертания — serif',
      'bb.typo.cutsSans': 'Доступные начертания — sans',
      'bb.typo.scale': '8 ступеней · 1rem = 18px',
      'bb.typo.scaleTitle': 'Шкала размеров',
      'bb.typo.scaleDesc': 'Сайт задаёт <code>html { font-size: 112.5% }</code>, поэтому <strong>1rem = 18px</strong> (не 16). Все размеры ниже взяты из <code>css/style.css</code>.',
      'bb.typo.tokens': '6 токенов · :root',
      'bb.typo.tokensTitle': 'Токены размеров — CSS custom properties',
      'bb.typo.tokensDesc': 'Все размеры выставлены на <code>:root</code> в <code>css/style.css</code>. Ссылайся на токены — никогда не хардкодь <code>rem</code> или <code>px</code>.',
      'bb.typo.tk.xs': 'метки, теги, кнопки, мета, бровки',
      'bb.typo.tk.sm': 'навигация, описания, инпуты, подписи',
      'bb.typo.tk.md': 'h4, FAQ, цены, заголовки карточек',
      'bb.typo.tk.xl': 'числа в статистике, display-текст',
      'bb.typo.tk.2xl': 'декоративные числа, кнопки-закрытие',
      'bb.typo.tk.3xl': 'крупные акцентные числа (редко)',

      // 07 UI
      'bb.ui.lede': 'Базовые интерфейсные элементы в фирменных цветах. Применяй те же паттерны на маркетинговом сайте, лендингах, дашбордах и печатных формах. Все компоненты должны работать в светлом (Cream) и тёмном (Deep Green) режимах.',
      'bb.ui.buttons': 'Кнопки',
      'bb.ui.buttonsTitle': 'Иерархия действий',
      'bb.ui.buttonsDesc': 'Четыре уровня: primary (Cream-заливка), secondary (обводка), ghost (только текст), disabled. Дефолтный padding 14×28px, малый вариант 10×18px. Радиус 4px.',
      'bb.ui.onDark': 'На Dark Green · hero и оверлеи',
      'bb.ui.onCream': 'На Cream · формы и тихие секции',
      'bb.ui.forms': 'Формы',
      'bb.ui.formsTitle': 'Инпуты и валидация',
      'bb.ui.formDefault': 'На Dark Green · дефолтная форма',
      'bb.ui.cards': 'Карточки',
      'bb.ui.cardsTitle': 'Карточки проектов и статусов',
      'bb.ui.tags': 'Теги и бейджи',
      'bb.ui.tagsTitle': 'Теги статусов и фич',
      'bb.ui.tagsDark': 'На Dark Green · теги статусов',

      // 08 Иконки
      'bb.icons.lede': 'Иконки — часть визуальной системы. Они поддерживают навигацию и улучшают визуальную ясность. Используй на контрастных фонах одинаковых размеров. <strong>Stroke 1.5 · сетка 24 px · monoweight</strong>.',

      // 09 Фотография
      'bb.photo.lede': 'Фотография бренда передаёт спокойный, природный образ жизни на Бали — фокус на тепле, атмосфере и образе жизни, а не на показной роскоши.',

      // 10 Отступы
      'bb.margins.lede': 'Стабильный отступ <strong>80 px</strong> применяется во всех цифровых макетах. Печать (A4 · 210×297 мм) использует <strong>30 мм</strong>. Они задают воздух и поддерживают визуальный ритм между форматами.',
      'bb.margins.a4': 'Поле · 30 мм',
      'bb.margins.tablet': 'Поле · 80 px',
      'bb.margins.desktop': 'Поле · 80 px',

      // 11 Соцсети
      'bb.social.lede': 'Утверждённые шаблоны для постов и сторис Instagram. Фирменные цвета, типографика Montserrat, постоянный визуальный ритм. Названия проектов строчными буквами, ценностные предложения — элегантным serif-заголовком.',
      'bb.social.postsTitle': 'Шаблоны ленты',
      'bb.social.storiesTitle': 'Шаблоны сторис',

      // Колофон
      'bb.colophon.signature': '«Идентичность — это дисциплина делать одно и то же одним и тем же способом — каждый раз, в каждом канале.»',
      'bb.colophon.version': 'Версия',
      'bb.colophon.versionVal': '1.0 · Издание 01',
      'bb.colophon.reviewed': 'Последний пересмотр',
      'bb.colophon.reviewedVal': '22 мая 2026',
      'bb.colophon.stewards': 'Стюарды',
      'bb.colophon.stewardsVal': 'Бренд и дизайн',
      'bb.colophon.left': 'Global Bali Home · внутренний и партнёры',
      'bb.colophon.right': 'Бренд-бук · admin / brandbook',
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
      // If key is missing in both locales, t() returns the key itself —
      // keep the original HTML content instead of replacing with the key string.
      if (val === key) return;
      if (val.includes('<strong>') || val.includes('<b>') || val.includes('<br>') || val.includes('<a ')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val === key) return;
      el.placeholder = val;
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

  // ─── Auth backend: Supabase (см. admin/supabase-client.js) ───
  // GitHub PAT и Firebase больше не используются — данные и картинки в Supabase,
  // публикация — через build pipeline на Vercel (push не нужен).

  // ─── State ───
  let currentUser = null;       // { id, email, full_name, role, is_active }
  let currentProject = 'serenity-villas';
  let projectsData = null;    // working copy of PROJECTS_DATA
  let pendingChanges = false;
  const _dirtyState = {
    projects: false, faq: false, testimonials: false, seo: false,
    contacts: false, rate: false, exitpopup: false,
    social: false, guide: false, analytics: false,
  };
  const dirtyTabs = new Proxy(_dirtyState, {
    set(target, prop, value) {
      target[prop] = value;
      updateDirtyIndicators();
      return true;
    }
  });

  // Map dirty keys to nav tab names. Settings tab aggregates
  // contacts/rate/social/guide.
  const _dirtyTabMap = {
    rate: 'settings', contacts: 'settings',
    social: 'settings', guide: 'settings',
  };

  function updateDirtyIndicators() {
    document.querySelectorAll('.admin-nav__btn[data-tab]').forEach(btn => {
      const tab = btn.dataset.tab;
      const isDirty = Object.entries(_dirtyState).some(([key, val]) => val && (_dirtyTabMap[key] || key) === tab);
      btn.classList.toggle('dirty', isDirty);
    });
  }

  // Делегирование dirty-tracking. На контейнере любой формы ловим input/change
  // и помечаем нужный ключ. Переживает ре-рендеры внутренностей.
  function bindDirtyDelegate(containerSel, key) {
    const el = document.querySelector(containerSel);
    if (!el || el.dataset.dirtyBound) return;
    el.dataset.dirtyBound = '1';
    const mark = () => { dirtyTabs[key] = true; };
    el.addEventListener('input', mark);
    el.addEventListener('change', mark);
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
  const setpwScreen = $('#setpw-screen');
  const adminApp = $('#admin-app');
  const loginForm = $('#login-form');
  const loginError = $('#login-error');
  const setpwForm = $('#setpw-form');
  const setpwError = $('#setpw-error');

  // ─── Supabase client check ───
  if (typeof window.SupabaseAdmin === 'undefined') {
    loginError.textContent = 'Auth client (supabase-client.js) не загружен.';
    loginError.hidden = false;
    return;
  }

  // ─── Recovery / Invite link handler ───
  // Современный Supabase шлёт implicit-flow ссылки:
  //   /admin/#access_token=...&refresh_token=...&type=recovery
  // SDK с detectSessionInUrl=true (default) сам ставит сессию и стреляет
  // событием PASSWORD_RECOVERY — мы его слушаем ниже в onAuthStateChange.
  //
  // Также поддерживаем legacy PKCE-flow (?token_hash=...&type=...) на случай
  // старых писем — verifyOtp вручную.
  let inRecoveryMode = false;

  async function maybeHandleLegacyToken() {
    const params = new URLSearchParams(location.search);
    const tokenHash = params.get('token_hash');
    const type = params.get('type');
    if (!tokenHash || !type) return false;

    const { error } = await SupabaseAdmin.client.auth.verifyOtp({ type, token_hash: tokenHash });
    history.replaceState({}, '', location.pathname);
    if (error) {
      console.error('verifyOtp failed:', error);
      loginScreen.hidden = false;
      loginError.textContent = `Ссылка устарела или недействительна: ${error.message}`;
      loginError.hidden = false;
      return true;
    }
    inRecoveryMode = true;
    setpwScreen.hidden = false;
    return true;
  }

  // Set Password form
  setpwForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setpwError.hidden = true;
    const pw1 = $('#setpw-password').value;
    const pw2 = $('#setpw-confirm').value;
    if (pw1 !== pw2) {
      setpwError.textContent = 'Пароли не совпадают.';
      setpwError.hidden = false;
      return;
    }
    if (pw1.length < 8) {
      setpwError.textContent = 'Минимум 8 символов.';
      setpwError.hidden = false;
      return;
    }
    const btn = setpwForm.querySelector('button[type="submit"]');
    btnLoading(btn, true);
    try {
      const { error } = await SupabaseAdmin.client.auth.updateUser({ password: pw1 });
      if (error) throw error;
      // Сессия уже стоит после verifyOtp + updateUser → грузим профиль и показываем админку
      const ctx = await SupabaseAdmin.getCurrentUser();
      if (!ctx) throw new Error('Не удалось загрузить профиль');
      currentUser = ctx.profile;
      $('#admin-user').textContent = currentUser.email;
      setpwScreen.hidden = true;
      startRateUpdates();
      showAdmin();
    } catch (err) {
      setpwError.textContent = err.message;
      setpwError.hidden = false;
    } finally {
      btnLoading(btn, false);
    }
  });

  // ─── Auth State ───
  // SDK сам обрабатывает hash-fragment (#access_token=...) благодаря
  // detectSessionInUrl=true по умолчанию. Для recovery он стреляет событием
  // PASSWORD_RECOVERY ДО того как мы успеваем проверить getSession().
  // Поэтому слушатель ставим первым делом.

  SupabaseAdmin.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      inRecoveryMode = true;
      // Очистим hash чтобы при F5 не повторять
      history.replaceState({}, '', location.pathname);
      const authLoading = $('#auth-loading');
      if (authLoading) authLoading.remove();
      loginScreen.hidden = true;
      adminApp.hidden = true;
      setpwScreen.hidden = false;
      return;
    }
    if (event === 'SIGNED_OUT' || !session) {
      currentUser = null;
      adminApp.hidden = true;
      setpwScreen.hidden = true;
      loginScreen.hidden = false;
    }
  });

  (async () => {
    const authLoading = $('#auth-loading');

    // Legacy PKCE flow (старые письма с ?token_hash=...) — обрабатываем сами
    const legacy = await maybeHandleLegacyToken();
    if (legacy) {
      if (authLoading) authLoading.remove();
      return;
    }

    // Маленькая задержка чтобы SDK успел обработать hash и стрельнуть PASSWORD_RECOVERY,
    // если есть. Иначе можем showAdmin() до того как поймаем event.
    await new Promise(r => setTimeout(r, 50));
    if (inRecoveryMode) {
      if (authLoading) authLoading.remove();
      return; // setpwScreen уже показан listener'ом
    }

    const ctx = await SupabaseAdmin.getCurrentUser();
    if (authLoading) authLoading.remove();
    if (ctx) {
      currentUser = ctx.profile;
      $('#admin-user').textContent = currentUser.email;
      startRateUpdates();
      showAdmin();
    } else {
      loginScreen.hidden = false;
      adminApp.hidden = true;
    }
  })();

  // ─── Login Form ───
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.hidden = true;
    const email = $('#login-email').value.trim();
    const password = $('#login-password').value;
    const btn = loginForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = t('login.signingIn');
    try {
      await SupabaseAdmin.login(email, password);
      const ctx = await SupabaseAdmin.getCurrentUser();
      if (!ctx) throw new Error('No profile linked to this account');
      currentUser = ctx.profile;
      $('#admin-user').textContent = currentUser.email;
      loginScreen.hidden = true;
      startRateUpdates();
      showAdmin();
    } catch (err) {
      console.error('Login error:', err);
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('invalid') || msg.includes('credential')) {
        loginError.textContent = t('auth.invalidCredential');
      } else if (msg.includes('rate') || msg.includes('too many')) {
        loginError.textContent = t('auth.tooManyRequests');
      } else {
        loginError.textContent = err.message || t('auth.failed');
      }
      loginError.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = t('login.submit');
    }
  });

  // ─── Logout ───
  $('#btn-logout').addEventListener('click', async () => {
    await SupabaseAdmin.logout();
    if (rateInterval) { clearInterval(rateInterval); rateInterval = null; }
    currentUser = null;
    loginScreen.hidden = false;
    adminApp.hidden = true;
  });

  // ─── Show Admin ───
  async function showAdmin() {
    adminApp.hidden = false;

    // Загружаем все 5 JSON-блоков из Supabase одним запросом и кладём
    // в глобалы (SITE_DATA, PROJECTS_DATA, FAQ_DATA, TESTIMONIALS_DATA, GALLERY_DATA),
    // которые ожидает остальной legacy-код админки.
    try {
      const all = await SupabaseAdmin.getAllContent();
      window.SITE_DATA         = all.site         || {};
      window.PROJECTS_DATA     = all.projects     || {};
      window.FAQ_DATA          = all.faq          || [];
      window.TESTIMONIALS_DATA = all.testimonials || [];
      window.GALLERY_DATA      = all.gallery      || { villas: [], estates: [], village: [] };
    } catch (err) {
      console.error('[admin] Failed to load content from Supabase:', err);
      alert('Не удалось загрузить данные сайта: ' + err.message);
      return;
    }

    // Покажем Users-tab только super_admin'у
    if (currentUser && currentUser.role === 'super_admin') {
      document.querySelectorAll('[data-super-admin-only]').forEach(el => el.hidden = false);
      initUsersTab();
    }

    loadProjectsData();
    loadSiteData();
    translateUI();
    buildDynamicUI();
    renderDashboard();
    renderRateInfo();
    renderContactsForm();
    renderGuideInfo();
    renderSocialForm();
    populateExitPopup();
    renderProjectEditor();
    renderGallery();
    loadFaqData();
    loadTestimonialsData();

    // Dirty-tracking для секций без явных listener'ов.
    // Контейнеры стабильные — внутренности могут ре-рендериться.
    bindDirtyDelegate('#set-social', 'social');
    bindDirtyDelegate('#set-guide', 'guide');
    bindDirtyDelegate('#tab-analytics', 'analytics');
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
  function isTabDirty(tab) {
    // Aggregate всех _dirtyState ключей, маппящихся на этот tab.
    return Object.entries(_dirtyState).some(([key, val]) => val && (_dirtyTabMap[key] || key) === tab);
  }

  $$('.admin-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTab = getActiveTab();
      // Dashboard сам по себе ничего не редактирует, но dirty rate/contacts
      // лежат под settings — оставляем особый случай, чтобы предупредить.
      const isDirty = currentTab === 'dashboard'
        ? (dirtyTabs.rate || dirtyTabs.contacts)
        : (pendingChanges || isTabDirty(currentTab));
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

    // Не сбрасывать currentProject, если он валиден — иначе после New Project
    // или после удаления проекта рендерится не тот.
    if (!currentProject || !keys.includes(currentProject)) {
      currentProject = keys[0];
    }

    // Синхронизируем active-таб с currentProject (innerHTML выше всегда ставит
    // active на первый таб по индексу, что неверно для не-первого проекта).
    if (tabsContainer) {
      tabsContainer.querySelectorAll('.project-tabs__btn').forEach(b => b.classList.remove('active'));
      const activeTab = tabsContainer.querySelector(`.project-tabs__btn[data-proj="${currentProject}"]`);
      if (activeTab) activeTab.classList.add('active');
    }
  }

  // Sync showcaseAvailability text with availability.sold/total
  // Keeps card scarcity headline consistent across all projects.
  function syncShowcaseAvailability(p) {
    if (!p || !p.availability) return;
    if (p.status === 'pre-sale') {
      p.showcaseAvailability = {
        en: 'Pre-Sale Open',
        ru: 'Предпродажа открыта',
      };
      return;
    }
    const left = Math.max(0, (p.availability.total || 0) - (p.availability.sold || 0));
    const total = p.availability.total || 0;
    p.showcaseAvailability = {
      en: left + ' of ' + total + ' units available',
      ru: 'Доступно ' + left + ' из ' + total,
    };
  }

  // ─── Dashboard ───
  function renderDashboard() {
    if (!projectsData) return;
    const container = $('#dashboard-cards');
    const projects = getProjectKeys();

    // Recompute availability
    projects.forEach(key => {
      const p = projectsData[key];
      if (p.units) {
        p.availability.sold = p.units.filter(u => u.status === 'sold').length;
        p.availability.total = p.units.length;
      }
      syncShowcaseAvailability(p);
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
      const isAllSoldDash = p.units ? p.units.every(u => u.status === 'sold') : (p.availability.sold >= p.availability.total);
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

      // Segmented bar counts (binary: available / sold)
      const counts = { available: 0, sold: 0 };
      if (p.units) {
        p.units.forEach(u => { counts[u.status] = (counts[u.status] || 0) + 1; });
      } else {
        counts.sold = sold;
        counts.available = total - sold;
      }
      const segSold = Math.round((counts.sold / total) * 100);

      const legend = [
        counts.sold ? `<span class="seg-legend seg-legend--sold">${counts.sold} ${t('dash.breakSold')}</span>` : '',
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
          </div>
          <span class="dash-card__bar-label">${pct}%</span>
        </div>
        <div class="seg-legend-row">${legend}</div>
        <div class="dash-card__actions">
          <button class="dash-card__edit btn btn--outline btn--sm btn--accent" data-goto="${key}">${t('dash.editProject')}</button>
          <a href="https://globalbalihome.com/${p.page || 'project-' + p.slug + '.html'}" target="_blank" rel="noopener" class="btn btn--outline btn--sm" style="text-decoration:none">${t('dash.viewOnSite')}</a>
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
    const list = $('#dash-commits-list');
    if (!list) return;
    try {
      // Читаем последние 5 записей из audit_log (Supabase RLS отфильтрует
      // по роли: super_admin видит всё, остальные — свои).
      const { data, error } = await SupabaseAdmin.client
        .from('audit_log')
        .select('action, target, user_email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      if (!data || !data.length) {
        list.innerHTML = `<span style="color:var(--color-text-dim)">${t('dash.noChanges')}</span>`;
        return;
      }
      list.innerHTML = data.map(c => {
        const ago = timeAgo(new Date(c.created_at));
        const msg = `${c.action}${c.target ? ' · ' + c.target : ''}${c.user_email ? ' (' + c.user_email + ')' : ''}`;
        return `<div class="dash-commit">
          <span class="dash-commit__msg">${escAttr(msg)}</span>
          <span class="dash-commit__time">${ago}</span>
        </div>`;
      }).join('');
    } catch (err) {
      console.warn('[admin] loadRecentCommits failed:', err);
      list.innerHTML = `<span style="color:var(--color-text-dim)">${t('dash.couldNotLoad')}</span>`;
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

    // Availability recompute (keeps p.availability + showcase in sync, no UI).
    // p.status is preserved as-is — edited elsewhere if needed.
    if (p.units) {
      p.availability.sold = p.units.filter(u => u.status === 'sold').length;
      p.availability.total = p.units.length;
    } else if (p.unitTypes) {
      p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
    }
    syncShowcaseAvailability(p);

    // Unit Table
    if (p.units) {
      html += `<div class="editor-section"><h3>${t('projects.units')}</h3>
        <table class="admin-unit-table"><thead><tr>
          <th>${t('projects.unit')}</th><th>${t('projects.type')}</th><th>${t('projects.floors')}</th><th>${t('projects.area')}</th><th>${t('projects.land')}</th><th>${t('projects.badge')}</th><th>${t('projects.status')}</th><th>${t('projects.price')}</th><th></th>
        </tr></thead><tbody>`;

      p.units.forEach((u, i) => {
        html += `<tr>
          <td data-label="${t('projects.unit')}"><span class="unit-readonly">${escapeHtml(u.id)}</span></td>
          <td data-label="${t('projects.type')}"><span class="unit-readonly">${escapeHtml(u.type)}</span></td>
          <td data-label="${t('projects.floors')}"><span class="unit-readonly">${u.floors}</span></td>
          <td data-label="${t('projects.area')}"><div class="unit-suffix"><input type="number" data-unit="${i}" data-field="area" class="unit-text" value="${parseFloat(u.area) || ''}" style="width:56px" min="0" step="1"><span>m²</span></div></td>
          <td data-label="${t('projects.land')}"><div class="unit-suffix"><input type="number" data-unit="${i}" data-field="land" class="unit-text" value="${parseFloat(u.land) || ''}" style="width:56px" min="0" step="0.01"><span>are</span></div></td>
          <td data-label="${t('projects.badge')}"><select data-unit="${i}" data-field="badge" class="unit-badge">
            ${[['', '—'], ['Premium', 'Premium'], ['Front Row', 'Front Row'], ['Large Plot', 'Large Plot'], ['Corner', 'Corner'], ['Last Unit', 'Last Unit'], ['Best Seller', 'Best Seller']].map(([v, l]) => `<option value="${v}"${(u.badge || '') === v ? ' selected' : ''}>${l}</option>`).join('')}
          </select></td>
          <td data-label="${t('projects.status')}"><select data-unit="${i}" data-field="status" class="unit-status">
            <option value="available"${u.status === 'available' ? ' selected' : ''}>${t('dash.available')}</option>
            <option value="sold"${u.status === 'sold' ? ' selected' : ''}>${t('dash.sold')}</option>
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
          <td data-label="${t('projects.type')}"><input type="text" data-utype="${i}" data-field="type" class="utype-text" value="${escAttr(ut.type)}" style="width:100px"></td>
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
      const typeAttr = escAttr(type);
      const typeText = escapeHtml(type);
      html += `<div class="fp-type" data-plan-type="${typeAttr}">
        <div class="fp-type__header">
          <div class="fp-type__order">
            <button class="btn--icon fp-move-up" data-type="${typeAttr}" title="Move up"${planTypes.indexOf(type) === 0 ? ' disabled' : ''}>&#9650;</button>
            <button class="btn--icon fp-move-down" data-type="${typeAttr}" title="Move down"${planTypes.indexOf(type) === planTypes.length - 1 ? ' disabled' : ''}>&#9660;</button>
          </div>
          <span class="fp-type__name" data-rename="${typeAttr}" title="Click to rename">${typeText} <span class="fp-type__rename-icon">✎</span></span>
          <div class="fp-type__actions">
            <button class="btn btn--outline btn--sm fp-add-floor" data-type="${typeAttr}">+ Floor</button>
            <button class="btn--icon btn--danger fp-delete-type" data-type="${typeAttr}" title="Delete type">&times;</button>
          </div>
        </div>
        <div class="fp-type__specs">
          <div class="fp-specs-label">Specs</div>
          <div class="fp-specs-list">`;
      specs.forEach((s, si) => {
        html += `<div class="fp-spec-row">
          <select class="fp-spec-icon" data-type="${typeAttr}" data-si="${si}">
            ${specIconOptions.map(ico => `<option value="${ico}"${ico === s.icon ? ' selected' : ''}>${ico}</option>`).join('')}
          </select>
          <input type="text" class="fp-spec-text" data-type="${typeAttr}" data-si="${si}" value="${escAttr(s.text)}" placeholder="e.g. 2 Bedrooms">
          <button class="btn--icon btn--danger fp-spec-delete" data-type="${typeAttr}" data-si="${si}">&times;</button>
        </div>`;
      });
      html += `</div>
          <button class="btn btn--outline btn--sm fp-add-spec" data-type="${typeAttr}" style="margin-top:6px">+ Spec</button>
        </div>
        <div class="fp-type__floors">`;
      floorKeys.forEach(floor => {
        const path = floors[floor] || '';
        const floorAttr = escAttr(floor);
        const floorText = escapeHtml(floor);
        html += `<div class="fp-floor" data-type="${typeAttr}" data-floor="${floorAttr}">
            <div class="fp-floor__label">${floorText} <button class="fp-floor__delete fp-delete-floor" data-type="${typeAttr}" data-floor="${floorAttr}" title="Delete floor">&times;</button></div>
            <div class="fp-floor__preview">${path ? `<img src="${escAttr(previewImageUrl(path))}" alt="${escAttr(type + ' — ' + floor)}">` : `<span class="fp-floor__empty">No image</span>`}</div>
            <div class="fp-floor__actions">
              <label class="btn btn--outline btn--sm">Upload<input type="file" accept="image/*" class="fp-upload" data-type="${typeAttr}" data-floor="${floorAttr}" hidden></label>
            </div>
          </div>`;
      });
      html += `</div></div>`;
    });
    html += `</div>
      <button class="btn btn--outline btn--sm" id="add-plan-type" style="margin-top:12px">+ Add Plan Type</button>
    </div>`;

    editor.innerHTML = html;

    // Bind change events — unit fields
    editor.querySelectorAll('.unit-text').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.unit;
        const field = inp.dataset.field;
        if (field === 'area') {
          p.units[idx][field] = inp.value ? inp.value + ' m²' : '';
        } else if (field === 'land') {
          p.units[idx][field] = inp.value ? inp.value + ' are' : '';
        } else {
          p.units[idx][field] = inp.value;
        }
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

    // Add/Delete units
    const addUnitBtn = $('#btn-add-unit');
    if (addUnitBtn) {
      addUnitBtn.addEventListener('click', () => showNewUnitModal(p));
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
          const result = await commitFile(path, null, `Add floor plan: ${type} — ${floor} (${p.name})`, null, base64);
          // Сохраняем CDN-URL чтобы публичный сайт показывал картинку напрямую с Storage.
          p.floorPlans[type].floors[floor] = (result && result.url) || path;
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

    // Generate Pages button removed — landing pages поддерживаются вручную (см. ниже).
  }

  function recalcAvailability() {
    const p = projectsData[currentProject];
    if (!p.units) return;
    const sold = p.units.filter(u => u.status === 'sold').length;
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
    const globalKeys = ['comparisonLabels', 'unitTableHeaders', 'statusLabels', 'availabilityLabels'];
    globalKeys.forEach(gk => { if (projectsData[gk]) data[gk] = projectsData[gk]; });

    return '/* eslint-disable */\nconst PROJECTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  // ─── SEO Editor ───
  const LANGS = ['en', 'ru'];
  const LANG_NAMES = { en: 'English', ru: 'Russian' };
  const BASE_URL = 'https://globalbalihome.com';
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
          <div class="og-preview__site">globalbalihome.com</div>
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
    // Освобождаем blob URL предыдущего рендера, иначе утечка.
    galleryPreview.querySelectorAll('img').forEach(img => {
      if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
    });

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
    // После того как браузер задекодит картинку — blob URL больше не нужен.
    galleryPreview.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', () => URL.revokeObjectURL(img.src), { once: true });
      img.addEventListener('error', () => URL.revokeObjectURL(img.src), { once: true });
    });

    // Bind remove buttons
    galleryPreview.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingFiles.splice(+btn.dataset.remove, 1);
        renderUploadPreview();
      });
    });

    // Освобождает все blob URL внутри превью — на случай если onload не успел.
    const revokeAllPreviewBlobs = () => {
      galleryPreview.querySelectorAll('img').forEach(img => {
        if (img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
      });
    };

    // Upload all
    $('#btn-preview-upload').addEventListener('click', () => {
      const filesToUpload = [...pendingFiles];
      pendingFiles = [];
      revokeAllPreviewBlobs();
      galleryPreview.hidden = true;
      galleryPreview.innerHTML = '';
      handleGalleryUpload(filesToUpload);
    });

    // Cancel
    $('#btn-preview-cancel').addEventListener('click', () => {
      pendingFiles = [];
      revokeAllPreviewBlobs();
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
        <img src="${previewImageUrl(img)}" alt="${escAttr(name)}" loading="lazy">
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

  // ─── Storage / Content Adapter (Supabase) ───
  // Сохраняем legacy-сигнатуры fetchFile / commitFile / deleteFile, чтобы
  // не править вызовы по всему файлу. Внутри маппим на SupabaseAdmin.
  //
  // Маппинг path → key (для site_content table):
  //   data/site-data.js         → 'site'
  //   data/projects-data.js     → 'projects'
  //   data/faq-data.js          → 'faq'
  //   data/testimonials-data.js → 'testimonials'
  //   gallery-data.js           → 'gallery'
  //   images/<project>/<file>   → Storage upload в gallery/<project>/<file>
  //   *.html                    → SEO tab временно отключён (см. saveAllSEO)
  //   assets/*.pdf              → Storage upload в assets/<file>

  function decodeBase64UTF8(base64) {
    const binary = atob(base64.replace(/\s/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }

  function pathToContentKey(path) {
    if (path === 'gallery-data.js') return 'gallery';
    const m = path.match(/^data\/(site|projects|faq|testimonials)-data\.js$/);
    return m ? m[1] : null;
  }

  // Любое значение картинки (legacy относительный путь или CDN URL) →
  // абсолютный URL для <img src>. Используется во всех админ-превью.
  function previewImageUrl(pathOrUrl) {
    if (!pathOrUrl) return '';
    if (/^https?:\/\//i.test(pathOrUrl) || pathOrUrl.startsWith('data:') || pathOrUrl.startsWith('blob:')) {
      return pathOrUrl;
    }
    const sp = pathToStoragePath(pathOrUrl);
    if (sp && window.SupabaseAdmin) return SupabaseAdmin.getImageUrl(sp);
    return pathOrUrl;
  }

  function pathToStoragePath(path) {
    // images/<project>/plans/<name>      → plans/<project>/<name>
    // images/testimonials/<name>         → testimonials/<name>
    // images/<project>/<name>            → gallery/<project>/<name>
    // assets/<file>                      → assets/<file>
    const plan = path.match(/^images\/([^/]+)\/plans\/(.+)$/);
    if (plan) return `plans/${plan[1]}/${plan[2]}`;
    const test = path.match(/^images\/testimonials\/(.+)$/);
    if (test) return `testimonials/${test[1]}`;
    const img = path.match(/^images\/([^/]+)\/(.+)$/);
    if (img) return `gallery/${img[1]}/${img[2]}`;
    if (path.startsWith('assets/')) return path;
    return null;
  }

  function base64ToBlob(b64, mime) {
    const bin = atob(b64.replace(/\s/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime || 'application/octet-stream' });
  }

  // Парсит content вида `const X = {...};` и возвращает объект.
  // Используется когда legacy-код собирает текст файла перед commit'ом.
  // Контент всегда формируется через JSON.stringify, поэтому безопасно
  // парсить через JSON.parse — Function/eval запрещены CSP админки.
  function parseDataFileContent(content) {
    // Стрипаем все ведущие comment-блоки (build-data.mjs пишет 2-3 подряд),
    // потом обёртку `const X = ` и завершающий `;`.
    let cleaned = String(content);
    while (/^\s*\/\*[\s\S]*?\*\//.test(cleaned)) {
      cleaned = cleaned.replace(/^\s*\/\*[\s\S]*?\*\/\s*/, '');
    }
    cleaned = cleaned
      .replace(/^\s*const\s+\w+\s*=\s*/, '')
      .replace(/;\s*$/, '')
      .trim();
    return JSON.parse(cleaned);
  }

  async function fetchFile(path) {
    // Legacy GitHub API возвращал { content, sha }. Используется в основном
    // для получения SHA перед PUT. С Supabase SHA не нужен — отдаём stub.
    // Для HTML-файлов (SEO tab) добавим явный throw — saveAllSEO его поймает.
    if (/\.html$/.test(path)) {
      throw new Error('SEO HTML editing is temporarily disabled. Coming back soon.');
    }
    return { sha: null, content: '' };
  }

  async function commitFile(path, content, message, sha, base64Content) {
    // 1) Image / asset upload
    const storagePath = pathToStoragePath(path);
    if (storagePath && base64Content) {
      const mime = path.endsWith('.webp') ? 'image/webp'
                 : path.endsWith('.pdf') ? 'application/pdf'
                 : path.match(/\.jpe?g$/i) ? 'image/jpeg'
                 : 'application/octet-stream';
      const blob = base64ToBlob(base64Content, mime);
      const url = await SupabaseAdmin.uploadImage(storagePath, blob, mime);
      return { url, path: storagePath };
    }

    // 2) JSON content blocks
    const key = pathToContentKey(path);
    if (key) {
      const data = parseDataFileContent(content);
      await SupabaseAdmin.setContent(key, data);
      // Пишем audit log для крупных операций
      SupabaseAdmin.logAudit('content.update', key, { message: message || null });
      return { ok: true };
    }

    // 3) HTML files (SEO tab) — временно недоступно
    if (/\.html$/.test(path)) {
      throw new Error('SEO HTML editing is temporarily disabled. Coming back soon.');
    }

    throw new Error(`commitFile: unsupported path "${path}"`);
  }

  async function deleteFile(path, sha, message) {
    // Полный CDN URL Supabase — отдаём deleteImage напрямую, он выкусит path.
    if (/\/storage\/v1\/object\/public\/images\//.test(path)) {
      await SupabaseAdmin.deleteImage(path);
      return { ok: true };
    }
    const storagePath = pathToStoragePath(path);
    if (storagePath) {
      await SupabaseAdmin.deleteImage(storagePath);
      return { ok: true };
    }
    // HTML files etc. — больше не удаляем через админку
    throw new Error(`deleteFile: unsupported path "${path}"`);
  }

  // GitHub rate limit / Actions deploy poller — больше не нужны.
  // Vercel deploy запускается webhook'ом из Supabase автоматически после
  // setContent. UI-стрелка прогресса деплоя пока скрыта.
  function updateRateLimit() {
    const el = $('#rate-limit');
    if (el) el.textContent = '';
    const ds = $('#deploy-status');
    if (ds) ds.hidden = true;
  }

  // ─── Removed: Generate Detail Pages (buildDetailPage / PAGE_LABELS / getLangConfigs / addGeneratePagesButton) ───
  // Project landing pages (project-*.html × 3 languages) теперь поддерживаются
  // вручную через Cursor/Claude — это лучше для SEO (custom titles, descriptions,
  // service cards, Trust block, Place section и т.д. — все ручные оптимизации).
  // Кнопка "Generate Pages" в редакторе проекта больше не добавляется.


  // ─── New Unit Modal ───
  function showNewUnitModal(p) {
    const existing = $('#new-unit-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'new-unit-modal';
    modal.className = 'admin-modal';
    const typeOptions = ['1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', '5 Bedroom'];
    modal.innerHTML = `<div class="admin-modal__backdrop"></div>
      <div class="admin-modal__content">
        <div class="admin-modal__header">
          <h2>${t('newUnit.title')}</h2>
          <button class="admin-modal__close">&times;</button>
        </div>
        <div class="admin-modal__body">
          <div class="form-group">
            <label>${t('newUnit.name')}</label>
            <input type="text" id="nu-name" placeholder="${t('newUnit.namePh')}" autofocus>
            <small class="field-hint">${t('newUnit.nameHint')}</small>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>${t('newUnit.type')}</label>
              <select id="nu-type">
                ${typeOptions.map(v => `<option value="${v}"${v === '2 Bedroom' ? ' selected' : ''}>${v}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>${t('newUnit.floors')}</label>
              <input type="number" id="nu-floors" value="1" min="1" max="5">
            </div>
          </div>
        </div>
        <div class="admin-modal__footer">
          <button class="btn btn--outline" id="nu-cancel">${t('newUnit.cancel')}</button>
          <button class="btn btn--primary" id="nu-add">${t('newUnit.add')}</button>
        </div>
      </div>`;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector('.admin-modal__backdrop').addEventListener('click', close);
    modal.querySelector('.admin-modal__close').addEventListener('click', close);
    $('#nu-cancel').addEventListener('click', close);

    const submit = () => {
      const name = $('#nu-name').value.trim();
      const type = $('#nu-type').value;
      const floors = Math.max(1, Math.min(5, +$('#nu-floors').value || 1));
      if (!name) { alert(t('newUnit.nameRequired')); return; }
      if (p.units.some(u => u.id === name)) { alert(t('newUnit.nameExists').replace('{name}', name)); return; }
      p.units.push({ id: name, type, floors, area: '', land: '', status: 'available', price: null, badge: null });
      p.availability.total = p.units.length;
      recalcAvailability();
      markChanged();
      close();
      renderProjectEditor();
    };
    $('#nu-add').addEventListener('click', submit);
    $('#nu-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
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
        showcaseSubtitle: { en: subtitle, ru: subtitle },
        showcaseMeta: {
          en: [{ strong: String(totalUnits), label: 'Villas' }, { strong: bedrooms, label: 'Bedrooms' }, { strong: handover || status, label: handover ? 'Handover' : 'Status' }],
          ru: [{ strong: String(totalUnits), label: 'Вилл' }, { strong: bedrooms, label: 'Спальни' }, { strong: handover || status, label: handover ? 'Сдача' : 'Статус' }],
        },
        compArea: area,
        compLand: land,
        compPool: { en: pool, ru: pool },
        heroStats: {
          en: [
            { number: String(totalUnits), label: 'Villas' },
            { number: handover || bedrooms, label: handover ? 'Handover' : 'Bedrooms' },
            { number: price ? '$' + (price / 1000 | 0) + 'K+' : '', label: 'From' }
          ],
          ru: [
            { number: String(totalUnits), label: 'Вилл' },
            { number: handover || bedrooms, label: handover ? 'Сдача' : 'Спальни' },
            { number: price ? '$' + (price / 1000 | 0) + 'K+' : '', label: 'От' }
          ],
        },
        availability: { sold: 0, total: totalUnits },
        showcaseStatus: {
          en: status === 'pre-sale' ? 'Pre-Sale' : status === 'completed' ? 'Completed' : 'In Progress',
          ru: status === 'pre-sale' ? 'Предпродажа' : status === 'completed' ? 'Завершён' : 'Строится',
        },
        positioning: {
          en: 'Investment Opportunity',
          ru: 'Инвестиционная возможность',
        },
        showcaseAvailability: {
          en: status === 'pre-sale' ? 'Pre-Sale Open' : totalUnits + ' of ' + totalUnits + ' units available',
          ru: status === 'pre-sale' ? 'Предпродажа открыта' : 'Доступно ' + totalUnits + ' из ' + totalUnits,
        },
        showcaseDesc: { en: desc, ru: desc },
        showcaseCta: { en: 'View Details', ru: 'Подробнее' },
        decisionGuide: {
          icon: 'yield',
          question: {
            en: 'Interested in ' + name + '?',
            ru: 'Интересен ' + name + '?',
          },
          benefit: {
            en: bedrooms ? bedrooms + ' bedrooms' : 'premium villas',
            ru: bedrooms ? bedrooms + ' спален' : 'премиум-виллы',
          }
        },
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
        };
      }

      // Add to data
      projectsData[slug] = proj;
      currentProject = slug;
      markChanged();

      // Rebuild UI — buildDynamicUI() сохраняет currentProject и ставит
      // active-таб на нужный проект автоматически.
      buildDynamicUI();
      renderDashboard();
      renderProjectEditor();

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
    if (!siteData.contacts) siteData.contacts = { phone: '', phoneRaw: '', whatsapp: '', email: '', location: { en: '', ru: '' } };
    if (!siteData.exitPopup) siteData.exitPopup = { enabled: true, delay: 30, texts: { en: {}, ru: {} } };
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
    }
    // Attach live validation. Guard от повторного навешивания —
    // renderContactsForm может вызываться при каждом возврате на Settings таб.
    const waInput = $('#contact-whatsapp');
    if (waInput && !waInput.dataset.bound) {
      waInput.dataset.bound = '1';
      waInput.addEventListener('input', updateWaPreview);
      waInput.addEventListener('paste', () => setTimeout(updateWaPreview, 0));
    }
    updateWaPreview();

    // Track contacts changes (один раз на инпут)
    ['contact-phone', 'contact-whatsapp', 'contact-email', 'contact-location-en', 'contact-location-ru'].forEach(id => {
      const el = $('#' + id);
      if (el && !el.dataset.dirtyBound) {
        el.dataset.dirtyBound = '1';
        el.addEventListener('input', () => { dirtyTabs.contacts = true; });
      }
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
          ru: g('contact-location-ru')
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

        dirtyTabs.guide = false;
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
      dirtyTabs.social = false;
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

    const projectOpts = projectsData
      ? Object.keys(projectsData).map(slug => ({ slug, name: projectsData[slug].name || slug }))
      : [];

    editor.innerHTML = sorted.map((item, idx) => {
      const i = faqData.indexOf(item);
      const itemProject = item.project || 'all';
      return `<div class="faq-editor-item" data-faq-idx="${i}">
        <div class="faq-editor-item__header">
          <span class="faq-editor-item__num">#${idx + 1}</span>
          <select class="faq-editor-item__project" data-faq-project="${i}" title="${t('faq.projectHint')}">
            <option value="all"${itemProject === 'all' ? ' selected' : ''}>${t('faq.allProjects')}</option>
            ${projectOpts.map(p => `<option value="${p.slug}"${itemProject === p.slug ? ' selected' : ''}>${escapeHtml(p.name)}</option>`).join('')}
          </select>
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

    // Project scope select
    editor.querySelectorAll('[data-faq-project]').forEach(sel => {
      sel.addEventListener('change', () => {
        const i = +sel.dataset.faqProject;
        faqData[i].project = sel.value;
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
        project: 'all',
        question: { en: '', ru: '' },
        answer: { en: '', ru: '' }
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
  const LANGS_FULL = { en: 'English', ru: 'Русский' };
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
      avatarHTML = '<img class="test-preview__avatar" src="' + previewImageUrl(item.avatar) + '" alt="">';
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
        ? `<img src="${previewImageUrl(item.avatar)}" alt="" class="test-avatar__img">`
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
          // Префикс именем + timestamp защищает от коллизий имён (двух
          // testimonials с одинаковым first-name или пустыми именами).
          const baseName = (testimonialsData[i].name.en || 'avatar').replace(/[^a-z0-9]/gi, '-').toLowerCase();
          const safeName = `${baseName}-${Date.now()}`;
          const path = `images/testimonials/${safeName}.webp`;
          const result = await commitFile(path, null, `Add testimonial avatar: ${safeName}`, null, base64);
          const finalUrl = (result && result.url) || path;
          testimonialsData[i].avatar = finalUrl;
          dirtyTabs.testimonials = true;
          preview.innerHTML = `<img src="${previewImageUrl(finalUrl)}" alt="" class="test-avatar__img">`;
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
        name: { en: '', ru: '' },
        role: { en: '', ru: '' },
        text: { en: '', ru: '' },
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

  // Settings tab activation
  const settingsNavBtn = document.querySelector('.admin-nav__btn[data-tab="settings"]');
  if (settingsNavBtn) {
    settingsNavBtn.addEventListener('click', () => {
      renderRateInfo();
      renderContactsForm();
      renderGuideInfo();
      renderSocialForm();
    });
  }

  // ─── Analytics Tab ───
  // Regex и format обязаны совпадать с проверкой в js/main.js.
  // Если формат тут не пройдёт — на сайте трекер не подключится.
  const ANALYTICS_FIELDS = [
    { id: 'analytics-gtm',      key: 'gtm',             regex: /^GTM-[A-Z0-9]{6,10}$/,      format: 'GTM-XXXXXXXX' },
    { id: 'analytics-ga4',      key: 'ga4',             regex: /^G-[A-Z0-9]{4,10}$/,        format: 'G-XXXXXXXXXX' },
    { id: 'analytics-facebook', key: 'facebookPixel',   regex: /^\d{10,20}$/,               format: '10–20 цифр' },
    { id: 'analytics-yandex',   key: 'yandexMetrika',   regex: /^\d{5,12}$/,                format: '5–12 цифр' },
    { id: 'analytics-clarity',  key: 'clarity',         regex: /^[a-z0-9]{8,12}$/i,         format: '8–12 буквенно-цифровых символов' }
  ];

  function validateAnalyticsInput(input, field, statusEl) {
    const val = input.value.trim();
    input.classList.remove('input--valid', 'input--invalid');
    statusEl.classList.remove('input-status--valid', 'input-status--invalid');
    statusEl.textContent = '';
    statusEl.title = '';

    if (val === '') return; // пусто = трекер выключен, это нормальное состояние

    if (field.regex.test(val)) {
      input.classList.add('input--valid');
      statusEl.classList.add('input-status--valid');
      statusEl.textContent = '✓';
      statusEl.title = 'Формат корректный';
    } else {
      input.classList.add('input--invalid');
      statusEl.classList.add('input-status--invalid');
      statusEl.textContent = '✗';
      statusEl.title = 'Неверный формат. Ожидается: ' + field.format;
    }
  }

  function renderAnalyticsForm() {
    if (!siteData) loadSiteData();
    const a = (siteData && siteData.analytics) || {};
    for (const f of ANALYTICS_FIELDS) {
      const input = $('#' + f.id);
      if (!input) continue;
      input.value = a[f.key] || '';

      // Wire validation один раз на input. Defensive: если уже было,
      // только перепроверяем текущее значение.
      let statusEl;
      if (!input.dataset.validationBound) {
        input.dataset.validationBound = '1';
        // Оборачиваем input в .input-wrapper для абсолютного позиционирования иконки
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        statusEl = document.createElement('span');
        statusEl.className = 'input-status';
        wrapper.appendChild(statusEl);
        input.addEventListener('input', () => validateAnalyticsInput(input, f, statusEl));
      } else {
        statusEl = input.parentNode.querySelector('.input-status');
      }
      if (statusEl) validateAnalyticsInput(input, f, statusEl);
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
        dirtyTabs.analytics = false;
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
  const EP_LANGS = ['en', 'ru'];
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

  // Live preview: update on every keystroke + dirty tracking
  document.querySelectorAll('.ep-live').forEach(input => {
    input.addEventListener('input', () => {
      updateEpPreview();
      dirtyTabs.exitpopup = true;
    });
  });
  // Enabled / delay тоже помечают dirty
  ['#exitpopup-enabled', '#exitpopup-delay'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      const evt = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(evt, () => { dirtyTabs.exitpopup = true; });
    }
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
        dirtyTabs.exitpopup = false;
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
  const TOUR_LANGS = ['en', 'ru'];

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
      html += '<div class="form-group"><label>' + t('tour.question') + '</label><input type="text" class="tour-step-q" data-step="' + si + '" value="' + escAttr(step.question) + '"></div>';
      html += '<div class="tour-options-list">';
      (step.options || []).forEach((opt, oi) => {
        html += '<div class="form-group tour-option-row"><label>' + t('tour.option') + ' ' + (oi + 1) + '</label><input type="text" class="tour-step-opt" data-step="' + si + '" data-opt="' + oi + '" value="' + escAttr(opt) + '"></div>';
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
    html += '<div class="form-group"><label>' + t('tour.formTitle') + '</label><input type="text" id="tf-title" value="' + escAttr(f.title) + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.submit') + '</label><input type="text" id="tf-submit" value="' + escAttr(f.submit) + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>' + t('tour.formSubtitle') + '</label><input type="text" id="tf-subtitle" value="' + escAttr(f.subtitle) + '"></div>';
    html += '<div class="form-grid--3">';
    html += '<div class="form-group"><label>' + t('tour.name') + '</label><input type="text" id="tf-name" value="' + escAttr(f.name) + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.whatsapp') + '</label><input type="text" id="tf-whatsapp" value="' + escAttr(f.whatsapp) + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.email') + '</label><input type="text" id="tf-email" value="' + escAttr(f.email) + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>' + t('tour.comment') + '</label><input type="text" id="tf-comment" value="' + escAttr(f.comment) + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.consent') + '</label><textarea id="tf-consent" rows="2">' + escapeHtml(f.consent) + '</textarea></div>';
    html += '<div class="form-group"><label>' + t('tour.time') + '</label><input type="text" id="tf-time" value="' + escAttr(f.time) + '"></div>';
    var timeOpts = f.timeOptions || [];
    html += '<div class="form-grid--4">';
    for (var i = 0; i < 4; i++) {
      html += '<div class="form-group"><label>' + t('tour.timeOption') + ' ' + (i + 1) + '</label><input type="text" class="tf-timeopt" data-idx="' + i + '" value="' + escAttr(timeOpts[i]) + '"></div>';
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
    html += '<div class="form-group"><label>' + t('tour.thankTitle') + '</label><input type="text" id="ty-title" value="' + escAttr(ty.title) + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.thankWa') + '</label><input type="text" id="ty-wa" value="' + escAttr(ty.whatsapp) + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>' + t('tour.thankText') + '</label><input type="text" id="ty-text" value="' + escAttr(ty.text) + '"></div>';
    html += '<div class="form-group"><label>' + t('tour.thankProject') + '</label><input type="text" id="ty-project" value="' + escAttr(ty.projectLink) + '"></div>';
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
        dirtyTabs.exitpopup = false;
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
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ─── Users tab (super_admin only) ───
  // Инициализируется из showAdmin() если currentUser.role === 'super_admin'.
  // Вкладка скрыта от editor/admin (data-super-admin-only в index.html).
  let usersInited = false;
  async function initUsersTab() {
    if (usersInited) return;
    usersInited = true;

    const inviteForm = $('#invite-form');
    const inviteStatus = $('#invite-status');
    const usersTable = $('#users-table');

    function setStatus(text, kind) {
      inviteStatus.textContent = text || '';
      inviteStatus.className = 'publish-status' + (kind ? ' ' + kind : '');
    }

    async function refresh() {
      usersTable.innerHTML = '<div class="admin-loader"><div class="admin-loader__spinner"></div></div>';
      try {
        const users = await SupabaseAdmin.listUsers();
        usersTable.innerHTML = renderUsersTable(users);
        bindUsersTableEvents();
      } catch (err) {
        usersTable.innerHTML = '<div class="publish-status error">' + escapeHtml(err.message) + '</div>';
      }
    }

    function renderUsersTable(users) {
      if (!users.length) return `<p class="users-empty">${t('users.empty')}</p>`;
      const statusLabel = (u) => {
        if (!u.is_active) return { text: t('users.status.deactivated'), cls: 'is-deactivated' };
        if (!u.email_confirmed_at && u.invited_at) return { text: t('users.status.pending'), cls: 'is-pending' };
        return { text: t('users.status.active'), cls: 'is-active' };
      };
      const roleLabel = (role) => t('users.role.' + role + '.short') || role;
      const dateLocale = adminLang === 'ru' ? 'ru-RU' : 'en-GB';
      const formatLastSeen = (iso) => {
        if (!iso) return '—';
        return new Date(iso).toLocaleString(dateLocale, { dateStyle: 'short', timeStyle: 'short' });
      };
      const rows = users.map(u => {
        const isSelf = currentUser && u.id === currentUser.id;
        const st = statusLabel(u);
        const lastSeen = formatLastSeen(u.last_sign_in_at);
        const roleCell = (u.role === 'super_admin' || isSelf)
          ? `<span class="users-role-tag">${escapeHtml(roleLabel(u.role))}</span>`
          : `<select class="users-role-select" data-change-role="${u.id}">
               <option value="editor"${u.role === 'editor' ? ' selected' : ''}>${escapeHtml(t('users.role.editor.short'))}</option>
               <option value="admin"${u.role === 'admin' ? ' selected' : ''}>${escapeHtml(t('users.role.admin.short'))}</option>
             </select>`;
        const deleteBtn = (u.role === 'super_admin' || isSelf)
          ? ''
          : `<button class="btn btn--outline btn--sm" data-delete-user="${u.id}" data-email="${escAttr(u.email)}">${t('users.action.delete')}</button>`;
        const userCell = `<div class="users-user-cell">
            <span class="users-user-cell__email">${escapeHtml(u.email)}${isSelf ? `<span class="users-self-marker">· ${t('users.you')}</span>` : ''}</span>
            <span class="users-user-cell__name">${escapeHtml(u.full_name || '—')}</span>
          </div>`;
        return `<tr>
          <td data-label="${t('users.col.email')}">${userCell}</td>
          <td data-label="${t('users.col.role')}">${roleCell}</td>
          <td data-label="${t('users.col.status')}"><span class="users-status ${st.cls}">${escapeHtml(st.text)}</span></td>
          <td data-label="${t('users.col.lastSignIn')}">${escapeHtml(lastSeen)}</td>
          <td data-label="${t('users.col.actions')}" class="users-actions-cell">${deleteBtn}</td>
        </tr>`;
      }).join('');
      return `<table class="users-table">
        <thead><tr>
          <th>${t('users.col.email')}</th>
          <th>${t('users.col.role')}</th>
          <th>${t('users.col.status')}</th>
          <th>${t('users.col.lastSignIn')}</th>
          <th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
    }

    function bindUsersTableEvents() {
      usersTable.querySelectorAll('[data-change-role]').forEach(sel => {
        sel.addEventListener('change', async () => {
          const userId = sel.dataset.changeRole;
          const role = sel.value;
          try {
            await SupabaseAdmin.changeUserRole(userId, role);
            setStatus(t('users.toast.roleUpdated'), 'success');
            refresh();
          } catch (err) {
            setStatus(t('common.error') + err.message, 'error');
          }
        });
      });
      usersTable.querySelectorAll('[data-delete-user]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const userId = btn.dataset.deleteUser;
          const email = btn.dataset.email;
          if (!confirm(t('users.action.confirmDelete').replace('{email}', email))) return;
          try {
            await SupabaseAdmin.deleteUser(userId);
            setStatus(t('users.toast.userDeleted'), 'success');
            refresh();
          } catch (err) {
            setStatus(t('common.error') + err.message, 'error');
          }
        });
      });
    }

    inviteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('#invite-email').value.trim().toLowerCase();
      const fullName = $('#invite-name').value.trim();
      const role = $('#invite-role').value;
      const btn = inviteForm.querySelector('button[type="submit"]');
      btnLoading(btn, true);
      setStatus(t('users.toast.sending'), '');
      try {
        await SupabaseAdmin.inviteUser(email, role, fullName);
        setStatus(t('users.toast.sent').replace('{email}', email), 'success');
        inviteForm.reset();
        refresh();
      } catch (err) {
        setStatus(t('common.error') + err.message, 'error');
      } finally {
        btnLoading(btn, false);
      }
    });

    refresh();
  }

  // ─── Brand Book Tab ───
  // Read-only витрина. Логика: delegate-click на .bb-copy[data-copy].
  // Для крупных карточек (.bb-swatch) — не трогаем innerHTML (он сломает
  // структуру), только глобальный toast + класс «copied». Для мелких
  // inline-кнопок (.bb-copy--inline, .bb-tint и т.п.) — старое поведение
  // с заменой контента на «✓ Copied».
  const brandbookTab = document.getElementById('tab-brandbook');
  if (brandbookTab) {
    // Глобальный toast — создаём один раз, переиспользуем.
    let bbToast = null;
    let bbToastTimer = null;
    function showBbToast(text) {
      if (!bbToast) {
        bbToast = document.createElement('div');
        bbToast.className = 'bb-toast';
        document.body.appendChild(bbToast);
      }
      bbToast.textContent = text;
      bbToast.classList.add('bb-toast--show');
      clearTimeout(bbToastTimer);
      bbToastTimer = setTimeout(() => bbToast.classList.remove('bb-toast--show'), 1400);
    }

    brandbookTab.addEventListener('click', async (e) => {
      const target = e.target.closest('.bb-copy[data-copy]');
      if (!target) return;
      const value = target.dataset.copy;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          // Fallback для http/local (не secure context)
          const ta = document.createElement('textarea');
          ta.value = value;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        target.classList.add('bb-copy--copied');
        const isCard = target.classList.contains('bb-swatch');
        const copiedLabel = (adminLang === 'ru') ? 'Скопировано' : 'Copied';
        if (isCard) {
          // Большая карточка: только подсветка + toast.
          showBbToast(value + ' — ' + copiedLabel.toLowerCase());
          setTimeout(() => target.classList.remove('bb-copy--copied'), 1400);
        } else {
          // Мелкая кнопка: подмена контента.
          const originalHtml = target.innerHTML;
          target.innerHTML = '<span>✓</span> ' + copiedLabel;
          setTimeout(() => {
            target.classList.remove('bb-copy--copied');
            target.innerHTML = originalHtml;
          }, 1400);
        }
      } catch (err) {
        console.warn('Brand Book copy failed:', err);
      }
    });
  }

})();
