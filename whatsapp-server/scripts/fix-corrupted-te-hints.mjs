import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(p, "utf8");

const teStart = s.indexOf("  te: {");

s = s.replace(
  /pickConcernHint: "ద[^"]*ukko[^"]*",/,
  `pickConcernHint: "${"\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C15\u0C4D\u0C30\u0C3F\u0C02\u0C26 *🩺 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F* \u0C28\u0C02\u0C2A\u0C02\u0C21\u0C3F, \u0C2E\u0C46\u0C28\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C0F\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F."}",`,
);

s = s.replace(
  /pickDateHint: "ద[^"]*(ukko|సిరిసు|ఆయించ)[^"]*",/,
  `pickDateHint: "${"\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C15\u0C4D\u0C30\u0C3F\u0C02\u0C06 *📅 \u0C24\u0C47\u0C26\u0C40 \u0C06\u0C2F\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F* \u0C28\u0C02\u0C2A\u0C02\u0C21\u0C3F, \u0C06 \u0C38\u0C3F\u0C30\u0C3F\u0C38\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C24\u0C47\u0C26\u0C40 \u0C0F\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F."}",`.replace(
    "\u0C06 *📅",
    "\u0C06 *📅",
  ),
);

// fix typo 0C06 in pickDate - use 0C26
s = s.replace(
  /pickDateHint: "ద[^"]+",/,
  `pickDateHint: "${"\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C15\u0C4D\u0C30\u0C3F\u0C02\u0C26 *📅 \u0C24\u0C47\u0C26\u0C40 \u0C06\u0C2F\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F* \u0C28\u0C02\u0C2A\u0C02\u0C21\u0C3F, \u0C06 \u0C38\u0C3F\u0C30\u0C3F\u0C38\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C24\u0C47\u0C26\u0C40 \u0C0F\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F."}",`,
);

const ask =
  "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C38\u0C4D\u0C2A\u0C37\u0C4D\u0C1F\u0C2E\u0C48\u0C28 *prescription \u0C07\u0C1F\u0C4D\u0C1C\u0C2A\u0C1F\u0C3F\u0C02\u0C1A\u0C41* \u0C08 WhatsApp chat \u0C32\u0C4B \u0C1A\u0C3F\u0C24\u0C4D\u0C30\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1A\u0C02\u0C21\u0C3F.\\n\\nsample collection \u0C15\u0C47\u0C38\u0C47 lab requisition \u0C07\u0C1F\u0C4D\u0C1C\u0C2A\u0C1F\u0C3F \u0C15\u0C41\u0C21\u0C3E \u0C38\u0C30\u0C47\u0C26\u0C47.";

const apTe = s.indexOf("askPrescription:", teStart);
const before = s.slice(0, apTe);
const after = s.slice(s.indexOf('",', apTe) + 2);
s = before + `askPrescription:\n        "${ask}",` + after;

fs.writeFileSync(p, s);
console.log("fixed");
