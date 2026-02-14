# Base Image
FROM node:25-alpine3.22 AS builder

# Working Directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install NPM Packages
RUN npm ci

# Copy source code
COPY tsconfig.json .
COPY src/ src/

# Build the /dist directory
RUN npm run build

# Production Image
FROM node:25-alpine3.22 AS runner

WORKDIR /app

# Copy package files and install production-only deps
COPY package*.json .
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist dist/

# Copy migration files
COPY migrations/ migrations/

# Non-root user for security
USER node

EXPOSE 6767

CMD ["node", "dist/server.js"]