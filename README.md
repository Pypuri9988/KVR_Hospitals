# KVR Hospitals

Preventive care website for **KVR Hospital**, Ramachandrapuram — Dr. Naga Satish Kumar Kota.

- **Live site:** https://kvrhospitals.com
- **WhatsApp:** +91 94911 35557
- **Stack:** React · Vite · TypeScript · Meta WhatsApp Cloud API

## Features

- Preventive health assessments, diagnostics, nutrition guide
- Bilingual chatbot & WhatsApp hub (English / Telugu)
- Appointment booking with WhatsApp confirmation
- Meta WhatsApp auto-replies with doctor alerts

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

WhatsApp bot server (separate terminal):

```bash
cd whatsapp-server
cp .env.example .env   # fill Meta tokens — never commit .env
npm install
npm run dev            # http://localhost:8787
```

## Deploy

| Service | Host | Guide |
|---------|------|-------|
| Website | Cloudflare Pages (free) | [DEPLOY.md](./DEPLOY.md) |
| WhatsApp API | Render.com (free) | [DEPLOY.md](./DEPLOY.md) |
| Meta setup | Meta Developers | [whatsapp-server/WHATSAPP_META_SETUP.md](./whatsapp-server/WHATSAPP_META_SETUP.md) |

## Security

- **Never commit** `.env` files or Meta tokens
- App secrets belong only in Meta / Render / Cloudflare dashboards
- Privacy: https://kvrhospitals.com/privacy.html

## Repository

https://github.com/Pypuri9988/KVR_Hospitals

---

© KVR Hospital · Dr. Naga Satish Kumar Kota
