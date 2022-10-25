from authentication.serializers import Web3LoginSerializer, Web3NonceSerializer
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from knox.views import LoginView as KnoxLoginView
from rest_framework import authentication, permissions, status
from rest_framework.authentication import BaseAuthentication
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response


UserModel = get_user_model()


class Web3Authentication(BaseAuthentication):
    def authenticate(self, request):
        auth = authentication.get_authorization_header(request)

        if not auth or auth.lower() != b"web3":
            return None

        serializer = Web3LoginSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            raise AuthenticationFailed(error.detail) from error

        return self.authenticate_credentials(**serializer.validated_data)

    def authenticate_credentials(self, wallet_address, signature, message):
        credentials = {
            "wallet_address": wallet_address,
            "signature": signature,
            "message": message,
        }

        user = authenticate(**credentials)

        if user is None:
            raise AuthenticationFailed(
                _(
                    "Authentication failed for one of the following reasons: "
                    "No user found matching the given address, "
                    "the signature isn't on the user's up to date nonce message, or "
                    "the signature does not belong to the given address."
                )
            )

        return (user, None)


class LoginView(KnoxLoginView):
    authentication_classes = [Web3Authentication]


@api_view(http_method_names=["POST"])
@renderer_classes([JSONRenderer])
@permission_classes([permissions.AllowAny])
def get_nonce_from_wallet_address(request):
    serializer = Web3NonceSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    wallet_address = serializer.validated_data["wallet_address"]

    user, _ = UserModel.objects.get_or_create(username=wallet_address, wallet_address=wallet_address)

    return Response(status=status.HTTP_200_OK, data={"nonce": user.nonce})
