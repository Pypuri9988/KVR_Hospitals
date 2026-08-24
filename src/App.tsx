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
import HospitalBuildAnimation from "./components/HospitalBuildAnimation";
import FloatActions from "./components/FloatActions";
import ConsultationCarousel from "./components/ConsultationCarousel";
import AssessmentsSection from "./components/AssessmentsSection";
import VideoSection from "./components/VideoSection";
import DiagnosticsSection from "./components/DiagnosticsSection";
import NutritionSection from "./components/NutritionSection";
import MapReviews from "./components/MapReviews";
import WhatsAppIcon from "./components/WhatsAppIcon";
import { clinic, waLink, whatsappUrlFor } from "./config";
import { useLanguage } from "./i18n/LanguageContext";

const faqs = [
  {
    q: "Do I need an appointment?",
    a: "Walk-ins welcome Mon–Sat, 9 AM–8 PM. You can also book on WhatsApp or the form below.",
  },
  {
    q: "Which health assessment should I choose?",
    a: "Essential for baseline at 25+. Metabolic for diabetes/fatty liver risk. Heart for BP/cholesterol. Full for a complete review. Not sure? Ask on WhatsApp.",
  },
  {
    q: "What should I bring?",
    a: "Current medicines (photo of strip is fine) and any recent reports if you have them.",
  },
];

