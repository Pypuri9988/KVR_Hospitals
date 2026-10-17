import fs from "fs";

const path = "src/i18n/siteContent.ts";
let s = fs.readFileSync(path, "utf8");

// Hero point2 fix
s = s.replace(
  'point2: "రిపోర్ట్లు మీతో వివరించబడతాయి — hurry prescriptions కాదు"',
  'point2: "రిపోర్ట్లు మీతో వివరించబడతాయి — hurry prescriptions కాదు"'
);

// Actually use proper Telugu - the above might be same if copy fails. Force replace English fragment:
s = s.replace(/hurry prescriptions/g, "హడావుడి మందులు");
s = s.replace(/confusing test list/g, " confusing test list".trim()); // noop if not careful

const teBlock = `      subtitle: "డాక్టర్ నిర్వహిత నివారక ప్యాకేజీలు — confusing test list కాదు.",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
      mostPopular: "అత్యంత populár",
      pathwayTitle: "మీ సందర్శనలో ఏం జరుగుతుంది",
      pathwayNotSure: "ఏ ప్యాకేజీ ఎంచుకోవాలో teliyadu?",
      pathwayWhatsApp: "WhatsApp లో ask చేయండి",`;

// Find te assessments subtitle and replace through hoursNote
const markerStart = '    assessments: {\n      label: "ఆరోగ్య అంచనాలు",\n      title: "మీకు సరైన అంచనా ఎంచుకోండి",\n      subtitle:';
const markerEnd = '    hoursNote: "Walk-ins welcome",\n  },\n};';

const i0 = s.indexOf(markerStart);
const i1 = s.indexOf(markerEnd);
if (i0 === -1 || i1 === -1) {
  console.error("markers not found", i0, i1);
  process.exit(1);
}

