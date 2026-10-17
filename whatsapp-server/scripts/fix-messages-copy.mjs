import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../src/messages.js");
let s = fs.readFileSync(file, "utf8");

const te = {
  langPicker:
    "KVR Hospital \u0C15\u0C41 \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02 \uD83C\uDFE5\n\n\u0C30\u0C3E\u0C2E\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C2A\u0C41\u0C30\u0C02 \u00B7 \u0C21\u0C3E\u0C15\u0C4D\u0C1F\u0C30\u0C4D \u0C28\u0C3E\u0C17 \u0C38\u0C24\u0C40\u0C37\u0C4D \u0C15\u0C41\u0C2E\u0C3E\u0C30\u0C4D \u0C15\u0C4B\u0C1F\u0C3E \u0C17\u0CBE\u0C30\u0C3F \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C39\u0C3F\u0C23\u0C32\u0C4B \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C15 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C02\u0C30\u0C15\u0C4D\u0C37\u0C23\n\n\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C2F\u0C3F \u0C2E\u0C40 \u0C2D\u0C3E\u0C37\u0C28\u0C41 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F:",
  menuIntro:
    "*KVR Hospital* \uD83C\uDFE5 \u0C15\u0C41 \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02\n\n\u0C30\u0C3E\u0C2E\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C2A\u0C41\u0C30\u0C02 \u00B7 \u0C21\u0C3E\u0C15\u0C4D\u0C1F\u0C30\u0C4D \u0C28\u0C3E\u0C17 \u0C38\u0C24\u0C40\u0C37\u0C4D \u0C15\u0C41\u0C2E\u0C3E\u0C30\u0C4D \u0C15\u0C4B\u0C1F\u0C3E\n\n\u0C15\u0C4D\u0C30\u0C02\u0C26 * \u0C38\u0C47\u0C35\u0C32 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E * \u0C28\u0C41 \u0C28\u0C2C\u0C21\u0C24\u0C3F, \u0C1A\u0C3F\u0C39\u0C4D\u0C28\u0C02 \u0C09\u0C28\u0C4D\u0C28 \u0C2E\u0C40 \u0C38\u0C47\u0C35\u0C28\u0C41 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.",
  menuListButton: "\u0C38\u0C47\u0C35\u0C32 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E",
  menuSectionAll: "\u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C38\u0C47\u0C35\u0C32\u0C41",
  hubQuickIntro: "\u0C2E\u0C40\u0C15\u0C41 \u0C08 \u0C30\u0C4B\u0C1C\u0C41 \u0C0E\u0C32\u0C3E \u0C38\u0C39\u0C3E\u0C2F\u0C02 \u0C1A\u0C47\u0C2F\u0C17\u0C32\u0C02?",
  listFooterHint: "\u0C0E\u0C02\u0C1A\u0C3F\u0C15 \u0C15\u0C4B\u0C38\u0C02 \u0C12\u0C15 \u0C38\u0C47\u0C35\u0C2A\u0C48 \u0C28\u0C2C\u0C21\u0C24\u0C3F.",
  chatWelcome:
    "\uD83D\uDCAC *KVR Hospital \u0C1A\u0C3E\u0C1F\u0C4D*\n\n\u0C2E\u0C40\u0C30\u0C41 \u0C2E\u0C3E \u0C38\u0C02\u0C30\u0C15\u0C4D\u0C37\u0C23 \u0C2C\u0C43\u0C02\u0C26\u0C02\u0C24\u0C4B \u0C05\u0C28\u0C41\u0C38\u0C02\u0C27\u0C3F\u0C02\u0C1A\u0C3E\u0C30\u0C41 \u2014 \u0C2E\u0C3E \u0C2C\u0C43\u0C02\u0C26\u0C02 \u0C07\u0C15\u0C4D\u0C15\u0C21\u0C47 \u0C35\u0C46\u0C02\u0C1F\u0C28\u0C47 \u0C38\u0C2E\u0C3E\u0C27\u0C3E\u0C28\u0C02 \u0C07\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.\n\n\u0C2E\u0C40 \u0C2A\u0C4D\u0C30\u0C36\u0C4D\u0C28 \u0C32\u0C47\u0C26\u0C3E \u0C05\u0C2D\u0C4D\u0C2F\u0C30\u0C25\u0C28\u0C28\u0C41 \u0C15\u0C4D\u0C30\u0C02\u0C26 \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  conditions:
    "\uD83E\uDE7A *\u0C2E\u0C47\u0C2E\u0C41 \u0C1A\u0C3F\u0C15\u0C3F\u0C24\u0C4D\u0C38 \u0C1A\u0C47\u0C38\u0C47 \u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C41\u0C32\u0C41*\n\n\u2022 \u0C2E\u0C27\u0C41\u0C2E\u0C47\u0C39\u0C02 & \u0C2A\u0C4D\u0C30\u0C40-\u0C21\u0C3E\u0C2F\u0C3E\u0C2C\u0C46\u0C1F\u0C3F\u0C38\u0C4D\n\u2022 \u0C30\u0C15\u0C4D\u0C24\u0C2A\u0C4B\u0C1F\u0C41 (BP)\n\u2022 \u0C0A\u0C2C\u0C15\u0C3E\u0C2F\u0C02 & \u0C1A\u0C2E\u0C41\u0C30\u0C41 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C02\n\u2022 \u0C15\u0CBE\u0C32\u0C47\u0C2F \u0C15\u0C4A\u0C33\u0C4D\u0C32\u0C41 & \u0C25\u0C48\u0C30\u0C3E\u0C2F\u0C3F\u0C21\u0C4D\n\u2022 \u0C1C\u0C4D\u0C35\u0C30\u0C02 / \u0C1F\u0C48\u0C2B\u0C3E\u0C2F\u0C3F\u0C21\u0C4D / \u0C21\u0C46\u0C02\u0C17\u0C42\n\u2022 \u0C35\u0C43\u0C26\u0C4D\u0C27 & \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C15 \u0C38\u0C02\u0C30\u0C15\u0C4D\u0C37\u0C23\n\n\u0C05\u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C2E\u0C46\u0C02\u0C1F\u0C4D \u0C05\u0C35\u0C38\u0C30\u0C02 \u0C05\u0C28\u0C41\u0C15\u0C4B\u0C23\u0C02 \u0C05\u0C35\u0C41\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3E?",
  default:
    "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C2F\u0C3F \u0C15\u0C4D\u0C30\u0C02\u0C26 \u0C38\u0C47\u0C35\u0C32 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E \u0C28\u0C41 \u0C28\u0C2B\u0C21\u0C24\u0C3F, \u0C05\u0C28\u0C28\u0C3F \u0C38\u0C47\u0C35\u0C32\u0C41 \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F.\n*menu* \u0C05\u0C28\u0C3F \u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C38\u0C3F\u0C24\u0C47 \u0C2E\u0C46\u0C28\u0C42 \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C35\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
  langChanged: "\u0C2D\u0C3E\u0C37 \u0C24\u0C46\u0C2C\u0C41\u0C17\u0C41\u0C15\u0C41 \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
  medicineBody:
    "\u0C2E\u0C02\u0C26\u0C41\u0C32\u0C41 \u0C05\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C41 \u0C30\u0C3E\u0C36\u0C3F \u0C2B\u0C4B\u0C1F\u0C4B, \u0C30\u0C4B\u0C17\u0C3F \u0C2A\u0C47\u0C30\u0C41, \u0C05\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C41 \u0C1A\u0C3F\u0C30\u0C41\u0C28\u0C3E\u0C2E\u0C3E, \u0C2E\u0C4B\u0C2C\u0C48\u0C32\u0C3F \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F.\n\u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C41 \u0C17\u0C41\u0C30\u0C3F\u0C02\u0C1A\u0C3F WhatsApp \u0C32\u0C4B \u0C24\u0C46\u0C32\u0C3F\u0C2F\u0C1C\u0C47\u0C38\u0C4D\u0C24\u0C3E\u0C2E\u0C41.",
  registerBody:
    "KVR Hospital \u0C15\u0C41 \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02! \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C2F\u0C3F \u0C07\u0C35\u0C3F \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F:\n\u2022 \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C2A\u0C47\u0C30\u0C41\n\u2022 \u0C35\u0C2F\u0C38\u0C4D\u0C38\u0C41\n\u2022 \u0C2E\u0C4B\u0C2C\u0C48\u0C32\u0C3F \u0C28\u0C02\u0C2C\u0C30\u0C4D\n\u2022 \u0C2A\u0C4D\u0C30\u0C27\u0C3E\u0C28 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F\n\n\u0C2E\u0C3E \u0C2C\u0C43\u0C02\u0C26\u0C02 \u0C28\u0C2E\u0C4D\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C38\u0C3F \u0C24\u0C4D\u0C35\u0C30\u0C32\u0C4B \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
  feverBody:
    "KVR Hospital \u0C32\u0C4B \u0C06\u0C27\u0C3E\u0C30\u0C3F\u0C24 \u0C1A\u0C3F\u0C15\u0C3F\u0C24\u0C4D\u0C38 \u2014 \u0C05\u0C28\u0C40 \u0C1F\u0C48\u0C2B\u0C3E\u0C2F\u0C3F\u0C21\u0C4D \u0C15\u0C47\u0C38\u0C41\u0C15\u0C41 \u0C07\u0C02\u0C1C\u0C15\u0C4D\u0C37\u0C28\u0C4D \u0C05\u0C35\u0C38\u0C30\u0C02 \u0C32\u0C47\u0C26\u0C41; \u0C05\u0C28\u0C40 \u0C21\u0C46\u0C02\u0C17\u0C42 \u0C15\u0C47\u0C38\u0C41\u0C15\u0C41 \u0C2A\u0C4D\u0C32\u0C47\u0C1F\u0C4D\u0C32\u0C46\u0C1F\u0C4D \u0C05\u0C35\u0C38\u0C30\u0C02 \u0C32\u0C47\u0C26\u0C41.\n\n\u0C32\u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C2E\u0C41 \u0C07\u0C15\u0C4D\u0C15\u0C21\u0C47 \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C28\u0C47\u0C30\u0C41\u0C17\u0C3E \u0C30\u0C02\u0C21\u0C3F.",
};

