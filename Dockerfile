# Backend Dockerfile for MedAura AI
# Python FastAPI application

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY Main.py .
COPY api_server.py .
COPY export_cases.py .
COPY Utils/ ./Utils/
COPY medical_reports/ ./medical_reports/
COPY cases_data/ ./cases_data/
COPY results/ ./results/

# NOTE: API keys should be provided via environment variables, NOT copied into the image
# Use docker-compose with env_file or pass -e flags at runtime

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

# Run the application
CMD ["python", "api_server.py"]
