from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models import Sum
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel

from .managers import UserManager


def generate_nonce():
    return get_random_string(32)


class User(AbstractBaseUser, TimeStampedModel, PermissionsMixin):
    USERNAME_FIELD = "username"
    email = models.EmailField(_("email address"), max_length=255, null=True, blank=True, unique=True)
    username = models.CharField(_("username"), max_length=255, unique=True, null=True)

    nickname = models.CharField(_("nickname"), max_length=256, blank=True, db_index=True)
    first_name = models.CharField(_("first name"), max_length=256, blank=True, db_index=True)
    last_name = models.CharField(_("last name"), max_length=256, blank=True, db_index=True)

    is_staff = models.BooleanField(_("is staff"), default=False)
    is_active = models.BooleanField(_("is active"), default=True)

    wallet_address = models.CharField(_("Wallet Address"), max_length=64, blank=True, null=True, unique=True)
    nonce = models.CharField(_("Nonce"), max_length=100, editable=False, default=generate_nonce)

    saved_wells = models.ManyToManyField("wells.Well", related_name="saved_wells")

    objects = UserManager()

    class Meta:
        ordering = ["wallet_address"]
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        if self.username:
            return self.username
        return ""

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def reset_nonce(self):
        self.nonce = generate_nonce()
        self.save()

    @property
    def retired_amount(self):
        amount = self.user_token_transaction.filter(type="retire").aggregate(sum=Sum("amount"))
        return amount["sum"]
