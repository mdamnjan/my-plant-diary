from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, PostSerializer
from .models import Plant, Post
from .permissions import IsOwnerOrReadOnly

# Create your views here.

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to My Plant Diary!")

class PlantViewSet(viewsets.ModelViewSet):
    serializer_class = PlantSerializer
    queryset = Plant.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]
                      
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]