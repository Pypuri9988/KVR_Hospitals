/**
 * Test doctor booking alert via Meta Cloud API (uses server .env).
 * Usage: node scripts/test-doctor-alert.mjs [--dry-run]
 */
import "dotenv/config";
import { BOOKING_STAFF_PHONE, CLINIC_BOT_PHONE_DEFAULT } from "../src/config.js";
import { doctorBookingAlert } from "../src/messages.js";
import { notifyDoctor } from "../src/meta.js";

const dryRun = process.argv.includes("--dry-run");
const token = process.env.META_ACCESS_TOKEN || "";
const phoneNumberId = process.env.META_PHONE_NUMBER_ID || "";
const doctorPhone = BOOKING_STAFF_PHONE;
const botPhone = (process.env.CLINIC_PHONE || CLINIC_BOT_PHONE_DEFAULT).replace(/\D/g, "");

const sampleText = doctorBookingAlert({
  type: "Consultation",
  fullName: "Test Patient KVR",
  symptoms: "Diabetes & Prediabetes",
  date: "Mon, 2 Oct",
  time: "12:00 PM",
  phone: "+91 79891 13481",
  waName: "Alert Test",
});

console.log("Config:");
console.log("  PHONE_NUMBER_ID:", phoneNumberId ? `${phoneNumberId.slice(0, 6)}…` : "MISSING");
console.log("  TOKEN:", token ? "set" : "MISSING");
console.log("  BOOKING_STAFF_PHONE:", doctorPhone);
console.log("  CLINIC_PHONE:", botPhone);
console.log("  Message length:", sampleText.length);
console.log("");

if (!token || !phoneNumberId) {
  console.error("Set META_ACCESS_TOKEN and META_PHONE_NUMBER_ID in .env");
  process.exit(1);
}

if (dryRun) {
  console.log("Dry run — message preview:\n");
  console.log(sampleText);
  process.exit(0);
}

const result = await notifyDoctor({
  phoneNumberId,
  token,
  doctorPhone,
  botPhone,
  patientPhone: "917989113481",
  text: sampleText,
  allowSameAsPatient: true,
});

if (result.ok) {
  console.log("SUCCESS:", JSON.stringify(result, null, 2));
  process.exit(0);
}

console.error("FAILED:", result.skipped ? `skipped (${result.reason})` : result.error || "unknown");
process.exit(1);
