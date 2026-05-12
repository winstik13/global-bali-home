/* ============================================
   ADMIN PANEL â€” Global Bali Home
   Supabase Auth + Supabase content storage
   ============================================ */

(function () {
  'use strict';

  // â”€â”€â”€ i18n â”€â”€â”€
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
      'rate.title': 'Exchange Rate (USD â†’ IDR)',
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
      'projects.overwriteWarn': 'âš ï¸ DANGER: Pages for "{name}" already exist.\n\nClicking OK will OVERWRITE the entire HTML files (EN + RU + ID) with the auto-generated template.\n\nYOU WILL LOSE:\nâ€¢ Curated gallery images and any custom photo selections\nâ€¢ Any manual content edits made directly to the HTML\nâ€¢ Any custom sections added outside the template\n\nThe template DOES include: Hero, Concept, Units table, Gallery, ROI Calculator, Tour CTA, Final CTA.\n\nIf you only need to update SEO meta tags â€” CANCEL and use "Update SEO Only" instead.\n\nAre you absolutely sure you want to overwrite?',
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
      'projects.decisionGuide': 'Decision Guide (catalog page)',
      'projects.decisionGuideHint': 'Shown as a cell on projects.html â€” helps buyers match their goal to this project.',
      'projects.decisionGuideIcon': 'Icon',
      'projects.decisionGuideIconYield': 'Yield (trending chart)',
      'projects.decisionGuideIconLand': 'Land (building)',
      'projects.decisionGuideIconCashflow': 'Cashflow (dollar)',
      'projects.decisionGuideQuestion': 'Question',
      'projects.decisionGuideQuestionPh': 'e.g. Want passive income?',
      'projects.decisionGuideBenefit': 'Benefit',
      'projects.decisionGuideBenefitPh': 'e.g. 12â€“15% yield',
      'seo.title': 'SEO Editor',
      'seo.page': 'Page',
      'seo.selectPage': 'â€” Select page â€”',
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
      'seo.viewOnSite': 'View on Site â†—',
      'seo.saveAll': 'Save All Languages',
      'seo.savingAll': 'Saving all languages...',
      'seo.loadingLangs': 'Loading all languages...',
      'gallery.title': 'Gallery Manager',
      'gallery.project': 'Project',
      'gallery.selectProject': 'â€” Select project â€”',
      'gallery.upload': 'Upload Photos',
      'gallery.photos': 'photos',
      'gallery.noImages': 'No images in this project. Drag & drop or click Upload to add photos.',
      'gallery.dragDrop': 'Drag & drop images here or use Upload button',
      'gallery.formats': 'JPG, PNG, WebP â€” max 10 MB per file',
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
      'help.exitpopup.what': '<strong>What it does:</strong> Shows a popup when a desktop visitor moves the cursor toward closing the tab. Offers a free investment guide in exchange for an email â€” a lead capture tool.',
      'help.exitpopup.enabled': '<strong>Enabled:</strong> Turn the popup on or off across the entire site.',
      'help.exitpopup.delay': '<strong>Trigger Delay:</strong> Minimum seconds a visitor must spend on the page before the popup can appear. Prevents annoying new visitors (recommended: 15â€“30 sec).',
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
      'stats.labelsTitle': 'Stat Labels (3 languages)',
      'stats.labelsHint': 'Use &lt;br&gt; to break the label onto two lines. Only the first 4 stats appear on the homepage.',
      'stats.labelsSave': 'Save Labels',
      'roi.title': 'ROI Calculator Parameters',
      'roi.navTitle': 'ROI',
      'roi.scenarios': 'Scenarios',
      'roi.minInvestment': 'Min Investment ($)',
      'roi.maxInvestment': 'Max Investment ($)',
      'roi.step': 'Step ($)',
      'roi.defaultInvestment': 'Default Investment ($)',
      'roi.defaultOccupancy': 'Default Occupancy (%)',
      'roi.occupancyRange': 'Occupancy Range (%)',
      'roi.conservative': 'Conservative â€” Yield / Growth (%)',
      'roi.normal': 'Normal â€” Yield / Growth (%)',
      'roi.optimistic': 'Optimistic â€” Yield / Growth (%)',
      'roi.save': 'Save ROI Settings',
      'roi.textsTitle': 'Calculator Texts (3 languages)',
      'roi.textsHint': 'Use {project} placeholder in titleProject â€” it will be replaced with the project name.',
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
      'help.analytics.intro': '<strong>How it works:</strong> Paste your tracking IDs below. Scripts are injected automatically â€” no code changes needed.',
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
      'validate.wa.digitsOnly': 'Digits only â€” no +, spaces or dashes',
      'validate.wa.tooShort': 'Too short â€” include country code (e.g. 62...)',
      'validate.wa.tooLong': 'Too long â€” max 15 digits',
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
      'users.role.editor': 'Editor â€” gallery / FAQ / testimonials only',
      'users.role.admin': 'Admin â€” all content (no user management)',
      'users.role.editor.short': 'editor',
      'users.role.admin.short': 'admin',
      'users.role.super_admin.short': 'super admin',
      'users.status.active': 'Active',
      'users.status.deactivated': 'Deactivated',
      'users.status.pending': 'Invited (pending)',
      'users.action.delete': 'Delete',
      'users.action.confirmDelete': 'Delete user {email}? This is irreversible.',
      'users.toast.sending': 'Sending inviteâ€¦',
      'users.toast.sent': 'Invitation sent to {email}.',
      'users.toast.roleUpdated': 'Role updated.',
      'users.toast.userDeleted': 'User deleted.',
    },
    ru: {
      'login.title': 'ÐŸÐ°Ð½ÐµÐ»ÑŒ ÑƒÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ñ',
      'login.email': 'Email',
      'login.password': 'ÐŸÐ°Ñ€Ð¾Ð»ÑŒ',
      'login.submit': 'Ð’Ð¾Ð¹Ñ‚Ð¸',
      'login.signingIn': 'Ð’Ñ…Ð¾Ð´...',
      'header.title': 'ÐŸÐ°Ð½ÐµÐ»ÑŒ ÑƒÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ñ',
      'header.rateLabel': 'USD / IDR',
      'header.signOut': 'Ð’Ñ‹Ð¹Ñ‚Ð¸',
      'deploy.deploying': 'Ð”ÐµÐ¿Ð»Ð¾Ð¹...',
      'deploy.live': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ð½Ð¾!',
      'deploy.failed': 'ÐžÑˆÐ¸Ð±ÐºÐ° Ð´ÐµÐ¿Ð»Ð¾Ñ',
      'nav.dashboard': 'ÐžÐ±Ð·Ð¾Ñ€',
      'nav.projects': 'ÐŸÑ€Ð¾ÐµÐºÑ‚Ñ‹',
      'nav.seo': 'SEO',
      'nav.gallery': 'Ð“Ð°Ð»ÐµÑ€ÐµÑ',
      'nav.faq': 'FAQ',
      'nav.testimonials': 'ÐžÑ‚Ð·Ñ‹Ð²Ñ‹',
      'nav.analytics': 'ÐÐ½Ð°Ð»Ð¸Ñ‚Ð¸ÐºÐ°',
      'nav.settings': 'ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸',
      'dash.title': 'ÐžÐ±Ð·Ð¾Ñ€',
      'dash.loading': 'Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° Ð´Ð°Ð½Ð½Ñ‹Ñ…...',
      'dash.totalUnits': 'Ð’ÑÐµÐ³Ð¾ ÑŽÐ½Ð¸Ñ‚Ð¾Ð²',
      'dash.available': 'Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾',
      'dash.progress': 'ÐŸÑ€Ð¾Ð³Ñ€ÐµÑÑ',
      'dash.potential': 'ÐŸÐ¾Ñ‚ÐµÐ½Ñ†Ð¸Ð°Ð»',
      'dash.price': 'Ð¦ÐµÐ½Ð°',
      'dash.preSale': 'ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð°',
      'dash.inProgress': 'Ð¡Ñ‚Ñ€Ð¾Ð¸Ñ‚ÑÑ',
      'dash.status_pre-sale': 'ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð°',
      'dash.status_in-progress': 'Ð¡Ñ‚Ñ€Ð¾Ð¸Ñ‚ÑÑ',
      'dash.status_completed': 'Ð—Ð°Ð²ÐµÑ€ÑˆÑ‘Ð½',
      'dash.status_sold-out': 'Ð’ÑÐµ Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹',
      'dash.sold': 'ÐÐµ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾',
      'dash.left': 'Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾',
      'dash.priceRange': 'Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ Ñ†ÐµÐ½',
      'dash.editProject': 'Ð ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ',
      'dash.viewOnSite': 'ÐÐ° ÑÐ°Ð¹Ñ‚Ðµ',
      'dash.recentChanges': 'ÐŸÐ¾ÑÐ»ÐµÐ´Ð½Ð¸Ðµ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ',
      'dash.noChanges': 'ÐÐµÑ‚ Ð½ÐµÐ´Ð°Ð²Ð½Ð¸Ñ… Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¹.',
      'dash.couldNotLoad': 'ÐÐµ ÑƒÐ´Ð°Ð»Ð¾ÑÑŒ Ð·Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð¸ÑÑ‚Ð¾Ñ€Ð¸ÑŽ.',
      'dash.breakAvailable': 'Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾',
      'dash.breakSold': 'Ð½Ðµ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾',
      'rate.title': 'ÐšÑƒÑ€Ñ Ð²Ð°Ð»ÑŽÑ‚ (USD â†’ IDR)',
      'rate.navTitle': 'ÐšÑƒÑ€Ñ',
      'rate.auto': 'ÐÐ²Ñ‚Ð¾ (ÐºÑƒÑ€Ñ Ð¸Ð· API)',
      'rate.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ ÐºÑƒÑ€Ñ',
      'rate.currentRate': 'Ð¢ÐµÐºÑƒÑ‰Ð¸Ð¹ ÐºÑƒÑ€Ñ:',
      'rate.updated': 'ÐžÐ±Ð½Ð¾Ð²Ð»Ñ‘Ð½:',
      'rate.manual': '(Ñ€ÑƒÑ‡Ð½Ð¾Ð¹)',
      'rate.autoMode': '(Ð°Ð²Ñ‚Ð¾)',
      'rate.defaultMsg': 'ÐšÑƒÑ€Ñ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ. ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚Ðµ Ð´Ð»Ñ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½Ñ‹Ñ… Ñ†ÐµÐ½ Ð² IDR.',
      'rate.invalidRate': 'Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½Ñ‹Ð¹ ÐºÑƒÑ€Ñ (Ð½Ð°Ð¿Ñ€. 16500)',
      'help.rate.manual': '<strong>Ð’Ñ€ÑƒÑ‡Ð½ÑƒÑŽ:</strong> Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÐºÑƒÑ€Ñ Ð¸ Ð½Ð°Ð¶Ð¼Ð¸Ñ‚Ðµ Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ.',
      'help.rate.auto': '<strong>ÐÐ²Ñ‚Ð¾:</strong> ÐšÑƒÑ€Ñ Ð¾Ð±Ð½Ð¾Ð²Ð»ÑÐµÑ‚ÑÑ Ð¸Ð· API ÐºÐ°Ð¶Ð´Ñ‹Ð¹ Ñ‡Ð°Ñ. Ð ÑƒÑ‡Ð½Ð¾Ð¹ Ð²Ð²Ð¾Ð´ Ð±Ð»Ð¾ÐºÐ¸Ñ€ÑƒÐµÑ‚ÑÑ.',
      'help.rate.fallback': '<strong>Ð ÐµÐ·ÐµÑ€Ð²:</strong> Ð•ÑÐ»Ð¸ API Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ð¹ ÑÐ¾Ñ…Ñ€Ð°Ð½Ñ‘Ð½Ð½Ñ‹Ð¹ ÐºÑƒÑ€Ñ.',
      'contacts.title': 'ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð½Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ',
      'contacts.phone': 'Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½',
      'contacts.whatsapp': 'ÐÐ¾Ð¼ÐµÑ€ WhatsApp',
      'contacts.email': 'Email',
      'contacts.locationEn': 'ÐÐ´Ñ€ÐµÑ (EN)',
      'contacts.locationRu': 'ÐÐ´Ñ€ÐµÑ (RU)',
      'contacts.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ‹',
      'contacts.hint.phone': 'Ð¤Ð¾Ñ€Ð¼Ð°Ñ‚ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ, Ð½Ð°Ð¿Ñ€. +62 813 251 438 49',
      'contacts.hint.whatsapp': 'Ð¢Ð¾Ð»ÑŒÐºÐ¾ Ñ†Ð¸Ñ„Ñ€Ñ‹, Ñ ÐºÐ¾Ð´Ð¾Ð¼ ÑÑ‚Ñ€Ð°Ð½Ñ‹, Ð±ÐµÐ· +',
      'help.contacts.phone': '<strong>Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½:</strong> Ð›ÑŽÐ±Ð¾Ð¹ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ Ñ Ð¿Ñ€Ð¾Ð±ÐµÐ»Ð°Ð¼Ð¸/Ð´ÐµÑ„Ð¸ÑÐ°Ð¼Ð¸, Ð½Ð°Ñ‡Ð¸Ð½Ð°Ñ‚ÑŒ Ñ +ÐºÐ¾Ð´ ÑÑ‚Ñ€Ð°Ð½Ñ‹.',
      'help.contacts.whatsapp': '<strong>WhatsApp:</strong> Ð¢ÐžÐ›Ð¬ÐšÐž Ð¦Ð˜Ð¤Ð Ð«, Ð±ÐµÐ· +, Ð¿Ñ€Ð¾Ð±ÐµÐ»Ð¾Ð² Ð¸Ð»Ð¸ Ð´ÐµÑ„Ð¸ÑÐ¾Ð². ÐŸÑ€Ð¸Ð¼ÐµÑ€: 6281325143849',
      'help.contacts.email': '<strong>Email:</strong> Ð¡Ñ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ñ‹Ð¹ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚ email.',
      'help.contacts.location': '<strong>ÐÐ´Ñ€ÐµÑ:</strong> ÐžÑ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÐµÐ¼Ñ‹Ð¹ Ñ‚ÐµÐºÑÑ‚, Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð¸Ñ‚ÑŒ Ð²Ñ€ÑƒÑ‡Ð½ÑƒÑŽ Ð´Ð»Ñ ÐºÐ°Ð¶Ð´Ð¾Ð³Ð¾ ÑÐ·Ñ‹ÐºÐ°.',
      'guide.title': 'PDF Ð“Ð¸Ð´ Ð¿Ð¾ Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸ÑÐ¼',
      'guide.navTitle': 'Ð“Ð¸Ð´',
      'guide.upload': 'Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ PDF',
      'guide.currentFile': 'Ð¢ÐµÐºÑƒÑ‰Ð¸Ð¹ Ñ„Ð°Ð¹Ð»:',
      'guide.version': 'Ð’ÐµÑ€ÑÐ¸Ñ:',
      'guide.updated': 'ÐžÐ±Ð½Ð¾Ð²Ð»Ñ‘Ð½:',
      'guide.noFile': 'PDF ÐµÑ‰Ñ‘ Ð½Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½. Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚Ðµ Ñ„Ð°Ð¹Ð» Ð´Ð»Ñ Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ð¸ ÑÐºÐ°Ñ‡Ð¸Ð²Ð°Ð½Ð¸Ñ Ð³Ð¸Ð´Ð°.',
      'guide.selectPdf': 'Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ PDF Ñ„Ð°Ð¹Ð»',
      'guide.uploading': 'Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° PDF...',
      'help.guide.format': '<strong>Ð¤Ð¾Ñ€Ð¼Ð°Ñ‚:</strong> Ð¢Ð¾Ð»ÑŒÐºÐ¾ PDF.',
      'help.guide.afterUpload': '<strong>ÐŸÐ¾ÑÐ»Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸:</strong> Ð¤Ð°Ð¹Ð» ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÑ‚ÑÑ Ð² Ñ€ÐµÐ¿Ð¾Ð·Ð¸Ñ‚Ð¾Ñ€Ð¸Ð¸ Ð¸ Ð´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½ Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»ÑÐ¼.',
      'help.guide.deployTime': '<strong>Ð”ÐµÐ¿Ð»Ð¾Ð¹:</strong> ~1-2 Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹ Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸.',
      'projects.title': 'Ð ÐµÐ´Ð°ÐºÑ‚Ð¾Ñ€ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð¾Ð²',
      'projects.publish': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ñ‚ÑŒ',
      'projects.generatePages': 'Ð¡Ð³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹',
      'projects.updateSeoOnly': 'ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ SEO',
      'projects.overwriteWarn': 'âš ï¸ ÐžÐŸÐÐ¡ÐÐž: Ð¡Ñ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð´Ð»Ñ "{name}" ÑƒÐ¶Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÑŽÑ‚.\n\nÐÐ°Ð¶Ð°Ð² OK, Ð²Ñ‹ ÐŸÐžÐ›ÐÐžÐ¡Ð¢Ð¬Ð® ÐŸÐ•Ð Ð•Ð—ÐÐŸÐ˜Ð¨Ð•Ð¢Ð• HTML-Ñ„Ð°Ð¹Ð»Ñ‹ (EN + RU + ID) Ð°Ð²Ñ‚Ð¾Ð³ÐµÐ½ÐµÑ€Ð¸Ñ€ÑƒÐµÐ¼Ñ‹Ð¼ ÑˆÐ°Ð±Ð»Ð¾Ð½Ð¾Ð¼.\n\nÐ’Ð« ÐŸÐžÐ¢Ð•Ð Ð¯Ð•Ð¢Ð•:\nâ€¢ ÐšÑƒÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ Ð³Ð°Ð»ÐµÑ€ÐµÐ¸ Ð¸ ÐºÐ°ÑÑ‚Ð¾Ð¼Ð½Ñ‹Ðµ Ð¿Ð¾Ð´Ð±Ð¾Ñ€ÐºÐ¸ Ñ„Ð¾Ñ‚Ð¾\nâ€¢ Ð›ÑŽÐ±Ñ‹Ðµ Ñ€ÑƒÑ‡Ð½Ñ‹Ðµ Ð¿Ñ€Ð°Ð²ÐºÐ¸ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚Ð° Ð²Ð½ÐµÑÑ‘Ð½Ð½Ñ‹Ðµ Ð¿Ñ€ÑÐ¼Ð¾ Ð² HTML\nâ€¢ Ð›ÑŽÐ±Ñ‹Ðµ ÐºÐ°ÑÑ‚Ð¾Ð¼Ð½Ñ‹Ðµ ÑÐµÐºÑ†Ð¸Ð¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð½Ñ‹Ðµ Ð²Ð½Ðµ ÑˆÐ°Ð±Ð»Ð¾Ð½Ð°\n\nÐ¨Ð°Ð±Ð»Ð¾Ð½ Ð’ÐšÐ›Ð®Ð§ÐÐ•Ð¢: Hero, ÐšÐ¾Ð½Ñ†ÐµÐ¿Ñ†Ð¸ÑŽ, Ð¢Ð°Ð±Ð»Ð¸Ñ†Ñƒ ÑŽÐ½Ð¸Ñ‚Ð¾Ð², Ð“Ð°Ð»ÐµÑ€ÐµÑŽ, ROI ÐºÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€, Tour CTA, Ð¤Ð¸Ð½Ð°Ð»ÑŒÐ½Ñ‹Ð¹ CTA.\n\nÐ•ÑÐ»Ð¸ Ð½ÑƒÐ¶Ð½Ð¾ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ SEO Ð¼ÐµÑ‚Ð°-Ñ‚ÐµÐ³Ð¸ â€” ÐÐÐ–ÐœÐ˜Ð¢Ð• ÐžÐ¢ÐœÐ•ÐÐ Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ ÐºÐ½Ð¾Ð¿ÐºÑƒ "ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ SEO".\n\nÐ’Ñ‹ Ð°Ð±ÑÐ¾Ð»ÑŽÑ‚Ð½Ð¾ ÑƒÐ²ÐµÑ€ÐµÐ½Ñ‹, Ñ‡Ñ‚Ð¾ Ñ…Ð¾Ñ‚Ð¸Ñ‚Ðµ Ð¿ÐµÑ€ÐµÐ·Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ?',
      'projects.overwriteAll': 'ÐŸÐµÑ€ÐµÐ·Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð²ÑÑ‘',
      'projects.cancel': 'ÐžÑ‚Ð¼ÐµÐ½Ð°',
      'projects.unsaved': 'Ð•ÑÑ‚ÑŒ Ð½ÐµÑÐ¾Ñ…Ñ€Ð°Ð½Ñ‘Ð½Ð½Ñ‹Ðµ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ',
      'projects.publishing': 'ÐŸÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ...',
      'projects.published': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ð½Ð¾! Ð¡Ð°Ð¹Ñ‚ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑÑ (~1-2 Ð¼Ð¸Ð½)',
      'projects.projectStatus': 'Ð¡Ñ‚Ð°Ñ‚ÑƒÑ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°',
      'projects.statusLabel': 'Ð¡Ñ‚Ð°Ñ‚ÑƒÑ',
      'projects.soldOutAuto': 'ÐÐ²Ñ‚Ð¾: Ð²ÑÐµ ÑŽÐ½Ð¸Ñ‚Ñ‹ Ð¿Ñ€Ð¾Ð´Ð°Ð½Ñ‹',
      'projects.floorPlans': 'ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð¾Ð²ÐºÐ¸',
      'projects.noPlan': 'ÐÐµÑ‚ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²ÐºÐ¸',
      'projects.uploadPlan': 'Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ',
      'projects.deletePlan': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²ÐºÑƒ',
      'projects.confirmDeletePlan': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð¾Ð²ÐºÑƒ Ð´Ð»Ñ {type}?',
      'projects.uploading': 'Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°...',
      'projects.units': 'Ð®Ð½Ð¸Ñ‚Ñ‹',
      'projects.unitTypes': 'Ð¢Ð¸Ð¿Ñ‹ ÑŽÐ½Ð¸Ñ‚Ð¾Ð²',
      'projects.availability': 'Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾ÑÑ‚ÑŒ',
      'projects.heroStats': 'Ð¡Ñ‚Ð°Ñ‚Ð¸ÑÑ‚Ð¸ÐºÐ° Hero',
      'projects.showcaseCard': 'ÐšÐ°Ñ€Ñ‚Ð¾Ñ‡ÐºÐ° Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°',
      'projects.addUnit': '+ Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ ÑŽÐ½Ð¸Ñ‚',
      'projects.addType': '+ Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ñ‚Ð¸Ð¿',
      'projects.deleteUnit': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ',
      'projects.deleteType': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ',
      'projects.confirmDeleteUnit': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ ÑŽÐ½Ð¸Ñ‚ {id}?',
      'projects.confirmDeleteType': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ñ‚Ð¸Ð¿ Â«{type}Â»?',
      'gallery.confirmDelete': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Â«{name}Â»?',
      'gallery.deleteError': 'ÐžÑˆÐ¸Ð±ÐºÐ° ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ñ: ',
      'faq.confirmDelete': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ ÑÑ‚Ð¾Ñ‚ Ð²Ð¾Ð¿Ñ€Ð¾Ñ?',
      'test.confirmDelete': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ ÑÑ‚Ð¾Ñ‚ Ð¾Ñ‚Ð·Ñ‹Ð²?',
      'projects.unit': 'Ð®Ð½Ð¸Ñ‚',
      'projects.type': 'Ð¢Ð¸Ð¿',
      'projects.floors': 'Ð­Ñ‚Ð°Ð¶Ð¸',
      'projects.area': 'ÐŸÐ»Ð¾Ñ‰Ð°Ð´ÑŒ',
      'projects.land': 'Ð£Ñ‡Ð°ÑÑ‚Ð¾Ðº',
      'projects.badge': 'Ð‘ÐµÐ¹Ð´Ð¶',
      'projects.status': 'Ð¡Ñ‚Ð°Ñ‚ÑƒÑ',
      'projects.price': 'Ð¦ÐµÐ½Ð° ($)',
      'projects.sold': 'ÐŸÑ€Ð¾Ð´Ð°Ð½Ð¾',
      'projects.total': 'Ð’ÑÐµÐ³Ð¾',
      'projects.availAutoHint': 'Ð Ð°ÑÑÑ‡Ð¸Ñ‚Ñ‹Ð²Ð°ÐµÑ‚ÑÑ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð¸Ð· ÑÑ‚Ð°Ñ‚ÑƒÑÐ¾Ð² ÑŽÐ½Ð¸Ñ‚Ð¾Ð²',
      'projects.number': 'Ð§Ð¸ÑÐ»Ð¾',
      'projects.label': 'ÐŸÐ¾Ð´Ð¿Ð¸ÑÑŒ',
      'projects.priceLabel': 'Ð¦ÐµÐ½Ð°',
      'projects.description': 'ÐžÐ¿Ð¸ÑÐ°Ð½Ð¸Ðµ',
      'projects.positioning': 'ÐŸÐ¾Ð·Ð¸Ñ†Ð¸Ð¾Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ (Ñ‚ÑÐ³Ð»Ð°Ð¹Ð½)',
      'projects.positioningPh': 'Ð½Ð°Ð¿Ñ€. Ð‘ÑƒÑ‚Ð¸Ðº-Ð´Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚ÑŒ',
      'projects.projectDetails': 'Ð”ÐµÑ‚Ð°Ð»Ð¸ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°',
      'projects.startingPrice': 'ÐÐ°Ñ‡Ð°Ð»ÑŒÐ½Ð°Ñ Ñ†ÐµÐ½Ð° (USD)',
      'projects.bedrooms': 'Ð¡Ð¿Ð°Ð»ÑŒÐ½Ð¸',
      'projects.compArea': 'Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ Ð¿Ð»Ð¾Ñ‰Ð°Ð´Ð¸',
      'projects.compLand': 'Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ ÑƒÑ‡Ð°ÑÑ‚ÐºÐ°',
      'projects.totalUnits': 'Ð’ÑÐµÐ³Ð¾ ÑŽÐ½Ð¸Ñ‚Ð¾Ð²',
      'projects.compPool': 'Ð‘Ð°ÑÑÐµÐ¹Ð½',
      'projects.handover': 'Ð¡Ð´Ð°Ñ‡Ð°',
      'projects.newProject': '+ ÐÐ¾Ð²Ñ‹Ð¹ Ð¿Ñ€Ð¾ÐµÐºÑ‚',
      'projects.decisionGuide': 'Decision Guide (ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° ÐºÐ°Ñ‚Ð°Ð»Ð¾Ð³Ð°)',
      'projects.decisionGuideHint': 'ÐŸÐ¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÑ‚ÑÑ ÑÑ‡ÐµÐ¹ÐºÐ¾Ð¹ Ð½Ð° projects.html â€” Ð¿Ð¾Ð¼Ð¾Ð³Ð°ÐµÑ‚ Ð¿Ð¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»ÑŽ ÑÐ¾Ð¿Ð¾ÑÑ‚Ð°Ð²Ð¸Ñ‚ÑŒ Ñ†ÐµÐ»ÑŒ Ñ ÑÑ‚Ð¸Ð¼ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð¾Ð¼.',
      'projects.decisionGuideIcon': 'Ð˜ÐºÐ¾Ð½ÐºÐ°',
      'projects.decisionGuideIconYield': 'Ð”Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚ÑŒ (Ð³Ñ€Ð°Ñ„Ð¸Ðº)',
      'projects.decisionGuideIconLand': 'Ð—ÐµÐ¼Ð»Ñ (Ð·Ð´Ð°Ð½Ð¸Ðµ)',
      'projects.decisionGuideIconCashflow': 'Cashflow (Ð´Ð¾Ð»Ð»Ð°Ñ€)',
      'projects.decisionGuideQuestion': 'Ð’Ð¾Ð¿Ñ€Ð¾Ñ',
      'projects.decisionGuideQuestionPh': 'Ð½Ð°Ð¿Ñ€. Ð¥Ð¾Ñ‚Ð¸Ñ‚Ðµ Ð¿Ð°ÑÑÐ¸Ð²Ð½Ñ‹Ð¹ Ð´Ð¾Ñ…Ð¾Ð´?',
      'projects.decisionGuideBenefit': 'Ð‘ÐµÐ½ÐµÑ„Ð¸Ñ‚',
      'projects.decisionGuideBenefitPh': 'Ð½Ð°Ð¿Ñ€. 12â€“15% Ð³Ð¾Ð´Ð¾Ð²Ñ‹Ñ…',
      'seo.title': 'SEO Ð ÐµÐ´Ð°ÐºÑ‚Ð¾Ñ€',
      'seo.page': 'Ð¡Ñ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°',
      'seo.selectPage': 'â€” Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ â€”',
      'seo.home': 'Ð“Ð»Ð°Ð²Ð½Ð°Ñ',
      'seo.about': 'Ðž Ð½Ð°Ñ',
      'seo.projects': 'ÐŸÑ€Ð¾ÐµÐºÑ‚Ñ‹',
      'seo.services': 'Ð£ÑÐ»ÑƒÐ³Ð¸',
      'seo.gallery': 'Ð“Ð°Ð»ÐµÑ€ÐµÑ',
      'seo.contacts': 'ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ‹',
      'seo.googlePreview': 'ÐŸÑ€ÐµÐ²ÑŒÑŽ Ð² Google',
      'seo.socialPreview': 'ÐŸÑ€ÐµÐ²ÑŒÑŽ Ð² ÑÐ¾Ñ†ÑÐµÑ‚ÑÑ…',
      'seo.noOgImage': 'ÐÐµÑ‚ OG-Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ',
      'seo.pageTitle': 'Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹',
      'seo.metaDesc': 'ÐœÐµÑ‚Ð°-Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ',
      'seo.ogTitle': 'OG Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº',
      'seo.ogDesc': 'OG ÐžÐ¿Ð¸ÑÐ°Ð½Ð¸Ðµ',
      'seo.ogImage': 'OG Ð˜Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ URL',
      'seo.canonical': 'Canonical URL',
      'seo.viewOnSite': 'ÐžÑ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Ð½Ð° ÑÐ°Ð¹Ñ‚Ðµ â†—',
      'seo.saveAll': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ð²ÑÐµ ÑÐ·Ñ‹ÐºÐ¸',
      'seo.savingAll': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð²ÑÐµÑ… ÑÐ·Ñ‹ÐºÐ¾Ð²...',
      'seo.loadingLangs': 'Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° Ð²ÑÐµÑ… ÑÐ·Ñ‹ÐºÐ¾Ð²...',
      'gallery.title': 'ÐœÐµÐ½ÐµÐ´Ð¶ÐµÑ€ Ð³Ð°Ð»ÐµÑ€ÐµÐ¸',
      'gallery.project': 'ÐŸÑ€Ð¾ÐµÐºÑ‚',
      'gallery.selectProject': 'â€” Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¾ÐµÐºÑ‚ â€”',
      'gallery.upload': 'Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ñ„Ð¾Ñ‚Ð¾',
      'gallery.photos': 'Ñ„Ð¾Ñ‚Ð¾',
      'gallery.noImages': 'ÐÐµÑ‚ Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ð¹. ÐŸÐµÑ€ÐµÑ‚Ð°Ñ‰Ð¸Ñ‚Ðµ Ñ„Ð°Ð¹Ð»Ñ‹ Ð¸Ð»Ð¸ Ð½Ð°Ð¶Ð¼Ð¸Ñ‚Ðµ Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ.',
      'gallery.dragDrop': 'ÐŸÐµÑ€ÐµÑ‚Ð°Ñ‰Ð¸Ñ‚Ðµ Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ ÑÑŽÐ´Ð° Ð¸Ð»Ð¸ Ð½Ð°Ð¶Ð¼Ð¸Ñ‚Ðµ Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ',
      'gallery.formats': 'JPG, PNG, WebP â€” Ð¼Ð°ÐºÑ. 10 ÐœÐ‘ Ð½Ð° Ñ„Ð°Ð¹Ð»',
      'gallery.uploading': 'Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°',
      'gallery.savingData': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð³Ð°Ð»ÐµÑ€ÐµÐ¸...',
      'gallery.uploaded': 'Ñ„Ð¾Ñ‚Ð¾ Ð·Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½Ð¾!',
      'gallery.moveLeft': 'Ð’Ð»ÐµÐ²Ð¾',
      'gallery.moveRight': 'Ð’Ð¿Ñ€Ð°Ð²Ð¾',
      'gallery.delete': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ',
      'gallery.previewTitle': 'Ð“Ð¾Ñ‚Ð¾Ð²Ð¾ Ðº Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐµ',
      'gallery.uploadAll': 'Ð—Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð²ÑÐµ',
      'gallery.cancelUpload': 'ÐžÑ‚Ð¼ÐµÐ½Ð°',
      'gallery.duplicate': 'Ð£Ð¶Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚',
      'gallery.filesSelected': 'Ñ„Ð°Ð¹Ð»Ð¾Ð² Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð¾',
      'faq.title': 'Ð ÐµÐ´Ð°ÐºÑ‚Ð¾Ñ€ FAQ',
      'faq.addQuestion': '+ Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð²Ð¾Ð¿Ñ€Ð¾Ñ',
      'faq.publish': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ñ‚ÑŒ FAQ',
      'faq.publishing': 'ÐŸÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ FAQ...',
      'faq.published': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ð½Ð¾! Ð¡Ð°Ð¹Ñ‚ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑÑ (~1-2 Ð¼Ð¸Ð½)',
      'faq.noItems': 'ÐŸÐ¾ÐºÐ° Ð½ÐµÑ‚ Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ¾Ð². ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ "+ Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð²Ð¾Ð¿Ñ€Ð¾Ñ".',
      'faq.question': 'Ð’Ð¾Ð¿Ñ€Ð¾Ñ',
      'faq.answer': 'ÐžÑ‚Ð²ÐµÑ‚',
      'test.title': 'Ð ÐµÐ´Ð°ÐºÑ‚Ð¾Ñ€ Ð¾Ñ‚Ð·Ñ‹Ð²Ð¾Ð²',
      'test.add': '+ Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð¾Ñ‚Ð·Ñ‹Ð²',
      'test.publish': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ñ‚ÑŒ Ð¾Ñ‚Ð·Ñ‹Ð²Ñ‹',
      'test.publishing': 'ÐŸÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¾Ñ‚Ð·Ñ‹Ð²Ð¾Ð²...',
      'test.published': 'ÐžÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ð½Ð¾! Ð¡Ð°Ð¹Ñ‚ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑÑ (~1-2 Ð¼Ð¸Ð½)',
      'test.noItems': 'ÐŸÐ¾ÐºÐ° Ð½ÐµÑ‚ Ð¾Ñ‚Ð·Ñ‹Ð²Ð¾Ð². ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ "+ Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð¾Ñ‚Ð·Ñ‹Ð²".',
      'test.name': 'Ð˜Ð¼Ñ',
      'test.role': 'Ð Ð¾Ð»ÑŒ',
      'test.avatar': 'Ð¤Ð¾Ñ‚Ð¾',
      'test.text': 'Ð¢ÐµÐºÑÑ‚',
      'test.stars': 'Ð—Ð²Ñ‘Ð·Ð´Ñ‹',
      'test.sourceUrl': 'Ð¡ÑÑ‹Ð»ÐºÐ° Ð½Ð° Ð¾Ñ‚Ð·Ñ‹Ð²',
      'test.sourceName': 'Ð˜ÑÑ‚Ð¾Ñ‡Ð½Ð¸Ðº',
      'test.sourceHint': 'Ð½Ð°Ð¿Ñ€. Google Reviews, Trustpilot',
      'test.copyFromEn': 'Ð¡ÐºÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¸Ð· EN',
      'faq.copyFromEn': 'Ð¡ÐºÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¸Ð· EN',
      'colors.title': 'Ð¦Ð²ÐµÑ‚Ð° ÑÐ°Ð¹Ñ‚Ð°',
      'colors.navTitle': 'Ð¦Ð²ÐµÑ‚Ð°',
      'colors.mainBg': 'ÐžÑÐ½Ð¾Ð²Ð½Ð¾Ð¹ Ñ„Ð¾Ð½',
      'colors.altBg': 'ÐÐ»ÑŒÑ‚ÐµÑ€Ð½Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ð¹ Ñ„Ð¾Ð½',
      'colors.cardPanel': 'ÐšÐ°Ñ€Ñ‚Ð¾Ñ‡ÐºÐ¸ / ÐŸÐ°Ð½ÐµÐ»Ð¸',
      'colors.primaryText': 'ÐžÑÐ½Ð¾Ð²Ð½Ð¾Ð¹ Ñ‚ÐµÐºÑÑ‚',
      'colors.cream': 'ÐšÑ€ÐµÐ¼Ð¾Ð²Ñ‹Ð¹ (ÐšÐ½Ð¾Ð¿ÐºÐ¸)',
      'colors.brandAccent': 'ÐÐºÑ†ÐµÐ½Ñ‚Ð½Ñ‹Ð¹ Ñ†Ð²ÐµÑ‚',
      'colors.muted': 'ÐŸÑ€Ð¸Ð³Ð»ÑƒÑˆ. 75%',
      'colors.dim': 'Ð¢ÑƒÑÐºÐ»Ñ‹Ð¹ 50%',
      'colors.border': 'Ð Ð°Ð¼ÐºÐ° 10%',
      'colors.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ñ†Ð²ÐµÑ‚Ð°',
      'colors.reset': 'Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ Ðº ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ñ‹Ð¼',
      'colors.resetDone': 'Ð¡Ð±Ñ€Ð¾ÑˆÐµÐ½Ð¾ (Ð½Ðµ ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¾)',
      'colors.invalidHex': 'ÐÐµÐ²ÐµÑ€Ð½Ñ‹Ð¹ HEX Ð´Ð»Ñ ',
      'help.colors.text': '<strong>Ð¦Ð²ÐµÑ‚ Ñ‚ÐµÐºÑÑ‚Ð°</strong> Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÑÐµÑ‚ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð½Ñ‹Ðµ Ñ†Ð²ÐµÑ‚Ð° (Ð¿Ñ€Ð¸Ð³Ð»ÑƒÑˆÑ‘Ð½Ð½Ñ‹Ð¹, Ñ€Ð°Ð¼ÐºÐ¸).',
      'help.colors.live': '<strong>ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾ÑÐ¼Ð¾Ñ‚Ñ€:</strong> Ð˜Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ Ð²Ð¸Ð´Ð½Ñ‹ Ð¼Ð³Ð½Ð¾Ð²ÐµÐ½Ð½Ð¾ Ð² Ð°Ð´Ð¼Ð¸Ð½ÐºÐµ.',
      'help.colors.site': '<strong>ÐÐ° ÑÐ°Ð¹Ñ‚Ðµ:</strong> Ð¦Ð²ÐµÑ‚Ð° Ð¿Ñ€Ð¸Ð¼ÐµÐ½ÑÑ‚ÑÑ Ð¿Ð¾ÑÐ»Ðµ ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ñ + ~1-2 Ð¼Ð¸Ð½.',
      'help.colors.reset': 'Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ <strong>Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ</strong> Ð´Ð»Ñ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‚Ð° Ð¿Ð°Ð»Ð¸Ñ‚Ñ€Ñ‹.',
      'help.exitpopup.what': '<strong>Ð§Ñ‚Ð¾ Ð´ÐµÐ»Ð°ÐµÑ‚:</strong> ÐŸÐ¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÑ‚ Ð¿Ð¾Ð¿Ð°Ð¿, ÐºÐ¾Ð³Ð´Ð° Ð´ÐµÑÐºÑ‚Ð¾Ð¿Ð½Ñ‹Ð¹ Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»ÑŒ Ð´Ð²Ð¸Ð³Ð°ÐµÑ‚ ÐºÑƒÑ€ÑÐ¾Ñ€ Ðº Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸ÑŽ Ð²ÐºÐ»Ð°Ð´ÐºÐ¸. ÐŸÑ€ÐµÐ´Ð»Ð°Ð³Ð°ÐµÑ‚ Ð±ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ñ‹Ð¹ Ð³Ð¸Ð´ Ð¿Ð¾ Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸ÑÐ¼ Ð² Ð¾Ð±Ð¼ÐµÐ½ Ð½Ð° email â€” Ð¸Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚ ÑÐ±Ð¾Ñ€Ð° Ð»Ð¸Ð´Ð¾Ð².',
      'help.exitpopup.enabled': '<strong>Ð’ÐºÐ»ÑŽÑ‡Ñ‘Ð½:</strong> Ð’ÐºÐ»ÑŽÑ‡Ð°ÐµÑ‚ Ð¸Ð»Ð¸ Ð²Ñ‹ÐºÐ»ÑŽÑ‡Ð°ÐµÑ‚ Ð¿Ð¾Ð¿Ð°Ð¿ Ð½Ð° Ð²ÑÑ‘Ð¼ ÑÐ°Ð¹Ñ‚Ðµ.',
      'help.exitpopup.delay': '<strong>Ð—Ð°Ð´ÐµÑ€Ð¶ÐºÐ°:</strong> ÐœÐ¸Ð½Ð¸Ð¼Ð°Ð»ÑŒÐ½Ð¾Ðµ Ð²Ñ€ÐµÐ¼Ñ (ÑÐµÐºÑƒÐ½Ð´Ñ‹) Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð´Ð¾ ÑÑ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°Ð½Ð¸Ñ Ð¿Ð¾Ð¿Ð°Ð¿Ð°. ÐÐµ Ñ€Ð°Ð·Ð´Ñ€Ð°Ð¶Ð°ÐµÑ‚ Ð½Ð¾Ð²Ñ‹Ñ… Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚ÐµÐ»ÐµÐ¹ (Ñ€ÐµÐºÐ¾Ð¼ÐµÐ½Ð´ÑƒÐµÑ‚ÑÑ: 15â€“30 ÑÐµÐº).',
      'help.exitpopup.content': '<strong>ÐšÐ¾Ð½Ñ‚ÐµÐ½Ñ‚:</strong> Ð’ÑÐµ Ñ‚ÐµÐºÑÑ‚Ñ‹ Ð½Ð°ÑÑ‚Ñ€Ð°Ð¸Ð²Ð°ÑŽÑ‚ÑÑ Ð´Ð»Ñ ÐºÐ°Ð¶Ð´Ð¾Ð³Ð¾ ÑÐ·Ñ‹ÐºÐ°. Ð‘ÐµÐ¹Ð´Ð¶, Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº, Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ, Ñ‚ÐµÐºÑÑ‚Ñ‹ ÐºÐ½Ð¾Ð¿Ð¾Ðº Ð¸ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ Ð¾Ð± ÑƒÑÐ¿ÐµÑ…Ðµ.',
      'nav.exitpopup': 'Popups',
      'popups.title': 'ÐŸÐ¾Ð¿Ð°Ð¿Ñ‹',
      'exitpopup.title': 'Exit Intent Ð¿Ð¾Ð¿Ð°Ð¿',
      'exitpopup.settings': 'ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸',
      'exitpopup.content': 'ÐšÐ¾Ð½Ñ‚ÐµÐ½Ñ‚',
      'exitpopup.preview': 'ÐŸÑ€ÐµÐ²ÑŒÑŽ',
      'exitpopup.afterSubmit': 'ÐŸÐ¾ÑÐ»Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸',
      'exitpopup.enabled': 'Ð’ÐºÐ»ÑŽÑ‡Ñ‘Ð½',
      'exitpopup.delay': 'Ð—Ð°Ð´ÐµÑ€Ð¶ÐºÐ° ÑÑ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°Ð½Ð¸Ñ (ÑÐµÐº)',
      'exitpopup.field.tag': 'Ð‘ÐµÐ¹Ð´Ð¶',
      'exitpopup.field.title': 'Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº Ð¿Ð¾Ð¿Ð°Ð¿Ð°',
      'exitpopup.field.text': 'ÐžÐ¿Ð¸ÑÐ°Ð½Ð¸Ðµ',
      'exitpopup.field.placeholder': 'ÐŸÐ»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€ email',
      'exitpopup.field.submit': 'ÐšÐ½Ð¾Ð¿ÐºÐ° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸',
      'exitpopup.field.success': 'Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ Ð¾Ð± ÑƒÑÐ¿ÐµÑ…Ðµ',
      'exitpopup.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Exit Popup',
      'tour.title': 'ÐŸÐ¾Ð¿Ð°Ð¿ Ñ‚ÑƒÑ€Ð°',
      'tour.steps': 'Ð¨Ð°Ð³Ð¸',
      'tour.step': 'Ð¨Ð°Ð³',
      'tour.question': 'Ð’Ð¾Ð¿Ñ€Ð¾Ñ',
      'tour.option': 'Ð’Ð°Ñ€Ð¸Ð°Ð½Ñ‚',
      'tour.form': 'Ð¤Ð¾Ñ€Ð¼Ð° ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð¾Ð²',
      'tour.formTitle': 'Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº Ñ„Ð¾Ñ€Ð¼Ñ‹',
      'tour.formSubtitle': 'ÐŸÐ¾Ð´Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº Ñ„Ð¾Ñ€Ð¼Ñ‹',
      'tour.name': 'ÐŸÐ»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€ Ð¸Ð¼ÐµÐ½Ð¸',
      'tour.whatsapp': 'ÐŸÐ»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€ WhatsApp',
      'tour.email': 'ÐŸÐ»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€ Email',
      'tour.time': 'ÐœÐµÑ‚ÐºÐ° Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸',
      'tour.timeOption': 'Ð’Ð°Ñ€Ð¸Ð°Ð½Ñ‚ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸',
      'tour.comment': 'ÐŸÐ»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€ ÐºÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ñ',
      'tour.consent': 'Ð¢ÐµÐºÑÑ‚ ÑÐ¾Ð³Ð»Ð°ÑÐ¸Ñ',
      'tour.submit': 'ÐšÐ½Ð¾Ð¿ÐºÐ° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸',
      'tour.thankYou': 'Ð­ÐºÑ€Ð°Ð½ Ð±Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ð½Ð¾ÑÑ‚Ð¸',
      'tour.thankTitle': 'Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº',
      'tour.thankText': 'Ð¢ÐµÐºÑÑ‚',
      'tour.thankWa': 'ÐšÐ½Ð¾Ð¿ÐºÐ° WhatsApp',
      'tour.thankProject': 'Ð¢ÐµÐºÑÑ‚ ÑÑÑ‹Ð»ÐºÐ¸ Ð½Ð° Ð¿Ñ€Ð¾ÐµÐºÑ‚',
      'tour.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð¿Ð°Ð¿ Ñ‚ÑƒÑ€Ð°',
      'social.title': 'Ð¡Ð¾Ñ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ðµ ÑÐµÑ‚Ð¸',
      'social.facebook': 'URL Facebook',
      'social.instagram': 'URL Instagram',
      'social.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ ÑÐ¾Ñ†ÑÐµÑ‚Ð¸',
      'stats.title': 'Ð¡Ñ‚Ð°Ñ‚Ð¸ÑÑ‚Ð¸ÐºÐ° ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸',
      'stats.navTitle': 'Ð¡Ñ‚Ð°Ñ‚.',
      'stats.investorsWorldwide': 'Ð˜Ð½Ð²ÐµÑÑ‚Ð¾Ñ€Ð¾Ð² Ð¿Ð¾ Ð¼Ð¸Ñ€Ñƒ',
      'stats.villasDesigned': 'Ð’Ð¸Ð»Ð»Ñ‹ Ð² Ð¿Ð¾Ñ€Ñ‚Ñ„Ð¾Ð»Ð¸Ð¾',
      'stats.occupancyRate': 'Ð—Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ð¾ÑÑ‚ÑŒ',
      'stats.founderExperience': 'ÐžÐ¿Ñ‹Ñ‚ Ñ‚Ñ€Ð°Ð½Ð·Ð°ÐºÑ†Ð¸Ð¹',
      'stats.touristArrivals': 'ÐŸÑ€Ð¸ÐµÐ·Ð´ Ñ‚ÑƒÑ€Ð¸ÑÑ‚Ð¾Ð²',
      'stats.rentalYield': 'ÐÑ€ÐµÐ½Ð´Ð½Ð°Ñ Ð´Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚ÑŒ',
      'stats.propertyGrowth': 'Ð Ð¾ÑÑ‚ ÑÑ‚Ð¾Ð¸Ð¼Ð¾ÑÑ‚Ð¸',
      'stats.paybackPeriod': 'Ð¡Ñ€Ð¾Ðº Ð¾ÐºÑƒÐ¿Ð°ÐµÐ¼Ð¾ÑÑ‚Ð¸',
      'stats.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚Ð¸ÑÑ‚Ð¸ÐºÑƒ',
      'stats.labelsTitle': 'ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ¸ Ð¿Ð¾Ð´ Ñ†Ð¸Ñ„Ñ€Ð°Ð¼Ð¸ (3 ÑÐ·Ñ‹ÐºÐ°)',
      'stats.labelsHint': 'Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ &lt;br&gt; Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿ÐµÑ€ÐµÐ½ÐµÑÑ‚Ð¸ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð½Ð° 2 ÑÑ‚Ñ€Ð¾ÐºÐ¸. ÐÐ° Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÑŽÑ‚ÑÑ Ð¿ÐµÑ€Ð²Ñ‹Ðµ 4 Ñ†Ð¸Ñ„Ñ€Ñ‹.',
      'stats.labelsSave': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸',
      'roi.title': 'ÐŸÐ°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ ROI-ÐºÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€Ð°',
      'roi.navTitle': 'ROI',
      'roi.scenarios': 'Ð¡Ñ†ÐµÐ½Ð°Ñ€Ð¸Ð¸',
      'roi.minInvestment': 'ÐœÐ¸Ð½. Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ñ ($)',
      'roi.maxInvestment': 'ÐœÐ°ÐºÑ. Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ñ ($)',
      'roi.step': 'Ð¨Ð°Ð³ ($)',
      'roi.defaultInvestment': 'Ð˜Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ñ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ ($)',
      'roi.defaultOccupancy': 'Ð—Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ð¾ÑÑ‚ÑŒ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ (%)',
      'roi.occupancyRange': 'Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ Ð·Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ð¾ÑÑ‚Ð¸ (%)',
      'roi.conservative': 'ÐšÐ¾Ð½ÑÐµÑ€Ð²Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ð¹ â€” Ð”Ð¾Ñ…Ð¾Ð´ / Ð Ð¾ÑÑ‚ (%)',
      'roi.normal': 'ÐžÐ±Ñ‹Ñ‡Ð½Ñ‹Ð¹ â€” Ð”Ð¾Ñ…Ð¾Ð´ / Ð Ð¾ÑÑ‚ (%)',
      'roi.optimistic': 'ÐžÐ¿Ñ‚Ð¸Ð¼Ð¸ÑÑ‚Ð¸Ñ‡Ð½Ñ‹Ð¹ â€” Ð”Ð¾Ñ…Ð¾Ð´ / Ð Ð¾ÑÑ‚ (%)',
      'roi.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ ROI',
      'roi.textsTitle': 'Ð¢ÐµÐºÑÑ‚Ñ‹ ÐºÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€Ð° (3 ÑÐ·Ñ‹ÐºÐ°)',
      'roi.textsHint': 'Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€ {project} Ð² titleProject â€” Ð¾Ð½ Ð·Ð°Ð¼ÐµÐ½Ð¸Ñ‚ÑÑ Ð½Ð° Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°.',
      'roi.textsSave': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ñ‚ÐµÐºÑÑ‚Ñ‹ ÐºÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€Ð°',
      'help.roi.investment': '<strong>Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¹:</strong> ÐœÐ¸Ð½/Ð¼Ð°ÐºÑ/ÑˆÐ°Ð³ Ð´Ð»Ñ ÑÐ»Ð°Ð¹Ð´ÐµÑ€Ð° Ð½Ð° Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹.',
      'help.roi.scenarios': '<strong>Ð¡Ñ†ÐµÐ½Ð°Ñ€Ð¸Ð¸:</strong> Ð¡Ñ‚Ð°Ð²ÐºÐ¸ Ð´Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚Ð¸ Ð¸ Ñ€Ð¾ÑÑ‚Ð° Ð´Ð»Ñ ÐºÐ°Ð¶Ð´Ð¾Ð³Ð¾ ÑÑ†ÐµÐ½Ð°Ñ€Ð¸Ñ.',
      'help.roi.occupancy': '<strong>Ð—Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ð¾ÑÑ‚ÑŒ:</strong> Ð¡Ñ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ð¾Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ Ð¸ Ð´Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ ÑÐ»Ð°Ð¹Ð´ÐµÑ€Ð°.',
      'analytics.title': 'ÐÐ½Ð°Ð»Ð¸Ñ‚Ð¸ÐºÐ° Ð¸ Ñ‚Ñ€ÐµÐºÐ¸Ð½Ð³',
      'analytics.tracking': 'Ð¡ÐµÑ€Ð²Ð¸ÑÑ‹ Ñ‚Ñ€ÐµÐºÐ¸Ð½Ð³Ð°',
      'analytics.seo': 'SEO-Ð²ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ',
      'analytics.ga4': 'Google Analytics 4',
      'analytics.facebookPixel': 'Facebook Pixel',
      'analytics.yandexMetrika': 'Ð¯Ð½Ð´ÐµÐºÑ ÐœÐµÑ‚Ñ€Ð¸ÐºÐ°',
      'analytics.clarity': 'Microsoft Clarity',
      'analytics.gsc': 'Google Search Console',
      'analytics.save': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ Ð°Ð½Ð°Ð»Ð¸Ñ‚Ð¸ÐºÑƒ',
      'analytics.hint.ga4': 'Measurement ID Ð¸Ð· ÑÐ²Ð¾Ð¹ÑÑ‚Ð²Ð° GA4',
      'analytics.hint.facebook': 'Pixel ID Ð¸Ð· Meta Events Manager',
      'analytics.hint.yandex': 'ÐÐ¾Ð¼ÐµÑ€ ÑÑ‡Ñ‘Ñ‚Ñ‡Ð¸ÐºÐ° Ñ metrika.yandex.ru',
      'analytics.hint.clarity': 'ID Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð° Ñ clarity.microsoft.com',
      'analytics.hint.gsc': 'ÐšÐ¾Ð´ Ð²ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ (Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ content Ð¼ÐµÑ‚Ð°-Ñ‚ÐµÐ³Ð°)',
      'help.analytics.intro': '<strong>ÐšÐ°Ðº ÑÑ‚Ð¾ Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÐµÑ‚:</strong> Ð’ÑÑ‚Ð°Ð²ÑŒÑ‚Ðµ ID Ñ‚Ñ€ÐµÐºÐµÑ€Ð¾Ð² Ð½Ð¸Ð¶Ðµ. Ð¡ÐºÑ€Ð¸Ð¿Ñ‚Ñ‹ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡Ð°ÑŽÑ‚ÑÑ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ â€” Ð¼ÐµÐ½ÑÑ‚ÑŒ ÐºÐ¾Ð´ Ð½Ðµ Ð½ÑƒÐ¶Ð½Ð¾.',
      'help.analytics.empty': '<strong>ÐŸÑƒÑÑ‚Ð¾Ðµ Ð¿Ð¾Ð»Ðµ</strong> = Ñ‚Ñ€ÐµÐºÐµÑ€ Ð¾Ñ‚ÐºÐ»ÑŽÑ‡Ñ‘Ð½. Ð—Ð°Ð¿Ð¾Ð»Ð½ÑÐ¹Ñ‚Ðµ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ñ‚Ðµ ÑÐµÑ€Ð²Ð¸ÑÑ‹, ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚Ðµ.',
      'help.analytics.events': '<strong>ÐÐ²Ñ‚Ð¾-ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ñ:</strong> Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ° Ñ„Ð¾Ñ€Ð¼ (ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚, ÐºÐ²Ð¸Ð·, Ð»Ð¸Ð´-Ð¼Ð°Ð³Ð½Ð¸Ñ‚, exit popup), ÐºÐ»Ð¸ÐºÐ¸ WhatsApp, ÑÐºÐ°Ñ‡Ð¸Ð²Ð°Ð½Ð¸Ðµ PDF.',
      'newProject.title': 'Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¾ÐµÐºÑ‚',
      'newProject.name': 'ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°',
      'newProject.slug': 'Slug',
      'newProject.slugHint': 'Ð“ÐµÐ½ÐµÑ€Ð¸Ñ€ÑƒÐµÑ‚ÑÑ Ð¸Ð· Ð¸Ð¼ÐµÐ½Ð¸, Ð¼Ð¾Ð¶Ð½Ð¾ Ñ€ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ',
      'newProject.status': 'Ð¡Ñ‚Ð°Ñ‚ÑƒÑ',
      'newProject.startingPrice': 'ÐÐ°Ñ‡Ð°Ð»ÑŒÐ½Ð°Ñ Ñ†ÐµÐ½Ð° ($)',
      'newProject.totalUnits': 'Ð’ÑÐµÐ³Ð¾ ÑŽÐ½Ð¸Ñ‚Ð¾Ð²',
      'newProject.bedrooms': 'Ð¡Ð¿Ð°Ð»ÑŒÐ½Ð¸',
      'newProject.handover': 'Ð¡Ð´Ð°Ñ‡Ð°',
      'newProject.showcaseImage': 'Ð˜Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ðµ',
      'newProject.showcaseText': 'Ð¢ÐµÐºÑÑ‚ ÐºÐ°Ñ€Ñ‚Ð¾Ñ‡ÐºÐ¸ (EN)',
      'newProject.subtitle': 'ÐšÐ¾Ñ€Ð¾Ñ‚ÐºÐ¸Ð¹ Ð¿Ð¾Ð´Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº',
      'newProject.desc': 'ÐžÐ¿Ð¸ÑÐ°Ð½Ð¸Ðµ',
      'newProject.comparisonData': 'Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ ÑÑ€Ð°Ð²Ð½ÐµÐ½Ð¸Ñ',
      'newProject.areaRange': 'Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ Ð¿Ð»Ð¾Ñ‰Ð°Ð´Ð¸',
      'newProject.landRange': 'Ð”Ð¸Ð°Ð¿Ð°Ð·Ð¾Ð½ ÑƒÑ‡Ð°ÑÑ‚ÐºÐ°',
      'newProject.pool': 'Ð‘Ð°ÑÑÐµÐ¹Ð½',
      'newProject.cancel': 'ÐžÑ‚Ð¼ÐµÐ½Ð°',
      'newProject.create': 'Ð¡Ð¾Ð·Ð´Ð°Ñ‚ÑŒ Ð¿Ñ€Ð¾ÐµÐºÑ‚',
      'newProject.nameRequired': 'Ð£ÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ',
      'newProject.slugExists': 'ÐŸÑ€Ð¾ÐµÐºÑ‚ Ñ Ñ‚Ð°ÐºÐ¸Ð¼ slug ÑƒÐ¶Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚',
      'preview.title': 'ÐŸÑ€ÐµÐ²ÑŒÑŽ',
      'common.saving': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ...',
      'common.saved': 'Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¾! Ð¡Ð°Ð¹Ñ‚ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑÑ (~1-2 Ð¼Ð¸Ð½)',
      'common.error': 'ÐžÑˆÐ¸Ð±ÐºÐ°: ',
      'common.unsavedWarn': 'Ð•ÑÑ‚ÑŒ Ð½ÐµÑÐ¾Ñ…Ñ€Ð°Ð½Ñ‘Ð½Ð½Ñ‹Ðµ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ. ÐŸÐµÑ€ÐµÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ Ð²ÐºÐ»Ð°Ð´ÐºÑƒ?',
      'auth.wrongPassword': 'ÐÐµÐ²ÐµÑ€Ð½Ñ‹Ð¹ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ.',
      'auth.userNotFound': 'ÐÐºÐºÐ°ÑƒÐ½Ñ‚ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½.',
      'auth.tooManyRequests': 'Ð¡Ð»Ð¸ÑˆÐºÐ¾Ð¼ Ð¼Ð½Ð¾Ð³Ð¾ Ð¿Ð¾Ð¿Ñ‹Ñ‚Ð¾Ðº. ÐŸÐ¾Ð¿Ñ€Ð¾Ð±ÑƒÐ¹Ñ‚Ðµ Ð¿Ð¾Ð·Ð¶Ðµ.',
      'auth.invalidEmail': 'ÐÐµÐ²ÐµÑ€Ð½Ñ‹Ð¹ email.',
      'auth.invalidCredential': 'ÐÐµÐ²ÐµÑ€Ð½Ñ‹Ð¹ email Ð¸Ð»Ð¸ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ.',
      'auth.failed': 'ÐžÑˆÐ¸Ð±ÐºÐ° Ð°ÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸.',
      'validate.wa.required': 'ÐžÐ±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ðµ Ð¿Ð¾Ð»Ðµ',
      'validate.wa.digitsOnly': 'Ð¢Ð¾Ð»ÑŒÐºÐ¾ Ñ†Ð¸Ñ„Ñ€Ñ‹ â€” Ð±ÐµÐ· +, Ð¿Ñ€Ð¾Ð±ÐµÐ»Ð¾Ð² Ð¸Ð»Ð¸ Ð´ÐµÑ„Ð¸ÑÐ¾Ð²',
      'validate.wa.tooShort': 'Ð¡Ð»Ð¸ÑˆÐºÐ¾Ð¼ ÐºÐ¾Ñ€Ð¾Ñ‚ÐºÐ¸Ð¹ â€” ÑƒÐºÐ°Ð¶Ð¸Ñ‚Ðµ ÐºÐ¾Ð´ ÑÑ‚Ñ€Ð°Ð½Ñ‹ (Ð½Ð°Ð¿Ñ€. 62...)',
      'validate.wa.tooLong': 'Ð¡Ð»Ð¸ÑˆÐºÐ¾Ð¼ Ð´Ð»Ð¸Ð½Ð½Ñ‹Ð¹ â€” Ð¼Ð°ÐºÑ. 15 Ñ†Ð¸Ñ„Ñ€',
      'validate.wa.link': 'Ð¡ÑÑ‹Ð»ÐºÐ°: wa.me/',
      'validate.phone.required': 'ÐžÐ±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ðµ Ð¿Ð¾Ð»Ðµ',
      'validate.phone.tooShort': 'Ð¡Ð»Ð¸ÑˆÐºÐ¾Ð¼ ÐºÐ¾Ñ€Ð¾Ñ‚ÐºÐ¸Ð¹',
      'time.justNow': 'Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ñ‡Ñ‚Ð¾',
      'time.mAgo': 'Ð¼ Ð½Ð°Ð·Ð°Ð´',
      'time.hAgo': 'Ñ‡ Ð½Ð°Ð·Ð°Ð´',
      'time.dAgo': 'Ð´ Ð½Ð°Ð·Ð°Ð´',
      'nav.users': 'ÐŸÐ¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ð¸',
      'users.title': 'ÐšÐ¾Ð¼Ð°Ð½Ð´Ð°',
      'users.invite': 'ÐŸÑ€Ð¸Ð³Ð»Ð°ÑÐ¸Ñ‚ÑŒ ÑƒÑ‡Ð°ÑÑ‚Ð½Ð¸ÐºÐ°',
      'users.email': 'Email',
      'users.fullName': 'Ð˜Ð¼Ñ',
      'users.role': 'Ð Ð¾Ð»ÑŒ',
      'users.send': 'ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ðµ',
      'users.list': 'ÐÐºÑ‚Ð¸Ð²Ð½Ñ‹Ðµ ÑƒÑ‡Ð°ÑÑ‚Ð½Ð¸ÐºÐ¸',
      'users.you': 'Ð²Ñ‹',
      'users.empty': 'ÐšÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¿ÑƒÑÑ‚Ð°.',
      'users.col.email': 'Email',
      'users.col.name': 'Ð˜Ð¼Ñ',
      'users.col.role': 'Ð Ð¾Ð»ÑŒ',
      'users.col.status': 'Ð¡Ñ‚Ð°Ñ‚ÑƒÑ',
      'users.col.lastSignIn': 'Ð‘Ñ‹Ð»(Ð°) Ð² ÑÐ¸ÑÑ‚ÐµÐ¼Ðµ',
      'users.col.actions': 'Ð”ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ',
      'users.role.editor': 'Editor â€” Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ð³Ð°Ð»ÐµÑ€ÐµÑ / FAQ / Ð¾Ñ‚Ð·Ñ‹Ð²Ñ‹',
      'users.role.admin': 'Admin â€” Ð²ÐµÑÑŒ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚ (Ð±ÐµÐ· ÑƒÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑÐ¼Ð¸)',
      'users.role.editor.short': 'editor',
      'users.role.admin.short': 'admin',
      'users.role.super_admin.short': 'super admin',
      'users.status.active': 'ÐÐºÑ‚Ð¸Ð²ÐµÐ½',
      'users.status.deactivated': 'ÐžÑ‚ÐºÐ»ÑŽÑ‡Ñ‘Ð½',
      'users.status.pending': 'ÐŸÑ€Ð¸Ð³Ð»Ð°ÑˆÑ‘Ð½',
      'users.action.delete': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ',
      'users.action.confirmDelete': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ {email}? Ð”ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ Ð½ÐµÐ¾Ð±Ñ€Ð°Ñ‚Ð¸Ð¼Ð¾.',
      'users.toast.sending': 'ÐžÑ‚Ð¿Ñ€Ð°Ð²ÐºÐ° Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñâ€¦',
      'users.toast.sent': 'ÐŸÑ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¾ Ð½Ð° {email}.',
      'users.toast.roleUpdated': 'Ð Ð¾Ð»ÑŒ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð°.',
      'users.toast.userDeleted': 'ÐŸÐ¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ ÑƒÐ´Ð°Ð»Ñ‘Ð½.',
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

  // â”€â”€â”€ Auth backend: Supabase (ÑÐ¼. admin/supabase-client.js) â”€â”€â”€
  // GitHub PAT Ð¸ Firebase Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÑŽÑ‚ÑÑ â€” Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¸ ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÐ¸ Ð² Supabase,
  // Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ â€” Ñ‡ÐµÑ€ÐµÐ· build pipeline Ð½Ð° Vercel (push Ð½Ðµ Ð½ÑƒÐ¶ÐµÐ½).

  // â”€â”€â”€ State â”€â”€â”€
  let currentUser = null;       // { id, email, full_name, role, is_active }
  let currentProject = 'serenity-villas';
  let projectsData = null;    // working copy of PROJECTS_DATA
  let pendingChanges = false;
  const _dirtyState = {
    projects: false, faq: false, testimonials: false, seo: false,
    colors: false, contacts: false, rate: false, exitpopup: false,
    social: false, roi: false, stats: false, guide: false,
    analytics: false,
  };
  const dirtyTabs = new Proxy(_dirtyState, {
    set(target, prop, value) {
      target[prop] = value;
      updateDirtyIndicators();
      return true;
    }
  });

  // Map dirty keys to nav tab names. Settings tab agÑ€eÐ³ate
  // contacts/rate/colors/social/roi/stats/guide.
  const _dirtyTabMap = {
    rate: 'settings', contacts: 'settings', colors: 'settings',
    social: 'settings', roi: 'settings', stats: 'settings', guide: 'settings',
  };

  function updateDirtyIndicators() {
    document.querySelectorAll('.admin-nav__btn[data-tab]').forEach(btn => {
      const tab = btn.dataset.tab;
      const isDirty = Object.entries(_dirtyState).some(([key, val]) => val && (_dirtyTabMap[key] || key) === tab);
      btn.classList.toggle('dirty', isDirty);
    });
  }

  // Ð”ÐµÐ»ÐµÐ³Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ dirty-tracking. ÐÐ° ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ðµ Ð»ÑŽÐ±Ð¾Ð¹ Ñ„Ð¾Ñ€Ð¼Ñ‹ Ð»Ð¾Ð²Ð¸Ð¼ input/change
  // Ð¸ Ð¿Ð¾Ð¼ÐµÑ‡Ð°ÐµÐ¼ Ð½ÑƒÐ¶Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡. ÐŸÐµÑ€ÐµÐ¶Ð¸Ð²Ð°ÐµÑ‚ Ñ€Ðµ-Ñ€ÐµÐ½Ð´ÐµÑ€Ñ‹ Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½Ð¾ÑÑ‚ÐµÐ¹.
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

  // â”€â”€â”€ Live Exchange Rate â”€â”€â”€
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
      valEl.textContent = 'â€”';
      timeEl.textContent = 'offline';
    }
  }

  function startRateUpdates() {
    fetchLiveRate();
    if (rateInterval) clearInterval(rateInterval);
    rateInterval = setInterval(fetchLiveRate, 3600000);
  }

  // â”€â”€â”€ DOM Refs â”€â”€â”€
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

  // â”€â”€â”€ Supabase client check â”€â”€â”€
  if (typeof window.SupabaseAdmin === 'undefined') {
    loginError.textContent = 'Auth client (supabase-client.js) Ð½Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½.';
    loginError.hidden = false;
    return;
  }

  // â”€â”€â”€ Recovery / Invite link handler â”€â”€â”€
  // Ð¡Ð¾Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ð¹ Supabase ÑˆÐ»Ñ‘Ñ‚ implicit-flow ÑÑÑ‹Ð»ÐºÐ¸:
  //   /admin/#access_token=...&refresh_token=...&type=recovery
  // SDK Ñ detectSessionInUrl=true (default) ÑÐ°Ð¼ ÑÑ‚Ð°Ð²Ð¸Ñ‚ ÑÐµÑÑÐ¸ÑŽ Ð¸ ÑÑ‚Ñ€ÐµÐ»ÑÐµÑ‚
  // ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÐµÐ¼ PASSWORD_RECOVERY â€” Ð¼Ñ‹ ÐµÐ³Ð¾ ÑÐ»ÑƒÑˆÐ°ÐµÐ¼ Ð½Ð¸Ð¶Ðµ Ð² onAuthStateChange.
  //
  // Ð¢Ð°ÐºÐ¶Ðµ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÐµÐ¼ legacy PKCE-flow (?token_hash=...&type=...) Ð½Ð° ÑÐ»ÑƒÑ‡Ð°Ð¹
  // ÑÑ‚Ð°Ñ€Ñ‹Ñ… Ð¿Ð¸ÑÐµÐ¼ â€” verifyOtp Ð²Ñ€ÑƒÑ‡Ð½ÑƒÑŽ.
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
      loginError.textContent = `Ð¡ÑÑ‹Ð»ÐºÐ° ÑƒÑÑ‚Ð°Ñ€ÐµÐ»Ð° Ð¸Ð»Ð¸ Ð½ÐµÐ´ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð°: ${error.message}`;
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
      setpwError.textContent = 'ÐŸÐ°Ñ€Ð¾Ð»Ð¸ Ð½Ðµ ÑÐ¾Ð²Ð¿Ð°Ð´Ð°ÑŽÑ‚.';
      setpwError.hidden = false;
      return;
    }
    if (pw1.length < 8) {
      setpwError.textContent = 'ÐœÐ¸Ð½Ð¸Ð¼ÑƒÐ¼ 8 ÑÐ¸Ð¼Ð²Ð¾Ð»Ð¾Ð².';
      setpwError.hidden = false;
      return;
    }
    const btn = setpwForm.querySelector('button[type="submit"]');
    btnLoading(btn, true);
    try {
      const { error } = await SupabaseAdmin.client.auth.updateUser({ password: pw1 });
      if (error) throw error;
      // Ð¡ÐµÑÑÐ¸Ñ ÑƒÐ¶Ðµ ÑÑ‚Ð¾Ð¸Ñ‚ Ð¿Ð¾ÑÐ»Ðµ verifyOtp + updateUser â†’ Ð³Ñ€ÑƒÐ·Ð¸Ð¼ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»ÑŒ Ð¸ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ð°Ð´Ð¼Ð¸Ð½ÐºÑƒ
      const ctx = await SupabaseAdmin.getCurrentUser();
      if (!ctx) throw new Error('ÐÐµ ÑƒÐ´Ð°Ð»Ð¾ÑÑŒ Ð·Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»ÑŒ');
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

  // â”€â”€â”€ Auth State â”€â”€â”€
  // SDK ÑÐ°Ð¼ Ð¾Ð±Ñ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÑ‚ hash-fragment (#access_token=...) Ð±Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ñ
  // detectSessionInUrl=true Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ. Ð”Ð»Ñ recovery Ð¾Ð½ ÑÑ‚Ñ€ÐµÐ»ÑÐµÑ‚ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÐµÐ¼
  // PASSWORD_RECOVERY Ð”Ðž Ñ‚Ð¾Ð³Ð¾ ÐºÐ°Ðº Ð¼Ñ‹ ÑƒÑÐ¿ÐµÐ²Ð°ÐµÐ¼ Ð¿Ñ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ getSession().
  // ÐŸÐ¾ÑÑ‚Ð¾Ð¼Ñƒ ÑÐ»ÑƒÑˆÐ°Ñ‚ÐµÐ»ÑŒ ÑÑ‚Ð°Ð²Ð¸Ð¼ Ð¿ÐµÑ€Ð²Ñ‹Ð¼ Ð´ÐµÐ»Ð¾Ð¼.

  SupabaseAdmin.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      inRecoveryMode = true;
      // ÐžÑ‡Ð¸ÑÑ‚Ð¸Ð¼ hash Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿Ñ€Ð¸ F5 Ð½Ðµ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€ÑÑ‚ÑŒ
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

    // Legacy PKCE flow (ÑÑ‚Ð°Ñ€Ñ‹Ðµ Ð¿Ð¸ÑÑŒÐ¼Ð° Ñ ?token_hash=...) â€” Ð¾Ð±Ñ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÐ¼ ÑÐ°Ð¼Ð¸
    const legacy = await maybeHandleLegacyToken();
    if (legacy) {
      if (authLoading) authLoading.remove();
      return;
    }

    // ÐœÐ°Ð»ÐµÐ½ÑŒÐºÐ°Ñ Ð·Ð°Ð´ÐµÑ€Ð¶ÐºÐ° Ñ‡Ñ‚Ð¾Ð±Ñ‹ SDK ÑƒÑÐ¿ÐµÐ» Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ñ‚ÑŒ hash Ð¸ ÑÑ‚Ñ€ÐµÐ»ÑŒÐ½ÑƒÑ‚ÑŒ PASSWORD_RECOVERY,
    // ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ. Ð˜Ð½Ð°Ñ‡Ðµ Ð¼Ð¾Ð¶ÐµÐ¼ showAdmin() Ð´Ð¾ Ñ‚Ð¾Ð³Ð¾ ÐºÐ°Ðº Ð¿Ð¾Ð¹Ð¼Ð°ÐµÐ¼ event.
    await new Promise(r => setTimeout(r, 50));
    if (inRecoveryMode) {
      if (authLoading) authLoading.remove();
      return; // setpwScreen ÑƒÐ¶Ðµ Ð¿Ð¾ÐºÐ°Ð·Ð°Ð½ listener'Ð¾Ð¼
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

  // â”€â”€â”€ Login Form â”€â”€â”€
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

  // â”€â”€â”€ Logout â”€â”€â”€
  $('#btn-logout').addEventListener('click', async () => {
    await SupabaseAdmin.logout();
    if (rateInterval) { clearInterval(rateInterval); rateInterval = null; }
    currentUser = null;
    loginScreen.hidden = false;
    adminApp.hidden = true;
  });

  // â”€â”€â”€ Show Admin â”€â”€â”€
  async function showAdmin() {
    adminApp.hidden = false;

    // Ð—Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ Ð²ÑÐµ 5 JSON-Ð±Ð»Ð¾ÐºÐ¾Ð² Ð¸Ð· Supabase Ð¾Ð´Ð½Ð¸Ð¼ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð¼ Ð¸ ÐºÐ»Ð°Ð´Ñ‘Ð¼
    // Ð² Ð³Ð»Ð¾Ð±Ð°Ð»Ñ‹ (SITE_DATA, PROJECTS_DATA, FAQ_DATA, TESTIMONIALS_DATA, GALLERY_DATA),
    // ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ðµ Ð¾Ð¶Ð¸Ð´Ð°ÐµÑ‚ Ð¾ÑÑ‚Ð°Ð»ÑŒÐ½Ð¾Ð¹ legacy-ÐºÐ¾Ð´ Ð°Ð´Ð¼Ð¸Ð½ÐºÐ¸.
    try {
      const all = await SupabaseAdmin.getAllContent();
      window.SITE_DATA         = all.site         || {};
      window.PROJECTS_DATA     = all.projects     || {};
      window.FAQ_DATA          = all.faq          || [];
      window.TESTIMONIALS_DATA = all.testimonials || [];
      window.GALLERY_DATA      = all.gallery      || { villas: [], estates: [], village: [] };
    } catch (err) {
      console.error('[admin] Failed to load content from Supabase:', err);
      alert('ÐÐµ ÑƒÐ´Ð°Ð»Ð¾ÑÑŒ Ð·Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ ÑÐ°Ð¹Ñ‚Ð°: ' + err.message);
      return;
    }

    // ÐŸÐ¾ÐºÐ°Ð¶ÐµÐ¼ Users-tab Ñ‚Ð¾Ð»ÑŒÐºÐ¾ super_admin'Ñƒ
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
    renderRoiForm();
    renderRoiTextsForm();
    renderStatsForm();
    populateExitPopup();
    renderProjectEditor();
    renderGallery();
    renderColorsTab();
    loadFaqData();
    loadTestimonialsData();

    // Dirty-tracking Ð´Ð»Ñ ÑÐµÐºÑ†Ð¸Ð¹ Ð±ÐµÐ· ÑÐ²Ð½Ñ‹Ñ… listener'Ð¾Ð².
    // ÐšÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ñ‹ ÑÑ‚Ð°Ð±Ð¸Ð»ÑŒÐ½Ñ‹Ðµ â€” Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸ Ð¼Ð¾Ð³ÑƒÑ‚ Ñ€Ðµ-Ñ€ÐµÐ½Ð´ÐµÑ€Ð¸Ñ‚ÑŒÑÑ.
    bindDirtyDelegate('#set-social', 'social');
    bindDirtyDelegate('#set-stats', 'stats');
    bindDirtyDelegate('#set-roi', 'roi');
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

  // â”€â”€â”€ Unsaved Changes Warning â”€â”€â”€
  window.addEventListener('beforeunload', (e) => {
    if (pendingChanges || isAnyDirty()) { e.preventDefault(); e.returnValue = ''; }
  });

  // â”€â”€â”€ Loading Button Helper â”€â”€â”€
  function btnLoading(btn, loading) {
    if (loading) {
      btn.classList.add('is-loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('is-loading');
      btn.disabled = false;
    }
  }

  // â”€â”€â”€ Tab Navigation â”€â”€â”€
  function isTabDirty(tab) {
    // Aggregate Ð²ÑÐµÑ… _dirtyState ÐºÐ»ÑŽÑ‡ÐµÐ¹, Ð¼Ð°Ð¿Ð¿ÑÑ‰Ð¸Ñ…ÑÑ Ð½Ð° ÑÑ‚Ð¾Ñ‚ tab.
    return Object.entries(_dirtyState).some(([key, val]) => val && (_dirtyTabMap[key] || key) === tab);
  }

  $$('.admin-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTab = getActiveTab();
      // Dashboard ÑÐ°Ð¼ Ð¿Ð¾ ÑÐµÐ±Ðµ Ð½Ð¸Ñ‡ÐµÐ³Ð¾ Ð½Ðµ Ñ€ÐµÐ´Ð°ÐºÑ‚Ð¸Ñ€ÑƒÐµÑ‚, Ð½Ð¾ dirty rate/contacts
      // Ð»ÐµÐ¶Ð°Ñ‚ Ð¿Ð¾Ð´ settings â€” Ð¾ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ Ð¾ÑÐ¾Ð±Ñ‹Ð¹ ÑÐ»ÑƒÑ‡Ð°Ð¹, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿Ñ€ÐµÐ´ÑƒÐ¿Ñ€ÐµÐ´Ð¸Ñ‚ÑŒ.
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

  // â”€â”€â”€ Load Projects Data â”€â”€â”€
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

    // SEO page select â€” add project pages dynamically
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

    // ÐÐµ ÑÐ±Ñ€Ð°ÑÑ‹Ð²Ð°Ñ‚ÑŒ currentProject, ÐµÑÐ»Ð¸ Ð¾Ð½ Ð²Ð°Ð»Ð¸Ð´ÐµÐ½ â€” Ð¸Ð½Ð°Ñ‡Ðµ Ð¿Ð¾ÑÐ»Ðµ New Project
    // Ð¸Ð»Ð¸ Ð¿Ð¾ÑÐ»Ðµ ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ñ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð° Ñ€ÐµÐ½Ð´ÐµÑ€Ð¸Ñ‚ÑÑ Ð½Ðµ Ñ‚Ð¾Ñ‚.
    if (!currentProject || !keys.includes(currentProject)) {
      currentProject = keys[0];
    }

    // Ð¡Ð¸Ð½Ñ…Ñ€Ð¾Ð½Ð¸Ð·Ð¸Ñ€ÑƒÐµÐ¼ active-Ñ‚Ð°Ð± Ñ currentProject (innerHTML Ð²Ñ‹ÑˆÐµ Ð²ÑÐµÐ³Ð´Ð° ÑÑ‚Ð°Ð²Ð¸Ñ‚
    // active Ð½Ð° Ð¿ÐµÑ€Ð²Ñ‹Ð¹ Ñ‚Ð°Ð± Ð¿Ð¾ Ð¸Ð½Ð´ÐµÐºÑÑƒ, Ñ‡Ñ‚Ð¾ Ð½ÐµÐ²ÐµÑ€Ð½Ð¾ Ð´Ð»Ñ Ð½Ðµ-Ð¿ÐµÑ€Ð²Ð¾Ð³Ð¾ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°).
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
        ru: 'ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð° Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð°',
      };
      return;
    }
    const left = Math.max(0, (p.availability.total || 0) - (p.availability.sold || 0));
    const total = p.availability.total || 0;
    p.showcaseAvailability = {
      en: left + ' of ' + total + ' units available',
      ru: 'Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾ ' + left + ' Ð¸Ð· ' + total,
    };
  }

  // â”€â”€â”€ Dashboard â”€â”€â”€
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
      const priceRange = minPrice === maxPrice ? fmtPrice(minPrice) : fmtPrice(minPrice) + ' â€“ ' + fmtPrice(maxPrice);

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
      // Ð§Ð¸Ñ‚Ð°ÐµÐ¼ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ðµ 5 Ð·Ð°Ð¿Ð¸ÑÐµÐ¹ Ð¸Ð· audit_log (Supabase RLS Ð¾Ñ‚Ñ„Ð¸Ð»ÑŒÑ‚Ñ€ÑƒÐµÑ‚
      // Ð¿Ð¾ Ñ€Ð¾Ð»Ð¸: super_admin Ð²Ð¸Ð´Ð¸Ñ‚ Ð²ÑÑ‘, Ð¾ÑÑ‚Ð°Ð»ÑŒÐ½Ñ‹Ðµ â€” ÑÐ²Ð¾Ð¸).
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
        const msg = `${c.action}${c.target ? ' Â· ' + c.target : ''}${c.user_email ? ' (' + c.user_email + ')' : ''}`;
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

  // â”€â”€â”€ Project Editor â”€â”€â”€
  function renderProjectEditor() {
    if (!projectsData) return;
    const editor = $('#project-editor');
    const p = projectsData[currentProject];
    if (!p) return;

    let html = '';

    // Project Status + Availability (merged)
    const canEditSold = !p.units && p.unitTypes;
    if (p.units) {
      p.availability.sold = p.units.filter(u => u.status === 'sold').length;
      p.availability.total = p.units.length;
    } else if (p.unitTypes) {
      p.availability.total = p.unitTypes.reduce((s, ut) => s + ut.count, 0);
    }
    syncShowcaseAvailability(p);
    const availPct = p.availability.total ? Math.round(p.availability.sold / p.availability.total * 100) : 0;
    const isAllSold = p.units ? p.units.every(u => u.status === 'sold') : (p.availability.sold >= p.availability.total);
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
          <td data-label="${t('projects.unit')}"><input type="text" data-unit="${i}" data-field="id" class="unit-text" value="${escAttr(u.id)}" style="width:48px"></td>
          <td data-label="${t('projects.type')}"><select data-unit="${i}" data-field="type" class="unit-text-sel">
            ${['1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', '5 Bedroom'].map(v => `<option value="${v}"${u.type === v ? ' selected' : ''}>${v}</option>`).join('')}
          </select></td>
          <td data-label="${t('projects.floors')}"><input type="number" data-unit="${i}" data-field="floors" class="unit-text" value="${u.floors}" style="width:48px" min="1" max="5"></td>
          <td data-label="${t('projects.area')}"><div class="unit-suffix"><input type="number" data-unit="${i}" data-field="area" class="unit-text" value="${parseFloat(u.area) || ''}" style="width:56px" min="0" step="1"><span>mÂ²</span></div></td>
          <td data-label="${t('projects.land')}"><div class="unit-suffix"><input type="number" data-unit="${i}" data-field="land" class="unit-text" value="${parseFloat(u.land) || ''}" style="width:56px" min="0" step="0.01"><span>are</span></div></td>
          <td data-label="${t('projects.badge')}"><select data-unit="${i}" data-field="badge" class="unit-badge">
            ${[['', 'â€”'], ['Premium', 'Premium'], ['Front Row', 'Front Row'], ['Large Plot', 'Large Plot'], ['Corner', 'Corner'], ['Last Unit', 'Last Unit'], ['Best Seller', 'Best Seller']].map(([v, l]) => `<option value="${v}"${(u.badge || '') === v ? ' selected' : ''}>${l}</option>`).join('')}
          </select></td>
          <td data-label="${t('projects.status')}"><select data-unit="${i}" data-field="status" class="unit-status">
            <option value="available"${u.status === 'available' ? ' selected' : ''}>${t('dash.available')}</option>
            <option value="sold"${u.status === 'sold' ? ' selected' : ''}>${t('dash.sold')}</option>
          </select></td>
          <td data-label="${t('projects.price')}"><input type="number" data-unit="${i}" data-field="price" class="unit-price" value="${u.price || ''}" placeholder="â€”" min="0" step="1000"></td>
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
          <td data-label="${t('projects.area')}"><div class="unit-suffix"><input type="number" data-utype="${i}" data-field="area" class="utype-text" value="${parseFloat(ut.area) || ''}" style="width:56px" min="0" step="1"><span>mÂ²</span></div></td>
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
      p.compPool = { en: p.compPool || '', ru: '' };
    }
    html += `<div class="editor-section"><h3>${t('projects.projectDetails')}</h3>
      <div class="form-grid--3">
        <div class="form-group"><label>${t('projects.startingPrice')}</label><input type="number" id="pd-startingPrice" value="${p.startingPrice || ''}" min="0" step="1000"></div>
        <div class="form-group"><label>${t('projects.bedrooms')}</label><input type="text" id="pd-bedrooms" value="${p.bedrooms || ''}" placeholder="2â€“3"></div>
        <div class="form-group"><label>${t('projects.handover')}</label><input type="text" id="pd-handover" value="${p.handover || ''}" placeholder="Q2 2026"></div>
      </div>
      <div class="form-grid--3">
        <div class="form-group"><label>${t('projects.compArea')}</label><input type="text" id="pd-compArea" value="${p.compArea || ''}" placeholder="167â€“210 mÂ²"></div>
        <div class="form-group"><label>${t('projects.compLand')}</label><input type="text" id="pd-compLand" value="${p.compLand || ''}" placeholder="2â€“3 are"></div>
        <div class="form-group"><label>${t('projects.totalUnits')}</label><input type="number" id="pd-totalUnits" value="${p.totalUnits || ''}" min="1"></div>
      </div>
      <div class="form-grid">
        <div class="form-group"><label>${t('projects.compPool')} (EN)</label><input type="text" class="pd-compPool" data-lang="en" value="${p.compPool.en || ''}" placeholder="Private"></div>
        <div class="form-group"><label>${t('projects.compPool')} (RU)</label><input type="text" class="pd-compPool" data-lang="ru" value="${p.compPool.ru || ''}" placeholder="ÐŸÑ€Ð¸Ð²Ð°Ñ‚Ð½Ñ‹Ð¹"></div>
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
      const typeAttr = escAttr(type);
      const typeText = escapeHtml(type);
      html += `<div class="fp-type" data-plan-type="${typeAttr}">
        <div class="fp-type__header">
          <div class="fp-type__order">
            <button class="btn--icon fp-move-up" data-type="${typeAttr}" title="Move up"${planTypes.indexOf(type) === 0 ? ' disabled' : ''}>&#9650;</button>
            <button class="btn--icon fp-move-down" data-type="${typeAttr}" title="Move down"${planTypes.indexOf(type) === planTypes.length - 1 ? ' disabled' : ''}>&#9660;</button>
          </div>
          <span class="fp-type__name" data-rename="${typeAttr}" title="Click to rename">${typeText} <span class="fp-type__rename-icon">âœŽ</span></span>
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
            <div class="fp-floor__preview">${path ? `<img src="${escAttr(previewImageUrl(path))}" alt="${escAttr(type + ' â€” ' + floor)}">` : `<span class="fp-floor__empty">No image</span>`}</div>
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

    // Hero Stats (4 languages)
    html += `<div class="editor-section"><h3>${t('projects.heroStats')}</h3>`;
    ['en', 'ru'].forEach(lng => {
      const stats = (p.heroStats && p.heroStats[lng]) || [];
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="hero-stats-grid">`;
      stats.forEach((s, i) => {
        html += `<div class="hero-stat-field">
          <div class="form-group"><label>${t('projects.number')}</label><input type="text" data-lang="${lng}" data-stat="${i}" data-field="number" class="stat-input" value="${escAttr(s.number)}"></div>
          <div class="form-group"><label>${t('projects.label')}</label><input type="text" data-lang="${lng}" data-stat="${i}" data-field="label" class="stat-input" value="${escAttr(s.label)}"></div>
        </div>`;
      });
      html += '</div></div>';
    });
    html += '</div>';

    // Showcase Text (4 languages)
    html += `<div class="editor-section"><h3>${t('projects.showcaseCard')}</h3>`;
    ['en', 'ru'].forEach(lng => {
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="form-group"><label>${t('projects.positioning')}</label><input type="text" class="showcase-input" data-lang="${lng}" data-field="positioning" value="${escAttr((p.positioning && p.positioning[lng]) || '')}" placeholder="${t('projects.positioningPh')}"></div>
        <div class="form-group"><label>${t('projects.description')}</label><textarea class="showcase-input" data-lang="${lng}" data-field="showcaseDesc" rows="2">${escapeHtml((p.showcaseDesc && p.showcaseDesc[lng]) || '')}</textarea></div>
      </div>`;
    });
    html += '</div>';

    // Decision Guide â€” cell shown on projects.html catalog page
    // Ensure structure exists so the editor has values to show
    if (!p.decisionGuide) {
      p.decisionGuide = {
        icon: 'yield',
        question: { en: '', ru: '' },
        benefit: { en: '', ru: '' }
      };
    }
    if (!p.decisionGuide.question) p.decisionGuide.question = { en: '', ru: '' };
    if (!p.decisionGuide.benefit) p.decisionGuide.benefit = { en: '', ru: '' };
    const dgIconOptions = [
      ['yield',    t('projects.decisionGuideIconYield')],
      ['land',     t('projects.decisionGuideIconLand')],
      ['cashflow', t('projects.decisionGuideIconCashflow')]
    ];
    html += `<div class="editor-section"><h3>${t('projects.decisionGuide')}</h3>
      <small class="field-hint">${t('projects.decisionGuideHint')}</small>
      <div class="form-group">
        <label>${t('projects.decisionGuideIcon')}</label>
        <select id="dg-icon">
          ${dgIconOptions.map(([v, l]) => `<option value="${v}"${p.decisionGuide.icon === v ? ' selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>`;
    ['en', 'ru'].forEach(lng => {
      html += `<div style="margin-bottom:16px"><div class="hero-stat-field__lang">${lng.toUpperCase()}</div>
        <div class="form-group"><label>${t('projects.decisionGuideQuestion')}</label><input type="text" class="dg-input" data-lang="${lng}" data-field="question" value="${escAttr(p.decisionGuide.question[lng] || '')}" placeholder="${t('projects.decisionGuideQuestionPh')}"></div>
        <div class="form-group"><label>${t('projects.decisionGuideBenefit')}</label><input type="text" class="dg-input" data-lang="${lng}" data-field="benefit" value="${escAttr(p.decisionGuide.benefit[lng] || '')}" placeholder="${t('projects.decisionGuideBenefitPh')}"></div>
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

    // Bind change events â€” unit fields
    editor.querySelectorAll('.unit-text').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = +inp.dataset.unit;
        const field = inp.dataset.field;
        if (field === 'floors') {
          p.units[idx][field] = +inp.value;
        } else if (field === 'area') {
          p.units[idx][field] = inp.value ? inp.value + ' mÂ²' : '';
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
          p.unitTypes[idx][field] = inp.value ? inp.value + ' mÂ²' : '';
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
        if (!p[field] || typeof p[field] !== 'object') p[field] = { en: '', ru: '' };
        p[field][lng] = inp.value;
        markChanged();
      });
    });

    // Decision Guide bindings
    const dgIconSel = $('#dg-icon');
    if (dgIconSel) {
      dgIconSel.addEventListener('change', () => {
        if (!p.decisionGuide) p.decisionGuide = { icon: 'yield', question: { en: '', ru: '' }, benefit: { en: '', ru: '' } };
        p.decisionGuide.icon = dgIconSel.value;
        markChanged();
      });
    }
    editor.querySelectorAll('.dg-input').forEach(inp => {
      inp.addEventListener('input', () => {
        if (!p.decisionGuide) p.decisionGuide = { icon: 'yield', question: { en: '', ru: '' }, benefit: { en: '', ru: '' } };
        const field = inp.dataset.field;
        const lng = inp.dataset.lang;
        if (!p.decisionGuide[field]) p.decisionGuide[field] = { en: '', ru: '' };
        p.decisionGuide[field][lng] = inp.value;
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
        if (!p.compPool || typeof p.compPool === 'string') p.compPool = { en: '', ru: '' };
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
          const result = await commitFile(path, null, `Add floor plan: ${type} â€” ${floor} (${p.name})`, null, base64);
          // Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÑÐµÐ¼ CDN-URL Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÑÐ°Ð¹Ñ‚ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°Ð» ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÑƒ Ð½Ð°Ð¿Ñ€ÑÐ¼ÑƒÑŽ Ñ Storage.
          p.floorPlans[type].floors[floor] = (result && result.url) || path;
          inp.closest('.fp-floor').querySelector('.fp-floor__preview').innerHTML =
            `<img src="${resized}" alt="${type} â€” ${floor}">`;
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
        if (!confirm(`Remove image for "${type} â€” ${floor}"?`)) return;
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
        const name = prompt('Plan type name (e.g. "Type A â€” 2BR Villa"):');
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

    // Generate Pages button removed â€” landing pages Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÑŽÑ‚ÑÑ Ð²Ñ€ÑƒÑ‡Ð½ÑƒÑŽ (ÑÐ¼. Ð½Ð¸Ð¶Ðµ).
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

  // â”€â”€â”€ Publish â”€â”€â”€
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
    // Rebuild the JS file â€” copy all projects + global fields
    const data = {};
    getProjectKeys().forEach(key => {
      data[key] = projectsData[key];
    });

    // Copy global fields
    const globalKeys = ['comparisonLabels', 'unitTableHeaders', 'statusLabels', 'availabilityLabels'];
    globalKeys.forEach(gk => { if (projectsData[gk]) data[gk] = projectsData[gk]; });

    return '/* eslint-disable */\nconst PROJECTS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  }

  // â”€â”€â”€ SEO Editor â”€â”€â”€
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

    // Save button â€” use onclick to avoid stacking listeners on re-render
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

  // â”€â”€â”€ Gallery Manager â”€â”€â”€
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
    // ÐžÑÐ²Ð¾Ð±Ð¾Ð¶Ð´Ð°ÐµÐ¼ blob URL Ð¿Ñ€ÐµÐ´Ñ‹Ð´ÑƒÑ‰ÐµÐ³Ð¾ Ñ€ÐµÐ½Ð´ÐµÑ€Ð°, Ð¸Ð½Ð°Ñ‡Ðµ ÑƒÑ‚ÐµÑ‡ÐºÐ°.
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
    // ÐŸÐ¾ÑÐ»Ðµ Ñ‚Ð¾Ð³Ð¾ ÐºÐ°Ðº Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€ Ð·Ð°Ð´ÐµÐºÐ¾Ð´Ð¸Ñ‚ ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÑƒ â€” blob URL Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½Ðµ Ð½ÑƒÐ¶ÐµÐ½.
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

    // ÐžÑÐ²Ð¾Ð±Ð¾Ð¶Ð´Ð°ÐµÑ‚ Ð²ÑÐµ blob URL Ð²Ð½ÑƒÑ‚Ñ€Ð¸ Ð¿Ñ€ÐµÐ²ÑŒÑŽ â€” Ð½Ð° ÑÐ»ÑƒÑ‡Ð°Ð¹ ÐµÑÐ»Ð¸ onload Ð½Ðµ ÑƒÑÐ¿ÐµÐ».
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
    // Build folder from project slug: "villas" â†’ "serenity-villas" â†’ "images/serenity-villas"
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
        galleryProgress.innerHTML += `<div style="color:var(--color-danger);font-size:0.8rem">Failed: ${escAttr(file.name)} â€” ${err.message}</div>`;
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

  // â”€â”€â”€ Storage / Content Adapter (Supabase) â”€â”€â”€
  // Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÑÐµÐ¼ legacy-ÑÐ¸Ð³Ð½Ð°Ñ‚ÑƒÑ€Ñ‹ fetchFile / commitFile / deleteFile, Ñ‡Ñ‚Ð¾Ð±Ñ‹
  // Ð½Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð²Ñ‹Ð·Ð¾Ð²Ñ‹ Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ñ„Ð°Ð¹Ð»Ñƒ. Ð’Ð½ÑƒÑ‚Ñ€Ð¸ Ð¼Ð°Ð¿Ð¿Ð¸Ð¼ Ð½Ð° SupabaseAdmin.
  //
  // ÐœÐ°Ð¿Ð¿Ð¸Ð½Ð³ path â†’ key (Ð´Ð»Ñ site_content table):
  //   data/site-data.js         â†’ 'site'
  //   data/projects-data.js     â†’ 'projects'
  //   data/faq-data.js          â†’ 'faq'
  //   data/testimonials-data.js â†’ 'testimonials'
  //   gallery-data.js           â†’ 'gallery'
  //   images/<project>/<file>   â†’ Storage upload Ð² gallery/<project>/<file>
  //   *.html                    â†’ SEO tab Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ð¾ Ð¾Ñ‚ÐºÐ»ÑŽÑ‡Ñ‘Ð½ (ÑÐ¼. saveAllSEO)
  //   assets/*.pdf              â†’ Storage upload Ð² assets/<file>

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

  // Ð›ÑŽÐ±Ð¾Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÐ¸ (legacy Ð¾Ñ‚Ð½Ð¾ÑÐ¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ð¹ Ð¿ÑƒÑ‚ÑŒ Ð¸Ð»Ð¸ CDN URL) â†’
  // Ð°Ð±ÑÐ¾Ð»ÑŽÑ‚Ð½Ñ‹Ð¹ URL Ð´Ð»Ñ <img src>. Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ Ð²Ð¾ Ð²ÑÐµÑ… Ð°Ð´Ð¼Ð¸Ð½-Ð¿Ñ€ÐµÐ²ÑŒÑŽ.
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
    // images/<project>/plans/<name>      â†’ plans/<project>/<name>
    // images/testimonials/<name>         â†’ testimonials/<name>
    // images/<project>/<name>            â†’ gallery/<project>/<name>
    // assets/<file>                      â†’ assets/<file>
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

  // ÐŸÐ°Ñ€ÑÐ¸Ñ‚ content Ð²Ð¸Ð´Ð° `const X = {...};` Ð¸ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÑ‚ Ð¾Ð±ÑŠÐµÐºÑ‚.
  // Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ ÐºÐ¾Ð³Ð´Ð° legacy-ÐºÐ¾Ð´ ÑÐ¾Ð±Ð¸Ñ€Ð°ÐµÑ‚ Ñ‚ÐµÐºÑÑ‚ Ñ„Ð°Ð¹Ð»Ð° Ð¿ÐµÑ€ÐµÐ´ commit'Ð¾Ð¼.
  // ÐšÐ¾Ð½Ñ‚ÐµÐ½Ñ‚ Ð²ÑÐµÐ³Ð´Ð° Ñ„Ð¾Ñ€Ð¼Ð¸Ñ€ÑƒÐµÑ‚ÑÑ Ñ‡ÐµÑ€ÐµÐ· JSON.stringify, Ð¿Ð¾ÑÑ‚Ð¾Ð¼Ñƒ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾
  // Ð¿Ð°Ñ€ÑÐ¸Ñ‚ÑŒ Ñ‡ÐµÑ€ÐµÐ· JSON.parse â€” Function/eval Ð·Ð°Ð¿Ñ€ÐµÑ‰ÐµÐ½Ñ‹ CSP Ð°Ð´Ð¼Ð¸Ð½ÐºÐ¸.
  function parseDataFileContent(content) {
    // Ð¡Ñ‚Ñ€Ð¸Ð¿Ð°ÐµÐ¼ Ð²ÑÐµ Ð²ÐµÐ´ÑƒÑ‰Ð¸Ðµ comment-Ð±Ð»Ð¾ÐºÐ¸ (build-data.mjs Ð¿Ð¸ÑˆÐµÑ‚ 2-3 Ð¿Ð¾Ð´Ñ€ÑÐ´),
    // Ð¿Ð¾Ñ‚Ð¾Ð¼ Ð¾Ð±Ñ‘Ñ€Ñ‚ÐºÑƒ `const X = ` Ð¸ Ð·Ð°Ð²ÐµÑ€ÑˆÐ°ÑŽÑ‰Ð¸Ð¹ `;`.
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
    // Legacy GitHub API Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°Ð» { content, sha }. Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ Ð² Ð¾ÑÐ½Ð¾Ð²Ð½Ð¾Ð¼
    // Ð´Ð»Ñ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ SHA Ð¿ÐµÑ€ÐµÐ´ PUT. Ð¡ Supabase SHA Ð½Ðµ Ð½ÑƒÐ¶ÐµÐ½ â€” Ð¾Ñ‚Ð´Ð°Ñ‘Ð¼ stub.
    // Ð”Ð»Ñ HTML-Ñ„Ð°Ð¹Ð»Ð¾Ð² (SEO tab) Ð´Ð¾Ð±Ð°Ð²Ð¸Ð¼ ÑÐ²Ð½Ñ‹Ð¹ throw â€” saveAllSEO ÐµÐ³Ð¾ Ð¿Ð¾Ð¹Ð¼Ð°ÐµÑ‚.
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
      // ÐŸÐ¸ÑˆÐµÐ¼ audit log Ð´Ð»Ñ ÐºÑ€ÑƒÐ¿Ð½Ñ‹Ñ… Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¹
      SupabaseAdmin.logAudit('content.update', key, { message: message || null });
      return { ok: true };
    }

    // 3) HTML files (SEO tab) â€” Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ð¾ Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾
    if (/\.html$/.test(path)) {
      throw new Error('SEO HTML editing is temporarily disabled. Coming back soon.');
    }

    throw new Error(`commitFile: unsupported path "${path}"`);
  }

  async function deleteFile(path, sha, message) {
    // ÐŸÐ¾Ð»Ð½Ñ‹Ð¹ CDN URL Supabase â€” Ð¾Ñ‚Ð´Ð°Ñ‘Ð¼ deleteImage Ð½Ð°Ð¿Ñ€ÑÐ¼ÑƒÑŽ, Ð¾Ð½ Ð²Ñ‹ÐºÑƒÑÐ¸Ñ‚ path.
    if (/\/storage\/v1\/object\/public\/images\//.test(path)) {
      await SupabaseAdmin.deleteImage(path);
      return { ok: true };
    }
    const storagePath = pathToStoragePath(path);
    if (storagePath) {
      await SupabaseAdmin.deleteImage(storagePath);
      return { ok: true };
    }
    // HTML files etc. â€” Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½Ðµ ÑƒÐ´Ð°Ð»ÑÐµÐ¼ Ñ‡ÐµÑ€ÐµÐ· Ð°Ð´Ð¼Ð¸Ð½ÐºÑƒ
    throw new Error(`deleteFile: unsupported path "${path}"`);
  }

  // GitHub rate limit / Actions deploy poller â€” Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½Ðµ Ð½ÑƒÐ¶Ð½Ñ‹.
  // Vercel deploy Ð·Ð°Ð¿ÑƒÑÐºÐ°ÐµÑ‚ÑÑ webhook'Ð¾Ð¼ Ð¸Ð· Supabase Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð¿Ð¾ÑÐ»Ðµ
  // setContent. UI-ÑÑ‚Ñ€ÐµÐ»ÐºÐ° Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑÐ° Ð´ÐµÐ¿Ð»Ð¾Ñ Ð¿Ð¾ÐºÐ° ÑÐºÑ€Ñ‹Ñ‚Ð°.
  function updateRateLimit() {
    const el = $('#rate-limit');
    if (el) el.textContent = '';
    const ds = $('#deploy-status');
    if (ds) ds.hidden = true;
  }

  // â”€â”€â”€ Removed: Generate Detail Pages (buildDetailPage / PAGE_LABELS / getLangConfigs / addGeneratePagesButton) â”€â”€â”€
  // Project landing pages (project-*.html Ã— 3 languages) Ñ‚ÐµÐ¿ÐµÑ€ÑŒ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÑŽÑ‚ÑÑ
  // Ð²Ñ€ÑƒÑ‡Ð½ÑƒÑŽ Ñ‡ÐµÑ€ÐµÐ· Cursor/Claude â€” ÑÑ‚Ð¾ Ð»ÑƒÑ‡ÑˆÐµ Ð´Ð»Ñ SEO (custom titles, descriptions,
  // service cards, Trust block, Place section Ð¸ Ñ‚.Ð´. â€” Ð²ÑÐµ Ñ€ÑƒÑ‡Ð½Ñ‹Ðµ Ð¾Ð¿Ñ‚Ð¸Ð¼Ð¸Ð·Ð°Ñ†Ð¸Ð¸).
  // ÐšÐ½Ð¾Ð¿ÐºÐ° "Generate Pages" Ð² Ñ€ÐµÐ´Ð°ÐºÑ‚Ð¾Ñ€Ðµ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð° Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½Ðµ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÑ‚ÑÑ.


  // â”€â”€â”€ New Project Modal â”€â”€â”€
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
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.bedrooms')}</label><input type="text" id="np-bedrooms" placeholder="2â€“3"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.handover')}</label><input type="text" id="np-handover" placeholder="Q1 2028"></div>
            <div class="form-group" style="flex:1;min-width:140px"><label>${t('newProject.showcaseImage')}</label><input type="text" id="np-image" placeholder="images/project/hero.webp"></div>
          </div>
          <h3 style="margin-top:16px">${t('newProject.showcaseText')}</h3>
          <div class="form-group"><label>${t('newProject.subtitle')}</label><input type="text" id="np-subtitle" placeholder="12 modern villas with jungle views"></div>
          <div class="form-group"><label>${t('newProject.desc')}</label><textarea id="np-desc" rows="2" placeholder="Full description for projects page"></textarea></div>
          <h3 style="margin-top:16px">${t('newProject.comparisonData')}</h3>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div class="form-group" style="flex:1;min-width:120px"><label>${t('newProject.areaRange')}</label><input type="text" id="np-area" placeholder="100â€“200 mÂ²"></div>
            <div class="form-group" style="flex:1;min-width:120px"><label>${t('newProject.landRange')}</label><input type="text" id="np-land" placeholder="2â€“3 are"></div>
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
      const bedrooms = $('#np-bedrooms').value || '1â€“2';
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
          ru: [{ strong: String(totalUnits), label: 'Ð’Ð¸Ð»Ð»' }, { strong: bedrooms, label: 'Ð¡Ð¿Ð°Ð»ÑŒÐ½Ð¸' }, { strong: handover || status, label: handover ? 'Ð¡Ð´Ð°Ñ‡Ð°' : 'Ð¡Ñ‚Ð°Ñ‚ÑƒÑ' }],
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
            { number: String(totalUnits), label: 'Ð’Ð¸Ð»Ð»' },
            { number: handover || bedrooms, label: handover ? 'Ð¡Ð´Ð°Ñ‡Ð°' : 'Ð¡Ð¿Ð°Ð»ÑŒÐ½Ð¸' },
            { number: price ? '$' + (price / 1000 | 0) + 'K+' : '', label: 'ÐžÑ‚' }
          ],
        },
        availability: { sold: 0, total: totalUnits },
        showcaseStatus: {
          en: status === 'pre-sale' ? 'Pre-Sale' : status === 'completed' ? 'Completed' : 'In Progress',
          ru: status === 'pre-sale' ? 'ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð°' : status === 'completed' ? 'Ð—Ð°Ð²ÐµÑ€ÑˆÑ‘Ð½' : 'Ð¡Ñ‚Ñ€Ð¾Ð¸Ñ‚ÑÑ',
        },
        positioning: {
          en: 'Investment Opportunity',
          ru: 'Ð˜Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¾Ð½Ð½Ð°Ñ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ÑŒ',
        },
        showcaseAvailability: {
          en: status === 'pre-sale' ? 'Pre-Sale Open' : totalUnits + ' of ' + totalUnits + ' units available',
          ru: status === 'pre-sale' ? 'ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð° Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð°' : 'Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾ ' + totalUnits + ' Ð¸Ð· ' + totalUnits,
        },
        showcaseDesc: { en: desc, ru: desc },
        showcaseCta: { en: 'View Details', ru: 'ÐŸÐ¾Ð´Ñ€Ð¾Ð±Ð½ÐµÐµ' },
        decisionGuide: {
          icon: 'yield',
          question: {
            en: 'Interested in ' + name + '?',
            ru: 'Ð˜Ð½Ñ‚ÐµÑ€ÐµÑÐµÐ½ ' + name + '?',
          },
          benefit: {
            en: bedrooms ? bedrooms + ' bedrooms' : 'premium villas',
            ru: bedrooms ? bedrooms + ' ÑÐ¿Ð°Ð»ÐµÐ½' : 'Ð¿Ñ€ÐµÐ¼Ð¸ÑƒÐ¼-Ð²Ð¸Ð»Ð»Ñ‹',
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
          en: 'Pre-Sale Now Open â€” Register Your Interest Today',
          ru: 'ÐŸÑ€ÐµÐ´Ð¿Ñ€Ð¾Ð´Ð°Ð¶Ð° Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð° â€” Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ Ð²Ð°Ñˆ Ð¸Ð½Ñ‚ÐµÑ€ÐµÑ',
        };
      }

      // Add to data
      projectsData[slug] = proj;
      currentProject = slug;
      markChanged();

      // Rebuild UI â€” buildDynamicUI() ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÑ‚ currentProject Ð¸ ÑÑ‚Ð°Ð²Ð¸Ñ‚
      // active-Ñ‚Ð°Ð± Ð½Ð° Ð½ÑƒÐ¶Ð½Ñ‹Ð¹ Ð¿Ñ€Ð¾ÐµÐºÑ‚ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸.
      buildDynamicUI();
      renderDashboard();
      renderProjectEditor();

      modal.remove();
    });
  }

  // â”€â”€â”€ Investment Guide PDF Upload â”€â”€â”€
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

  // â”€â”€â”€ Contact Info Editor â”€â”€â”€
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
    // Attach live validation. Guard Ð¾Ñ‚ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾Ð³Ð¾ Ð½Ð°Ð²ÐµÑˆÐ¸Ð²Ð°Ð½Ð¸Ñ â€”
    // renderContactsForm Ð¼Ð¾Ð¶ÐµÑ‚ Ð²Ñ‹Ð·Ñ‹Ð²Ð°Ñ‚ÑŒÑÑ Ð¿Ñ€Ð¸ ÐºÐ°Ð¶Ð´Ð¾Ð¼ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‚Ðµ Ð½Ð° Settings Ñ‚Ð°Ð±.
    const waInput = $('#contact-whatsapp');
    if (waInput && !waInput.dataset.bound) {
      waInput.dataset.bound = '1';
      waInput.addEventListener('input', updateWaPreview);
      waInput.addEventListener('paste', () => setTimeout(updateWaPreview, 0));
    }
    updateWaPreview();

    // Track contacts changes (Ð¾Ð´Ð¸Ð½ Ñ€Ð°Ð· Ð½Ð° Ð¸Ð½Ð¿ÑƒÑ‚)
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

  // â”€â”€â”€ Social Media â”€â”€â”€
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

  // â”€â”€â”€ ROI Calculator Settings â”€â”€â”€
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
      // Preserve any pending text edits in the open lang pane
      try { captureRoiTextsPane(); } catch (e) {}
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
      dirtyTabs.roi = false;
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // â”€â”€â”€ ROI Calculator Texts (i18n) â”€â”€â”€
  const ROI_TEXT_KEYS = [
    { key: 'tag', label: 'Tag (eyebrow)' },
    { key: 'title', label: 'Title â€” Homepage' },
    { key: 'titleProject', label: 'Title â€” Project page (use {project})' },
    { key: 'subtitle', label: 'Subtitle â€” Homepage' },
    { key: 'subtitleProject', label: 'Subtitle â€” Project page' },
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
    { key: 'ctaHome', label: 'CTA button â€” Homepage' },
    { key: 'ctaProject', label: 'CTA button â€” Project page' },
  ];
  const ROI_TEXT_DEFAULTS = {
    en: { tag: 'Investment Calculator', title: 'Calculate Your Returns', titleProject: 'Calculate Returns for {project}', subtitle: 'See the potential of your Bali real estate investment', subtitleProject: 'See the potential income from your investment in this project', investmentLabel: 'Investment Amount', scenarioLabel: 'Scenario', conservative: 'Conservative', normal: 'Normal', optimistic: 'Optimistic', yieldSuffix: 'yield', occupancyLabel: 'Occupancy Rate', annualIncome: 'Annual Rental Income', return5y: '5-Year Total Return', return10y: '10-Year Total Return', disclaimer: '*Projections based on current market data. Actual returns may vary.', ctaHome: 'Discuss Your Investment', ctaProject: 'Schedule a Private Tour' },
    ru: { tag: 'Ð˜Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¾Ð½Ð½Ñ‹Ð¹ ÐºÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€', title: 'Ð Ð°ÑÑÑ‡Ð¸Ñ‚Ð°Ð¹Ñ‚Ðµ Ð´Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚ÑŒ', titleProject: 'Ð Ð°ÑÑÑ‡Ð¸Ñ‚Ð°Ð¹Ñ‚Ðµ Ð´Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚ÑŒ {project}', subtitle: 'ÐžÑ†ÐµÐ½Ð¸Ñ‚Ðµ Ð¿Ð¾Ñ‚ÐµÐ½Ñ†Ð¸Ð°Ð» Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¹ Ð² Ð½ÐµÐ´Ð²Ð¸Ð¶Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Ð½Ð° Ð‘Ð°Ð»Ð¸', subtitleProject: 'ÐžÑ†ÐµÐ½Ð¸Ñ‚Ðµ Ð¿Ð¾Ñ‚ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ð´Ð¾Ñ…Ð¾Ð´ Ð¾Ñ‚ Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¹ Ð² ÑÑ‚Ð¾Ñ‚ Ð¿Ñ€Ð¾ÐµÐºÑ‚', investmentLabel: 'Ð¡ÑƒÐ¼Ð¼Ð° Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¹', scenarioLabel: 'Ð¡Ñ†ÐµÐ½Ð°Ñ€Ð¸Ð¹', conservative: 'ÐšÐ¾Ð½ÑÐµÑ€Ð²Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ð¹', normal: 'ÐžÐ±Ñ‹Ñ‡Ð½Ñ‹Ð¹', optimistic: 'ÐžÐ¿Ñ‚Ð¸Ð¼Ð¸ÑÑ‚Ð¸Ñ‡Ð½Ñ‹Ð¹', yieldSuffix: 'Ð´Ð¾Ñ…Ð¾Ð´Ð½Ð¾ÑÑ‚ÑŒ', occupancyLabel: 'Ð—Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ð¾ÑÑ‚ÑŒ', annualIncome: 'Ð“Ð¾Ð´Ð¾Ð²Ð¾Ð¹ Ð´Ð¾Ñ…Ð¾Ð´ Ð¾Ñ‚ Ð°Ñ€ÐµÐ½Ð´Ñ‹', return5y: 'ÐžÐ±Ñ‰Ð¸Ð¹ Ð´Ð¾Ñ…Ð¾Ð´ Ð·Ð° 5 Ð»ÐµÑ‚', return10y: 'ÐžÐ±Ñ‰Ð¸Ð¹ Ð´Ð¾Ñ…Ð¾Ð´ Ð·Ð° 10 Ð»ÐµÑ‚', disclaimer: '*ÐŸÑ€Ð¾Ð³Ð½Ð¾Ð·Ñ‹ Ð¾ÑÐ½Ð¾Ð²Ð°Ð½Ñ‹ Ð½Ð° Ñ‚ÐµÐºÑƒÑ‰Ð¸Ñ… Ñ€Ñ‹Ð½Ð¾Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….', ctaHome: 'ÐžÐ±ÑÑƒÐ´Ð¸Ñ‚ÑŒ Ð¸Ð½Ð²ÐµÑÑ‚Ð¸Ñ†Ð¸Ð¸', ctaProject: 'Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ Ð½Ð° Ð¿Ñ€Ð¸Ð²Ð°Ñ‚Ð½Ñ‹Ð¹ Ñ‚ÑƒÑ€' },
  };
  let roiTextsActiveLang = 'en';

  function renderRoiTextsPane() {
    const pane = $('#roi-texts-pane');
    if (!pane) return;
    const lang = roiTextsActiveLang;
    const texts = (siteData.roi && siteData.roi.texts && siteData.roi.texts[lang]) || ROI_TEXT_DEFAULTS[lang];
    let html = '';
    ROI_TEXT_KEYS.forEach(({ key, label }) => {
      const raw = texts[key] || '';
      const isLong = key === 'disclaimer' || key === 'subtitle' || key === 'subtitleProject';
      html += `<div class="form-group"><label>${label}</label>` +
        (isLong
          ? `<textarea class="roi-text-input" data-roi-text="${key}" rows="2">${escapeHtml(raw)}</textarea>`
          : `<input type="text" class="roi-text-input" data-roi-text="${key}" value="${escAttr(raw)}">`) +
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
      // Preserve any pending numeric param edits
      const roiNum = $('#roi-min');
      if (roiNum && siteData.roi) {
        siteData.roi.minInvestment = parseInt($('#roi-min').value) || siteData.roi.minInvestment;
        siteData.roi.maxInvestment = parseInt($('#roi-max').value) || siteData.roi.maxInvestment;
        siteData.roi.step = parseInt($('#roi-step').value) || siteData.roi.step;
        siteData.roi.defaultInvestment = parseInt($('#roi-default').value) || siteData.roi.defaultInvestment;
        siteData.roi.minOccupancy = parseInt($('#roi-occ-min').value) || siteData.roi.minOccupancy;
        siteData.roi.maxOccupancy = parseInt($('#roi-occ-max').value) || siteData.roi.maxOccupancy;
        siteData.roi.defaultOccupancy = parseInt($('#roi-occ-default').value) || siteData.roi.defaultOccupancy;
        if (!siteData.roi.scenarios) siteData.roi.scenarios = {};
        siteData.roi.scenarios.conservative = { yield: parseFloat($('#roi-cons-yield').value) / 100 || 0.08, growth: parseFloat($('#roi-cons-growth').value) / 100 || 0.06 };
        siteData.roi.scenarios.normal = { yield: parseFloat($('#roi-norm-yield').value) / 100 || 0.12, growth: parseFloat($('#roi-norm-growth').value) / 100 || 0.10 };
        siteData.roi.scenarios.optimistic = { yield: parseFloat($('#roi-opt-yield').value) / 100 || 0.15, growth: parseFloat($('#roi-opt-growth').value) / 100 || 0.12 };
      }
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update calculator texts via admin');
      dirtyTabs.roi = false;
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // â”€â”€â”€ Company Statistics â”€â”€â”€
  const STAT_KEYS = ['investorsWorldwide', 'villasDesigned', 'occupancyRate', 'founderExperience', 'touristArrivals', 'rentalYield', 'propertyGrowth', 'paybackPeriod'];
  const HOMEPAGE_STAT_KEYS = ['investorsWorldwide', 'villasDesigned', 'occupancyRate', 'founderExperience'];
  const STAT_LABEL_DEFAULTS = {
    en: {
      investorsWorldwide: 'Investors<br>Worldwide',
      villasDesigned: 'Villas<br>in Portfolio',
      occupancyRate: 'Projected<br>Occupancy Rate',
      founderExperience: 'Combined<br>Transaction Experience',
    },
    ru: {
      investorsWorldwide: 'Ð˜Ð½Ð²ÐµÑÑ‚Ð¾Ñ€Ð¾Ð²<br>Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ð¼Ð¸Ñ€Ñƒ',
      villasDesigned: 'Ð’Ð¸Ð»Ð»Ñ‹<br>Ð² Ð¿Ð¾Ñ€Ñ‚Ñ„Ð¾Ð»Ð¸Ð¾',
      occupancyRate: 'ÐŸÑ€Ð¾Ð³Ð½Ð¾Ð·Ð¸Ñ€ÑƒÐµÐ¼Ð°Ñ<br>Ð·Ð°Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ð¾ÑÑ‚ÑŒ',
      founderExperience: 'Ð¡Ð¾Ð²Ð¾ÐºÑƒÐ¿Ð½Ñ‹Ð¹ Ð¾Ð¿Ñ‹Ñ‚<br>Ñ‚Ñ€Ð°Ð½Ð·Ð°ÐºÑ†Ð¸Ð¹',
    },
  };

  function updateStatsPreview() {
    STAT_KEYS.forEach(key => {
      const preview = $(`#sp-${key}`);
      const input = $(`#stat-${key}`);
      if (preview && input) preview.textContent = input.value || 'â€”';
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
    renderStatsLabelsForm();
  }

  function renderStatsLabelsPane(lang) {
    const pane = $('#stats-labels-pane');
    if (!pane) return;
    const labels = (siteData.stats && siteData.stats.labels && siteData.stats.labels[lang]) || STAT_LABEL_DEFAULTS[lang] || {};
    pane.innerHTML = '<div class="form-grid--4">' + HOMEPAGE_STAT_KEYS.map(key => {
      const val = labels[key] || STAT_LABEL_DEFAULTS[lang][key] || '';
      const statLabel = t('stats.' + key);
      return `<div class="form-group">
        <label>${statLabel}</label>
        <input type="text" class="stats-label-input" data-stat-label="${key}" value="${escAttr(val)}" placeholder="Use &lt;br&gt; for line break">
      </div>`;
    }).join('') + '</div>';
  }

  function captureStatsLabelsPane(lang) {
    if (!siteData.stats) siteData.stats = {};
    if (!siteData.stats.labels) siteData.stats.labels = JSON.parse(JSON.stringify(STAT_LABEL_DEFAULTS));
    if (!siteData.stats.labels[lang]) siteData.stats.labels[lang] = {};
    document.querySelectorAll('#stats-labels-pane .stats-label-input').forEach(inp => {
      siteData.stats.labels[lang][inp.dataset.statLabel] = inp.value;
    });
  }

  let statsLabelsLang = 'en';
  function renderStatsLabelsForm() {
    if (!siteData) return;
    if (!siteData.stats) siteData.stats = {};
    if (!siteData.stats.labels) siteData.stats.labels = JSON.parse(JSON.stringify(STAT_LABEL_DEFAULTS));
    renderStatsLabelsPane(statsLabelsLang);
    const tabs = $('#stats-labels-tabs');
    if (tabs && !tabs.dataset.bound) {
      tabs.dataset.bound = '1';
      tabs.querySelectorAll('.lang-tab').forEach(b => {
        b.addEventListener('click', () => {
          captureStatsLabelsPane(statsLabelsLang);
          statsLabelsLang = b.dataset.lang;
          tabs.querySelectorAll('.lang-tab').forEach(x => x.classList.toggle('active', x === b));
          renderStatsLabelsPane(statsLabelsLang);
        });
      });
    }
  }

  $('#btn-stats-labels-save')?.addEventListener('click', async () => {
    const btn = $('#btn-stats-labels-save');
    const status = $('#stats-labels-status');
    btnLoading(btn, true);
    try {
      captureStatsLabelsPane(statsLabelsLang);
      // Preserve any pending number edits
      if (!siteData.stats) siteData.stats = {};
      STAT_KEYS.forEach(key => {
        const el = $(`#stat-${key}`);
        if (el) siteData.stats[key] = el.value.trim();
      });
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update stat labels via admin');
      dirtyTabs.stats = false;
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

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
      // Preserve any pending label edits in the open lang pane
      try { captureStatsLabelsPane(statsLabelsLang); } catch (e) {}
      const content = '/* eslint-disable */\nconst SITE_DATA = ' + JSON.stringify(siteData, null, 2) + ';\n';
      await commitFile('data/site-data.js', content, 'Update company statistics via admin');
      dirtyTabs.stats = false;
      status.textContent = t('common.saved');
      status.className = 'publish-status success';
      updateRateLimit();
    } catch (err) {
      status.textContent = t('common.error') + err.message;
      status.className = 'publish-status error';
    }
    btnLoading(btn, false);
  });

  // â”€â”€â”€ FAQ Editor â”€â”€â”€
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
            <button class="btn btn--icon" data-faq-up="${i}" title="Move Up" ${idx === 0 ? 'disabled' : ''}>â†‘</button>
            <button class="btn btn--icon" data-faq-down="${i}" title="Move Down" ${idx === sorted.length - 1 ? 'disabled' : ''}>â†“</button>
            <button class="btn btn--icon btn--danger" data-faq-delete="${i}" title="Delete">ðŸ—‘</button>
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

  // â”€â”€â”€ Testimonials Editor â”€â”€â”€
  const LANGS_FULL = { en: 'English', ru: 'Ð ÑƒÑÑÐºÐ¸Ð¹' };
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
    const stars = 'â˜…'.repeat(item.stars || 5);
    let avatarHTML;
    if (item.avatar) {
      avatarHTML = '<img class="test-preview__avatar" src="' + previewImageUrl(item.avatar) + '" alt="">';
    } else {
      const inits = name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || '??';
      avatarHTML = '<span class="test-preview__avatar test-preview__avatar--initials">' + inits + '</span>';
    }
    let verifiedHTML = '';
    if (item.sourceName) {
      verifiedHTML = '<span class="test-preview__verified">âœ“ Verified via ' + escapeHtml(item.sourceName) + '</span>';
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
            <button class="btn btn--icon" data-test-up="${i}" title="Move Up" ${idx === 0 ? 'disabled' : ''}>â†‘</button>
            <button class="btn btn--icon" data-test-down="${i}" title="Move Down" ${idx === sorted.length - 1 ? 'disabled' : ''}>â†“</button>
            <button class="btn btn--icon btn--danger" data-test-delete="${i}" title="Delete">ðŸ—‘</button>
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
          // ÐŸÑ€ÐµÑ„Ð¸ÐºÑ Ð¸Ð¼ÐµÐ½ÐµÐ¼ + timestamp Ð·Ð°Ñ‰Ð¸Ñ‰Ð°ÐµÑ‚ Ð¾Ñ‚ ÐºÐ¾Ð»Ð»Ð¸Ð·Ð¸Ð¹ Ð¸Ð¼Ñ‘Ð½ (Ð´Ð²ÑƒÑ…
          // testimonials Ñ Ð¾Ð´Ð¸Ð½Ð°ÐºÐ¾Ð²Ñ‹Ð¼ first-name Ð¸Ð»Ð¸ Ð¿ÑƒÑÑ‚Ñ‹Ð¼Ð¸ Ð¸Ð¼ÐµÐ½Ð°Ð¼Ð¸).
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

  // â”€â”€â”€ Help Tooltips â”€â”€â”€
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

  // â”€â”€â”€ Colors Tab â”€â”€â”€
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

  // â”€â”€â”€ Analytics Tab â”€â”€â”€
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

  // â”€â”€â”€ Exit Intent Popup Settings â”€â”€â”€
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
  // Enabled / delay Ñ‚Ð¾Ð¶Ðµ Ð¿Ð¾Ð¼ÐµÑ‡Ð°ÑŽÑ‚ dirty
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

  // â”€â”€â”€ Tour Popup Editor â”€â”€â”€
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
      body += '<h3 class="tour__question">' + escAttr(s.question || 'â€”') + '</h3>';
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
      body += '<div class="form-consent"><input type="checkbox" class="form-consent__checkbox" disabled><label class="form-consent__text">' + escAttr((form.consent || '').substring(0, 120)) + (form.consent && form.consent.length > 120 ? 'â€¦' : '') + '</label></div>';
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

  // â”€â”€â”€ Language Toggle â”€â”€â”€
  document.querySelectorAll('[data-admin-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      setAdminLang(btn.dataset.adminLang);
    });
  });

  // Apply saved language on load (for login/pat screens)
  translateUI();

  // â”€â”€â”€ Helpers â”€â”€â”€
  function escAttr(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // â”€â”€â”€ Users tab (super_admin only) â”€â”€â”€
  // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€ÑƒÐµÑ‚ÑÑ Ð¸Ð· showAdmin() ÐµÑÐ»Ð¸ currentUser.role === 'super_admin'.
  // Ð’ÐºÐ»Ð°Ð´ÐºÐ° ÑÐºÑ€Ñ‹Ñ‚Ð° Ð¾Ñ‚ editor/admin (data-super-admin-only Ð² index.html).
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
      const rows = users.map(u => {
        const isSelf = currentUser && u.id === currentUser.id;
        const st = statusLabel(u);
        const lastSeen = u.last_sign_in_at
          ? new Date(u.last_sign_in_at).toLocaleString()
          : 'â€”';
        const roleCell = (u.role === 'super_admin' || isSelf)
          ? `<span class="users-role-tag">${escapeHtml(roleLabel(u.role))}</span>`
          : `<select class="users-role-select" data-change-role="${u.id}">
               <option value="editor"${u.role === 'editor' ? ' selected' : ''}>${escapeHtml(t('users.role.editor.short'))}</option>
               <option value="admin"${u.role === 'admin' ? ' selected' : ''}>${escapeHtml(t('users.role.admin.short'))}</option>
             </select>`;
        const deleteBtn = (u.role === 'super_admin' || isSelf)
          ? ''
          : `<button class="btn btn--outline btn--sm" data-delete-user="${u.id}" data-email="${escAttr(u.email)}">${t('users.action.delete')}</button>`;
        return `<tr>
          <td data-label="${t('users.col.email')}">${escapeHtml(u.email)}${isSelf ? ` <span class="users-self-badge">${t('users.you')}</span>` : ''}</td>
          <td data-label="${t('users.col.name')}">${escapeHtml(u.full_name || 'â€”')}</td>
          <td data-label="${t('users.col.role')}">${roleCell}</td>
          <td data-label="${t('users.col.status')}"><span class="users-status ${st.cls}">${escapeHtml(st.text)}</span></td>
          <td data-label="${t('users.col.lastSignIn')}">${escapeHtml(lastSeen)}</td>
          <td data-label="${t('users.col.actions')}" class="users-actions-cell">${deleteBtn}</td>
        </tr>`;
      }).join('');
      return `<table class="users-table">
        <thead><tr>
          <th>${t('users.col.email')}</th>
          <th>${t('users.col.name')}</th>
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

})();
