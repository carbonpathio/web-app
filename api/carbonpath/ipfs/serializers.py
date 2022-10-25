from rest_framework import serializers

from .models import IPFSAssetData


class IPFSAssetDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPFSAssetData
        read_only_fields = ["well", "image_hash", "file_hash", "metadata_hash", "metadata_uri"]
        fields = read_only_fields
