# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-11-10 09:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goods',
            old_name='num',
            new_name='goodsid',
        ),
    ]