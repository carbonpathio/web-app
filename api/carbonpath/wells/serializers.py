from ipfs.models import IPFSAssetData
from ipfs.utils import ipfs_uri
from rest_framework import serializers

from .models import TokenTransaction, Well, WellImage


class WellImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellImage
        fields = ["id", "image", "description"]


class WellSerializer(serializers.ModelSerializer):
    well_image_list = WellImageSerializer(read_only=True, many=True, source="well_images")

    class Meta:
        model = Well
        fields = [
            "id",
            "api_id",
            "name",
            "cost_per_tonne",
            "tonnes_of_cO2",
            "status",
            "type",
            "source",
            "is_approved",
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
            "field",
            "county",
            "state",
            "country",
            "location",
            "state_shorthand",
            "md",
            "tvd",
            "producing_formation",
            "legal_description",
            "lease_id",
            "current_operator",
            "well_type",
            "township",
            "range",
            "shl_section",
            "bhl_section",
            "shl_latitude",
            "shl_longitude",
            "shl_latitude_nad27",
            "shl_longitude_nad27",
            "first_perforation_depth",
            "last_perforation_depth",
            "first_production",
            "well_image_list",
            "retired_amount",
        ]


class SavedWellSerializer(WellSerializer):
    is_saved_well = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Well
        fields = WellSerializer.Meta.fields + ["is_saved_well"]

    def get_is_saved_well(self, obj):
        user = self.context.get("user", None)

        if not user:
            return False

        return True if user.saved_wells.filter(pk=obj.pk) else False


class WellPinataMetaDataSerializer(serializers.ModelSerializer):
    """
    Pinata only allows numbers, strings, dates
    https://docs.pinata.cloud/api-pinning/pin-file#pinatametadata-optional
    """

    keyvalues = serializers.SerializerMethodField()

    class Meta:
        model = Well
        fields = ["name", "keyvalues"]

    def get_keyvalues(self, obj):
        return {
            "name": obj.name,
        }


class WellMetadataSerializer(serializers.ModelSerializer):
    images_uri = serializers.SerializerMethodField()
    documents_uri = serializers.SerializerMethodField()

    class Meta:
        model = Well
        read_only_fields = [
            "documents_uri",
            "images_uri",
            "name",
        ]
        fields = read_only_fields

    def get_images_uri(self, obj):
        try:
            ipfs = IPFSAssetData.objects.get(well=obj)
            images_uri = []
            if ipfs.image_hash:
                for image_hash in ipfs.image_hash:
                    image = obj.well_images.get(ipfs_hash=image_hash)
                    images_uri.append({"description": image.description, "uri": ipfs_uri(image_hash)})

            return images_uri
        except IPFSAssetData.DoesNotExist:
            return []

    def get_documents_uri(self, obj):
        try:
            ipfs = IPFSAssetData.objects.get(well=obj)
            documents_uri = []
            if ipfs.file_hash:
                for file_hash in ipfs.file_hash:
                    document = obj.well_documents.get(ipfs_hash=file_hash)
                    documents_uri.append({"description": document.description, "uri": ipfs_uri(file_hash)})

            return documents_uri
        except IPFSAssetData.DoesNotExist:
            return []


class MintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Well
        fields = [
            "admin_contract_address",
            "nft_contract_address",
            "token_contract_address",
            "number_of_advanced_eavs",
            "number_of_buffer_pool_eavs",
            "mint_transaction_hash",
            "token_id",
        ]


class TokenTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenTransaction
        fields = [
            "transaction_hash",
            "amount",
        ]

    def create(self, validated_data):
        user = self.context.get("user")
        type = self.context.get("type", "retire")
        well = self.context.get("well", None)
        return TokenTransaction.objects.create(**validated_data, type=type, user=user, well=well)


class ReadTokenTransactionSerializer(serializers.ModelSerializer):
    well = WellSerializer(read_only=True)

    class Meta:
        model = TokenTransaction
        read_only_fields = ["id", "well", "created", "type", "transaction_hash", "amount"]
        fields = read_only_fields


class TotalWellStatSerializer(serializers.Serializer):
    total_advanced_eavs = serializers.IntegerField()
    total_buffer_pool_eavs = serializers.IntegerField()
    total_carbon_retired = serializers.DecimalField(max_digits=36, decimal_places=18)

    class Meta:
        fields = ["total_advanced_eavs", "total_buffer_pool_eavs", "total_carbon_retired"]
