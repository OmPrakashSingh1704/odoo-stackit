# Generated by Django 3.2.25 on 2025-07-12 07:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_alter_comments_content'),
    ]

    operations = [
        migrations.CreateModel(
            name='Votes',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('total_votes', models.IntegerField(default=0)),
                ('your_vote', models.IntegerField(choices=[(1, 'Upvote'), (-1, 'Downvote')], default=0)),
            ],
        ),
        migrations.AddField(
            model_name='comments',
            name='previous_comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='comments.comments'),
        ),
    ]
