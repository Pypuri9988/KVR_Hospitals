import "dotenv/config";
import { sendText, sendTemplate } from "../src/meta.js";
import { BOOKING_STAFF_PHONE, CLINIC_BOT_PHONE_DEFAULT } from "../src/config.js";

const phoneNumberId = process.env.META_ACCESS_TOKEN && process.env.META_PHONE_NUMBER_ID;
const token = process.env.META_ACCESS_TOKEN;

async function trySend(label, fn) {
  try {
    const r = await fn();
    console.log(`${label} OK`, JSON.stringify(r));
  } catch (e) {
    console.log(`${label} FAIL`, e.message);
  }
}

await trySend("template→staff", () =>
  sendTemplate({
    phoneNumberId: process.env.META_PHONE_NUMBER_ID,
    token,
    to: BOOKING_STAFF_PHONE,
    templateName: "hello_world",
    languageCode: "en_US",
  }),
);

await trySend("text→staff", () =>
  sendText({
    phoneNumberId: process.env.META_PHONE_NUMBER_ID,
    token,
    to: BOOKING_STAFF_PHONE,
    text: "KVR test: staff text alert (booking details would be here)",
  }),
);

await trySend("text→clinic", () =>
  sendText({
    phoneNumberId: process.env.META_PHONE_NUMBER_ID,
    token,
    to: CLINIC_BOT_PHONE_DEFAULT,
    text: "KVR test: clinic inbox booking alert",
  }),
);