te.menuIntro = te.menuIntro.replace("* ", "*").replace(" *", "*");
te.langChanged = te.langChanged.replace("\u0C24\u0C46\u0C2C\u0C41", "\u0C24\u0C46\u0C32\u0C41");
te.default = te.default.replace("\u0C28\u0C2F\u0C2A\u0C21", "\u0C28\u0C2B\u0C21");
te.registerBody = te.registerBody.replace("\u0C28\u0C2E\u0C4D\u0C2E\u0C4B", "\u0C28\u0C2E\u0C4B");

// Fix broken English strings
s = s.replace(
  /medicineConfirm:\n      "💊 \*[^"]*[\s\S]*?links\.phone,/m,
  'medicineConfirm:\n      "💊 *Medicine delivery*\\n\\nPlease send prescription photo, patient name, delivery address & phone.\\nWe will confirm availability and delivery on WhatsApp.\\n\\n📞 " +\n      links.phone,',
);
s = s.replace(
  /registerPrompt:\n      "📝 \*[^"]*[\s\S]*?links\.phone,/m,
  'registerPrompt:\n      "📝 *New patient registration*\\n\\nWelcome to KVR Hospital! Please share:\\n• Full name\\n• Age\\n• Mobile number\\n• Main health concern\\n\\nOur team will register you and confirm shortly.\\n\\n📞 " +\n      links.phone,',
);

