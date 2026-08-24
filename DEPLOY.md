# Deploy KVR Hospitals — Cloudflare + Render + Meta

**Domain:** kvrhospitals.com  
**GitHub:** https://github.com/Pypuri9988/KVR_Hospitals

---

## Part A — Website on Cloudflare Pages (free)

### A1. Push code to GitHub

Already done if you cloned from: `https://github.com/Pypuri9988/KVR_Hospitals`

### A2. Connect Cloudflare Pages

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Authorize GitHub → select **Pypuri9988/KVR_Hospitals**
4. Build settings:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

5. Click **Save and Deploy**

### A3. Custom domain

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `kvrhospitals.com` and `www.kvrhospitals.com`
3. Cloudflare will show DNS records — add them at your domain registrar if not already on Cloudflare
4. Wait for SSL (usually 5–15 minutes)

### A4. Verify

- https://kvrhospitals.com
- https://kvrhospitals.com/privacy.html
- https://kvrhospitals.com/terms.html

---

## Part B — WhatsApp API on Render (free)

Cloudflare Pages hosts the website only. The WhatsApp webhook needs a Node server.

### B1. Deploy on Render

1. [render.com](https://render.com) → Sign up with GitHub
2. **New** → **Blueprint** → connect **KVR_Hospitals** repo
3. Render reads `render.yaml` and creates `kvr-whatsapp-api`
4. When prompted, set these **secret** env vars:

| Variable | Where to get it |
|----------|-----------------|
| `META_VERIFY_TOKEN` | You choose — e.g. `kvr_hospital_webhook_2026` |
| `META_ACCESS_TOKEN` | Meta → System User → permanent token |
| `META_PHONE_NUMBER_ID` | Meta → WhatsApp → API Setup |
| `META_WABA_ID` | Meta → WhatsApp → API Setup |

5. Deploy → note your URL, e.g. `https://kvr-whatsapp-api.onrender.com`

### B2. Custom subdomain for webhook

At Cloudflare DNS (or your registrar):

| Type | Name | Target |
|------|------|--------|
| CNAME | `api` | `kvr-whatsapp-api.onrender.com` |

Webhook URL for Meta: **`https://api.kvrhospitals.com/webhook`**

Health check: https://api.kvrhospitals.com/health

---

## Part C — Meta WhatsApp setup

### C1. App settings → Basic

| Field | Value |
|-------|--------|
| App domains | `kvrhospitals.com` |
| Privacy policy URL | `https://kvrhospitals.com/privacy.html` |
| Terms of Service URL | `https://kvrhospitals.com/terms.html` |
| User data deletion | `https://kvrhospitals.com/privacy.html` |
| Contact email | `udaypypuri1996@gmail.com` |

**Reset App Secret** if it was ever shared publicly.

### C2. Register phone

1. **WhatsApp → API Setup** → Add **9491135557**
2. Verify OTP

### C3. Permanent token

1. [business.facebook.com/settings](https://business.facebook.com/settings) → **System users**
2. Create admin user → **Generate token** for **KVR Hospitals**
3. Permissions: `whatsapp_business_messaging`, `whatsapp_business_management`
4. Paste into Render env as `META_ACCESS_TOKEN`

### C4. Webhook

1. **WhatsApp → Configuration → Webhook**
2. Callback URL: `https://api.kvrhospitals.com/webhook`
3. Verify token: same as `META_VERIFY_TOKEN` in Render
4. Subscribe to **messages**

### C5. Test

Message **+91 94911 35557** with **Hi** → English | తెలుగు → menu → book → confirmation + doctor alert.

### C6. Publish app

**Publish** tab → **Publish** (after privacy URL is live).

---

## Part D — Optional: GitHub Actions auto-deploy

Instead of manual Pages connect, add GitHub secrets:

| Secret | Source |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Edit Cloudflare Workers template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard URL or Overview page |

Push to `main` triggers `.github/workflows/cloudflare-pages.yml`.

---

## Security checklist

- [ ] `.env` never committed (in `.gitignore`)
- [ ] Meta App Secret reset if exposed
- [ ] Render env vars marked secret
- [ ] HTTPS only on all domains
- [ ] `META_VERIFY_TOKEN` is a long random string in production

---

## Need from you (one-time)

1. Cloudflare account login (connect GitHub repo)
2. Render account login (deploy blueprint)
3. Meta permanent access token + phone number ID
4. DNS access for kvrhospitals.com (point to Cloudflare)

Full bot docs: [whatsapp-server/WHATSAPP_META_SETUP.md](./whatsapp-server/WHATSAPP_META_SETUP.md)
