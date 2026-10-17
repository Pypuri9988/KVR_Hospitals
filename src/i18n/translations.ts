export type Lang = "en" | "te";

export const langLabels: Record<Lang, string> = {
  en: "English",
  te: "తెలుగు",
};

export type CareOption = {
  id: string;
  label: string;
  sub?: string;
  message?: string;
  icon:
    | "whatsapp"
    | "calendar"
    | "bot"
    | "clock"
    | "activity"
    | "eye"
    | "heart"
    | "map"
    | "phone"
    | "clipboard"
    | "thermometer"
    | "pill";
  action?: "chatbot" | "callback" | "link";
  href?: string;
  botPrompt?: string;
  replyKey?: string;
};

export type TranslationBundle = {
  wa: {
    hubTitle: string;
    chat: string;
    chatSub: string;
    chatMsg: string;
    consult: string;
    consultSub: string;
    consultMsg: string;
    sample: string;
    sampleSub: string;
    sampleMsg: string;
    medicine: string;
    medicineSub: string;
    medicineMsg: string;
    bot: string;
    botSub: string;
    waBar: string;
  };
  bot: {
    title: string;
    subtitle: string;
    menuTitle: string;
    greeting: string;
    placeholder: string;
    consultation: string;
    directions: string;
    timingsFees: string;
    conditions: string;
    chatWhatsApp: string;
    langSwitch: string;
  };
  replies: Record<
    string,
    { text: string; actions?: { label: string; href?: string; waMsg?: string; anchor?: string }[] }
  >;
  callback: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    phonePlaceholder: string;
    note: string;
    submit: string;
    thanks: string;
  };
  float: {
    callback: string;
    whatsapp: string;
  };
  lang: {
    label: string;
    english: string;
    telugu: string;
  };
  video: {
    unmute: string;
    mute: string;
    badge: string;
  };
};

