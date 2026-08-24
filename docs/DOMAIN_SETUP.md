# Custom domain — kvrhospitals.com

## Automatic (via GitHub Actions)

Every deploy runs a step that attaches:
- `kvrhospitals.com`
- `www.kvrhospitals.com`

to the **kvr-hospitals** Pages project using the Cloudflare API.

## One-time: add domain to Cloudflare

If `kvrhospitals.com` is **not** on Cloudflare yet:

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Add a site**
2. Enter `kvrhospitals.com` → Free plan
3. Cloudflare shows **two nameservers** (e.g. `ada.ns.cloudflare.com`)
4. At your **domain registrar** (GoDaddy, Namecheap, etc.) → change nameservers to Cloudflare’s
5. Wait 5–30 minutes for activation

## Manual (if API step fails)

1. **Workers & Pages** → **kvr-hospitals** → **Custom domains**
2. **Set up a custom domain** → `kvrhospitals.com` → **Activate**
3. Repeat for `www.kvrhospitals.com`

Cloudflare creates DNS records automatically when the zone is on Cloudflare.

## Verify

- https://kvrhospitals.com
- https://www.kvrhospitals.com (redirects to apex)
- https://kvrhospitals.com/privacy.html

## Meta App settings

| Field | URL |
|-------|-----|
| App domains | `kvrhospitals.com` |
| Privacy policy | `https://kvrhospitals.com/privacy.html` |
| Terms | `https://kvrhospitals.com/terms.html` |
