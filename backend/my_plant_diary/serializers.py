from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Plant, Note, Task, WateringEntry
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from django.utils import timezone

class PlantSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    slug = serializers.ReadOnlyField()
    next_watering=serializers.ReadOnlyField()
    last_watered=serializers.ReadOnlyField()
    watering_frequency_display=serializers.ReadOnlyField(source='get_watering_frequency_display')

    task_count = serializers.SerializerMethodField()
    completed_task_count = serializers.SerializerMethodField()
    class Meta:
        model = Plant
        fields = ('id', 'created', 'task_count', 'completed_task_count', 'owner', 'name', 'slug', 'img_url', 'watering_frequency', 'watering_frequency_display', 'last_watered', 'next_watering')
    
    def get_task_count(self, obj):
        today = timezone.now().date()
        tasks_due_today = Task.objects.filter(plant__id=obj.pk, date__gte=today, date__lte=today).count()
        overdue_tasks = Task.objects.filter(plant__id=obj.pk, date__lt=today, completed=False).count()
        overdue_tasks_completed = Task.objects.filter(plant__id=obj.pk, date__lt=today, completed_at__date__gte=today, completed_at__date__lte=today, completed=True).count()

        # all tasks due today + overdue tasks (not completed)
        return tasks_due_today + overdue_tasks + overdue_tasks_completed
    
    def get_completed_task_count(self, obj):
        today = timezone.now().date()

        tasks_due_today_completed = Task.objects.filter(plant__id=obj.pk, date__gte=today, date__lte=today, completed=True).count()
        overdue_tasks_completed = Task.objects.filter(plant__id=obj.pk, date__lt=today, completed_at__date__gte=today, completed_at__date__lte=today, completed=True).count()

        return tasks_due_today_completed + overdue_tasks_completed
    
class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    plant_name=serializers.ReadOnlyField(source='plant.name')
    plant_img=serializers.ReadOnlyField(source='plant.img_url')
    type_display = serializers.ReadOnlyField(source='get_type_display')
    
    class Meta:
        model = Task
        fields = ('id', 'plant', 'plant_name', 'plant_img', 'owner', 'created', 'completed_at', 'date', 'type', 'type_display', 'completed')

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    plant_name=serializers.ReadOnlyField(source='plant.name')
    plant_img=serializers.ReadOnlyField(source='plant.img_url')
    class Meta:
        model = Note
        fields = ('id', 'text', 'plant', 'plant_name', 'plant_img', 'owner', 'created', 'updated', 'img_url')

class WateringEntrySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = WateringEntry
        fields = ('id', 'plant', 'watered_on', 'owner', 'created')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    task_count = serializers.SerializerMethodField()
    completed_task_count = serializers.SerializerMethodField()    
    plant_count = serializers.SerializerMethodField()
    overdue_task_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'email', 'groups', 'plant_count', 'task_count', 'completed_task_count', 'overdue_task_count']


    def get_plant_count(self, obj):
        return Plant.objects.filter(owner__id=obj.pk).count()

    def get_task_count(self, obj):
        today = timezone.now().date()
        tasks_due_today = Task.objects.filter(owner__id=obj.pk, date__gte=today, date__lte=today).count()
        overdue_tasks = Task.objects.filter(owner__id=obj.pk, date__lt=today, completed=False).count()
        overdue_tasks_completed = Task.objects.filter(owner__id=obj.pk, date__lt=today, completed_at__date__gte=today, completed_at__date__lte=today, completed=True).count()

        # all tasks due today + overdue tasks (not completed)
        return tasks_due_today + overdue_tasks + overdue_tasks_completed
    
    def get_overdue_task_count(self, obj):
        today = timezone.now().date()
        return Task.objects.filter(owner__id=obj.pk, date__lt=today, completed=False).count()
    
    def get_completed_task_count(self, obj):
        today = timezone.now().date()

        tasks_due_today_completed = Task.objects.filter(owner__id=obj.pk, date__gte=today, date__lte=today, completed=True).count()
        overdue_tasks_completed = Task.objects.filter(owner__id=obj.pk, date__lt=today, completed_at__date__gte=today, completed_at__date__lte=today, completed=True).count()

        return tasks_due_today_completed + overdue_tasks_completed


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

# https://github.com/jazzband/djangorestframework-simplejwt/issues/71?fbclid=IwAR1uMg3zy4gCUqaIJ4zWZ-T5RNnI8SrbFIEou6bstWyzQyQ7i1Vi7RMzUBs
class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')