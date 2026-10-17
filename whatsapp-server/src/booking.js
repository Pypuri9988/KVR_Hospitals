import { copy, doctorBookingAlert } from "./messages.js";
import { notifyStaffBookingConfirmed } from "./staffAlert.js";
import { concernLabelFromId, getConcernListRows } from "./concerns.js";
import { parsePickerId, getDateOptions, getTimeOptions } from "./scheduling.js";
import { getSession, resetToMenu } from "./sessions.js";
import {
  sendBookingConfirm,
  sendConcernPicker,
  sendDatePicker,
  sendMenuList,
  sendText,
  sendTimePicker,
} from "./meta.js";

const BOOKING_TYPES = {
  book: { en: "Consultation", te: "కన్సల్టేషన్" },
  consult: { en: "Consultation", te: "కన్సల్టేషన్" },
  assessment: { en: "Health assessment", te: "ఆరోగ్య పరీక్ష" },
  bca: { en: "BCA", te: "శరీర కూర్పు (BCA)" },
  fever: { en: "Fever care", te: "జ్వరం సంరక్షణ" },
};

export function startBooking(waId, type) {
  const s = getSession(waId);
  s.step = "book_fullname";
  s.booking = { type: type === "book" ? "consult" : type };
}

function bookingPrompts(lang) {
  return copy[lang].booking;
}

function isCancel(text) {
  return /^(cancel|stop|exit|menu|0|రద్దు|మెనూ)$/i.test(text.trim());
}

function isConfirm(text) {
  return /^(yes|confirm|ok|y|1|అవును|నిర్ధార|confirm book)/i.test(text.trim());
}

function isReject(text) {
  return /^(no|n|2|cancel book|reject|వద్దు|రద్దు)/i.test(text.trim());
}

