# Cloudflare Workers deploy — GitHub Actions

## Required GitHub secrets

| Secret | Value |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token |
| `CLOUDFLARE_ACCOUNT_ID` | `7d76040bb4c03dfa5ff33994e6e3e7ed` |

## Your token — what it covers

Your token has **Workers Scripts:Edit** and **Account Settings:Read** — that is enough for this project.

We deploy with `wrangler deploy` (Workers static assets), **not** Cloudflare Pages — so **Cloudflare Pages:Edit is not required**.

| Permission | Needed | Your token |
|-----------|--------|------------|
| Workers Scripts → Edit | ✅ | ✅ |
| Account Settings → Read | ✅ | ✅ |
| Cloudflare Pages → Edit | ❌ Not needed | — |

## After successful deploy

1. Site URL: `https://kvr-hospitals.<your-subdomain>.workers.dev`
2. Cloudflare → Workers & Pages → **kvr-hospitals** → Settings → Domains & Routes
3. Add custom domain: `kvrhospitals.com` and `www.kvrhospitals.com`

## Meta privacy policy URL

`https://kvrhospitals.com/privacy.html`

## Manual deploy (alternative)

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect Git → KVR_Hospitals

- Build: `npm run build`
- Output: `dist`
