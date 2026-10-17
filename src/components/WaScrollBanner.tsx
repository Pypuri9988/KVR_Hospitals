import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, waLink } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { translations } from "../i18n/translations";
import { openChatbotModal } from "../utils/callbackModal";

type MarqueeItem = { id: string; label: string; href?: string; action?: "bot" };

function MarqueeGroup({ items }: { items: MarqueeItem[] }) {
  return (
    <div className="wa-marquee-group">
      {items.map((item) =>
        item.action === "bot" ? (
          <button
            key={item.id}
            type="button"
            className="wa-marquee-item wa-marquee-item-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openChatbotModal();
            }}
          >
            <span className="wa-marquee-icon">
              <WhatsAppIcon size={14} />
            </span>
            <span className="wa-marquee-label">{item.label}</span>
            <span className="wa-marquee-sep" aria-hidden="true" />
          </button>
        ) : (
          <a
            key={item.id}
            className="wa-marquee-item"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="wa-marquee-icon">
              <WhatsAppIcon size={14} />
            </span>
            <span className="wa-marquee-label">{item.label}</span>
            <span className="wa-marquee-sep" aria-hidden="true" />
          </a>
        ),
      )}
    </div>
  );
}

export default function WaScrollBanner() {
  const { lang } = useLanguage();
  const t = translations[lang].wa;

  const items: MarqueeItem[] = [
    { id: "lead", label: t.hubTitle, href: waLink(t.chatMsg) },
    { id: "chat", label: `${t.chat} ${clinic.phone}`, href: waLink(t.chatMsg) },
    { id: "consult", label: t.consult, href: waLink(t.consultMsg) },
    { id: "sample", label: t.sample, href: waLink(t.sampleMsg) },
    { id: "medicine", label: t.medicine, href: waLink(t.medicineMsg) },
    { id: "bot", label: t.bot, action: "bot" },
  ];

  return (
    <div className="wa-marquee-banner group" role="region" aria-label={t.hubTitle}>
      <div className="wa-marquee-shimmer" aria-hidden="true" />
      <div className="wa-marquee-viewport">
        <div className="wa-marquee">
          <MarqueeGroup items={items} />
          <MarqueeGroup items={items} />
        </div>
      </div>
    </div>
  );
}