export const translations: Record<Lang, TranslationBundle> = {
  en: {
    wa: {
      hubTitle: "One click away on WhatsApp",
      chat: "Chat on WhatsApp",
      chatSub: "Real-time replies",
      chatMsg: "Hello KVR Hospital, I would like to connect with the care team.",
      consult: "Book a consultation",
      consultSub: "Physician visit",
      consultMsg:
        "Hello, I would like to book a consultation with Dr. Naga Satish Kumar Kota at KVR Hospital.",
      sample: "Home sample pickup",
      sampleSub: "Lab sample collection at home",
      sampleMsg:
        "Hello KVR Hospital, I would like home sample collection. Patient name, tests needed, address and preferred time are below.",
      medicine: "Medicine delivery",
      medicineSub: "Prescription medicines to home",
      medicineMsg:
        "Hello KVR Hospital, I would like medicine delivery at home. Please find my prescription details below.",
      bot: "Talk to KVR Care",
      botSub: "AI care assistant",
      waBar: "Chat on WhatsApp",
    },
    bot: {
      title: "KVR Care",
      subtitle: "AI assistant",
      menuTitle: "How can we help?",
      greeting:
        "Hi! I'm KVR Care — your assistant for Dr. Naga Satish Kumar. Choose an option or type your question.",
      placeholder: "Ask about care, booking, timings…",
      consultation: "Book a consultation",
      directions: "Get directions",
      timingsFees: "Timings & fees",
      conditions: "Conditions treated",
      chatWhatsApp: "Chat on WhatsApp",
      langSwitch: "Language",
    },
    replies: {
      greeting: {
        text: "Hello! Welcome to KVR Hospital. Choose an option below or type your question.",
      },
      book: {
        text: "Walk in Mon–Sat 9 AM–8 PM or book on WhatsApp.",
        actions: [{ label: "Book on WhatsApp", waMsg: "Book appointment with Dr. Naga Satish Kumar Kota" }],
      },
      consult: {
        text: "Book a physician consultation — walk-ins welcome or book on WhatsApp.",
        actions: [
          {
            label: "Book consultation",
            waMsg: "Book a consultation with Dr. Naga Satish Kumar Kota at KVR Hospital.",
          },
        ],
      },
      sample: {
        text: "Home sample collection — share patient name, tests needed, address and preferred time on WhatsApp.",
        actions: [{ label: "Request sample pickup", waMsg: "Home sample collection request at KVR Hospital." }],
      },
      noHomeVisit: {
        text: "Home doctor visits are not available. Please book a consultation at the hospital or request home sample pickup.",
        actions: [
          { label: "Consultation", waMsg: "Book a consultation with Dr. Naga Satish Kumar Kota at KVR Hospital." },
          { label: "Sample pickup", waMsg: "Home sample collection request at KVR Hospital." },
        ],
      },
      assessment: {
        text: "Essential, Metabolic, Heart Risk and Full Preventive assessments — based on your age and risk.",
        actions: [
          { label: "View assessments", anchor: "#assessments" },
          { label: "Book on WhatsApp", waMsg: "Book Preventive Health Assessment" },
        ],
      },
      timings: {
        text: "Mon – Sat: 9 AM – 8 PM. Walk-ins welcome at KVR Hospital.",
      },
      bca: {
        text: "Body Composition Analysis — 60-second scan for body fat, muscle, visceral fat & metabolic age.",
        actions: [{ label: "Book BCA", waMsg: "Book Body Composition Analysis" }],
      },
      fundus: {
        text: "Remidio AI-assisted fundus camera — retinal screening for diabetic eye changes and other retinal abnormalities at an early stage.",
        actions: [{ label: "Ask on WhatsApp", waMsg: "Fundus camera screening enquiry" }],
      },
      echo: {
        text: "2D Echocardiography (2D Echo) — ultrasound to assess heart structure, pumping function and valves.",
        actions: [{ label: "Ask on WhatsApp", waMsg: "2D Echo enquiry" }],
      },
      location: {
        text: "KVR Hospital, Main Road, Beside LIC Office, Ramachandrapuram, East Godavari 533255",
        actions: [{ label: "Get directions", anchor: "maps" }],
      },
      doctor: {
        text: "Dr. Naga Satish Kumar Kota — MD (General Medicine), Consultant Physician. Trained at INHS Asvini, Mumbai (AFMS).",
        actions: [{ label: "About doctor", anchor: "#doctor" }],
      },
      diabetes: {
        text: "We specialise in diabetes, fatty liver, obesity, hypertension and metabolic health.",
        actions: [{ label: "Book assessment", anchor: "#assessments" }],
      },
      fever: {
        text: "Evidence-based fever care: not every typhoid patient needs injections, and not every dengue patient needs platelet transfusion.",
        actions: [{ label: "Consult on WhatsApp", waMsg: "Fever consultation enquiry" }],
      },
      conditions: {
        text: "We treat diabetes, hypertension, obesity, fatty liver, thyroid disorders, fever/typhoid/dengue, and senior preventive care.",
        actions: [
          { label: "Book consultation", waMsg: "Book a consultation with Dr. Naga Satish Kumar Kota at KVR Hospital." },
          { label: "View assessments", anchor: "#assessments" },
        ],
      },
      timingsFees: {
        text: "Mon – Sat: 9 AM – 8 PM. Walk-ins welcome. Consultation fees vary by visit type — ask on WhatsApp for details.",
        actions: [{ label: "Get directions", anchor: "maps" }],
      },
      medicine: {
        text: "Order prescription medicines for home delivery — send a prescription photo and delivery address on WhatsApp.",
        actions: [{ label: "Medicine delivery", waMsg: "KVR Hospital — I would like medicine delivery at home." }],
      },

      callback: {
        text: "Tap Request Callback on the orange button, or message us on WhatsApp with your number.",
        actions: [{ label: "WhatsApp", waMsg: "Please call me back" }],
      },
      whatsapp: {
        text: "Chat with us on WhatsApp for instant help.",
        actions: [{ label: "Open WhatsApp", waMsg: "Hello KVR Hospital" }],
      },
      thanks: { text: "You're welcome. Take care — we're here when you need us." },
      default: {
        text: "Choose an option from the menu below, or message us on WhatsApp.",
        actions: [{ label: "Chat on WhatsApp", waMsg: "Hello KVR Hospital" }],
      },
    },
    callback: {
      title: "Request a Callback",
      subtitle: "Share your number — we will call you shortly.",
      name: "Full name",
      phone: "Mobile number",
      phonePlaceholder: "10-digit mobile",
      note: "Preferred time / note",
      submit: "Request Callback",
      thanks: "Thanks! Opening WhatsApp to confirm your callback.",
    },
    float: { callback: "Callback", whatsapp: "WhatsApp" },
    lang: { label: "Language", english: "English", telugu: "తెలుగు" },
    video: { unmute: "Unmute", mute: "Mute", badge: "Doctor message · KVR Hospital" },
  },
  te: {
    wa: {
      hubTitle: "ఒక క్లిక్‌లో WhatsApp",
      chat: "WhatsApp లో చాట్ చేయండి",
      chatSub: "తక్షణ సమాధానం",
      chatMsg: "నమస్కారం KVR Hospital, నేను మీ సంరక్షణ బృందంతో మాట్లాడాలి.",
      consult: "కన్సల్టేషన్ బుక్ చేయండి",
      consultSub: "వైద్యుడి సందర్శన",
      consultMsg:
        "నమస్కారం, Dr. Naga Satish Kumar Kota గారితో KVR Hospital లో కన్సల్టేషన్ బుక్ చేయాలి.",
      sample: "మీ ఇంటి నుండే sample collection",
      sampleSub: "మీ ఇంటి నుండే lab sample collection",
      sampleMsg:
        "నమస్కారం KVR Hospital, మీ ఇంటి నుండే sample collection కావాలి. రోగి పేరు, పరీక్షలు, చిరునామా, సమయం క్రింద పంపుతున్నాను.",
      medicine: "మందుల order",
      medicineSub: "Prescription ఆధారంగా మందులు order చేయండి",
      medicineMsg:
        "నమస్కారం KVR Hospital, మందుల order కావాలి. prescription వివరాలు క్రింద పంపుతున్నాను.",
      bot: "KVR Care తో మాట్లాడండి",
      botSub: "AI సహాయకుడు",
      waBar: "WhatsApp లో చాట్",
    },
    bot: {
      title: "KVR Care",
      subtitle: "AI సహాయకుడు",
      menuTitle: "మీకు ఏమి కావాలి?",
      greeting:
        "నమస్కారం! నేను KVR Care — Dr. Naga Satish Kumar గారి సహాయకుడిని. క్రింద ఎంపిక ఎంచుకోండి లేదా ప్రశ్న అడగండి.",
      placeholder: "బుకింగ్, టైమింగ్స్, conditions…",
      consultation: "కన్సల్టేషన్ బుక్",
      directions: "దిశలు",
      timingsFees: "టైమింగ్స్ & fees",
      conditions: "Conditions treated",
      chatWhatsApp: "WhatsApp లో చాట్",
      langSwitch: "భాష",
    },
    replies: {
      greeting: {
        text: "నమస్కారం! KVR Hospital కు స్వాగతం. క్రింద ఎంపిక ఎంచుకోండి లేదా ప్రశ్న టైప్ చేయండి.",
      },
      book: {
        text: "సోమ–శని 9 AM–8 PM వ walk-in చేయవచ్చు లేదా WhatsApp ద్వారా బుక్ చేయండి.",
        actions: [{ label: "WhatsApp బుక్", waMsg: "Dr. Naga Satish Kumar Kota appointment book చేయాలి" }],
      },
      consult: {
        text: "వైద్యుడి కన్సల్టేషన్ — walk-in స్వాగతం లేదా WhatsApp బుక్.",
        actions: [
          {
            label: "కన్సల్టేషన్ బుక్",
            waMsg: "Dr. Naga Satish Kumar Kota consultation book చేయాలి",
          },
        ],
      },
      sample: {
        text: "మీ ఇంటి నుండే lab sample collection — రోగి పేరు, పరీక్షలు, చిరునామా, సమయం WhatsApp లో పంపండి.",
        actions: [
          {
            label: "Sample collection",
            waMsg: "KVR Hospital — మీ ఇంటి నుండే sample collection కావాలి.",
          },
        ],
      },
      noHomeVisit: {
        text: "ఇంటి వైద్య సందర్శన అందుబాటులో లేదు. Consultation book చేయండి లేదా, మీ ఇంటి నుండే sample collection ఎంచుకోండి.",
        actions: [
          {
            label: "Consultation",
            waMsg: "Dr. Naga Satish Kumar Kota consultation book cheyali",
          },
          {
            label: "Sample collection",
            waMsg: "KVR Hospital — మీ ఇంటి నుండే sample collection",
          },
        ],
      },
      assessment: {
        text: "Essential, Metabolic, Heart Risk, Full Preventive అంచనాలు — మీ వయస్సు & ప్రమాదం ప్రకారం.",
        actions: [
          { label: "అంచనాలు చూడండి", anchor: "#assessments" },
          { label: "WhatsApp బుక్", waMsg: "Preventive Health Assessment book చేయాలి" },
        ],
      },
      timings: {
        text: "సోమ–శని: 9 AM – 8 PM. KVR Hospital లో walk-in స్వాగతం.",
      },
      bca: {
        text: "శరీర కూర్పు విశ్లేషణ — 60 సెకన్లలో body fat, muscle, visceral fat & metabolic age.",
        actions: [{ label: "BCA బుక్", waMsg: "Body Composition Analysis book చేయాలి" }],
      },
      fundus: {
        text: "Remidio AI-assisted fundus camera — మధుమేహ కంటి మార్పులు మరియు ఇతర retinal abnormalities ను ప్రారంభ దశలో గుర్తించడానికi retinal screening.",
        actions: [{ label: "WhatsApp అడగండి", waMsg: "Fundus camera screening enquiry" }],
      },
      echo: {
        text: "2D Echocardiography (2D Echo) — గుండè నిర్మాణం, pumping function మరియu valves పరిశీలనకu ultrasound.",
        actions: [{ label: "WhatsApp అడగండi", waMsg: "2D Echo enquiry" }],
      },
      location: {
        text: "KVR Hospital, Main Road, LIC Office beside, Ramachandrapuram, East Godavari 533255",
        actions: [{ label: "దిశలు", anchor: "maps" }],
      },
      doctor: {
        text: "Dr. Naga Satish Kumar Kota — MD (General Medicine), Consultant Physician. AFMS కింద Mumbai INHS Asvini లో PG శిక్షణ.",
        actions: [{ label: "డాక్టర్ గురించి", anchor: "#doctor" }],
      },
      diabetes: {
        text: "Diabetes, fatty liver, obesity, hypertension, metabolic health లో మేము specialise.",
        actions: [{ label: "అంచనా బుక్", anchor: "#assessments" }],
      },
      fever: {
        text: "Evidence-based fever care: ప్రతి typhoid patient కు injection అవసరం లేదు; dengue లో platelet transfusion అన్ని cases లో లేదు.",
        actions: [{ label: "WhatsApp consult", waMsg: "Fever consultation enquiry" }],
      },
      conditions: {
        text: "Diabetes, hypertension, obesity, fatty liver, thyroid, fever/typhoid/dengue, senior preventive care treat చేస్తాము.",
        actions: [
          { label: "కన్సల్టేషన్ బుక్", waMsg: "Dr. Naga Satish Kumar Kota consultation book చేయాలి" },
          { label: "అంచనాలు చూడండి", anchor: "#assessments" },
        ],
      },
      timingsFees: {
        text: "సోమ–శని: 9 AM – 8 PM. Walk-in స్వాగతం. Consultation fees visit type ప్రకారం — details కోసం WhatsApp అడగండి.",
        actions: [{ label: "దిశలు", anchor: "maps" }],
      },
      medicine: {
        text: "మందుల order — prescription ఫోటో మరియు delivery చిరునామా WhatsApp లో పంపండి.",
        actions: [{ label: "మందుల order", waMsg: "KVR Hospital — mandulu order cheyali" }],
      },
      callback: {
        text: "క్రింద orange కాల్ బ్యాక్ బటన్ నొక్కండి, లేదా WhatsApp లో నంబర్ పంపండి.",
        actions: [{ label: "WhatsApp", waMsg: "Please call me back" }],
      },
      whatsapp: {
        text: "తక్షణ సహాయం కోసం WhatsApp లో message చేయండి.",
        actions: [{ label: "WhatsApp తెరవండి", waMsg: "Hello KVR Hospital" }],
      },
      thanks: { text: "స్వాగతం. KVR Hospital ఎప్పుడైనా సహాయం చేస్తుంది." },
      default: {
        text: "మెను నుండి ఎంపిక ఎంచుకోండి, లేదా WhatsApp message చేయండి.",
        actions: [{ label: "WhatsApp చాట్", waMsg: "Hello KVR Hospital" }],
      },
    },
    callback: {
      title: "కాల్ బ్యాక్ అభ్యర్థన",
      subtitle: "మీ మొబైల్ నంబర్ పంపండి — మేము మిమ్మల్ని కాల్ చేస్తాము.",
      name: "పూర్తి పేరు",
      phone: "మొబైల్ నంబర్",
      phonePlaceholder: "10 అంకెల మొబైల్ నంబర్",
      note: "సమయం / వివరం",
      submit: "కాల్ బ్యాక్ అభ్యర్థించండి",
      thanks: "ధన్యవాదాలు! WhatsApp confirm కోసం తెరుస్తున్నాము.",
    },
    float: { callback: "కాల్ బ్యాక్", whatsapp: "WhatsApp" },
    lang: { label: "భాష", english: "ఆంగ్లం", telugu: "తెలుగు" },
    video: { unmute: "ధ్వని ఆన్", mute: "మ్యూట్", badge: "డాక్టర్ సందేశం · KVR Hospital" },
  },
};

