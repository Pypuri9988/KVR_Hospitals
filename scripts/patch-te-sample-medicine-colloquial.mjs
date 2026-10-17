import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const L = {
  sampleText:
    "\u0C2E\u0C40 \u0C07\u0C02\u0C1F\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C47 sample collection \u2014 patient name, tests, address, time WhatsApp \u0C32\u0C4B \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  sampleWa: "KVR Hospital \u2014 me inti nunde sample collection kavali.",
  noHomeText:
    "\u0C07\u0C02\u0C1F\u0C3F doctor visit \u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41\u0C32\u0C4B \u0C32\u0C47\u0C26\u0C41. consultation book cheyandi leda me inti nunde sample collection enchukondi.",
  medText:
    "\u0C2E\u0C02\u0C26\u0C41\u0C2E\u0C41 order \u2014 prescription photo & delivery address WhatsApp \u0C32\u0C4B \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  medWa: "KVR Hospital \u2014 mandulu order cheyali",
  sampleMsg:
    "\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 KVR Hospital, me inti nunde sample collection kavali. patient name, tests, address, time kindha pampistunnanu.",
  medSub: "Prescription \u0C2E\u0C02\u0C26\u0C41\u0C32\u0C41 \u2014 order cheyandi",
  medMsg:
    "\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 KVR Hospital, mandulu order kavali. prescription details kindha pampistunnanu.",
  medDesc: "Prescription \u0C2E\u0C02\u0C26\u0C41\u0C2E\u0C41 \u2014 order cheyandi",
  noHomeWa:
    "\u0C07\u0C02\u0C1F\u0C3F doctor visit \u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41\u0C32\u0C4B \u0C32\u0C47\u0C26\u0C41. consultation book cheyandi leda me inti nunde sample collection enchukondi.\\n\\n\uD83D\uDCDE ",
  askRx:
    "clear *prescription photo* upload cheyandi.\\n\\nsample collection kosam lab requisition photo aina saripothundi.\\n\\nee WhatsApp chat lo image pampandi.",
};

const translationsPath = path.join(root, "src/i18n/translations.ts");
let ts = fs.readFileSync(translationsPath, "utf8");

ts = ts.replace(/      sample: \{[\s\S]*?      \},(?=\s*noHomeVisit:)/, `      sample: {
        text: "${L.sampleText}",
        actions: [{ label: "Sample collection", waMsg: "${L.sampleWa}" }],
      },
`);
ts = ts.replace(/      noHomeVisit: \{[\s\S]*?      \},(?=\s*assessment:)/, `      noHomeVisit: {
        text: "${L.noHomeText}",
        actions: [
          { label: "Consultation", waMsg: "Dr. Naga Satish Kumar Kota consultation book cheyali" },
          { label: "Sample collection", waMsg: "KVR Hospital — me inti nunde sample collection" },
        ],
      },
`);
ts = ts.replace(/      medicine: \{[\s\S]*?      \},(?=\s*callback:)/, `      medicine: {
        text: "${L.medText}",
        actions: [{ label: "\u0C2E\u0C02\u0C26\u0C41\u0C2E\u0C41 order", waMsg: "${L.medWa}" }],
      },
`);

ts = ts.replace(/sampleSub: "[^"]+"/, `sampleSub: "\u0C2E\u0C40 \u0C07\u0C02\u0C1F\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C47 lab sample collection"`);
ts = ts.replace(/sample: "[^"]+",/, `sample: "\u0C07\u0C02\u0C1F\u0C3F sample collection",`);
ts = ts.replace(/sampleMsg:\s*\n\s*"[^"]+"/, `sampleMsg:\n        "${L.sampleMsg}"`);
ts = ts.replace(/medicineSub: "[^"]+"/, `medicineSub: "${L.medSub}"`);
ts = ts.replace(/medicineMsg:\s*\n\s*"[^"]+"/, `medicineMsg:\n        "${L.medMsg}"`);
ts = ts.replace(/medicine: "[^"]+",/, `medicine: "\u0C2E\u0C02\u0C26\u0C41\u0C2E\u0C41 order",`);

fs.writeFileSync(translationsPath, ts);

const messagesPath = path.join(root, "whatsapp-server/src/messages.js");
let js = fs.readFileSync(messagesPath, "utf8");

js = js.replace(/description: "Prescription మందుల[^"]+"/, `description: "${L.medDesc}"`);
js = js.replace(/noHomeVisit:\s*\n      "[^"]+" \+/, `noHomeVisit:\n      "${L.noHomeWa}" +`);
js = js.replace(/askPrescription:\s*\n        "[^"]+",/, `askPrescription:\n        "${L.askRx}",`);

fs.writeFileSync(messagesPath, js);
console.log("done");
