import { invitationAsset } from "../../lib/assets";

const SLUG = "boda-valeria-sebastian";
const asset = (file) => invitationAsset(SLUG, file);

export const bodaValeriaSebastianInvitation = {
  meta: {
    slug: SLUG,
    url: `/i/${SLUG}`,
    isTemplate: false,
    templateId: "boda-elegante",
    templateName: "Boda Civil & Jardín",
    clientName: "Valeria & Sebastián",
    eventType: "Boda Civil & Jardín",
    title: "Nuestra Boda — Valeria & Sebastián",
    subtitle: "Celebración nupcial al atardecer entre olivos y arquitectura colonial",
    eventDate: "2027-02-14",
    dateDisplay: "14 . 02 . 27",
    dateFullText: "Domingo 14 de Febrero de 2027",
    locationSummary: "Hacienda Santo Cristo, Atlixco, Puebla",
    coverImage: asset("valeria-1.jpg"),
    showInPortfolio: true,
  },
  accessControl: {
    mode: "none",
  },
  quinceanera: {
    name: "Valeria & Sebastián",
    title: "Nuestra Boda",
    subtitle: "14 de Febrero de 2027 — Atlixco, Puebla",
    dateISO: "2027-02-14T16:00:00-06:00",
    dateDisplay: "14 . 02 . 27",
    dateFullText: "Domingo 14 de Febrero de 2027",
    welcomeQuote:
      "Dos vidas, dos caminos y una misma promesa: caminar juntos de la mano hoy y siempre.",
    invitationText:
      "En compañía de nuestras familias, tenemos la inmensa alegría de invitarlos a celebrar Nuestro Matrimonio",
    heroImage: asset("valeria-1.jpg"),
    audioUrl: asset("xv-song.mp3"),
    songTitle: "Nuestro Primer Baile",
    whatsappNumber: "5212441100758",
    whatsappDisplay: "244 110 07 58",
  },
  loveStory: [
    {
      roman: "I",
      stage: "EL ENCUENTRO",
      title: "Dos Caminos",
      text: "Lo que comenzó como una coincidencia se transformó en nuestra certeza favorita de todos los días.",
    },
    {
      roman: "II",
      stage: "LA PROMESA",
      title: "Un Mismo Hogar",
      text: "Entre risas, viajes y sueños compartidos descubrimos que el mejor lugar del mundo es estar juntos.",
    },
    {
      roman: "III",
      stage: "EL GRAN DÍA",
      title: "14 . 02 . 27",
      text: "Bajo los olivos de Atlixco sellaremos nuestra promesa rodeados de las personas que más amamos.",
    },
  ],
  locations: [
    {
      id: "ceremonia",
      type: "Ceremonia Civil & Votos",
      title: "Patio de los Olivos",
      place: "Hacienda Santo Cristo",
      address: "Paseo de las Bugambilias, Atlixco, Puebla.",
      time: "4:00 PM",
      mapUrl: "https://maps.app.goo.gl/2EoYRr2Q8LQ4CWGDA",
      description:
        "Acompáñanos a firmar nuestra unión y compartir nuestros votos al atardecer.",
      icon: "church",
    },
    {
      id: "recepcion",
      type: "Cóctel y Banquete Nupcial",
      title: "Jardín Mayor de la Hacienda",
      place: "Hacienda Santo Cristo",
      address: "Paseo de las Bugambilias, Atlixco, Puebla.",
      time: "5:30 PM",
      mapUrl: "https://maps.app.goo.gl/5mapJMLNUo1Pa1BdA",
      description:
        "Celebraremos con música en vivo, cena bajo las luces del jardín y brindis.",
      icon: "mapPin",
    },
  ],
  itinerary: [
    {
      id: "ceremonia",
      time: "4:00 PM",
      title: "Ceremonia Civil",
      description: "Lectura de votos matrimoniales y firma de acta.",
      icon: "church",
      badge: "Patio de los Olivos",
    },
    {
      id: "coctel",
      time: "5:00 PM",
      title: "Cóctel de Bienvenida",
      description: "Mixología botánica, canapés y cuarteto de cuerdas.",
      icon: "sparkles",
      badge: "Arcos Coloniales",
    },
    {
      id: "banquete",
      time: "6:30 PM",
      title: "Banquete de Bodas",
      description: "Cena maridaje y brindis por nuestro nuevo hogar.",
      icon: "utensils",
      badge: "Jardín Mayor",
    },
    {
      id: "baile",
      time: "8:30 PM",
      title: "Primer Vals de Esposos",
      description: "Nuestro primer baile como esposos y fiesta bajo las estrellas.",
      icon: "music",
      badge: "Noche de Boda",
    },
  ],
  gallery: [
    {
      id: 1,
      src: asset("valeria-1.jpg"),
      title: "Promesa en Atlixco",
      caption: "Sesión pre-boda bajo los arcos de piedra",
      tag: "Portada Nupcial",
    },
    {
      id: 2,
      src: asset("valeria-2.jpg"),
      title: "Jardín de los Olivos",
      caption: "Caminando juntos hacia nuestro gran día",
      tag: "Luz de Tarde",
    },
    {
      id: 3,
      src: asset("valeria-3.jpg"),
      title: "Cómplices de Vida",
      caption: "El amor se celebra rodeados de quienes más queremos",
      tag: "Retrato Íntimo",
    },
    {
      id: 4,
      src: asset("valeria-4.jpg"),
      title: "14 de Febrero de 2027",
      caption: "Gracias por ser parte de nuestra historia",
      tag: "Save The Date",
    },
  ],
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Lluvia de Sobres & Luna de Miel",
    message:
      "Su presencia es nuestro mayor regalo. Si desean hacernos un obsequio para nuestra luna de miel, contaremos con buzón para sobres en la recepción.",
    note: "Código de vestimenta: Formal de jardín (Damas evitar blanco y marfil).",
  },
  studio: {
    name: "11.12 Estudio",
    instagram: "11.12 Estudio",
    facebook: "11.12 Estudio",
    phone: "244 110 07 58",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5212441100758",
  },
};
