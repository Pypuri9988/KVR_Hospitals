import { bookingConcernOptions } from "./bookingConcerns";
import type { Lang } from "./translations";

export type SitePackage = {
  id: string;
  title: string;
  tag: string;
  for: string;
};

export type SiteContent = {
  nav: {
    doctor: string;
    services: string;
    diagnostics: string;
    book: string;
    contact: string;
    call: string;
    bookAppointment: string;
    walkIns: string;
    hoursLine: string;
  };
  ticker: { badge: string; text: string; highlight: string; cta: string };
  hero: {
    rating: string;
    centre: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    point1: string;
    point2: string;
    point3: string;
    book: string;
    whatsapp: string;
    location: string;
    physicianLabel: string;
    experience: string;
    specialty: string;
  };
  quick: {
    call: string;
    callSub: string;
    wa: string;
    waSub: string;
    book: string;
    bookSub: string;
    map: string;
    mapSub: string;
  };
  highlights: { label: string; sub: string }[];
  assessments: {
    label: string;
    title: string;
    subtitle: string;
    bookNow: string;
    mostPopular: string;
    pathwayTitle: string;
    pathwayNotSure: string;
    pathwayWhatsApp: string;
    packages: SitePackage[];
    visitSteps: { step: number; title: string; text: string }[];
  };
  preventive: { label: string; title: string; text: string; cta: string };
  slides: { title: string; caption: string }[];
  bca: {
    label: string;
    title: string;
    text: string;
    cta: string;
    stat1: string;
    stat1sub: string;
    stat2: string;
    stat2sub: string;
    stat3: string;
    stat3sub: string;
  };
  nutrition: {
    label: string;
    title: string;
    text: string;
    point1: string;
    point2: string;
    point3: string;
    cta: string;
    caption: string;
  };
  diagnostics: {
    label: string;
    title: string;
    subtitle: string;
    bookTest: string;
    metricsHeading: string;
    unifiedTitle: string;
    unifiedLead: string;
    items: Record<
      string,
      {
        title: string;
        short: string;
        summaryLine: string;
        onSite: string;
        description: string;
        badge: string;
        metrics: string[];
      }
    >;
  };
  fever: { label: string; title: string; items: { title: string; text: string }[] };
  doctor: {
    label: string;
    title: string;
    specialty: string;
    bioIntro: string;
    credentialHighlight: string;
    bio: string;
    interests: string[];
    cred1: string;
    cred2: string;
    cred3: string;
    book: string;
  };
  whyUs: { label: string; title: string; items: { title: string; text: string }[] };
  conditions: { label: string; title: string; list: string[] };
  book: {
    label: string;
    title: string;
    subtitle: string;
    formSuccess: string;
    name: string;
    namePh: string;
    mobile: string;
    mobilePh: string;
    concern: string;
    mode: string;
    modeInPerson: string;
    modeVideo: string;
    concernOptions: string[];
    date: string;
    time: string;
    timeMorning: string;
    timeAfternoon: string;
    timeEvening: string;
    notes: string;
    notesPh: string;
    submit: string;
    bcaOption: string;
    otherOption: string;
    hoursDisplay: string;
    whatsappBtn: string;
  };
  mobile: { call: string; callback: string; whatsapp: string };
  video: { label: string; title: string; text: string; note: string };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  contact: { title: string; navigate: string; whatsapp: string };
  map: {
    label: string;
    title: string;
    navigate: string;
    openMaps: string;
    reviewsTitle: string;
    reviewsIntro: string;
    googleReviews: string;
    googleRatings: string;
    readReviews: string;
    justdial: string;
    verifiedRatings: string;
    viewJd: string;
    phone: string;
    hours: string;
  };
  footer: {
    pages: string;
    contact: string;
    assessments: string;
    diagnostics: string;
    doctor: string;
    book: string;
    googleReviews: string;
    privacy: string;
    terms: string;
    tagline: string;
  };
  hoursNote: string;
};

