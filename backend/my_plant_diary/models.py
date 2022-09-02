from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Plant(models.Model):
    owner = models.ForeignKey(User, related_name='plants', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    
class Post(models.Model):
    owner = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)