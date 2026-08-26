export type Locale = "es" | "en";

export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "es";

const dict = {
  es: {
    // Header / nav
    "nav.publish": "Publicar anuncio",
    "nav.admin": "Admin",
    "nav.myAccount": "Mi cuenta",
    "nav.logout": "Cerrar sesión",
    "nav.login": "Iniciar sesión",
    "nav.register": "Crear cuenta",
    "nav.brand": "Habita",

    // Footer
    "footer.tagline":
      "Plataforma de anuncios de vivienda — venta, renta y renta de cuartos.",

    // Home hero
    "home.badge": "Nuevo en tu ciudad",
    "home.title1": "Encuentra casa, apartamento o",
    "home.title2": "cuarto en renta",
    "home.subtitle":
      "Publica tu propiedad gratis. Espacio especial para quienes rentan cuartos y buscan compañeros de casa.",
    "home.publishCta": "Publicar mi anuncio",
    "home.roomsCta": "Ver cuartos en renta",
    "home.resultsFound_one": "anuncio encontrado",
    "home.resultsFound_other": "anuncios encontrados",
    "home.roomsAmong": "son cuartos en renta",
    "home.empty": "No hay anuncios que coincidan con tu búsqueda todavía.",
    "home.emptyCta": "Sé el primero en publicar",

    // Search filters
    "filters.city": "Ciudad",
    "filters.cityPlaceholder": "Ej. Madrid",
    "filters.operation": "Operación",
    "filters.all": "Todas",
    "filters.type": "Tipo",
    "filters.allTypes": "Todos",
    "filters.minPrice": "Precio mín.",
    "filters.maxPrice": "Precio máx.",
    "filters.clear": "Limpiar",
    "filters.search": "Buscar",

    // Transaction / property types
    "type.VENTA": "Venta",
    "type.RENTA": "Renta",
    "prop.CASA": "Casa",
    "prop.APARTAMENTO": "Apartamento",
    "prop.CUARTO": "Cuarto en renta",
    "prop.ESTUDIO": "Estudio",
    "prop.OFICINA": "Oficina",
    "prop.LOCAL": "Local comercial",
    "prop.TERRENO": "Terreno",

    // Listing card
    "card.room": "Cuarto",
    "card.featured": "★ Destacado",
    "card.perMonth": "/mes",

    // Auth
    "auth.loginTitle": "Iniciar sesión",
    "auth.loginSubtitle":
      "Entra a tu cuenta para publicar y administrar tus anuncios.",
    "auth.registerTitle": "Crear cuenta",
    "auth.registerSubtitle":
      "Regístrate para publicar tu casa, apartamento o cuarto en renta.",
    "auth.fullName": "Nombre completo",
    "auth.name": "Nombre",
    "auth.genericError": "Ocurrió un error, intenta de nuevo",
    "auth.loading": "Un momento…",
    "auth.email": "Correo electrónico",
    "auth.password": "Contraseña",
    "auth.phone": "Teléfono (opcional)",
    "auth.loginButton": "Entrar",
    "auth.registerButton": "Crear cuenta",
    "auth.noAccount": "¿No tienes cuenta?",
    "auth.hasAccount": "¿Ya tienes cuenta?",
    "auth.registerLink": "Regístrate",
    "auth.loginLink": "Inicia sesión",

    // Contact form
    "contact.title": "Contactar al anunciante",
    "contact.name": "Tu nombre",
    "contact.email": "Tu correo",
    "contact.phone": "Tu teléfono (opcional)",
    "contact.message": "Mensaje",
    "contact.send": "Enviar mensaje",
    "contact.sending": "Enviando…",
    "contact.sent": "¡Mensaje enviado! El anunciante podrá contactarte pronto.",
    "contact.error": "No se pudo enviar el mensaje",
    "contact.defaultMessage": "Hola, me interesa este anuncio. ¿Sigue disponible?",

    // Feature listing
    "feature.title": "Destaca este anuncio",
    "feature.description":
      "Aparece primero en los resultados de búsqueda durante {days} días por {price}€.",
    "feature.activate": "Activar destacado — modo de prueba",
    "feature.activating": "Activando…",
    "feature.note":
      "El cobro real con tarjeta todavía no está conectado. Por ahora este botón activa el destacado sin cobrar, para que puedas probarlo.",

    // Buttons
    "button.edit": "Editar",
    "button.delete": "Eliminar",
    "button.deleting": "Eliminando…",
    "button.deleteConfirm":
      "¿Seguro que quieres eliminar este anuncio? Esta acción no se puede deshacer.",
    "button.save": "Guardar",
    "button.cancel": "Cancelar",

    // Listing detail
    "detail.bedrooms": "Habitaciones",
    "detail.bathrooms": "Baños",
    "detail.area": "Área (m²)",
    "detail.furnished": "Amueblado",
    "detail.utilities": "Servicios incluidos",
    "detail.privateBathroom": "Baño privado",
    "detail.pets": "Mascotas permitidas",
    "detail.amenities": "Comodidades",
    "detail.description": "Descripción",
    "detail.backToSearch": "← Volver a la búsqueda",
    "detail.noPhotos": "Este anuncio no tiene fotos todavía",
    "detail.editListing": "Editar anuncio",
    "detail.goToAccount": "Ir a mi cuenta",
    "detail.publishedBy": "Publicado por",
    "detail.yourListingNote":
      "Este es tu anuncio. Los mensajes que recibas aparecerán en tu cuenta.",
    "detail.featuredUntil": "★ Destacado hasta",
    "detail.livingAmenities": "Convivencia y amenidades",
    "detail.petsTag": "Acepta mascotas",
    "detail.yes": "Sí",
    "detail.no": "No",

    // Mi cuenta
    "account.title": "Mi cuenta",
    "account.hello": "Hola {name} — aquí administras tus anuncios y mensajes.",
    "account.newListing": "+ Nuevo anuncio",
    "account.myListings": "Mis anuncios",
    "account.myMessages": "Mensajes recibidos",
    "account.noListings": "Todavía no has publicado ningún anuncio.",
    "account.noMessages": "Aún no has recibido mensajes de interesados.",
    "account.about": "Sobre",

    // Listing form
    "form.titleLabel": "Título del anuncio",
    "form.titlePlaceholder": "Ej. Cuarto amueblado cerca de la universidad",
    "form.operation": "Operación",
    "form.propertyType": "Tipo de propiedad",
    "form.roomHint":
      "Publicarás un cuarto dentro de una casa o apartamento compartido.",
    "form.price": "Precio",
    "form.city": "Ciudad",
    "form.neighborhood": "Barrio / Zona (opcional)",
    "form.address": "Dirección (opcional, no se muestra públicamente)",
    "form.bedrooms": "Habitaciones",
    "form.bathrooms": "Baños",
    "form.area": "Área (m², opcional)",
    "form.availableFrom": "Disponible desde (opcional)",
    "form.roomDetails": "Detalles del cuarto compartido",
    "form.amenitiesTitle": "Comodidades",
    "form.furnished": "Amueblado",
    "form.utilitiesIncluded": "Servicios incluidos (luz, agua, internet)",
    "form.privateBathroom": "Baño privado",
    "form.petsAllowed": "Se aceptan mascotas",
    "form.roomRules": "Reglas de convivencia / amenidades (cocina, lavandería, etc.)",
    "form.amenitiesOptional": "Amenidades (opcional)",
    "form.roomRulesPlaceholder":
      "Ej. Cocina y lavandería compartida, no fumar, horario flexible…",
    "form.amenitiesPlaceholder": "Ej. Piscina, garaje, seguridad 24h…",
    "form.description": "Descripción",
    "form.descriptionPlaceholder":
      "Describe el lugar, el ambiente, quién vive ahí, reglas, etc.",
    "form.photos": "Fotos — una URL de imagen por línea (opcional)",
    "form.photosHelp":
      "Sube tus fotos a un servicio como Imgur o Google Drive (enlace público) y pega aquí la URL de cada imagen.",
    "form.error": "Ocurrió un error, revisa los datos",
    "form.saving": "Guardando…",
    "form.saveChanges": "Guardar cambios",
    "form.publish": "Publicar anuncio",
    "form.newListingTitle": "Publicar anuncio",
    "form.newListingSubtitle":
      "Completa los datos de tu propiedad, casa, apartamento o cuarto en renta.",
    "form.editListingTitle": "Editar anuncio",
    "form.editListingSubtitle": "Actualiza los datos de tu propiedad.",

    // Admin
    "admin.title": "Panel de administrador",
    "admin.subtitle":
      "Vista general de Habita — solo visible para el dueño de la plataforma.",
    "admin.users": "Usuarios registrados",
    "admin.listings": "Anuncios publicados",
    "admin.activeListings": "Anuncios activos",
    "admin.messages": "Mensajes de contacto",
    "admin.recentUsers": "Últimos usuarios registrados",
    "admin.owner": "Dueño",
    "admin.name": "Nombre",
    "admin.email": "Correo",
    "admin.phone": "Teléfono",
    "admin.registered": "Registrado",
  },
  en: {
    // Header / nav
    "nav.publish": "Post a listing",
    "nav.admin": "Admin",
    "nav.myAccount": "My account",
    "nav.logout": "Log out",
    "nav.login": "Log in",
    "nav.register": "Sign up",
    "nav.brand": "Habita",

    // Footer
    "footer.tagline":
      "Housing listings platform — for sale, for rent, and room rentals.",

    // Home hero
    "home.badge": "New in your city",
    "home.title1": "Find a house, apartment, or",
    "home.title2": "room for rent",
    "home.subtitle":
      "List your property for free. A dedicated space for room rentals and finding roommates.",
    "home.publishCta": "Post my listing",
    "home.roomsCta": "See rooms for rent",
    "home.resultsFound_one": "listing found",
    "home.resultsFound_other": "listings found",
    "home.roomsAmong": "are rooms for rent",
    "home.empty": "No listings match your search yet.",
    "home.emptyCta": "Be the first to post one",

    // Search filters
    "filters.city": "City",
    "filters.cityPlaceholder": "E.g. Madrid",
    "filters.operation": "Type of deal",
    "filters.all": "All",
    "filters.type": "Property type",
    "filters.allTypes": "All",
    "filters.minPrice": "Min. price",
    "filters.maxPrice": "Max. price",
    "filters.clear": "Clear",
    "filters.search": "Search",

    // Transaction / property types
    "type.VENTA": "For sale",
    "type.RENTA": "For rent",
    "prop.CASA": "House",
    "prop.APARTAMENTO": "Apartment",
    "prop.CUARTO": "Room for rent",
    "prop.ESTUDIO": "Studio",
    "prop.OFICINA": "Office",
    "prop.LOCAL": "Commercial space",
    "prop.TERRENO": "Land",

    // Listing card
    "card.room": "Room",
    "card.featured": "★ Featured",
    "card.perMonth": "/mo",

    // Auth
    "auth.loginTitle": "Log in",
    "auth.loginSubtitle": "Log in to post and manage your listings.",
    "auth.registerTitle": "Create an account",
    "auth.registerSubtitle":
      "Sign up to list your house, apartment, or room for rent.",
    "auth.fullName": "Full name",
    "auth.name": "Name",
    "auth.genericError": "Something went wrong, please try again",
    "auth.loading": "One moment…",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.phone": "Phone (optional)",
    "auth.loginButton": "Log in",
    "auth.registerButton": "Create account",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.registerLink": "Sign up",
    "auth.loginLink": "Log in",

    // Contact form
    "contact.title": "Contact the lister",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.phone": "Your phone (optional)",
    "contact.message": "Message",
    "contact.send": "Send message",
    "contact.sending": "Sending…",
    "contact.sent": "Message sent! The lister will reach out to you soon.",
    "contact.error": "The message could not be sent",
    "contact.defaultMessage": "Hi, I'm interested in this listing. Is it still available?",

    // Feature listing
    "feature.title": "Feature this listing",
    "feature.description":
      "Appear first in search results for {days} days for €{price}.",
    "feature.activate": "Activate featured — test mode",
    "feature.activating": "Activating…",
    "feature.note":
      "Real card charges aren't connected yet. For now this button activates the featured status without charging, so you can try it out.",

    // Buttons
    "button.edit": "Edit",
    "button.delete": "Delete",
    "button.deleting": "Deleting…",
    "button.deleteConfirm":
      "Are you sure you want to delete this listing? This can't be undone.",
    "button.save": "Save",
    "button.cancel": "Cancel",

    // Listing detail
    "detail.bedrooms": "Bedrooms",
    "detail.bathrooms": "Bathrooms",
    "detail.area": "Area (m²)",
    "detail.furnished": "Furnished",
    "detail.utilities": "Utilities included",
    "detail.privateBathroom": "Private bathroom",
    "detail.pets": "Pets allowed",
    "detail.amenities": "Amenities",
    "detail.description": "Description",
    "detail.backToSearch": "← Back to search",
    "detail.noPhotos": "This listing has no photos yet",
    "detail.editListing": "Edit listing",
    "detail.goToAccount": "Go to my account",
    "detail.publishedBy": "Posted by",
    "detail.yourListingNote":
      "This is your listing. Messages you receive will show up in your account.",
    "detail.featuredUntil": "★ Featured until",
    "detail.livingAmenities": "House rules & amenities",
    "detail.petsTag": "Pets welcome",
    "detail.yes": "Yes",
    "detail.no": "No",

    // Mi cuenta
    "account.title": "My account",
    "account.hello": "Hi {name} — manage your listings and messages here.",
    "account.newListing": "+ New listing",
    "account.myListings": "My listings",
    "account.myMessages": "Messages received",
    "account.noListings": "You haven't posted any listings yet.",
    "account.noMessages": "You haven't received any messages from interested people yet.",
    "account.about": "About",

    // Listing form
    "form.titleLabel": "Listing title",
    "form.titlePlaceholder": "E.g. Furnished room near the university",
    "form.operation": "Type of deal",
    "form.propertyType": "Property type",
    "form.roomHint": "You'll be listing a room inside a shared house or apartment.",
    "form.price": "Price",
    "form.city": "City",
    "form.neighborhood": "Neighborhood / area (optional)",
    "form.address": "Address (optional, not shown publicly)",
    "form.bedrooms": "Bedrooms",
    "form.bathrooms": "Bathrooms",
    "form.area": "Area (m², optional)",
    "form.availableFrom": "Available from (optional)",
    "form.roomDetails": "Shared room details",
    "form.amenitiesTitle": "Amenities",
    "form.furnished": "Furnished",
    "form.utilitiesIncluded": "Utilities included (electricity, water, internet)",
    "form.privateBathroom": "Private bathroom",
    "form.petsAllowed": "Pets allowed",
    "form.roomRules": "House rules / amenities (kitchen, laundry, etc.)",
    "form.amenitiesOptional": "Amenities (optional)",
    "form.roomRulesPlaceholder":
      "E.g. Shared kitchen and laundry, no smoking, flexible schedule…",
    "form.amenitiesPlaceholder": "E.g. Pool, garage, 24h security…",
    "form.description": "Description",
    "form.descriptionPlaceholder":
      "Describe the place, the vibe, who lives there, house rules, etc.",
    "form.photos": "Photos — one image URL per line (optional)",
    "form.photosHelp":
      "Upload your photos to a service like Imgur or Google Drive (public link) and paste each image's URL here.",
    "form.error": "Something went wrong, please check the fields",
    "form.saving": "Saving…",
    "form.saveChanges": "Save changes",
    "form.publish": "Post listing",
    "form.newListingTitle": "Post a listing",
    "form.newListingSubtitle":
      "Fill in the details of your property — house, apartment, or room for rent.",
    "form.editListingTitle": "Edit listing",
    "form.editListingSubtitle": "Update your property's details.",

    // Admin
    "admin.title": "Admin panel",
    "admin.subtitle": "Habita overview — only visible to the platform owner.",
    "admin.users": "Registered users",
    "admin.listings": "Published listings",
    "admin.activeListings": "Active listings",
    "admin.messages": "Contact messages",
    "admin.recentUsers": "Recently registered users",
    "admin.owner": "Owner",
    "admin.name": "Name",
    "admin.email": "Email",
    "admin.phone": "Phone",
    "admin.registered": "Registered",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["es"];

export function t(locale: Locale, key: TranslationKey): string {
  return dict[locale][key] ?? dict[DEFAULT_LOCALE][key] ?? key;
}

export function transactionLabel(locale: Locale, value: string): string {
  return t(locale, `type.${value}` as TranslationKey);
}

export function propertyLabel(locale: Locale, value: string): string {
  return t(locale, `prop.${value}` as TranslationKey);
}

export const TRANSACTION_TYPES_I18N = (locale: Locale) => [
  { value: "VENTA", label: transactionLabel(locale, "VENTA") },
  { value: "RENTA", label: transactionLabel(locale, "RENTA") },
];

export const PROPERTY_TYPES_I18N = (locale: Locale) => [
  { value: "CASA", label: propertyLabel(locale, "CASA") },
  { value: "APARTAMENTO", label: propertyLabel(locale, "APARTAMENTO") },
  { value: "CUARTO", label: propertyLabel(locale, "CUARTO") },
  { value: "ESTUDIO", label: propertyLabel(locale, "ESTUDIO") },
  { value: "OFICINA", label: propertyLabel(locale, "OFICINA") },
  { value: "LOCAL", label: propertyLabel(locale, "LOCAL") },
  { value: "TERRENO", label: propertyLabel(locale, "TERRENO") },
];
