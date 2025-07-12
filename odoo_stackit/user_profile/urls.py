from .views import signup,trie,Login,Logout, profile
from django.urls import path

urlpatterns = [path("signup/", signup.as_view(), name="signup"),
    path("trie/", trie.as_view(), name="trie"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("profile/", profile.as_view(), name="profile")]