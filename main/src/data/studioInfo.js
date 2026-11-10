import { invitationAsset } from "../lib/assets";

export const STUDIO_INFO = {
  name: "11.12 Estudio",
  tagline: "Fotografía Editorial & Invitaciones Digitales en Atlixco",
  photographerEmail: "marcog.fotografo@gmail.com",
  emailHref: "mailto:marcog.fotografo@gmail.com",
  phoneDisplay: "244 110 0758",
  phoneHref: "tel:+522441100758",
  whatsappUrl:
    "https://api.whatsapp.com/send?phone=5212441100758&text=Hola%2011.12%20Estudio%2C%20me%20gustar%C3%ADa%20cotizar%20un%20paquete%20de%20fotograf%C3%ADa%20e%20invitaci%C3%B3n%20digital.",
  facebookUrl: "https://www.facebook.com/profile.php?id=61577977364042",
  facebookHandle: "11.12 Estudio en Facebook",
  address: {
    street: "15 Oriente Número 4",
    city: "Atlixco, Puebla, México",
    postalCode: "4260",
    full: "15 Oriente Número 4, Atlixco, México, 4260",
    mapUrl:
      "https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=18.90151%2C%20-98.43656&FORM=FBKPL1&name=15%20ORIENTE%20NUMERO%204%2C%20Atlixco%2C%20Mexico%2C%204260&mkt=es-MX&fbclid=IwZXh0bgNhZW0CMTAAcGRvZgVicmlkETFXTEtsazZnNzVTQjhTTzVWc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABH91dGhi6Ot6XsnN1Fd-qy5qTsS0uRJfFC46zcyFgj1QyLYquVOoTDbG9qNtH_aem__7v73dJJKyd7ged7yhMoyQ",
  },
  editorialShots: [
    {
      id: "sesion-ximena",
      src: invitationAsset("xv-ximena", "ximena-3.jpg"),
      alt: "Retrato editorial de quinceañera en jardín por 11.12 Estudio",
      title: "Ximena • Edición Princesa",
      category: "Sesión XV Años",
      meta: "Jardín Secreto • Luz Natural",
      location: "Escape de Lagunillas, Puebla",
      invitationUrl: "/i/xv-ximena",
      gallery: [
        {
          src: invitationAsset("xv-ximena", "ximena-3.jpg"),
          caption: "Portada Editorial Save The Date — Luz dorada de tarde",
        },
        {
          src: invitationAsset("xv-ximena", "ximena-1.jpg"),
          caption: "Retrato de cuerpo completo en locación exterior",
        },
        {
          src: invitationAsset("xv-ximena", "ximena-2.jpg"),
          caption: "Composición en jardín con iluminación natural",
        },
        {
          src: invitationAsset("xv-ximena", "ximena-4.jpg"),
          caption: "Retrato de cierre para galería de invitación digital",
        },
      ],
    },
    {
      id: "sesion-camila",
      src: invitationAsset("xv-camila", "camila-1.jpg"),
      alt: "Retrato de gala nocturna de quinceañera en terraza colonial de Atlixco",
      title: "Camila • Gala de Medianoche",
      category: "Sesión XV Gala",
      meta: "Ex-Hacienda San Agustín • Atlixco",
      location: "Atlixco, Puebla",
      invitationUrl: "/i/xv-camila",
      gallery: [
        {
          src: invitationAsset("xv-camila", "camila-1.jpg"),
          caption: "Terraza colonial al anochecer con iluminación cálida",
        },
        {
          src: invitationAsset("xv-camila", "camila-2.jpg"),
          caption: "Escalinata principal entre velas y flores champán",
        },
        {
          src: invitationAsset("xv-camila", "camila-3.jpg"),
          caption: "Retrato en primer plano con contraluz dorado",
        },
        {
          src: invitationAsset("xv-camila", "camila-4.jpg"),
          caption: "Salón de candiles de cristal • Alta costura",
        },
      ],
    },
    {
      id: "sesion-valeria-sebastian",
      src: invitationAsset("boda-valeria-sebastian", "valeria-1.jpg"),
      alt: "Fotografía de boda en hacienda de Atlixco al atardecer",
      title: "Valeria & Sebastián • Hacienda",
      category: "Sesión Pre-Boda & Civil",
      meta: "Hacienda Santo Cristo • Atlixco",
      location: "Paseo de las Bugambilias, Atlixco",
      invitationUrl: "/i/boda-valeria-sebastian",
      gallery: [
        {
          src: invitationAsset("boda-valeria-sebastian", "valeria-1.jpg"),
          caption: "Arcos de cantera al atardecer en Hacienda Santo Cristo",
        },
        {
          src: invitationAsset("boda-valeria-sebastian", "valeria-2.jpg"),
          caption: "Caminata entre olivos y jardines de la hacienda",
        },
        {
          src: invitationAsset("boda-valeria-sebastian", "valeria-3.jpg"),
          caption: "Retrato íntimo con velo de encaje y luz cálida",
        },
        {
          src: invitationAsset("boda-valeria-sebastian", "valeria-4.jpg"),
          caption: "Recepción nocturna bajo cielo de luces en terraza",
        },
      ],
    },
    {
      id: "sesion-mariana-alejandro",
      src: invitationAsset("boda-mariana-alejandro", "mariana-1.jpg"),
      alt: "Retrato clásico de boda religiosa en templo histórico de Atlixco",
      title: "Mariana & Alejandro • Sacramental",
      category: "Cobertura Nupcial",
      meta: "Templo de La Merced • Atlixco",
      location: "Centro Histórico de Atlixco",
      invitationUrl: "/i/boda-mariana-alejandro",
      gallery: [
        {
          src: invitationAsset("boda-mariana-alejandro", "mariana-1.jpg"),
          caption: "Portón tallado del Templo de La Merced en Atlixco",
        },
        {
          src: invitationAsset("boda-mariana-alejandro", "mariana-2.jpg"),
          caption: "Solemne ceremonia nupcial frente al retablo dorado",
        },
        {
          src: invitationAsset("boda-mariana-alejandro", "mariana-3.jpg"),
          caption: "Salida triunfal de los novios bajo lluvia de pétalos",
        },
        {
          src: invitationAsset("boda-mariana-alejandro", "mariana-4.jpg"),
          caption: "Retrato de gala en el claustro colonial iluminado",
        },
      ],
    },
  ],
};
