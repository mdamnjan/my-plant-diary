# Generated by Django 4.1 on 2022-09-08 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_plant_diary', '0002_rename_plant_slug_plant_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='plant',
            name='next_watering',
            field=models.DateField(null=True),
        ),
    ]
