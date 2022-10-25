from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from users.serializers import UserSerializer

from .models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    @action(detail=False, methods=["get", "patch"])
    def me(self, request):
        if request.method == "GET":
            return Response(self.get_serializer(request.user).data, status.HTTP_200_OK)

        if request.method == "PATCH":
            serializer = self.get_serializer(
                request.user, data=request.data, partial=True, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data, status.HTTP_200_OK)
