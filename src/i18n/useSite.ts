import { useLanguage } from "./LanguageContext";
import { siteContent, type SiteContent } from "./siteContent";

export function useSite(): SiteContent {
  const { lang } = useLanguage();
  return siteContent[lang];
}
