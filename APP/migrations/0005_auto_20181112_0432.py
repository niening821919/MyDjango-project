# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-11-12 04:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0004_basket'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='newPrice',
            field=models.DecimalField(decimal_places=2, max_digits=7),
        ),
    ]
