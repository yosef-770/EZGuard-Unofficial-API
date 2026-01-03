# EzGuard API Docker Setup

## Quick Start

### Using Docker Compose (Recommended)

1. Make sure you have `.env` file with your credentials:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

2. Build and run:
```bash
docker-compose up -d

# To use a different external port (e.g., 8080):
EXTERNAL_PORT=8080 docker-compose up -d
```

3. Check logs:
```bash
docker-compose logs -f
```

4. Stop:
```bash
docker-compose down
```

### Using Docker CLI

1. Build the image:
```bash
docker build -t ezguard-api .
```

2. Run the container:
```bash
# Default port 3050
docker run -d \
  --name ezguard-api \
  -p 3050:3050 \
  --env-file .env \
  ezguard-api

# Or use a different external port (e.g., 8080):
docker run -d \
  --name ezguard-api \
  -p 8080:3050 \
  --env-file .env \
  ezguard-api
```

3. Check logs:
```bash
docker logs -f ezguard-api
```

4. Stop and remove:
```bash
docker stop ezguard-api
docker rm ezguard-api
```

## Environment Variableinside container (default: 3050, recommended to keep as-is)
- `EZGUARD_API_BASE_URL` - EzGuard API base URL (default: https://webapi.ez-guard.com/v3)

Docker Compose only:
- `EXTERNAL_PORT` - External port mapping (default: 3050) - set via environment variable, not in .env file

## Testing the API

```bash
# Get incidents (replace YOUR_- EzGuard API base URL (default: https://webapi.ez-guard.com/v3)

## Testing the API

```bash
# Health check
curl http://localhost:3050/health

# Get incidents (replace TOKEN with your actual token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/incidents?timestamp=2024-01-01T00:00:00Z"

# Get forms
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3050/forms?timestamp=2024-01-01T00:00:00Z"
```

## Production Deployment

For production, consider:
- Using Docker secrets instead of environment variables
- Setting up proper logging and monitoring
- Using a reverse proxy (nginx/traefik)
- Implementing rate limiting
- Using HTTPS
