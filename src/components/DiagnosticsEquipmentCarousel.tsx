import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinic } from "../config";
import { useSite } from "../i18n/useSite";

const SLIDE_MS = 2000;

type Props = {
  onIndexChange?: (index: number) => void;
};

export default function DiagnosticsEquipmentCarousel({ onIndexChange }: Props) {
  const s = useSite();
  const slides = clinic.diagnosticPromoSlides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);

  const setSlide = useCallback(
    (next: number) => {
      const i = (next + slides.length) % slides.length;
      setIndex(i);
      onIndexChange?.(i);
    },
    [onIndexChange, slides.length],
  );

  useEffect(() => {
    onIndexChange?.(0);
  }, [onIndexChange]);

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
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % slides.length;
        onIndexChange?.(next);
        return next;
      });
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [paused, onIndexChange, slides.length]);

  const frame = slides[index] ?? slides[0];
  const promoW = frame?.width ?? 834;
  const promoH = frame?.height ?? 1000;

  return (
    <div
      className="diag-equip-carousel diag-sitara-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="diag-equip-viewport"
        ref={viewportRef}
        style={
          {
            "--promo-w": promoW,
            "--promo-h": promoH,
          } as CSSProperties
        }
      >
        <motion.div
          className="diag-equip-track"
          animate={{ x: slideW ? -index * slideW : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          aria-live="polite"
        >
          {slides.map((slide, slideIndex) => {
            const item = s.diagnostics.items[slide.diagnosticId];
            return (
              <figure className="diag-equip-slide" key={`${slide.diagnosticId}-${slideIndex}`} style={{ width: slideW || "100%" }}>
                <img
                  src={slide.image}
                  alt={slide.imageAlt ?? item?.title ?? slide.diagnosticId}
                  width={slide.width ?? 834}
                  height={slide.height ?? 1000}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            );
          })}
        </motion.div>

        <button type="button" className="diag-equip-nav diag-equip-nav-prev" onClick={() => setSlide(index - 1)} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>
        <button type="button" className="diag-equip-nav diag-equip-nav-next" onClick={() => setSlide(index + 1)} aria-label="Next">
          <ChevronRight size={22} />
        </button>

        <div className="diag-equip-dots diag-equip-dots-overlay" role="tablist" aria-label="On-site diagnostics">
          {slides.map((slide, i) => (
            <button
              key={`dot-${slide.diagnosticId}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`diag-equip-dot${i === index ? " active" : ""}`}
              onClick={() => setSlide(i)}
              aria-label={s.diagnostics.items[slide.diagnosticId]?.title ?? slide.diagnosticId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
