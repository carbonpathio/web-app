import json
import os
from pathlib import Path
from unittest import mock

import pytest
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from ipfs.ipfs import update_or_create_ipfs_asset
from ipfs.tests.mocks import (
    MockResponse,
    file_pin_1,
    file_pin_2,
    metadata_pin_1,
    metadata_pin_2,
)
from rest_framework import status
from wells.models import WellDocument, WellImage
from wells.serializers import WellSerializer
from wells.tests.factories import WellFactory


pytestmark = pytest.mark.django_db


class TestIPFSUtils:
    @mock.patch("ipfs.ipfs.requests.Session.post")
    def test_update_or_create_ipfs_asset(self, mock_post_request):
        well = WellFactory(name="IPFS NFT")

        image = os.path.join(Path(__file__).parent, "test_files", "test.jpg")
        with open(image, "rb") as f:
            well_image = WellImage.objects.create(well=well)
            well_image.image = ContentFile(f.read(), "file")
            well_image.save()

        file = os.path.join(Path(__file__).parent, "test_files", "test.txt")
        with open(file, "rb") as f:
            well_document = WellDocument.objects.create(well=well)
            well_document.document = ContentFile(f.read(), "file")
            well_document.save()

        well.save()

        mock_post_request.side_effect = [
            MockResponse(file_pin_1, status.HTTP_200_OK),
            MockResponse(file_pin_1, status.HTTP_200_OK),
            MockResponse(metadata_pin_1, status.HTTP_200_OK),
        ]

        ipfs_asset = update_or_create_ipfs_asset(well)

        assert ipfs_asset.well == well
        # Values from mocks.py
        assert ipfs_asset.file_hash[0] == file_pin_1.get("IpfsHash")
        assert ipfs_asset.image_hash[0] == file_pin_1.get("IpfsHash")
        assert ipfs_asset.metadata_hash == metadata_pin_1.get("IpfsHash")

    @mock.patch("ipfs.ipfs.requests.Session.post")
    def test_create_same_asset(self, mock_post_request):
        well = WellFactory(name="IPFS NFT")

        image = os.path.join(Path(__file__).parent, "test_files", "test.jpg")
        with open(image, "rb") as f:
            well_image = WellImage.objects.create(well=well)
            well_image.image = ContentFile(f.read(), "file")
            well_image.save()

        well.save()

        mock_post_request.side_effect = [
            MockResponse(file_pin_1, status.HTTP_200_OK),
            MockResponse(metadata_pin_1, status.HTTP_200_OK),
        ]

        ipfs_asset = update_or_create_ipfs_asset(well)

        assert ipfs_asset.well == well

        old_image_hash = ipfs_asset.image_hash[0]
        old_metadata_hash = ipfs_asset.metadata_hash

        mock_post_request.side_effect = [
            MockResponse(file_pin_1, status.HTTP_200_OK),
            MockResponse(metadata_pin_1, status.HTTP_200_OK),
        ]

        ipfs_asset = update_or_create_ipfs_asset(well)

        # should stay the same
        assert ipfs_asset.well == well
        # Values from mocks.py
        assert old_image_hash == ipfs_asset.image_hash[0] == file_pin_1.get("IpfsHash")
        assert old_metadata_hash == ipfs_asset.metadata_hash == metadata_pin_1.get("IpfsHash")
