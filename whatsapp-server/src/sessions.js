/** @typedef {'en' | 'te'} Lang */

/**
 * @typedef {Object} BookingDraft
 * @property {string} [type]
 * @property {string} [fullName]
 * @property {string} [symptoms]
 * @property {string} [date]
 * @property {string} [time]
 */

/**
 * @typedef {Object} Session
 * @property {Lang} [lang]
 * @property {string} [step]
 * @property {BookingDraft} [booking]
 * @property {ServiceRequestDraft} [serviceRequest]
 */

/**
 * @typedef {Object} ServiceRequestDraft
 * @property {'medicine' | 'sample'} type
 * @property {string} [fullName]
 * @property {string} [address]
 * @property {string} [mediaId]
 * @property {string} [mimeType]
 */

/** @type {Map<string, Session>} */
export const sessions = new Map();

export function getSession(waId) {
  if (!sessions.has(waId)) sessions.set(waId, {});
  return sessions.get(waId);
}

export function setLang(waId, lang) {
  const s = getSession(waId);
  s.lang = lang;
  s.step = "menu";
  s.booking = undefined;
  s.serviceRequest = undefined;
}

export function clearSession(waId) {
  sessions.delete(waId);
}

export function resetToMenu(waId) {
  const s = getSession(waId);
  s.step = "menu";
  s.booking = undefined;
  s.serviceRequest = undefined;
}

export function isBookingStep(step) {
  return typeof step === "string" && step.startsWith("book_");
}

export function isServiceStep(step) {
  return typeof step === "string" && step.startsWith("service_");
}
