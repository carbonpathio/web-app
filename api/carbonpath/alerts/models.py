from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel


User = get_user_model()


class AlertTypeChoices(models.TextChoices):
    LOCATION = "Location"


class AlertType(models.Model):
    type = models.CharField(_("Type"), max_length=128, choices=AlertTypeChoices.choices, blank=True)
    name = models.CharField(_("Name"), max_length=128, blank=True)
    subscribers = models.ManyToManyField(User, related_name="alert_subscriptions")

    class Meta:
        verbose_name = _("Alert Type")
        verbose_name_plural = _("Alert Types")

    def __str__(self):
        return f"{self.type} - {self.name}"


class Alert(TimeStampedModel):
    type = models.ForeignKey(AlertType, on_delete=models.CASCADE, related_name="alert_list", null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="alert_list", null=True)
    message = models.CharField(_("Message"), max_length=128, blank=True)
    is_read = models.BooleanField(_("Is Read"), default=False)

    class Meta:
        verbose_name = _("Alert")
        verbose_name_plural = _("Alerts")
