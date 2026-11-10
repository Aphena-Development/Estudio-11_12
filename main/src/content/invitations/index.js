import { xvXimenaInvitation } from "./xv-ximena";
import { xvCamilaInvitation } from "./xv-camila";
import { bodaValeriaSebastianInvitation } from "./boda-valeria-sebastian";
import { bodaMarianaAlejandroInvitation } from "./boda-mariana-alejandro";
import { templateDemos } from "./demos";

export const CLIENT_INVITATIONS = [
  xvXimenaInvitation,
  xvCamilaInvitation,
  bodaValeriaSebastianInvitation,
  bodaMarianaAlejandroInvitation,
];

export const ALL_INVITATIONS = [...CLIENT_INVITATIONS, ...templateDemos];

/**
 * Devuelve únicamente las invitaciones autorizadas para aparecer en el portafolio público.
 * Las invitaciones de clientes privados con `showInPortfolio: false` permanecen ocultas en /invitaciones
 * pero siguen siendo accesibles mediante su enlace directo `/i/[slug]`.
 */
export function getPortfolioInvitations() {
  return CLIENT_INVITATIONS.filter((item) => item.meta?.showInPortfolio === true).map(
    (item) => item.meta
  );
}

export function getAllInvitations() {
  return ALL_INVITATIONS;
}

export function getInvitationBySlug(slug) {
  return ALL_INVITATIONS.find((item) => item.meta?.slug === slug) || null;
}
