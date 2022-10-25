import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.redis import RedisIntegration

from .base import *  # pylint: disable=unused-wildcard-import,wildcard-import
from .base import env  # pylint: disable=unused-wildcard-import,wildcard-import


# Apps that appear only in dev/staging/prod.


ENVIRONMENT = env("DJANGO_ENVIRONMENT", default="Prod")

ENABLE_SILK = False

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30 * 6  # 180 days in seconds
SECURE_BROWSER_XSS_FILTER = True


# Sentry

SENTRY_ENVIRONMENT = env.str("SENTRY_ENVIRONMENT", default="dev")
SENTRY_DSN = env.str("SENTRY_DSN", default="")


def sentry_before_send(event, hint):
    """
    Prevents the health check from being sent to Sentry.

    """
    transaction = event.get("transaction")
    if transaction == "/ht/":
        return None
    return event


if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[
            DjangoIntegration(),
            RedisIntegration(),
        ],
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production.
        traces_sample_rate=0.8,
        # If you wish to associate users to errors (assuming you are using
        # django.contrib.auth) you may enable sending PII data.
        send_default_pii=True,
        environment=SENTRY_ENVIRONMENT,
        before_send=sentry_before_send,
    )


# Templates

TEMPLATE_LOADERS = (
    (
        "django.template.loaders.cached.Loader",
        (
            "django.template.loaders.filesystem.Loader",
            "django.template.loaders.app_directories.Loader",
        ),
    ),
)


# AWS
# In production, these settings are required.
# The ECS task execution role will be used instead of
# `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
AWS_REGION = env.str("AWS_DEFAULT_REGION")
AWS_DEFAULT_REGION = AWS_REGION
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_BUCKET_ACL = "private"  # Only relevant if bucket does not exist.
AWS_DEFAULT_ACL = "public-read"  # Ensures that new objects have have public-read ACL regardless of bucket's ACL.
AWS_S3_FILE_OVERWRITE = False
AWS_QUERYSTRING_AUTH = False


AWS_SES_REGION_NAME = "us-east-2"
AWS_SES_REGION_ENDPOINT = "email.us-east-2.amazonaws.com"


# Emails

EMAIL_BACKEND = "django_ses.SESBackend"


CORS_ORIGIN_ALLOW_ALL = False

CORS_ALLOWED_ORIGINS = [
    "https://carbonpath.io",
    "https://www.carbonpath.io",
    "https://dev.carbonpath.io",
    "https://localhost:3000",
    "https://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ORIGIN_WHITELIST = [
    "https://carbonpath.io",
    "https://www.carbonpath.io",
    "https://dev.carbonpath.io",
    "https://localhost:3000",
    "https://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


# CSP_DEFAULT_SRC = ["'none'"]
# CSP_SCRIPT_SRC = [
#     "https://stackpath.bootstrapcdn.com",
#     "https://cdn.jsdelivr.net",
#     "https://code.jquery.com",
#     "'self'",
# ]
# CSP_STYLE_SRC = ["https://stackpath.bootstrapcdn.com", "'self'"]
# CSP_IMG_SRC = ["'self'", "https://carbon-path-dev.s3.amazonaws.com/"]
