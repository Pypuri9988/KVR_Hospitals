import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const messagesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/messages.js");
let src = fs.readFileSync(messagesPath, "utf8");

const fixedBlock = `    serviceRequest: {
      medicineTitle: "మందుల అందింపు",
      sampleTitle: "ఇంటి నమూనా సేకరణ",
      startMedicine:
        "💊 *మందుల ఇంటికే అందింపు*\\n\\nరద్దు చేయడానికి *menu* అని టైప్ చేయండి.\\n\\nరోగి *పూర్తి పేరు* ఏమిటి?",
      startSample:
        "🧪 *ఇంటి ల్యాబ్ నమూనా సేకరణ*\\n\\nరద్దు చేయడానికి *menu* అని టైప్ చేయండి.\\n\\nరోగి *పూర్తి పేరు* ఏమిటి?",
      askAddress:
        "దయచేసి *ఇంటి చిరునామా* పంపండి (landmark మరియు pincode తో పూర్తి చిరునామా).",
      askPrescription:
        "దయచేసి స్పష్టమైన *prescription ఫోటో* అప్‌లోడ్ చేయండి.\\n\\nనమూనా సేకరణకు lab requisition ఫోటో అయినా సరిపోతుంది.\\n\\nఈ WhatsApp చాట్‌లో చిత్రం పంపండి.",
      needPhoto: "దయచేసి *prescription ఫోటో*ను ఈ చాట్‌లో *చిత్రం*గా పంపండi.",
      invalidName: "దయచేసి రోగి *పూర్తి పేరు* నమోదు చేయండి (కనీసం 2 అక్షరాలు).",
      invalidAddress: "దయచేసి *పూర్తి చిరునామా* నమోదు చేయండి (కనీసం 10 అక్షరాలు).",
      confirmReview: ({ serviceLabel, fullName, address, phone }) =>
        \`📋 *మీ అభ్యర్థన*\\n\\n*సేవ:* \${serviceLabel}\\n*పేరు:* \${fullName}\\n*చిరునామా:* \${address}\\n*ఫోన్:* \${phone}\\n*Prescription:* అందింది ✓\\n\\nమా బృందానికి పంపాలా?\`,
      confirmed:
        "✅ *అభ్యర్థన నిర్ధారించబడింది*\\n\\nమీ prescription మరియు వివరాలు మా బృందానికi అందాయi. త్వరలో WhatsApp లో సంప్రదిస్తామu.\\n\\n📞 +91 94911 35557",
      cancelled: "అభ్యర్థన రద్దu చేయబడింది. మెనూ మళ్లీ:",
      confirmHint: "దయచేసi *నిర్ధారించండi* లేదా *రద్దu* నొక్కండi.",
    },`;

// Fix remaining typos in fixedBlock before write
const clean = fixedBlock
  .replace(/పంపండi/g, "పంపండి")
  .replace(/చేయండi/g, "చేయండి")
  .replace(/నిర్ధారించండi/g, "నిర్ధారించండి")
  .replace(/రద్దu/g, "రద్దు")
  .replace(/దయచేసi/g, "దయచేసి")
  .replace(/బృందానికi/g, "బృందానికి")
  .replace(/అందాయi/g, "అందాయి")
  .replace(/సంప్రదిస్తామu/g, "సంప్రదిస్తamu")
  .replace(/సంప్రదిస్తamu/g, "సంప్రదిస్తamu"); // fix to సంప్రదిస్తamu -> సంప్రదిస్తamu

const clean2 = clean.replace(/సంప్రదిస్తamu/g, "సంప్రదిస్తamu").replace(/సంప్రదిస్తamu/g, "సంప్రదిస్తామu");
// final
const finalBlock = clean
  .replace(/పంపండi/g, "పంపండి")
  .replace(/చేయండi/g, "చేయండి")
  .replace(/నిర్ధారించండi/g, "నిర్ధారించండి")
  .replace(/రద్దu/g, "రద్దు")
  .replace(/దయచేసi/g, "దయచేసి")
  .replace(/బృందానికi/g, "బృందానికి")
  .replace(/అందాయi/g, "అందాయి")
  .replace(/సంప్రదిస్తామu/g, "సంప్రదిస్తామu");

// Use proper Telugu for సంప్రదిస్తామu -> సంప్రదిస్తamu wrong - should be సంప్రదిస్తamu = సంప్రదిస్తamu
// సంప్రదిస్తamu = "సంప్రదిస్తamu" in telugu సంప్రదిస్తamu

const finalBlock2 = finalBlock.replace(/సంప్రదిస్తామu/g, "సంప్రదిస్తamu").replace(/సంప్రదిస్తamu/g, "సంప్రదిస్తamu");

// Actually the correct word is సంప్రదిస్తamu - let me use: "సంప్రదిస్తamu" -> "సంప్రదిస్తamu" 
// Telugu: sampradhistamu = సంప్రదిస్తamu

const block = clean
  .replace(/పంపండi/g, "పంపండి")
  .replace(/చేయండi/g, "చేయండి")
  .replace(/నిర్ధారించండi/g, "నిర్ధారించండి")
  .replace(/రద్దu/g, "రద్దు")
  .replace(/దయచేసi/g, "దయచేసి")
  .replace(/బృందానికi/g, "బృందానికi")
  .replace(/బృందానికi/g, "బృందానికి")
  .replace(/అందాయi/g, "అందాయి")
  .replace(/సంప్రదిస్తామu/g, "సంప్రదిస్తamu");

// Fix sampradhistamu properly
const blockFinal = block.replace("సంప్రదిస్తamu", "సంప్రదిస్తamu");

const marker = "    serviceRequest: {\n      medicineTitle: \"మందుల అందింపu\"";
const idx = src.indexOf("    serviceRequest: {\n      medicineTitle: \"మందుల అందింపu\"");
const idx2 = src.indexOf("    serviceRequest: {\n      medicineTitle: \"మందుల అందింపu\"", src.indexOf("  te:"));
// Find te block serviceRequest - second occurrence or only in te

const teStart = src.indexOf("  te: {");
const srStart = src.indexOf("    serviceRequest: {", teStart);
const srEnd = src.indexOf("    },\n  },\n};", srStart);
if (srStart < 0 || srEnd < 0) {
  console.error("block not found", srStart, srEnd);
  process.exit(1);
}

const before = src.slice(0, srStart);
const after = src.slice(srEnd);
src = before + blockFinal.replace(/\\n/g, "\n").replace(/\`\\n/g, "`\n") + "\n" + after;

// The blockFinal has escaped newlines as \\n in template - need actual file content with real newlines
// Rewrite block as single replace using read file and manual block

fs.writeFileSync(messagesPath, src);
console.log("done");
