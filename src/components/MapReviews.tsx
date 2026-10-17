import { Star, ExternalLink, Navigation, MapPin } from "lucide-react";
import { clinic, mapsEmbedUrl } from "../config";
import { useSite } from "../i18n/useSite";
import SectionBackdrop from "./SectionBackdrop";

export default function MapReviews() {
  const s = useSite();

  return (
    <section className="section section-photo-band" id="location">
      <SectionBackdrop scene="location" />
      <div className="container section-content-layer">
        <div className="section-head">
          <div className="section-label">{s.map.label}</div>
          <h2>{s.map.title}</h2>
          <p>{clinic.location.full}</p>
        </div>

        <div className="map-reviews-grid">
          <div className="map-embed-wrap">
            <iframe
              title="KVR Hospital on Google Maps"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-actions">
              <a className="btn btn-primary" href={clinic.links.googleDirections} target="_blank" rel="noreferrer">
                <Navigation size={16} />
                {s.map.navigate}
              </a>
              <a className="btn btn-outline" href={clinic.links.googleMaps} target="_blank" rel="noreferrer">
                <MapPin size={16} />
                {s.map.openMaps}
              </a>
            </div>
          </div>

          <div className="reviews-panel">
            <h3>{s.map.reviewsTitle}</h3>
            <p className="reviews-intro">{s.map.reviewsIntro}</p>

            <div className="review-cards">
              <a className="review-card" href={clinic.links.googleReviews} target="_blank" rel="noreferrer">
                <div className="review-card-head">
                  <strong>{s.map.googleReviews}</strong>
                  <ExternalLink size={14} />
                </div>
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(clinic.reviews.google.rating) ? "#f59e0b" : "none"}
                      color="#f59e0b"
                    />
                  ))}
                  <span>{clinic.reviews.google.rating}</span>
                </div>
                <p>{clinic.reviews.google.count}+ {s.map.googleRatings}</p>
                <span className="review-link">{s.map.readReviews}</span>
              </a>

              <a className="review-card review-card-jd" href={clinic.links.justdial} target="_blank" rel="noreferrer">
                <div className="review-card-head">
                  <strong>{s.map.justdial}</strong>
                  <ExternalLink size={14} />
                </div>
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(clinic.reviews.justdial.rating) ? "#f59e0b" : "none"}
                      color="#f59e0b"
                    />
                  ))}
                  <span>{clinic.reviews.justdial.rating}</span>
                </div>
                <p>{clinic.reviews.justdial.count} {s.map.verifiedRatings} · {clinic.hours}</p>
                <span className="review-link">{s.map.viewJd}</span>
              </a>
            </div>

            <div className="location-details">
              <div>
                <MapPin size={18} />
                <span>{clinic.location.full}</span>
              </div>
              <div>
                <strong>{s.map.phone}</strong>{" "}
                <a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a>
              </div>
              <div>
                <strong>{s.map.hours}</strong> {clinic.hours}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
