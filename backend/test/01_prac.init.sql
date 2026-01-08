CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- FILMS
-- =========================
CREATE TABLE IF NOT EXISTS public.films
(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

    title text NOT NULL,
    description text DEFAULT '',
    image text DEFAULT '',
    cover text DEFAULT '',

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- =========================
-- SCHEDULES
-- =========================
CREATE TABLE IF NOT EXISTS public.schedules
(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

    daytime TIMESTAMPTZ NOT NULL,
    hall integer NOT NULL,
    rows integer NOT NULL,
    seats integer NOT NULL,
    price integer NOT NULL,

    taken text[] NOT NULL DEFAULT ARRAY[]::text[],

    film_id uuid NOT NULL
        REFERENCES public.films(id)
        ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_schedules_film_id
ON public.schedules(film_id);
