from decimal import Decimal

import pytest
from core.tests.utils import TestModelView
from django.urls import reverse
from wells.models import TokenTransaction, Well
from wells.tests.factories import TokenTransactionFactory, WellFactory


pytestmark = pytest.mark.django_db


class TestWellViewSet(TestModelView):
    factory_class = WellFactory
    url_namespace = "wells:well"

    def test_list(self, api_client):
        t1 = self.get_factory()
        t2 = self.get_factory()
        t3 = self.get_factory()

        visible = [t1.pk, t2.pk, t3.pk]

        url = reverse(self.get_view_name("list"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["count"] == len(visible)
        ids = [r["id"] for r in data["results"]]
        assert set(visible) == set(ids)

    def test_retrieve(self, api_client):
        t1 = self.get_factory()

        url = reverse(self.get_view_name("detail"), kwargs={"pk": t1.pk})

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["id"] == t1.id
        assert data["name"] == t1.name

    def test_minted_wells(self, api_client):
        t1 = self.get_factory(mint_status="minted")
        t2 = self.get_factory()
        t3 = self.get_factory(mint_status="minted")

        visible = [t1.pk, t3.pk]

        url = reverse(self.get_view_name("minted-wells"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["count"] == len(visible)
        ids = [r["id"] for r in data["results"]]
        assert set(visible) == set(ids)

    def test_mint(self, admin_user, api_client):
        api_client.force_authenticate(admin_user)
        t1 = self.get_factory(is_approved=True)
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

        url = reverse(self.get_view_name("mint"), kwargs={"pk": t1.pk})

        response = api_client.post(url, request_data, format="json")
        assert response.status_code == 200

        t1.refresh_from_db()

        well = Well.objects.get(pk=t1.pk)
        assert well.mint_transaction_hash == mint_transaction_hash
        assert well.admin_contract_address == admin_contract_address
        assert well.nft_contract_address == nft_contract_address
        assert well.token_contract_address == token_contract_address
        assert well.number_of_advanced_eavs == number_of_advanced_eavs
        assert well.number_of_buffer_pool_eavs == number_of_buffer_pool_eavs
        assert well.token_id == token_id
        assert well.mint_status == "minted"

    def test_mint_fail_if_well_is_not_approved(self, admin_user, api_client):
        api_client.force_authenticate(admin_user)
        t1 = self.get_factory()
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

        url = reverse(self.get_view_name("mint"), kwargs={"pk": t1.pk})

        response = api_client.post(url, request_data, format="json")
        assert response.status_code == 403

    def test_mint_fail_if_well_is_already_minted(self, admin_user, api_client):
        api_client.force_authenticate(admin_user)
        t1 = self.get_factory(is_approved=True, mint_status="minted")
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

        url = reverse(self.get_view_name("mint"), kwargs={"pk": t1.pk})

        response = api_client.post(url, request_data, format="json")
        assert response.status_code == 403

    def test_mint_fail_if_user_is_not_admin(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory()
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

        url = reverse(self.get_view_name("mint"), kwargs={"pk": t1.pk})

        response = api_client.post(url, request_data, format="json")
        assert response.status_code == 403

    def test_retire(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory()

        amount = 10
        transaction_hash = "transaction_hash"

        request_data = {
            "amount": amount,
            "transaction_hash": transaction_hash,
        }

        url = reverse(self.get_view_name("retire"), kwargs={"pk": t1.pk})

        response = api_client.post(url, request_data, format="json")
        assert response.status_code == 200
        assert TokenTransaction.objects.filter(amount=amount, transaction_hash=transaction_hash, type="retire").exists()

        t1.refresh_from_db()
        assert t1.retired_amount == amount

    def test_save_well(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory()
        assert not user.saved_wells.filter(pk=t1.pk).exists()

        url = reverse(self.get_view_name("save-well"), kwargs={"pk": t1.pk})
        response = api_client.post(url, format="json")

        user.refresh_from_db()
        assert response.status_code == 200
        assert user.saved_wells.filter(pk=t1.pk).exists()

    def test_remove_well(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory()
        user.saved_wells.add(t1)

        user.refresh_from_db()
        assert user.saved_wells.filter(pk=t1.pk).exists()

        url = reverse(self.get_view_name("remove-well"), kwargs={"pk": t1.pk})
        response = api_client.post(url, format="json")

        user.refresh_from_db()
        assert response.status_code == 200
        assert not user.saved_wells.filter(pk=t1.pk).exists()

    def test_is_saved_well(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory()
        t2 = self.get_factory()
        user.saved_wells.add(t1)
        user.refresh_from_db()
        assert user.saved_wells.filter(pk=t1.pk).exists()

        url = reverse(self.get_view_name("is-saved-well"), kwargs={"pk": t1.pk})
        response = api_client.get(url, format="json")
        data = response.json()

        assert response.status_code == 200
        assert data["result"] == True

        url = reverse(self.get_view_name("is-saved-well"), kwargs={"pk": t2.pk})
        response = api_client.get(url, format="json")
        data = response.json()

        assert response.status_code == 200
        assert data["result"] == False

    def test_my_saved_wells(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory()
        t2 = self.get_factory()
        t3 = self.get_factory()

        user.saved_wells.add(t1)
        user.saved_wells.add(t3)
        visible = [t1.pk, t3.pk]

        url = reverse(self.get_view_name("my-saved-wells"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["count"] == len(visible)
        ids = [r["id"] for r in data["results"]]
        assert set(visible) == set(ids)

    def test_statistics(self, api_client):
        number_of_advanced_eavs_1 = 30
        number_of_advanced_eavs_2 = 20
        number_of_buffer_pool_eavs_1 = 10
        number_of_buffer_pool_eavs_2 = 20
        retired_amount_1 = 12.5
        retired_amount_2 = 13.5

        url = reverse(self.get_view_name("statistics"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["totalAdvancedEavs"] == 0
        assert data["totalBufferPoolEavs"] == 0
        assert data["totalCarbonRetired"] == "0.000000000000000000"

        t1 = self.get_factory(
            mint_status="minted",
            number_of_advanced_eavs=number_of_advanced_eavs_1,
            number_of_buffer_pool_eavs=number_of_buffer_pool_eavs_1,
        )

        t2 = self.get_factory(
            mint_status="minted",
            number_of_advanced_eavs=number_of_advanced_eavs_2,
            number_of_buffer_pool_eavs=number_of_buffer_pool_eavs_2,
        )

        url = reverse(self.get_view_name("statistics"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["totalAdvancedEavs"] == number_of_advanced_eavs_1 + number_of_advanced_eavs_2
        assert data["totalBufferPoolEavs"] == number_of_buffer_pool_eavs_1 + number_of_buffer_pool_eavs_2
        assert data["totalCarbonRetired"] == "0.000000000000000000"

        TokenTransactionFactory(amount=retired_amount_1)

        TokenTransactionFactory(amount=retired_amount_2)

        url = reverse(self.get_view_name("statistics"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["totalAdvancedEavs"] == number_of_advanced_eavs_1 + number_of_advanced_eavs_2
        assert data["totalBufferPoolEavs"] == number_of_buffer_pool_eavs_1 + number_of_buffer_pool_eavs_2
        assert Decimal(data["totalCarbonRetired"]) == Decimal(retired_amount_1 + retired_amount_2)


class TestTokenTransactionViewSet(TestModelView):
    factory_class = TokenTransactionFactory
    url_namespace = "wells:token-transaction"

    def test_mine(self, user, api_client):
        api_client.force_authenticate(user)
        t1 = self.get_factory(user=user)
        t2 = self.get_factory()
        t3 = self.get_factory(user=user)

        visible = [t1.pk, t3.pk]

        url = reverse(self.get_view_name("mine"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["count"] == len(visible)
        ids = [r["id"] for r in data["results"]]
        assert set(visible) == set(ids)

    def test_purchase(self, user, api_client):
        api_client.force_authenticate(user)

        amount = 10
        transaction_hash = "transaction_hash"

        request_data = {
            "amount": amount,
            "transaction_hash": transaction_hash,
        }

        url = reverse(self.get_view_name("purchase"))

        response = api_client.post(url, request_data, format="json")
        assert response.status_code == 200
        assert TokenTransaction.objects.filter(
            amount=amount, transaction_hash=transaction_hash, type="purchase"
        ).exists()
