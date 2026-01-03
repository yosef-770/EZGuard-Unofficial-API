# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy dependencies from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy application code
COPY . .

# Expose internal port (fixed)
EXPOSE 3050

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3050/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Run the application
CMD ["node", "server.js"]
