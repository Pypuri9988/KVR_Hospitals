import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { diagVisualSets } from "./graphics/DiagVisuals";

type DiagId = keyof typeof diagVisualSets;

const SLIDE_MS = 4000;

type Props = {
  diagId: DiagId;
  /** Stagger start so cards don't switch in sync */
  staggerSec?: number;
};

export default function DiagVisualCarousel({ diagId, staggerSec = 0 }: Props) {
  const slides = diagVisualSets[diagId];
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setSlideW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, SLIDE_MS);
    }, staggerSec * 1000);

    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
  }, [staggerSec, slides.length]);

  return (
    <div className="diag-viz-carousel" ref={viewportRef} aria-hidden="true">
      <motion.div
        className="diag-viz-track"
        animate={{ x: slideW ? -index * slideW : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {slides.map((Viz, i) => (
          <div className="diag-viz-slide" key={`${diagId}-${i}`} style={{ width: slideW || "100%" }}>
            <Viz />
          </div>
        ))}
      </motion.div>

      <div className="diag-viz-dots">
        {slides.map((_, i) => (
          <span key={i} className={`diag-viz-dot ${i === index ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
