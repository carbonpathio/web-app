from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    list_display = ["wallet_address", "username", "email", "is_staff", "retired_amount"]

    fieldsets = (
        (None, {"fields": ("password", "username", "wallet_address", "email")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {
                "fields": ("is_staff", "is_superuser", "groups", "user_permissions"),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "created")}),
    )
    ordering = ("last_name", "first_name")
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
    list_filter = ("is_staff", "is_superuser", "groups")
    search_fields = ("first_name", "last_name", "email")
    readonly_fields = ("created",)


admin.site.unregister(SocialAccount)
admin.site.unregister(SocialToken)
admin.site.unregister(SocialApp)
admin.site.unregister(Group)
