from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import mixins, permissions, viewsets

from .models import Faq
from .serializers import FaqSerializer


@extend_schema_view(
    list=extend_schema(operation_id="FAQ: List", description="List FAQ instances", responses={200: FaqSerializer}),
)
class FaqViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = FaqSerializer
    queryset = Faq.objects.all()
