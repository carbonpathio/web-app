FROM python:3.9-slim as api_base

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
  curl \
  git \
  jq \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  libmagic1 \
  libpq-dev \
  libssl-dev \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*


FROM api_base as api_build

RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app/api

COPY api/pyproject.toml api/poetry.toml api/poetry.lock /app/api/

ENV PIP_NO_CACHE_DIR 1
RUN pip install poetry==1.1.*
RUN python -m venv .venv && poetry install --no-root


FROM api_base as api
COPY --from=api_build /app/api /app/api

WORKDIR /app/api

RUN mkdir -p /app/api /app/api/carbonpath/media

COPY api /app/api

COPY docker-entrypoint-*.sh /

RUN chmod +x /docker-entrypoint-api.sh && \
  chmod +x /docker-entrypoint-celery.sh

EXPOSE 5000

ENTRYPOINT [ "/docker-entrypoint-api.sh" ]
