#!/bin/bash
# Deploy KVR Hospital from GitHub on Oracle Linux (opc user)
# Usage: bash deploy-from-github.sh

set -euo pipefail

REPO="https://github.com/Pypuri9988/KVR_Hospitals.git"
APP_DIR="/opt/kvr-hospital"
WEB_ROOT="/var/www/kvrhospitals"
WA_DIR="/opt/kvr-whatsapp"

echo "==> KVR Hospital — deploy from GitHub"

if [ ! -d "$APP_DIR/.git" ]; then
  sudo mkdir -p "$APP_DIR"
  sudo chown opc:opc "$APP_DIR"
  git clone "$REPO" "$APP_DIR"
else
  cd "$APP_DIR"
  git pull origin main
fi

cd "$APP_DIR"

export NODE_OPTIONS="--max-old-space-size=768"
npm ci
npm run build

sudo mkdir -p "$WEB_ROOT"
sudo rsync -a --delete dist/ "$WEB_ROOT/"
sudo chown -R opc:nginx "$WEB_ROOT"

sudo mkdir -p "$WA_DIR"
sudo rsync -a --delete whatsapp-server/src/ "$WA_DIR/src/"
sudo cp whatsapp-server/package.json whatsapp-server/package-lock.json "$WA_DIR/"
sudo chown -R opc:opc "$WA_DIR"

cd "$WA_DIR"
npm install --omit=dev

if pm2 describe kvr-whatsapp >/dev/null 2>&1; then
  pm2 restart kvr-whatsapp
else
  pm2 start src/index.js --name kvr-whatsapp
fi
pm2 save
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u opc --hp /home/opc | tail -1 | bash || true

sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "✅ Deploy complete!"
echo "   Site: http://$(curl -s ifconfig.me 2>/dev/null || echo YOUR_IP)"
echo "   Health: curl http://127.0.0.1:8787/health"
echo ""
echo "SSL (after DNS A records point here):"
echo "  sudo certbot --nginx -d kvrhospitals.com -d www.kvrhospitals.com -d api.kvrhospitals.com"
