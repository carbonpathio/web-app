from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import TokenTransaction, Well, WellDocument, WellImage


class WellDocumentAdmin(admin.TabularInline):
    model = WellDocument
    extra = 1


class WellImageAdmin(admin.TabularInline):
    model = WellImage
    extra = 1


@admin.register(Well)
class WellAdmin(admin.ModelAdmin):
    list_display = ["name", "retired_amount"]
    inlines = [WellImageAdmin, WellDocumentAdmin]
    readonly_fields = ["retired_amount"]
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "api_id",
                    "name",
                    "cost_per_tonne",
                    "tonnes_of_cO2",
                    "status",
                    "type",
                    "source",
                    "is_approved",
                ),
            },
        ),
        (
            _("Smart Contract Information"),
            {
                "fields": (
                    "admin_contract_address",
                    "nft_contract_address",
                    "token_contract_address",
                    "number_of_advanced_eavs",
                    "number_of_buffer_pool_eavs",
                    "mint_transaction_hash",
                    "mint_status",
                    "token_id",
                    "blockchain",
                    "metadata",
                    "ipfs_metadata_url",
                    "retired_amount",
                ),
            },
        ),
        (
            _("Location"),
            {
                "fields": (
                    "field",
                    "county",
                    "state",
                    "country",
                    "shl_latitude",
                    "shl_longitude",
                    "shl_latitude_nad27",
                    "shl_longitude_nad27",
                ),
            },
        ),
        (
            _("Well Infomation"),
            {
                "fields": (
                    "md",
                    "tvd",
                    "producing_formation",
                    "legal_description",
                    "lease_id",
                    "current_operator",
                    "well_type",
                    "range",
                    "first_perforation_depth",
                    "last_perforation_depth",
                    "first_production",
                ),
            },
        ),
    )


@admin.register(TokenTransaction)
class TokenTransactionAdmin(admin.ModelAdmin):
    list_display = ["well", "user", "amount", "created"]
