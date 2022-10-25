from typing import Any, Sequence

from django.contrib.auth import get_user_model
from factory import Faker, post_generation
from factory.django import DjangoModelFactory


class UserFactory(DjangoModelFactory):
    first_name = Faker("name")
    last_name = Faker("name")
    email = Faker("email")

    @post_generation
    def password(self, create: bool, extracted: Sequence[Any], **kwargs):  # pylint: disable=unused-argument
        password = extracted or get_user_model().objects.make_random_password()
        self.set_password(password)
        return password

    class Meta:
        model = get_user_model()
        django_get_or_create = ["email"]
