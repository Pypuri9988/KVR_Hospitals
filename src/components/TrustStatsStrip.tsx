import { useSite } from "../i18n/useSite";

export default function TrustStatsStrip() {
  const s = useSite();

  return (
    <section className="trust-stats-wrap" aria-label="Highlights">
      <div className="container">
        <div className="stats-strip-premium stats-grid trust-stats-grid">
          {s.highlights.map((item, i) => (
            <div className="stat-item trust-stat-item" key={item.label} data-tone={i}>
              <strong>{item.label}</strong>
              <span>{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
