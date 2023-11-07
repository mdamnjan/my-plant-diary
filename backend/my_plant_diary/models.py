from django.db import models
from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from django.template.defaultfilters import slugify
import datetime
from django.utils import timezone

from django.core.exceptions import ValidationError

# Create your models here.
def validate_plant_name(self):
    if self.name == '':
        raise ValidationError('Plant name cannot be empty.')
    
    if Plant.objects.filter(name=self.name).exists():
        raise ValidationError('Plant with this name already exists.')
    

def validate_plant_owner(self):
    if not self.owner:
        raise ValidationError('Plant owner must be provided.')
    
    if not Plant.objects.filter(owner=self.owner).exists():
        raise ValidationError('Plant owner does not exist.')
    

def validate_task_owner(self):
    if not self.owner:
        raise ValidationError('Plant owner must be provided.')
    
    if not Task.objects.filter(owner=self.owner).exists():
        raise ValidationError('Task owner does not exist.')
    
    # Task owner must be the same as the plant owner
    if self.owner != self.plant.owner:
        raise ValidationError('')
    
class Plant(models.Model):
    owner = models.ForeignKey(User, related_name='plants', on_delete=models.CASCADE, validators=[validate_plant_owner])
    name = models.CharField(max_length=100, blank=False, null=False, validators=[validate_plant_name])
    slug = models.SlugField()
    img_url=models.CharField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Plant, self).save(*args, **kwargs)  

class TaskManager(models.Manager):
    def overdue(self):
        today = timezone.now().date()
        return self.filter(date__lt=today, completed=False)
    
    def due_today(self):
        today = timezone.now().date()
        return self.filter(date__gte=today, date__lte=today)
    
    def due_today_completed(self):
        today = timezone.now().date()
        return self.filter(date__gte=today, date__lte=today, completed=True)
    
    def completed_today(self):
        today = timezone.now().date()
        return self.filter(date__lt=today, completed_at__date__gte=today, completed_at__date__lte=today, completed=True)  


class Task(models.Model):
    objects = TaskManager()
    owner = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True)

    date =models.DateField(null=False)
    completed = models.BooleanField(default=False)

    TASK_TYPE_CHOICES=[('water', 'Water'), ('progress', 'Progress Update'), ('repot', 'Repot'), ('prune', 'Prune')]
    type = models.CharField(max_length=20, choices=TASK_TYPE_CHOICES, default='water')

    # frequency of the task in days
    frequency = models.IntegerField(null=True)
    
    def get_next_task_date(self):
        if self.frequency:
            return self.date + datetime.timedelta(days=self.frequency)
        return None

    def is_recurring(self):
        return not self.frequency is None
    
    def is_late(self):
        today = timezone.now().date()
        return self.date < today

    def complete_task(self):
        self.completed_at=timezone.now()
        self.save()

    def undo_complete_task(self):
        self.completed_at=None
        self.save()

    def save(self, *args, **kwargs):
        if self.completed and not self.completed_at:
            self.complete_task()

        if not self.completed and self.completed_at:
            self.undo_complete_task()

        super(Task, self).save(*args, **kwargs)  

class Note(models.Model):
    owner = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE, validators=[validate_plant_owner])
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE, )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True) 
    text = models.CharField(max_length=1000)
    img_url = models.CharField(max_length=200, null=True)
