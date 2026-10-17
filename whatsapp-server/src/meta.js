import {
  languagePickerInteractive,
  bookingConfirmInteractive,
  hubQuickButtonsInteractive,
  mapsCtaInteractive,
  menuListInteractive,
  serviceConfirmInteractive,
  websiteCtaInteractive,
} from "./messages.js";
import { concernListInteractive, dateListInteractive, timeListInteractive } from "./scheduling.js";

const API = "https://graph.facebook.com/v21.0";

export async function sendWhatsAppMessage({ phoneNumberId, token, to, payload }) {
  const res = await fetch(`${API}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      ...payload,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    const error = new Error(`WhatsApp API error: ${res.status} ${err}`);
    error.status = res.status;
    error.metaBody = err;
    throw error;
  }
  return res.json();
}

export async function sendText({ phoneNumberId, token, to, text }) {
  return sendWhatsAppMessage({
    phoneNumberId,
    token,
    to,
    payload: { type: "text", text: { body: text } },
  });
}

export async function sendInteractive({ phoneNumberId, token, to, interactive }) {
  return sendWhatsAppMessage({
    phoneNumberId,
    token,
    to,
    payload: { type: "interactive", interactive },
  });
}

export async function sendLanguagePicker({ phoneNumberId, token, to }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: languagePickerInteractive() });
}

export async function sendMenuList({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: menuListInteractive(lang) });
}

export async function sendHubQuickButtons({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: hubQuickButtonsInteractive(lang) });
}

export async function sendWebsiteLink({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: websiteCtaInteractive(lang) });
}

export async function sendMapsLink({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: mapsCtaInteractive(lang) });
}

export async function sendConcernPicker({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: concernListInteractive(lang) });
}

export async function sendDatePicker({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: dateListInteractive(lang) });
}

export async function sendTimePicker({ phoneNumberId, token, to, lang }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: timeListInteractive(lang) });
}

export async function sendBookingConfirm({ phoneNumberId, token, to, lang, reviewText }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: bookingConfirmInteractive(lang, reviewText) });
}

export async function sendServiceConfirm({ phoneNumberId, token, to, lang, reviewText }) {
  return sendInteractive({ phoneNumberId, token, to, interactive: serviceConfirmInteractive(lang, reviewText) });
}

/** Download media received from patient (prescription photo). */
export async function downloadWhatsAppMedia({ token, mediaId }) {
  const metaRes = await fetch(`${API}/${mediaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!metaRes.ok) {
    throw new Error(`Media meta error: ${metaRes.status} ${await metaRes.text()}`);
  }
  const meta = await metaRes.json();
  const fileRes = await fetch(meta.url, { headers: { Authorization: `Bearer ${token}` } });
  if (!fileRes.ok) {
    throw new Error(`Media download error: ${fileRes.status}`);
  }
  const buffer = Buffer.from(await fileRes.arrayBuffer());
  return { buffer, mimeType: meta.mime_type || "image/jpeg" };
}

/** Re-upload media so it can be sent to staff number. */
export async function uploadWhatsAppMedia({ phoneNumberId, token, buffer, mimeType }) {
  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", mimeType);
  const ext = mimeType.includes("png") ? "png" : "jpg";
  form.append("file", new Blob([buffer], { type: mimeType }), `prescription.${ext}`);
  const res = await fetch(`${API}/${phoneNumberId}/media`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`Media upload error: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.id;
}

export async function sendImageByMediaId({ phoneNumberId, token, to, mediaId, caption = "" }) {
  const payload = { type: "image", image: { id: mediaId } };
  if (caption) payload.image.caption = caption.slice(0, 1024);
  return sendWhatsAppMessage({ phoneNumberId, token, to, payload });
}

export async function sendTemplate({ phoneNumberId, token, to, templateName, languageCode = "en", components = [] }) {
  const payload = {
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
    },
  };
  if (components.length) payload.template.components = components;
  return sendWhatsAppMessage({ phoneNumberId, token, to, payload });
}

/**
 * @param {{ allowSameAsPatient?: boolean }} opts — booking alerts may target doctor even when they book from their own phone (testing)
 */
export async function notifyDoctor({
  phoneNumberId,
  token,
  doctorPhone,
  text,
  patientPhone,
  botPhone,
  allowSameAsPatient = false,
}) {
  const to = String(doctorPhone || "").replace(/\D/g, "");
  const patient = String(patientPhone || "").replace(/\D/g, "");
  const bot = String(botPhone || "").replace(/\D/g, "");

  if (!to) {
    console.warn("Doctor alert skipped — DOCTOR_ALERT_PHONE not set");
    return { ok: false, skipped: true, reason: "no_doctor_phone" };
  }
  if (!allowSameAsPatient && patient && to === patient) {
    console.warn(`Doctor alert skipped — destination matches patient (+${to}). Use another phone to test booking.`);
    return { ok: false, skipped: true, reason: "same_as_patient" };
  }
  if (bot && to === bot) {
    console.warn(
      `Doctor alert skipped — DOCTOR_ALERT_PHONE matches bot line (+${to}). Set doctor personal mobile in DOCTOR_ALERT_PHONE.`,
    );
    return { ok: false, skipped: true, reason: "same_as_bot" };
  }

  const templateName = process.env.DOCTOR_ALERT_TEMPLATE_NAME || "";
  const templateLang = process.env.DOCTOR_ALERT_TEMPLATE_LANG || "en";

  try {
    console.log(`Doctor alert → +${to} (${text.length} chars)`);
    const result = await sendText({ phoneNumberId, token, to, text });
    const messageId = result?.messages?.[0]?.id;
    console.log(`Doctor alert sent +${to} messageId=${messageId || "?"}`);
    return { ok: true, messageId, result };
  } catch (err) {
    console.error(`Doctor alert failed +${to}:`, err.message);
    if (templateName && /131047|132015|re-engagement|outside.*window/i.test(String(err.metaBody || err.message))) {
      try {
        console.log(`Doctor alert retry template "${templateName}" → +${to}`);
        const result = await sendTemplate({
          phoneNumberId,
          token,
          to,
          templateName,
          languageCode: templateLang,
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: text.slice(0, 1024) }],
            },
          ],
        });
        const messageId = result?.messages?.[0]?.id;
        console.log(`Doctor alert template sent +${to} messageId=${messageId || "?"}`);
        return { ok: true, messageId, template: true, result };
      } catch (templateErr) {
        console.error(`Doctor alert template failed +${to}:`, templateErr.message);
      }
    }
    return { ok: false, error: err.message };
  }
}
