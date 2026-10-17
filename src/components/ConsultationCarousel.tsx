import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinic } from "../config";
import { useSite } from "../i18n/useSite";

export default function ConsultationCarousel() {
  const s = useSite();
  const slides = clinic.consultationSlides.map((slide, i) => ({
    ...slide,
    title: s.slides[i]?.title ?? slide.title,
    caption: s.slides[i]?.caption ?? slide.caption,
  }));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function go(dir: -1 | 1) {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }

  return (
    <div className="consultation-carousel">
      <div className="consultation-carousel-track">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="consultation-slide"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
          >
            <img src={slides[index].image} alt={slides[index].title} loading="lazy" />
            <div className="consultation-slide-overlay" />
            <div className="consultation-slide-content">
              <span className="consultation-slide-tag">{slides[index].title}</span>
              <p>{slides[index].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="carousel-btn carousel-prev" onClick={() => go(-1)} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button className="carousel-btn carousel-next" onClick={() => go(1)} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      <div className="carousel-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
}
