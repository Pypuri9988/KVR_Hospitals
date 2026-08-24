const API = "https://graph.facebook.com/v21.0";

export async function sendWhatsAppMessage({ phoneNumberId, token, to, payload }) {
  const res = await fetch(`${API}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      ...payload,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WhatsApp API error: ${res.status} ${err}`);
  }
  return res.json();
}

export async function sendText({ phoneNumberId, token, to, text }) {
  return sendWhatsAppMessage({
    phoneNumberId,
    token,
    to,
    payload: { type: "text", text: { body: text } },
  });
}

export async function sendInteractive({ phoneNumberId, token, to, interactive }) {
  return sendWhatsAppMessage({
    phoneNumberId,
    token,
    to,
    payload: { type: "interactive", interactive },
  });
}

export async function sendLanguagePicker({ phoneNumberId, token, to }) {
  return sendWhatsAppMessage({
    phoneNumberId,
    token,
    to,
    payload: {
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "Welcome to KVR Hospital 🏥\nChoose language / భాష ఎంచukondi",
        },
        action: {
          buttons: [
            { type: "reply", reply: { id: "lang_en", title: "English" } },
            { type: "reply", reply: { id: "lang_te", title: "తెలుగు" } },
          ],
        },
      },
    },
  });
}

export async function notifyDoctor({ phoneNumberId, token, doctorPhone, text }) {
  if (!doctorPhone) return;
  return sendText({ phoneNumberId, token, to: doctorPhone, text });
}
