import { ArrowRight, Sparkles } from "lucide-react";
import { useSite } from "../i18n/useSite";

export default function TopTicker() {
  const s = useSite();

  return (
    <a className="bca-promo-banner" href="#diagnostics" aria-label={`${s.ticker.badge} ${s.ticker.text} ${s.ticker.highlight}`}>
      <div className="bca-promo-inner">
        <Sparkles size={16} className="bca-promo-sparkle" aria-hidden="true" />
        <span className="bca-promo-text">
          <strong>{s.ticker.badge}</strong>
          <span className="bca-promo-dot" aria-hidden="true">
            ·
          </span>
          {s.ticker.text}{" "}
          <strong>{s.ticker.highlight}</strong>
        </span>
        <span className="bca-promo-link">
          {s.ticker.cta}
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
