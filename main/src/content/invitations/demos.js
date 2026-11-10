import { invitationAsset } from "../../lib/assets";
import { xvXimenaInvitation } from "./xv-ximena";
import { xvCamilaInvitation } from "./xv-camila";
import { bodaValeriaSebastianInvitation } from "./boda-valeria-sebastian";
import { bodaMarianaAlejandroInvitation } from "./boda-mariana-alejandro";

export const templateDemos = [
  {
    ...xvXimenaInvitation,
    meta: {
      ...xvXimenaInvitation.meta,
      slug: "xv-princesa",
      url: "/i/xv-princesa",
      isTemplate: true,
      templateId: "xv-princesa",
      templateName: "XV Princesa (Rosa & Oro Real)",
      clientName: "Valentina (Demo)",
      eventType: "XV Años • Princesa",
      title: "Plantilla XV Princesa — Rosa Blush & Oro",
      subtitle:
        "Diseño de cuento de hadas con mariposas animadas, sobre de lacre y cristal",
      locationSummary: "Jardín Imperial, Puebla",
      coverImage: invitationAsset("xv-princesa", "ximena-3.jpg"),
      showInPortfolio: false,
    },
    quinceanera: {
      ...xvXimenaInvitation.quinceanera,
      name: "Valentina",
      subtitle: "Colección XV Princesa — 11.12 Estudio",
      heroImage: invitationAsset("xv-princesa", "ximena-3.jpg"),
      audioUrl: invitationAsset("xv-princesa", "xv-song.mp3"),
    },
  },
  {
    ...xvCamilaInvitation,
    meta: {
      ...xvCamilaInvitation.meta,
      slug: "xv-elegante",
      url: "/i/xv-elegante",
      isTemplate: true,
      templateId: "xv-elegante",
      templateName: "XV Elegante (Gala Nocturna & Champán)",
      clientName: "Camila (Demo)",
      eventType: "XV Años • Gala Elegante",
      title: "Plantilla XV Elegante — Gala Nocturna & Oro",
      subtitle:
        "Estética de alta costura en tonos noche, champán dorado y cristal esmerilado",
      locationSummary: "Terraza & Salón Vittoria, Puebla",
      coverImage: invitationAsset("xv-elegante", "ximena-1.jpg"),
      showInPortfolio: false,
    },
    quinceanera: {
      ...xvCamilaInvitation.quinceanera,
      name: "Camila",
      title: "XV Gala Night",
      subtitle: "Colección XV Elegante — 11.12 Estudio",
      heroImage: invitationAsset("xv-elegante", "ximena-1.jpg"),
      audioUrl: invitationAsset("xv-elegante", "xv-song.mp3"),
    },
  },
  {
    ...bodaValeriaSebastianInvitation,
    meta: {
      ...bodaValeriaSebastianInvitation.meta,
      slug: "boda-elegante",
      url: "/i/boda-elegante",
      isTemplate: true,
      templateId: "boda-elegante",
      templateName: "Boda Elegante (Marfil, Olivo & Oro)",
      clientName: "Valeria & Sebastián (Demo)",
      eventType: "Boda • Editorial Elegante",
      title: "Plantilla Boda Elegante — Marfil & Olivo",
      subtitle:
        "Diseño editorial minimalista para bodas civiles, haciendas y jardines de lujo",
      locationSummary: "Hacienda San José, Cholula",
      coverImage: invitationAsset("boda-elegante", "ximena-2.jpg"),
      showInPortfolio: false,
    },
    quinceanera: {
      ...bodaValeriaSebastianInvitation.quinceanera,
      subtitle: "Colección Boda Elegante — 11.12 Estudio",
      heroImage: invitationAsset("boda-elegante", "ximena-2.jpg"),
      audioUrl: invitationAsset("boda-elegante", "xv-song.mp3"),
    },
  },
  {
    ...bodaMarianaAlejandroInvitation,
    meta: {
      ...bodaMarianaAlejandroInvitation.meta,
      slug: "boda-religiosa",
      url: "/i/boda-religiosa",
      isTemplate: true,
      templateId: "boda-religiosa",
      templateName: "Boda Religiosa (Clásica Sacramental & Oro)",
      clientName: "Mariana & Alejandro (Demo)",
      eventType: "Boda • Clásica Religiosa",
      title: "Plantilla Boda Religiosa — Perla & Oro Antiguo",
      subtitle:
        "Diseño solemne y romántico con bendición nupcial, misa de esponsales y recepción",
      locationSummary: "Catedral & Ex-Hacienda, Puebla",
      coverImage: invitationAsset("boda-religiosa", "ximena-4.jpg"),
      showInPortfolio: false,
    },
    quinceanera: {
      ...bodaMarianaAlejandroInvitation.quinceanera,
      subtitle: "Colección Boda Religiosa — 11.12 Estudio",
      heroImage: invitationAsset("boda-religiosa", "ximena-4.jpg"),
      audioUrl: invitationAsset("boda-religiosa", "xv-song.mp3"),
    },
  },
];
