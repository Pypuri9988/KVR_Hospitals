# Cloudflare Pages — GitHub Actions setup

## Required GitHub secrets

| Secret | Value |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | API token from Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | `7d76040bb4c03dfa5ff33994e6e3e7ed` |

## API token permissions (important)

When creating the token at Cloudflare → My Profile → API Tokens → Create Token:

Use **Edit Cloudflare Workers** template, then ensure these are checked:

- Account → **Cloudflare Pages** → **Edit**
- Account → **Workers Scripts** → **Edit**
- Account → **Account Settings** → **Read**

If deploy fails with 403/authentication error, recreate the token with Pages Edit permission.

## After successful deploy

1. Site URL: `https://kvr-hospital-web.pages.dev`
2. Cloudflare → Workers & Pages → **kvr-hospital-web** → Custom domains
3. Add: `kvrhospitals.com` and `www.kvrhospitals.com`

## Meta privacy policy URL

`https://kvrhospitals.com/privacy.html`

## Manual deploy (alternative)

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect Git → KVR_Hospitals

- Build: `npm run build`
- Output: `dist`
