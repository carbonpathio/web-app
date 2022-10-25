from rest_framework import routers

from . import views


app_name = "dronedeploy"


router = routers.SimpleRouter()
router.register("", views.DroneDeployViewSet)


urlpatterns = router.urls
