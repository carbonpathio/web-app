
import factory
from factory import Faker
from factory.django import DjangoModelFactory
from factory.declarations import SubFactory
from alerts.models import Alert, AlertType

from users.tests.factories import UserFactory


class AlertTypeFactory(DjangoModelFactory):
    type = Faker("sentence")
    name = Faker("sentence")
    
    @factory.post_generation
    def subscribers_list(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for subscriber in extracted:
                self.subscribers.add(subscriber)
        else:
            subscriber = UserFactory()
            self.subscribers.add(subscriber)

    class Meta:
        model = AlertType

class AlertFactory(DjangoModelFactory):
    type = SubFactory(AlertTypeFactory)
    user = SubFactory(UserFactory)
    message = Faker("sentence")

    class Meta:
        model = Alert
