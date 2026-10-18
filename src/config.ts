import { translations } from "./i18n/translations";

export const clinic = {
  name: "KVR Hospital",
  careBrand: "KVR Care",
  preventiveCentre: "KVR Preventive Medical Centre",
  tagline: "Medicine that treats you — not just your numbers.",
  subtagline:
    "Preventive care for diabetes, fatty liver, obesity, blood pressure and metabolic health — with Dr. Naga Satish Kumar Kota in Ramachandrapuram.",
  ctaPrimary: "Book Health Assessment",
  ctaSecondary: "Chat on WhatsApp",
  heroNote: "Walk-ins welcome Mon–Sat · No appointment needed for first visit",
  doctor: {
    name: "Dr. Naga Satish Kumar Kota",
    shortName: "Dr. Naga Satish Kumar",
    title: "About the Doctor",
    qualifications: "MD (General Medicine)",
    specialty: "MD (General Medicine) · Consultant Physician",
    experience: "AFMS",
    experienceLabel: "INHS Asvini training",
    bio: "Dr. Naga Satish Kumar Kota completed postgraduate training in General Medicine at INHS Asvini, Mumbai, under the Indian Armed Forces Medical Services (AFMS).",
    interests: [
      "Accurate diagnosis",
      "Evidence-based treatment",
      "Personalized patient care",
      "Prevention of complications",
    ],
  },
  location: {
    city: "Ramachandrapuram",
    state: "Andhra Pradesh",
    full: "KVR Hospital, Main Road, Beside LIC Office, Ramachandrapuram, East Godavari 533255",
  },
  phone: "+91 94911 35557",
  phoneRaw: "919491135557",
  whatsapp: {
    display: "+91 94911 35557",
    raw: "919491135557",
    metaPhoneNumberId: "", // from Meta Business → WhatsApp → API Setup
    webhookPath: "/webhook",
  },
  hours: "Mon – Sat: 9 AM – 8 PM",
  hoursNote: "Walk-ins welcome",
  links: {
    justdial: "https://jsdl.in/RSL-NGC1787063093",
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=KVR+Hospital+Main+Road+Ramachandrapuram+East+Godavari+533255",
    googleDirections:
      "https://www.google.com/maps/dir/?api=1&destination=KVR+Hospital+Main+Road+Ramachandrapuram+East+Godavari+533255",
    googleReviews:
      "https://www.google.com/maps/search/KVR+Hospital+Main+Road+Ramachandrapuram/#reviews",
  },
  reviews: {
    justdial: { rating: 4.5, count: 32 },
    google: { rating: 4.3, count: 35 },
  },
  logo: "/images/logo.png",
  images: {
    logo: "/images/logo.png",
    doctorScrubs: "/images/doctor-scrubs-hd.jpg",
    /** About the Doctor section — HD waist-up portrait */
    doctorAbout: "/images/doctor-scrubs-hd.jpg",
    doctorFormal: "/images/doctor-scrubs-hd.jpg",
    doctorFormalFull: "/images/doctor-formal-full.png",
    doctorFormalDisplay: "/images/doctor-formal-display.png",
    doctorFormalHires: "/images/doctor-formal-hires.png",
    doctorClinic: "/images/doctor-clinic.png",
    consultation1: "/images/consultation-1.jpeg",
    consultation2: "/images/consultation-2.jpeg",
    hospitalHero: "/images/hospital-night-hero.png",
    hospitalBuild: "/images/hospital-lego.png",
    doctorMessageBg: "/images/doctor-message-bg.jpg",
    videoSectionBg: "/images/video-section-bg.jpg",
    dietGuide: "/images/diabetes-nutrition-guide.jpeg",
    brochure: "/images/kvr-brochure.jpeg",
  },
  video: "/videos/doctor-message.mp4",
  consultationSlides: [
    {
      image: "/images/consultation-1.jpeg",
      caption: "Personalised consultation with your physician.",
      title: "Doctor-led care",
    },
    {
      image: "/images/consultation-2.jpeg",
      caption: "Your health explained — not just reported.",
      title: "Understand your risk",
    },
  ],
  highlights: [
    { label: "Prevent", sub: "Detect early" },
    { label: "10+ Yrs", sub: "Experience" },
    { label: "BCA", sub: "60-sec scan" },
    { label: "4.5★", sub: "Rated" },
  ],
  ticker: [
    {
      badge: "NEW",
      badgeStyle: "accent",
      text: "Body Composition Analysis",
      highlight: "fat, muscle & metabolic age in 60 seconds",
      href: "#diagnostics",
      cta: "Book now",
    },
    {
      badge: "Assess",
      badgeStyle: "gold",
      text: "Health Assessments",
      highlight: "metabolic, heart & full preventive packages",
      href: "#assessments",
      cta: "View",
    },
    {
      badge: "Fever",
      badgeStyle: "warm",
      text: "Typhoid & dengue care",
      highlight: "evidence-based — not routine injections",
      href: "#fever",
      cta: "Know more",
    },
  ],
  packages: [
    {
      id: "essential",
      title: "Essential Assessment",
      tag: "Baseline",
      for: "Healthy adults 25+ establishing baseline health.",
    },
    {
      id: "metabolic",
      title: "Metabolic Assessment",
      tag: "Most popular",
      for: "Diabetes risk, obesity, fatty liver or family history.",
    },
    {
      id: "cardio",
      title: "Heart Risk Assessment",
      tag: "Cardiac",
      for: "BP, cholesterol, diabetes or heart disease concern.",
    },
    {
      id: "comprehensive",
      title: "Full Preventive Assessment",
      tag: "Complete",
      for: "Metabolic, heart, liver, kidney & lifestyle review.",
    },
  ],
  visitSteps: [
    { step: 1, title: "History", text: "Your story, medicines & family history." },
    { step: 2, title: "Measurements", text: "BP, BMI, waist & body composition." },
    { step: 3, title: "Tests", text: "Selected for your age and risk." },
    { step: 4, title: "Assessment", text: "Doctor interprets results with you." },
    { step: 5, title: "Plan", text: "Diet, exercise & follow-up." },
  ],
  feverMessages: [
    {
      title: "Typhoid care",
      text: "Not every typhoid patient needs an injection course.",
    },
    {
      title: "Dengue care",
      text: "Not every dengue patient needs platelet transfusion.",
    },
  ],
  whyUs: [
    { title: "Doctor-led", text: "Not just lab reports — full clinical interpretation." },
    { title: "Risk-based tests", text: "Right assessment for your age and history." },
    { title: "Body composition", text: "Fat, muscle & visceral fat in 60 seconds." },
    { title: "Follow-up care", text: "Prevention is ongoing — not a one-day check." },
  ],
  conditions: [
    "Diabetes & Prediabetes",
    "Fatty Liver",
    "Obesity & Metabolic Health",
    "Hypertension",
    "Thyroid Disorders",
    "Fever & Infections",
    "Heart Disease Risk",
    "General Physician",
  ],
  diagnostics: [
    {
      id: "fundus",
      title: "Remidio AI-Assisted Fundus Camera",
      short: "Retinal screening",
      image: "/images/diagnostics/fundus-equipment.png",
      imageAlt: "Remidio AI-assisted fundus camera at KVR Hospital",
      description:
        "Retinal screening to help detect diabetic eye changes and other retinal abnormalities at an early stage.",
      metrics: ["Retinal Health", "Diabetic Eye", "Early Detection"],
    },
    {
      id: "bca",
      title: "Body Composition Analyser",
      short: "Body composition",
      image: "/images/diagnostics/kvr-promo-bca.png",
      imageAlt: "InBody 570 body composition analysis at KVR Hospital",
      description:
        "Assessment of body fat, muscle mass and other body composition parameters to support weight management and metabolic health.",
      metrics: ["Body Fat %", "Muscle Mass", "Metabolic Health", "Weight Management"],
    },
    {
      id: "echo",
      title: "2D Echocardiography (2D Echo)",
      short: "Heart ultrasound",
      image: "/images/diagnostics/kvr-promo-echo.png",
      imageAlt: "2D echocardiography at KVR Hospital",
      description: "Ultrasound imaging to assess heart structure, pumping function and valves.",
      metrics: ["Heart Structure", "Pumping Function", "Valves"],
    },
  ],
  /** Full-bleed carousel posters (auto-slide); maps each slide to copy via `diagnosticId`. */
  diagnosticPromoSlides: [
    {
      diagnosticId: "bca" as const,
      image: "/images/diagnostics/kvr-promo-bca.png",
      imageAlt: "InBody 570 body composition analysis at KVR Hospital",
      width: 834,
      height: 1005,
    },
    {
      diagnosticId: "echo" as const,
      image: "/images/diagnostics/kvr-promo-echo.png",
      imageAlt: "2D echocardiography at KVR Hospital",
      width: 832,
      height: 993,
    },
    {
      diagnosticId: "fundus" as const,
      image: "/images/diagnostics/kvr-promo-fundus.png",
      imageAlt: "Remidio AI-assisted fundus camera at KVR Hospital",
      width: 832,
      height: 1003,
    },
  ],
};

