import { useState, type FormEvent } from "react";
import {
  Activity,
  Bot,
  CalendarDays,
  Clock3,
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  PhoneCall,
  Stethoscope,
  Thermometer,
  X,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import Chatbot from "./Chatbot";
import LanguageSwitcher from "./LanguageSwitcher";
import { clinic, waLink } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { getWhatsappHubOptions, translations, type CareOption } from "../i18n/translations";

const actionIcons = {
  whatsapp: WhatsAppIcon,
  calendar: CalendarDays,
  bot: Bot,
  clock: Clock3,
  activity: Activity,
  eye: Eye,
  heart: Heart,
  map: MapPin,
  phone: PhoneCall,
  clipboard: Stethoscope,
  thermometer: Thermometer,
};

type FloatActionsProps = {
  onRequestCallback?: () => void;
};

export default function FloatActions({ onRequestCallback }: FloatActionsProps) {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];
  const whatsappHubOptions = getWhatsappHubOptions(lang);

  const [waOpen, setWaOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  function openCallback() {
    setCallbackOpen(true);
    setDone(false);
    setWaOpen(false);
    onRequestCallback?.();
  }

  function submitCallback(e: FormEvent) {
    e.preventDefault();
    setDone(true);
    const text = `Callback request from ${name}\nPhone: ${phone}\nNote: ${note || "Please call back"}`;
    window.setTimeout(() => {
      window.open(waLink(text), "_blank");
    }, 600);
  }

  function handleAction(action: CareOption) {
    if (action.action === "chatbot") {
      setWaOpen(false);
      setChatOpen(true);
      return;
    }
    if (action.action === "callback") {
      openCallback();
      return;
    }
    if (action.message) {
      window.open(waLink(action.message), "_blank");
    }
    setWaOpen(false);
  }

  return (
    <>
      <div className="float-stack">
        {chatOpen && (
          <Chatbot
            open={chatOpen}
            onClose={() => setChatOpen(false)}
            onRequestCallback={openCallback}
          />
        )}

        {waOpen && (
          <div className="wa-hub" role="dialog" aria-label="WhatsApp options">
            <div className="wa-hub-header">
              <div>
                <strong>{t.wa.hubTitle}</strong>
                <span>{t.wa.waBar} {clinic.phone}</span>
              </div>
              <button className="wa-hub-close" onClick={() => setWaOpen(false)} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="wa-hub-lang-bar">
              <LanguageSwitcher lang={lang} onChange={setLang} variant="light" layout="bar" />
            </div>
            <div className="wa-hub-list">
              {whatsappHubOptions.map((action) => {
                const Icon = actionIcons[action.icon] ?? MessageCircle;
                const isWa = action.icon === "whatsapp";
                return (
                  <button
                    key={action.id}
                    type="button"
                    className="wa-hub-item"
                    onClick={() => handleAction(action)}
                  >
                    <span className={`wa-hub-icon ${isWa ? "wa-hub-icon-green" : ""}`}>
                      {isWa ? <WhatsAppIcon size={20} /> : <Icon size={20} />}
                    </span>
                    <span className="wa-hub-text">
                      <strong>{action.label}</strong>
                      {action.sub && <em>{action.sub}</em>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button className="float-btn float-callback" onClick={openCallback}>
          <PhoneCall size={18} />
          <span>{t.float.callback}</span>
        </button>

        <button
          className={`float-btn float-whatsapp pulse ${waOpen ? "active" : ""}`}
          onClick={() => {
            setWaOpen((v) => !v);
            setChatOpen(false);
          }}
          aria-expanded={waOpen}
          aria-label={t.float.whatsapp}
        >
          <WhatsAppIcon size={22} />
          <span>{t.float.whatsapp}</span>
        </button>

        <button
          className="float-btn float-chat icon-only"
          onClick={() => {
            setChatOpen((v) => !v);
            setWaOpen(false);
          }}
          aria-label={t.bot.title}
        >
          {chatOpen ? <X size={22} /> : <Bot size={22} />}
        </button>
      </div>

      {callbackOpen && (
        <div className="modal-backdrop" onClick={() => setCallbackOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header>
              <div>
                <h3>{t.callback.title}</h3>
                <p>{t.callback.subtitle}</p>
              </div>
              <div className="modal-header-actions">
                <LanguageSwitcher lang={lang} onChange={setLang} variant="light" />
                <button className="close" onClick={() => setCallbackOpen(false)} aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </header>

            {done ? (
              <div className="form-success">
                {name ? `${name} — ` : ""}
                {t.callback.thanks}
              </div>
            ) : (
              <form className="booking-form" style={{ padding: 0 }} onSubmit={submitCallback}>
                <div className="field">
                  <label htmlFor="cb-name">{t.callback.name}</label>
                  <input
                    id="cb-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.callback.name}
                  />
                </div>
                <div className="field">
                  <label htmlFor="cb-phone">{t.callback.phone}</label>
                  <input
                    id="cb-phone"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.callback.phonePlaceholder}
                  />
                </div>
                <div className="field">
                  <label htmlFor="cb-note">{t.callback.note}</label>
                  <textarea
                    id="cb-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t.callback.note}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  <PhoneCall size={16} />
                  {t.callback.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
