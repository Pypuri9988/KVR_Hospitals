# KVR Hospitals — Meta WhatsApp Setup

**Domain:** https://kvrhospitals.com  
**App:** KVR Hospitals · App ID `1572709597969703`  
**Phone:** +91 94911 35557 (`919491135557`)

---

## URLs for Meta App settings → Basic

| Field | URL |
|-------|-----|
| **App domains** | `kvrhospitals.com` |
| **Privacy policy URL** | https://kvrhospitals.com/privacy.html |
| **Terms of Service URL** | https://kvrhospitals.com/terms.html |
| **User data deletion** | https://kvrhospitals.com/privacy.html |
| **Contact email** | udaypypuri1996@gmail.com |

---

## Step 2 — WhatsApp use case

1. Left menu → **Use cases** (or click **Connect with customers through WhatsApp**)
2. Confirm WhatsApp is added to the app
3. Click **Customize** on the WhatsApp use case

---

## Step 3 — Register phone number

1. Go to **WhatsApp** → **API Setup** (left menu under WhatsApp)
2. Under **From**, click **Add phone number**
3. Enter **9491135557**
4. Verify via SMS or voice OTP
5. Copy these values — you will need them:

| Meta field | Your `.env` variable |
|-----------|----------------------|
| Phone number ID | `META_PHONE_NUMBER_ID` |
| WhatsApp Business Account ID | `META_WABA_ID` |
| Temporary access token | testing only (24h) |

---

## Step 4 — Permanent access token

Temporary tokens expire. Create a permanent one:

1. [business.facebook.com/settings](https://business.facebook.com/settings)
2. **Users** → **System users** → **Add**
3. Name: `KVR WhatsApp Bot` · Role: **Admin**
4. **Generate token** → select **KVR Hospitals** app
5. Permissions: `whatsapp_business_messaging`, `whatsapp_business_management`
6. Copy token → `META_ACCESS_TOKEN` in `.env`

---

## Step 5 — Configure bot server

```powershell
cd c:\KVR_Hospital\whatsapp-server
copy .env.example .env
notepad .env
```

Fill in:

```env
META_VERIFY_TOKEN=kvr_hospital_webhook_2026
META_ACCESS_TOKEN=paste_permanent_token
META_PHONE_NUMBER_ID=paste_from_api_setup
META_WABA_ID=paste_from_api_setup
DOCTOR_ALERT_PHONE=919491135557
PORT=8787
WEBHOOK_PATH=/webhook
```

Start server:

```powershell
npm install
npm run dev
```

Server runs at **http://localhost:8787**

---

## Step 6 — Webhook (production)

Deploy `whatsapp-server/` to a host with HTTPS (Railway, Render, or your VPS).

**Recommended callback URL:**

```
https://api.kvrhospitals.com/webhook
```

Or same domain with reverse proxy:

```
https://kvrhospitals.com/webhook
```

1. Meta app → **WhatsApp** → **Configuration**
2. **Webhook** → **Edit**
3. **Callback URL:** `https://api.kvrhospitals.com/webhook`
4. **Verify token:** `kvr_hospital_webhook_2026` (must match `.env`)
5. Click **Verify and save**
6. Subscribe to: **messages** ✓

For local testing only, use ngrok: `ngrok http 8787`

---

## Step 7 — Test before publishing

1. **WhatsApp** → **API Setup** → **Send test message** (optional)
2. From your personal phone, message **+91 94911 35557** with **Hi**
3. Expected flow:
   - Bot sends **English | తెలుగు** buttons
   - Pick language → menu 1–8
   - Option 1 (Book) → patient confirmation + alert to doctor number

Add test numbers if needed: **WhatsApp** → **API Setup** → **To** field (during development).

---

## Step 8 — Publish app

When webhook works and privacy policy is set:

1. Left menu → **Publish** (where your screenshot shows **Unpublished**)
2. Confirm **Privacy policy URL** shows ✓
3. Confirm **Use cases** shows WhatsApp ✓
4. Click **Publish**

After publish, the bot works for all patients (not just test numbers).

---

## Step 9 — Doctor mobile

- Install **WhatsApp Business** on phone **9491135557**
- Patient chats and booking alerts appear in this inbox
- Same number is used for website links and bot automation

---

## Bot behaviour (already built)

| Event | Patient gets | Doctor (9491135557) gets |
|-------|-------------|--------------------------|
| First message | Language picker | — |
| Book appointment | Confirmation in EN/TE | Alert with name, phone, time |
| Website form via API | WhatsApp confirmation | Alert |

**Language switch:** reply **8** or tap **Change language** anytime.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Old website images | Hard refresh: `Ctrl+Shift+R` |
| Webhook verify fails | Check verify token matches exactly in Meta and `.env` |
| No auto-reply | Check `messages` subscribed; token not expired |
| Publish disabled | Add privacy policy URL in App settings → Basic |
| Number already on WhatsApp | Meta will guide migration to Business API |

Meta docs: https://developers.facebook.com/docs/whatsapp/cloud-api/
