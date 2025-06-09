# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_DISABLE_ESLINT 1
ENV DISABLE_ESLINT_PLUGIN true
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 