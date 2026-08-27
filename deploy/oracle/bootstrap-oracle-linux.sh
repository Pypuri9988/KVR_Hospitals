#!/bin/bash
# Full bootstrap: setup + deploy from GitHub (Oracle Linux 9, opc user)
# Run on the server as opc:
#   curl -sSL https://raw.githubusercontent.com/Pypuri9988/KVR_Hospitals/main/deploy/oracle/bootstrap-oracle-linux.sh | bash

set -euo pipefail

REPO_RAW="https://raw.githubusercontent.com/Pypuri9988/KVR_Hospitals/main/deploy/oracle"

echo "==> Downloading setup scripts..."
curl -sSL "$REPO_RAW/setup-server-oracle-linux.sh" -o /tmp/setup-server-oracle-linux.sh
curl -sSL "$REPO_RAW/nginx-kvrhospitals.conf" -o /tmp/kvr-nginx.conf
curl -sSL "$REPO_RAW/deploy-from-github.sh" -o /tmp/deploy-from-github.sh

chmod +x /tmp/setup-server-oracle-linux.sh /tmp/deploy-from-github.sh

echo "==> Server setup..."
bash /tmp/setup-server-oracle-linux.sh

echo "==> Deploy from GitHub..."
bash /tmp/deploy-from-github.sh

echo ""
echo "✅ All done. Add DNS A records → kvrhospitals.com to this server's public IP."
echo "Then run SSL:"
echo "  sudo certbot --nginx -d kvrhospitals.com -d www.kvrhospitals.com -d api.kvrhospitals.com"
