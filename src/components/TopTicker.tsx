import { ChevronRight, Sparkles } from "lucide-react";
import { clinic, waLink } from "../config";

function TickerItems() {
  return (
    <>
      {clinic.ticker.map((item) => (
        <span className="ticker-item" key={item.text}>
          <span className={`ticker-badge ticker-badge-${item.badgeStyle}`}>{item.badge}</span>
          <span className="ticker-text">
            {item.text}
            <em>{item.highlight}</em>
          </span>
          <a className="ticker-cta" href={item.href}>
            {item.cta}
            <ChevronRight size={14} />
          </a>
        </span>
      ))}
    </>
  );
}

export default function TopTicker() {
  return (
    <div className="top-ticker" aria-label="Announcements">
      <div className="top-ticker-inner">
        <span className="top-ticker-label">
          <Sparkles size={14} />
          KVR Hospital · {clinic.location.city}
        </span>
        <div className="top-ticker-scroll">
          <div className="top-ticker-fade top-ticker-fade-left" aria-hidden="true" />
          <div className="top-ticker-fade top-ticker-fade-right" aria-hidden="true" />
          <div className="top-ticker-track">
            <div className="top-ticker-content">
              <TickerItems />
              <TickerItems />
            </div>
          </div>
        </div>
        <a className="top-ticker-phone" href={waLink("Hello KVR Hospital")} target="_blank" rel="noreferrer">
          {clinic.phone}
        </a>
      </div>
    </div>
  );
}
