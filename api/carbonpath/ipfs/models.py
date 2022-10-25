from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.translation import gettext_lazy as _
from ipfs.utils import ipfs_uri
from wells.models import Well


class IPFSAssetData(models.Model):
    image_hash = ArrayField(
        verbose_name=_("IPFS image hash"),
        base_field=models.CharField(max_length=1024, blank=True),
        blank=True,
        null=True,
    )
    file_hash = ArrayField(
        verbose_name=_("IPFS file hash"),
        base_field=models.CharField(max_length=1024, blank=True),
        blank=True,
        null=True,
    )
    metadata_hash = models.CharField(_("IPFS metadata hash"), max_length=1024, blank=True)
    well = models.OneToOneField(Well, related_name="ipfs_asset_data", on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("IPFS Asset Data")
        verbose_name_plural = _("IPFS Asset Data")

    def __str__(self):
        return f"{self.well.name} IPFS Asset Data"

    @property
    def metadata_uri(self) -> str:
        return ipfs_uri(self.metadata_hash)
