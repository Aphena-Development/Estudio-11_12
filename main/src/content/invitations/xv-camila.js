import { invitationAsset } from "../../lib/assets";

const SLUG = "xv-camila";
const asset = (file) => invitationAsset(SLUG, file);

export const xvCamilaInvitation = {
  meta: {
    slug: SLUG,
    url: `/i/${SLUG}`,
    isTemplate: false,
    templateId: "xv-elegante",
    templateName: "XV Años • Gala Nocturna",
    clientName: "Camila",
    eventType: "XV Años • Gala Nocturna",
    title: "Mis XV Años — Camila",
    subtitle: "Una noche de gala bajo luces doradas para celebrar mis quince años",
    eventDate: "2026-11-21",
    dateDisplay: "21 . 11 . 26",
    dateFullText: "Sábado 21 de Noviembre de 2026",
    locationSummary: "Ex-Hacienda San Agustín, Atlixco, Puebla",
    coverImage: asset("camila-1.jpg"),
    showInPortfolio: true,
  },
  accessControl: {
    mode: "none",
  },
  quinceanera: {
    name: "Camila",
    title: "Mis XV Años",
    subtitle: "Velada de Gala — Edición Especial",
    dateISO: "2026-11-21T18:00:00-06:00",
    dateDisplay: "21 . 11 . 26",
    dateFullText: "Sábado 21 de Noviembre de 2026",
    welcomeQuote:
      "Hay noches que brillan para siempre en el corazón; hoy comienza una nueva etapa en mi vida y quiero celebrarla contigo.",
    invitationText:
      "Con el amor de mis padres Rodrigo Morales y Elena Vega, tenemos el honor de invitarlos a celebrar Mis XV Años",
    heroImage: asset("camila-1.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Vals Nocturno de Camila",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "misa",
      type: "Ceremonia de Acción de Gracias",
      title: "Parroquia de Santa María de la Natividad",
      place: "Zócalo de Atlixco",
      address: "Centro Histórico, Atlixco, Puebla.",
      time: "6:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Damos gracias a Dios por permitirme llegar a esta ilusión rodeada de mi familia y amigos.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Recepción de Gala",
      title: "Gran Velada Nocturna",
      place: "Ex-Hacienda San Agustín",
      address: "Corredor Gastronómico, Atlixco, Puebla.",
      time: "8:00 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Te esperamos para disfrutar de una cena de gala, brindis y baile bajo las estrellas.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "6:00 PM",
      title: "Misa de Acción de Gracias",
      description: "Bendición solemne junto a mis padres y padrinos de honor.",
      icon: "church",
      badge: "Parroquia de la Natividad",
    },
    {
      id: "coctel",
      time: "8:00 PM",
      title: "Recepción y Alfombra Dorada",
      description: "Bienvenida de invitados con coctelería y violines en vivo.",
      icon: "sparkles",
      badge: "Terraza de Piedra",
    },
    {
      id: "cena",
      time: "9:00 PM",
      title: "Cena de Gala",
      description: "Banquete de tres tiempos preparado para nuestros invitados.",
      icon: "utensils",
      badge: "Salón de Candiles",
    },
    {
      id: "vals",
      time: "10:15 PM",
      title: "Vals Familiar y Apertura de Pista",
      description: "El momento estelar de la noche seguido de música en vivo.",
      icon: "music",
      badge: "Gran Celebración",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("camila-1.jpg"),
      title: "Gala de medianoche",
      caption: "Sesión editorial en terraza colonial de Atlixco",
      tag: "Portada de Gala",
    },
    {
      id: 2,
      src: asset("camila-2.jpg"),
      title: "Paso Real",
      caption: "Cada detalle preparado para una velada inolvidable",
      tag: "Alta Costura",
    },
    {
      id: 3,
      src: asset("camila-3.jpg"),
      title: "Luz de Noviembre",
      caption: "La ilusión de cumplir quince años rodeada de cariño",
      tag: "Retrato Editorial",
    },
    {
      id: 4,
      src: asset("camila-4.jpg"),
      title: "Noche de Candiles",
      caption: "Los esperamos el 21 de noviembre en Atlixco",
      tag: "Save The Date",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres",
    message:
      "Tu presencia en esta noche tan especial es mi mejor regalo. Si deseas tener un detalle conmigo, contaremos con buzón de lluvia de sobres en la recepción.",
    note: "Código de vestimenta: Formal de noche.",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
