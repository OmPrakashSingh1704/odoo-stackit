from django.urls import path
from .views import CommentsView, VoteView
urlpatterns=[path("comments/", CommentsView.as_view(), name="comments"),
       path("votes/", VoteView.as_view(), name="votes")]
