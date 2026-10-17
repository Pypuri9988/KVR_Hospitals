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
        height="8"
        rx="4"
        fill="url(#scanBeam)"
        filter="url(#glow)"
        animate={{ y: [32, 152, 32] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
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
        strokeWidth="2.5"
        strokeDasharray="10 8"
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "148px 98px" }}
      />

      <motion.circle
        cx="148"
        cy="98"
        r="62"
        fill="none"
        stroke="#ea580c"
        strokeWidth="1.5"
        strokeDasharray="4 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
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

/* ─── BCA slide 2: metabolic age dial ─── */
export function BcaMetabolicViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <rect x="8" y="8" width="304" height="184" rx="20" fill="#eef6ff" stroke="#c8dff5" strokeWidth="1.5" />
      <text x="160" y="36" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="800">
        METABOLIC AGE
      </text>
      <circle cx="160" cy="108" r="58" fill="none" stroke="#dbeafe" strokeWidth="10" />
      <motion.circle
        cx="160"
        cy="108"
        r="58"
        fill="none"
        stroke="#1565b8"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="220 365"
        transform="rotate(-90 160 108)"
        animate={{ strokeDashoffset: [0, -365] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.text
        x="160"
        y="112"
        textAnchor="middle"
        fontSize="28"
        fill="#1565b8"
        fontWeight="900"
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        42
      </motion.text>
      <text x="160" y="132" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="700">
        vs chronological 48
      </text>
      {[
        { label: "Fat", widths: [20, 44, 30], color: "#1565b8" },
        { label: "Muscle", widths: [28, 48, 36], color: "#0d7a6e" },
        { label: "Water", widths: [22, 40, 32], color: "#0284c7" },
      ].map((bar, i) => (
        <g key={bar.label}>
          <rect x={68 + i * 72} y="158" width="52" height="8" rx="4" fill="#dbeafe" />
          <motion.rect
            x={68 + i * 72}
            y="158"
            height="8"
            rx="4"
            fill={bar.color}
            animate={{ width: bar.widths }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
          <text x={94 + i * 72} y="182" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="700">
            {bar.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─── BCA slide 3: visceral fat focus ─── */
export function BcaVisceralViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <rect x="8" y="8" width="304" height="184" rx="20" fill="#f0f7ff" stroke="#c8dff5" strokeWidth="1.5" />
      <ellipse cx="160" cy="70" rx="28" ry="32" fill="none" stroke="#1565b8" strokeWidth="2" />
      <path d="M160 102v36M136 118h48M144 138v28c0 10 32 10 32 0v-28" fill="none" stroke="#1565b8" strokeWidth="2" strokeLinecap="round" />
      <motion.ellipse
        cx="160"
        cy="125"
        rx="34"
        ry="22"
        fill="#ea580c"
        opacity="0.35"
        animate={{ rx: [30, 38, 30], ry: [18, 26, 18], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="160" y="128" textAnchor="middle" fontSize="9" fill="#9a3412" fontWeight="800">
        VISCERAL
      </text>
      <rect x="220" y="40" width="72" height="100" rx="10" fill="#fff" stroke="#c8dff5" strokeWidth="1.5" />
      {[
        { y: 58, label: "Visceral", val: "Level 8", color: "#ea580c" },
        { y: 82, label: "Subcut.", val: "Normal", color: "#0d7a6e" },
        { y: 106, label: "Muscle", val: "Good", color: "#1565b8" },
      ].map((row, i) => (
        <g key={row.label}>
          <motion.rect
            x="232"
            y={row.y}
            width="48"
            height="8"
            rx="4"
            fill={row.color}
            animate={{ width: [24, 48, 32] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
          />
          <text x="236" y={row.y + 20} fontSize="7" fill="#64748b" fontWeight="700">
            {row.label}: {row.val}
          </text>
        </g>
      ))}
      <motion.rect
        x="40"
        width="240"
        height="5"
        rx="2.5"
        fill="#34d399"
        opacity="0.7"
        animate={{ y: [48, 155, 48] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ─── Fundus slide 2: vessel map ─── */
export function FundusVesselViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <rect x="8" y="8" width="304" height="184" rx="20" fill="#fff8f0" stroke="#fcd9b8" strokeWidth="1.5" />
      <circle cx="160" cy="100" r="72" fill="#431407" opacity="0.15" />
      <circle cx="160" cy="100" r="58" fill="#7c2d12" opacity="0.35" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <motion.line
          key={deg}
          x1="160"
          y1="100"
          x2={160 + 56 * Math.cos((deg * Math.PI) / 180)}
          y2={100 + 56 * Math.sin((deg * Math.PI) / 180)}
          stroke={i % 2 ? "#fdba74" : "#fde68a"}
          strokeWidth="1.5"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      <motion.circle
        cx="160"
        cy="100"
        r="72"
        fill="none"
        stroke="#1565b8"
        strokeWidth="2"
        strokeDasharray="6 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 100px" }}
      />
      <text x="160" y="36" textAnchor="middle" fontSize="10" fill="#9a3412" fontWeight="800">
        RETINAL VESSEL MAP
      </text>
      <motion.text
        x="160"
        y="188"
        textAnchor="middle"
        fontSize="9"
        fill="#0d7a6e"
        fontWeight="800"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        SCANNING · LIVE
      </motion.text>
    </svg>
  );
}

/* ─── Fundus slide 3: diabetic screening ─── */
export function FundusScreenViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <rect x="8" y="8" width="304" height="184" rx="20" fill="#fff8f0" stroke="#fcd9b8" strokeWidth="1.5" />
      <rect x="40" y="36" width="110" height="80" rx="8" fill="#1e293b" />
      <rect x="48" y="44" width="94" height="64" rx="4" fill="#0f172a" />
      <motion.rect
        x="48"
        y="44"
        width="94"
        height="64"
        rx="4"
        fill="#ea580c"
        opacity="0.15"
        animate={{ opacity: [0.05, 0.25, 0.05] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <ellipse cx="95" cy="76" rx="28" ry="26" fill="#7c2d12" opacity="0.8" />
      <text x="170" y="52" fontSize="9" fill="#64748b" fontWeight="800">
        DIABETIC EYE SCREEN
      </text>
      {[
        { y: 68, label: "Microaneurysms", ok: false },
        { y: 88, label: "Hemorrhages", ok: false },
        { y: 108, label: "Macula", ok: true },
      ].map((row, i) => (
        <g key={row.label}>
          <circle cx="162" cy={row.y - 3} r="5" fill={row.ok ? "#0d7a6e" : "#ea580c"} />
          <text x="174" y={row.y} fontSize="8" fill="#334155" fontWeight="600">
            {row.label}
          </text>
          <motion.rect
            x="248"
            y={row.y - 8}
            width="40"
            height="6"
            rx="3"
            fill={row.ok ? "#0d7a6e" : "#ea580c"}
            animate={{ width: row.ok ? [20, 40] : [30, 40, 25] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
          />
        </g>
      ))}
      <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <rect x="40" y="130" width="240" height="28" rx="8" fill="#0d7a6e" opacity="0.12" />
        <text x="160" y="148" textAnchor="middle" fontSize="9" fill="#0d5c52" fontWeight="800">
          Early detection · Non-invasive
        </text>
      </motion.g>
    </svg>
  );
}

/* ─── Echo slide 2: ultrasound fan ─── */
export function EchoUltrasoundViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <rect x="8" y="8" width="304" height="184" rx="20" fill="#f0fdf9" stroke="#b8e8df" strokeWidth="1.5" />
      <rect x="36" y="40" width="160" height="120" rx="10" fill="#0f172a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M56 148 Q${100 + i * 12} ${60 - i * 4} 180 148`}
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      <motion.ellipse
        cx="116"
        cy="100"
        rx="36"
        ry="28"
        fill="#ef4444"
        opacity="0.55"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
        style={{ transformOrigin: "116px 100px" }}
      />
      <rect x="210" y="48" width="74" height="104" rx="10" fill="#fff" stroke="#b8e8df" strokeWidth="1.5" />
      <text x="247" y="68" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="800">
        ULTRASOUND
      </text>
      <motion.path
        d="M222 148 H272 L260 118 L248 148 L236 128 L222 148"
        fill="none"
        stroke="#0d7a6e"
        strokeWidth="2"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.text
        x="247"
        y="100"
        textAnchor="middle"
        fontSize="18"
        fill="#0d7a6e"
        fontWeight="900"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      >
        LIVE
      </motion.text>
    </svg>
  );
}

/* ─── Echo slide 3: chamber view ─── */
export function EchoChamberViz() {
  return (
    <svg viewBox="0 0 320 200" {...vizProps}>
      <rect x="8" y="8" width="304" height="184" rx="20" fill="#f0fdf9" stroke="#b8e8df" strokeWidth="1.5" />
      <text x="160" y="36" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="800">
        HEART CHAMBERS
      </text>
      <motion.path
        d="M160 52 C120 52 88 78 88 110c0 28 72 48 72 48s72-20 72-48c0-32-32-58-72-58z"
        fill="#ef4444"
        opacity="0.85"
        animate={{ scale: [1, 1.1, 1, 1.06, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
        style={{ transformOrigin: "160px 110px" }}
      />
      <path d="M160 60 L160 158 M120 90 L200 90 M128 130 L192 130" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      {[
        { x: 128, y: 78, label: "LA" },
        { x: 178, y: 78, label: "RA" },
        { x: 128, y: 118, label: "LV" },
        { x: 178, y: 118, label: "RV" },
      ].map((ch) => (
        <text key={ch.label} x={ch.x} y={ch.y} fontSize="9" fill="#fff" fontWeight="800" opacity="0.9">
          {ch.label}
        </text>
      ))}
      <motion.path
        d="M24 168 H296"
        fill="none"
        stroke="#0d7a6e"
        strokeWidth="2.5"
        strokeDasharray="4 6"
        animate={{ strokeDashoffset: [0, -40] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <text x="268" y="48" fontSize="12" fill="#0d7a6e" fontWeight="800">
        EF 62%
      </text>
      <motion.text
        x="160"
        y="188"
        textAnchor="middle"
        fontSize="9"
        fill="#64748b"
        fontWeight="700"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Valves · Chambers · Function
      </motion.text>
    </svg>
  );
}

export const diagVisualSets = {
  bca: [BodyScanViz, BcaMetabolicViz, BcaVisceralViz],
  fundus: [FundusViz, FundusVesselViz, FundusScreenViz],
  echo: [EchoViz, EchoUltrasoundViz, EchoChamberViz],
} as const;

/** @deprecated use diagVisualSets */
export const diagVisuals = {
  bca: BodyScanViz,
  fundus: FundusViz,
  echo: EchoViz,
} as const;
