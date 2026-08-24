export const copy = {
  en: {
    chooseLang: "Welcome to KVR Hospital 🏥\nChoose your language:",
    greeting:
      "Hello! I'm KVR Care assistant for Dr. Naga Satish Kumar Kota.\nReply with a number or tap an option:",
    menu: `*KVR Hospital Menu*
1️⃣ Book appointment
2️⃣ Book consultation
3️⃣ Health assessment
4️⃣ Body composition (BCA)
5️⃣ Timings & location
6️⃣ Fever / typhoid / dengue care
7️⃣ Talk to care team
8️⃣ Change language`,
    bookConfirm:
      "✅ Thank you! Your appointment request is received.\nWe will confirm shortly on WhatsApp.\n\nKVR Hospital · Mon–Sat 9 AM–8 PM\nWalk-ins welcome.",
    consultConfirm:
      "✅ Consultation request received with Dr. Naga Satish Kumar Kota.\nOur team will reply soon.",
    assessmentConfirm: "✅ Health assessment booking request received. We will share package details shortly.",
    bcaConfirm: "✅ Body Composition Analysis (BCA) booking request received.",
    timings: "🕘 Mon – Sat: 9 AM – 8 PM\nWalk-ins welcome\n📍 KVR Hospital, Main Road, Beside LIC Office, Ramachandrapuram 533255",
    fever:
      "🌡️ Evidence-based fever care at KVR Hospital.\nNot every typhoid patient needs injections; not every dengue patient needs platelet transfusion.\nReply with symptoms or visit us.",
    default: "Please reply 1–8 from the menu, or type *menu*.",
    langChanged: "Language set to English. Type *menu* for options.",
    doctorAlert: (name, phone, note) =>
      `🔔 *New patient enquiry*\nFrom: ${name || "WhatsApp user"}\nPhone: ${phone || "-"}\nNote: ${note || "-"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  },
  te: {
    chooseLang: "KVR Hospital కు స్వాగతం 🏥\nమీ భాష ఎంచukondi:",
    greeting:
      "నమస్కారం! Dr. Naga Satish Kumar Kota గారి KVR Care assistant.\nనంబర్ reply చేయండి:",
    menu: `*KVR Hospital Menu*
1️⃣ అపాయింట్మెంట్ బుక్
2️⃣ కన్సల్టేషన్ బుక్
3️⃣ ఆరోగ్య అంచనా
4️⃣ శరీర కూర్పు (BCA)
5️⃣ టైమింగ్స్ & చిరునామా
6️⃣ జ్వరం / typhoid / dengue
7️⃣ care team తో మాట్లాడండి
8️⃣ భాష మార్చండి`,
    bookConfirm:
      "✅ ధన్యవాదాలు! మీ appointment request అందింది.\nత్వరలో WhatsApp లో confirm చేస్తాము.\n\nKVR Hospital · సోమ–శని 9 AM–8 PM",
    consultConfirm: "✅ Dr. Naga Satish Kumar Kota consultation request అందింది. త్వరలో reply చేస్తాము.",
    assessmentConfirm: "✅ ఆరోగ్య అంచనా booking request అందింది.",
    bcaConfirm: "✅ Body Composition Analysis (BCA) booking request అందింది.",
    timings:
      "🕘 సోమ–శని: 9 AM – 8 PM\nWalk-in స్వాగతం\n📍 KVR Hospital, Main Road, LIC beside, Ramachandrapuram 533255",
    fever:
      "🌡️ KVR Hospital లో evidence-based fever care.\nPrati typhoid ki injection avasaram ledu; prati dengue ki platelet avasaram ledu.\nSymptoms pampandi leda visit avandi.",
    default: "Menu 1–8 reply cheyandi, leda *menu* type cheyandi.",
    langChanged: "భాష Telugu set ayindi. Options kosam *menu* type cheyandi.",
    doctorAlert: (name, phone, note) =>
      `🔔 *కొత్త patient enquiry*\nFrom: ${name || "WhatsApp user"}\nPhone: ${phone || "-"}\nNote: ${note || "-"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  },
};

export function langButtons() {
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: "KVR Hospital · Choose language\nKVR Hospital · భాష ఎంచukondi" },
      action: {
        buttons: [
          { type: "reply", reply: { id: "lang_en", title: "English" } },
          { type: "reply", reply: { id: "lang_te", title: "తెలుగు" } },
        ],
      },
    },
  };
}

export function menuButtons(lang) {
  const t = copy[lang];
  return {
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: t.greeting },
      action: {
        buttons: [
          { type: "reply", reply: { id: "book", title: lang === "en" ? "Book appointment" : "Appointment" } },
          { type: "reply", reply: { id: "timings", title: lang === "en" ? "Timings" : "Timings" } },
          { type: "reply", reply: { id: "lang_switch", title: lang === "en" ? "Language" : "భాష" } },
        ],
      },
    },
  };
}
