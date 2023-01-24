# Generated by Django 4.1.2 on 2023-01-24 05:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Plant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField()),
                ('status', models.CharField(choices=[('OK', 'Ok'), ('NW', 'Needs Water')], default='OK', max_length=2)),
                ('watering_frequency', models.CharField(choices=[('EOD', 'Every Other Day'), ('OAW', 'Once a Week'), ('ETW', 'Every 2 Weeks'), ('OAM', 'Once a Month')], default='OAW', max_length=3)),
                ('last_watered', models.DateField(null=True)),
                ('next_watering', models.DateField(null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plants', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Watering',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('watered_on', models.DateField()),
                ('plant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='my_plant_diary.plant')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(max_length=1000)),
                ('plant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='my_plant_diary.plant')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
