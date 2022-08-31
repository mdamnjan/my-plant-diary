from django.db import models

# Create your models here.

class Plant(models.Model):
    name = models.CharField(max_length=100)
    
class Post(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)