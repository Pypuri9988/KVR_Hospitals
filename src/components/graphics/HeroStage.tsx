import { motion } from "framer-motion";

export default function HeroStage() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-stage-glow" />
      <motion.svg
        viewBox="0 0 520 560"
        className="hero-stage-svg"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1EE3C1" />
            <stop offset="55%" stopColor="#4DB7FF" />
            <stop offset="100%" stopColor="#F2B86A" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="core" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#1EE3C1" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#07131F" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="270" r="210" fill="url(#core)" />
        <motion.circle
          cx="260"
          cy="270"
          r="188"
          fill="none"
          stroke="url(#ring)"
          strokeWidth="1.5"
          strokeDasharray="8 14"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 270px" }}
        />
        <motion.circle
          cx="260"
          cy="270"
          r="150"
          fill="none"
          stroke="rgba(30,227,193,0.35)"
          strokeWidth="1"
          strokeDasharray="2 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 270px" }}
        />

        {/* Body silhouette panel */}
        <rect x="150" y="110" width="220" height="320" rx="36" fill="url(#glass)" stroke="rgba(255,255,255,0.22)" />
        <path
          d="M260 150c-28 0-48 22-48 52 0 18 8 32 20 42v18c-30 10-50 36-50 70v58h156v-58c0-34-20-60-50-70v-18c12-10 20-24 20-42 0-30-20-52-48-52z"
          fill="rgba(255,255,255,0.08)"
          stroke="url(#ring)"
          strokeWidth="1.5"
        />

        {/* Scan line */}
        <motion.rect
          x="168"
          width="184"
          height="3"
          rx="2"
          fill="#1EE3C1"
          filter="url(#soft)"
          animate={{ y: [150, 390, 150] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Metric pods */}
        <g filter="url(#soft)">
          <rect x="48" y="170" width="110" height="64" rx="18" fill="rgba(7,19,31,0.72)" stroke="rgba(30,227,193,0.35)" />
          <text x="68" y="198" fill="#9FEFDF" fontSize="11" fontFamily="Figtree,sans-serif">Muscle</text>
          <text x="68" y="220" fill="#fff" fontSize="18" fontFamily="Syne,sans-serif" fontWeight="700">42.6%</text>

          <rect x="362" y="210" width="110" height="64" rx="18" fill="rgba(7,19,31,0.72)" stroke="rgba(77,183,255,0.4)" />
          <text x="382" y="238" fill="#A8D8FF" fontSize="11" fontFamily="Figtree,sans-serif">Met. Age</text>
          <text x="382" y="260" fill="#fff" fontSize="18" fontFamily="Syne,sans-serif" fontWeight="700">34 yrs</text>

          <rect x="70" y="390" width="120" height="64" rx="18" fill="rgba(7,19,31,0.72)" stroke="rgba(242,184,106,0.45)" />
          <text x="90" y="418" fill="#F7D7A8" fontSize="11" fontFamily="Figtree,sans-serif">Visceral</text>
          <text x="90" y="440" fill="#fff" fontSize="18" fontFamily="Syne,sans-serif" fontWeight="700">Level 6</text>
        </g>

        {/* ECG ribbon */}
        <motion.path
          d="M40 300 H120 L138 260 L158 340 L178 280 L198 310 H480"
          fill="none"
          stroke="#1EE3C1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbit dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.circle
            key={deg}
            r="5"
            fill={i % 2 ? "#F2B86A" : "#4DB7FF"}
            animate={{
              cx: [260 + Math.cos((deg * Math.PI) / 180) * 188, 260 + Math.cos(((deg + 360) * Math.PI) / 180) * 188],
              cy: [270 + Math.sin((deg * Math.PI) / 180) * 188, 270 + Math.sin(((deg + 360) * Math.PI) / 180) * 188],
            }}
            transition={{ duration: 22 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
