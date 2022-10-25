from factory import Faker
from factory.declarations import SubFactory
from factory.django import DjangoModelFactory
from wells.tests.factories import WellFactory

from ..models import IPFSAssetData


class IPFSAssetDataFactory(DjangoModelFactory):
    well = SubFactory(WellFactory)
    metadata_hash = Faker("name")

    class Meta:
        model = IPFSAssetData
        django_get_or_create = ["well"]
