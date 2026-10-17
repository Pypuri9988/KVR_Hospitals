import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(file, "utf8");

s = s.replace(
  /(te: \{\s*langPicker:\s*")([^"]+)(")/,
  (_, pre, _old, post) =>
    pre +
    "KVR Hospital కు స్వాగతం 🏥\\n\\nరామచంద్రపురం · డాక్టర్ నాగ సతీష్ కుమార్ కోటా గారి నిర్వహణలో నివారక ఆరోగ్య సంరక్షణ\\n\\nదయచేసి మీ భాషను ఎంచుకోండి:" +
    post,
);

s = s.replace(/• కా?లేయ కొళ్లు/g, "• కాలేయ కొళ్లు");

s = s.replace(
  'const label = lang === "te" ? "🗺️ మ్యాప్ తెరవండి" : "🗺️ మ్యాప్ తెరవండి";',
  'const label = lang === "te" ? "🗺️ మ్యాప్ తెరవండి" : "🗺️ Open map";',
);

fs.writeFileSync(file, s);
console.log("Final Telugu fixes applied.");
