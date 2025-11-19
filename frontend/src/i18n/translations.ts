export type Locale = 'en' | 'zh-TW' | 'es';

type TranslationMap = Record<Locale, Record<string, string>>;

export const translations: TranslationMap = {
  en: {
    /**
     * Common
     */
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading…',
    'common.unknownError': 'Something went wrong. Please try again.',

    /**
     * Header / Navigation
     */
    'header.title': 'SubMange',
    'header.subtitle': 'Manage every subscription with clarity',
    'header.language.label': 'Language',
    'header.language.en': 'English',
    'header.language.zh-TW': '繁體中文',
    'header.language.es': 'Español',
    'header.addSubscription': 'Add Subscription',
    'header.manageCategories': 'Manage categories',
    'header.sort': 'Sort',
    'header.sort.endDate': 'End date',
    'header.sort.price': 'Monthly cost',
    'header.sort.name': 'Subscription type',
    'header.logout': 'Sign out',
    'header.loggedInAs': 'Signed in as',
    'header.menu.settings': 'Personal settings',
    'header.menu.logout': 'Sign out',
    'header.logoutSuccess': 'Signed out',
    'header.logoutSuccessDescription': 'You have successfully signed out.',
    'header.logoutFailure': 'Sign out failed',
    'header.logoutFailureDescription': 'Please try again later.',
    'landing.nav.features': 'Features',
    'landing.nav.faq': 'FAQ',
    'landing.nav.signIn': 'Sign in',
    'landing.nav.join': 'Join for free',
    'landing.meta.title': 'SubMange – Subscription management software for recurring payments',
    'landing.meta.description':
      'Track every subscription, forecast spending, and stay ahead of renewals with SubMange\'s smart subscription management dashboard.',
    'landing.meta.keywords':
      'subscription manager,subscription tracking software,recurring billing management,saas spend control,renewal reminders',

    /**
     * Dashboard Cards
     */
    'dashboard.totalMonthly': 'Total monthly',
    'dashboard.totalSubscriptions': '{count} services',
    'dashboard.active': 'Active',
    'dashboard.activeDescription': 'Subscriptions in use',
    'dashboard.annualEstimate': 'Annual forecast',
    'dashboard.annualEstimateDescription': 'Projected spending',
    'dashboard.allSubscriptions': 'All subscriptions',

    /**
     * Empty state
     */
    'dashboard.empty.title': 'No subscriptions yet',
    'dashboard.empty.description': 'Click “Add subscription” to get started.',

    /**
     * Categories
     */
    'categories.uncategorized': 'Uncategorized',
    'categories.dropHint': 'Drop subscriptions here',

    /**
     * Notifications
     */
    'notifications.genericError': 'Please try again.',
    'notifications.create.successTitle': 'Subscription added',
    'notifications.create.successDescription': '{name} has been added.',
    'notifications.create.errorTitle': 'Add failed',
    'notifications.update.successTitle': 'Subscription updated',
    'notifications.update.successDescription': '{name} has been updated.',
    'notifications.update.errorTitle': 'Update failed',
    'notifications.delete.successTitle': 'Subscription deleted',
    'notifications.delete.successDescription': 'The subscription has been removed.',
    'notifications.delete.errorTitle': 'Delete failed',

    'category.notifications.createTitle': 'Category added',
    'category.notifications.createSuccess': 'Category added',
    'category.notifications.updateTitle': 'Category updated',
    'category.notifications.updateSuccess': 'Category updated',
    'category.notifications.deleteTitle': 'Category deleted',
    'category.notifications.deleteSuccess': 'Category removed.',

    /**
     * Add Subscription Dialog
     */
    'addSubscription.openButton': 'Add subscription',
    'addSubscription.title': 'Add subscription',
    'addSubscription.fields.name': 'Service name',
    'addSubscription.fields.brand': 'Brand',
    'addSubscription.fields.price': 'Price',
    'addSubscription.fields.currency': 'Currency',
    'addSubscription.fields.startDate': 'Start date',
    'addSubscription.fields.endDate': 'End date',
    'addSubscription.fields.billingCycle': 'Billing cycle',
    'addSubscription.cycle.mode.preset': 'Preset options',
    'addSubscription.cycle.mode.custom': 'Custom interval',
    'addSubscription.cycle.customValue': 'Interval length',
    'addSubscription.cycle.customUnit': 'Interval unit',
    'addSubscription.cycle.customUnit.days': 'Days',
    'addSubscription.cycle.customUnit.months': 'Months',
    'addSubscription.cycle.customUnit.years': 'Years',
    'addSubscription.cycle.helper':
      'The next cycle end date will be calculated automatically from the start date.',
    'addSubscription.fields.iconUrl': 'Icon URL (optional)',
    'addSubscription.fields.category': 'Subscription category (optional)',
    'addSubscription.fields.category.none': 'No category',
    'addSubscription.fields.autoRenew': 'Auto renew',
    'addSubscription.submit': 'Add',
    'addSubscription.cancel': 'Cancel',
    'addSubscription.brand.searching': 'Searching…',
    'addSubscription.brand.noResults': 'No related brands found',
    'addSubscription.brand.placeholder': 'Enter brand name',

    /**
     * Edit Subscription Dialog
     */
    'editSubscription.openButton': 'Edit',
    'editSubscription.title': 'Edit subscription',
    'editSubscription.submit': 'Update',
    'editSubscription.recordPriceChange': 'Record price change',
    'editSubscription.priceEffectiveDate': 'Price effective date',
    'editSubscription.priceChangeHint': 'Set the effective date for the new price',
    'editSubscription.priceChangePreview':
      'Changed from {oldPrice} to {newPrice}',

    /**
     * Billing cycles
     */
    'billingCycle.30days': '30 days',
    'billingCycle.6months': '6 months',
    'billingCycle.1year': '1 year',

    /**
     * Currency labels
     */
    'currency.TWD': 'TWD – New Taiwan Dollar',
    'currency.USD': 'USD – US Dollar',
    'currency.EUR': 'EUR – Euro',
    'currency.JPY': 'JPY – Japanese Yen',
    'currency.GBP': 'GBP – British Pound',
    'currency.CNY': 'CNY – Chinese Yuan',

    /**
     * Category Management Dialog
     */
    'categoryDialog.title': 'Manage subscription categories',
    'categoryDialog.empty': 'No categories yet',
    'categoryDialog.add': 'Add category',
    'categoryDialog.update': 'Update',
    'categoryDialog.cancel': 'Cancel',
    'categoryDialog.deleteConfirm':
      'Are you sure you want to delete this category? Linked subscriptions will lose their category.',
    'categoryDialog.fields.name': 'Category name',
    'categoryDialog.fields.description': 'Description (optional)',
    'categoryDialog.fields.color': 'Choose a color',
    'categoryDialog.fields.customColor': 'Custom color',
    'categoryDialog.currentColor': 'Current: {color}',

    /**
     * Subscription card
     */
    'subscriptionCard.status.expired': 'Expired',
    'subscriptionCard.status.expiringSoon': 'Expiring soon',
    'subscriptionCard.status.active': 'Active',

    /**
     * User settings
     */
    'settings.title': 'Profile settings',
    'settings.back': 'Back',
    'settings.section.basic': 'Basic information',
    'settings.section.account': 'Account management',
    'settings.section.security': 'Security',
    'settings.email': 'Email',
    'settings.email.helper': 'Used for subscription notifications',
    'settings.nickname': 'Nickname',
    'settings.nickname.helper': 'Shown in your profile',
    'settings.defaultCurrency': 'Default currency',
    'settings.defaultCurrency.helper': 'Default currency when adding subscriptions',
    'settings.defaultLanguage': 'Preferred language',
    'settings.defaultLanguage.helper': 'Language used throughout the app',
    'settings.save': 'Save changes',
    'settings.saving': 'Saving…',
    'settings.cancel': 'Cancel',
    'settings.signOut': 'Sign out',
    'settings.loadingError': 'Failed to load profile.',
    'settings.updateSuccess': 'Profile updated',
    'settings.updateError': 'Failed to update profile.',
    'settings.loading': 'Loading profile…',
    'settings.password.title': 'Change password',
    'settings.password.current': 'Current password',
    'settings.password.new': 'New password',
    'settings.password.confirm': 'Confirm new password',
    'settings.password.submit': 'Update password',
    'settings.password.successTitle': 'Password updated',
    'settings.password.successDescription': 'Your password has been changed successfully.',
    'settings.password.error.invalidCurrent': 'The current password you entered is incorrect.',
    'settings.password.error.generic': 'Unable to update password. Please try again.',
    'settings.delete.title': 'Delete account',
    'settings.delete.description': 'This will sign you out and mark your account for deletion. You can recover it by contacting support.',
    'settings.delete.button': 'Delete account',
    'settings.delete.dialog.title': 'Confirm account deletion',
    'settings.delete.dialog.description': 'Type DELETE to confirm. This action can be reverted only by contacting support.',
    'settings.delete.dialog.placeholder': 'Type DELETE to confirm',
    'settings.delete.dialog.cancel': 'Cancel',
    'settings.delete.dialog.confirm': 'Delete permanently',
    'settings.delete.successTitle': 'Account deleted',
    'settings.delete.successDescription': 'Your account has been marked for deletion.',
    'settings.delete.errorTitle': 'Unable to delete account',
    'settings.delete.errorDescription': 'Please try again or contact support.',

    'auth.error.notAuthenticated': 'Not signed in',

    /**
     * Landing page
     */
    'landing.hero.title.line1': 'Subscription management software',
    'landing.hero.title.line2': 'built to stop unwanted renewals',
    'landing.hero.subtitle':
      'SubMange centralizes every recurring payment so you can monitor spend, forecast annual costs, and catch price hikes before they go live.',
    'landing.hero.helper': 'No credit card required. Cancel anytime.',
    'landing.hero.cta': 'Join for free',
    'landing.hero.card.title': 'Today at a glance',
    'landing.hero.card.session': 'Active session',
    'landing.hero.card.focus': 'Priority focus today',
    'landing.hero.card.description':
      'Review renewal risk, multi-currency totals, and insights designed to keep your subscription budget predictable.',
    'landing.hero.card.upNext': 'Up next',
    'landing.hero.card.taskOne': 'Audit AI tool usage before renewal',
    'landing.hero.card.taskTwo': 'Compare music streaming plans for savings',
    'landing.pricing.free': 'Free',
    'landing.pricing.freeDescription': 'Full feature set, free forever',
    'landing.pricing.features.unlimited': 'Unlimited subscription tracking',
    'landing.pricing.features.priceChange': 'Price change management',
    'landing.pricing.features.autoRenew': 'Auto renew tracking',
    'landing.pricing.features.multiCurrency': 'Multi-currency support',
    'landing.features.title': 'Why teams choose SubMange',
    'landing.features.track.title': 'Complete subscription visibility',
    'landing.features.track.description':
      'Sync streaming, SaaS, utilities, and memberships to see monthly and annual totals in one dashboard.',
    'landing.features.price.title': 'Automatic price change alerts',
    'landing.features.price.description':
      'Log historical pricing, track tax adjustments, and receive prompts when a provider increases rates.',
    'landing.features.renew.title': 'Renewal reminders with context',
    'landing.features.renew.description':
      'Set renewal cadences, assign owners, and stay ahead of cancellations or plan updates.',
    'landing.features.security.title': 'Enterprise-grade security',
    'landing.features.security.description':
      'Supabase-backed authentication, row-level security, and encryption keep customer data private.',
    'landing.faq.title': 'Frequently asked questions',
    'landing.faq.free.question': 'Is this service free?',
    'landing.faq.free.answer': 'Yes! We offer a completely free subscription manager.',
    'landing.faq.security.question': 'Is my data safe?',
    'landing.faq.security.answer': 'Absolutely. Supabase provides encrypted storage for all data.',
    'landing.faq.supported.question': 'Which services are supported?',
    'landing.faq.supported.answer': 'All types, including streaming, software, and gym memberships.',
    'landing.faq.price.question': 'Can I track price changes?',
    'landing.faq.price.answer': 'Yes. Set effective dates for new prices and we will compute totals automatically.',
    'landing.faq.devices.question': 'Does it work across devices?',
    'landing.faq.devices.answer': 'Yes. Sign in on any device and your data syncs instantly.',
    'landing.cta.title': 'Start reducing recurring software waste',
    'landing.cta.description':
      'Join finance leads, founders, and creators using SubMange to negotiate better rates and eliminate duplicate subscriptions.',
    'landing.cta.button': 'Start now',
    'footer.copyright': '© 2025 SubMange. All rights reserved.',
    'footer.developer': 'Built by Leander Kuo',
    'footer.github': 'Visit my GitHub profile',

    /**
     * Not Found
     */
    'notFound.title': 'Page not found',
    'notFound.description':
      'Sorry, the page you are looking for does not exist or has been moved.',
    'notFound.back': 'Back to home',

    /**
     * Brand autofill
     */
    'brandAutofill.error.noResults': 'No related brands found',
    'brandAutofill.error.invalidClient':
      'Brandfetch client ID is invalid or lacks permission.',
    'brandAutofill.error.authFailed': 'Brandfetch authentication failed.',
    'brandAutofill.error.generic': 'An error occurred while searching for brands.',

    'auth.dialog.title': 'Subscription Manager',
    'auth.tabs.signIn': 'Sign in',
    'auth.tabs.signUp': 'Sign up',
    'auth.fields.email': 'Email',
    'auth.fields.password': 'Password',
    'auth.fields.confirmPassword': 'Confirm password',
    'auth.validation.fillAll': 'Please fill out all fields.',
    'auth.validation.passwordMismatch': 'Passwords do not match.',
    'auth.validation.passwordLength': 'Password must be at least 6 characters.',
    'auth.signIn.successTitle': 'Signed in',
    'auth.signIn.successDescription': 'Welcome back!',
    'auth.signIn.error': 'Sign in failed.',
    'auth.signUp.successTitle': 'Account created',
    'auth.signUp.successDescription': 'Check your email to confirm your account.',
    'auth.signUp.error': 'Sign up failed.',
    'auth.oauth.orContinue': 'Or continue with',
    'auth.oauth.redirectingTitle': 'Redirecting',
    'auth.oauth.redirectingGoogle': 'Taking you to Google sign in…',
    'auth.oauth.redirectingApple': 'Taking you to Apple sign in…',
    'auth.oauth.googleError': 'Google sign in failed.',
    'auth.oauth.appleError': 'Apple sign in failed.',
    'auth.actions.facebook': 'Facebook',
    'auth.oauth.redirectingFacebook': 'Taking you to Facebook sign in…',
    'auth.oauth.facebookError': 'Facebook sign in failed.',
    'auth.actions.cancel': 'Cancel',
    'auth.actions.signIn': 'Sign in',
    'auth.actions.signInLoading': 'Signing in…',
    'auth.actions.signUp': 'Sign up',
    'auth.actions.signUpLoading': 'Signing up…',
    'auth.actions.google': 'Google',
    'auth.actions.apple': 'Apple',
    'auth.actions.signOutLoading': 'Signing out…',
    'auth.user.fallback': 'User',

    /**
     * Misc
     */
    'error.loadData': 'Unable to load data',
    'error.loadDataHint': 'Please check the backend service or try again later.',
    'errorBoundary.title': 'Something went wrong',
    'errorBoundary.subtitle': 'An unexpected error occurred. Please try refreshing the page.',
    'errorBoundary.backHome': 'Back to home',
  },
  es: {
    /**
     * Common
     */
    'common.confirm': 'Confirmar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.loading': 'Cargando…',
    'common.unknownError': 'Ocurrió un problema. Inténtalo de nuevo.',

    /**
     * Header / Navigation
     */
    'header.title': 'SubMange',
    'header.subtitle': 'Administra cada suscripción con claridad',
    'header.language.label': 'Idioma',
    'header.language.en': 'Inglés',
    'header.language.zh-TW': 'Chino tradicional',
    'header.language.es': 'Español',
    'header.addSubscription': 'Agregar suscripción',
    'header.manageCategories': 'Administrar categorías',
    'header.sort': 'Ordenar',
    'header.sort.endDate': 'Fecha de vencimiento',
    'header.sort.price': 'Costo mensual',
    'header.sort.name': 'Tipo de suscripción',
    'header.logout': 'Cerrar sesión',
    'header.loggedInAs': 'Has iniciado sesión como',
    'header.menu.settings': 'Configuración personal',
    'header.menu.logout': 'Cerrar sesión',
    'header.logoutSuccess': 'Sesión cerrada',
    'header.logoutSuccessDescription': 'Has cerrado la sesión correctamente.',
    'header.logoutFailure': 'Error al cerrar sesión',
    'header.logoutFailureDescription': 'Vuelve a intentarlo más tarde.',
    'landing.nav.features': 'Funciones',
    'landing.nav.faq': 'Preguntas frecuentes',
    'landing.nav.signIn': 'Iniciar sesión',
    'landing.nav.join': 'Únete gratis',
    'landing.meta.title': 'SubMange – Software de gestión de suscripciones para pagos recurrentes',
    'landing.meta.description':
      'Controla todas tus suscripciones, pronostica el gasto y adelántate a las renovaciones con el panel inteligente de SubMange.',
    'landing.meta.keywords':
      'gestor de suscripciones,software de seguimiento de suscripciones,control de pagos recurrentes,gestión de gastos saas,recordatorios de renovación',

    /**
     * Dashboard Cards
     */
    'dashboard.totalMonthly': 'Gasto mensual total',
    'dashboard.totalSubscriptions': '{count} servicios',
    'dashboard.active': 'Activas',
    'dashboard.activeDescription': 'Suscripciones en uso',
    'dashboard.annualEstimate': 'Pronóstico anual',
    'dashboard.annualEstimateDescription': 'Gasto estimado',
    'dashboard.allSubscriptions': 'Todas las suscripciones',

    /**
     * Empty state
     */
    'dashboard.empty.title': 'Aún no hay suscripciones',
    'dashboard.empty.description': 'Haz clic en “Agregar suscripción” para comenzar.',

    /**
     * Categories
     */
    'categories.uncategorized': 'Sin categoría',
    'categories.dropHint': 'Suelta las suscripciones aquí',

    /**
     * Notifications
     */
    'notifications.genericError': 'Inténtalo de nuevo.',
    'notifications.create.successTitle': 'Suscripción agregada',
    'notifications.create.successDescription': 'Se agregó {name}.',
    'notifications.create.errorTitle': 'No se pudo agregar',
    'notifications.update.successTitle': 'Suscripción actualizada',
    'notifications.update.successDescription': 'Se actualizó {name}.',
    'notifications.update.errorTitle': 'No se pudo actualizar',
    'notifications.delete.successTitle': 'Suscripción eliminada',
    'notifications.delete.successDescription': 'La suscripción se ha eliminado.',
    'notifications.delete.errorTitle': 'No se pudo eliminar',

    'category.notifications.createTitle': 'Categoría agregada',
    'category.notifications.createSuccess': 'Categoría agregada',
    'category.notifications.updateTitle': 'Categoría actualizada',
    'category.notifications.updateSuccess': 'Categoría actualizada',
    'category.notifications.deleteTitle': 'Categoría eliminada',
    'category.notifications.deleteSuccess': 'Categoría eliminada.',

    /**
     * Add Subscription Dialog
     */
    'addSubscription.openButton': 'Agregar suscripción',
    'addSubscription.title': 'Agregar suscripción',
    'addSubscription.fields.name': 'Nombre del servicio',
    'addSubscription.fields.brand': 'Marca',
    'addSubscription.fields.price': 'Precio',
    'addSubscription.fields.currency': 'Moneda',
    'addSubscription.fields.startDate': 'Fecha de inicio',
    'addSubscription.fields.endDate': 'Fecha de finalización',
    'addSubscription.fields.billingCycle': 'Ciclo de facturación',
    'addSubscription.cycle.mode.preset': 'Opciones predefinidas',
    'addSubscription.cycle.mode.custom': 'Intervalo personalizado',
    'addSubscription.cycle.customValue': 'Duración del intervalo',
    'addSubscription.cycle.customUnit': 'Unidad del intervalo',
    'addSubscription.cycle.customUnit.days': 'Días',
    'addSubscription.cycle.customUnit.months': 'Meses',
    'addSubscription.cycle.customUnit.years': 'Años',
    'addSubscription.cycle.helper':
      'La fecha de fin del próximo ciclo se calculará automáticamente a partir de la fecha de inicio.',
    'addSubscription.fields.iconUrl': 'URL del ícono (opcional)',
    'addSubscription.fields.category': 'Categoría de suscripción (opcional)',
    'addSubscription.fields.category.none': 'Sin categoría',
    'addSubscription.fields.autoRenew': 'Renovación automática',
    'addSubscription.submit': 'Agregar',
    'addSubscription.cancel': 'Cancelar',
    'addSubscription.brand.searching': 'Buscando…',
    'addSubscription.brand.noResults': 'No se encontraron marcas relacionadas',
    'addSubscription.brand.placeholder': 'Ingresa el nombre de la marca',

    /**
     * Edit Subscription Dialog
     */
    'editSubscription.openButton': 'Editar',
    'editSubscription.title': 'Editar suscripción',
    'editSubscription.submit': 'Actualizar',
    'editSubscription.recordPriceChange': 'Registrar cambio de precio',
    'editSubscription.priceEffectiveDate': 'Fecha de entrada en vigor',
    'editSubscription.priceChangeHint': 'Define la fecha de entrada en vigor del nuevo precio',
    'editSubscription.priceChangePreview':
      'Cambiado de {oldPrice} a {newPrice}',

    /**
     * Billing cycles
     */
    'billingCycle.30days': '30 días',
    'billingCycle.6months': '6 meses',
    'billingCycle.1year': '1 año',

    /**
     * Currency labels
     */
    'currency.TWD': 'TWD – Nuevo dólar taiwanés',
    'currency.USD': 'USD – Dólar estadounidense',
    'currency.EUR': 'EUR – Euro',
    'currency.JPY': 'JPY – Yen japonés',
    'currency.GBP': 'GBP – Libra esterlina',
    'currency.CNY': 'CNY – Yuan chino',

    /**
     * Category Management Dialog
     */
    'categoryDialog.title': 'Administrar categorías de suscripción',
    'categoryDialog.empty': 'Aún no hay categorías',
    'categoryDialog.add': 'Agregar categoría',
    'categoryDialog.update': 'Actualizar',
    'categoryDialog.cancel': 'Cancelar',
    'categoryDialog.deleteConfirm':
      '¿Seguro que deseas eliminar esta categoría? Las suscripciones vinculadas perderán su categoría.',
    'categoryDialog.fields.name': 'Nombre de la categoría',
    'categoryDialog.fields.description': 'Descripción (opcional)',
    'categoryDialog.fields.color': 'Elige un color',
    'categoryDialog.fields.customColor': 'Color personalizado',
    'categoryDialog.currentColor': 'Actual: {color}',

    /**
     * Subscription card
     */
    'subscriptionCard.status.expired': 'Vencida',
    'subscriptionCard.status.expiringSoon': 'Por vencer',
    'subscriptionCard.status.active': 'Activa',

    /**
     * User settings
     */
    'settings.title': 'Configuración del perfil',
    'settings.back': 'Regresar',
    'settings.section.basic': 'Información básica',
    'settings.section.account': 'Administración de la cuenta',
    'settings.section.security': 'Seguridad',
    'settings.email': 'Correo electrónico',
    'settings.email.helper': 'Se usa para notificaciones de suscripción',
    'settings.nickname': 'Apodo',
    'settings.nickname.helper': 'Se muestra en tu perfil',
    'settings.defaultCurrency': 'Moneda predeterminada',
    'settings.defaultCurrency.helper': 'Moneda predeterminada al agregar suscripciones',
    'settings.defaultLanguage': 'Idioma preferido',
    'settings.defaultLanguage.helper': 'Idioma usado en toda la aplicación',
    'settings.save': 'Guardar cambios',
    'settings.saving': 'Guardando…',
    'settings.cancel': 'Cancelar',
    'settings.signOut': 'Cerrar sesión',
    'settings.loadingError': 'No se pudo cargar el perfil.',
    'settings.updateSuccess': 'Perfil actualizado',
    'settings.updateError': 'No se pudo actualizar el perfil.',
    'settings.loading': 'Cargando perfil…',
    'settings.password.title': 'Cambiar contraseña',
    'settings.password.current': 'Contraseña actual',
    'settings.password.new': 'Nueva contraseña',
    'settings.password.confirm': 'Confirmar nueva contraseña',
    'settings.password.submit': 'Actualizar contraseña',
    'settings.password.successTitle': 'Contraseña actualizada',
    'settings.password.successDescription': 'Tu contraseña se cambió correctamente.',
    'settings.password.error.invalidCurrent': 'La contraseña actual es incorrecta.',
    'settings.password.error.generic': 'No se pudo actualizar la contraseña. Inténtalo de nuevo.',
    'settings.delete.title': 'Eliminar cuenta',
    'settings.delete.description': 'Esto cerrará tu sesión y marcará tu cuenta para eliminación. Puedes recuperarla contactando al soporte.',
    'settings.delete.button': 'Eliminar cuenta',
    'settings.delete.dialog.title': 'Confirmar eliminación de la cuenta',
    'settings.delete.dialog.description': 'Escribe DELETE para confirmar. Solo podrás revertirlo contactando al soporte.',
    'settings.delete.dialog.placeholder': 'Escribe DELETE para confirmar',
    'settings.delete.dialog.cancel': 'Cancelar',
    'settings.delete.dialog.confirm': 'Eliminar de forma permanente',
    'settings.delete.successTitle': 'Cuenta eliminada',
    'settings.delete.successDescription': 'Tu cuenta ha sido marcada para eliminación.',
    'settings.delete.errorTitle': 'No se pudo eliminar la cuenta',
    'settings.delete.errorDescription': 'Inténtalo de nuevo o contacta al soporte.',

    'auth.error.notAuthenticated': 'No has iniciado sesión',

    /**
     * Landing page
     */
    'landing.hero.title.line1': 'Software de gestión de suscripciones',
    'landing.hero.title.line2': 'creado para frenar las renovaciones no deseadas',
    'landing.hero.subtitle':
      'SubMange centraliza cada pago recurrente para que controles el gasto, proyectes el coste anual y detectes subidas de precio antes de que ocurran.',
    'landing.hero.helper': 'Sin tarjeta de crédito. Cancela cuando quieras.',
    'landing.hero.cta': 'Únete gratis',
    'landing.hero.card.title': 'Resumen de hoy',
    'landing.hero.card.session': 'Sesión activa',
    'landing.hero.card.focus': 'Prioridad de hoy',
    'landing.hero.card.description':
      'Revisa riesgos de renovación, totales multimoneda y métricas accionables para mantener predecible tu presupuesto de suscripciones.',
    'landing.hero.card.upNext': 'Próximo',
    'landing.hero.card.taskOne': 'Audita el uso de herramientas de IA antes de renovar',
    'landing.hero.card.taskTwo': 'Compara planes de música para ahorrar',
    'landing.pricing.free': 'Gratis',
    'landing.pricing.freeDescription': 'Todas las funciones, gratis para siempre',
    'landing.pricing.features.unlimited': 'Seguimiento ilimitado de suscripciones',
    'landing.pricing.features.priceChange': 'Gestión de cambios de precio',
    'landing.pricing.features.autoRenew': 'Seguimiento de renovaciones automáticas',
    'landing.pricing.features.multiCurrency': 'Compatibilidad multimoneda',
    'landing.features.title': 'Por qué los equipos eligen SubMange',
    'landing.features.track.title': 'Visibilidad total de suscripciones',
    'landing.features.track.description':
      'Sincroniza streaming, SaaS, servicios y membresías para ver totales mensuales y anuales en un solo panel.',
    'landing.features.price.title': 'Alertas automáticas de cambios de precio',
    'landing.features.price.description':
      'Registra el historial de precios, sigue impuestos y recibe avisos cuando un proveedor aumenta tarifas.',
    'landing.features.renew.title': 'Recordatorios de renovación con contexto',
    'landing.features.renew.description':
      'Define cadencias de renovación, asigna responsables y anticípate a cancelaciones o cambios de plan.',
    'landing.features.security.title': 'Seguridad de nivel empresarial',
    'landing.features.security.description':
      'Autenticación con Supabase, seguridad a nivel de fila y cifrado para proteger tus datos.',
    'landing.faq.title': 'Preguntas frecuentes',
    'landing.faq.free.question': '¿El servicio es gratuito?',
    'landing.faq.free.answer': '¡Sí! Ofrecemos un gestor de suscripciones totalmente gratuito.',
    'landing.faq.security.question': '¿Mis datos están seguros?',
    'landing.faq.security.answer': 'Por supuesto. Supabase proporciona almacenamiento cifrado para todos los datos.',
    'landing.faq.supported.question': '¿Qué servicios son compatibles?',
    'landing.faq.supported.answer': 'Todos: streaming, software y membresías de gimnasio.',
    'landing.faq.price.question': '¿Puedo controlar los cambios de precio?',
    'landing.faq.price.answer': 'Sí. Define las fechas efectivas de los nuevos precios y calcularemos los totales automáticamente.',
    'landing.faq.devices.question': '¿Funciona en varios dispositivos?',
    'landing.faq.devices.answer': 'Sí. Inicia sesión en cualquier dispositivo y tus datos se sincronizan al instante.',
    'landing.cta.title': 'Reduce el desperdicio de software recurrente',
    'landing.cta.description':
      'Únete a líderes financieros, fundadores y creadores que usan SubMange para negociar mejores tarifas y eliminar suscripciones duplicadas.',
    'landing.cta.button': 'Comenzar ahora',
    'footer.copyright': '© 2025 SubMange. Todos los derechos reservados.',
    'footer.developer': 'Creado por Leander Kuo',
    'footer.github': 'Visita mi perfil de GitHub',

    /**
     * Not Found
     */
    'notFound.title': 'Página no encontrada',
    'notFound.description':
      'Lo sentimos, la página que buscas no existe o fue movida.',
    'notFound.back': 'Volver al inicio',

    /**
     * Brand autofill
     */
    'brandAutofill.error.noResults': 'No se encontraron marcas relacionadas',
    'brandAutofill.error.invalidClient':
      'El ID de cliente de Brandfetch no es válido o no tiene permisos.',
    'brandAutofill.error.authFailed': 'Falló la autenticación de Brandfetch.',
    'brandAutofill.error.generic': 'Se produjo un error al buscar marcas.',

    'auth.dialog.title': 'Gestor de suscripciones',
    'auth.tabs.signIn': 'Iniciar sesión',
    'auth.tabs.signUp': 'Registrarse',
    'auth.fields.email': 'Correo electrónico',
    'auth.fields.password': 'Contraseña',
    'auth.fields.confirmPassword': 'Confirmar contraseña',
    'auth.validation.fillAll': 'Completa todos los campos.',
    'auth.validation.passwordMismatch': 'Las contraseñas no coinciden.',
    'auth.validation.passwordLength': 'La contraseña debe tener al menos 6 caracteres.',
    'auth.signIn.successTitle': 'Sesión iniciada',
    'auth.signIn.successDescription': '¡Bienvenido de nuevo!',
    'auth.signIn.error': 'Error al iniciar sesión.',
    'auth.signUp.successTitle': 'Cuenta creada',
    'auth.signUp.successDescription': 'Revisa tu correo para confirmar la cuenta.',
    'auth.signUp.error': 'Error al registrarse.',
    'auth.oauth.orContinue': 'O continúa con',
    'auth.oauth.redirectingTitle': 'Redirigiendo',
    'auth.oauth.redirectingGoogle': 'Abriendo inicio de sesión con Google…',
    'auth.oauth.redirectingApple': 'Abriendo inicio de sesión con Apple…',
    'auth.oauth.googleError': 'Error en el inicio de sesión con Google.',
    'auth.oauth.appleError': 'Error en el inicio de sesión con Apple.',
    'auth.actions.facebook': 'Facebook',
    'auth.oauth.redirectingFacebook': 'Abriendo inicio de sesión con Facebook…',
    'auth.oauth.facebookError': 'Error en el inicio de sesión con Facebook.',
    'auth.actions.cancel': 'Cancelar',
    'auth.actions.signIn': 'Iniciar sesión',
    'auth.actions.signInLoading': 'Iniciando sesión…',
    'auth.actions.signUp': 'Registrarse',
    'auth.actions.signUpLoading': 'Registrándose…',
    'auth.actions.google': 'Google',
    'auth.actions.apple': 'Apple',
    'auth.actions.signOutLoading': 'Cerrando sesión…',
    'auth.user.fallback': 'Usuario',

    /**
     * Misc
     */
    'error.loadData': 'No se pueden cargar los datos',
    'error.loadDataHint': 'Verifica el servicio backend o inténtalo más tarde.',
    'errorBoundary.title': 'Algo salió mal',
    'errorBoundary.subtitle': 'Ocurrió un error inesperado. Intenta actualizar la página.',
    'errorBoundary.backHome': 'Volver al inicio',
  },
  'zh-TW': {
    'common.confirm': '確認',
    'common.cancel': '取消',
    'common.delete': '刪除',
    'common.edit': '編輯',
    'common.loading': '載入中…',
    'common.unknownError': '發生錯誤，請稍後再試。',

    'header.title': 'SubMange',
    'header.subtitle': '輕鬆管理你的所有訂閱服務',
    'header.language.label': '語言',
    'header.language.en': 'English',
    'header.language.zh-TW': '繁體中文',
    'header.language.es': '西班牙語',
    'header.addSubscription': '新增訂閱',
    'header.manageCategories': '管理類型',
    'header.sort': '排序',
    'header.sort.endDate': '到期日期',
    'header.sort.price': '月費價格',
    'header.sort.name': '訂閱類型',
    'header.logout': '登出',
    'header.loggedInAs': '登入為',
    'header.menu.settings': '個人設定',
    'header.menu.logout': '登出',
    'header.logoutSuccess': '已登出',
    'header.logoutSuccessDescription': '您已成功登出',
    'header.logoutFailure': '登出失敗',
    'header.logoutFailureDescription': '請稍後再試',
    'landing.nav.features': '功能介紹',
    'landing.nav.faq': '常見問題',
    'landing.nav.signIn': '登入',
    'landing.nav.join': '立即註冊',
    'landing.meta.title': 'SubMange – 訂閱管理軟體，全面掌握每筆續訂',
    'landing.meta.description':
      'SubMange 整合所有訂閱支出，協助你監控每月與年度費用、提前預警漲價並避免不必要的自動續約。',
    'landing.meta.keywords':
      '訂閱管理,訂閱追蹤工具,固定成本控管,SaaS 支出管理,續訂提醒',

    'dashboard.totalMonthly': '總月費',
    'dashboard.totalSubscriptions': '{count} 個服務',
    'dashboard.active': '使用中',
    'dashboard.activeDescription': '個訂閱服務',
    'dashboard.annualEstimate': '年度預估',
    'dashboard.annualEstimateDescription': '預估花費',
    'dashboard.allSubscriptions': '所有訂閱',

    'dashboard.empty.title': '尚未新增任何訂閱',
    'dashboard.empty.description': '點擊「新增訂閱」開始管理你的訂閱服務',

    'categories.uncategorized': '未分類',
    'categories.dropHint': '拖曳訂閱至此分類',

    'notifications.genericError': '請稍後再試一次。',
    'notifications.create.successTitle': '新增成功',
    'notifications.create.successDescription': '已新增 {name} 訂閱',
    'notifications.create.errorTitle': '新增失敗',
    'notifications.update.successTitle': '更新成功',
    'notifications.update.successDescription': '已更新 {name} 訂閱',
    'notifications.update.errorTitle': '更新失敗',
    'notifications.delete.successTitle': '刪除成功',
    'notifications.delete.successDescription': '訂閱已刪除。',
    'notifications.delete.errorTitle': '刪除失敗',

    'category.notifications.createTitle': '新增成功',
    'category.notifications.createSuccess': '類型已新增。',
    'category.notifications.updateTitle': '更新成功',
    'category.notifications.updateSuccess': '類型已更新。',
    'category.notifications.deleteTitle': '刪除成功',
    'category.notifications.deleteSuccess': '類型已刪除。',

    'addSubscription.openButton': '新增訂閱',
    'addSubscription.title': '新增訂閱服務',
    'addSubscription.fields.name': '服務名稱',
    'addSubscription.fields.brand': '品牌',
    'addSubscription.fields.price': '價格',
    'addSubscription.fields.currency': '貨幣',
    'addSubscription.fields.startDate': '開始日期',
    'addSubscription.fields.endDate': '結束日期',
    'addSubscription.fields.billingCycle': '計算周期',
    'addSubscription.cycle.mode.preset': '預設周期',
    'addSubscription.cycle.mode.custom': '自訂周期',
    'addSubscription.cycle.customValue': '周期長度',
    'addSubscription.cycle.customUnit': '周期單位',
    'addSubscription.cycle.customUnit.days': '天',
    'addSubscription.cycle.customUnit.months': '月',
    'addSubscription.cycle.customUnit.years': '年',
    'addSubscription.cycle.helper': '系統會依開始日期自動計算下一次週期。',
    'addSubscription.fields.iconUrl': 'Icon URL（選填）',
    'addSubscription.fields.category': '訂閱類型（選填）',
    'addSubscription.fields.category.none': '無類型',
    'addSubscription.fields.autoRenew': '自動續訂',
    'addSubscription.submit': '新增',
    'addSubscription.cancel': '取消',
    'addSubscription.brand.searching': '搜尋品牌中…',
    'addSubscription.brand.noResults': '找不到相關品牌',
    'addSubscription.brand.placeholder': '請輸入品牌名稱',

    'editSubscription.openButton': '編輯',
    'editSubscription.title': '編輯訂閱服務',
    'editSubscription.submit': '更新',
    'editSubscription.recordPriceChange': '記錄價格變動',
    'editSubscription.priceEffectiveDate': '價格生效日期',
    'editSubscription.priceChangeHint': '設定價格變動的生效日期',
    'editSubscription.priceChangePreview':
      '從 {oldPrice} 變更為 {newPrice}',

    'billingCycle.30days': '30天',
    'billingCycle.6months': '6個月',
    'billingCycle.1year': '1年',

    'currency.TWD': 'TWD - 新台幣',
    'currency.USD': 'USD - 美元',
    'currency.EUR': 'EUR - 歐元',
    'currency.JPY': 'JPY - 日圓',
    'currency.GBP': 'GBP - 英鎊',
    'currency.CNY': 'CNY - 人民幣',

    'categoryDialog.title': '管理訂閱類型',
    'categoryDialog.empty': '尚未建立任何類型',
    'categoryDialog.add': '新增類型',
    'categoryDialog.update': '更新',
    'categoryDialog.cancel': '取消',
    'categoryDialog.deleteConfirm':
      '確定要刪除此類型嗎？相關訂閱的類型將被移除。',
    'categoryDialog.fields.name': '類型名稱',
    'categoryDialog.fields.description': '描述（選填）',
    'categoryDialog.fields.color': '選擇顏色',
    'categoryDialog.fields.customColor': '自訂顏色',
    'categoryDialog.currentColor': '當前顏色：{color}',

    'subscriptionCard.status.expired': '逾期',
    'subscriptionCard.status.expiringSoon': '即將到期',
    'subscriptionCard.status.active': '使用中',

    'settings.title': '個人設定',
    'settings.back': '返回',
    'settings.section.basic': '基本資料',
    'settings.section.account': '帳號管理',
    'settings.section.security': '安全性',
    'settings.email': 'Email',
    'settings.email.helper': '用於接收訂閱通知',
    'settings.nickname': '暱稱',
    'settings.nickname.helper': '顯示在個人資料中',
    'settings.defaultCurrency': '預設幣別',
    'settings.defaultCurrency.helper': '新增訂閱時的預設貨幣',
    'settings.defaultLanguage': '偏好語言',
    'settings.defaultLanguage.helper': '系統顯示的語言',
    'settings.save': '儲存變更',
    'settings.saving': '儲存中…',
    'settings.cancel': '取消',
    'settings.signOut': '登出',
    'settings.loadingError': '載入個人資料失敗。',
    'settings.updateSuccess': '個人資料已更新',
    'settings.updateError': '更新個人資料失敗。',
    'settings.loading': '載入個人資料中…',
    'settings.password.title': '變更密碼',
    'settings.password.current': '目前密碼',
    'settings.password.new': '新密碼',
    'settings.password.confirm': '確認新密碼',
    'settings.password.submit': '更新密碼',
    'settings.password.successTitle': '密碼已更新',
    'settings.password.successDescription': '您的密碼已成功變更。',
    'settings.password.error.invalidCurrent': '目前密碼輸入錯誤。',
    'settings.password.error.generic': '無法更新密碼，請稍後再試。',
    'settings.delete.title': '刪除帳號',
    'settings.delete.description': '這將登出並標記您的帳號為已刪除。若需復原，請聯絡客服。',
    'settings.delete.button': '刪除帳號',
    'settings.delete.dialog.title': '確認刪除帳號',
    'settings.delete.dialog.description': '輸入 DELETE 以確認。此操作僅能透過聯絡客服復原。',
    'settings.delete.dialog.placeholder': '輸入 DELETE 以確認',
    'settings.delete.dialog.cancel': '取消',
    'settings.delete.dialog.confirm': '永久刪除',
    'settings.delete.successTitle': '帳號已刪除',
    'settings.delete.successDescription': '您的帳號已標記為刪除。',
    'settings.delete.errorTitle': '無法刪除帳號',
    'settings.delete.errorDescription': '請稍後再試或聯絡客服。',

    'auth.error.notAuthenticated': '未登入',

    'landing.hero.title.line1': '訂閱管理軟體',
    'landing.hero.title.line2': '阻止每一次意外續約',
    'landing.hero.subtitle':
      'SubMange 將所有固定支出集中在同一個儀表板，幫助你掌握費用、預估年度預算，並提前偵測價格調漲。',
    'landing.hero.helper': '不需信用卡，隨時可取消。',
    'landing.hero.cta': '立即註冊使用',
    'landing.hero.card.title': '今日重點',
    'landing.hero.card.session': '目前進行中',
    'landing.hero.card.focus': '今日優先任務',
    'landing.hero.card.description':
      '檢視續訂風險、多幣別總額與可立即行動的洞察，維持訂閱預算穩定。',
    'landing.hero.card.upNext': '下一步',
    'landing.hero.card.taskOne': '續約前審視 AI 工具的實際使用量',
    'landing.hero.card.taskTwo': '比較音樂串流方案以降低成本',
    'landing.pricing.free': '免費',
    'landing.pricing.freeDescription': '完整功能，永久免費',
    'landing.pricing.features.unlimited': '✓ 無限訂閱追蹤',
    'landing.pricing.features.priceChange': '✓ 價格變動管理',
    'landing.pricing.features.autoRenew': '✓ 自動續訂標記',
    'landing.pricing.features.multiCurrency': '✓ 多幣別支援',
    'landing.features.title': '為什麼團隊選擇 SubMange',
    'landing.features.track.title': '完整的訂閱可視化',
    'landing.features.track.description': '同步串流、SaaS、生活帳單與會員，月費與年費一次看懂。',
    'landing.features.price.title': '自動價格異動通知',
    'landing.features.price.description': '記錄價格歷史、追蹤稅率調整，供應商一調價立即提醒。',
    'landing.features.renew.title': '帶情境的續訂提醒',
    'landing.features.renew.description': '設定續訂週期與負責人，提前安排取消或調整方案。',
    'landing.features.security.title': '企業等級資安',
    'landing.features.security.description': '採用 Supabase 認證、資料加密與列級權限，守護每筆資料。',
    'landing.faq.title': '常見問題',
    'landing.faq.free.question': '這個服務是免費的嗎？',
    'landing.faq.free.answer': '是的！我們提供完全免費的訂閱管理服務。',
    'landing.faq.security.question': '我的資料安全嗎？',
    'landing.faq.security.answer': '絕對安全！資料皆經加密並由 Supabase 托管。',
    'landing.faq.supported.question': '支援哪些訂閱服務？',
    'landing.faq.supported.answer': '串流媒體、軟體服務、健身會員等各種類型都支援。',
    'landing.faq.price.question': '可以追蹤價格變動嗎？',
    'landing.faq.price.answer': '可以！設定新價格的生效日期，系統會自動計算總花費。',
    'landing.faq.devices.question': '支援多個裝置嗎？',
    'landing.faq.devices.answer': '是的！任何裝置登入都會即時同步資料。',
    'landing.cta.title': '現在開始降低重複的訂閱支出',
    'landing.cta.description':
      '超前部署的財務與創作者都在使用 SubMange，談到更好的價格、刪除重複的訂閱。',
    'landing.cta.button': '立即開始使用',
    'footer.copyright': '© 2025 SubMange. All rights reserved.',
    'footer.developer': '開發者: Leander Kuo',
    'footer.github': '在 GitHub 上查看個人頁面',

    'notFound.title': '找不到頁面',
    'notFound.description': '抱歉，您通往的頁面不存在或已被移除。',
    'notFound.back': '回到首頁',

    'brandAutofill.error.noResults': '找不到相關品牌',
    'brandAutofill.error.invalidClient': 'Brandfetch clientId 無效或權限不足',
    'brandAutofill.error.authFailed': 'Brandfetch 驗證失敗',
    'brandAutofill.error.generic': '品牌搜尋發生錯誤',

    'auth.dialog.title': '訂閱管理平台',
    'auth.tabs.signIn': '登入',
    'auth.tabs.signUp': '註冊',
    'auth.fields.email': '電子郵件',
    'auth.fields.password': '密碼',
    'auth.fields.confirmPassword': '確認密碼',
    'auth.validation.fillAll': '請填寫所有欄位',
    'auth.validation.passwordMismatch': '密碼確認不匹配',
    'auth.validation.passwordLength': '密碼至少需要6個字符',
    'auth.signIn.successTitle': '登入成功',
    'auth.signIn.successDescription': '歡迎回來！',
    'auth.signIn.error': '登入失敗',
    'auth.signUp.successTitle': '註冊成功',
    'auth.signUp.successDescription': '請檢查您的郵件以確認帳號',
    'auth.signUp.error': '註冊失敗',
    'auth.oauth.orContinue': '或使用以下方式繼續',
    'auth.oauth.redirectingTitle': '重新導向中',
    'auth.oauth.redirectingGoogle': '正在前往 Google 登入...',
    'auth.oauth.redirectingApple': '正在前往 Apple 登入...',
    'auth.oauth.googleError': 'Google 登入失敗',
    'auth.oauth.appleError': 'Apple 登入失敗',
    'auth.actions.facebook': 'Facebook',
    'auth.oauth.redirectingFacebook': '正在前往 Facebook 登入...',
    'auth.oauth.facebookError': 'Facebook 登入失敗',
    'auth.actions.cancel': '取消',
    'auth.actions.signIn': '登入',
    'auth.actions.signInLoading': '登入中...',
    'auth.actions.signUp': '註冊',
    'auth.actions.signUpLoading': '註冊中...',
    'auth.actions.google': 'Google',
    'auth.actions.apple': 'Apple',
    'auth.actions.signOutLoading': '登出中...',
    'auth.user.fallback': '用戶',

    'error.loadData': '無法載入資料',
    'error.loadDataHint': '請確認後端服務是否啟動，或稍後再試。',
    'errorBoundary.title': '糟糕！發生了一些問題',
    'errorBoundary.subtitle': '我們遇到了一個意外錯誤。請嘗試重新整理頁面。',
    'errorBoundary.backHome': '返回首頁',
  },
};
