import { Phone, PhoneCall } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, whatsappUrlFor } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { useSite } from "../i18n/useSite";
import { openCallbackModal } from "../utils/callbackModal";

export default function MobileContactBar() {
  const { lang } = useLanguage();
  const s = useSite();
  const whatsappUrl = whatsappUrlFor(lang);

  return (
    <div className="mobile-contact-bar" aria-label={s.contact.title}>
      <a className="mcb-btn mcb-call" href={`tel:${clinic.phoneRaw}`}>
        <Phone size={20} aria-hidden="true" />
        <span>{s.mobile.call}</span>
      </a>
      <button className="mcb-btn mcb-callback" type="button" onClick={openCallbackModal}>
        <PhoneCall size={20} aria-hidden="true" />
        <span>{s.mobile.callback}</span>
      </button>
      <a className="mcb-btn mcb-wa" href={whatsappUrl} target="_blank" rel="noreferrer">
        <WhatsAppIcon size={20} />
        <span>{s.mobile.whatsapp}</span>
      </a>
    </div>
  );
}
