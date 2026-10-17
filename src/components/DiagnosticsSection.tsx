import { useState } from "react";
import { Activity, ArrowRight, Building2, Eye, HeartPulse, MapPin } from "lucide-react";
import { clinic } from "../config";
import { useSite } from "../i18n/useSite";
import DiagnosticsEquipmentCarousel from "./DiagnosticsEquipmentCarousel";
import SectionBackdrop from "./SectionBackdrop";

const perkIcons = {
  fundus: Eye,
  bca: Activity,
  echo: HeartPulse,
} as const;

export default function DiagnosticsSection() {
  const s = useSite();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = clinic.diagnosticPromoSlides[activeIndex];
  const activeId = activeSlide?.diagnosticId;
  const activeCopy = activeId ? s.diagnostics.items[activeId] : null;

  return (
    <section className="section diag-showcase section-photo-band" id="diagnostics">
      <SectionBackdrop scene="facilities" />
      <div className="container section-content-layer">
        <div className="section-head diag-showcase-head">
          <div className="section-label">
            <Building2 size={15} aria-hidden="true" />
            {s.diagnostics.label}
          </div>
          <h2>{s.diagnostics.title}</h2>
          <p className="diag-showcase-lead">{s.diagnostics.subtitle}</p>
        </div>

        <div className="diag-unified diag-sitara-layout">
          <DiagnosticsEquipmentCarousel onIndexChange={setActiveIndex} />

          <aside className="diag-sitara-info">
            <p className="diag-on-site">
              <MapPin size={16} aria-hidden="true" />
              {s.diagnostics.items.fundus.onSite}
            </p>

            <div className="diag-sitara-perks">
              {clinic.diagnostics.map((d) => {
                const copy = s.diagnostics.items[d.id];
                if (!copy) return null;
                const Icon = perkIcons[d.id as keyof typeof perkIcons] ?? Activity;
                return (
                  <article className={`diag-sitara-perk${d.id === activeId ? " is-active" : ""}`} key={d.id}>
                    <span className="diag-sitara-perk-icon">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <h3>{copy.short}</h3>
                    <p>{copy.summaryLine}</p>
                  </article>
                );
              })}
            </div>

            {activeCopy && (
              <div className="diag-sitara-metrics">
                <p className="diag-sitara-metrics-label">{s.diagnostics.metricsHeading}</p>
                <div className="diag-sitara-metric-pills">
                  {activeCopy.metrics.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            )}

            <a className="btn btn-gold diag-sitara-cta" href="#book">
              {s.diagnostics.bookTest}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
