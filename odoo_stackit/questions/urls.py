from django.urls import path
from .views import QuestionsView

urlpatterns = [  # ✅ Correct name
    path("questions/", QuestionsView.as_view(), name="questions")
]
