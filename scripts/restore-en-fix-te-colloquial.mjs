import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const translationsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/i18n/translations.ts");
let ts = fs.readFileSync(translationsPath, "utf8");

// Restore English wa block (sample/medicine)
ts = ts.replace(
  /(  en: \{\s*wa: \{[\s\S]*?consultMsg:\s*\n\s*"Hello, I would like to book a consultation with Dr. Naga Satish Kumar Kota at KVR Hospital.",)\s*sample:[\s\S]*?waBar: "Chat on WhatsApp",/,
  `$1
      sample: "Home sample pickup",
      sampleSub: "Lab sample collection at home",
      sampleMsg:
        "Hello KVR Hospital, I would like home sample collection. Patient name, tests needed, address and preferred time are below.",
      medicine: "Medicine delivery",
      medicineSub: "Prescription medicines to home",
      medicineMsg:
        "Hello KVR Hospital, I would like medicine delivery at home. Please find my prescription details below.",
      bot: "Talk to KVR Care",
      botSub: "AI care assistant",
      waBar: "Chat on WhatsApp",`,
);

// Restore English replies sample + noHomeVisit
ts = ts.replace(
  /(      consult: \{[\s\S]*?      \},)\s*sample: \{[\s\S]*?      \},\s*noHomeVisit: \{[\s\S]*?      \},\s*(      assessment: \{)/,
  `$1
      sample: {
        text: "Home sample collection — share patient name, tests needed, address and preferred time on WhatsApp.",
        actions: [{ label: "Request sample pickup", waMsg: "Home sample collection request at KVR Hospital." }],
      },
      noHomeVisit: {
        text: "Home doctor visits are not available. Please book a consultation at the hospital or request home sample pickup.",
        actions: [
          { label: "Consultation", waMsg: "Book a consultation with Dr. Naga Satish Kumar Kota at KVR Hospital." },
          { label: "Sample pickup", waMsg: "Home sample collection request at KVR Hospital." },
        ],
      },
      $2`,
);

// Telugu wa — colloquial (only te block: after "  te: {")
const teWaSampleMed = `      sample: "ఇంటి sample collection",
      sampleSub: "మీ ఇంటి నుండే lab sample collection",
      sampleMsg:
        "నమస్కారం KVR Hospital, me inti nunde sample collection kavali. patient name, tests, address, time kindha pampistunnanu.",
      medicine: "మందుల order",
      medicineSub: "Prescription మందులu order cheyandi",
      medicineMsg:
        "నమస్కారం KVR Hospital, mandulu order kavali. prescription details kindha pampistunnanu.",`;

const teIdx = ts.indexOf("  te: {");
const enEnd = ts.indexOf("  te: {");
const waTeStart = ts.indexOf("    wa: {", teIdx);
const consultMsgTe = ts.indexOf('consultMsg:\n        "నమస్కారం, Dr.', waTeStart);
const botTe = ts.indexOf("    bot: {", consultMsgTe);
const beforeWa = ts.slice(0, consultMsgTe);
const afterBot = ts.slice(botTe);
const consultTail = ts.slice(consultMsgTe, botTe).split("\n").slice(0, 3).join("\n") + "\n";
ts = beforeWa + consultTail + teWaSampleMed + "\n" + afterBot.replace(/^\s*sample:[\s\S]*?medicineMsg:[\s\S]*?\n/, "");

// Simpler: replace te wa sample/medicine lines only within te section
const tePart = ts.slice(teIdx);
const teFixed = tePart.replace(
  /sample: "ఇంటి sample collection",[\s\S]*?medicineMsg:\s*\n\s*"[^"]+",/,
  teWaSampleMed,
);
ts = ts.slice(0, teIdx) + teFixed;

// Telugu replies sample + noHomeVisit (second occurrence of sample block in te.replies)
const teRepliesSample = `      sample: {
        text: "మీ ఇంటి నుండే sample collection — patient name, tests, address, time WhatsApp lo pampandi.",
        actions: [{ label: "Sample collection", waMsg: "KVR Hospital — me inti nunde sample collection kavali." }],
      },
      noHomeVisit: {
        text: "ఇంటి doctor visit అందుబాటులో లేదు. consultation book cheyandi leda me inti nunde sample collection enchukondi.",
        actions: [
          { label: "Consultation", waMsg: "Dr. Naga Satish Kumar Kota consultation book cheyali" },
          { label: "Sample collection", waMsg: "KVR Hospital — me inti nunde sample collection" },
        ],
      },`;

const teRepliesIdx = ts.indexOf("    replies: {", teIdx);
const teSampleReplyIdx = ts.indexOf("      sample: {", teRepliesIdx);
const teAssessmentIdx = ts.indexOf("      assessment: {", teSampleReplyIdx);
ts = ts.slice(0, teSampleReplyIdx) + teRepliesSample + "\n" + ts.slice(teAssessmentIdx);

// Telugu bot medicine reply
ts = ts.replace(
  /(  te: [\s\S]*?      medicine: \{\s*)text: "[^"]+",(\s*actions: \[\{ label: "[^"]+", waMsg: "[^"]+" \}\],)/,
  `$1text: "మందుల order — prescription photo & delivery address WhatsApp lo pampandi.",$2`,
);

fs.writeFileSync(translationsPath, ts);

// messages.js te noHomeVisit + askPrescription
const messagesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../whatsapp-server/src/messages.js");
let js = fs.readFileSync(messagesPath, "utf8");
const teCopyIdx = js.indexOf("  te: {");
const noHomeIdx = js.indexOf("    noHomeVisit:", teCopyIdx);
const noHomeEnd = js.indexOf("\n      links.phone,", noHomeIdx);
js =
  js.slice(0, noHomeIdx) +
  `    noHomeVisit:
      "ఇంటి doctor visit అందుబాటudlo ledu. consultation book cheyandi leda me inti nunde sample collection enchukondi.\\n\\n📞 " +
      links.phone,` +
  js.slice(noHomeEnd + "\n      links.phone,".length);

js = js.replace(
  /askPrescription:\s*\n        "[^"]+",/,
  `askPrescription:
        "clear *prescription photo* upload cheyandi.\\n\\nsample collection kosam lab requisition photo aina saripothundi.\\n\\nee WhatsApp chat lo image pampandi.",`,
);

fs.writeFileSync(messagesPath, js);
console.log("ok");
