import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { clinic, waLink } from "../config";

export default function AssessmentsSection() {
  return (
    <section className="section assessments-section" id="assessments">
      <div className="container">
        <div className="section-head">
          <div className="section-label">Health Assessments</div>
          <h2>Choose the right assessment for you</h2>
          <p>Doctor-led preventive packages — not a confusing list of tests.</p>
        </div>

        <div className="assessments-grid">
          {clinic.packages.map((pkg, i) => (
            <motion.article
              className={`assessment-card ${pkg.id === "metabolic" ? "assessment-featured" : ""}`}
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {pkg.id === "metabolic" && <span className="assessment-ribbon">Most popular</span>}
              <span className="assessment-tag">{pkg.tag}</span>
              <h3>{pkg.title}</h3>
              <p>{pkg.for}</p>
              <a className="btn btn-primary btn-sm" href="#book">
                Book now
              </a>
            </motion.article>
          ))}
        </div>

        <div className="assessment-pathway">
          <h3>What happens during your visit</h3>
          <div className="pathway-compact">
            {clinic.visitSteps.map((s, i) => (
              <div className="pathway-compact-step" key={s.step}>
                <span className="pathway-compact-num">{s.step}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
                {i < clinic.visitSteps.length - 1 && <ArrowRight size={16} className="pathway-compact-arrow" />}
              </div>
            ))}
          </div>
        </div>

        <div className="assessment-cta">
          <CheckCircle2 size={20} />
          <span>Not sure which package? Walk in or </span>
          <a href={waLink("Help me choose the right health assessment")} target="_blank" rel="noreferrer">
            ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
