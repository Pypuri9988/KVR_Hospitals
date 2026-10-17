import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const messagesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(messagesPath, "utf8");

const replacements = [
  ["మిమ్మల్నi", "మిమ్మల్న\u0C28\u0C3F"],
  ["సంప్రదిస్తamu", "\u0C38\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2E\u0C41"],
  ["అభ్యర్థన రద్దu చేయబడింది", "అభ్యర్థన \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F"],
  ["దయచేసi *నిర్ధారించండi* లేదా *రద్దu* నొక్కండi.", "దయచ\u0C47\u0C38\u0C3F *\u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F* \u0C32\u0C47\u0C26\u0C3E *\u0C30\u0C26\u0C4D\u0C26\u0C41* \u0C28\u0C02\u0C15\u0C02\u0C21\u0C3F."],
];

for (const [from, to] of replacements) {
  const n = (s.split(from).length - 1);
  s = s.split(from).join(to);
  if (n) console.log("replaced", from.slice(0, 20), "x", n);
}

// Fix confirmed line to use proper verb (match te.bcaConfirm style: నిర్ధారిస్తాము)
s = s.replace(
  /మీ prescription మరియు వివరాలు మా బృందానికి అందాయి\. త్వరలో WhatsApp లో మిమ్మల్న[^\.\n]+\./,
  "మీ prescription మరియు వివరాలు మా బృందానికి అందాయి. త్వరలో WhatsApp లో మిమ్మల్న\u0C28\u0C3F \u0C38\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2E\u0C41.",
);

fs.writeFileSync(messagesPath, s);
console.log("done");
