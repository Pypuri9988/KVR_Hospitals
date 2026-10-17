import fs from "fs";

const html = fs.readFileSync(".tmp-sitara.html", "utf8");
const opts = [...html.matchAll(/<option[^>]*>([^<]+)<\/option>/gi)].map((m) => m[1].trim());
if (opts.length) {
  console.log("HTML option elements:");
  opts.forEach((o, i) => console.log(`${i + 1}. ${o}`));
}

const chunk = fs.readFileSync(".tmp-sitara-chunk.js", "utf8");
// Sitara uses conditions array with name property - try JSON-like extraction
const block = chunk.match(/conditions:\[([\s\S]{200,8000}?)\],/);
if (block) {
  const names = [...block[1].matchAll(/name:"([^"]+)"/g)].map((m) => m[1]);
  if (names.length) {
    console.log("\nconditions[].name from chunk:");
    names.forEach((n, i) => console.log(`${i + 1}. ${n}`));
  }
}

// Also search for escaped unicode names
for (const pat of [
  "Diabetes \\& Prediabetes",
  "B.P",
  "Obesity",
  "Thyroid",
  "Senior",
  "PCOS",
  "Fevers",
  "Weight loss",
  "Preventive Health",
  "Other / General",
]) {
  if (chunk.includes(pat.replace(/\\/g, "")) || html.includes(pat.replace(/\\/g, ""))) {
    console.log("found text:", pat.replace(/\\/g, ""));
  }
}
