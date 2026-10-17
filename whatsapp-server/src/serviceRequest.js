import { copy, staffServiceAlert } from "./messages.js";
import { getSession, resetToMenu } from "./sessions.js";
import { notifyStaffServiceConfirmed } from "./staffAlert.js";
import { sendMenuList, sendServiceConfirm, sendText } from "./meta.js";

const SERVICE_LABELS = {
  medicine: { en: "Medicine delivery", te: "మందుల order" },
  sample: { en: "Home sample pickup", te: "మీ ఇంటి నుండే sample collection" },
};

export function startServiceRequest(waId, type) {
  const s = getSession(waId);
  s.booking = undefined;
  s.serviceRequest = { type };
  s.step = "service_name";
}

function prompts(lang) {
  return copy[lang].serviceRequest;
}

function isCancel(text) {
  return /^(cancel|stop|exit|menu|0|రద్దు|మెనూ)$/i.test(text.trim());
}

function isConfirm(text) {
  return /^(yes|confirm|ok|y|1|అవును|నిర్ధార)/i.test(text.trim());
}

function isReject(text) {
  return /^(no|n|2|cancel|reject|వద్దు|రద్దు)/i.test(text.trim());
}

function formatPatientPhone(from) {
  if (!from) return "-";
  const digits = from.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

function serviceLabel(lang, type) {
  return SERVICE_LABELS[type]?.[lang] || type;
}

async function showServiceConfirm({ from, phoneNumberId, token, lang, req }) {
  const p = prompts(lang);
  const review = p.confirmReview({
    serviceLabel: serviceLabel(lang, req.type),
    fullName: req.fullName,
    address: req.address,
    phone: formatPatientPhone(from),
  });
  const s = getSession(from);
  s.step = "service_confirm";
  await sendServiceConfirm({ phoneNumberId, token, to: from, lang, reviewText: review });
}

async function finishServiceRequest({ from, phoneNumberId, token, botPhone, contactName, lang, req }) {
  const alertText = staffServiceAlert({
    serviceLabel: serviceLabel("en", req.type),
    fullName: req.fullName,
    address: req.address,
    phone: formatPatientPhone(from),
    waName: contactName,
  });

  console.log(`Service request confirmed by +${from} → staff (${req.type})`);
  await notifyStaffServiceConfirmed({
    phoneNumberId,
    token,
    botPhone,
    patientPhone: from,
    alertText,
    mediaId: req.mediaId,
    mimeType: req.mimeType,
  });

  await sendText({ phoneNumberId, token, to: from, text: prompts(lang).confirmed });
  resetToMenu(from);
}

export async function handleServiceStep({
  from,
  text,
  buttonId = "",
  mediaId = "",
  phoneNumberId,
  token,
  botPhone,
  contactName,
}) {
  const session = getSession(from);
  const lang = session.lang || "en";
  const p = prompts(lang);
  const raw = text.trim();

  if (!session.serviceRequest) {
    resetToMenu(from);
    return false;
  }

  const req = session.serviceRequest;

  if (isCancel(raw) && session.step !== "service_confirm") {
    resetToMenu(from);
    await sendText({ phoneNumberId, token, to: from, text: p.cancelled });
    await sendMenuList({ phoneNumberId, token, to: from, lang });
    return true;
  }

  switch (session.step) {
    case "service_name":
      if (raw.length < 2) {
        await sendText({ phoneNumberId, token, to: from, text: p.invalidName });
        return true;
      }
      req.fullName = raw;
      session.step = "service_address";
      await sendText({ phoneNumberId, token, to: from, text: p.askAddress });
      return true;

    case "service_address":
      if (raw.length < 10) {
        await sendText({ phoneNumberId, token, to: from, text: p.invalidAddress });
        return true;
      }
      req.address = raw;
      session.step = "service_await_rx";
      await sendText({ phoneNumberId, token, to: from, text: p.askPrescription });
      return true;

    case "service_await_rx":
      if (mediaId) {
        req.mediaId = mediaId;
        req.mimeType = "image/jpeg";
        await showServiceConfirm({ from, phoneNumberId, token, lang, req });
        return true;
      }
      await sendText({ phoneNumberId, token, to: from, text: p.needPhoto });
      return true;

    case "service_confirm":
      if (buttonId === "confirm_service" || isConfirm(raw)) {
        await finishServiceRequest({ from, phoneNumberId, token, botPhone, contactName, lang, req });
        return true;
      }
      if (buttonId === "cancel_service" || isReject(raw)) {
        resetToMenu(from);
        await sendText({ phoneNumberId, token, to: from, text: p.cancelled });
        await sendMenuList({ phoneNumberId, token, to: from, lang });
        return true;
      }
      await sendText({ phoneNumberId, token, to: from, text: p.confirmHint });
      await showServiceConfirm({ from, phoneNumberId, token, lang, req });
      return true;

    default:
      return false;
  }
}

export async function beginServiceRequest({ type, from, phoneNumberId, token, lang }) {
  const session = getSession(from);
  if (lang) session.lang = lang;
  startServiceRequest(from, type);
  const p = prompts(session.lang || lang || "en");
  const intro = type === "sample" ? p.startSample : p.startMedicine;
  await sendText({ phoneNumberId, token, to: from, text: intro });
}
