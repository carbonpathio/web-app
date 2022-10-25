# Generated by Django 3.2.15 on 2022-09-28 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dronedeploy', '0002_auto_20220928_0925'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mapplan',
            name='file',
        ),
        migrations.AddField(
            model_name='mapplan',
            name='geotiff_file',
            field=models.FileField(null=True, upload_to='dronedeploy/map_plans_geotiff'),
        ),
        migrations.AddField(
            model_name='mapplan',
            name='jpeg_file',
            field=models.FileField(null=True, upload_to='dronedeploy/map_plans_jpeg'),
        ),
    ]