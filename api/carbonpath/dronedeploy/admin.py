from django.contrib import admin

from .models import MapPlan, PanoPlan, PhotoPlan, VideoPlan

@admin.register(MapPlan)
class MapPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "api_id", "name")

@admin.register(PanoPlan)
class PanoPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "api_id", "name")

@admin.register(PhotoPlan)
class PhotoPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "api_id", "name")

@admin.register(VideoPlan)
class VideoPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "api_id", "name")