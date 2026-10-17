import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { clinic } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import { useSite } from "../i18n/useSite";
import { translations } from "../i18n/translations";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mutedRef = useRef(true);
  const [muted, setMuted] = useState(true);
  const { lang } = useLanguage();
  const s = useSite();
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
        style={{ backgroundImage: `url(${clinic.images.videoSectionBg})` }}
        aria-hidden="true"
      />
      <div className="video-section-overlay" aria-hidden="true" />

      <div className="container">
        <div className="video-section-grid">
          <div className="video-section-copy video-section-copy-light">
            <div className="section-label">{s.video.label}</div>
            <h2>{s.video.title}</h2>
            <p>{s.video.text}</p>
            <p className="video-section-note">{s.video.note}</p>
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
