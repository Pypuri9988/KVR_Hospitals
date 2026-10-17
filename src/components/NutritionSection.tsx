import { CheckCircle2 } from "lucide-react";
import { clinic } from "../config";
import { useSite } from "../i18n/useSite";

export default function NutritionSection() {
  const s = useSite();

  return (
    <section className="section section-nutrition" id="nutrition">
      <div className="container">
        <div className="nutrition-intro">
          <div className="section-label">{s.nutrition.label}</div>
          <h2>{s.nutrition.title}</h2>
          <p>{s.nutrition.text}</p>
          <ul className="hero-sitara-points resource-points">
            <li><CheckCircle2 size={16} /> {s.nutrition.point1}</li>
            <li><CheckCircle2 size={16} /> {s.nutrition.point2}</li>
            <li><CheckCircle2 size={16} /> {s.nutrition.point3}</li>
          </ul>
          <a className="btn btn-primary" href="#book">{s.nutrition.cta}</a>
        </div>

        <figure className="nutrition-chart-figure nutrition-chart-hero">
          <img
            src={clinic.images.dietGuide}
            alt={s.nutrition.caption}
            loading="lazy"
            className="nutrition-chart-img"
          />
          <figcaption>{s.nutrition.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
