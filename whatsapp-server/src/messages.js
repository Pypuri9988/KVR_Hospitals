export const links = {
  website: "https://kvrhospitals.com",
  book: "https://kvrhospitals.com/#book",
  maps: "https://www.google.com/maps/search/?api=1&query=KVR+Hospital+Main+Road+Ramachandrapuram+East+Godavari+533255",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=KVR+Hospital+Main+Road+Ramachandrapuram+East+Godavari+533255",
  phone: "+91 94911 35557",
};

/** Staff alert (Sitara-style) — sent to doctor mobile, not the Meta bot line. */
export function doctorBookingAlert({ type, fullName, symptoms, date, time, phone, waName }) {
  return (
    `🔔 *New appointment — KVR Hospital*\n\n` +
    `*Service:* ${type}\n` +
    `*Patient name:* ${fullName}\n` +
    `*Health concern:* ${symptoms}\n` +
    `*Date:* ${date}\n` +
    `*Time:* ${time}\n` +
    `*Patient mobile:* ${phone}\n` +
    `*WhatsApp profile name:* ${waName || "-"}\n` +
    `*Booked via:* WhatsApp bot (+91 94911 35557)\n` +
    `*Received:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
  );
}

/** WhatsApp list row title max 24 chars — emoji + label */
function menuRow({ id, icon, title, description }) {
  return {
    id,
    title: `${icon} ${title}`.slice(0, 24),
    description: description.slice(0, 72),
  };
}

/** Sitara360-style "See all options" list (home sample pickup; no home visit). */
const ALL_OPTIONS_ITEMS = {
  en: [
    { id: "consult", icon: "📅", title: "Book consultation", description: "Schedule a visit with our physician" },
    { id: "sample", icon: "🧪", title: "Home sample pickup", description: "Lab sample collection at your home" },
    { id: "medicine", icon: "💊", title: "Medicine delivery", description: "Order prescription medicines to your home" },
    { id: "timings", icon: "🕒", title: "Timings & location", description: "Hours and how to reach us" },
    { id: "talk", icon: "💬", title: "Talk to KVR Care", description: "Chat with our care team on WhatsApp" },
  ],
  te: [
    { id: "consult", icon: "📅", title: "కన్సల్టేషన్", description: "వైద్య సందర్శనకు అపాయింట్మెంట్ తీసుకోండి" },
    { id: "sample", icon: "🧪", title: "మీ ఇంటి నుండే sample", description: "మీ ఇంటి నుండే lab sample collection" },
    { id: "medicine", icon: "💊", title: "మందుల order", description: "Prescription ఆధారంగా మందులు order చేయండి" },
    { id: "timings", icon: "🕒", title: "సమయం & చిరునామా", description: "పని గంటలు మరియు చిరునామా" },
    { id: "talk", icon: "💬", title: "KVR Care", description: "సంరక్షణ బృందంతో వాట్సాప్‌లో మాట్లాడండి" },
  ],
};

export const copy = {
  en: {
    langPicker:
      "Welcome to KVR Hospital 🏥\n\nRamachandrapuram · Preventive healthcare under Dr. Naga Satish Kumar Kota\n\nPlease choose your language:",
    menuIntro:
      "*Welcome to KVR Hospital* 🏥\n\nRamachandrapuram · Dr. Naga Satish Kumar Kota\n\nTap *See all options* below and choose the service with the icon you need.",
    menuListButton: "See all options",
    menuSectionAll: "All options",
    hubQuickIntro: "How can we help you today?",
    listFooterHint: "Tap an item to select it.",
    chatWelcome:
      "💬 *KVR Hospital chat*\n\nYou are connected to our care team — we will reply here shortly.\n\nSend your question or request below.",
    conditions:
      "🩺 *Conditions we treat*\n\n• Diabetes & prediabetes\n• Hypertension (BP)\n• Obesity & metabolic health\n• Fatty liver & thyroid\n• Fever / typhoid / dengue\n• Senior & preventive care\n\nWould you like to book a consultation?",
    bookConfirm:
      "✅ *Appointment request received*\n\nOur team will confirm shortly on WhatsApp.\n\n🕘 Mon–Sat: 9 AM–8 PM · Walk-ins welcome\n🌐 Book online: " +
      links.book,
    consultConfirm:
      "✅ *Consultation request received*\n\nDr. Naga Satish Kumar Kota (MD Internal Medicine) will review your request.\n\n🌐 " +
      links.website,
    assessmentConfirm:
      "✅ *Health assessment request received*\n\nWe will share package details on WhatsApp shortly.\n\n🌐 View assessments: " +
      links.website,
    bcaConfirm: "✅ *BCA (Body Composition) request received*\n\nOur team will confirm your slot soon.\n\n🌐 " + links.website,
    timings:
      "🕘 *Opening hours*\nMon – Sat: 9 AM – 8 PM\nWalk-ins welcome\n\n📍 *Address*\nKVR Hospital, Main Road, Beside LIC Office\nRamachandrapuram, East Godavari 533255\n\n📞 " +
      links.phone +
      "\n🌐 " +
      links.website +
      "\n🗺️ " +
      links.maps,
    fever:
      "🌡️ *Fever / typhoid / dengue care*\n\nEvidence-based treatment at KVR Hospital — not every typhoid case needs injections; not every dengue case needs platelet transfusion.\n\nPlease share symptoms here or visit us directly.\n\n📞 " +
      links.phone +
      "\n🗺️ " +
      links.directions,
    talk:
      "💬 *Care team*\n\nThank you — a team member will reply shortly.\n\nYou can also call us:\n📞 " +
      links.phone +
      "\n🌐 " +
      links.website,
    medicineConfirm:
      "💊 *Medicine delivery*\n\nPlease send prescription photo, patient name, delivery address & phone.\nWe will confirm availability and delivery on WhatsApp.\n\n📞 " +
      links.phone,
    sampleConfirm:
      "🧪 *Home sample collection*\n\nPlease send:\n• Patient full name\n• Tests needed (or prescription photo)\n• Home address & mobile number\n• Preferred date & time\n\nOur team will arrange sample pickup.\n\n📞 " +
      links.phone,
    noHomeVisit:
      "We do not offer home visits. Please *book a consultation* or choose *home sample pickup* from the menu.\n\n📞 " +
      links.phone,
    registerPrompt:
      "📝 *New patient registration*\n\nWelcome to KVR Hospital! Please share:\n• Full name\n• Age\n• Mobile number\n• Main health concern\n\nOur team will register you and confirm shortly.\n\n📞 " +
      links.phone,
    default: "Please tap *See all options* below to view services with icons.\nType *menu* anytime to open the menu again.",
    langChanged: "Language set to English.",
    doctorAlert: (name, phone, note) =>
      `🔔 *New patient enquiry*\nFrom: ${name || "WhatsApp user"}\nPhone: ${phone || "-"}\nNote: ${note || "-"}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    booking: {
      start: (type) =>
        `📋 *${type} booking*\n\nPlease answer each question on WhatsApp.\nType *menu* anytime to cancel.\n\nWhat is the patient's *full name*?`,
      askDate: "Preferred *date* for visit?\n(e.g. 10-09-2026 or tomorrow)",
      askTime: "Preferred *time*?\n(e.g. 10 AM, evening, or walk-in)",
      invalidFullName: "Please enter the patient's full name (at least 2 characters).",
      pickConcernHint: "Please tap *🩺 Health concern* below and choose from the list.",
      pickDateHint: "Please tap *📅 Pick a date* below and choose from the calendar list.",
      pickTimeHint: "Please tap *🕘 Pick a time* below and choose a slot.",
      confirmReview: ({ type, fullName, symptoms, date, time, phone }) =>
        `📋 *Please review your booking*\n\n*Type:* ${type}\n*Name:* ${fullName}\n*Concern:* ${symptoms}\n*Date:* ${date}\n*Time:* ${time}\n*Phone:* ${phone}\n\nConfirm booking?`,
      confirmYes: "✅ Confirm",
      confirmNo: "❌ Cancel",
      confirmHint: "Please tap *Confirm* or *Cancel* below.",
      cancelled: "Booking cancelled. Here is the menu again:",
      summary: ({ type, fullName, symptoms, date, time, phone }) =>
        `✅ *Appointment confirmed*\n\n*Type:* ${type}\n*Name:* ${fullName}\n*Concern:* ${symptoms}\n*Date:* ${date}\n*Time:* ${time}\n*Phone:* ${phone}\n\nPlease visit KVR Hospital on the date and time above.\n\n🕘 Mon–Sat: 9 AM – 8 PM · Walk-ins welcome\n📞 +91 94911 35557`,
    },
    serviceRequest: {
      medicineTitle: "Medicine delivery",
      sampleTitle: "Home sample pickup",
      startMedicine:
        "💊 *Medicine delivery*\n\nType *menu* anytime to cancel.\n\nWhat is the *patient full name*?",
      startSample:
        "🧪 *Home sample collection*\n\nType *menu* anytime to cancel.\n\nWhat is the *patient full name*?",
      askAddress: "Please send *delivery address* (full address with landmark & pincode).",
      askPrescription:
        "Please upload a clear *photo of the prescription* (or lab requisition for sample pickup).\n\nSend the image in this chat.",
      needPhoto: "Please send a *prescription photo* as an image in this chat.",
      invalidName: "Please enter the patient full name (at least 2 characters).",
      invalidAddress: "Please enter a complete address (at least 10 characters).",
      confirmReview: ({ serviceLabel, fullName, address, phone }) =>
        `📋 *Please review*\n\n*Service:* ${serviceLabel}\n*Name:* ${fullName}\n*Address:* ${address}\n*Phone:* ${phone}\n*Prescription:* received ✓\n\nConfirm to send to our team?`,
      confirmed:
        "✅ *Request confirmed*\n\nOur team has received your prescription and details. We will contact you shortly on WhatsApp.\n\n📞 +91 94911 35557",
      cancelled: "Request cancelled. Here is the menu again:",
      confirmHint: "Please tap *Confirm* or *Cancel* below.",
    },
  },
  te: {
    langPicker:
      "KVR Hospital కు స్వాగతం 🏥\n\nరామచంద్రపురం · డాక్టర్ నాగ సతీష్ కుమార్ కోటా గారి నిర్వహణలో నివారక ఆరోగ్య సంరక్షణ\n\nదయచేసి మీ భాషను ఎంచుకోండి:",
    menuIntro:
      "*KVR Hospital* 🏥 కు స్వాగతం\n\nరామచంద్రపురం · డాక్టర్ నాగ సతీష్ కుమార్ కోటా\n\nక్రింద *అన్ని ఎంపికలు* ను నొక్కి, చిహ్నం ఉన్న మీ సేవను ఎంచుకోండి.",
    menuListButton: "అన్ని ఎంపికలు",
    menuSectionAll: "అన్ని సేవలు",
    hubQuickIntro: "మీకు ఈ రోజు ఎలా సహాయం చేయగలం?",
    listFooterHint: "ఎంపిక కోసం ఒక సేవపై నొక్కండి.",
    chatWelcome:
      "💬 *KVR Hospital చాట్*\n\nమీరు మా సంరక్షణ బృందంతో అనుసంధానమైనారు — మా బృందం ఇక్కడే వెంటనే సమాధానం ఇస్తుంది.\n\nమీ ప్రశ్న లేదా అభ్యర్థనను క్రింద పంపండి.",
    conditions:
      "🩺 *మేము చికిత్స చేసే వ్యాధులు*\n\n• మధుమేహం & ప్రీ-డయాబెటిస్\n• రక్తపోటు (BP)\n• ఊబకాయం & చమురు ఆరోగ్యం\n• కాలేయ కొళ్లు & థైరాయిడ్\n• జ్వరం / టైఫాయిడ్ / డెంగూ\n• వృద్ధ & నివారక సంరక్షణ\n\nవైద్య సంప్రదింపు అపాయింట్మెంట్ కావాలా?",
    bookConfirm:
      "✅ *అపాయింట్మెంట్ అభ్యర్థన అందింది*\n\nమా బృందం త్వరలో WhatsApp లో నిర్ధారిస్తుంది.\n\n🕘 సోమ–శని: ఉ. 9 – రా. 8 · నేరుగా రావచ్చు\n🌐 ఆన్‌లైన్ బుక్: " +
      links.book,
    consultConfirm:
      "✅ *సంప్రదింపు అభ్యర్థన అందింది*\n\nడాక్టర్ నాగ సతీష్ కుమార్ కోటా (MD Internal Medicine) మీ అభ్యర్థనను పరిశీలిస్తారు.\n\n🌐 " +
      links.website,
    assessmentConfirm:
      "✅ *ఆరోగ్య పరీక్ష అభ్యర్థన అందింది*\n\nప్యాకేజీ వివరాలు త్వరలో పంపుతాము.\n\n🌐 " + links.website,
    bcaConfirm: "✅ *శరీర కూర్పు (BCA) అభ్యర్థన అందింది*\n\nమీ స్లాట్‌ను త్వరలో నిర్ధారిస్తాము.\n\n🌐 " + links.website,
    timings:
      "🕘 *పని గంటలు*\nసోమ–శని: ఉ. 9 – రా. 8\nనేరుగా రావచ్చు\n\n📍 *చిరునామా*\nKVR Hospital, Main Road, LIC కార్యాలయం పక్కన\nరామచంద్రపురం, తూర్పు గోదావరి 533255\n\n📞 " +
      links.phone +
      "\n🌐 " +
      links.website +
      "\n🗺️ " +
      links.maps,
    fever:
      "🌡️ *జ్వరం / టైఫాయిడ్ / డెంగూ సంరక్షణ*\n\nKVR Hospital లో ఆధారిత చికిత్స — ప్రతి టైఫాయిడ్‌కు ఇంజక్షన్ అవసరం లేదు; ప్రతి డెంగూ‌కు ప్లేట్‌లెట్ అవసరం లేదు.\n\nలక్షణాలు ఇక్కడ పంపండి లేదా నేరుగా రండి.\n\n📞 " +
      links.phone +
      "\n🗺️ " +
      links.directions,
    talk:
      "💬 *సంరక్షణ బృందం*\n\nధన్యవాదాలు — మా బృందం త్వరలో సమాధానం ఇస్తుంది.\n\nమమ్మల్ని కాల్ చేయవచ్చు:\n📞 " +
      links.phone +
      "\n🌐 " +
      links.website,
    medicineConfirm:
      "💊 *మందుల order*\n\nPrescription ఫోటో, రోగి పేరు, delivery చిరునామా, మోబైల్ నంబర్ పంపండి.\nఅందుబాటు మరియు delivery గురించి WhatsApp లో తెలియజేస్తాము.\n\n📞 " +
      links.phone,
    sampleConfirm:
      "🧪 *మీ ఇంటి నుండే sample collection*\n\nదయచేసి పంపండి:\n• రోగి పూర్తి పేరు\n• అవసరమైన పరీక్షలు (లేదా prescription ఫోటో)\n• ఇంటి చిరునామా & మోబైల్ నంబర్\n• అనుకూలమైన తేదీ & సమయం\n\nమా బృందం మీ ఇంటి నుండి sample collection ఏర్పాటు చేస్తుంది.\n\n📞 " +
      links.phone,
    noHomeVisit:
      "ఇంటి వైద్య సందర్శన అందుబాటులో లేదు. Consultation book చేయండి లేదా, మీ ఇంటి నుండి sample collection ఎంచుకోండి.\n\n📞 " +
      links.phone,
    registerPrompt:
      "📝 *కొత్త రోగి నమోదు*\n\nKVR Hospital కు స్వాగతం! దయచేసి ఇవి పంపండి:\n• పూర్తి పేరు\n• వయస్సు\n• మోబైల్ నంబర్\n• ప్రధాన ఆరోగ్య సమస్య\n\nమా బృందం నమోదు చేసి త్వరలో నిర్ధారిస్తుంది.\n\n📞 " +
      links.phone,
    default: "దయచేసి క్రింద *అన్ని ఎంపికలు* ను నొక్కి సేవలు చూడండి.\n*menu* అని టైప్ చేస్తే మెనూ మళ్లీ వస్తుంది.",
    langChanged: "భాష తెలుగుకు మార్చబడింది.",
    doctorAlert: (name, phone, note) =>
      `🔔 *కొత్త రోగి అభ్యర్థన*\nపేరు: ${name || "WhatsApp user"}\nఫోన్: ${phone || "-"}\nవివరం: ${note || "-"}\nసమయం: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    booking: {
      start: (type) =>
        `📋 *${type} బుకింగ్*\n\nదయచేసి ప్రతి ప్రశ్నకు WhatsApp లో సమాధానం ఇవ్వండి.\nరద్దు చేయడానికి *menu* అని టైప్ చేయండి.\n\nరోగి *పూర్తి పేరు* ఏమిటి?`,
      askDate: "ఏ *తేదీ*కి రావాలనుకుంటున్నారు?\n(ఉదా: 10-09-2026 లేదా రేపు)",
      askTime: "ఏ *సమయం* అనుకూలం?\n(ఉదా: 10 AM, సాయంత్రం, నేరుగా రావడం)",
      invalidFullName: "దయచేసి రోగి పూర్తి పేరు నమోదు చేయండి (కనీసం 2 అక్షరాలు).",
      pickConcernHint: "దయచేసి క్రింద *🩺 ఆరోగ్య సమస్య* నొక్కండి, మెనూ నుండి ఏంచుకోండి.",
      pickDateHint: "దయచేసి క్రింద *📅 తేదీ ఎంచుకోండి* నొక్కండి, ఆ జాబితా నుండి తేదీ ఏంచుకోండి.",
      pickTimeHint: "దయచేసి క్రింద *🕘 సమయం ఎంచుకోండి* నొక్కి సమయం ఎంచుకోండి.",
      confirmReview: ({ type, fullName, symptoms, date, time, phone }) =>
        `📋 *మీ బుకింగ్ వివరాలు*\n\n*రకం:* ${type}\n*పేరు:* ${fullName}\n*ఆరోగ్య సమస్య:* ${symptoms}\n*తేదీ:* ${date}\n*సమయం:* ${time}\n*ఫోన్:* ${phone}\n\nబుకింగ్ నిర్ధారించాలా?`,
      confirmYes: "✅ నిర్ధారించండి",
      confirmNo: "❌ రద్దు",
      confirmHint: "దయచేసి *నిర్ధారించండి* లేదా *రద్దు* నొక్కండి.",
      cancelled: "బుకింగ్ రద్దు చేయబడింది. మెనూ మళ్లీ:",
      summary: ({ type, fullName, symptoms, date, time, phone }) =>
        `✅ *మీ అపాయింట్మెంట్ నిర్ధారితం*\n\n*రకం:* ${type}\n*పేరు:* ${fullName}\n*ఆరోగ్య సమస్య:* ${symptoms}\n*తేదీ:* ${date}\n*సమయం:* ${time}\n*ఫోన్:* ${phone}\n\nపైన పేర్కొన్న తేదీ మరియు సమయానికి KVR Hospital కి రండి.\n\n🕘 సోమ–శని: ఉ. 9 – రా. 8 · నేరుగా రావచ్చు\n📞 +91 94911 35557`,
    },
    serviceRequest: {
      medicineTitle: "మందుల order",
      sampleTitle: "మీ ఇంటి నుండే sample collection",
      startMedicine:
        "💊 *మందుల order*\n\nరద్దు చేయడానికి *menu* అని టైప్ చేయండి.\n\nరోగి *పూర్తి పేరు* ఏమిటి?",
      startSample:
        "🧪 *మీ ఇంటి నుండే sample collection*\n\nరద్దు చేయడానికి *menu* అని టైప్ చేయండి.\n\nరోగి *పూర్తి పేరు* ఏమిటి?",
      askAddress:
        "దయచేసి *ఇంటి చిరునామా* పంపండి (landmark మరియు pincode తో పూర్తి చిరునామా).",
      askPrescription:
        "దయచేసి స్పష్టమైన *prescription ఫోటో*ను ఈ WhatsApp chat లో *చిత్రంగా* పంపండి.\n\n*sample collection* కోసం lab requisition *ఫోటో* అయినా సరిపోతుంది.",
      needPhoto: "దయచేసి *prescription ఫోటో*ను ఈ చాట్‌లో *చిత్రం*గా పంపండి.",
      invalidName: "దయచేసి రోగి *పూర్తి పేరు* నమోదు చేయండి (కనీసం 2 అక్షరాలు).",
      invalidAddress: "దయచేసి *పూర్తి చిరునామా* నమోదు చేయండి (కనీసం 10 అక్షరాలు).",
      confirmReview: ({ serviceLabel, fullName, address, phone }) =>
        `📋 *మీ అభ్యర్థన*\n\n*సేవ:* ${serviceLabel}\n*పేరు:* ${fullName}\n*చిరునామా:* ${address}\n*ఫోన్:* ${phone}\n*Prescription:* అందింది ✓\n\nమా బృందానికి పంపాలా?`,
      confirmed:
        "✅ *అభ్యర్థన నిర్ధారించబడింది*\n\nమీ prescription మరియు వివరాలు మా బృందానికి అందాయి. త్వరలో WhatsApp లో మిమ్మల్ని సంప్రదిస్తాము.\n\n📞 +91 94911 35557",
      cancelled: "అభ్యర్థన రద్దు చేయబడింది. మెనూ మళ్లీ:",
      confirmHint: "దయచేసి *నిర్ధారించండి* లేదా *రద్దు* నొక్కండి.",
    },
  },
};

export function allOptionsRows(lang) {
  return ALL_OPTIONS_ITEMS[lang].map(menuRow);
}

export function menuRows(lang) {
  return allOptionsRows(lang);
}

export function languagePickerInteractive() {
  return {
    type: "button",
    body: {
      text:
        "Welcome to KVR Hospital 🏥\nRamachandrapuram · Dr. Naga Satish Kumar Kota\n\nPlease choose your language:\nదయచేసి మీ భాషను ఎంచుకోండి",
    },
    action: {
      buttons: [
        { type: "reply", reply: { id: "lang_en", title: "🇬🇧 English" } },
        { type: "reply", reply: { id: "lang_te", title: "🇮🇳 తెలుగు" } },
      ],
    },
  };
}

/** Sitara-style quick reply buttons (max 3) */
export function hubQuickButtonsInteractive(lang) {
  const labels =
    lang === "te"
      ? [
          { id: "chat", title: "💬 చాట్" },
          { id: "consult", title: "📅 కన్సల్టేషన్" },
          { id: "open_menu", title: "📋 సేవల జాబితా" },
        ]
      : [
          { id: "chat", title: "💬 Chat" },
          { id: "consult", title: "📅 Book consult" },
          { id: "open_menu", title: "📋 All options" },
        ];

  return {
    type: "button",
    body: { text: copy[lang].hubQuickIntro },
    action: {
      buttons: labels.map((b) => ({ type: "reply", reply: { id: b.id, title: b.title.slice(0, 20) } })),
    },
  };
}

export function menuListInteractive(lang) {
  const t = { ...copy.en, ...copy[lang] };
  return {
    type: "list",
    body: { text: `${t.menuIntro}\n\n_${t.listFooterHint}_` },
    action: {
      button: t.menuListButton,
      sections: [{ title: t.menuSectionAll, rows: allOptionsRows(lang) }],
    },
  };
}

export function websiteCtaInteractive(lang) {
  const text =
    lang === "te"
      ? "KVR Hospital వెబ్‌సైట్‌ను చూడండి — ఆరోగ్య పరీక్షలు, వైద్యుడు ప్రొఫైల్ మరియు ఆన్‌లైన్ బుకింగ్."
      : "Visit KVR Hospital online — health assessments, doctor profile & booking.";
  const label = lang === "te" ? "🌐 వెబ్‌సైట్ తెరవండి" : "🌐 Open website";
  return {
    type: "cta_url",
    body: { text },
    action: {
      name: "cta_url",
      parameters: {
        display_text: label,
        url: links.website,
      },
    },
  };
}

export function bookingConfirmInteractive(lang, reviewText) {
  const yesTitle = lang === "te" ? "✅ నిర్ధారించండి" : "✅ Confirm";
  const noTitle = lang === "te" ? "❌ రద్దు" : "❌ Cancel";
  return {
    type: "button",
    body: { text: reviewText.slice(0, 1024) },
    action: {
      buttons: [
        { type: "reply", reply: { id: "confirm_book", title: yesTitle.slice(0, 20) } },
        { type: "reply", reply: { id: "cancel_book", title: noTitle.slice(0, 20) } },
      ],
    },
  };
}

export function serviceConfirmInteractive(lang, reviewText) {
  const yesTitle = lang === "te" ? "✅ నిర్ధారించండి" : "✅ Confirm";
  const noTitle = lang === "te" ? "❌ రద్దు" : "❌ Cancel";
  return {
    type: "button",
    body: { text: reviewText.slice(0, 1024) },
    action: {
      buttons: [
        { type: "reply", reply: { id: "confirm_service", title: yesTitle.slice(0, 20) } },
        { type: "reply", reply: { id: "cancel_service", title: noTitle.slice(0, 20) } },
      ],
    },
  };
}

export function staffServiceAlert({ serviceLabel, fullName, address, phone, waName }) {
  return (
    `🔔 *New ${serviceLabel} request*\n\n` +
    `*Patient name:* ${fullName}\n` +
    `*Address:* ${address}\n` +
    `*Phone:* ${phone}\n` +
    `*WhatsApp name:* ${waName || "-"}\n` +
    `*Prescription:* attached below\n` +
    `*Received:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
  );
}

export function mapsCtaInteractive(lang) {
  const text = lang === "te" ? "KVR Hospital కు దిశలు Google Maps లో చూడండి." : "Get directions to KVR Hospital on Google Maps.";
  const label = lang === "te" ? "🗺️ మ్యాప్ తెరవండి" : "🗺️ Open map";
  return {
    type: "cta_url",
    body: { text },
    action: {
      name: "cta_url",
      parameters: {
        display_text: label,
        url: links.directions,
      },
    },
  };
}
