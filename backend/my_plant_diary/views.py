from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, NoteSerializer, WateringSerializer
from .models import Plant, Note, Watering
from .permissions import IsOwner

# Create your views here.

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to My Plant Diary!")

class PlantViewSet(viewsets.ModelViewSet):
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

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all().order_by('-updated')
    permission_classes = [permissions.IsAuthenticated,
                      IsOwner]


class NoteDetailViewSet(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class WateringViewSet(viewsets.ModelViewSet):
    serializer_class = WateringSerializer
    queryset = Watering.objects.all().order_by('-watered_on')
    permission_classes = [permissions.IsAuthenticated,
                      IsOwner]

class WateringDetailViewSet(generics.RetrieveAPIView):
    queryset = Watering.objects.all()
    serializer_class = WateringSerializer

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


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]