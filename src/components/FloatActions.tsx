import { useEffect, useState, type FormEvent } from "react";
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
  Pill,
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
import { CALLBACK_EVENT, CHATBOT_EVENT } from "../utils/callbackModal";

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
  pill: Pill,
};

const hubIconTone: Record<string, string> = {
  chat: "green",
  consult: "teal",
  sample: "orange",
  medicine: "purple",
  bot: "brand",
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
    setChatOpen(false);
    onRequestCallback?.();
  }

  useEffect(() => {
    const onCallback = () => openCallback();
    const onChatbot = () => {
      setChatOpen(true);
      setWaOpen(false);
    };
    window.addEventListener(CALLBACK_EVENT, onCallback);
    window.addEventListener(CHATBOT_EVENT, onChatbot);
    return () => {
      window.removeEventListener(CALLBACK_EVENT, onCallback);
      window.removeEventListener(CHATBOT_EVENT, onChatbot);
    };
  });

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
      <div
        className={`float-stack${waOpen ? " is-wa-open" : ""}${chatOpen ? " is-chat-open" : ""}${callbackOpen ? " is-modal-open" : ""}`}
      >
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
                const Icon = actionIcons[action.icon as keyof typeof actionIcons] ?? MessageCircle;
                const isWa = action.icon === "whatsapp";
                const tone = hubIconTone[action.id] ?? "teal";
                return (
                  <button
                    key={action.id}
                    type="button"
                    className="wa-hub-item"
                    onClick={() => handleAction(action)}
                  >
                    <span className={`wa-hub-icon wa-hub-icon-${tone}`}>
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

        <button className="float-btn float-pro float-callback" type="button" onClick={openCallback}>
          <span className="float-pro-icon" aria-hidden="true">
            <PhoneCall size={18} />
          </span>
          <span className="float-pro-text">{t.float.callback}</span>
        </button>

        <button
          type="button"
          className={`float-btn float-pro float-whatsapp ${waOpen ? "active" : ""}`}
          onClick={() => {
            setWaOpen((v) => !v);
            setChatOpen(false);
          }}
          aria-expanded={waOpen}
          aria-label={t.float.whatsapp}
        >
          <span className="float-pro-icon float-pro-icon-wa" aria-hidden="true">
            <WhatsAppIcon size={18} />
          </span>
          <span className="float-pro-text">{t.float.whatsapp}</span>
        </button>

        <button
          type="button"
          className={`float-btn float-pro float-bot ${chatOpen ? "active" : ""}`}
          onClick={() => {
            setChatOpen((v) => !v);
            setWaOpen(false);
          }}
          aria-label={t.bot.title}
        >
          <span className="float-pro-icon float-pro-icon-bot" aria-hidden="true">
            <Bot size={18} />
          </span>
          <span className="float-pro-text">{t.bot.title}</span>
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
