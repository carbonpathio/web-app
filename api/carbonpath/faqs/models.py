from django.db import models
from django.utils.translation import gettext_lazy as _


class Faq(models.Model):
    question = models.TextField(_("FAQ Question"))
    answer = models.TextField(_("FAQ Answer"))

    class Meta:
        verbose_name = _("FAQ")
        verbose_name_plural = _("FAQs")
