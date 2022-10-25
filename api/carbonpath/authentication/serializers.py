from rest_framework import serializers


class Web3LoginSerializer(serializers.Serializer):
    wallet_address = serializers.CharField()
    signature = serializers.CharField()
    message = serializers.CharField()


class Web3NonceSerializer(serializers.Serializer):
    wallet_address = serializers.CharField()
