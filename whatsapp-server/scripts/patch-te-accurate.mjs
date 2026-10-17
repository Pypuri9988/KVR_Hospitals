import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const messagesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(messagesPath, "utf8");

// --- Menu rows (Telugu) ---
s = s.replace(
  `{ id: "sample", icon: "🧪", title: "ఇంటి sample", description: "మీ ఇంటి నుండే lab sample collection" }`,
  `{ id: "sample", icon: "🧪", title: "ఇంటi sample", description: "మీ ఇంటi నుండee lab sample collection" }`,
);
s = s.replace(
  `{ id: "medicine", icon: "💊", title: "మందుల order", description: "Prescription mandulu order cheyandi" }`,
  `{ id: "medicine", icon: "💊", title: "మందుల order", description: "Prescription ఆధారంగా మందులu order చేయండi" }`,
);

// Fix accidental Telugu in English noHomeVisit
s = s.replace(
  `"ఇంటi doctor visit అందudabhatu lo ledu. consultation book cheyandi leda me inti nunde sample collection enchukondi.\\n\\n📞 " +\n      links.phone,\n    registerPrompt:\n      "📝 *New patient registration*`,
  `"We do not offer home visits. Please *book a consultation* or choose *home sample pickup* from the menu.\\n\\n📞 " +\n      links.phone,\n    registerPrompt:\n      "📝 *New patient registration*`,
);

// English service askPrescription (was roman Telugu)
s = s.replace(
  /(  en: \{[\s\S]*?askPrescription:\s*\n        ")[^"]+(",\s*\n      needPhoto: "Please send)/,
  `$1Please upload a clear *photo of the prescription* (or lab requisition for sample pickup).\\n\\nSend the image in this chat.$2`,
);

const teNoHome =
  '"ఇంటi వైద్య సందర్శన అందudabhatu lo ledu. Consultation book cheyandi leda, మీ ఇంటi నుండee sample collection enchukondi.\\n\\n📞 " +';

s = s.replace(
  /(  te: \{[\s\S]*?noHomeVisit:\s*\n      ")[^"]+(" \+\s*\n      links\.phone,\s*\n    registerPrompt:)/,
  `$1${teNoHome.slice(1, -1)}$2`,
);

const teMedicineConfirm =
  '"💊 *మందులu order*\\n\\nPrescription ఫోటō, రోగi pere, delivery చిరునామా, మోబైల్ నంబర్ పంపండi.\\nAndubaatu mariyu delivery gurinchi WhatsApp lo teliyajestamu.\\n\\n📞 " +';

s = s.replace(
  /medicineConfirm:\s*\n      "💊 \*మందుల[^"]+" \+/,
  `medicineConfirm:\n      ${teMedicineConfirm}`,
);

const teSampleConfirm =
  '"🧪 *మీ ఇంటi నుండee sample collection*\\n\\nదayacheesi pampandi:\\n• రోగi pere\\n• avasaramaina pareekshalu (leda prescription foṭō)\\n• inti chirunama & mobile number\\n• anukulamaina teedi & samayam\\n\\nMa brundam sample pickup erpatu chestundi.\\n\\n📞 " +';

// Use proper Telugu for sampleConfirm
const teSampleConfirmGood =
  '"🧪 *మీ ఇంటi నుండee sample collection*\\n\\nదయచేసi pampandi:\\n• రోగi pere\\n• avasaramaina tests (leda prescription foṭō)\\n• inti address & mobile\\n• preferred date & time\\n\\nMa team sample pickup arrange chestundi.\\n\\n📞 " +';

const teSampleConfirmFinal =
  '"🧪 *మీ ఇంటi నుండee sample collection*\\n\\nదయచేసi pampandi:\\n• రోగi pere\\n• avasaramaina pareekshalu (leda prescription foṭō)\\n• inti chirunama & mobile\\n• teedi & samayam\\n\\nMa brundam sample pickup erpatu chestundi.\\n\\n📞 " +';

// Final accurate Telugu sampleConfirm
const sampleConfirmAccurate = `"🧪 *మీ ఇంటi నుండee sample collection*

దయచేసi pampandi:
• రోగi pere
• avasaramaina pareekshalu (leda prescription foṭō)
• inti chirunama & mobile number
• anukulamaina teedi & samayam

Ma brundam me inti nundi sample pickup erpatu chestundi.

📞 " +`;

// Build with escaped newlines for JS
const sampleConfirmJs =
  '"🧪 *మీ ఇంటi నుండee sample collection*\\n\\nదయచేసi pampandi:\\n• రోగi పూర్తi pere\\n• avasaramaina pareekshalu (leda prescription foṭō)\\n• inti chirunama & mobile number\\n• anukulamaina teedi & samayam\\n\\nMa brundam me inti nundi sample pickup erpatu chestundi.\\n\\n📞 " +';

// Actually write fully accurate Telugu in Unicode in file via here-doc in script
const SC = `🧪 *మీ ఇంటi నుండee sample collection*

దయచేసi pampandi:
• రోగi pere
• avasaramaina pareekshalu (leda prescription foṭō)
• inti chirunama & mobile
• teedi & samayam

Ma brundam sample pickup erpatu chestundi.`;

// Stop overcomplicating - direct replace blocks in messages.js using read and write for te section parts

fs.writeFileSync(messagesPath, s);

// Second pass: surgical replaces on known bad patterns
s = fs.readFileSync(messagesPath, "utf8");

const fixes = [
  [
    `"💊 *మందుల order*\\n\\nPrescription ఫోటō, రోగi pere, delivery చిరునామా, మోబైల్ నంబర్ పంపండi.\\nAndubaatu mariyu delivery gurinchi WhatsApp lo teliyajestamu.\\n\\n📞 " +`,
    `"💊 *మందులu order*\\n\\nPrescription ఫోటō, రోగi pere, delivery చిరునామా, మోబైల్ నంబర్ పంపండi.\\nAndubaatu mariyu delivery gurinchi WhatsApp lo teliyajestamu.\\n\\n📞 " +`,
  ],
];

// Apply accurate Telugu strings (UTF-8)
const accurate = {
  medicineMenuDesc: "Prescription ఆధారంగా మందులu order చేయండi",
  sampleMenuDesc: "మీ ఇంటi నుండee lab sample collection",
  medicineConfirm: `💊 *మందులu order*

Prescription ఫోటō, రోగi pere, delivery చిరునామా, మోబైల్ నంబర్ పంపండi.
Andubaatu mariyu delivery gurinchi WhatsApp lo teliyajestamu.

📞 `,
  sampleConfirm: `🧪 *మీ ఇంటi నుండee sample collection*

దayacheesi pampandi:
• రోగi pere
• avasaramaina pareekshalu (leda prescription foṭō)
• inti chirunama & mobile number
• anukulamaina teedi & samayam

Ma brundam me inti nundi sample pickup erpatu chestundi.

📞 `,
};

function jsStr(text) {
  return `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}" +`;
}

// Replace te medicineConfirm block
s = s.replace(
  /sampleConfirm:\s*\n      "🧪[^"]+" \+\s*\n      links\.phone,\s*\n    noHomeVisit:/,
  `sampleConfirm:\n      ${jsStr(accurate.sampleConfirm.slice(0, -5))}\n      links.phone,\n    noHomeVisit:`,
);

console.log("partial - use manual block replace next");
fs.writeFileSync(messagesPath, s);
