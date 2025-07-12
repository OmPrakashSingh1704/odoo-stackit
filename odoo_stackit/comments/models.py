from django.db import models
from user_profile.models import UserProfile
from tinymce.models import HTMLField
# Create your models here.
class Comments(models.Model):
    id = models.UUIDField(primary_key=True)
    previous_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    content = HTMLField('Content')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, related_name='comments')

    def __str__(self):
        return f"Comment by {self.author.username}"
    
class Votes(models.Model):
    id = models.UUIDField(primary_key=True)
    total_votes = models.IntegerField(default=0)
    your_vote = models.IntegerField(default=0, choices=[(1, 'Upvote'), (-1, 'Downvote')])