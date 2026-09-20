@echo off
echo Starting CVD Risk Assessment Dashboard...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo Docker daemon not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo Starting containers...
docker compose up --build

echo.
echo Services running:
echo   Dashboard (Nginx):  http://localhost:7860
echo   FastAPI docs:       http://localhost:8000/docs
echo   Next.js dev:        http://localhost:3000
echo.
pause