export const siteContent: Record<Lang, SiteContent> = {
  en: {
    nav: {
      doctor: "Doctor",
      services: "Services",
      diagnostics: "Diagnostics",
      book: "Book",
      contact: "Contact",
      call: "Call",
      bookAppointment: "Book Appointment",
      walkIns: "Walk-ins welcome",
      hoursLine: "Mon – Sat: 9 AM – 8 PM",
    },
    ticker: {
      badge: "NEW",
      text: "Body Composition Analysis —",
      highlight: "fat, muscle & metabolic age in 60 seconds",
      cta: "Book now",
    },
    hero: {
      rating: "JustDial & Google · 35+ reviews",
      centre: "KVR Preventive Medical Centre",
      titleBefore: "Physician-led care for ",
      titleHighlight: "diabetes",
      titleAfter: ", fatty liver & metabolic health",
      lead: "Preventive care for diabetes, fatty liver, obesity, blood pressure and metabolic health — with Dr. Naga Satish Kumar Kota in Ramachandrapuram.",
      point1: "Walk-ins welcome · Mon–Sat 9 AM – 8 PM",
      point2: "Reports explained with you — not rushed prescriptions",
      point3: "BCA, fundus camera & 2D echo on-site",
      book: "Book Appointment",
      whatsapp: "WhatsApp",
      location: "Beside LIC Office, Main Road",
      physicianLabel: "Consultant Physician",
      experience: "10+ Years",
      specialty: "Internal Medicine",
    },
    quick: {
      call: "Call Clinic",
      callSub: "+91 94911 35557",
      wa: "WhatsApp",
      waSub: "Instant reply",
      book: "Book Visit",
      bookSub: "Same-day slots",
      map: "Directions",
      mapSub: "Ramachandrapuram",
    },
    highlights: [
      { label: "Prevent", sub: "Detect early" },
      { label: "10+ Yrs", sub: "Experience" },
      { label: "BCA", sub: "60-sec scan" },
      { label: "4.5★", sub: "Rated" },
    ],
    assessments: {
      label: "Health Assessments",
      title: "Choose the right assessment for you",
      subtitle: "Doctor-led preventive packages — not a confusing list of tests.",
      bookNow: "Book now",
      mostPopular: "Most popular",
      pathwayTitle: "What happens during your visit",
      pathwayNotSure: "Not sure which package?",
      pathwayWhatsApp: "ask on WhatsApp",
      packages: [
        { id: "essential", title: "Essential Assessment", tag: "Baseline", for: "Healthy adults 25+ establishing baseline health." },
        { id: "metabolic", title: "Metabolic Assessment", tag: "Most popular", for: "Diabetes risk, obesity, fatty liver or family history." },
        { id: "cardio", title: "Heart Risk Assessment", tag: "Cardiac", for: "BP, cholesterol, diabetes or heart disease concern." },
        { id: "comprehensive", title: "Full Preventive Assessment", tag: "Complete", for: "Metabolic, heart, liver, kidney & lifestyle review." },
      ],
      visitSteps: [
        { step: 1, title: "History", text: "Your story, medicines & family history." },
        { step: 2, title: "Measurements", text: "BP, BMI, waist & body composition." },
        { step: 3, title: "Tests", text: "Selected for your age and risk." },
        { step: 4, title: "Assessment", text: "Doctor interprets results with you." },
        { step: 5, title: "Plan", text: "Diet, exercise & follow-up." },
      ],
    },
    preventive: {
      label: "Preventive Care",
      title: "Detect early. Prevent complications.",
      text: "Diabetes, fatty liver and heart disease often start silently. We find your risks early — and build a plan with your doctor.",
      cta: "View assessments",
    },
    slides: [
      { title: "Doctor-led care", caption: "Personalised consultation with your physician." },
      { title: "Understand your risk", caption: "Your health explained — not just reported." },
    ],
    bca: {
      label: "New · Body Composition",
      title: "Know what your weight is made of",
      text: "60-second scan — body fat, visceral fat, muscle mass & metabolic age. Painless, no needles.",
      cta: "Book BCA test",
      stat1: "60 sec",
      stat1sub: "Full scan",
      stat2: "BCA",
      stat2sub: "On-site",
      stat3: "4+",
      stat3sub: "Key metrics",
    },
    nutrition: {
      label: "Nutrition · Diabetes Care",
      title: "Balanced plate & follow-up tracking",
      text: "Metabolic health is not only about medicines — diet and regular monitoring matter. Our team guides you with practical meal balance and structured diabetes follow-up.",
      point1: "Telugu diet plate guide for everyday meals",
      point2: "Diabetes follow-up investigation sheet",
      point3: "Targets for sugar, BP, weight & more",
      cta: "Book metabolic assessment",
      caption: "Healthy balanced diet plate · Diabetes follow-up sheet — KVR Hospital",
    },
    diagnostics: {
      label: "Our Facilities",
      title: "On-site diagnostic services",
      subtitle:
        "Remidio fundus camera, body composition analyser and 2D echo — installed at KVR Hospital, Ramachandrapuram. Same visit, doctor-led reporting.",
      bookTest: "Book this test",
      metricsHeading: "What we assess",
      unifiedTitle: "All three at KVR Hospital",
      unifiedLead:
        "No need to travel elsewhere — fundus camera, body composition and 2D echo are available at our Ramachandrapuram centre. Your doctor interprets results with you during your visit.",
      items: {
        fundus: {
          title: "Remidio AI-Assisted Fundus Camera",
          short: "Retinal screening",
          summaryLine: "AI-assisted retinal imaging for diabetic eye disease and early retina changes.",
          onSite: "On-site at KVR Hospital",
          description:
            "Non-invasive retinal photos with AI-assisted analysis support. Ideal for diabetic eye screening and early detection of retinal changes — results discussed with you, not just printed.",
          badge: "AI-assisted screening",
          metrics: ["Retinal Health", "Diabetic Eye", "Early Detection"],
        },
        bca: {
          title: "Body Composition Analyser",
          short: "Body composition",
          summaryLine: "~60 sec scan — body fat, muscle, visceral fat and metabolic insight beyond the weighing scale.",
          onSite: "On-site at KVR Hospital",
          description:
            "Clinic-grade analyser for body fat, muscle mass, visceral fat and segmental readings in about 60 seconds. Helps guide obesity, diabetes and metabolic care beyond weight alone.",
          badge: "Metabolic insight",
          metrics: ["Body Fat %", "Muscle Mass", "Metabolic Health", "Weight Management"],
        },
        echo: {
          title: "2D Echocardiography (2D Echo)",
          short: "Heart ultrasound",
          summaryLine: "Cardiac ultrasound for heart structure, pumping function and valves when clinically indicated.",
          onSite: "On-site at KVR Hospital",
          description:
            "Cardiac ultrasound when your physician recommends it — assesses heart chambers, pumping function (ejection fraction) and valves. Performed at our centre with clinical correlation in your consultation.",
          badge: "Cardiac ultrasound",
          metrics: ["Heart Structure", "Pumping Function", "Valves"],
        },
      },
    },
    fever: {
      label: "Fever Care",
      title: "Evidence-based — not routine protocols",
      items: [
        { title: "Typhoid care", text: "Not every typhoid patient needs an injection course." },
        { title: "Dengue care", text: "Not every dengue patient needs platelet transfusion." },
      ],
    },
    doctor: {
      label: "About the Doctor",
      title: "Dr. Naga Satish Kumar Kota",
      specialty: "MD (General Medicine) | Consultant Physician",
      bioIntro: "Dr. Naga Satish Kumar Kota completed his postgraduate training in",
      credentialHighlight:
        "General Medicine at the prestigious INHS Asvini, Mumbai, under the Indian Armed Forces Medical Services (AFMS).",
      bio:
        "His training provided extensive clinical exposure across Cardiology, Neurology, Nephrology, Oncology, Gastroenterology, Rheumatology and Critical Care Medicine.\n\n" +
        "His approach focuses on accurate diagnosis, evidence-based treatment, personalized patient care and prevention of disease complications.",
      interests: [
        "Accurate diagnosis",
        "Evidence-based treatment",
        "Personalized patient care",
        "Prevention of complications",
      ],
      cred1: "Postgraduate · AFMS",
      cred2: "MD · General Medicine",
      cred3: "INHS Asvini, Mumbai",
      book: "Book consultation",
    },
    whyUs: {
      label: "Why KVR",
      title: "What to expect",
      items: [
        { title: "Doctor-led", text: "Not just lab reports — full clinical interpretation." },
        { title: "Risk-based tests", text: "Right assessment for your age and history." },
        { title: "Body composition", text: "Fat, muscle & visceral fat in 60 seconds." },
        { title: "Follow-up care", text: "Prevention is ongoing — not a one-day check." },
      ],
    },
    conditions: {
      label: "We Treat & Prevent",
      title: "Conditions we focus on",
      list: [
        "Diabetes & Prediabetes",
        "Fatty Liver",
        "Obesity & Metabolic Health",
        "Hypertension",
        "Thyroid Disorders",
        "Fever & Infections",
        "Heart Disease Risk",
        "General Physician",
      ],
    },
    book: {
      label: "Book Now",
      title: "Book Your Consultation",
      subtitle: "Walk in when you're ready — or reserve a time below. Prefer instant help? We're on WhatsApp.",
      formSuccess: "Thank you — WhatsApp is opening to confirm.",
      name: "Full name",
      namePh: "Patient name",
      mobile: "Mobile",
      mobilePh: "10-digit number",
      concern: "Health concern",
      mode: "Consultation mode",
      modeInPerson: "In-person visit",
      modeVideo: "Video consultation",
      concernOptions: bookingConcernOptions.en,
      date: "Preferred date",
      time: "Preferred time",
      timeMorning: "Morning (9 AM – 12 PM)",
      timeAfternoon: "Afternoon (12 – 4 PM)",
      timeEvening: "Evening (4 – 8 PM)",
      notes: "Notes (optional)",
      notesPh: "Symptoms or questions",
      submit: "Request Consultation",
      bcaOption: "Body Composition Test",
      otherOption: "Other",
      hoursDisplay: "Mon – Sat: 9 AM – 8 PM",
      whatsappBtn: "WhatsApp",
    },
    mobile: { call: "Call", callback: "Callback", whatsapp: "WhatsApp" },
    video: {
      label: "From Our Physician",
      title: "A message from your doctor",
      text: "Watch Dr. Naga Satish Kumar explain why early detection matters for diabetes, fever care, fatty liver and lifestyle diseases — and how preventive medicine helps you act before complications develop.",
      note: "Scroll to play — tap unmute to hear. Book a Preventive Health Assessment if you are above 35 or have family history of metabolic disease.",
    },
    faq: {
      label: "FAQ",
      title: "Quick answers",
      items: [
        { q: "Do I need an appointment?", a: "Walk-ins welcome Mon–Sat, 9 AM–8 PM. You can also book on WhatsApp or the form below." },
        { q: "Which health assessment should I choose?", a: "Essential for baseline at 25+. Metabolic for diabetes/fatty liver risk. Heart for BP/cholesterol. Full for a complete review. Not sure? Ask on WhatsApp." },
        { q: "What should I bring?", a: "Current medicines (photo of strip is fine) and any recent reports if you have them." },
      ],
    },
    contact: { title: "Quick Contact", navigate: "Navigate", whatsapp: "WhatsApp" },
    map: {
      label: "Find Us",
      title: "Location, directions & patient reviews",
      navigate: "Navigate to Hospital",
      openMaps: "Open in Google Maps",
      reviewsTitle: "Patient Reviews",
      reviewsIntro: "See what patients say about KVR Hospital on Google and JustDial.",
      googleReviews: "Google Reviews",
      googleRatings: "ratings on Google Maps",
      readReviews: "Read & write reviews →",
      justdial: "JustDial",
      verifiedRatings: "verified ratings",
      viewJd: "View on JustDial →",
      phone: "Phone:",
      hours: "Hours:",
    },
    footer: {
      pages: "Pages",
      contact: "Contact",
      assessments: "Assessments",
      diagnostics: "Diagnostics",
      doctor: "Doctor",
      book: "Book",
      googleReviews: "Google Reviews",
      privacy: "Privacy",
      terms: "Terms",
      tagline: "KVR Preventive Medical Centre · Ramachandrapuram · Dr. Naga Satish Kumar",
    },
    hoursNote: "Walk-ins welcome",
  },
  te: {
    nav: {
      doctor: "వైద్యుడు",
      services: "సేవలు",
      diagnostics: "పరీక్షలు",
      book: "అపాయింట్మెంట్",
      contact: "సంప్రదింపు",
      call: "కాల్",
      bookAppointment: "అపాయింట్మెంట్ బుక్ చేయండి",
      walkIns: "నేరుగా రావచ్చు",
      hoursLine: "సోమ – శని: ఉ. 9 – రా. 8",
    },
    ticker: {
      badge: "కొత్త",
      text: "శరీర కూర్పు విశ్లేషణ —",
      highlight: "60 సెకన్లలో పూర్తి శరీర కూర్పు విశ్లేషణ",
      cta: "ఇప్పుడే బుక్ చేయండి",
    },
    hero: {
      rating: "JustDial & Google · 35+ సమీక్షలు",
      centre: "KVR నివారక వైద్య కేంద్రం",
      titleBefore: "వైద్య నిర్వహిత సంరక్షణ — ",
      titleHighlight: "మధుమేహం",
      titleAfter: ", కాలేయ కొళ్లు & చమురు ఆరోగ్యం కోసం",
      lead: "మధుమేహం, కాలేయ కొళ్లు, ఊబకాయం, రక్తపోటు మరియు చమురు ఆరోగ్యం కోసం నివారక సంరక్షణ — డాక్టర్ నాగ సతీష్ కుమార్ కోట, రామచంద్రపురం.",
      point1: "నేరుగా రావచ్చు · సోమ–శని ఉ. 9 – రా. 8",
      point2: "రిపోర్ట్లు మీతో వివరించబడతాయి — హడావుడి మందులు కాదు",
      point3: "BCA, fundus camera & 2D echo — క్లినిక్‌లోనే",
      book: "అపాయింట్మెంట్ బుక్ చేయండి",
      whatsapp: "WhatsApp",
      location: "LIC Office పక్క, Main Road, రామచంద్రపురం",
      physicianLabel: "కన్సల్టెంట్ ఫిజిషియన్",
      experience: "10+ సంవత్సరాల అనుభవం",
      specialty: "అంతర్గత వైద్యం",
    },
    quick: {
      call: "ఆస్పత్రికి కాల్",
      callSub: "+91 94911 35557",
      wa: "WhatsApp",
      waSub: "తక్షణ సమాధానం",
      book: "అపాయింట్మెంట్",
      bookSub: "అదే రోజు స్లాట్లు",
      map: "దిశలు",
      mapSub: "రామచంద్రపురం",
    },
    highlights: [
      { label: "నివారణ", sub: "ముందుగా గుర్తించడం" },
      { label: "10+ సం.", sub: "అనుభవం" },
      { label: "BCA", sub: "60 సెక. స్కాన్" },
      { label: "4.5★", sub: "రేటింగ్" },
    ],
    assessments: {
      label: "ఆరోగ్య అంచనాలు",
      title: "మీకు సరైన అంచనా ఎంచుకోండి",
      subtitle: "డాక్టర్ నిర్వహిత నివారక ప్యాకేజీలు — అస్పష్ట పరీక్షల పట్టిక కాదు.",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
      mostPopular: "అత్యంత ప్రముఖం",
      pathwayTitle: "మీ సందర్శనలో ఏం జరుగుతుంది",
      pathwayNotSure: "ఏ ప్యాకేజీ ఎంచుకోవాలో తెలియదా?",
      pathwayWhatsApp: "WhatsApp లో అడగండి",
      packages: [
        { id: "essential", title: "ప్రాథమిక ఆరోగ్య అంచనా", tag: "ప్రాథమిక", for: "25+ ఆరోగ్యవంతమైన వయోజనులు — మూల ఆరోగ్య పరిశీలన." },
        { id: "metabolic", title: "చమురు ఆరోగ్య అంచనా", tag: "అత్యంత ప్రముఖం", for: "మధుమేహ ప్రమాదం, ఊబకాయం, కాలేయ కొళ్లు, కుటుంబ చరిత్ర." },
        { id: "cardio", title: "గుండె ప్రమాద అంచనా", tag: "గుండె", for: "రక్తపోటు, కolesterol, మధుమేహం, గుండె ఆందోళన." },
        { id: "comprehensive", title: "సంపూర్ణ నివారక అంచనా", tag: "పూర్తి", for: "చమురు, గుండె, కాలేయ, మూత్రపిండాలు & జీవనశైలి సమగ్ర పరిశీలన." },
      ],
      visitSteps: [
        { step: 1, title: "వైద్య చరిత్ర", text: "మీ ఆరోగ్య చరిత్ర, మందులు & కుటుంబ వైద్య చరిత్ర." },
        { step: 2, title: "కొలతలు", text: "రక్తపోటు, BMI, నడుము & శరీర కూర్పు." },
        { step: 3, title: "పరీక్షలు", text: "మీ వయస్సు & ప్రమాదం ప్రకారం ఎంపిక." },
        { step: 4, title: "విశ్లేషణ", text: "డాక్టర్ ఫలితాలను మీతో వివరిస్తారు." },
        { step: 5, title: "ప్రణాళిక", text: "ఆహారం, వ్యాయామం & తదుపరి సందర్శన." },
      ],
    },
    preventive: {
      label: "నివారక సంరక్షణ",
      title: "ముందుగా గుర్తించండి. సంక్లిష్టతలను నివారించండి.",
      text: "మధుమేహం, కాలేయ కొళ్లు, గుండె వ్యాధి నిర్మలంగా ఉద్భవిస్తాయి. మేము మీ ప్రమాదాలను ముందుగా గుర్తించి డాక్టర్‌తో ప్లాన్ రూపొందిస్తాము.",
      cta: "అంచనాలు చూడండి",
    },
    slides: [
      { title: "డాక్టర్ నిర్వహిత సంరక్షణ", caption: "మీ వైద్యుడితో వ్యక్తిగత కన్సల్టేషన్." },
      { title: "మీ ప్రమాదం అర్థం చేసుకోండి", caption: "మీ ఆరోగ్యం వ్యాఖ్యానించబడుతుంది — కేవలం రిపోర్టు మాత్రమే కాదు." },
    ],
    bca: {
      label: "కొత్త · శరీర కూర్పు విశ్లేషణ",
      title: "మీ బరువు ఏమిటో తెలుసుకోండి",
      text: "60 సెకన్ల స్కాన్ — body fat, visceral fat, muscle mass & metabolic age. నొప్పి లేదు, సూదులు లేవు.",
      cta: "BCA పరీక్ష బుక్ చేయండి",
      stat1: "60 సెక.",
      stat1sub: "పూర్తి స్కాన్",
      stat2: "BCA",
      stat2sub: "క్లినిక్‌లో",
      stat3: "4+",
      stat3sub: "ముఖ్య కొలతలు",
    },
    nutrition: {
      label: "ఆహారం · మధుమేహ సంరక్షణ",
      title: "సంతులిత ఆహార తట్టు మరియు తదుపరి పర్యవేక్షణ",
      text: "చమురు ఆరోగ్యం మందులు మాత్రమే కాదు — ఆహారం మరియు నిరంతర పర్యవేక్షణ ముఖ్యం. ఆహార సమతుల్యత మరియు మధుమేహ తదుపరి సంరక్షణ కోసం మార్గదర్శకత్వం.",
      point1: "తెలుగు ఆహార తట్టు మార్గదర్శి — రోజువారీ భోజనాలు",
      point2: "మధుమేహ తదుపరి సంరక్షణ పరీక్షల షీట్",
      point3: "చక్కెర, రక్తపోటు, బరువు లక్ష్యాలు",
      cta: "చమురు ఆరోగ్య అంచనా బుక్ చేయండి",
      caption: "ఆరోగ్యకర ఆహార తట్టు · మధుమేహ తదుపరి సంరక్షణ షీట్ — KVR Hospital",
    },
    diagnostics: {
      label: "మా వైద్య సౌకర్యాలు",
      title: "క్లినిక్‌లో diagnostic పరీక్షల సౌకర్యాలు",
      subtitle:
        "Remidio fundus camera, body composition analyser, 2D echo — KVR Hospital, Ramachandrapuram లోనే. అదే సందర్శనలో doctor-led reporting.",
      bookTest: "ఈ పరీక్ష బుక్ చేయండి",
      metricsHeading: "మేము assess చేసేవి",
      unifiedTitle: "మూడూ KVR Hospital లోనే",
      unifiedLead:
        "వేరెచోటికి వellalsina avasaram ledu — fundus camera, body composition, 2D echo Ramachandrapuram centre lo. Doctor meetho results explain chestaru.",
      items: {
        fundus: {
          title: "Remidio AI-Assisted Fundus Camera",
          short: "Retinal screening",
          summaryLine: "AI-assisted retinal imaging — diabetic eye & early retina changes.",
          onSite: "KVR Hospital లో on-site",
          description:
            "AI-assisted retinal imaging — diabetic eye screening మరియు retinal changes early detection. ఫలితాలు మీతో discuss చేస్తారు.",
          badge: "AI-assisted screening",
          metrics: ["Retinal Health", "Diabetic Eye", "Early Detection"],
        },
        bca: {
          title: "Body Composition Analyser",
          short: "Body composition",
          summaryLine: "~60 sec scan — body fat, muscle, visceral fat; scale kante ekkuva insight.",
          onSite: "KVR Hospital లో on-site",
          description:
            "60 సెకన్లలో body fat, muscle mass, visceral fat — obesity, diabetes & metabolic care కోసం weight scale కంటే లోతైన insight.",
          badge: "Metabolic insight",
          metrics: ["Body Fat %", "Muscle Mass", "Metabolic Health", "Weight Management"],
        },
        echo: {
          title: "2D Echocardiography (2D Echo)",
          short: "Heart ultrasound",
          summaryLine: "2D echo — heart structure, pumping function, valves (doctor advice prakaram).",
          onSite: "KVR Hospital లో on-site",
          description:
            "Doctor సూచించినప్పుడు cardiac ultrasound — heart chambers, pumping function (ejection fraction), valves. మా centre లోనే, consultation తో clinical correlation.",
          badge: "Cardiac ultrasound",
          metrics: ["Heart Structure", "Pumping Function", "Valves"],
        },
      },
    },
    fever: {
      label: "జ్వరం సంరక్షణ",
      title: "సాక్ష్యాధారిత — routine protocols కాదు",
      items: [
        { title: "టైఫాయిడ్ సంరక్షణ", text: "ప్రతి టైఫాయిడ్ రోగికి ఇంజెక్షన్ కోర్సు అవసరం లేదు." },
        { title: "డెంగ్యూ సంరక్షణ", text: "ప్రతి డెంగ్యూ రోగికి ఈలికల అనుసంతరణ అవసరం లేదు." },
      ],
    },
    doctor: {
      label: "డాక్టర్ గురించి",
      title: "Dr. Naga Satish Kumar Kota",
      specialty: "MD (General Medicine) | Consultant Physician",
      bioIntro: "డాక్టర్ నాగ సతీష్ కుమార్ కోట గారు postgraduate medical training పూర్తి చేశారు:",
      credentialHighlight:
        "General Medicine at the prestigious INHS Asvini, Mumbai, under the Indian Armed Forces Medical Services (AFMS).",
      bio:
        "ఈ శిక్షణలో Cardiology, Neurology, Nephrology, Oncology, Gastroenterology, Rheumatology మరియు Critical Care Medicine విభాగాలలో విస్తృత clinical exposure లభించింది.\n\n" +
        "సరైన diagnosis, evidence-based treatment, personalized patient care మరియు disease complications నివారణ — ఆయన వైద్య పద్ధతిలో ఇవి ప్రధానం.",
      interests: [
        "Accurate diagnosis",
        "Evidence-based treatment",
        "Personalized patient care",
        "Prevention of complications",
      ],
      cred1: "Postgraduate · AFMS",
      cred2: "MD · General Medicine",
      cred3: "INHS Asvini, Mumbai",
      book: "Consultation బుక్ చేయండి",
    },
    whyUs: {
      label: "ఎందుకు KVR",
      title: "ఏమి ఆశించవచ్చు",
      items: [
        { title: "డాక్టర్ నిర్వహిత", text: "ల్యాబ్ రిపోర్ట్లు మాత్రమే కాదు — పూర్తి వైద్య వ్యాఖ్యానం." },
        { title: "ప్రమాద-ఆధారిత పరీక్షలు", text: "మీ వయస్సు మరియు చరిత్రకు సరైన అంచనా." },
        { title: "శరీర కూర్పు", text: "60 సెకన్లలో body fat, muscle mass మరియు visceral fat." },
        { title: "తదుపరి సంరక్షణ", text: "నివారణ నిరంతరం — ఒక రోజు తనిఖీ మాత్రమే కాదు." },
      ],
    },
    conditions: {
      label: "మేము చికిత్స & నివారణ",
      title: "మేము దృష్టి సారించే పరిస్థితులు",
      list: [
        "మధుమేహం మరియు ప్రీ-డయాబెటిస్",
        "కాలేయ కొళ్లు",
        "ఊబకాయం మరియు చమురు ఆరోగ్యం",
        "రక్తపోటు",
        "థైరాయిడ్ రుగ్మతలు",
        "జ్వరం మరియు ఇన్ఫెక్షన్లు",
        "గుండె వ్యాధి ప్రమాదం",
        "జనరల్ ఫిజిషియన్",
      ],
    },
    book: {
      label: "ఇప్పుడు బుక్",
      title: "కన్సల్టేషన్ లేదా అంచనా అభ్యర్థన",
      subtitle: "ఫారమ్ సమర్పించండి — WhatsApp లో నిర్ధారిస్తాము.",
      formSuccess: "ధన్యవాదాలు — నిర్ధారణ కోసం WhatsApp తెరుస్తున్నాము.",
      name: "పూర్తి పేరు",
      namePh: "రోగి పేరు",
      mobile: "ఫోన్ నంబర్",
      mobilePh: "10 అంకెల నంబర్",
      concern: "ఆరోగ్య సమస్య",
      mode: "కన్సల్టేషన్ రీతి",
      modeInPerson: "నేరుగా సందర్శన",
      modeVideo: "వీడియో కన్సల్టేషన్",
      concernOptions: bookingConcernOptions.te,
      date: "ఇష్టమైన తేదీ",
      time: "ఇష్టమైన సమయం",
      timeMorning: "ఉదయం (9 AM – 12 PM)",
      timeAfternoon: "మధ్యాహ్నం (12 – 4 PM)",
      timeEvening: "సాయంత్రం (4 – 8 PM)",
      notes: "గమనికలు (ఐచ్ఛికం)",
      notesPh: "లక్షణాలు లేదా ప్రశ్నలు",
      submit: "కన్సల్టేషన్ అభ్యర్థించండి",
      bcaOption: "శరీర కూర్పు పరీక్ష",
      otherOption: "ఇతర",
      hoursDisplay: "సోమ – శని: ఉ. 9 – రా. 8",
      whatsappBtn: "WhatsApp",
    },
    mobile: { call: "కాల్", callback: "బ్యాక్", whatsapp: "WhatsApp" },
    video: {
      label: "మా వైద్యుడి నుండి",
      title: "మీ డాక్టర్ సందేశం",
      text: "మధుమేహం, జ్వరం సంరక్షణ, కాలేయ కొళ్లు మరియు జీవనశైలి వ్యాధులలో early detection ఎందుకు ముఖ్యమో — complications ముందు preventive medicine ఎలా సహాయపడుతుందో డాక్టర్ నాగ సతీష్ కుమార్ వివరిస్తారు.",
      note: "వీడియో చూడటానికి స్క్రోల్ చేయండి — వినడానికి ధ్వని ఆన్ చేయండి. 35+ లేదా కుటుంబంలో చమురు వ్యాధి చరిత్ర ఉంటే నివారక ఆరోగ్య అంచనా బుక్ చేయండి.",
    },
    faq: {
      label: "తరచుగా అడిగే ప్రశ్నలు",
      title: "త్వరిత సమాధానాలు",
      items: [
        { q: "అపాయింట్మెంట్ అవసరమా?", a: "సోమ–శని ఉ. 9 – రా. 8 వరకు నేరుగా రావచ్చు. WhatsApp లేదా క్రింది ఫారమ్ ద్వారా కూడా బుక్ చేయవచ్చు." },
        {
          q: "ఏ అంచనా ఎంచుకోవాలి?",
          a: "25+ వయస్సు వారికి Essential assessment. మధుమేహం/fatty liver ఉన్నవారికి Metabolic assessment. BP/cholesterol ఉన్నవారికి Heart risk assessment. పూర్తి review కోసం Comprehensive assessment. సందేహం ఉంటే WhatsApp లో అడగండి.",
        },
        { q: "ఏమి తీసుకురావాలి?", a: "ప్రస్తుత మందులు (స్ట్రిప్ ఫోటో సరిపోతుంది) మరియు ఇటీవలి రిపోర్ట్లు ఉంటే తీసుకురండి." },
      ],
    },
    contact: { title: "త్వరిత సంప్రదింపు", navigate: "దిశలు", whatsapp: "WhatsApp" },
    map: {
      label: "మమ్మల్ని కనుగొనండి",
      title: "చిరునామా, దిశలు మరియు రోగి సమీక్షలు",
      navigate: "ఆస్పత్రికి దిశలు",
      openMaps: "Google Maps లో తెరవండి",
      reviewsTitle: "రోగి సమీక్షలు",
      reviewsIntro: "Google & JustDial లో KVR Hospital గురించి రోగులు ఏమి అంటున్నారో చూడండి.",
      googleReviews: "Google సమీక్షలు",
      googleRatings: "Google Maps రేటింగ్‌లు",
      readReviews: "సమీక్షలు చదవండి →",
      justdial: "JustDial",
      verifiedRatings: "ఆధారిత రేటింగ్‌లు",
      viewJd: "JustDial లో చూడండి →",
      phone: "ఫోన్:",
      hours: "సమయాలు:",
    },
    footer: {
      pages: "పేజీలు",
      contact: "సంప్రదింపు",
      assessments: "అంచనాలు",
      diagnostics: "పరీక్షలు",
      doctor: "వైద్యుడు",
      book: "బుక్",
      googleReviews: "Google సమీక్షలు",
      privacy: "గోప్యత",
      terms: "నిబంధనలు",
      tagline: "KVR నివారక వైద్య కేంద్రం · రామచంద్రపురం · డాక్టర్ నాగ సతీష్ కుమార్",
    },
    hoursNote: "నేరుగా రావచ్చు",
  },
};
