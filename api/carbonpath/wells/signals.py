from alerts.models import Alert, AlertType
from django.conf import settings
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from wells.models import Well
from wells.utils import send_email


@receiver(pre_save, sender=Well)
def alert_on_mint(sender, instance, *args, **kwargs):
    try:
        old_instance = Well.objects.get(id=instance.id)
    except Well.DoesNotExist:
        return None

    old_status = old_instance.mint_status

    if old_status == "draft" and instance.mint_status == "minted":
        location = instance.location
        try:
            alert_type = AlertType.objects.get(type="Location", name=location)
        except AlertType.DoesNotExist:
            return False
        for user in alert_type.subscribers.all():
            alert = Alert.objects.create(
                type=alert_type, user=user, message=f"New well {instance.name} has been added."
            )
            if user.email:
                send_email(
                    "New Alert from CarbonPath",
                    user.email,
                    settings.CARBONPATH_EMAIL,
                    "alert",
                    {
                        "email": user.email,
                        "well_name": instance.name,
                        "web_link": settings.CARBONPATH_APP_LINK,
                    },
                )
        return True
