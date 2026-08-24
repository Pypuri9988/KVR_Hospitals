import type { Lang } from "../i18n/translations";
import { translations } from "../i18n/translations";

type LanguageSwitcherProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  showLabel?: boolean;
  variant?: "dark" | "light";
  layout?: "stack" | "bar";
};

export default function LanguageSwitcher({
  lang,
  onChange,
  showLabel = true,
  variant = "dark",
  layout = "stack",
}: LanguageSwitcherProps) {
  const labels = translations[lang].lang;

  return (
    <div
      className={`lang-switch-wrap ${variant === "light" ? "lang-switch-wrap-light" : ""} ${layout === "bar" ? "lang-switch-wrap-bar" : ""}`}
      role="group"
      aria-label={labels.label}
    >
      {showLabel && <span className="lang-switch-label">{labels.label}</span>}
      <div className="lang-switch">
        <button
          type="button"
          className={`lang-switch-btn ${lang === "en" ? "active" : ""}`}
          onClick={() => onChange("en")}
          aria-pressed={lang === "en"}
        >
          {labels.english}
        </button>
        <button
          type="button"
          className={`lang-switch-btn ${lang === "te" ? "active" : ""}`}
          onClick={() => onChange("te")}
          aria-pressed={lang === "te"}
        >
          {labels.telugu}
        </button>
      </div>
    </div>
  );
}
