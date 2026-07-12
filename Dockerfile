# Dockerfile for Render
# Multi-stage build: Python API + Next.js Frontend
# Runs on single port via nginx reverse proxy

# ============================================
# Stage 1: Build Next.js Frontend
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files first for better caching
COPY clinical-dashboard/package*.json ./

# Install dependencies (including dev deps for build)
RUN npm ci

# Copy frontend source
COPY clinical-dashboard/ ./

# Build Next.js for production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ============================================
# Stage 2: Python Base with System Dependencies
# ============================================
FROM python:3.11-slim AS python-base

# Install system dependencies: nginx, supervisord, curl (health checks)
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    supervisor \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 user
USER user
WORKDIR /home/user/app

# ============================================
# Stage 3: Install Python Dependencies
# ============================================
FROM python-base AS python-deps

# Copy Python requirements from api/
COPY --chown=user api/requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r ./requirements.txt

# ============================================
# Stage 4: Final Runtime Image
# ============================================
FROM python-deps AS runtime

# Copy Python API code
COPY --chown=user api/ ./api/

# Copy built Next.js frontend (standalone output)
COPY --from=frontend-builder --chown=user /app/frontend/.next/standalone ./frontend/
COPY --from=frontend-builder --chown=user /app/frontend/.next/static ./frontend/.next/static/

# Copy public folder from SOURCE (not from standalone - Next.js doesn't include it there)
COPY --chown=user clinical-dashboard/public ./frontend/public/

# Copy nginx and supervisord configs
COPY --chown=user nginx.conf /etc/nginx/nginx.conf
COPY --chown=user supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create required directories with proper permissions
USER root
RUN mkdir -p /var/cache/nginx /var/run/nginx /var/log/nginx \
    /var/log/supervisor \
    && chown -R user:user /var/cache/nginx /var/run/nginx /var/log/nginx /var/log/supervisor \
    && chmod 755 /var/run/nginx /var/log/supervisor
USER user

# Expose port (Render assigns via $PORT env var)
EXPOSE 7860

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:7860/health || exit 1

# Start supervisord (manages nginx + FastAPI + Next.js)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]