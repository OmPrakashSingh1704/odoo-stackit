from django.db import models
from user_profile.models import UserProfile
from tinymce.models import HTMLField
from comments.models import Comments

class Tag(models.Model):
    id=models.UUIDField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Tags"

# Create your models here.
class Question(models.Model):
    id=models.UUIDField(primary_key=True)
    title = models.CharField(max_length=200)
    content = HTMLField('Content')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    solved= models.BooleanField(default=False)
    author = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, related_name='questions')
    solvedanswer= models.ForeignKey(Comments, on_delete=models.SET_NULL, null=True, blank=True, related_name='solved_questions')
    initial_comments = models.ManyToManyField(Comments, blank=True, related_name='initial_questions')
    tags = models.ManyToManyField(Tag, null=True, blank=True, related_name='tags')

    def __str__(self):
        return self.title
    