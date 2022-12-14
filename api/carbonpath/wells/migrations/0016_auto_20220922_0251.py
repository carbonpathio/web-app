# Generated by Django 3.2.15 on 2022-09-22 02:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wells', '0015_alter_well_api_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='well',
            name='contract_address',
        ),
        migrations.AddField(
            model_name='well',
            name='admin_contract_address',
            field=models.CharField(blank=True, max_length=64, verbose_name='Admin Contract Address'),
        ),
        migrations.AddField(
            model_name='well',
            name='is_approved',
            field=models.BooleanField(default=False, verbose_name='is approved for minting'),
        ),
        migrations.AddField(
            model_name='well',
            name='mint_status',
            field=models.CharField(choices=[('draft', 'Draft'), ('minted', 'Minted')], default='draft', max_length=64, verbose_name='Mint Status'),
        ),
        migrations.AddField(
            model_name='well',
            name='mint_transaction_hash',
            field=models.CharField(blank=True, max_length=128, verbose_name='Mint Transaction Hash'),
        ),
        migrations.AddField(
            model_name='well',
            name='nft_contract_address',
            field=models.CharField(blank=True, max_length=64, verbose_name='NFT Contract Address'),
        ),
        migrations.AddField(
            model_name='well',
            name='number_of_advanced_eavs',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Number of advanced EAVs'),
        ),
        migrations.AddField(
            model_name='well',
            name='number_of_buffer_pool_eavs',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Number of buffer pool EAVs'),
        ),
        migrations.AddField(
            model_name='well',
            name='token_contract_address',
            field=models.CharField(blank=True, max_length=64, verbose_name='Token Contract Address'),
        ),
        migrations.CreateModel(
            name='RetiredToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('transaction_hash', models.CharField(max_length=128, verbose_name='Transaction Hash')),
                ('amount', models.PositiveIntegerField(verbose_name='Amount')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_retired_tokens', to=settings.AUTH_USER_MODEL)),
                ('well', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='well_retired_tokens', to='wells.well')),
            ],
            options={
                'verbose_name': 'Retired Token',
                'verbose_name_plural': 'Retired Tokens',
            },
        ),
    ]
