from django_filters import rest_framework as filters
from .models import Task, Plant, Note

from django.utils import timezone
from datetime import timedelta

class PlantFilter(filters.FilterSet): 
    class Meta: 
        model = Plant
        fields = ['name']

class TaskFilter(filters.FilterSet):
    completed = filters.BooleanFilter
    overdue = filters.BooleanFilter(method="filter_by_overdue")

    INTERVAL_CHOICES = (('today', 'today'), ('week', 'week'),('2weeks', '2weeks'), ('month', 'month'))
    interval = filters.ChoiceFilter(method="filter_by_interval", choices=INTERVAL_CHOICES)
    plant = filters.CharFilter(field_name="plant", method="filter_by_plant")

    def filter_by_plant(self, queryset, name, value):
        return queryset.filter(plant__id=value)

    def filter_by_overdue(self, queryset, name, value):
        today = timezone.now().date()
        if value:
            return queryset.filter(completed=False, date__lt=today)
        return queryset

    def filter_by_interval(self, queryset, name, value):
        today = timezone.now().date()
        
        if value == 'today':
            return queryset.filter(date__gte=today, date__lte=today)
        elif value == 'week':
            return queryset.filter(date__gt=today, date__lte=(today+timedelta(days=7)))
        elif value == '2weeks':
            return queryset.filter(date__gte=(today+timedelta(days=7)), date__lte=(today+timedelta(days=14)))
        elif value == 'month':
            return queryset.filter(date__gte=(today+timedelta(days=14)), date__lte=(today+timedelta(days=30)))
            
        return queryset
    class Meta:
        model = Task
        fields = ['completed', 'interval', 'overdue', 'plant']


class NoteFilter(filters.FilterSet):
    plant = filters.CharFilter(field_name="plant", method="filter_by_plant")

    def filter_by_plant(self, queryset, name, value):
        return queryset.filter(plant__id=value)
    class Meta:
        model = Note
        fields = ['plant']
