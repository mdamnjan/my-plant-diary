from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Plant, Post

class PlantSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Plant
        fields = ('id', 'name', 'owner')

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Post
        fields = ('id', 'text', 'plant', 'owner')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    plants = serializers.PrimaryKeyRelatedField(many=True, queryset=Plant.objects.all())

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'posts', 'plants']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']