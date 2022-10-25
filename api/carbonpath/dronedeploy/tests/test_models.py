import json
import pytest

from .factories import MapPlanFactory, PanoPlanFactory, PhotoPlanFactory, VideoPlanFactory

pytestmark = pytest.mark.django_db

class TestPlanModels:
    def test_create(self):

        api_id = "e567he56j7n6754we"
        name = "Test"
        geometry = [
            {"lat": 36.123123, "lng": 105.123123},
            {"lat": 37.123123, "lng": 106.123123},
            {"lat": 38.123123, "lng": 107.123123},
            {"lat": 39.123123, "lng": 108.123123},
        ]
        url = "https://google.com"

        map_plan = MapPlanFactory(api_id=api_id, name=name, geometry=geometry, jpeg_download_path=url, geotiff_download_path=url)
        assert map_plan.pk is not None
        assert map_plan.api_id == api_id
        assert map_plan.name == name
        assert map_plan.geometry == geometry
        assert map_plan.jpeg_download_path == url
        assert map_plan.geotiff_download_path == url

        pano_plan = PanoPlanFactory(api_id=api_id, name=name, geometry=geometry, download_path=url)
        assert pano_plan.pk is not None
        assert pano_plan.api_id == api_id
        assert pano_plan.name == name
        assert pano_plan.geometry == geometry
        assert pano_plan.download_path == url

        photo_plan = PanoPlanFactory(api_id=api_id, name=name, geometry=geometry, download_path=url)
        assert photo_plan.pk is not None
        assert photo_plan.api_id == api_id
        assert photo_plan.name == name
        assert photo_plan.geometry == geometry
        assert photo_plan.download_path == url

        video_plan = PanoPlanFactory(api_id=api_id, name=name, geometry=geometry, download_path=url)
        assert video_plan.pk is not None
        assert video_plan.api_id == api_id
        assert video_plan.name == name
        assert video_plan.geometry == geometry
        assert video_plan.download_path == url