const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

const asset = (file) => `${BASE_URL}assets/${file}`;

export const INVITATION_META = {
  slug: "boda-elegante",
  templateId: "boda-elegante",
  templateName: "Boda Elegante (Marfil, Olivo & Oro)",
  clientName: "Valeria & Sebastián (Demo)",
  eventType: "Boda • Editorial Elegante",
  title: "Plantilla Boda Elegante — Marfil & Olivo",
  subtitle: "Diseño editorial minimalista para bodas civiles, haciendas y jardines de lujo",
  eventDate: "2027-02-14",
  dateDisplay: "14 . 02 . 27",
  locationSummary: "Hacienda San José, Cholula",
  coverAsset: "assets/ximena-2.jpg",
  showInPortfolio: true,
};

export const INVITATION_DATA = {
  quinceanera: {
    name: "Valeria & Sebastián",
    title: "Nuestra Boda",
    subtitle: "Colección Boda Elegante — 11.12 Estudio",
    dateISO: "2027-02-14T16:00:00-06:00",
    dateDisplay: "14 . 02 . 27",
    dateFullText: "Domingo 14 de Febrero de 2027",
    welcomeQuote:
      "Dos vidas, dos historias y un mismo camino que hoy decidimos recorrer juntos para siempre...",
    invitationText:
      "Tenemos la inmensa alegría de invitarlos a celebrar la unión de Nuestro Matrimonio",
    heroImage: asset("ximena-2.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Nuestra Canción de Boda",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "ceremonia",
      type: "Ceremonia Civil & Votos",
      title: "Jardín de los Olivos",
      place: "Hacienda San José",
      address: "San Andrés Cholula, Puebla.",
      time: "4:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Acompáñanos a firmar nuestra unión y compartir nuestros votos frente a quienes más queremos.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Cóctel & Banquete de Bodas",
      title: "Terraza Mayor de la Hacienda",
      place: "Hacienda San José",
      address: "San Andrés Cholula, Puebla.",
      time: "5:30 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Brindemos juntos en una tarde y noche inolvidables bajo las luces de la hacienda.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "4:00 PM",
      title: "Ceremonia Civil",
      description: "Intercambio de votos y firma de acta matrimonial.",
      icon: "church",
      badge: "Jardín de los Olivos",
    },
    {
      id: "coctel",
      time: "5:00 PM",
      title: "Cóctel al Atardecer",
      description: "Canapés, coctelería de autor y música acústica en vivo.",
      icon: "sparkles",
      badge: "Patio Central",
    },
    {
      id: "banquete",
      time: "6:30 PM",
      title: "Banquete de Bodas",
      description: "Cena especial preparada para celebrar nuestra unión.",
      icon: "utensils",
      badge: "Terraza Mayor",
    },
    {
      id: "baile",
      time: "8:30 PM",
      title: "Primer Vals de Esposos & Fiesta",
      description: "Nuestro primer baile como esposos y apertura de pista.",
      icon: "music",
      badge: "¡A Celebrar!",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("ximena-2.jpg"),
      title: "Save The Date — 14.02.27",
      caption: "Plantilla Boda Elegante — 11.12 Estudio",
      tag: "Sesión Pre-Boda",
    },
    {
      id: 2,
      src: asset("ximena-3.jpg"),
      title: "Nuestro Comienzo",
      caption: "El amor se celebra rodeados de nuestra gente favorita",
      tag: "Editorial",
    },
    {
      id: 3,
      src: asset("ximena-1.jpg"),
      title: "Para Siempre",
      caption: "Cada detalle pensado con amor para este gran día",
      tag: "Hacienda",
    },
    {
      id: 4,
      src: asset("ximena-4.jpg"),
      title: "Nos Casamos",
      caption: "Gracias por ser testigos de nuestra historia",
      tag: "Edición Boda",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres & Luna de Miel",
    message:
      "Su presencia es nuestro mejor regalo. Si desean hacernos un obsequio para nuestra luna de miel y nuevo hogar, contaremos con buzón para sobres en la recepción.",
    note: "Código de vestimenta: Formal Jardín (Evitar color blanco y marfil).",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
