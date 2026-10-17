import { getConcernListRows } from "./concerns.js";

const IST = "Asia/Kolkata";

const EN_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TE_DAYS = ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"];

const TIME_SLOTS = [
  { id: "09:00", en: "9:00 AM", te: "9:00 AM" },
  { id: "10:00", en: "10:00 AM", te: "10:00 AM" },
  { id: "11:00", en: "11:00 AM", te: "11:00 AM" },
  { id: "12:00", en: "12:00 PM", te: "12:00 PM" },
  { id: "13:00", en: "1:00 PM", te: "1:00 PM" },
  { id: "14:00", en: "2:00 PM", te: "2:00 PM" },
  { id: "15:00", en: "3:00 PM", te: "3:00 PM" },
  { id: "16:00", en: "4:00 PM", te: "4:00 PM" },
  { id: "17:00", en: "5:00 PM", te: "5:00 PM" },
  { id: "18:00", en: "6:00 PM", te: "6:00 PM" },
];

function istParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value || "";
  const weekday = get("weekday").replace(/\.$/, "");
  const dayIndex = EN_DAYS.findIndex((d) => weekday.startsWith(d.slice(0, 3)));
  return {
    iso: `${get("year")}-${get("month")}-${get("day")}`,
    dayIndex: dayIndex >= 0 ? dayIndex : 0,
  };
}

function formatDateLabel(iso, lang) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const parts = istParts(date);
  const dayName = lang === "te" ? TE_DAYS[parts.dayIndex] : EN_DAYS[parts.dayIndex];
  const monthName = new Intl.DateTimeFormat(lang === "te" ? "te-IN" : "en-IN", {
    timeZone: IST,
    month: "short",
  }).format(date);
  return `${dayName}, ${d} ${monthName}`;
}

/** Next 10 clinic days (Mon–Sat), starting today in IST */
export function getDateOptions(lang = "en", count = 10) {
  const rows = [];
  const cursor = new Date();
  let guard = 0;

  while (rows.length < count && guard < 40) {
    const parts = istParts(cursor);
    if (parts.dayIndex !== 0) {
      const label = formatDateLabel(parts.iso, lang);
      rows.push({
        id: `date_${parts.iso}`,
        title: label.slice(0, 24),
        description: lang === "te" ? "తేదీ ఎంచుకోండి" : "Tap to select",
        value: label,
        iso: parts.iso,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }

  return rows;
}

export function getTimeOptions(lang = "en") {
  return TIME_SLOTS.map((slot) => ({
    id: `time_${slot.id}`,
    title: (lang === "te" ? slot.te : slot.en).slice(0, 24),
    description: lang === "te" ? "సమయం ఎంచుకోండి" : "Tap to select",
    value: lang === "te" ? slot.te : slot.en,
  }));
}

export function parsePickerId(buttonId = "") {
  if (buttonId.startsWith("date_")) {
    return { kind: "date", iso: buttonId.slice(5), raw: buttonId };
  }
  if (buttonId.startsWith("time_")) {
    const slot = buttonId.slice(5);
    const match = TIME_SLOTS.find((t) => t.id === slot);
    return { kind: "time", slot, label: match ? match.en : slot, raw: buttonId };
  }
  if (buttonId.startsWith("concern_")) {
    const index = Number.parseInt(buttonId.slice(8), 10);
    return { kind: "concern", index, raw: buttonId };
  }
  return null;
}

export function concernListInteractive(lang) {
  const rows = getConcernListRows(lang);
  const copy =
    lang === "te"
      ? {
          body: "క్రింద *🩺 ఆరోగ్య సమస్య* నొక్కి, జాబితా నుండి ఎంచుకోండి",
          button: "🩺 ఆరోగ్య సమస్య",
          section: "ఆరోగ్య సమస్యలు",
        }
      : {
          body: "Tap *🩺 Health concern* below and choose from the list",
          button: "🩺 Health concern",
          section: "Health concerns",
        };

  return {
    type: "list",
    body: { text: copy.body },
    action: {
      button: copy.button.slice(0, 20),
      sections: [{ title: copy.section, rows: rows.map(({ id, title, description }) => ({ id, title, description })) }],
    },
  };
}

export function dateListInteractive(lang) {
  const rows = getDateOptions(lang);
  const copy =
    lang === "te"
      ? {
          body: "క్రింద *📅 తేదీ ఎంచుకోండి* నొక్కి, జాబితా నుండి తేదీని ఎంచుకోండి",
          button: "📅 తేదీ ఎంచుకోండి",
          section: "లభ్యమైన తేదీలు",
        }
      : {
          body: "Tap *📅 Pick a date* below and choose from the calendar list",
          button: "📅 Pick a date",
          section: "Available dates",
        };

  return {
    type: "list",
    body: { text: copy.body },
    action: {
      button: copy.button.slice(0, 20),
      sections: [{ title: copy.section, rows: rows.map(({ id, title, description }) => ({ id, title, description })) }],
    },
  };
}

export function timeListInteractive(lang) {
  const rows = getTimeOptions(lang);
  const copy =
    lang === "te"
      ? {
          body: "క్రింద *🕘 సమయం ఎంచుకోండి* నొక్కి, జాబితా నుండి సమయాన్నi ఎంచుకోండి",
          button: "🕘 సమయం ఎంచుకోండి",
          section: "లభ్యమైన సమయాలు",
        }
      : {
          body: "Tap *🕘 Pick a time* below and choose a slot",
          button: "🕘 Pick a time",
          section: "Available times",
        };

  return {
    type: "list",
    body: { text: copy.body },
    action: {
      button: copy.button.slice(0, 20),
      sections: [{ title: copy.section, rows: rows.map(({ id, title, description }) => ({ id, title, description })) }],
    },
  };
}
