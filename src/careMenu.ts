export type { CareOption, Lang } from "./i18n/translations";
export {
  getWhatsappHubOptions,
  getBotMenuOptions,
  translations,
} from "./i18n/translations";

import { getWhatsappHubOptions, getBotMenuOptions } from "./i18n/translations";

/** @deprecated Use getWhatsappHubOptions(lang) */
export const whatsappHubOptions = getWhatsappHubOptions("en");

/** @deprecated Use getBotMenuOptions(lang) */
export const botMenuOptions = getBotMenuOptions("en");
