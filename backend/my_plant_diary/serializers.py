from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Plant, Note, Task, WateringEntry
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

class PlantSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    slug = serializers.ReadOnlyField()
    next_watering=serializers.ReadOnlyField()
    last_watered=serializers.ReadOnlyField()
    watering_frequency_display=serializers.ReadOnlyField(source='get_watering_frequency_display')
    class Meta:
        model = Plant
        fields = ('id', 'owner', 'name', 'slug', 'img_url', 'watering_frequency', 'watering_frequency_display', 'last_watered', 'next_watering')

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    plant_name=serializers.ReadOnlyField(source='plant.name')
    plant_img=serializers.ReadOnlyField(source='plant.img_url')
    type_display = serializers.ReadOnlyField(source='get_type_display')
    
    class Meta:
        model = Task
        fields = ('id', 'plant', 'plant_name', 'plant_img', 'owner', 'created', 'updated', 'date', 'type', 'type_display', 'completed')

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
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all())
    plants = serializers.PrimaryKeyRelatedField(many=True, queryset=Plant.objects.all())

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'notes',
                #    'plants'
                   ]


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