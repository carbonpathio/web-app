# Generated by Django 3.2.15 on 2022-09-29 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wells', '0016_auto_20220922_0251'),
        ('users', '0006_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='saved_wells',
            field=models.ManyToManyField(related_name='saved_wells', to='wells.Well'),
        ),
    ]
