from .models import Plant, Task

from django.core.exceptions import ValidationError

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