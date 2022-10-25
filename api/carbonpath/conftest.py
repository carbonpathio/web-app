import pytest
from django.contrib.admin.sites import AdminSite
from django.test import RequestFactory
from rest_framework.test import APIClient
from users.tests.factories import UserFactory


class CustomAPIClient(APIClient):
    def force_authenticate(self, user=None, token=None):
        """
        Custom `force_authenticate` method which also sets request.auth instead of None.
        """
        if user and not token:
            token = "default_token"

        self.handler._force_user = user
        self.handler._force_token = token
        if user is None:
            self.logout()  # Also clear any possible session info if required


@pytest.fixture(autouse=True)
def media_storage(settings, tmpdir):
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture
def api_client() -> APIClient:
    return CustomAPIClient()


@pytest.fixture
def admin_site() -> AdminSite:
    return AdminSite()


@pytest.fixture
def request_factory() -> RequestFactory:
    return RequestFactory()


@pytest.fixture
def user():
    user = UserFactory(is_superuser=False, is_staff=False)
    return user


@pytest.fixture
def admin_user():
    user = UserFactory(is_superuser=False, is_staff=True)
    return user
