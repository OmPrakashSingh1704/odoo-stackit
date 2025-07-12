from django.urls import path
from views import QuestionsView

urls=[path("questions/", QuestionsView.as_view(), name="questions")]