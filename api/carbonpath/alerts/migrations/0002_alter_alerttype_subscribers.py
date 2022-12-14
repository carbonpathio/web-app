# Generated by Django 3.2.15 on 2022-09-14 10:05

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('alerts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alerttype',
            name='subscribers',
            field=models.ManyToManyField(related_name='alert_subscriptions', to=settings.AUTH_USER_MODEL),
        ),
    ]
