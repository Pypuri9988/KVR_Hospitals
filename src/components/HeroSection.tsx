import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, waLink, whatsappUrlFor } from "../config";
import { useLanguage } from "../i18n/LanguageContext";

export default function HeroSection() {
  const { lang } = useLanguage();
  const whatsappUrl = whatsappUrlFor(lang);

  return (
    <section className="hero-sitara" id="top-hero">
      <div
        className="hero-sitara-bg"
        style={{ backgroundImage: `url(${clinic.images.hospitalHero})` }}
        aria-hidden="true"
      />
      <div className="hero-sitara-overlay" aria-hidden="true" />

      <div className="container hero-sitara-grid">
        <motion.div
          className="hero-sitara-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-location-pill">
            {clinic.location.city}, {clinic.location.state} · Walk-ins welcome
          </div>

          <h1>
            Medicine that treats <span className="hero-accent">you</span> — not just your{" "}
            <span className="hero-accent">numbers</span>.
          </h1>
          <p className="hero-sitara-lead">{clinic.subtagline}</p>

          <ul className="hero-sitara-points">
            <li>
              <CheckCircle2 size={16} /> No appointment needed for first visit
            </li>
            <li>
              <CheckCircle2 size={16} /> Diabetes · Fatty liver · Metabolic care
            </li>
          </ul>

          <div className="hero-promo-banner">
            <span className="hero-promo-new">
              <Sparkles size={13} /> NEW
            </span>
            <div className="hero-promo-text">
              <strong>Body Composition Analysis</strong>
              <span>Body fat, muscle & metabolic age — 60-second scan</span>
            </div>
            <a
              className="hero-promo-btn"
              href={waLink("Book Body Composition Analysis")}
              target="_blank"
              rel="noreferrer"
            >
              Book now
            </a>
          </div>

          <div className="hero-sitara-actions">
            <a className="btn btn-primary btn-lg" href="#assessments">
              {clinic.ctaPrimary}
            </a>
            <a className="btn btn-whatsapp btn-lg" href={whatsappUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} />
              {clinic.ctaSecondary}
            </a>
            <a className="btn btn-ghost-light btn-lg" href={`tel:${clinic.phoneRaw}`}>
              <Phone size={18} />
              {clinic.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-sitara-visual"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="hero-profile-card">
            <div className="hero-profile-photo">
              <img
                src={clinic.images.doctorScrubs}
                alt={clinic.doctor.name}
                width={480}
                height={520}
              />
            </div>
            <div className="hero-profile-body">
              <h3>{clinic.doctor.name}</h3>
              <p className="hero-profile-specialty">Internal Medicine</p>
              <div className="hero-profile-creds">
                <div className="hero-profile-cred">
                  <strong>MD</strong>
                  <span>Internal Medicine</span>
                </div>
                <div className="hero-profile-cred">
                  <strong>MBBS</strong>
                  <span>Physician</span>
                </div>
                <div className="hero-profile-cred">
                  <strong>10+ Years</strong>
                  <span>Clinical Practice</span>
                </div>
                <div className="hero-profile-cred">
                  <strong>BCA</strong>
                  <span>On-site diagnostics</span>
                </div>
              </div>
              <div className="hero-profile-footer">
                <MapPin size={16} />
                <span>
                  {clinic.name}, {clinic.location.city}, {clinic.location.state}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
