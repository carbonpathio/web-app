import pytest

from .factories import IPFSAssetDataFactory


pytestmark = pytest.mark.django_db


class TestIPFSAssetDataModel:
    def test_create(self):
        asset_data = IPFSAssetDataFactory()

        file_hash = ["asdjas23r", "23jkalds21"]
        image_hash = ["klasejh1", "3khslkdsaj1"]

        asset_data.file_hash = file_hash
        asset_data.image_hash = image_hash

        assert asset_data.file_hash == file_hash
        assert asset_data.image_hash == image_hash
