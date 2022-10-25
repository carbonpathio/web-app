import json
from factory import Faker
from factory.declarations import SubFactory
from factory.django import DjangoModelFactory
from users.tests.factories import UserFactory
from dronedeploy.models import MapPlan, PanoPlan, PhotoPlan, VideoPlan

class MapPlanFactory(DjangoModelFactory):
    api_id = Faker("pystr")
    name = Faker("word")
    geometry = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ]
    jpeg_download_path = Faker("url")
    jpeg_bounds = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ]
    jpeg_file = None
    geotiff_download_path = Faker("url")
    geotiff_bounds = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ]
    geotiff_file = None

    class Meta:
        model = MapPlan

class PanoPlanFactory(DjangoModelFactory):
    api_id = Faker("pystr")
    name = Faker("word")
    geometry = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ] 
    download_path = Faker("url")

    class Meta:
        model = PanoPlan

class PhotoPlanFactory(DjangoModelFactory):
    api_id = Faker("pystr")
    name = Faker("word")
    geometry = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ]
    download_path = Faker("url")

    class Meta:
        model = PhotoPlan

class VideoPlanFactory(DjangoModelFactory):
    api_id = Faker("pystr")
    name = Faker("word")
    geometry = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ]
    download_path = Faker("url")

    class Meta:
        model = VideoPlan