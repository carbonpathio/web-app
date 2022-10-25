from django.apps import AppConfig


class WellsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "wells"

    def ready(self):
        from . import signals  # noqa
