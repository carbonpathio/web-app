import pytest
from core.tests.utils import TestModelSerializer
from faqs.serializers import FaqSerializer
from faqs.tests.factories import FaqFactory


pytestmark = pytest.mark.django_db


class TestFaqSerializer(TestModelSerializer):
    serializer_class = FaqSerializer
    factory_class = FaqFactory

    def test_retrieve(self, request_factory):
        request = request_factory.get("/")
        i = self.get_factory()

        serializer = self.get_serializer(instance=i, context={"request": request})
        data = serializer.data
        assert data["id"] == i.pk
