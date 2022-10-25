#!/bin/sh
set -e

cd /app/api/carbonpath

/app/api/.venv/bin/celery -A config worker --concurrency=10 -l warning --beat
