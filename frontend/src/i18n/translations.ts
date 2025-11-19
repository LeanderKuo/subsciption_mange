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
    "common.loading": "Loading…",
    "common.unknownError": "Something went wrong. Please try again.",

    /**
     * Header / Navigation
     */
    "header.title": "SubMange",
    "header.subtitle": "Manage every subscription with clarity",
    "header.language.label": "Language",
    "header.language.en": "English",
    "header.language.zh-TW": "繁體中文",
    "header.language.es": "Español",
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
      "SubMange – Subscription management software for recurring payments",
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
    "dashboard.empty.description":
      "Click \"Add subscription\" to get started.",

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
    "addSubscription.brand.searching": "Searching…",
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
    "currency.TWD": "TWD – New Taiwan Dollar",
    "currency.USD": "USD – US Dollar",
    "currency.EUR": "EUR – Euro",
    "currency.JPY": "JPY – Japanese Yen",
    "currency.GBP": "GBP – British Pound",
    "currency.CNY": "CNY – Chinese Yuan",

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
    "settings.saving": "Saving…",
    "settings.cancel": "Cancel",
    "settings.signOut": "Sign out",
    "settings.loadingError": "Failed to load profile.",
    "settings.updateSuccess": "Profile updated",
    "settings.updateError": "Failed to update profile.",
    "settings.loading": "Loading profile…",
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
    "landing.features.title": "Why choose SubMange",
    "landing.features.track.title": "Complete subscription visibility",
    "landing.features.track.description":
      "Track streaming, SaaS, utilities, and memberships to see monthly and annual totals in one dashboard with automatic multi-currency conversion.",
    "landing.features.category.title": "Custom category management",
    "landing.features.category.description":
      "Create personalized categories with color labels to organize your subscriptions and easily manage different types of services.",
    "landing.features.cycle.title": "Flexible billing cycles",
    "landing.features.cycle.description":
      "Support for monthly, semi-annual, yearly, or completely custom billing cycles to precisely track each subscription's renewal date.",
    "landing.features.security.title": "Secure and private",
    "landing.features.security.description":
      "Supabase authentication, row-level security, and encryption ensure your subscription data stays completely private.",
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
    "landing.faq.price.question": "Can I track my subscription history?",
    "landing.faq.price.answer":
      "Yes. Edit your subscriptions anytime to update pricing, and the system will automatically recalculate monthly and annual totals.",
    "landing.faq.devices.question": "Does it work across devices?",
    "landing.faq.devices.answer":
      "Yes. Sign in on any device and your data syncs instantly.",
    "landing.cta.title": "Start reducing recurring software waste",
    "landing.cta.description":
      "Join finance leads, founders, and creators using SubMange to negotiate better rates and eliminate duplicate subscriptions.",
    "landing.cta.button": "Start now",
    "footer.copyright": "© 2025 SubMange. All rights reserved.",
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
    "auth.oauth.redirectingGoogle": "Taking you to Google sign in…",
    "auth.oauth.redirectingApple": "Taking you to Apple sign in…",
    "auth.oauth.googleError": "Google sign in failed.",
    "auth.oauth.appleError": "Apple sign in failed.",
    "auth.actions.facebook": "Facebook",
    "auth.oauth.redirectingFacebook": "Taking you to Facebook sign in…",
    "auth.oauth.facebookError": "Facebook sign in failed.",
    "auth.actions.cancel": "Cancel",
    "auth.actions.signIn": "Sign in",
    "auth.actions.signInLoading": "Signing in…",
    "auth.actions.signUp": "Sign up",
    "auth.actions.signUpLoading": "Signing up…",
    "auth.actions.google": "Google",
    "auth.actions.apple": "Apple",
    "auth.actions.signOutLoading": "Signing out…",
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
    "common.loading": "Cargando…",
    "common.unknownError": "Ocurrió un problema. Inténtalo de nuevo.",

    /**
     * Header / Navigation
     */
    "header.title": "SubMange",
    "header.subtitle": "Administra cada suscripción con claridad",
    "header.language.label": "Idioma",
    "header.language.en": "English",
    "header.language.zh-TW": "繁體中文",
    "header.language.es": "Español",
    "header.addSubscription": "Agregar suscripción",
    "header.manageCategories": "Administrar categorías",
    "header.sort": "Ordenar",
    "header.sort.endDate": "Fecha de vencimiento",
    "header.sort.price": "Costo mensual",
    "header.sort.name": "Tipo de suscripción",
    "header.logout": "Cerrar sesión",
    "header.loggedInAs": "Has iniciado sesión como",
    "header.menu.settings": "Configuración personal",
    "header.menu.logout": "Cerrar sesión",
    "header.logoutSuccess": "Sesión cerrada",
    "header.logoutSuccessDescription": "Has cerrado la sesión correctamente.",
    "header.logoutFailure": "Error al cerrar sesión",
    "header.logoutFailureDescription": "Vuelve a intentarlo más tarde.",
    "header.priceMode.original": "Original",
    "header.priceMode.monthly": "Mensual",
    "landing.nav.features": "Funciones",
    "landing.nav.faq": "Preguntas frecuentes",
    "landing.nav.signIn": "Iniciar sesión",
    "landing.nav.join": "Únete gratis",
    "landing.meta.title":
      "SubMange – Software de gestión de suscripciones para pagos recurrentes",
    "landing.meta.description":
      "Controla todas tus suscripciones, pronostica el gasto y adelántate a las renovaciones con el panel inteligente de SubMange.",
    "landing.meta.keywords":
      "gestor de suscripciones,software de seguimiento de suscripciones,control de pagos recurrentes,gestión de gastos saas,recordatorios de renovación",

    /**
     * Dashboard Cards
     */
    "dashboard.totalMonthly": "Gasto mensual total",
    "dashboard.totalSubscriptions": "{count} servicios",
    "dashboard.active": "Activas",
    "dashboard.activeDescription": "Suscripciones en uso",
    "dashboard.annualEstimate": "Pronóstico anual",
    "dashboard.annualEstimateDescription": "Gasto estimado",
    "dashboard.allSubscriptions": "Todas las suscripciones",

    /**
     * Empty state
     */
    "dashboard.empty.title": "Aún no hay suscripciones",
    "dashboard.empty.description":
      "Haz clic en \"Agregar suscripción\" para comenzar.",

    /**
     * Categories
     */
    "categories.uncategorized": "Sin categoría",
    "categories.dropHint": "Suelta las suscripciones aquí",

    /**
     * Notifications
     */
    "notifications.genericError": "Inténtalo de nuevo.",
    "notifications.create.successTitle": "Suscripción agregada",
    "notifications.create.successDescription": "Se agregó {name}.",
    "notifications.create.errorTitle": "No se pudo agregar",
    "notifications.update.successTitle": "Suscripción actualizada",
    "notifications.update.successDescription": "Se actualizó {name}.",
    "notifications.update.errorTitle": "No se pudo actualizar",
    "notifications.delete.successTitle": "Suscripción eliminada",
    "notifications.delete.successDescription":
      "La suscripción se ha eliminado.",
    "notifications.delete.errorTitle": "No se pudo eliminar",

    "category.notifications.createTitle": "Categoría agregada",
    "category.notifications.createSuccess": "Categoría agregada",
    "category.notifications.updateTitle": "Categoría actualizada",
    "category.notifications.updateSuccess": "Categoría actualizada",
    "category.notifications.deleteTitle": "Categoría eliminada",
    "category.notifications.deleteSuccess": "Categoría eliminada.",

    /**
     * Add Subscription Dialog
     */
    "addSubscription.openButton": "Agregar suscripción",
    "addSubscription.title": "Agregar suscripción",
    "addSubscription.fields.name": "Nombre del servicio",
    "addSubscription.fields.brand": "Marca",
    "addSubscription.fields.price": "Precio",
    "addSubscription.fields.currency": "Moneda",
    "addSubscription.fields.startDate": "Fecha de inicio",
    "addSubscription.fields.endDate": "Fecha de finalización",
    "addSubscription.fields.billingCycle": "Ciclo de facturación",
    "addSubscription.cycle.mode.preset": "Opciones predefinidas",
    "addSubscription.cycle.mode.custom": "Intervalo personalizado",
    "addSubscription.cycle.customValue": "Duración del intervalo",
    "addSubscription.cycle.customUnit": "Unidad del intervalo",
    "addSubscription.cycle.customUnit.days": "Días",
    "addSubscription.cycle.customUnit.months": "Meses",
    "addSubscription.cycle.customUnit.years": "Años",
    "addSubscription.cycle.helper":
      "La fecha de fin del próximo ciclo se calculará automáticamente a partir de la fecha de inicio.",
    "addSubscription.fields.iconUrl": "URL del ícono (opcional)",
    "addSubscription.fields.category": "Categoría de suscripción (opcional)",
    "addSubscription.fields.category.none": "Sin categoría",
    "addSubscription.fields.autoRenew": "Renovación automática",
    "addSubscription.submit": "Agregar",
    "addSubscription.cancel": "Cancelar",
    "addSubscription.brand.searching": "Buscando…",
    "addSubscription.brand.noResults": "No se encontraron marcas relacionadas",
    "addSubscription.brand.placeholder": "Ingresa el nombre de la marca",

    /**
     * Edit Subscription Dialog
     */
    "editSubscription.openButton": "Editar",
    "editSubscription.title": "Editar suscripción",
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
    "billingCycle.30days": "30 días",
    "billingCycle.6months": "6 meses",
    "billingCycle.1year": "1 año",
    "billingCycle.month": "mes",
    "billingCycle.year": "año",
    "billingCycle.halfYear": "medio año",
    "billingCycle.monthly": "Mensual",
    "billingCycle.halfYearly": "Semestral",
    "billingCycle.yearly": "Anual",
    "billingCycle.custom": "Personalizado",

    /**
     * Currency labels
     */
    "currency.TWD": "TWD – Nuevo dólar taiwanés",
    "currency.USD": "USD – Dólar estadounidense",
    "currency.EUR": "EUR – Euro",
    "currency.JPY": "JPY – Yen japonés",
    "currency.GBP": "GBP – Libra esterlina",
    "currency.CNY": "CNY – Yuan chino",

    /**
     * Category Management Dialog
     */
    "categoryDialog.title": "Administrar categorías de suscripción",
    "categoryDialog.empty": "Aún no hay categorías",
    "categoryDialog.add": "Agregar categoría",
    "categoryDialog.update": "Actualizar",
    "categoryDialog.cancel": "Cancelar",
    "categoryDialog.deleteConfirm":
      "¿Seguro que deseas eliminar esta categoría? Las suscripciones vinculadas perderán su categoría.",
    "categoryDialog.fields.name": "Nombre de la categoría",
    "categoryDialog.fields.description": "Descripción (opcional)",
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
    "deleteSubscription.confirmTitle": "¿Eliminar suscripción?",
    "deleteSubscription.confirmMessage":
      "¿Seguro que deseas eliminar {name}? Esta acción no se puede deshacer.",

    /**
     * User settings
     */
    "settings.title": "Configuración del perfil",
    "settings.back": "Regresar",
    "settings.section.basic": "Información básica",
    "settings.section.account": "Administración de la cuenta",
    "settings.section.security": "Seguridad",
    "settings.email": "Correo electrónico",
    "settings.email.helper": "Se usa para notificaciones de suscripción",
    "settings.nickname": "Apodo",
    "settings.nickname.helper": "Se muestra en tu perfil",
    "settings.defaultCurrency": "Moneda predeterminada",
    "settings.defaultCurrency.helper":
      "Moneda predeterminada al agregar suscripciones",
    "settings.defaultLanguage": "Idioma preferido",
    "settings.defaultLanguage.helper": "Idioma usado en toda la aplicación",
    "settings.save": "Guardar cambios",
    "settings.saving": "Guardando…",
    "settings.cancel": "Cancelar",
    "settings.signOut": "Cerrar sesión",
    "settings.loadingError": "No se pudo cargar el perfil.",
    "settings.updateSuccess": "Perfil actualizado",
    "settings.updateError": "No se pudo actualizar el perfil.",
    "settings.loading": "Cargando perfil…",
    "settings.password.title": "Cambiar contraseña",
    "settings.password.current": "Contraseña actual",
    "settings.password.new": "Nueva contraseña",
    "settings.password.confirm": "Confirmar nueva contraseña",
    "settings.password.submit": "Actualizar contraseña",
    "settings.password.successTitle": "Contraseña actualizada",
    "settings.password.successDescription":
      "Tu contraseña se cambió correctamente.",
    "settings.password.error.invalidCurrent":
      "La contraseña actual es incorrecta.",
    "settings.password.error.generic":
      "No se pudo actualizar la contraseña. Inténtalo de nuevo.",
    "settings.delete.title": "Eliminar cuenta",
    "settings.delete.description":
      "Esto cerrará tu sesión y marcará tu cuenta para eliminación. Puedes recuperarla contactando al soporte.",
    "settings.delete.button": "Eliminar cuenta",
    "settings.delete.dialog.title": "Confirmar eliminación de la cuenta",
    "settings.delete.dialog.description":
      "Escribe DELETE para confirmar. Solo podrás revertirlo contactando al soporte.",
    "settings.delete.dialog.placeholder": "Escribe DELETE para confirmar",
    "settings.delete.dialog.cancel": "Cancelar",
    "settings.delete.dialog.confirm": "Eliminar de forma permanente",
    "settings.delete.successTitle": "Cuenta eliminada",
    "settings.delete.successDescription":
      "Tu cuenta ha sido marcada para eliminación.",
    "settings.delete.errorTitle": "No se pudo eliminar la cuenta",
    "settings.delete.errorDescription":
      "Inténtalo de nuevo o contacta al soporte.",

    "auth.error.notAuthenticated": "No has iniciado sesión",

    /**
     * Landing page
     */
    "landing.hero.title.line1": "Software de gestión de suscripciones",
    "landing.hero.title.line2":
      "creado para frenar las renovaciones no deseadas",
    "landing.hero.subtitle":
      "SubMange centraliza cada pago recurrente para que controles el gasto, proyectes el coste anual y detectes subidas de precio antes de que ocurran.",
    "landing.hero.helper": "Sin tarjeta de crédito. Cancela cuando quieras.",
    "landing.hero.cta": "Únete gratis",
    "landing.hero.card.title": "Resumen de hoy",
    "landing.hero.card.session": "Sesión activa",
    "landing.hero.card.focus": "Prioridad de hoy",
    "landing.hero.card.description":
      "Revisa riesgos de renovación, totales multimoneda y métricas accionables para mantener predecible tu presupuesto de suscripciones.",
    "landing.hero.card.upNext": "Próximo",
    "landing.hero.card.taskOne":
      "Audita el uso de herramientas de IA antes de renovar",
    "landing.hero.card.taskTwo": "Compara planes de música para ahorrar",
    "landing.pricing.free": "Gratis",
    "landing.pricing.freeDescription":
      "Todas las funciones, gratis para siempre",
    "landing.pricing.features.unlimited":
      "Seguimiento ilimitado de suscripciones",
    "landing.pricing.features.priceChange": "Gestión de cambios de precio",
    "landing.pricing.features.autoRenew":
      "Seguimiento de renovaciones automáticas",
    "landing.pricing.features.multiCurrency": "Compatibilidad multimoneda",
    "landing.features.title": "Por qué elegir SubMange",
    "landing.features.track.title": "Visibilidad total de suscripciones",
    "landing.features.track.description":
      "Rastrea streaming, SaaS, servicios y membresías para ver totales mensuales y anuales en un solo panel con conversión automática de múltiples monedas.",
    "landing.features.category.title": "Gestión de categorías personalizadas",
    "landing.features.category.description":
      "Crea categorías personalizadas con etiquetas de color para organizar tus suscripciones y gestionar fácilmente diferentes tipos de servicios.",
    "landing.features.cycle.title": "Ciclos de facturación flexibles",
    "landing.features.cycle.description":
      "Soporte para ciclos mensuales, semestrales, anuales o completamente personalizados para rastrear con precisión la fecha de renovación de cada suscripción.",
    "landing.features.security.title": "Seguro y privado",
    "landing.features.security.description":
      "Autenticación Supabase, seguridad a nivel de fila y cifrado garantizan que tus datos de suscripción permanezcan completamente privados.",
    "landing.faq.title": "Preguntas frecuentes",
    "landing.faq.free.question": "¿El servicio es gratuito?",
    "landing.faq.free.answer":
      "¡Sí! Ofrecemos un gestor de suscripciones totalmente gratuito.",
    "landing.faq.security.question": "¿Mis datos están seguros?",
    "landing.faq.security.answer":
      "Por supuesto. Supabase proporciona almacenamiento cifrado para todos los datos.",
    "landing.faq.supported.question": "¿Qué servicios son compatibles?",
    "landing.faq.supported.answer":
      "Todos: streaming, software y membresías de gimnasio.",
    "landing.faq.price.question": "¿Puedo rastrear el historial de mis suscripciones?",
    "landing.faq.price.answer":
      "Sí. Edita tus suscripciones en cualquier momento para actualizar los precios, y el sistema recalculará automáticamente los totales mensuales y anuales.",
    "landing.faq.devices.question": "¿Funciona en varios dispositivos?",
    "landing.faq.devices.answer":
      "Sí. Inicia sesión en cualquier dispositivo y tus datos se sincronizan al instante.",
    "landing.cta.title": "Reduce el desperdicio de software recurrente",
    "landing.cta.description":
      "Únete a líderes financieros, fundadores y creadores que usan SubMange para negociar mejores tarifas y eliminar suscripciones duplicadas.",
    "landing.cta.button": "Comenzar ahora",
    "footer.copyright": "© 2025 SubMange. Todos los derechos reservados.",
    "footer.developer": "Creado por Leander Kuo",
    "footer.github": "Visita mi perfil de GitHub",

    /**
     * Not Found
     */
    "notFound.title": "Página no encontrada",
    "notFound.description":
      "Lo sentimos, la página que buscas no existe o fue movida.",
    "notFound.back": "Volver al inicio",

    /**
     * Brand autofill
     */
    "brandAutofill.error.noResults": "No se encontraron marcas relacionadas",
    "brandAutofill.error.invalidClient":
      "El ID de cliente de Brandfetch no es válido o no tiene permisos.",
    "brandAutofill.error.authFailed": "Falló la autenticación de Brandfetch.",
    "brandAutofill.error.generic": "Se produjo un error al buscar marcas.",

    "auth.dialog.title": "Gestor de suscripciones",
    "auth.tabs.signIn": "Iniciar sesión",
    "auth.tabs.signUp": "Registrarse",
    "auth.fields.email": "Correo electrónico",
    "auth.fields.password": "Contraseña",
    "auth.fields.confirmPassword": "Confirmar contraseña",
    "auth.validation.fillAll": "Completa todos los campos.",
    "auth.validation.passwordMismatch": "Las contraseñas no coinciden.",
    "auth.validation.passwordLength":
      "La contraseña debe tener al menos 6 caracteres.",
    "auth.signIn.successTitle": "Sesión iniciada",
    "auth.signIn.successDescription": "¡Bienvenido de nuevo!",
    "auth.signIn.error": "Error al iniciar sesión.",
    "auth.signUp.successTitle": "Cuenta creada",
    "auth.signUp.successDescription":
      "Revisa tu correo para confirmar la cuenta.",
    "auth.signUp.error": "Error al registrarse.",
    "auth.oauth.orContinue": "O continúa con",
    "auth.oauth.redirectingTitle": "Redirigiendo",
    "auth.oauth.redirectingGoogle": "Abriendo inicio de sesión con Google…",
    "auth.oauth.redirectingApple": "Abriendo inicio de sesión con Apple…",
    "auth.oauth.googleError": "Error en el inicio de sesión con Google.",
    "auth.oauth.appleError": "Error en el inicio de sesión con Apple.",
    "auth.actions.facebook": "Facebook",
    "auth.oauth.redirectingFacebook":
      "Abriendo inicio de sesión con Facebook…",
    "auth.oauth.facebookError": "Error en el inicio de sesión con Facebook.",
    "auth.actions.cancel": "Cancelar",
    "auth.actions.signIn": "Iniciar sesión",
    "auth.actions.signInLoading": "Iniciando sesión…",
    "auth.actions.signUp": "Registrarse",
    "auth.actions.signUpLoading": "Registrándose…",
    "auth.actions.google": "Google",
    "auth.actions.apple": "Apple",
    "auth.actions.signOutLoading": "Cerrando sesión…",
    "auth.user.fallback": "Usuario",

    /**
     * Misc
     */
    "error.loadData": "No se pueden cargar los datos",
    "error.loadDataHint": "Verifica el servicio backend o inténtalo más tarde.",
    "errorBoundary.title": "Algo salió mal",
    "errorBoundary.subtitle":
      "Ocurrió un error inesperado. Intenta actualizar la página.",
    "errorBoundary.backHome": "Volver al inicio",
  },
  "zh-TW": {
    /**
     * Common
     */
    "common.confirm": "確認",
    "common.cancel": "取消",
    "common.delete": "刪除",
    "common.edit": "編輯",
    "common.loading": "載入中…",
    "common.unknownError": "發生錯誤,請稍後再試。",

    /**
     * Header / Navigation
     */
    "header.title": "SubMange",
    "header.subtitle": "清晰管理每一個訂閱服務",
    "header.language.label": "語言",
    "header.language.en": "English",
    "header.language.zh-TW": "繁體中文",
    "header.language.es": "Español",
    "header.addSubscription": "新增訂閱",
    "header.manageCategories": "管理分類",
    "header.sort": "排序",
    "header.sort.endDate": "到期日",
    "header.sort.price": "每月費用",
    "header.sort.name": "訂閱類型",
    "header.logout": "登出",
    "header.loggedInAs": "已登入為",
    "header.menu.settings": "個人設定",
    "header.menu.logout": "登出",
    "header.logoutSuccess": "已登出",
    "header.logoutSuccessDescription": "您已成功登出。",
    "header.logoutFailure": "登出失敗",
    "header.logoutFailureDescription": "請稍後再試。",
    "header.priceMode.original": "總花費",
    "header.priceMode.monthly": "每月費用",
    "landing.nav.features": "功能特色",
    "landing.nav.faq": "常見問題",
    "landing.nav.signIn": "登入",
    "landing.nav.join": "免費加入",
    "landing.meta.title":
      "SubMange — 管理定期付款的訂閱管理軟體",
    "landing.meta.description":
      "使用 SubMange 的智慧訂閱管理儀表板,追蹤每個訂閱、預測支出,並在續訂前保持領先。",
    "landing.meta.keywords":
      "訂閱管理,訂閱追蹤軟體,定期帳單管理,SaaS 支出控制,續訂提醒",

    /**
     * Dashboard Cards
     */
    "dashboard.totalMonthly": "每月總計",
    "dashboard.totalSubscriptions": "{count} 個服務",
    "dashboard.active": "使用中",
    "dashboard.activeDescription": "使用中的訂閱",
    "dashboard.annualEstimate": "年度預測",
    "dashboard.annualEstimateDescription": "預計支出",
    "dashboard.allSubscriptions": "所有訂閱",

    /**
     * Empty state
     */
    "dashboard.empty.title": "尚無任何訂閱",
    "dashboard.empty.description":
      "點擊「新增訂閱」開始管理您的訂閱服務。",

    /**
     * Categories
     */
    "categories.uncategorized": "未分類",
    "categories.dropHint": "拖放訂閱至此處",

    /**
     * Notifications
     */
    "notifications.genericError": "請稍後再試一次。",
    "notifications.create.successTitle": "已新增訂閱",
    "notifications.create.successDescription": "已新增 {name}。",
    "notifications.create.errorTitle": "新增失敗",
    "notifications.update.successTitle": "已更新訂閱",
    "notifications.update.successDescription": "已更新 {name}。",
    "notifications.update.errorTitle": "更新失敗",
    "notifications.delete.successTitle": "已刪除訂閱",
    "notifications.delete.successDescription": "訂閱已移除。",
    "notifications.delete.errorTitle": "刪除失敗",

    "category.notifications.createTitle": "已新增分類",
    "category.notifications.createSuccess": "分類已新增。",
    "category.notifications.updateTitle": "已更新分類",
    "category.notifications.updateSuccess": "分類已更新。",
    "category.notifications.deleteTitle": "已刪除分類",
    "category.notifications.deleteSuccess": "分類已移除。",

    /**
     * Add Subscription Dialog
     */
    "addSubscription.openButton": "新增訂閱",
    "addSubscription.title": "新增訂閱",
    "addSubscription.fields.name": "服務名稱",
    "addSubscription.fields.brand": "品牌",
    "addSubscription.fields.price": "價格",
    "addSubscription.fields.currency": "幣別",
    "addSubscription.fields.startDate": "開始日期",
    "addSubscription.fields.endDate": "結束日期",
    "addSubscription.fields.billingCycle": "計費週期",
    "addSubscription.cycle.mode.preset": "預設週期",
    "addSubscription.cycle.mode.custom": "自訂週期",
    "addSubscription.cycle.customValue": "週期長度",
    "addSubscription.cycle.customUnit": "週期單位",
    "addSubscription.cycle.customUnit.days": "天",
    "addSubscription.cycle.customUnit.months": "月",
    "addSubscription.cycle.customUnit.years": "年",
    "addSubscription.cycle.helper":
      "系統將從開始日期自動計算下一個週期結束日期。",
    "addSubscription.fields.iconUrl": "圖示 URL(可選)",
    "addSubscription.fields.category": "訂閱分類(可選)",
    "addSubscription.fields.category.none": "無分類",
    "addSubscription.fields.autoRenew": "自動續訂",
    "addSubscription.submit": "新增",
    "addSubscription.cancel": "取消",
    "addSubscription.brand.searching": "搜尋品牌中…",
    "addSubscription.brand.noResults": "找不到相關品牌",
    "addSubscription.brand.placeholder": "輸入品牌名稱",

    /**
     * Edit Subscription Dialog
     */
    "editSubscription.openButton": "編輯",
    "editSubscription.title": "編輯訂閱",
    "editSubscription.fields.name": "服務名稱",
    "editSubscription.fields.brand": "品牌",
    "editSubscription.fields.price": "價格",
    "editSubscription.fields.currency": "幣別",
    "editSubscription.fields.startDate": "開始日期",
    "editSubscription.fields.endDate": "結束日期",
    "editSubscription.fields.iconUrl": "圖示 URL(可選)",
    "editSubscription.fields.category": "訂閱分類(可選)",
    "editSubscription.fields.autoRenew": "自動續訂",
    "editSubscription.submit": "更新",
    "editSubscription.cancel": "取消",
    "editSubscription.recordPriceChange": "記錄價格變動",
    "editSubscription.priceEffectiveDate": "價格生效日期",
    "editSubscription.priceChangeHint":
      "設定價格變動的生效日期",
    "editSubscription.priceChangePreview":
      "從 {oldPrice} 變更為 {newPrice}",

    /**
     * Billing cycles
     */
    "billingCycle.30days": "30 天",
    "billingCycle.6months": "6 個月",
    "billingCycle.1year": "1 年",
    "billingCycle.month": "月",
    "billingCycle.year": "年",
    "billingCycle.halfYear": "半年",
    "billingCycle.monthly": "每月",
    "billingCycle.halfYearly": "半年",
    "billingCycle.yearly": "每年",
    "billingCycle.custom": "自訂",

    /**
     * Currency labels
     */
    "currency.TWD": "TWD — 新台幣",
    "currency.USD": "USD — 美元",
    "currency.EUR": "EUR — 歐元",
    "currency.JPY": "JPY — 日圓",
    "currency.GBP": "GBP — 英鎊",
    "currency.CNY": "CNY — 人民幣",

    /**
     * Category Management Dialog
     */
    "categoryDialog.title": "管理訂閱分類",
    "categoryDialog.empty": "尚未建立任何分類",
    "categoryDialog.add": "新增分類",
    "categoryDialog.update": "更新",
    "categoryDialog.cancel": "取消",
    "categoryDialog.deleteConfirm":
      "確定要刪除此分類嗎?已連結的訂閱將失去其分類。",
    "categoryDialog.fields.name": "分類名稱",
    "categoryDialog.fields.description": "描述(可選)",
    "categoryDialog.fields.color": "選擇顏色",
    "categoryDialog.fields.customColor": "自訂顏色",
    "categoryDialog.currentColor": "目前顏色:{color}",

    /**
     * Subscription card
     */
    "subscriptionCard.status.expired": "已過期",
    "subscriptionCard.status.expiringSoon": "即將到期",
    "subscriptionCard.status.active": "使用中",
    "subscriptionCard.total": "總計",

    /**
     * Delete subscription
     */
    "deleteSubscription.confirmTitle": "刪除訂閱?",
    "deleteSubscription.confirmMessage":
      "確定要刪除 {name} 嗎?此操作無法復原。",

    /**
     * User settings
     */
    "settings.title": "個人資料設定",
    "settings.back": "返回",
    "settings.section.basic": "基本資訊",
    "settings.section.account": "帳戶管理",
    "settings.section.security": "安全性設定",
    "settings.email": "電子郵件",
    "settings.email.helper": "用於接收訂閱通知",
    "settings.nickname": "暱稱",
    "settings.nickname.helper": "顯示在個人資料中",
    "settings.defaultCurrency": "預設幣別",
    "settings.defaultCurrency.helper":
      "新增訂閱時的預設幣別",
    "settings.defaultLanguage": "偏好語言",
    "settings.defaultLanguage.helper": "系統顯示的語言",
    "settings.save": "儲存變更",
    "settings.saving": "儲存中…",
    "settings.cancel": "取消",
    "settings.signOut": "登出",
    "settings.loadingError": "無法載入個人資料。",
    "settings.updateSuccess": "個人資料已更新",
    "settings.updateError": "無法更新個人資料。",
    "settings.loading": "載入個人資料中…",
    "settings.password.title": "變更密碼",
    "settings.password.current": "目前密碼",
    "settings.password.new": "新密碼",
    "settings.password.confirm": "確認新密碼",
    "settings.password.submit": "更新密碼",
    "settings.password.successTitle": "密碼已更新",
    "settings.password.successDescription":
      "您的密碼已成功變更。",
    "settings.password.error.invalidCurrent":
      "目前密碼輸入錯誤。",
    "settings.password.error.generic":
      "無法更新密碼,請稍後再試。",
    "settings.delete.title": "刪除帳戶",
    "settings.delete.description":
      "這將登出並標記您的帳戶待刪除。若需復原,請聯絡客服。",
    "settings.delete.button": "刪除帳戶",
    "settings.delete.dialog.title": "確認刪除帳戶",
    "settings.delete.dialog.description":
      "輸入 DELETE 以確認。此操作僅能透過聯絡客服復原。",
    "settings.delete.dialog.placeholder": "輸入 DELETE 以確認",
    "settings.delete.dialog.cancel": "取消",
    "settings.delete.dialog.confirm": "永久刪除",
    "settings.delete.successTitle": "帳戶已刪除",
    "settings.delete.successDescription":
      "您的帳戶已標記待刪除。",
    "settings.delete.errorTitle": "無法刪除帳戶",
    "settings.delete.errorDescription":
      "請稍後再試或聯絡客服。",

    "auth.error.notAuthenticated": "未登入",

    /**
     * Landing page
     */
    "landing.hero.title.line1": "訂閱管理軟體",
    "landing.hero.title.line2": "專為阻止不必要的續訂而生",
    "landing.hero.subtitle":
      "SubMange 集中管理每筆定期付款,讓您監控支出、預測年度成本,並在價格調漲前提前預警。",
    "landing.hero.helper": "無需信用卡,隨時可取消。",
    "landing.hero.cta": "免費加入",
    "landing.hero.card.title": "今日概覽",
    "landing.hero.card.session": "使用中的工作階段",
    "landing.hero.card.focus": "今日優先事項",
    "landing.hero.card.description":
      "檢視續訂風險、多幣別總額,以及可採取行動的洞察,讓您的訂閱預算保持可預測性。",
    "landing.hero.card.upNext": "下一步",
    "landing.hero.card.taskOne":
      "在續訂前審核 AI 工具的實際使用量",
    "landing.hero.card.taskTwo":
      "比較音樂串流方案以節省費用",
    "landing.pricing.free": "免費",
    "landing.pricing.freeDescription": "完整功能,永久免費",
    "landing.pricing.features.unlimited": "無限訂閱追蹤",
    "landing.pricing.features.priceChange": "價格變動管理",
    "landing.pricing.features.autoRenew": "自動續訂追蹤",
    "landing.pricing.features.multiCurrency": "多幣別支援",
    "landing.features.title": "為什麼選擇 SubMange",
    "landing.features.track.title": "完整的訂閱可見度",
    "landing.features.track.description":
      "追蹤串流、SaaS、公用事業和會籍,在單一儀表板查看每月和年度總額,支援多幣別自動換算。",
    "landing.features.category.title": "自訂分類管理",
    "landing.features.category.description":
      "建立個人化分類,使用顏色標籤整理訂閱,輕鬆管理不同類型的服務。",
    "landing.features.cycle.title": "彈性計費週期",
    "landing.features.cycle.description":
      "支援每月、半年、年度或完全自訂的計費週期,精確追蹤每個訂閱的續訂日期。",
    "landing.features.security.title": "安全且私密",
    "landing.features.security.description":
      "採用 Supabase 認證、資料列層級安全與加密,確保您的訂閱資料完全私密。",
    "landing.faq.title": "常見問題",
    "landing.faq.free.question": "這個服務免費嗎?",
    "landing.faq.free.answer":
      "是的!我們提供完全免費的訂閱管理服務。",
    "landing.faq.security.question": "我的資料安全嗎?",
    "landing.faq.security.answer":
      "絕對安全!所有資料都經過加密並由 Supabase 託管。",
    "landing.faq.supported.question": "支援哪些訂閱服務?",
    "landing.faq.supported.answer":
      "所有類型,包括串流、軟體服務、健身會籍等都支援。",
    "landing.faq.price.question": "可以追蹤訂閱歷史記錄嗎?",
    "landing.faq.price.answer":
      "可以!隨時編輯訂閱來更新價格,系統將自動重新計算每月和年度總費用。",
    "landing.faq.devices.question": "支援多個裝置嗎?",
    "landing.faq.devices.answer":
      "是的!在任何裝置登入都會即時同步資料。",
    "landing.cta.title":
      "現在開始減少重複的訂閱支出",
    "landing.cta.description":
      "加入財務長、創辦人與創作者的行列,使用 SubMange 協商更優惠的價格並消除重複的訂閱。",
    "landing.cta.button": "立即開始",
    "footer.copyright": "© 2025 SubMange. 保留所有權利。",
    "footer.developer": "開發者:Leander Kuo",
    "footer.github": "在 GitHub 上查看個人資料",

    /**
     * Not Found
     */
    "notFound.title": "找不到頁面",
    "notFound.description":
      "抱歉,您尋找的頁面不存在或已被移動。",
    "notFound.back": "返回首頁",

    /**
     * Brand autofill
     */
    "brandAutofill.error.noResults": "找不到相關品牌",
    "brandAutofill.error.invalidClient":
      "Brandfetch 客戶端 ID 無效或缺少權限。",
    "brandAutofill.error.authFailed": "Brandfetch 認證失敗。",
    "brandAutofill.error.generic": "搜尋品牌時發生錯誤。",

    "auth.dialog.title": "訂閱管理平台",
    "auth.tabs.signIn": "登入",
    "auth.tabs.signUp": "註冊",
    "auth.fields.email": "電子郵件",
    "auth.fields.password": "密碼",
    "auth.fields.confirmPassword": "確認密碼",
    "auth.validation.fillAll": "請填寫所有欄位。",
    "auth.validation.passwordMismatch": "密碼確認不相符。",
    "auth.validation.passwordLength": "密碼至少需要 6 個字元。",
    "auth.signIn.successTitle": "已成功登入",
    "auth.signIn.successDescription": "歡迎回來!",
    "auth.signIn.error": "登入失敗。",
    "auth.signUp.successTitle": "帳戶已建立",
    "auth.signUp.successDescription":
      "請檢查您的電子郵件以確認帳戶。",
    "auth.signUp.error": "註冊失敗。",
    "auth.oauth.orContinue": "或使用以下方式繼續",
    "auth.oauth.redirectingTitle": "重新導向中",
    "auth.oauth.redirectingGoogle": "正在前往 Google 登入…",
    "auth.oauth.redirectingApple": "正在前往 Apple 登入…",
    "auth.oauth.googleError": "Google 登入失敗。",
    "auth.oauth.appleError": "Apple 登入失敗。",
    "auth.actions.facebook": "Facebook",
    "auth.oauth.redirectingFacebook":
      "正在前往 Facebook 登入…",
    "auth.oauth.facebookError": "Facebook 登入失敗。",
    "auth.actions.cancel": "取消",
    "auth.actions.signIn": "登入",
    "auth.actions.signInLoading": "登入中…",
    "auth.actions.signUp": "註冊",
    "auth.actions.signUpLoading": "註冊中…",
    "auth.actions.google": "Google",
    "auth.actions.apple": "Apple",
    "auth.actions.signOutLoading": "登出中…",
    "auth.user.fallback": "使用者",

    /**
     * Misc
     */
    "error.loadData": "無法載入資料",
    "error.loadDataHint":
      "請確認後端服務是否啟動,或稍後再試。",
    "errorBoundary.title": "糟糕!發生了一些問題",
    "errorBoundary.subtitle":
      "我們遇到了一個意外錯誤。請嘗試重新整理您的頁面。",
    "errorBoundary.backHome": "返回首頁",
  },
};
