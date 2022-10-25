from factory import Faker
from factory.django import DjangoModelFactory
from faqs.models import Faq


class FaqFactory(DjangoModelFactory):
    question = Faker("sentence")
    answer = Faker("sentence")

    class Meta:
        model = Faq
