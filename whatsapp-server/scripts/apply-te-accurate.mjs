import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const messagesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(messagesPath, "utf8");

const S = {
  enNoHome:
    "We do not offer home visits. Please *book a consultation* or choose *home sample pickup* from the menu.\\n\\n📞 ",
  teNoHome:
    "\u0C07\u0C02\u0C1F\u0C3F \u0C35\u0C48\u0C26\u0C4D\u0C2F \u0C38\u0C02\u0C26\u0C30\u0C4D\u0C36\u0C28 \u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41\u0C32\u0C4B \u0C32\u0C47\u0C26\u0C41. Consultation book \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E, \u0C2E\u0C40 \u0C07\u0C02\u0C1F\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C3F sample collection \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.\\n\\n📞 ",
  teSampleLastLine:
    "\u0C2E\u0C3E \u0C2C\u0C43\u0C02\u0C26\u0C02 \u0C2E\u0C40 \u0C07\u0C02\u0C1F\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C3F sample collection \u0C0F\u0C30\u0C4D\u0C2A\u0C3E\u0C1F\u0C41 \u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
  pickConcernHint:
    "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C15\u0C4D\u0C30\u0C3F\u0C02\u0C26 *🩺 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F* \u0C28\u0C02\u0C2A\u0C02\u0C21\u0C3F, \u0C2E\u0C46\u0C28\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C0F\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.",
  pickDateHint:
    "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C15\u0C4D\u0C30\u0C3F\u0C02\u0C26 *📅 \u0C24\u0C47\u0C26\u0C40 \u0C06\u0C2F\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F* \u0C28\u0C02\u0C2A\u0C02\u0C21\u0C3F, \u0C06 \u0C38\u0C3F\u0C30\u0C3F\u0C38\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C24\u0C47\u0C26\u0C40 \u0C0F\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.",
  askPrescription:
    "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C38\u0C4D\u0C2A\u0C37\u0C4D\u0C1F\u0C2E\u0C48\u0C28 *prescription \u0C07\u0C1F\u0C4D\u0C1C\u0C2A\u0C1F\u0C3F\u0C02\u0C1A\u0C41* \u0C08 WhatsApp chat \u0C32\u0C4B \u0C1A\u0C3F\u0C24\u0C4D\u0C30\u0C02\u0C17\u0C3E \u0C2E\u0C2F\u0C02\u0C2A\u0C02\u0C21\u0C3F.\\n\\nsample collection \u0C15\u0C47\u0C38\u0C47 lab requisition \u0C07\u0C1F\u0C4D\u0C1C\u0C2A\u0C1F\u0C3F \u0C15\u0C41\u0C21\u0C3E \u0C38\u0C30\u0C47\u0C26\u0C28\u0C47.",
  medicineMenuDesc:
    "Prescription \u0C06\u0C27\u0C3E\u0C30\u0C02\u0C17\u0C3E \u0C2E\u0C02\u0C26\u0C41\u0C32\u0C41 order \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
};

// English noHomeVisit
s = s.replace(
  /(  en: \{[\s\S]*?noHomeVisit:\s*\n      ")[^"]+("\s*\+\s*\n      links\.phone,\s*\n    registerPrompt:\s*\n      "📝 \*New patient registration\*)/,
  `$1${S.enNoHome}$2`,
);

// Telugu noHomeVisit (te block)
const teStart = s.indexOf("  te: {");
const nhTe = s.indexOf("noHomeVisit:", teStart);
s =
  s.slice(0, nhTe + "noHomeVisit:\n      ".length) +
  `"${S.teNoHome}" +` +
  s.slice(s.indexOf("\n      links.phone,", nhTe));

// sampleConfirm last sentence
s = s.replace(
  "మా బృందం sample pickup ఏర్పాటు చేస్తుంది.",
  S.teSampleLastLine,
);

// booking hints
s = s.replace(/pickConcernHint: "ద[^"]+",/, `pickConcernHint: "${S.pickConcernHint}",`);
s = s.replace(/pickDateHint: "ద[^"]+",/, `pickDateHint: "${S.pickDateHint}",`);

// service askPrescription (te block only — after teStart)
const apTe = s.indexOf("askPrescription:", teStart);
const apEnd = s.indexOf('",', apTe) + 2;
s = s.slice(0, apTe) + `askPrescription:\n        "${S.askPrescription}",` + s.slice(apEnd);

// medicine menu description
s = s.replace(
  /description: "Prescription [^"]+"/,
  `description: "${S.medicineMenuDesc}"`,
);

const concernsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/concerns.js");
let c = fs.readFileSync(concernsPath, "utf8");
c = c.replace("ఇతర / సాధారణ కన్సల్టేషన్", "సాధారణ కన్సల్టేషన్");
fs.writeFileSync(concernsPath, c);

fs.writeFileSync(messagesPath, s);
console.log("Telugu copy updated");
