from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext_lazy as _
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView


admin.site.site_header = _("Carbon Path administration")
admin.site.site_title = _("Carbon Path site admin")

api_patterns = [
    path("authentication/", include("authentication.urls")),
    path("faqs/", include("faqs.urls")),
    path("users/", include("users.urls")),
    path("wells/", include("wells.urls")),
    path("alerts/", include("alerts.urls")),
    path("dronedeploy/", include("dronedeploy.urls")),
]

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api/v1/", include(api_patterns)),
    # API Docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    # path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/docs/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]


if settings.ENABLE_SILK:
    urlpatterns += [path("silk/", include("silk.urls", namespace="silk"))]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_PATH, document_root=settings.MEDIA_ROOT)
