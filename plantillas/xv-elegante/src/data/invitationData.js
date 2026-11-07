const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

const asset = (file) => `${BASE_URL}assets/${file}`;

export const INVITATION_META = {
  slug: "xv-elegante",
  templateId: "xv-elegante",
  templateName: "XV Elegante (Gala Nocturna & Champán)",
  clientName: "Camila (Demo)",
  eventType: "XV Años • Gala Elegante",
  title: "Plantilla XV Elegante — Gala Nocturna & Oro",
  subtitle: "Estética de alta costura en tonos noche, champán dorado y cristal esmerilado",
  eventDate: "2026-11-21",
  dateDisplay: "21 . 11 . 26",
  locationSummary: "Terraza & Salón Vittoria, Puebla",
  coverAsset: "assets/ximena-1.jpg",
  showInPortfolio: true,
};

export const INVITATION_DATA = {
  quinceanera: {
    name: "Camila",
    title: "XV Gala Night",
    subtitle: "Colección XV Elegante — 11.12 Estudio",
    dateISO: "2026-11-21T19:00:00-06:00",
    dateDisplay: "21 . 11 . 26",
    dateFullText: "Sábado 21 de Noviembre de 2026",
    welcomeQuote:
      "Hay noches que brillan para siempre en la memoria; esta velada de gala no estaría completa sin tu presencia...",
    invitationText:
      "Tenemos el honor de invitarlos a la Gala de Celebración de Mis XV Años",
    heroImage: asset("ximena-1.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Gala Nocturna — Tema Oficial",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  locations: [
    {
      id: "misa",
      type: "Ceremonia de Acción de Gracias",
      title: "Templo de Santo Domingo",
      place: "Capilla del Rosario",
      address: "Centro Histórico, Puebla.",
      time: "6:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Damos gracias a Dios por permitirme celebrar la dicha de mis quince años.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Recepción de Gala (Código Formal)",
      title: "Gran Velada Nocturna",
      place: "Terraza & Salón Vittoria",
      address: "Zona Angelópolis, Puebla.",
      time: "8:00 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Una noche de luces, música y elegancia preparada especialmente para ti.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "6:00 PM",
      title: "Ceremonia Religiosa",
      description: "Bendición solemne junto a mis padres y padrinos.",
      icon: "church",
      badge: "Capilla del Rosario",
    },
    {
      id: "coctel",
      time: "8:00 PM",
      title: "Cóctel de Bienvenida & Alfombra",
      description: "Recepción con mixología sin alcohol y sesión fotográfica.",
      icon: "sparkles",
      badge: "Terraza Vittoria",
    },
    {
      id: "cena",
      time: "9:00 PM",
      title: "Cena de Gala & Brindis",
      description: "Menú de tres tiempos y palabras de honor.",
      icon: "utensils",
      badge: "Salón Principal",
    },
    {
      id: "baile",
      time: "10:30 PM",
      title: "Vals & After Party",
      description: "Vals central y apertura de pista con DJ en vivo.",
      icon: "music",
      badge: "Gala Party",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("ximena-1.jpg"),
      title: "XV Gala Edition",
      caption: "Plantilla XV Elegante — 11.12 Estudio",
      tag: "Alta Costura",
    },
    {
      id: 2,
      src: asset("ximena-3.jpg"),
      title: "Brillo Nocturno",
      caption: "Una velada inolvidable bajo luces doradas",
      tag: "Editorial",
    },
    {
      id: 3,
      src: asset("ximena-4.jpg"),
      title: "Elegancia Atemporal",
      caption: "Diseño exclusivo en negro obsidiana y champán",
      tag: "Sesión VIP",
    },
    {
      id: 4,
      src: asset("ximena-2.jpg"),
      title: "Reserva la Fecha",
      caption: "Te esperamos para celebrar juntos",
      tag: "Gala Night",
    },
  ],
  gifts: {
    title: "Mesa de Regalos & Sobres",
    subtitle: "Lluvia de Sobres",
    message:
      "Tu compañía en esta noche de gala es mi mayor alegría. Si deseas hacerme un obsequio, contaremos con buzón de lluvia de sobres en la recepción.",
    note: "Código de vestimenta: Formal / Rigurosa Etiqueta.",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
