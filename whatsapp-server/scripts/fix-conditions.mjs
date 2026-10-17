import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let s = fs.readFileSync(file, "utf8");

const conditionsTe =
  "🩺 *మేము చికిత్స చేసే వ్యాధులు*\n\n• మధుమేహం & ప్రీ-డయాబెటిస్\n• రక్తపోటు (BP)\n• ఊబకాయం & చమురు ఆరోగ్యం\n• కాలేయ కొళ్లు & థైరాయిడ్\n• జ్వరం / టైఫాయిడ్ / డెంగూ\n• వృద్ధ & నివారక సంరక్షణ\n\nవైద్య సంప్రదింపు అపాయింట్మెంట్ కావాలా?";

s = s.replace(/conditions:\n      "🩺 \*మేము చికిత్స చేసే వ్యాధులు\*[\s\S]*?వైద్య సంప్రదింపు అపాయింట్మెంట్ కావాలా\?",/m, `conditions:\n      ${JSON.stringify(conditionsTe)},`);

fs.writeFileSync(file, s);
console.log("conditions te fixed");
