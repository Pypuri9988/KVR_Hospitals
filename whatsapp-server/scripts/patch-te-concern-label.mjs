import fs from "fs";

const messages = fs.readFileSync("src/messages.js", "utf8");
const fixed = messages
  .replace(/\*లక్షణాలు:\*/g, "*ఆరోగ్య సమస్య:*")
  .replace(
    'pickConcernHint: "దయచేసi క్రింద *🩺 ఆరోగ్య సమస్య* నొక్కi జాబితా నుండi ఎంచukkoండi."',
    'pickConcernHint: "దయచేసi క్రింద *🩺 ఆరోగ్య సమస్య* నొక్కi, జాబితా నుండi ఎంచukkoండi."',
  )
  .replace(
    'pickDateHint: "దయచేసi క్రింద *📅 తేదీ ఎంచukkoండi* నొక్కi జాబితా నుండi తేదీ ఎంచukkoండi."',
    'pickDateHint: "దయచేసi క్రింద *📅 తేదీ ఎంచukkoండi* నొక్కi, జాబితా నుండi తేదీ ఎంచukkoండi."',
  );
fs.writeFileSync("src/messages.js", fixed);

const scheduling = fs.readFileSync("src/scheduling.js", "utf8");
fs.writeFileSync(
  "src/scheduling.js",
  scheduling.replace("*5వ దశ* — క్రింద *🕘 సమయం", "*4వ దశ* — క్రింద *🕘 సమయం"),
);

console.log("patched");
