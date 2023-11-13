from django_filters import rest_framework as filters
from .models import Task

class TaskFilter(filters.FilterSet):
    class Meta:
        model = Task
        fields = {
            'plant_name': ['exact', 'plant__name'],
            'is_overdue': ['exact', 'year__gt'],
        }