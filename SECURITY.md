# Security Policy

## Reporting

Contact: udaypypuri1996@gmail.com

## Secrets — never commit

The following must **never** appear in this repository:

- Meta App Secret
- Meta access tokens (`META_ACCESS_TOKEN`)
- Webhook verify tokens in production (use Render/Cloudflare env vars)
- `.env` files

This repo uses `.gitignore` to block `.env` files. Always review `git status` before pushing.

## If credentials were exposed

1. **Meta App Secret:** App settings → Basic → Reset App Secret
2. **Access token:** Revoke in Meta Business → System users → regenerate
3. **Webhook verify token:** Change in Render env + Meta webhook config

## Deployment security

- Website: Cloudflare Pages with security headers (`public/_headers`)
- WhatsApp API: Render with HTTPS only
- Patient data handled per [privacy policy](https://kvrhospitals.com/privacy.html)
