# Generated by Django 2.1.7 on 2020-04-25 01:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Etitle', models.CharField(default='free food', max_length=30)),
                ('Etype', models.CharField(default='Pizza', max_length=20)),
                ('Estart', models.DateTimeField(default=django.utils.timezone.now)),
                ('Eend', models.DateTimeField(default=django.utils.timezone.now)),
                ('Eopen', models.CharField(default='all', max_length=40)),
                ('Eplace', models.CharField(default='school', max_length=40)),
                ('Edescription', models.CharField(default='no description', max_length=300)),
                ('Ersvps', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='user', max_length=20)),
                ('password', models.CharField(default='N/A', max_length=20)),
                ('location', models.CharField(default='N/A', max_length=40)),
                ('email', models.CharField(default='N/A', max_length=40)),
                ('tel', models.CharField(default='N/A', max_length=15)),
                ('EventsRegister', models.ManyToManyField(to='freefood.Event')),
            ],
        ),
    ]
