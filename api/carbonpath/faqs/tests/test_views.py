import pytest
from core.tests.utils import TestModelView
from django.urls import reverse
from faqs.tests.factories import FaqFactory


pytestmark = pytest.mark.django_db


class TestFaqViewSet(TestModelView):
    factory_class = FaqFactory
    url_namespace = "faqs:faq"

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
