import os
from pathlib import Path

import environ


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()

if READ_DOT_ENV_FILE := env.bool("DJANGO_READ_DOT_ENV_FILE", default=True):
    env.read_env(os.path.join(BASE_DIR.parent, ".env"))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DJANGO_DEBUG", False)


# Application definition
INSTALLED_APPS = [
    "modeltranslation",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django_sites_extensions",
    "django.contrib.sites",
    "django.contrib.staticfiles",
    # third-party
    "corsheaders",
    "dj_rest_auth.registration",
    "dj_rest_auth",
    "django_extensions",
    "drf_recaptcha",
    "drf_spectacular",
    "health_check.contrib.migrations",
    "health_check.db",
    "health_check",
    "knox",
    "rest_framework",
    "smuggler",
    "timezone_field",
    "versatileimagefield",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "whitenoise",
    "django_jsonform",
    "django_filters",
    "django_celery_beat",
    # internal
    "users.apps.UsersConfig",
    "faqs.apps.FaqsConfig",
    "core.apps.CoreConfig",
    "wells.apps.WellsConfig",
    "alerts.apps.AlertsConfig",
    "authentication.apps.AuthenticationConfig",
    "ipfs.apps.IpfsConfig",
    "dronedeploy.apps.DronedeployConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    # "csp.contrib.rate_limiting.RateLimitedCSPMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.sites.middleware.CurrentSiteMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "urls"

WSGI_APPLICATION = "wsgi.application"

# Database

DATABASES = {
    "default": env.db("DATABASE_URL", default="postgres://127.0.0.1:5432/carbonpath"),
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Security

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")


ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS")

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Custom user app

AUTH_USER_MODEL = "users.User"


# General

APPEND_SLASH = True


# Internationalization

LANGUAGE_CODE = "en-us"

gettext = lambda s: s

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

DATE_FORMAT = "M j, Y"

TIME_FORMAT = "H:i"

LOCALE_PATHS = [os.path.join(BASE_DIR, "locale")]

# Static files (CSS, JavaScript, Images)

DEFAULT_FILE_STORAGE = env.str("DJANGO_DEFAULT_FILE_STORAGE", "django.core.files.storage.FileSystemStorage")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATIC_URL = "/static/"
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]
STATICFILES_DIRS = [
    ("carbonpath", os.path.join(BASE_DIR, "static")),
]

# Media Files

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_PATH = env.str("DJANGO_MEDIA_PATH", default="/media/")
MEDIA_URL = env.str("DJANGO_MEDIA_URL", default="http://localhost:8000/media/")

DATA_UPLOAD_MAX_MEMORY_SIZE = 100 * 1024 * 1024  # 10 MiB


# Silk

ENABLE_SILK = env.bool("DJANGO_ENABLE_SILK", False)


# Templates

TEMPLATES_DIR = [os.path.join(BASE_DIR, "templates")]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": TEMPLATES_DIR,
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# Logging


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "django.server": {
            "()": "django.utils.log.ServerFormatter",
            "format": "[{server_time}] {message}",
            "style": "{",
        },
        "verbose": {
            "format": "{asctime} {levelname} [{module}] {process} {thread} {message}",
            "style": "{",
        },
        "simple": {"format": "[{levelname}] {message}", "style": "{"},
    },
    "filters": {
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
        "require_debug_false": {
            "()": "django.utils.log.RequireDebugFalse",
        },
    },
    "handlers": {
        "django.server": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "django.server",
        },
        "console": {
            "level": "INFO",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "mail_admins": {"level": "ERROR", "class": "django.utils.log.AdminEmailHandler"},
    },
    "loggers": {
        "": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
        "django": {
            "handlers": ["console"],
            "propagate": False,
        },
        "django.server": {
            "handlers": ["django.server"],
            "level": "INFO",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["django.server"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}


# API

PAGE_SIZE = env.int("DJANGO_PAGE_SIZE", 25)

REST_FRAMEWORK = {
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S%z",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": PAGE_SIZE,
    "DEFAULT_RENDERER_CLASSES": [
        "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
        # "djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "djangorestframework_camel_case.parser.CamelCaseFormParser",
        "djangorestframework_camel_case.parser.CamelCaseMultiPartParser",
        "djangorestframework_camel_case.parser.CamelCaseJSONParser",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        # "rest_framework.authentication.TokenAuthentication",
        # "rest_framework.authentication.SessionAuthentication",
        "knox.auth.TokenAuthentication",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "EXCEPTION_HANDLER": "requestlogs.views.exception_handler",
    "JSON_UNDERSCOREIZE": {
        "no_underscore_before_number": True,
    },
}

REST_KNOX = {
    "USER_SERIALIZER": "users.serializers.UserSerializer",
    "TOKEN_TTL": None,
    "AUTH_HEADER_PREFIX": "Bearer",
}

REST_AUTH_SERIALIZERS = {
    "TOKEN_SERIALIZER": "authentication.serializers.base.TokenSerializer",
    "PASSWORD_RESET_SERIALIZER": "authentication.serializers.base.PasswordResetSerializer",
}

REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "authentication.serializers.base.RegisterSerializer",
}

REST_AUTH_TOKEN_MODEL = "knox.models.AuthToken"
REST_AUTH_TOKEN_CREATOR = "auth.utils.create_token"

SITE_ID = 1


if REDIS_URL_CACHE := env.cache("DJANGO_REDIS_URL", default="locmemcache://"):
    CACHES = {"default": REDIS_URL_CACHE}


# Background Tasks and Caching

CELERY_REDIS_URL = env("DJANGO_REDIS_URL", default="redis://localhost:6379")
CELERY_SOFT_TIME_LIMIT = 5 * 60
CELERY_TASK_TRACK_STARTED = True

if CELERY_REDIS_URL:
    CELERY_BROKER_URL = CELERY_REDIS_URL
    CELERY_RESULT_BACKEND = CELERY_REDIS_URL

if USE_TZ:
    CELERY_TIMEZONE = TIME_ZONE

CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"


# AWS

AWS_ACCESS_KEY_ID = env.str("AWS_ACCESS_KEY_ID", default="")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY", default="")

if not AWS_ACCESS_KEY_ID:
    del AWS_ACCESS_KEY_ID
if not AWS_SECRET_ACCESS_KEY:
    del AWS_SECRET_ACCESS_KEY

AWS_BUCKET_ACL = "private"  # Only relevant if bucket does not exist.
AWS_DEFAULT_ACL = "private"
AWS_QUERYSTRING_AUTH = True
AWS_REGION = env.str("AWS_REGION", default="")
AWS_S3_FILE_OVERWRITE = False
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME", default="")


# Email

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
EMAIL_HOST = env.str("DJANGO_EMAIL_HOST", "")
EMAIL_HOST_USER = env.str("DJANGO_EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = env.str("DJANGO_EMAIL_HOST_PASSWORD", "")
EMAIL_PORT = env.int("DJANGO_EMAIL_PORT", 1025)
EMAIL_USE_TLS = env.bool("DJANGO_EMAIL_USE_TLS", True)
SERVER_EMAIL = env.str("DJANGO_SERVER_EMAIL", "root@localhost")


# django-versatileimagefield

VERSATILEIMAGEFIELD_RENDITION_KEY_SETS = {"profile_photo": [("big", "crop__100x100"), ("medium", "crop__80x80")]}


# drf-recaptcha

DRF_RECAPTCHA_SECRET_KEY = env("DRF_RECAPTCHA_SECRET_KEY", default="0")

# password hashers

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

# CSP

CSP_REPORT_PERCENTAGE = 0.1


# AUTHENTICATION
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#authentication-backends
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
    "authentication.backends.Web3Backend",
]
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-user-model
AUTH_USER_MODEL = "users.User"
# https://docs.djangoproject.com/en/dev/ref/settings/#login-redirect-url
LOGIN_REDIRECT_URL = "/authentication/login/"
# https://docs.djangoproject.com/en/dev/ref/settings/#login-url
LOGIN_URL = "/authentication/login/"


DEFAULT_NODE_URL = env("DEFAULT_NODE_URL", default="https://alfajores-forno.celo-testnet.org")


SPECTACULAR_SETTINGS = {
    "TITLE": "CarbonPath API",
    "DESCRIPTION": "This is the public API for CarbonPath",
    "VERSION": "1.0.0",
    "SCHEMA_PATH_PREFIX": r"/api/v[0-9]",
    "PREPROCESSING_HOOKS": ["core.openapi.custom_preprocessing_hook"],
}


## Pinata
PINATA_API_KEY = env("PINATA_API_KEY", default="")
PINATA_API_SECRET = env("PINATA_API_SECRET", default="")

# Enverus
ENVERUS_V3_SECRET_KEY = env.str("ENVERUS_V3_SECRET_KEY", "")

ENVERUS_V3_SECRET_KEY = env.str("ENVERUS_V3_SECRET_KEY", "")

# DroneDeploy
DRONE_DEPLOY_API_KEY = env.str("DRONE_DEPLOY_API_KEY", "")

# Email
CARBONPATH_APP_LINK = env("CARBONPATH_APP_LINK", default="https://dev.carbonpath.io")
CARBONPATH_EMAIL = env("CARBONPATH_EMAIL", default="noreply@dev.carbonpath.io")
