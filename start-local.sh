#!/bin/bash

# Local Development Startup Script
# Usage: ./start-local.sh

set -e

echo "🚀 Starting CVD Risk Assessment Dashboard locally with Docker Compose..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker-compose up --build -d

echo "⏳ Waiting for services to be healthy..."

# Wait for FastAPI
echo "🔍 Checking FastAPI health..."
for i in {1..30}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo "✅ FastAPI is healthy"
        break
    fi
    echo "   Waiting... ($i/30)"
    sleep 2
done

# Wait for Frontend
echo "🔍 Checking Frontend..."
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend is healthy"
        break
    fi
    echo "   Waiting... ($i/30)"
    sleep 2
done

echo ""
echo "🎉 All services are running!"
echo ""
echo "📍 Access points:"
echo "   • Dashboard (via Nginx):  http://localhost:7860"
echo "   • Frontend (direct):      http://localhost:3000"
echo "   • FastAPI (direct):       http://localhost:8000"
echo "   • FastAPI Docs:           http://localhost:8000/docs"
echo "   • FastAPI Health:         http://localhost:8000/health"
echo ""
echo "📋 To view logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 To stop:"
echo "   docker-compose down"
echo ""