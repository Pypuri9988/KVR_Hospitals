import { BOOKING_STAFF_PHONE } from "./config.js";
import {
  downloadWhatsAppMedia,
  notifyDoctor,
  sendImageByMediaId,
  sendTemplate,
  uploadWhatsAppMedia,
} from "./meta.js";

const STAFF_TEMPLATE = process.env.DOCTOR_ALERT_TEMPLATE_NAME || "kvr_staff_booking";
const STAFF_TEMPLATE_LANG = process.env.DOCTOR_ALERT_TEMPLATE_LANG || "en";

function trimParam(value, max = 900) {
  return String(value ?? "-").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Staff alert on confirmed booking. Uses approved Meta template (works without 24h chat window).
 */
export async function notifyStaffBookingConfirmed({
  phoneNumberId,
  token,
  botPhone,
  patientPhone,
  type,
  fullName,
  concern,
  date,
  time,
  patientMobile,
  fallbackText,
}) {
  const to = BOOKING_STAFF_PHONE;
  const bodyParams = [
    trimParam(fullName, 120),
    trimParam(concern, 120),
    trimParam(date, 80),
    trimParam(time, 40),
    trimParam(patientMobile, 40),
  ];

  try {
    console.log(`Staff booking template "${STAFF_TEMPLATE}" → +${to} (${type})`);
    const result = await sendTemplate({
      phoneNumberId,
      token,
      to,
      templateName: STAFF_TEMPLATE,
      languageCode: STAFF_TEMPLATE_LANG,
      components: [
        {
          type: "body",
          parameters: bodyParams.map((text) => ({ type: "text", text })),
        },
      ],
    });
    const messageId = result?.messages?.[0]?.id;
    console.log(`Staff booking template sent +${to} messageId=${messageId || "?"}`);
    return { ok: true, messageId, template: true, result };
  } catch (err) {
    console.error(`Staff booking template failed (+${to}):`, err.message);
    return notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: to,
      botPhone,
      patientPhone,
      text: fallbackText,
      allowSameAsPatient: true,
    });
  }
}

/** Medicine / sample request — text + prescription image to staff (9849492220). */
export async function notifyStaffServiceConfirmed({
  phoneNumberId,
  token,
  botPhone,
  patientPhone,
  alertText,
  mediaId,
  mimeType = "image/jpeg",
}) {
  const to = BOOKING_STAFF_PHONE;
  const textResult = await notifyDoctor({
    phoneNumberId,
    token,
    doctorPhone: to,
    botPhone,
    patientPhone,
    text: alertText,
    allowSameAsPatient: true,
  });

  if (!mediaId) {
    return textResult;
  }

  try {
    const { buffer, mimeType: downloadedMime } = await downloadWhatsAppMedia({ token, mediaId });
    const uploadId = await uploadWhatsAppMedia({
      phoneNumberId,
      token,
      buffer,
      mimeType: downloadedMime || mimeType,
    });
    const imgResult = await sendImageByMediaId({
      phoneNumberId,
      token,
      to,
      mediaId: uploadId,
      caption: "Prescription / requisition (patient upload)",
    });
    console.log(`Staff prescription image sent +${to}`);
    return { ok: true, textResult, imgResult };
  } catch (err) {
    console.error(`Staff prescription image failed +${to}:`, err.message);
    return { ok: textResult?.ok, textResult, imageError: err.message };
  }
}
