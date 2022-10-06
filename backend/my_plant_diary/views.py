from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, generics, filters
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, NoteSerializer, WateringEntrySerializer
from .models import Plant, Note, WateringEntry
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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name']
    filterset_fields = ['status', 'watering_frequency']
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PlantDetailViewSet(generics.RetrieveAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all().order_by('-updated')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class NoteDetailViewSet(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class WateringViewSet(viewsets.ModelViewSet):
    serializer_class = WateringEntrySerializer
    queryset = WateringEntry.objects.all().order_by('-watered_on')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]

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
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]