from django_filters import rest_framework as filters
from wells.models import Well


class CharArrayFilter(filters.BaseCSVFilter, filters.CharFilter):
    pass


class WellFilter(filters.FilterSet):
    source__overlap = CharArrayFilter(field_name="source", lookup_expr="overlap")
    type__overlap = CharArrayFilter(field_name="type", lookup_expr="overlap")

    class Meta:
        model = Well
        fields = {
            "name": ["icontains"],
        }
