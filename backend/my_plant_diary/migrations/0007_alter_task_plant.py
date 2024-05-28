# Generated by Django 4.1.2 on 2024-05-28 05:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_plant_diary', '0006_plant_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='plant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='my_plant_diary.plant'),
        ),
    ]
