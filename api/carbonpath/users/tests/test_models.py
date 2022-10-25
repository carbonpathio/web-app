import pytest
from wells.tests.factories import TokenTransactionFactory, WellFactory

from .factories import UserFactory


pytestmark = pytest.mark.django_db


class TestUserModel:
    def test_user_create(self):
        username = "username"
        first_name = "Test"
        last_name = "User"
        user = UserFactory(username=username, first_name=first_name, last_name=last_name)
        assert user.pk is not None
        assert str(user) == username

    def test_retired_amount(self):
        amount_retired_1 = 20
        amount_retired_2 = 30
        user = UserFactory()
        TokenTransactionFactory(user=user, amount=amount_retired_1)
        TokenTransactionFactory(user=user, amount=amount_retired_2)

        assert user.retired_amount == amount_retired_1 + amount_retired_2

    def test_add_well(self):
        well = WellFactory()
        user = UserFactory()
        assert not user.saved_wells.filter(pk=well.pk).exists()

        user.saved_wells.add(well)
        user.refresh_from_db()

        assert user.saved_wells.filter(pk=well.pk).exists()
