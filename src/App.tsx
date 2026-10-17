import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuickActionsBar from "./components/QuickActionsBar";
import TrustStatsStrip from "./components/TrustStatsStrip";
import MobileContactBar from "./components/MobileContactBar";
import FloatActions from "./components/FloatActions";
import AssessmentsSection from "./components/AssessmentsSection";
import VideoSection from "./components/VideoSection";
import DiagnosticsSection from "./components/DiagnosticsSection";
import MapReviews from "./components/MapReviews";
import SectionBackdrop from "./components/SectionBackdrop";
import WhatsAppIcon from "./components/WhatsAppIcon";
import { clinic, waLink, whatsappUrlFor } from "./config";
import { useLanguage } from "./i18n/LanguageContext";
import { useSite } from "./i18n/useSite";

export default function App() {
  const [formDone, setFormDone] = useState(false);
  const { lang } = useLanguage();
  const s = useSite();
  const whatsappUrl = whatsappUrlFor(lang);

  function onBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = [
      `Appointment — ${clinic.name}`,
      `Name: ${data.get("name")}`,
      `Mobile: ${data.get("mobile")}`,
      `Concern: ${data.get("concern")}`,
      `Mode: ${data.get("mode")}`,
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time")}`,
      `Notes: ${data.get("notes") || "-"}`,
    ].join("\n");

    setFormDone(true);
    window.open(waLink(payload), "_blank");
  }

  const bookOptions = s.book.concernOptions;

  return (
    <div id="top" className="site-premium">
      <div className="site-bg-art" aria-hidden="true">
        <span className="site-bg-blob site-bg-blob-1" />
        <span className="site-bg-blob site-bg-blob-2" />
        <span className="site-bg-blob site-bg-blob-3" />
        <span className="site-bg-blob site-bg-blob-4" />
        <span className="site-bg-grain" />
      </div>
      <Navbar />
      <HeroSection />
      <QuickActionsBar />
      <TrustStatsStrip />

      <AssessmentsSection />

      <DiagnosticsSection />
      <VideoSection />

      <section className="section fever-section section-fever-panel section-photo-band" id="fever">
        <SectionBackdrop scene="fever" />
        <div className="container section-content-layer">
          <div className="section-head section-head-left">
            <div className="section-label">{s.fever.label}</div>
            <h2>{s.fever.title}</h2>
          </div>
          <div className="fever-grid">
            {s.fever.items.map((msg) => (
              <article className="fever-card" key={msg.title}>
                <span className="fever-card-icon" aria-hidden="true">
                  <Thermometer size={22} strokeWidth={2.25} />
                </span>
                <h3>{msg.title}</h3>
                <p>{msg.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section doctor-section section-photo-band" id="doctor">
        <SectionBackdrop scene="doctor" />
        <div className="container doctor-layout section-content-layer">
          <div className="doctor-gallery">
            <div className="doctor-gallery-main photo-panel">
              <img src={clinic.images.doctorScrubs} alt={clinic.doctor.name} loading="lazy" />
            </div>
          </div>
          <div className="doctor-info">
            <div className="section-label">{s.doctor.label}</div>
            <h2>{s.doctor.title}</h2>
            <p className="doctor-sub">{s.doctor.specialty}</p>
            <p>{s.doctor.bioIntro}</p>
            <div className="doctor-credential-highlight" lang="en">
              {s.doctor.credentialHighlight}
            </div>
            {s.doctor.bio.split("\n\n").map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
            <ul className="doctor-interests">
              {s.doctor.interests.map((item) => (
                <li key={item}><CheckCircle2 size={16} /> {item}</li>
              ))}
            </ul>
            <div className="cred-grid">
              <div className="cred-box"><strong>MD</strong><span>{s.doctor.cred2}</span></div>
              <div className="cred-box"><strong>PG</strong><span>{s.doctor.cred1}</span></div>
              <div className="cred-box"><strong>AFMS</strong><span>{s.doctor.cred3}</span></div>
            </div>
            <a className="btn btn-primary" href="#book"><CalendarDays size={16} /> {s.doctor.book}</a>
          </div>
        </div>
      </section>

      <section className="section section-conditions-panel section-photo-band" id="conditions">
        <SectionBackdrop scene="conditions" />
        <div className="container section-content-layer">
          <div className="section-head section-head-centered">
            <div className="section-label">{s.conditions.label}</div>
            <h2>{s.conditions.title}</h2>
          </div>
          <div className="services-grid">
            {s.conditions.list.map((c) => (
              <div className="service-card" key={c}>
                <span className="service-card-icon">
                  <Stethoscope size={18} strokeWidth={2} />
                </span>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-photo-band book-section" id="book">
        <SectionBackdrop scene="book" />
        <div className="container section-content-layer">
          <div className="section-head">
            <div className="section-label">{s.book.label}</div>
            <h2>{s.book.title}</h2>
            <p>{s.book.subtitle}</p>
          </div>
          <div className="booking-grid">
            <div className="booking-info booking-doctor-card">
              <div className="booking-doctor-card-photo-wrap">
                <img
                  src={clinic.images.doctorFormal}
                  alt={clinic.doctor.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div className="booking-doctor-card-body">
                <header className="booking-doctor-intro">
                  <strong>{clinic.doctor.name}</strong>
                  <span>{s.doctor.specialty}</span>
                </header>
                <div className="booking-info-body">
                  <h2>{s.book.hoursDisplay}</h2>
                  <p>{s.hoursNote}</p>
                  <div className="booking-contact">
                    <div><Phone size={18} /> {clinic.phone}</div>
                    <div><MapPin size={18} /> {clinic.location.full}</div>
                  </div>
                  <a className="btn btn-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                    <WhatsAppIcon size={18} /> {s.book.whatsappBtn} · {clinic.phone}
                  </a>
                </div>
              </div>
            </div>

            <form className="booking-form" onSubmit={onBook}>
              {formDone && <div className="form-success">{s.book.formSuccess}</div>}
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">{s.book.name}</label>
                  <input id="name" name="name" required placeholder={s.book.namePh} />
                </div>
                <div className="field">
                  <label htmlFor="mobile">{s.book.mobile}</label>
                  <input id="mobile" name="mobile" required placeholder={s.book.mobilePh} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="concern">{s.book.concern}</label>
                <select id="concern" name="concern" defaultValue={bookOptions[0]}>
                  {bookOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="mode">{s.book.mode}</label>
                <select id="mode" name="mode" defaultValue={s.book.modeInPerson}>
                  <option value={s.book.modeInPerson}>{s.book.modeInPerson}</option>
                  <option value={s.book.modeVideo}>{s.book.modeVideo}</option>
                </select>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="date">{s.book.date}</label>
                  <input id="date" name="date" type="date" required />
                </div>
                <div className="field">
                  <label htmlFor="time">{s.book.time}</label>
                  <select id="time" name="time" defaultValue={s.book.timeMorning}>
                    <option>{s.book.timeMorning}</option>
                    <option>{s.book.timeAfternoon}</option>
                    <option>{s.book.timeEvening}</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="notes">{s.book.notes}</label>
                <textarea id="notes" name="notes" placeholder={s.book.notesPh} />
              </div>
              <button className="btn btn-primary" type="submit">
                <CalendarDays size={16} /> {s.book.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <MapReviews />

      <section className="section section-muted section-photo-band" id="contact">
        <SectionBackdrop scene="contact" />
        <div className="container contact-grid section-content-layer">
          <div>
            <div className="section-label">{s.faq.label}</div>
            <h2 className="contact-title">{s.faq.title}</h2>
            <div className="faq-list">
              {s.faq.items.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="contact-card contact-quick">
            <div className="contact-body">
              <h3>{s.contact.title}</h3>
              <div className="contact-meta">
                <div><Phone size={18} /><span><a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a></span></div>
                <div><Clock3 size={18} /><span>{clinic.hours}</span></div>
                <div><MapPin size={18} /><span>{clinic.location.full}</span></div>
              </div>
              <div className="contact-quick-actions">
                <a className="btn btn-primary" href={clinic.links.googleDirections} target="_blank" rel="noreferrer">{s.contact.navigate}</a>
                <a className="btn btn-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} /> {s.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={clinic.logo} alt="KVR Hospital" className="footer-logo-img" width={52} height={52} />
              <h4>{clinic.name}</h4>
              <p>{s.footer.tagline}</p>
            </div>
            <div>
              <h4>{s.footer.pages}</h4>
              <ul>
                <li><a href="#assessments">{s.footer.assessments}</a></li>
                <li><a href="#diagnostics">{s.footer.diagnostics}</a></li>
                <li><a href="#doctor">{s.footer.doctor}</a></li>
                <li><a href="#book">{s.footer.book}</a></li>
              </ul>
            </div>
            <div>
              <h4>{s.footer.contact}</h4>
              <ul>
                <li>{clinic.location.full}</li>
                <li><a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a></li>
                <li><a href={clinic.links.googleReviews} target="_blank" rel="noreferrer">{s.footer.googleReviews}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} {clinic.name} · {clinic.doctor.name}
            {" · "}
            <a href="/privacy.html">{s.footer.privacy}</a>
            {" · "}
            <a href="/terms.html">{s.footer.terms}</a>
          </div>
        </div>
      </footer>

      <FloatActions />
      <MobileContactBar />
    </div>
  );
}
