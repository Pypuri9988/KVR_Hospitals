import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(p, "utf8");
const teStart = s.indexOf("  te: {");
const head = s.slice(0, teStart);
let sub = s.slice(teStart);

sub = sub.replace(
  /pickConcernHint: "[^"]+",/,
  `pickConcernHint: "దయచేసి క్రింద *🩺 ఆరోగ్య సమస్య* నొక్కండి, మెనూ నుండి ఏంచుకోండి.",`,
);
sub = sub.replace(
  /pickDateHint: "[^"]+",/,
  `pickDateHint: "దయచేసి క్రింద *📅 తేదీ ఎంచుకోండి* నొక్కండి, ఆ జాబితా నుండి తేదీ ఏంచుకోండి.",`,
);

fs.writeFileSync(p, head + sub);
console.log("ok");
