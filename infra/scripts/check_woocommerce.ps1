# Simple WooCommerce connectivity check (PowerShell)
# Usage:
# 1) Copy .env.example -> .env and fill keys (or set env vars)
# 2) Run: powershell -ExecutionPolicy Bypass -File .\infra\scripts\check_woocommerce.ps1

# Load .env if exists
$envFile = Join-Path $PSScriptRoot '..\..\..\.env'
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*#') { return }
        if ($_ -match '^\s*$') { return }
        $parts = $_ -split '=',2
        if ($parts.Count -eq 2) {
            $name = $parts[0].Trim()
            $value = $parts[1].Trim()
            Set-Item -Path "Env:$name" -Value $value
        }
    }
}

$base = $env:WOOCOMMERCE_BASE_URL
$key = $env:WOOCOMMERCE_CONSUMER_KEY
$secret = $env:WOOCOMMERCE_CONSUMER_SECRET

if (-not $base -or -not $key -or -not $secret) {
    Write-Host "Missing WOOCOMMERCE_BASE_URL or credentials. Edit .env or set env vars." -ForegroundColor Red
    exit 1
}

$perPage = 5
$url = "$base/wp-json/wc/v3/products?per_page=$perPage&consumer_key=$key&consumer_secret=$secret"

Write-Host "Requesting: $url" -ForegroundColor Cyan

try {
    $resp = Invoke-RestMethod -Uri $url -Method GET -UseBasicParsing -ErrorAction Stop
    if ($resp -is [System.Array]) {
        Write-Host "Success: Received $($resp.Count) products." -ForegroundColor Green
    } else {
        Write-Host "Success: Received response (not an array). Inspect output below." -ForegroundColor Yellow
    }
    $resp | ConvertTo-Json -Depth 4
} catch {
    Write-Host "Request failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 2
}