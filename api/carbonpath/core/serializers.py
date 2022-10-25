from rest_framework import serializers


class BoolSerializer(serializers.Serializer):
    result = serializers.BooleanField(allow_null=False, default=False)
