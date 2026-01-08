\connect films

-- Включаем расширение для UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- Таблица films
-- =========================
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS films CASCADE;

CREATE TABLE films (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  about TEXT,
  rating DOUBLE PRECISION,
  director TEXT,
  tags TEXT,
  image TEXT,
  cover TEXT
);

-- =========================
-- Таблица schedules
-- =========================
CREATE TABLE schedules (
  id UUID PRIMARY KEY,
  film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
  daytime TIMESTAMPTZ NOT NULL,
  hall INTEGER NOT NULL,
  rows INTEGER NOT NULL,
  seats INTEGER NOT NULL,
  price INTEGER NOT NULL,
  taken TEXT[] NOT NULL DEFAULT '{}'
);


-- Индексы (не обязательны, но полезны)
CREATE INDEX idx_schedules_film ON schedules(film);
CREATE INDEX idx_schedules_daytime ON schedules(daytime);
