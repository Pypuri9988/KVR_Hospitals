import { handleBookingStep, startBooking } from "./booking.js";
import { beginServiceRequest, handleServiceStep } from "./serviceRequest.js";
import { copy, doctorBookingAlert } from "./messages.js";
import { notifyStaffBookingConfirmed } from "./staffAlert.js";
import { getSession, isBookingStep, isServiceStep, setLang } from "./sessions.js";
import { sendLanguagePicker, sendMapsLink, sendMenuList, sendText } from "./meta.js";

const BOOKING_ACTIONS = new Set(["book", "consult", "assessment", "bca", "fever"]);

const BOOKING_LABELS = {
  book: { en: "Appointment", te: "అపాయింట్మెంట్" },
  consult: { en: "Consultation", te: "సంప్రదింపు" },
  assessment: { en: "Health assessment", te: "ఆరోగ్య పరీక్ష" },
  bca: { en: "Body composition (BCA)", te: "శరీర కూర్పు (BCA)" },
  fever: { en: "Fever care", te: "జ్వరం సంరక్షణ" },
};

function normalize(text = "") {
  return text.trim().toLowerCase();
}

function detectLangSwitch(text) {
  return /^(language|lang|భాష|language change|change language|భాష మార్చ)/i.test(text);
}

function pickLangFromText(text) {
  if (/telugu|te|తెలుగు/i.test(text)) return "te";
  if (/english|en|ఆంగ్ల/i.test(text)) return "en";
  return null;
}

/** Sitara360-style: one welcome message + list button (no extra quick-reply row). */
async function sendMenu({ phoneNumberId, token, to, lang }) {
  await sendMenuList({ phoneNumberId, token, to, lang });
}

async function beginBooking({ actionId, from, phoneNumberId, token, lang }) {
  const label = BOOKING_LABELS[actionId]?.[lang] || BOOKING_LABELS[actionId]?.en || actionId;
  startBooking(from, actionId);
  await sendText({
    phoneNumberId,
    token,
    to: from,
    text: copy[lang].booking.start(label),
  });
}

async function handleMenuAction({ actionId, from, phoneNumberId, token, botPhone, contactName, lang }) {
  const t = copy[lang];

  if (actionId === "open_menu") {
    await sendMenuList({ phoneNumberId, token, to: from, lang });
    return;
  }

  if (actionId === "chat") {
    await sendText({ phoneNumberId, token, to: from, text: t.chatWelcome });
    return;
  }

  if (actionId === "bot" || actionId === "consult") {
    if (actionId === "consult") {
      await beginBooking({ actionId: "consult", from, phoneNumberId, token, lang });
      return;
    }
    await sendMenuList({ phoneNumberId, token, to: from, lang });
    return;
  }

  if (BOOKING_ACTIONS.has(actionId)) {
    await beginBooking({ actionId, from, phoneNumberId, token, lang });
    return;
  }

  switch (actionId) {
    case "timings":
      await sendText({ phoneNumberId, token, to: from, text: t.timings });
      await sendMapsLink({ phoneNumberId, token, to: from, lang });
      return;
    case "directions":
      await sendMapsLink({ phoneNumberId, token, to: from, lang });
      return;
    case "conditions":
      await sendText({ phoneNumberId, token, to: from, text: t.conditions });
      return;
    case "talk":
      await sendText({ phoneNumberId, token, to: from, text: t.talk });
      return;
    case "medicine":
      await beginServiceRequest({ type: "medicine", from, phoneNumberId, token, lang });
      return;
    case "sample":
      await beginServiceRequest({ type: "sample", from, phoneNumberId, token, lang });
      return;
    case "register":
      await sendText({ phoneNumberId, token, to: from, text: t.registerPrompt });
      return;
    case "lang_switch":
      await sendLanguagePicker({ phoneNumberId, token, to: from });
      return;
    default:
      break;
  }
}

