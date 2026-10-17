import fs from "fs";

const path = "src/messages.js";
let s = fs.readFileSync(path, "utf8");

const start = s.indexOf("  te: {");
const end = s.indexOf("\n  },\n};\n\nexport function allOptionsRows");
if (start === -1 || end === -1) {
  console.error("markers not found", start, end);
  process.exit(1);
}

const teBlock = `  te: {
    langPicker:
      "KVR Hospital కు స్వాగతం 🏥\\n\\nరామచంద్రపురం · డాక్టర్ నాగ సతీష్ కుమార్ కోటా గారి నిర్వహణలో నివారక ఆరోగ్య సంరక్షణ\\n\\nదయచేసి మీ భాషను ఎంచుకోండి:",
    menuIntro:
      "*KVR Hospital* 🏥 కు స్వాగతం\\n\\nరామచంద్రపురం · డాక్టర్ నాగ సతీష్ కుమార్ కోటా\\n\\nక్రింద *సేవల జాబితా* ను నొక్కి, చిహ్నం ఉన్న మీ సేవను ఎంచుకోండి.",
    menuListButton: "సేవల జాబితా",
    menuSectionAll: "అన్ని సేవలు",
    hubQuickIntro: "మీకు ఈ రోజు ఎలా సహాయపడాలి?",
    listFooterHint: "ఎంపిక కోసం ఒక సేవపై నొక్కండి.",
    chatWelcome:
      "💬 *KVR Hospital చాట్*\\n\\nమీరు మా సంరక్షణ బృందంతో అనుసంధానమైనారు — మా బృందం ఇక్కడే వెంటనే సమాధానం ఇస్తుంది.\\n\\nమీ ప్రశ్న లేదా అభ్యర్థనను క్రింద పంపండి.",
    conditions:
      "🩺 *మేము చికిత్స చేసే వ్యాధులు*\\n\\n• మధుమేహం & ప్రీ-డయాబెటిస్\\n• రక్తపోటు (BP)\\n• ఊబకాయం & చమురు ఆరోగ్యం\\n• కాలేయ కొళ్లు & థైరాయిడ్\\n• జ్వరం / టైఫాయిడ్ / డెంగూ\\n• వృద్ధ & నివారక సంరక్షణ\\n\\nకన్సల్టేషన్ బుక్ చేయాలా?",
    bookConfirm:
      "✅ *అపాయింట్మెంట్ అభ్యర్థన అందింది*\\n\\nమా బృందం త్వరలో WhatsApp లో నిర్ధారిస్తుంది.\\n\\n🕘 సోమ–శని: ఉ. 9 – రా. 8 · నేరుగా రావచ్చు\\n🌐 ఆన్‌లైన్ బుక్: " +
      links.book,
    consultConfirm:
      "✅ *సంప్రదింపు అభ్యర్థన అందింది*\\n\\nడాక్టర్ నాగ సతీష్ కుమార్ కోటా (MD Internal Medicine) మీ అభ్యర్థనను పరిశీలిస్తారు.\\n\\n🌐 " +
      links.website,
    assessmentConfirm:
      "✅ *ఆరోగ్య పరీక్ష అభ్యర్థన అందింది*\\n\\nప్యాకేజీ వివరాలు త్వరలో పంపుతాము.\\n\\n🌐 " + links.website,
    bcaConfirm: "✅ *శరీర కూర్పు (BCA) అభ్యర్థన అందింది*\\n\\nమీ స్లాట్‌ను త్వరలో నిర్ధారిస్తాము.\\n\\n🌐 " + links.website,
    timings:
      "🕘 *పని గంటలు*\\nసోమ–శని: ఉ. 9 – రా. 8\\nనేరుగా రావచ్చు\\n\\n📍 *చిరునామా*\\nKVR Hospital, Main Road, LIC కార్యాలయం పక్కన\\nరామచంద్రపురం, తూర్పు గోదావరి 533255\\n\\n📞 " +
      links.phone +
      "\\n🌐 " +
      links.website +
      "\\n🗺️ " +
      links.maps,
    fever:
      "🌡️ *జ్వరం / టైఫాయిడ్ / డెంగూ సంరక్షణ*\\n\\nKVR Hospital లో ఆధారిత చికిత్స — ప్రతి టైఫాయిడ్‌కు ఇంజెక్షన్ అవసరం లేదు; ప్రతి డెంగూ‌కు platelet అవసరం లేదు.\\n\\nలక్షణాలు ఇక్కడ పంపండi లేదా నేరుగా రండi.\\n\\n📞 " +
      links.phone +
      "\\n🗺️ " +
      links.directions,
    talk:
      "💬 *సంరక్షణ బృందం*\\n\\nధన్యవాదాలు — మా బృందం త్వరలో సమాధానం ఇస్తుంది.\\n\\nమమ్మల్నi కాల్ చేయవచ్చu:\\n📞 " +
      links.phone +
      "\\n🌐 " +
      links.website,
    medicineConfirm:
      "💊 *మందుల ఇంటికే అందింపు*\\n\\nమందulos prescription ఫhotoo"`;
