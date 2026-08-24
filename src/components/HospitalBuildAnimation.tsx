import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Droplets, Heart, Sparkles, Thermometer } from "lucide-react";
import { clinic } from "../config";

type Block = {
  id: string;
  w: number;
  h: number;
  left: string;
  bottom: number;
  color: string;
  delay: number;
  cross?: boolean;
  studs?: number;
};

const blocks: Block[] = [
  { id: "plate", w: 280, h: 20, left: "50%", bottom: 32, color: "#64748b", delay: 0, studs: 6 },
  { id: "wing-l", w: 88, h: 78, left: "calc(50% - 98px)", bottom: 52, color: "#dbeafe", delay: 0.25, studs: 3 },
  { id: "wing-r", w: 88, h: 78, left: "calc(50% + 10px)", bottom: 52, color: "#dbeafe", delay: 0.45, studs: 3 },
  { id: "tower", w: 102, h: 108, left: "calc(50% - 51px)", bottom: 52, color: "#f8fafc", delay: 0.65, studs: 4 },
  { id: "cross", w: 36, h: 36, left: "calc(50% - 18px)", bottom: 148, color: "#ef4444", delay: 0.95, cross: true },
  { id: "tree-l", w: 28, h: 40, left: "calc(50% - 155px)", bottom: 38, color: "#4ade80", delay: 1.15, studs: 1 },
  { id: "tree-r", w: 28, h: 40, left: "calc(50% + 127px)", bottom: 38, color: "#22c55e", delay: 1.25, studs: 1 },
];

const careWords = ["Diabetes", "Fever", "Care", "Hope"];

function LegoBlock({ block, play }: { block: Block; play: boolean }) {
  return (
    <motion.div
      className={`lego-piece ${block.cross ? "lego-piece-cross" : ""}`}
      style={{
        width: block.w,
        height: block.h,
        left: block.left,
        bottom: block.bottom,
        background: block.color,
        marginLeft: block.left === "50%" ? -(block.w / 2) : undefined,
      }}
      initial={{ opacity: 0, y: -120, rotate: -12, scale: 0.3 }}
      animate={
        play
          ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
          : { opacity: 0, y: -120, rotate: -12, scale: 0.3 }
      }
      transition={{
        delay: block.delay,
        duration: 0.55,
        type: "spring",
        stiffness: 260,
        damping: 16,
      }}
    >
      {block.studs && (
        <div className="lego-studs">
          {Array.from({ length: block.studs }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}
      {block.cross && (
        <>
          <span className="cross-v" />
          <span className="cross-h" />
        </>
      )}
    </motion.div>
  );
}

export default function HospitalBuildAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const wasInView = useRef(false);
  const [seq, setSeq] = useState(0);
  const [phase, setPhase] = useState<"building" | "care" | "idle">("idle");

  useEffect(() => {
    if (!isInView) {
      wasInView.current = false;
      setPhase("idle");
      return;
    }
    if (wasInView.current) return;
    wasInView.current = true;
    setSeq((s) => s + 1);
    setPhase("building");
  }, [isInView]);

  useEffect(() => {
    if (phase !== "building") return;
    const careTimer = window.setTimeout(() => setPhase("care"), 1800);
    return () => window.clearTimeout(careTimer);
  }, [phase, seq]);

  const play = phase === "building" || phase === "care";
  const showCare = phase === "care";

  return (
    <section
      ref={sectionRef}
      className={`hospital-cinematic ${showCare ? "hospital-cinematic-revealed" : ""}`}
      aria-label="KVR Hospital building animation"
    >
      <div
        className="hospital-cinematic-bg"
        style={{ backgroundImage: `url(${clinic.images.hospitalBuild})` }}
        aria-hidden="true"
      />
      <div className="hospital-cinematic-overlay" />

      <div className="container hospital-cinematic-inner">
        <motion.div
          className="hospital-cinematic-copy"
          initial={{ opacity: 0, x: -24 }}
          animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="section-label">KVR Hospital · Sugar & Fever Care</div>
          <h2>
            Expert care for
            <br />
            <span className="highlight-diabetes">Diabetes</span> &{" "}
            <span className="highlight-fever">Fever</span>
          </h2>
          <p>
            Ramachandrapuram&apos;s trusted centre for sugar disorders, metabolic health, and
            evidence-based fever treatment — typhoid, dengue & more.
          </p>
          <ul className="hospital-focus-list">
            <li>
              <Droplets size={16} /> Diabetes · fatty liver · obesity
            </li>
            <li>
              <Thermometer size={16} /> Typhoid · dengue · infections
            </li>
            <li>
              <Heart size={16} /> Preventive assessments on-site
            </li>
          </ul>
        </motion.div>

        <div className="lego-scene" key={seq}>
          <div className="lego-scene-shadow" aria-hidden="true" />

          {blocks.map((b) => (
            <LegoBlock key={`${seq}-${b.id}`} block={b} play={play} />
          ))}

          <motion.div
            className="lego-smile"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={showCare ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.1 }}
            aria-hidden="true"
          >
            <span className="smile-face">😊</span>
            <span className="smile-text">We care for you</span>
          </motion.div>

          {showCare &&
            careWords.map((word, i) => (
              <motion.span
                key={`${seq}-${word}`}
                className="lego-care-tag"
                style={{ left: `${18 + i * 20}%`, bottom: `${120 + (i % 2) * 30}px` }}
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 200 }}
              >
                {word}
              </motion.span>
            ))}

          {showCare &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={`${seq}-heart-${i}`}
                className="lego-heart"
                style={{ left: `${30 + i * 22}%` }}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], y: -80, scale: [0.5, 1.2, 0.8] }}
                transition={{ delay: 0.3 + i * 0.2, duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
              >
                <Heart size={22} fill="#f472b6" color="#f472b6" />
              </motion.div>
            ))}

          <motion.div
            className="lego-sparkle"
            initial={{ opacity: 0, rotate: 0 }}
            animate={showCare ? { opacity: 1, rotate: 360 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            <Sparkles size={28} />
          </motion.div>
        </div>

        <motion.div
          className="hospital-cinematic-caption"
          initial={{ opacity: 0, y: 16 }}
          animate={showCare ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <strong>{clinic.name}</strong>
          <span>{clinic.location.full}</span>
        </motion.div>
      </div>
    </section>
  );
}
