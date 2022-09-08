from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Plant(models.Model):
    owner = models.ForeignKey(User, related_name='plants', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    # status -> whether it needs to be watered
    PLANT_STATUS_CHOICES = [('OK', 'Ok'), ('NW', 'Needs Water')]
    status = models.CharField(max_length=2, choices=PLANT_STATUS_CHOICES, default='OK')
    WATERING_FREQUENCY_CHOICES=[('EOD', 'Every Other Day'), ('OAW', 'Once a Week'), ('ETW', 'Every 2 Weeks'), ('OAM', 'Once a Month')]
    watering_frequency=models.CharField(max_length=3, choices=WATERING_FREQUENCY_CHOICES, default='OAW')
    last_watered=models.DateField(null=True)
    # watering_entries
    # notes
    
class Note(models.Model):
    owner = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    text = models.CharField(max_length=1000)

class WateringEntry(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    watered_on = models.DateField()
    created = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        super(WateringEntry, self).save(*args, **kwargs)
        if self.plant.last_watered < self.watered_on:
            self.plant.last_watered=self.watered_on
            self.plant.save()