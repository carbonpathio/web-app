import pytest
from core.tests.utils import TestModelFilter
from wells.filters import WellFilter
from wells.models import Well

from .factories import WellFactory


pytestmark = pytest.mark.django_db


class TestFilterSet(TestModelFilter):
    filter_class = WellFilter
    factory_class = WellFactory
    model_class = Well

    def test_no_filter(self):
        for _ in range(10):
            i = self.get_factory()
        f = self.get_filter({}, queryset=self.model_class.objects.all())
        assert f.is_valid()
        assert f.qs.count() == 10

        i.delete()
        assert f.qs.count() == 9

    def test_filter_name(self):
        for _ in range(5):
            self.get_factory(name="NOT MY WELL")
        i = self.get_factory(name="MY WELL!")

        f = self.get_filter({"name__icontains": "my well"}, queryset=self.model_class.objects.all())
        print(f.qs[1].name)
        assert f.is_valid()
        assert f.qs.count() == 6
        f = self.get_filter({"name__icontains": "my well!"}, queryset=self.model_class.objects.all())
        assert f.is_valid()
        assert f.qs.count() == 1
        assert f.qs[0].pk == i.pk

    def test_filter_source(self):
        for _ in range(5):
            self.get_factory(source=["source"])
        i = self.get_factory(source=["source2"])

        f = self.get_filter({"source__overlap": "source"}, queryset=self.model_class.objects.all())
        assert f.is_valid()
        assert f.qs.count() == 5
        f = self.get_filter({"source__overlap": "source2"}, queryset=self.model_class.objects.all())
        assert f.is_valid()
        assert f.qs.count() == 1
        assert f.qs[0].pk == i.pk

    def test_filter_type(self):
        for _ in range(5):
            self.get_factory(type=["type"])
        i = self.get_factory(type=["type2"])

        f = self.get_filter({"type__overlap": "type"}, queryset=self.model_class.objects.all())
        assert f.is_valid()
        assert f.qs.count() == 5
        f = self.get_filter({"type__overlap": "type2"}, queryset=self.model_class.objects.all())
        assert f.is_valid()
        assert f.qs.count() == 1
        assert f.qs[0].pk == i.pk
