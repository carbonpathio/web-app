import os

from .base import *  # pylint: disable=unused-wildcard-import,wildcard-import
from .base import env


ENVIRONMENT = "Local"

DEBUG = env.bool("DJANGO_DEBUG", True)

try:
    import silk  # type: ignore

    ENABLE_SILK = env.bool("DJANGO_ENABLE_SILK", True)
except ImportError:
    ENABLE_SILK = False

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_PATH = env.str("DJANGO_MEDIA_PATH", default="/media/")
MEDIA_URL = env.str("DJANGO_MEDIA_URL", default="/media/")

if ENABLE_SILK:
    INSTALLED_APPS.append("silk")
    MIDDLEWARE.insert(0, "silk.middleware.SilkyMiddleware")
