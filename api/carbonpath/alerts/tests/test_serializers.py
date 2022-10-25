from alerts.serializers import SubscribeSerializer
import pytest
from core.tests.utils import TestModelSerializer
from alerts.serializers import AlertTypeSerializer, AlertSerializer
from alerts.tests.factories import AlertTypeFactory, AlertFactory


pytestmark = pytest.mark.django_db


class TestAlertTypeSerializer(TestModelSerializer):
    serializer_class = AlertTypeSerializer
    factory_class = AlertTypeFactory

    def test_retrieve(self, request_factory):
        request = request_factory.get("/")
        i = self.get_factory()

        serializer = self.get_serializer(instance=i, context={"request": request})
        data = serializer.data
        assert data["id"] == i.pk

class TestAlertSerializer(TestModelSerializer):
    serializer_class = AlertSerializer
    factory_class = AlertFactory

    def test_retrieve(self, request_factory):
        request = request_factory.get("/")
        i = self.get_factory()

        serializer = self.get_serializer(instance=i, context={"request": request})
        data = serializer.data
        assert data["id"] == i.pk

class TestSubscribeSerializer(TestModelSerializer):
    serializer_class = SubscribeSerializer
    factory_class = AlertTypeFactory

    def test_retrieve(self, request_factory):
        request = request_factory.get("/")
        i = self.get_factory()

        serializer = self.get_serializer(instance=i, context={"request": request})
        data = serializer.data
        assert data["name"] == i.name
