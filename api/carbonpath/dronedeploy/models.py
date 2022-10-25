from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField
from django_resized import ResizedImageField


class MapPlan(models.Model):
    api_id = models.CharField(_("Map Plan ID"), max_length=64, blank=True, null=True)
    name = models.CharField(_("Map Plan Name"), max_length=64, blank=True, null=True)
    geometry = models.JSONField(null=True)
    jpeg_download_path = models.URLField(max_length=1000, null=True)
    jpeg_bounds = models.JSONField(null=True)
    jpeg_file = ResizedImageField(size=[4096, None], upload_to='dronedeploy/map_plans_jpeg', force_format='PNG', null=True)
    geotiff_download_path = models.URLField(max_length=1000, null=True)
    geotiff_bounds = models.JSONField(null=True)
    geotiff_file = models.FileField(upload_to='dronedeploy/map_plans_geotiff', null=True)

    class Meta:
        verbose_name = _("Map Plan")
        verbose_name_plural = _("Map Plans")

class PanoPlan(models.Model):
    api_id = models.CharField(_("Pano Plan ID"), max_length=64, blank=True, null=True)
    name = models.CharField(_("Pano Plan Name"), max_length=64, blank=True, null=True)
    geometry = models.JSONField(null=True)
    download_path = models.URLField(max_length=1000, null=True)

    class Meta:
        verbose_name = _("Pano Plan")
        verbose_name_plural = _("Pano Plans")

class PhotoPlan(models.Model):
    api_id = models.CharField(_("Photo Plan ID"), max_length=64, blank=True, null=True)
    name = models.CharField(_("Photo Plan Name"), max_length=64, blank=True, null=True)
    geometry = models.JSONField(null=True)
    download_path = ArrayField(models.URLField(max_length=1000, null=True), null=True)

    class Meta:
        verbose_name = _("Photo Plan")
        verbose_name_plural = _("Photo Plans")

class VideoPlan(models.Model):
    api_id = models.CharField(_("Video Plan ID"), max_length=64, blank=True, null=True)
    name = models.CharField(_("Video Plan Name"), max_length=64, blank=True, null=True)
    geometry = models.JSONField(null=True)
    download_path = models.URLField(max_length=1000, null=True)

    class Meta:
        verbose_name = _("Video Plan")
        verbose_name_plural = _("Video Plans")