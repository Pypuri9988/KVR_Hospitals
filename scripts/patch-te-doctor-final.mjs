import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/i18n/siteContent.ts");
let s = fs.readFileSync(p, "utf8");

const teStart = s.indexOf("  te: {");
const docStart = s.indexOf("    doctor: {", teStart);
const docEnd = s.indexOf("    whyUs: {", docStart);

const p1 =
  "\u0C21\u0C3E\u0C15\u0C4D\u0C1F\u0C30\u0C4D \u0C28\u0C3E\u0C17 \u0C38\u0C24\u0C40\u0C37\u0C4D \u0C15\u0C41\u0C2E\u0C3E\u0C30\u0C4D \u0C15\u0C4B\u0C1F \u0C17\u0C3E\u0C30\u0C41 Indian Armed Forces Medical Services (AFMS) \u0C05\u0C27\u0C40\u0C28\u0C02\u0C2B\u0C4D\u0C35\u0C46\u0C24, \u0C2E\u0C41\u0C02\u0C2C\u0C48 \u0C32\u0C4B\u0C28\u0C3F INHS Asvini \u0C35\u0C26\u0C4D\u0C26 General Medicine \u0C32\u0C4B postgraduate \u0C36\u0C3F\u0C15\u0C4D\u0C37\u0C23 \u0C38\u0C02\u0C2A\u0C3E\u0C26\u0C02\u0C1A\u0C3E\u0C30\u0C41.";
const p2 =
  "Cardiology, Neurology, Nephrology, Oncology, Gastroenterology, Rheumatology \u0C2E\u0C30\u0C3F\u0C2F\u0C41 Critical Care Medicine \u0C35\u0C3F\u0C2D\u0C3E\u0C17\u0C3E\u0C32\u0C32\u0C4B \u0C35\u0C3F\u0C38\u0C4D\u0C24\u0C43\u0C24 \u0C15\u0C4D\u0C32\u0C3F\u0C28\u0C3F\u0C15\u0C2E\u0C4D \u0C05\u0C28\u0C41\u0C2D\u0C35\u0C02 \u0C32\u0C2D\u0C3F\u0C02\u0C1A\u0C3F\u0C02\u0C26\u0C3F.";
const p3 =
  "\u0C38\u0C30\u0C48\u0C28 \u0C28\u0C3F\u0C27\u0C3E\u0C28\u0C02, evidence-based \u0C1A\u0C3F\u0C15\u0C3F\u0C24\u0C4D\u0C38, \u0C05\u0C02\u0C24\u0C30\u0C02\u0C17\u0C24 \u0C30\u0C4B\u0C17\u0C3F \u0C38\u0C02\u0C06\u0C32\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C3F \u0C15\u0C32\u0C3F\u0C37\u0C2A\u0C41\u0C2C\u0C41\u0C32 \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C3F\u0C15\u0C30\u0C23 \u2014 \u0C06\u0C2F\u0C28 \u0C2A\u0C26\u0C4D\u0C27\u0C24\u0C3F\u0C32\u0C4B \u0C07\u0C35\u0C3F \u0C2A\u0C4D\u0C30\u0C27\u0C3E\u0C28\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.";

const doctorBlock = `    doctor: {
      label: "\u0C21\u0C3E\u0C15\u0C4D\u0C1F\u0C30\u0C4D \u0C17\u0C41\u0C30\u0C02\u0C1A\u0C3F",
      title: "Dr. Naga Satish Kumar Kota",
      specialty: "MD (General Medicine) | Consultant Physician",
      bio:
        "${p1}\\n\\n" +
        "${p2}\\n\\n" +
        "${p3}",
      interests: [
        "\u0C38\u0C30\u0C48\u0C28 \u0C28\u0C3F\u0C27\u0C3E\u0C28\u0C02",
        "Evidence-based \u0C1A\u0C3F\u0C15\u0C3F\u0C24\u0C4D\u0C38",
        "\u0C05\u0C02\u0C24\u0C30\u0C02\u0C17\u0C24 \u0C30\u0C4B\u0C17\u0C3F \u0C38\u0C02\u0C06\u0C32\u0C02",
        "\u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C3F \u0C15\u0C32\u0C3F\u0C37\u0C2A\u0C41\u0C2C\u0C41\u0C32 \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C3F\u0C15\u0C30\u0C23",
      ],
      cred1: "Post graduation",
      cred2: "General Medicine",
      cred3: "INHS Asvini",
      book: "\u0C15\u0C28\u0C4D\u0C38\u0C32\u0C4D\u0C1F\u0C47\u0C37\u0C02 \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    },
`;

s = s.slice(0, docStart) + doctorBlock + s.slice(docEnd);
fs.writeFileSync(p, s);
console.log("ok");
