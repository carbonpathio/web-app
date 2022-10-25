from django.contrib import admin

from .models import AlertType, Alert

@admin.register(AlertType)
class AlertTypeAdmin(admin.ModelAdmin):
    model = AlertType
    list_display = ("type", "name")


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ("type", "user", "message")

