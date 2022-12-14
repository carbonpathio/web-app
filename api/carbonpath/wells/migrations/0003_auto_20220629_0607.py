# Generated by Django 3.2.13 on 2022-06-29 06:07

from django.db import migrations, models
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wells', '0002_auto_20220627_1436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='well',
            name='bhl_section',
            field=models.IntegerField(blank=True, null=True, verbose_name='BHL Section'),
        ),
        migrations.AlterField(
            model_name='well',
            name='blockchain',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Blockchain'),
        ),
        migrations.AlterField(
            model_name='well',
            name='contract_address',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Contract Address'),
        ),
        migrations.AlterField(
            model_name='well',
            name='cost_per_tonne',
            field=models.IntegerField(blank=True, null=True, verbose_name='Cost Per Tonne in USD'),
        ),
        migrations.AlterField(
            model_name='well',
            name='county',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='County'),
        ),
        migrations.AlterField(
            model_name='well',
            name='field',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Field'),
        ),
        migrations.AlterField(
            model_name='well',
            name='first_perforation_depth',
            field=models.IntegerField(blank=True, null=True, verbose_name='First Perforation Depth in ft'),
        ),
        migrations.AlterField(
            model_name='well',
            name='first_production',
            field=models.DateField(blank=True, null=True, verbose_name='First Production'),
        ),
        migrations.AlterField(
            model_name='well',
            name='last_perforation_depth',
            field=models.IntegerField(blank=True, null=True, verbose_name='Last Perforation Depth in ft'),
        ),
        migrations.AlterField(
            model_name='well',
            name='lease_id',
            field=models.IntegerField(blank=True, null=True, verbose_name='Lease ID/Unit ID/Production ID'),
        ),
        migrations.AlterField(
            model_name='well',
            name='legal_description',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='legal_description'),
        ),
        migrations.AlterField(
            model_name='well',
            name='md',
            field=models.IntegerField(blank=True, null=True, verbose_name='Measured Depth in ft'),
        ),
        migrations.AlterField(
            model_name='well',
            name='metadata',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Metadata'),
        ),
        migrations.AlterField(
            model_name='well',
            name='producing_formation',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Producing Formation'),
        ),
        migrations.AlterField(
            model_name='well',
            name='profile_picture',
            field=versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='profile-pictures/', verbose_name='Profile Picture'),
        ),
        migrations.AlterField(
            model_name='well',
            name='range',
            field=models.CharField(blank=True, max_length=8, null=True, verbose_name='Range'),
        ),
        migrations.AlterField(
            model_name='well',
            name='shl_latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True, verbose_name='SHL Latitude (NAD83)'),
        ),
        migrations.AlterField(
            model_name='well',
            name='shl_longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True, verbose_name='SHL Longitude (NAD83)'),
        ),
        migrations.AlterField(
            model_name='well',
            name='shl_section',
            field=models.IntegerField(blank=True, null=True, verbose_name='SHL Section'),
        ),
        migrations.AlterField(
            model_name='well',
            name='source',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='well',
            name='state',
            field=models.CharField(blank=True, choices=[('Alabama', 'Alabama'), ('Alaska', 'Alaska'), ('American Samoa', 'American Samoa'), ('Arizona', 'Arizona'), ('Arkansas', 'Arkansas'), ('California', 'California'), ('Colorado', 'Colorado'), ('Connecticut', 'Connecticut'), ('Delaware', 'Delaware'), ('District Of Columbia', 'District Of Columbia'), ('Federated States Of Micronesia', 'Federated States Of Micronesia'), ('Florida', 'Florida'), ('Georgia', 'Georgia'), ('Guam', 'Guam'), ('Hawaii', 'Hawaii'), ('Idaho', 'Idaho'), ('Illinois', 'Illinois'), ('Indiana', 'Indiana'), ('Iowa', 'Iowa'), ('Kansas', 'Kansas'), ('Kentucky', 'Kentucky'), ('Louisiana', 'Louisiana'), ('Maine', 'Maine'), ('Marshall Islands', 'Marshall Islands'), ('Maryland', 'Maryland'), ('Massachusetts', 'Massachusetts'), ('Michigan', 'Michigan'), ('Minnesota', 'Minnesota'), ('Mississippi', 'Mississippi'), ('Missouri', 'Missouri'), ('Montana', 'Montana'), ('Nebraska', 'Nebraska'), ('Nevada', 'Nevada'), ('New Hampshire', 'New Hampshire'), ('New Jersey', 'New Jersey'), ('New Mexico', 'New Mexico'), ('New York', 'New York'), ('North Carolina', 'North Carolina'), ('North Dakota', 'North Dakota'), ('Northern Mariana Islands', 'Northern Mariana Islands'), ('Ohio', 'Ohio'), ('Oklahoma', 'Oklahoma'), ('Oregon', 'Oregon'), ('Palau', 'Palau'), ('Pennsylvania', 'Pennsylvania'), ('Puerto Rico', 'Puerto Rico'), ('Rhode Island', 'Rhode Island'), ('South Carolina', 'South Carolina'), ('South Dakota', 'South Dakota'), ('Tennessee', 'Tennessee'), ('Texas', 'Texas'), ('Utah', 'Utah'), ('Vermont', 'Vermont'), ('Virgin Islands', 'Virgin Islands'), ('Virginia', 'Virginia'), ('Washington', 'Washington'), ('West Virginia', 'West Virginia'), ('Wisconsin', 'Wisconsin'), ('Wyoming', 'Wyoming')], max_length=64, null=True, verbose_name='State'),
        ),
        migrations.AlterField(
            model_name='well',
            name='status',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Status'),
        ),
        migrations.AlterField(
            model_name='well',
            name='token_id',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Token ID'),
        ),
        migrations.AlterField(
            model_name='well',
            name='tonnes',
            field=models.IntegerField(blank=True, null=True, verbose_name='Tonnes Count'),
        ),
        migrations.AlterField(
            model_name='well',
            name='township',
            field=models.CharField(blank=True, max_length=8, null=True, verbose_name='Township'),
        ),
        migrations.AlterField(
            model_name='well',
            name='tvd',
            field=models.IntegerField(blank=True, null=True, verbose_name='True Vertical Depth in ft'),
        ),
        migrations.AlterField(
            model_name='well',
            name='type',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Type'),
        ),
        migrations.AlterField(
            model_name='well',
            name='well_type',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='Well Type'),
        ),
    ]