export async function handleIncomingMessage({
  from,
  text,
  buttonId,
  mediaId = "",
  phoneNumberId,
  token,
  botPhone,
  contactName,
}) {
  const session = getSession(from);
  const body = normalize(text);
  const lang = session.lang || "en";
  const t = copy[lang];

  if (buttonId === "lang_en") {
    setLang(from, "en");
    await sendMenu({ phoneNumberId, token, to: from, lang: "en" });
    return;
  }
  if (buttonId === "lang_te") {
    setLang(from, "te");
    await sendMenu({ phoneNumberId, token, to: from, lang: "te" });
    return;
  }

  if (
    isServiceStep(session.step) &&
    (text.trim() ||
      mediaId ||
      buttonId === "confirm_service" ||
      buttonId === "cancel_service")
  ) {
    const handled = await handleServiceStep({
      from,
      text,
      buttonId,
      mediaId,
      phoneNumberId,
      token,
      botPhone,
      contactName,
    });
    if (handled) return;
  }

  if (
    isBookingStep(session.step) &&
    (text.trim() ||
      buttonId.startsWith("date_") ||
      buttonId.startsWith("time_") ||
      buttonId.startsWith("concern_") ||
      buttonId === "confirm_book" ||
      buttonId === "cancel_book")
  ) {
    const handled = await handleBookingStep({
      from,
      text,
      buttonId,
      phoneNumberId,
      token,
      botPhone,
      contactName,
    });
    if (handled) return;
  }

  const actionId = buttonId || "";
  if (
    actionId &&
    actionId !== "lang_en" &&
    actionId !== "lang_te" &&
    actionId !== "confirm_book" &&
    actionId !== "cancel_book" &&
    actionId !== "confirm_service" &&
    actionId !== "cancel_service"
  ) {
    await handleMenuAction({ actionId, from, phoneNumberId, token, botPhone, contactName, lang });
    return;
  }

  if (!session.lang || /^(hi|hello|hey|start|namaste|నమస్కార|help)$/i.test(body)) {
    await sendLanguagePicker({ phoneNumberId, token, to: from });
    return;
  }

  if (detectLangSwitch(body)) {
    await sendLanguagePicker({ phoneNumberId, token, to: from });
    session.lang = undefined;
    return;
  }

  const forced = pickLangFromText(body);
  if (forced) {
    setLang(from, forced);
    await sendMenu({ phoneNumberId, token, to: from, lang: forced });
    return;
  }

  if (/^(menu|options|0|మెనూ|services|hub)$/i.test(body)) {
    await sendMenu({ phoneNumberId, token, to: from, lang });
    return;
  }

  if (/^(book|appointment|అపాయింట్మెంట్)/i.test(body)) {
    await beginBooking({ actionId: "consult", from, phoneNumberId, token, lang });
    return;
  }
  if (/^(consult|కన్సల్ట|consultation)/i.test(body)) {
    await beginBooking({ actionId: "consult", from, phoneNumberId, token, lang });
    return;
  }
  if (/^(assessment|అంచనా|పరీక్ష|health check)/i.test(body)) {
    await beginBooking({ actionId: "assessment", from, phoneNumberId, token, lang });
    return;
  }
  if (/^(bca|body|composition|కూర్పు)/i.test(body)) {
    await beginBooking({ actionId: "bca", from, phoneNumberId, token, lang });
    return;
  }
  if (/^(timing|time|location|address|చిరునామా|టైమింగ్|సమయ)/i.test(body)) {
    await handleMenuAction({ actionId: "timings", from, phoneNumberId, token, botPhone, contactName, lang });
    return;
  }
  if (/^(fever|typhoid|dengue|జ్వరం)/i.test(body)) {
    await beginBooking({ actionId: "fever", from, phoneNumberId, token, lang });
    return;
  }
  if (/^(register|registration|new patient|patient reg)/i.test(body)) {
    await handleMenuAction({ actionId: "register", from, phoneNumberId, token, botPhone, contactName, lang });
    return;
  }
  if (/^(medicine|medication|delivery|pharmacy)/i.test(body)) {
    await handleMenuAction({ actionId: "medicine", from, phoneNumberId, token, botPhone, contactName, lang });
    return;
  }
  if (/^(sample|pickup|lab sample|home sample|sample collection|blood test pickup)/i.test(body)) {
    await handleMenuAction({ actionId: "sample", from, phoneNumberId, token, botPhone, contactName, lang });
    return;
  }
  if (/^(home visit|homevisit|visit home|senior visit|doctor home)/i.test(body)) {
    await sendText({ phoneNumberId, token, to: from, text: t.noHomeVisit });
    await sendMenu({ phoneNumberId, token, to: from, lang });
    return;
  }
  if (/^(talk|chat|team|మాట్లాడ|care)/i.test(body)) {
    await handleMenuAction({ actionId: "talk", from, phoneNumberId, token, botPhone, contactName, lang });
    return;
  }
  await sendMenu({ phoneNumberId, token, to: from, lang });
}

export async function handleWebsiteBooking({ name, phone, concern, date, time, notes, phoneNumberId, token, botPhone }) {
  const patientPhone = phone.replace(/\D/g, "");
  const patientMsg = `✅ *Appointment confirmed*\n\nName: ${name}\nConcern: ${concern}\nDate: ${date}\nTime: ${time}\n\nPlease visit KVR Hospital on the date and time above.\n\n🕘 Mon–Sat: 9 AM – 8 PM\n📞 +91 94911 35557`;
  const digits = patientPhone.replace(/\D/g, "");
  const formattedPhone =
    digits.length === 12 && digits.startsWith("91")
      ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
      : phone;
  const concernLine = notes ? `${concern} (${notes})` : concern;
  const staffMsg = doctorBookingAlert({
    type: "Consultation (website)",
    fullName: name,
    symptoms: concernLine,
    date,
    time,
    phone: formattedPhone,
    waName: name,
  });

  console.log("Website booking confirmed → staff alert");
  await notifyStaffBookingConfirmed({
    phoneNumberId,
    token,
    botPhone,
    patientPhone,
    type: "Consultation (website)",
    fullName: name,
    concern: concernLine,
    date,
    time,
    patientMobile: formattedPhone,
    fallbackText: staffMsg,
  });

  if (patientPhone.length >= 10) {
    await sendText({ phoneNumberId, token, to: patientPhone, text: patientMsg });
  }
}
