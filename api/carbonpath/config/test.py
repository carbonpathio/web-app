from .base import *  # pylint: disable=wildcard-import,unused-wildcard-import


ENVIRONMENT = "Test"


# Security
CORS_ORIGIN_REGEX_WHITELIST = []
CSRF_TRUSTED_ORIGINS = []


# Background Tasks and Caching
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}


# Email
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# Silk
ENABLE_SILK = False
