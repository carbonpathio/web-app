# Generated by Django 3.2.14 on 2022-08-03 20:09

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wells', '0006_auto_20220803_2008'),
    ]

    operations = [
        migrations.AddField(
            model_name='well',
            name='source',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=32), null=True, size=8),
        ),
        migrations.AddField(
            model_name='well',
            name='type',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=32), null=True, size=8),
        ),
    ]
