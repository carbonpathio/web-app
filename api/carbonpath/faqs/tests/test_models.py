import pytest

from .factories import FaqFactory


pytestmark = pytest.mark.django_db


class TestFaqModel:
    def test_create(self):
        question = "Test Question"
        answer = "Test Answer"
        faq = FaqFactory(question=question, answer=answer)
        assert faq.pk is not None
        assert faq.question == question
        assert faq.answer == answer
