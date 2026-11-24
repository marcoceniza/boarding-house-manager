#!/bin/sh
set -eu

cd /var/www/html

max_attempts=60
attempts=0

until php -r '
try {
    new PDO(
        "mysql:host=" . getenv("DB_HOST") . ";port=" . getenv("DB_PORT") . ";dbname=" . getenv("DB_DATABASE"),
        getenv("DB_USERNAME"),
        getenv("DB_PASSWORD")
    );
} catch (Throwable $exception) {
    exit(1);
}
' >/dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [ "$attempts" -ge "$max_attempts" ]; then
        echo "ERROR: cannot reach MySQL at ${DB_HOST}:${DB_PORT} as ${DB_USERNAME} after ${max_attempts} attempts." >&2
        exit 1
    fi
    echo "Waiting for MySQL at ${DB_HOST}:${DB_PORT}... (${attempts}/${max_attempts})"
    sleep 2
done

exec "$@"
