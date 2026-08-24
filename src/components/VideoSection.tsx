import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { clinic } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { translations } from "../i18n/translations";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mutedRef = useRef(true);
  const [muted, setMuted] = useState(true);
  const { lang } = useLanguage();
  const t = translations[lang].video;

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        if (inView) {
          video.muted = mutedRef.current;
          void video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: [0, 0.45, 0.55] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
      mutedRef.current = muted;
    }
  }, [muted]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
    video.muted = next;
    if (!next) void video.play().catch(() => {});
  }

  return (
    <section ref={sectionRef} className="video-section-cinematic" id="video">
      <div
        className="video-section-bg"
        style={{ backgroundImage: `url(${clinic.images.doctorMessageBg})` }}
        aria-hidden="true"
      />
      <div className="video-section-overlay" aria-hidden="true" />

      <div className="container">
        <div className="video-section-grid">
          <div className="video-section-copy video-section-copy-light">
            <div className="section-label">From Our Physician</div>
            <h2>A message from your doctor</h2>
            <p>
              Watch Dr. Naga Satish Kumar explain why early detection matters for{" "}
              <strong>diabetes</strong>, <strong>fever care</strong>, fatty liver and lifestyle
              diseases — and how preventive medicine helps you act before complications develop.
            </p>
            <p className="video-section-note">
              Scroll to play — tap unmute to hear. Book a Preventive Health Assessment if you are
              above 35 or have family history of metabolic disease.
            </p>
          </div>

          <div className="video-phone-wrap">
            <div className="video-phone-frame">
              <video
                ref={videoRef}
                className="clinic-video"
                playsInline
                muted
                loop
                preload="metadata"
                poster={clinic.images.doctorFormal}
              >
                <source src={clinic.video} type="video/mp4" />
                Your browser does not support video playback.
              </video>
              <button
                type="button"
                className="video-mute-btn"
                onClick={toggleMute}
                aria-label={muted ? t.unmute : t.mute}
                aria-pressed={!muted}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span>{muted ? t.unmute : t.mute}</span>
              </button>
              <div className="video-badge">
                <span>{t.badge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
