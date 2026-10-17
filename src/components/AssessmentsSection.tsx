import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { waLink } from "../config";
import { useSite } from "../i18n/useSite";
import SectionBackdrop from "./SectionBackdrop";

export default function AssessmentsSection() {
  const s = useSite();

  return (
    <section className="section assessments-section section-photo-band" id="assessments">
      <SectionBackdrop scene="assessments" />
      <div className="container section-content-layer">
        <div className="section-head">
          <div className="section-label">{s.assessments.label}</div>
          <h2>{s.assessments.title}</h2>
          <p>{s.assessments.subtitle}</p>
        </div>

        <div className="assessments-grid">
          {s.assessments.packages.map((pkg, i) => (
            <motion.article
              className={`assessment-card assessment-card-${pkg.id} ${pkg.id === "metabolic" ? "assessment-featured" : ""}`}
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {pkg.id === "metabolic" && <span className="assessment-ribbon">{s.assessments.mostPopular}</span>}
              <span className="assessment-tag">{pkg.tag}</span>
              <h3>{pkg.title}</h3>
              <p>{pkg.for}</p>
              <a className="btn btn-primary btn-sm" href="#book">
                {s.assessments.bookNow}
              </a>
            </motion.article>
          ))}
        </div>

        <div className="assessment-cta">
          <CheckCircle2 size={20} />
          <span>{s.assessments.pathwayNotSure} </span>
          <a href={waLink("Help me choose the right health assessment")} target="_blank" rel="noreferrer">
            {s.assessments.pathwayWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
}
