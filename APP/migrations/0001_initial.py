# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-11-09 01:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tel', models.CharField(max_length=40)),
                ('password', models.CharField(max_length=40)),
                ('password_again', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'sasa_user',
            },
        ),
        migrations.CreateModel(
            name='Wheel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'sasa_wheel',
            },
        ),
    ]
