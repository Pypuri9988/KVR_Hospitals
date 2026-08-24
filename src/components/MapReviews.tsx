import { Star, ExternalLink, Navigation, MapPin } from "lucide-react";
import { clinic, mapsEmbedUrl } from "../config";

export default function MapReviews() {
  return (
    <section className="section" id="location">
      <div className="container">
        <div className="section-head">
          <div className="section-label">Find Us</div>
          <h2>Location, directions & patient reviews</h2>
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
                Navigate to Hospital
              </a>
              <a className="btn btn-outline" href={clinic.links.googleMaps} target="_blank" rel="noreferrer">
                <MapPin size={16} />
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="reviews-panel">
            <h3>Patient Reviews</h3>
            <p className="reviews-intro">
              See what patients say about KVR Hospital on Google and JustDial.
            </p>

            <div className="review-cards">
              <a
                className="review-card"
                href={clinic.links.googleReviews}
                target="_blank"
                rel="noreferrer"
              >
                <div className="review-card-head">
                  <strong>Google Reviews</strong>
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
                <p>{clinic.reviews.google.count}+ ratings on Google Maps</p>
                <span className="review-link">Read & write reviews →</span>
              </a>

              <a
                className="review-card review-card-jd"
                href={clinic.links.justdial}
                target="_blank"
                rel="noreferrer"
              >
                <div className="review-card-head">
                  <strong>JustDial</strong>
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
                <p>{clinic.reviews.justdial.count} verified ratings · {clinic.hours}</p>
                <span className="review-link">View on JustDial →</span>
              </a>
            </div>

            <div className="location-details">
              <div>
                <MapPin size={18} />
                <span>{clinic.location.full}</span>
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${clinic.phoneRaw}`}>{clinic.phone}</a>
              </div>
              <div>
                <strong>Hours:</strong> {clinic.hours}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