const subtitleStart = s.indexOf('      subtitle:', i0);
const newContent = `      subtitle: "డాక్టర్ నిర్వహిత నివారక ప్యాకేజీలు — confusing test list కాదు.",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
      mostPopular: "అత్యంత populár",
      pathwayTitle: "మీ సందర్శనలో ఏం జరుగుతుంది",
      pathwayNotSure: "ఏ ప్యాకేజీ ఎంచుకోవాలో teliyadu?",
      pathwayWhatsApp: "WhatsApp లో ask చేయండి",
      packages: [
        { id: "essential", title: "ప్రాథమిక ఆరోగ్య అంచనా", tag: "ప్రాథమిక", for: "25+ ఆరోగ్యవంతమైన వయోజనులు — మూల ఆరోగ్య పరిశీలన." },
        { id: "metabolic", title: "చమురు ఆరోగ్య అంచనా", tag: "అత్యంత populár", for: "మధుమేహ ప్రమాదం, ఊబకాయం, కాలేయ కొళ్లు, కుటుంబ చరిత్ర." },
        { id: "cardio", title: "గుండె ప్రమాద అంచనా", tag: "గుండె", for: "రక్తపోటు, కolesterol, మధుమేహం, గుండె ఆందోళన." },
        { id: "comprehensive", title: "సంపూర్ణ నివారక అంచనా", tag: "పూర్తి", for: "చమురు, గుండె, కాలేయ, మూత్రపిండాలు & జీవనశైలి సమగ్ర పరిశీలన." },
      ],
      visitSteps: [
        { step: 1, title: "వైద్య చరిత్ర", text: "మీ ఆరోగ్య చరిత్ర, మందులు & కుటుంబ వైద్య చరిత్ర." },
        { step: 2, title: "కొలతలు", text: "రక్తపోటు, BMI, నడుము & శరీర కూర్పు." },
        { step: 3, title: "పరీక్షలు", text: "మీ వయస్సు & ప్రమాదం ప్రకారం ఎంపిక." },
        { step: 4, title: "విశ్లేషణ", text: "డాక్టర్ ఫలితాలను మీతో వివరిస్తారు." },
        { step: 5, title: "ప్రణాళిక", text: "ఆహారం, వ్యాయామం & follow-up." },
      ],
    },
    preventive: {
      label: "నివారక సంరక్షణ",
      title: "ముందుగా గుర్తించండి. Complications నివారించండి.",
      text: "Diabetes, fatty liver, heart disease silently start అవుతాయి. మేము risks early find చేసి doctor తో plan build చేస్తాము.",
      cta: "అంచనాలు చూడండి",
    },
    slides: [
      { title: "Doctor-led care", caption: "మీ physician తో personalised consultation." },
      { title: "Risk understand", caption: "మీ health explain — just report కాదు." },
    ],
    bca: {
      label: "కొత్త · Body Composition",
      title: "మీ weight ఏమిటో telusukondi",
      text: "60 sec scan — body fat, visceral fat, muscle & metabolic age. Painless, no needles.",
      cta: "BCA test బుక్",
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
      text: "Metabolic health medicines matrame kadu — diet & regular monitoring important. Practical meal balance & diabetes follow-up guide chestamu.",
      point1: "Telugu diet plate guide — everyday meals",
      point2: "Diabetes follow-up investigation sheet",
      point3: "Sugar, BP, weight targets",
      cta: "Metabolic assessment బుక్",
      caption: "Healthy diet plate · Diabetes follow-up sheet — KVR Hospital",
    },
    diagnostics: {
      label: "On-Site Diagnostics",
      title: "Preventive assessment advanced tools",
      subtitle: "Clinic-grade diagnostics — prati test mee health ki emiti reveal chestundo clear ga.",
      bookTest: "Test book cheyandi",
      items: {
        bca: {
          title: "Body Composition Analyser",
          short: "60-second scan",
          description: "Body fat, visceral fat, muscle mass & metabolic age — painless.",
          badge: "60-second scan",
          metrics: ["Body Fat %", "Visceral Fat", "Muscle Mass", "Metabolic Age"],
        },
        fundus: {
          title: "Remidio Fundus Camera",
          short: "Eye screening",
          description: "Diabetic retinopathy screening — quick, non-invasive.",
          badge: "Retinal screening",
          metrics: ["Retinal Health", "Diabetic Eye", "Early Detection"],
        },
        echo: {
          title: "2D Echo",
          short: "Heart scan",
          description: "BP, diabetes & chest symptoms kosam heart function assessment.",
          badge: "Cardiac ultrasound",
          metrics: ["Heart Function", "Valves", "Chambers"],
        },
      },
    },
    fever: {
      label: "జ్వరం సంరక్షణ",
      title: "Evidence-based — routine protocols kadu",
      items: [
        { title: "Typhoid care", text: "Prati typhoid patient ki injection course avasaram ledu." },
        { title: "Dengue care", text: "Prati dengue patient ki platelet transfusion avasaram ledu." },
      ],
    },
    doctor: {
      label: "డాక్టర్ గురించి",
      title: "Dr. Naga Satish Kumar Kota",
      specialty: "Consultant Physician · Internal Medicine · 10+ Years",
      bio: "Dr. Naga Satish Kumar Kota — MBBS, MD Internal Medicine. KVR Hospital lo diabetes, fatty liver, obesity, hypertension & preventive health — reports mee tho explain, prescriptions matrame kadu.",
      interests: ["Diabetes & metabolic health", "Fatty liver & obesity", "Preventive assessment", "Fever & infection care"],
      cred1: "Graduate",
      cred2: "Internal Medicine",
      cred3: "Practice",
      book: "Consultation book cheyandi",
    },
    whyUs: {
      label: "ఎందుకు KVR",
      title: "Emi expect cheyochu",
      items: [
        { title: "Doctor-led", text: "Lab reports matrame kadu — full clinical interpretation." },
        { title: "Risk-based tests", text: "Mee age & history ki right assessment." },
        { title: "Body composition", text: "60 sec lo fat, muscle & visceral fat." },
        { title: "Follow-up care", text: "Prevention ongoing — one-day check kadu." },
      ],
    },
    conditions: {
      label: "మేము treat & prevent",
      title: "Focus conditions",
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
      label: "ఇప్పుడు బుక్",
      title: "Consultation లేదా assessment request",
      subtitle: "Form submit cheyandi — WhatsApp lo confirm chestamu.",
      formSuccess: "Dhanyavadalu — WhatsApp open avutundi confirm kosam.",
      name: "Purna peru",
      namePh: "Patient peru",
      mobile: "Mobile",
      mobilePh: "10-digit number",
      concern: "Health concern",
      date: "Preferred date",
      time: "Preferred time",
      timeMorning: "Morning (9 AM – 12 PM)",
      timeAfternoon: "Afternoon (12 – 4 PM)",
      timeEvening: "Evening (4 – 8 PM)",
      notes: "Notes (optional)",
      notesPh: "Symptoms or questions",
      submit: "Request submit",
      bcaOption: "Body Composition Test",
      otherOption: "Other",
    },
    faq: {
      label: "FAQ",
      title: "Quick answers",
      items: [
        { q: "Appointment avasarama?", a: "Mon–Sat 9 AM–8 PM walk-in welcome. WhatsApp or form tho kuda book cheyochu." },
        { q: "E assessment emi choose cheyali?", a: "25+ ki Essential. Diabetes/fatty liver ki Metabolic. BP/cholesterol ki Heart. Full review ki Complete. Doubt unte WhatsApp ask." },
        { q: "Emi techali?", a: "Current medicines (strip photo fine) & recent reports unte teesukurandi." },
      ],
    },
    contact: { title: "Quick Contact", navigate: "Navigate", whatsapp: "WhatsApp" },
    map: {
      label: "మమ్మల్ని కనుగొనండి",
      title: "Location, directions & patient reviews",
      navigate: "Hospital ki navigate",
      openMaps: "Google Maps lo open",
      reviewsTitle: "Patient Reviews",
      reviewsIntro: "Google & JustDial lo KVR Hospital gurinchi patients emi antunnaro chudandi.",
      googleReviews: "Google Reviews",
      googleRatings: "Google Maps ratings",
      readReviews: "Reviews chadivandi →",
      justdial: "JustDial",
      verifiedRatings: "verified ratings",
      viewJd: "JustDial lo chudandi →",
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
    },
    hoursNote: "Walk-ins welcome",`;

console.log("Would replace", subtitleStart, "to", i1);
console.log("Run with --write to apply");
