import "dotenv/config";
import { notifyStaffBookingConfirmed } from "../src/staffAlert.js";

const r = await notifyStaffBookingConfirmed({
  phoneNumberId: process.env.META_PHONE_NUMBER_ID,
  token: process.env.META_ACCESS_TOKEN,
  botPhone: process.env.CLINIC_PHONE || "919491135557",
  patientPhone: "917989113481",
  type: "Consultation",
  fullName: "Test Patient",
  concern: "Diabetes",
  date: "Mon 3 Oct",
  time: "2:00 PM",
  patientMobile: "+91 79891 13481",
  fallbackText: "Fallback text alert",
});
console.log(JSON.stringify(r, null, 2));
process.exit(r.ok ? 0 : 1);
