import { CheckCircle2 } from "lucide-react";
import { clinic } from "../config";

export default function NutritionSection() {
  return (
    <section className="section section-nutrition" id="nutrition">
      <div className="container">
        <div className="nutrition-intro">
          <div className="section-label">Nutrition · Diabetes Care</div>
          <h2>Balanced plate & follow-up tracking</h2>
          <p>
            Metabolic health is not only about medicines — diet and regular monitoring matter.
            Our team guides you with practical meal balance and structured diabetes follow-up.
          </p>
          <ul className="hero-sitara-points resource-points">
            <li><CheckCircle2 size={16} /> Telugu diet plate guide for everyday meals</li>
            <li><CheckCircle2 size={16} /> Diabetes follow-up investigation sheet</li>
            <li><CheckCircle2 size={16} /> Targets for sugar, BP, weight & more</li>
          </ul>
          <a className="btn btn-primary" href="#book">Book metabolic assessment</a>
        </div>

        <figure className="nutrition-chart-figure nutrition-chart-hero">
          <img
            src={clinic.images.dietGuide}
            alt="Diabetes follow-up sheet and healthy balanced diet plate guide in Telugu"
            loading="lazy"
            className="nutrition-chart-img"
          />
          <figcaption>Healthy balanced diet plate · Diabetes follow-up sheet — KVR Hospital</figcaption>
        </figure>
      </div>
    </section>
  );
}
