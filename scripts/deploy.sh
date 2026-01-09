#!/bin/bash
# MedAura AI - Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="medaura-ai"

echo "=========================================="
echo "MedAura AI Deployment Script"
echo "Environment: $ENVIRONMENT"
echo "=========================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_info "All prerequisites met."
}

# Load environment variables
load_env() {
    if [ -f ".env" ]; then
        log_info "Loading environment variables from .env"
        export $(cat .env | grep -v '^#' | xargs)
    elif [ -f "apikey.env" ]; then
        log_info "Loading environment variables from apikey.env"
        export $(cat apikey.env | grep -v '^#' | xargs)
    else
        log_warn "No .env file found. Make sure environment variables are set."
    fi
    
    # Verify required variables
    if [ -z "$GOOGLE_API_KEY" ]; then
        log_error "GOOGLE_API_KEY is not set. Please configure your API key."
        exit 1
    fi
}

# Build Docker images
build_images() {
    log_info "Building Docker images..."
    
    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache
    else
        docker-compose build
    fi
    
    log_info "Docker images built successfully."
}

# Deploy services
deploy_services() {
    log_info "Deploying services..."
    
    # Stop existing containers
    docker-compose down --remove-orphans || true
    
    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    else
        docker-compose up -d
    fi
    
    log_info "Services deployed successfully."
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:8000/ > /dev/null 2>&1; then
            log_info "Backend is healthy!"
            break
        fi
        log_warn "Waiting for backend... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    if [ $attempt -gt $max_attempts ]; then
        log_error "Backend health check failed after $max_attempts attempts"
        docker-compose logs backend
        exit 1
    fi
    
    log_info "All services are healthy."
}

# Print deployment info
print_info() {
    echo ""
    echo "=========================================="
    echo "Deployment Complete!"
    echo "=========================================="
    echo ""
    echo "Access your application:"
    echo "  Frontend:  http://localhost:5173"
    echo "  Backend:   http://localhost:8000"
    echo "  API Docs:  http://localhost:8000/docs"
    echo ""
    echo "Useful commands:"
    echo "  View logs:     docker-compose logs -f"
    echo "  Stop:          docker-compose down"
    echo "  Restart:       docker-compose restart"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    load_env
    build_images
    deploy_services
    health_check
    print_info
}

main
