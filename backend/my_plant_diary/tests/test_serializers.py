from django.test import TestCase
from my_plant_diary.models import Task, Plant, Note, User
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
import datetime

class PlantSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testerton@test.com", username="tester", password="abc123")
        self.plant = Plant.objects.create(owner=self.user, name="Rubber Plant")
