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
    qualifications: "MBBS, MD (Internal Medicine)",
    specialty: "Consultant Physician · Internal Medicine",
    experience: "10+ Years",
    experienceLabel: "Clinical Practice",
    bio: "Dr. Naga Satish Kumar Kota is a consultant physician with MBBS and MD in Internal Medicine. At KVR Hospital, he focuses on diabetes, fatty liver, obesity, hypertension and preventive health — interpreting your reports with you, not just handing over prescriptions.",
    interests: [
      "Diabetes & metabolic health",
      "Fatty liver & obesity",
      "Preventive assessment",
      "Fever & infection care",
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
    doctorScrubs: "/images/doctor-scrubs.png",
    doctorFormal: "/images/doctor-formal.png",
    doctorClinic: "/images/doctor-clinic.png",
    consultation1: "/images/consultation-1.jpeg",
    consultation2: "/images/consultation-2.jpeg",
    hospitalHero: "/images/hospital-hero-v2.jpg",
    hospitalBuild: "/images/hospital-lego.png",
    doctorMessageBg: "/images/doctor-message-bg.jpg",
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
      id: "bca",
      title: "Body Composition Analyser",
      short: "60-second scan",
      description: "Body fat, visceral fat, muscle mass & metabolic age — painless, no needles.",
      metrics: ["Body Fat %", "Visceral Fat", "Muscle Mass", "Metabolic Age"],
    },
    {
      id: "fundus",
      title: "Remidio Fundus Camera",
      short: "Eye screening",
      description: "Diabetic retinopathy screening — quick and non-invasive.",
      metrics: ["Retinal Health", "Diabetic Eye", "Early Detection"],
    },
    {
      id: "echo",
      title: "2D Echo",
      short: "Heart scan",
      description: "Heart function assessment for BP, diabetes & chest symptoms.",
      metrics: ["Heart Function", "Valves", "Chambers"],
    },
  ],
};

export function waLink(text: string) {
  return `https://wa.me/${clinic.whatsapp.raw}?text=${encodeURIComponent(text)}`;
}

export function whatsappUrlFor(lang: "en" | "te" = "en") {
  return waLink(translations[lang].wa.chatMsg);
}

export const whatsappUrl = whatsappUrlFor("en");

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent("KVR Hospital Main Road Ramachandrapuram East Godavari 533255")}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
