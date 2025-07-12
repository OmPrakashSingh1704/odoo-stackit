from .views import signup,trie
from django.urls import path

urlpatterns = [path("signup/", signup.as_view(), name="signup"),
    path("trie/", trie.as_view(), name="trie")]