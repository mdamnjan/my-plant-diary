from django.contrib.auth.models import User, Group
from .authenticate import CustomAuthentication

from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, NoteSerializer, WateringEntrySerializer, TaskSerializer
from .models import Plant, Note, WateringEntry, Task
from .permissions import IsOwner

from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from django.utils import timezone
from datetime import timedelta

import json

# Create your views here.

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to My Plant Diary!")

class PlantViewSet(viewsets.ModelViewSet):
    authentication_classes=[CustomAuthentication]
    serializer_class = PlantSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        Return a list of all plants owned by the current user.

        """
        user = self.request.user
        return Plant.objects.filter(owner=user)
                      
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

    def get_queryset(self):
        """
        Return a list of all notes owned by the current user.

        """
        user = self.request.user

        url_params = self.request.GET

        tasks = Task.objects.filter(plant__owner=user)

        if url_params:
            query_plant = url_params.get('plant', False)
            if query_plant:
                tasks = tasks.filter(plant__id=query_plant)
            
            query_interval = url_params.get('interval', False)
            if query_interval:
                today = timezone.now().date()
                
                if query_interval == 'today':
                    tasks = tasks.filter(plant__owner=user, date__gte=today, date__lte=today)
                elif query_interval == 'week':
                    tasks = tasks.filter(plant__owner=user, date__gte=today, date__lte=(today+timedelta(days=7)))
                elif query_interval == '2weeks':
                    tasks = tasks.filter(plant__owner=user, date__gte=(today+timedelta(days=7)), date__lte=(today+timedelta(days=14)))
                elif query_interval == 'month':
                    tasks = tasks.filter(plant__owner=user, date__gte=(today+timedelta(days=14)), date__lte=(today+timedelta(days=30)))

            overdue_filter = url_params.get('overdue', False)
            if overdue_filter:
                is_overdue=False
                try:
                    is_overdue = json.loads(url_params.get('overdue', 'false'))
                except:
                    pass

                if is_overdue:
                    today = timezone.now().date()
                    # completed tasks shouldn't be considered overdue
                    tasks = tasks.filter(plant__owner=user, completed=False, date__lt=today)

            completed_filter = url_params.get('completed', False)
            if completed_filter:
                is_completed=False
                try:
                    is_completed = json.loads(url_params.get('completed', 'false'))
                except:
                    pass

                tasks = tasks.filter(plant__owner=user, completed=is_completed)

            sort = url_params.get('sort', False)
            if sort:
                try:
                    tasks = tasks.order_by(sort)
                except:
                    pass
            
        return tasks.order_by('date')

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

    def get_queryset(self):
        """
        Return a list of all notes owned by the current user.

        """
        user = self.request.user

        url_params = self.request.GET

        if url_params:
            if url_params['plant']:
                query_plant = self.request.GET['plant']
                return Note.objects.filter(plant__owner=user, plant__id=query_plant).order_by('-updated')
            
        return Note.objects.filter(plant__owner=user).order_by('-updated')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class NoteDetailViewSet(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class WateringViewSet(viewsets.ModelViewSet):
    authentication_classes=[CustomAuthentication]
    serializer_class = WateringEntrySerializer
    permission_classes = [permissions.IsAuthenticated,
                      IsOwner]
    
    def get_queryset(self):
        """
        Return a list of all watering entries owned by the current user.

        """
        user = self.request.user

        url_params = self.request.GET

        if url_params:
            if url_params['plant']:
                query_plant = self.request.GET['plant']
                return WateringEntry.objects.filter(plant__owner=user, plant__name=query_plant).order_by('-updated')
            
        return WateringEntry.objects.filter(plant__owner=user).order_by('-watered_on')

class WateringDetailViewSet(generics.RetrieveAPIView):
    queryset = WateringEntry.objects.all()
    serializer_class = WateringEntrySerializer

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
