import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, whatsappUrlFor } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { useSite } from "../i18n/useSite";
import SectionBackdrop from "./SectionBackdrop";

export default function QuickActionsBar() {
  const { lang } = useLanguage();
  const s = useSite();
  const whatsappUrl = whatsappUrlFor(lang);

  const actions = [
    { label: s.quick.call, sub: s.quick.callSub, href: `tel:${clinic.phoneRaw}`, icon: Phone, tone: "call" },
    { label: s.quick.wa, sub: s.quick.waSub, href: whatsappUrl, icon: WhatsAppIcon, tone: "wa", external: true },
    { label: s.quick.book, sub: s.quick.bookSub, href: "#book", icon: CalendarDays, tone: "book" },
    { label: s.quick.map, sub: s.quick.mapSub, href: clinic.links.googleDirections, icon: MapPin, tone: "map", external: true },
  ];

  return (
    <section className="quick-actions-premium section-photo-band section-photo-band-compact" aria-label="Quick contact">
      <SectionBackdrop scene="quickActions" />
      <div className="container section-content-layer">
        <div className="quick-actions-premium-grid">
          {actions.map((action) => {
            const Icon = action.icon;
            const props = action.external ? { target: "_blank", rel: "noreferrer" as const } : {};

            return (
              <a key={action.label} className={`quick-tile quick-tile-${action.tone}`} href={action.href} {...props}>
                <span className="quick-tile-icon">
                  {action.icon === WhatsAppIcon ? <WhatsAppIcon size={22} /> : <Icon size={22} />}
                </span>
                <span className="quick-tile-copy">
                  <strong>{action.label}</strong>
                  <em>{action.sub}</em>
                </span>
                <MessageCircle size={16} className="quick-tile-arrow" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
