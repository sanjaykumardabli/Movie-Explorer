from django_filters import rest_framework as filters
from .models import Director

class DirectorFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='last_name', lookup_expr='icontains')

    class Meta:
        model = Director
        fields = ['name']