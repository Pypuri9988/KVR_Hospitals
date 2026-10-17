import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import TopTicker from "./TopTicker";
import WaScrollBanner from "./WaScrollBanner";
import LanguageSwitcher from "./LanguageSwitcher";
import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, whatsappUrlFor } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { useSite } from "../i18n/useSite";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const s = useSite();
  const whatsappUrl = whatsappUrlFor(lang);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#doctor", label: s.nav.doctor },
    { href: "#assessments", label: s.nav.services },
    { href: "#diagnostics", label: s.nav.diagnostics },
    { href: "#book", label: s.nav.book },
    { href: "#contact", label: s.nav.contact },
  ];

  return (
    <div className="site-header">
      <TopTicker />
      <WaScrollBanner />

      <div className="top-bar">
        <div className="container top-bar-inner">
          <span>
            <Phone size={14} /> {clinic.phone}
          </span>
          <span>{s.nav.hoursLine} · {clinic.location.city} · {s.nav.walkIns}</span>
        </div>
      </div>

      <header className={`nav ${open ? "open" : ""}`}>
        <div className="nav-inner">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            <img src={clinic.logo} alt="KVR Hospital" className="brand-logo" width={44} height={44} />
            <div className="brand-text">
              <strong>{clinic.name}</strong>
              <span>{clinic.doctor.shortName}</span>
            </div>
          </a>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <LanguageSwitcher lang={lang} onChange={setLang} showLabel={false} variant="light" />
            <a className="btn btn-outline btn-sm" href={`tel:${clinic.phoneRaw}`}>
              <Phone size={16} /> {s.nav.call}
            </a>
            <a className="btn btn-whatsapp btn-sm" href={whatsappUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} /> {s.quick.wa}
            </a>
          </div>

          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="nav-mobile-panel">
            <ul className="nav-mobile-links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-mobile-actions">
              <LanguageSwitcher lang={lang} onChange={setLang} variant="light" layout="bar" />
              <a className="btn btn-primary" href="#book" onClick={() => setOpen(false)}>
                {s.nav.bookAppointment}
              </a>
              <a className="btn btn-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> {s.quick.wa}
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
