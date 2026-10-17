/** Health concerns — EN / TE (max 10 for WhatsApp list). */
export const BOOKING_CONCERNS = {
  en: [
    "Diabetes & Prediabetes",
    "B.P & Heart Problems",
    "Obesity & Weight loss treatment",
    "Thyroid & Fatty Liver",
    "Senior & Geriatric Care",
    "Paralysis (Pakshavataam)",
    "Fevers / Infections",
    "Pain / Body aches",
    "General Consultation",
  ],
  te: [
    "మధుమేహం & ప్రీ-డయాబెటిస్",
    "రక్తపోటు & గుండె సమస్యలు",
    "ఊబకాయం & బరువు తగ్గింపు చికిత్స",
    "థైరాయిడ్ & Fatty Liver",
    "వృద్ధాప్య సమస్యలు",
    "పక్షవాతం",
    "జ్వరం / ఇన్ఫెక్షన్లు",
    "నొప్పులు",
    "సాధారణ కన్సల్టేషన్",
  ],
};

export function getConcernOptions(lang = "en") {
  return BOOKING_CONCERNS[lang] || BOOKING_CONCERNS.en;
}

export function concernLabelFromId(buttonId, lang = "en") {
  if (!buttonId.startsWith("concern_")) return null;
  const index = Number.parseInt(buttonId.slice(8), 10);
  if (Number.isNaN(index)) return null;
  const list = getConcernOptions(lang);
  return list[index] ?? null;
}

export function getConcernListRows(lang = "en") {
  return getConcernOptions(lang).map((label, index) => ({
    id: `concern_${index}`,
    title: label.slice(0, 24),
    // Single-line row — avoids Meta’s smaller description text under the title
    description: "",
    value: label,
  }));
}
