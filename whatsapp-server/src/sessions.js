/** @typedef {'en' | 'te'} Lang */

/** @type {Map<string, { lang?: Lang, step?: string }>} */
export const sessions = new Map();

export function getSession(waId) {
  if (!sessions.has(waId)) sessions.set(waId, {});
  return sessions.get(waId);
}

export function setLang(waId, lang) {
  const s = getSession(waId);
  s.lang = lang;
  s.step = "menu";
}

export function clearSession(waId) {
  sessions.delete(waId);
}
