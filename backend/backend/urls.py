"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from my_plant_diary import views
from my_plant_diary import auth_views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'plants', views.PlantViewSet, basename="Plant")
router.register(r'notes', views.NoteViewSet, basename="Note")
router.register(r'watering', views.WateringViewSet, basename="WateringEntry")
router.register(r'tasks', views.TaskViewSet, basename="Task")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/token/refresh/', auth_views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', auth_views.LogoutView.as_view(), name ='logout'),
    path('api/login/', auth_views.LoginView.as_view(), name ='login'),
    path('api/register/',auth_views.RegistrationView.as_view(), name ='register'),
    path('api/me/', views.LoggedInUserView.as_view(), name='me')
]
