const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

const asset = (file) => `${BASE_URL}assets/${file}`;

export const INVITATION_META = {
  slug: "xv-princesa",
  templateId: "xv-princesa",
  templateName: "XV Princesa (Rosa & Oro Real)",
  clientName: "Valentina (Demo)",
  eventType: "XV Años • Princesa",
  title: "Plantilla XV Princesa — Rosa Blush & Oro",
  subtitle: "Diseño de cuento de hadas con mariposas animadas, sobre de lacre y cristal",
  eventDate: "2026-12-26",
  dateDisplay: "26 . 12 . 26",
  locationSummary: "Jardín Imperial, Puebla",
  coverAsset: "assets/ximena-3.jpg",
  showInPortfolio: true,
};

export const INVITATION_DATA = {
  quinceanera: {
    name: "Valentina",
    title: "Mis XV Años",
    subtitle: "Colección XV Princesa — 11.12 Estudio",
    dateISO: "2026-12-26T12:00:00-06:00",
    dateDisplay: "26 . 12 . 26",
    dateFullText: "Sábado 26 de Diciembre de 2026",
    welcomeQuote:
      "Hoy un sueño se hace realidad y quiero compartirlo contigo en un día lleno de luz, música y alegría...",
    invitationText:
      "Con la bendición de Dios y de mis padres, tenemos el honor de invitarlos a celebrar Mis 15 Años",
    heroImage: asset("ximena-3.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Vals Real de XV Años",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "misa",
      type: "Ceremonia Religiosa",
      title: "Misa de Acción de Gracias",
      place: "Parroquia Santa María de Guadalupe",
      address: "Puebla, México.",
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
      place: "Salón & Jardín Imperial",
      address: "Puebla, México.",
      time: "3:00 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Un lugar preparado con todo el cariño para celebrar juntos una noche mágica.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "12:00 PM",
      title: "Ceremonia Religiosa",
      description: "Misa de acción de gracias junto a mi familia y padrinos.",
      icon: "church",
      badge: "Parroquia Principal",
    },
    {
      id: "banquete",
      time: "3:00 PM",
      title: "Recepción y Banquete",
      description: "Bienvenida de invitados y banquete de honor.",
      icon: "utensils",
      badge: "Jardín Imperial",
    },
    {
      id: "vals",
      time: "7:00 PM",
      title: "Vals de Quinceañera",
      description: "El momento más esperado de la noche bajo las luces.",
      icon: "sparkles",
      badge: "Momento Estelar",
    },
    {
      id: "baile",
      time: "8:00 PM",
      title: "Apertura de Pista",
      description: "¡Que comience la fiesta con música y celebración!",
      icon: "music",
      badge: "¡Gran Fiesta!",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("ximena-3.jpg"),
      title: "Save The Date",
      caption: "Plantilla XV Princesa — 11.12 Estudio",
      tag: "Portada Real",
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
      title: "Edición Princesa",
      caption: "Gracias por ser parte de esta etapa tan especial en mi vida",
      tag: "Retrato Editorial",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres",
    message:
      "Mi mejor regalo es tu presencia, pero si deseas tener un detalle conmigo, agradeceré tu muestra de cariño en sobre cerrado durante la recepción.",
    note: "En la entrada del salón encontrarás un buzón especial para depositar tu sobre.",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
