# Deploy KVR Hospital to Oracle Cloud VM via SSH (run from Cursor terminal on Windows)

param(
    [Parameter(Mandatory = $false)]
    [string]$ServerIp,

    [string]$User = "",

    [string]$SshKey = "",

    [switch]$OracleLinux,

    [switch]$SkipBuild,

    [switch]$SetupOnly
)

$ErrorActionPreference = "Stop"
$Root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$EnvFile = Join-Path $PSScriptRoot ".env.deploy"

if (Test-Path $EnvFile) {
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^\s*([^#=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $val = $matches[2].Trim()
            switch ($name) {
                "SERVER_IP" { if (-not $ServerIp) { $ServerIp = $val } }
                "SERVER_USER" { if (-not $User) { $User = $val } }
                "SSH_KEY" { if (-not $SshKey) { $SshKey = $val } }
            }
        }
    }
}

if (-not $User) {
    $User = if ($OracleLinux) { "opc" } else { "ubuntu" }
}

$setupScript = if ($OracleLinux) { "setup-server-oracle-linux.sh" } else { "setup-server.sh" }
$webGroup = if ($OracleLinux) { "nginx" } else { "www-data" }

if (-not $ServerIp) {
    Write-Host "Usage: .\deploy\oracle\deploy.ps1 -ServerIp YOUR_ORACLE_PUBLIC_IP -OracleLinux" -ForegroundColor Yellow
    Write-Host "Or create deploy\oracle\.env.deploy from .env.deploy.example"
    exit 1
}

$sshArgs = @()
if ($SshKey -and (Test-Path $SshKey)) {
    $sshArgs += @("-i", $SshKey)
}
$target = "${User}@${ServerIp}"

function Invoke-Ssh($cmd) {
    & ssh @sshArgs $target $cmd
    if ($LASTEXITCODE -ne 0) { throw "SSH failed: $cmd" }
}

function Invoke-Scp($src, $dest) {
    & scp @sshArgs -r $src "${target}:$dest"
    if ($LASTEXITCODE -ne 0) { throw "SCP failed: $src -> $dest" }
}

Write-Host "==> Target: $target" -ForegroundColor Cyan

if ($SetupOnly) {
    Write-Host "==> Uploading nginx config + running setup on server..."
    Invoke-Scp (Join-Path $PSScriptRoot "nginx-kvrhospitals.conf") "/tmp/kvr-nginx.conf"
    Invoke-Scp (Join-Path $PSScriptRoot $setupScript) "/tmp/setup-server.sh"
    Invoke-Ssh "bash /tmp/setup-server.sh"
    Write-Host "✅ Server setup done. Add DNS A records, then run deploy again without -SetupOnly"
    exit 0
}

if (-not $SkipBuild) {
    Write-Host "==> Building frontend..."
    Push-Location $Root
    npm run build
    Pop-Location
}

Write-Host "==> Uploading site to /var/www/kvrhospitals ..."
Invoke-Ssh "mkdir -p /var/www/kvrhospitals"
$dist = Join-Path $Root "dist"
Invoke-Scp "$dist\*" "/var/www/kvrhospitals/"

Write-Host "==> Uploading WhatsApp server to /opt/kvr-whatsapp ..."
Invoke-Ssh "mkdir -p /opt/kvr-whatsapp"
$wa = Join-Path $Root "whatsapp-server"
Invoke-Scp "$wa\src" "/opt/kvr-whatsapp/"
Invoke-Scp "$wa\package.json" "/opt/kvr-whatsapp/"
Invoke-Scp "$wa\package-lock.json" "/opt/kvr-whatsapp/"

Write-Host "==> Installing WhatsApp deps + PM2 restart..."
Invoke-Ssh @"
cd /opt/kvr-whatsapp && npm install --omit=dev
if pm2 describe kvr-whatsapp >/dev/null 2>&1; then
  pm2 restart kvr-whatsapp
else
  pm2 start src/index.js --name kvr-whatsapp
fi
pm2 save
sudo env PATH=`$PATH:/usr/bin pm2 startup systemd -u $User --hp /home/$User | tail -1 | bash || true
"@

Invoke-Ssh "sudo chown -R ${User}:${webGroup} /var/www/kvrhospitals && sudo systemctl reload nginx"

Write-Host ""
Write-Host "✅ Deploy complete!" -ForegroundColor Green
Write-Host "   Site:  http://${ServerIp}  (after DNS: https://kvrhospitals.com)"
Write-Host "   API:   http://${ServerIp}:8787  (after DNS: https://api.kvrhospitals.com/webhook)"
Write-Host ""
Write-Host "SSL (once DNS points here):" -ForegroundColor Yellow
Write-Host "   ssh $target 'sudo certbot --nginx -d kvrhospitals.com -d www.kvrhospitals.com -d api.kvrhospitals.com'"
