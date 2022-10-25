#!/bin/sh
set -e

cd /app/api/carbonpath

echo "Migrating DB..."
/app/api/.venv/bin/python manage.py migrate
echo "Collecting static files.."
/app/api/.venv/bin/python manage.py collectstatic --noinput
/app/api/.venv/bin/python manage.py health_check

/app/api/.venv/bin/gunicorn --worker-class=server.workers.SecureUvicornWorker asgi:application -b=0.0.0.0:5000 --workers=4 --access-logfile=- --error-logfile=-
