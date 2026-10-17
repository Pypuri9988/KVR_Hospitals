import { Gauge, ScanLine, Timer, TrendingUp } from "lucide-react";
import { useSite } from "../i18n/useSite";

const perks = [
  { Icon: ScanLine, tone: "teal" },
  { Icon: Timer, tone: "coral" },
  { Icon: Gauge, tone: "blue" },
  { Icon: TrendingUp, tone: "gold" },
] as const;

export default function BcaShowcaseSection() {
  const s = useSite();
  const slides = s.slides;

  return (
    <section className="section bca-showcase" id="body-analysis">
      <div className="bca-showcase-bg" aria-hidden="true" />
      <div className="container bca-showcase-inner">
        <div className="bca-showcase-head">
          <span className="bca-showcase-badge">
            <span className="bca-showcase-pulse" aria-hidden="true" />
            {s.bca.label}
          </span>
          <h2>{s.bca.title}</h2>
          <p>{s.bca.text}</p>
          <div className="bca-showcase-accent-bar" aria-hidden="true" />
        </div>

        <div className="bca-showcase-grid">
          <div className="bca-showcase-visual">
            <div className="bca-showcase-visual-frame">
              <img
                src="/images/diagnostics/bca-equipment.png"
                alt="Body composition analyser at KVR Hospital, Ramachandrapuram"
                loading="eager"
                decoding="async"
              />
              <div className="bca-showcase-visual-caption">{s.bca.stat2sub} · KVR Hospital</div>
            </div>
            <div className="bca-showcase-mini-stats">
              <div className="bca-stat-card">
                <strong>{s.bca.stat1}</strong>
                <span>{s.bca.stat1sub}</span>
              </div>
              <div className="bca-stat-card">
                <strong>{s.bca.stat2}</strong>
                <span>{s.bca.stat2sub}</span>
              </div>
              <div className="bca-stat-card">
                <strong>{s.bca.stat3}</strong>
                <span>{s.bca.stat3sub}</span>
              </div>
            </div>
          </div>

          <div className="bca-showcase-cards">
            {slides.map((slide, i) => {
              const meta = perks[i] ?? perks[0];
              const Icon = meta.Icon;
              return (
                <article className={`bca-perk-card bca-perk-${meta.tone}`} key={slide.title}>
                  <span className="bca-perk-icon">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <h3>{slide.title}</h3>
                  <p>{slide.caption}</p>
                </article>
              );
            })}
            <a className="btn btn-gold bca-showcase-cta" href="#book">
              {s.bca.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
