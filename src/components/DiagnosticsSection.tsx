import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { clinic } from "../config";
import { diagVisuals } from "./graphics/DiagVisuals";

const cardThemes = {
  bca: { glow: "#1565b8", badge: "60-second scan" },
  fundus: { glow: "#ea580c", badge: "Retinal screening" },
  echo: { glow: "#0d7a6e", badge: "Cardiac ultrasound" },
} as const;

export default function DiagnosticsSection() {
  return (
    <section className="section diag-showcase" id="diagnostics">
      <div className="container">
        <div className="section-head">
          <div className="section-label">
            <Sparkles size={14} /> On-Site Diagnostics
          </div>
          <h2>Advanced tools for preventive assessment</h2>
          <p>Interactive, clinic-grade diagnostics — animated insights into what each test reveals for your health.</p>
        </div>

        <div className="diag-showcase-grid">
          {clinic.diagnostics.map((d, i) => {
            const Viz = diagVisuals[d.id as keyof typeof diagVisuals];
            const theme = cardThemes[d.id as keyof typeof cardThemes];

            return (
              <motion.article
                className={`diag-showcase-card diag-showcase-${d.id}`}
                key={d.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <div className="diag-showcase-visual" style={{ "--diag-glow": theme.glow } as CSSProperties}>
                  <div className="diag-showcase-visual-bg" aria-hidden="true" />
                  <div className="diag-showcase-badge">{theme.badge}</div>
                  {Viz && <Viz />}
                  <div className="diag-showcase-shimmer" aria-hidden="true" />
                </div>

                <div className="diag-showcase-body">
                  <span className="diag-short">{d.short}</span>
                  <h3>{d.title}</h3>
                  <p>{d.description}</p>
                  <div className="diag-tags">
                    {d.metrics.map((m) => (
                      <motion.span
                        key={m}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {m}
                      </motion.span>
                    ))}
                  </div>
                  <a className="diag-showcase-link" href="#book">
                    Book this test
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
