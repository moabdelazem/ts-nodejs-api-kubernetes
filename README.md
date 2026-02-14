# TypeScript + Express Sample API

A REST API built with TypeScript, Express, and PostgreSQL. Uses raw SQL, Zod validation, structured logging with Pino, and is containerized for Kubernetes deployment.

## Quick Start

```bash
npm install
npm run compose:up    # start Postgres
npm run dev           # start dev server at :6767
```

## Environment Variables

Configure via `.env`. See `.env` for defaults (`PORT`, `NODE_ENV`, `DATABASE_URL`, Postgres credentials).

## API Endpoints

| Method | Endpoint             | Description                                      |
| ------ | -------------------- | ------------------------------------------------ |
| GET    | `/api/funds`         | List all funds                                   |
| GET    | `/api/funds/:id`     | Get a fund                                       |
| POST   | `/api/funds`         | Create a fund (`name`, `amount`, `description?`) |
| PUT    | `/api/funds/:id`     | Update a fund (partial)                          |
| DELETE | `/api/funds/:id`     | Delete a fund                                    |
| GET    | `/api/funds/summary` | Total amount, fund count, shield score           |
| GET    | `/health/live`       | Liveness probe                                   |
| GET    | `/health/ready`      | Readiness probe (checks DB)                      |

## Project Highlights

- **No ORM** -- raw parameterized SQL via `pg`
- **Zod validation** -- schema-based request validation with field-level errors
- **Structured logging** -- Pino with JSON in production, pretty-print in dev
- **Centralized error handling** -- `AppError` class, Zod errors, and 404 catch-all
- **Graceful shutdown** -- drains HTTP connections and DB pool on SIGTERM/SIGINT
- **Multi-stage Docker build** -- production image runs as non-root with only compiled JS

## Docker

```bash
npm run compose:up      # dev: Postgres only
npm run compose:down    # stop
npm run compose:clean   # stop + delete data
```