/** Section photo bands — `public/images/backgrounds/` */
export const sectionBackgrounds = {
  assessments: {
    src: "/images/backgrounds/assessments-facilities-bg.png",
    position: "62% 42%",
  },
  facilities: {
    src: "/images/backgrounds/our-facilities-bg.png",
    position: "center 32%",
  },
  fever: {
    src: "/images/backgrounds/fever-lobby-bg.png",
    position: "center center",
  },
  conditions: {
    src: "/images/backgrounds/doctor-stethoscope-hero.png",
    position: "center 40%",
  },
  doctor: {
    src: "/images/backgrounds/doctor-about-bg.png",
    position: "18% center",
  },
  book: {
    src: "/images/backgrounds/doctor-about-bg.png",
    position: "72% center",
  },
  location: {
    src: "/images/backgrounds/clinic-hallway.png",
    position: "center center",
  },
  contact: {
    src: "/images/backgrounds/medical-blue.jpg",
    position: "center center",
  },
  quickActions: {
    src: "/images/backgrounds/fever-heart-hero.png",
    position: "center 35%",
  },
} as const;

export type SectionBackgroundKey = keyof typeof sectionBackgrounds;

export function waLink(text: string) {
  return `https://wa.me/${clinic.whatsapp.raw}?text=${encodeURIComponent(text)}`;
}

export function whatsappUrlFor(lang: "en" | "te" = "en") {
  return waLink(translations[lang].wa.chatMsg);
}

export const whatsappUrl = whatsappUrlFor("en");

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent("KVR Hospital Main Road Ramachandrapuram East Godavari 533255")}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
