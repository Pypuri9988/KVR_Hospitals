#!/bin/bash
# One-time Oracle Cloud VM setup — run ON THE SERVER as ubuntu user:
#   curl -sSL https://raw.githubusercontent.com/Pypuri9988/KVR_Hospitals/main/deploy/oracle/setup-server.sh | bash
# Or after git clone: bash deploy/oracle/setup-server.sh

set -euo pipefail

echo "==> KVR Hospital — Oracle server setup"

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y nginx certbot python3-certbot-nginx git curl ufw

# Node.js 20 LTS
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# PM2 for WhatsApp bot
sudo npm install -g pm2

# Web root
sudo mkdir -p /var/www/kvrhospitals
sudo chown -R "$USER:www-data" /var/www/kvrhospitals
sudo chmod -R 755 /var/www/kvrhospitals

# WhatsApp API
sudo mkdir -p /opt/kvr-whatsapp
sudo chown -R "$USER:$USER" /opt/kvr-whatsapp

# Nginx site
if [ -f /tmp/kvr-nginx.conf ]; then
  sudo cp /tmp/kvr-nginx.conf /etc/nginx/sites-available/kvrhospitals
elif [ -f deploy/oracle/nginx-kvrhospitals.conf ]; then
  sudo cp deploy/oracle/nginx-kvrhospitals.conf /etc/nginx/sites-available/kvrhospitals
else
  echo "ERROR: nginx config not found. Run deploy.ps1 -SetupOnly first."
  exit 1
fi

sudo ln -sf /etc/nginx/sites-available/kvrhospitals /etc/nginx/sites-enabled/kvrhospitals
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl enable nginx && sudo systemctl reload nginx

# Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo ""
echo "✅ Server ready."
echo "Next:"
echo "  1. Point DNS A record kvrhospitals.com → $(curl -s ifconfig.me || echo YOUR_PUBLIC_IP)"
echo "  2. From your PC: .\\deploy\\oracle\\deploy.ps1 -ServerIp YOUR_IP"
echo "  3. SSL: sudo certbot --nginx -d kvrhospitals.com -d www.kvrhospitals.com -d api.kvrhospitals.com"
