export type Locale = "en" | "zh-TW" | "es";

type TranslationMap = Record<Locale, Record<string, string>>;

export const translations: TranslationMap = {
  en: {
    /**
     * Common
     */
    "common.confirm": "Confirm",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.loading": "Loading�K",
    "common.unknownError": "Something went wrong. Please try again.",

    /**
     * Header / Navigation
     */
    "header.title": "SubMange",
    "header.subtitle": "Manage every subscription with clarity",
    "header.language.label": "Language",
    "header.language.en": "English",
    "header.language.zh-TW": "�c�餤��",
    "header.language.es": "Espa?ol",
    "header.addSubscription": "Add Subscription",
    "header.manageCategories": "Manage categories",
    "header.sort": "Sort",
    "header.sort.endDate": "End date",
    "header.sort.price": "Monthly cost",
    "header.sort.name": "Subscription type",
    "header.logout": "Sign out",
    "header.loggedInAs": "Signed in as",
    "header.menu.settings": "Personal settings",
    "header.menu.logout": "Sign out",
    "header.logoutSuccess": "Signed out",
    "header.logoutSuccessDescription": "You have successfully signed out.",
    "header.logoutFailure": "Sign out failed",
    "header.logoutFailureDescription": "Please try again later.",
    "header.priceMode.original": "Original",
    "header.priceMode.monthly": "Monthly",
    "landing.nav.features": "Features",
    "landing.nav.faq": "FAQ",
    "landing.nav.signIn": "Sign in",
    "landing.nav.join": "Join for free",
    "landing.meta.title":
      "SubMange �V Subscription management software for recurring payments",
    "landing.meta.description":
      "Track every subscription, forecast spending, and stay ahead of renewals with SubMange's smart subscription management dashboard.",
    "landing.meta.keywords":
      "subscription manager,subscription tracking software,recurring billing management,saas spend control,renewal reminders",

    /**
     * Dashboard Cards
     */
    "dashboard.totalMonthly": "Total monthly",
    "dashboard.totalSubscriptions": "{count} services",
    "dashboard.active": "Active",
    "dashboard.activeDescription": "Subscriptions in use",
    "dashboard.annualEstimate": "Annual forecast",
    "dashboard.annualEstimateDescription": "Projected spending",
    "dashboard.allSubscriptions": "All subscriptions",

    /**
     * Empty state
     */
    "dashboard.empty.title": "No subscriptions yet",
    "dashboard.empty.description": "Click ��Add subscription�� to get started.",

    /**
     * Categories
     */
    "categories.uncategorized": "Uncategorized",
    "categories.dropHint": "Drop subscriptions here",

    /**
     * Notifications
     */
    "notifications.genericError": "Please try again.",
    "notifications.create.successTitle": "Subscription added",
    "notifications.create.successDescription": "{name} has been added.",
    "notifications.create.errorTitle": "Add failed",
    "notifications.update.successTitle": "Subscription updated",
    "notifications.update.successDescription": "{name} has been updated.",
    "notifications.update.errorTitle": "Update failed",
    "notifications.delete.successTitle": "Subscription deleted",
    "notifications.delete.successDescription":
      "The subscription has been removed.",
    "notifications.delete.errorTitle": "Delete failed",

    "category.notifications.createTitle": "Category added",
    "category.notifications.createSuccess": "Category added",
    "category.notifications.updateTitle": "Category updated",
    "category.notifications.updateSuccess": "Category updated",
    "category.notifications.deleteTitle": "Category deleted",
    "category.notifications.deleteSuccess": "Category removed.",

    /**
     * Add Subscription Dialog
     */
    "addSubscription.openButton": "Add subscription",
    "addSubscription.title": "Add subscription",
    "addSubscription.fields.name": "Service name",
    "addSubscription.fields.brand": "Brand",
    "addSubscription.fields.price": "Price",
    "addSubscription.fields.currency": "Currency",
    "addSubscription.fields.startDate": "Start date",
    "addSubscription.fields.endDate": "End date",
    "addSubscription.fields.billingCycle": "Billing cycle",
    "addSubscription.cycle.mode.preset": "Preset options",
    "addSubscription.cycle.mode.custom": "Custom interval",
    "addSubscription.cycle.customValue": "Interval length",
    "addSubscription.cycle.customUnit": "Interval unit",
    "addSubscription.cycle.customUnit.days": "Days",
    "addSubscription.cycle.customUnit.months": "Months",
    "addSubscription.cycle.customUnit.years": "Years",
    "addSubscription.cycle.helper":
      "The next cycle end date will be calculated automatically from the start date.",
    "addSubscription.fields.iconUrl": "Icon URL (optional)",
    "addSubscription.fields.category": "Subscription category (optional)",
    "addSubscription.fields.category.none": "No category",
    "addSubscription.fields.autoRenew": "Auto renew",
    "addSubscription.submit": "Add",
    "addSubscription.cancel": "Cancel",
    "addSubscription.brand.searching": "Searching�K",
    "addSubscription.brand.noResults": "No related brands found",
    "addSubscription.brand.placeholder": "Enter brand name",

    /**
     * Edit Subscription Dialog
     */
    "editSubscription.openButton": "Edit",
    "editSubscription.title": "Edit subscription",
    "editSubscription.submit": "Update",
    "editSubscription.recordPriceChange": "Record price change",
    "editSubscription.priceEffectiveDate": "Price effective date",
    "editSubscription.priceChangeHint":
      "Set the effective date for the new price",
    "editSubscription.priceChangePreview":
      "Changed from {oldPrice} to {newPrice}",

    /**
     * Billing cycles
     */
    "billingCycle.30days": "30 days",
    "billingCycle.6months": "6 months",
    "billingCycle.1year": "1 year",
    "billingCycle.month": "month",
    "billingCycle.year": "year",
    "billingCycle.halfYear": "half year",
    "billingCycle.monthly": "Monthly",
    "billingCycle.halfYearly": "Half-yearly",
    "billingCycle.yearly": "Yearly",
    "billingCycle.custom": "Custom",

    /**
     * Currency labels
     */
    "currency.TWD": "TWD �V New Taiwan Dollar",
    "currency.USD": "USD �V US Dollar",
    "currency.EUR": "EUR �V Euro",
    "currency.JPY": "JPY �V Japanese Yen",
    "currency.GBP": "GBP �V British Pound",
    "currency.CNY": "CNY �V Chinese Yuan",

    /**
     * Category Management Dialog
     */
    "categoryDialog.title": "Manage subscription categories",
    "categoryDialog.empty": "No categories yet",
    "categoryDialog.add": "Add category",
    "categoryDialog.update": "Update",
    "categoryDialog.cancel": "Cancel",
    "categoryDialog.deleteConfirm":
      "Are you sure you want to delete this category? Linked subscriptions will lose their category.",
    "categoryDialog.fields.name": "Category name",
    "categoryDialog.fields.description": "Description (optional)",
    "categoryDialog.fields.color": "Choose a color",
    "categoryDialog.fields.customColor": "Custom color",
    "categoryDialog.currentColor": "Current: {color}",

    /**
     * Subscription card
     */
    "subscriptionCard.status.expired": "Expired",
    "subscriptionCard.status.expiringSoon": "Expiring soon",
    "subscriptionCard.status.active": "Active",
    "subscriptionCard.total": "Total",

    /**
     * Delete subscription
     */
    "deleteSubscription.confirmTitle": "Delete subscription?",
    "deleteSubscription.confirmMessage":
      "Are you sure you want to delete {name}? This action cannot be undone.",

    /**
     * User settings
     */
    "settings.title": "Profile settings",
    "settings.back": "Back",
    "settings.section.basic": "Basic information",
    "settings.section.account": "Account management",
    "settings.section.security": "Security",
    "settings.email": "Email",
    "settings.email.helper": "Used for subscription notifications",
    "settings.nickname": "Nickname",
    "settings.nickname.helper": "Shown in your profile",
    "settings.defaultCurrency": "Default currency",
    "settings.defaultCurrency.helper":
      "Default currency when adding subscriptions",
    "settings.defaultLanguage": "Preferred language",
    "settings.defaultLanguage.helper": "Language used throughout the app",
    "settings.save": "Save changes",
    "settings.saving": "Saving�K",
    "settings.cancel": "Cancel",
    "settings.signOut": "Sign out",
    "settings.loadingError": "Failed to load profile.",
    "settings.updateSuccess": "Profile updated",
    "settings.updateError": "Failed to update profile.",
    "settings.loading": "Loading profile�K",
    "settings.password.title": "Change password",
    "settings.password.current": "Current password",
    "settings.password.new": "New password",
    "settings.password.confirm": "Confirm new password",
    "settings.password.submit": "Update password",
    "settings.password.successTitle": "Password updated",
    "settings.password.successDescription":
      "Your password has been changed successfully.",
    "settings.password.error.invalidCurrent":
      "The current password you entered is incorrect.",
    "settings.password.error.generic":
      "Unable to update password. Please try again.",
    "settings.delete.title": "Delete account",
    "settings.delete.description":
      "This will sign you out and mark your account for deletion. You can recover it by contacting support.",
    "settings.delete.button": "Delete account",
    "settings.delete.dialog.title": "Confirm account deletion",
    "settings.delete.dialog.description":
      "Type DELETE to confirm. This action can be reverted only by contacting support.",
    "settings.delete.dialog.placeholder": "Type DELETE to confirm",
    "settings.delete.dialog.cancel": "Cancel",
    "settings.delete.dialog.confirm": "Delete permanently",
    "settings.delete.successTitle": "Account deleted",
    "settings.delete.successDescription":
      "Your account has been marked for deletion.",
    "settings.delete.errorTitle": "Unable to delete account",
    "settings.delete.errorDescription": "Please try again or contact support.",

    "auth.error.notAuthenticated": "Not signed in",

    /**
     * Landing page
     */
    "landing.hero.title.line1": "Subscription management software",
    "landing.hero.title.line2": "built to stop unwanted renewals",
    "landing.hero.subtitle":
      "SubMange centralizes every recurring payment so you can monitor spend, forecast annual costs, and catch price hikes before they go live.",
    "landing.hero.helper": "No credit card required. Cancel anytime.",
    "landing.hero.cta": "Join for free",
    "landing.hero.card.title": "Today at a glance",
    "landing.hero.card.session": "Active session",
    "landing.hero.card.focus": "Priority focus today",
    "landing.hero.card.description":
      "Review renewal risk, multi-currency totals, and insights designed to keep your subscription budget predictable.",
    "landing.hero.card.upNext": "Up next",
    "landing.hero.card.taskOne": "Audit AI tool usage before renewal",
    "landing.hero.card.taskTwo": "Compare music streaming plans for savings",
    "landing.pricing.free": "Free",
    "landing.pricing.freeDescription": "Full feature set, free forever",
    "landing.pricing.features.unlimited": "Unlimited subscription tracking",
    "landing.pricing.features.priceChange": "Price change management",
    "landing.pricing.features.autoRenew": "Auto renew tracking",
    "landing.pricing.features.multiCurrency": "Multi-currency support",
    "landing.features.title": "Why teams choose SubMange",
    "landing.features.track.title": "Complete subscription visibility",
    "landing.features.track.description":
      "Sync streaming, SaaS, utilities, and memberships to see monthly and annual totals in one dashboard.",
    "landing.features.price.title": "Automatic price change alerts",
    "landing.features.price.description":
      "Log historical pricing, track tax adjustments, and receive prompts when a provider increases rates.",
    "landing.features.renew.title": "Renewal reminders with context",
    "landing.features.renew.description":
      "Set renewal cadences, assign owners, and stay ahead of cancellations or plan updates.",
    "landing.features.security.title": "Enterprise-grade security",
    "landing.features.security.description":
      "Supabase-backed authentication, row-level security, and encryption keep customer data private.",
    "landing.faq.title": "Frequently asked questions",
    "landing.faq.free.question": "Is this service free?",
    "landing.faq.free.answer":
      "Yes! We offer a completely free subscription manager.",
    "landing.faq.security.question": "Is my data safe?",
    "landing.faq.security.answer":
      "Absolutely. Supabase provides encrypted storage for all data.",
    "landing.faq.supported.question": "Which services are supported?",
    "landing.faq.supported.answer":
      "All types, including streaming, software, and gym memberships.",
    "landing.faq.price.question": "Can I track price changes?",
    "landing.faq.price.answer":
      "Yes. Set effective dates for new prices and we will compute totals automatically.",
    "landing.faq.devices.question": "Does it work across devices?",
    "landing.faq.devices.answer":
      "Yes. Sign in on any device and your data syncs instantly.",
    "landing.cta.title": "Start reducing recurring software waste",
    "landing.cta.description":
      "Join finance leads, founders, and creators using SubMange to negotiate better rates and eliminate duplicate subscriptions.",
    "landing.cta.button": "Start now",
    "footer.copyright": "? 2025 SubMange. All rights reserved.",
    "footer.developer": "Built by Leander Kuo",
    "footer.github": "Visit my GitHub profile",

    /**
     * Not Found
     */
    "notFound.title": "Page not found",
    "notFound.description":
      "Sorry, the page you are looking for does not exist or has been moved.",
    "notFound.back": "Back to home",

    /**
     * Brand autofill
     */
    "brandAutofill.error.noResults": "No related brands found",
    "brandAutofill.error.invalidClient":
      "Brandfetch client ID is invalid or lacks permission.",
    "brandAutofill.error.authFailed": "Brandfetch authentication failed.",
    "brandAutofill.error.generic":
      "An error occurred while searching for brands.",

    "auth.dialog.title": "Subscription Manager",
    "auth.tabs.signIn": "Sign in",
    "auth.tabs.signUp": "Sign up",
    "auth.fields.email": "Email",
    "auth.fields.password": "Password",
    "auth.fields.confirmPassword": "Confirm password",
    "auth.validation.fillAll": "Please fill out all fields.",
    "auth.validation.passwordMismatch": "Passwords do not match.",
    "auth.validation.passwordLength": "Password must be at least 6 characters.",
    "auth.signIn.successTitle": "Signed in",
    "auth.signIn.successDescription": "Welcome back!",
    "auth.signIn.error": "Sign in failed.",
    "auth.signUp.successTitle": "Account created",
    "auth.signUp.successDescription":
      "Check your email to confirm your account.",
    "auth.signUp.error": "Sign up failed.",
    "auth.oauth.orContinue": "Or continue with",
    "auth.oauth.redirectingTitle": "Redirecting",
    "auth.oauth.redirectingGoogle": "Taking you to Google sign in�K",
    "auth.oauth.redirectingApple": "Taking you to Apple sign in�K",
    "auth.oauth.googleError": "Google sign in failed.",
    "auth.oauth.appleError": "Apple sign in failed.",
    "auth.actions.facebook": "Facebook",
    "auth.oauth.redirectingFacebook": "Taking you to Facebook sign in�K",
    "auth.oauth.facebookError": "Facebook sign in failed.",
    "auth.actions.cancel": "Cancel",
    "auth.actions.signIn": "Sign in",
    "auth.actions.signInLoading": "Signing in�K",
    "auth.actions.signUp": "Sign up",
    "auth.actions.signUpLoading": "Signing up�K",
    "auth.actions.google": "Google",
    "auth.actions.apple": "Apple",
    "auth.actions.signOutLoading": "Signing out�K",
    "auth.user.fallback": "User",

    /**
     * Misc
     */
    "error.loadData": "Unable to load data",
    "error.loadDataHint":
      "Please check the backend service or try again later.",
    "errorBoundary.title": "Something went wrong",
    "errorBoundary.subtitle":
      "An unexpected error occurred. Please try refreshing the page.",
    "errorBoundary.backHome": "Back to home",
  },
  es: {
    /**
     * Common
     */
    "common.confirm": "Confirmar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.loading": "Cargando�K",
    "common.unknownError": "Ocurri? un problema. Int?ntalo de nuevo.",

    /**
     * Header / Navigation
     */
    "header.title": "SubMange",
    "header.subtitle": "Administra cada suscripci?n con claridad",
    "header.language.label": "Idioma",
    "header.language.en": "Ingl?s",
    "header.language.zh-TW": "Chino tradicional",
    "header.language.es": "Espa?ol",
    "header.addSubscription": "Agregar suscripci?n",
    "header.manageCategories": "Administrar categor?as",
    "header.sort": "Ordenar",
    "header.sort.endDate": "Fecha de vencimiento",
    "header.sort.price": "Costo mensual",
    "header.sort.name": "Tipo de suscripci?n",
    "header.logout": "Cerrar sesi?n",
    "header.loggedInAs": "Has iniciado sesi?n como",
    "header.menu.settings": "Configuraci?n personal",
    "header.menu.logout": "Cerrar sesi?n",
    "header.logoutSuccess": "Sesi?n cerrada",
    "header.logoutSuccessDescription": "Has cerrado la sesi?n correctamente.",
    "header.logoutFailure": "Error al cerrar sesi?n",
    "header.logoutFailureDescription": "Vuelve a intentarlo m?s tarde.",
    "header.priceMode.original": "Original",
    "header.priceMode.monthly": "Mensual",
    "landing.nav.features": "Funciones",
    "landing.nav.faq": "Preguntas frecuentes",
    "landing.nav.signIn": "Iniciar sesi?n",
    "landing.nav.join": "?nete gratis",
    "landing.meta.title":
      "SubMange �V Software de gesti?n de suscripciones para pagos recurrentes",
    "landing.meta.description":
      "Controla todas tus suscripciones, pronostica el gasto y adel?ntate a las renovaciones con el panel inteligente de SubMange.",
    "landing.meta.keywords":
      "gestor de suscripciones,software de seguimiento de suscripciones,control de pagos recurrentes,gesti?n de gastos saas,recordatorios de renovaci?n",

    /**
     * Dashboard Cards
     */
    "dashboard.totalMonthly": "Gasto mensual total",
    "dashboard.totalSubscriptions": "{count} servicios",
    "dashboard.active": "Activas",
    "dashboard.activeDescription": "Suscripciones en uso",
    "dashboard.annualEstimate": "Pron?stico anual",
    "dashboard.annualEstimateDescription": "Gasto estimado",
    "dashboard.allSubscriptions": "Todas las suscripciones",

    /**
     * Empty state
     */
    "dashboard.empty.title": "A?n no hay suscripciones",
    "dashboard.empty.description":
      "Haz clic en ��Agregar suscripci?n�� para comenzar.",

    /**
     * Categories
     */
    "categories.uncategorized": "Sin categor?a",
    "categories.dropHint": "Suelta las suscripciones aqu?",

    /**
     * Notifications
     */
    "notifications.genericError": "Int?ntalo de nuevo.",
    "notifications.create.successTitle": "Suscripci?n agregada",
    "notifications.create.successDescription": "Se agreg? {name}.",
    "notifications.create.errorTitle": "No se pudo agregar",
    "notifications.update.successTitle": "Suscripci?n actualizada",
    "notifications.update.successDescription": "Se actualiz? {name}.",
    "notifications.update.errorTitle": "No se pudo actualizar",
    "notifications.delete.successTitle": "Suscripci?n eliminada",
    "notifications.delete.successDescription":
      "La suscripci?n se ha eliminado.",
    "notifications.delete.errorTitle": "No se pudo eliminar",

    "category.notifications.createTitle": "Categor?a agregada",
    "category.notifications.createSuccess": "Categor?a agregada",
    "category.notifications.updateTitle": "Categor?a actualizada",
    "category.notifications.updateSuccess": "Categor?a actualizada",
    "category.notifications.deleteTitle": "Categor?a eliminada",
    "category.notifications.deleteSuccess": "Categor?a eliminada.",

    /**
     * Add Subscription Dialog
     */
    "addSubscription.openButton": "Agregar suscripci?n",
    "addSubscription.title": "Agregar suscripci?n",
    "addSubscription.fields.name": "Nombre del servicio",
    "addSubscription.fields.brand": "Marca",
    "addSubscription.fields.price": "Precio",
    "addSubscription.fields.currency": "Moneda",
    "addSubscription.fields.startDate": "Fecha de inicio",
    "addSubscription.fields.endDate": "Fecha de finalizaci?n",
    "addSubscription.fields.billingCycle": "Ciclo de facturaci?n",
    "addSubscription.cycle.mode.preset": "Opciones predefinidas",
    "addSubscription.cycle.mode.custom": "Intervalo personalizado",
    "addSubscription.cycle.customValue": "Duraci?n del intervalo",
    "addSubscription.cycle.customUnit": "Unidad del intervalo",
    "addSubscription.cycle.customUnit.days": "D?as",
    "addSubscription.cycle.customUnit.months": "Meses",
    "addSubscription.cycle.customUnit.years": "A?os",
    "addSubscription.cycle.helper":
      "La fecha de fin del pr?ximo ciclo se calcular? autom?ticamente a partir de la fecha de inicio.",
    "addSubscription.fields.iconUrl": "URL del ?cono (opcional)",
    "addSubscription.fields.category": "Categor?a de suscripci?n (opcional)",
    "addSubscription.fields.category.none": "Sin categor?a",
    "addSubscription.fields.autoRenew": "Renovaci?n autom?tica",
    "addSubscription.submit": "Agregar",
    "addSubscription.cancel": "Cancelar",
    "addSubscription.brand.searching": "Buscando�K",
    "addSubscription.brand.noResults": "No se encontraron marcas relacionadas",
    "addSubscription.brand.placeholder": "Ingresa el nombre de la marca",

    /**
     * Edit Subscription Dialog
     */
    "editSubscription.openButton": "Editar",
    "editSubscription.title": "Editar suscripci?n",
    "editSubscription.submit": "Actualizar",
    "editSubscription.recordPriceChange": "Registrar cambio de precio",
    "editSubscription.priceEffectiveDate": "Fecha de entrada en vigor",
    "editSubscription.priceChangeHint":
      "Define la fecha de entrada en vigor del nuevo precio",
    "editSubscription.priceChangePreview":
      "Cambiado de {oldPrice} a {newPrice}",

    /**
     * Billing cycles
     */
    "billingCycle.30days": "30 d?as",
    "billingCycle.6months": "6 meses",
    "billingCycle.1year": "1 a?o",
    "billingCycle.month": "mes",
    "billingCycle.year": "a?o",
    "billingCycle.halfYear": "medio a?o",
    "billingCycle.monthly": "Mensual",
    "billingCycle.halfYearly": "Semestral",
    "billingCycle.yearly": "Anual",
    "billingCycle.custom": "Personalizado",

    /**
     * Currency labels
     */
    "currency.TWD": "TWD �V Nuevo d?lar taiwan?s",
    "currency.USD": "USD �V D?lar estadounidense",
    "currency.EUR": "EUR �V Euro",
    "currency.JPY": "JPY �V Yen japon?s",
    "currency.GBP": "GBP �V Libra esterlina",
    "currency.CNY": "CNY �V Yuan chino",

    /**
     * Category Management Dialog
     */
    "categoryDialog.title": "Administrar categor?as de suscripci?n",
    "categoryDialog.empty": "A?n no hay categor?as",
    "categoryDialog.add": "Agregar categor?a",
    "categoryDialog.update": "Actualizar",
    "categoryDialog.cancel": "Cancelar",
    "categoryDialog.deleteConfirm":
      "?Seguro que deseas eliminar esta categor?a? Las suscripciones vinculadas perder?n su categor?a.",
    "categoryDialog.fields.name": "Nombre de la categor?a",
    "categoryDialog.fields.description": "Descripci?n (opcional)",
    "categoryDialog.fields.color": "Elige un color",
    "categoryDialog.fields.customColor": "Color personalizado",
    "categoryDialog.currentColor": "Actual: {color}",

    /**
     * Subscription card
     */
    "subscriptionCard.status.expired": "Vencida",
    "subscriptionCard.status.expiringSoon": "Por vencer",
    "subscriptionCard.status.active": "Activa",
    "subscriptionCard.total": "Total",

    /**
     * Delete subscription
     */
    "deleteSubscription.confirmTitle": "?Eliminar suscripci?n?",
    "deleteSubscription.confirmMessage":
      "?Seguro que deseas eliminar {name}? Esta acci?n no se puede deshacer.",

    /**
     * User settings
     */
    "settings.title": "Configuraci?n del perfil",
    "settings.back": "Regresar",
    "settings.section.basic": "Informaci?n b?sica",
    "settings.section.account": "Administraci?n de la cuenta",
    "settings.section.security": "Seguridad",
    "settings.email": "Correo electr?nico",
    "settings.email.helper": "Se usa para notificaciones de suscripci?n",
    "settings.nickname": "Apodo",
    "settings.nickname.helper": "Se muestra en tu perfil",
    "settings.defaultCurrency": "Moneda predeterminada",
    "settings.defaultCurrency.helper":
      "Moneda predeterminada al agregar suscripciones",
    "settings.defaultLanguage": "Idioma preferido",
    "settings.defaultLanguage.helper": "Idioma usado en toda la aplicaci?n",
    "settings.save": "Guardar cambios",
    "settings.saving": "Guardando�K",
    "settings.cancel": "Cancelar",
    "settings.signOut": "Cerrar sesi?n",
    "settings.loadingError": "No se pudo cargar el perfil.",
    "settings.updateSuccess": "Perfil actualizado",
    "settings.updateError": "No se pudo actualizar el perfil.",
    "settings.loading": "Cargando perfil�K",
    "settings.password.title": "Cambiar contrase?a",
    "settings.password.current": "Contrase?a actual",
    "settings.password.new": "Nueva contrase?a",
    "settings.password.confirm": "Confirmar nueva contrase?a",
    "settings.password.submit": "Actualizar contrase?a",
    "settings.password.successTitle": "Contrase?a actualizada",
    "settings.password.successDescription":
      "Tu contrase?a se cambi? correctamente.",
    "settings.password.error.invalidCurrent":
      "La contrase?a actual es incorrecta.",
    "settings.password.error.generic":
      "No se pudo actualizar la contrase?a. Int?ntalo de nuevo.",
    "settings.delete.title": "Eliminar cuenta",
    "settings.delete.description":
      "Esto cerrar? tu sesi?n y marcar? tu cuenta para eliminaci?n. Puedes recuperarla contactando al soporte.",
    "settings.delete.button": "Eliminar cuenta",
    "settings.delete.dialog.title": "Confirmar eliminaci?n de la cuenta",
    "settings.delete.dialog.description":
      "Escribe DELETE para confirmar. Solo podr?s revertirlo contactando al soporte.",
    "settings.delete.dialog.placeholder": "Escribe DELETE para confirmar",
    "settings.delete.dialog.cancel": "Cancelar",
    "settings.delete.dialog.confirm": "Eliminar de forma permanente",
    "settings.delete.successTitle": "Cuenta eliminada",
    "settings.delete.successDescription":
      "Tu cuenta ha sido marcada para eliminaci?n.",
    "settings.delete.errorTitle": "No se pudo eliminar la cuenta",
    "settings.delete.errorDescription":
      "Int?ntalo de nuevo o contacta al soporte.",

    "auth.error.notAuthenticated": "No has iniciado sesi?n",

    /**
     * Landing page
     */
    "landing.hero.title.line1": "Software de gesti?n de suscripciones",
    "landing.hero.title.line2":
      "creado para frenar las renovaciones no deseadas",
    "landing.hero.subtitle":
      "SubMange centraliza cada pago recurrente para que controles el gasto, proyectes el coste anual y detectes subidas de precio antes de que ocurran.",
    "landing.hero.helper": "Sin tarjeta de cr?dito. Cancela cuando quieras.",
    "landing.hero.cta": "?nete gratis",
    "landing.hero.card.title": "Resumen de hoy",
    "landing.hero.card.session": "Sesi?n activa",
    "landing.hero.card.focus": "Prioridad de hoy",
    "landing.hero.card.description":
      "Revisa riesgos de renovaci?n, totales multimoneda y m?tricas accionables para mantener predecible tu presupuesto de suscripciones.",
    "landing.hero.card.upNext": "Pr?ximo",
    "landing.hero.card.taskOne":
      "Audita el uso de herramientas de IA antes de renovar",
    "landing.hero.card.taskTwo": "Compara planes de m?sica para ahorrar",
    "landing.pricing.free": "Gratis",
    "landing.pricing.freeDescription":
      "Todas las funciones, gratis para siempre",
    "landing.pricing.features.unlimited":
      "Seguimiento ilimitado de suscripciones",
    "landing.pricing.features.priceChange": "Gesti?n de cambios de precio",
    "landing.pricing.features.autoRenew":
      "Seguimiento de renovaciones autom?ticas",
    "landing.pricing.features.multiCurrency": "Compatibilidad multimoneda",
    "landing.features.title": "Por qu? los equipos eligen SubMange",
    "landing.features.track.title": "Visibilidad total de suscripciones",
    "landing.features.track.description":
      "Sincroniza streaming, SaaS, servicios y membres?as para ver totales mensuales y anuales en un solo panel.",
    "landing.features.price.title": "Alertas autom?ticas de cambios de precio",
    "landing.features.price.description":
      "Registra el historial de precios, sigue impuestos y recibe avisos cuando un proveedor aumenta tarifas.",
    "landing.features.renew.title": "Recordatorios de renovaci?n con contexto",
    "landing.features.renew.description":
      "Define cadencias de renovaci?n, asigna responsables y antic?pate a cancelaciones o cambios de plan.",
    "landing.features.security.title": "Seguridad de nivel empresarial",
    "landing.features.security.description":
      "Autenticaci?n con Supabase, seguridad a nivel de fila y cifrado para proteger tus datos.",
    "landing.faq.title": "Preguntas frecuentes",
    "landing.faq.free.question": "?El servicio es gratuito?",
    "landing.faq.free.answer":
      "?S?! Ofrecemos un gestor de suscripciones totalmente gratuito.",
    "landing.faq.security.question": "?Mis datos est?n seguros?",
    "landing.faq.security.answer":
      "Por supuesto. Supabase proporciona almacenamiento cifrado para todos los datos.",
    "landing.faq.supported.question": "?Qu? servicios son compatibles?",
    "landing.faq.supported.answer":
      "Todos: streaming, software y membres?as de gimnasio.",
    "landing.faq.price.question": "?Puedo controlar los cambios de precio?",
    "landing.faq.price.answer":
      "S?. Define las fechas efectivas de los nuevos precios y calcularemos los totales autom?ticamente.",
    "landing.faq.devices.question": "?Funciona en varios dispositivos?",
    "landing.faq.devices.answer":
      "S?. Inicia sesi?n en cualquier dispositivo y tus datos se sincronizan al instante.",
    "landing.cta.title": "Reduce el desperdicio de software recurrente",
    "landing.cta.description":
      "?nete a l?deres financieros, fundadores y creadores que usan SubMange para negociar mejores tarifas y eliminar suscripciones duplicadas.",
    "landing.cta.button": "Comenzar ahora",
    "footer.copyright": "? 2025 SubMange. Todos los derechos reservados.",
    "footer.developer": "Creado por Leander Kuo",
    "footer.github": "Visita mi perfil de GitHub",

    /**
     * Not Found
     */
    "notFound.title": "P?gina no encontrada",
    "notFound.description":
      "Lo sentimos, la p?gina que buscas no existe o fue movida.",
    "notFound.back": "Volver al inicio",

    /**
     * Brand autofill
     */
    "brandAutofill.error.noResults": "No se encontraron marcas relacionadas",
    "brandAutofill.error.invalidClient":
      "El ID de cliente de Brandfetch no es v?lido o no tiene permisos.",
    "brandAutofill.error.authFailed": "Fall? la autenticaci?n de Brandfetch.",
    "brandAutofill.error.generic": "Se produjo un error al buscar marcas.",

    "auth.dialog.title": "Gestor de suscripciones",
    "auth.tabs.signIn": "Iniciar sesi?n",
    "auth.tabs.signUp": "Registrarse",
    "auth.fields.email": "Correo electr?nico",
    "auth.fields.password": "Contrase?a",
    "auth.fields.confirmPassword": "Confirmar contrase?a",
    "auth.validation.fillAll": "Completa todos los campos.",
    "auth.validation.passwordMismatch": "Las contrase?as no coinciden.",
    "auth.validation.passwordLength":
      "La contrase?a debe tener al menos 6 caracteres.",
    "auth.signIn.successTitle": "Sesi?n iniciada",
    "auth.signIn.successDescription": "?Bienvenido de nuevo!",
    "auth.signIn.error": "Error al iniciar sesi?n.",
    "auth.signUp.successTitle": "Cuenta creada",
    "auth.signUp.successDescription":
      "Revisa tu correo para confirmar la cuenta.",
    "auth.signUp.error": "Error al registrarse.",
    "auth.oauth.orContinue": "O contin?a con",
    "auth.oauth.redirectingTitle": "Redirigiendo",
    "auth.oauth.redirectingGoogle": "Abriendo inicio de sesi?n con Google�K",
    "auth.oauth.redirectingApple": "Abriendo inicio de sesi?n con Apple�K",
    "auth.oauth.googleError": "Error en el inicio de sesi?n con Google.",
    "auth.oauth.appleError": "Error en el inicio de sesi?n con Apple.",
    "auth.actions.facebook": "Facebook",
    "auth.oauth.redirectingFacebook": "Abriendo inicio de sesi?n con Facebook�K",
    "auth.oauth.facebookError": "Error en el inicio de sesi?n con Facebook.",
    "auth.actions.cancel": "Cancelar",
    "auth.actions.signIn": "Iniciar sesi?n",
    "auth.actions.signInLoading": "Iniciando sesi?n�K",
    "auth.actions.signUp": "Registrarse",
    "auth.actions.signUpLoading": "Registr?ndose�K",
    "auth.actions.google": "Google",
    "auth.actions.apple": "Apple",
    "auth.actions.signOutLoading": "Cerrando sesi?n�K",
    "auth.user.fallback": "Usuario",

    /**
     * Misc
     */
    "error.loadData": "No se pueden cargar los datos",
    "error.loadDataHint": "Verifica el servicio backend o int?ntalo m?s tarde.",
    "errorBoundary.title": "Algo sali? mal",
    "errorBoundary.subtitle":
      "Ocurri? un error inesperado. Intenta actualizar la p?gina.",
    "errorBoundary.backHome": "Volver al inicio",
  },
  "zh-TW": {
    "common.confirm": "�T�{",
    "common.cancel": "����",
    "common.delete": "�R��",
    "common.edit": "�s��",
    "common.loading": "���J���K",
    "common.unknownError": "�o�Ϳ��~�A�еy��A�աC",

    "header.title": "SubMange",
    "header.subtitle": "���P�޲z�A���Ҧ��q�\�A��",
    "header.language.label": "�y��",
    "header.language.en": "English",
    "header.language.zh-TW": "�c�餤��",
    "header.language.es": "��Z���y",
    "header.addSubscription": "�s�W�q�\",
    "header.manageCategories": "�޲z����",
    "header.sort": "�Ƨ�",
    "header.sort.endDate": "������",
    "header.sort.price": "��O����",
    "header.sort.name": "�q�\����",
    "header.logout": "�n�X",
    "header.loggedInAs": "�n�J��",
    "header.menu.settings": "�ӤH�]�w",
    "header.menu.logout": "�n�X",
    "header.logoutSuccess": "�w�n�X",
    "header.logoutSuccessDescription": "�z�w���\�n�X",
    "header.logoutFailure": "�n�X����",
    "header.logoutFailureDescription": "�еy��A��",
    "header.priceMode.original": "�쭫��O",
    "header.priceMode.monthly": "��O����",
    "landing.nav.features": "�\�श��",
    "landing.nav.faq": "�`�����D",
    "landing.nav.signIn": "�n�J",
    "landing.nav.join": "�ߧY���U",
    "landing.meta.title": "SubMange �V �q�\�޲z�n��A�����x���C����q",
    "landing.meta.description":
      "SubMange ��X�Ҧ��q�\��X�A��U�A�ʱ��C��P�~�׶O�ΡB���e�wĵ�������קK�����n���۰�����C",
    "landing.meta.keywords":
      "�q�\�޲z,�q�\�l�ܤu��,�T�w��������,SaaS ��X�޲z,��q����",

    "dashboard.totalMonthly": "�`��O",
    "dashboard.totalSubscriptions": "{count} �ӪA��",
    "dashboard.active": "�ϥΤ�",
    "dashboard.activeDescription": "�ӭq�\�A��",
    "dashboard.annualEstimate": "�~�׹w��",
    "dashboard.annualEstimateDescription": "�w����O",
    "dashboard.allSubscriptions": "�Ҧ��q�\",

    "dashboard.empty.title": "�|���s�W����q�\",
    "dashboard.empty.description": "�I���u�s�W�q�\�v�}�l�޲z�A���q�\�A��",

    "categories.uncategorized": "������",
    "categories.dropHint": "�즲�q�\�ܦ�����",

    "notifications.genericError": "�еy��A�դ@���C",
    "notifications.create.successTitle": "�s�W���\",
    "notifications.create.successDescription": "�w�s�W {name} �q�\",
    "notifications.create.errorTitle": "�s�W����",
    "notifications.update.successTitle": "��s���\",
    "notifications.update.successDescription": "�w��s {name} �q�\",
    "notifications.update.errorTitle": "��s����",
    "notifications.delete.successTitle": "�R�����\",
    "notifications.delete.successDescription": "�q�\�w�R���C",
    "notifications.delete.errorTitle": "�R������",

    "category.notifications.createTitle": "�s�W���\",
    "category.notifications.createSuccess": "�����w�s�W�C",
    "category.notifications.updateTitle": "��s���\",
    "category.notifications.updateSuccess": "�����w��s�C",
    "category.notifications.deleteTitle": "�R�����\",
    "category.notifications.deleteSuccess": "�����w�R���C",

    "addSubscription.openButton": "�s�W�q�\",
    "addSubscription.title": "�s�W�q�\�A��",
    "addSubscription.fields.name": "�A�ȦW��",
    "addSubscription.fields.brand": "�~�P",
    "addSubscription.fields.price": "����",
    "addSubscription.fields.currency": "�f��",
    "addSubscription.fields.startDate": "�}�l���",
    "addSubscription.fields.endDate": "�������",
    "addSubscription.fields.billingCycle": "�p��P��",
    "addSubscription.cycle.mode.preset": "�w�]�P��",
    "addSubscription.cycle.mode.custom": "�ۭq�P��",
    "addSubscription.cycle.customValue": "�P������",
    "addSubscription.cycle.customUnit": "�P�����",
    "addSubscription.cycle.customUnit.days": "��",
    "addSubscription.cycle.customUnit.months": "��",
    "addSubscription.cycle.customUnit.years": "�~",
    "addSubscription.cycle.helper": "�t�η|�̶}�l����۰ʭp��U�@���g���C",
    "addSubscription.fields.iconUrl": "Icon URL�]���^",
    "addSubscription.fields.category": "�q�\�����]���^",
    "addSubscription.fields.category.none": "�L����",
    "addSubscription.fields.autoRenew": "�۰���q",
    "addSubscription.submit": "�s�W",
    "addSubscription.cancel": "����",
    "addSubscription.brand.searching": "�j�M�~�P���K",
    "addSubscription.brand.noResults": "�䤣������~�P",
    "addSubscription.brand.placeholder": "�п�J�~�P�W��",

    "editSubscription.openButton": "�s��",
    "editSubscription.title": "�s��q�\�A��",
    "editSubscription.submit": "��s",
    "editSubscription.recordPriceChange": "�O�������ܰ�",
    "editSubscription.priceEffectiveDate": "����ͮĤ��",
    "editSubscription.priceChangeHint": "�]�w�����ܰʪ��ͮĤ��",
    "editSubscription.priceChangePreview": "�q {oldPrice} �ܧ� {newPrice}",

    "billingCycle.30days": "30��",
    "billingCycle.6months": "6�Ӥ�",
    "billingCycle.1year": "1�~",
    "billingCycle.month": "��",
    "billingCycle.year": "�~",
    "billingCycle.halfYear": "�b�~",
    "billingCycle.monthly": "����",
    "billingCycle.halfYearly": "�b�~",
    "billingCycle.yearly": "�~�I",
    "billingCycle.custom": "�ۭq",

    "currency.TWD": "TWD - �s�x��",
    "currency.USD": "USD - ����",
    "currency.EUR": "EUR - �ڤ�",
    "currency.JPY": "JPY - ���",
    "currency.GBP": "GBP - �^��",
    "currency.CNY": "CNY - �H����",

    "categoryDialog.title": "�޲z�q�\����",
    "categoryDialog.empty": "�|���إߥ�������",
    "categoryDialog.add": "�s�W����",
    "categoryDialog.update": "��s",
    "categoryDialog.cancel": "����",
    "categoryDialog.deleteConfirm":
      "�T�w�n�R���������ܡH�����q�\�������N�Q�����C",
    "categoryDialog.fields.name": "�����W��",
    "categoryDialog.fields.description": "�y�z�]���^",
    "categoryDialog.fields.color": "����C��",
    "categoryDialog.fields.customColor": "�ۭq�C��",
    "categoryDialog.currentColor": "���e�C��G{color}",

    "subscriptionCard.status.expired": "�w�L��",
    "subscriptionCard.status.expiringSoon": "�Y�N���",
    "subscriptionCard.status.active": "�ϥΤ�",
    "subscriptionCard.total": "�`�p",

    /**
     * Delete subscription
     */
    "deleteSubscription.confirmTitle": "�R���q�\�H",
    "deleteSubscription.confirmMessage":
      "�T�w�n�R�� {name} �ܡH���ާ@�L�k�_��C",

    "settings.title": "�ӤH�]�w",
    "settings.back": "��^",
    "settings.section.basic": "�򥻸��",
    "settings.section.account": "�b���޲z",
    "settings.section.security": "�w����",
    "settings.email": "Email",
    "settings.email.helper": "�Ω󱵦��q�\�q��",
    "settings.nickname": "�ʺ�",
    "settings.nickname.helper": "��ܦb�ӤH��Ƥ�",
    "settings.defaultCurrency": "�w�]���O",
    "settings.defaultCurrency.helper": "�s�W�q�\�ɪ��w�]�f��",
    "settings.defaultLanguage": "���n�y��",
    "settings.defaultLanguage.helper": "�t����ܪ��y��",
    "settings.save": "�x�s�ܧ�",
    "settings.saving": "�x�s���K",
    "settings.cancel": "����",
    "settings.signOut": "�n�X",
    "settings.loadingError": "���J�ӤH��ƥ��ѡC",
    "settings.updateSuccess": "�ӤH��Ƥw��s",
    "settings.updateError": "��s�ӤH��ƥ��ѡC",
    "settings.loading": "���J�ӤH��Ƥ��K",
    "settings.password.title": "�ܧ�K�X",
    "settings.password.current": "�ثe�K�X",
    "settings.password.new": "�s�K�X",
    "settings.password.confirm": "�T�{�s�K�X",
    "settings.password.submit": "��s�K�X",
    "settings.password.successTitle": "�K�X�w��s",
    "settings.password.successDescription": "�z���K�X�w���\�ܧ�C",
    "settings.password.error.invalidCurrent": "�ثe�K�X��J���~�C",
    "settings.password.error.generic": "�L�k��s�K�X�A�еy��A�աC",
    "settings.delete.title": "�R���b��",
    "settings.delete.description":
      "�o�N�n�X�üаO�z���b�����w�R���C�Y�ݴ_��A���p���ȪA�C",
    "settings.delete.button": "�R���b��",
    "settings.delete.dialog.title": "�T�{�R���b��",
    "settings.delete.dialog.description":
      "��J DELETE �H�T�{�C���ާ@�ȯ�z�L�p���ȪA�_��C",
    "settings.delete.dialog.placeholder": "��J DELETE �H�T�{",
    "settings.delete.dialog.cancel": "����",
    "settings.delete.dialog.confirm": "�ä[�R��",
    "settings.delete.successTitle": "�b���w�R��",
    "settings.delete.successDescription": "�z���b���w�аO���R���C",
    "settings.delete.errorTitle": "�L�k�R���b��",
    "settings.delete.errorDescription": "�еy��A�թ��p���ȪA�C",

    "auth.error.notAuthenticated": "���n�J",

    "landing.hero.title.line1": "�q�\�޲z�n��",
    "landing.hero.title.line2": "����C�@���N�~���",
    "landing.hero.subtitle":
      "SubMange �N�Ҧ��T�w��X�����b�P�@�ӻ����O�A���U�A�x���O�ΡB�w���~�׹w��A�ô��e��������պ��C",
    "landing.hero.helper": "���ݫH�Υd�A�H�ɥi�����C",
    "landing.hero.cta": "�ߧY���U�ϥ�",
    "landing.hero.card.title": "���魫�I",
    "landing.hero.card.session": "�ثe�i�椤",
    "landing.hero.card.focus": "�����u������",
    "landing.hero.card.description":
      "�˵���q���I�B�h���O�`�B�P�i�ߧY��ʪ��}��A�����q�\�w��í�w�C",
    "landing.hero.card.upNext": "�U�@�B",
    "landing.hero.card.taskOne": "����e�f�� AI �u�㪺��ڨϥζq",
    "landing.hero.card.taskTwo": "������֦�y��ץH���C����",
    "landing.pricing.free": "�K�O",
    "landing.pricing.freeDescription": "����\��A�ä[�K�O",
    "landing.pricing.features.unlimited": "? �L���q�\�l��",
    "landing.pricing.features.priceChange": "? �����ܰʺ޲z",
    "landing.pricing.features.autoRenew": "? �۰���q�аO",
    "landing.pricing.features.multiCurrency": "? �h���O�䴩",
    "landing.features.title": "������ζ���� SubMange",
    "landing.features.track.title": "���㪺�q�\�i����",
    "landing.features.track.description":
      "�P�B��y�BSaaS�B�ͬ��b��P�|���A��O�P�~�O�@�������C",
    "landing.features.price.title": "�۰ʻ��沧�ʳq��",
    "landing.features.price.description":
      "�O��������v�B�l�ܵ|�v�վ�A�����Ӥ@�ջ��ߧY�����C",
    "landing.features.renew.title": "�a���Ҫ���q����",
    "landing.features.renew.description":
      "�]�w��q�g���P�t�d�H�A���e�w�ƨ����νվ��סC",
    "landing.features.security.title": "���~���Ÿ�w",
    "landing.features.security.description":
      "�ĥ� Supabase �{�ҡB��ƥ[�K�P�C���v���A�u�@�C����ơC",
    "landing.faq.title": "�`�����D",
    "landing.faq.free.question": "�o�ӪA�ȬO�K�O���ܡH",
    "landing.faq.free.answer": "�O���I�ڭ̴��ѧ����K�O���q�\�޲z�A�ȡC",
    "landing.faq.security.question": "�ڪ���Ʀw���ܡH",
    "landing.faq.security.answer": "����w���I��ƬҸg�[�K�å� Supabase ���ޡC",
    "landing.faq.supported.question": "�䴩���ǭq�\�A�ȡH",
    "landing.faq.supported.answer":
      "��y�C��B�n��A�ȡB�����|�����U���������䴩�C",
    "landing.faq.price.question": "�i�H�l�ܻ����ܰʶܡH",
    "landing.faq.price.answer":
      "�i�H�I�]�w�s���檺�ͮĤ���A�t�η|�۰ʭp���`��O�C",
    "landing.faq.devices.question": "�䴩�h�Ӹ˸m�ܡH",
    "landing.faq.devices.answer": "�O���I����˸m�n�J���|�Y�ɦP�B��ơC",
    "landing.cta.title": "�{�b�}�l���C���ƪ��q�\��X",
    "landing.cta.description":
      "�W�e���p���]�ȻP�Ч@�̳��b�ϥ� SubMange�A�ͨ��n������B�R�����ƪ��q�\�C",
    "landing.cta.button": "�ߧY�}�l�ϥ�",
    "footer.copyright": "? 2025 SubMange. All rights reserved.",
    "footer.developer": "�}�o��: Leander Kuo",
    "footer.github": "�b GitHub �W�d�ݭӤH����",

    "notFound.title": "�䤣�쭶��",
    "notFound.description": "��p�A�z�q�����������s�b�Τw�Q�����C",
    "notFound.back": "�^�쭺��",

    "brandAutofill.error.noResults": "�䤣������~�P",
    "brandAutofill.error.invalidClient": "Brandfetch clientId �L�ĩ��v������",
    "brandAutofill.error.authFailed": "Brandfetch ���ҥ���",
    "brandAutofill.error.generic": "�~�P�j�M�o�Ϳ��~",

    "auth.dialog.title": "�q�\�޲z���x",
    "auth.tabs.signIn": "�n�J",
    "auth.tabs.signUp": "���U",
    "auth.fields.email": "�q�l�l��",
    "auth.fields.password": "�K�X",
    "auth.fields.confirmPassword": "�T�{�K�X",
    "auth.validation.fillAll": "�ж�g�Ҧ����",
    "auth.validation.passwordMismatch": "�K�X�T�{���ǰt",
    "auth.validation.passwordLength": "�K�X�ܤֻݭn6�Ӧr��",
    "auth.signIn.successTitle": "�n�J���\",
    "auth.signIn.successDescription": "�w��^�ӡI",
    "auth.signIn.error": "�n�J����",
    "auth.signUp.successTitle": "���U���\",
    "auth.signUp.successDescription": "���ˬd�z���l��H�T�{�b��",
    "auth.signUp.error": "���U����",
    "auth.oauth.orContinue": "�ΨϥΥH�U�覡�~��",
    "auth.oauth.redirectingTitle": "���s�ɦV��",
    "auth.oauth.redirectingGoogle": "���b�e�� Google �n�J...",
    "auth.oauth.redirectingApple": "���b�e�� Apple �n�J...",
    "auth.oauth.googleError": "Google �n�J����",
    "auth.oauth.appleError": "Apple �n�J����",
    "auth.actions.facebook": "Facebook",
    "auth.oauth.redirectingFacebook": "���b�e�� Facebook �n�J...",
    "auth.oauth.facebookError": "Facebook �n�J����",
    "auth.actions.cancel": "����",
    "auth.actions.signIn": "�n�J",
    "auth.actions.signInLoading": "�n�J��...",
    "auth.actions.signUp": "���U",
    "auth.actions.signUpLoading": "���U��...",
    "auth.actions.google": "Google",
    "auth.actions.apple": "Apple",
    "auth.actions.signOutLoading": "�n�X��...",
    "auth.user.fallback": "�Τ�",

    "error.loadData": "�L�k���J���",
    "error.loadDataHint": "�нT�{��ݪA�ȬO�_�ҰʡA�εy��A�աC",
    "errorBoundary.title": "�V�|�I�o�ͤF�@�ǰ��D",
    "errorBoundary.subtitle": "�ڭ̹J��F�@�ӷN�~���~�C�й��խ��s��z�����C",
    "errorBoundary.backHome": "��^����",
  },
};
