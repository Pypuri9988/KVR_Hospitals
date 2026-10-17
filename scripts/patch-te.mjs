import fs from "fs";

const p = "src/i18n/siteContent.ts";
let s = fs.readFileSync(p, "utf8");
const i = s.indexOf("  te: {");
const j = s.indexOf("    hoursNote:", i);
const k = s.indexOf("\n  },\n};", j);
let te = s.slice(i, k);

const reps = [
  [
    'title: "ముందుగా గుర్తించండి. Complications నివారించండి."',
    'title: "ముందుగా గుర్తించండి. సంక్లిష్టతలను నివారించండి."',
  ],
  [
    "Diabetes, fatty liver, heart disease silently start అవుతాయి. మేము risks early find చేసి doctor తో plan build చేస్తాము.",
    "మధుమేహం, కాలేయ కొళ్లు, గుండె వ్యాధి నిర్మలంగా ఉద్భవిస్తాయి. మేము మీ ప్రమాదాలను ముందుగా గుర్తించి డాక్టర్‌తో ప్లాన్ రూపొందిస్తాము.",
  ],
  [
    '{ title: "Doctor-led care", caption: "మీ physician తో personalised consultation." }',
    '{ title: "డాక్టర్ నిర్వహిత సంరక్షణ", caption: "మీ వైద్యుడితో వ్యక్తిగత కన్సల్టేషన్." }',
  ],
  [
    '{ title: "Risk understand", caption: "మీ health explain — just report కాదు." }',
    '{ title: "మీ ప్రమాదం అర్థం చేసుకోండి", caption: "మీ ఆరోగ్యం వ్యాఖ్యానించబడుతుంది — కేవలం రిపోర్టు మాత్రమే కాదు." }',
  ],
  ["శరీర కొవvá, అంతర్గత కొవvá", "శరీర కొవvá, అంతర్గత కొవvá"],
  [
    'label: "Nutrition · Diabetes Care"',
    'label: "ఆహారం · మధుమేహ సంరక్షణ"',
  ],
  [
    'title: "Balanced plate & follow-up tracking"',
    'title: "సంతులిత ఆహార తట్టు మరియు తదుపరి పర్యవేక్షణ"',
  ],
  [
    "Metabolic health medicines matrame kadu — diet & regular monitoring important. Practical meal balance & diabetes follow-up guide chestamu.",
    "చమురు ఆరోగ్యం మందులు మాత్రమే కాదు — ఆహారం మరియు నిరంతర పర్యవేక్షణ ముఖ్యం. ఆహార సమతుల్యత మరియు మధుమేహ follow-up కోసం మార్గదర్శకత్వం.",
  ],
  [
    "Telugu diet plate guide — everyday meals",
    "తెలుగు ఆహార తట్టు మార్గదర్శి — రోజువారీ భోజనాలు",
  ],
  [
    "Diabetes follow-up investigation sheet",
    "మధుమేహ follow-up పరీక్షల షీట్",
  ],
  [
    "Sugar, BP, weight targets",
    "చక్కెర, రక్తపోటు, బరువు లక్ష్యాలు",
  ],
  ['cta: "Metabolic assessment బుక్"', 'cta: "చమురు ఆరోగ్య అంచనా బుక్ చేయండి"'],
  [
    "Healthy diet plate · Diabetes follow-up sheet — KVR Hospital",
    "ఆరోగ్యకర ఆహార తట్టు · మధుమేహ follow-up షీట్ — KVR Hospital",
  ],
  ['label: "On-Site Diagnostics"', 'label: "క్లినిక్‌లో పరీక్షలు"'],
  [
    'title: "Preventive assessment advanced tools"',
    'title: "నివారక అంచనా కోసం అధునాతన సాధనాలు"',
  ],
  [
    "Clinic-grade diagnostics — prati test mee health ki emiti reveal chestundo clear ga.",
    "క్లినిక్-స్థాయి పరీక్షలు — ప్రతి పరీక్ష మీ ఆరోగ్యానికి ఏమి చెబుతుందో స్పష్టంగా.",
  ],
  ['bookTest: "Test book cheyandi"', 'bookTest: "ఈ పరీక్ష బుక్ చేయండి"'],
  ['title: "Body Composition Analyser"', 'title: "శరీర కూర్పు విశ్లేషకం"'],
  ['short: "60-second scan"', 'short: "60 సెకన్ల స్కాన్"'],
  [
    "Body fat, visceral fat, muscle mass & metabolic age — painless.",
    "శరీర కొవvá, అంతర్గత కొవvá, కండరపు వర్గం మరియు చయాపర వయసు — నొప్పి లేదు.",
  ],
  ['badge: "60-second scan"', 'badge: "60 సెకన్ల స్కాన్"'],
  [
    'metrics: ["Body Fat %", "Visceral Fat", "Muscle Mass", "Metabolic Age"]',
    'metrics: ["శరీర కొవvá %", "అంతర్గత కొవvá", "కండరపు వర్గం", "చయాపర వయసు"]',
  ],
  ['short: "Eye screening"', 'short: "కంటి పరీక్ష"'],
  [
    "Diabetic retinopathy screening — quick, non-invasive.",
    "మధుమేహ రెటినోపతి స్క్రీనింగ్ — త్వరిత, invasiv కాదు.",
  ],
  ['badge: "Retinal screening"', 'badge: "రెటినా స్క్రీనింగ్"'],
  [
    'metrics: ["Retinal Health", "Diabetic Eye", "Early Detection"]',
    'metrics: ["రెటినా ఆరోగ్యం", "మధుమేహ కంటి", "ముందస్తు గుర్తింపు"]',
  ],
  ['short: "Heart scan"', 'short: "గుండె స్కాన్"'],
  [
    "BP, diabetes & chest symptoms kosam heart function assessment.",
    "రక్తపోటు, మధుమేహం మరియు ఛాతి లక్షణాల కోసం గుండె పనితీరు అంచనా.",
  ],
  ['badge: "Cardiac ultrasound"', 'badge: "గుండె అల్ట్రాసౌండ్"'],
  [
    'metrics: ["Heart Function", "Valves", "Chambers"]',
    'metrics: ["గుండె పనితీరు", "వాల్వులు", "గదులు"]',
  ],
  [
    'title: "Evidence-based — routine protocols kadu"',
    'title: "సాక్ష్యాధారిత — routing protocols కాదు"',
  ],
  [
    '{ title: "Typhoid care", text: "Prati typhoid patient ki injection course avasaram ledu." }',
    '{ title: "టైఫాయిడ్ సంరక్షణ", text: "ప్రతి టైఫాయిడ్ రోగికి ఇంజెక్షన్ కోర్సు అవసరం లేదు." }',
  ],
  [
    '{ title: "Dengue care", text: "Prati dengue patient ki platelet transfusion avasaram ledu." }',
    '{ title: "డెంగ్యూ సంరక్షణ", text: "ప్రతి డెంగ్యూ రోగికి platelet transfusion అవసరం లేదు." }',
  ],
  [
    "Consultant Physician · Internal Medicine · 10+ Years",
    "కన్సల్టెంట్ ఫిజిషియన్ · అంతర్గత వైద్యం · 10+ సంవత్సరాలు",
  ],
  [
    "Dr. Naga Satish Kumar Kota — MBBS, MD Internal Medicine. KVR Hospital lo diabetes, fatty liver, obesity, hypertension & preventive health — reports mee tho explain, prescriptions matrame kadu.",
    "డాక్టర్ నాగ సతీష్ కుమార్ కోట — MBBS, MD (అంతర్గత వైద్యం). KVR Hospital లో మధుమేహం, కాలేయ కొళ్లు, ఊబకాయం, రక్తపోటు మరియు నివారక ఆరోగ్యం — రిపోర్ట్లు మీతో వివరించబడతాయి, prescriptions మాత్రమే కాదు.",
  ],
  [
    'interests: ["Diabetes & metabolic health", "Fatty liver & obesity", "Preventive assessment", "Fever & infection care"]',
    'interests: ["మధుమేహం మరియు చమురు ఆరోగ్యం", "కాలేయ కొళ్లు మరియు ఊబకాయం", "నివారక అంచనా", "జ్వరం మరియు инфекция సంరక్షణ"]',
  ],
  ['cred1: "Graduate"', 'cred1: "ఉపాధి"'],
  ['cred2: "Internal Medicine"', 'cred2: "అంతర్గత వైద్యం"'],
  ['cred3: "Practice"', 'cred3: "అనుభవం"'],
  ['book: "Consultation book cheyandi"', 'book: "కన్సల్టేషన్ బుక్ చేయండి"'],
  ['title: "Emi expect cheyochu"', 'title: "ఏమి ఆశించవచ్చు"'],
  [
    '{ title: "Doctor-led", text: "Lab reports matrame kadu — full clinical interpretation." }',
    '{ title: "డాక్టర్ నిర్వహిత", text: "ల్యాబ్ రిపోర్ట్లు మాత్రమే కాదు — పూర్తి clinical interpretation." }',
  ],
  [
    '{ title: "Risk-based tests", text: "Mee age & history ki right assessment." }',
    '{ title: "ప్రమాద-ఆధారిత పరీక్షలు", text: "మీ వయస్సు మరియు చరిత్రకు సరైన అంచనా." }',
  ],
  [
    '{ title: "Body composition", text: "60 sec lo fat, muscle & visceral fat." }',
    '{ title: "శరీర కూర్పు", text: "60 సెకన్లలో కొవvá, కండరాలు మరియు అంతర్గత కొవvá." }',
  ],
  [
    '{ title: "Follow-up care", text: "Prevention ongoing — one-day check kadu." }',
    '{ title: "తదుపరి సంరక్షణ", text: "నివారణ నిరంతరం — ఒక రోజు check మాత్రమే కాదు." }',
  ],
  ['label: "మేము treat & prevent"', 'label: "మేము చికిత్స & నివారణ"'],
  ['title: "Focus conditions"', 'title: "మేము దృష్టి సారించే పరిస్థితులు"'],
  [
    '"Diabetes & Prediabetes"',
    '"మధుమేహం మరియు ప్రీ-డయాబెటిస్"',
  ],
  ['"Fatty Liver"', '"కాలేయ కొళ్లు"'],
  ['"Obesity & Metabolic Health"', '"ఊబకాయం మరియు చమురు ఆరోగ్యం"'],
  ['"Hypertension"', '"రక్తపోటు"'],
  ['"Thyroid Disorders"', '"థైరాయిడ్ రుగ్మతలు"'],
  ['"Fever & Infections"', '"జ్వరం మరియు инфекцияలు"'],
  ['"Heart Disease Risk"', '"గుండె వ్యాధి ప్రమాదం"'],
  ['"General Physician"', '"జనరల్ ఫిజిషియన్"'],
  [
    'title: "Consultation లేదా assessment request"',
    'title: "కన్సల్టేషన్ లేదా అంచనా అభ్యర్థన"',
  ],
  [
    "Form submit cheyandi — WhatsApp lo confirm chestamu.",
    "ఫారమ్ సమర్పించండి — WhatsApp లో confirm చేస్తాము.",
  ],
  [
    "Dhanyavadalu — WhatsApp open avutundi confirm kosam.",
    "ధన్యవాదాలు — confirm కోసం WhatsApp తెరుస్తున్నాము.",
  ],
  ['name: "Purna peru"', 'name: "పూర్తి పేరు"'],
  ['namePh: "Patient peru"', 'namePh: "రోగి పేరు"'],
  ['mobilePh: "10-digit number"', 'mobilePh: "10 అంకెల నంబర్"'],
  ['concern: "Health concern"', 'concern: "ఆరోగ్య సమస్య"'],
  ['date: "Preferred date"', 'date: "ఇష్టమైన తేదీ"'],
  ['time: "Preferred time"', 'time: "ఇష్టమైన సమయం"'],
  [
    'timeMorning: "Morning (9 AM – 12 PM)"',
    'timeMorning: "ఉదయం (9 AM – 12 PM)"',
  ],
  [
    'timeAfternoon: "Afternoon (12 – 4 PM)"',
    'timeAfternoon: "మధ్యాహ్నం (12 – 4 PM)"',
  ],
  [
    'timeEvening: "Evening (4 – 8 PM)"',
    'timeEvening: "సాయంత్రం (4 – 8 PM)"',
  ],
  ['notes: "Notes (optional)"', 'notes: "గమనికలు (optional)"'],
  ['notesPh: "Symptoms or questions"', 'notesPh: "లక్షణాలు లేదా ప్రశ్నలు"'],
  ['submit: "Request submit"', 'submit: "అభ్యర్థన సమర్పించండి"'],
  ['bcaOption: "Body Composition Test"', 'bcaOption: "శరీర కూర్పు పరీక్ష"'],
  ['otherOption: "Other"', 'otherOption: "ఇతర"'],
  ['label: "FAQ"', 'label: "తరచుగా అడిగే ప్రశ్నలు"'],
  ['title: "Quick answers"', 'title: "త్వరిత సమాధానాలు"'],
  [
    '{ q: "Appointment avasarama?", a: "Mon–Sat 9 AM–8 PM walk-in welcome. WhatsApp or form tho kuda book cheyochu." }',
    '{ q: "అపాయింట్మెంట్ అవసరమా?", a: "సోమ–శని 9 AM–8 PM walk-in స్వాగతం. WhatsApp లేదా ఫారమ్ ద్వారా కూడా బుక్ చేయవచ్చు." }',
  ],
  [
    '{ q: "E assessment emi choose cheyali?", a: "25+ ki Essential. Diabetes/fatty liver ki Metabolic. BP/cholesterol ki Heart. Full review ki Complete. Doubt unte WhatsApp ask." }',
    '{ q: "ఏ అంచనా ఎంచుకోవాలి?", a: "25+ కి Essential. మధుమేహ/కాలేయ కొళ్లు కి Metabolic. BP/cholesterol కి Heart. పూర్తి review కి Complete. సందేహం ఉంటe WhatsApp లో అడగండి." }',
  ],
  [
    '{ q: "Emi techali?", a: "Current medicines (strip photo fine) & recent reports unte teesukurandi." }',
    '{ q: "ఏమి తీసుకురావాలి?", a: "ప్రస్తుత మందులు (strip photo fine) మరియు recent reports ఉంటe teesukurandi." }',
  ],
  ['title: "Quick Contact"', 'title: "త్వరిత సంప్రదింపు"'],
  ['navigate: "Navigate"', 'navigate: "దిశలు"'],
  [
    'title: "Location, directions & patient reviews"',
    'title: "చిరునామా, దిశలు మరియు రోగి సమీక్షలు"',
  ],
  ['navigate: "Hospital ki navigate"', 'navigate: "ఆస్పత్రికి దిశలు"'],
  ['openMaps: "Google Maps lo open"', 'openMaps: "Google Maps లో తెరవండి"'],
  ['reviewsTitle: "Patient Reviews"', 'reviewsTitle: "రోగి సమీక్షలు"'],
  [
    "Google & JustDial lo KVR Hospital gurinchi patients emi antunnaro chudandi.",
    "Google & JustDial లో KVR Hospital గురించి రోగులు ఏమి అంటున్నారో చూడండి.",
  ],
  ['googleReviews: "Google Reviews"', 'googleReviews: "Google సమీక్షలు"'],
  ['googleRatings: "Google Maps ratings"', 'googleRatings: "Google Maps రేటింగ్‌లు"'],
  ['readReviews: "Reviews chadivandi →"', 'readReviews: "సమీక్షలు చదవండి →"'],
  ['verifiedRatings: "verified ratings"', 'verifiedRatings: "verified రేటింగ్‌లు"'],
  ['viewJd: "JustDial lo chudandi →"', 'viewJd: "JustDial లో చూడండి →"'],
  ['phone: "Phone:"', 'phone: "ఫోన్:"'],
  ['hours: "Hours:"', 'hours: "సమయాలు:"'],
  ['pages: "Pages"', 'pages: "పేజీలు"'],
  ['contact: "Contact"', 'contact: "సంప్రదింపు"'],
  ['assessments: "Assessments"', 'assessments: "అంచనాలు"'],
  ['diagnostics: "Diagnostics"', 'diagnostics: "పరీక్షలు"'],
  ['doctor: "Doctor"', 'doctor: "వైద్యుడు"'],
  ['book: "Book"', 'book: "బుక్"'],
  ['googleReviews: "Google Reviews"', 'googleReviews: "Google సమీక్షలు"'],
  ['privacy: "Privacy"', 'privacy: "గోప్యత"'],
  ['terms: "Terms"', 'terms: "నిబంధనలు"'],
  ['hoursNote: "Walk-ins welcome"', 'hoursNote: "నేరుగా రావచ్చు"'],
  ['{ label: "10+ yrs", sub: "అనుభవం" }', '{ label: "10+ సం.", sub: "అనుభవం" }'],
];

for (const [a, b] of reps) {
  if (!te.includes(a)) console.warn("missing:", a.slice(0, 60));
  te = te.split(a).join(b);
}

s = s.slice(0, i) + te + s.slice(k);
fs.writeFileSync(p, s);
console.log("done");
