from django.db import models
from django.db.models import DecimalField, Sum
from django.db.models.functions import Coalesce


class WellQuerySet(models.QuerySet):
    def minted_wells(self):
        return self.filter(mint_status="minted")

    def with_total_eavs(self):
        return self.aggregate(
            total_advanced_eavs=Coalesce(Sum("number_of_advanced_eavs"), 0),
            total_buffer_pool_eavs=Coalesce(Sum("number_of_buffer_pool_eavs"), 0),
        )


class TokenTransactionQuerySet(models.QuerySet):
    def with_total_retired_amount(self):
        return self.filter(type="retire").aggregate(
            total_retired_amount=Coalesce(Sum("amount"), 0, output_field=DecimalField())
        )


WellManager = WellQuerySet.as_manager
TokenTransactionManager = TokenTransactionQuerySet.as_manager
