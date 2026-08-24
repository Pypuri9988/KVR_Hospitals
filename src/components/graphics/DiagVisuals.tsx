import { motion } from "framer-motion";

const vizProps = { className: "diag-viz-svg", "aria-hidden": true as const };

export function BodyScanViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <defs>
        <linearGradient id="bcaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1565b8" />
          <stop offset="1" stopColor="#0d7a6e" />
        </linearGradient>
        <linearGradient id="scanBeam" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="transparent" />
          <stop offset="0.5" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="8" y="8" width="304" height="184" rx="20" fill="#f0f7ff" stroke="#c8dff5" strokeWidth="1.5" />

      {/* Body silhouette */}
      <ellipse cx="160" cy="52" rx="22" ry="26" fill="none" stroke="url(#bcaGrad)" strokeWidth="2.5" />
      <path
        d="M160 78v28M138 92h44M148 106v38c0 8 24 8 24 0v-38"
        fill="none"
        stroke="url(#bcaGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Scan beam */}
      <motion.rect
        x="40"
        width="240"
        height="6"
        rx="3"
        fill="url(#scanBeam)"
        filter="url(#glow)"
        animate={{ y: [36, 148, 36] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Metric bars */}
      {[
        { x: 52, label: "Fat", h: [32, 52, 38], color: "#1565b8" },
        { x: 88, label: "Muscle", h: [48, 68, 55], color: "#0d7a6e" },
        { x: 124, label: "Water", h: [40, 58, 46], color: "#0284c7" },
        { x: 196, label: "Visceral", h: [28, 44, 34], color: "#ea580c" },
        { x: 232, label: "Age", h: [36, 50, 42], color: "#7c3aed" },
        { x: 268, label: "BMI", h: [44, 62, 50], color: "#1565b8" },
      ].map((bar, i) => (
        <g key={bar.label}>
          <motion.rect
            x={bar.x}
            width="22"
            rx="5"
            fill={bar.color}
            opacity="0.85"
            animate={{
              height: bar.h,
              y: bar.h.map((h) => 168 - h),
            }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
          <text x={bar.x + 11} y="188" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="700">
            {bar.label}
          </text>
        </g>
      ))}

      {/* Pulse rings */}
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          cx="160"
          cy="90"
          r="48"
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          animate={{ r: [48, 72], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 1 }}
        />
      ))}

      {/* 60 sec badge */}
      <motion.g
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <rect x="248" y="18" width="58" height="22" rx="11" fill="#0d7a6e" />
        <text x="277" y="33" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="800">
          60 SEC
        </text>
      </motion.g>
    </svg>
  );
}

export function FundusViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <defs>
        <radialGradient id="iris" cx="45%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="75%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#431407" />
        </radialGradient>
        <linearGradient id="camFlash" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="304" height="184" rx="20" fill="#fff8f0" stroke="#fcd9b8" strokeWidth="1.5" />

      {/* Camera body */}
      <rect x="228" y="62" width="56" height="44" rx="10" fill="#1e293b" />
      <circle cx="256" cy="84" r="14" fill="#334155" stroke="#64748b" strokeWidth="2" />
      <circle cx="256" cy="84" r="8" fill="#0ea5e9" opacity="0.6" />

      {/* Eye */}
      <ellipse cx="148" cy="98" rx="72" ry="68" fill="url(#iris)" stroke="#c45d2d" strokeWidth="2" />
      <circle cx="132" cy="88" r="22" fill="#1c0a05" />
      <circle cx="126" cy="82" r="7" fill="#fff" opacity="0.85" />

      {/* Retinal vessels rotating */}
      <motion.g
        style={{ transformOrigin: "148px 98px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path d="M148 38 C195 52 215 98 198 138" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
        <path d="M148 38 C105 55 88 102 108 142" fill="none" stroke="#fdba74" strokeWidth="1.5" opacity="0.6" />
        <path d="M148 50 C170 70 178 98 168 120" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
      </motion.g>

      {/* Scan ring */}
      <motion.circle
        cx="148"
        cy="98"
        r="78"
        fill="none"
        stroke="#1565b8"
        strokeWidth="2"
        strokeDasharray="8 12"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "148px 98px" }}
      />

      {/* Camera flash */}
      <motion.rect
        x="90"
        y="30"
        width="116"
        height="136"
        rx="58"
        fill="url(#camFlash)"
        animate={{ opacity: [0, 0.55, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Focus brackets */}
      {[
        { x: 78, y: 52, rot: 0 },
        { x: 218, y: 52, rot: 90 },
        { x: 218, y: 144, rot: 180 },
        { x: 78, y: 144, rot: 270 },
      ].map((b, i) => (
        <motion.path
          key={i}
          d="M0 0 H14 M0 0 V14"
          stroke="#1565b8"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <text x="256" y="122" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="700">
        REMIDIO
      </text>
    </svg>
  );
}

export function EchoViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <defs>
        <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ef4444" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#0d7a6e" />
          <stop offset="1" stopColor="#1565b8" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="304" height="184" rx="20" fill="#f0fdf9" stroke="#b8e8df" strokeWidth="1.5" />

      {/* Heart beat */}
      <motion.path
        d="M160 58 C132 34 96 48 96 82c0 36 64 62 64 62s64-26 64-62c0-34-36-48-64-24z"
        fill="url(#heartGrad)"
        animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "160px 100px" }}
      />

      {/* Ultrasound waves */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d="M160 100 C130 100 110 120 110 145"
          fill="none"
          stroke="#0d7a6e"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [0.6, 0], pathLength: [0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 }}
          transform={`translate(${i * 28 - 28} 0)`}
        />
      ))}

      {/* ECG line */}
      <motion.path
        d="M24 148 H68 L82 118 L96 168 L112 128 L128 148 H296"
        fill="none"
        stroke="url(#ecgGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.8 }}
        animate={{ pathLength: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />

      {/* BPM counter */}
      <motion.text
        x="268"
        y="42"
        textAnchor="end"
        fontSize="14"
        fill="#0d7a6e"
        fontWeight="800"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      >
        ♥ 72 BPM
      </motion.text>

      {/* Probe icon */}
      <motion.g
        animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="240" y="118" width="36" height="24" rx="6" fill="#334155" />
        <path d="M258 142 L258 158 L252 164 L264 164 L258 158" fill="#64748b" />
      </motion.g>

      <text x="160" y="188" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="700">
        2D ECHO · LIVE
      </text>
    </svg>
  );
}

export const diagVisuals = {
  bca: BodyScanViz,
  fundus: FundusViz,
  echo: EchoViz,
} as const;
