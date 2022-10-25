from authentication.views import LoginView, get_nonce_from_wallet_address
from django.urls import path
from knox.views import LogoutView as KnoxLogoutView


app_name = "authentication"


urlpatterns = [
    path("logout/", KnoxLogoutView.as_view(), name="knox-logout"),
    path("login/", LoginView.as_view(), name="knox-login"),
    path("get-nonce/", get_nonce_from_wallet_address, name="get-nonce"),
]
