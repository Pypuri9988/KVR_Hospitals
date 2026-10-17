import fs from "fs";

const te = JSON.parse(fs.readFileSync("te-strings.json", "utf8"));

// Pure Telugu strings (Unicode escapes to avoid encoding corruption)
te.medicineConfirmBody =
  "\u0C2E\u0C02\u0C26\u0C41\u0C32\u0C41 \u0C05\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C41 \u0C30\u0C3E\u0C36\u0C3F \u0C2B\u0C4B\u0C1F\u0C4B, \u0C30\u0C4B\u0C17\u0C3F \u0C2A\u0C47\u0C30\u0C41, \u0C05\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C41 \u0C1A\u0C3F\u0C30\u0C41\u0C28\u0C3E\u0C2E\u0C3E, \u0C2E\u0C4B\u0C2C\u0C48\u0C32\u0C3F \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F.\n\u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C41 \u0C17\u0C41\u0C30\u0C3F\u0C02\u0C1A\u0C3F WhatsApp \u0C32\u0C4B \u0C24\u0C46\u0C32\u0C3F\u0C2F\u0C1C\u0C47\u0C38\u0C4D\u0C24\u0C3E\u0C2E\u0C41.";

te.registerPromptBody =
  "KVR Hospital \u0C15\u0C41 \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02! \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C2F\u0C3F \u0C07\u0C35\u0C3F \u0C2A\u0C02\u0C1A\u0C02\u0C21\u0C3F:\n\u2022 \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C2A\u0C47\u0C30\u0C41\n\u2022 \u0C35\u0C2F\u0C38\u0C4D\u0C38\u0C41\n\u2022 \u0C2E\u0C4B\u0C2C\u0C48\u0C32\u0C3F \u0C28\u0C02\u0C2C\u0C30\u0C4D\n\u2022 \u0C2A\u0C4D\u0C30\u0C27\u0C3E\u0C28 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F\n\n\u0C2E\u0C3E \u0C2C\u0C43\u0C02\u0C26\u0C02 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C38\u0C3F \u0C24\u0C4D\u0C35\u0C30\u0C32\u0C4B \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.";

te.default =
  "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C2F\u0C3F \u0C15\u0C4D\u0C30\u0C02\u0C26 \u0C38\u0C47\u0C35\u0C32 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E \u0C28\u0C41 \u0C28\u0C2C\u0C21\u0C24\u0C3F, \u0C05\u0C28\u0C28\u0C3F \u0C38\u0C47\u0C35\u0C32\u0C41 \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F.\n*menu* \u0C05\u0C28\u0C3F \u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C38\u0C3F\u0C24\u0C47 \u0C2E\u0C46\u0C28\u0C42 \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C35\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.";

te.confirmYes = "\u2705 \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F";
te.confirmNo = "\u274C \u0C30\u0C26\u0C4D\u0C26\u0C41";

let s = fs.readFileSync("src/messages.js", "utf8");

s = s.replace(/\n\s*menuListButtonTe: "removed",/g, "");
s = s.replace(
  /\n\s*careAssistantIntro:[\s\S]*?\n\s*careAssistantSection: "KVR Care assistant",/g,
  "",
);

function setField(key, value) {
  const re = new RegExp(`${key}:\\n\\s*"[^"]*"(?=,|\n)`, "m");
  if (re.test(s)) {
    s = s.replace(re, `${key}:\n      ${JSON.stringify(value)}`);
    return;
  }
  if (!s.includes(`${key}:`)) {
    s = s.replace(
      /(hubQuickIntro:[^\n]+\n)/,
      `$1    ${key}: ${JSON.stringify(value)},\n`,
    );
  }
}

for (const key of [
  "langPicker",
  "menuIntro",
  "menuListButton",
  "menuSectionAll",
  "hubQuickIntro",
  "listFooterHint",
  "chatWelcome",
  "conditions",
  "default",
]) {
  setField(key, te[key]);
}

s = s.replace(
  /consultConfirm:\n\s*"✅ \*సంప్రదింపు అభ్యర్థన అందింది\*\\n\\nDr\. Naga Satish Kumar Kota/,
  `"✅ *సంప్రదింపు అభ్యర్థన అందింది*\\n\\nడాక్టర్ నాగ సతీష్ కుమార్ కోటా`,
);

s = s.replace(
  /medicineConfirm:\n\s*"💊 \*Medicine delivery\*\\n\\n[^"]+"/,
  `medicineConfirm:\n      "💊 *మందుల ఇంటికే అందింపు*\\n\\n${te.medicineConfirmBody}\\n\\n📞 "`,
);

if (!/registerPrompt:/.test(s)) {
  s = s.replace(
    /(medicineConfirm:[\s\S]*?links\.phone,\n)/,
    `$1    registerPrompt:\n      "📝 *కొత్త రోగి నమోదు*\\n\\n${te.registerPromptBody}\\n\\n📞 " +\n      links.phone,\n`,
  );
} else {
  s = s.replace(
    /registerPrompt:\n\s*"[^"]+" \+\n\s*links\.phone,/,
    `registerPrompt:\n      "📝 *కొత్త రోగి నమోదు*\\n\\n${te.registerPromptBody}\\n\\n📞 " +\n      links.phone,`,
  );
}

s = s.replace(
  /export function hubQuickButtonsInteractive\(lang\) \{\n  const labels = \[\n    \{ id: "chat", title: "💬 Chat" \},\n    \{ id: "book", title: "📅 Book Appt" \},\n    \{ id: "open_menu", title: "📋 All options" \},\n  \];/,
  `export function hubQuickButtonsInteractive(lang) {
  const labels =
    lang === "te"
      ? [
          { id: "chat", title: ${JSON.stringify(te.quickChat)} },
          { id: "book", title: ${JSON.stringify(te.quickBook)} },
          { id: "open_menu", title: ${JSON.stringify(te.quickMenu)} },
        ]
      : [
          { id: "chat", title: "💬 Chat" },
          { id: "book", title: "📅 Book Appt" },
          { id: "open_menu", title: "📋 All options" },
        ];`,
);

s = s.replace(
  /const yesTitle = lang === "te" \? "✅ Confirm" : "✅ Confirm";\n  const noTitle = lang === "te" \? "❌ Cancel" : "❌ Cancel";/,
  `const yesTitle = lang === "te" ? ${JSON.stringify(te.confirmYes)} : "✅ Confirm";\n  const noTitle = lang === "te" ? ${JSON.stringify(te.confirmNo)} : "❌ Cancel";`,
);

fs.writeFileSync("src/messages.js", s);
console.log("Telugu WhatsApp copy updated.");
