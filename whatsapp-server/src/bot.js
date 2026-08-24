import { copy } from "./messages.js";
import { getSession, setLang } from "./sessions.js";
import { notifyDoctor, sendLanguagePicker, sendText } from "./meta.js";

function normalize(text = "") {
  return text.trim().toLowerCase();
}

function detectLangSwitch(text) {
  return /^(8|language|lang|భాష|language change|change language)$/i.test(text);
}

function pickLangFromText(text) {
  if (/telugu|te|తెలుగు/i.test(text)) return "te";
  if (/english|en|ఆంగ్ల/i.test(text)) return "en";
  return null;
}

export async function handleIncomingMessage({
  from,
  text,
  buttonId,
  phoneNumberId,
  token,
  doctorAlertPhone,
  contactName,
}) {
  const session = getSession(from);
  const body = normalize(text);

  // Interactive button replies
  if (buttonId === "lang_en") {
    setLang(from, "en");
    await sendText({ phoneNumberId, token, to: from, text: copy.en.menu });
    return;
  }
  if (buttonId === "lang_te") {
    setLang(from, "te");
    await sendText({ phoneNumberId, token, to: from, text: copy.te.menu });
    return;
  }
  if (buttonId === "lang_switch") {
    await sendLanguagePicker({ phoneNumberId, token, to: from });
    session.lang = undefined;
    return;
  }
  if (buttonId === "book") {
    const lang = session.lang || "en";
    await sendText({ phoneNumberId, token, to: from, text: copy[lang].bookConfirm });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: copy.en.doctorAlert(contactName, from, "WhatsApp: Book appointment"),
    });
    return;
  }
  if (buttonId === "timings") {
    const lang = session.lang || "en";
    await sendText({ phoneNumberId, token, to: from, text: copy[lang].timings });
    return;
  }

  // First contact — language selection
  if (!session.lang || /^(hi|hello|hey|start|namaste|నమస్కార|help)$/i.test(body)) {
    await sendLanguagePicker({ phoneNumberId, token, to: from });
    return;
  }

  const lang = session.lang;
  const t = copy[lang];

  if (detectLangSwitch(body)) {
    await sendLanguagePicker({ phoneNumberId, token, to: from });
    session.lang = undefined;
    return;
  }

  const forced = pickLangFromText(body);
  if (forced) {
    setLang(from, forced);
    await sendText({ phoneNumberId, token, to: from, text: copy[forced].langChanged + "\n\n" + copy[forced].menu });
    return;
  }

  if (/^(menu|options|0)$/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.menu });
    return;
  }

  if (/^(1|book|appointment|అపాయింట్మెంట్)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.bookConfirm });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: t.doctorAlert(contactName, from, `Booking: ${text}`),
    });
    return;
  }

  if (/^(2|consult)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.consultConfirm });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: t.doctorAlert(contactName, from, "Consultation request"),
    });
    return;
  }

  if (/^(3|assessment|అంచనా)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.assessmentConfirm });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: t.doctorAlert(contactName, from, "Health assessment"),
    });
    return;
  }

  if (/^(4|bca|body|composition|కూర్పు)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.bcaConfirm });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: t.doctorAlert(contactName, from, "BCA booking"),
    });
    return;
  }

  if (/^(5|timing|time|location|address|చిరునామా|టైమింగ్)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.timings });
    return;
  }

  if (/^(6|fever|typhoid|dengue|జ్వరం)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.fever });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: t.doctorAlert(contactName, from, `Fever care: ${text}`),
    });
    return;
  }

  if (/^(7|talk|chat|team)/i.test(body)) {
    await sendText({
      phoneNumberId,
      token,
      to: from,
      text:
        lang === "en"
          ? "Our care team will reply shortly. You can also call +91 94911 35557."
          : "మా team త్వరలో reply చేస్తుంది. +91 94911 35557 call చేయవచ్చు.",
    });
    await notifyDoctor({
      phoneNumberId,
      token,
      doctorPhone: doctorAlertPhone,
      text: t.doctorAlert(contactName, from, text),
    });
    return;
  }

  await sendText({ phoneNumberId, token, to: from, text: `${t.default}\n\n${t.menu}` });
}

export async function handleWebsiteBooking({
  name,
  phone,
  concern,
  date,
  time,
  notes,
  phoneNumberId,
  token,
  doctorAlertPhone,
}) {
  const patientPhone = phone.replace(/\D/g, "");
  const patientMsg = `✅ KVR Hospital booking received\nName: ${name}\nConcern: ${concern}\nDate: ${date} ${time}\nWe will confirm on WhatsApp shortly.`;
  const doctorMsg = copy.en.doctorAlert(name, phone, `${concern} · ${date} ${time} · ${notes || "-"}`);

  if (patientPhone.length >= 10) {
    await sendText({ phoneNumberId, token, to: patientPhone, text: patientMsg });
  }
  await notifyDoctor({ phoneNumberId, token, doctorPhone: doctorAlertPhone, text: doctorMsg });
}
