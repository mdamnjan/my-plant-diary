from django.contrib import admin
from .models import Plant, Post

# Register your models here.

class Admin(admin.ModelAdmin):
    list_display = ('id',)
        


admin.site.register(Plant, Admin)
admin.site.register(Post, Admin)