from core.serializers import BoolSerializer
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Alert, AlertType
from .serializers import AlertSerializer, AlertTypeSerializer, SubscribeSerializer


class AlertViewSet(viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AlertSerializer
    queryset = Alert.objects.all()

    @extend_schema(
        operation_id="Alert: Subscribe",
        description="Subscribe to a new alert",
        request=SubscribeSerializer,
        responses={200: AlertTypeSerializer},
    )
    @action(detail=False, methods=["post"])
    def subscribe(self, request):
        serializer = SubscribeSerializer(data=request.data)
        serializer.is_valid()
        alert_type, _ = AlertType.objects.get_or_create(name=serializer.data["name"], type=serializer.data["type"])
        alert_type.subscribers.add(request.user)

        queryset = request.user.alert_subscriptions.all()
        output_serializer = AlertTypeSerializer(queryset, many=True)
        return Response(output_serializer.data)

    @extend_schema(
        operation_id="Alert: Unsubscribe",
        description="Unsubscribe to an existing alert",
        request=SubscribeSerializer,
        responses={200: AlertTypeSerializer},
    )
    @action(detail=False, methods=["post"])
    def unsubscribe(self, request):
        serializer = SubscribeSerializer(data=request.data)
        serializer.is_valid()
        alert_type = AlertType.objects.get(name=serializer.data["name"], type=serializer.data["type"])
        alert_type.subscribers.remove(request.user)

        queryset = request.user.alert_subscriptions.all()
        output_serializer = AlertTypeSerializer(queryset, many=True)
        return Response(output_serializer.data)

    @extend_schema(
        operation_id="Alert: Is Subscribed",
        description="Check is the user is subscribed to an alert",
        request=SubscribeSerializer,
        responses={200: BoolSerializer},
    )
    @action(detail=False, methods=["post"], url_path="is-subscribed")
    def is_subscribed(self, request):
        serializer = SubscribeSerializer(data=request.data)
        serializer.is_valid()

        result = False
        try:
            alert_type = AlertType.objects.get(name=serializer.data["name"], type=serializer.data["type"])
        except AlertType.DoesNotExist:
            output_serializer = BoolSerializer(data={"result": False})
            output_serializer.is_valid()
            return Response(output_serializer.data)

        if request.user in alert_type.subscribers.all():
            result = True
        output_serializer = BoolSerializer(data={"result": result})
        output_serializer.is_valid()
        return Response(output_serializer.data)

    @extend_schema(
        operation_id="Alert: Mine",
        description="Show all alerts for the user",
    )
    @action(detail=False, methods=["get"])
    def mine(self, request):
        queryset = request.user.alert_list.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @extend_schema(
        operation_id="Alert: Read",
        description="Mark all alerts for the user as 'read'",
    )
    @action(detail=False, methods=["patch"])
    def read(self, request):
        queryset = request.user.alert_list.filter(is_read=False)
        queryset.update(is_read=True)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(
        operation_id="Alert: Clear",
        description="Clear all alerts for the user",
    )
    @action(detail=False, methods=["delete"])
    def clear(self, request):
        queryset = request.user.alert_list.all()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
