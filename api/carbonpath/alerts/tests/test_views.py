import pytest
from alerts.models import Alert
from alerts.tests.factories import AlertFactory, AlertTypeFactory
from core.tests.utils import TestModelView
from django.urls import reverse
from users.tests.factories import UserFactory


pytestmark = pytest.mark.django_db


class TestAlertViewSet(TestModelView):
    factory_class = AlertTypeFactory
    url_namespace = "alerts:alert"

    def test_subscribe_unsubscribe(self, user, api_client):
        api_client.force_authenticate(user)

        type = "t1"
        name = "t2"
        post_data = {"type": type, "name": name}
        alert_type = AlertTypeFactory(type=type, name=name)

        subscribe_url = reverse(self.get_view_name("subscribe"))
        unsubscribe_url = reverse(self.get_view_name("unsubscribe"))
        is_subscribed_url = reverse(self.get_view_name("is-subscribed"))

        response = api_client.post(subscribe_url, post_data, format="json")
        data = response.json()
        assert response.status_code == 200
        assert alert_type in user.alert_subscriptions.all()

        response = api_client.post(is_subscribed_url, post_data, format="json")
        data = response.json()
        assert response.status_code == 200
        assert data["result"] == True

        response = api_client.post(unsubscribe_url, post_data, format="json")
        data = response.json()
        assert response.status_code == 200
        assert alert_type not in user.alert_subscriptions.all()

        response = api_client.post(is_subscribed_url, post_data, format="json")
        data = response.json()
        assert response.status_code == 200
        assert data["result"] == False

    def test_mine(self, user, api_client):
        api_client.force_authenticate(user)

        alert_type = self.get_factory()

        t1 = AlertFactory(type=alert_type, user=user, message="t1")
        t2 = AlertFactory(type=alert_type, user=user, message="t2")
        t3 = AlertFactory(type=alert_type, user=user, message="t3")

        visible = [t1.pk, t2.pk, t3.pk]

        url = reverse(self.get_view_name("mine"))

        response = api_client.get(url, format="json")
        data = response.json()
        assert response.status_code == 200

        assert data["count"] == len(visible)
        ids = [r["id"] for r in data["results"]]
        assert set(visible) == set(ids)

    def test_read(self, user, api_client):
        api_client.force_authenticate(user)

        alert_type = self.get_factory()

        t1 = AlertFactory(type=alert_type, user=user, message="t1")
        t2 = AlertFactory(type=alert_type, user=user, message="t2")

        alerts = [t1, t2]

        assert Alert.objects.filter(is_read=False).count() == len(alerts)

        url = reverse(self.get_view_name("read"))
        response = api_client.patch(url, format="json")
        assert response.status_code == 204

        assert Alert.objects.filter(is_read=True).count() == len(alerts)
        assert Alert.objects.filter(is_read=False).count() == 0

    def test_clear(self, user, api_client):
        api_client.force_authenticate(user)

        alert_type = self.get_factory()

        t1 = AlertFactory(type=alert_type, user=user, message="t1")
        t2 = AlertFactory(type=alert_type, user=user, message="t2")

        alerts = [t1, t2]

        assert Alert.objects.filter(user=user).count() == len(alerts)

        url = reverse(self.get_view_name("clear"))
        response = api_client.delete(url, format="json")
        assert response.status_code == 204

        assert Alert.objects.filter(user=user).count() == 0
