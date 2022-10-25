from django.conf import settings
from rest_framework import serializers

from .models import MapPlan, PanoPlan, PhotoPlan, VideoPlan


class MapPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapPlan
        fields = ("id", "api_id", "name", "geometry")

class PanoPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanoPlan
        fields = ("id", "api_id", "name", "geometry", "download_path")

class PhotoPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoPlan
        fields = ("id", "api_id", "name", "geometry", "download_path")

class VideoPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoPlan
        fields = ("id", "api_id", "name", "geometry", "download_path")

class MapPlanOutputSerializer(serializers.ModelSerializer):
    jpeg_file_url = serializers.SerializerMethodField()

    class Meta:
        model = MapPlan
        fields = ("id", "api_id", "name", "jpeg_file_url", "jpeg_bounds")

    def get_jpeg_file_url(self, map_plan):
        request = self.context.get('request')
        jpeg_file_url = map_plan.jpeg_file.url
        return request.build_absolute_uri(jpeg_file_url)
