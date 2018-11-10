from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=256)
    token = models.CharField(max_length=256)

    class Meta:
        db_table = 'sasa_user'


class Wheel(models.Model):
    img = models.CharField(max_length=100)

    class Meta:
        db_table = 'sasa_wheel'

class Goods(models.Model):
    pass

