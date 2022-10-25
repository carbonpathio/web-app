from drf_spectacular.utils import extend_schema, extend_schema_view
from dronedeploy.serializers import MapPlanOutputSerializer
from rest_framework import permissions, viewsets, status
from django.conf import settings
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import MapPlan, PanoPlan, PhotoPlan, VideoPlan
from .serializers import MapPlanSerializer, PanoPlanSerializer, PhotoPlanSerializer, VideoPlanSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models import Q

import requests
import zipfile
from io import BytesIO
from django.core.files import File
from PIL import Image


class DroneDeployViewSet(viewsets.GenericViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MapPlanSerializer
    queryset = MapPlan.objects.all()

    @extend_schema(
        operation_id="DroneDeploy: Fetch all image links",
        description="Fetches all existing image links for plans.",
        request=None,
        responses={},
    )
    @action(detail=False, methods=["get"])
    def fetch_image_links(self, request):
        map_plans = MapPlan.objects.filter(jpeg_file__contains="dronedeploy")
        pano_plans = PanoPlan.objects.filter(download_path__isnull=False)
        photo_plans = PhotoPlan.objects.filter(download_path__isnull=False)
        video_plans = VideoPlan.objects.filter(download_path__isnull=False)

        map_plan_serializer = MapPlanOutputSerializer(map_plans, context={"request": request}, many=True)
        pano_plan_serializer = PanoPlanSerializer(pano_plans, many=True)
        photo_plan_serializer = PhotoPlanSerializer(photo_plans, many=True)
        video_plan_serializer = VideoPlanSerializer(video_plans, many=True)

        return Response({
            "map_plans": map_plan_serializer.data,
            "pano_plans": pano_plan_serializer.data,
            "photo_plans": photo_plan_serializer.data,
            "video_plans": video_plan_serializer.data
        })