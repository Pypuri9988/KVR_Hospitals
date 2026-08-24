import { clinic, waLink } from "../config";
import type { Lang } from "./translations";
import { translations } from "./translations";

export type BotReply = {
  text: string;
  actions?: { label: string; href: string }[];
};

function resolveActions(
  actions: NonNullable<(typeof translations.en.replies)[string]["actions"]>,
): BotReply["actions"] {
  return actions.map((a) => {
    if (a.waMsg) return { label: a.label, href: waLink(a.waMsg) };
    if (a.anchor === "maps") return { label: a.label, href: clinic.links.googleDirections };
    if (a.anchor) return { label: a.label, href: a.anchor };
    return { label: a.label, href: waLink(a.label) };
  });
}

export function getReplyByKey(lang: Lang, key: string): BotReply {
  const bundle = translations[lang].replies[key] ?? translations[lang].replies.default;
  return {
    text: bundle.text,
    actions: bundle.actions ? resolveActions(bundle.actions) : undefined,
  };
}

const enPatterns: Record<string, RegExp[]> = {
  greeting: [/^(hello|hi|hey|namaste)\b/i],
  book: [/\b(book|appointment)\b/i],
  consult: [/\b(consultation|consult)\b/i],
  assessment: [/\b(assessment|preventive|package|health check|check.?up)\b/i],
  timings: [/\b(time|timing|hour|open|when)\b/i],
  bca: [/\b(body|composition|analyser|analyzer|fat|muscle|bca)\b/i],
  fundus: [/\b(fundus|retina|eye|remidio|camera)\b/i],
  echo: [/\b(echo|heart|2d|cardiac)\b/i],
  location: [/\b(location|address|where|map|reach|directions)\b/i],
  doctor: [/\b(doctor|physician|satish|naga|who)\b/i],
  diabetes: [/\b(diabetes|sugar|fatty|liver|metabolic|obesity|thyroid|bp|pressure|cholesterol)\b/i],
  fever: [/\b(fever|typhoid|dengue|infection|jvara)\b/i],
  callback: [/\b(callback|call back|call me)\b/i],
  whatsapp: [/\b(whatsapp|chat)\b/i],
  thanks: [/\b(thanks|thank you|bye|dhanyavadam)\b/i],
};

const tePatterns: Record<string, RegExp[]> = {
  greeting: [/నమస్కార|హలో|హాయ్|hello|hi/i],
  book: [/అపాయింట్మెంట్|బుక్|book|appointment/i],
  consult: [/కన్సల్ట|consult|సందర్శన/i],
  assessment: [/అంచనా|assessment|ఆరోగ్య చెక్|check.?up|ప్యాకేజ/i],
  timings: [/టైమింగ్|సమయం|ఎప్పుడు|తెరుచు|open|hour/i],
  bca: [/బాడీ|body|composition|కంపోజిషన్|bca|fat|muscle/i],
  fundus: [/ఫండస్|fundus|కళ్ళ|eye|retina/i],
  echo: [/echo|హార్ట్|heart|2d|గుండె/i],
  location: [/చిరునామా|address|location|ఎక్కడ|where|map/i],
  doctor: [/డాక్టర్|doctor|satish|naga|physician/i],
  diabetes: [/డయాబెటిస్|diabetes|షుగర్|sugar|fatty|liver|obesity|bp|pressure|thyroid/i],
  fever: [/జ్వరం|fever|typhoid|dengue|dengue|infection/i],
  callback: [/కాల్ బ్యాక్|callback|call back|call me/i],
  whatsapp: [/whatsapp|వాట్సాప్|chat/i],
  thanks: [/ధన్యవాద|thanks|thank you|bye/i],
};

export function replyForInput(lang: Lang, input: string): BotReply {
  const q = input.trim();
  if (!q) return getReplyByKey(lang, "default");

  const patterns = lang === "te" ? { ...enPatterns, ...tePatterns } : enPatterns;

  for (const [key, regexes] of Object.entries(patterns)) {
    if (regexes.some((r) => r.test(q))) {
      if (key === "book" && /assessment|preventive|package|అssesment|ప్యాకేజ/i.test(q)) continue;
      return getReplyByKey(lang, key);
    }
  }

  if (lang === "te") {
    for (const [key, regexes] of Object.entries(tePatterns)) {
      if (regexes.some((r) => r.test(q))) return getReplyByKey(lang, key);
    }
  }

  return getReplyByKey(lang, "default");
}