export default function App() {
  const [formDone, setFormDone] = useState(false);
  const { lang } = useLanguage();
  const whatsappUrl = whatsappUrlFor(lang);

  function onBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = [
      `Appointment — ${clinic.name}`,
      `Name: ${data.get("name")}`,
      `Mobile: ${data.get("mobile")}`,
      `Concern: ${data.get("concern")}`,
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time")}`,
      `Notes: ${data.get("notes") || "-"}`,
    ].join("\n");

    setFormDone(true);
    window.open(waLink(payload), "_blank");
  }

  return (
    <div id="top">
      <Navbar />
      <HeroSection />

      <HospitalBuildAnimation />

      <div className="stats-strip">
        <div className="stats-grid">
          {clinic.highlights.map((h) => (
            <div className="stat-item" key={h.label}>
              <strong>{h.label}</strong>
              <span>{h.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <AssessmentsSection />

      {/* PREVENTIVE + CAROUSEL */}
      <section className="section" id="preventive">
        <div className="container problem-grid">
          <div className="problem-content">
            <div className="section-label">Preventive Care</div>
            <h2>Detect early. Prevent complications.</h2>
            <p>
              Diabetes, fatty liver and heart disease often start silently. We find your risks
              early — and build a plan with your doctor.
            </p>
            <a className="btn btn-primary" href="#assessments">View assessments</a>
          </div>
          <ConsultationCarousel />
        </div>
      </section>

      {/* BCA highlight */}
      <section className="section section-accent" id="body-composition">
        <div className="container bca-grid">
          <div className="bca-content">
            <div className="section-label">New · Body Composition</div>
            <h2>Know what your weight is made of</h2>
            <p>60-second scan — body fat, visceral fat, muscle mass & metabolic age. Painless, no needles.</p>
            <a className="btn btn-gold" href={waLink("Book Body Composition Analysis")} target="_blank" rel="noreferrer">
              Book BCA test
            </a>
          </div>
          <div className="bca-visual bca-visual-stats" aria-hidden="true">
            <div className="bca-stat-card"><strong>60 sec</strong><span>Full scan</span></div>
            <div className="bca-stat-card"><strong>BCA</strong><span>On-site</span></div>
            <div className="bca-stat-card"><strong>4+</strong><span>Key metrics</span></div>
          </div>
        </div>
      </section>

      <NutritionSection />

      <DiagnosticsSection />
      <VideoSection />

      {/* FEVER */}
      <section className="section fever-section" id="fever">
        <div className="container">
          <div className="section-head section-head-left">
            <div className="section-label">Fever Care</div>
            <h2>Evidence-based — not routine protocols</h2>
          </div>
          <div className="fever-grid">
            {clinic.feverMessages.map((msg) => (
              <article className="fever-card" key={msg.title}>
                <Thermometer size={24} />
                <h3>{msg.title}</h3>
                <p>{msg.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section className="section doctor-section" id="doctor">
        <div className="container doctor-layout">
          <div className="doctor-gallery">
            <div className="doctor-gallery-main photo-panel">
              <img src={clinic.images.doctorScrubs} alt={clinic.doctor.name} loading="lazy" />
            </div>
          </div>
          <div className="doctor-info">
            <div className="section-label">{clinic.doctor.title}</div>
            <h2>{clinic.doctor.name}</h2>
            <p className="doctor-sub">{clinic.doctor.specialty} · {clinic.doctor.experience}</p>
            <p>{clinic.doctor.bio}</p>
            <ul className="doctor-interests">
              {clinic.doctor.interests.map((item) => (
                <li key={item}><CheckCircle2 size={16} /> {item}</li>
              ))}
            </ul>
            <div className="cred-grid">
              <div className="cred-box"><strong>MBBS</strong><span>Graduate</span></div>
              <div className="cred-box"><strong>MD</strong><span>Internal Medicine</span></div>
              <div className="cred-box"><strong>{clinic.doctor.experience}</strong><span>Practice</span></div>
            </div>
            <a className="btn btn-primary" href="#book"><CalendarDays size={16} /> Book consultation</a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <div className="section-label">Why KVR</div>
            <h2>What to expect</h2>
          </div>
          <div className="why-grid">
            {clinic.whyUs.map((item) => (
              <div className="why-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="section" id="conditions">
        <div className="container">
          <div className="section-head">
            <div className="section-label">We Treat & Prevent</div>
            <h2>Conditions we focus on</h2>
          </div>
          <div className="services-grid">
            {clinic.conditions.map((c) => (
              <div className="service-card" key={c}><Stethoscope size={16} />{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section className="section" id="book">
        <div className="container">
          <div className="section-head">
            <div className="section-label">Book Now</div>
            <h2>Request a consultation or assessment</h2>
            <p>Submit the form — we confirm on WhatsApp.</p>
          </div>
          <div className="booking-grid">
            <div className="booking-info">
              <div className="booking-photo">
                <img src={clinic.images.doctorFormal} alt={clinic.doctor.name} loading="lazy" />
              </div>
              <div className="booking-info-body">
                <h2>{clinic.hours}</h2>
                <p>{clinic.hoursNote}</p>
                <div className="booking-contact">
                  <div><Phone size={18} /> {clinic.phone}</div>
                  <div><MapPin size={18} /> {clinic.location.full}</div>
                </div>
                <a className="btn btn-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} /> WhatsApp · {clinic.phone}
                </a>
              </div>
            </div>

            <form className="booking-form" onSubmit={onBook}>
              {formDone && (
                <div className="form-success">Thank you — WhatsApp is opening to confirm.</div>
              )}
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" required placeholder="Patient name" />
                </div>
                <div className="field">
                  <label htmlFor="mobile">Mobile</label>
                  <input id="mobile" name="mobile" required placeholder="10-digit number" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="concern">Health concern</label>
                <select id="concern" name="concern" defaultValue="Metabolic Assessment">
                  {clinic.packages.map((p) => (
                    <option key={p.id}>{p.title}</option>
                  ))}
                  {clinic.conditions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                  <option>Body Composition Test</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="date">Preferred date</label>
                  <input id="date" name="date" type="date" required />
                </div>
                <div className="field">
                  <label htmlFor="time">Preferred time</label>
                  <select id="time" name="time" defaultValue="Morning (9 AM – 12 PM)">
                    <option>Morning (9 AM – 12 PM)</option>
                    <option>Afternoon (12 – 4 PM)</option>
                    <option>Evening (4 – 8 PM)</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea id="notes" name="notes" placeholder="Symptoms or questions" />
              </div>
              <button className="btn btn-primary" type="submit">
                <CalendarDays size={16} /> Submit request
              </button>
            </form>
          </div>
        </div>
      </section>

      <MapReviews />

      <section className="section section-muted" id="contact">
        <div className="container contact-grid">
          <div>
            <div className="section-label">FAQ</div>
            <h2 className="contact-title">Quick answers</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="contact-card contact-quick">
            <div className="contact-body">
              <h3>Quick Contact</h3>
              <div className="contact-meta">
                <div><Phone size={18} /><span><a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a></span></div>
                <div><Clock3 size={18} /><span>{clinic.hours}</span></div>
                <div><MapPin size={18} /><span>{clinic.location.full}</span></div>
              </div>
              <div className="contact-quick-actions">
                <a className="btn btn-primary" href={clinic.links.googleDirections} target="_blank" rel="noreferrer">Navigate</a>
                <a className="btn btn-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} /> WhatsApp
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
              <p>{clinic.preventiveCentre} · Ramachandrapuram · {clinic.doctor.shortName}</p>
            </div>
            <div>
              <h4>Pages</h4>
              <ul>
                <li><a href="#assessments">Assessments</a></li>
                <li><a href="#diagnostics">Diagnostics</a></li>
                <li><a href="#doctor">Doctor</a></li>
                <li><a href="#book">Book</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>{clinic.location.full}</li>
                <li><a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a></li>
                <li><a href={clinic.links.googleReviews} target="_blank" rel="noreferrer">Google Reviews</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} {clinic.name} · {clinic.doctor.name}
            {" · "}
            <a href="/privacy.html">Privacy</a>
            {" · "}
            <a href="/terms.html">Terms</a>
          </div>
        </div>
      </footer>

      <FloatActions />
    </div>
  );
}
