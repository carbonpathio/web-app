import pytest
from core.tests.utils import TestModelSerializer
from users.tests.factories import UserFactory
from wells.models import TokenTransaction, Well
from wells.serializers import MintSerializer, TokenTransactionSerializer, WellSerializer
from wells.tests.factories import TokenTransactionFactory, WellFactory


pytestmark = pytest.mark.django_db


class TestWellSerializer(TestModelSerializer):
    serializer_class = WellSerializer
    factory_class = WellFactory

    def test_retrieve(self, request_factory):
        request = request_factory.get("/")
        i = self.get_factory()

        serializer = self.get_serializer(instance=i, context={"request": request})
        data = serializer.data
        assert data["id"] == i.pk


class TestMintSerializer(TestModelSerializer):
    serializer_class = MintSerializer
    factory_class = WellFactory

    def test_update(self):
        admin_contract_address = "admin_contract"
        nft_contract_address = "nft_contract"
        token_contract_address = "token_contract"
        number_of_advanced_eavs = 20
        number_of_buffer_pool_eavs = 10
        mint_transaction_hash = "transaction_hash"
        token_id = "token_id"

        request_data = {
            "mint_transaction_hash": mint_transaction_hash,
            "admin_contract_address": admin_contract_address,
            "nft_contract_address": nft_contract_address,
            "token_contract_address": token_contract_address,
            "number_of_advanced_eavs": number_of_advanced_eavs,
            "number_of_buffer_pool_eavs": number_of_buffer_pool_eavs,
            "token_id": token_id,
        }
        i = self.get_factory()
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.update(i, serializer.data)

        i.refresh_from_db()

        well = Well.objects.get(pk=i.pk)
        assert well.mint_transaction_hash == mint_transaction_hash
        assert well.admin_contract_address == admin_contract_address
        assert well.nft_contract_address == nft_contract_address
        assert well.token_contract_address == token_contract_address
        assert well.number_of_advanced_eavs == number_of_advanced_eavs
        assert well.number_of_buffer_pool_eavs == number_of_buffer_pool_eavs
        assert well.token_id == token_id


class TestTokenTransactionSerializer(TestModelSerializer):
    serializer_class = TokenTransactionSerializer
    factory_class = TokenTransactionFactory

    def test_create_retire(self):
        amount = 10
        transaction_hash = "transaction_hash"

        request_data = {
            "amount": amount,
            "transaction_hash": transaction_hash,
        }
        user = UserFactory()
        well = WellFactory()
        serializer = self.get_serializer(data=request_data, context={"user": user, "well": well, "type": "retire"})
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.data)

        assert TokenTransaction.objects.filter(amount=amount, transaction_hash=transaction_hash).exists()

    def test_create_purchase(self):
        amount = 10
        transaction_hash = "transaction_hash"

        request_data = {
            "amount": amount,
            "transaction_hash": transaction_hash,
        }
        user = UserFactory()
        serializer = self.get_serializer(data=request_data, context={"user": user, "type": "purchase"})
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.data)

        assert TokenTransaction.objects.filter(
            amount=amount, transaction_hash=transaction_hash, type="purchase"
        ).exists()
