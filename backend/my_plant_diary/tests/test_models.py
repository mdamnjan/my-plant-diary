from django.test import TestCase
from my_plant_diary.models import Task, Plant, Note, User
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
import datetime

class PlantTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testerton@test.com", username="tester", password="abc123")

    def test_plant_can_be_created_with_name(self):
        plant = Plant.objects.create(owner=self.user, name="Rubber Plant")
        self.assertEqual(plant.name, "Rubber Plant")

    def test_plant_must_have_owner(self):
        with self.assertRaises(IntegrityError):
            Plant.objects.create(name="String of hearts")
            self.assertIsNot(Plant.objects.get(name="String of hearts"))
    
    def test_slug_field_is_generated_from_name(self):
        plant = Plant.objects.create(owner=self.user, name="Calathea orbifolia")
        self.assertEqual(plant.slug, "calathea-orbifolia")

class TaskTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="bob@.example.com", username="bob", password="password")
        self.plant = Plant.objects.create(owner=self.user, name="Peperomia hope")

    def test_task_must_have_owner(self):
        with self.assertRaises(IntegrityError):
            task_date = datetime.date.fromisoformat('2019-12-04')
            task = Task.objects.create(type="water", plant=self.plant, date=task_date)
            self.assertIsNot(Task.objects.get(type="water", plant=self.plant, date=task_date))
            self.assertFalse(isinstance(task, Task)) 

    def test_task_can_be_completed(self):
        task_date = datetime.date.fromisoformat('2018-12-16')
        task = Task.objects.create(date=task_date, plant=self.plant, owner=self.user)
        self.assertFalse(task.completed)
        task.completed = True
        task.save()
        self.assertTrue(task.completed)
        self.assertIsNotNone(task.completed_at)

    def test_task_can_be_uncompleted(self):
        task_date = datetime.date.fromisoformat('2018-12-16')
        task = Task.objects.create(date=task_date, plant=self.plant, owner=self.user, completed=True)
        self.assertTrue(task.completed)
        task.completed = False
        task.save()
        self.assertFalse(task.completed)
        # TODO: completed_at should be set to null again
        # self.assertIsNone(task.completed_at)

class NoteTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="abc123@example.com", username="abe", password="ukhwekfer")
        self.plant = Plant.objects.create(owner=self.user, name="Peperomia obtusifolia")

    def test_note_must_have_owner(self):
        with self.assertRaises(IntegrityError):
            Note.objects.create(text="Man I hate this plant", plant=self.plant)
            self.assertIsNot(Note.objects.get(text="Man I hate this plant"))        
