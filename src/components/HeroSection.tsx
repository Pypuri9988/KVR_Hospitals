import { motion } from "framer-motion";
import { Award, CheckCircle2, Clock3, MapPin, Phone, Star } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, whatsappUrlFor } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { useSite } from "../i18n/useSite";

export default function HeroSection() {
  const { lang } = useLanguage();
  const s = useSite();
  const whatsappUrl = whatsappUrlFor(lang);

  return (
    <section className="hero-premium" id="top-hero">
      <div
        className="hero-premium-bg"
        style={{ backgroundImage: `url(${clinic.images.hospitalHero})` }}
        aria-hidden="true"
      />
      <div className="hero-premium-overlay" aria-hidden="true" />
      <div className="hero-premium-glow" aria-hidden="true" />

      <div className="container hero-premium-inner">
        <motion.div
          className="hero-premium-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="hero-rating-pill">
            <Star size={14} fill="currentColor" />
            <strong>{clinic.reviews.justdial.rating}</strong>
            <span>{s.hero.rating}</span>
          </div>

          <p className="hero-premium-eyebrow">
            <Award size={16} />
            {s.hero.centre}
          </p>

          <h1>
            {s.hero.titleBefore}<em>{s.hero.titleHighlight}</em>{s.hero.titleAfter}
          </h1>

          <p className="hero-premium-lead">{s.hero.lead}</p>

          <ul className="hero-premium-points">
            <li><CheckCircle2 size={17} /> {s.hero.point1}</li>
            <li><CheckCircle2 size={17} /> {s.hero.point2}</li>
            <li><CheckCircle2 size={17} /> {s.hero.point3}</li>
          </ul>

          <div className="hero-premium-actions">
            <a className="btn btn-gold btn-lg" href="#book">{s.hero.book}</a>
            <a className="btn btn-whatsapp btn-lg" href={whatsappUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} />
              {s.hero.whatsapp}
            </a>
          </div>

          <div className="hero-premium-contact">
            <span><Phone size={15} /> {clinic.phone}</span>
            <span><Clock3 size={15} /> {s.nav.hoursLine}</span>
            <span><MapPin size={15} /> {s.hero.location}</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-premium-visual"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        >
          <div className="hero-doctor-frame">
            <div className="hero-doctor-frame-border" aria-hidden="true" />
            <div className="hero-doctor-photo-wrap">
              <img
                src={clinic.images.doctorScrubs}
                alt={clinic.doctor.name}
                width={1200}
                height={1098}
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="hero-doctor-plaque">
              <p className="hero-doctor-plaque-label">{s.hero.physicianLabel}</p>
              <h2>{clinic.doctor.shortName}</h2>
              <p>{clinic.doctor.qualifications}</p>
              <div className="hero-doctor-plaque-tags">
                <span>{s.hero.experience}</span>
                <span>{s.hero.specialty}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
