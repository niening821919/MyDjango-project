from django.db import models

# Create your models here.
class User(models.Model):
    tel = models.CharField(max_length=40)
    password = models.CharField(max_length=40)
    password_again = models.CharField(max_length=40)