@echo off
REM Local Development Startup Script for Windows
REM Usage: start-local.bat

echo 🚀 Starting CVD Risk Assessment Dashboard locally with Docker Compose...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo 📦 Building and starting services...
docker-compose up --build -d

echo ⏳ Waiting for services to be healthy...

echo 🔍 Checking FastAPI health...
for /l %%i in (1,1,30) do (
    curl -s http://localhost:8000/health >nul 2>&1
    if not errorlevel 1 (
        echo ✅ FastAPI is healthy
        goto frontend_check
    )
    echo    Waiting... (%%i/30)
    timeout /t 2 /nobreak >nul
)
echo ❌ FastAPI failed to start
goto end

:frontend_check
echo 🔍 Checking Frontend...
for /l %%i in (1,1,30) do (
    curl -s http://localhost:3000 >nul 2>&1
    if not errorlevel 1 (
        echo ✅ Frontend is healthy
        goto success
    )
    echo    Waiting... (%%i/30)
    timeout /t 2 /nobreak >nul
)
echo ❌ Frontend failed to start
goto end

:success
echo.
echo 🎉 All services are running!
echo.
echo 📍 Access points:
echo    • Dashboard (via Nginx):  http://localhost:7860
echo    • Frontend (direct):      http://localhost:3000
echo    • FastAPI (direct):       http://localhost:8000
echo    • FastAPI Docs:           http://localhost:8000/docs
echo    • FastAPI Health:         http://localhost:8000/health
echo.
echo 📋 To view logs:
echo    docker-compose logs -f
echo.
echo 🛑 To stop:
echo    docker-compose down
echo.

:end
pause