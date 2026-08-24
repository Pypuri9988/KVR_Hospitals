import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Activity,
  Bot,
  CalendarDays,
  Clock3,
  Eye,
  Heart,
  MapPin,
  PhoneCall,
  Send,
  Stethoscope,
  Thermometer,
  X,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import LanguageSwitcher from "./LanguageSwitcher";
import { clinic, waLink } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { getBotMenuOptions, getWhatsappHubOptions, translations, type CareOption } from "../i18n/translations";
import { getReplyByKey, replyForInput } from "../i18n/replies";

type Msg = { role: "bot" | "user"; text: string; actions?: { label: string; href: string }[] };

const menuIcons = {
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

export default function Chatbot({
  open,
  onClose,
  onRequestCallback,
}: {
  open: boolean;
  onClose: () => void;
  onRequestCallback?: () => void;
}) {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];
  const botOptions = getBotMenuOptions(lang);
  const waOptions = getWhatsappHubOptions(lang);

  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: t.bot.greeting },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "bot", text: translations[lang].bot.greeting }]);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = replyForInput(lang, trimmed);
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "bot", text: reply.text, actions: reply.actions },
    ]);
    setInput("");
  }

  function handleMenuOption(option: CareOption) {
    if (option.action === "callback") {
      onRequestCallback?.();
      onClose();
      return;
    }
    if (option.message) {
      window.open(waLink(option.message), "_blank");
      return;
    }
    if (option.replyKey) {
      const reply = getReplyByKey(lang, option.replyKey);
      setMessages((m) => [
        ...m,
        { role: "user", text: option.label },
        { role: "bot", text: reply.text, actions: reply.actions },
      ]);
      return;
    }
    send(option.botPrompt ?? option.label);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  if (!open) return null;

  return (
    <div className="chatbot" role="dialog" aria-label="KVR Care assistant">
      <div className="chatbot-header">
        <div className="chatbot-header-brand">
          <span className="chatbot-logo">+</span>
          <div>
            <h4>{t.bot.title}</h4>
            <span>
              {t.bot.subtitle} · {clinic.name}
            </span>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <LanguageSwitcher lang={lang} onChange={setLang} variant="dark" />
          <button className="close" onClick={onClose} aria-label="Close chat">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="chatbot-menu">
        <p className="chatbot-menu-title">{t.bot.menuTitle}</p>
        <div className="chatbot-menu-grid">
          {botOptions.map((option) => {
            const Icon = menuIcons[option.icon];
            return (
              <button
                key={option.id}
                type="button"
                className="chatbot-menu-btn"
                onClick={() => handleMenuOption(option)}
              >
                <Icon size={16} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((m, i) => (
          <div key={i} className={`bubble-wrap ${m.role}`}>
            <div className={`bubble ${m.role}`}>{m.text}</div>
            {m.actions && m.role === "bot" && (
              <div className="bubble-actions">
                {m.actions.map((a) =>
                  a.href.startsWith("http") ? (
                    <a key={a.label} href={a.href} target="_blank" rel="noreferrer">
                      {a.label}
                    </a>
                  ) : (
                    <a key={a.label} href={a.href} onClick={onClose}>
                      {a.label}
                    </a>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="chatbot-input" onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.bot.placeholder}
          aria-label="Chat message"
        />
        <button type="submit" aria-label="Send">
          <Send size={16} />
        </button>
      </form>

      <a
        className="chatbot-wa-bar"
        href={waLink(waOptions[0].message!)}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon size={18} />
        {t.wa.waBar} · {clinic.phone}
      </a>
    </div>
  );
}
