const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

const asset = (file) => `${BASE_URL}assets/${file}`;

export const INVITATION_META = {
  slug: "boda-mariana-alejandro",
  templateId: "boda-religiosa",
  clientName: "Mariana & Alejandro",
  eventType: "Boda Religiosa",
  title: "Nuestra Boda — Mariana & Alejandro",
  subtitle: "Sagrado matrimonio y recepción de gala en Atlixco, Puebla",
  eventDate: "2027-04-17",
  dateDisplay: "17 . 04 . 27",
  dateFullText: "Sábado 17 de Abril de 2027",
  locationSummary: "Templo de La Merced & Ex-Convento, Atlixco",
  coverAsset: "assets/mariana-1.jpg",
  showInPortfolio: true,
};

export const INVITATION_DATA = {
  quinceanera: {
    name: "Mariana & Alejandro",
    title: "Nuestra Boda Religiosa",
    subtitle: "17 de Abril de 2027 — Atlixco, Puebla",
    dateISO: "2027-04-17T13:00:00-06:00",
    dateDisplay: "17 . 04 . 27",
    dateFullText: "Sábado 17 de Abril de 2027",
    welcomeQuote:
      "El amor todo lo espera y nunca deja de ser. Con la gracia de Dios y la bendición de nuestros padres, unimos nuestras vidas en matrimonio.",
    invitationText:
      "Con la bendición de Dios y de nuestros padres, tenemos el honor de invitarlos a nuestra Misa de Esponsales y Banquete Nupcial",
    heroImage: asset("mariana-1.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Vals Nupcial de Mariana & Alejandro",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "misa",
      type: "Sacramento del Matrimonio",
      title: "Templo de Nuestra Señora de la Merced",
      place: "Centro Histórico de Atlixco",
      address: "Calle 3 Norte, Centro, Atlixco, Puebla.",
      time: "1:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Acompáñanos a recibir la bendición nupcial ante el altar de Dios.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Banquete de Gala",
      title: "Claustro & Jardín Las Calandrias",
      place: "Atlixco de las Flores",
      address: "Boulevard Atlixco, Puebla.",
      time: "3:30 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Al finalizar la ceremonia religiosa, los esperamos para celebrar juntos en nuestra recepción.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "1:00 PM",
      title: "Misa de Esponsales",
      description: "Celebración eucarística, entrega de arras y lazo nupcial.",
      icon: "church",
      badge: "Templo de La Merced",
    },
    {
      id: "recepcion",
      time: "3:30 PM",
      title: "Bienvenida y Brindis",
      description: "Recepción de invitados y brindis de honor con nuestras familias.",
      icon: "sparkles",
      badge: "Claustro Principal",
    },
    {
      id: "banquete",
      time: "4:30 PM",
      title: "Banquete Nupcial",
      description: "Comida de gala en honor a los recién casados.",
      icon: "utensils",
      badge: "Salón de Arcos",
    },
    {
      id: "vals",
      time: "7:00 PM",
      title: "Vals de los Novios y Celebración",
      description: "Primer baile de esposos, ramo y apertura de pista.",
      icon: "music",
      badge: "Gran Festejo",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("mariana-1.jpg"),
      title: "Ante el Altar",
      caption: "Pórtico colonial en el corazón de Atlixco",
      tag: "Sagrado Matrimonio",
    },
    {
      id: 2,
      src: asset("mariana-2.jpg"),
      title: "Luz de Velas",
      caption: "Promesa eterna bendecida por nuestras familias",
      tag: "Ceremonia",
    },
    {
      id: 3,
      src: asset("mariana-3.jpg"),
      title: "Viva los Novios",
      caption: "El inicio de nuestra vida como esposos",
      tag: "Salida Triunfal",
    },
    {
      id: 4,
      src: asset("mariana-4.jpg"),
      title: "17 de Abril de 2027",
      caption: "Gracias por acompañarnos en este día sagrado",
      tag: "Save The Date",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres",
    message:
      "El regalo más valioso son sus oraciones y su presencia. Si desean tener un detalle con nosotros para nuestro nuevo hogar, contaremos con lluvia de sobres.",
    note: "Agradecemos su puntual asistencia en el Templo de La Merced.",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
