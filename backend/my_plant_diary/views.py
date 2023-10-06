from django.contrib.auth.models import User, Group
from django.conf import settings
from django.contrib.auth import authenticate
from .authenticate import CustomAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework import viewsets, permissions, generics, response, views, status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, GroupSerializer, PlantSerializer, NoteSerializer, WateringEntrySerializer, CookieTokenRefreshSerializer
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

class LogoutView(views.APIView):
     def post(self, request): 
          try:               
               # blacklist the old refresh token
               raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']) or None 
               if raw_token is None:
                    return None
                
               try:
                 token = RefreshToken(raw_token)
                 token.blacklist()
               except Exception as e:
                   print(e)
               
               res = response.Response()
               res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
               res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
               res.status_code=status.HTTP_205_RESET_CONTENT

               return res
          except Exception as e:
               print("Exception ", e)
               return response.Response(status=status.HTTP_400_BAD_REQUEST)


def get_user_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }

def set_access_token(response, new_token):
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE'],
        value=new_token,
        expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )
    return response

def set_refresh_token(response, new_token):
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
        value=new_token,
        expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )
    return response

# https://github.com/jazzband/djangorestframework-simplejwt/issues/71?fbclid=IwAR1uMg3zy4gCUqaIJ4zWZ-T5RNnI8SrbFIEou6bstWyzQyQ7i1Vi7RMzUBs
class CookieTokenRefreshView(TokenRefreshView):  
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("access"):
            response = set_access_token(response=response, new_token=response.data.get("access"))
            del response.data["access"] 

        if response.data.get("refresh"):
            response = set_refresh_token(response=response, new_token=response.data.get("refresh"))
            del response.data["refresh"]
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer


@method_decorator(ensure_csrf_cookie, name="post")
class LoginView(views.APIView):
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            tokens = get_user_tokens(user)
            
            res = response.Response(status=status.HTTP_200_OK)
            res = set_access_token(response=res, new_token=tokens["access"])

            res = set_refresh_token(response=res, new_token=tokens['refresh'])

            res.data = tokens
            return res

        else:
            return response.Response('Wrong username/password.', status=status.HTTP_401_UNAUTHORIZED)
    

class RegistrationView(views.APIView):
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']

        user = User.objects.filter(username=username)
        user_by_email = User.objects.filter(email=email)

        if user_by_email.exists():
            return response.Response('An account with this email already exists.', status=status.HTTP_400_BAD_REQUEST)
        
        elif user.exists():
            return response.Response('Sorry, a user with this username already exists.', status=status.HTTP_400_BAD_REQUEST)
        
        else:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()

            return response.Response('User created successfully!', status=status.HTTP_201_CREATED)
