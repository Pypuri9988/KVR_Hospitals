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
    | "thermometer";
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
    assessment: string;
    assessmentSub: string;
    assessmentMsg: string;
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
    bookAppointment: string;
    timings: string;
    bodyComposition: string;
    echo: string;
    fundus: string;
    location: string;
    consultation: string;
    healthAssessment: string;
    feverCare: string;
    callback: string;
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
      assessment: "Book health assessment",
      assessmentSub: "Preventive health packages",
      assessmentMsg:
        "Hello, I would like to book a Preventive Health Assessment at KVR Hospital.",
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
      placeholder: "Ask about care, tests, booking…",
      bookAppointment: "Book appointment",
      timings: "Timings",
      bodyComposition: "Body composition",
      echo: "2D Echo",
      fundus: "Fundus camera",
      location: "Location",
      consultation: "Book a consultation",
      healthAssessment: "Health assessment",
      feverCare: "Fever care",
      callback: "Request callback",
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
        text: "Remidio fundus camera screens diabetic eye disease early — quick and non-invasive.",
        actions: [{ label: "Ask on WhatsApp", waMsg: "Fundus camera screening enquiry" }],
      },
      echo: {
        text: "2D Echo assesses heart function — useful for BP, diabetes and chest symptoms.",
        actions: [{ label: "Ask on WhatsApp", waMsg: "2D Echo enquiry" }],
      },
      location: {
        text: "KVR Hospital, Main Road, Beside LIC Office, Ramachandrapuram, East Godavari 533255",
        actions: [{ label: "Get directions", anchor: "maps" }],
      },
      doctor: {
        text: "Dr. Naga Satish Kumar Kota — MBBS, MD (Internal Medicine), 10+ years experience.",
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
    float: { callback: "Request Callback", whatsapp: "WhatsApp" },
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
      assessment: "ఆరోగ్య అంచనా బుక్ చేయండి",
      assessmentSub: "నివారక ఆరోగ్య ప్యాకేజీలు",
      assessmentMsg: "నమస్కారం, KVR Hospital లో నివారక ఆరోగ్య అంచనా బుక్ చేయాలి.",
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
      placeholder: "బుకింగ్, పరీక్షలు, టైమింగ్స్…",
      bookAppointment: "అపాయింట్మెంట్ బుక్",
      timings: "టైమింగ్స్",
      bodyComposition: "శరీర కూర్పు విశ్లేషణ",
      echo: "2D Echo",
      fundus: "ఫండస్ కెమెరా",
      location: "చిరునామా",
      consultation: "కన్సల్టేషన్ బుక్",
      healthAssessment: "ఆరోగ్య అంచనా",
      feverCare: "జ్వరం సంరక్షణ",
      callback: "కాల్ బ్యాక్",
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
        text: "Remidio fundus camera — మధుమేహ కంటి వ్యాధి early screening.",
        actions: [{ label: "WhatsApp అడగండి", waMsg: "Fundus camera screening enquiry" }],
      },
      echo: {
        text: "2D Echo — BP, diabetes, chest symptoms కోసం heart function assessment.",
        actions: [{ label: "WhatsApp అడగండి", waMsg: "2D Echo enquiry" }],
      },
      location: {
        text: "KVR Hospital, Main Road, LIC Office beside, Ramachandrapuram, East Godavari 533255",
        actions: [{ label: "దిశలు", anchor: "maps" }],
      },
      doctor: {
        text: "Dr. Naga Satish Kumar Kota — MBBS, MD (Internal Medicine), 10+ years అనుభవం.",
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

export function getWhatsappHubOptions(lang: Lang): CareOption[] {
  const t = translations[lang].wa;
  return [
    { id: "chat", label: t.chat, sub: t.chatSub, message: t.chatMsg, icon: "whatsapp" },
    { id: "consult", label: t.consult, sub: t.consultSub, message: t.consultMsg, icon: "calendar" },
    {
      id: "assessment",
      label: t.assessment,
      sub: t.assessmentSub,
      message: t.assessmentMsg,
      icon: "clipboard",
    },
    { id: "bot", label: t.bot, sub: t.botSub, icon: "bot", action: "chatbot" },
  ];
}

export function getBotMenuOptions(lang: Lang): CareOption[] {
  const b = translations[lang].bot;
  return [
    { id: "book", label: b.bookAppointment, replyKey: "book", icon: "calendar" },
    { id: "timings", label: b.timings, replyKey: "timings", icon: "clock" },
    { id: "bca", label: b.bodyComposition, replyKey: "bca", icon: "activity" },
    { id: "echo", label: b.echo, replyKey: "echo", icon: "heart" },
    { id: "fundus", label: b.fundus, replyKey: "fundus", icon: "eye" },
    { id: "location", label: b.location, replyKey: "location", icon: "map" },
    { id: "consult", label: b.consultation, replyKey: "consult", icon: "calendar" },
    { id: "assessment", label: b.healthAssessment, replyKey: "assessment", icon: "clipboard" },
    { id: "fever", label: b.feverCare, replyKey: "fever", icon: "thermometer" },
    { id: "callback", label: b.callback, action: "callback", icon: "phone" },
  ];
}