function formatPatientPhone(from) {
  if (!from) return "-";
  const digits = from.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

function bookingDetails(lang, booking, from) {
  const fullName = (booking.fullName || "").trim();
  const typeLabel = BOOKING_TYPES[booking.type]?.[lang] || booking.type;
  return {
    type: typeLabel,
    fullName,
    symptoms: booking.symptoms,
    date: booking.date,
    time: booking.time,
    phone: formatPatientPhone(from),
  };
}

function buildSummary(lang, booking, from) {
  return bookingPrompts(lang).summary(bookingDetails(lang, booking, from));
}

function buildReview(lang, booking, from) {
  return bookingPrompts(lang).confirmReview(bookingDetails(lang, booking, from));
}

function buildDoctorAlert(booking, from, contactName) {
  const fullName = (booking.fullName || "").trim();
  const typeLabel = BOOKING_TYPES[booking.type]?.en || booking.type;
  return doctorBookingAlert({
    type: typeLabel,
    fullName,
    symptoms: booking.symptoms,
    date: booking.date,
    time: booking.time,
    phone: formatPatientPhone(from),
    waName: contactName,
  });
}

async function showBookingConfirm({ from, phoneNumberId, token, lang, booking }) {
  sessionSetConfirm(from);
  const reviewText = buildReview(lang, booking, from);
  await sendBookingConfirm({ phoneNumberId, token, to: from, lang, reviewText });
}

function sessionSetConfirm(waId) {
  const s = getSession(waId);
  s.step = "book_confirm";
}

async function finishBooking({ from, phoneNumberId, token, botPhone, contactName, lang, booking }) {
  const details = bookingDetails(lang, booking, from);
  const alertText = buildDoctorAlert(booking, from, contactName);
  console.log(`Booking confirmed by +${from} → staff alert`);
  const alertResult = await notifyStaffBookingConfirmed({
    phoneNumberId,
    token,
    botPhone,
    patientPhone: from,
    type: details.type,
    fullName: details.fullName,
    concern: details.symptoms,
    date: details.date,
    time: details.time,
    patientMobile: details.phone,
    fallbackText: alertText,
  });
  if (!alertResult.ok) {
    console.error(
      "Staff booking alert failed:",
      alertResult.skipped ? alertResult.reason : alertResult.error || "unknown",
    );
  }

  await sendText({ phoneNumberId, token, to: from, text: buildSummary(lang, booking, from) });
  resetToMenu(from);
}

async function cancelBooking({ from, phoneNumberId, token, lang }) {
  resetToMenu(from);
  await sendText({ phoneNumberId, token, to: from, text: bookingPrompts(lang).cancelled });
  await sendMenuList({ phoneNumberId, token, to: from, lang });
}

function resolveDateSelection(lang, buttonId, text) {
  const picked = parsePickerId(buttonId);
  if (picked?.kind === "date") {
    const row = getDateOptions(lang).find((d) => d.id === buttonId);
    return row?.value || picked.iso;
  }
  const raw = text.trim();
  return raw.length >= 3 ? raw : null;
}

function resolveTimeSelection(lang, buttonId, text) {
  const picked = parsePickerId(buttonId);
  if (picked?.kind === "time") {
    const row = getTimeOptions(lang).find((t) => t.id === buttonId);
    return row?.value || picked.label;
  }
  const raw = text.trim();
  return raw.length >= 2 ? raw : null;
}

function resolveConcernSelection(lang, buttonId) {
  const fromId = concernLabelFromId(buttonId, lang);
  if (fromId) return fromId;
  const picked = parsePickerId(buttonId);
  if (picked?.kind === "concern") {
    const row = getConcernListRows(lang)[picked.index];
    return row?.value ?? null;
  }
  return null;
}

export async function handleBookingStep({
  from,
  text,
  buttonId = "",
  phoneNumberId,
  token,
  botPhone,
  contactName,
}) {
  const session = getSession(from);
  const lang = session.lang || "en";
  const prompts = bookingPrompts(lang);
  const raw = text.trim();

  if (isCancel(raw) && session.step !== "book_confirm") {
    await cancelBooking({ from, phoneNumberId, token, lang });
    return true;
  }

  if (!session.booking) {
    resetToMenu(from);
    return false;
  }

  const booking = session.booking;

  switch (session.step) {
    case "book_fullname":
      if (raw.length < 2) {
        await sendText({ phoneNumberId, token, to: from, text: prompts.invalidFullName });
        return true;
      }
      booking.fullName = raw;
      session.step = "book_concern";
      await sendConcernPicker({ phoneNumberId, token, to: from, lang });
      return true;

    case "book_surname":
    case "book_firstname":
    case "book_symptoms":
      session.step = "book_fullname";
      await sendText({
        phoneNumberId,
        token,
        to: from,
        text: prompts.start(BOOKING_TYPES[booking.type]?.[lang] || booking.type),
      });
      return true;

    case "book_concern": {
      const concern = resolveConcernSelection(lang, buttonId);
      if (!concern) {
        await sendText({ phoneNumberId, token, to: from, text: prompts.pickConcernHint });
        await sendConcernPicker({ phoneNumberId, token, to: from, lang });
        return true;
      }
      booking.symptoms = concern;
      session.step = "book_date";
      await sendDatePicker({ phoneNumberId, token, to: from, lang });
      return true;
    }

    case "book_date": {
      const dateValue = resolveDateSelection(lang, buttonId, text);
      if (!dateValue) {
        await sendText({ phoneNumberId, token, to: from, text: prompts.pickDateHint });
        await sendDatePicker({ phoneNumberId, token, to: from, lang });
        return true;
      }
      booking.date = dateValue;
      session.step = "book_time";
      await sendTimePicker({ phoneNumberId, token, to: from, lang });
      return true;
    }

    case "book_time": {
      const timeValue = resolveTimeSelection(lang, buttonId, text);
      if (!timeValue) {
        await sendText({ phoneNumberId, token, to: from, text: prompts.pickTimeHint });
        await sendTimePicker({ phoneNumberId, token, to: from, lang });
        return true;
      }
      booking.time = timeValue;
      await showBookingConfirm({ from, phoneNumberId, token, lang, booking });
      return true;
    }

    case "book_confirm":
      if (buttonId === "confirm_book" || isConfirm(raw)) {
        await finishBooking({ from, phoneNumberId, token, botPhone, contactName, lang, booking });
        return true;
      }
      if (buttonId === "cancel_book" || isReject(raw)) {
        await cancelBooking({ from, phoneNumberId, token, lang });
        return true;
      }
      await sendText({ phoneNumberId, token, to: from, text: prompts.confirmHint });
      await showBookingConfirm({ from, phoneNumberId, token, lang, booking });
      return true;

    default:
      return false;
  }
}
