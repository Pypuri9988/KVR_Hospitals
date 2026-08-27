# Deploy KVR Hospitals — Oracle Cloud (free)

**Website:** https://kvrhospitals.com  
**WhatsApp API:** https://api.kvrhospitals.com/webhook  
**GitHub:** https://github.com/Pypuri9988/KVR_Hospitals

Hosting is on **Oracle Cloud Always Free VM** (same pattern as sitara360.com).  
Cloudflare is used **for DNS only** — not Cloudflare Pages.

---

## Login URLs (bookmark these)

| Service | URL | What you do here |
|---------|-----|------------------|
| **Oracle Cloud signup** | https://www.oracle.com/cloud/free/ | Create free account |
| **Oracle Cloud login** | https://cloud.oracle.com/ | Create VM, get public IP, firewall |
| **Cloudflare DNS** | https://dash.cloudflare.com/ | Add A records for domain |
| **GitHub repo** | https://github.com/Pypuri9988/KVR_Hospitals | Code + auto-deploy secrets |
| **Meta WhatsApp** | https://developers.facebook.com/ | Webhook + bot tokens |

---

## Quick start (3 parts)

### 1. Create Oracle VM (one time, ~15 min)

1. Sign up: https://www.oracle.com/cloud/free/
2. Login: https://cloud.oracle.com/
3. **Menu (≡) → Compute → Instances → Create instance**
4. Settings:
   - Name: `kvr-hospital`
   - Image: **Ubuntu 22.04** or **24.04**
   - Shape: **Ampere A1** (Always Free) — 1 OCPU, 6 GB RAM
   - **Assign a public IPv4 address**
   - SSH keys: **Generate a key pair** → download `.pem` file
5. **Networking → Virtual cloud networks → your VCN → Security Lists → Ingress rules**
   - TCP **22** from your IP (or `0.0.0.0/0` for testing)
   - TCP **80** from `0.0.0.0/0`
   - TCP **443** from `0.0.0.0/0`
6. Copy **Public IP address** from the instance page

Save SSH key on Windows:

```powershell
mkdir $env:USERPROFILE\.ssh -Force
# Move downloaded key to:
# C:\Users\Uday_kumar\.ssh\oracle_kvr.pem
icacls $env:USERPROFILE\.ssh\oracle_kvr.pem /inheritance:r /grant:r "$env:USERNAME`:R"
```

### 2. DNS — Cloudflare (DNS only)

Login: https://dash.cloudflare.com/ → select **kvrhospitals.com** → **DNS → Records**

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| **A** | `@` | `YOUR_ORACLE_PUBLIC_IP` | DNS only (grey cloud) |
| **A** | `www` | `YOUR_ORACLE_PUBLIC_IP` | DNS only (grey cloud) |
| **A** | `api` | `YOUR_ORACLE_PUBLIC_IP` | DNS only (grey cloud) |

Remove any CNAME pointing to `kvr-hospitals.pages.dev`.

### 3. Deploy from Cursor (SSH)

```powershell
cd c:\KVR_Hospital

# First time — install Nginx, Node, PM2 on server
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_ORACLE_IP -SshKey $env:USERPROFILE\.ssh\oracle_kvr.pem -SetupOnly

# Build + upload website + WhatsApp bot
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_ORACLE_IP -SshKey $env:USERPROFILE\.ssh\oracle_kvr.pem
```

After DNS propagates (5–30 min), enable HTTPS:

```powershell
ssh -i $env:USERPROFILE\.ssh\oracle_kvr.pem ubuntu@YOUR_ORACLE_IP "sudo certbot --nginx -d kvrhospitals.com -d www.kvrhospitals.com -d api.kvrhospitals.com --non-interactive --agree-tos -m udaypypuri1996@gmail.com"
```

---

## WhatsApp bot on same server

```powershell
ssh -i $env:USERPROFILE\.ssh\oracle_kvr.pem ubuntu@YOUR_ORACLE_IP
nano /opt/kvr-whatsapp/.env
```

```env
META_VERIFY_TOKEN=kvr_hospital_webhook_2026
META_ACCESS_TOKEN=your_token_from_meta
META_PHONE_NUMBER_ID=your_phone_number_id
META_WABA_ID=your_waba_id
DOCTOR_ALERT_PHONE=919491135557
PORT=8787
WEBHOOK_PATH=/webhook
```

```bash
pm2 restart kvr-whatsapp
curl http://127.0.0.1:8787/health
```

Meta webhook URL: **https://api.kvrhospitals.com/webhook**

Full Meta setup: [whatsapp-server/WHATSAPP_META_SETUP.md](./whatsapp-server/WHATSAPP_META_SETUP.md)

---

## Optional: auto-deploy on git push

GitHub → **Settings → Secrets and variables → Actions** → add:

| Secret | Value |
|--------|-------|
| `ORACLE_HOST` | Your Oracle public IP |
| `ORACLE_SSH_KEY` | Full contents of `.pem` private key |
| `ORACLE_USER` | `ubuntu` |

Push to `main` runs `.github/workflows/oracle-deploy.yml` (after first `-SetupOnly` on the server).

---

## Verify live

- https://kvrhospitals.com
- https://kvrhospitals.com/privacy.html
- https://api.kvrhospitals.com/health

---

## Redeploy after code changes

```powershell
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_ORACLE_IP -SshKey $env:USERPROFILE\.ssh\oracle_kvr.pem
```

Detailed guide: [docs/ORACLE_DEPLOY.md](./docs/ORACLE_DEPLOY.md)
