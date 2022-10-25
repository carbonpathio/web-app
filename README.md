# Setting up

## Frontend

Node 16 is required to run this project. Assuming you have Node 16, install dependencies for all packages with Yarn:

```bash
yarn
```

## API

### With `pyenv`

It is recommended to install `python` using `pyenv` to easily switch between versions without depending on system installed `python` versions.

[Installing pyenv](https://binx.io/blog/2019/04/12/installing-pyenv-on-macos/)

### Without `pyenv`

Python 3.9 and [Poetry](https://python-poetry.org/) are required. If you are running Ubuntu 20.04, ensure that Python 3.9 is installed by running:

```bash
sudo apt install python-3.9 python3.9-dev
```

Assuming you have set up Poetry, install API dependencies:

```bash
cd api
poetry install
```

Afterwards, create your `api/.env` file using the provided `api/.env.example` file:

```bash
cp .env.example .env
```

Fill out your `.env` file according to your local environment configuration. Ensure that the database you specify in `DATABASE_URL` exists.

### Generate a DJANGO_SECRET_KEY

```python
import secrets

print(secrets.token_urlsafe())

# Sample Output: 1eE8JzMmpsS4Pz_GvbcDSl07T_QhDlqmb6_JhMz-lUI
```

Add Sample Output Value: `1eE8JzMmpsS4Pz_GvbcDSl07T_QhDlqmb6_JhMz-lUI` and update `DJANGO_SECRET_KEY`

### Run Migrations

Finally, run migrations:

```bash
cd carbonpath
poetry run python manage.py migrate
```

## Redis

[Redis](https://redis.io/download) is required to run this project. Update `api/.env` to point to your redis server. For example:

```bash
DJANGO_REDIS_URL=redis://127.0.0.1:6379/1
```

# Running

## Dev server for the web

You can run the web server this way:

```bash
PORT=3000 yarn web
```

## Dev server for API
You can run the dev server for the API this way:

```bash
cd api/carbonpath
poetry run python manage.py runserver 0.0.0.0:8000
```

## Redis Server

```bash
redis-server
```

## Celery

Assuming redis server is already running:

```bash
cd api/carbonpath
poetry run celery -A config.celery_app worker --loglevel=info --beat
```