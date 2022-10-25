import pytest
from core.tests.utils import TestModelView
from django.urls import reverse
from rest_framework import status

from .factories import UserFactory


pytestmark = pytest.mark.django_db


class TestUserView(TestModelView):
    factory_class = UserFactory
    url_namespace = "users:user"

    def test_fetch_me(self, api_client, user):
        api_client.force_authenticate(user)

        url = reverse(self.get_view_name("me"))
        response = api_client.get(url, format="json")
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["email"] == user.email

    def test_update_me(self, api_client, user):
        api_client.force_authenticate(user)
        new_email = "updated" + user.email

        req = {"email": new_email}

        url = reverse(self.get_view_name("me"))
        response = api_client.patch(url, req, format="json")
        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["email"] == user.email
        assert data["id"] == user.id
