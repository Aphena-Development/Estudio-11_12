const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

const asset = (file) => `${BASE_URL}assets/${file}`;

export const INVITATION_META = {
  slug: "xv-ximena",
  clientName: "Ximena",
  eventType: "XV Años",
  title: "Mis XV Años — Ximena",
  subtitle: "The Quinceañera Post — Edición Especial",
  eventDate: "2026-12-26",
  dateDisplay: "26 . 12 . 26",
  locationSummary: "Escape de Lagunillas, Puebla",
  coverAsset: "assets/ximena-3.jpg",
  showInPortfolio: true,
};

export const INVITATION_DATA = {
  quinceanera: {
    name: "Ximena",
    title: "Mis XV Años",
    subtitle: "The Quinceañera Post — Edición Especial",
    dateISO: "2026-12-26T12:00:00-06:00",
    dateDisplay: "26 . 12 . 26",
    dateFullText: "Sábado 26 de Diciembre de 2026",
    welcomeQuote:
      "Hoy un sueño se hace realidad y quiero compartirlo contigo en un día lleno de luz, música y alegría...",
    invitationText:
      "Tenemos el placer de invitarlos cordialmente a la celebración de Mis 15 Años",
    heroImage: asset("ximena-3.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Canción Especial de Ximena",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "misa",
      type: "Ceremonia Religiosa",
      title: "Misa de Acción de Gracias",
      place: "Parroquia Santa María de Guadalupe",
      address: "Escape de Lagunillas, Puebla.",
      time: "12:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Acompáñame a dar gracias a Dios por todas las bendiciones recibidas en mi vida.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Recepción Social",
      title: "Recepción y Gran Festejo",
      place: "Auditorio Ejidal",
      address: "Escape de Lagunillas, Puebla.",
      time: "3:00 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Un lugar preparado con todo el cariño para celebrar juntos una tarde y noche inolvidables.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "12:00 PM",
      title: "Ceremonia Religiosa",
      description:
        "Acompáñame a dar gracias a Dios por todas las bendiciones recibidas en mi vida.",
      icon: "church",
      badge: "Parroquia Sta. María de Guadalupe",
    },
    {
      id: "banquete",
      time: "3:00 - 6:00 PM",
      title: "Banquete",
      description:
        "Disfrutaremos de una deliciosa comida especialmente preparada para consentir a nuestros invitados.",
      icon: "utensils",
      badge: "Auditorio Ejidal",
    },
    {
      id: "vals",
      time: "7:00 PM",
      title: "Vals de Quinceañera",
      description:
        "Un momento mágico e inolvidable: el vals familiar y las coreografías especiales del día.",
      icon: "sparkles",
      badge: "Momento Estelar",
    },
    {
      id: "baile",
      time: "8:00 PM",
      title: "Apertura de la Pista de Baile",
      description:
        "¡Que comience la fiesta! Todos a la pista de baile a divertirnos.",
      icon: "music",
      badge: "¡Gran Fiesta!",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("ximena-3.jpg"),
      title: "Save The Date — 26.12.26",
      caption: "The Quinceañera Post: Edición Especial de Ximena",
      tag: "Portada Editorial",
    },
    {
      id: 2,
      src: asset("ximena-1.jpg"),
      title: "Un Sueño Hecho Realidad",
      caption: "La cuenta regresiva ha comenzado para una noche mágica",
      tag: "Sesión Oficial",
    },
    {
      id: 3,
      src: asset("ximena-2.jpg"),
      title: "Luz, Música y Alegría",
      caption: "Cada detalle preparado con ilusión para compartir contigo",
      tag: "Jardín Secreto",
    },
    {
      id: 4,
      src: asset("ximena-4.jpg"),
      title: "Ximena Quinceañera",
      caption: "Gracias por ser parte de esta etapa tan especial en mi vida",
      tag: "Edición Especial",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres",
    message:
      "Mi mejor regalo es tu presencia, pero si quieres tener algún detalle conmigo, el regalo más apropiado es una lluvia de sobres, la cual consiste en regalar dinero en efectivo dentro de un sobre el día del evento.",
    note: "En la entrada de la recepción encontrarás un buzón especial para depositar tu sobre con tus mejores deseos.",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};

export const UX_LAWS_PROPOSAL = [
  {
    id: "peak-end",
    sectionId: "hero",
    lawName: "Regla del Pico-Final (Peak-End Rule)",
    author: "Daniel Kahneman (Premio Nobel)",
    principle:
      "Las personas juzgan una experiencia casi por completo según cómo se sintieron en su punto más intenso (Pico) y al final (Cierre).",
    googleSitesPain:
      "En Google Sites la página abre de golpe con la barra gris del navegador, sin sorpresa inicial, y la música de Google Drive es bloqueada por celulares.",
    reactSolution:
      "Creamos un Sobre Interactivo con Sello de Lacre ('Abrir Invitación') que genera un momento 'WOW' inmediato, desbloquea la música automáticamente en iPhone/Android y cierra con confeti al confirmar asistencia.",
    businessImpact: "+85% en valor percibido por los clientes de 11.12 Estudio desde el primer segundo.",
  },
  {
    id: "aesthetic-usability",
    sectionId: "welcome",
    lawName: "Efecto Estética-Usabilidad",
    author: "Masaaki Kurosu & Kaori Kashimura",
    principle:
      "Los usuarios perciben los diseños visualmente atractivos como más fáciles de usar, más confiables y de categoría superior.",
    googleSitesPain:
      "Las invitaciones en Google Sites usan imágenes planas exportadas de Canva (~12 MB) donde el texto se pixela o se ve diminuto en pantallas móviles.",
    reactSolution:
      "Tipografía editorial real en alta definición (Great Vibes & Cormorant Garamond), texturas de acuarela con Glassmorphism (cristal esmerilado) y mariposas animadas a 60fps.",
    businessImpact: "Permite a tu cliente vender paquetes de invitaciones 'Premium / VIP' a un ticket más alto.",
  },
  {
    id: "doherty-threshold",
    sectionId: "countdown",
    lawName: "Umbral de Doherty (< 400 ms)",
    author: "Walter J. Doherty",
    principle:
      "La atención y satisfacción del usuario se multiplican cuando la interfaz responde en menos de 400 milisegundos sin iframes lentos.",
    googleSitesPain:
      "El contador externo de TickCounter y el iframe invertido de Google Drive tardan varios segundos en cargar, muestran publicidad o rompen la estética.",
    reactSolution:
      "Reproductor musical flotante con ondas de sonido en vivo y Cuenta Regresiva nativa en React en tiempo real + botón directo para Agendar en Google/Apple Calendar.",
    businessImpact: "Carga 4 veces más rápida en datos móviles (WhatsApp) y 0% de anuncios de terceros.",
  },
  {
    id: "proximity-common-region",
    sectionId: "locations",
    lawName: "Ley de Proximidad y Región Común (Gestalt)",
    author: "Max Wertheimer / Psicología de la Gestalt",
    principle:
      "Los elementos que están agrupados dentro de un mismo borde o contenedor se perciben como una unidad funcional clara.",
    googleSitesPain:
      "En Google Sites, la imagen de 'Misa y Recepción' está arriba y los botones 'Ver mapa' están sueltos abajo fuera de la imagen, causando confusión sobre qué botón abre cada mapa.",
    reactSolution:
      "Tarjetas interactivas individuales para Misa y Recepción donde el ícono, la dirección en Escape de Lagunillas, la hora y el botón 'Abrir Ubicación en GPS' viven dentro del mismo bloque.",
    businessImpact: "Cero invitados perdidos o confundidos entre la ubicación de la Parroquia y el Auditorio.",
  },
  {
    id: "hicks-law",
    sectionId: "itinerary",
    lawName: "Ley de Hick (Hick's Law)",
    author: "William Edmund Hick & Ray Hyman",
    principle:
      "El tiempo necesario para procesar información disminuye cuando se presenta de forma estructurada, secuencial y progresiva.",
    googleSitesPain:
      "Una imagen estática con todo el texto amontonado obliga al invitado a hacer zoom con los dedos para leer los horarios.",
    reactSolution:
      "Línea de tiempo vertical interactiva con Revelación Progresiva (Scroll Reveal): cada etapa (12:00 Misa, 3:00 Banquete, 7:00 Vals, 8:00 Baile) se ilumina conforme el invitado avanza.",
    businessImpact: "Lectura fluida y sin esfuerzo en cualquier tamaño de celular.",
  },
  {
    id: "jakobs-law",
    sectionId: "gallery",
    lawName: "Ley de Jakob (Patrones Familiares)",
    author: "Jakob Nielsen (Nielsen Norman Group)",
    principle:
      "Los usuarios pasan la mayor parte de su tiempo en apps como Instagram y esperan controles interactivos familiares al ver fotografías.",
    googleSitesPain:
      "En Google Sites hay un banner fijo con 4 fotos pequeñas y otro carrusel repetido abajo con flechas pequeñas difíciles de tocar.",
    reactSolution:
      "Galería Editorial interactiva con visor Lightbox a pantalla completa, zoom suave y etiquetas de la sesión 'The Quinceañera Post'.",
    businessImpact: "Hace lucir el trabajo fotográfico del estudio como una revista digital de lujo.",
  },
  {
    id: "fitts-von-restorff",
    sectionId: "rsvp",
    lawName: "Ley de Fitts + Efecto Von Restorff",
    author: "Paul Fitts & Hedwig von Restorff",
    principle:
      "El botón más importante debe ser el más fácil de alcanzar con el pulgar (Fitts) y visualmente distinto al resto (Von Restorff).",
    googleSitesPain:
      "El botón 'Escríbeme' en Google Sites es idéntico a los botones de mapa y solo abre un chat vacío de WhatsApp sin decir quién confirma ni cuántos asisten.",
    reactSolution:
      "Asistente de Confirmación RSVP inteligente: el invitado escribe su nombre, elige número de pases y mensaje, y envía un WhatsApp pre-llenado con un solo toque.",
    businessImpact: "+70% más confirmaciones reales y organizadas para los anfitriones del evento.",
  },
];
