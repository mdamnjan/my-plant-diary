from django.test import TestCase
from my_plant_diary.models import Plant, User
from django.core.exceptions import ValidationError

# Create your tests here.

class PlantTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="tester", password="test123")

    def test_plant_must_have_name(self):
        owner = User.objects.get(username="tester")

        with self.assertRaises(ValidationError):
            plant = Plant.objects.create(owner=owner)

            self.assertNotEqual(plant.name, '')
            self.assertIsNone(plant)

    def test_plant_must_have_owner(self):
        with self.assertRaises(ValidationError):
            plant = Plant.objects.create(name="Test plant")
            self.assertIsNone(plant)


class TaskTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(username="tester", password="test123")
        Plant.objects.create(owner=user, name="Test plant")

    def test_task_must_have_plant(self):
        pass

    def test_task_must_have_owner(self):
        pass

    def test_plant_owner_must_be_task_owner(self):
        pass
    
    def test_task_plant_must_exist(self):
        pass

    def task_must_have_type(self):
        pass

    def test_task_can_be_completed(self):
        pass

    def test_task_can_be_uncompleted(self):
        pass

    def test_task_text_is_max_1000_chars(self):
        pass