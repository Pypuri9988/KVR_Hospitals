# Oracle Cloud deploy — KVR Hospital

## Login & signup URLs

| Step | URL |
|------|-----|
| Create free Oracle account | https://www.oracle.com/cloud/free/ |
| Oracle Cloud console (login) | https://cloud.oracle.com/ |
| Create VM instance | Console → **Compute** → **Instances** → **Create instance** |
| Open firewall ports | Console → **Networking** → **Virtual cloud networks** → Security list |
| Cloudflare DNS (domain only) | https://dash.cloudflare.com/ |

---

## What gets installed on the server

- **Nginx** — serves React site from `/var/www/kvrhospitals`
- **Node.js 20 + PM2** — WhatsApp bot on port `8787`
- **Certbot** — free HTTPS (run after DNS points to server)
- **UFW** — firewall (SSH + HTTP/HTTPS)

---

## Deploy commands (from Cursor on Windows)

```powershell
cd c:\KVR_Hospital

# Optional: save settings
copy deploy\oracle\.env.deploy.example deploy\oracle\.env.deploy
notepad deploy\oracle\.env.deploy

# 1) One-time server setup
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_IP -SshKey C:\Users\You\.ssh\oracle_kvr.pem -SetupOnly

# 2) Deploy app
.\deploy\oracle\deploy.ps1 -ServerIp YOUR_IP -SshKey C:\Users\You\.ssh\oracle_kvr.pem
```

---

## Live URLs (after DNS + SSL)

| URL | Purpose |
|-----|---------|
| https://kvrhospitals.com | Main website |
| https://www.kvrhospitals.com | Redirects to apex |
| https://api.kvrhospitals.com/webhook | Meta WhatsApp webhook |
| https://api.kvrhospitals.com/health | Bot health check |

Before SSL: `http://YOUR_ORACLE_IP` works for testing.
