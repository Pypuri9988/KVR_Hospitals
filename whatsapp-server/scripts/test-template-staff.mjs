import "dotenv/config";
import { BOOKING_STAFF_PHONE } from "../src/config.js";
import { sendTemplate } from "../src/meta.js";

const token = process.env.META_ACCESS_TOKEN;
const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
const name = process.argv[2] || "hello_world";
const lang = process.argv[3] || "en_US";

const res = await sendTemplate({
  phoneNumberId,
  token,
  to: BOOKING_STAFF_PHONE,
  templateName: name,
  languageCode: lang,
});
console.log("Sent template", name, "to", BOOKING_STAFF_PHONE, JSON.stringify(res, null, 2));
