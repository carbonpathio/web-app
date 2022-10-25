# Generated by Django 3.2.14 on 2022-09-01 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20220901_0151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=255, null=True, unique=True, verbose_name='email address'),
        ),
    ]