from django.contrib.auth.models import User, Group
from .authenticate import CustomAuthentication

from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, NoteSerializer, WateringEntrySerializer
from .models import Plant, Note, WateringEntry
from .permissions import IsOwner

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


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    authentication_classes=[CustomAuthentication]
