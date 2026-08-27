#!/bin/bash
# One-time setup for Oracle Linux 9 on Oracle Cloud (user: opc)
# Run: bash setup-server-oracle-linux.sh

set -euo pipefail

echo "==> KVR Hospital — Oracle Linux server setup"

# Swap helps on E2.1.Micro (1 GB RAM) during npm install
if [ ! -f /swapfile ]; then
  echo "==> Adding 2G swap..."
  sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

sudo dnf update -y
sudo dnf install -y nginx git curl firewalld

# Certbot (EPEL)
sudo dnf install -y oracle-epel-release-el9 2>/dev/null || true
sudo dnf install -y certbot python3-certbot-nginx 2>/dev/null || sudo dnf install -y certbot

# Node.js 20
if ! command -v node &>/dev/null; then
  curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
  sudo dnf install -y nodejs
fi

sudo npm install -g pm2

sudo mkdir -p /var/www/kvrhospitals
sudo chown -R opc:nginx /var/www/kvrhospitals
sudo chmod -R 755 /var/www/kvrhospitals

sudo mkdir -p /opt/kvr-whatsapp
sudo chown -R opc:opc /opt/kvr-whatsapp

# Nginx config (Oracle Linux uses conf.d)
if [ -f /tmp/kvr-nginx.conf ]; then
  sudo cp /tmp/kvr-nginx.conf /etc/nginx/conf.d/kvrhospitals.conf
elif [ -f deploy/oracle/nginx-kvrhospitals.conf ]; then
  sudo cp deploy/oracle/nginx-kvrhospitals.conf /etc/nginx/conf.d/kvrhospitals.conf
else
  echo "ERROR: nginx config not found."
  exit 1
fi

# Remove default server block if present
sudo rm -f /etc/nginx/conf.d/default.conf 2>/dev/null || true

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl reload nginx

# Firewall
sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

echo ""
echo "✅ Oracle Linux server ready."
echo "Public IP: $(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo "Next: deploy app from GitHub or run deploy.ps1 from your PC"
