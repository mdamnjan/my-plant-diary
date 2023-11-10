# Generated by Django 4.1.2 on 2023-11-10 07:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_plant_diary', '0007_remove_task_updated_task_completed_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='plant',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2023, 11, 10, 7, 59, 39, 982137, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='plant',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
