# Generated by Django 3.2.14 on 2022-08-17 08:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wells', '0009_auto_20220817_0746'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='well',
            name='profile_picture',
        ),
    ]
