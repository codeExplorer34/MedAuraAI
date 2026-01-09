# 🐳 Docker Setup Guide for MedAura AI

## Quick Start

### Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

### One-Command Deploy

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

**Access:**
- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 📋 What Gets Created

**2 Docker Containers:**
1. **medaura-backend** - Python FastAPI server (Port 8000)
2. **medaura-frontend** - React app via Nginx (Port 80)

**Networking:**
- Both containers on `medaura-network`
- Frontend automatically proxies `/api/*` to backend

---

## 🔧 Detailed Commands

### Build Images
```bash
# Build both services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run Containers
```bash
# Start in detached mode
docker-compose up -d

# Start with logs visible
docker-compose up

# Start specific service
docker-compose up backend
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100
```

### Stop & Remove
```bash
# Stop containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove containers, networks, and volumes
docker-compose down -v

# Remove everything including images
docker-compose down --rmi all
```

### Rebuild After Code Changes
```bash
# Rebuild and restart
docker-compose up -d --build

# Force rebuild (no cache)
docker-compose build --no-cache
```

---

## 🔍 Debugging

### Check Container Status
```bash
docker-compose ps
```

### Execute Commands in Container
```bash
# Open bash in backend
docker-compose exec backend bash

# Run Python shell
docker-compose exec backend python

# Check frontend nginx
docker-compose exec frontend sh
```

### View Resource Usage
```bash
docker stats
```

### Inspect Containers
```bash
docker-compose inspect backend
```

---

## 🌍 Environment Variables

### Backend (.env or apikey.env)
```env
GOOGLE_API_KEY=your_key_here
ENV=production
DEBUG=false
```

### Frontend
Vite env variables should be in `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

---

## 📦 Volume Management

**Data Persistence:**
- `./cases_data` - Case database
- `./Results` - Analysis results  
- `./Medical Reports` - Medical reports

These folders are mounted as volumes, so data persists even if containers restart.

---

## 🚀 Production Deployment

### Build for Production
```bash
# Build production images
docker-compose -f docker-compose.yml build

# Tag images
docker tag medaura-backend:latest your-registry/medaura-backend:v1.0
docker tag medaura-frontend:latest your-registry/medaura-frontend:v1.0

# Push to registry
docker push your-registry/medaura-backend:v1.0
docker push your-registry/medaura-frontend:v1.0
```

### Deploy to Server
```bash
# On production server
docker-compose pull
docker-compose up -d
```

---

## 🔒 Security Best Practices

1. **Never commit API keys** - Use `.env` files (already in `.gitignore`)
2. **Use secrets management** in production (Docker Secrets, AWS Secrets Manager)
3. **Run as non-root** user (add to Dockerfile if needed)
4. **Keep images updated** - Regularly rebuild with latest base images
5. **Enable HTTPS** - Use reverse proxy (Nginx, Traefik) in production

---

## 📊 Health Checks

Both services have health checks configured:

**Backend:**
- Endpoint: `http://localhost:8000/health`
- Interval: 30s

**Frontend:**
- Endpoint: `http://localhost/`
- Interval: 30s

View health status:
```bash
docker-compose ps
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using port 80 or 8000
netstat -ano | findstr :80
netstat -ano | findstr :8000

# Change ports in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead of 80
```

### Container Won't Start
```bash
# View detailed logs
docker-compose logs backend

# Check if image built correctly
docker images | grep medaura
```

### Frontend Can't Reach Backend
- Check if both containers are on same network: `docker network inspect medaura-network`
- Verify nginx.conf proxy settings
- Check backend health: `curl http://localhost:8000/health`

### Slow Build Times
```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker-compose build
```

---

## 📈 Monitoring

### Container Stats
```bash
# Real-time stats
docker stats

# Export metrics
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

### Log to File
```bash
docker-compose logs -f > medaura.log
```

---

## 🔄 Updates

### Update to Latest Code
```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Update Single Service
```bash
docker-compose up -d --build backend
```

---

## ✅ Verification Checklist

After deployment:
- [ ] Frontend accessible at http://localhost
- [ ] Backend API docs at http://localhost:8000/docs
- [ ] Both containers running: `docker-compose ps`
- [ ] No errors in logs: `docker-compose logs`
- [ ] Health checks passing
- [ ] Can navigate to ER Co-Pilot page
- [ ] Can submit test case

---

**Your MedAura AI is now Dockerized!** 🎉

For questions or issues, check logs first:
```bash
docker-compose logs -f
```
