# Oracle Cloud Free Tier — deploy KVR Hospital

**Domain:** kvrhospitals.com  
**Stack:** Ubuntu VM + Nginx + Node (WhatsApp bot) + Let's Encrypt SSL

---

## Part 1 — Create free Oracle VM (one time)

1. Sign up: [cloud.oracle.com](https://www.oracle.com/cloud/free/)
2. **Create VM instance**
   - Name: `kvr-hospital`
   - Image: **Ubuntu 22.04** (or 24.04)
   - Shape: **Ampere A1** (Always Free) — 1 OCPU, 6 GB RAM, or AMD Micro
   - **Public IP:** Assign a **reserved public IPv4**
   - SSH key: **Generate** or upload your key → download private key
3. **Networking → Security list** → Ingress rules:
   - TCP **22** (SSH) — your IP or `0.0.0.0/0`
   - TCP **80** (HTTP) — `0.0.0.0/0`
   - TCP **443** (HTTPS) — `0.0.0.0/0`
4. Note your **Public IP** (e.g. `123.45.67.89`)

---

## Part 2 — DNS (Cloudflare or registrar)

Point domain to Oracle IP:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `YOUR_ORACLE_PUBLIC_IP` | Auto |
| **A** | `www` | `YOUR_ORACLE_PUBLIC_IP` | Auto |
| **A** | `api` | `YOUR_ORACLE_PUBLIC_IP` | Auto |

**If using Cloudflare:** set proxy to **DNS only** (grey cloud) until SSL works, or use **Full** after certbot.

Remove old CNAME to `kvr-hospitals.pages.dev` if present.

---

## Part 3 — SSH from Cursor

### Save SSH key (Windows)

```powershell
# Example path after downloading Oracle key
mkdir $env:USERPROFILE\.ssh -Force
# Move downloaded key to:
# C:\Users\You\.ssh\oracle_kvr
icacls $env:USERPROFILE\.ssh\oracle_kvr /inheritance:r /grant:r "$env:USERNAME`:R"
```

### Test SSH

```powershell
ssh -i $env:USERPROFILE\.ssh\oracle_kvr ubuntu@YOUR_ORACLE_PUBLIC_IP
```

### Configure deploy (optional)

```powershell
cd c:\KVR_Hospital
copy deploy\oracle\.env.deploy.example deploy\oracle\.env.deploy
notepad deploy\oracle\.env.deploy
```

Fill in:

```
SERVER_IP=YOUR_ORACLE_PUBLIC_IP
SERVER_USER=ubuntu
SSH_KEY=C:\Users\You\.ssh\oracle_kvr
```

---

## Part 4 — First-time server setup

From **Cursor terminal** in project folder:

```powershell
cd c:\KVR_Hospital
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_ORACLE_PUBLIC_IP -SshKey $env:USERPROFILE\.ssh\oracle_kvr -SetupOnly
```

This installs: Nginx, Node 20, PM2, firewall, web folders.

---

## Part 5 — Deploy application

```powershell
cd c:\KVR_Hospital
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_ORACLE_PUBLIC_IP -SshKey $env:USERPROFILE\.ssh\oracle_kvr
```

This will:
1. `npm run build` (frontend)
2. Upload `dist/` → `/var/www/kvrhospitals`
3. Upload `whatsapp-server/` → `/opt/kvr-whatsapp`
4. Start/restart WhatsApp bot with PM2

---

## Part 6 — WhatsApp `.env` on server

```powershell
ssh -i $env:USERPROFILE\.ssh\oracle_kvr ubuntu@YOUR_ORACLE_PUBLIC_IP
nano /opt/kvr-whatsapp/.env
```

Paste (from `whatsapp-server/.env.example`):

```env
META_VERIFY_TOKEN=kvr_hospital_webhook_2026
META_ACCESS_TOKEN=your_token
META_PHONE_NUMBER_ID=your_id
META_WABA_ID=your_waba_id
DOCTOR_ALERT_PHONE=919491135557
PORT=8787
WEBHOOK_PATH=/webhook
```

Then:

```bash
pm2 restart kvr-whatsapp
curl http://127.0.0.1:8787/health
```

Meta webhook URL: **`https://api.kvrhospitals.com/webhook`**

---

## Part 7 — SSL (HTTPS)

After DNS propagates (5–30 min):

```powershell
ssh -i $env:USERPROFILE\.ssh\oracle_kvr ubuntu@YOUR_ORACLE_PUBLIC_IP "sudo certbot --nginx -d kvrhospitals.com -d www.kvrhospitals.com -d api.kvrhospitals.com --non-interactive --agree-tos -m udaypypuri1996@gmail.com"
```

---

## Part 8 — Verify

- https://kvrhospitals.com
- https://kvrhospitals.com/privacy.html
- https://api.kvrhospitals.com/health

---

## Redeploy after code changes

```powershell
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_IP -SshKey $env:USERPROFILE\.ssh\oracle_kvr
```

Or push to GitHub and pull on server if you prefer git-based deploy.

---

## Oracle vs Cloudflare Pages

| | Cloudflare Pages | Oracle VM |
|--|------------------|-----------|
| Cost | Free | Free tier |
| WhatsApp API | Needs Render/separate | Same server |
| SSL | Automatic | Certbot |
| You manage | Less | SSH + updates |

You can keep Cloudflare **DNS only** (grey cloud A records) pointing to Oracle IP.
