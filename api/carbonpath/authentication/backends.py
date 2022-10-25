from authentication.utils import get_nonce_from_message
from django.conf import settings
from django.contrib.auth import backends, get_user_model
from eth_account.messages import encode_defunct
from eth_keys.exceptions import BadSignature
from web3 import HTTPProvider, Web3


User = get_user_model()


class Web3Backend(backends.ModelBackend):
    def authenticate(self, request, wallet_address=None, signature=None, message=None):

        if wallet_address is None or signature is None or message is None:
            return None

        try:
            user = User.objects.get(wallet_address=wallet_address)
        except User.DoesNotExist:
            return None

        try:
            w3 = Web3(HTTPProvider(settings.DEFAULT_NODE_URL))
            signer_address = w3.eth.account.recover_message(encode_defunct(text=message), signature=signature)
        except (ValueError, BadSignature):
            return None

        try:
            if signer_address.lower() != wallet_address.lower():
                return None
        except AttributeError:
            if signer_address != wallet_address:
                return None

        nonce = get_nonce_from_message(message)

        if nonce != user.nonce:
            return None

        user.reset_nonce()

        return user
