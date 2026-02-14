-- Up Migration: Create funds table

CREATE TABLE IF NOT EXISTS funds (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    amount      NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--- Down Migration

DROP TABLE IF EXISTS funds;
