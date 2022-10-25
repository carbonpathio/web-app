import json

import requests
from django.conf import settings
from django.core.files.base import ContentFile
from ipfs.utils import ipfs_uri
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.renderers import JSONRenderer
from wells.serializers import WellMetadataSerializer, WellPinataMetaDataSerializer

from .models import IPFSAssetData


PINATA_API_URL = "https://api.pinata.cloud/"


class InvalidIPFSAssetError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Invalid Asset"
    default_code = "error"


class PinataRequestError(APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = "Pinata Error"
    default_code = "unavailable"


class PinataUnauthorizedError(APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = "Pinata Authorization Error"
    default_code = "unauthorized"


def update_or_create_ipfs_asset(well):
    """
    Pins to Pinata
    input: Well object
    return: IPFSAssetData Object
    """

    pinataMetadata = json.dumps(WellPinataMetaDataSerializer(well).data)

    if pinataMetadata:
        with requests.Session() as s:
            s.headers = {
                "pinata_api_key": settings.PINATA_API_KEY,
                "pinata_secret_api_key": settings.PINATA_API_SECRET,
            }
            options = json.dumps({"cidVersion": 1})

            # Pin images
            image_hash = []
            well_images = well.well_images.all()
            for well_image in well_images:
                image = well_image.image
                image.seek(0)
                res = s.post(
                    url=PINATA_API_URL + "pinning/pinFileToIPFS",
                    data={"pinataMetadata": pinataMetadata, "pinataOptions": options},
                    files={"file": image},
                )
                well_image_hash = process_pinata_response(res)
                image_hash.append(well_image_hash)

                well_image.ipfs_hash = well_image_hash
                well_image.save()

            IPFSAssetData.objects.update_or_create(well=well, defaults={"image_hash": image_hash})

            # Pin documents
            file_hash = []
            well_documents = well.well_documents.all()
            for well_document in well_documents:
                document = well_document.document
                document.seek(0)
                res = s.post(
                    url=PINATA_API_URL + "pinning/pinFileToIPFS",
                    data={"pinataMetadata": pinataMetadata, "pinataOptions": options},
                    files={"file": document},
                )
                well_document_hash = process_pinata_response(res)
                file_hash.append(well_document_hash)

                well_document.ipfs_hash = well_document_hash
                well_document.save()

            IPFSAssetData.objects.update_or_create(
                well=well, defaults={"image_hash": image_hash, "file_hash": file_hash}
            )

            # Pin metadata
            metadata = JSONRenderer().render(WellMetadataSerializer(well).data)
            res = s.post(
                url=PINATA_API_URL + "pinning/pinFileToIPFS",
                data={"pinataMetadata": pinataMetadata, "pinataOptions": options},
                files={"file": ContentFile(metadata, "metadata.json")},
            )
            metadata_hash = process_pinata_response(res)
            well.ipfs_metadata_url = ipfs_uri(metadata_hash)
            well.save()
            return IPFSAssetData.objects.update_or_create(
                well=well, defaults={"image_hash": image_hash, "metadata_hash": metadata_hash, "file_hash": file_hash}
            )[0]
    raise InvalidIPFSAssetError


def process_pinata_response(res):
    if res.status_code == status.HTTP_200_OK:
        data = res.json()
        return data.get("IpfsHash")
    elif res.status_code == status.HTTP_401_UNAUTHORIZED:
        raise PinataUnauthorizedError

    else:
        raise PinataRequestError