s = s.replace(
  /langPicker:\n      "KVR Hospital కు[\s\S]*?దయచేసి మీ భాషను ఎంచుకోండి\."/,
  'langPicker:\n      "Welcome to KVR Hospital 🏥\\n\\nRamachandrapuram · Preventive healthcare under Dr. Naga Satish Kumar Kota\\n\\nPlease choose your language:"',
);

s = s.replace(
  /chatWelcome:\n      "💬 \*KVR Hospital చాట్[\s\S]*?క్రింద పంపండి\."/,
  'chatWelcome:\n      "💬 *KVR Hospital chat*\\n\\nYou are connected to our care team — we will reply here shortly.\\n\\nSend your question or request below."',
);

const teBlock = `  te: {
    langPicker:
      ${JSON.stringify(te.langPicker)},
    menuIntro:
      ${JSON.stringify(te.menuIntro)},
    menuListButton: ${JSON.stringify(te.menuListButton)},
    menuSectionAll: ${JSON.stringify(te.menuSectionAll)},
    hubQuickIntro: ${JSON.stringify(te.hubQuickIntro)},
    listFooterHint: ${JSON.stringify(te.listFooterHint)},
    chatWelcome:
      ${JSON.stringify(te.chatWelcome)},
    conditions:
      ${JSON.stringify(te.conditions)},
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
      ${JSON.stringify("🌡️ *జ్వరం / టైఫాయిడ్ / డెంగూ సంరక్షణ*\n\n" + te.feverBody + "\n\n📞 ")} +
      links.phone +
      "\\n🗺️ " +
      links.directions,
    talk:
      "💬 *సంరక్షణ బృందం*\\n\\nధన్యవాదాలు — మా బృందం త్వరలో సమాధానం ఇస్తుంది.\\n\\nమమ్మల్ని కాల్ చేయవచ్చు:\\n📞 " +
      links.phone +
      "\\n🌐 " +
      links.website,
    medicineConfirm:
      ${JSON.stringify("💊 *మందుల ఇంటికే అందింపు*\n\n" + te.medicineBody + "\n\n📞 ")} +
      links.phone,
    registerPrompt:
      ${JSON.stringify("📝 *కొత్త రోగి నమోదు*\n\n" + te.registerBody + "\n\n📞 ")} +
      links.phone,
    default: ${JSON.stringify(te.default)},
    langChanged: ${JSON.stringify(te.langChanged)},
    doctorAlert: (name, phone, note) =>
      \`🔔 *కొత్త రోగి అభ్యర్థన*\\nపేరు: \${name || "WhatsApp user"}\\nఫోన్: \${phone || "-"}\\nవివరం: \${note || "-"}\nసమయం: \${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}\`,
    booking: {
      start: (type) =>
        \`📋 *\${type} బుకింగ్*\\n\\nదయచేసి ప్రతి ప్రశ్నకు WhatsApp లో సమాధానం ఇవ్వండి.\\nరద్దు చేయడానికి *menu* అని టైప్ చేయండి.\\n\\n*5 లో 1వ దశ*\\nమీ *ఇంటి పేరు* ఏమిటి?\`,
      askFirstName: "*5 లో 2వ దశ*\\nమీ *మొదటి పేరు* ఏమిటి?",
      askSymptoms: "*5 లో 3వ దశ*\\nమీ *లక్షణాలు* లేదా సందర్శన కారణం ఏమిటి?",
      askDate: "*5 లో 4వ దశ*\\nఏ *తేదీ*కి రావాలనుకుంటున్నారు?\\n(ఉదా: 10-09-2026 లేదా రేపు)",
      askTime: "*5 లో 5వ దశ*\\nఏ *సమయం* అనుకూలం?\\n(ఉదా: 10 AM, సాయంత్రం, నేరుగా రావడం)",
      invalidSurname: "దయచేసి సరైన ఇంటి పేరు నమోదు చేయండి (కనీసం 2 అక్షరాలు).",
      invalidFirstName: "దయచేసి సరైన పేరు నమోదు చేయండి (కనీసం 2 అక్షరాలు).",
      invalidSymptoms: "దయచేసి మీ లక్షణాలను కొద్దిగా వివరించండి.",
      pickDateHint: "దయచేసి క్రింద *📅 తేదీ ఎంచుకోండి* నొక్కి జాబితా నుండి తేదీ ఎంచుకోండి.",
      pickTimeHint: "దయచేసి క్రింద *🕘 సమయం ఎంచుకోండి* నొక్కి సమయం ఎంచుకోండి.",
      confirmReview: ({ type, fullName, symptoms, date, time, phone }) =>
        \`📋 *మీ బుకింగ్ వివరాలు*\\n\\n*రకం:* \${type}\\n*పేరు:* \${fullName}\\n*లక్షణాలు:* \${symptoms}\\n*తేదీ:* \${date}\\n*సమయం:* \${time}\\n*ఫోన్:* \${phone}\\n\\nబుకింగ్ నిర్ధారించాలా?\`,
      confirmYes: "✅ నిర్ధారించండి",
      confirmNo: "❌ రద్దు",
      confirmHint: "దయచేసి *నిర్ధారించండి* లేదా *రద్దు* నొక్కండి.",
      cancelled: "బుకింగ్ రద్దు చేయబడింది. మెనూ మళ్లీ:",
      done: "మా బృందం త్వరలో WhatsApp లో మీ స్లాట్ నిర్ధారిస్తుంది.\\n\\n🕘 సోమ–శని: ఉ. 9 – రా. 8 · నేరుగా రావచ్చు\\n📞 +91 94911 35557",
      summary: ({ type, fullName, symptoms, date, time, phone }) =>
        \`✅ *బుకింగ్ అందింది*\\n\\n*రకం:* \${type}\\n*పేరు:* \${fullName}\\n*లక్షణాలు:* \${symptoms}\\n*తేదీ:* \${date}\\n*సమయం:* \${time}\\n*ఫోన్:* \${phone}\\n\\nత్వరలో WhatsApp లో నిర్ధారిస్తాము.\`,
    },
  },`;

if (!/  te: \{/.test(s)) throw new Error("te block not found");
s = s.replace(/  te: \{[\s\S]*?  \},\n\};/, teBlock + "\n};");

fs.writeFileSync(file, s);
console.log("Fixed messages.js copy blocks.");
