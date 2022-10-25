from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models import Sum
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel
from ipfs.utils import ipfs_uri
from model_utils import Choices
from versatileimagefield.fields import VersatileImageField

from .constants import STATE_SHORTHAND, Countries, States
from .managers import TokenTransactionManager, WellManager


User = get_user_model()


class Well(models.Model):
    MINT_STATUS_CHOICES = Choices(("draft", _("Draft")), ("minted", _("Minted")))

    name = models.CharField(_("Well Name"), max_length=64)
    api_id = models.CharField(_("API ID"), max_length=64, blank=True, null=True)
    cost_per_tonne = models.IntegerField(_("Cost Per Tonne in USD"), null=True, blank=True)
    tonnes_of_cO2 = models.IntegerField(_("Tonnes of CO2 Count"), null=True, blank=True)
    status = models.CharField(_("Status"), max_length=64, blank=True)

    type = ArrayField(models.CharField(max_length=32, blank=True), size=8, null=True)
    source = ArrayField(models.CharField(max_length=32, blank=True), size=8, null=True)
    is_approved = models.BooleanField(_("is approved for minting"), default=False)

    admin_contract_address = models.CharField(_("Admin Contract Address"), max_length=64, blank=True)
    nft_contract_address = models.CharField(_("NFT Contract Address"), max_length=64, blank=True)
    token_contract_address = models.CharField(_("Token Contract Address"), max_length=64, blank=True)
    number_of_advanced_eavs = models.PositiveIntegerField(_("Number of advanced EAVs"), null=True, blank=True)
    number_of_buffer_pool_eavs = models.PositiveIntegerField(_("Number of buffer pool EAVs"), null=True, blank=True)
    mint_transaction_hash = models.CharField(_("Mint Transaction Hash"), max_length=128, blank=True)
    token_id = models.CharField(_("Token ID"), max_length=64, blank=True)
    blockchain = models.CharField(_("Blockchain"), max_length=64, blank=True)
    metadata = models.CharField(_("Metadata"), max_length=64, blank=True)
    ipfs_metadata_url = models.CharField(_("IPFS Metadata URL"), max_length=1023, blank=True)
    mint_status = models.CharField(
        _("Mint Status"), max_length=64, choices=MINT_STATUS_CHOICES, default=MINT_STATUS_CHOICES.draft
    )

    field = models.CharField(_("Field"), max_length=64, blank=True)
    county = models.CharField(_("County"), max_length=64, blank=True)
    state = models.CharField(_("State"), max_length=64, choices=States.choices, blank=True)
    country = models.CharField(_("Country"), max_length=64, choices=Countries.choices, blank=True)
    md = models.IntegerField(_("Measured Depth in ft"), null=True, blank=True)
    tvd = models.IntegerField(_("True Vertical Depth in ft"), null=True, blank=True)
    producing_formation = models.CharField(_("Producing Formation"), max_length=64, blank=True)
    legal_description = models.CharField(_("legal_description"), max_length=64, blank=True)
    lease_id = models.IntegerField(_("Lease ID/Unit ID/Production ID"), null=True, blank=True)
    current_operator = models.CharField(_("Current Operator"), max_length=64, blank=True)
    well_type = models.CharField(_("Well Type"), max_length=64, blank=True)
    township = models.CharField(_("Township"), max_length=8, blank=True)
    range = models.CharField(_("Range"), max_length=8, blank=True)
    shl_section = models.IntegerField(_("SHL Section"), null=True, blank=True)
    bhl_section = models.IntegerField(_("BHL Section"), null=True, blank=True)
    shl_latitude = models.DecimalField(_("SHL Latitude (NAD83)"), max_digits=9, decimal_places=6, null=True, blank=True)
    shl_longitude = models.DecimalField(
        _("SHL Longitude (NAD83)"), max_digits=9, decimal_places=6, null=True, blank=True
    )
    shl_latitude_nad27 = models.DecimalField(
        _("SHL Latitude (NAD27)"), max_digits=9, decimal_places=6, null=True, blank=True
    )
    shl_longitude_nad27 = models.DecimalField(
        _("SHL Longitude (NAD27)"), max_digits=9, decimal_places=6, null=True, blank=True
    )
    first_perforation_depth = models.IntegerField(_("First Perforation Depth in ft"), null=True, blank=True)
    last_perforation_depth = models.IntegerField(_("Last Perforation Depth in ft"), null=True, blank=True)
    first_production = models.DateField(_("First Production"), null=True, blank=True)

    objects = WellManager()

    class Meta:
        verbose_name = _("Well")
        verbose_name_plural = _("Wells")

    def __str__(self):
        return self.name

    @property
    def state_shorthand(self):
        return STATE_SHORTHAND[self.state]

    @property
    def location(self):
        return f"{self.state}, {self.country}"

    @property
    def retired_amount(self):
        amount = self.well_token_transaction.filter(type="retire").aggregate(sum=Sum("amount"))
        return amount["sum"]


class WellImage(models.Model):
    well = models.ForeignKey(Well, on_delete=models.CASCADE, related_name="well_images")
    image = VersatileImageField(_("Well Image"), upload_to="well-images/", null=True, blank=True)
    description = models.TextField(_("Image Description"), blank=True, null=True)
    ipfs_hash = models.CharField(_("ipfs hash"), max_length=1023, blank=True)

    class Meta:
        verbose_name = _("Well Image")
        verbose_name_plural = _("Well Images")

    @property
    def image_ipfs_uri(self):
        if self.ipfs_hash:
            return ipfs_uri(self.ipfs_hash)
        return ""


class WellDocument(models.Model):
    well = models.ForeignKey(Well, on_delete=models.CASCADE, related_name="well_documents")
    document = models.FileField(_("Well Document"), upload_to="well-document/", null=True, blank=True)
    description = models.TextField(_("Document Description"), blank=True, null=True)
    ipfs_hash = models.CharField(_("ipfs hash"), max_length=1023, blank=True)

    class Meta:
        verbose_name = _("Well Document")
        verbose_name_plural = _("Well Documents")

    @property
    def document_ipfs_uri(self):
        if self.ipfs_hash:
            return ipfs_uri(self.ipfs_hash)
        return ""


class TokenTransaction(TimeStampedModel):
    TRANSACTION_TYPE = Choices(("retire", _("Retire")), ("purchase", _("Purchase")))

    type = models.CharField(_("type"), max_length=64, choices=TRANSACTION_TYPE, default=TRANSACTION_TYPE.retire)
    well = models.ForeignKey(
        Well, on_delete=models.SET_NULL, related_name="well_token_transaction", null=True, blank=True
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_token_transaction", null=True, blank=True
    )
    transaction_hash = models.CharField(_("Transaction Hash"), max_length=128)
    amount = models.DecimalField(_("amount"), max_digits=36, decimal_places=18)

    objects = TokenTransactionManager()

    class Meta:
        verbose_name = _("Token Transaction")
        verbose_name_plural = _("Token Transactions")
