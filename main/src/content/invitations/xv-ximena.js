import { invitationAsset } from "../../lib/assets";

const SLUG = "xv-ximena";
const asset = (file) => invitationAsset(SLUG, file);

export const xvXimenaInvitation = {
  meta: {
    slug: SLUG,
    url: `/i/${SLUG}`,
    isTemplate: false,
    templateId: "xv-princesa",
    templateName: "XV Años",
    clientName: "Ximena",
    eventType: "XV Años",
    title: "Mis XV Años — Ximena",
    subtitle: "The Quinceañera Post — Edición Especial",
    eventDate: "2026-12-26",
    dateDisplay: "26 . 12 . 26",
    dateFullText: "Sábado 26 de Diciembre de 2026",
    locationSummary: "Escape de Lagunillas, Puebla",
    coverImage: asset("ximena-3.jpg"),
    showInPortfolio: true,
  },
  accessControl: {
    mode: "none",
  },
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
