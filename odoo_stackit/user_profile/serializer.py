from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields=['username', 'first_name', 'last_name', 'email', 'password']
    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format")
        return value
