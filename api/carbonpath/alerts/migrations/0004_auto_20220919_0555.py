# Generated by Django 3.2.15 on 2022-09-19 05:55

from django.db import migrations
import django.utils.timezone
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('alerts', '0003_alter_alert_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='alert',
            name='created',
            field=django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='created'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='alert',
            name='modified',
            field=django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified'),
        ),
    ]
