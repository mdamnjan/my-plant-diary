from django.contrib import admin
from .models import Plant

# Register your models here.

class Admin(admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(Plant, Admin)