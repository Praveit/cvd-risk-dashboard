#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Start CVD Risk Assessment Dashboard
.DESCRIPTION
    Starts all services (FastAPI, Next.js, Nginx) using Docker Compose
#>

param(
    [switch]$Build,
    [switch]$Detach,
    [switch]$NoCache
)

$composeFile = "docker-compose.yml"
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $projectDir

Write-Host "Starting CVD Risk Assessment Dashboard..." -ForegroundColor Cyan

# Check Docker is running
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker not found. Please install Docker Desktop."
    exit 1
}

try {
    docker info | Out-Null
}
catch {
    Write-Error "Docker daemon not running. Please start Docker Desktop."
    exit 1
}

# Build args
$buildArgs = @()
if ($Build) { $buildArgs += "--build" }
if ($NoCache) { $buildArgs += "--no-cache" }
if ($Detach) { $buildArgs += "-d" }

# Start services
Write-Host "Starting containers..." -ForegroundColor Green
docker compose -f $composeFile up $buildArgs

Write-Host "`nServices running:" -ForegroundColor Cyan
Write-Host "  Dashboard (Nginx):  http://localhost:7860" -ForegroundColor Yellow
Write-Host "  FastAPI docs:       http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "  Next.js dev:        http://localhost:3000" -ForegroundColor Yellow