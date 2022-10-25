import pytest
from core.tests.utils import TestModelSerializer
from users.serializers import UserSerializer
from users.tests.factories import UserFactory


pytestmark = pytest.mark.django_db


class TestUserSerializer(TestModelSerializer):
    serializer_class = UserSerializer
    factory_class = UserFactory

    def test_retrieve(self, request_factory):
        request = request_factory.get("/")
        i = self.get_factory()

        serializer = self.get_serializer(instance=i, context={"request": request})
        data = serializer.data
        assert data["id"] == i.pk
