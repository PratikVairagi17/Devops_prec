# Multi-stage Dockerfile for Next.js app (production)
# Builder stage
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-bullseye-slim AS runner
WORKDIR /app

# Only copy necessary files for production
COPY package*.json ./
# Install only production deps
RUN npm ci --omit=dev

# Copy built next files and public/static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Default command (Next respects PORT env var)
CMD ["npm", "start"]
