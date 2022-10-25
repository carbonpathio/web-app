import pytest
from authentication.utils import get_wallet_message
from core.tests.utils import TestModelView
from django.contrib.auth import get_user_model
from django.urls import reverse
from eth_account.messages import encode_defunct
from knox.models import AuthToken
from rest_framework import status
from users.tests.factories import UserFactory
from web3.auto import w3


pytestmark = pytest.mark.django_db

User = get_user_model()


class TestWeb3Nonce(TestModelView):
    factory_class = UserFactory
    url_namespace = "authentication:get-nonce"

    def test_new_user_get(self, api_client):
        wallet_address = "sample_address"
        data_req = {"wallet_address": wallet_address}

        url = reverse(self.url_namespace)
        response = api_client.post(url, data_req, format="json")
        data = response.json()

        assert response.status_code == 200
        assert data["nonce"] is not None
        assert User.objects.filter(wallet_address=wallet_address).exists()

    def test_existing_user_get(self, api_client):
        wallet_address = "sample_address"
        data_req = {"wallet_address": wallet_address}
        self.get_factory(username=wallet_address, wallet_address=wallet_address)

        url = reverse(self.url_namespace)
        response = api_client.post(url, data_req, format="json")
        data = response.json()

        assert response.status_code == 200
        assert data["nonce"] is not None
        assert User.objects.filter(wallet_address=wallet_address).count() == 1


class TestWeb3Login(TestModelView):
    factory_class = UserFactory
    url_namespace = "authentication:knox-login"
    account = w3.eth.account.create()
    headers = {"HTTP_AUTHORIZATION": "Web3"}

    def _get_signature_str(self, account, message: str):
        return account.sign_message(encode_defunct(text=message)).signature.hex()

    def test_login(self, api_client):
        user = self.get_factory(wallet_address=self.account.address)
        current_nonce = user.nonce

        message = get_wallet_message(current_nonce)

        signature = self._get_signature_str(self.account, message)
        credentials = {
            "wallet_address": user.wallet_address,
            "signature": signature,
            "message": message,
        }

        url = reverse(self.url_namespace)
        response = api_client.post(url, data=credentials, **self.headers)
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        
        auth_token = AuthToken.objects.get(user=user)

        assert data["token"].startswith(auth_token.token_key)
        user.refresh_from_db()
        assert user.nonce != current_nonce
