#!/bin/bash
set -e

# POSTGRES_USER и POSTGRES_DB задаёт официальный postgres image
# DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME — из docker-compose

psql -v ON_ERROR_STOP=1 \
    --username "$POSTGRES_USER" \
    --dbname "$POSTGRES_DB" <<-EOSQL

-- создать пользователя (если уже есть — postgres сам упадёт, и это нормально)
CREATE USER ${DATABASE_USER} WITH PASSWORD '${DATABASE_PASSWORD}';

-- создать базу, если не существует
DO
\$do\$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_database WHERE datname = '${DATABASE_NAME}'
    ) THEN
        CREATE DATABASE ${DATABASE_NAME};
    END IF;
END
\$do\$;

-- выдать права
GRANT ALL PRIVILEGES ON DATABASE ${DATABASE_NAME} TO ${DATABASE_USER};

EOSQL
