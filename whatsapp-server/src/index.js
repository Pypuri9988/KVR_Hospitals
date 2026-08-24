import "dotenv/config";
import express from "express";
import { handleIncomingMessage, handleWebsiteBooking } from "./bot.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8787;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "change_me_kvr_webhook_verify";
const TOKEN = process.env.META_ACCESS_TOKEN || "";
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID || "";
const DOCTOR_ALERT_PHONE = (process.env.DOCTOR_ALERT_PHONE || "919491135557").replace(/\D/g, "");
const WEBHOOK_PATH = process.env.WEBHOOK_PATH || "/webhook";

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "kvr-whatsapp-server" });
});

/** Meta webhook verification */
app.get(WEBHOOK_PATH, (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

/** Meta incoming messages */
app.post(WEBHOOK_PATH, async (req, res) => {
  res.sendStatus(200);

  if (!TOKEN || !PHONE_NUMBER_ID) {
    console.warn("META_ACCESS_TOKEN or META_PHONE_NUMBER_ID not set — skipping message handling");
    return;
  }

  try {
    const entry = req.body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const messages = value?.messages;
    if (!messages?.length) return;

    for (const msg of messages) {
      const from = msg.from;
      const contactName = value?.contacts?.[0]?.profile?.name || "";
      let text = msg.text?.body || "";
      let buttonId = msg.interactive?.button_reply?.id || msg.interactive?.list_reply?.id || "";

      await handleIncomingMessage({
        from,
        text,
        buttonId,
        phoneNumberId: PHONE_NUMBER_ID,
        token: TOKEN,
        doctorAlertPhone: DOCTOR_ALERT_PHONE,
        contactName,
      });
    }
  } catch (err) {
    console.error("Webhook error:", err);
  }
});

/** Website booking form → patient confirmation + doctor alert */
app.post("/api/booking", async (req, res) => {
  if (!TOKEN || !PHONE_NUMBER_ID) {
    return res.status(503).json({ error: "WhatsApp API not configured" });
  }
  try {
    const { name, phone, concern, date, time, notes } = req.body || {};
    if (!name || !phone) return res.status(400).json({ error: "name and phone required" });

    await handleWebsiteBooking({
      name,
      phone,
      concern: concern || "Consultation",
      date: date || "-",
      time: time || "-",
      notes: notes || "",
      phoneNumberId: PHONE_NUMBER_ID,
      token: TOKEN,
      doctorAlertPhone: DOCTOR_ALERT_PHONE,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send WhatsApp notifications" });
  }
});

app.listen(PORT, () => {
  console.log(`KVR WhatsApp server on http://localhost:${PORT}`);
  console.log(`Webhook: GET/POST ${WEBHOOK_PATH}`);
  if (!TOKEN) console.warn("Set META_ACCESS_TOKEN in whatsapp-server/.env");
});
