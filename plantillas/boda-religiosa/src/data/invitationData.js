const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

const asset = (file) => `${BASE_URL}assets/${file}`;

export const INVITATION_META = {
  slug: "boda-religiosa",
  templateId: "boda-religiosa",
  templateName: "Boda Religiosa (Clásica Sacramental & Oro)",
  clientName: "Mariana & Alejandro (Demo)",
  eventType: "Boda • Clásica Religiosa",
  title: "Plantilla Boda Religiosa — Perla & Oro Antiguo",
  subtitle: "Diseño solemne y romántico con bendición nupcial, misa de esponsales y recepción",
  eventDate: "2027-04-17",
  dateDisplay: "17 . 04 . 27",
  locationSummary: "Catedral & Ex-Hacienda, Puebla",
  coverAsset: "assets/ximena-4.jpg",
  showInPortfolio: true,
};

export const INVITATION_DATA = {
  quinceanera: {
    name: "Mariana & Alejandro",
    title: "Nuestra Boda Religiosa",
    subtitle: "Colección Boda Religiosa — 11.12 Estudio",
    dateISO: "2027-04-17T13:00:00-06:00",
    dateDisplay: "17 . 04 . 27",
    dateFullText: "Sábado 17 de Abril de 2027",
    welcomeQuote:
      "El amor nunca deja de ser. Con la gracia de Dios y la bendición de nuestros padres, unimos nuestras vidas en sagrado matrimonio...",
    invitationText:
      "Con la bendición de Dios y de nuestros padres, tenemos el honor de invitarlos a nuestra Ceremonia Religiosa y Recepción Nupcial",
    heroImage: asset("ximena-4.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Marcha & Vals Nupcial",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "misa",
      type: "Sacramento del Matrimonio",
      title: "Misa de Esponsales",
      place: "Parroquia de Nuestra Señora del Sagrado Corazón",
      address: "Puebla, México.",
      time: "1:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Acompáñanos a recibir la bendición nupcial ante el altar de Dios.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Banquete de Honor",
      title: "Recepción de Gala Nupcial",
      place: "Ex-Hacienda La Concepción",
      address: "Puebla, México.",
      time: "3:30 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Al finalizar la ceremonia religiosa, los esperamos para celebrar juntos en nuestro banquete de bodas.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "1:00 PM",
      title: "Misa de Matrimonio",
      description: "Celebración eucarística, votos matrimoniales y lazo nupcial.",
      icon: "church",
      badge: "Parroquia Principal",
    },
    {
      id: "recepcion",
      time: "3:30 PM",
      title: "Recepción & Brindis",
      description: "Bienvenida de nuestros invitados y brindis de honor.",
      icon: "sparkles",
      badge: "Ex-Hacienda",
    },
    {
      id: "banquete",
      time: "4:30 PM",
      title: "Banquete Nupcial",
      description: "Comida de gala en compañía de nuestras familias y padrinos.",
      icon: "utensils",
      badge: "Salón de Arcos",
    },
    {
      id: "vals",
      time: "7:00 PM",
      title: "Vals de los Novios & Celebración",
      description: "Primer baile de esposos, lanzamiento de ramo y gran fiesta.",
      icon: "music",
      badge: "¡Gran Festejo!",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("ximena-4.jpg"),
      title: "Bendición Nupcial",
      caption: "Plantilla Boda Religiosa — 11.12 Estudio",
      tag: "Sagrado Matrimonio",
    },
    {
      id: 2,
      src: asset("ximena-2.jpg"),
      title: "Unidos por Siempre",
      caption: "Lo que Dios ha unido, permanece en el corazón",
      tag: "Compromiso",
    },
    {
      id: 3,
      src: asset("ximena-3.jpg"),
      title: "Nuestra Promesa",
      caption: "Agradecemos su cariño y oraciones en esta nueva etapa",
      tag: "Sesión Formal",
    },
    {
      id: 4,
      src: asset("ximena-1.jpg"),
      title: "17 de Abril de 2027",
      caption: "Los esperamos con gran ilusión",
      tag: "Save The Date",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres",
    message:
      "El regalo más valioso son sus oraciones y su compañía en este día sagrado. Si desean hacernos un presente para nuestro hogar, contaremos con lluvia de sobres.",
    note: "Agradecemos su puntualidad en la ceremonia religiosa.",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
