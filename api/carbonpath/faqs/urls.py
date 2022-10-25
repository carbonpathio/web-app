from rest_framework import routers

from . import views


app_name = "faqs"


router = routers.SimpleRouter()
router.register("", views.FaqViewSet)


urlpatterns = router.urls
