from rest_framework import serializers
from .models import Question
class QuestionSerializer(serializers.ModelSerializer):
    
    title = serializers.CharField(max_length=255)
    content = serializers.CharField(style={'base_template': 'textarea.html'})
    class Meta:
        model = Question
        fields = ['title', 'content', 'created_at', 'updated_at', 'solved',  'solvedanswer', 'initial_comments', 'tags']