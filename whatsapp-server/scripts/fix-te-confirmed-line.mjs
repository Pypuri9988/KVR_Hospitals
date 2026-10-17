import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const messagesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(messagesPath, "utf8");

const contactTail =
  "\u0C24\u0C4D\u0C35\u0C30\u0C32\u0C4B WhatsApp \u0C32\u0C4B \u0C2E\u0C3F\u0C2E\u0C4D\u0C2E\u0C32\u0C4D\u0C28\u0C3F \u0C38\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2E\u0C41.";

s = s.replace(/త్వరలో WhatsApp లో మ[^\n]+సంప[^\n]+\./, contactTail);

const confirmHint =
  'confirmHint: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F *\u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F* \u0C32\u0C47\u0C26\u0C3E *\u0C30\u0C26\u0C4D\u0C26\u0C41* \u0C28\u0C02\u0C15\u0C02\u0C21\u0C3F.",';

s = s.replace(/confirmHint: "దయచేసి \*నిర్ధారించండి\* లేదా \*రద్దు\* [^"]+",/, confirmHint);

fs.writeFileSync(messagesPath, s);
console.log("fixed");
