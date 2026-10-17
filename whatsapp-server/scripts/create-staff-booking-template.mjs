/**
 * Submit utility template for staff booking alerts (Meta approval required).
 * Usage: node scripts/create-staff-booking-template.mjs
 */
import "dotenv/config";

const token = process.env.META_ACCESS_TOKEN;
const waba = process.env.META_WABA_ID;
if (!token || !waba) {
  console.error("Need META_ACCESS_TOKEN and META_WABA_ID");
  process.exit(1);
}

const body = {
  name: "kvr_staff_booking",
  language: "en",
  category: "UTILITY",
  components: [
    {
      type: "BODY",
      text: "KVR Hospital — new appointment confirmed.\n\nPatient: {{1}}\nConcern: {{2}}\nDate: {{3}}\nTime: {{4}}\nMobile: {{5}}\n\nPlease review in your schedule.",
      example: {
        body_text: [["Ravi Kumar", "Diabetes care", "Mon 3 Oct", "2:00 PM", "+91 98765 43210"]],
      },
    },
  ],
};

const res = await fetch(`https://graph.facebook.com/v21.0/${waba}/message_templates`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
console.log(res.status, await res.text());
