from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Plant, Note, WateringEntry

class PlantSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # https://stackoverflow.com/questions/28945327/django-rest-framework-with-choicefield#answer-28954424
    status = serializers.SerializerMethodField()
    watering_frequency = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.get_status_display()

    def get_watering_frequency(self, obj):
        return obj.get_watering_frequency_display()

    class Meta:
        model = Plant
        fields = ('id', 'name', 'owner', 'status', 'watering_frequency', 'last_watered')

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Note
        fields = ('id', 'text', 'plant', 'owner', 'created', 'updated')

class WateringEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = WateringEntry
        fields = ('id', 'plant', 'watered_on', 'created')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    notes = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all())
    plants = serializers.PrimaryKeyRelatedField(many=True, queryset=Plant.objects.all())

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'notes', 'plants']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']