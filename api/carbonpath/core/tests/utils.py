from django.db import models
from django_filters import rest_framework as filters
from factory.django import DjangoModelFactory
from rest_framework import serializers


class TestModelSerializer:
    serializer_class: serializers.ModelSerializer = None
    factory_class: DjangoModelFactory = None

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def get_factory(self, **kwargs):
        return self.factory_class(**kwargs)


class TestModelFilter:
    filter_class: filters.FilterSet = None
    factory_class: DjangoModelFactory = None
    model_class: models.Model = None

    def get_filter(self, *args, **kwargs):
        return self.filter_class(*args, **kwargs)

    def get_factory(self, *args, **kwargs):
        return self.factory_class(*args, **kwargs)

    def get_model_instance(self, *args, **kwargs):
        return self.model_class(*args, **kwargs)


class TestModelView:
    factory_class: DjangoModelFactory = None
    url_namespace: str = None

    def build_request(self, request, user, query_params=None):
        request.user = user
        request.query_params = query_params or {}
        return request

    def get_factory(self, *args, **kwargs):
        return self.factory_class(*args, **kwargs)

    def get_view_name(self, view_name):
        return f"{self.url_namespace}-{view_name}"
