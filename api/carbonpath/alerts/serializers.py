from rest_framework import serializers

from .models import Alert, AlertType


class AlertTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertType
        fields = ["id", "type", "name"]


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        read_only_fields = ["created"]
        fields = ["id", "type", "user", "message", "is_read"] + read_only_fields


class SubscribeSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=64, allow_blank=True)
    type = serializers.CharField(max_length=64, allow_blank=True)