/** Sitara360-style WhatsApp hub: chat, consultation, sample pickup, medicine, care team */
export function getWhatsappHubOptions(lang: Lang): CareOption[] {
  const t = translations[lang].wa;
  return [
    { id: "chat", label: t.chat, sub: t.chatSub, message: t.chatMsg, icon: "whatsapp" },
    { id: "consult", label: t.consult, sub: t.consultSub, message: t.consultMsg, icon: "calendar" },
    { id: "sample", label: t.sample, sub: t.sampleSub, message: t.sampleMsg, icon: "activity" },
    {
      id: "medicine",
      label: t.medicine,
      sub: t.medicineSub,
      message: t.medicineMsg,
      icon: "pill",
    },
    { id: "bot", label: t.bot, sub: t.botSub, icon: "bot", action: "chatbot" },
  ];
}

/** Sitara360-style KVR Care assistant menu */
export function getBotMenuOptions(lang: Lang): CareOption[] {
  const b = translations[lang].bot;
  return [
    { id: "consult", label: b.consultation, replyKey: "consult", icon: "calendar" },
    { id: "directions", label: b.directions, replyKey: "location", icon: "map" },
    { id: "timings", label: b.timingsFees, replyKey: "timingsFees", icon: "clock" },
    { id: "conditions", label: b.conditions, replyKey: "conditions", icon: "clipboard" },
    { id: "whatsapp", label: b.chatWhatsApp, replyKey: "whatsapp", icon: "whatsapp" },
  ];
}
