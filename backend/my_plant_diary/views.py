from django.contrib.auth.models import User, Group
from .authenticate import CustomAuthentication

from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, NoteSerializer, TaskSerializer
from .models import Plant, Note, Task
from .permissions import IsOwner

from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from django.utils import timezone
from datetime import timedelta

import json

from django_filters import rest_framework as filters
from .filters import PlantFilter, TaskFilter, NoteFilter

# Create your views here.

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to My Plant Diary!")

class PlantViewSet(viewsets.ModelViewSet):
    authentication_classes=[CustomAuthentication]
    serializer_class = PlantSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends=[filters.DjangoFilterBackend]
    filterset_class=PlantFilter

    def get_queryset(self):
        """
        Return a list of all plants owned by the current user.

        """
        user = self.request.user

        return Plant.objects.filter(owner=user).order_by('-created')
                      
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PlantDetailViewSet(generics.RetrieveAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

class TaskViewSet(viewsets.ModelViewSet):
    authentication_classes=[CustomAuthentication]
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated,
                      IsOwner]
    filter_backends=[filters.DjangoFilterBackend]
    filterset_class=TaskFilter

    def get_queryset(self):
        """
        Return a list of all notes owned by the current user.

        """
        user = self.request.user            
        return Task.objects.filter(plant__owner=user).order_by('date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskDetailViewSet(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class NoteViewSet(viewsets.ModelViewSet):
    authentication_classes=[CustomAuthentication]
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated,
                      IsOwner]
    
    filter_backends=[filters.DjangoFilterBackend]
    filterset_class=NoteFilter

    def get_queryset(self):
        """
        Return a list of all notes owned by the current user.

        """
        user = self.request.user
        return Note.objects.filter(plant__owner=user).order_by('-updated')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class NoteDetailViewSet(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

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
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    authentication_classes=[CustomAuthentication]


class LoggedInUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    authentication_classes=[CustomAuthentication]

    def get_object(self):
        return self.request.user

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    authentication_classes=[CustomAuthentication]
