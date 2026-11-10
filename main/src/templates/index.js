import XvPrincesaTemplate from "./xv-princesa/Template";
import XvEleganteTemplate from "./xv-elegante/Template";
import BodaEleganteTemplate from "./boda-elegante/Template";
import BodaReligiosaTemplate from "./boda-religiosa/Template";

export const TEMPLATE_REGISTRY = {
  "xv-princesa": XvPrincesaTemplate,
  "xv-elegante": XvEleganteTemplate,
  "boda-elegante": BodaEleganteTemplate,
  "boda-religiosa": BodaReligiosaTemplate,
};

export function resolveTemplateComponent(templateId) {
  return TEMPLATE_REGISTRY[templateId] || XvPrincesaTemplate;
}
