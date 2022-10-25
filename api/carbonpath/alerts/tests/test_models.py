import pytest

from .factories import AlertTypeFactory, AlertFactory
from users.tests.factories import UserFactory


pytestmark = pytest.mark.django_db


class TestAlertTypeModel:
    def test_create(self):
        type = "Test Type"
        name = "Test Name"
        email = "test@test.com"
        first_name = "Test"
        last_name = "User"
        user = UserFactory(email=email, first_name=first_name, last_name=last_name)
        alert_type = AlertTypeFactory(type=type, name=name, subscribers_list=(user, ))
        assert alert_type.pk is not None
        assert alert_type.type == type
        assert alert_type.name == name
        assert alert_type.subscribers.filter(id=user.id).exists()

class TestAlertModel:
    def test_create(self):
        type = "Test Type"
        name = "Test Name"
        email = "test@test.com"
        first_name = "Test"
        last_name = "User"
        user = UserFactory(email=email, first_name=first_name, last_name=last_name)
        alert_type = AlertTypeFactory(type=type, name=name, subscribers_list=(user, ))
        message = "Test Message"
        alert = AlertFactory(type=alert_type, user=user, message=message)
        assert alert.pk is not None
        assert alert.type == alert_type
        assert alert.user.id == user.id
        assert alert.message == message
