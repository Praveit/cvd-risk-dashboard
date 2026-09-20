# CVD Risk Assessment Dashboard - Local Development

## Quick Start

```bash
# Windows
start-local.bat

# Linux/Mac
chmod +x start-local.sh
./start-local.sh
```

Or manually:
```bash
docker-compose up --build -d
```

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Dashboard** | http://localhost:7860 | Main app via Nginx |
| **Frontend (dev)** | http://localhost:3000 | Next.js with hot reload |
| **FastAPI** | http://localhost:8000 | API backend |
| **FastAPI Docs** | http://localhost:8000/docs | Swagger UI |
| **FastAPI Health** | http://localhost:8000/health | Health check |

## Development Workflow

1. **Frontend changes** - Hot reload works automatically on `localhost:3000`
2. **API changes** - Edit files in `api/`, FastAPI auto-reloads
3. **View logs**: `docker-compose logs -f`
4. **Stop**: `docker-compose down`

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Compose                       │
├──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│   Nginx      │  │  Frontend    │  │     FastAPI      │  │
│  (port 7860) │──▶│  (port 3000) │  │   (port 8000)    │  │
│              │  │  Next.js     │  │   Python 3.11    │  │
│  Reverse     │  │  Hot Reload  │  │   Uvicorn        │  │
│  Proxy       │  │              │  │                  │  │
└──────────────┘  └──────────────┘  └──────────────────┘  │
         ▲               ▲                    ▲           │
         │               │                    │           │
         └───────────────┴────────────────────┘           │
                         │                                │
                  HTTP Requests                        │
                    /api/* ─────────────────────────────┘
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `FASTAPI_URL` | `http://localhost:8000` | FastAPI endpoint |
| `NODE_ENV` | `development` | Next.js mode |
| `PYTHONUNBUFFERED` | `1` | Python logging |

## File Structure

```
├── api/
│   ├── main.py              # FastAPI app
│   ├── clinical_risk.py     # Risk calculation + SHAP
│   └── requirements.txt     # Python deps
├── clinical-dashboard/      # Next.js app
│   ├── app/
│   │   ├── api/risk/       # API proxy route
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   └── package.json
├── docker-compose.yml       # Local dev stack
├── Dockerfile.fastapi       # FastAPI container
├── Dockerfile.frontend      # Next.js dev container
└── nginx.local.conf         # Nginx config for dev
```

## Troubleshooting

### FastAPI not responding
```bash
docker-compose logs fastapi
```

### Frontend not loading
```bash
docker-compose logs frontend
```

### Port conflicts
If ports 3000, 8000, or 7860 are in use:
```bash
# Check what's using the port
netstat -ano | findstr :3000
# Kill the process
taskkill /PID <PID> /F
```

### Reset everything
```bash
docker-compose down -v
docker-compose up --build -d
```

## Production Deployment

For production, use the main `Dockerfile` (multi-stage build) and deploy to Render, Railway, or similar platforms. The local docker-compose is optimized for development with hot reload.