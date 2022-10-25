from rest_framework import routers

from . import views


app_name = "alerts"


router = routers.SimpleRouter()
router.register("", views.AlertViewSet)


urlpatterns = router.urls
