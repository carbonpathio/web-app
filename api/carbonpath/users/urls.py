from django.urls import include, path
from rest_framework import routers
from users.views import UserViewSet


app_name = "users"
router = routers.SimpleRouter()
router.register(r"", UserViewSet, basename="user")


urlpatterns = [
    path("", include(router.urls)),
]
