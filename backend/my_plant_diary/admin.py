from django.contrib import admin
from .models import Plant, Note, WateringEntry

# Register your models here.

class Admin(admin.ModelAdmin):
    list_display = ('id',)
        


admin.site.register(Plant, Admin)
admin.site.register(Note, Admin)
admin.site.register(WateringEntry, Admin)