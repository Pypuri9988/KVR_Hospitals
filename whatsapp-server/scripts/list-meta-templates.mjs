import "dotenv/config";

const token = process.env.META_ACCESS_TOKEN;
const waba = process.env.META_WABA_ID;
if (!token || !waba) {
  console.error("Need META_ACCESS_TOKEN and META_WABA_ID in .env");
  process.exit(1);
}
const url = `https://graph.facebook.com/v21.0/${waba}/message_templates?limit=50&fields=name,status,language,category,components`;
const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
const body = await res.text();
console.log(res.status, body);
