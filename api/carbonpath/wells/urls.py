from rest_framework import routers

from . import views


app_name = "wells"

router = routers.SimpleRouter()
router.register("token-transaction", views.TokenTransactionViewSet, basename="token-transaction")
router.register("", views.WellViewSet)


urlpatterns = router.urls
